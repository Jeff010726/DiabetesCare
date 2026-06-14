import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

export default function MemberThankYou() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 py-20 text-center">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-600">
        <CheckCircle2 className="h-7 w-7" />
      </div>
      <h1 className="text-3xl font-bold text-gray-900">Account created</h1>
      <p className="mt-3 text-gray-600">Thank you for joining. You can continue exploring the site.</p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center justify-center rounded-xl bg-[var(--color-brand-purple)] px-6 py-3 font-bold text-white transition hover:bg-[var(--color-brand-purple)]/90"
      >
        Back to home
      </Link>
    </div>
  );
}
