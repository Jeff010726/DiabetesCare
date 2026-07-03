import { CheckCircle2, MessageCircle, PhoneCall } from "lucide-react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { trackEvent } from "../lib/analytics";
import { whatsappDirectUrl } from "../lib/booking";

export default function BookingRedirect() {
  const { t } = useTranslation("servicePages");

  useEffect(() => {
    trackEvent({
      eventType: "booking_click",
      eventName: "booking_form_success",
      metadata: { destination: "booking-redirect" },
    });
  }, []);

  return (
    <div className="mx-auto flex min-h-[68vh] max-w-2xl flex-col items-center justify-center px-4 py-16 text-center">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-green-50 text-green-600">
        <CheckCircle2 className="h-9 w-9" />
      </div>
      <h1 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">{t("booking.success.title")}</h1>
      <p className="mt-5 text-lg leading-8 text-gray-700">{t("booking.success.body")}</p>
      <div className="mt-6 w-full rounded-3xl border border-[var(--color-brand-purple)]/15 bg-[var(--color-brand-purple-light)]/55 p-5 text-left shadow-sm sm:p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-[var(--color-brand-purple)] shadow-sm">
            <PhoneCall className="h-6 w-6" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold uppercase tracking-[0.12em] text-[var(--color-brand-purple)]">{t("booking.success.phoneNoticeTitle")}</p>
            <p className="mt-2 text-3xl font-bold tracking-normal text-gray-900">929-777-4933</p>
            <p className="mt-2 text-sm leading-6 text-gray-700">{t("booking.success.phoneNoticeBody")}</p>
          </div>
        </div>
      </div>
      <p className="mt-3 text-sm leading-6 text-gray-500">{t("booking.success.urgent")}</p>
      <a
        href={whatsappDirectUrl}
        target="_blank"
        rel="noreferrer"
        data-meta-tracked="true"
        className="mt-8 inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-green-600 px-7 text-base font-bold text-white shadow-lg shadow-green-600/20 transition hover:bg-green-700"
      >
        <MessageCircle className="h-5 w-5" />
        {t("booking.success.whatsappButton")}
      </a>
    </div>
  );
}
