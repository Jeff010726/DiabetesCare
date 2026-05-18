import { Link } from "react-router-dom";
import { 
  ShieldCheck, Stethoscope, BookOpen, Activity, ArrowRight, 
  HeartPulse, CheckCircle2, Globe2, MonitorSmartphone, ClipboardList,
  ChevronLeft, ChevronRight, Languages, Dumbbell, GraduationCap, BadgeCheck
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTranslation } from "react-i18next";
import "./homeI18n";

export default function Home() {
  const { t } = useTranslation("home");
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroDiabetesCareSrc = `${import.meta.env.BASE_URL}hero-diabetes-care.webp`;
  const heroPumpTrainingSrc = `${import.meta.env.BASE_URL}hero-pump-training.webp`;
  const heroCgmSrc = `${import.meta.env.BASE_URL}hero-cgm.webp`;
  const tanPhotoSrc = `${import.meta.env.BASE_URL}tan-profile.webp`;
  const insuranceLogoSrc = (file: string) => `${import.meta.env.BASE_URL}insurance/${file}`;
  const fallbackTanPhoto =
    "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80";
  const insuranceLogos = [
    { name: "Medicare", file: "medicare.webp" },
    { name: "Humana", file: "humana.webp" },
    { name: "Healthfirst", file: "healthfirst.webp" },
    { name: "MagnaCare", file: "magnacare.webp" },
    { name: t("insurance.partnerName"), file: "insurance-partner-1.webp" },
    { name: t("insurance.partnerName"), file: "insurance-partner-2.webp" },
    { name: t("insurance.partnerName"), file: "insurance-partner-3.webp" },
    { name: t("insurance.partnerName"), file: "insurance-partner-4.webp" },
    { name: t("insurance.partnerName"), file: "insurance-partner-5.webp" }
  ];

  const slides = [
    {
      badge: t("hero.slides.diabetesCare.badge"),
      title: t("hero.slides.diabetesCare.title"),
      highlight: t("hero.slides.diabetesCare.highlight"),
      desc: t("hero.slides.diabetesCare.desc"),
      img: heroDiabetesCareSrc,
      cta1Title: t("hero.slides.diabetesCare.cta1"),
      cta1Link: "/classes",
      cta2Title: t("hero.slides.diabetesCare.cta2"),
      cta2Link: "/contact"
    },
    {
      badge: t("hero.slides.pumpTraining.badge"),
      title: t("hero.slides.pumpTraining.title"),
      highlight: t("hero.slides.pumpTraining.highlight"),
      desc: t("hero.slides.pumpTraining.desc"),
      img: heroPumpTrainingSrc,
      cta1Title: t("hero.slides.pumpTraining.cta1"),
      cta1Link: "/pump-training",
      cta2Title: t("hero.slides.pumpTraining.cta2"),
      cta2Link: "/contact"
    },
    {
      badge: t("hero.slides.cgm.badge"),
      title: t("hero.slides.cgm.title"),
      highlight: t("hero.slides.cgm.highlight"),
      desc: t("hero.slides.cgm.desc"),
      img: heroCgmSrc,
      cta1Title: t("hero.slides.cgm.cta1"),
      cta1Link: "/cgm",
      cta2Title: t("hero.slides.cgm.cta2"),
      cta2Link: "/classes"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[currentSlide];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden h-[85vh] min-h-[600px] bg-gray-50">
        <AnimatePresence mode="sync">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <img 
              src={slide.img} 
              alt={t("hero.backgroundAlt", { title: slide.title })}
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Gradient overlay keeps hero copy readable across all slides */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 md:to-transparent to-white/60"></div>
            
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
                <div className="max-w-3xl pt-16">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-brand-purple)]/10 text-[var(--color-brand-purple)] font-medium text-sm mb-6 border border-[var(--color-brand-purple)]/20 shadow-sm">
                    <ShieldCheck className="w-4 h-4 text-[var(--color-brand-pink)]" />
                    {slide.badge}
                  </span>
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 mb-6 leading-tight">
                    {slide.title} <br />
                    <span className="text-[var(--color-brand-purple)]">{slide.highlight}</span>
                  </h1>
                  <p className="text-xl text-gray-700 mb-8 leading-relaxed max-w-2xl font-medium">
                    {slide.desc}
                  </p>
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <Link
                      to={slide.cta1Link}
                      className="bg-[var(--color-brand-purple)] text-white px-8 py-4 rounded-full font-bold hover:bg-[var(--color-brand-purple)]/90 transition-all text-lg shadow-lg hover:shadow-xl w-full sm:w-auto text-center flex items-center justify-center gap-2"
                    >
                      {slide.cta1Title} <ArrowRight className="w-5 h-5" />
                    </Link>
                    <Link
                      to={slide.cta2Link}
                      className="bg-white text-[var(--color-brand-purple)] border-2 border-[var(--color-brand-purple)]/20 px-8 py-4 rounded-full font-bold hover:bg-gray-50 transition-all text-lg w-full sm:w-auto text-center shadow-sm hover:shadow"
                    >
                      {slide.cta2Title}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slider Controls */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-3 rounded-full transition-all ${currentSlide === i ? "bg-[var(--color-brand-purple)] w-10" : "bg-gray-300 hover:bg-gray-400 w-3"}`}
              aria-label={t("hero.slideLabel", { number: i + 1 })}
            />
          ))}
        </div>
        
        {/* Navigation Arrows */}
        <button 
          onClick={() => setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white/60 hover:bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-[var(--color-brand-purple)] transition-all border border-white/50 shadow-sm hidden md:flex"
          aria-label={t("hero.previousSlide")}
        >
           <ChevronLeft className="w-8 h-8" />
        </button>
        <button 
          onClick={() => setCurrentSlide(prev => (prev + 1) % slides.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white/60 hover:bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-[var(--color-brand-purple)] transition-all border border-white/50 shadow-sm hidden md:flex"
          aria-label={t("hero.nextSlide")}
        >
           <ChevronRight className="w-8 h-8" />
        </button>
      </section>

      {/* Insurance Network Section */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-brand-purple-light)] text-[var(--color-brand-purple)] font-semibold text-sm mb-6 border border-[var(--color-brand-purple)]/15">
                <ShieldCheck className="w-4 h-4 text-[var(--color-brand-pink)]" />
                {t("insurance.badge")}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5 leading-tight">
                {t("insurance.title")}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                {t("insurance.desc")}
              </p>
              <Link
                to="/coverage"
                className="inline-flex items-center justify-center gap-2 bg-[var(--color-brand-purple)] text-white px-6 py-3 rounded-full font-bold hover:bg-[var(--color-brand-purple)]/90 transition-all shadow-md"
              >
                {t("insurance.cta")} <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {insuranceLogos.map((logo, index) => (
                  <div
                    key={`${logo.file}-${index}`}
                    className="h-28 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-center p-5 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <img
                      src={insuranceLogoSrc(logo.file)}
                      alt={t("insurance.logoAlt", { name: logo.name })}
                      className="max-h-16 max-w-full object-contain"
                    />
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-4">
                {t("insurance.note")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Expert Profile Section */}
      <section className="py-14 md:py-16 bg-[var(--color-brand-purple-light)]/30 border-y border-[var(--color-brand-purple)]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[340px_1fr] xl:grid-cols-[360px_1fr] gap-8 xl:gap-10 items-center">
            <div className="relative order-2 lg:order-1 max-w-[320px] sm:max-w-[360px] lg:max-w-none mx-auto w-full">
              <div className="relative overflow-hidden rounded-3xl bg-white shadow-[0_18px_50px_-30px_rgba(31,41,55,0.45)] border border-white">
                <img
                  src={tanPhotoSrc}
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = fallbackTanPhoto;
                  }}
                  alt={t("expert.photoAlt")}
                  className="w-full h-[300px] sm:h-[340px] lg:h-[390px] object-cover object-center"
                />
                <div className="absolute left-3 right-3 bottom-3 bg-white/92 backdrop-blur-md rounded-2xl p-3 shadow-md border border-white/80">
                  <p className="text-xs font-semibold text-[var(--color-brand-purple)] mb-0.5">{t("expert.languagesLabel")}</p>
                  <p className="text-sm text-gray-700 font-medium leading-snug">{t("expert.languages")}</p>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white text-[var(--color-brand-purple)] font-semibold text-sm mb-4 border border-[var(--color-brand-purple)]/15 shadow-sm">
                <BadgeCheck className="w-4 h-4 text-[var(--color-brand-pink)]" />
                {t("expert.badge")}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 leading-tight">
                {t("expert.namePrefix")} <span className="text-[var(--color-brand-purple)]">{t("expert.credentials")}</span>
              </h2>
              <p className="text-base text-gray-500 font-medium mb-4">{t("expert.preferredName")}</p>
              <div className="space-y-3 text-base md:text-lg text-gray-600 leading-relaxed mb-6 max-w-3xl">
                <p>
                  {t("expert.bio1")}
                </p>
                <p>
                  {t("expert.bio2")}
                </p>
              </div>

              <div className="grid sm:grid-cols-3 gap-3 mb-5">
                <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                  <GraduationCap className="w-5 h-5 text-[var(--color-brand-purple)] mb-2" />
                  <h3 className="text-sm font-bold text-gray-900 mb-1">{t("expert.cards.nutritionTitle")}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{t("expert.cards.nutritionDesc")}</p>
                </div>
                <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                  <Activity className="w-5 h-5 text-[var(--color-brand-pink)] mb-2" />
                  <h3 className="text-sm font-bold text-gray-900 mb-1">{t("expert.cards.diabetesTitle")}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{t("expert.cards.diabetesDesc")}</p>
                </div>
                <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                  <Dumbbell className="w-5 h-5 text-yellow-500 mb-2" />
                  <h3 className="text-sm font-bold text-gray-900 mb-1">{t("expert.cards.fitnessTitle")}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{t("expert.cards.fitnessDesc")}</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm mb-6 max-w-3xl">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[var(--color-brand-purple-light)] text-[var(--color-brand-purple)] flex items-center justify-center shrink-0">
                    <Languages className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{t("expert.focusTitle")}</h3>
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                      {t("expert.focusDesc")}
                    </p>
                  </div>
                </div>
              </div>

              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-[var(--color-brand-purple)] text-white px-6 py-3 rounded-full font-bold hover:bg-[var(--color-brand-purple)]/90 transition-all shadow-md hover:shadow-lg w-full sm:w-auto"
              >
                {t("expert.cta")} <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Patient Empathy Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{t("empathy.title")}</h2>
            <p className="text-xl text-gray-600">
              {t("empathy.desc")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 hover:shadow-md transition-shadow">
               <div className="w-12 h-12 bg-red-100 text-red-500 rounded-xl flex items-center justify-center mb-6">
                 <HeartPulse className="w-6 h-6" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-gray-900">{t("empathy.cards.spikesTitle")}</h3>
               <p className="text-gray-600">{t("empathy.cards.spikesDesc")}</p>
            </div>
            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 hover:shadow-md transition-shadow">
               <div className="w-12 h-12 bg-blue-100 text-blue-500 rounded-xl flex items-center justify-center mb-6">
                 <MonitorSmartphone className="w-6 h-6" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-gray-900">{t("empathy.cards.deviceTitle")}</h3>
               <p className="text-gray-600">{t("empathy.cards.deviceDesc")}</p>
            </div>
            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 hover:shadow-md transition-shadow">
               <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-6">
                 <ClipboardList className="w-6 h-6" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-gray-900">{t("empathy.cards.overloadTitle")}</h3>
               <p className="text-gray-600">{t("empathy.cards.overloadDesc")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t("services.title")}</h2>
              <p className="text-xl text-gray-600">
                {t("services.desc")}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-transform group flex flex-col h-full border border-gray-100">
              <div className="w-14 h-14 bg-[var(--color-brand-purple-light)] rounded-2xl flex items-center justify-center mb-6 text-[var(--color-brand-purple)] group-hover:scale-110 transition-transform">
                <BookOpen className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{t("services.classesTitle")}</h3>
              <p className="text-gray-600 mb-8 leading-relaxed flex-grow">
                {t("services.classesDesc")}
              </p>
              <Link to="/classes" className="inline-flex items-center justify-center w-full bg-gray-50 group-hover:bg-[var(--color-brand-purple)] group-hover:text-white text-gray-700 py-3 rounded-xl font-medium transition-colors">
                {t("services.classesCta")}
              </Link>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-transform group flex flex-col h-full border border-gray-100">
              <div className="w-14 h-14 bg-[var(--color-brand-pink-light)] rounded-2xl flex items-center justify-center mb-6 text-[var(--color-brand-pink)] group-hover:scale-110 transition-transform">
                <Activity className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{t("services.pumpTitle")}</h3>
              <p className="text-gray-600 mb-8 leading-relaxed flex-grow">
                {t("services.pumpDesc")}
              </p>
              <Link to="/pump-training" className="inline-flex items-center justify-center w-full bg-gray-50 group-hover:bg-[var(--color-brand-pink)] group-hover:text-white text-gray-700 py-3 rounded-xl font-medium transition-colors">
                {t("services.pumpCta")}
              </Link>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-transform group flex flex-col h-full border border-gray-100">
              <div className="w-14 h-14 bg-yellow-50 rounded-2xl flex items-center justify-center mb-6 text-yellow-500 group-hover:scale-110 transition-transform">
                <Activity className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{t("services.cgmTitle")}</h3>
              <p className="text-gray-600 mb-8 leading-relaxed flex-grow">
                {t("services.cgmDesc")}
              </p>
              <Link to="/cgm" className="inline-flex items-center justify-center w-full bg-gray-50 group-hover:bg-yellow-500 group-hover:text-white text-gray-700 py-3 rounded-xl font-medium transition-colors">
                {t("services.cgmCta")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works / Journey */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t("journey.title")}</h2>
             <p className="text-xl text-gray-600">{t("journey.desc")}</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
             <div className="text-center relative">
               <div className="w-16 h-16 bg-[var(--color-brand-purple)] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 relative z-10 shadow-lg">1</div>
               <h3 className="text-xl font-bold mb-3">{t("journey.steps.referralTitle")}</h3>
               <p className="text-gray-600">{t("journey.steps.referralDesc")}</p>
               <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gray-200 -z-0"></div>
             </div>
             <div className="text-center relative">
               <div className="w-16 h-16 bg-[var(--color-brand-purple)] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 relative z-10 shadow-lg">2</div>
               <h3 className="text-xl font-bold mb-3">{t("journey.steps.insuranceTitle")}</h3>
               <p className="text-gray-600">{t("journey.steps.insuranceDesc")}</p>
               <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gray-200 -z-0"></div>
             </div>
             <div className="text-center relative">
               <div className="w-16 h-16 bg-[var(--color-brand-purple)] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 relative z-10 shadow-lg">3</div>
               <h3 className="text-xl font-bold mb-3">{t("journey.steps.learningTitle")}</h3>
               <p className="text-gray-600">{t("journey.steps.learningDesc")}</p>
               <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gray-200 -z-0"></div>
             </div>
             <div className="text-center relative">
               <div className="w-16 h-16 bg-[var(--color-brand-purple)] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 relative z-10 shadow-lg">4</div>
               <h3 className="text-xl font-bold mb-3">{t("journey.steps.resultsTitle")}</h3>
               <p className="text-gray-600">{t("journey.steps.resultsDesc")}</p>
             </div>
          </div>
          
          <div className="mt-16 text-center">
            <Link to="/coverage" className="inline-flex items-center gap-2 font-bold text-[var(--color-brand-purple)] hover:text-purple-800 underline underline-offset-4">
              {t("journey.coverageLink")} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-[var(--color-brand-pink-light)]/40 rounded-t-3xl border-t border-[var(--color-brand-pink-light)]">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
               <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-6 rounded-3xl shadow-sm text-center">
                     <Globe2 className="w-8 h-8 text-[var(--color-brand-purple)] mx-auto mb-3" />
                     <h4 className="font-bold">{t("why.cards.bilingualTitle")}</h4>
                     <p className="text-sm text-gray-500">{t("why.cards.bilingualDesc")}</p>
                  </div>
                  <div className="bg-white p-6 rounded-3xl shadow-sm text-center transform translate-y-6">
                     <ShieldCheck className="w-8 h-8 text-[var(--color-brand-pink)] mx-auto mb-3" />
                     <h4 className="font-bold">{t("why.cards.accreditedTitle")}</h4>
                     <p className="text-sm text-gray-500">{t("why.cards.accreditedDesc")}</p>
                  </div>
                  <div className="bg-white p-6 rounded-3xl shadow-sm text-center">
                     <CheckCircle2 className="w-8 h-8 text-green-500 mx-auto mb-3" />
                     <h4 className="font-bold">{t("why.cards.coverageTitle")}</h4>
                     <p className="text-sm text-gray-500">{t("why.cards.coverageDesc")}</p>
                  </div>
                  <div className="bg-white p-6 rounded-3xl shadow-sm text-center transform translate-y-6">
                     <MonitorSmartphone className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
                     <h4 className="font-bold">{t("why.cards.flexibleTitle")}</h4>
                     <p className="text-sm text-gray-500">{t("why.cards.flexibleDesc")}</p>
                  </div>
               </div>
               <div>
                  <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-900">{t("why.title")}</h2>
                  <p className="text-lg text-gray-600 mb-6">
                    {t("why.desc1")}
                  </p>
                  <p className="text-lg text-gray-600 mb-8">
                    {t("why.desc2")}
                  </p>
                  <Link to="/contact" className="inline-block bg-[var(--color-brand-pink)] text-white px-8 py-4 rounded-full font-bold hover:bg-[var(--color-brand-pink)]/90 transition-colors shadow-md">
                     {t("why.cta")}
                  </Link>
               </div>
            </div>
         </div>
      </section>

      {/* For Doctors Banner */}
      <section className="bg-[var(--color-brand-purple)] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-white max-w-2xl">
              <span className="flex items-center gap-2 font-medium bg-white/20 w-fit px-3 py-1 rounded-full text-sm mb-4">
                <Stethoscope className="w-4 h-4" /> {t("providers.badge")}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("providers.title")}</h2>
              <p className="text-purple-100 text-lg">
                {t("providers.desc")}
              </p>
            </div>
            <div>
              <Link
                to="/providers"
                className="inline-block bg-white text-[var(--color-brand-purple)] px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-50 transition-colors whitespace-nowrap shadow-xl"
              >
                {t("providers.cta")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
