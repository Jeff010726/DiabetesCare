import { apiRequest } from "./api";

const visitorKey = "xt-analytics-visitor-id";
const sessionKey = "xt-analytics-session-id";

type AnalyticsEvent = {
  eventType: string;
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
  metadata?: Record<string, string | number | boolean | null>;
};

function id(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
}

function visitorId() {
  let value = window.localStorage.getItem(visitorKey);
  if (!value) {
    value = id("vis");
    window.localStorage.setItem(visitorKey, value);
  }
  return value;
}

function sessionId() {
  let value = window.sessionStorage.getItem(sessionKey);
  if (!value) {
    value = id("ses");
    window.sessionStorage.setItem(sessionKey, value);
  }
  return value;
}

function device() {
  const ua = navigator.userAgent;
  if (/ipad|tablet/i.test(ua)) return "tablet";
  if (/mobi|android|iphone/i.test(ua)) return "mobile";
  return "desktop";
}

function browser() {
  const ua = navigator.userAgent;
  if (/Edg\//.test(ua)) return "Edge";
  if (/Chrome\//.test(ua)) return "Chrome";
  if (/Safari\//.test(ua) && !/Chrome\//.test(ua)) return "Safari";
  if (/Firefox\//.test(ua)) return "Firefox";
  return "Other";
}

function basePayload() {
  const params = new URLSearchParams(window.location.search);
  return {
    path: window.location.pathname,
    pageTitle: document.title,
    referrer: document.referrer,
    utmSource: params.get("utm_source") || "",
    utmMedium: params.get("utm_medium") || "",
    utmCampaign: params.get("utm_campaign") || "",
    device: device(),
    browser: browser(),
    language: navigator.language,
    sessionId: sessionId(),
    visitorId: visitorId(),
  };
}

export function trackEvent(event: AnalyticsEvent) {
  const payload = { ...basePayload(), ...event };
  const body = JSON.stringify(payload);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "https://api.xtdiabetescare.com";
  const url = `${apiBaseUrl}/api/analytics/collect`;

  if (navigator.sendBeacon) {
    const sent = navigator.sendBeacon(url, new Blob([body], { type: "application/json" }));
    if (sent) return;
  }

  apiRequest<{ ok: boolean }>("/api/analytics/collect", { method: "POST", body: payload }).catch(() => undefined);
}

export function trackPageView() {
  trackEvent({ eventType: "page_view", eventName: window.location.pathname });
}

export function installClickTracking() {
  const handler = (event: MouseEvent) => {
    const target = event.target instanceof Element ? event.target.closest("a,button") : null;
    if (!target) return;

    const text = (target.textContent || "").trim().replace(/\s+/g, " ").slice(0, 120);
    const href = target instanceof HTMLAnchorElement ? target.href : "";
    const isBooking = href.includes("app.kalixhealth.com/calendar");
    const isOutbound = Boolean(href && !href.startsWith(window.location.origin) && !href.startsWith("/"));

    trackEvent({
      eventType: isBooking ? "booking_click" : isOutbound ? "outbound_click" : "cta_click",
      eventName: text || target.getAttribute("aria-label") || target.tagName.toLowerCase(),
      metadata: {
        href,
        tag: target.tagName.toLowerCase(),
      },
    });
  };

  document.addEventListener("click", handler);
  return () => document.removeEventListener("click", handler);
}
