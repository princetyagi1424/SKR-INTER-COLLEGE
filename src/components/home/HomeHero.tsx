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

/** Official campus courtyard / building photo (UPMSP + local fallback) */
const CAMPUS_IMG =
  "/api/school-image?class=S&name=011424_ALLSCHOOLWEBSITE_01_SchoolBuilding.jpg";

export function HomeHero({ locale }: Props) {
  const c = homeCopy(locale);
  const hi = locale === "hi";

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0f2744] via-[#16355d] to-[#0f2744] text-white pt-8 pb-16 sm:py-20 lg:py-24">
        <div className="pointer-events-none absolute inset-0 opacity-10">
          <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-[#c9a227] blur-3xl" />
          <div className="absolute top-1/2 right-0 h-96 w-96 rounded-full bg-[#2a4a73] blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-6 space-y-6">
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

            {/* Modern full-bleed campus photo with overlay text */}
            <div className="lg:col-span-6" id="campus">
              <div className="relative mx-auto w-full max-w-xl overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/15">
                <div className="relative aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/3] w-full bg-slate-900">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={CAMPUS_IMG}
                    alt={hi ? "एस.के.आर. इण्टर कॉलेज परिसर" : "S.K.R. Inter College campus building"}
                    className="absolute inset-0 h-full w-full object-cover object-center"
                    loading="eager"
                    onError={(e) => {
                      const el = e.currentTarget;
                      if (!el.dataset.fallback) {
                        el.dataset.fallback = "1";
                        el.src = "/images/campus-gate.jpg";
                      }
                    }}
                  />
                  {/* Gradient overlays for modern school-site look */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a1628]/95 via-[#0a1628]/35 to-transparent" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#0f2744]/25 via-transparent to-transparent" />

                  {/* Text over image */}
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                    <div className="inline-flex items-center gap-2 rounded-full bg-amber-400/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-amber-300 ring-1 ring-amber-300/30 backdrop-blur-sm">
                      {hi ? "हमारा परिसर" : "Our Campus"}
                    </div>
                    <h3 className="mt-2 text-lg font-extrabold text-white sm:text-xl drop-shadow-md">
                      {hi ? "मुख्य परिसर भवन" : "Main Campus Building"}
                    </h3>
                    <p className="mt-1 text-sm text-white/90 font-medium leading-snug">
                      {hi
                        ? "एस.के.आर. इण्टर कॉलेज, उदयपुर (खालसा), बाह (आगरा)"
                        : "S.K.R. Inter College, Udaypur (Khalsa), Bah (Agra)"}
                    </p>

                    <div className="mt-4 grid grid-cols-3 gap-2">
                      <div className="rounded-xl bg-white/10 px-2 py-2.5 text-center backdrop-blur-md ring-1 ring-white/10">
                        <div className="text-xs font-bold text-amber-300 sm:text-sm">{c.upBoard}</div>
                        <div className="text-[10px] text-slate-300">{c.affiliation}</div>
                      </div>
                      <div className="rounded-xl bg-white/10 px-2 py-2.5 text-center backdrop-blur-md ring-1 ring-white/10">
                        <div className="text-xs font-bold text-white sm:text-sm">{c.pvtIti}</div>
                        <div className="text-[10px] text-slate-300">{c.technicalSkill}</div>
                      </div>
                      <div className="rounded-xl bg-white/10 px-2 py-2.5 text-center backdrop-blur-md ring-1 ring-white/10">
                        <div className="text-xs font-bold text-emerald-400 sm:text-sm">{c.gradeA}</div>
                        <div className="text-[10px] text-slate-300">{c.pehchanRank}</div>
                      </div>
                    </div>
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
