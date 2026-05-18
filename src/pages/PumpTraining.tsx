import { Activity, Beaker, Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function PumpTraining() {
  const pumps = [
    { name: "Omnipod 5", desc: "Tubeless automated insulin delivery system that integrates with Dexcom." },
    { name: "Twiist", desc: "Automated delivery utilizing the FDA-cleared Tidepool Loop algorithm." },
    { name: "iLet Bionic Pancreas", desc: "Requires only your weight to start. Automates 100% of your insulin doses." },
    { name: "Tandem t:slim X2 / Mobi", desc: "Advanced Control-IQ technology predicting and preventing highs and lows." },
    { name: "Medtronic MiniMed", desc: "SmartGuard technology that auto-adjusts background insulin." },
    { name: "CeQur Simplicity", desc: "Wearable, 3-day patch providing mealtime insulin with a simple click." },
  ];

  return (
    <div className="bg-white">
      <div className="bg-[var(--color-brand-pink-light)]/40 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Activity className="w-16 h-16 text-[var(--color-brand-pink)] mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Insulin Pump Training
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transitioning to an insulin pump can be overwhelming. Our certified specialists 
            provide comprehensive training on all major pump brands so you can manage your 
            glucose with confidence.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {pumps.map((pump, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 bg-[var(--color-brand-pink-light)] rounded-xl flex items-center justify-center mb-6 text-[var(--color-brand-pink)]">
                <Beaker className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-3">{pump.name}</h3>
              <p className="text-gray-600">{pump.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 rounded-3xl p-8 md:p-16 flex flex-col md:flex-row gap-12 items-center">
           <div className="flex-1">
             <h2 className="text-3xl font-bold mb-6">What to Expect During Training</h2>
             <ul className="space-y-4 mb-8">
               <li className="flex items-start">
                 <Check className="w-6 h-6 text-green-500 mr-3 shrink-0" />
                 <span className="text-lg text-gray-700">Understanding your pump components and navigation.</span>
               </li>
               <li className="flex items-start">
                 <Check className="w-6 h-6 text-green-500 mr-3 shrink-0" />
                 <span className="text-lg text-gray-700">Safe site rotation and infusion set insertion.</span>
               </li>
               <li className="flex items-start">
                 <Check className="w-6 h-6 text-green-500 mr-3 shrink-0" />
                 <span className="text-lg text-gray-700">Programming basal rates, carb ratios, and correction factors based on your doctor's orders.</span>
               </li>
               <li className="flex items-start">
                 <Check className="w-6 h-6 text-green-500 mr-3 shrink-0" />
                 <span className="text-lg text-gray-700">Troubleshooting alarms and resolving issues.</span>
               </li>
             </ul>
           </div>
           <div className="flex-1 w-full bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
              <h3 className="text-2xl font-bold mb-4">Need Training?</h3>
              <p className="text-gray-600 mb-8">Pump training is often covered by insurance with a physician referral.</p>
              <Link to="/contact" className="flex items-center justify-center gap-2 bg-[var(--color-brand-pink)] text-white px-8 py-4 rounded-xl font-bold hover:bg-[var(--color-brand-pink)]/90 transition-all w-full">
                Schedule Training <ArrowRight className="w-5 h-5" />
              </Link>
           </div>
        </div>
      </div>
    </div>
  );
}
