import { Activity, Smartphone, LineChart, FileLineChart } from "lucide-react";
import { Link } from "react-router-dom";

export default function CGM() {
  return (
    <div className="bg-white">
      <div className="bg-yellow-50/50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <LineChart className="w-16 h-16 text-yellow-500 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            CGM Training & Report Analysis
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Unlock the power of your Continuous Glucose Monitor. We train you how to use it, 
            and help you and your doctor interpret the data to optimize your health.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-center">
            <h3 className="text-2xl font-black text-gray-900 mb-2">FreeStyle Libre</h3>
            <p className="text-sm font-medium text-[var(--color-brand-purple)] mb-4">Abbott</p>
            <p className="text-gray-600">
              Training on sensor placement, using your smartphone reader, and understanding trend arrows.
            </p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-center transform md:-translate-y-4">
            <h3 className="text-2xl font-black text-gray-900 mb-2">Dexcom G7/G6</h3>
            <p className="text-sm font-medium text-[var(--color-brand-purple)] mb-4">Dexcom</p>
            <p className="text-gray-600">
              Setup of alerts and alarms, sharing data with family or clinic, and application process.
            </p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-center">
            <h3 className="text-2xl font-black text-gray-900 mb-2">Stelo</h3>
            <p className="text-sm font-medium text-[var(--color-brand-purple)] mb-4">Dexcom OTC</p>
            <p className="text-gray-600">
              Guidance for type 2 diabetes patients on interpreting the new over-the-counter biosensor data.
            </p>
          </div>
        </div>

        <div className="bg-[var(--color-brand-purple-light)]/40 rounded-3xl p-8 md:p-16 flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 w-full order-2 md:order-1">
             <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-white flex flex-col items-center text-center">
                  <Smartphone className="w-8 h-8 text-[var(--color-brand-purple)] mb-3" />
                  <span className="font-semibold">App Setup</span>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-white flex flex-col items-center text-center mt-8">
                  <Activity className="w-8 h-8 text-[var(--color-brand-pink)] mb-3" />
                  <span className="font-semibold">Arrow Trends</span>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-white flex flex-col items-center text-center -mt-8">
                  <FileLineChart className="w-8 h-8 text-yellow-500 mb-3" />
                  <span className="font-semibold">AGP Reports</span>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-white flex flex-col items-center text-center">
                  <LineChart className="w-8 h-8 text-green-500 mb-3" />
                  <span className="font-semibold">Time in Range</span>
                </div>
             </div>
          </div>
          <div className="flex-1 order-1 md:order-2">
            <h2 className="text-3xl font-bold mb-6">Beyond Just Numbers</h2>
            <p className="text-lg text-gray-600 mb-6">
              A CGM provides hundreds of readings a day, but what do you do with them? 
            </p>
            <p className="text-lg text-gray-600 mb-8">
              We analyze your Ambulatory Glucose Profile (AGP) reports to identify patterns. 
              We teach you how different foods, stress, and exercise affect your unique body, 
              helping you maximize your <strong>Time In Range</strong> (TIR).
            </p>
            <Link to="/contact" className="inline-block bg-[var(--color-brand-purple)] text-white px-8 py-4 rounded-xl font-bold hover:bg-[var(--color-brand-purple)]/90 transition-colors shadow-sm">
              Schedule Analysis Session
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
