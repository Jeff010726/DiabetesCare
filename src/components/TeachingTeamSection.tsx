import { useEffect, useMemo, useState, type SyntheticEvent } from "react";
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
const carouselDelay = 5200;

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
  const instructors = useMemo(
    () => (t("classes.instructors", { returnObjects: true }) as Instructor[]).slice(0, 5),
    [t],
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const activeInstructor = instructors[activeIndex] ?? instructors[0];

  useEffect(() => {
    if (isPaused || instructors.length <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % instructors.length);
    }, carouselDelay);

    return () => window.clearInterval(timer);
  }, [instructors.length, isPaused]);

  if (!activeInstructor) {
    return null;
  }

  return (
    <section className={className}>
      <div className={framed ? "rounded-[1.75rem] border border-gray-100 bg-gradient-to-br from-white via-[var(--color-brand-purple-light)]/25 to-white p-5 shadow-[0_24px_70px_-48px_rgba(31,41,55,0.35)] md:p-7" : ""}>
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-brand-purple)]">
              {t("classes.instructorsEyebrow")}
            </p>
            <h2 className="mt-2 text-2xl font-bold leading-tight text-gray-900 md:text-3xl">
              {t("classes.instructorsTitle")}
            </h2>
            <p className="mt-3 text-sm leading-6 text-gray-600 md:text-base">
              {t("classes.instructorsIntro")}
            </p>
          </div>

          <div className="flex gap-2">
            {instructors.map((instructor, index) => (
              <button
                key={instructor.name}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={[
                  "h-2.5 rounded-full transition-all",
                  index === activeIndex
                    ? "w-9 bg-[var(--color-brand-purple)]"
                    : "w-2.5 bg-gray-300 hover:bg-gray-400",
                ].join(" ")}
                aria-label={instructor.name}
              />
            ))}
          </div>
        </div>

        <div
          className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.88fr)] lg:items-stretch"
          onMouseLeave={() => setIsPaused(false)}
        >
          <article className="grid overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm md:grid-cols-[240px_1fr] lg:min-h-[330px]">
            <div className="relative h-64 overflow-hidden bg-gray-100 md:h-full">
              <img
                key={activeInstructor.image}
                src={imageSrc(activeInstructor.image)}
                alt={activeInstructor.name}
                onError={handleImageFallback}
                className="h-full w-full object-cover object-center"
              />
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            <div className="flex flex-col p-5 md:p-6">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--color-brand-purple)]">
                {activeInstructor.role}
              </p>
              <h3 className="mt-2 text-2xl font-bold leading-tight text-gray-900 md:text-3xl">
                {activeInstructor.name}
              </h3>
              <div className="mt-4 space-y-3 text-sm leading-7 text-gray-600 md:text-base">
                {bioParagraphs(activeInstructor.bio).map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </article>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {instructors.map((instructor, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={instructor.name}
                  type="button"
                  onBlur={() => setIsPaused(false)}
                  onFocus={() => {
                    setActiveIndex(index);
                    setIsPaused(true);
                  }}
                  onMouseEnter={() => {
                    setActiveIndex(index);
                    setIsPaused(true);
                  }}
                  className={[
                    "grid min-h-[74px] grid-cols-[56px_1fr] items-center gap-3 rounded-2xl border bg-white p-2.5 text-left transition-all",
                    isActive
                      ? "border-[var(--color-brand-purple)] shadow-md shadow-purple-100/70"
                      : "border-gray-100 hover:border-gray-200 hover:shadow-sm",
                  ].join(" ")}
                  aria-pressed={isActive}
                >
                  <img
                    src={imageSrc(instructor.image)}
                    alt={instructor.name}
                    onError={handleImageFallback}
                    className="h-14 w-14 rounded-xl object-cover object-center"
                    loading="lazy"
                  />
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-bold leading-snug text-gray-900">{instructor.name}</span>
                    <span className="mt-1 block text-xs font-semibold leading-5 text-gray-500">
                      {instructor.role}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
