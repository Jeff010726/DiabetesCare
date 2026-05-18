import { FileText, Clock, Users, ArrowRight, ShieldCheck, Download } from "lucide-react";

export default function Providers() {
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-[var(--color-brand-purple-light)]/50 py-16 border-b border-[var(--color-brand-purple)]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-brand-purple)]/10 text-[var(--color-brand-purple)] font-medium text-sm mb-6">
            <ShieldCheck className="w-5 h-5" /> ADCES Accredited Diabetes Education Program
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Partnering with Physicians <br/> to Improve Patient Outcomes
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nutriall Wellness Center acts as an extension of your practice. We provide the 
            intensive, systemic diabetes self-management education your patients need, 
            completely covered by insurance.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Value Prop */}
        <div className="grid md:grid-cols-3 gap-12 mb-24">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-[var(--color-brand-purple)]/10 flex items-center justify-center mb-6 text-[var(--color-brand-purple)]">
              <Clock className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3">Save Clinic Time</h3>
            <p className="text-gray-600">
              We take the time-consuming burden of comprehensive diabetes education off your shoulders, freeing you to focus on diagnosis and medication management.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-[var(--color-brand-pink)]/10 flex items-center justify-center mb-6 text-[var(--color-brand-pink)]">
              <Users className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3">Structured Curriculum</h3>
            <p className="text-gray-600">
              Patients receive systematic education on medication usage, diet, physical activity, and psychosocial coping skills.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-yellow-50 flex items-center justify-center mb-6 text-yellow-600">
              <FileText className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3">We Keep You Informed</h3>
            <p className="text-gray-600">
              We act as your assistant, returning comprehensive reports to you and ensuring patients follow up with you regularly for medication adjustments.
            </p>
          </div>
        </div>

        {/* Action Section */}
        <div className="bg-gray-50 rounded-3xl p-8 md:p-12 border border-gray-100 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">How to Refer Your Patients</h2>
            <p className="text-gray-600 mb-6 text-lg">
              Medicare and private insurance cover our programs, but require a referral from the treating physician. 
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <ArrowRight className="w-5 h-5 text-[var(--color-brand-purple)] mr-3 mt-1 shrink-0" />
                <span className="text-gray-700">Patients newly diagnosed with diabetes.</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="w-5 h-5 text-[var(--color-brand-purple)] mr-3 mt-1 shrink-0" />
                <span className="text-gray-700">Patients who have never received systematic diabetes self-management training.</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="w-5 h-5 text-[var(--color-brand-purple)] mr-3 mt-1 shrink-0" />
                <span className="text-gray-700">Patients transitioning to Insulin Pumps or Continuous Glucose Monitors (CGM).</span>
              </li>
            </ul>
            
            <button className="flex items-center gap-2 bg-[var(--color-brand-purple)] text-white px-6 py-3 rounded-xl font-medium hover:bg-[var(--color-brand-purple)]/90 transition-colors w-full sm:w-auto justify-center shadow-sm">
              <Download className="w-5 h-5" /> Download Referral Form Template
            </button>
          </div>
          
          {/* Accred badge / image */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="w-32 h-32 rounded-full border-4 border-[var(--color-brand-purple-light)] bg-[var(--color-brand-purple)]/5 flex items-center justify-center mb-6">
              <ShieldCheck className="w-16 h-16 text-[var(--color-brand-purple)]" />
            </div>
            <h3 className="text-2xl font-bold mb-2">ADCES Accredited</h3>
            <p className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-widest">ID# 1001155</p>
            <p className="text-gray-600 text-sm">
              Having met all applicable standards and requirements of the Association of Diabetes Care & Education Specialists.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
