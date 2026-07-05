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
  timeZone?: string;
  insuranceCompany?: string;
  insuranceMemberId?: string;
  dateOfBirth?: string;
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
  timeZone: string;
  insuranceCompany: string;
  insuranceMemberId: string;
  dateOfBirth: string;
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
    `Time zone: ${input.timeZone || "-"}`,
    `Insurance company: ${input.insuranceCompany || "-"}`,
    `Insurance member ID: ${input.insuranceMemberId || "-"}`,
    `Date of birth: ${input.dateOfBirth || "-"}`,
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
  const cf = request.cf as { timezone?: string } | undefined;
  const timeZone = (payload.timeZone?.trim() || cf?.timezone || "").slice(0, 80);
  const insuranceCompany = payload.insuranceCompany?.trim().slice(0, 120) || "";
  const insuranceMemberId = payload.insuranceMemberId?.trim().slice(0, 120) || "";
  const dateOfBirth = payload.dateOfBirth?.trim().slice(0, 32) || "";

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
  const row = [now, name, email, message, sourcePage, preferredLanguage, timeZone, insuranceCompany, insuranceMemberId, dateOfBirth, ip, userAgent];
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
         (id, name, email, message, source_page, preferred_language, time_zone, insurance_company, insurance_member_id, date_of_birth, ip, user_agent, sheet_status, sheet_error, email_status, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      )
      .bind(
        leadId,
        name,
        email,
        message,
        sourcePage,
        preferredLanguage,
        timeZone,
        insuranceCompany,
        insuranceMemberId,
        dateOfBirth,
        ip,
        userAgent,
        sheetStatus,
        sheetError,
        isBookingRequest(sourcePage, message) ? "pending" : "not_applicable",
        now,
        now,
      )
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
          timeZone,
          insuranceCompany,
          insuranceMemberId,
          dateOfBirth,
          ip,
          userAgent,
        }),
      });
      const recordEmailStatus = notify
        .then(async (result) => {
          const status = result.skipped ? "skipped" : "sent";
          const error = result.skipped ? `Missing SMTP config: ${(result.missing || []).join(", ")}`.slice(0, 500) : null;
          const notifiedAt = new Date().toISOString();
          await db
            .prepare("UPDATE contact_leads SET email_status = ?, email_error = ?, email_notified_at = ?, updated_at = ? WHERE id = ?")
            .bind(status, error, notifiedAt, notifiedAt, leadId)
            .run();
        })
        .catch(async (error) => {
          const message = error instanceof Error ? error.message.slice(0, 500) : "Booking notification email failed";
          const notifiedAt = new Date().toISOString();
          console.error("Booking notification email failed", message);
          await db
            .prepare("UPDATE contact_leads SET email_status = 'failed', email_error = ?, email_notified_at = ?, updated_at = ? WHERE id = ?")
            .bind(message, notifiedAt, notifiedAt, leadId)
            .run();
        });
      if (ctx) ctx.waitUntil(recordEmailStatus);
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
