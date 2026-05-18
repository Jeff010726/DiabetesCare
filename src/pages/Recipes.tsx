import { Link } from "react-router-dom";
import { ArrowRight, Clock3, HeartPulse, Utensils, Users } from "lucide-react";
import { useTranslation } from "react-i18next";
import { assetPath, recipes } from "../lib/recipes";

function carbsFromNutrition(nutrition: string[], fallback: string) {
  const match = nutrition.find((item) => item.toLowerCase().includes("carbohydrate"));
  return match?.replace("carbohydrates", "carbs") ?? fallback;
}

export default function Recipes() {
  const { t } = useTranslation("servicePages");

  return (
    <div className="bg-white">
      <section className="bg-[var(--color-brand-purple-light)]/40 border-b border-[var(--color-brand-purple)]/10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-[var(--color-brand-purple)] font-semibold text-sm mb-6 border border-[var(--color-brand-purple)]/15 shadow-sm">
              <Utensils className="w-4 h-4 text-[var(--color-brand-pink)]" />
              {t("recipes.badge")}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5">{t("recipes.title")}</h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              {t("recipes.subtitle")}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recipes.map((recipe) => (
              <Link
                key={recipe.slug}
                to={`/recipes/${recipe.slug}`}
                className="group bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col"
              >
                <div className="relative h-56 bg-gray-100 overflow-hidden">
                  <img
                    src={assetPath(recipe.image)}
                    alt={recipe.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute left-4 top-4 bg-white/92 backdrop-blur-md text-[var(--color-brand-purple)] px-3 py-1 rounded-full text-sm font-bold shadow-sm">
                    {recipe.category}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {recipe.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-50 text-gray-600 border border-gray-100">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[var(--color-brand-purple)] transition-colors">
                    {recipe.title}
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-5 flex-1">{recipe.excerpt}</p>
                  <div className="grid grid-cols-3 gap-3 text-sm text-gray-500 mb-5">
                    <span className="flex items-center gap-1.5">
                      <Clock3 className="w-4 h-4 text-[var(--color-brand-pink)]" />
                      {recipe.prepTime}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Utensils className="w-4 h-4 text-[var(--color-brand-purple)]" />
                      {recipe.cookTime}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-yellow-500" />
                      {recipe.servings}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <HeartPulse className="w-4 h-4 text-green-500" />
                      {carbsFromNutrition(recipe.nutrition, t("recipes.carbFallback"))}
                    </span>
                    <ArrowRight className="w-5 h-5 text-[var(--color-brand-purple)] group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
