import { Link } from "react-router-dom";
import { Menu, X, Activity, Cable, ChevronDown, ArrowRight, BookOpen, Stethoscope, Utensils, UserRound, Pill, LogOut, CalendarDays } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { apiRequest } from "../../lib/api";
import { memberAuthChangedEvent, memberAuthKey, memberInitials, notifyMemberAuthChanged, type MemberUser } from "../../lib/memberAuth";
import { assetPath, type Recipe } from "../../lib/recipes";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const { t } = useTranslation();
  const { t: tRecipes } = useTranslation("recipes");
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [member, setMember] = useState<MemberUser | null>(null);
  const [memberMenuOpen, setMemberMenuOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const localizedRecipes = tRecipes("items", { returnObjects: true }) as Recipe[];
  const featuredRecipes = localizedRecipes.slice(0, 4);
  const services = [
    {
      name: t("services.classes.name"),
      path: "/classes",
      desc: t("services.classes.desc"),
      icon: BookOpen,
      tone: "text-[var(--color-brand-purple)] bg-[var(--color-brand-purple-light)]"
    },
    {
      name: t("services.pump.name"),
      path: "/pump-training",
      desc: t("services.pump.desc"),
      icon: Cable,
      tone: "text-[var(--color-brand-pink)] bg-[var(--color-brand-pink-light)]"
    },
    {
      name: t("services.cgm.name"),
      path: "/cgm",
      desc: t("services.cgm.desc"),
      icon: Activity,
      tone: "text-yellow-600 bg-yellow-50"
    },
    {
      name: t("services.glp1.name"),
      path: "/glp1-training",
      desc: t("services.glp1.desc"),
      icon: Pill,
      tone: "text-green-600 bg-green-50"
    },
    {
      name: t("services.providers.name"),
      path: "/providers",
      desc: t("services.providers.desc"),
      icon: Stethoscope,
      tone: "text-green-600 bg-green-50"
    }
  ];

  const navLinks = [
    { name: t("nav.home"), path: "/" },
    { name: t("nav.services"), dropdown: services, type: "services" },
    { name: t("nav.coverage"), path: "/coverage" },
    { name: t("nav.recipes"), dropdown: featuredRecipes, type: "recipes" },
    { name: t("nav.contact"), path: "/contact" },
  ];

  useEffect(() => {
    let active = true;
    const loadMember = () => {
      apiRequest<{ user: MemberUser | null }>("/api/auth/me")
        .then((data) => {
          if (!active) return;
          setMember(data.user);
          if (data.user) window.localStorage.setItem(memberAuthKey, "true");
          else window.localStorage.removeItem(memberAuthKey);
        })
        .catch(() => {
          if (!active) return;
          setMember(null);
          window.localStorage.removeItem(memberAuthKey);
        });
    };

    loadMember();
    window.addEventListener(memberAuthChangedEvent, loadMember);
    return () => {
      active = false;
      window.removeEventListener(memberAuthChangedEvent, loadMember);
    };
  }, []);

  const signOut = async () => {
    await apiRequest<{ ok: boolean }>("/api/auth/logout", { method: "POST" }).catch(() => undefined);
    window.localStorage.removeItem(memberAuthKey);
    setMember(null);
    setMemberMenuOpen(false);
    notifyMemberAuthChanged();
  };

  const avatar = member ? memberInitials(member) : "";

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center gap-2">
              <span className="w-10 h-10 flex items-center justify-center">
                <img
                  src={`${import.meta.env.BASE_URL}logo.png`}
                  alt={t("brand.logoAlt")}
                  className="w-9 h-9 object-contain"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />
              </span>
              <span className="font-heading whitespace-nowrap font-bold text-xl lg:text-2xl text-[var(--color-brand-purple)] tracking-tight">
                {t("brand.name")}
              </span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-8 flex items-center gap-4 xl:gap-6">
              {navLinks.map((link) => (
                <div key={link.name} className="relative group">
                  {link.dropdown ? (
                    <button className="flex items-center text-gray-600 hover:text-[var(--color-brand-purple)] px-3 py-2 rounded-md text-sm font-medium transition-colors">
                      {link.name}
                      <ChevronDown className="ml-1 w-4 h-4" />
                    </button>
                  ) : (
                    <Link
                      to={link.path!}
                      className="text-gray-600 hover:text-[var(--color-brand-purple)] px-2 py-2 rounded-md text-sm font-medium transition-colors xl:px-3"
                    >
                      {link.name}
                    </Link>
                  )}
                  
                  {link.dropdown && (
                    <div className={`absolute mt-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pt-3 ${link.type === "recipes" ? "right-0 w-[min(760px,calc(100vw-2rem))]" : "left-0 w-[min(560px,calc(100vw-2rem))]"}`}>
                      {link.type === "recipes" ? (
                        <div className="bg-white rounded-2xl shadow-[0_24px_70px_-28px_rgba(31,41,55,0.38)] border border-gray-100 overflow-hidden">
                          <div className="p-5 bg-[var(--color-brand-purple-light)]/35 border-b border-[var(--color-brand-purple)]/10 flex items-center justify-between gap-4">
                            <div>
                              <p className="text-sm font-semibold text-[var(--color-brand-purple)]">{t("nav.healthyRecipes")}</p>
                              <p className="text-sm text-gray-600">{t("nav.recipesDescription")}</p>
                            </div>
                            <Link
                              to="/recipes"
                              className="inline-flex items-center gap-2 text-sm font-bold text-[var(--color-brand-purple)] hover:underline underline-offset-4 whitespace-nowrap"
                            >
                              {t("nav.viewAll")} <ArrowRight className="w-4 h-4" />
                            </Link>
                          </div>
                          <div className="grid grid-cols-2 gap-4 p-5">
                            {featuredRecipes.map((recipe) => (
                              <Link
                                key={recipe.slug}
                                to={`/recipes/${recipe.slug}`}
                                className="group/item grid grid-cols-[92px_1fr] gap-3 rounded-xl p-2 hover:bg-gray-50 transition-colors"
                              >
                                <img
                                  src={assetPath(recipe.image)}
                                  alt={recipe.title}
                                  className="w-[92px] h-[72px] rounded-lg object-cover bg-gray-100"
                                />
                                <div className="min-w-0">
                                  <p className="text-xs font-semibold text-[var(--color-brand-pink)] mb-1">{recipe.category}</p>
                                  <p className="text-sm font-bold text-gray-900 leading-snug group-hover/item:text-[var(--color-brand-purple)] transition-colors line-clamp-2">
                                    {recipe.title}
                                  </p>
                                  <p className="text-xs text-gray-500 mt-1">{recipe.prepTime} {t("nav.prepSuffix")}</p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="bg-white rounded-2xl shadow-[0_24px_70px_-28px_rgba(31,41,55,0.38)] border border-gray-100 p-3 overflow-hidden">
                          <div className="grid grid-cols-2 gap-2">
                            {services.map((service) => {
                              const Icon = service.icon;
                              return (
                                <Link
                                  key={service.path}
                                  to={service.path}
                                  className="group/item rounded-xl p-4 hover:bg-gray-50 transition-colors"
                                >
                                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${service.tone}`}>
                                    <Icon className="w-5 h-5" />
                                  </div>
                                  <p className="text-sm font-bold text-gray-900 group-hover/item:text-[var(--color-brand-purple)] transition-colors">
                                    {service.name}
                                  </p>
                                  <p className="text-xs text-gray-500 leading-relaxed mt-1">{service.desc}</p>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
              <LanguageSwitcher />
              <Link
                to="/booking"
                className="inline-flex h-11 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-[var(--color-brand-pink)] px-5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[var(--color-brand-pink)]/90"
              >
                <CalendarDays className="w-4 h-4" />
                Book
              </Link>
              {member ? (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setMemberMenuOpen((open) => !open)}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-300 bg-white text-sm font-bold text-gray-900 shadow-sm transition-colors hover:border-[var(--color-brand-purple)] hover:text-[var(--color-brand-purple)]"
                    aria-label={t("memberNav.menu")}
                  >
                    {avatar}
                  </button>
                  {memberMenuOpen && (
                    <div className="absolute right-0 z-50 mt-3 w-64 rounded-xl border border-gray-100 bg-white p-3 shadow-[0_24px_70px_-28px_rgba(31,41,55,0.38)]">
                      <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gray-300 text-sm font-bold text-gray-900">
                          {avatar}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-bold text-gray-900">
                            {[member.firstName, member.lastName].filter(Boolean).join(" ") || member.email}
                          </p>
                          <p className="truncate text-xs text-gray-500">{member.email}</p>
                        </div>
                      </div>
                      <Link
                        to="/member"
                        onClick={() => setMemberMenuOpen(false)}
                        className="mt-2 block rounded-lg px-3 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:text-[var(--color-brand-purple)]"
                      >
                        {t("memberNav.account")}
                      </Link>
                      <button
                        type="button"
                        onClick={signOut}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:text-red-600"
                      >
                        <LogOut className="h-4 w-4" />
                        {t("memberNav.signOut")}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/member"
                  className="inline-flex h-11 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-[var(--color-brand-purple)] px-4 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[var(--color-brand-purple)]/90"
                >
                  <UserRound className="w-4 h-4" />
                  {t("nav.member")}
                </Link>
              )}
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggle}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-[var(--color-brand-purple)] hover:bg-gray-100 focus:outline-none"
            >
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg overflow-y-auto max-h-[calc(100vh-80px)]">
            <div className="px-3 py-2">
              <LanguageSwitcher />
            </div>
            <Link
              to="/booking"
              onClick={toggle}
              className="mx-3 mb-2 flex items-center justify-center gap-2 bg-[var(--color-brand-pink)] text-white px-4 py-3 rounded-xl text-sm font-bold hover:bg-[var(--color-brand-pink)]/90 transition-colors"
            >
              <CalendarDays className="w-4 h-4" />
              Free consultation
            </Link>
            {member ? (
              <div className="mx-3 mb-2 rounded-xl border border-gray-100 bg-gray-50 p-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gray-300 bg-white text-sm font-bold text-gray-900">
                    {avatar}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-gray-900">
                      {[member.firstName, member.lastName].filter(Boolean).join(" ") || member.email}
                    </p>
                    <p className="truncate text-xs text-gray-500">{member.email}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    signOut();
                    toggle();
                  }}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-bold text-gray-600"
                >
                  <LogOut className="h-4 w-4" />
                  {t("memberNav.signOut")}
                </button>
              </div>
            ) : (
              <Link
                to="/member"
                onClick={toggle}
                className="mx-3 mb-2 flex items-center justify-center gap-2 bg-[var(--color-brand-purple)] text-white px-4 py-3 rounded-xl text-sm font-bold hover:bg-[var(--color-brand-purple)]/90 transition-colors"
              >
                <UserRound className="w-4 h-4" />
                {t("nav.member")}
              </Link>
            )}
            {navLinks.map((link) => (
              <div key={link.name}>
                {link.dropdown ? (
                  <>
                    <button
                      onClick={() => setOpenDropdown(openDropdown === link.name ? null : link.name)}
                      className="w-full flex items-center justify-between text-gray-600 hover:text-[var(--color-brand-purple)] hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium"
                    >
                      {link.name}
                      <ChevronDown className={`w-5 h-5 transition-transform ${openDropdown === link.name ? "rotate-180" : ""}`} />
                    </button>
                    {openDropdown === link.name && (
                      <div className="pl-6 space-y-1 mt-1">
                        {link.dropdown.map((subLink, idx) => (
                          <Link
                            key={idx}
                            to={link.type === "recipes" ? `/recipes/${subLink.slug}` : subLink.path}
                            onClick={toggle}
                            className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-gray-600 hover:text-[var(--color-brand-purple)] hover:bg-[var(--color-brand-purple-light)]"
                          >
                            {link.type === "recipes" ? (
                              <>
                                <img src={assetPath(subLink.image)} alt={subLink.title} className="w-12 h-10 rounded-lg object-cover bg-gray-100" />
                                <span className="font-medium">{subLink.title}</span>
                              </>
                            ) : (
                              <span className="font-medium">{subLink.name}</span>
                            )}
                          </Link>
                        ))}
                        {link.type === "recipes" && (
                          <Link
                            to="/recipes"
                            onClick={toggle}
                            className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-bold text-[var(--color-brand-purple)] hover:bg-[var(--color-brand-purple-light)]"
                          >
                            <Utensils className="w-4 h-4" />
                            {t("nav.viewAllRecipes")}
                          </Link>
                        )}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={link.path!}
                    onClick={toggle}
                    className="text-gray-600 hover:text-[var(--color-brand-purple)] hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium"
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
