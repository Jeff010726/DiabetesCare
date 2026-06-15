const metaPixelId = import.meta.env.VITE_META_PIXEL_ID || "1809933399979917";

type Fbq = {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue?: unknown[];
  loaded?: boolean;
  version?: string;
  push?: Fbq;
};

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

let initialized = false;

function loadPixelScript() {
  if (document.querySelector('script[src="https://connect.facebook.net/en_US/fbevents.js"]')) return;

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  const firstScript = document.getElementsByTagName("script")[0];
  firstScript.parentNode?.insertBefore(script, firstScript);
}

export function installMetaPixel() {
  if (!metaPixelId || initialized) return;

  if (!window.fbq) {
    const fbq: Fbq = (...args: unknown[]) => {
      if (fbq.callMethod) fbq.callMethod(...args);
      else fbq.queue?.push(args);
    };
    window.fbq = fbq;
    window._fbq = fbq;
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = "2.0";
    fbq.queue = [];
  }

  loadPixelScript();
  window.fbq("init", metaPixelId);
  initialized = true;
}

function fbqTrack(eventName: string) {
  installMetaPixel();
  window.fbq?.("track", eventName);
}

function fbqTrackCustom(eventName: string) {
  installMetaPixel();
  window.fbq?.("trackCustom", eventName);
}

export function trackMetaCustomEvent(eventName: string) {
  fbqTrackCustom(eventName);
}

export function trackMetaPageView() {
  fbqTrack("PageView");
}

export function trackMetaConversion(eventType: string) {
  if (eventType === "contact_submit") fbqTrackCustom("ContactFormSubmit");
  if (eventType === "member_register") fbqTrackCustom("MemberSignup");
  if (eventType === "booking_click") fbqTrackCustom("CalendarBookingClick");
}
