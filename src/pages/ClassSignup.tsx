import { ChangeEvent, FormEvent, PointerEvent as ReactPointerEvent, ReactNode, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, ClipboardList, Eraser, ImageUp, PenLine, ShieldCheck } from "lucide-react";
import imageCompression from "browser-image-compression";
import { useTranslation } from "react-i18next";
import { apiRequest } from "../lib/api";
import { trackEvent } from "../lib/analytics";

const insuranceCardAccept = "image/jpeg,image/png,image/webp,image/heic,image/heif";

function compressedCardName(name: string) {
  const baseName = name.replace(/\.[^/.]+$/, "").replace(/[^a-zA-Z0-9-_]+/g, "-").replace(/^-+|-+$/g, "") || "insurance-card";
  return `${baseName}.jpg`;
}

async function optimizeInsuranceCard(file: File) {
  const optimized = await imageCompression(file, {
    maxSizeMB: 1.5,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    fileType: "image/jpeg",
    initialQuality: 0.82,
    preserveExif: false,
  });
  return new File([optimized], compressedCardName(file.name), {
    type: "image/jpeg",
    lastModified: Date.now(),
  });
}

export default function ClassSignup() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation("classSignup");
  const patientTypeOptions = t("options.patientTypes", { returnObjects: true }) as string[];
  const genderOptions = t("options.genders", { returnObjects: true }) as string[];
  const raceOptions = t("options.races", { returnObjects: true }) as string[];
  const languageOptions = t("options.languages", { returnObjects: true }) as string[];
  const educationOptions = t("options.education", { returnObjects: true }) as string[];
  const insuranceOptions = t("options.insurance", { returnObjects: true }) as string[];
  const conditionOptions = t("options.conditions", { returnObjects: true }) as string[];
  const monitoringOptions = t("options.monitoring", { returnObjects: true }) as string[];
  const medicationOptions = t("options.medication", { returnObjects: true }) as string[];
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [error, setError] = useState("");
  const [insuranceCards, setInsuranceCards] = useState({
    front: null as File | null,
    back: null as File | null,
  });
  const [compressingCard, setCompressingCard] = useState<"front" | "back" | null>(null);
  const [signature, setSignature] = useState<Blob | null>(null);
  const [form, setForm] = useState({
    fullName: "",
    dateOfBirth: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    postalCode: "",
    patientType: "",
    gender: "",
    genderOther: "",
    raceEthnicity: [] as string[],
    primaryLanguage: "",
    primaryLanguageOther: "",
    stateResidence: "",
    educationLevel: "",
    hasUsHealthInsurance: "",
    diagnosedConditions: [] as string[],
    bloodSugarMonitoring: "",
    diabetesMedications: [] as string[],
    agreementAccepted: false,
  });

  const updateText = (field: keyof typeof form) => (event: ChangeEvent<HTMLInputElement>) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const updateCheckbox = (field: "agreementAccepted") => (event: ChangeEvent<HTMLInputElement>) => {
    setForm((current) => ({ ...current, [field]: event.target.checked }));
  };

  const updateChoice = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const toggleList = (field: "raceEthnicity" | "diagnosedConditions" | "diabetesMedications", value: string) => {
    setForm((current) => {
      const list = current[field];
      const next = list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
      return { ...current, [field]: next };
    });
  };

  const updateInsuranceCard = (kind: "front" | "back") => async (event: ChangeEvent<HTMLInputElement>) => {
    const sourceFile = event.target.files?.[0] || null;
    if (!sourceFile) {
      setInsuranceCards((current) => ({ ...current, [kind]: null }));
      return;
    }

    setError("");
    setStatus("idle");
    setCompressingCard(kind);
    try {
      const optimized = await optimizeInsuranceCard(sourceFile);
      setInsuranceCards((current) => ({ ...current, [kind]: optimized }));
    } catch {
      setInsuranceCards((current) => ({ ...current, [kind]: null }));
      setStatus("error");
      setError(t("fileOptimizationError"));
    } finally {
      setCompressingCard(null);
    }
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setError("");

    if (!form.agreementAccepted) {
      setStatus("error");
      setError(t("errors.agreement"));
      return;
    }
    if (form.raceEthnicity.length < 1 || form.diagnosedConditions.length < 1 || form.diabetesMedications.length < 1) {
      setStatus("error");
      setError(t("errors.choices"));
      return;
    }
    if (!insuranceCards.front || !insuranceCards.back) {
      setStatus("error");
      setError(t("errors.cards"));
      return;
    }
    if (!signature) {
      setStatus("error");
      setError(t("errors.signature"));
      return;
    }
    if (compressingCard) {
      setStatus("error");
      setError(t("errors.optimizing"));
      return;
    }

    try {
      const formData = new FormData();
      formData.set("fullName", form.fullName);
      formData.set("dateOfBirth", form.dateOfBirth);
      formData.set("email", form.email);
      formData.set("phone", form.phone);
      formData.set("addressLine1", form.addressLine1);
      formData.set("addressLine2", form.addressLine2);
      formData.set("city", form.city);
      formData.set("postalCode", form.postalCode);
      formData.set("patientType", form.patientType);
      formData.set("gender", form.gender);
      formData.set("genderOther", form.genderOther);
      formData.set("raceEthnicity", JSON.stringify(form.raceEthnicity));
      formData.set("primaryLanguage", form.primaryLanguage);
      formData.set("primaryLanguageOther", form.primaryLanguageOther);
      formData.set("stateResidence", form.stateResidence);
      formData.set("educationLevel", form.educationLevel);
      formData.set("hasUsHealthInsurance", form.hasUsHealthInsurance);
      formData.set("diagnosedConditions", JSON.stringify(form.diagnosedConditions));
      formData.set("bloodSugarMonitoring", form.bloodSugarMonitoring);
      formData.set("diabetesMedications", JSON.stringify(form.diabetesMedications));
      formData.set("agreementAccepted", String(form.agreementAccepted));
      formData.set("sourcePage", window.location.pathname);
      formData.set("preferredSiteLanguage", i18n.language);
      formData.set("insuranceCardFront", insuranceCards.front);
      formData.set("insuranceCardBack", insuranceCards.back);
      formData.set("signature", signature, "electronic-signature.png");
      await apiRequest<{ ok: boolean; id: string }>("/api/class-signup", {
        method: "POST",
        body: formData,
      });
      trackEvent({ eventType: "class_signup", eventName: "dsmes_class_signup_form" });
      navigate("/sign-up-class-thank-you");
    } catch (submitError) {
      setStatus("error");
      setError(submitError instanceof Error ? submitError.message : t("errors.fallback"));
    }
  };

  return (
    <div className="bg-white">
      <section className="border-b border-gray-100 bg-[linear-gradient(135deg,#f8f3fb_0%,#f2fbf7_58%,#ffffff_100%)] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,0.75fr)] lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-brand-purple)]/15 bg-white px-4 py-2 text-sm font-bold text-[var(--color-brand-purple)] shadow-sm">
              <ClipboardList className="h-4 w-4 text-[var(--color-brand-pink)]" />
              {t("badge")}
            </span>
            <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
              {t("title")}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-700">
              {t("intro")}
            </p>
          </div>
          <div className="rounded-3xl border border-white bg-white/85 p-5 shadow-xl sm:p-6">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-1 h-6 w-6 shrink-0 text-green-600" />
              <div>
                <h2 className="text-lg font-bold text-gray-900">{t("agreementRequiredTitle")}</h2>
                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {t("agreementRequiredBody")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <form className="space-y-5" onSubmit={submit}>
          <Question title={t("contactDetailsTitle")}>
            <p className="mb-4 text-sm leading-6 text-gray-600">{t("contactDetailsBody")}</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label={t("contactFields.fullName")} value={form.fullName} onChange={updateText("fullName")} autoComplete="name" required />
              <Field label={t("contactFields.dateOfBirth")} value={form.dateOfBirth} onChange={updateText("dateOfBirth")} type="date" autoComplete="bday" required />
              <Field label={t("contactFields.email")} value={form.email} onChange={updateText("email")} type="email" autoComplete="email" required />
              <Field label={t("contactFields.phone")} value={form.phone} onChange={updateText("phone")} type="tel" autoComplete="tel" inputMode="tel" required />
              <Field label={t("contactFields.addressLine1")} value={form.addressLine1} onChange={updateText("addressLine1")} autoComplete="address-line1" required className="sm:col-span-2" />
              <Field label={t("contactFields.addressLine2")} value={form.addressLine2} onChange={updateText("addressLine2")} autoComplete="address-line2" />
              <Field label={t("contactFields.city")} value={form.city} onChange={updateText("city")} autoComplete="address-level2" required />
              <Field label={t("stateLabel")} value={form.stateResidence} onChange={updateText("stateResidence")} autoComplete="address-level1" required />
              <Field label={t("contactFields.postalCode")} value={form.postalCode} onChange={updateText("postalCode")} autoComplete="postal-code" inputMode="numeric" required />
            </div>
          </Question>

          <Question title={t("questions.patientType")} number={1}>
            <RadioGroup name="patientType" options={patientTypeOptions} value={form.patientType} onChange={(value) => updateChoice("patientType", value)} required />
          </Question>

          <Question title={t("questions.gender")} number={2}>
            <RadioGroup name="gender" options={genderOptions} value={form.gender} onChange={(value) => updateChoice("gender", value)} required />
            {form.gender === genderOptions[3] && (
              <Field label={t("otherSpecify")} value={form.genderOther} onChange={updateText("genderOther")} className="mt-4" />
            )}
          </Question>

          <Question title={t("questions.race")} number={3}>
            <CheckboxGroup options={raceOptions} values={form.raceEthnicity} onChange={(value) => toggleList("raceEthnicity", value)} />
          </Question>

          <Question title={t("questions.language")} number={4}>
            <RadioGroup
              name="primaryLanguage"
              options={languageOptions}
              value={form.primaryLanguage}
              onChange={(value) => updateChoice("primaryLanguage", value)}
              required
            />
            {form.primaryLanguage === languageOptions[5] && (
              <Field label={t("otherSpecify")} value={form.primaryLanguageOther} onChange={updateText("primaryLanguageOther")} className="mt-4" />
            )}
          </Question>

          <Question title={t("questions.education")} number={5}>
            <RadioGroup
              name="educationLevel"
              options={educationOptions}
              value={form.educationLevel}
              onChange={(value) => updateChoice("educationLevel", value)}
              required
            />
          </Question>

          <Question title={t("questions.insurance")} number={6}>
            <RadioGroup
              name="hasUsHealthInsurance"
              options={insuranceOptions}
              value={form.hasUsHealthInsurance}
              onChange={(value) => updateChoice("hasUsHealthInsurance", value)}
              required
            />
          </Question>

          <Question title={t("questions.conditions")} number={7}>
            <CheckboxGroup options={conditionOptions} values={form.diagnosedConditions} onChange={(value) => toggleList("diagnosedConditions", value)} />
          </Question>

          <Question title={t("questions.monitoring")} number={8}>
            <RadioGroup
              name="bloodSugarMonitoring"
              options={monitoringOptions}
              value={form.bloodSugarMonitoring}
              onChange={(value) => updateChoice("bloodSugarMonitoring", value)}
              required
            />
          </Question>

          <Question title={t("questions.medication")} number={9}>
            <CheckboxGroup options={medicationOptions} values={form.diabetesMedications} onChange={(value) => toggleList("diabetesMedications", value)} />
          </Question>

          <section className="rounded-3xl border border-emerald-100 bg-emerald-50/45 p-5 shadow-sm sm:p-6">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-emerald-700 shadow-sm">
                <ImageUp className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">{t("insuranceCardsTitle")}</h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  {t("insuranceCardsBody")}
                </p>
              </div>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <FileField label={t("insuranceFront")} file={insuranceCards.front} onChange={updateInsuranceCard("front")} optimizing={compressingCard === "front"} required optimizingLabel={t("optimizingPhoto")} readyLabel={t("photoReady", { name: "{{name}}" })} />
              <FileField label={t("insuranceBack")} file={insuranceCards.back} onChange={updateInsuranceCard("back")} optimizing={compressingCard === "back"} required optimizingLabel={t("optimizingPhoto")} readyLabel={t("photoReady", { name: "{{name}}" })} />
            </div>
            <p className="mt-4 text-xs leading-5 text-gray-500">{t("insuranceCardsHelp")}</p>
          </section>

          <section className="rounded-3xl border border-[var(--color-brand-purple)]/15 bg-[var(--color-brand-purple-light)]/35 p-5 sm:p-6">
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={form.agreementAccepted}
                onChange={updateCheckbox("agreementAccepted")}
                required
                className="mt-1 h-5 w-5 rounded border-gray-300 text-[var(--color-brand-purple)] focus:ring-[var(--color-brand-purple)]"
              />
              <span className="text-sm leading-6 text-gray-700">
                {t("agreementPrefix")} {" "}
                <Link to="/class-agreement" className="font-bold text-[var(--color-brand-purple)] underline underline-offset-4">
                  {t("agreementTitle")}
                </Link>
                .
              </span>
            </label>
          </section>

          <section className="rounded-3xl border border-[var(--color-brand-purple)]/15 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-brand-purple-light)] text-[var(--color-brand-purple)]">
                <PenLine className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">{t("signatureTitle")}</h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">{t("signatureBody")}</p>
              </div>
            </div>
            <SignaturePad
              value={signature}
              onChange={setSignature}
              clearLabel={t("signatureClear")}
              hint={t("signatureHint")}
            />
          </section>

          {status === "error" && <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p>}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[var(--color-brand-purple)] px-6 text-base font-bold text-white transition hover:bg-[var(--color-brand-purple)]/90 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {status === "submitting" ? t("submitting") : t("submit")}
            <ArrowRight className="h-5 w-5" />
          </button>
        </form>
      </main>
    </div>
  );
}

type FieldProps = {
  label: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  className?: string;
  autoComplete?: string;
  inputMode?: "email" | "numeric" | "tel" | "text" | "url" | "search" | "decimal" | "none";
};

function Field({ label, value, onChange, type = "text", required, className = "", autoComplete, inputMode }: FieldProps) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-sm font-bold text-gray-800">{label}</span>
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        autoComplete={autoComplete}
        inputMode={inputMode}
        className="h-[52px] w-full rounded-2xl border border-gray-200 bg-white px-4 text-base text-gray-900 outline-none transition focus:border-[var(--color-brand-purple)] focus:ring-4 focus:ring-[var(--color-brand-purple)]/10"
      />
    </label>
  );
}

function Question({ title, number, children }: { title: string; number?: number; children: ReactNode }) {
  const heading = number ? `${number}. ${title.replace(/^\d+\.\s*/, "")}` : title;
  return (
    <section className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-lg font-bold leading-7 text-gray-900">{heading}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function SignaturePad({ value, onChange, clearLabel, hint }: { value: Blob | null; onChange: (signature: Blob | null) => void; clearLabel: string; hint: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);

  const point = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    return { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
  };

  const emit = () => {
    canvasRef.current?.toBlob((blob) => onChange(blob), "image/png");
  };

  const drawDot = (context: CanvasRenderingContext2D, next: { x: number; y: number }) => {
    context.beginPath();
    context.arc(next.x, next.y, 1.6, 0, Math.PI * 2);
    context.fill();
  };

  const start = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    drawingRef.current = true;
    lastPointRef.current = point(event);
    const context = canvas.getContext("2d");
    if (context) drawDot(context, lastPointRef.current);
  };

  const move = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const lastPoint = lastPointRef.current;
    if (!canvas || !drawingRef.current || !lastPoint) return;
    const next = point(event);
    const context = canvas.getContext("2d");
    if (!context) return;
    context.beginPath();
    context.moveTo(lastPoint.x, lastPoint.y);
    context.lineTo(next.x, next.y);
    context.stroke();
    lastPointRef.current = next;
  };

  const stop = () => {
    if (!drawingRef.current) return;
    drawingRef.current = false;
    lastPointRef.current = null;
    emit();
  };

  const clear = () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (canvas && context) context.clearRect(0, 0, canvas.width, canvas.height);
    onChange(null);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      canvas.width = Math.round(bounds.width * ratio);
      canvas.height = Math.round(bounds.height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.strokeStyle = "#24283b";
      context.fillStyle = "#24283b";
      context.lineWidth = 2.4;
      context.lineCap = "round";
      context.lineJoin = "round";
      onChange(null);
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    return () => observer.disconnect();
  }, [onChange]);

  return (
    <div className="mt-5">
      <div className="relative overflow-hidden rounded-2xl border-2 border-dashed border-[var(--color-brand-purple)]/30 bg-[var(--color-brand-purple-light)]/20">
        {!value && <span className="pointer-events-none absolute inset-0 flex items-center justify-center px-4 text-center text-sm text-gray-400">{hint}</span>}
        <canvas
          ref={canvasRef}
          aria-label={hint}
          className="block h-40 w-full touch-none cursor-crosshair"
          onPointerDown={start}
          onPointerMove={move}
          onPointerUp={stop}
          onPointerCancel={stop}
          onPointerLeave={stop}
        />
      </div>
      <button type="button" onClick={clear} className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 text-sm font-bold text-gray-700 transition hover:border-gray-300 hover:bg-gray-50">
        <Eraser className="h-4 w-4" />
        {clearLabel}
      </button>
    </div>
  );
}

function FileField({ label, file, onChange, optimizing, required, optimizingLabel, readyLabel }: { label: string; file: File | null; onChange: (event: ChangeEvent<HTMLInputElement>) => void; optimizing: boolean; required?: boolean; optimizingLabel: string; readyLabel: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-bold text-gray-800">{label}</span>
      <input
        type="file"
        accept={insuranceCardAccept}
        onChange={onChange}
        required={required}
        className="block w-full cursor-pointer rounded-2xl border border-gray-200 bg-white px-3 py-3 text-sm text-gray-700 file:mr-3 file:rounded-xl file:border-0 file:bg-[var(--color-brand-purple-light)] file:px-3 file:py-2 file:text-sm file:font-bold file:text-[var(--color-brand-purple)]"
      />
      {optimizing && <span className="mt-2 block text-xs font-semibold text-[var(--color-brand-purple)]">{optimizingLabel}</span>}
      {file && !optimizing && <span className="mt-2 block break-all text-xs font-semibold text-emerald-700">{readyLabel.replace("{{name}}", file.name)}</span>}
    </label>
  );
}

function RadioGroup({
  name,
  options,
  value,
  onChange,
  required,
}: {
  name: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}) {
  return (
    <div className="grid gap-3">
      {options.map((option) => (
        <label key={option} className="flex min-h-12 items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3">
          <input
            type="radio"
            name={name}
            value={option}
            checked={value === option}
            onChange={() => onChange(option)}
            required={required}
            className="h-4 w-4 text-[var(--color-brand-purple)] focus:ring-[var(--color-brand-purple)]"
          />
          <span className="text-sm font-semibold leading-5 text-gray-800">{option}</span>
        </label>
      ))}
    </div>
  );
}

function CheckboxGroup({
  options,
  values,
  onChange,
}: {
  options: string[];
  values: string[];
  onChange: (value: string) => void;
}) {
  return (
    <div className="grid gap-3">
      {options.map((option) => (
        <label key={option} className="flex min-h-12 items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3">
          <input
            type="checkbox"
            value={option}
            checked={values.includes(option)}
            onChange={() => onChange(option)}
            className="h-4 w-4 rounded text-[var(--color-brand-purple)] focus:ring-[var(--color-brand-purple)]"
          />
          <span className="text-sm font-semibold leading-5 text-gray-800">{option}</span>
        </label>
      ))}
    </div>
  );
}
