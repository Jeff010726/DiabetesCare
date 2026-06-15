import { MouseEvent, useEffect } from "react";
import { Link } from "react-router-dom";
import { CalendarDays, MessageCircle } from "lucide-react";
import { calendarBookingUrl, setBookingRedirectTarget, whatsappBookingUrl } from "../lib/booking";

export default function BookingWhatsApp() {
  useEffect(() => {
    setBookingRedirectTarget("whatsapp");
    const timer = window.setTimeout(() => {
      window.location.href = whatsappBookingUrl;
    }, 300);
    return () => window.clearTimeout(timer);
  }, []);

  const openCalendar = () => {
    setBookingRedirectTarget("calendar");
  };

  const openWhatsApp = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setBookingRedirectTarget("whatsapp");
    window.location.href = whatsappBookingUrl;
  };

  return (
    <div className="bg-white">
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-20">
        <div className="flex flex-col justify-center">
          <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-green-100 bg-green-50 px-4 py-2 text-sm font-bold text-green-700">
            <MessageCircle className="h-4 w-4" />
            WhatsApp booking
          </span>
          <h1 className="text-4xl font-bold leading-tight text-gray-900 md:text-5xl">
            Ask about coverage on WhatsApp
          </h1>
          <p className="mt-5 text-lg leading-8 text-gray-600">
            We are opening WhatsApp so you can ask whether your insurance may be covered and request a consultation time.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappBookingUrl}
              data-meta-tracked="true"
              onClick={openWhatsApp}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-bold text-white transition hover:bg-green-700"
            >
              Ask on WhatsApp <MessageCircle className="h-5 w-5" />
            </a>
            <a
              href={calendarBookingUrl}
              onClick={openCalendar}
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

        <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6 shadow-sm">
          <div className="rounded-xl bg-white p-6">
            <h2 className="text-xl font-bold text-gray-900">Coverage and booking</h2>
            <p className="mt-3 text-sm leading-6 text-gray-600">
              Send a WhatsApp message to ask whether eligible services may be covered, or continue with the online calendar for a free 15-minute call.
            </p>
            <div className="mt-6 overflow-hidden rounded-xl border border-gray-100">
              <img
                src={`${import.meta.env.BASE_URL}social/whatsapp-booking-qr.jpg`}
                alt="WhatsApp booking QR code"
                className="w-full bg-white object-contain"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
