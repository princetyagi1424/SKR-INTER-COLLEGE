import Link from "next/link";
import { PublicPageShell, SoftCard } from "@/components/layout/PublicPageShell";
import { CalendarRange, Megaphone } from "lucide-react";

export const metadata = { title: "Academic Calendar" };

export default function CalendarPage() {
  const items = [
    { label: "Current academic session", value: "2025–26 (1 April 2025 – 31 March 2026)" },
    { label: "Holiday list", value: "Issued by the office through notices" },
    { label: "Exam schedule", value: "Published before each exam cycle" },
    { label: "Admission window", value: "Confirm dates with the school office" },
  ];

  return (
    <PublicPageShell
      eyebrow="Planning"
      title="Academic calendar"
      description="Key dates are confirmed by the school office. Session boundaries below follow the standard UP academic year pattern."
    >
      <div className="grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
        <SoftCard>
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900">
            <CalendarRange className="h-5 w-5 text-[var(--color-blue)]" /> Session overview
          </h2>
          <dl className="space-y-3">
            {items.map((item) => (
              <div key={item.label} className="rounded-2xl bg-slate-50 px-4 py-3">
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">{item.label}</dt>
                <dd className="mt-1 text-sm font-medium text-slate-900">{item.value}</dd>
              </div>
            ))}
          </dl>
        </SoftCard>
        <SoftCard className="bg-[var(--color-navy)] text-white">
          <Megaphone className="mb-3 h-8 w-8 text-[var(--color-gold)]" />
          <h2 className="text-lg font-bold">Latest circulars</h2>
          <p className="mt-2 text-sm text-white/75">
            Holiday lists, exam dates and event schedules are published as official notices.
          </p>
          <Link
            href="/notices"
            className="mt-5 inline-flex rounded-full bg-[var(--color-gold)] px-4 py-2 text-sm font-bold text-slate-900"
          >
            Open notices
          </Link>
        </SoftCard>
      </div>
    </PublicPageShell>
  );
}
