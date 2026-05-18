import { Link } from "react-router-dom";
import { 
  ShieldCheck, Stethoscope, BookOpen, Activity, ArrowRight, 
  HeartPulse, CheckCircle2, Globe2, MonitorSmartphone, ClipboardList,
  ChevronLeft, ChevronRight, Languages, Dumbbell, GraduationCap, BadgeCheck
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function Home() {
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
    { name: "Insurance partner", file: "insurance-partner-1.webp" },
    { name: "Insurance partner", file: "insurance-partner-2.webp" },
    { name: "Insurance partner", file: "insurance-partner-3.webp" },
    { name: "Insurance partner", file: "insurance-partner-4.webp" },
    { name: "Insurance partner", file: "insurance-partner-5.webp" }
  ];

  const slides = [
    {
      badge: "Insurance-Friendly Diabetes Care",
      title: "99% of our clients",
      highlight: "pay $0 with their insurance!",
      desc: "Comprehensive diabetes education, insulin pump training, and CGM analysis. Expert guidance from the comfort of your home or in-person.",
      img: heroDiabetesCareSrc,
      cta1Title: "Join a Class",
      cta1Link: "/classes",
      cta2Title: "Get in Touch",
      cta2Link: "/contact"
    },
    {
      badge: "Expert Device Training",
      title: "Confused by your",
      highlight: "Insulin Pump?",
      desc: "Transitioning to a pump can be overwhelming. Get hands-on training for Omnipod, Tandem, Medtronic, and more from our certified specialists.",
      img: heroPumpTrainingSrc,
      cta1Title: "Explore Pumps",
      cta1Link: "/pump-training",
      cta2Title: "Learn More",
      cta2Link: "/contact"
    },
    {
      badge: "Optimize Your Routine",
      title: "Make Sense of your",
      highlight: "CGM Data.",
      desc: "We analyze your FreeStyle Libre, Dexcom, or Stelo data to help you maximize your Time In Range. Discover how your body reacts.",
      img: heroCgmSrc,
      cta1Title: "View CGM Services",
      cta1Link: "/cgm",
      cta2Title: "Our Services",
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
              alt="Background" 
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
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
        
        {/* Navigation Arrows */}
        <button 
          onClick={() => setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white/60 hover:bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-[var(--color-brand-purple)] transition-all border border-white/50 shadow-sm hidden md:flex"
        >
           <ChevronLeft className="w-8 h-8" />
        </button>
        <button 
          onClick={() => setCurrentSlide(prev => (prev + 1) % slides.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white/60 hover:bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-[var(--color-brand-purple)] transition-all border border-white/50 shadow-sm hidden md:flex"
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
                Insurance coverage
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5 leading-tight">
                We are now In-Network with MOST of the insurance
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Including but not limited to the plans shown here. Coverage varies by plan, so our team verifies benefits before care begins.
              </p>
              <Link
                to="/coverage"
                className="inline-flex items-center justify-center gap-2 bg-[var(--color-brand-purple)] text-white px-6 py-3 rounded-full font-bold hover:bg-[var(--color-brand-purple)]/90 transition-all shadow-md"
              >
                Check coverage <ArrowRight className="w-5 h-5" />
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
                      alt={`${logo.name} logo`}
                      className="max-h-16 max-w-full object-contain"
                    />
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-4">
                Logos are examples of in-network or commonly supported insurance plans and are not a complete list.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Expert Profile Section */}
      <section className="py-24 bg-[var(--color-brand-purple-light)]/35 border-y border-[var(--color-brand-purple)]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 xl:gap-16 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="absolute -left-6 -top-6 hidden sm:block w-28 h-28 rounded-full bg-[var(--color-brand-pink)]/20" />
              <div className="absolute -right-4 -bottom-4 hidden sm:block w-36 h-36 rounded-full bg-yellow-200/35" />
              <div className="relative overflow-hidden rounded-[2rem] bg-white shadow-[0_24px_70px_-32px_rgba(31,41,55,0.45)] border border-white">
                <img
                  src={tanPhotoSrc}
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = fallbackTanPhoto;
                  }}
                  alt="Xiaofang Tan, Registered Dietitian and Certified Diabetes Care and Education Specialist"
                  className="w-full aspect-[4/5] sm:aspect-[16/11] lg:aspect-[4/5] object-cover object-center"
                />
                <div className="absolute left-4 right-4 bottom-4 bg-white/92 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/80">
                  <p className="text-sm font-semibold text-[var(--color-brand-purple)] mb-1">Languages</p>
                  <p className="text-gray-700 font-medium">English, Cantonese, Mandarin, Hakka</p>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-[var(--color-brand-purple)] font-semibold text-sm mb-6 border border-[var(--color-brand-purple)]/15 shadow-sm">
                <BadgeCheck className="w-4 h-4 text-[var(--color-brand-pink)]" />
                Meet Your Diabetes Care Specialist
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                Xiaofang Tan, <span className="text-[var(--color-brand-purple)]">MS, RD, CDN, CDCES</span>
              </h2>
              <p className="text-lg text-gray-500 font-medium mb-6">Preferred name: Tan</p>
              <div className="space-y-5 text-lg text-gray-600 leading-relaxed mb-8">
                <p>
                  Tan received her Master of Science in Nutrition and completed her dietetic internship at Northwell Health.
                  She is now a practicing Registered Dietitian and Certified Diabetes Care and Education Specialist at
                  Northwell Health Queens.
                </p>
                <p>
                  Her approach connects clinical nutrition, practical diabetes education, and sustainable lifestyle coaching
                  so patients can understand their numbers and build routines that work in real life.
                </p>
              </div>

              <div className="grid sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                  <GraduationCap className="w-7 h-7 text-[var(--color-brand-purple)] mb-3" />
                  <h3 className="font-bold text-gray-900 mb-1">Clinical Nutrition</h3>
                  <p className="text-sm text-gray-500">MS in Nutrition, RD, CDN</p>
                </div>
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                  <Activity className="w-7 h-7 text-[var(--color-brand-pink)] mb-3" />
                  <h3 className="font-bold text-gray-900 mb-1">Diabetes Care</h3>
                  <p className="text-sm text-gray-500">Certified CDCES guidance</p>
                </div>
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                  <Dumbbell className="w-7 h-7 text-yellow-500 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-1">Fitness Support</h3>
                  <p className="text-sm text-gray-500">NASM Certified Personal Trainer</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[var(--color-brand-purple-light)] text-[var(--color-brand-purple)] flex items-center justify-center shrink-0">
                    <Languages className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Areas of Focus</h3>
                    <p className="text-gray-600">
                      Sports nutrition, diabetes management, gastrointestinal conditions including IBS and IBD, and
                      women's health.
                    </p>
                  </div>
                </div>
              </div>

              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-[var(--color-brand-purple)] text-white px-8 py-4 rounded-full font-bold hover:bg-[var(--color-brand-purple)]/90 transition-all shadow-lg hover:shadow-xl w-full sm:w-auto"
              >
                Schedule a Consultation <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Patient Empathy Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Does managing diabetes feel overwhelming?</h2>
            <p className="text-xl text-gray-600">
              Whether you are newly diagnosed, starting on an insulin pump, or struggling to keep your blood sugar in range, you are not alone. We are here to guide you.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 hover:shadow-md transition-shadow">
               <div className="w-12 h-12 bg-red-100 text-red-500 rounded-xl flex items-center justify-center mb-6">
                 <HeartPulse className="w-6 h-6" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-gray-900">Fear of Spikes & Lows</h3>
               <p className="text-gray-600">Learn practical strategies for eating what you love without sending your numbers on a rollercoaster.</p>
            </div>
            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 hover:shadow-md transition-shadow">
               <div className="w-12 h-12 bg-blue-100 text-blue-500 rounded-xl flex items-center justify-center mb-6">
                 <MonitorSmartphone className="w-6 h-6" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-gray-900">Device Confusion</h3>
               <p className="text-gray-600">Overwhelmed by new tech? We provide comprehensive, hands-on training for the latest insulin pumps and CGMs.</p>
            </div>
            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 hover:shadow-md transition-shadow">
               <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-6">
                 <ClipboardList className="w-6 h-6" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-gray-900">Information Overload</h3>
               <p className="text-gray-600">Get systematic, clear education that cuts through the noise, taught by certified healthcare professionals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Core Programs</h2>
              <p className="text-xl text-gray-600">
                Expert-led training and education to give you the confidence you need to manage diabetes.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-transform group flex flex-col h-full border border-gray-100">
              <div className="w-14 h-14 bg-[var(--color-brand-purple-light)] rounded-2xl flex items-center justify-center mb-6 text-[var(--color-brand-purple)] group-hover:scale-110 transition-transform">
                <BookOpen className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Diabetes Classes</h3>
              <p className="text-gray-600 mb-8 leading-relaxed flex-grow">
                Systematic 10-hour learning program covering medications, diet, exercise, and mental health. Offered in English and Mandarin. Fully covered by Medicare and most insurances.
              </p>
              <Link to="/classes" className="inline-flex items-center justify-center w-full bg-gray-50 group-hover:bg-[var(--color-brand-purple)] group-hover:text-white text-gray-700 py-3 rounded-xl font-medium transition-colors">
                Learn more
              </Link>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-transform group flex flex-col h-full border border-gray-100">
              <div className="w-14 h-14 bg-[var(--color-brand-pink-light)] rounded-2xl flex items-center justify-center mb-6 text-[var(--color-brand-pink)] group-hover:scale-110 transition-transform">
                <Activity className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Insulin Pump Training</h3>
              <p className="text-gray-600 mb-8 leading-relaxed flex-grow">
                Complete setup and hands-on training for advanced systems including Omnipod, Twiist, iLet, Tandem, Medtronic, and CeQur Simplicity patches.
              </p>
              <Link to="/pump-training" className="inline-flex items-center justify-center w-full bg-gray-50 group-hover:bg-[var(--color-brand-pink)] group-hover:text-white text-gray-700 py-3 rounded-xl font-medium transition-colors">
                Explore pumps
              </Link>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-transform group flex flex-col h-full border border-gray-100">
              <div className="w-14 h-14 bg-yellow-50 rounded-2xl flex items-center justify-center mb-6 text-yellow-500 group-hover:scale-110 transition-transform">
                <Activity className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">CGM Reports & Setup</h3>
              <p className="text-gray-600 mb-8 leading-relaxed flex-grow">
                Continuous Glucose Monitor placement, app setup, and deep data analysis to optimize your daily routine. Expert support for FreeStyle Libre, Dexcom, and Stelo.
              </p>
              <Link to="/cgm" className="inline-flex items-center justify-center w-full bg-gray-50 group-hover:bg-yellow-500 group-hover:text-white text-gray-700 py-3 rounded-xl font-medium transition-colors">
                View CGM services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works / Journey */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How to Get Started</h2>
             <p className="text-xl text-gray-600">Four simple steps to take back control of your health.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
             <div className="text-center relative">
               <div className="w-16 h-16 bg-[var(--color-brand-purple)] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 relative z-10 shadow-lg">1</div>
               <h3 className="text-xl font-bold mb-3">Get a Referral</h3>
               <p className="text-gray-600">Ask your primary doctor or endocrinologist to send us a referral form.</p>
               <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gray-200 -z-0"></div>
             </div>
             <div className="text-center relative">
               <div className="w-16 h-16 bg-[var(--color-brand-purple)] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 relative z-10 shadow-lg">2</div>
               <h3 className="text-xl font-bold mb-3">Insurance Check</h3>
               <p className="text-gray-600">We will systematically verify your Medicare or private insurance benefits.</p>
               <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gray-200 -z-0"></div>
             </div>
             <div className="text-center relative">
               <div className="w-16 h-16 bg-[var(--color-brand-purple)] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 relative z-10 shadow-lg">3</div>
               <h3 className="text-xl font-bold mb-3">Begin Learning</h3>
               <p className="text-gray-600">Attend classes online or in-person. Get trained on your new health devices.</p>
               <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gray-200 -z-0"></div>
             </div>
             <div className="text-center relative">
               <div className="w-16 h-16 bg-[var(--color-brand-purple)] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 relative z-10 shadow-lg">4</div>
               <h3 className="text-xl font-bold mb-3">See Results</h3>
               <p className="text-gray-600">Notice lower A1C levels, more time in range, and a better quality of life.</p>
             </div>
          </div>
          
          <div className="mt-16 text-center">
            <Link to="/coverage" className="inline-flex items-center gap-2 font-bold text-[var(--color-brand-purple)] hover:text-purple-800 underline underline-offset-4">
              Learn more about Insurance Coverage <ArrowRight className="w-4 h-4" />
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
                     <h4 className="font-bold">Bilingual</h4>
                     <p className="text-sm text-gray-500">English & 中文</p>
                  </div>
                  <div className="bg-white p-6 rounded-3xl shadow-sm text-center transform translate-y-6">
                     <ShieldCheck className="w-8 h-8 text-[var(--color-brand-pink)] mx-auto mb-3" />
                     <h4 className="font-bold">Accredited</h4>
                     <p className="text-sm text-gray-500">ADCES Certified</p>
                  </div>
                  <div className="bg-white p-6 rounded-3xl shadow-sm text-center">
                     <CheckCircle2 className="w-8 h-8 text-green-500 mx-auto mb-3" />
                     <h4 className="font-bold">Coverage</h4>
                     <p className="text-sm text-gray-500">Insurance friendly</p>
                  </div>
                  <div className="bg-white p-6 rounded-3xl shadow-sm text-center transform translate-y-6">
                     <MonitorSmartphone className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
                     <h4 className="font-bold">Flexible</h4>
                     <p className="text-sm text-gray-500">Online & In-person</p>
                  </div>
               </div>
               <div>
                  <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-900">Why Choose XT Diabetes Care?</h2>
                  <p className="text-lg text-gray-600 mb-6">
                    We are dedicated exclusively to diabetes education and management. Unlike general clinics, this is our only focus. 
                  </p>
                  <p className="text-lg text-gray-600 mb-8">
                    Our team recognizes that every body is completely different. We tailor our curriculum and our device training so that you walk away knowing exactly how to handle your unique condition.
                  </p>
                  <Link to="/contact" className="inline-block bg-[var(--color-brand-pink)] text-white px-8 py-4 rounded-full font-bold hover:bg-[var(--color-brand-pink)]/90 transition-colors shadow-md">
                     Contact Us Today
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
                <Stethoscope className="w-4 h-4" /> For Healthcare Providers
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">We are your diabetes care assistants.</h2>
              <p className="text-purple-100 text-lg">
                Refer your newly diagnosed patients or those needing structured self-management education. 
                We handle the thorough education so you can focus on medical decision-making. 
                ADCES Accredited.
              </p>
            </div>
            <div>
              <Link
                to="/providers"
                className="inline-block bg-white text-[var(--color-brand-purple)] px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-50 transition-colors whitespace-nowrap shadow-xl"
              >
                Provider Resources & Referral
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
