import { CalendarDays, MessageCircle } from "lucide-react";
import { MouseEvent, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { bookingUrl, whatsappDirectUrl } from "../lib/booking";

export default function BookingWhatsApp() {
  const { t } = useTranslation("servicePages");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      window.location.href = whatsappDirectUrl;
    }, 300);
    return () => window.clearTimeout(timer);
  }, []);

  const openWhatsApp = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.location.href = whatsappDirectUrl;
  };

  return (
    <div className="bg-white">
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-20">
        <div className="flex flex-col justify-center">
          <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-green-100 bg-green-50 px-4 py-2 text-sm font-bold text-green-700">
            <MessageCircle className="h-4 w-4" />
            {t("booking.whatsapp.badge")}
          </span>
          <h1 className="text-4xl font-bold leading-tight text-gray-900 md:text-5xl">{t("booking.whatsapp.title")}</h1>
          <p className="mt-5 text-lg leading-8 text-gray-600">{t("booking.whatsapp.desc")}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappDirectUrl}
              data-meta-tracked="true"
              onClick={openWhatsApp}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-bold text-white transition hover:bg-green-700"
            >
              {t("booking.whatsapp.whatsappButton")} <MessageCircle className="h-5 w-5" />
            </a>
            <Link
              to={bookingUrl}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--color-brand-purple)] px-6 py-3 font-bold text-white transition hover:bg-[var(--color-brand-purple)]/90"
            >
              {t("booking.whatsapp.formButton")} <CalendarDays className="h-5 w-5" />
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6 shadow-sm">
          <div className="rounded-xl bg-white p-6">
            <h2 className="text-xl font-bold text-gray-900">{t("booking.whatsapp.cardTitle")}</h2>
            <p className="mt-3 text-sm leading-6 text-gray-600">{t("booking.whatsapp.cardDesc")}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
