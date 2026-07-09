import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

export default function ClassSignupThankYou() {
  return (
    <div className="mx-auto flex min-h-[64vh] max-w-2xl flex-col items-center justify-center px-4 py-20 text-center">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-green-50 text-green-600">
        <CheckCircle2 className="h-9 w-9" />
      </div>
      <h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">Class signup received</h1>
      <p className="mt-4 text-base leading-7 text-gray-600">
        Thank you. Our team will review your DSMES class signup and contact you about enrollment, insurance verification, and next steps.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center justify-center rounded-xl bg-[var(--color-brand-purple)] px-6 py-3 font-bold text-white transition hover:bg-[var(--color-brand-purple)]/90"
      >
        Back to home
      </Link>
    </div>
  );
}
