import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { teachers, UPMSP_SOURCE, schoolProfile } from "@/data/upmsp";

export const metadata = {
  title: "Faculty",
  description: "Teaching staff listed for S.K.R. INTER COLLEGE on UPMSP Pehchan (school code 011424).",
};

export default function FacultyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-cream)]">
      <PublicHeader />
      <main className="flex-1">
        <section className="border-b border-slate-100 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-12">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-blue)]">Faculty</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">Teaching staff</h1>
            <p className="mt-3 max-w-2xl text-sm text-slate-600">
              Names, roles, subjects and experience years as published on UPMSP Pehchan for school code{" "}
              {schoolProfile.code}. Photos load from the official board image service when available.
            </p>
            <p className="mt-2 text-xs text-slate-500">
              Source:{" "}
              <a href={UPMSP_SOURCE} className="text-[var(--color-blue)] underline" target="_blank" rel="noopener noreferrer">
                upmsp.edu.in Pehchan
              </a>
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {teachers.map((t) => (
              <article key={t.name + t.subject} className="card-surface overflow-hidden">
                <div className="aspect-[4/3] bg-slate-100">
                  {t.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={t.image}
                      alt={t.name}
                      className="h-full w-full object-cover object-top"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 text-3xl font-bold text-slate-400">
                      {t.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h2 className="font-semibold text-slate-900">{t.name}</h2>
                  <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">{t.role}</p>
                  <p className="mt-2 text-sm text-slate-600">{t.subject}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    Teaching experience: {t.experienceYears} {t.experienceYears === 1 ? "year" : "years"}
                  </p>
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
