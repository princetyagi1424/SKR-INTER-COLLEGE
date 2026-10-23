import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { Phone, FileText, CheckCircle } from "lucide-react";

export const metadata = { title: "Admissions" };

export default function AdmissionsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicHeader />
      <main className="mx-auto max-w-4xl flex-1 px-4 py-12">
        <h1 className="mb-2 text-3xl font-bold text-[var(--color-navy)]">Admissions</h1>
        <p className="mb-10 text-slate-600">
          Join S.K.R. INTER COLLEGE & PVT ITI — quality education for rural excellence.
        </p>

        <section className="mb-10 rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-[var(--color-navy)]">
            <FileText className="h-5 w-5" /> How to Apply
          </h2>
          <ol className="list-decimal space-y-3 pl-5 text-sm text-slate-700">
            <li>Visit the school office during working hours (Mon–Sat, 8:00 AM – 2:00 PM).</li>
            <li>Collect the admission form and fill it with accurate details.</li>
            <li>Attach required documents (see checklist below).</li>
            <li>Submit the form with the applicable fee at the office counter.</li>
            <li>Collect the acknowledgment / fee receipt.</li>
          </ol>
        </section>

        <section className="mb-10 rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-[var(--color-navy)]">
            <CheckCircle className="h-5 w-5" /> Documents Checklist
          </h2>
          <ul className="grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
            <li>• Birth certificate / age proof</li>
            <li>• Previous school TC / mark sheet</li>
            <li>• Aadhaar card (student)</li>
            <li>• Passport-size photographs (4)</li>
            <li>• Parent / guardian ID proof</li>
            <li>• Caste / category certificate (if applicable)</li>
            <li>• Address proof</li>
            <li>• Migration certificate (if required)</li>
          </ul>
        </section>

        <section className="rounded-xl bg-[var(--color-navy)] p-6 text-white">
          <h2 className="mb-2 text-lg font-semibold">Need help?</h2>
          <p className="mb-4 text-sm text-white/80">
            Call the school office for seat availability, fee structure and form collection.
          </p>
          <a
            href="tel:9837183726"
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-gold)] px-5 py-2.5 text-sm font-semibold text-[var(--color-navy-dark)]"
          >
            <Phone className="h-4 w-4" />
            9837183726
          </a>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
