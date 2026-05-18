import { ShieldCheck, FileCheck, PhoneCall, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function Coverage() {
  return (
    <div className="bg-white">
      <div className="bg-yellow-50/50 py-16 border-b border-yellow-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ShieldCheck className="w-16 h-16 text-yellow-500 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Insurance & Medicare Coverage
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Diabetes Self-Management Education and Support (DSMES) is a recognized covered benefit under Medicare and most private insurance plans.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-16 items-start mb-20">
          <div>
            <h2 className="text-3xl font-bold mb-6">What does Medicare Cover?</h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full bg-[var(--color-brand-purple)]" />
                <h3 className="text-xl font-bold mb-2">DSMES/T</h3>
                <p className="text-gray-600">
                  <strong className="text-gray-900">10 hours</strong> of initial training in a 12-month period from the date of the first session, plus <strong className="text-gray-900">2 hours</strong> of follow-up per calendar year.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full bg-[var(--color-brand-pink)]" />
                <h3 className="text-xl font-bold mb-2">Medical Nutrition Therapy (MNT)</h3>
                <p className="text-gray-600">
                  <strong className="text-gray-900">3 hours</strong> of initial MNT in the first calendar year, plus <strong className="text-gray-900">2 hours</strong> of follow-up MNT annually. Additional hours available for change in medical condition.
                </p>
              </div>
              <p className="text-sm text-gray-500 italic">
                * Research indicates MNT combined with DSMES/T improves outcomes. Individuals may be eligible for both services in the same year.
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-3xl p-8 border border-gray-200">
            <h2 className="text-2xl font-bold mb-6">Diagnosis Requirements</h2>
            <p className="text-gray-600 mb-6">
              Medicare coverage requires the treating qualified provider to maintain documentation of a diagnosis of diabetes based on one of the following:
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 shrink-0" />
                <span className="text-gray-700">Fasting blood glucose greater than or equal to 126 mg/dl on two different occasions</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 shrink-0" />
                <span className="text-gray-700">2 hour post-glucose challenge greater than or equal to 200 mg/dl on 2 different occasions</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 shrink-0" />
                <span className="text-gray-700">Random glucose test over 200 mg/dl for a person with symptoms of uncontrolled diabetes</span>
              </li>
            </ul>
            <div className="bg-white p-4 rounded-xl text-sm text-gray-500 border border-gray-100">
              * Other payors (commercial insurance) may have different specific coverage requirements. We will verify your benefits prior to starting.
            </div>
          </div>
        </div>

        <div className="bg-[var(--color-brand-purple)] text-white rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl font-bold mb-4">Steps to Get Started</h2>
            <ol className="space-y-4 text-lg text-purple-100 list-decimal list-inside">
              <li>Download our detailed Referral Order Form.</li>
              <li>Have your treating physician sign it along with recent diagnostic labs.</li>
              <li>Fax or email it to our office.</li>
              <li>We will verify benefits and schedule your first session!</li>
            </ol>
          </div>
          <div className="flex flex-col gap-4 min-w-[200px]">
            <button className="flex items-center justify-center gap-2 bg-white text-[var(--color-brand-purple)] px-6 py-4 rounded-xl font-bold hover:bg-gray-50 transition-colors">
              <FileCheck className="w-5 h-5" /> Download Form
            </button>
            <Link to="/contact" className="flex items-center justify-center gap-2 bg-transparent text-white border border-white/30 px-6 py-4 rounded-xl font-bold hover:bg-white/10 transition-colors">
              <PhoneCall className="w-5 h-5" /> Contact Us
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
