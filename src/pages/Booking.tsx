import { ArrowRight, CalendarDays, CheckCircle2, MessageCircle, ShieldCheck } from "lucide-react";
import { MouseEvent } from "react";
import { calendarBookingUrl, whatsappDirectUrl } from "../lib/booking";
import { trackEvent } from "../lib/analytics";
import { trackMetaCustomEvent } from "../lib/metaPixel";

export default function Booking() {
  const openWhatsApp = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    trackMetaCustomEvent("WhatsAppBookingClick");
    trackEvent({ eventType: "whatsapp_booking_click", eventName: "booking_whatsapp" });
    window.setTimeout(() => {
      window.location.href = whatsappDirectUrl;
    }, 150);
  };

  return (
    <div className="bg-white">
      <section className="overflow-hidden border-b border-gray-100 bg-[linear-gradient(135deg,#fbf7fd_0%,#f3fbf7_54%,#ffffff_100%)]">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 sm:px-6 md:py-16 lg:grid-cols-[minmax(0,0.98fr)_minmax(420px,0.82fr)] lg:px-8 lg:py-10">
          <div className="relative z-10 max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-brand-purple)]/15 bg-white px-4 py-2 text-sm font-bold text-[var(--color-brand-purple)] shadow-sm">
              <ShieldCheck className="h-4 w-4 text-[var(--color-brand-pink)]" />
              Free 15-minute consultation
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Check insurance coverage before you book
            </h1>
            <p className="mt-5 max-w-3xl text-xl leading-8 text-gray-700">
              Many insurance plans may cover eligible diabetes education and nutrition services at no cost to you. Start with a free 15-minute call or message us on WhatsApp to check whether your plan may be covered.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={calendarBookingUrl}
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-[var(--color-brand-pink)] px-6 text-base font-bold text-white shadow-xl shadow-[var(--color-brand-pink)]/20 transition hover:bg-[var(--color-brand-pink)]/90"
              >
                Book free call <ArrowRight className="h-5 w-5" />
              </a>
              <a
                href={whatsappDirectUrl}
                data-meta-tracked="true"
                onClick={openWhatsApp}
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-green-600 px-6 text-base font-bold text-white shadow-xl shadow-green-600/15 transition hover:bg-green-700"
              >
                Ask on WhatsApp <MessageCircle className="h-5 w-5" />
              </a>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {["Most eligible plans may cover care", "$0 cost may be available", "Free call before scheduling"].map((item) => (
                <div key={item} className="flex items-start gap-2 rounded-2xl border border-white/80 bg-white/75 p-4 text-sm font-semibold leading-6 text-gray-700 shadow-sm backdrop-blur">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[360px] sm:min-h-[420px] lg:min-h-[600px]">
            <div className="absolute left-2 top-4 h-48 w-48 rounded-full bg-green-100 blur-3xl sm:left-8 sm:h-64 sm:w-64" />
            <div className="absolute right-0 top-8 h-56 w-56 rounded-full bg-[var(--color-brand-purple-light)] blur-3xl sm:h-72 sm:w-72" />
            <div className="absolute left-0 top-4 z-10 max-w-[58%] rounded-3xl border border-white/80 bg-white/85 p-5 shadow-xl backdrop-blur sm:left-4 sm:top-8 sm:max-w-xs sm:p-6 lg:left-[-10px] lg:top-0">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--color-brand-purple)]">Coverage check</p>
              <p className="mt-3 text-3xl font-bold text-gray-900">$0</p>
              <p className="mt-2 max-w-44 text-sm leading-6 text-gray-600">may be available with eligible benefits.</p>
            </div>
            <img
              src="/images/tan-doctor-booking.png"
              alt="XT Diabetes Care clinician"
              className="absolute bottom-0 right-[-60px] z-0 max-h-[430px] w-auto max-w-none object-contain sm:right-[-20px] sm:max-h-[520px] lg:right-[-92px] lg:max-h-[670px]"
            />
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <a
            href={calendarBookingUrl}
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
            href={whatsappDirectUrl}
            data-meta-tracked="true"
            onClick={openWhatsApp}
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
