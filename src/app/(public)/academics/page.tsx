import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { BookOpen, GraduationCap, Wrench, Calendar } from "lucide-react";

export const metadata = { title: "Academics" };

export default function AcademicsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicHeader />
      <main className="mx-auto max-w-5xl flex-1 px-4 py-12">
        <h1 className="mb-2 text-3xl font-bold text-[var(--color-navy)]">Academics</h1>
        <p className="mb-10 text-slate-600">
          Programmes offered at S.K.R. INTER COLLEGE & PVT ITI, Udaypur Khalsa, Agra.
        </p>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
            <GraduationCap className="mb-3 h-10 w-10 text-[var(--color-navy)]" />
            <h2 className="mb-2 text-xl font-semibold text-[var(--color-navy)]">Inter College</h2>
            <p className="mb-4 text-sm leading-relaxed text-slate-600">
              High School and Intermediate programmes under the UP Board curriculum.
              Focus on strong foundation in languages, science, mathematics and commerce streams.
            </p>
            <ul className="space-y-1 text-sm text-slate-600">
              <li>• Class 9 – 10 (High School)</li>
              <li>• Class 11 – 12 (Intermediate)</li>
              <li>• Science / Arts streams (as offered)</li>
            </ul>
          </div>

          <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
            <Wrench className="mb-3 h-10 w-10 text-[var(--color-navy)]" />
            <h2 className="mb-2 text-xl font-semibold text-[var(--color-navy)]">Private ITI</h2>
            <p className="mb-4 text-sm leading-relaxed text-slate-600">
              Industrial Training Institute programmes aimed at skill development and
              employability for rural youth.
            </p>
            <ul className="space-y-1 text-sm text-slate-600">
              <li>• Trade-based practical training</li>
              <li>• Industry-oriented curriculum</li>
              <li>• Contact office for current trades</li>
            </ul>
          </div>

          <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
            <BookOpen className="mb-3 h-10 w-10 text-[var(--color-navy)]" />
            <h2 className="mb-2 text-xl font-semibold text-[var(--color-navy)]">Curriculum</h2>
            <p className="text-sm leading-relaxed text-slate-600">
              Teaching follows the prescribed UP Board syllabus for Inter College.
              ITI trades follow the relevant training guidelines. Detailed subject lists
              and textbooks are shared at the start of each academic session.
            </p>
          </div>

          <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
            <Calendar className="mb-3 h-10 w-10 text-[var(--color-navy)]" />
            <h2 className="mb-2 text-xl font-semibold text-[var(--color-navy)]">Academic Calendar</h2>
            <p className="text-sm leading-relaxed text-slate-600">
              The academic session typically runs from April to March.
              Unit tests, half-yearly and annual examinations are conducted as per
              school schedule. Exact dates are published in Notices.
            </p>
          </div>
        </div>

        <p className="mt-10 text-center text-sm text-slate-500">
          For admission details, visit the{" "}
          <a href="/admissions" className="font-medium text-[var(--color-navy)] underline">
            Admissions
          </a>{" "}
          page or call 9837183726.
        </p>
      </main>
      <PublicFooter />
    </div>
  );
}
