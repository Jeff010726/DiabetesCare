import { FileText, Clock, Users, ArrowRight, ShieldCheck, Download } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Providers() {
  const { t } = useTranslation("servicePages");
  const values = t("providers.values", { returnObjects: true }) as Array<{ title: string; desc: string }>;
  const referralCandidates = t("providers.referralCandidates", { returnObjects: true }) as string[];
  const valueIcons = [Clock, Users, FileText];
  const valueTones = [
    "bg-[var(--color-brand-purple)]/10 text-[var(--color-brand-purple)]",
    "bg-[var(--color-brand-pink)]/10 text-[var(--color-brand-pink)]",
    "bg-yellow-50 text-yellow-600",
  ];

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-[var(--color-brand-purple)] py-16 border-b border-[var(--color-brand-purple)]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-white font-medium text-sm mb-6">
            <ShieldCheck className="w-5 h-5" /> {t("providers.badge")}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold !text-white mb-6">
            {t("providers.heroLine1")} <br/> {t("providers.heroLine2")}
          </h1>
          <p className="text-xl text-white/85 max-w-3xl mx-auto">
            {t("providers.heroSubtitle")}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Value Prop */}
        <div className="grid md:grid-cols-3 gap-12 mb-24">
          {values.map((value, index) => {
            const Icon = valueIcons[index] ?? FileText;
            return (
              <div key={value.title} className="flex flex-col items-center text-center">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${valueTones[index] ?? valueTones[0]}`}>
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Action Section */}
        <div className="bg-gray-50 rounded-3xl p-8 md:p-12 border border-gray-100 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">{t("providers.referTitle")}</h2>
            <p className="text-gray-600 mb-6 text-lg">
              {t("providers.referIntro")}
            </p>
            <p className="mb-6 rounded-2xl border border-[var(--color-brand-purple)]/15 bg-white px-5 py-4 text-base font-bold text-[var(--color-brand-purple)] shadow-sm">
              {t("providers.faxLine")}
            </p>
            <ul className="space-y-4 mb-8">
              {referralCandidates.map((candidate) => (
                <li key={candidate} className="flex items-start">
                  <ArrowRight className="w-5 h-5 text-[var(--color-brand-purple)] mr-3 mt-1 shrink-0" />
                  <span className="text-gray-700">{candidate}</span>
                </li>
              ))}
            </ul>
            
            <button className="flex items-center gap-2 bg-[var(--color-brand-purple)] text-white px-6 py-3 rounded-xl font-medium hover:bg-[var(--color-brand-purple)]/90 transition-colors w-full sm:w-auto justify-center shadow-sm">
              <Download className="w-5 h-5" /> {t("providers.downloadButton")}
            </button>
          </div>
          
          {/* Accred badge / image */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="mb-6 flex w-full max-w-sm items-center justify-center rounded-2xl border border-gray-100 bg-gray-50 p-5">
              <img
                src={`${import.meta.env.BASE_URL}adces-deap-accreditation.webp`}
                alt={t("providers.accreditedTitle")}
                className="max-h-28 max-w-full object-contain"
              />
            </div>
            <h3 className="text-2xl font-bold mb-2">{t("providers.accreditedTitle")}</h3>
            <p className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-widest">{t("providers.accreditedId")}</p>
            <p className="text-gray-600 text-sm">
              {t("providers.accreditedBody")}
            </p>
            <div className="mt-6 w-full overflow-hidden rounded-2xl border border-gray-100 bg-gray-50">
              <img
                src={`${import.meta.env.BASE_URL}adces-deap-certificate.webp`}
                alt={t("providers.certificateAlt")}
                className="w-full object-contain"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
