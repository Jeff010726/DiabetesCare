import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { apiRequest } from "../lib/api";
import { trackEvent } from "../lib/analytics";
import "../locales/servicePages";

export default function Contact() {
  const { t } = useTranslation("servicePages");
  const { i18n } = useTranslation();
  const addressLines = t("contact.info.addressLines", { returnObjects: true }) as string[];
  const phoneLines = t("contact.info.phoneLines", { returnObjects: true }) as string[];
  const hoursLines = t("contact.info.hoursLines", { returnObjects: true }) as string[];
  const mapQuery = encodeURIComponent("Nutriall Wellness Center 132-27 41st Rd #2CB Flushing NY 11355");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");

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
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to send your message.");
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
                     Message sent. We will follow up soon.
                   </p>
                 )}
                 {status === "error" && (
                   <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                     {error}
                   </p>
                 )}
                 <button type="submit" disabled={status === "submitting"} className="w-full bg-[var(--color-brand-purple)] text-white font-bold py-3 px-4 rounded-xl hover:bg-[var(--color-brand-purple)]/90 transition-colors disabled:cursor-not-allowed disabled:opacity-70">
                   {status === "submitting" ? "Sending..." : t("contact.send")}
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
                        title="XT Diabetes Care office location on Google Maps"
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
