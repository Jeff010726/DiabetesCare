import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { classAgreementResources } from "../locales/classAgreement";

type Agreement = (typeof classAgreementResources)["en"];

export default function ClassAgreement() {
  const { t } = useTranslation("classAgreement");
  const sections = t("sections", { returnObjects: true }) as Agreement["sections"];

  return (
    <main className="bg-white px-4 py-12 sm:px-6 lg:px-8">
      <article className="mx-auto max-w-4xl">
        <Link to="/sign-up-class" className="text-sm font-bold text-[var(--color-brand-purple)] underline underline-offset-4">
          {t("back")}
        </Link>
        <h1 className="mt-5 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">{t("title")}</h1>
        <p className="mt-4 text-base leading-7 text-gray-600">{t("lead")}</p>
        <div className="mt-8 space-y-7">
          {sections.map((section) => (
            <section key={section.title} className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
              <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
              {section.body?.map((paragraph) => (
                <p key={paragraph} className="mt-3 text-sm leading-7 text-gray-700">
                  {paragraph}
                </p>
              ))}
              {section.bullets && (
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-gray-700">
                  {section.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </article>
    </main>
  );
}
