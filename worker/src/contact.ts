import { badRequest, json, readJson, serverError } from "./http";
import { randomId } from "./crypto";
import { getDb } from "./db";
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

  const now = new Date().toISOString();
  const leadId = randomId("lead_");
  const ip = request.headers.get("CF-Connecting-IP") || "";
  const userAgent = request.headers.get("User-Agent") || "";
  const row = [now, name, email, message, sourcePage, preferredLanguage, ip, userAgent];

  try {
    const db = getDb(env);
    await db
      .prepare(
        `INSERT INTO contact_leads
         (id, name, email, message, source_page, preferred_language, ip, user_agent, sheet_status, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      )
      .bind(leadId, name, email, message, sourcePage, preferredLanguage, ip, userAgent, "pending", now, now)
      .run();

    try {
      await appendContactToSheet(env, row);
      await db
        .prepare("UPDATE contact_leads SET sheet_status = ?, sheet_error = NULL, updated_at = ? WHERE id = ?")
        .bind("synced", new Date().toISOString(), leadId)
        .run();
    } catch (sheetError) {
      await db
        .prepare("UPDATE contact_leads SET sheet_status = ?, sheet_error = ?, updated_at = ? WHERE id = ?")
        .bind(
          "failed",
          sheetError instanceof Error ? sheetError.message.slice(0, 500) : "Google Sheets append failed",
          new Date().toISOString(),
          leadId,
        )
        .run();
    }

    return json(request, env, { ok: true, id: leadId });
  } catch (error) {
    return serverError(request, env, error instanceof Error ? error.message : undefined);
  }
}
