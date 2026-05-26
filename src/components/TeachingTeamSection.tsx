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
      <div className={framed ? "rounded-[2rem] border border-gray-100 bg-gray-50 p-6 md:p-10" : ""}>
        <div className="grid gap-8 lg:grid-cols-[340px_minmax(0,1fr)] lg:items-stretch">
          <div className="flex flex-col">
            <div className="mb-7">
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

            <div className="grid flex-1 gap-3">
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
                    onMouseLeave={() => setIsPaused(false)}
                    className={[
                      "grid min-h-[92px] grid-cols-[72px_1fr] gap-4 rounded-2xl border p-3 text-left transition-all",
                      isActive
                        ? "border-[var(--color-brand-purple)] bg-white shadow-md shadow-purple-100/70"
                        : "border-transparent bg-white/70 hover:border-gray-200 hover:bg-white",
                    ].join(" ")}
                    aria-pressed={isActive}
                  >
                    <img
                      src={imageSrc(instructor.image)}
                      alt={instructor.name}
                      onError={handleImageFallback}
                      className="h-[68px] w-[72px] rounded-xl object-cover object-center"
                      loading="lazy"
                    />
                    <span className="min-w-0 self-center">
                      <span className="block text-sm font-bold leading-snug text-gray-900">{instructor.name}</span>
                      <span className="mt-1 block text-xs font-bold leading-5 text-[var(--color-brand-purple)]">
                        {instructor.role}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <article className="grid min-h-[620px] overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-sm lg:grid-cols-[minmax(300px,0.9fr)_minmax(0,1.1fr)]">
            <div className="relative min-h-[360px] overflow-hidden bg-gray-100 lg:min-h-full">
              <img
                key={activeInstructor.image}
                src={imageSrc(activeInstructor.image)}
                alt={activeInstructor.name}
                onError={handleImageFallback}
                className="h-full w-full object-cover object-center"
              />
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/35 to-transparent" />
            </div>

            <div className="flex min-h-0 flex-col p-6 md:p-8">
              <p className="text-sm font-bold uppercase tracking-wide text-[var(--color-brand-purple)]">
                {activeInstructor.role}
              </p>
              <h3 className="mt-3 text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
                {activeInstructor.name}
              </h3>
              <div className="mt-6 min-h-0 flex-1 overflow-y-auto pr-1">
                <div className="space-y-5 text-base leading-8 text-gray-600">
                  {bioParagraphs(activeInstructor.bio).map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex gap-2">
                {instructors.map((instructor, index) => (
                  <button
                    key={instructor.name}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={[
                      "h-2 rounded-full transition-all",
                      index === activeIndex
                        ? "w-10 bg-[var(--color-brand-purple)]"
                        : "w-2 bg-gray-300 hover:bg-gray-400",
                    ].join(" ")}
                    aria-label={instructor.name}
                  />
                ))}
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
