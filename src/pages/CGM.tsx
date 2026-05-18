import { Activity, Smartphone, LineChart, FileLineChart } from "lucide-react";
import { Link } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import "../locales/servicePages";

export default function CGM() {
  const { t } = useTranslation("servicePages");
  const devices = t("cgm.devices", { returnObjects: true }) as Array<{ name: string; maker: string; desc: string }>;

  return (
    <div className="bg-white">
      <div className="bg-yellow-50/50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <LineChart className="w-16 h-16 text-yellow-500 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t("cgm.heroTitle")}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("cgm.heroSubtitle")}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {devices.map((device, index) => (
            <div key={device.name} className={`bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-center${index === 1 ? " transform md:-translate-y-4" : ""}`}>
              <h3 className="text-2xl font-black text-gray-900 mb-2">{device.name}</h3>
              <p className="text-sm font-medium text-[var(--color-brand-purple)] mb-4">{device.maker}</p>
              <p className="text-gray-600">{device.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-[var(--color-brand-purple-light)]/40 rounded-3xl p-8 md:p-16 flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 w-full order-2 md:order-1">
             <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-white flex flex-col items-center text-center">
                  <Smartphone className="w-8 h-8 text-[var(--color-brand-purple)] mb-3" />
                  <span className="font-semibold">{t("cgm.features.appSetup")}</span>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-white flex flex-col items-center text-center mt-8">
                  <Activity className="w-8 h-8 text-[var(--color-brand-pink)] mb-3" />
                  <span className="font-semibold">{t("cgm.features.arrowTrends")}</span>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-white flex flex-col items-center text-center -mt-8">
                  <FileLineChart className="w-8 h-8 text-yellow-500 mb-3" />
                  <span className="font-semibold">{t("cgm.features.agpReports")}</span>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-white flex flex-col items-center text-center">
                  <LineChart className="w-8 h-8 text-green-500 mb-3" />
                  <span className="font-semibold">{t("cgm.features.timeInRange")}</span>
                </div>
             </div>
          </div>
          <div className="flex-1 order-1 md:order-2">
            <h2 className="text-3xl font-bold mb-6">{t("cgm.beyondTitle")}</h2>
            <p className="text-lg text-gray-600 mb-6">
              {t("cgm.beyondIntro")}
            </p>
            <p className="text-lg text-gray-600 mb-8">
              <Trans
                i18nKey="cgm.beyondBody"
                ns="servicePages"
                components={{ strong: <strong /> }}
              />
            </p>
            <Link to="/contact" className="inline-block bg-[var(--color-brand-purple)] text-white px-8 py-4 rounded-xl font-bold hover:bg-[var(--color-brand-purple)]/90 transition-colors shadow-sm">
              {t("cgm.scheduleButton")}
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
