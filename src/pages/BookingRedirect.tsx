import { CheckCircle2, MessageCircle } from "lucide-react";
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
