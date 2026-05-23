import { ArrowRight, Check, ClipboardCheck, Pill, ShieldCheck, Syringe, Utensils } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ProviderAccessCallout from "../components/ProviderAccessCallout";
import { bookingUrl } from "../lib/booking";
import "../locales/servicePages";

export default function GLP1Training() {
  const { t } = useTranslation("servicePages");
  const topics = t("glp1Training.topics", { returnObjects: true }) as Array<{ title: string; desc: string }>;
  const sideEffects = t("glp1Training.sideEffects", { returnObjects: true }) as string[];
  const topicIcons = [Syringe, Pill, Utensils, ClipboardCheck];
  const topicTones = [
    "bg-[var(--color-brand-purple-light)] text-[var(--color-brand-purple)]",
    "bg-[var(--color-brand-pink-light)] text-[var(--color-brand-pink)]",
    "bg-yellow-50 text-yellow-600",
    "bg-green-50 text-green-600",
  ];

  return (
    <div className="bg-white">
      <section className="relative overflow-hidden bg-gray-50">
        <img
          src={`${import.meta.env.BASE_URL}hero-glp1-training.webp`}
          alt={t("glp1Training.imageAlt")}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-white/35" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/85 px-4 py-2 text-sm font-semibold text-[var(--color-brand-purple)] shadow-sm border border-[var(--color-brand-purple)]/15">
              <ShieldCheck className="h-4 w-4 text-[var(--color-brand-pink)]" />
              {t("glp1Training.badge")}
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-tight text-gray-900 md:text-6xl">
              {t("glp1Training.heroTitle")}
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-relaxed text-gray-700">
              {t("glp1Training.heroSubtitle")}
            </p>
            <a
              href={bookingUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-brand-purple)] px-8 py-4 text-lg font-bold text-white shadow-lg transition-colors hover:bg-[var(--color-brand-purple)]/90"
            >
              {t("glp1Training.scheduleButton")} <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">{t("glp1Training.trainingTitle")}</h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">{t("glp1Training.trainingIntro")}</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {topics.map((topic, index) => {
            const Icon = topicIcons[index] ?? ClipboardCheck;
            return (
              <div key={topic.title} className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition-transform hover:-translate-y-1">
                <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl ${topicTones[index] ?? topicTones[0]}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-900">{topic.title}</h3>
                <p className="text-gray-600 leading-relaxed">{topic.desc}</p>
              </div>
            );
          })}
        </div>

        <section className="my-20 grid gap-8 rounded-3xl bg-[var(--color-brand-purple-light)]/45 p-8 md:grid-cols-[0.95fr_1.05fr] md:p-12">
          <div>
            <h2 className="mb-4 text-3xl font-bold text-gray-900">{t("glp1Training.sideEffectTitle")}</h2>
            <p className="text-lg leading-relaxed text-gray-700">{t("glp1Training.sideEffectIntro")}</p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm border border-white">
            <ul className="space-y-4">
              {sideEffects.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-green-500" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <ProviderAccessCallout tone="green" />
      </main>
    </div>
  );
}
