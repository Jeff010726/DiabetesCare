import { login, logout, me, register } from "./auth";
import { submitContact } from "./contact";
import { responseHeaders, json, serverError } from "./http";
import type { Env } from "./types";

async function route(request: Request, env: Env) {
  const url = new URL(request.url);

  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: responseHeaders(request, env) });
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

  if (url.pathname === "/api/contact" && request.method === "POST") return submitContact(request, env);
  if (url.pathname === "/api/auth/register" && request.method === "POST") return register(request, env);
  if (url.pathname === "/api/auth/login" && request.method === "POST") return login(request, env);
  if (url.pathname === "/api/auth/logout" && request.method === "POST") return logout(request, env);
  if (url.pathname === "/api/auth/me" && request.method === "GET") return me(request, env);

  return json(request, env, { error: "Not found" }, { status: 404 });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    try {
      return await route(request, env);
    } catch (error) {
      return serverError(request, env, error instanceof Error ? error.message : undefined);
    }
  },
};
