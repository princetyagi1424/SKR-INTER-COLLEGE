import Link from "next/link";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { schoolProfile, UPMSP_SOURCE } from "@/data/upmsp";

export const metadata = {
  title: "Academics",
  description: "UP Board streams and facilities at S.K.R. INTER COLLEGE (code 011424).",
};

export default function AcademicsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-cream)]">
      <PublicHeader />
      <main className="flex-1">
        <section className="border-b border-slate-100 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-12">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-blue)]">Academics</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">Programmes &amp; facilities</h1>
            <p className="mt-3 max-w-2xl text-sm text-slate-600">
              Intermediate recognition year {schoolProfile.recognition.intermediate}; High School recognition{" "}
              {schoolProfile.recognition.highSchool}. Subject groups listed below are from the UPMSP Pehchan record.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10">
          <h2 className="mb-4 text-lg font-bold text-slate-900">Intermediate subject groups (UPMSP)</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {schoolProfile.streamsInter.map((s) => (
              <div key={s} className="card-surface px-5 py-4 font-medium text-slate-800">
                {s}
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-slate-500">
            Source:{" "}
            <a href={UPMSP_SOURCE} target="_blank" rel="noopener noreferrer" className="text-[var(--color-blue)] underline">
              UPMSP SchoolInformation Code 011424
            </a>
          </p>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-10">
          <h2 className="mb-4 text-lg font-bold text-slate-900">Campus learning support</h2>
          <ul className="grid gap-3 sm:grid-cols-2 text-sm text-slate-700">
            <li className="card-surface p-4">{schoolProfile.facilities.classrooms} teaching rooms</li>
            <li className="card-surface p-4">Science laboratory — available</li>
            <li className="card-surface p-4">Computer lab &amp; internet / Wi‑Fi — available</li>
            <li className="card-surface p-4">Library — available</li>
            <li className="card-surface p-4">CCTV — {schoolProfile.facilities.cctv.count} cameras</li>
            <li className="card-surface p-4">Playground — available</li>
          </ul>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-16">
          <div className="card-surface flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-bold text-slate-900">Private ITI</h2>
              <p className="text-sm text-slate-600">
                Skill programmes are offered alongside the Inter College. Confirm current trades and seats at the office.
              </p>
            </div>
            <Link href="/contact" className="rounded-full bg-[var(--color-navy)] px-5 py-2.5 text-center text-sm font-semibold text-white">
              Contact office
            </Link>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
