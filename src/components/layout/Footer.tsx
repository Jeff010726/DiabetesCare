import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Facebook, Instagram, MessageCircle } from "lucide-react";
import { whatsappDirectUrl } from "../../lib/booking";

const facebookUrl = "https://www.facebook.com/people/XT-Diabetes-Care/61590817949229/";
const instagramUrl = "https://www.instagram.com/xtdiabetescare/";

export default function Footer() {
  const { t } = useTranslation();
  const socialIconClass = "flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition hover:border-[var(--color-brand-purple)] hover:text-[var(--color-brand-purple)]";

  return (
    <footer className="bg-white border-t border-gray-100 py-12 mt-12 bg-[var(--color-brand-purple-light)]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <span className="w-9 h-9 flex items-center justify-center">
                <img
                  src={`${import.meta.env.BASE_URL}logo.png`}
                  alt={t("brand.logoAlt")}
                  className="w-8 h-8 object-contain"
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
              <li><Link to="/glp1-training" className="hover:text-[var(--color-brand-purple)]">{t("services.glp1.name")}</Link></li>
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
            <div className="mt-5 flex items-center gap-3">
              <a href={instagramUrl} target="_blank" rel="noreferrer" className={socialIconClass} aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href={facebookUrl} target="_blank" rel="noreferrer" className={socialIconClass} aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href={whatsappDirectUrl} target="_blank" rel="noreferrer" className={`${socialIconClass} hover:text-green-600`} aria-label="WhatsApp">
                <MessageCircle className="h-5 w-5" />
              </a>
              <div className="group relative">
                <button type="button" className={`${socialIconClass} hover:text-[#07c160]`} aria-label="WeChat">
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
                    <path d="M9.25 4C5.25 4 2 6.66 2 9.94c0 1.84 1.03 3.49 2.64 4.58l-.63 2.15 2.47-1.24c.86.29 1.8.45 2.77.45 4 0 7.25-2.66 7.25-5.94S13.25 4 9.25 4Zm-2.3 4.6a.9.9 0 1 1 0-1.8.9.9 0 0 1 0 1.8Zm4.6 0a.9.9 0 1 1 0-1.8.9.9 0 0 1 0 1.8Z" />
                    <path d="M22 14.06c0-2.72-2.69-4.93-6.01-4.93h-.28c.05.26.08.53.08.81 0 3.79-3.68 6.87-8.19 6.87-.16 0-.32 0-.48-.01 1.03 1.34 2.94 2.24 5.12 2.24.75 0 1.47-.11 2.14-.31l2.06 1.03-.53-1.75C19.55 17.25 22 15.82 22 14.06Zm-7.87-1.11a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Zm3.7 0a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                  </svg>
                </button>
                <div className="pointer-events-none absolute bottom-full right-0 z-20 mb-3 w-56 rounded-2xl border border-gray-200 bg-white p-3 opacity-0 shadow-xl transition group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100">
                  <img
                    src={`${import.meta.env.BASE_URL}social/wechat-qr-v2.webp`}
                    alt={t("footer.wechatQrAlt")}
                    className="w-full rounded-xl object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 flex justify-between items-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} {t("brand.name")}. {t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
