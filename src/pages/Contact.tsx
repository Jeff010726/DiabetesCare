import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";
import "../locales/servicePages";

export default function Contact() {
  const { t } = useTranslation("servicePages");
  const addressLines = t("contact.info.addressLines", { returnObjects: true }) as string[];
  const phoneLines = t("contact.info.phoneLines", { returnObjects: true }) as string[];
  const hoursLines = t("contact.info.hoursLines", { returnObjects: true }) as string[];

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
              <form className="space-y-4">
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">{t("contact.labels.name")}</label>
                   <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-purple)]" placeholder={t("contact.placeholders.name")} />
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">{t("contact.labels.email")}</label>
                   <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-purple)]" placeholder={t("contact.placeholders.email")} />
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">{t("contact.labels.message")}</label>
                   <textarea rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-purple)]" placeholder={t("contact.placeholders.message")}></textarea>
                 </div>
                 <button type="button" className="w-full bg-[var(--color-brand-purple)] text-white font-bold py-3 px-4 rounded-xl hover:bg-[var(--color-brand-purple)]/90 transition-colors">
                   {t("contact.send")}
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
                 <div>
                    <h4 className="text-lg font-bold mb-1">{t("contact.info.addressTitle")}</h4>
                    <p className="text-gray-600">
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
