import { getDb } from "./db";
import { randomId, sha256, verifyPassword } from "./crypto";
import { badRequest, json, readJson, responseHeaders } from "./http";
import { checkRateLimit } from "./rateLimit";
import type { Env } from "./types";

type LoginPayload = {
  email?: string;
  password?: string;
};

const adminCookieName = "xt_admin_session";
const adminSessionMaxAgeSeconds = 60 * 60 * 8;

function readCookie(request: Request, name: string) {
  const cookie = request.headers.get("Cookie") || "";
  const match = cookie.split(";").map((part) => part.trim()).find((part) => part.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.slice(name.length + 1)) : null;
}

function adminCookie(token: string) {
  return `${adminCookieName}=${encodeURIComponent(token)}; Path=/; Max-Age=${adminSessionMaxAgeSeconds}; HttpOnly; Secure; SameSite=Lax`;
}

function clearAdminCookie() {
  return `${adminCookieName}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax`;
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function adminEmail(env: Env) {
  return normalizeEmail(env.ADMIN_EMAIL || "");
}

async function validAdminPassword(env: Env, password: string) {
  if (env.ADMIN_PASSWORD_HASH) return verifyPassword(password, env.ADMIN_PASSWORD_HASH);
  return Boolean(env.ADMIN_PASSWORD && password === env.ADMIN_PASSWORD);
}

async function createAdminSession(env: Env, email: string) {
  const token = randomId("adm_");
  const sessionHash = await sha256(token);
  const expiresAt = new Date(Date.now() + adminSessionMaxAgeSeconds * 1000).toISOString();
  await getDb(env)
    .prepare("INSERT INTO admin_sessions (id, email, session_hash, expires_at) VALUES (?, ?, ?, ?)")
    .bind(randomId("ads_"), email, sessionHash, expiresAt)
    .run();
  return token;
}

async function getAdminSession(request: Request, env: Env) {
  const token = readCookie(request, adminCookieName);
  if (!token) return null;

  const sessionHash = await sha256(token);
  const row = await getDb(env)
    .prepare("SELECT email FROM admin_sessions WHERE session_hash = ? AND expires_at > datetime('now') LIMIT 1")
    .bind(sessionHash)
    .first<{ email: string }>();
  return row;
}

export async function requireAdmin(request: Request, env: Env) {
  const session = await getAdminSession(request, env);
  return session ? null : adminJson(request, env, { error: "Unauthorized" }, { status: 401 });
}

export function adminJson(request: Request, env: Env, data: unknown, init: ResponseInit = {}) {
  return json(request, env, data, {
    ...init,
    headers: {
      "Cache-Control": "no-store",
      ...init.headers,
    },
  });
}

function htmlResponse(request: Request, env: Env, body: string) {
  return new Response(body, {
    headers: {
      ...responseHeaders(request, env),
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "Content-Security-Policy":
        "default-src 'self'; img-src 'self' data: https://flagcdn.com; style-src 'unsafe-inline'; script-src 'unsafe-inline'; frame-ancestors 'none'; base-uri 'none'; form-action 'self'",
    },
  });
}

export async function adminLogin(request: Request, env: Env) {
  const rateLimited = checkRateLimit(request, env, "admin_login", 8, 60);
  if (rateLimited) return rateLimited;

  const payload = await readJson<LoginPayload>(request);
  if (!payload) return badRequest(request, env, "Invalid JSON body");

  const configuredEmail = adminEmail(env);
  if (!configuredEmail || (!env.ADMIN_PASSWORD && !env.ADMIN_PASSWORD_HASH)) {
    return adminJson(request, env, { error: "Admin credentials are not configured" }, { status: 503 });
  }

  const email = normalizeEmail(payload.email || "");
  const password = payload.password || "";
  if (email !== configuredEmail || !(await validAdminPassword(env, password))) {
    return adminJson(request, env, { error: "Invalid email or password" }, { status: 400 });
  }

  const token = await createAdminSession(env, configuredEmail);
  return adminJson(request, env, { ok: true, admin: { email: configuredEmail } }, { headers: { "Set-Cookie": adminCookie(token) } });
}

export async function adminLogout(request: Request, env: Env) {
  const token = readCookie(request, adminCookieName);
  if (token) {
    await getDb(env).prepare("DELETE FROM admin_sessions WHERE session_hash = ?").bind(await sha256(token)).run();
  }
  return adminJson(request, env, { ok: true }, { headers: { "Set-Cookie": clearAdminCookie() } });
}

export async function adminMe(request: Request, env: Env) {
  const session = await getAdminSession(request, env);
  return adminJson(request, env, { admin: session ? { email: session.email } : null });
}

export async function adminStats(request: Request, env: Env) {
  const unauthorized = await requireAdmin(request, env);
  if (unauthorized) return unauthorized;

  const db = getDb(env);
  const [members, leads, failedSheets] = await Promise.all([
    db.prepare("SELECT COUNT(*) AS count FROM users").first<{ count: number }>(),
    db.prepare("SELECT COUNT(*) AS count FROM contact_leads").first<{ count: number }>(),
    db.prepare("SELECT COUNT(*) AS count FROM contact_leads WHERE sheet_status = 'failed'").first<{ count: number }>(),
  ]);

  return adminJson(request, env, {
    members: members?.count || 0,
    contactLeads: leads?.count || 0,
    failedSheetSyncs: failedSheets?.count || 0,
  });
}

export async function adminContactLeads(request: Request, env: Env) {
  const unauthorized = await requireAdmin(request, env);
  if (unauthorized) return unauthorized;

  const limit = Math.min(Math.max(Number(new URL(request.url).searchParams.get("limit") || 50), 1), 100);
  const rows = await getDb(env)
    .prepare(
      `SELECT id, name, email, message, source_page, preferred_language, sheet_status, sheet_error, created_at
       FROM contact_leads
       ORDER BY created_at DESC
       LIMIT ?`,
    )
    .bind(limit)
    .all();

  return adminJson(request, env, { leads: rows.results || [] });
}

export async function adminMembers(request: Request, env: Env) {
  const unauthorized = await requireAdmin(request, env);
  if (unauthorized) return unauthorized;

  const limit = Math.min(Math.max(Number(new URL(request.url).searchParams.get("limit") || 50), 1), 100);
  const rows = await getDb(env)
    .prepare(
      `SELECT id, email, phone, first_name, last_name, preferred_language, marketing_opt_in, created_at
       FROM users
       ORDER BY created_at DESC
       LIMIT ?`,
    )
    .bind(limit)
    .all();

  return adminJson(request, env, { members: rows.results || [] });
}

export function adminPage(request: Request, env: Env) {
  return htmlResponse(
    request,
    env,
    `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex,nofollow">
  <title>XT Diabetes Care Admin</title>
  <style>
    :root { color-scheme: light; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
    * { box-sizing: border-box; }
    body { margin: 0; background: #f3f4f6; color: #111827; }
    button, input, select { font: inherit; }
    .shell { min-height: 100vh; }
    .side { position: fixed; inset: 0 auto 0 0; width: 248px; height: 100vh; overflow-y: auto; background: #111827; color: white; padding: 22px 18px; display: flex; flex-direction: column; gap: 22px; }
    .brand { font-size: 18px; font-weight: 800; letter-spacing: 0; padding: 2px 10px; }
    .nav { display: grid; gap: 8px; }
    .nav button, .logout { border: 0; border-radius: 8px; padding: 10px 12px; color: inherit; background: transparent; text-align: left; cursor: pointer; font-weight: 700; }
    .nav button.active, .nav button:hover, .logout:hover { background: rgba(255,255,255,.12); }
    .logout { margin-top: auto; }
    .main { margin-left: 248px; padding: 24px 28px 32px; min-width: 0; }
    .top { display: flex; align-items: flex-start; justify-content: space-between; gap: 18px; margin-bottom: 18px; }
    h1 { margin: 0; font-size: 26px; line-height: 1.2; }
    .muted { color: #667085; }
    .caption { font-size: 12px; color: #667085; margin-top: 4px; }
    .controls { display: flex; flex-wrap: wrap; justify-content: flex-end; align-items: end; gap: 10px; }
    .controls label { margin: 0; font-size: 12px; color: #475467; font-weight: 700; }
    .controls input { min-width: 145px; background: white; }
    .quick { border: 1px solid #d0d5dd; border-radius: 8px; padding: 10px 12px; background: white; color: #111827; font-weight: 800; cursor: pointer; }
    .quick:hover { background: #f9fafb; }
    .primary { border: 0; border-radius: 8px; padding: 11px 14px; background: #2563eb; color: white; font-weight: 800; cursor: pointer; }
    .primary:disabled { opacity: .65; cursor: not-allowed; }
    .insights { display: grid; gap: 12px; grid-template-columns: repeat(4, minmax(0, 1fr)); margin-bottom: 16px; }
    .insight { background: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 14px; min-height: 82px; box-shadow: 0 12px 28px -26px rgba(17,24,39,.45); }
    .insight strong { display: block; font-size: 12px; color: #475467; text-transform: uppercase; letter-spacing: .04em; margin-bottom: 7px; }
    .metric-grid { display: grid; gap: 14px; grid-template-columns: repeat(4, minmax(0, 1fr)); margin-bottom: 16px; }
    .metric-card { background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; box-shadow: 0 12px 28px -26px rgba(17,24,39,.45); min-height: 150px; display: grid; gap: 8px; }
    .metric-head { display: flex; align-items: start; justify-content: space-between; gap: 10px; color: #475467; font-weight: 800; font-size: 13px; }
    .metric-value { font-size: 30px; line-height: 1; font-weight: 850; letter-spacing: 0; }
    .change { display: inline-flex; align-items: center; border-radius: 999px; padding: 3px 7px; font-size: 12px; font-weight: 850; background: #f2f4f7; color: #475467; white-space: nowrap; }
    .change.up { color: #067647; background: #ecfdf3; }
    .change.down { color: #b42318; background: #fef3f2; }
    .spark { width: 100%; height: 36px; }
    .chart-grid { display: grid; gap: 16px; grid-template-columns: repeat(2, minmax(0, 1fr)); align-items: start; }
    .panel { background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; box-shadow: 0 12px 28px -26px rgba(17,24,39,.45); min-width: 0; }
    .panel.wide { grid-column: 1 / -1; }
    .panel h2 { margin: 0; font-size: 16px; }
    .panel-sub { margin-top: 4px; font-size: 13px; color: #667085; }
    .chart { width: 100%; height: 250px; margin-top: 14px; }
    .chart-point { filter: drop-shadow(0 1px 2px rgba(17,24,39,.18)); }
    .axis-label { fill: #667085; font-size: 11px; font-weight: 700; }
    .legend { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 10px; color: #475467; font-size: 12px; font-weight: 700; }
    .dot { display: inline-block; width: 9px; height: 9px; border-radius: 999px; margin-right: 5px; }
    .bar-list { display: grid; gap: 12px; margin-top: 14px; }
    .bar-row { display: grid; gap: 6px; }
    .bar-meta { display: flex; justify-content: space-between; gap: 12px; font-size: 13px; }
    .bar-label { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: #111827; }
    .bar-value { color: #475467; font-weight: 800; white-space: nowrap; }
    .bar-track { height: 9px; background: #eef2f7; border-radius: 999px; overflow: hidden; }
    .bar-fill { height: 100%; background: #2563eb; border-radius: inherit; }
    .funnel { display: grid; gap: 12px; margin-top: 14px; }
    .funnel-step { display: grid; grid-template-columns: 120px 1fr 72px; gap: 12px; align-items: center; font-size: 13px; }
    .funnel-track { height: 28px; background: #eef2f7; border-radius: 8px; overflow: hidden; }
    .funnel-fill { height: 100%; display: flex; align-items: center; justify-content: flex-end; padding-right: 8px; color: white; font-size: 12px; font-weight: 850; background: #0f766e; min-width: 2px; }
    .tablewrap { overflow: auto; background: white; border: 1px solid #e5e7eb; border-radius: 8px; }
    table { width: 100%; border-collapse: collapse; min-width: 880px; }
    th, td { padding: 12px 14px; border-bottom: 1px solid #eef0f4; text-align: left; font-size: 14px; vertical-align: top; }
    th { background: #f9fafb; color: #475467; font-size: 12px; text-transform: uppercase; letter-spacing: .04em; }
    td.message { max-width: 360px; white-space: pre-wrap; }
    .badge { display: inline-flex; border-radius: 999px; padding: 3px 8px; font-size: 12px; font-weight: 700; background: #eef2ff; color: #4338ca; }
    .badge.failed { background: #fff1f2; color: #be123c; }
    .login { min-height: 100vh; display: grid; place-items: center; padding: 24px; }
    .login .card { width: min(420px, 100%); background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; }
    label { display: grid; gap: 6px; margin-top: 14px; font-weight: 700; font-size: 14px; }
    input { width: 100%; border: 1px solid #d0d5dd; border-radius: 8px; padding: 11px 12px; }
    .login .primary { width: 100%; margin-top: 18px; }
    .error { margin-top: 12px; color: #b42318; font-weight: 700; font-size: 14px; }
    .empty { color: #667085; padding: 16px 0; }
    .hidden { display: none; }
    @media (max-width: 1180px) { .metric-grid, .insights { grid-template-columns: repeat(2, minmax(0, 1fr)); } .chart-grid { grid-template-columns: 1fr; } }
    @media (max-width: 840px) { .side { position: static; width: auto; height: auto; max-height: none; } .main { margin-left: 0; } .metric-grid, .insights { grid-template-columns: 1fr; } .top { display: grid; } .controls { justify-content: start; } }
  </style>
</head>
<body>
  <div id="login" class="login hidden">
    <form class="card" id="login-form">
      <h1>Admin Login</h1>
      <p class="muted">XT Diabetes Care operations dashboard</p>
      <label>Email<input id="email" type="email" autocomplete="username" required></label>
      <label>Password<input id="password" type="password" autocomplete="current-password" required></label>
      <button class="primary" id="login-button" type="submit">Sign in</button>
      <div class="error" id="login-error"></div>
    </form>
  </div>

  <div id="app" class="shell hidden">
    <aside class="side">
      <div class="brand">XT Diabetes Admin</div>
      <nav class="nav">
        <button type="button" data-view="dashboard" class="active">Dashboard</button>
        <button type="button" data-view="traffic">Traffic</button>
        <button type="button" data-view="sources">Sources</button>
        <button type="button" data-view="locations">Locations</button>
        <button type="button" data-view="conversions">Conversions</button>
        <button type="button" data-view="leads">Contact Leads</button>
        <button type="button" data-view="members">Members</button>
      </nav>
      <button type="button" class="logout" id="logout">Sign out</button>
    </aside>
    <main class="main">
      <div class="top">
        <div>
          <h1 id="title">Dashboard</h1>
          <div class="muted" id="admin-email"></div>
          <div class="caption" id="range-caption"></div>
        </div>
        <div class="controls">
          <label>Start<input id="start-date" type="date"></label>
          <label>End<input id="end-date" type="date"></label>
          <button type="button" class="quick" id="today">Today</button>
          <button type="button" class="quick" id="last-7">7 days</button>
          <button type="button" class="quick" id="last-30">30 days</button>
          <button type="button" class="primary" id="refresh">Refresh</button>
        </div>
      </div>
      <section id="content"></section>
    </main>
  </div>

  <script>
    const state = { view: "dashboard", admin: null, analytics: null };
    const $ = (id) => document.getElementById(id);
    const text = (value) => value == null || value === "" ? "-" : String(value);
    const num = (value) => Number(value || 0).toLocaleString();
    const date = (value) => value ? new Date(value).toLocaleString() : "-";
    async function api(path, options = {}) {
      const res = await fetch(path, { credentials: "include", headers: options.body ? { "Content-Type": "application/json" } : undefined, ...options });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Request failed");
      return data;
    }
    function showLogin() { $("login").classList.remove("hidden"); $("app").classList.add("hidden"); }
    function showApp() { $("login").classList.add("hidden"); $("app").classList.remove("hidden"); $("admin-email").textContent = state.admin?.email || ""; }
    function isoDate(date) { return date.toISOString().slice(0, 10); }
    function escapeHtml(value) {
      return text(value).replace(/[&<>"']/g, function (char) {
        return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char];
      });
    }
    function formatRangeLabel(data) {
      if (!data || !data.range) return "";
      const start = data.range.start.slice(0, 10);
      const end = data.range.end.slice(0, 10);
      const prevStart = data.range.previousStart.slice(0, 10);
      const prevEnd = data.range.previousEnd.slice(0, 10);
      return start + " to " + end + " compared with " + prevStart + " to " + prevEnd;
    }
    function setRange(days) {
      const end = new Date();
      const start = new Date(end.getTime() - (days - 1) * 24 * 60 * 60 * 1000);
      $("start-date").value = isoDate(start);
      $("end-date").value = isoDate(end);
    }
    function rangeQuery() {
      const params = new URLSearchParams();
      if ($("start-date").value) params.set("start", $("start-date").value);
      if ($("end-date").value) params.set("end", $("end-date").value);
      return params.toString() ? "?" + params.toString() : "";
    }
    async function getAnalytics() {
      state.analytics = await api("/admin/api/analytics/dashboard" + rangeQuery());
      $("range-caption").textContent = formatRangeLabel(state.analytics);
      return state.analytics;
    }
    function metricValue(metric, suffix) {
      return suffix ? Number(metric.value || 0).toLocaleString(undefined, { maximumFractionDigits: 2 }) + suffix : num(metric.value);
    }
    function changePill(metric) {
      const change = Number(metric.change || 0);
      const cls = change > 0 ? " up" : change < 0 ? " down" : "";
      const sign = change > 0 ? "+" : "";
      return '<span class="change' + cls + '">' + sign + change + '%</span>';
    }
    function sparkline(points) {
      const values = (points || []).map(function (point) { return Number(point.value || 0); });
      if (!values.length) return '<svg class="spark" viewBox="0 0 120 36" aria-hidden="true"></svg>';
      const max = Math.max.apply(null, values.concat([1]));
      const min = Math.min.apply(null, values);
      const span = Math.max(max - min, 1);
      const path = values.map(function (value, index) {
        const x = values.length === 1 ? 60 : (index / (values.length - 1)) * 116 + 2;
        const y = 32 - ((value - min) / span) * 26;
        return (index ? "L" : "M") + x.toFixed(1) + " " + y.toFixed(1);
      }).join(" ");
      return '<svg class="spark" viewBox="0 0 120 36" aria-hidden="true"><path d="' + path + '" fill="none" stroke="#2563eb" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    }
    function metricCard(title, metric, spark, suffix) {
      return '<article class="metric-card"><div class="metric-head"><span>' + escapeHtml(title) + '</span>' + changePill(metric) + '</div><div class="metric-value">' + metricValue(metric, suffix) + '</div><div class="caption">Previous: ' + metricValue({ value: metric.previous }, suffix) + '</div>' + sparkline(spark) + '</article>';
    }
    function panel(title, subtitle, body, wide) {
      return '<article class="panel' + (wide ? ' wide' : '') + '"><h2>' + escapeHtml(title) + '</h2><div class="panel-sub">' + escapeHtml(subtitle || "") + '</div>' + body + '</article>';
    }
    function barList(items, valueKey) {
      const rows = items || [];
      if (!rows.length) return '<div class="empty">No data yet.</div>';
      const max = Math.max.apply(null, rows.map(function (row) { return Number(row[valueKey] || row.count || 0); }).concat([1]));
      return '<div class="bar-list">' + rows.map(function (row) {
        const value = Number(row[valueKey] || row.count || 0);
        const width = Math.max(2, Math.round((value / max) * 100));
        return '<div class="bar-row"><div class="bar-meta"><span class="bar-label">' + escapeHtml(row.label) + '</span><span class="bar-value">' + num(value) + '</span></div><div class="bar-track"><div class="bar-fill" style="width:' + width + '%"></div></div></div>';
      }).join("") + '</div>';
    }
    function lineChart(rows) {
      const data = rows || [];
      const series = [
        { key: "pageViews", label: "Page views", color: "#2563eb" },
        { key: "visitors", label: "Visitors", color: "#0f766e" },
        { key: "sessions", label: "Sessions", color: "#9333ea" }
      ];
      if (!data.length) return '<div class="empty">No traffic data yet.</div>';
      const hasValues = data.some(function (row) { return series.some(function (item) { return Number(row[item.key] || 0) > 0; }); });
      if (!hasValues) return '<div class="empty">No traffic activity in this date range.</div>';
      const width = 720;
      const height = 250;
      const pad = 34;
      const max = Math.max.apply(null, data.flatMap(function (row) { return series.map(function (item) { return Number(row[item.key] || 0); }); }).concat([1]));
      if (data.length === 1) {
        const values = series.map(function (item) { return { label: item.label, color: item.color, value: Number(data[0][item.key] || 0) }; });
        const barWidth = 86;
        const gap = 62;
        const total = values.length * barWidth + (values.length - 1) * gap;
        const startX = (width - total) / 2;
        const bars = values.map(function (item, index) {
          const barHeight = Math.max(4, (item.value / max) * (height - pad * 2 - 18));
          const x = startX + index * (barWidth + gap);
          const y = height - pad - barHeight;
          return '<rect x="' + x + '" y="' + y.toFixed(1) + '" width="' + barWidth + '" height="' + barHeight.toFixed(1) + '" rx="8" fill="' + item.color + '"/><text class="axis-label" x="' + (x + barWidth / 2) + '" y="' + (y - 8).toFixed(1) + '" text-anchor="middle">' + num(item.value) + '</text><text class="axis-label" x="' + (x + barWidth / 2) + '" y="' + (height - 8) + '" text-anchor="middle">' + item.label + '</text>';
        }).join("");
        return '<svg class="chart" viewBox="0 0 ' + width + ' ' + height + '" role="img" aria-label="Traffic summary for one day"><line x1="' + pad + '" y1="' + (height - pad) + '" x2="' + (width - pad) + '" y2="' + (height - pad) + '" stroke="#e5e7eb"/>' + bars + '</svg>';
      }
      const grid = [0.25, 0.5, 0.75, 1].map(function (ratio) {
        const y = height - pad - ratio * (height - pad * 2);
        return '<line x1="' + pad + '" y1="' + y.toFixed(1) + '" x2="' + (width - pad) + '" y2="' + y.toFixed(1) + '" stroke="#eef2f7"/>';
      }).join("");
      const paths = series.map(function (item) {
        const coords = data.map(function (row, index) {
          const x = data.length === 1 ? width / 2 : pad + (index / (data.length - 1)) * (width - pad * 2);
          const y = height - pad - (Number(row[item.key] || 0) / max) * (height - pad * 2);
          return { x: x, y: y, value: Number(row[item.key] || 0) };
        });
        const points = coords.map(function (point, index) { return (index ? "L" : "M") + point.x.toFixed(1) + " " + point.y.toFixed(1); }).join(" ");
        const circles = coords.filter(function (point) { return point.value > 0 || data.length === 1; }).map(function (point) {
          return '<circle class="chart-point" cx="' + point.x.toFixed(1) + '" cy="' + point.y.toFixed(1) + '" r="4" fill="white" stroke="' + item.color + '" stroke-width="2.5"/>';
        }).join("");
        return '<path d="' + points + '" fill="none" stroke="' + item.color + '" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>' + circles;
      }).join("");
      const labels = series.map(function (item) { return '<span><i class="dot" style="background:' + item.color + '"></i>' + item.label + '</span>'; }).join("");
      return '<svg class="chart" viewBox="0 0 ' + width + ' ' + height + '" role="img" aria-label="Traffic over time">' + grid + '<line x1="' + pad + '" y1="' + (height - pad) + '" x2="' + (width - pad) + '" y2="' + (height - pad) + '" stroke="#d0d5dd"/><line x1="' + pad + '" y1="' + pad + '" x2="' + pad + '" y2="' + (height - pad) + '" stroke="#d0d5dd"/><text class="axis-label" x="' + pad + '" y="' + (height - 8) + '" text-anchor="start">' + escapeHtml(data[0].date) + '</text><text class="axis-label" x="' + (width - pad) + '" y="' + (height - 8) + '" text-anchor="end">' + escapeHtml(data[data.length - 1].date) + '</text>' + paths + '</svg><div class="legend">' + labels + '</div>';
    }
    function funnelChart(items) {
      const rows = items || [];
      const max = Math.max.apply(null, rows.map(function (row) { return Number(row.value || 0); }).concat([1]));
      return '<div class="funnel">' + rows.map(function (row) {
        const value = Number(row.value || 0);
        const width = Math.max(2, Math.round((value / max) * 100));
        return '<div class="funnel-step"><strong>' + escapeHtml(row.label) + '</strong><div class="funnel-track"><div class="funnel-fill" style="width:' + width + '%">' + width + '%</div></div><span class="bar-value">' + num(value) + '</span></div>';
      }).join("") + '</div>';
    }
    function renderRows(headers, rows) {
      $("content").innerHTML = '<section class="tablewrap"><table><thead id="thead"></thead><tbody id="tbody"></tbody></table></section>';
      $("thead").innerHTML = "<tr>" + headers.map(function (h) { return "<th>" + escapeHtml(h) + "</th>"; }).join("") + "</tr>";
      $("tbody").replaceChildren.apply($("tbody"), rows);
    }
    function metricsHtml(data) {
      return '<section class="metric-grid">'
        + metricCard("Visitors", data.metrics.visitors, data.sparklines.visitors)
        + metricCard("Sessions", data.metrics.sessions, data.sparklines.sessions)
        + metricCard("Page views", data.metrics.pageViews, data.sparklines.pageViews)
        + metricCard("Booking clicks", data.metrics.bookingClicks, data.sparklines.bookingClicks)
        + metricCard("Contact leads", data.metrics.leads, data.sparklines.leads)
        + metricCard("Registrations", data.metrics.registrations, data.sparklines.registrations)
        + metricCard("Booking CTR", data.metrics.bookingRate, data.sparklines.bookingClicks, "%")
        + metricCard("Lead conversion", data.metrics.leadRate, data.sparklines.leads, "%")
        + '</section>';
    }
    function insightsHtml(data) {
      return '<section class="insights">' + (data.insights || []).slice(0, 4).map(function (item, index) {
        return '<article class="insight"><strong>Insight ' + (index + 1) + '</strong><div>' + escapeHtml(item) + '</div></article>';
      }).join("") + '</section>';
    }
    function renderDashboard(data) {
      $("title").textContent = "Dashboard";
      $("content").innerHTML = insightsHtml(data) + metricsHtml(data) + '<section class="chart-grid">'
        + panel("Traffic over time", "Page views, visitors, and sessions", lineChart(data.timeline), true)
        + panel("Conversion funnel", "Sessions through registration", funnelChart(data.funnel), false)
        + panel("Top pages", "Pages ranked by views", barList(data.topPages, "pageViews"), false)
        + panel("Traffic sources", "Grouped acquisition channels", barList(data.sourceChannels, "count"), false)
        + panel("Locations", "Top countries by activity", barList(data.topCountries, "count"), false)
        + panel("Devices", "Desktop, mobile, and tablet split", barList(data.topDevices, "count"), false)
        + '</section>';
    }
    function renderTraffic(data) {
      $("title").textContent = "Traffic";
      $("content").innerHTML = metricsHtml(data) + '<section class="chart-grid">'
        + panel("Traffic over time", "Page views, visitors, and sessions", lineChart(data.timeline), true)
        + panel("Top pages", "Highest-viewed pages", barList(data.topPages, "pageViews"), false)
        + panel("Landing pages", "Entry pages by session count", barList(data.landingPages, "sessions"), false)
        + panel("Browsers", "Browser breakdown", barList(data.topBrowsers, "count"), false)
        + panel("Devices", "Device breakdown", barList(data.topDevices, "count"), false)
        + '</section>';
    }
    function renderSources(data) {
      $("title").textContent = "Sources";
      $("content").innerHTML = metricsHtml(data) + '<section class="chart-grid">'
        + panel("Source channels", "Direct, search, social, referral, and campaigns", barList(data.sourceChannels, "count"), false)
        + panel("Referrers", "Top referring URLs", barList(data.topReferrers, "count"), false)
        + panel("Traffic over time", "Traffic trend for selected range", lineChart(data.timeline), true)
        + '</section>';
    }
    function renderLocations(data) {
      $("title").textContent = "Locations";
      $("content").innerHTML = metricsHtml(data) + '<section class="chart-grid">'
        + panel("Countries", "Country-level traffic", barList(data.topCountries, "count"), false)
        + panel("Regions", "State or region activity", barList(data.topRegions, "count"), false)
        + panel("Cities", "City-level activity", barList(data.topCities, "count"), false)
        + panel("Traffic over time", "Location-filterable reports can be added later", lineChart(data.timeline), false)
        + '</section>';
    }
    function renderConversions(data) {
      $("title").textContent = "Conversions";
      $("content").innerHTML = metricsHtml(data) + '<section class="chart-grid">'
        + panel("Conversion funnel", "Sessions to booking, lead, and account creation", funnelChart(data.funnel), true)
        + panel("Booking clicks", "Booking intent over time", barList(data.timeline.map(function (row) { return { label: row.date, count: row.bookingClicks }; }), "count"), false)
        + panel("Contact submits", "Tracked contact form submits", barList(data.timeline.map(function (row) { return { label: row.date, count: row.contactSubmits }; }), "count"), false)
        + '</section>';
    }
    async function loadAnalyticsView() {
      const data = await getAnalytics();
      if (state.view === "traffic") return renderTraffic(data);
      if (state.view === "sources") return renderSources(data);
      if (state.view === "locations") return renderLocations(data);
      if (state.view === "conversions") return renderConversions(data);
      return renderDashboard(data);
    }
    async function loadLeads() {
      $("title").textContent = "Contact Leads";
      $("range-caption").textContent = "";
      const data = await api("/admin/api/contact-leads?limit=100");
      const rows = data.leads.map((lead) => {
        const tr = document.createElement("tr");
        const cells = [date(lead.created_at), lead.name, lead.email, lead.message, lead.source_page, lead.preferred_language, lead.sheet_status, lead.sheet_error];
        cells.forEach((cell, index) => {
          const td = document.createElement("td");
          if (index === 3) td.className = "message";
          if (index === 6) {
            const span = document.createElement("span");
            span.className = "badge " + (cell === "failed" ? "failed" : "");
            span.textContent = text(cell);
            td.appendChild(span);
          } else {
            td.textContent = text(cell);
          }
          tr.appendChild(td);
        });
        return tr;
      });
      renderRows(["Created", "Name", "Email", "Message", "Source", "Lang", "Sheet", "Sheet Error"], rows);
    }
    async function loadMembers() {
      $("title").textContent = "Members";
      $("range-caption").textContent = "";
      const data = await api("/admin/api/members?limit=100");
      const rows = data.members.map((member) => {
        const tr = document.createElement("tr");
        [date(member.created_at), member.email, member.phone, [member.first_name, member.last_name].filter(Boolean).join(" "), member.preferred_language, member.marketing_opt_in ? "Yes" : "No"].forEach((cell) => {
          const td = document.createElement("td");
          td.textContent = text(cell);
          tr.appendChild(td);
        });
        return tr;
      });
      renderRows(["Created", "Email", "Phone", "Name", "Lang", "Marketing"], rows);
    }
    async function load() {
      if (state.view === "members") return loadMembers();
      if (state.view === "leads") return loadLeads();
      return loadAnalyticsView();
    }
    $("login-form").addEventListener("submit", async (event) => {
      event.preventDefault();
      $("login-error").textContent = "";
      $("login-button").disabled = true;
      try {
        const data = await api("/admin/api/login", { method: "POST", body: JSON.stringify({ email: $("email").value, password: $("password").value }) });
        state.admin = data.admin;
        showApp();
        await load();
      } catch (error) {
        $("login-error").textContent = error.message;
      } finally {
        $("login-button").disabled = false;
      }
    });
    document.querySelectorAll("[data-view]").forEach((button) => button.addEventListener("click", async () => {
      state.view = button.dataset.view;
      document.querySelectorAll("[data-view]").forEach((item) => item.classList.toggle("active", item === button));
      await load();
    }));
    $("today").addEventListener("click", async () => { setRange(1); await load(); });
    $("last-7").addEventListener("click", async () => { setRange(7); await load(); });
    $("last-30").addEventListener("click", async () => { setRange(30); await load(); });
    $("start-date").addEventListener("change", load);
    $("end-date").addEventListener("change", load);
    $("refresh").addEventListener("click", load);
    $("logout").addEventListener("click", async () => { await api("/admin/api/logout", { method: "POST" }).catch(() => {}); state.admin = null; showLogin(); });
    setRange(30);
    api("/admin/api/me").then(async (data) => { state.admin = data.admin; if (state.admin) { showApp(); await load(); } else showLogin(); }).catch(showLogin);
  </script>
</body>
</html>`,
  );
}
