import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function RootLayout() {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.resolvedLanguage || i18n.language || "en";
    document.documentElement.dir = "ltr";
  }, [i18n.language, i18n.resolvedLanguage]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
