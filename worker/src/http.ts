import type { Env } from "./types";

const defaultOrigin = "https://xtdiabetescare.com";
const securityHeaders = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-Robots-Tag": "noindex, nofollow",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
};

function allowedOrigin(request: Request, env: Env) {
  const origin = request.headers.get("Origin");
  const configured = env.APP_ORIGIN || defaultOrigin;

  if (!origin) return configured;
  if (origin === configured || origin === "http://localhost:3000" || origin === "http://127.0.0.1:3000") {
    return origin;
  }
  return configured;
}

export function corsHeaders(request: Request, env: Env) {
  return {
    "Access-Control-Allow-Origin": allowedOrigin(request, env),
    "Access-Control-Allow-Methods": "GET,POST,PATCH,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type,Authorization",
    "Access-Control-Allow-Credentials": "true",
    Vary: "Origin",
  };
}

export function responseHeaders(request: Request, env: Env) {
  return {
    ...securityHeaders,
    ...corsHeaders(request, env),
  };
}

export function json(request: Request, env: Env, data: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...responseHeaders(request, env),
      ...init.headers,
    },
  });
}

export function badRequest(request: Request, env: Env, message: string) {
  return json(request, env, { error: message }, { status: 400 });
}

export function serverError(request: Request, env: Env, message = "Internal server error") {
  const error = env.APP_ENV === "production" ? "Internal server error" : message;
  return json(request, env, { error }, { status: 500 });
}

export async function readJson<T>(request: Request): Promise<T | null> {
  try {
    return (await request.json()) as T;
  } catch {
    return null;
  }
}
