import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { SchoolImage } from "@/components/layout/SchoolImage";
import { teachers, UPMSP_SOURCE, schoolProfile } from "@/data/upmsp";
import { Users, ArrowUpRight } from "lucide-react";

export const metadata = {
  title: "Faculty",
  description: "Teaching staff listed for S.K.R. Inter College on the UPMSP Pehchan school profile.",
};

export default function FacultyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-cream)]">
      <PublicHeader />
      <main className="flex-1">
        <section className="border-b border-slate-100 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[var(--color-blue)]">
              <Users className="h-3.5 w-3.5" aria-hidden="true" /> Our faculty
            </span>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Teaching staff</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              Names, roles, subjects and experience years as listed on the UPMSP Pehchan profile for school code {schoolProfile.code}. Staff details may change; confirm current information with the school office.
            </p>
            <a href={UPMSP_SOURCE} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[var(--color-blue)] hover:underline hover:underline-offset-4">
              Verify on the official UPMSP profile <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-extrabold text-slate-900">Staff directory</h2>
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600">{teachers.length} staff records listed</span>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {teachers.map((teacher) => (
              <article key={teacher.name + teacher.subject} className="card-surface group overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]">
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  {teacher.image ? (
                    <SchoolImage
                      src={teacher.image}
                      alt={teacher.name}
                      fallbackText={teacher.name.split(" ").map((word) => word[0]).slice(0, 2).join("")}
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-blue-50 via-white to-slate-100">
                      <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-100 bg-white text-lg font-extrabold text-[var(--color-navy)] shadow-sm">
                        {teacher.name.split(" ").map((word) => word[0]).slice(0, 2).join("")}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-4 sm:p-5">
                  <h3 className="font-extrabold text-slate-900">{teacher.name}</h3>
                  <p className="mt-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-emerald-700">{teacher.role}</p>
                  <p className="mt-3 min-h-10 text-sm leading-5 text-slate-600">{teacher.subject}</p>
                  <div className="mt-4 border-t border-slate-100 pt-3 text-xs text-slate-500">
                    Teaching experience: <span className="font-bold text-slate-700">{teacher.experienceYears} {teacher.experienceYears === 1 ? "year" : "years"}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
