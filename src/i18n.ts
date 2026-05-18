import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

export const supportedLocales = ["en", "zh-CN", "zh-TW", "ja", "ko", "es"] as const;
export type SupportedLocale = (typeof supportedLocales)[number];

export const localeLabels: Record<SupportedLocale, string> = {
  en: "English",
  "zh-CN": "\u7b80\u4f53\u4e2d\u6587",
  "zh-TW": "\u7e41\u9ad4\u4e2d\u6587",
  ja: "\u65e5\u672c\u8a9e",
  ko: "\ud55c\uad6d\uc5b4",
  es: "Espa\u00f1ol",
};

const commonEn = {
  brand: {
    name: "XT Diabetes Care",
    logoAlt: "XT Diabetes Care logo",
  },
  languageSwitcher: {
    label: "Language",
    ariaLabel: "Change language",
  },
  nav: {
    home: "Home",
    services: "Services",
    coverage: "Coverage",
    recipes: "Recipes",
    contact: "Contact",
    healthyRecipes: "Healthy Recipes",
    recipesDescription: "Glucose-aware meals with practical portions and clear steps.",
    viewAll: "View all",
    viewAllRecipes: "View All Recipes",
    prepSuffix: "prep",
  },
  services: {
    classes: {
      name: "Diabetes Classes",
      desc: "Structured education for food, medication, exercise, and daily routines.",
    },
    pump: {
      name: "Insulin Pump Training",
      desc: "Hands-on setup and confidence building for modern pump systems.",
    },
    cgm: {
      name: "CGM Training & Reports",
      desc: "Sensor setup, app support, and glucose pattern interpretation.",
    },
    providers: {
      name: "For Providers",
      desc: "Referral resources and diabetes education support for clinics.",
    },
  },
  footer: {
    tagline: "ADCES Accredited Diabetes Education Center. Empowering you to live your best life with diabetes.",
    servicesHeading: "Services",
    professionalsHeading: "Professionals",
    connectHeading: "Connect",
    insuranceInfo: "Insurance Info",
    contactUs: "Contact Us",
    copyright: "All rights reserved.",
  },
};

const homeEn = {
  hero: {
    backgroundAlt: "{{title}} background image",
    slideLabel: "Go to slide {{number}}",
    previousSlide: "Previous slide",
    nextSlide: "Next slide",
    slides: {
      diabetesCare: {
        badge: "Insurance-Friendly Diabetes Care",
        title: "99% of our clients",
        highlight: "pay $0 with their insurance!",
        desc: "Comprehensive diabetes education, insulin pump training, and CGM analysis. Expert guidance from the comfort of your home or in-person.",
        cta1: "Join a Class",
        cta2: "Get in Touch",
      },
      pumpTraining: {
        badge: "Expert Device Training",
        title: "Confused by your",
        highlight: "Insulin Pump?",
        desc: "Transitioning to a pump can be overwhelming. Get hands-on training for Omnipod, Tandem, Medtronic, and more from our certified specialists.",
        cta1: "Explore Pumps",
        cta2: "Learn More",
      },
      cgm: {
        badge: "Optimize Your Routine",
        title: "Make Sense of your",
        highlight: "CGM Data.",
        desc: "We analyze your FreeStyle Libre, Dexcom, or Stelo data to help you maximize your Time In Range. Discover how your body reacts.",
        cta1: "View CGM Services",
        cta2: "Our Services",
      },
    },
  },
  insurance: {
    badge: "Insurance coverage",
    title: "We are now In-Network with MOST of the insurance",
    desc: "Including but not limited to the plans shown here. Coverage varies by plan, so our team verifies benefits before care begins.",
    cta: "Check coverage",
    partnerName: "Insurance partner",
    logoAlt: "{{name}} logo",
    note: "Logos are examples of in-network or commonly supported insurance plans and are not a complete list.",
  },
  expert: {
    photoAlt: "Xiaofang Tan, Registered Dietitian and Certified Diabetes Care and Education Specialist",
    languagesLabel: "Languages",
    languages: "English, Cantonese, Mandarin, Hakka",
    badge: "Meet Your Diabetes Care Specialist",
    namePrefix: "Xiaofang Tan,",
    credentials: "MS, RD, CDN, CDCES",
    preferredName: "Preferred name: Tan",
    bio1: "Tan received her Master of Science in Nutrition and completed her dietetic internship at Northwell Health. She is now a practicing Registered Dietitian and Certified Diabetes Care and Education Specialist at Northwell Health Queens.",
    bio2: "Her approach connects clinical nutrition, practical diabetes education, and sustainable lifestyle coaching so patients can understand their numbers and build routines that work in real life.",
    cards: {
      nutritionTitle: "Clinical Nutrition",
      nutritionDesc: "MS in Nutrition, RD, CDN",
      diabetesTitle: "Diabetes Care",
      diabetesDesc: "Certified CDCES guidance",
      fitnessTitle: "Fitness Support",
      fitnessDesc: "NASM Certified Personal Trainer",
    },
    focusTitle: "Areas of Focus",
    focusDesc: "Sports nutrition, diabetes management, gastrointestinal conditions including IBS and IBD, and women's health.",
    cta: "Schedule a Consultation",
  },
  empathy: {
    title: "Does managing diabetes feel overwhelming?",
    desc: "Whether you are newly diagnosed, starting on an insulin pump, or struggling to keep your blood sugar in range, you are not alone. We are here to guide you.",
    cards: {
      spikesTitle: "Fear of Spikes & Lows",
      spikesDesc: "Learn practical strategies for eating what you love without sending your numbers on a rollercoaster.",
      deviceTitle: "Device Confusion",
      deviceDesc: "Overwhelmed by new tech? We provide comprehensive, hands-on training for the latest insulin pumps and CGMs.",
      overloadTitle: "Information Overload",
      overloadDesc: "Get systematic, clear education that cuts through the noise, taught by certified healthcare professionals.",
    },
  },
  services: {
    title: "Our Core Programs",
    desc: "Expert-led training and education to give you the confidence you need to manage diabetes.",
    classesTitle: "Diabetes Classes",
    classesDesc: "Systematic 10-hour learning program covering medications, diet, exercise, and mental health. Offered in English and Mandarin. Fully covered by Medicare and most insurances.",
    classesCta: "Learn more",
    pumpTitle: "Insulin Pump Training",
    pumpDesc: "Complete setup and hands-on training for advanced systems including Omnipod, Twiist, iLet, Tandem, Medtronic, and CeQur Simplicity patches.",
    pumpCta: "Explore pumps",
    cgmTitle: "CGM Reports & Setup",
    cgmDesc: "Continuous Glucose Monitor placement, app setup, and deep data analysis to optimize your daily routine. Expert support for FreeStyle Libre, Dexcom, and Stelo.",
    cgmCta: "View CGM services",
  },
  journey: {
    title: "How to Get Started",
    desc: "Four simple steps to take back control of your health.",
    steps: {
      referralTitle: "Get a Referral",
      referralDesc: "Ask your primary doctor or endocrinologist to send us a referral form.",
      insuranceTitle: "Insurance Check",
      insuranceDesc: "We will systematically verify your Medicare or private insurance benefits.",
      learningTitle: "Begin Learning",
      learningDesc: "Attend classes online or in-person. Get trained on your new health devices.",
      resultsTitle: "See Results",
      resultsDesc: "Notice lower A1C levels, more time in range, and a better quality of life.",
    },
    coverageLink: "Learn more about Insurance Coverage",
  },
  why: {
    cards: {
      bilingualTitle: "Bilingual",
      bilingualDesc: "English & Chinese",
      accreditedTitle: "Accredited",
      accreditedDesc: "ADCES Certified",
      coverageTitle: "Coverage",
      coverageDesc: "Insurance friendly",
      flexibleTitle: "Flexible",
      flexibleDesc: "Online & In-person",
    },
    title: "Why Choose XT Diabetes Care?",
    desc1: "We are dedicated exclusively to diabetes education and management. Unlike general clinics, this is our only focus.",
    desc2: "Our team recognizes that every body is completely different. We tailor our curriculum and our device training so that you walk away knowing exactly how to handle your unique condition.",
    cta: "Contact Us Today",
  },
  providers: {
    badge: "For Healthcare Providers",
    title: "We are your diabetes care assistants.",
    desc: "Refer your newly diagnosed patients or those needing structured self-management education. We handle the thorough education so you can focus on medical decision-making. ADCES Accredited.",
    cta: "Provider Resources & Referral",
  },
};

const servicePagesEn = {
  contact: {
    title: "Contact Us",
    subtitle: "Ready to enroll in a class or schedule training? Reach out to us today.",
    formTitle: "Send a Message",
    labels: { name: "Name", email: "Email", message: "Message" },
    placeholders: { name: "Your name", email: "you@example.com", message: "How can we help?" },
    send: "Send Message",
    info: {
      addressTitle: "Address",
      addressLines: ["XT Diabetes Care", "123 Health Way, Suite 100", "City, State 12345"],
      phoneTitle: "Phone",
      phoneLines: ["(555) 123-4567", "Fax: (555) 123-4568"],
      emailTitle: "Email",
      email: "hello@xtdiabetescare.com",
      hoursTitle: "Hours",
      hoursLines: ["Monday - Friday: 9am - 5pm", "Saturday & Sunday: Closed"],
    },
  },
  classes: {
    heroTitle: "Comprehensive Diabetes Education Classes",
    heroSubtitle: "Master the self-management skills you need. Our comprehensive curriculum is designed to empower you, completely covered by most health insurance plans.",
    bilingual: "Bilingual: English & Chinese (Mandarin)",
    delivery: "Online & In-Person",
    hours: "10 Hours",
    hoursDescription: "Initial comprehensive training program",
    curriculumTitle: "Our Curriculum",
    curriculumIntro: "We cover every aspect of living well with diabetes to ensure nothing falls through the cracks.",
    curriculum: [
      { title: "Understanding Diabetes", desc: "Learn the disease process and what it means for your body." },
      { title: "Medication Management", desc: "How to use pills, injectables, and insulin safely and effectively." },
      { title: "Nutrition & Diet", desc: "Meal planning, carb counting, and eating what you love safely." },
      { title: "Physical Activity", desc: "Incorporating movement into your daily life for steady blood sugar." },
      { title: "Problem Solving", desc: "Handling high and low blood sugars, and sick day management." },
      { title: "Psychological Health", desc: "Coping with the stress and burnout of chronic disease management." },
    ],
    ctaTitle: "Ready to start learning?",
    ctaBody: "These classes are fully covered by Medicare and most private insurance plans when referred by your doctor. Download the referral form for your doctor to sign, or contact us directly to verify your benefits.",
    insuranceButton: "View Insurance Info",
    contactButton: "Contact Us",
  },
  pumpTraining: {
    heroTitle: "Insulin Pump Training",
    heroSubtitle: "Transitioning to an insulin pump can be overwhelming. Our certified specialists provide comprehensive training on all major pump brands so you can manage your glucose with confidence.",
    pumps: [
      { name: "Omnipod 5", desc: "Tubeless automated insulin delivery system that integrates with Dexcom." },
      { name: "Twiist", desc: "Automated delivery utilizing the FDA-cleared Tidepool Loop algorithm." },
      { name: "iLet Bionic Pancreas", desc: "Requires only your weight to start. Automates 100% of your insulin doses." },
      { name: "Tandem t:slim X2 / Mobi", desc: "Advanced Control-IQ technology predicting and preventing highs and lows." },
      { name: "Medtronic MiniMed", desc: "SmartGuard technology that auto-adjusts background insulin." },
      { name: "CeQur Simplicity", desc: "Wearable, 3-day patch providing mealtime insulin with a simple click." },
    ],
    expectTitle: "What to Expect During Training",
    expectations: [
      "Understanding your pump components and navigation.",
      "Safe site rotation and infusion set insertion.",
      "Programming basal rates, carb ratios, and correction factors based on your doctor's orders.",
      "Troubleshooting alarms and resolving issues.",
    ],
    needTitle: "Need Training?",
    needBody: "Pump training is often covered by insurance with a physician referral.",
    scheduleButton: "Schedule Training",
  },
  cgm: {
    heroTitle: "CGM Training & Report Analysis",
    heroSubtitle: "Unlock the power of your Continuous Glucose Monitor. We train you how to use it, and help you and your doctor interpret the data to optimize your health.",
    devices: [
      { name: "FreeStyle Libre", maker: "Abbott", desc: "Training on sensor placement, using your smartphone reader, and understanding trend arrows." },
      { name: "Dexcom G7/G6", maker: "Dexcom", desc: "Setup of alerts and alarms, sharing data with family or clinic, and application process." },
      { name: "Stelo", maker: "Dexcom OTC", desc: "Guidance for type 2 diabetes patients on interpreting the new over-the-counter biosensor data." },
    ],
    features: {
      appSetup: "App Setup",
      arrowTrends: "Arrow Trends",
      agpReports: "AGP Reports",
      timeInRange: "Time in Range",
    },
    beyondTitle: "Beyond Just Numbers",
    beyondIntro: "A CGM provides hundreds of readings a day, but what do you do with them?",
    beyondBody: "We analyze your Ambulatory Glucose Profile (AGP) reports to identify patterns. We teach you how different foods, stress, and exercise affect your unique body, helping you maximize your <strong>Time In Range</strong> (TIR).",
    scheduleButton: "Schedule Analysis Session",
  },
  coverage: {
    heroTitle: "Insurance & Medicare Coverage",
    heroSubtitle: "Diabetes Self-Management Education and Support (DSMES) is a recognized covered benefit under Medicare and most private insurance plans.",
    medicareTitle: "What does Medicare Cover?",
    dsmesTitle: "DSMES/T",
    dsmesBody: "<strong>10 hours</strong> of initial training in a 12-month period from the date of the first session, plus <strong>2 hours</strong> of follow-up per calendar year.",
    mntTitle: "Medical Nutrition Therapy (MNT)",
    mntBody: "<strong>3 hours</strong> of initial MNT in the first calendar year, plus <strong>2 hours</strong> of follow-up MNT annually. Additional hours available for change in medical condition.",
    researchNote: "* Research indicates MNT combined with DSMES/T improves outcomes. Individuals may be eligible for both services in the same year.",
    requirementsTitle: "Diagnosis Requirements",
    requirementsIntro: "Medicare coverage requires the treating qualified provider to maintain documentation of a diagnosis of diabetes based on one of the following:",
    requirements: [
      "Fasting blood glucose greater than or equal to 126 mg/dl on two different occasions",
      "2 hour post-glucose challenge greater than or equal to 200 mg/dl on 2 different occasions",
      "Random glucose test over 200 mg/dl for a person with symptoms of uncontrolled diabetes",
    ],
    payorNote: "* Other payors (commercial insurance) may have different specific coverage requirements. We will verify your benefits prior to starting.",
    stepsTitle: "Steps to Get Started",
    steps: [
      "Download our detailed Referral Order Form.",
      "Have your treating physician sign it along with recent diagnostic labs.",
      "Fax or email it to our office.",
      "We will verify benefits and schedule your first session!",
    ],
    downloadButton: "Download Form",
    contactButton: "Contact Us",
  },
  providers: {
    badge: "ADCES Accredited Diabetes Education Program",
    heroLine1: "Partnering with Physicians",
    heroLine2: "to Improve Patient Outcomes",
    heroSubtitle: "XT Diabetes Care acts as an extension of your practice. We provide the intensive, systemic diabetes self-management education your patients need, completely covered by insurance.",
    values: [
      { title: "Save Clinic Time", desc: "We take the time-consuming burden of comprehensive diabetes education off your shoulders, freeing you to focus on diagnosis and medication management." },
      { title: "Structured Curriculum", desc: "Patients receive systematic education on medication usage, diet, physical activity, and psychosocial coping skills." },
      { title: "We Keep You Informed", desc: "We act as your assistant, returning comprehensive reports to you and ensuring patients follow up with you regularly for medication adjustments." },
    ],
    referTitle: "How to Refer Your Patients",
    referIntro: "Medicare and private insurance cover our programs, but require a referral from the treating physician.",
    referralCandidates: [
      "Patients newly diagnosed with diabetes.",
      "Patients who have never received systematic diabetes self-management training.",
      "Patients transitioning to Insulin Pumps or Continuous Glucose Monitors (CGM).",
    ],
    downloadButton: "Download Referral Form Template",
    accreditedTitle: "ADCES Accredited",
    accreditedId: "ID# 1001155",
    accreditedBody: "Having met all applicable standards and requirements of the Association of Diabetes Care & Education Specialists.",
  },
  recipes: {
    badge: "Blood-sugar-friendly ideas",
    title: "Healthy Recipes",
    subtitle: "Practical meals, snacks, and sides adapted for glucose awareness without making food feel clinical.",
    carbFallback: "Carb details inside",
    back: "Back to recipes",
    notFound: "Recipe not found",
    prep: "Prep",
    cook: "Cook",
    servings: "Servings",
    ingredients: "Ingredients",
    instructions: "Instructions",
    diabetesNote: "Diabetes Note",
    carbAwareness: "Carb Awareness",
    nutrition: "Nutrition Highlights",
    originalCard: "Original Recipe Card",
    cardAlt: "{{title}} recipe card",
  },
};

const localizedCommon = {
  "zh-CN": {
    languageSwitcher: { label: "\u8bed\u8a00", ariaLabel: "\u5207\u6362\u8bed\u8a00" },
    nav: { home: "\u9996\u9875", services: "\u670d\u52a1", coverage: "\u4fdd\u9669", recipes: "\u98df\u8c31", contact: "\u8054\u7cfb", healthyRecipes: "\u5065\u5eb7\u98df\u8c31", viewAll: "\u67e5\u770b\u5168\u90e8", viewAllRecipes: "\u67e5\u770b\u5168\u90e8\u98df\u8c31", prepSuffix: "\u51c6\u5907" },
    services: { classes: { name: "\u7cd6\u5c3f\u75c5\u8bfe\u7a0b" }, pump: { name: "\u80f0\u5c9b\u7d20\u6cf5\u57f9\u8bad" }, cgm: { name: "CGM \u57f9\u8bad\u4e0e\u62a5\u544a" }, providers: { name: "\u533b\u7597\u63d0\u4f9b\u8005" } },
    footer: { servicesHeading: "\u670d\u52a1", professionalsHeading: "\u4e13\u4e1a\u8d44\u6e90", connectHeading: "\u8054\u7cfb", insuranceInfo: "\u4fdd\u9669\u4fe1\u606f", contactUs: "\u8054\u7cfb\u6211\u4eec", copyright: "\u4fdd\u7559\u6240\u6709\u6743\u5229\u3002" },
  },
  "zh-TW": {
    languageSwitcher: { label: "\u8a9e\u8a00", ariaLabel: "\u5207\u63db\u8a9e\u8a00" },
    nav: { home: "\u9996\u9801", services: "\u670d\u52d9", coverage: "\u4fdd\u96aa", recipes: "\u98df\u8b5c", contact: "\u806f\u7d61", healthyRecipes: "\u5065\u5eb7\u98df\u8b5c", viewAll: "\u67e5\u770b\u5168\u90e8", viewAllRecipes: "\u67e5\u770b\u5168\u90e8\u98df\u8b5c", prepSuffix: "\u5099\u6599" },
    services: { classes: { name: "\u7cd6\u5c3f\u75c5\u8ab2\u7a0b" }, pump: { name: "\u80f0\u5cf6\u7d20\u6cf5\u8a13\u7df4" }, cgm: { name: "CGM \u8a13\u7df4\u8207\u5831\u544a" }, providers: { name: "\u91ab\u7642\u63d0\u4f9b\u8005" } },
    footer: { servicesHeading: "\u670d\u52d9", professionalsHeading: "\u5c08\u696d\u8cc7\u6e90", connectHeading: "\u806f\u7d61", insuranceInfo: "\u4fdd\u96aa\u8cc7\u8a0a", contactUs: "\u806f\u7d61\u6211\u5011", copyright: "\u4fdd\u7559\u6240\u6709\u6b0a\u5229\u3002" },
  },
  ja: {
    languageSwitcher: { label: "\u8a00\u8a9e", ariaLabel: "\u8a00\u8a9e\u3092\u5909\u66f4" },
    nav: { home: "\u30db\u30fc\u30e0", services: "\u30b5\u30fc\u30d3\u30b9", coverage: "\u4fdd\u967a", recipes: "\u30ec\u30b7\u30d4", contact: "\u304a\u554f\u3044\u5408\u308f\u305b", healthyRecipes: "\u5065\u5eb7\u30ec\u30b7\u30d4", viewAll: "\u3059\u3079\u3066\u898b\u308b", viewAllRecipes: "\u3059\u3079\u3066\u306e\u30ec\u30b7\u30d4", prepSuffix: "\u6e96\u5099" },
    services: { classes: { name: "\u7cd6\u5c3f\u75c5\u30af\u30e9\u30b9" }, pump: { name: "\u30a4\u30f3\u30b9\u30ea\u30f3\u30dd\u30f3\u30d7\u7814\u4fee" }, cgm: { name: "CGM \u7814\u4fee\u3068\u30ec\u30dd\u30fc\u30c8" }, providers: { name: "\u533b\u7642\u5f93\u4e8b\u8005\u5411\u3051" } },
    footer: { servicesHeading: "\u30b5\u30fc\u30d3\u30b9", professionalsHeading: "\u5c02\u9580\u5bb6\u5411\u3051", connectHeading: "\u9023\u7d61", insuranceInfo: "\u4fdd\u967a\u60c5\u5831", contactUs: "\u304a\u554f\u3044\u5408\u308f\u305b", copyright: "\u7121\u65ad\u8ee2\u8f09\u3092\u7981\u3058\u307e\u3059\u3002" },
  },
  ko: {
    languageSwitcher: { label: "\uc5b8\uc5b4", ariaLabel: "\uc5b8\uc5b4 \ubcc0\uacbd" },
    nav: { home: "\ud648", services: "\uc11c\ube44\uc2a4", coverage: "\ubcf4\ud5d8", recipes: "\ub808\uc2dc\ud53c", contact: "\ubb38\uc758", healthyRecipes: "\uac74\uac15 \ub808\uc2dc\ud53c", viewAll: "\ubaa8\ub450 \ubcf4\uae30", viewAllRecipes: "\ubaa8\ub4e0 \ub808\uc2dc\ud53c", prepSuffix: "\uc900\ube44" },
    services: { classes: { name: "\ub2f9\ub1e8\ubcd1 \uad50\uc721" }, pump: { name: "\uc778\uc290\ub9b0 \ud38c\ud504 \uad50\uc721" }, cgm: { name: "CGM \uad50\uc721 \ubc0f \ubcf4\uace0\uc11c" }, providers: { name: "\uc758\ub8cc\uc9c4\uc6a9" } },
    footer: { servicesHeading: "\uc11c\ube44\uc2a4", professionalsHeading: "\uc804\ubb38\uac00", connectHeading: "\uc5f0\uacb0", insuranceInfo: "\ubcf4\ud5d8 \uc815\ubcf4", contactUs: "\ubb38\uc758\ud558\uae30", copyright: "\ubaa8\ub4e0 \uad8c\ub9ac \ubcf4\uc720\u3002" },
  },
  es: {
    languageSwitcher: { label: "Idioma", ariaLabel: "Cambiar idioma" },
    nav: { home: "Inicio", services: "Servicios", coverage: "Cobertura", recipes: "Recetas", contact: "Contacto", healthyRecipes: "Recetas saludables", viewAll: "Ver todo", viewAllRecipes: "Ver todas las recetas", prepSuffix: "prep." },
    services: { classes: { name: "Clases de diabetes" }, pump: { name: "Capacitaci\u00f3n en bombas de insulina" }, cgm: { name: "Capacitaci\u00f3n e informes de CGM" }, providers: { name: "Para proveedores" } },
    footer: { servicesHeading: "Servicios", professionalsHeading: "Profesionales", connectHeading: "Conectar", insuranceInfo: "Informaci\u00f3n de seguro", contactUs: "Cont\u00e1ctenos", copyright: "Todos los derechos reservados." },
  },
} as const;

const homeOverlays = {
  "zh-CN": { hero: { slides: { diabetesCare: { title: "\u6211\u4eec 99% \u7684\u5ba2\u6237", cta1: "\u53c2\u52a0\u8bfe\u7a0b", cta2: "\u8054\u7cfb\u6211\u4eec" } } }, why: { cards: { bilingualDesc: "\u82f1\u8bed\u548c\u4e2d\u6587" } } },
  "zh-TW": { hero: { slides: { diabetesCare: { title: "\u6211\u5011 99% \u7684\u5ba2\u6236", cta1: "\u53c3\u52a0\u8ab2\u7a0b", cta2: "\u806f\u7d61\u6211\u5011" } } }, why: { cards: { bilingualDesc: "\u82f1\u8a9e\u548c\u4e2d\u6587" } } },
  ja: { hero: { slides: { diabetesCare: { title: "\u304a\u5ba2\u69d8\u306e 99%", cta1: "\u30af\u30e9\u30b9\u306b\u53c2\u52a0", cta2: "\u304a\u554f\u3044\u5408\u308f\u305b" } } }, why: { cards: { bilingualDesc: "\u82f1\u8a9e\u3068\u4e2d\u56fd\u8a9e" } } },
  ko: { hero: { slides: { diabetesCare: { title: "\uace0\uac1d\uc758 99%", cta1: "\uad50\uc721 \ucc38\uc5ec", cta2: "\ubb38\uc758\ud558\uae30" } } }, why: { cards: { bilingualDesc: "\uc601\uc5b4 \ubc0f \uc911\uad6d\uc5b4" } } },
  es: { hero: { slides: { diabetesCare: { title: "El 99% de nuestros clientes", cta1: "Unirse a una clase", cta2: "Contactarnos" } } }, why: { cards: { bilingualDesc: "Ingl\u00e9s y chino" } } },
} as const;

const serviceOverlays = {
  "zh-CN": { contact: { title: "\u8054\u7cfb\u6211\u4eec", formTitle: "\u53d1\u9001\u6d88\u606f", labels: { name: "\u59d3\u540d", email: "\u7535\u5b50\u90ae\u7bb1", message: "\u7559\u8a00" }, send: "\u53d1\u9001\u6d88\u606f" }, classes: { heroTitle: "\u7cd6\u5c3f\u75c5\u7efc\u5408\u6559\u80b2\u8bfe\u7a0b" }, pumpTraining: { heroTitle: "\u80f0\u5c9b\u7d20\u6cf5\u57f9\u8bad" }, cgm: { heroTitle: "CGM \u57f9\u8bad\u4e0e\u62a5\u544a\u5206\u6790" }, coverage: { heroTitle: "\u4fdd\u9669\u4e0e Medicare \u8986\u76d6" }, providers: { heroLine1: "\u4e0e\u533b\u751f\u5408\u4f5c", heroLine2: "\u6539\u5584\u60a3\u8005\u7ed3\u679c", referTitle: "\u5982\u4f55\u8f6c\u8bca\u60a3\u8005", downloadButton: "\u4e0b\u8f7d\u8f6c\u8bca\u8868\u6a21\u677f" }, recipes: { badge: "\u8840\u7cd6\u53cb\u597d\u7684\u7075\u611f", title: "\u5065\u5eb7\u98df\u8c31", back: "\u8fd4\u56de\u98df\u8c31", notFound: "\u672a\u627e\u5230\u98df\u8c31", prep: "\u51c6\u5907", cook: "\u70f9\u996a", servings: "\u4efd\u91cf", ingredients: "\u98df\u6750", instructions: "\u6b65\u9aa4", diabetesNote: "\u7cd6\u5c3f\u75c5\u63d0\u793a", carbAwareness: "\u78b3\u6c34\u63d0\u9192", nutrition: "\u8425\u517b\u8981\u70b9", originalCard: "\u539f\u59cb\u98df\u8c31\u5361" } },
  "zh-TW": { contact: { title: "\u806f\u7d61\u6211\u5011", formTitle: "\u50b3\u9001\u8a0a\u606f", labels: { name: "\u59d3\u540d", email: "\u96fb\u5b50\u90f5\u4ef6", message: "\u7559\u8a00" }, send: "\u50b3\u9001\u8a0a\u606f" }, classes: { heroTitle: "\u7cd6\u5c3f\u75c5\u7d9c\u5408\u6559\u80b2\u8ab2\u7a0b" }, pumpTraining: { heroTitle: "\u80f0\u5cf6\u7d20\u6cf5\u8a13\u7df4" }, cgm: { heroTitle: "CGM \u8a13\u7df4\u8207\u5831\u544a\u5206\u6790" }, coverage: { heroTitle: "\u4fdd\u96aa\u8207 Medicare \u7d66\u4ed8" }, providers: { heroLine1: "\u8207\u91ab\u5e2b\u5408\u4f5c", heroLine2: "\u6539\u5584\u60a3\u8005\u7d50\u679c", referTitle: "\u5982\u4f55\u8f49\u4ecb\u60a3\u8005", downloadButton: "\u4e0b\u8f09\u8f49\u4ecb\u8868\u7bc4\u672c" }, recipes: { badge: "\u8840\u7cd6\u53cb\u5584\u7684\u9748\u611f", title: "\u5065\u5eb7\u98df\u8b5c", back: "\u8fd4\u56de\u98df\u8b5c", notFound: "\u627e\u4e0d\u5230\u98df\u8b5c", prep: "\u5099\u6599", cook: "\u70f9\u8abf", servings: "\u4efd\u91cf", ingredients: "\u98df\u6750", instructions: "\u6b65\u9a5f", diabetesNote: "\u7cd6\u5c3f\u75c5\u63d0\u793a", carbAwareness: "\u78b3\u6c34\u63d0\u9192", nutrition: "\u71df\u990a\u91cd\u9ede", originalCard: "\u539f\u59cb\u98df\u8b5c\u5361" } },
  ja: { contact: { title: "\u304a\u554f\u3044\u5408\u308f\u305b", formTitle: "\u30e1\u30c3\u30bb\u30fc\u30b8\u3092\u9001\u4fe1", labels: { name: "\u540d\u524d", email: "\u30e1\u30fc\u30eb", message: "\u30e1\u30c3\u30bb\u30fc\u30b8" }, send: "\u9001\u4fe1" }, classes: { heroTitle: "\u7dcf\u5408\u7684\u306a\u7cd6\u5c3f\u75c5\u6559\u80b2\u30af\u30e9\u30b9" }, pumpTraining: { heroTitle: "\u30a4\u30f3\u30b9\u30ea\u30f3\u30dd\u30f3\u30d7\u7814\u4fee" }, cgm: { heroTitle: "CGM \u7814\u4fee\u3068\u30ec\u30dd\u30fc\u30c8\u5206\u6790" }, coverage: { heroTitle: "\u4fdd\u967a\u3068 Medicare \u306e\u9069\u7528" }, providers: { heroLine1: "\u533b\u5e2b\u3068\u9023\u643a", heroLine2: "\u60a3\u8005\u306e\u6210\u679c\u3092\u6539\u5584", referTitle: "\u60a3\u8005\u7d39\u4ecb\u306e\u65b9\u6cd5", downloadButton: "\u7d39\u4ecb\u30d5\u30a9\u30fc\u30e0\u3092\u30c0\u30a6\u30f3\u30ed\u30fc\u30c9" }, recipes: { badge: "\u8840\u7cd6\u306b\u914d\u616e\u3057\u305f\u30a2\u30a4\u30c7\u30a2", title: "\u5065\u5eb7\u30ec\u30b7\u30d4", back: "\u30ec\u30b7\u30d4\u306b\u623b\u308b", notFound: "\u30ec\u30b7\u30d4\u304c\u898b\u3064\u304b\u308a\u307e\u305b\u3093", prep: "\u6e96\u5099", cook: "\u8abf\u7406", servings: "\u4eba\u6570", ingredients: "\u6750\u6599", instructions: "\u624b\u9806", diabetesNote: "\u7cd6\u5c3f\u75c5\u30e1\u30e2", carbAwareness: "\u70ad\u6c34\u5316\u7269\u306e\u76ee\u5b89", nutrition: "\u6804\u990a\u30cf\u30a4\u30e9\u30a4\u30c8", originalCard: "\u5143\u306e\u30ec\u30b7\u30d4\u30ab\u30fc\u30c9" } },
  ko: { contact: { title: "\ubb38\uc758\ud558\uae30", formTitle: "\uba54\uc2dc\uc9c0 \ubcf4\ub0b4\uae30", labels: { name: "\uc774\ub984", email: "\uc774\uba54\uc77c", message: "\uba54\uc2dc\uc9c0" }, send: "\uba54\uc2dc\uc9c0 \ubcf4\ub0b4\uae30" }, classes: { heroTitle: "\uc885\ud569 \ub2f9\ub1e8\ubcd1 \uad50\uc721 \ud074\ub798\uc2a4" }, pumpTraining: { heroTitle: "\uc778\uc290\ub9b0 \ud38c\ud504 \uad50\uc721" }, cgm: { heroTitle: "CGM \uad50\uc721 \ubc0f \ubcf4\uace0\uc11c \ubd84\uc11d" }, coverage: { heroTitle: "\ubcf4\ud5d8 \ubc0f Medicare \ubcf4\uc7a5" }, providers: { heroLine1: "\uc758\uc0ac\uc640 \ud611\ub825", heroLine2: "\ud658\uc790 \uacb0\uacfc \uac1c\uc120", referTitle: "\ud658\uc790 \uc758\ub8b0 \ubc29\ubc95", downloadButton: "\uc758\ub8b0 \uc591\uc2dd \ub2e4\uc6b4\ub85c\ub4dc" }, recipes: { badge: "\ud608\ub2f9 \uce5c\ud654\uc801 \uc544\uc774\ub514\uc5b4", title: "\uac74\uac15 \ub808\uc2dc\ud53c", back: "\ub808\uc2dc\ud53c\ub85c \ub3cc\uc544\uac00\uae30", notFound: "\ub808\uc2dc\ud53c\ub97c \ucc3e\uc744 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4", prep: "\uc900\ube44", cook: "\uc870\ub9ac", servings: "\uc778\ubd84", ingredients: "\uc7ac\ub8cc", instructions: "\uc870\ub9ac\ubc95", diabetesNote: "\ub2f9\ub1e8 \uba54\ubaa8", carbAwareness: "\ud0c4\uc218\ud654\ubb3c \ucc38\uace0", nutrition: "\uc601\uc591 \uc694\uc810", originalCard: "\uc6d0\ubcf8 \ub808\uc2dc\ud53c \uce74\ub4dc" } },
  es: { contact: { title: "Cont\u00e1ctenos", formTitle: "Enviar un mensaje", labels: { name: "Nombre", email: "Correo electr\u00f3nico", message: "Mensaje" }, send: "Enviar mensaje" }, classes: { heroTitle: "Clases integrales de educaci\u00f3n sobre diabetes" }, pumpTraining: { heroTitle: "Capacitaci\u00f3n en bomba de insulina" }, cgm: { heroTitle: "Capacitaci\u00f3n en CGM y an\u00e1lisis de reportes" }, coverage: { heroTitle: "Cobertura de seguro y Medicare" }, providers: { heroLine1: "Colaboramos con m\u00e9dicos", heroLine2: "para mejorar los resultados", referTitle: "C\u00f3mo referir pacientes", downloadButton: "Descargar formulario de referido" }, recipes: { badge: "Ideas compatibles con la glucosa", title: "Recetas saludables", back: "Volver a recetas", notFound: "Receta no encontrada", prep: "Preparaci\u00f3n", cook: "Cocci\u00f3n", servings: "Porciones", ingredients: "Ingredientes", instructions: "Instrucciones", diabetesNote: "Nota sobre diabetes", carbAwareness: "Conciencia de carbohidratos", nutrition: "Puntos de nutrici\u00f3n", originalCard: "Tarjeta original de receta" } },
} as const;

function merge<T extends Record<string, unknown>>(base: T, overlay: Record<string, unknown> = {}): T {
  const output: Record<string, unknown> = { ...base };
  Object.entries(overlay).forEach(([key, value]) => {
    const current = output[key];
    output[key] =
      value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      current &&
      typeof current === "object" &&
      !Array.isArray(current)
        ? merge(current as Record<string, unknown>, value as Record<string, unknown>)
        : value;
  });
  return output as T;
}

const resources = supportedLocales.reduce(
  (acc, locale) => {
    const overlayKey = locale as Exclude<SupportedLocale, "en">;
    acc[locale] = {
      translation: locale === "en" ? commonEn : merge(commonEn, localizedCommon[overlayKey]),
      home: locale === "en" ? homeEn : merge(homeEn, homeOverlays[overlayKey]),
      servicePages: locale === "en" ? servicePagesEn : merge(servicePagesEn, serviceOverlays[overlayKey]),
    };
    return acc;
  },
  {} as Record<SupportedLocale, { translation: typeof commonEn; home: typeof homeEn; servicePages: typeof servicePagesEn }>,
);

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    supportedLngs: supportedLocales,
    load: "currentOnly",
    ns: ["translation", "home", "servicePages"],
    defaultNS: "translation",
    detection: {
      order: ["querystring", "localStorage", "navigator", "htmlTag"],
      lookupQuerystring: "lng",
      caches: ["localStorage"],
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
