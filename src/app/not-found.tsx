import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-navy)] text-lg font-bold text-[var(--color-gold)]">
        SKR
      </div>
      <h1 className="mb-2 text-4xl font-bold text-[var(--color-navy)]">404</h1>
      <p className="mb-6 max-w-md text-slate-600">
        This page could not be found. It may have been moved or the link is incorrect.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-lg bg-[var(--color-navy)] px-5 py-2.5 text-sm font-semibold text-white"
        >
          Go to home
        </Link>
        <Link
          href="/contact"
          className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700"
        >
          Contact office
        </Link>
      </div>
    </div>
  );
}
