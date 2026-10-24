import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import Link from "next/link";

export const metadata = { title: "Academic Calendar" };

export default function CalendarPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicHeader />
      <main className="mx-auto max-w-3xl flex-1 px-4 py-12">
        <h1 className="mb-3 text-3xl font-bold text-[var(--color-navy)]">Academic calendar</h1>
        <p className="mb-4 text-sm text-slate-600">Session 2025-26 runs 1 April 2025 to 31 March 2026. Holiday lists and exam dates are issued as notices.</p>
        <Link href="/notices" className="text-sm font-semibold text-[var(--color-navy)] underline">Open notices</Link>
      </main>
      <PublicFooter />
    </div>
  );
}
