import { badRequest, json, readJson, serverError } from "./http";
import { randomId } from "./crypto";
import { getDb } from "./db";
import { appendContactToSheet } from "./googleSheets";
import { checkRateLimit } from "./rateLimit";
import { sendSmtpEmail } from "./smtp";
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

function isBookingRequest(sourcePage: string, message: string) {
  return sourcePage.includes("/booking") || message.startsWith("Booking request:");
}

function bookingEmailBody(input: {
  leadId: string;
  createdAt: string;
  name: string;
  email: string;
  message: string;
  sourcePage: string;
  preferredLanguage: string;
  ip: string;
  userAgent: string;
}) {
  return [
    "A new booking request was submitted.",
    "",
    `Lead ID: ${input.leadId}`,
    `Submitted: ${input.createdAt}`,
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Source page: ${input.sourcePage || "-"}`,
    `Preferred language: ${input.preferredLanguage || "-"}`,
    `IP: ${input.ip || "-"}`,
    `User agent: ${input.userAgent || "-"}`,
    "",
    "Form details:",
    input.message,
    "",
    "Admin:",
    "https://admin.xtdiabetescare.com/",
  ].join("\n");
}

export async function submitContact(request: Request, env: Env, ctx?: ExecutionContext) {
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
  let sheetStatus = "pending";
  let sheetError: string | null = null;

  try {
    try {
      await appendContactToSheet(env, row);
      sheetStatus = "synced";
    } catch (error) {
      sheetStatus = "failed";
      sheetError = error instanceof Error ? error.message.slice(0, 500) : "Google Sheets append failed";
      console.error("Google Sheets contact append failed", sheetError);
    }

    const db = getDb(env);
    await db
      .prepare(
        `INSERT INTO contact_leads
         (id, name, email, message, source_page, preferred_language, ip, user_agent, sheet_status, sheet_error, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      )
      .bind(leadId, name, email, message, sourcePage, preferredLanguage, ip, userAgent, sheetStatus, sheetError, now, now)
      .run();

    if (isBookingRequest(sourcePage, message)) {
      const notify = sendSmtpEmail(env, {
        subject: `New booking request from ${name}`,
        replyTo: email,
        text: bookingEmailBody({
          leadId,
          createdAt: now,
          name,
          email,
          message,
          sourcePage,
          preferredLanguage,
          ip,
          userAgent,
        }),
      }).catch((error) => {
        console.error("Booking notification email failed", error instanceof Error ? error.message : error);
      });
      if (ctx) ctx.waitUntil(notify);
    }

    return json(request, env, { ok: true, id: leadId, sheetStatus });
  } catch (error) {
    if (sheetStatus === "synced") {
      console.error("Contact lead D1 backup failed after Google Sheets sync", error);
      return json(request, env, { ok: true, id: leadId, sheetStatus });
    }
    return serverError(request, env, error instanceof Error ? error.message : undefined);
  }
}
