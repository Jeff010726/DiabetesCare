import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Contact() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Ready to enroll in a class or schedule training? Reach out to us today.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
        <div>
           <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm mb-8">
              <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
              <form className="space-y-4">
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                   <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-purple)]" placeholder="Your name" />
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                   <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-purple)]" placeholder="you@example.com" />
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                   <textarea rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-purple)]" placeholder="How can we help?"></textarea>
                 </div>
                 <button type="button" className="w-full bg-[var(--color-brand-purple)] text-white font-bold py-3 px-4 rounded-xl hover:bg-[var(--color-brand-purple)]/90 transition-colors">
                   Send Message
                 </button>
              </form>
           </div>
        </div>

        <div>
           <div className="space-y-8">
              <div className="flex items-start gap-4">
                 <div className="w-12 h-12 bg-[var(--color-brand-purple-light)] text-[var(--color-brand-purple)] rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6" />
                 </div>
                 <div>
                    <h4 className="text-lg font-bold mb-1">Address</h4>
                    <p className="text-gray-600">Nutriall Wellness Center LLC<br/>123 Health Way, Suite 100<br/>City, State 12345</p>
                 </div>
              </div>
              
              <div className="flex items-start gap-4">
                 <div className="w-12 h-12 bg-[var(--color-brand-purple-light)] text-[var(--color-brand-purple)] rounded-xl flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6" />
                 </div>
                 <div>
                    <h4 className="text-lg font-bold mb-1">Phone</h4>
                    <p className="text-gray-600">(555) 123-4567<br/>Fax: (555) 123-4568</p>
                 </div>
              </div>

              <div className="flex items-start gap-4">
                 <div className="w-12 h-12 bg-[var(--color-brand-purple-light)] text-[var(--color-brand-purple)] rounded-xl flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6" />
                 </div>
                 <div>
                    <h4 className="text-lg font-bold mb-1">Email</h4>
                    <p className="text-gray-600">hello@nutriallwellness.com</p>
                 </div>
              </div>

              <div className="flex items-start gap-4">
                 <div className="w-12 h-12 bg-[var(--color-brand-purple-light)] text-[var(--color-brand-purple)] rounded-xl flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6" />
                 </div>
                 <div>
                    <h4 className="text-lg font-bold mb-1">Hours</h4>
                    <p className="text-gray-600">Monday - Friday: 9am - 5pm<br/>Saturday & Sunday: Closed</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
