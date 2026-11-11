"use client";

import Link from "next/link";
import {
  ArrowRight,
  Building,
  Check,
  CheckCircle2,
  GraduationCap,
  Phone,
} from "lucide-react";
import { homeCopy } from "@/lib/home-copy";

type Props = { locale: "en" | "hi" };

export function HomeAbout({ locale }: Props) {
  const c = homeCopy(locale);

  return (
    <>
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-[#0f2744]">
                <Building className="h-3.5 w-3.5 text-[#c9a227]" />
                {c.aboutInstitution}
              </div>
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-4xl font-['Cinzel',serif]">
                {c.aboutTitle}
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">{c.aboutP1}</p>
              <p className="text-base text-slate-600 leading-relaxed">{c.aboutP2}</p>
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-sm text-slate-700">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                  <span>{c.upmspSchoolCode}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-700">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                  <span>{c.udiseCode}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-700">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                  <span>{c.integratedCampus}</span>
                </div>
              </div>
              <div className="pt-4">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#0f2744] hover:text-[#1e3a5f] hover:underline"
                >
                  {c.readDetailedHistory}
                  <ArrowRight className="h-4 w-4 text-[#c9a227]" />
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-amber-50/30 p-8 shadow-sm">
              <div className="flex flex-col items-center text-center space-y-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo.png"
                  alt="S.K.R. Inter College Seal"
                  width={128}
                  height={128}
                  className="h-32 w-32 object-contain drop-shadow-md rounded-full bg-white p-1 ring-4 ring-[#c9a227]/20"
                />
                <div>
                  <h3 className="text-xl font-bold text-[#0f2744] font-['Cinzel',serif]">S.K.R. INTER COLLEGE</h3>
                  <p className="text-xs font-semibold text-[#c9a227] uppercase tracking-wider">{c.sealSubtitle}</p>
                </div>
                <p className="text-xs text-slate-500 max-w-sm italic">{c.sealMotto}</p>
                <div className="w-full pt-4 border-t border-slate-200/80 grid grid-cols-2 gap-4 text-left text-xs">
                  <div>
                    <span className="text-slate-400 block">{c.manager}</span>
                    <strong className="text-slate-800 text-sm">Shri Omveer Tyagi</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">{c.principal}</span>
                    <strong className="text-slate-800 text-sm">Shri Uttam Singh Tyagi</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-slate-50 border-y border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-white border border-slate-200/90 p-8 sm:p-12 shadow-sm">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-4 flex flex-col items-center text-center">
                <div className="h-44 w-44 rounded-2xl bg-gradient-to-tr from-[#0f2744] to-[#1e3a5f] p-1.5 shadow-md">
                  <div className="h-full w-full rounded-xl bg-slate-100 flex items-center justify-center overflow-hidden">
                    <div className="flex flex-col items-center justify-center text-[#0f2744] p-4">
                      <GraduationCap className="h-14 w-14 mb-2 text-[#c9a227]" />
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-600">{c.principalDesk}</span>
                    </div>
                  </div>
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-900">Shri Uttam Singh Tyagi</h3>
                <p className="text-xs font-semibold text-[#0f2744]">{c.principalRole}</p>
                <p className="text-xs text-slate-500 mt-1">{c.principalExp}</p>
                <a
                  href="tel:9719903732"
                  className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700"
                >
                  <Phone className="h-3.5 w-3.5" /> +91 9719903732
                </a>
              </div>
              <div className="lg:col-span-8 space-y-4">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#c9a227]">{c.messageFromPrincipal}</p>
                <blockquote className="border-l-4 border-[#c9a227] pl-4 text-sm leading-7 text-slate-700 italic">
                  “{c.principalQuote}”
                </blockquote>
                <p className="text-sm text-slate-600 leading-relaxed">{c.principalWelcome}</p>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-[#c9a227]" /> {c.individualAttention}
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-[#c9a227]" /> {c.parentTeacher}
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-[#c9a227]" /> {c.freeGuidance}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-[#0f2744] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl font-extrabold sm:text-3xl font-['Cinzel',serif]">{c.verifiedMetrics}</h2>
            <p className="text-sm text-slate-300 mt-2">{c.verifiedMetricsDesc}</p>
          </div>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 text-center">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <div className="text-4xl font-extrabold text-[#c9a227] font-['Cinzel',serif]">100%</div>
              <div className="mt-2 text-sm font-semibold text-white">{c.hsPassRate}</div>
              <div className="text-xs text-slate-400 mt-1">{c.upBoardExams}</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <div className="text-4xl font-extrabold text-[#c9a227] font-['Cinzel',serif]">22</div>
              <div className="mt-2 text-sm font-semibold text-white">{c.cctvRooms}</div>
              <div className="text-xs text-slate-400 mt-1">{c.comprehensiveSecurity}</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <div className="text-4xl font-extrabold text-[#c9a227] font-['Cinzel',serif]">16+</div>
              <div className="mt-2 text-sm font-semibold text-white">{c.facultyMembers}</div>
              <div className="text-xs text-slate-400 mt-1">{c.avgExperience}</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <div className="text-4xl font-extrabold text-emerald-400 font-['Cinzel',serif]">Grade A</div>
              <div className="mt-2 text-sm font-semibold text-white">{c.upmspScore}</div>
              <div className="text-xs text-slate-400 mt-1">{c.districtRank}</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
