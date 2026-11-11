"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  Shield,
  Trophy,
  Users,
} from "lucide-react";
import { homeCopy } from "@/lib/home-copy";

type Props = { locale: "en" | "hi" };

export function HomeHero({ locale }: Props) {
  const c = homeCopy(locale);

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0f2744] via-[#16355d] to-[#0f2744] text-white pt-8 pb-16 sm:py-20 lg:py-24">
        <div className="pointer-events-none absolute inset-0 opacity-10">
          <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-[#c9a227] blur-3xl" />
          <div className="absolute top-1/2 right-0 h-96 w-96 rounded-full bg-[#2a4a73] blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex flex-wrap items-center gap-2 rounded-full border border-amber-400/30 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-amber-200 backdrop-blur-md">
                <span className="flex h-2 w-2 rounded-full bg-[#c9a227] animate-pulse" />
                <span>UPMSP Code: 011424</span>
                <span className="text-white/40">•</span>
                <span>UDISE: 09181302903</span>
                <span className="text-white/40">•</span>
                <span>Agra, U.P.</span>
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl leading-[1.15]">
                <span className="block font-['Cinzel',serif] text-white">{c.heroTitle1}</span>
                <span className="block bg-gradient-to-r from-amber-300 via-[#e0c04a] to-amber-200 bg-clip-text text-transparent">
                  {c.heroTitle2}
                </span>
              </h1>

              <p className="max-w-2xl text-base text-slate-200/90 leading-relaxed sm:text-lg">{c.heroDesc}</p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#enquiry"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#c9a227] to-[#e0c04a] px-6 py-3.5 text-sm font-bold text-[#0f2744] shadow-lg transition hover:scale-[1.02] hover:shadow-amber-500/20 active:scale-[0.98]"
                >
                  {c.admissionEnquiry}
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#campus"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
                >
                  {c.exploreCampus}
                </a>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-transparent px-4 py-3.5 text-sm font-medium text-slate-300 transition hover:text-white"
                >
                  <GraduationCap className="h-4 w-4 text-[#c9a227]" />
                  {c.studentStaffPortal}
                </Link>
              </div>

              <div className="pt-4 grid grid-cols-3 gap-3 border-t border-white/10 text-xs text-slate-300">
                <div>
                  <div className="font-extrabold text-white text-base">2004 / 2011</div>
                  <div className="text-slate-400">{c.hsInterRecog}</div>
                </div>
                <div>
                  <div className="font-extrabold text-amber-300 text-base">100% Pass</div>
                  <div className="text-slate-400">{c.boardExamRecord}</div>
                </div>
                <div>
                  <div className="font-extrabold text-white text-base">22 Rooms</div>
                  <div className="text-slate-400">{c.cctvSurveillance}</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5" id="campus">
              <div className="relative mx-auto max-w-md rounded-3xl border border-white/15 bg-gradient-to-b from-white/15 to-white/5 p-3 shadow-2xl backdrop-blur-md">
                <div className="relative overflow-hidden rounded-2xl bg-slate-900 aspect-[4/3] group shadow-inner">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/campus-gate.jpg"
                    alt="S.K.R. Inter College campus"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="text-xs font-bold text-amber-300 uppercase tracking-wider">{c.mainCampusGate}</div>
                    <div className="text-sm font-semibold truncate">{c.campusGateCaption}</div>
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="rounded-xl bg-white/10 p-2.5">
                    <div className="font-bold text-amber-300 text-sm">{c.upBoard}</div>
                    <div className="text-[10px] text-slate-300">{c.affiliation}</div>
                  </div>
                  <div className="rounded-xl bg-white/10 p-2.5">
                    <div className="font-bold text-white text-sm">{c.pvtIti}</div>
                    <div className="text-[10px] text-slate-300">{c.technicalSkill}</div>
                  </div>
                  <div className="rounded-xl bg-white/10 p-2.5">
                    <div className="font-bold text-emerald-400 text-sm">{c.gradeA}</div>
                    <div className="text-[10px] text-slate-300">{c.pehchanRank}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <div className="flex items-start gap-3.5 rounded-2xl border border-slate-100 bg-slate-50/70 p-4 transition hover:bg-slate-50 hover:shadow-sm">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#0f2744]">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">{c.comprehensiveStreams}</h3>
                <p className="text-xs text-slate-600 mt-0.5">{c.comprehensiveStreamsDesc}</p>
              </div>
            </div>
            <div className="flex items-start gap-3.5 rounded-2xl border border-slate-100 bg-slate-50/70 p-4 transition hover:bg-slate-50 hover:shadow-sm">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-[#c9a227]">
                <Trophy className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">{c.passRecord}</h3>
                <p className="text-xs text-slate-600 mt-0.5">{c.passRecordDesc}</p>
              </div>
            </div>
            <div className="flex items-start gap-3.5 rounded-2xl border border-slate-100 bg-slate-50/70 p-4 transition hover:bg-slate-50 hover:shadow-sm">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">{c.secureCampus}</h3>
                <p className="text-xs text-slate-600 mt-0.5">{c.secureCampusDesc}</p>
              </div>
            </div>
            <div className="flex items-start gap-3.5 rounded-2xl border border-slate-100 bg-slate-50/70 p-4 transition hover:bg-slate-50 hover:shadow-sm">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">{c.experiencedFaculty}</h3>
                <p className="text-xs text-slate-600 mt-0.5">{c.experiencedFacultyDesc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
