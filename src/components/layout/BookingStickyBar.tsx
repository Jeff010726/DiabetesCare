import { MessageCircle, ShieldCheck, X } from "lucide-react";
import { MouseEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { whatsappDirectUrl } from "../../lib/booking";

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
  const { t } = useTranslation("servicePages");
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
    window.location.href = whatsappDirectUrl;
  };

  if (hidden || hiddenPaths.has(normalizePath(pathname))) return null;

  return (
    <aside className="fixed inset-x-0 bottom-0 z-40 px-3 pb-3 sm:px-6 md:pb-5">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl border border-[var(--color-brand-purple)]/15 bg-[linear-gradient(125deg,#ffffff_0%,#fff7fd_48%,#f0fff7_100%)] p-3 shadow-[0_22px_70px_-34px_rgba(31,41,55,0.72)] backdrop-blur md:hidden">
          <div className="absolute bottom-[68px] right-[-6px] h-[132px] w-[132px] overflow-hidden">
            <img
              src="/images/tan-doctor-booking.png"
              alt=""
              aria-hidden="true"
              className="absolute bottom-0 right-[-22px] h-[148px] w-auto max-w-none object-contain"
            />
          </div>
          <div className="relative z-10 mb-3 min-h-[88px] pr-[116px]">
            <div className="mb-2 flex items-center gap-2">
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-brand-purple-light)] text-[var(--color-brand-purple)]">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <span className="rounded-full bg-green-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-green-700">
                {t("booking.sticky.mobileBadge")}
              </span>
            </div>
            <p className="text-sm font-bold leading-5 text-gray-900">{t("booking.sticky.mobileTitle")}</p>
            <p className="mt-1 text-xs leading-5 text-gray-600">{t("booking.sticky.mobileDesc")}</p>
          </div>
          <div className="relative z-10 flex items-center gap-3">
            <Link
              to="/booking"
              className="flex min-h-[52px] flex-1 items-center justify-center rounded-2xl bg-[var(--color-brand-pink)] px-4 text-center text-sm font-bold leading-tight text-white shadow-lg shadow-[var(--color-brand-pink)]/25"
            >
              {t("booking.sticky.bookButton")}
            </Link>
            <a
              href={whatsappDirectUrl}
              data-meta-tracked="true"
              onClick={openWhatsApp}
              className="flex min-h-[52px] flex-1 items-center justify-center gap-2 rounded-2xl bg-green-600 px-4 text-center text-sm font-bold leading-tight text-white shadow-lg shadow-green-600/20"
            >
              <MessageCircle className="h-4 w-4" />
              {t("booking.sticky.whatsappButton")}
            </a>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label={t("booking.sticky.close")}
            className="absolute right-3 top-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="relative hidden min-h-[150px] overflow-visible rounded-[2rem] border border-[var(--color-brand-purple)]/15 bg-[linear-gradient(110deg,#ffffff_0%,#fff7fd_42%,#f0fff7_100%)] shadow-[0_28px_90px_-44px_rgba(31,41,55,0.76)] md:block">
          <div className="absolute bottom-0 right-16 top-[-76px] w-[300px] overflow-hidden lg:right-24">
            <img
              src="/images/tan-doctor-booking.png"
              alt=""
              aria-hidden="true"
              className="absolute bottom-0 right-0 h-[245px] w-auto max-w-none object-contain"
            />
          </div>
          <div className="relative z-10 grid min-h-[150px] grid-cols-[minmax(0,1fr)_240px] items-center gap-6 px-7 py-5 pr-[330px] lg:grid-cols-[minmax(0,1fr)_280px] lg:pr-[390px]">
            <div className="min-w-0">
              <div className="mb-3 flex items-center gap-2">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--color-brand-purple-light)] text-[var(--color-brand-purple)]">
                  <ShieldCheck className="h-5 w-5" />
                </span>
                <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-green-700">
                  {t("booking.sticky.desktopBadge")}
                </span>
              </div>
              <p className="text-xl font-bold leading-tight text-gray-900 lg:text-2xl">
                {t("booking.sticky.desktopTitle")}
              </p>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                {t("booking.sticky.desktopDesc")}
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Link
                to="/booking"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[var(--color-brand-pink)] px-5 text-sm font-bold text-white shadow-lg shadow-[var(--color-brand-pink)]/20 transition hover:bg-[var(--color-brand-pink)]/90"
              >
                {t("booking.sticky.bookButton")}
              </Link>
              <a
                href={whatsappDirectUrl}
                data-meta-tracked="true"
                onClick={openWhatsApp}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-green-600 px-5 text-sm font-bold text-white shadow-lg shadow-green-600/20 transition hover:bg-green-700"
              >
                <MessageCircle className="h-4 w-4" />
                {t("booking.sticky.whatsappButton")}
              </a>
            </div>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label={t("booking.sticky.close")}
            className="absolute right-4 top-4 z-20 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white/90 text-gray-500 transition hover:border-gray-300 hover:text-gray-800"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
