"use client";

import Link from "next/link";
import {
  ArrowRight, BookOpen, Building, Check, CheckCircle2, GraduationCap, Phone, Shield, Sparkles, Trophy, Users,
} from "lucide-react";

type Props = { locale: "en" | "hi" };

export function HomeTop({ locale }: Props) {
  return (
    <>

        {/* ========================================================= */}
        {/* SECTION 1: HERO SECTION                                   */}
        {/* ========================================================= */}
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
                  <span className="block font-['Cinzel',serif] text-white">Empowering Young Minds,</span>
                  <span className="block bg-gradient-to-r from-amber-300 via-[#e0c04a] to-amber-200 bg-clip-text text-transparent">
                    Building Tomorrow.
                  </span>
                </h1>

                <p className="max-w-2xl text-base text-slate-200/90 leading-relaxed sm:text-lg">
                  {locale === "hi"
                    ? "एस.के.आर. इण्टर कॉलेज एवं प्राइवेट आईटीआई, उदयपुर खालसा, बाह (आगरा) — हाई स्कूल, इण्टरमीडिएट (कला, विज्ञान, वाणिज्य, कृषि) एवं तकनीकी कौशल का एक प्रतिष्ठित संस्थान।"
                    : "S.K.R. INTER COLLEGE & S.K.R. PVT ITI — premier educational institution in Udaypur Khalsa, Bah, Agra. Offering UP Board High School, Intermediate (Arts, Science, Commerce, Agriculture) & vocational ITI pathways under one disciplined campus."}
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a href="#enquiry" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#c9a227] to-[#e0c04a] px-6 py-3.5 text-sm font-bold text-[#0f2744] shadow-lg transition hover:scale-[1.02] hover:shadow-amber-500/20 active:scale-[0.98]">
                    Admission Enquiry
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <a href="#campus" className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20">
                    Explore Campus
                  </a>
                  <Link href="/login" className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-transparent px-4 py-3.5 text-sm font-medium text-slate-300 transition hover:text-white">
                    <GraduationCap className="h-4 w-4 text-[#c9a227]" />
                    Student / Staff Portal
                  </Link>
                </div>

                <div className="pt-4 grid grid-cols-3 gap-3 border-t border-white/10 text-xs text-slate-300">
                  <div>
                    <div className="font-extrabold text-white text-base">2004 / 2011</div>
                    <div className="text-slate-400">HS & Inter Recog.</div>
                  </div>
                  <div>
                    <div className="font-extrabold text-amber-300 text-base">100% Pass</div>
                    <div className="text-slate-400">Board Exam Record</div>
                  </div>
                  <div>
                    <div className="font-extrabold text-white text-base">22 Rooms</div>
                    <div className="text-slate-400">CCTV Surveillance</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5" id="campus">
                <div className="relative mx-auto max-w-md rounded-3xl border border-white/15 bg-gradient-to-b from-white/15 to-white/5 p-3 shadow-2xl backdrop-blur-md">
                  <div className="relative overflow-hidden rounded-2xl bg-slate-900 aspect-[4/3] group shadow-inner">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/campus-gate.jpg" alt="S.K.R. Inter College, Udaypur Khalsa Campus Building" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="eager" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <div className="text-xs font-bold text-amber-300 uppercase tracking-wider">Main Campus Gate</div>
                      <div className="text-sm font-semibold truncate">एस.के.आर. इण्टर कॉलेज, उदयपुर (खालसा) बाह (आगरा)</div>
                    </div>
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="rounded-xl bg-white/10 p-2.5">
                      <div className="font-bold text-amber-300 text-sm">UP Board</div>
                      <div className="text-[10px] text-slate-300">Affiliation</div>
                    </div>
                    <div className="rounded-xl bg-white/10 p-2.5">
                      <div className="font-bold text-white text-sm">PVT ITI</div>
                      <div className="text-[10px] text-slate-300">Technical Skill</div>
                    </div>
                    <div className="rounded-xl bg-white/10 p-2.5">
                      <div className="font-bold text-emerald-400 text-sm">Grade A</div>
                      <div className="text-[10px] text-slate-300">Pehchan Rank</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: 4 QUICK INSTITUTIONAL PILLARS */}
        <section className="border-b border-slate-200 bg-white shadow-sm">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              <div className="flex items-start gap-3.5 rounded-2xl border border-slate-100 bg-slate-50/70 p-4 transition hover:bg-slate-50 hover:shadow-sm">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#0f2744]"><BookOpen className="h-5 w-5" /></div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Comprehensive Streams</h3>
                  <p className="text-xs text-slate-600 mt-0.5">High School, Arts, Science, Commerce, Agriculture</p>
                </div>
              </div>
              <div className="flex items-start gap-3.5 rounded-2xl border border-slate-100 bg-slate-50/70 p-4 transition hover:bg-slate-50 hover:shadow-sm">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-[#c9a227]"><Trophy className="h-5 w-5" /></div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">100% Pass Record</h3>
                  <p className="text-xs text-slate-600 mt-0.5">Verified UPMSP Board Result 2024 & 2026</p>
                </div>
              </div>
              <div className="flex items-start gap-3.5 rounded-2xl border border-slate-100 bg-slate-50/70 p-4 transition hover:bg-slate-50 hover:shadow-sm">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700"><Shield className="h-5 w-5" /></div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Secure Campus</h3>
                  <p className="text-xs text-slate-600 mt-0.5">22 CCTV monitored rooms, safe rural environment</p>
                </div>
              </div>
              <div className="flex items-start gap-3.5 rounded-2xl border border-slate-100 bg-slate-50/70 p-4 transition hover:bg-slate-50 hover:shadow-sm">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700"><Users className="h-5 w-5" /></div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Experienced Faculty</h3>
                  <p className="text-xs text-slate-600 mt-0.5">16+ dedicated teachers with up to 16 yrs experience</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: ABOUT & INSTITUTIONAL HERITAGE */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="space-y-5">
                <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-[#0f2744]">
                  <Building className="h-3.5 w-3.5 text-[#c9a227]" />
                  ABOUT THE INSTITUTION
                </div>
                <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-4xl font-['Cinzel',serif]">
                  A Legacy of Value-Based Education in Rural Agra
                </h2>
                <p className="text-base text-slate-600 leading-relaxed">
                  S.K.R. INTER COLLEGE & S.K.R. PVT ITI was established with a singular mission: to provide high-quality, disciplined, and accessible education to the youth of Udaypur Khalsa, Post Bhadrauli, Bah, Pinahat, and surrounding communities in Agra district.
                </p>
                <p className="text-base text-slate-600 leading-relaxed">
                  Recognized by the Uttar Pradesh Madhyamik Shiksha Parishad (High School recognition in 2004, Intermediate in 2011), the institution blends rigorous academic curricula with practical vocational training through its Private ITI wing.
                </p>
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3 text-sm text-slate-700">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                    <span><strong>UPMSP School Code:</strong> 011424 • Registered with District Inspector of Schools (DIOS Agra)</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-700">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                    <span><strong>UDISE Code:</strong> 09181302903 • Block: Pinahat, Tehsil: Bah</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-700">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                    <span><strong>Integrated Campus:</strong> High School + Intermediate + Technical ITI skill trades</span>
                  </div>
                </div>
                <div className="pt-4">
                  <Link href="/about" className="inline-flex items-center gap-2 text-sm font-bold text-[#0f2744] hover:text-[#1e3a5f] hover:underline">
                    Read Detailed Institutional History & Profile
                    <ArrowRight className="h-4 w-4 text-[#c9a227]" />
                  </Link>
                </div>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-amber-50/30 p-8 shadow-sm">
                <div className="flex flex-col items-center text-center space-y-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/logo.png" alt="S.K.R. Inter College Seal" width={128} height={128} className="h-32 w-32 object-contain drop-shadow-md rounded-full bg-white p-1 ring-4 ring-[#c9a227]/20" />
                  <div>
                    <h3 className="text-xl font-bold text-[#0f2744] font-['Cinzel',serif]">S.K.R. INTER COLLEGE</h3>
                    <p className="text-xs font-semibold text-[#c9a227] uppercase tracking-wider">& S.K.R. Private ITI • Udaypur Khalsa</p>
                  </div>
                  <p className="text-xs text-slate-500 max-w-sm italic">&ldquo;विद्या ददाति विनयं, विनयाद् याति पात्रताम्&rdquo; — Dedicated to instilling knowledge, humility, and vocational capability in every student.</p>
                  <div className="w-full pt-4 border-t border-slate-200/80 grid grid-cols-2 gap-4 text-left text-xs">
                    <div>
                      <span className="text-slate-400 block">Manager:</span>
                      <strong className="text-slate-800 text-sm">Shri Omveer Tyagi</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Principal:</span>
                      <strong className="text-slate-800 text-sm">Shri Uttam Singh Tyagi</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: PRINCIPAL'S DESK */}
        <section className="py-16 sm:py-20 bg-slate-50 border-y border-slate-200/80">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm">
              <div className="flex flex-col gap-6 md:flex-row md:items-start">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#0f2744] text-amber-300">
                  <Sparkles className="h-7 w-7" />
                </div>
                <div className="flex-1 space-y-3">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c9a227]">Principal's Desk</p>
                  <h2 className="text-2xl font-extrabold text-slate-900">Shri Uttam Singh Tyagi</h2>
                  <p className="text-sm font-semibold text-[#0f2744]">Principal & Lecturer in Geography</p>
                  <p className="text-sm leading-7 text-slate-600 max-w-3xl">
                    Our goal is to empower every student with discipline, knowledge and vocational skill so they can serve society and the nation. Providing quality education to children from rural backgrounds remains our priority.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: VERIFIED INSTITUTIONAL STATISTICS */}
        <section className="py-16 sm:py-20 bg-[#0f2744] text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl font-extrabold sm:text-3xl font-['Cinzel',serif]">Verified Institutional Metrics</h2>
              <p className="text-sm text-slate-300 mt-2">Official figures reported under UPMSP Pehchan Portal (Code: 011424) & UDISE+ (09181302903)</p>
            </div>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 text-center">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="text-4xl font-extrabold text-[#c9a227] font-['Cinzel',serif]">100%</div>
                <div className="mt-2 text-sm font-semibold text-white">High School Pass Rate</div>
                <div className="text-xs text-slate-400 mt-1">UP Board Exams 2024 & 2026</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="text-4xl font-extrabold text-[#c9a227] font-['Cinzel',serif]">22</div>
                <div className="mt-2 text-sm font-semibold text-white">CCTV Monitored Rooms</div>
                <div className="text-xs text-slate-400 mt-1">Comprehensive Security</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="text-4xl font-extrabold text-[#c9a227] font-['Cinzel',serif]">16+</div>
                <div className="mt-2 text-sm font-semibold text-white">Faculty Members</div>
                <div className="text-xs text-slate-400 mt-1">Average 8+ Yrs Experience</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="text-4xl font-extrabold text-emerald-400 font-['Cinzel',serif]">Grade A</div>
                <div className="mt-2 text-sm font-semibold text-white">UPMSP Score: 122/200</div>
                <div className="text-xs text-slate-400 mt-1">District Rank: 203 / 908</div>
              </div>
            </div>
          </div>
        </section>

    </>
  );
}
