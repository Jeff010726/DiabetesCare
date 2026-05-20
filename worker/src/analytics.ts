import { randomId } from "./crypto";
import { getCurrentUser } from "./auth";
import { adminJson, requireAdmin } from "./admin";
import { getDb } from "./db";
import { badRequest, json, readJson } from "./http";
import { checkRateLimit } from "./rateLimit";
import type { Env, JsonValue } from "./types";

type AnalyticsPayload = {
  eventType?: string;
  eventName?: string;
  path?: string;
  pageTitle?: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  device?: string;
  browser?: string;
  language?: string;
  sessionId?: string;
  visitorId?: string;
  metadata?: Record<string, JsonValue>;
};

function trim(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function safeMetadata(metadata: unknown) {
  if (!metadata || typeof metadata !== "object" || Array.isArray(metadata)) return "{}";
  return JSON.stringify(metadata).slice(0, 2000);
}

function dateRange(url: URL) {
  const now = new Date();
  const endParam = url.searchParams.get("end");
  const startParam = url.searchParams.get("start");
  const end = endParam ? new Date(`${endParam}T23:59:59.999Z`) : now;
  const start = startParam ? new Date(`${startParam}T00:00:00.000Z`) : new Date(end.getTime() - 29 * 24 * 60 * 60 * 1000);
  return {
    start: Number.isNaN(start.getTime()) ? new Date(now.getTime() - 29 * 24 * 60 * 60 * 1000).toISOString() : start.toISOString(),
    end: Number.isNaN(end.getTime()) ? now.toISOString() : end.toISOString(),
  };
}

async function count(db: D1Database, sql: string, start: string, end: string) {
  const row = await db.prepare(sql).bind(start, end).first<{ count: number }>();
  return row?.count || 0;
}

export async function collectAnalytics(request: Request, env: Env) {
  const rateLimited = checkRateLimit(request, env, "analytics", 180, 60);
  if (rateLimited) return rateLimited;

  const payload = await readJson<AnalyticsPayload>(request);
  if (!payload) return badRequest(request, env, "Invalid JSON body");

  const eventType = trim(payload.eventType, 64);
  if (!eventType) return badRequest(request, env, "eventType is required");

  const user = await getCurrentUser(request, env).catch(() => null);
  const cf = request.cf || {};

  await getDb(env)
    .prepare(
      `INSERT INTO analytics_events
       (id, event_type, event_name, path, page_title, referrer, utm_source, utm_medium, utm_campaign,
        country, region, city, timezone, colo, device, browser, language, session_id, visitor_id, member_id, metadata_json, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .bind(
      randomId("evt_"),
      eventType,
      trim(payload.eventName, 120) || null,
      trim(payload.path, 300) || null,
      trim(payload.pageTitle, 200) || null,
      trim(payload.referrer, 500) || null,
      trim(payload.utmSource, 120) || null,
      trim(payload.utmMedium, 120) || null,
      trim(payload.utmCampaign, 160) || null,
      trim(cf.country, 8) || null,
      trim(cf.region, 120) || null,
      trim(cf.city, 120) || null,
      trim(cf.timezone, 80) || null,
      trim(cf.colo, 16) || null,
      trim(payload.device, 40) || null,
      trim(payload.browser, 80) || null,
      trim(payload.language, 40) || null,
      trim(payload.sessionId, 120) || null,
      trim(payload.visitorId, 120) || null,
      user ? String(user.id) : null,
      safeMetadata(payload.metadata),
      new Date().toISOString(),
    )
    .run();

  return json(request, env, { ok: true });
}

export async function adminAnalyticsDashboard(request: Request, env: Env) {
  const unauthorized = await requireAdmin(request, env);
  if (unauthorized) return unauthorized;

  const url = new URL(request.url);
  const { start, end } = dateRange(url);
  const db = getDb(env);

  const [
    pageViews,
    visitors,
    sessions,
    bookingClicks,
    ctaClicks,
    contactSubmits,
    memberRegisters,
    leads,
    registrations,
    topPages,
    topCountries,
    topReferrers,
    topDevices,
    timeline,
  ] = await Promise.all([
    count(db, "SELECT COUNT(*) AS count FROM analytics_events WHERE event_type = 'page_view' AND created_at BETWEEN ? AND ?", start, end),
    count(db, "SELECT COUNT(DISTINCT visitor_id) AS count FROM analytics_events WHERE visitor_id IS NOT NULL AND created_at BETWEEN ? AND ?", start, end),
    count(db, "SELECT COUNT(DISTINCT session_id) AS count FROM analytics_events WHERE session_id IS NOT NULL AND created_at BETWEEN ? AND ?", start, end),
    count(db, "SELECT COUNT(*) AS count FROM analytics_events WHERE event_type = 'booking_click' AND created_at BETWEEN ? AND ?", start, end),
    count(db, "SELECT COUNT(*) AS count FROM analytics_events WHERE event_type = 'cta_click' AND created_at BETWEEN ? AND ?", start, end),
    count(db, "SELECT COUNT(*) AS count FROM analytics_events WHERE event_type = 'contact_submit' AND created_at BETWEEN ? AND ?", start, end),
    count(db, "SELECT COUNT(*) AS count FROM analytics_events WHERE event_type = 'member_register' AND created_at BETWEEN ? AND ?", start, end),
    count(db, "SELECT COUNT(*) AS count FROM contact_leads WHERE created_at BETWEEN ? AND ?", start, end),
    count(db, "SELECT COUNT(*) AS count FROM users WHERE created_at BETWEEN ? AND ?", start, end),
    db.prepare("SELECT COALESCE(path, '/') AS label, COUNT(*) AS count FROM analytics_events WHERE event_type = 'page_view' AND created_at BETWEEN ? AND ? GROUP BY label ORDER BY count DESC LIMIT 10").bind(start, end).all(),
    db.prepare("SELECT COALESCE(country, 'Unknown') AS label, COUNT(*) AS count FROM analytics_events WHERE created_at BETWEEN ? AND ? GROUP BY label ORDER BY count DESC LIMIT 10").bind(start, end).all(),
    db.prepare("SELECT COALESCE(NULLIF(referrer, ''), 'Direct') AS label, COUNT(*) AS count FROM analytics_events WHERE event_type = 'page_view' AND created_at BETWEEN ? AND ? GROUP BY label ORDER BY count DESC LIMIT 10").bind(start, end).all(),
    db.prepare("SELECT COALESCE(device, 'Unknown') AS label, COUNT(*) AS count FROM analytics_events WHERE created_at BETWEEN ? AND ? GROUP BY label ORDER BY count DESC LIMIT 10").bind(start, end).all(),
    db.prepare(
      `SELECT substr(created_at, 1, 10) AS date,
              SUM(CASE WHEN event_type = 'page_view' THEN 1 ELSE 0 END) AS pageViews,
              COUNT(DISTINCT visitor_id) AS visitors,
              SUM(CASE WHEN event_type = 'booking_click' THEN 1 ELSE 0 END) AS bookingClicks,
              SUM(CASE WHEN event_type = 'contact_submit' THEN 1 ELSE 0 END) AS contactSubmits
       FROM analytics_events
       WHERE created_at BETWEEN ? AND ?
       GROUP BY date
       ORDER BY date ASC`,
    ).bind(start, end).all(),
  ]);

  return adminJson(request, env, {
    range: { start, end },
    metrics: {
      visitors,
      sessions,
      pageViews,
      bookingClicks,
      ctaClicks,
      contactSubmits,
      memberRegisters,
      leads,
      registrations,
      contactConversionRate: pageViews ? Number(((contactSubmits / pageViews) * 100).toFixed(2)) : 0,
      bookingConversionRate: pageViews ? Number(((bookingClicks / pageViews) * 100).toFixed(2)) : 0,
    },
    topPages: topPages.results || [],
    topCountries: topCountries.results || [],
    topReferrers: topReferrers.results || [],
    topDevices: topDevices.results || [],
    timeline: timeline.results || [],
  });
}
