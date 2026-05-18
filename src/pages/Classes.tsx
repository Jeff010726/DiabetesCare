import { GraduationCap, Globe2, Video, Users, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../locales/servicePages";

export default function Classes() {
  const { t } = useTranslation("servicePages");
  const curriculum = t("classes.curriculum", { returnObjects: true }) as Array<{ title: string; desc: string }>;

  return (
    <div className="bg-white">
      <div className="bg-[var(--color-brand-purple-light)]/40 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {t("classes.heroTitle")}
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                {t("classes.heroSubtitle")}
              </p>
              <div className="flex flex-wrap gap-4">
                <span className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full text-[var(--color-brand-purple)] font-medium text-sm shadow-sm">
                  <Globe2 className="w-4 h-4" /> {t("classes.bilingual")}
                </span>
                <span className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full text-gray-600 font-medium text-sm shadow-sm">
                  <Video className="w-4 h-4" /> {t("classes.delivery")}
                </span>
              </div>
            </div>
            <div className="flex-1 w-full flex justify-center">
               <div className="w-full max-w-sm aspect-square bg-white rounded-full shadow-lg border-[12px] border-[var(--color-brand-purple-light)] flex items-center justify-center p-8 text-center flex-col">
                  <GraduationCap className="w-16 h-16 text-[var(--color-brand-purple)] mb-4" />
                  <h3 className="text-2xl font-bold">{t("classes.hours")}</h3>
                  <p className="text-gray-500">{t("classes.hoursDescription")}</p>
               </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">{t("classes.curriculumTitle")}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t("classes.curriculumIntro")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {curriculum.map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
              <CheckCircle2 className="w-6 h-6 text-[var(--color-brand-purple)] shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[var(--color-brand-pink-light)]/50 rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto">
          <Users className="w-12 h-12 text-[var(--color-brand-pink)] mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">{t("classes.ctaTitle")}</h2>
          <p className="text-lg text-gray-700 mb-8">
            {t("classes.ctaBody")}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
             <Link to="/coverage" className="bg-[var(--color-brand-purple)] text-white px-8 py-4 rounded-full font-bold hover:bg-[var(--color-brand-purple)]/90 transition-all">
               {t("classes.insuranceButton")}
             </Link>
             <Link to="/contact" className="bg-white text-[var(--color-brand-purple)] border-2 border-[var(--color-brand-purple)] px-8 py-4 rounded-full font-bold hover:bg-gray-50 transition-all">
               {t("classes.contactButton")}
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
