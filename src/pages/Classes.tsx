import {
  Activity,
  Apple,
  BookOpen,
  CheckCircle2,
  GraduationCap,
  HeartPulse,
  Pill,
  ReceiptText,
  ShieldCheck,
  SmilePlus,
  Users,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { bookingUrl } from "../lib/booking";
import ProviderAccessCallout from "../components/ProviderAccessCallout";
import "../locales/servicePages";

type CurriculumSession = {
  title: string;
  subtitle: string;
  topics: string[];
};

type InfoCard = {
  title: string;
  desc: string;
};

export default function Classes() {
  const { t } = useTranslation("servicePages");
  const curriculum = t("classes.curriculum", { returnObjects: true }) as CurriculumSession[];
  const outcomes = t("classes.outcomes", { returnObjects: true }) as string[];
  const credentials = t("classes.credentials", { returnObjects: true }) as InfoCard[];
  const startSteps = t("classes.startSteps", { returnObjects: true }) as InfoCard[];
  const sessionIcons = [BookOpen, Apple, Activity, Pill, ShieldCheck, SmilePlus];

  return (
    <div className="bg-white text-gray-900">
      <div className="relative overflow-hidden bg-[#eaf2ff] py-16 md:py-20">
        <div className="absolute right-0 top-0 hidden h-full w-1/2 bg-gradient-to-l from-white/50 to-transparent lg:block" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-bold text-[var(--color-brand-purple)] shadow-sm">
                <GraduationCap className="h-4 w-4" />
                {t("classes.eyebrow")}
              </span>
              <h1 className="mt-6 text-4xl font-bold leading-tight text-gray-950 md:text-6xl">
                {t("classes.heroTitle")}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-700 md:text-xl">
                {t("classes.heroSubtitle")}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href={bookingUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-brand-purple)] px-7 py-4 text-base font-bold text-white shadow-lg transition hover:bg-[var(--color-brand-purple)]/90">
                  {t("classes.bookButton")}
                  <CheckCircle2 className="h-5 w-5" />
                </a>
                <a href="#curriculum" className="inline-flex items-center justify-center rounded-full border-2 border-[var(--color-brand-purple)]/20 bg-white px-7 py-4 text-base font-bold text-[var(--color-brand-purple)] transition hover:bg-white/80">
                  {t("classes.viewCurriculumButton")}
                </a>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {outcomes.map((outcome) => (
                  <div key={outcome} className="rounded-2xl bg-white/80 px-4 py-3 text-sm font-semibold text-gray-700 shadow-sm">
                    {outcome}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[2rem] bg-white p-6 shadow-xl ring-1 ring-black/5">
              <div className="rounded-[1.5rem] bg-gradient-to-br from-[var(--color-brand-purple)] to-blue-700 p-6 text-white">
                <p className="text-sm font-bold uppercase tracking-wide text-white/80">{t("classes.programLabel")}</p>
                <p className="mt-3 text-4xl font-bold">{t("classes.hours")}</p>
                <p className="mt-2 text-white/85">{t("classes.hoursDescription")}</p>
              </div>
              <div className="mt-5 grid gap-3">
                {[t("classes.bilingual"), t("classes.delivery"), t("classes.coverageNote")].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl bg-gray-50 p-4">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-brand-purple)]" />
                    <span className="text-sm font-semibold text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="border-y border-gray-100 bg-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-[var(--color-brand-purple)]">{t("classes.credentialEyebrow")}</p>
              <h2 className="mt-3 text-3xl font-bold">{t("classes.credentialTitle")}</h2>
              <p className="mt-4 text-base leading-7 text-gray-600">{t("classes.credentialIntro")}</p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {credentials.map((item, index) => {
                const Icon = index === 0 ? ShieldCheck : index === 1 ? GraduationCap : ReceiptText;
                return (
                  <div key={item.title} className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                    <Icon className="h-7 w-7 text-[var(--color-brand-purple)]" />
                    <h3 className="mt-4 text-base font-bold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-gray-600">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <div id="curriculum" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-12 max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-wide text-[var(--color-brand-purple)]">{t("classes.curriculumEyebrow")}</p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">{t("classes.curriculumTitle")}</h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            {t("classes.curriculumIntro")}
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {curriculum.map((session, index) => {
            const Icon = sessionIcons[index] || BookOpen;
            return (
              <article key={session.title} className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-brand-purple-light)] text-[var(--color-brand-purple)]">
                    <Icon className="h-7 w-7" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[var(--color-brand-purple)]">{t("classes.sessionLabel", { number: index + 1 })}</p>
                    <h3 className="mt-1 text-xl font-bold">{session.title}</h3>
                    <p className="mt-1 text-sm font-semibold text-gray-500">{session.subtitle}</p>
                  </div>
                </div>
                <ul className="mt-5 space-y-3">
                  {session.topics.map((topic) => (
                    <li key={topic} className="flex gap-3 text-sm leading-6 text-gray-700">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        <section className="mt-16 rounded-[2rem] bg-gray-950 p-6 text-white md:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-white/60">{t("classes.startEyebrow")}</p>
              <h2 className="mt-3 text-3xl font-bold">{t("classes.startTitle")}</h2>
              <p className="mt-4 text-sm leading-7 text-white/70">{t("classes.startIntro")}</p>
            </div>
            <div className="grid gap-4 md:grid-cols-4">
              {startSteps.map((step, index) => (
                <div key={step.title} className="rounded-2xl bg-white/10 p-5 ring-1 ring-white/10">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm font-bold text-gray-950">{index + 1}</div>
                  <h3 className="mt-4 text-base font-bold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/70">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="mt-16 grid gap-8 rounded-3xl bg-[var(--color-brand-pink-light)]/50 p-8 md:grid-cols-[1fr_auto] md:p-10">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-[var(--color-brand-pink)] shadow-sm">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold md:text-3xl">{t("classes.ctaTitle")}</h2>
              <p className="mt-3 max-w-3xl text-base leading-7 text-gray-700">
                {t("classes.ctaBody")}
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <a href={bookingUrl} target="_blank" rel="noreferrer" className="inline-flex w-full items-center justify-center rounded-full bg-[var(--color-brand-purple)] px-8 py-4 font-bold text-white transition hover:bg-[var(--color-brand-purple)]/90 md:w-auto">
              {t("classes.bookButton")}
            </a>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-5">
          <div className="flex items-start gap-3">
            <HeartPulse className="mt-0.5 h-5 w-5 shrink-0 text-gray-500" />
            <p className="text-xs leading-6 text-gray-500">
              <span className="font-bold text-gray-700">{t("classes.disclaimerTitle")} </span>
              {t("classes.disclaimerBody")}
            </p>
          </div>
        </div>

        <div className="mt-12">
          <ProviderAccessCallout tone="purple" />
        </div>
      </div>
    </div>
  );
}
