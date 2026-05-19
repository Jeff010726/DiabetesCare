import { badRequest, json, readJson, serverError } from "./http";
import { appendContactToSheet } from "./googleSheets";
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
  const payload = await readJson<ContactPayload>(request);
  if (!payload) return badRequest(request, env, "Invalid JSON body");

  const name = payload.name?.trim() || "";
  const email = payload.email?.trim().toLowerCase() || "";
  const message = payload.message?.trim() || "";

  if (name.length < 2) return badRequest(request, env, "Name is required");
  if (!validEmail(email)) return badRequest(request, env, "Valid email is required");
  if (message.length < 5) return badRequest(request, env, "Message is required");

  try {
    await appendContactToSheet(env, [
      new Date().toISOString(),
      name,
      email,
      message,
      payload.sourcePage || "",
      payload.preferredLanguage || "",
      request.headers.get("CF-Connecting-IP") || "",
      request.headers.get("User-Agent") || "",
    ]);

    return json(request, env, { ok: true });
  } catch (error) {
    return serverError(request, env, error instanceof Error ? error.message : undefined);
  }
}
