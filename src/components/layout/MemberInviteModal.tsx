import { ArrowRight, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

const dismissedKey = "xt-member-invite-dismissed";
const authKey = "xt-member-authenticated";

export default function MemberInviteModal() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (pathname === "/member") return;

    const isAuthenticated = window.localStorage.getItem(authKey) === "true";
    const dismissed = window.sessionStorage.getItem(dismissedKey) === "true";
    setIsOpen(!isAuthenticated && !dismissed);
  }, [pathname]);

  const close = () => {
    window.sessionStorage.setItem(dismissedKey, "true");
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-gray-950/55 px-4 py-6">
      <div
        className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-[0_30px_90px_-35px_rgba(15,23,42,0.65)]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="member-invite-title"
      >
        <button
          type="button"
          onClick={close}
          className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-gray-600 shadow-sm transition-colors hover:bg-white hover:text-gray-900"
          aria-label={t("memberInvite.close")}
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid md:grid-cols-[1fr_0.95fr]">
          <div className="relative min-h-[230px] md:min-h-[430px] bg-gray-100">
            <img
              src={`${import.meta.env.BASE_URL}hero-diabetes-care.webp`}
              alt={t("memberInvite.imageAlt")}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950/65 via-gray-950/10 to-transparent md:bg-gradient-to-r md:from-gray-950/55 md:via-gray-950/10 md:to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <p className="text-3xl font-bold leading-tight md:text-4xl">{t("memberInvite.bannerTitle")}</p>
              <p className="mt-1 text-xl font-bold text-white/95 md:text-2xl">{t("memberInvite.bannerHighlight")}</p>
            </div>
          </div>

          <div className="p-6 md:p-8 lg:p-10">
            <span className="inline-flex items-center rounded-full bg-[var(--color-brand-purple-light)] px-3.5 py-2 text-sm font-bold text-[var(--color-brand-purple)]">
              {t("memberInvite.badge")}
            </span>
            <h2 id="member-invite-title" className="mt-5 text-3xl font-bold leading-tight text-gray-900">{t("memberInvite.title")}</h2>
            <p className="mt-4 text-base leading-relaxed text-gray-600">{t("memberInvite.desc")}</p>
            <ul className="mt-5 space-y-3 text-sm font-semibold text-gray-700">
              {(t("memberInvite.benefits", { returnObjects: true }) as string[]).map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[var(--color-brand-pink)]" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/member"
                onClick={close}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-brand-purple)] px-6 py-3 font-bold text-white shadow-md transition-colors hover:bg-[var(--color-brand-purple)]/90"
              >
                {t("memberInvite.cta")} <ArrowRight className="h-4 w-4" />
              </Link>
              <button
                type="button"
                onClick={close}
                className="inline-flex items-center justify-center rounded-full border border-gray-200 px-6 py-3 font-bold text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
              >
                {t("memberInvite.later")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
