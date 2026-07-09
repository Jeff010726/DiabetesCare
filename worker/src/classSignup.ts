import { randomId } from "./crypto";
import { getDb } from "./db";
import { badRequest, json, readJson, serverError } from "./http";
import { checkRateLimit } from "./rateLimit";
import { sendSmtpEmail } from "./smtp";
import type { Env } from "./types";

const agreementVersion = "DSMES-confidentiality-ip-2026-07-09";

type ClassSignupPayload = {
  fullName?: string;
  dateOfBirth?: string;
  email?: string;
  ageRange?: string;
  gender?: string;
  genderOther?: string;
  raceEthnicity?: string[];
  primaryLanguage?: string;
  primaryLanguageOther?: string;
  stateResidence?: string;
  educationLevel?: string;
  hasUsHealthInsurance?: string;
  diagnosedConditions?: string[];
  bloodSugarMonitoring?: string;
  diabetesMedications?: string[];
  agreementAccepted?: boolean;
  sourcePage?: string;
  preferredSiteLanguage?: string;
};

function validEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function trim(value: unknown, max = 500) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function trimList(value: unknown, maxItems = 12, maxLength = 160) {
  return Array.isArray(value)
    ? value.map((item) => trim(item, maxLength)).filter(Boolean).slice(0, maxItems)
    : [];
}

function formatList(value: string[]) {
  return value.length ? value.join(", ") : "-";
}

function signupEmailBody(input: {
  id: string;
  createdAt: string;
  fullName: string;
  dateOfBirth: string;
  email: string;
  ageRange: string;
  gender: string;
  genderOther: string;
  raceEthnicity: string[];
  primaryLanguage: string;
  primaryLanguageOther: string;
  stateResidence: string;
  educationLevel: string;
  hasUsHealthInsurance: string;
  diagnosedConditions: string[];
  bloodSugarMonitoring: string;
  diabetesMedications: string[];
  agreementAcceptedAt: string;
  sourcePage: string;
  preferredSiteLanguage: string;
  ip: string;
  userAgent: string;
}) {
  return [
    "A new DSMES class signup was submitted.",
    "",
    `Signup ID: ${input.id}`,
    `Submitted: ${input.createdAt}`,
    `Full name: ${input.fullName}`,
    `Date of birth: ${input.dateOfBirth}`,
    `Email: ${input.email}`,
    "",
    "Survey answers:",
    `1. Age: ${input.ageRange}`,
    `2. Gender: ${input.gender}${input.genderOther ? ` - ${input.genderOther}` : ""}`,
    `3. Race/ethnicity: ${formatList(input.raceEthnicity)}`,
    `4. Primary language: ${input.primaryLanguage}${input.primaryLanguageOther ? ` - ${input.primaryLanguageOther}` : ""}`,
    `5. State of residence: ${input.stateResidence}`,
    `6. Highest education level: ${input.educationLevel}`,
    `7. U.S. health insurance: ${input.hasUsHealthInsurance}`,
    `8. Conditions told by provider: ${formatList(input.diagnosedConditions)}`,
    `9. Blood sugar monitoring: ${input.bloodSugarMonitoring}`,
    `10. Diabetes medication: ${formatList(input.diabetesMedications)}`,
    "",
    "Agreement:",
    "Accepted: Yes",
    `Agreement version: ${agreementVersion}`,
    `Accepted at: ${input.agreementAcceptedAt}`,
    "",
    "Request metadata:",
    `Source page: ${input.sourcePage || "-"}`,
    `Site language: ${input.preferredSiteLanguage || "-"}`,
    `IP: ${input.ip || "-"}`,
    `User agent: ${input.userAgent || "-"}`,
    "",
    "Admin:",
    "https://admin.xtdiabetescare.com/",
  ].join("\n");
}

export async function submitClassSignup(request: Request, env: Env, ctx?: ExecutionContext) {
  const rateLimited = checkRateLimit(request, env, "class_signup", 4, 60);
  if (rateLimited) return rateLimited;

  const payload = await readJson<ClassSignupPayload>(request);
  if (!payload) return badRequest(request, env, "Invalid JSON body");

  const fullName = trim(payload.fullName, 180);
  const dateOfBirth = trim(payload.dateOfBirth, 32);
  const email = trim(payload.email, 254).toLowerCase();
  const ageRange = trim(payload.ageRange, 40);
  const gender = trim(payload.gender, 80);
  const genderOther = trim(payload.genderOther, 160);
  const raceEthnicity = trimList(payload.raceEthnicity);
  const primaryLanguage = trim(payload.primaryLanguage, 80);
  const primaryLanguageOther = trim(payload.primaryLanguageOther, 160);
  const stateResidence = trim(payload.stateResidence, 80);
  const educationLevel = trim(payload.educationLevel, 120);
  const hasUsHealthInsurance = trim(payload.hasUsHealthInsurance, 40);
  const diagnosedConditions = trimList(payload.diagnosedConditions);
  const bloodSugarMonitoring = trim(payload.bloodSugarMonitoring, 80);
  const diabetesMedications = trimList(payload.diabetesMedications);
  const sourcePage = trim(payload.sourcePage, 200);
  const preferredSiteLanguage = trim(payload.preferredSiteLanguage, 32);

  if (fullName.length < 2) return badRequest(request, env, "Full name is required");
  if (!dateOfBirth) return badRequest(request, env, "Date of birth is required");
  if (!validEmail(email)) return badRequest(request, env, "Valid email is required");
  if (!ageRange) return badRequest(request, env, "Age is required");
  if (!gender) return badRequest(request, env, "Gender is required");
  if (raceEthnicity.length < 1) return badRequest(request, env, "Race/ethnicity is required");
  if (!primaryLanguage) return badRequest(request, env, "Primary language is required");
  if (!stateResidence) return badRequest(request, env, "State is required");
  if (!educationLevel) return badRequest(request, env, "Education level is required");
  if (!hasUsHealthInsurance) return badRequest(request, env, "Health insurance status is required");
  if (diagnosedConditions.length < 1) return badRequest(request, env, "Condition selection is required");
  if (!bloodSugarMonitoring) return badRequest(request, env, "Blood sugar monitoring answer is required");
  if (diabetesMedications.length < 1) return badRequest(request, env, "Medication answer is required");
  if (!payload.agreementAccepted) return badRequest(request, env, "Agreement acceptance is required");

  const now = new Date().toISOString();
  const signupId = randomId("cls_");
  const agreementAcceptedAt = now;
  const ip = request.headers.get("CF-Connecting-IP") || "";
  const userAgent = request.headers.get("User-Agent") || "";

  try {
    const db = getDb(env);
    await db
      .prepare(
        `INSERT INTO class_signups
         (id, full_name, date_of_birth, email, age_range, gender, gender_other, race_ethnicity,
          primary_language, primary_language_other, state_residence, education_level, has_us_health_insurance,
          diagnosed_conditions, blood_sugar_monitoring, diabetes_medications, agreement_accepted, agreement_version,
          agreement_accepted_at, source_page, preferred_site_language, ip, user_agent, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      )
      .bind(
        signupId,
        fullName,
        dateOfBirth,
        email,
        ageRange,
        gender,
        genderOther,
        JSON.stringify(raceEthnicity),
        primaryLanguage,
        primaryLanguageOther,
        stateResidence,
        educationLevel,
        hasUsHealthInsurance,
        JSON.stringify(diagnosedConditions),
        bloodSugarMonitoring,
        JSON.stringify(diabetesMedications),
        1,
        agreementVersion,
        agreementAcceptedAt,
        sourcePage,
        preferredSiteLanguage,
        ip,
        userAgent,
        now,
        now,
      )
      .run();

    const emailInput = {
      id: signupId,
      createdAt: now,
      fullName,
      dateOfBirth,
      email,
      ageRange,
      gender,
      genderOther,
      raceEthnicity,
      primaryLanguage,
      primaryLanguageOther,
      stateResidence,
      educationLevel,
      hasUsHealthInsurance,
      diagnosedConditions,
      bloodSugarMonitoring,
      diabetesMedications,
      agreementAcceptedAt,
      sourcePage,
      preferredSiteLanguage,
      ip,
      userAgent,
    };
    const notify = sendSmtpEmail(env, {
      subject: `New DSMES class signup from ${fullName}`,
      replyTo: email,
      text: signupEmailBody(emailInput),
    });
    const recordEmailStatus = notify
      .then(async (result) => {
        const status = result.skipped ? "skipped" : "sent";
        const error = result.skipped ? `Missing SMTP config: ${(result.missing || []).join(", ")}`.slice(0, 500) : null;
        const notifiedAt = new Date().toISOString();
        await db
          .prepare("UPDATE class_signups SET email_status = ?, email_error = ?, email_notified_at = ?, updated_at = ? WHERE id = ?")
          .bind(status, error, notifiedAt, notifiedAt, signupId)
          .run();
      })
      .catch(async (error) => {
        const message = error instanceof Error ? error.message.slice(0, 500) : "Class signup notification email failed";
        const notifiedAt = new Date().toISOString();
        console.error("Class signup notification email failed", message);
        await db
          .prepare("UPDATE class_signups SET email_status = 'failed', email_error = ?, email_notified_at = ?, updated_at = ? WHERE id = ?")
          .bind(message, notifiedAt, notifiedAt, signupId)
          .run();
      });
    if (ctx) ctx.waitUntil(recordEmailStatus);

    return json(request, env, { ok: true, id: signupId });
  } catch (error) {
    return serverError(request, env, error instanceof Error ? error.message : undefined);
  }
}
