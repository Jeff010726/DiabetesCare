import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-white border-t border-gray-100 py-12 mt-12 bg-[var(--color-brand-purple-light)]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <span className="w-9 h-9 rounded-xl bg-white border border-[var(--color-brand-purple)]/10 flex items-center justify-center overflow-hidden shadow-sm">
                <img
                  src={`${import.meta.env.BASE_URL}logo.png`}
                  alt={t("brand.logoAlt")}
                  className="w-7 h-7 object-contain"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />
              </span>
              <span className="font-heading font-bold text-xl text-[var(--color-brand-purple)] tracking-tight">
                {t("brand.name")}
              </span>
            </Link>
            <p className="text-gray-500 text-sm">
              {t("footer.tagline")}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">{t("footer.servicesHeading")}</h3>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><Link to="/classes" className="hover:text-[var(--color-brand-purple)]">{t("services.classes.name")}</Link></li>
              <li><Link to="/pump-training" className="hover:text-[var(--color-brand-purple)]">{t("services.pump.name")}</Link></li>
              <li><Link to="/cgm" className="hover:text-[var(--color-brand-purple)]">{t("services.cgm.name")}</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">{t("footer.professionalsHeading")}</h3>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><Link to="/providers" className="hover:text-[var(--color-brand-purple)]">{t("services.providers.name")}</Link></li>
              <li><Link to="/coverage" className="hover:text-[var(--color-brand-purple)]">{t("footer.insuranceInfo")}</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">{t("footer.connectHeading")}</h3>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><Link to="/contact" className="hover:text-[var(--color-brand-purple)]">{t("footer.contactUs")}</Link></li>
              <li><Link to="/recipes" className="hover:text-[var(--color-brand-purple)]">{t("nav.healthyRecipes")}</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 flex justify-between items-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} {t("brand.name")}. {t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
