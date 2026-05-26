import type { SyntheticEvent } from "react";
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

function bioText(bio: Instructor["bio"]) {
  return Array.isArray(bio) ? bio.join("\n\n") : bio;
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
  const instructors = (t("classes.instructors", { returnObjects: true }) as Instructor[]).slice(0, 5);

  return (
    <section className={className}>
      <div className={framed ? "rounded-[2rem] border border-gray-100 bg-gray-50 p-6 md:p-10" : ""}>
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-wide text-[var(--color-brand-purple)]">
            {t("classes.instructorsEyebrow")}
          </p>
          <h2 className="mt-3 text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
            {t("classes.instructorsTitle")}
          </h2>
          <p className="mt-4 text-base leading-7 text-gray-600">
            {t("classes.instructorsIntro")}
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {instructors.map((instructor) => (
            <article
              key={instructor.name}
              className="grid h-[560px] grid-rows-[180px_128px_1fr] overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm"
            >
              <img
                src={imageSrc(instructor.image)}
                alt={instructor.name}
                onError={handleImageFallback}
                className="h-full w-full object-cover object-center"
                loading="lazy"
              />
              <div className="border-b border-gray-100 p-5">
                <h3 className="text-base font-bold leading-snug text-gray-900">{instructor.name}</h3>
                <p className="mt-2 text-sm font-bold leading-5 text-[var(--color-brand-purple)]">{instructor.role}</p>
              </div>
              <div className="min-h-0 overflow-y-auto p-5">
                <p className="whitespace-pre-line text-sm leading-6 text-gray-600">{bioText(instructor.bio)}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
