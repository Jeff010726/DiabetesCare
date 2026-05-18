import { Utensils } from "lucide-react";

export default function Recipes() {
  const recipes = [
    { title: "Low-Carb Zucchini Noodles", time: "15 min", carbs: "8g" },
    { title: "Mediterranean Baked Salmon", time: "25 min", carbs: "4g" },
    { title: "Berry Chia Seed Pudding", time: "5 min", carbs: "12g" },
    { title: "Cauliflower Fried Rice", time: "20 min", carbs: "10g" },
    { title: "Avo-Chicken Salad Wraps", time: "10 min", carbs: "6g" },
    { title: "Roasted Brussels Sprouts", time: "30 min", carbs: "9g" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-16">
        <Utensils className="w-12 h-12 text-[var(--color-brand-pink)] mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Healthy Recipes</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
           Eating well with diabetes doesn't mean eating boring. Try these quick, easy, and blood-sugar-friendly recipes.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {recipes.map((recipe, i) => (
          <div key={i} className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
            <div className="h-48 bg-gray-100 w-full relative">
               <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  <Utensils className="w-8 h-8 opacity-20" />
               </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--color-brand-purple)] transition-colors">{recipe.title}</h3>
              <div className="flex gap-4 text-sm text-gray-500">
                 <span>⏱ {recipe.time}</span>
                 <span>Net Carbs: <strong>{recipe.carbs}</strong></span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
