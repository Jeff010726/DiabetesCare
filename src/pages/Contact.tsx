import { Facebook, Instagram, MapPin, Phone, Mail, Clock } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { apiRequest } from "../lib/api";
import { trackEvent } from "../lib/analytics";
import "../locales/servicePages";

export default function Contact() {
  const { t } = useTranslation("servicePages");
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const addressLines = t("contact.info.addressLines", { returnObjects: true }) as string[];
  const phoneLines = t("contact.info.phoneLines", { returnObjects: true }) as string[];
  const hoursLines = t("contact.info.hoursLines", { returnObjects: true }) as string[];
  const mapQuery = encodeURIComponent("132-27 41st Rd Suite 2CB, Flushing, NY 11355");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const socialIconClass = "flex h-14 w-14 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition hover:border-[var(--color-brand-purple)] hover:text-[var(--color-brand-purple)]";

  const updateField = (field: keyof typeof form) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setError("");

    try {
      await apiRequest<{ ok: boolean }>("/api/contact", {
        method: "POST",
        body: {
          ...form,
          sourcePage: window.location.pathname,
          preferredLanguage: i18n.language,
        },
      });
      trackEvent({ eventType: "contact_submit", eventName: "contact_form" });
      setForm({ name: "", email: "", message: "" });
      setStatus("success");
      navigate("/contact-thank-you");
    } catch (submitError) {
      setError(t("contact.status.fallbackError"));
      setStatus("error");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{t("contact.title")}</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          {t("contact.subtitle")}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
        <div>
           <div className="mb-8 rounded-3xl border border-[var(--color-brand-purple)]/15 bg-[var(--color-brand-purple-light)]/45 p-7 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900">{t("contact.social.title")}</h2>
              <p className="mt-2 text-sm leading-6 text-gray-600">{t("contact.social.desc")}</p>
              <div className="mt-5 flex items-center gap-4">
                <button type="button" className={socialIconClass} aria-label="Instagram">
                  <Instagram className="h-6 w-6" />
                </button>
                <button type="button" className={socialIconClass} aria-label="Facebook">
                  <Facebook className="h-6 w-6" />
                </button>
                <div className="group relative">
                  <button type="button" className={`${socialIconClass} hover:text-[#07c160]`} aria-label="WeChat">
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 fill-current">
                      <path d="M9.25 4C5.25 4 2 6.66 2 9.94c0 1.84 1.03 3.49 2.64 4.58l-.63 2.15 2.47-1.24c.86.29 1.8.45 2.77.45 4 0 7.25-2.66 7.25-5.94S13.25 4 9.25 4Zm-2.3 4.6a.9.9 0 1 1 0-1.8.9.9 0 0 1 0 1.8Zm4.6 0a.9.9 0 1 1 0-1.8.9.9 0 0 1 0 1.8Z" />
                      <path d="M22 14.06c0-2.72-2.69-4.93-6.01-4.93h-.28c.05.26.08.53.08.81 0 3.79-3.68 6.87-8.19 6.87-.16 0-.32 0-.48-.01 1.03 1.34 2.94 2.24 5.12 2.24.75 0 1.47-.11 2.14-.31l2.06 1.03-.53-1.75C19.55 17.25 22 15.82 22 14.06Zm-7.87-1.11a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Zm3.7 0a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                    </svg>
                  </button>
                  <div className="pointer-events-none absolute left-0 top-full z-20 mt-3 w-64 rounded-2xl border border-gray-200 bg-white p-3 opacity-0 shadow-xl transition group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100">
                    <img
                      src={`${import.meta.env.BASE_URL}social/wechat-qr-v2.webp`}
                      alt={t("contact.social.wechatQrAlt")}
                      className="w-full rounded-xl object-contain"
                    />
                  </div>
                </div>
              </div>
           </div>

           <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm mb-8">
              <h3 className="text-2xl font-bold mb-6">{t("contact.formTitle")}</h3>
              <form className="space-y-4" onSubmit={submit}>
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">{t("contact.labels.name")}</label>
                   <input type="text" value={form.name} onChange={updateField("name")} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-purple)]" placeholder={t("contact.placeholders.name")} />
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">{t("contact.labels.email")}</label>
                   <input type="email" value={form.email} onChange={updateField("email")} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-purple)]" placeholder={t("contact.placeholders.email")} />
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">{t("contact.labels.message")}</label>
                   <textarea rows={4} value={form.message} onChange={updateField("message")} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-purple)]" placeholder={t("contact.placeholders.message")}></textarea>
                 </div>
                 {status === "success" && (
                   <p className="rounded-xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
                     {t("contact.status.success")}
                   </p>
                 )}
                 {status === "error" && (
                   <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                     {error}
                   </p>
                 )}
                 <button type="submit" disabled={status === "submitting"} className="w-full bg-[var(--color-brand-purple)] text-white font-bold py-3 px-4 rounded-xl hover:bg-[var(--color-brand-purple)]/90 transition-colors disabled:cursor-not-allowed disabled:opacity-70">
                   {status === "submitting" ? t("contact.status.submitting") : t("contact.send")}
                 </button>
              </form>
           </div>
        </div>

        <div>
           <div className="space-y-8">
              <div className="flex items-start gap-4">
                 <div className="w-12 h-12 bg-[var(--color-brand-purple-light)] text-[var(--color-brand-purple)] rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6" />
                 </div>
                 <div className="min-w-0 flex-1">
                    <h4 className="text-lg font-bold mb-1">{t("contact.info.addressTitle")}</h4>
                    <div className="mt-3 overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 shadow-sm">
                      <iframe
                        title={t("contact.info.mapTitle")}
                        src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                        className="h-52 w-full border-0"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        allowFullScreen
                      />
                    </div>
                    <p className="mt-3 text-sm leading-6 text-gray-500">
                      {addressLines.map((line) => (
                        <span key={line}>{line}<br /></span>
                      ))}
                    </p>
                 </div>
              </div>
              
              <div className="flex items-start gap-4">
                 <div className="w-12 h-12 bg-[var(--color-brand-purple-light)] text-[var(--color-brand-purple)] rounded-xl flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6" />
                 </div>
                 <div>
                    <h4 className="text-lg font-bold mb-1">{t("contact.info.phoneTitle")}</h4>
                    <p className="text-gray-600">
                      {phoneLines.map((line) => (
                        <span key={line}>{line}<br /></span>
                      ))}
                    </p>
                 </div>
              </div>

              <div className="flex items-start gap-4">
                 <div className="w-12 h-12 bg-[var(--color-brand-purple-light)] text-[var(--color-brand-purple)] rounded-xl flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6" />
                 </div>
                 <div>
                    <h4 className="text-lg font-bold mb-1">{t("contact.info.emailTitle")}</h4>
                    <p className="text-gray-600">{t("contact.info.email")}</p>
                 </div>
              </div>

              <div className="flex items-start gap-4">
                 <div className="w-12 h-12 bg-[var(--color-brand-purple-light)] text-[var(--color-brand-purple)] rounded-xl flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6" />
                 </div>
                 <div>
                    <h4 className="text-lg font-bold mb-1">{t("contact.info.hoursTitle")}</h4>
                    <p className="text-gray-600">
                      {hoursLines.map((line) => (
                        <span key={line}>{line}<br /></span>
                      ))}
                    </p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
