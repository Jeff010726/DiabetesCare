import { useEffect } from "react";
import { ExternalLink } from "lucide-react";
import { externalBookingUrl } from "../lib/booking";
import { trackEvent } from "../lib/analytics";
import { trackMetaCustomEvent } from "../lib/metaPixel";

export default function BookingRedirect() {
  useEffect(() => {
    trackMetaCustomEvent("CalendarBookingClick");
    trackEvent({ eventType: "booking_click", eventName: "booking_redirect" });
    const timer = window.setTimeout(() => {
      window.location.href = externalBookingUrl;
    }, 900);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 py-20 text-center">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-brand-purple-light)] text-[var(--color-brand-purple)]">
        <ExternalLink className="h-7 w-7" />
      </div>
      <h1 className="text-3xl font-bold text-gray-900">Opening booking page</h1>
      <p className="mt-3 text-gray-600">You will be redirected in a moment.</p>
      <a
        href={externalBookingUrl}
        className="mt-8 inline-flex items-center justify-center rounded-xl bg-[var(--color-brand-purple)] px-6 py-3 font-bold text-white transition hover:bg-[var(--color-brand-purple)]/90"
      >
        Continue
      </a>
    </div>
  );
}
