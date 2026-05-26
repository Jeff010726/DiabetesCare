import { ArrowRight, GraduationCap } from "lucide-react";
import type { SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

type Instructor = {
  name: string;
  role: string;
  bio: string | string[];
  image: string;
};

type TeachingTeamSectionProps = {
  variant?: "classes" | "home";
};

const fallbackInstructorImage = "team/instructor-01.webp";

function bioParagraphs(bio: Instructor["bio"]) {
  return Array.isArray(bio) ? bio : [bio];
}

function imageSrc(image: string) {
  return `${import.meta.env.BASE_URL}${image}`;
}

function handleImageFallback(event: SyntheticEvent<HTMLImageElement>) {
  const fallbackSrc = imageSrc(fallbackInstructorImage);
  if (event.currentTarget.src !== fallbackSrc) {
    event.currentTarget.src = fallbackSrc;
  }
}

export default function TeachingTeamSection({ variant = "classes" }: TeachingTeamSectionProps) {
  const { t } = useTranslation("servicePages");
  const instructors = t("classes.instructors", { returnObjects: true }) as Instructor[];
  const featured = instructors[0];
  const rest = instructors.slice(1);

  if (variant === "home") {
    return (
      <section className="order-6 border-y border-gray-100 bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--color-brand-purple)]">
                {t("classes.instructorsEyebrow")}
              </p>
              <h2 className="mt-4 text-3xl font-bold leading-tight text-gray-900 md:text-5xl">
                {t("classes.instructorsTitle")}
              </h2>
              <p className="mt-5 text-lg leading-8 text-gray-600">
                {t("classes.instructorsIntro")}
              </p>
              <Link
                to="/classes"
                className="mt-8 inline-flex items-center gap-2 font-bold text-[var(--color-brand-purple)] underline underline-offset-4"
              >
                {t("classes.viewCurriculumButton")} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {featured && (
              <div className="grid gap-8 md:grid-cols-[260px_1fr] lg:gap-10">
                <img
                  src={imageSrc(featured.image)}
                  alt={featured.name}
                  onError={handleImageFallback}
                  className="h-[340px] w-full rounded-[1.5rem] object-cover object-center md:h-[420px]"
                  loading="lazy"
                />
                <div className="flex flex-col justify-center border-y border-gray-200 py-6">
                  <div className="flex items-center gap-3 text-[var(--color-brand-purple)]">
                    <GraduationCap className="h-5 w-5" />
                    <span className="text-sm font-bold uppercase tracking-[0.16em]">{featured.role}</span>
                  </div>
                  <h3 className="mt-4 text-3xl font-bold text-gray-900">{featured.name}</h3>
                  <div className="mt-5 space-y-4 text-base leading-8 text-gray-600">
                    {bioParagraphs(featured.bio).map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>

                  {rest.length > 0 && (
                    <div className="mt-8 divide-y divide-gray-200 border-t border-gray-200">
                      {rest.map((instructor) => (
                        <div key={instructor.name} className="grid gap-2 py-4 sm:grid-cols-[0.45fr_0.55fr]">
                          <p className="font-bold text-gray-900">{instructor.name}</p>
                          <p className="text-sm leading-6 text-gray-600">{instructor.role}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-16 rounded-[2rem] border border-gray-100 bg-gray-50 p-6 md:p-10">
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-wide text-[var(--color-brand-purple)]">
            {t("classes.instructorsEyebrow")}
          </p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">{t("classes.instructorsTitle")}</h2>
          <p className="mt-4 text-base leading-7 text-gray-600">{t("classes.instructorsIntro")}</p>
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {instructors.map((instructor) => (
          <article key={instructor.name} className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
            <img
              src={imageSrc(instructor.image)}
              alt={instructor.name}
              onError={handleImageFallback}
              className="h-44 w-full object-cover"
              loading="lazy"
            />
            <div className="p-5">
              <h3 className="text-base font-bold text-gray-900">{instructor.name}</h3>
              <p className="mt-1 text-sm font-bold text-[var(--color-brand-purple)]">{instructor.role}</p>
              <div className="mt-3 space-y-3 text-sm leading-6 text-gray-600">
                {bioParagraphs(instructor.bio).map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
