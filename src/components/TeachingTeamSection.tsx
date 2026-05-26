import type { SyntheticEvent } from "react";
import { GraduationCap, Users } from "lucide-react";
import { useTranslation } from "react-i18next";

type Instructor = {
  name: string;
  role: string;
  bio: string | string[];
  image: string;
};

type TeachingTeamSectionProps = {
  className?: string;
  framed?: boolean;
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

export default function TeachingTeamSection({ className = "", framed = true }: TeachingTeamSectionProps) {
  const { t } = useTranslation("servicePages");
  const instructors = t("classes.instructors", { returnObjects: true }) as Instructor[];
  const featured = instructors[0];
  const roster = instructors.slice(1, 5);

  return (
    <section className={className}>
      <div className={framed ? "rounded-[2rem] border border-gray-100 bg-gray-50 p-6 md:p-10" : ""}>
        <div className="mb-10 grid gap-5 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-[var(--color-brand-purple)]">
              {t("classes.instructorsEyebrow")}
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
              {t("classes.instructorsTitle")}
            </h2>
          </div>
          <p className="text-base leading-7 text-gray-600 lg:max-w-2xl">
            {t("classes.instructorsIntro")}
          </p>
        </div>

        {featured && (
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(340px,0.75fr)]">
            <article className="grid overflow-hidden rounded-[1.75rem] border border-gray-100 bg-white shadow-sm md:grid-cols-[260px_1fr]">
              <img
                src={imageSrc(featured.image)}
                alt={featured.name}
                onError={handleImageFallback}
                className="h-72 w-full object-cover object-center md:h-full"
                loading="lazy"
              />
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-3 text-[var(--color-brand-purple)]">
                  <GraduationCap className="h-5 w-5 shrink-0" />
                  <p className="text-sm font-bold uppercase tracking-wide">{featured.role}</p>
                </div>
                <h3 className="mt-4 text-2xl font-bold leading-tight text-gray-900 md:text-3xl">
                  {featured.name}
                </h3>
                <div className="mt-5 grid gap-4 text-sm leading-7 text-gray-600 xl:grid-cols-3">
                  {bioParagraphs(featured.bio).map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </article>

            <div className="rounded-[1.75rem] border border-gray-100 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--color-brand-purple-light)] text-[var(--color-brand-purple)]">
                  <Users className="h-5 w-5" />
                </div>
                <p className="text-sm font-bold uppercase tracking-wide text-gray-500">
                  {t("classes.rosterLabel")}
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                {roster.map((instructor) => (
                  <article key={instructor.name} className="grid grid-cols-[72px_1fr] gap-4 rounded-2xl bg-gray-50 p-3">
                    <img
                      src={imageSrc(instructor.image)}
                      alt={instructor.name}
                      onError={handleImageFallback}
                      className="h-20 w-18 rounded-xl object-cover object-center"
                      loading="lazy"
                    />
                    <div className="min-w-0 self-center">
                      <h3 className="text-sm font-bold leading-snug text-gray-900">{instructor.name}</h3>
                      <p className="mt-1 text-xs font-bold leading-5 text-[var(--color-brand-purple)]">{instructor.role}</p>
                      <p className="mt-1 line-clamp-2 text-xs leading-5 text-gray-500">{bioParagraphs(instructor.bio)[0]}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
