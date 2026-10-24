import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";

export const metadata = { title: "Child Safeguarding" };

export default function SafeguardingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicHeader />
      <main className="mx-auto max-w-3xl flex-1 px-4 py-12">
        <h1 className="mb-2 text-3xl font-bold text-[var(--color-navy)]">Child Safeguarding</h1>
        <p className="mb-6 text-sm text-slate-500">S.K.R. INTER COLLEGE & PVT ITI</p>
        <div className="space-y-4 text-sm leading-relaxed text-slate-700">
          <p>
            The safety and dignity of every student is a priority. Staff are expected to maintain
            professional conduct. Students and parents may report concerns to the school office without fear of retaliation.
          </p>
          <h2 className="text-lg font-semibold text-[var(--color-navy)]">Reporting a concern</h2>
          <p>
            Contact the school office during working hours (Monday–Saturday, 8:00 AM – 2:00 PM):
          </p>
          <ul className="list-disc pl-5">
            <li>Phone: <a href="tel:9837183726" className="underline">9837183726</a></li>
            <li>Address: Udaypur Khalsa, Post Bhadrauli, Bah, Pinahat, Agra — 283113</li>
          </ul>
          <p>
            In an emergency involving immediate danger, contact local emergency services first.
          </p>
          <h2 className="text-lg font-semibold text-[var(--color-navy)]">Online safety</h2>
          <p>
            Portal accounts are private. Students should not share passwords. Parents should supervise
            younger students' use of digital devices for school work.
          </p>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
