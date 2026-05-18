import { Link } from "react-router-dom";
import { Menu, X, Activity, ChevronDown, ArrowRight, BookOpen, MonitorSmartphone, Stethoscope, Utensils } from "lucide-react";
import { useState } from "react";
import { assetPath, recipes } from "../../lib/recipes";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggle = () => setIsOpen(!isOpen);
  const featuredRecipes = recipes.slice(0, 4);
  const services = [
    {
      name: "Diabetes Classes",
      path: "/classes",
      desc: "Structured education for food, medication, exercise, and daily routines.",
      icon: BookOpen,
      tone: "text-[var(--color-brand-purple)] bg-[var(--color-brand-purple-light)]"
    },
    {
      name: "Insulin Pump Training",
      path: "/pump-training",
      desc: "Hands-on setup and confidence building for modern pump systems.",
      icon: Activity,
      tone: "text-[var(--color-brand-pink)] bg-[var(--color-brand-pink-light)]"
    },
    {
      name: "CGM Training & Reports",
      path: "/cgm",
      desc: "Sensor setup, app support, and glucose pattern interpretation.",
      icon: MonitorSmartphone,
      tone: "text-yellow-600 bg-yellow-50"
    },
    {
      name: "For Providers",
      path: "/providers",
      desc: "Referral resources and diabetes education support for clinics.",
      icon: Stethoscope,
      tone: "text-green-600 bg-green-50"
    }
  ];

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", dropdown: services, type: "services" },
    { name: "Coverage", path: "/coverage" },
    { name: "Recipes", dropdown: featuredRecipes, type: "recipes" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center gap-2">
              <span className="w-10 h-10 rounded-xl bg-[var(--color-brand-purple-light)] border border-[var(--color-brand-purple)]/10 flex items-center justify-center overflow-hidden">
                <img
                  src={`${import.meta.env.BASE_URL}logo.png`}
                  alt="XT Diabetes Care logo"
                  className="w-8 h-8 object-contain"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />
              </span>
              <span className="font-heading font-bold text-xl lg:text-2xl text-[var(--color-brand-purple)] tracking-tight">
                XT Diabetes Care
              </span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-6">
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
                      className="text-gray-600 hover:text-[var(--color-brand-purple)] px-3 py-2 rounded-md text-sm font-medium transition-colors"
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
                              <p className="text-sm font-semibold text-[var(--color-brand-purple)]">Healthy Recipes</p>
                              <p className="text-sm text-gray-600">Glucose-aware meals with practical portions and clear steps.</p>
                            </div>
                            <Link
                              to="/recipes"
                              className="inline-flex items-center gap-2 text-sm font-bold text-[var(--color-brand-purple)] hover:underline underline-offset-4 whitespace-nowrap"
                            >
                              View all <ArrowRight className="w-4 h-4" />
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
                                  <p className="text-xs text-gray-500 mt-1">{recipe.prepTime} prep</p>
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
                            View All Recipes
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
