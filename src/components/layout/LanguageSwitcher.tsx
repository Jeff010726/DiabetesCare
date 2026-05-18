import { Languages } from "lucide-react";
import { useTranslation } from "react-i18next";
import { localeLabels, supportedLocales, type SupportedLocale } from "../../i18n";

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const activeLocale = (i18n.resolvedLanguage || i18n.language || "en") as SupportedLocale;

  return (
    <label className="inline-flex items-center gap-2 text-sm font-medium text-gray-600">
      <span className="sr-only">{t("languageSwitcher.label")}</span>
      <Languages className="h-4 w-4 text-[var(--color-brand-purple)]" aria-hidden="true" />
      <select
        value={supportedLocales.includes(activeLocale) ? activeLocale : "en"}
        onChange={(event) => void i18n.changeLanguage(event.target.value)}
        aria-label={t("languageSwitcher.ariaLabel")}
        className="max-w-[9.5rem] rounded-md border border-gray-200 bg-white px-2 py-1.5 text-sm text-gray-700 shadow-sm outline-none transition-colors hover:border-[var(--color-brand-purple)] focus:border-[var(--color-brand-purple)] focus:ring-2 focus:ring-[var(--color-brand-purple)]/20"
      >
        {supportedLocales.map((locale) => (
          <option key={locale} value={locale}>
            {localeLabels[locale]}
          </option>
        ))}
      </select>
    </label>
  );
}
