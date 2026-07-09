import { ChangeEvent, FormEvent, ReactNode, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, ClipboardList, ImageUp, ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";
import { apiRequest } from "../lib/api";
import { trackEvent } from "../lib/analytics";

const ageOptions = ["18-24", "25-34", "35-44", "45-54", "55-64", "65+"];
const genderOptions = ["Male", "Female", "Prefer not to answer", "Other"];
const raceOptions = [
  "American Indian or Alaska Native",
  "Asian or Asian American",
  "Black or African American",
  "Hispanic or Latino",
  "Middle Eastern or North African",
  "Native Hawaiian or other Pacific Islander",
  "White",
  "Another race",
];
const languageOptions = ["English", "Spanish", "Chinese (Mandarin/Cantonese)", "Korean", "Vietnamese", "Other"];
const educationOptions = [
  "Did not complete high school",
  "High school diploma/GED",
  "Some college coursework",
  "Bachelor's degree",
  "Graduate degree or higher",
];
const insuranceOptions = ["Yes", "No", "Unsure"];
const conditionOptions = [
  "Prediabetes",
  "Insulin Resistance",
  "Type 1 diabetes",
  "Type 2 diabetes",
  "High blood pressure",
  "High cholesterol",
  "Heart disease",
  "None of the above",
];
const monitoringOptions = ["Yes, daily", "Yes, weekly", "Occasionally", "No"];
const medicationOptions = [
  "Yes, I am taking oral medication",
  "Yes, I am using injectable insulin",
  "Yes, I am using GLP-1 receptor agonist (Semaglutide, Liraglutide, etc.)",
  "No",
];
const maxInsuranceCardBytes = 8 * 1024 * 1024;
const insuranceCardAccept = "image/jpeg,image/png,image/webp,image/heic,image/heif";

export default function ClassSignup() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [error, setError] = useState("");
  const [insuranceCards, setInsuranceCards] = useState({
    front: null as File | null,
    back: null as File | null,
  });
  const [form, setForm] = useState({
    ageRange: "",
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

  const updateInsuranceCard = (kind: "front" | "back") => (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setInsuranceCards((current) => ({ ...current, [kind]: file }));
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setError("");

    if (!form.agreementAccepted) {
      setStatus("error");
      setError("Please agree to the confidentiality and intellectual property agreement before submitting.");
      return;
    }
    if (form.raceEthnicity.length < 1 || form.diagnosedConditions.length < 1 || form.diabetesMedications.length < 1) {
      setStatus("error");
      setError("Please answer all required multiple-choice questions.");
      return;
    }
    if (!insuranceCards.front || !insuranceCards.back) {
      setStatus("error");
      setError("Please upload clear photos of both the front and back of your insurance card.");
      return;
    }
    const oversizedCard = [insuranceCards.front, insuranceCards.back].find((file) => file && file.size > maxInsuranceCardBytes);
    if (oversizedCard) {
      setStatus("error");
      setError("Each insurance card photo must be 8 MB or smaller.");
      return;
    }

    try {
      const formData = new FormData();
      formData.set("ageRange", form.ageRange);
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
      await apiRequest<{ ok: boolean; id: string }>("/api/class-signup", {
        method: "POST",
        body: formData,
      });
      trackEvent({ eventType: "class_signup", eventName: "dsmes_class_signup_form" });
      navigate("/sign-up-class-thank-you");
    } catch (submitError) {
      setStatus("error");
      setError(submitError instanceof Error ? submitError.message : "Unable to submit the class signup form.");
    }
  };

  return (
    <div className="bg-white">
      <section className="border-b border-gray-100 bg-[linear-gradient(135deg,#f8f3fb_0%,#f2fbf7_58%,#ffffff_100%)] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,0.75fr)] lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-brand-purple)]/15 bg-white px-4 py-2 text-sm font-bold text-[var(--color-brand-purple)] shadow-sm">
              <ClipboardList className="h-4 w-4 text-[var(--color-brand-pink)]" />
              DSME Class sign up
            </span>
            <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
              DSME Class sign up
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-700">
              Complete the enrollment questions and accept the confidentiality agreement so our team can review class participation.
            </p>
          </div>
          <div className="rounded-3xl border border-white bg-white/85 p-5 shadow-xl sm:p-6">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-1 h-6 w-6 shrink-0 text-green-600" />
              <div>
                <h2 className="text-lg font-bold text-gray-900">Confidentiality agreement required</h2>
                <p className="mt-2 text-sm leading-6 text-gray-600">
                  You can open the agreement details before submitting. The checkbox at the end records your acceptance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <form className="space-y-5" onSubmit={submit}>
          <Question title="1. What is your age?">
            <RadioGroup name="ageRange" options={ageOptions} value={form.ageRange} onChange={(value) => updateChoice("ageRange", value)} required />
          </Question>

          <Question title="2. What is your gender?">
            <RadioGroup name="gender" options={genderOptions} value={form.gender} onChange={(value) => updateChoice("gender", value)} required />
            {form.gender === "Other" && (
              <Field label="Other (please specify)" value={form.genderOther} onChange={updateText("genderOther")} className="mt-4" />
            )}
          </Question>

          <Question title="3. What is your race/ethnicity? (Select all that apply)">
            <CheckboxGroup options={raceOptions} values={form.raceEthnicity} onChange={(value) => toggleList("raceEthnicity", value)} />
          </Question>

          <Question title="4. What is the primary language you speak?">
            <RadioGroup
              name="primaryLanguage"
              options={languageOptions}
              value={form.primaryLanguage}
              onChange={(value) => updateChoice("primaryLanguage", value)}
              required
            />
            {form.primaryLanguage === "Other" && (
              <Field label="Other (please specify)" value={form.primaryLanguageOther} onChange={updateText("primaryLanguageOther")} className="mt-4" />
            )}
          </Question>

          <Question title="5. Which state do you reside in?">
            <Field label="State" value={form.stateResidence} onChange={updateText("stateResidence")} required />
          </Question>

          <Question title="6. What is the highest level of education you have completed?">
            <RadioGroup
              name="educationLevel"
              options={educationOptions}
              value={form.educationLevel}
              onChange={(value) => updateChoice("educationLevel", value)}
              required
            />
          </Question>

          <Question title="7. Do you currently have health insurance in the U.S.?">
            <RadioGroup
              name="hasUsHealthInsurance"
              options={insuranceOptions}
              value={form.hasUsHealthInsurance}
              onChange={(value) => updateChoice("hasUsHealthInsurance", value)}
              required
            />
          </Question>

          <Question title="8. Have you ever been told by a healthcare provider that you have any of the following conditions? (Select all that apply)">
            <CheckboxGroup options={conditionOptions} values={form.diagnosedConditions} onChange={(value) => toggleList("diagnosedConditions", value)} />
          </Question>

          <Question title="9. Do you currently monitor your blood sugar levels?">
            <RadioGroup
              name="bloodSugarMonitoring"
              options={monitoringOptions}
              value={form.bloodSugarMonitoring}
              onChange={(value) => updateChoice("bloodSugarMonitoring", value)}
              required
            />
          </Question>

          <Question title="10. Are you currently taking medication for diabetes?">
            <CheckboxGroup options={medicationOptions} values={form.diabetesMedications} onChange={(value) => toggleList("diabetesMedications", value)} />
          </Question>

          <section className="rounded-3xl border border-emerald-100 bg-emerald-50/45 p-5 shadow-sm sm:p-6">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-emerald-700 shadow-sm">
                <ImageUp className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Insurance card photos</h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Upload clear photos of the front and back of your card. They are stored privately and are only available to authorized staff.
                </p>
              </div>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <FileField label="Front of insurance card" file={insuranceCards.front} onChange={updateInsuranceCard("front")} required />
              <FileField label="Back of insurance card" file={insuranceCards.back} onChange={updateInsuranceCard("back")} required />
            </div>
            <p className="mt-4 text-xs leading-5 text-gray-500">JPG, PNG, WEBP, HEIC, or HEIF. Maximum 8 MB per photo.</p>
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
                I have read and agree to the{" "}
                <Link to="/class-agreement" className="font-bold text-[var(--color-brand-purple)] underline underline-offset-4">
                  DSMES Participant Confidentiality and Intellectual Property Agreement
                </Link>
                .
              </span>
            </label>
          </section>

          {status === "error" && <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p>}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[var(--color-brand-purple)] px-6 text-base font-bold text-white transition hover:bg-[var(--color-brand-purple)]/90 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {status === "submitting" ? "Submitting..." : "Submit class signup"}
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
};

function Field({ label, value, onChange, type = "text", required, className = "" }: FieldProps) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-sm font-bold text-gray-800">{label}</span>
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="h-[52px] w-full rounded-2xl border border-gray-200 bg-white px-4 text-base text-gray-900 outline-none transition focus:border-[var(--color-brand-purple)] focus:ring-4 focus:ring-[var(--color-brand-purple)]/10"
      />
    </label>
  );
}

function Question({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-lg font-bold leading-7 text-gray-900">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function FileField({ label, file, onChange, required }: { label: string; file: File | null; onChange: (event: ChangeEvent<HTMLInputElement>) => void; required?: boolean }) {
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
      {file && <span className="mt-2 block break-all text-xs font-semibold text-emerald-700">Selected: {file.name}</span>}
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
