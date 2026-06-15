import { Activity, Smartphone, LineChart, FileLineChart, ExternalLink, ClipboardCheck } from "lucide-react";
import { Trans, useTranslation } from "react-i18next";
import ProviderAccessCallout from "../components/ProviderAccessCallout";
import { bookingUrl } from "../lib/booking";
import "../locales/servicePages";

export default function CGM() {
  const { t } = useTranslation("servicePages");
  const devices = t("cgm.devices", { returnObjects: true }) as Array<{ name: string; maker: string; logo?: string; desc: string; sourceUrl: string }>;
  const cgmOfficialUrls: Record<string, string> = {
    "FreeStyle Libre": "https://www.freestyle.abbott/us-en/home.html",
    "Dexcom G7/G6": "https://www.dexcom.com/",
    Stelo: "https://www.stelo.com/",
    Lingo: "https://www.hellolingo.com/",
  };
  const cgmLogoUrls: Record<string, string> = {
    "FreeStyle Libre": "cgm-logos/freestyle-libre-v2.png",
    "Dexcom G7/G6": "cgm-logos/dexcom-v2.png",
    Stelo: "cgm-logos/stelo-v2.png",
    Lingo: "cgm-logos/lingo-v2.png",
  };
  const visibleDevices = devices.some((device) => device.name === "Lingo")
    ? devices
    : [
        ...devices,
        {
          name: "Lingo",
          maker: "Abbott",
          logo: cgmLogoUrls.Lingo,
          desc: t("cgm.lingoFallbackDesc"),
          sourceUrl: cgmOfficialUrls.Lingo,
        },
      ];

  return (
    <div className="bg-white">
      <div className="bg-yellow-50/50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Activity className="w-16 h-16 text-yellow-500 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t("cgm.heroTitle")}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("cgm.heroSubtitle")}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {visibleDevices.map((device) => (
            <div key={device.name} className="flex min-h-[360px] flex-col bg-white p-7 rounded-3xl border border-gray-100 shadow-sm text-center">
              <div className="mb-6 flex h-20 items-center justify-center px-5">
                <img
                  src={`${import.meta.env.BASE_URL}${device.logo || cgmLogoUrls[device.name]}`}
                  alt={t("cgm.logoAlt", { name: device.name })}
                  className="h-12 w-full object-contain"
                  loading="lazy"
                />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-2">{device.name}</h3>
              <p className="text-sm font-medium text-[var(--color-brand-purple)] mb-4">{device.maker}</p>
              <p className="text-gray-600 mb-5 flex-grow">{device.desc}</p>
              <a href={device.sourceUrl || cgmOfficialUrls[device.name]} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 text-sm font-bold text-[var(--color-brand-purple)] hover:text-[var(--color-brand-pink)]">
                {t("cgm.officialWebsite")} <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>

        <div className="bg-[var(--color-brand-purple-light)]/40 rounded-3xl p-5 sm:p-8 md:p-16 flex flex-col md:flex-row gap-8 md:gap-12 items-center">
          <div className="flex-1 w-full order-2 md:order-1">
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="min-h-32 sm:min-h-36 bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-white flex flex-col items-center justify-center text-center">
                  <Smartphone className="w-7 h-7 sm:w-8 sm:h-8 text-[var(--color-brand-purple)] mb-3" />
                  <span className="text-base sm:text-lg font-semibold leading-tight">{t("cgm.features.appSetup")}</span>
                </div>
                <div className="min-h-32 sm:min-h-36 bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-white flex flex-col items-center justify-center text-center">
                  <Activity className="w-7 h-7 sm:w-8 sm:h-8 text-[var(--color-brand-pink)] mb-3" />
                  <span className="text-base sm:text-lg font-semibold leading-tight">{t("cgm.features.arrowTrends")}</span>
                </div>
                <div className="min-h-32 sm:min-h-36 bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-white flex flex-col items-center justify-center text-center">
                  <FileLineChart className="w-7 h-7 sm:w-8 sm:h-8 text-yellow-500 mb-3" />
                  <span className="text-base sm:text-lg font-semibold leading-tight">{t("cgm.features.agpReports")}</span>
                </div>
                <div className="min-h-32 sm:min-h-36 bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-white flex flex-col items-center justify-center text-center">
                  <ClipboardCheck className="w-7 h-7 sm:w-8 sm:h-8 text-blue-500 mb-3" />
                  <span className="text-base sm:text-lg font-semibold leading-tight">{t("cgm.features.reportInterpretation")}</span>
                </div>
                <div className="min-h-32 sm:min-h-36 bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-white flex flex-col items-center justify-center text-center sm:col-span-2">
                  <LineChart className="w-7 h-7 sm:w-8 sm:h-8 text-green-500 mb-3" />
                  <span className="text-base sm:text-lg font-semibold leading-tight">{t("cgm.features.timeInRange")}</span>
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
            <a href={bookingUrl} className="inline-block bg-[var(--color-brand-purple)] text-white px-8 py-4 rounded-xl font-bold hover:bg-[var(--color-brand-purple)]/90 transition-colors shadow-sm">
              {t("cgm.scheduleButton")}
            </a>
          </div>
        </div>

        <div className="mt-12">
          <ProviderAccessCallout tone="yellow" />
        </div>

      </div>
    </div>
  );
}
