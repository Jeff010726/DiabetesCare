import { ArrowRight, CheckCircle2, Gift, LockKeyhole, Mail, Phone, Sparkles, UserRound } from "lucide-react";
import { ChangeEvent, FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { getCountries, getCountryCallingCode, type CountryCode } from "libphonenumber-js/min";
import { apiRequest } from "../lib/api";
import { trackEvent } from "../lib/analytics";
import { memberAuthKey, notifyMemberAuthChanged, type MemberUser } from "../lib/memberAuth";

type MemberMode = "register" | "login";

const regionNameFormatter = new Intl.DisplayNames(["en"], { type: "region" });

function countryFlag(country: CountryCode) {
  return country
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
}

const phoneCountries = getCountries()
  .map((country) => ({
    country,
    callingCode: `+${getCountryCallingCode(country)}`,
    name: regionNameFormatter.of(country) || country,
    flag: countryFlag(country),
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

export default function Member() {
  const { t } = useTranslation("servicePages");
  const { i18n } = useTranslation();
  const [mode, setMode] = useState<MemberMode>("register");
  const [form, setForm] = useState({ email: "", phoneCountry: "US", phone: "", firstName: "", lastName: "", password: "" });
  const [countryPickerOpen, setCountryPickerOpen] = useState(false);
  const countryPickerRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState<MemberUser | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const benefits = t("member.benefits", { returnObjects: true }) as string[];
  const perks = t("member.perks", { returnObjects: true }) as Array<{ title: string; desc: string }>;
  const isRegister = mode === "register";
  const selectedPhoneCountry = useMemo(
    () => phoneCountries.find((option) => option.country === form.phoneCountry) || phoneCountries.find((option) => option.country === "US"),
    [form.phoneCountry],
  );

  useEffect(() => {
    apiRequest<{ user: MemberUser | null }>("/api/auth/me")
      .then((data) => {
        setUser(data.user);
        if (data.user) window.localStorage.setItem(memberAuthKey, "true");
      })
      .catch(() => undefined);
  }, []);

  useEffect(() => {
    const closePicker = (event: MouseEvent) => {
      if (!countryPickerRef.current?.contains(event.target as Node)) setCountryPickerOpen(false);
    };
    document.addEventListener("mousedown", closePicker);
    return () => document.removeEventListener("mousedown", closePicker);
  }, []);

  const updateField = (field: keyof typeof form) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setError("");

    const path = isRegister ? "/api/auth/register" : "/api/auth/login";
    const phone = form.phone.trim() && selectedPhoneCountry ? `${selectedPhoneCountry.callingCode} ${form.phone.trim()}` : "";
    const body = isRegister
      ? {
          email: form.email,
          phone,
          firstName: form.firstName,
          lastName: form.lastName,
          password: form.password,
          preferredLanguage: i18n.language,
          marketingOptIn: true,
        }
      : { email: form.email, password: form.password };

    try {
      const data = await apiRequest<{ user: MemberUser }>(path, { method: "POST", body });
      setUser(data.user);
      window.localStorage.setItem(memberAuthKey, "true");
      notifyMemberAuthChanged();
      trackEvent({ eventType: isRegister ? "member_register" : "member_login", eventName: isRegister ? "member_register_form" : "member_login_form" });
      setStatus("success");
      setForm((current) => ({ ...current, password: "" }));
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to complete this request.");
      setStatus("error");
    }
  };

  const signOut = async () => {
    await apiRequest<{ ok: boolean }>("/api/auth/logout", { method: "POST" }).catch(() => undefined);
    window.localStorage.removeItem(memberAuthKey);
    setUser(null);
    setStatus("idle");
    notifyMemberAuthChanged();
  };

  return (
    <div className="bg-white">
      <section className="bg-[var(--color-brand-purple-light)]/35 border-b border-[var(--color-brand-purple)]/10 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-10 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-[var(--color-brand-purple)] font-semibold text-sm mb-6 border border-[var(--color-brand-purple)]/15 shadow-sm">
                <Sparkles className="w-4 h-4 text-[var(--color-brand-pink)]" />
                {t("member.badge")}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-5">{t("member.title")}</h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">{t("member.subtitle")}</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-start gap-3 rounded-2xl bg-white/80 border border-white p-4">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-sm font-semibold text-gray-700 leading-relaxed">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_24px_70px_-32px_rgba(31,41,55,0.35)] p-6 md:p-8">
              <div className="grid grid-cols-2 gap-2 rounded-2xl bg-gray-50 p-1 mb-6">
                <button
                  type="button"
                  onClick={() => setMode("register")}
                  className={`rounded-xl px-4 py-3 text-sm font-bold transition-colors ${
                    isRegister ? "bg-white text-[var(--color-brand-purple)] shadow-sm" : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {t("member.tabs.register")}
                </button>
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className={`rounded-xl px-4 py-3 text-sm font-bold transition-colors ${
                    !isRegister ? "bg-white text-[var(--color-brand-purple)] shadow-sm" : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {t("member.tabs.login")}
                </button>
              </div>

              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {isRegister ? t("member.registerTitle") : t("member.loginTitle")}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {isRegister ? t("member.registerIntro") : t("member.loginIntro")}
                </p>
              </div>

              {user && (
                <div className="mb-6 rounded-2xl border border-green-100 bg-green-50 p-4">
                  <p className="text-sm font-bold text-green-800">Signed in as {user.email}</p>
                  <button type="button" onClick={signOut} className="mt-2 text-sm font-bold text-green-700 underline underline-offset-4">
                    Sign out
                  </button>
                </div>
              )}

              <form className="space-y-4" onSubmit={submit}>
                <label className="block">
                  <span className="block text-sm font-semibold text-gray-700 mb-1">{t("member.fields.email")}</span>
                  <span className="relative block">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      value={form.email}
                      onChange={updateField("email")}
                      required
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-purple)]"
                      placeholder={t("member.placeholders.email")}
                    />
                  </span>
                </label>

                {isRegister && (
                  <>
                    <label className="block">
                      <span className="block text-sm font-semibold text-gray-700 mb-1">{t("member.fields.phone")}</span>
                      <div className="grid gap-3 sm:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
                        <div ref={countryPickerRef} className="relative">
                          <button
                            type="button"
                            onClick={() => setCountryPickerOpen((open) => !open)}
                            className="flex w-full min-w-0 items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-3 text-left text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-purple)]"
                            aria-haspopup="listbox"
                            aria-expanded={countryPickerOpen}
                          >
                            {selectedPhoneCountry && (
                              <>
                                <span className="shrink-0 text-lg leading-none" aria-hidden="true">{selectedPhoneCountry.flag}</span>
                                <span className="truncate">{selectedPhoneCountry.name}</span>
                                <span className="ml-auto shrink-0 text-gray-500">{selectedPhoneCountry.callingCode}</span>
                              </>
                            )}
                          </button>
                          {countryPickerOpen && (
                            <div
                              role="listbox"
                              className="absolute z-20 mt-2 max-h-72 w-full overflow-y-auto rounded-xl border border-gray-200 bg-white py-1 shadow-xl"
                            >
                              {phoneCountries.map((option) => (
                                <button
                                  key={option.country}
                                  type="button"
                                  role="option"
                                  aria-selected={option.country === form.phoneCountry}
                                  onClick={() => {
                                    setForm((current) => ({ ...current, phoneCountry: option.country }));
                                    setCountryPickerOpen(false);
                                  }}
                                  className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-[var(--color-brand-purple-light)]/45 ${
                                    option.country === form.phoneCountry ? "bg-[var(--color-brand-purple-light)]/60 font-semibold text-gray-900" : "text-gray-700"
                                  }`}
                                >
                                  <span className="shrink-0 text-lg leading-none" aria-hidden="true">{option.flag}</span>
                                  <span className="truncate">{option.name}</span>
                                  <span className="ml-auto shrink-0 text-gray-500">{option.callingCode}</span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                        <span className="relative block">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="tel"
                            value={form.phone}
                            onChange={updateField("phone")}
                            className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-purple)]"
                            placeholder={t("member.placeholders.phone")}
                          />
                        </span>
                      </div>
                    </label>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <label className="block">
                        <span className="block text-sm font-semibold text-gray-700 mb-1">{t("member.fields.firstName")}</span>
                        <span className="relative block">
                          <UserRound className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="text"
                            value={form.firstName}
                            onChange={updateField("firstName")}
                            required
                            className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-purple)]"
                            placeholder={t("member.placeholders.firstName")}
                          />
                        </span>
                      </label>
                      <label className="block">
                        <span className="block text-sm font-semibold text-gray-700 mb-1">{t("member.fields.lastName")}</span>
                        <input
                          type="text"
                          value={form.lastName}
                          onChange={updateField("lastName")}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-purple)]"
                          placeholder={t("member.placeholders.lastName")}
                        />
                      </label>
                    </div>
                  </>
                )}

                <label className="block">
                  <span className="block text-sm font-semibold text-gray-700 mb-1">{t("member.fields.password")}</span>
                  <span className="relative block">
                    <LockKeyhole className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="password"
                      value={form.password}
                      onChange={updateField("password")}
                      required
                      minLength={8}
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-purple)]"
                      placeholder={t("member.placeholders.password")}
                    />
                  </span>
                </label>

                {status === "success" && (
                  <p className="rounded-xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
                    {isRegister ? "Account created." : "Signed in."}
                  </p>
                )}
                {status === "error" && (
                  <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[var(--color-brand-purple)] text-white font-bold py-3 px-4 rounded-xl hover:bg-[var(--color-brand-purple)]/90 transition-colors disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status === "submitting" ? "Submitting..." : isRegister ? t("member.registerButton") : t("member.loginButton")}
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-xs text-gray-500 leading-relaxed">{t("member.previewNote")}</p>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {perks.map((perk) => (
              <div key={perk.title} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="w-11 h-11 rounded-xl bg-[var(--color-brand-pink-light)] text-[var(--color-brand-pink)] flex items-center justify-center mb-4">
                  <Gift className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{perk.title}</h3>
                <p className="text-gray-600 leading-relaxed">{perk.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
