import { ArrowRight, CalendarDays, CheckCircle2, MessageCircle, ShieldCheck } from "lucide-react";
import { calendarBookingUrl, whatsappBookingUrl } from "../lib/booking";
import { trackMetaCustomEvent } from "../lib/metaPixel";

export default function Booking() {
  return (
    <div className="bg-white">
      <section className="border-b border-gray-100 bg-[var(--color-brand-purple-light)]/35 py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8">
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-brand-purple)]/15 bg-white px-4 py-2 text-sm font-bold text-[var(--color-brand-purple)] shadow-sm">
              <ShieldCheck className="h-4 w-4 text-[var(--color-brand-pink)]" />
              Free 15-minute consultation
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-tight text-gray-900 md:text-6xl">
              Check coverage and book a free consultation
            </h1>
            <p className="mt-5 max-w-3xl text-xl leading-8 text-gray-700">
              Many insurance plans may cover eligible diabetes education and nutrition services at no cost to you. Start with a free 15-minute call or message us on WhatsApp to check whether your plan may be covered.
            </p>
          </div>
          <div className="rounded-2xl border border-[var(--color-brand-purple)]/15 bg-white p-6 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--color-brand-purple)]">Coverage check</p>
            <div className="mt-5 space-y-4">
              {["Medicare, Medicaid, and many commercial plans may be accepted", "Free 15-minute consultation before scheduling", "WhatsApp option for quick coverage questions"].map((item) => (
                <div key={item} className="flex gap-3 text-sm font-semibold leading-6 text-gray-700">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
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
            <h2 className="text-2xl font-bold text-gray-900">Book a free 15-minute call</h2>
            <p className="mt-3 text-base leading-7 text-gray-600">
              Pick a time for a short consultation. We can explain available services and help review whether eligible care may be covered by your insurance.
            </p>
            <span className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[var(--color-brand-purple)] px-5 py-3 font-bold text-white transition group-hover:bg-[var(--color-brand-purple)]/90">
              Book free call <ArrowRight className="h-5 w-5" />
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
            <h2 className="text-2xl font-bold text-gray-900">Ask on WhatsApp</h2>
            <p className="mt-3 text-base leading-7 text-gray-600">
              Prefer messaging? Ask whether your insurance may be covered and request help choosing a consultation time.
            </p>
            <span className="mt-8 inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-bold text-white transition group-hover:bg-green-700">
              Check on WhatsApp <ArrowRight className="h-5 w-5" />
            </span>
          </a>
        </div>

        <div className="mt-8 rounded-2xl border border-gray-100 bg-gray-50 p-5 text-sm leading-6 text-gray-600">
          Coverage depends on eligibility, diagnosis, referral requirements, and plan benefits. We can help review available options during the consultation or by WhatsApp.
        </div>
      </main>
    </div>
  );
}
