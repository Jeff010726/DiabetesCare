import { badRequest, json, readJson, serverError } from "./http";
import { appendContactToSheet } from "./googleSheets";
import { checkRateLimit } from "./rateLimit";
import type { Env } from "./types";

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
  sourcePage?: string;
  preferredLanguage?: string;
};

function validEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function submitContact(request: Request, env: Env) {
  const rateLimited = checkRateLimit(request, env, "contact", 5, 60);
  if (rateLimited) return rateLimited;

  const payload = await readJson<ContactPayload>(request);
  if (!payload) return badRequest(request, env, "Invalid JSON body");

  const name = payload.name?.trim() || "";
  const email = payload.email?.trim().toLowerCase() || "";
  const message = payload.message?.trim() || "";
  const sourcePage = payload.sourcePage?.trim().slice(0, 200) || "";
  const preferredLanguage = payload.preferredLanguage?.trim().slice(0, 16) || "";

  if (name.length < 2) return badRequest(request, env, "Name is required");
  if (name.length > 120) return badRequest(request, env, "Name is too long");
  if (!validEmail(email)) return badRequest(request, env, "Valid email is required");
  if (email.length > 254) return badRequest(request, env, "Email is too long");
  if (message.length < 5) return badRequest(request, env, "Message is required");
  if (message.length > 4000) return badRequest(request, env, "Message is too long");

  try {
    await appendContactToSheet(env, [
      new Date().toISOString(),
      name,
      email,
      message,
      sourcePage,
      preferredLanguage,
      request.headers.get("CF-Connecting-IP") || "",
      request.headers.get("User-Agent") || "",
    ]);

    return json(request, env, { ok: true });
  } catch (error) {
    return serverError(request, env, error instanceof Error ? error.message : undefined);
  }
}
