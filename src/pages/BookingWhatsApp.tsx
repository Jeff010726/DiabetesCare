import { useEffect } from "react";
import { Link } from "react-router-dom";
import { CalendarDays, MessageCircle } from "lucide-react";
import { calendarBookingUrl } from "../lib/booking";
import { trackEvent } from "../lib/analytics";
import { trackMetaCustomEvent } from "../lib/metaPixel";

export default function BookingWhatsApp() {
  useEffect(() => {
    trackMetaCustomEvent("WhatsAppBookingClick");
    trackEvent({ eventType: "whatsapp_booking_click", eventName: "booking_whatsapp" });
  }, []);

  return (
    <div className="bg-white">
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-20">
        <div className="flex flex-col justify-center">
          <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-green-100 bg-green-50 px-4 py-2 text-sm font-bold text-green-700">
            <MessageCircle className="h-4 w-4" />
            WhatsApp booking
          </span>
          <h1 className="text-4xl font-bold leading-tight text-gray-900 md:text-5xl">
            Message us to book your consultation
          </h1>
          <p className="mt-5 text-lg leading-8 text-gray-600">
            Scan or upload the QR code with the WhatsApp camera to add the contact and request a consultation time.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={calendarBookingUrl}
              target="_blank"
              rel="noreferrer"
              data-meta-tracked="true"
              onClick={() => trackMetaCustomEvent("CalendarBookingClick")}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--color-brand-purple)] px-6 py-3 font-bold text-white transition hover:bg-[var(--color-brand-purple)]/90"
            >
              Use online calendar <CalendarDays className="h-5 w-5" />
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-6 py-3 font-bold text-gray-700 transition hover:bg-gray-50"
            >
              Contact form
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5 shadow-sm">
          <img
            src={`${import.meta.env.BASE_URL}social/whatsapp-booking-qr.jpg`}
            alt="WhatsApp booking QR code"
            className="w-full rounded-xl bg-white object-contain"
          />
        </div>
      </section>
    </div>
  );
}
