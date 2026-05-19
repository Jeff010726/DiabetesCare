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

async function requireAdmin(request: Request, env: Env) {
  const session = await getAdminSession(request, env);
  return session ? null : adminJson(request, env, { error: "Unauthorized" }, { status: 401 });
}

function adminJson(request: Request, env: Env, data: unknown, init: ResponseInit = {}) {
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
    body { margin: 0; background: #f6f7fb; color: #172033; }
    button, input { font: inherit; }
    .shell { min-height: 100vh; display: grid; grid-template-columns: 260px 1fr; }
    .side { background: #111827; color: white; padding: 24px; display: flex; flex-direction: column; gap: 24px; }
    .brand { font-size: 18px; font-weight: 800; letter-spacing: 0; }
    .nav { display: grid; gap: 8px; }
    .nav button, .logout { border: 0; border-radius: 8px; padding: 10px 12px; color: inherit; background: transparent; text-align: left; cursor: pointer; }
    .nav button.active, .nav button:hover, .logout:hover { background: rgba(255,255,255,.12); }
    .logout { margin-top: auto; }
    .main { padding: 28px; min-width: 0; }
    .top { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-bottom: 24px; }
    h1 { margin: 0; font-size: 28px; line-height: 1.2; }
    .muted { color: #667085; }
    .grid { display: grid; gap: 16px; grid-template-columns: repeat(3, minmax(0, 1fr)); margin-bottom: 20px; }
    .card { background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 18px; box-shadow: 0 12px 28px -24px rgba(17,24,39,.35); }
    .metric { font-size: 30px; font-weight: 800; margin-top: 6px; }
    .tablewrap { overflow: auto; background: white; border: 1px solid #e5e7eb; border-radius: 8px; }
    table { width: 100%; border-collapse: collapse; min-width: 880px; }
    th, td { padding: 12px 14px; border-bottom: 1px solid #eef0f4; text-align: left; font-size: 14px; vertical-align: top; }
    th { background: #f9fafb; color: #475467; font-size: 12px; text-transform: uppercase; letter-spacing: .04em; }
    td.message { max-width: 360px; white-space: pre-wrap; }
    .badge { display: inline-flex; border-radius: 999px; padding: 3px 8px; font-size: 12px; font-weight: 700; background: #eef2ff; color: #4338ca; }
    .badge.failed { background: #fff1f2; color: #be123c; }
    .login { min-height: 100vh; display: grid; place-items: center; padding: 24px; }
    .login .card { width: min(420px, 100%); }
    label { display: grid; gap: 6px; margin-top: 14px; font-weight: 700; font-size: 14px; }
    input { width: 100%; border: 1px solid #d0d5dd; border-radius: 8px; padding: 11px 12px; }
    .primary { width: 100%; margin-top: 18px; border: 0; border-radius: 8px; padding: 12px; background: #6d28d9; color: white; font-weight: 800; cursor: pointer; }
    .primary:disabled { opacity: .65; cursor: not-allowed; }
    .error { margin-top: 12px; color: #b42318; font-weight: 700; font-size: 14px; }
    .hidden { display: none; }
    @media (max-width: 840px) { .shell { grid-template-columns: 1fr; } .side { position: static; } .grid { grid-template-columns: 1fr; } }
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
        <button type="button" data-view="leads" class="active">Contact Leads</button>
        <button type="button" data-view="members">Members</button>
      </nav>
      <button type="button" class="logout" id="logout">Sign out</button>
    </aside>
    <main class="main">
      <div class="top">
        <div>
          <h1 id="title">Contact Leads</h1>
          <div class="muted" id="admin-email"></div>
        </div>
        <button type="button" class="primary" id="refresh" style="width:auto;margin:0;">Refresh</button>
      </div>
      <section class="grid">
        <div class="card"><div class="muted">Members</div><div class="metric" id="metric-members">-</div></div>
        <div class="card"><div class="muted">Contact Leads</div><div class="metric" id="metric-leads">-</div></div>
        <div class="card"><div class="muted">Sheet Sync Failed</div><div class="metric" id="metric-failed">-</div></div>
      </section>
      <section class="tablewrap"><table><thead id="thead"></thead><tbody id="tbody"></tbody></table></section>
    </main>
  </div>

  <script>
    const state = { view: "leads", admin: null };
    const $ = (id) => document.getElementById(id);
    const text = (value) => value == null || value === "" ? "-" : String(value);
    const date = (value) => value ? new Date(value).toLocaleString() : "-";
    async function api(path, options = {}) {
      const res = await fetch(path, { credentials: "include", headers: options.body ? { "Content-Type": "application/json" } : undefined, ...options });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Request failed");
      return data;
    }
    function showLogin() { $("login").classList.remove("hidden"); $("app").classList.add("hidden"); }
    function showApp() { $("login").classList.add("hidden"); $("app").classList.remove("hidden"); $("admin-email").textContent = state.admin?.email || ""; }
    async function loadStats() {
      const stats = await api("/admin/api/stats");
      $("metric-members").textContent = stats.members;
      $("metric-leads").textContent = stats.contactLeads;
      $("metric-failed").textContent = stats.failedSheetSyncs;
    }
    function renderRows(headers, rows) {
      $("thead").innerHTML = "<tr>" + headers.map((h) => "<th>" + h + "</th>").join("") + "</tr>";
      $("tbody").replaceChildren(...rows);
    }
    async function loadLeads() {
      $("title").textContent = "Contact Leads";
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
      await loadStats();
      await (state.view === "members" ? loadMembers() : loadLeads());
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
    $("refresh").addEventListener("click", load);
    $("logout").addEventListener("click", async () => { await api("/admin/api/logout", { method: "POST" }).catch(() => {}); state.admin = null; showLogin(); });
    api("/admin/api/me").then(async (data) => { state.admin = data.admin; if (state.admin) { showApp(); await load(); } else showLogin(); }).catch(showLogin);
  </script>
</body>
</html>`,
  );
}
