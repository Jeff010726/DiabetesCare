import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "./Navbar";
import Footer from "./Footer";
import MemberInviteModal from "./MemberInviteModal";
import BookingStickyBar from "./BookingStickyBar";
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
    <div className="flex min-h-screen flex-col pb-36 md:pb-24">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <BookingStickyBar />
      <Footer />
      <MemberInviteModal />
    </div>
  );
}
