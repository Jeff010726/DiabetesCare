import { useEffect, useMemo, useState, type SyntheticEvent } from "react";
import { useTranslation } from "react-i18next";
import { X } from "lucide-react";

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

const fallbackInstructorImage = "team/jinhui-zhou.webp";
const carouselDelay = 5200;

function bioParagraphs(bio: Instructor["bio"]) {
  return Array.isArray(bio) ? bio : [bio];
}

function bioPreview(bio: Instructor["bio"]) {
  return bioParagraphs(bio).slice(0, 2);
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
  const [expandedInstructor, setExpandedInstructor] = useState<Instructor | null>(null);
  const activeInstructor = instructors[activeIndex] ?? instructors[0];

  useEffect(() => {
    if (isPaused || expandedInstructor || instructors.length <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % instructors.length);
    }, carouselDelay);

    return () => window.clearInterval(timer);
  }, [expandedInstructor, instructors.length, isPaused]);

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
          className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px] xl:grid-cols-[minmax(0,1fr)_320px] lg:items-stretch"
          onMouseLeave={() => setIsPaused(false)}
        >
          <article className="grid overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm md:grid-cols-[260px_1fr] lg:min-h-[360px]">
            <div className="relative aspect-[2/3] w-full self-start overflow-hidden bg-gray-50 md:w-[260px]">
              <img
                key={activeInstructor.image}
                src={imageSrc(activeInstructor.image)}
                alt={activeInstructor.name}
                onError={handleImageFallback}
                className="h-full w-full object-cover object-center"
              />
            </div>

            <div className="flex flex-col p-5 md:p-6">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--color-brand-purple)]">
                {activeInstructor.role}
              </p>
              <h3 className="mt-2 text-2xl font-bold leading-tight text-gray-900 md:text-3xl">
                {activeInstructor.name}
              </h3>
              <div className="mt-4 space-y-3 text-sm leading-7 text-gray-600 md:text-base">
                {bioPreview(activeInstructor.bio).map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <div className="mt-5">
                <button
                  type="button"
                  onClick={() => {
                    setExpandedInstructor(activeInstructor);
                    setIsPaused(true);
                  }}
                  className="inline-flex items-center rounded-full border border-[var(--color-brand-purple)] px-4 py-2 text-sm font-bold text-[var(--color-brand-purple)] transition hover:bg-[var(--color-brand-purple)] hover:text-white"
                >
                  {t("classes.instructorsReadFullBio")}
                </button>
              </div>
            </div>
          </article>

          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
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
                    "grid min-h-[64px] grid-cols-[48px_1fr] items-center gap-3 rounded-xl border bg-white p-2 text-left transition-all",
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
                    className="h-12 w-12 rounded-lg object-cover object-center"
                    loading="lazy"
                  />
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-bold leading-tight text-gray-900">{instructor.name}</span>
                    <span className="mt-1 block truncate text-xs font-semibold leading-4 text-gray-500">
                      {instructor.role}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {expandedInstructor && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/55 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="teaching-team-bio-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setExpandedInstructor(null);
              setIsPaused(false);
            }
          }}
        >
          <div className="max-h-[88vh] w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-gray-100 p-5 md:p-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--color-brand-purple)]">
                  {expandedInstructor.role}
                </p>
                <h3 id="teaching-team-bio-title" className="mt-2 text-2xl font-bold leading-tight text-gray-900 md:text-3xl">
                  {expandedInstructor.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setExpandedInstructor(null);
                  setIsPaused(false);
                }}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900"
                aria-label={t("classes.instructorsCloseBio")}
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="max-h-[calc(88vh-120px)] overflow-y-auto p-5 md:p-6">
              <div className="grid gap-5 md:grid-cols-[220px_1fr]">
                <div className="aspect-[2/3] w-full overflow-hidden rounded-2xl bg-gray-50 md:sticky md:top-0 md:w-[220px]">
                  <img
                    src={imageSrc(expandedInstructor.image)}
                    alt={expandedInstructor.name}
                    onError={handleImageFallback}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="space-y-4 text-sm leading-7 text-gray-600 md:text-base">
                  {bioParagraphs(expandedInstructor.bio).map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
