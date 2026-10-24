import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";

export const metadata = { title: "Faculty" };

export default function FacultyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicHeader />
      <main className="mx-auto max-w-3xl flex-1 px-4 py-12">
        <h1 className="mb-3 text-3xl font-bold text-[var(--color-navy)]">Faculty</h1>
        <p className="text-sm leading-relaxed text-slate-600">
          Teaching staff names and qualifications are published only after the school office verifies them.
          Please contact 9837183726 during working hours for the current staff list. This page does not invent faculty profiles.
        </p>
      </main>
      <PublicFooter />
    </div>
  );
}
