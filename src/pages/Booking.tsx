import { ArrowRight, CheckCircle2, MessageCircle, ShieldCheck } from "lucide-react";
import { ChangeEvent, FormEvent, MouseEvent, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../lib/api";
import { whatsappDirectUrl } from "../lib/booking";

const availabilityOptions = [
  "8AM - 10AM",
  "10AM - 12PM",
  "12PM - 2PM",
  "2PM - 4PM",
  "4PM - 6PM",
  "6PM - 7PM",
  "7PM - 9PM",
];

export default function Booking() {
  const { t, i18n } = useTranslation("servicePages");
  const navigate = useNavigate();
  const formRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [error, setError] = useState("");
  const highlights = t("booking.hero.highlights", { returnObjects: true }) as string[];
  const languageOptions = t("booking.form.languageOptions", { returnObjects: true }) as string[];
  const patientTypeOptions = t("booking.form.patientTypeOptions", { returnObjects: true }) as string[];
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    patientType: "",
    age: "",
    preferredLanguage: "",
    availability: "",
    insuranceCompany: "",
    insuranceMemberId: "",
    dateOfBirth: "",
  });

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const openWhatsApp = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.location.href = whatsappDirectUrl;
  };

  const updateField = (field: keyof typeof form) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setError("");

    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    const message = [
      "Booking request: free 15-minute insurance coverage call",
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone}`,
      `Patient type: ${form.patientType}`,
      `Age: ${form.age}`,
      `Preferred language: ${form.preferredLanguage}`,
      `Available time: ${form.availability}`,
      `Time zone: ${timeZone || "Unknown"}`,
      `Insurance company: ${form.insuranceCompany || "-"}`,
      `Insurance member ID: ${form.insuranceMemberId || "-"}`,
      `Date of birth: ${form.dateOfBirth || "-"}`,
      `Page language: ${i18n.language}`,
    ].join("\n");

    try {
      await apiRequest<{ ok: boolean }>("/api/contact", {
        method: "POST",
        body: {
          name: form.name,
          email: form.email,
          message,
          sourcePage: window.location.pathname,
          patientType: form.patientType,
          preferredLanguage: form.preferredLanguage || i18n.language,
          timeZone,
          insuranceCompany: form.insuranceCompany,
          insuranceMemberId: form.insuranceMemberId,
          dateOfBirth: form.dateOfBirth,
        },
      });
      navigate("/booking-redirect");
    } catch {
      setStatus("error");
      setError(t("booking.form.fallbackError"));
    }
  };

  return (
    <div className="bg-white">
      <section className="overflow-hidden border-b border-gray-100 bg-[linear-gradient(135deg,#fbf7fd_0%,#f3fbf7_54%,#ffffff_100%)]">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 sm:px-6 md:py-16 lg:grid-cols-[minmax(0,0.98fr)_minmax(420px,0.82fr)] lg:px-8 lg:py-10">
          <div className="relative z-10 max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-brand-purple)]/15 bg-white px-4 py-2 text-sm font-bold text-[var(--color-brand-purple)] shadow-sm">
              <ShieldCheck className="h-4 w-4 text-[var(--color-brand-pink)]" />
              {t("booking.hero.badge")}
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
              {t("booking.hero.title")}
            </h1>
            <p className="mt-5 max-w-3xl text-xl leading-8 text-gray-700">{t("booking.hero.desc")}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={scrollToForm}
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-[var(--color-brand-pink)] px-6 text-base font-bold text-white shadow-xl shadow-[var(--color-brand-pink)]/20 transition hover:bg-[var(--color-brand-pink)]/90"
              >
                {t("booking.hero.bookButton")} <ArrowRight className="h-5 w-5" />
              </button>
              <a
                href={whatsappDirectUrl}
                data-meta-tracked="true"
                onClick={openWhatsApp}
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-green-600 px-6 text-base font-bold text-white shadow-xl shadow-green-600/15 transition hover:bg-green-700"
              >
                {t("booking.hero.whatsappButton")} <MessageCircle className="h-5 w-5" />
              </a>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {highlights.map((item) => (
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
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--color-brand-purple)]">{t("booking.hero.coverageCardLabel")}</p>
              <p className="mt-3 text-3xl font-bold text-gray-900">$0</p>
              <p className="mt-2 max-w-44 text-sm leading-6 text-gray-600">{t("booking.hero.coverageCardDesc")}</p>
            </div>
            <img
              src="/images/tan-doctor-booking.png"
              alt="XT Diabetes Care clinician"
              className="absolute bottom-0 right-[-60px] z-0 max-h-[430px] w-auto max-w-none object-contain sm:right-[-20px] sm:max-h-[520px] lg:right-[-92px] lg:max-h-[670px]"
            />
          </div>
        </div>
      </section>

      <main ref={formRef} className="mx-auto max-w-3xl scroll-mt-6 px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-[1.75rem] border border-gray-100 bg-white p-5 shadow-[0_24px_80px_-48px_rgba(31,41,55,0.55)] sm:p-7">
          <div className="mb-6">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--color-brand-purple)]">{t("booking.form.eyebrow")}</p>
            <h2 className="mt-2 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl">{t("booking.form.title")}</h2>
            <p className="mt-3 text-sm leading-6 text-gray-600">{t("booking.form.intro")}</p>
          </div>

          <form className="space-y-4" onSubmit={submit}>
            <div>
              <label className="mb-1.5 block text-sm font-bold text-gray-800">{t("booking.form.fields.name")}</label>
              <input
                type="text"
                value={form.name}
                onChange={updateField("name")}
                required
                className="h-[52px] w-full rounded-2xl border border-gray-200 bg-white px-4 text-base text-gray-900 outline-none transition focus:border-[var(--color-brand-purple)] focus:ring-4 focus:ring-[var(--color-brand-purple)]/10"
                placeholder={t("booking.form.placeholders.name")}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-bold text-gray-800">{t("booking.form.fields.email")}</label>
              <input
                type="email"
                value={form.email}
                onChange={updateField("email")}
                required
                className="h-[52px] w-full rounded-2xl border border-gray-200 bg-white px-4 text-base text-gray-900 outline-none transition focus:border-[var(--color-brand-purple)] focus:ring-4 focus:ring-[var(--color-brand-purple)]/10"
                placeholder={t("booking.form.placeholders.email")}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-bold text-gray-800">{t("booking.form.fields.phone")}</label>
              <input
                type="tel"
                value={form.phone}
                onChange={updateField("phone")}
                required
                className="h-[52px] w-full rounded-2xl border border-gray-200 bg-white px-4 text-base text-gray-900 outline-none transition focus:border-[var(--color-brand-purple)] focus:ring-4 focus:ring-[var(--color-brand-purple)]/10"
                placeholder={t("booking.form.placeholders.phone")}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-bold text-gray-800">{t("booking.form.fields.patientType")}</label>
              <select
                value={form.patientType}
                onChange={updateField("patientType")}
                required
                className="h-[52px] w-full rounded-2xl border border-gray-200 bg-white px-4 text-base text-gray-900 outline-none transition focus:border-[var(--color-brand-purple)] focus:ring-4 focus:ring-[var(--color-brand-purple)]/10"
              >
                <option value="">{t("booking.form.placeholders.patientType")}</option>
                {patientTypeOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-bold text-gray-800">{t("booking.form.fields.age")}</label>
                <input
                  type="number"
                  min="1"
                  max="120"
                  value={form.age}
                  onChange={updateField("age")}
                  required
                  className="h-[52px] w-full rounded-2xl border border-gray-200 bg-white px-4 text-base text-gray-900 outline-none transition focus:border-[var(--color-brand-purple)] focus:ring-4 focus:ring-[var(--color-brand-purple)]/10"
                  placeholder={t("booking.form.placeholders.age")}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-bold text-gray-800">{t("booking.form.fields.preferredLanguage")}</label>
                <select
                  value={form.preferredLanguage}
                  onChange={updateField("preferredLanguage")}
                  required
                  className="h-[52px] w-full rounded-2xl border border-gray-200 bg-white px-4 text-base text-gray-900 outline-none transition focus:border-[var(--color-brand-purple)] focus:ring-4 focus:ring-[var(--color-brand-purple)]/10"
                >
                  <option value="">{t("booking.form.placeholders.language")}</option>
                  {languageOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-bold text-gray-800">{t("booking.form.fields.availability")}</label>
              <select
                value={form.availability}
                onChange={updateField("availability")}
                required
                className="h-[52px] w-full rounded-2xl border border-gray-200 bg-white px-4 text-base text-gray-900 outline-none transition focus:border-[var(--color-brand-purple)] focus:ring-4 focus:ring-[var(--color-brand-purple)]/10"
              >
                <option value="">{t("booking.form.placeholders.availability")}</option>
                {availabilityOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div className="rounded-2xl border border-green-100 bg-green-50/70 p-4">
              <p className="text-sm font-bold text-green-900">{t("booking.form.optionalInsuranceTitle")}</p>
              <p className="mt-1 text-sm leading-6 text-green-800">{t("booking.form.optionalInsuranceDesc")}</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-bold text-gray-800">{t("booking.form.fields.insuranceCompany")}</label>
                  <input
                    type="text"
                    value={form.insuranceCompany}
                    onChange={updateField("insuranceCompany")}
                    className="h-[52px] w-full rounded-2xl border border-gray-200 bg-white px-4 text-base text-gray-900 outline-none transition focus:border-[var(--color-brand-purple)] focus:ring-4 focus:ring-[var(--color-brand-purple)]/10"
                    placeholder={t("booking.form.placeholders.insuranceCompany")}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-bold text-gray-800">{t("booking.form.fields.insuranceMemberId")}</label>
                  <input
                    type="text"
                    value={form.insuranceMemberId}
                    onChange={updateField("insuranceMemberId")}
                    className="h-[52px] w-full rounded-2xl border border-gray-200 bg-white px-4 text-base text-gray-900 outline-none transition focus:border-[var(--color-brand-purple)] focus:ring-4 focus:ring-[var(--color-brand-purple)]/10"
                    placeholder={t("booking.form.placeholders.insuranceMemberId")}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-bold text-gray-800">{t("booking.form.fields.dateOfBirth")}</label>
                  <input
                    type="date"
                    value={form.dateOfBirth}
                    onChange={updateField("dateOfBirth")}
                    className="h-[52px] w-full rounded-2xl border border-gray-200 bg-white px-4 text-base text-gray-900 outline-none transition focus:border-[var(--color-brand-purple)] focus:ring-4 focus:ring-[var(--color-brand-purple)]/10"
                  />
                </div>
              </div>
            </div>

            {status === "error" && (
              <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="flex min-h-14 w-full items-center justify-center rounded-2xl bg-[var(--color-brand-pink)] px-6 text-base font-bold text-white shadow-xl shadow-[var(--color-brand-pink)]/20 transition hover:bg-[var(--color-brand-pink)]/90 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === "submitting" ? t("booking.form.submitting") : t("booking.form.submit")}
            </button>
          </form>
        </div>

        <div className="mt-5 rounded-2xl border border-gray-100 bg-gray-50 p-4 text-sm leading-6 text-gray-600">
          {t("booking.form.disclaimer")}
        </div>
      </main>
    </div>
  );
}
