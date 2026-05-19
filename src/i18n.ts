import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { en } from "./locales/en";
import { zhCN } from "./locales/zh-CN";
import { zhTW } from "./locales/zh-TW";
import { es } from "./locales/es";

export const supportedLocales = ["en", "zh-CN", "zh-TW", "es"] as const;
export type SupportedLocale = (typeof supportedLocales)[number];

export const localeLabels: Record<SupportedLocale, string> = {
  en: "English",
  "zh-CN": "\u7b80\u4f53\u4e2d\u6587",
  "zh-TW": "\u7e41\u9ad4\u4e2d\u6587",
  es: "Espa\u00f1ol",
};

type LocaleResource = {
  common: Record<string, unknown>;
  home: Record<string, unknown>;
  servicePages: Record<string, unknown>;
  recipes: Record<string, unknown>;
};

type RawLocaleResource = Omit<LocaleResource, "recipes"> & {
  recipes: unknown;
};

function normalizeLocale(resource: RawLocaleResource): LocaleResource {
  return {
    common: resource.common,
    home: resource.home,
    servicePages: resource.servicePages,
    recipes: Array.isArray(resource.recipes) ? { items: resource.recipes } : (resource.recipes as Record<string, unknown>),
  };
}

const localeResources: Record<SupportedLocale, LocaleResource> = {
  en: normalizeLocale(en),
  "zh-CN": normalizeLocale(zhCN),
  "zh-TW": normalizeLocale(zhTW),
  es: normalizeLocale(es),
};

const resources = Object.fromEntries(
  supportedLocales.map((locale) => [
    locale,
    {
      translation: localeResources[locale].common,
      home: localeResources[locale].home,
      servicePages: localeResources[locale].servicePages,
      recipes: localeResources[locale].recipes,
    },
  ]),
);

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    supportedLngs: supportedLocales,
    load: "currentOnly",
    ns: ["translation", "home", "servicePages", "recipes"],
    defaultNS: "translation",
    detection: {
      order: ["querystring", "localStorage", "navigator", "htmlTag"],
      lookupQuerystring: "lng",
      caches: ["localStorage"],
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
