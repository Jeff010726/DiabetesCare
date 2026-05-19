import { ArrowRight, Stethoscope } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

type ProviderAccessCalloutProps = {
  tone?: "purple" | "pink" | "yellow" | "green";
};

const toneClasses = {
  purple: "bg-[var(--color-brand-purple-light)]/60 border-[var(--color-brand-purple)]/15 text-[var(--color-brand-purple)]",
  pink: "bg-[var(--color-brand-pink-light)]/70 border-[var(--color-brand-pink)]/20 text-[var(--color-brand-pink)]",
  yellow: "bg-yellow-50 border-yellow-100 text-yellow-600",
  green: "bg-green-50 border-green-100 text-green-600",
};

export default function ProviderAccessCallout({ tone = "purple" }: ProviderAccessCalloutProps) {
  const { t } = useTranslation("servicePages");

  return (
    <div className={`rounded-3xl border p-6 md:p-8 ${toneClasses[tone]}`}>
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm">
            <Stethoscope className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{t("providerAccess.title")}</h2>
            <p className="text-gray-700 leading-relaxed">{t("providerAccess.body")}</p>
          </div>
        </div>
        <Link
          to="/contact"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-bold text-gray-800 shadow-sm transition-colors hover:bg-gray-50"
        >
          {t("providerAccess.button")} <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </div>
  );
}
