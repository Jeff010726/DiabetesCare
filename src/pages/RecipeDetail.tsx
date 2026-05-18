import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Clock3, HeartPulse, Printer, ShieldCheck, Utensils, Users } from "lucide-react";
import { assetPath, recipes } from "../lib/recipes";

export default function RecipeDetail() {
  const { slug } = useParams();
  const recipe = recipes.find((item) => item.slug === slug);

  if (!recipe) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Recipe not found</h1>
        <Link to="/recipes" className="text-[var(--color-brand-purple)] font-bold underline underline-offset-4">
          Back to recipes
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <section className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Link to="/recipes" className="inline-flex items-center gap-2 text-[var(--color-brand-purple)] font-bold mb-8 hover:underline underline-offset-4">
            <ArrowLeft className="w-4 h-4" />
            Back to recipes
          </Link>

          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-center">
            <div className="overflow-hidden rounded-3xl bg-white shadow-[0_20px_60px_-32px_rgba(31,41,55,0.45)] border border-white">
              <img src={assetPath(recipe.image)} alt={recipe.title} className="w-full aspect-[4/3] object-cover" />
            </div>
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-[var(--color-brand-purple)] font-semibold text-sm mb-5 border border-[var(--color-brand-purple)]/15 shadow-sm">
                <Utensils className="w-4 h-4 text-[var(--color-brand-pink)]" />
                {recipe.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5 leading-tight">{recipe.title}</h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">{recipe.excerpt}</p>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                  <Clock3 className="w-5 h-5 text-[var(--color-brand-pink)] mb-2" />
                  <p className="text-sm text-gray-500">Prep</p>
                  <p className="font-bold text-gray-900">{recipe.prepTime}</p>
                </div>
                <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                  <Utensils className="w-5 h-5 text-[var(--color-brand-purple)] mb-2" />
                  <p className="text-sm text-gray-500">Cook</p>
                  <p className="font-bold text-gray-900">{recipe.cookTime}</p>
                </div>
                <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                  <Users className="w-5 h-5 text-yellow-500 mb-2" />
                  <p className="text-sm text-gray-500">Servings</p>
                  <p className="font-bold text-gray-900">{recipe.servings}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
            <div className="space-y-10">
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Ingredients</h2>
                <ul className="space-y-3">
                  {recipe.ingredients.map((ingredient) => (
                    <li key={ingredient} className="flex gap-3 text-gray-700 leading-relaxed">
                      <span className="mt-2 w-2 h-2 rounded-full bg-[var(--color-brand-purple)] shrink-0" />
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Instructions</h2>
                <ol className="space-y-5">
                  {recipe.instructions.map((step, index) => (
                    <li key={step} className="flex gap-4 text-gray-700 leading-relaxed">
                      <span className="w-8 h-8 rounded-full bg-[var(--color-brand-purple)] text-white flex items-center justify-center font-bold shrink-0">
                        {index + 1}
                      </span>
                      <span className="pt-1">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <aside className="space-y-6 lg:sticky lg:top-28">
              <div className="bg-[var(--color-brand-purple-light)]/45 rounded-3xl border border-[var(--color-brand-purple)]/10 p-6">
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-white text-[var(--color-brand-purple)] flex items-center justify-center shrink-0 shadow-sm">
                    <HeartPulse className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Diabetes Note</h2>
                    <p className="text-gray-600 mt-2 leading-relaxed">{recipe.diabetesNote}</p>
                  </div>
                </div>
                <div className="bg-white/80 rounded-2xl p-4 border border-white">
                  <h3 className="font-bold text-gray-900 mb-2">Carb Awareness</h3>
                  <p className="text-gray-600 leading-relaxed">{recipe.carbAwareness}</p>
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Nutrition Highlights</h2>
                <ul className="space-y-3">
                  {recipe.nutrition.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-gray-700">
                      <ShieldCheck className="w-4 h-4 text-green-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                  <h2 className="text-lg font-bold text-gray-900">Original Recipe Card</h2>
                  <Printer className="w-5 h-5 text-[var(--color-brand-purple)]" />
                </div>
                <img src={assetPath(recipe.originalCard)} alt={`${recipe.title} recipe card`} className="w-full h-auto" />
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
