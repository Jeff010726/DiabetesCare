import { ShieldCheck, FileCheck, PhoneCall, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import "../locales/servicePages";

export default function Coverage() {
  const { t } = useTranslation("servicePages");
  const requirements = t("coverage.requirements", { returnObjects: true }) as string[];
  const steps = t("coverage.steps", { returnObjects: true }) as string[];

  return (
    <div className="bg-white">
      <div className="bg-yellow-50/50 py-16 border-b border-yellow-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ShieldCheck className="w-16 h-16 text-yellow-500 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t("coverage.heroTitle")}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("coverage.heroSubtitle")}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-16 items-start mb-20">
          <div>
            <h2 className="text-3xl font-bold mb-6">{t("coverage.medicareTitle")}</h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full bg-[var(--color-brand-purple)]" />
                <h3 className="text-xl font-bold mb-2">{t("coverage.dsmesTitle")}</h3>
                <p className="text-gray-600">
                  <Trans
                    i18nKey="coverage.dsmesBody"
                    ns="servicePages"
                    components={{ strong: <strong className="text-gray-900" /> }}
                  />
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full bg-[var(--color-brand-pink)]" />
                <h3 className="text-xl font-bold mb-2">{t("coverage.mntTitle")}</h3>
                <p className="text-gray-600">
                  <Trans
                    i18nKey="coverage.mntBody"
                    ns="servicePages"
                    components={{ strong: <strong className="text-gray-900" /> }}
                  />
                </p>
              </div>
              <p className="text-sm text-gray-500 italic">
                {t("coverage.researchNote")}
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-3xl p-8 border border-gray-200">
            <h2 className="text-2xl font-bold mb-6">{t("coverage.requirementsTitle")}</h2>
            <p className="text-gray-600 mb-6">
              {t("coverage.requirementsIntro")}
            </p>
            <ul className="space-y-4 mb-8">
              {requirements.map((requirement) => (
                <li key={requirement} className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 shrink-0" />
                  <span className="text-gray-700">{requirement}</span>
                </li>
              ))}
            </ul>
            <div className="bg-white p-4 rounded-xl text-sm text-gray-500 border border-gray-100">
              {t("coverage.payorNote")}
            </div>
          </div>
        </div>

        <div className="bg-[var(--color-brand-purple)] text-white rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl font-bold mb-4">{t("coverage.stepsTitle")}</h2>
            <ol className="space-y-4 text-lg text-purple-100 list-decimal list-inside">
              {steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
          <div className="flex flex-col gap-4 min-w-[200px]">
            <button className="flex items-center justify-center gap-2 bg-white text-[var(--color-brand-purple)] px-6 py-4 rounded-xl font-bold hover:bg-gray-50 transition-colors">
              <FileCheck className="w-5 h-5" /> {t("coverage.downloadButton")}
            </button>
            <Link to="/contact" className="flex items-center justify-center gap-2 bg-transparent text-white border border-white/30 px-6 py-4 rounded-xl font-bold hover:bg-white/10 transition-colors">
              <PhoneCall className="w-5 h-5" /> {t("coverage.contactButton")}
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
