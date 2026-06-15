import { ArrowRight, CalendarDays, MessageCircle, ShieldCheck } from "lucide-react";
import { calendarBookingUrl, whatsappBookingUrl } from "../lib/booking";
import { trackMetaCustomEvent } from "../lib/metaPixel";

export default function Booking() {
  return (
    <div className="bg-white">
      <section className="border-b border-gray-100 bg-[var(--color-brand-purple-light)]/35 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-brand-purple)]/15 bg-white px-4 py-2 text-sm font-bold text-[var(--color-brand-purple)] shadow-sm">
              <ShieldCheck className="h-4 w-4 text-[var(--color-brand-pink)]" />
              Free 15-minute consultation
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-tight text-gray-900 md:text-6xl">
              Choose how you want to book
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-600">
              Start with a quick consultation. Eligible services may be covered by Medicare, Medicaid, and many insurance plans.
            </p>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <a
            href={calendarBookingUrl}
            target="_blank"
            rel="noreferrer"
            data-meta-tracked="true"
            onClick={() => trackMetaCustomEvent("CalendarBookingClick")}
            className="group rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-brand-purple-light)] text-[var(--color-brand-purple)]">
              <CalendarDays className="h-7 w-7" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Book online</h2>
            <p className="mt-3 text-base leading-7 text-gray-600">
              Open our secure online calendar and pick an available consultation time.
            </p>
            <span className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[var(--color-brand-purple)] px-5 py-3 font-bold text-white transition group-hover:bg-[var(--color-brand-purple)]/90">
              Continue to calendar <ArrowRight className="h-5 w-5" />
            </span>
          </a>

          <a
            href={whatsappBookingUrl}
            data-meta-tracked="true"
            onClick={() => trackMetaCustomEvent("WhatsAppBookingClick")}
            className="group rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-600">
              <MessageCircle className="h-7 w-7" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Book on WhatsApp</h2>
            <p className="mt-3 text-base leading-7 text-gray-600">
              Prefer messaging? Scan the QR code or save the WhatsApp contact to request a time.
            </p>
            <span className="mt-8 inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-bold text-white transition group-hover:bg-green-700">
              Open WhatsApp option <ArrowRight className="h-5 w-5" />
            </span>
          </a>
        </div>

        <div className="mt-8 rounded-2xl border border-gray-100 bg-gray-50 p-5 text-sm leading-6 text-gray-600">
          Coverage depends on eligibility and plan benefits. We can help review available options during the consultation.
        </div>
      </main>
    </div>
  );
}
