import { adminAdsAnalytics, adminAnalyticsDashboard, collectAnalytics } from "./analytics";
import {
  adminBookings,
  adminContactLeads,
  adminLogin,
  adminLogout,
  adminMe,
  adminMembers,
  adminPage,
  adminSmtpStatus,
  adminSmtpTest,
  adminStats,
} from "./admin";
import { login, logout, me, register } from "./auth";
import { submitContact } from "./contact";
import { responseHeaders, json, serverError } from "./http";
import type { Env } from "./types";

function adminResponse(request: Request, env: Env) {
  const url = new URL(request.url);
  const headers = responseHeaders(request, env);

  if (url.pathname === "/robots.txt") {
    return new Response("User-agent: *\nDisallow: /\n", {
      status: 200,
      headers: {
        ...headers,
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    });
  }

  if (url.pathname === "/admin/api/login" && request.method === "POST") return adminLogin(request, env);
  if (url.pathname === "/admin/api/logout" && request.method === "POST") return adminLogout(request, env);
  if (url.pathname === "/admin/api/me" && request.method === "GET") return adminMe(request, env);
  if (url.pathname === "/admin/api/stats" && request.method === "GET") return adminStats(request, env);
  if (url.pathname === "/admin/api/analytics/dashboard" && request.method === "GET") return adminAnalyticsDashboard(request, env);
  if (url.pathname === "/admin/api/analytics/ads" && request.method === "GET") return adminAdsAnalytics(request, env);
  if (url.pathname === "/admin/api/bookings" && request.method === "GET") return adminBookings(request, env);
  if (url.pathname === "/admin/api/smtp-status" && request.method === "GET") return adminSmtpStatus(request, env);
  if (url.pathname === "/admin/api/smtp-test" && request.method === "POST") return adminSmtpTest(request, env);
  if (url.pathname === "/admin/api/contact-leads" && request.method === "GET") return adminContactLeads(request, env);
  if (url.pathname === "/admin/api/members" && request.method === "GET") return adminMembers(request, env);
  if (request.method === "GET" && (url.pathname === "/" || url.pathname === "/index.html")) return adminPage(request, env);

  return json(request, env, { error: "Not found" }, { status: 404 });
}

async function route(request: Request, env: Env, ctx: ExecutionContext) {
  const url = new URL(request.url);

  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: responseHeaders(request, env) });
  }

  if (url.hostname === "admin.xtdiabetescare.com") {
    return adminResponse(request, env);
  }

  if (url.pathname === "/api/health" && request.method === "GET") {
    return json(request, env, {
      ok: true,
      service: "diabetescare-api",
      environment: env.APP_ENV,
      d1Configured: Boolean(env.DB),
      googleSheetsConfigured: Boolean(
        env.GOOGLE_SHEETS_SPREADSHEET_ID && env.GOOGLE_SHEETS_CLIENT_EMAIL && env.GOOGLE_SHEETS_PRIVATE_KEY,
      ),
    });
  }

  if (url.pathname === "/api/analytics/collect" && request.method === "POST") return collectAnalytics(request, env);
  if (url.pathname === "/api/contact" && request.method === "POST") return submitContact(request, env, ctx);
  if (url.pathname === "/api/auth/register" && request.method === "POST") return register(request, env);
  if (url.pathname === "/api/auth/login" && request.method === "POST") return login(request, env);
  if (url.pathname === "/api/auth/logout" && request.method === "POST") return logout(request, env);
  if (url.pathname === "/api/auth/me" && request.method === "GET") return me(request, env);

  return json(request, env, { error: "Not found" }, { status: 404 });
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    try {
      return await route(request, env, ctx);
    } catch (error) {
      return serverError(request, env, error instanceof Error ? error.message : undefined);
    }
  },
};
