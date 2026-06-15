import { CalendarDays, MessageCircle, ShieldCheck, X } from "lucide-react";
import { MouseEvent, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { whatsappDirectUrl } from "../../lib/booking";
import { trackEvent } from "../../lib/analytics";

const hiddenKey = "xt-booking-sticky-hidden";
const hiddenPaths = new Set([
  "/booking",
  "/booking-redirect",
  "/booking-whatsapp",
  "/contact-thank-you",
  "/member-thank-you",
]);

function normalizePath(pathname: string) {
  return pathname.replace(/\/+$/, "") || "/";
}

export default function BookingStickyBar() {
  const { pathname } = useLocation();
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    setHidden(window.sessionStorage.getItem(hiddenKey) === "true");
  }, []);

  const close = () => {
    window.sessionStorage.setItem(hiddenKey, "true");
    setHidden(true);
  };

  const openWhatsApp = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    trackEvent({ eventType: "whatsapp_booking_click", eventName: "sticky_whatsapp" });
    window.setTimeout(() => {
      window.location.href = whatsappDirectUrl;
    }, 150);
  };

  if (hidden || hiddenPaths.has(normalizePath(pathname))) return null;

  return (
    <aside className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--color-brand-purple)]/15 bg-white/95 shadow-[0_-18px_45px_-30px_rgba(31,41,55,0.7)] backdrop-blur">
      <div className="mx-auto max-w-7xl px-3 py-3 sm:px-6 lg:px-8">
        <div className="md:hidden">
          <div className="mb-3 flex items-start gap-3 pr-11">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-brand-purple-light)] text-[var(--color-brand-purple)]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold leading-5 text-gray-900">Check insurance coverage before booking</p>
              <p className="text-xs leading-5 text-gray-600">$0 cost may be available with eligible benefits.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/booking"
              className="flex min-h-[52px] flex-1 items-center justify-center rounded-2xl bg-[var(--color-brand-pink)] px-4 text-center text-sm font-bold leading-tight text-white shadow-lg shadow-[var(--color-brand-pink)]/25"
            >
              Book free call
            </Link>
            <a
              href={whatsappDirectUrl}
              data-meta-tracked="true"
              onClick={openWhatsApp}
              className="flex min-h-[52px] flex-1 items-center justify-center gap-2 rounded-2xl bg-green-600 px-4 text-center text-sm font-bold leading-tight text-white shadow-lg shadow-green-600/20"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Close booking reminder"
            className="absolute right-3 top-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="hidden items-center gap-5 md:flex">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-brand-purple-light)] text-[var(--color-brand-purple)]">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-base font-bold text-gray-900">Check whether diabetes care may be covered at $0 cost</p>
            <p className="text-sm leading-6 text-gray-600">
              Book a free 15-minute call or ask on WhatsApp before scheduling.
            </p>
          </div>
          <Link
            to="/booking"
            className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-[var(--color-brand-pink)] px-5 text-sm font-bold text-white shadow-lg shadow-[var(--color-brand-pink)]/20 transition hover:bg-[var(--color-brand-pink)]/90"
          >
            <CalendarDays className="h-4 w-4" />
            Book free call
          </Link>
          <a
            href={whatsappDirectUrl}
            data-meta-tracked="true"
            onClick={openWhatsApp}
            className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-green-600 px-5 text-sm font-bold text-white shadow-lg shadow-green-600/20 transition hover:bg-green-700"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
          <button
            type="button"
            onClick={close}
            aria-label="Close booking reminder"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition hover:border-gray-300 hover:text-gray-800"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
