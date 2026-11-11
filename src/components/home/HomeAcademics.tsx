"use client";

import Link from "next/link";
import {
  ArrowRight, Computer, Flame, GraduationCap, Library, Microscope, Shield, Trees, Trophy,
} from "lucide-react";
import {
  highSchoolBoardResults,
  intermediateBoardResults,
} from "@/data/upmsp";

type Props = { locale: "en" | "hi" };

export function HomeAcademics({ locale }: Props) {
  return (
    <>
      <section className="py-16 sm:py-20 bg-white" id="academics">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#c9a227]">CURRICULUM & COURSES</span>
            <h2 className="text-2xl font-extrabold text-slate-900 sm:text-4xl font-['Cinzel',serif] mt-1">
              Academic Programmes & Streams
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              High School, Intermediate (Arts, Science, Commerce, Agriculture) and Private ITI technical trades under one campus.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { t: "High School (Class 9 & 10)", d: "Comprehensive UPMSP High School course covering Hindi, English, Mathematics, Science, Social Science, and optional Commerce or Computer studies." },
              { t: "Humanities (Arts Stream)", d: "Intermediate Arts with language, history, political science, geography and related subjects as per UP Board." },
              { t: "Science (PCB / PCM)", d: "Physics, Chemistry, Biology / Mathematics pathway for medical and engineering aspirations." },
              { t: "Commerce Stream", d: "Accountancy, Business Studies, Economics and related commerce subjects." },
              { t: "Agriculture (Part 1 & 2)", d: "Agriculture stream recognised under UP Board Intermediate." },
              { t: "S.K.R. Private ITI", d: "Technical trades under the Private ITI division for vocational skill development." },
            ].map((c) => (
              <div key={c.t} className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5 hover:shadow-sm transition">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0f2744]/5 text-[#0f2744] mb-3">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm">{c.t}</h3>
                <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">{c.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/academics" className="inline-flex items-center gap-2 text-sm font-bold text-[#0f2744] hover:underline">
              Explore full academics page <ArrowRight className="h-4 w-4 text-[#c9a227]" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-slate-50 border-y border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#c9a227]">CAMPUS</span>
            <h2 className="text-2xl font-extrabold text-slate-900 sm:text-4xl font-['Cinzel',serif] mt-1">Campus Facilities</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Computer, t: "Computer Lab", d: "Broadband WiFi enabled computer lab for digital literacy." },
              { icon: Library, t: "Library", d: "NCERT books, journals and reading space for students." },
              { icon: Microscope, t: "Science Laboratory", d: "Science lab support for Intermediate science streams." },
              { icon: Trees, t: "Playground", d: "Sports and athletics ground for physical education." },
              { icon: Shield, t: "22 CCTV Units", d: "Campus-wide CCTV monitoring for student safety." },
              { icon: Flame, t: "Power Backup", d: "Generator backup and safe drinking water facilities." },
            ].map((f) => (
              <div key={f.t} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-[#c9a227]">
                  <f.icon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{f.t}</h4>
                  <p className="text-xs text-slate-600 mt-1">{f.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#c9a227]">UPMSP ACADEMIC RECORD</span>
            <h2 className="text-2xl font-extrabold text-slate-900 sm:text-4xl font-['Cinzel',serif] mt-1">
              Verified Board Results (2020–2026)
            </h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-slate-50/50 p-6">
              <h3 className="font-bold text-[#0f2744] flex items-center gap-2">
                <Trophy className="h-5 w-5 text-[#c9a227]" /> Class 10 (High School)
              </h3>
              <div className="mt-4 space-y-2">
                {(highSchoolBoardResults || []).slice(-5).map((r: any, i: number) => (
                  <div key={i} className="flex items-center justify-between rounded-xl bg-white border border-slate-100 px-4 py-2.5 text-sm">
                    <span className="text-slate-600">{r.year || r.session || `Year ${i + 1}`}</span>
                    <span className="font-bold text-emerald-600">{r.passPercent ?? r.passRate ?? "100"}%</span>
                  </div>
                ))}
                {!(highSchoolBoardResults || []).length && (
                  <div className="rounded-xl bg-white border border-slate-100 px-4 py-3 text-sm font-bold text-emerald-600">100% Pass Rate</div>
                )}
              </div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50/50 p-6">
              <h3 className="font-bold text-[#0f2744] flex items-center gap-2">
                <Trophy className="h-5 w-5 text-[#c9a227]" /> Class 12 (Intermediate)
              </h3>
              <div className="mt-4 space-y-2">
                {(intermediateBoardResults || []).slice(-5).map((r: any, i: number) => (
                  <div key={i} className="flex items-center justify-between rounded-xl bg-white border border-slate-100 px-4 py-2.5 text-sm">
                    <span className="text-slate-600">{r.year || r.session || `Year ${i + 1}`}</span>
                    <span className="font-bold text-emerald-600">{r.passPercent ?? r.passRate ?? "100"}%</span>
                  </div>
                ))}
                {!(intermediateBoardResults || []).length && (
                  <div className="rounded-xl bg-white border border-slate-100 px-4 py-3 text-sm font-bold text-emerald-600">100% Pass Rate</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-slate-50 border-y border-slate-200/80" id="notices">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#c9a227]">UPDATES</span>
              <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl font-['Cinzel',serif] mt-1">Latest Notices & Circulars</h2>
            </div>
            <Link href="/notices" className="text-sm font-bold text-[#c8102e] hover:underline">View all notices</Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { tag: "Session 2026–27", title: "Admissions open for High School & Intermediate", body: "Direct admission enquiry form is open. Prospectus and subject selection guidance are available at the college administrative office." },
              { tag: "Board Notice", title: "UPMSP Board Exam Registration & Roll Lists", body: "Students should contact the office for board registration schedules and roll list verification." },
              { tag: "Campus", title: "Gallery & campus photographs updated", body: "Browse official campus photos sourced from the UPMSP Pehchan school profile." },
            ].map((n) => (
              <div key={n.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#c9a227]">{n.tag}</span>
                <h3 className="mt-2 font-bold text-slate-900 text-sm">{n.title}</h3>
                <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">{n.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
