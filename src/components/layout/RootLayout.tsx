import { Link, Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "./Navbar";
import Footer from "./Footer";
import MemberInviteModal from "./MemberInviteModal";
import { installClickTracking, trackPageView } from "../../lib/analytics";

export default function RootLayout() {
  const { i18n } = useTranslation();
  const { pathname } = useLocation();

  useEffect(() => {
    document.documentElement.lang = i18n.resolvedLanguage || i18n.language || "en";
    document.documentElement.dir = "ltr";
  }, [i18n.language, i18n.resolvedLanguage]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    trackPageView();
  }, [pathname]);

  useEffect(() => installClickTracking(), []);

  return (
    <div className="flex min-h-screen flex-col pb-16 md:pb-0">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white/95 p-3 shadow-[0_-12px_30px_-24px_rgba(31,41,55,0.45)] backdrop-blur md:hidden">
        <Link
          to="/booking"
          className="flex w-full items-center justify-center rounded-xl bg-[var(--color-brand-pink)] px-4 py-3 text-sm font-bold text-white"
        >
          Book free consultation
        </Link>
      </div>
      <Footer />
      <MemberInviteModal />
    </div>
  );
}
