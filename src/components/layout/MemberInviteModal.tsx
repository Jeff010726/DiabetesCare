import { ArrowRight, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

const authKey = "xt-member-authenticated";

export default function MemberInviteModal() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (pathname !== "/") {
      setIsOpen(false);
      return;
    }

    const isAuthenticated = window.localStorage.getItem(authKey) === "true";
    setIsOpen(!isAuthenticated);
  }, [pathname]);

  const close = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-gray-950/55 px-3 py-4">
      <div
        className="relative max-h-[calc(100svh-2rem)] w-full max-w-md overflow-y-auto rounded-2xl bg-white shadow-[0_30px_90px_-35px_rgba(15,23,42,0.65)] md:max-w-4xl md:overflow-hidden md:rounded-3xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="member-invite-title"
      >
        <button
          type="button"
          onClick={close}
          className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-gray-600 shadow-sm transition-colors hover:bg-white hover:text-gray-900 md:right-4 md:top-4 md:h-10 md:w-10"
          aria-label={t("memberInvite.close")}
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid md:grid-cols-[1fr_0.95fr]">
          <div className="relative h-40 md:h-auto md:min-h-[430px] bg-gray-100">
            <img
              src={`${import.meta.env.BASE_URL}hero-diabetes-care.webp`}
              alt={t("memberInvite.imageAlt")}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950/65 via-gray-950/10 to-transparent md:bg-gradient-to-r md:from-gray-950/55 md:via-gray-950/10 md:to-transparent" />
            <div className="absolute bottom-4 left-4 right-12 text-white md:bottom-5 md:left-5 md:right-5">
              <p className="text-2xl font-bold leading-tight md:text-4xl">{t("memberInvite.bannerTitle")}</p>
              <p className="mt-1 text-lg font-bold text-white/95 md:text-2xl">{t("memberInvite.bannerHighlight")}</p>
            </div>
          </div>

          <div className="p-5 md:p-8 lg:p-10">
            <span className="inline-flex items-center rounded-full bg-[var(--color-brand-purple-light)] px-3 py-1.5 text-xs font-bold text-[var(--color-brand-purple)] md:px-3.5 md:py-2 md:text-sm">
              {t("memberInvite.badge")}
            </span>
            <h2 id="member-invite-title" className="mt-4 text-2xl font-bold leading-tight text-gray-900 md:mt-5 md:text-3xl">{t("memberInvite.title")}</h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-600 md:mt-4 md:text-base">{t("memberInvite.desc")}</p>
            <ul className="mt-4 space-y-2.5 text-sm font-semibold text-gray-700 md:mt-5 md:space-y-3">
              {(t("memberInvite.benefits", { returnObjects: true }) as string[]).map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[var(--color-brand-pink)]" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row md:mt-7">
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
