"use client";

import Link from "next/link";
import { useState } from "react";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import {
  BookOpen,
  FileText,
  Users,
  GraduationCap,
  ArrowRight,
  Phone,
  MapPin,
  CheckCircle2,
  Shield,
  Clock,
  Sparkles,
  ExternalLink,
  Send,
  Building,
  Microscope,
  Computer,
  Library,
  Trophy,
  Trees,
  Check,
  Flame,
  MessageSquare,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import {
  highSchoolBoardResults,
  intermediateBoardResults,
} from "@/data/upmsp";

export default function HomePage() {
  const { locale } = useLanguage();

  // Admission enquiry state
  const [form, setForm] = useState({
    studentName: "",
    parentName: "",
    mobile: "",
    className: "Class 9",
    stream: "General",
    address: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleEnquirySubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg("");
    try {
      const res = await fetch("/api/admissions/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data.error || "Submission failed. Please try calling directly.");
      }
    } catch {
      setErrorMsg("Network error. Please call +91 9837183726.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#fafaf9] text-slate-800">
      <PublicHeader />

      <main className="flex-1">
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
              {/* Left Column: Heading, Subhead, Badges & CTAs */}
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
                  <a
                    href="#enquiry"
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#c9a227] to-[#e0c04a] px-6 py-3.5 text-sm font-bold text-[#0f2744] shadow-lg transition hover:scale-[1.02] hover:shadow-amber-500/20 active:scale-[0.98]"
                  >
                    Admission Enquiry
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <a
                    href="#campus"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
                  >
                    Explore Campus
                  </a>
                  <Link
                    href="/login"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-transparent px-4 py-3.5 text-sm font-medium text-slate-300 transition hover:text-white"
                  >
                    <GraduationCap className="h-4 w-4 text-[#c9a227]" />
                    Student / Staff Portal
                  </Link>
                </div>

                <div className="pt-4 grid grid-cols-3 gap-3 border-t border-white/10 text-xs text-slate-300">
                  <div>
                    <div className="font-extrabold text-white text-base">2004 / 2011</div>
                    <div className="text-slate-400">HS &amp; Inter Recog.</div>
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

              {/* Right Column: Real School Campus Gate Photo Card */}
              <div className="lg:col-span-5" id="campus">
                <div className="relative mx-auto max-w-md rounded-3xl border border-white/15 bg-gradient-to-b from-white/15 to-white/5 p-3 shadow-2xl backdrop-blur-md">
                  <div className="relative overflow-hidden rounded-2xl bg-slate-900 aspect-[4/3] group shadow-inner">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/campus-gate.jpg"
                      alt="S.K.R. Inter College, Udaypur Khalsa Campus Building"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <div className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                        Main Campus Gate
                      </div>
                      <div className="text-sm font-semibold truncate">
                        एस.के.आर. इण्टर कॉलेज, उदयपुर (खालसा) बाह (आगरा)
                      </div>
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

        {/* ========================================================= */}
        {/* SECTION 2: 4 QUICK INSTITUTIONAL PILLARS                 */}
        {/* ========================================================= */}
        <section className="border-b border-slate-200 bg-white shadow-sm">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              <div className="flex items-start gap-3.5 rounded-2xl border border-slate-100 bg-slate-50/70 p-4 transition hover:bg-slate-50 hover:shadow-sm">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#0f2744]">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Comprehensive Streams</h3>
                  <p className="text-xs text-slate-600 mt-0.5">High School, Arts, Science, Commerce, Agriculture</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 rounded-2xl border border-slate-100 bg-slate-50/70 p-4 transition hover:bg-slate-50 hover:shadow-sm">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-[#c9a227]">
                  <Trophy className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">100% Pass Record</h3>
                  <p className="text-xs text-slate-600 mt-0.5">Verified UPMSP Board Result 2024 &amp; 2026</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 rounded-2xl border border-slate-100 bg-slate-50/70 p-4 transition hover:bg-slate-50 hover:shadow-sm">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Secure Campus</h3>
                  <p className="text-xs text-slate-600 mt-0.5">22 CCTV monitored rooms, safe rural environment</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 rounded-2xl border border-slate-100 bg-slate-50/70 p-4 transition hover:bg-slate-50 hover:shadow-sm">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Experienced Faculty</h3>
                  <p className="text-xs text-slate-600 mt-0.5">16+ dedicated teachers with up to 16 yrs experience</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 3: ABOUT & INSTITUTIONAL HERITAGE                */}
        {/* ========================================================= */}
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
                  S.K.R. INTER COLLEGE &amp; S.K.R. PVT ITI was established with a singular mission: to provide high-quality, disciplined, and accessible education to the youth of Udaypur Khalsa, Post Bhadrauli, Bah, Pinahat, and surrounding communities in Agra district.
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
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#0f2744] hover:text-[#1e3a5f] hover:underline"
                  >
                    Read Detailed Institutional History &amp; Profile
                    <ArrowRight className="h-4 w-4 text-[#c9a227]" />
                  </Link>
                </div>
              </div>

              {/* Institution Seal Card */}
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
                    <h3 className="text-xl font-bold text-[#0f2744] font-['Cinzel',serif]">
                      S.K.R. INTER COLLEGE
                    </h3>
                    <p className="text-xs font-semibold text-[#c9a227] uppercase tracking-wider">
                      &amp; S.K.R. Private ITI • Udaypur Khalsa
                    </p>
                  </div>
                  <p className="text-xs text-slate-500 max-w-sm italic">
                    &ldquo;विद्या ददाति विनयं, विनयाद् याति पात्रताम्&rdquo; — Dedicated to instilling knowledge, humility, and vocational capability in every student.
                  </p>

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

        {/* ========================================================= */}
        {/* SECTION 4: PRINCIPAL'S DESK                               */}
        {/* ========================================================= */}
        <section className="py-16 sm:py-20 bg-slate-50 border-y border-slate-200/80">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-white border border-slate-200/90 p-8 sm:p-12 shadow-sm">
              <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-4 flex flex-col items-center text-center">
                  <div className="h-44 w-44 rounded-2xl bg-gradient-to-tr from-[#0f2744] to-[#1e3a5f] p-1.5 shadow-md">
                    <div className="h-full w-full rounded-xl bg-slate-100 flex items-center justify-center overflow-hidden">
                      <div className="flex flex-col items-center justify-center text-[#0f2744] p-4">
                        <GraduationCap className="h-14 w-14 mb-2 text-[#c9a227]" />
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Principal Desk</span>
                      </div>
                    </div>
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-slate-900">Shri Uttam Singh Tyagi</h3>
                  <p className="text-xs font-semibold text-[#0f2744]">Principal &amp; Lecturer in Geography</p>
                  <p className="text-xs text-slate-500">16+ Years Experience • M.A., B.Ed.</p>
                  <a
                    href="tel:9719903732"
                    className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full hover:bg-emerald-100"
                  >
                    <Phone className="h-3 w-3" />
                    +91 9719903732
                  </a>
                </div>

                <div className="lg:col-span-8 space-y-4">
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#c9a227]">
                    <Sparkles className="h-3.5 w-3.5" />
                    MESSAGE FROM THE PRINCIPAL
                  </div>
                  <blockquote className="text-lg font-medium text-slate-800 leading-relaxed italic border-l-4 border-[#c9a227] pl-4">
                    &ldquo;At S.K.R. Inter College, our primary commitment is to shape young minds with strong moral foundations, disciplined study habits, and practical vocational readiness. We take immense pride in our students who consistently deliver 100% board results while upholding the cultural values of our community.&rdquo;
                  </blockquote>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    We welcome all parents and students to visit our campus, meet our dedicated teachers, and experience the learning environment we have cultivated over more than two decades in Bah, Pinahat, Agra.
                  </p>
                  <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-slate-700">
                    <span className="flex items-center gap-1.5">
                      <Check className="h-4 w-4 text-[#c9a227]" /> Individual Attention
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Check className="h-4 w-4 text-[#c9a227]" /> Regular Parent-Teacher Interaction
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Check className="h-4 w-4 text-[#c9a227]" /> Free Guidance for Competitive Exams
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 5: VERIFIED INSTITUTIONAL STATISTICS              */}
        {/* ========================================================= */}
        <section className="py-16 sm:py-20 bg-[#0f2744] text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl font-extrabold sm:text-3xl font-['Cinzel',serif]">
                Verified Institutional Metrics
              </h2>
              <p className="text-sm text-slate-300 mt-2">
                Official figures reported under UPMSP Pehchan Portal (Code: 011424) &amp; UDISE+ (09181302903)
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 text-center">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="text-4xl font-extrabold text-[#c9a227] font-['Cinzel',serif]">100%</div>
                <div className="mt-2 text-sm font-semibold text-white">High School Pass Rate</div>
                <div className="text-xs text-slate-400 mt-1">UP Board Exams 2024 &amp; 2026</div>
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

        {/* ========================================================= */}
        {/* SECTION 6: ACADEMIC PROGRAMMES & STREAMS                  */}
        {/* ========================================================= */}
        <section className="py-16 sm:py-20 bg-white" id="academics">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-[#c9a227]">
                CURRICULUM &amp; COURSES
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 sm:text-4xl font-['Cinzel',serif] mt-1">
                Academic Pathways from School to Career
              </h2>
              <p className="text-sm text-slate-600 mt-2">
                Recognized curricula designed for university eligibility and technical employment.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Card 1: High School */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md hover:border-[#0f2744]/30">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#0f2744] mb-4">
                  <BookOpen className="h-6 w-6" />
                </div>
                <span className="text-xs font-extrabold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full uppercase">
                  Class 9 &amp; 10
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-3">High School Curriculum</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Comprehensive UPMSP High School course covering Hindi, English, Mathematics, Science, Social Science, and optional Commerce or Computer studies.
                </p>
                <ul className="mt-4 space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
                  <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-600" /> Full board exam preparation</li>
                  <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-600" /> Hands-on science lab sessions</li>
                  <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-600" /> Continuous weekly tests</li>
                </ul>
              </div>

              {/* Card 2: Intermediate Arts */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md hover:border-[#0f2744]/30">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-[#c9a227] mb-4">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <span className="text-xs font-extrabold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full uppercase">
                  Class 11 &amp; 12
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-3">Humanities (Arts Stream)</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  In-depth study in Hindi, English, Geography, Civics, Sociology, and History taught by senior lecturers with over 15 years experience.
                </p>
                <ul className="mt-4 space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
                  <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-600" /> Ideal for Civil Services &amp; Law aspirants</li>
                  <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-600" /> Geography practical classes</li>
                  <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-600" /> Essay &amp; debate training</li>
                </ul>
              </div>

              {/* Card 3: Intermediate Science */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md hover:border-[#0f2744]/30">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 mb-4">
                  <Microscope className="h-6 w-6" />
                </div>
                <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full uppercase">
                  Class 11 &amp; 12
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-3">Science (PCB / PCM)</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Physics, Chemistry, Biology, and Mathematics with dedicated laboratory experiments preparing students for engineering, medicine, and research careers.
                </p>
                <ul className="mt-4 space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
                  <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-600" /> Well-equipped Science Laboratory</li>
                  <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-600" /> Experienced Physics &amp; Chemistry faculty</li>
                  <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-600" /> Practical record books &amp; viva prep</li>
                </ul>
              </div>

              {/* Card 4: Intermediate Agriculture */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md hover:border-[#0f2744]/30">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lime-50 text-lime-700 mb-4">
                  <Trees className="h-6 w-6" />
                </div>
                <span className="text-xs font-extrabold text-lime-700 bg-lime-50 px-2.5 py-1 rounded-full uppercase">
                  Class 11 &amp; 12
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-3">Agriculture (Part 1 &amp; 2)</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Specialized course in Agricultural Botany, Agronomy, Agricultural Chemistry, and Zoology tailored for modernization of rural farming and B.Sc. Ag admissions.
                </p>
                <ul className="mt-4 space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
                  <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-600" /> Agronomy and field crop studies</li>
                  <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-600" /> Soil health and horticulture training</li>
                  <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-600" /> High-demand regional specialization</li>
                </ul>
              </div>

              {/* Card 5: Intermediate Commerce */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md hover:border-[#0f2744]/30">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-700 mb-4">
                  <FileText className="h-6 w-6" />
                </div>
                <span className="text-xs font-extrabold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full uppercase">
                  Class 11 &amp; 12
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-3">Commerce Stream</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Accountancy, Business Studies, Banking, and Economics giving students foundational skills for B.Com, banking examinations, and business management.
                </p>
                <ul className="mt-4 space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
                  <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-600" /> Ledger &amp; balance sheet practice</li>
                  <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-600" /> Business organization &amp; finance basics</li>
                  <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-600" /> Computerized accounting overview</li>
                </ul>
              </div>

              {/* Card 6: S.K.R. Private ITI */}
              <div className="rounded-3xl border-2 border-[#c9a227] bg-amber-50/20 p-6 shadow-sm transition hover:shadow-md">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0f2744] text-[#c9a227] mb-4">
                  <Flame className="h-6 w-6" />
                </div>
                <span className="text-xs font-extrabold text-[#0f2744] bg-amber-300 px-2.5 py-1 rounded-full uppercase">
                  Technical Skill
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-3">S.K.R. Private ITI</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Certified industrial skill trades providing practical engineering, wiring, and mechanical competencies for direct industrial employment and self-reliance.
                </p>
                <ul className="mt-4 space-y-1.5 text-xs text-slate-600 border-t border-amber-200/60 pt-3">
                  <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-600" /> Practical workshop hands-on training</li>
                  <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-600" /> Job placement &amp; apprenticeship guidance</li>
                  <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-600" /> Dedicated workshop equipment</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 7: CAMPUS FACILITIES                              */}
        {/* ========================================================= */}
        <section className="py-16 sm:py-20 bg-slate-50 border-y border-slate-200/80">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-[#c9a227]">
                INFRASTRUCTURE &amp; AMENITIES
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 sm:text-4xl font-['Cinzel',serif] mt-1">
                Modern Campus Facilities
              </h2>
              <p className="text-sm text-slate-600 mt-2">
                A safe, hygienic, and resource-rich environment designed for complete holistic development.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6 text-center">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <Microscope className="h-8 w-8 mx-auto text-[#0f2744] mb-2" />
                <h4 className="font-bold text-slate-900 text-sm">Science Lab</h4>
                <p className="text-[11px] text-slate-500 mt-1">Physics &amp; Chemistry equipment</p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <Computer className="h-8 w-8 mx-auto text-[#0f2744] mb-2" />
                <h4 className="font-bold text-slate-900 text-sm">Computer Lab</h4>
                <p className="text-[11px] text-slate-500 mt-1">Broadband WiFi enabled</p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <Library className="h-8 w-8 mx-auto text-[#0f2744] mb-2" />
                <h4 className="font-bold text-slate-900 text-sm">Library</h4>
                <p className="text-[11px] text-slate-500 mt-1">NCERT books &amp; journals</p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <Trophy className="h-8 w-8 mx-auto text-[#0f2744] mb-2" />
                <h4 className="font-bold text-slate-900 text-sm">Playground</h4>
                <p className="text-[11px] text-slate-500 mt-1">Sports &amp; Athletics ground</p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <Shield className="h-8 w-8 mx-auto text-emerald-600 mb-2" />
                <h4 className="font-bold text-slate-900 text-sm">22 CCTV Units</h4>
                <p className="text-[11px] text-slate-500 mt-1">Full boundary security</p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <Building className="h-8 w-8 mx-auto text-[#c9a227] mb-2" />
                <h4 className="font-bold text-slate-900 text-sm">Power Backup</h4>
                <p className="text-[11px] text-slate-500 mt-1">Generator &amp; Safe water</p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 8: VERIFIED BOARD RESULTS (2020-2026)             */}
        {/* ========================================================= */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-[#c9a227]">
                UPMSP ACADEMIC RECORD
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 sm:text-4xl font-['Cinzel',serif] mt-1">
                Historical Board Examination Results
              </h2>
              <p className="text-sm text-slate-600 mt-2">
                Documented annual records submitted officially to Uttar Pradesh Madhyamik Shiksha Parishad.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              {/* Class 10 Board Results */}
              <div className="rounded-3xl border border-slate-200 bg-slate-50/50 p-6 sm:p-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-[#0f2744]">Class 10 (High School) Board Pass Rate</h3>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                    UP Board
                  </span>
                </div>
                <div className="space-y-3">
                  {highSchoolBoardResults.slice(-5).map((r) => (
                    <div key={r.year} className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold text-slate-700">
                        <span>Year {r.year} ({r.passed}/{r.appeared} Students Passed)</span>
                        <span className="font-bold text-[#0f2744]">{r.passPercent}%</span>
                      </div>
                      <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#0f2744] to-[#c9a227] rounded-full transition-all duration-700"
                          style={{ width: `${r.passPercent}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Class 12 Board Results */}
              <div className="rounded-3xl border border-slate-200 bg-slate-50/50 p-6 sm:p-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-[#0f2744]">Class 12 (Intermediate) Board Pass Rate</h3>
                  <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full">
                    UP Board
                  </span>
                </div>
                <div className="space-y-3">
                  {intermediateBoardResults.slice(-5).map((r) => (
                    <div key={r.year} className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold text-slate-700">
                        <span>Year {r.year} ({r.passed}/{r.appeared} Students Passed)</span>
                        <span className="font-bold text-[#0f2744]">{r.passPercent}%</span>
                      </div>
                      <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#1e3a5f] to-emerald-600 rounded-full transition-all duration-700"
                          style={{ width: `${r.passPercent}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 9: LATEST NOTICES & CIRCULARS                     */}
        {/* ========================================================= */}
        <section className="py-16 sm:py-20 bg-slate-50 border-y border-slate-200/80" id="notices">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#c9a227]">
                  OFFICIAL BULLETINS
                </span>
                <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl font-['Cinzel',serif] mt-1">
                  Latest Notices &amp; Announcements
                </h2>
              </div>
              <Link
                href="/notices"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0f2744] hover:underline"
              >
                View Notice Board Archive <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <span className="font-extrabold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
                    ADMISSIONS
                  </span>
                  <span>Session 2026–27</span>
                </div>
                <h3 className="font-bold text-slate-900 text-sm">
                  Admissions Open for Class 9, 10, 11 &amp; 12
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Direct admission enquiry form is open. Prospectus and subject selection guidance are available at the college administrative office.
                </p>
                <Link
                  href="/admissions"
                  className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#0f2744] hover:underline"
                >
                  Enquire Now <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <span className="font-extrabold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                    EXAMINATIONS
                  </span>
                  <span>Board Notice</span>
                </div>
                <h3 className="font-bold text-slate-900 text-sm">
                  UPMSP Board Exam Registration &amp; Roll Lists
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Students appearing for UP Board High School and Intermediate examinations can verify their examination forms and center allotments.
                </p>
                <Link
                  href="/notices"
                  className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#0f2744] hover:underline"
                >
                  Read Circular <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <span className="font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                    SCHOLARSHIP
                  </span>
                  <span>Govt Scheme</span>
                </div>
                <h3 className="font-bold text-slate-900 text-sm">
                  U.P. Post-Matric &amp; Pre-Matric Scholarship Forms
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Assistance provided in the computer lab for students applying for Uttar Pradesh government fee reimbursement and scholarship benefits.
                </p>
                <a
                  href="https://services.india.gov.in/service/detail/scholarship-and-fee-reimbursement-online-system-uttar-pradesh-1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:underline"
                >
                  Scholarship Portal <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 10: ONLINE ADMISSION ENQUIRY FORM                 */}
        {/* ========================================================= */}
        <section className="py-16 sm:py-20 bg-white" id="enquiry">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-amber-50/20 p-8 sm:p-12 shadow-sm">
              <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
                {/* Left Info Column */}
                <div className="lg:col-span-5 space-y-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#c9a227]">
                    ADMISSION PROCESS
                  </span>
                  <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl font-['Cinzel',serif]">
                    Apply for Admission (Session 2026–27)
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Submit your details online. Our admissions desk will contact you within 24–48 hours to confirm seat availability, documentation requirements, and fee details.
                  </p>

                  <div className="space-y-2 pt-2 text-xs text-slate-700">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      <span>Admissions for High School (Class 9 &amp; 10)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      <span>Intermediate Streams: Arts, Science, Commerce, Agriculture</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      <span>S.K.R. Private ITI Technical Trade Admissions</span>
                    </div>
                  </div>

                  <div className="pt-4 flex flex-col gap-2">
                    <a
                      href="https://wa.me/919837183726?text=Hello%20SKR%20Inter%20College,%20I%20would%20like%20to%20enquire%20about%20admissions."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-xs font-bold text-white shadow-sm hover:bg-emerald-700 transition"
                    >
                      <MessageSquare className="h-4 w-4" />
                      Enquire Directly on WhatsApp (+91 9837183726)
                    </a>
                  </div>
                </div>

                {/* Right Form Column */}
                <div className="lg:col-span-7">
                  {submitted ? (
                    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center space-y-3">
                      <CheckCircle2 className="h-12 w-12 text-emerald-600 mx-auto" />
                      <h3 className="text-lg font-bold text-emerald-900">Enquiry Submitted Successfully!</h3>
                      <p className="text-xs text-emerald-700 max-w-md mx-auto">
                        Thank you for your interest in S.K.R. Inter College &amp; PVT ITI. Our administration will contact you shortly on <strong>{form.mobile}</strong>.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setSubmitted(false);
                          setForm({
                            studentName: "",
                            parentName: "",
                            mobile: "",
                            className: "Class 9",
                            stream: "General",
                            address: "",
                            message: "",
                          });
                        }}
                        className="mt-2 text-xs font-bold text-emerald-800 underline"
                      >
                        Submit another enquiry
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleEnquirySubmit} className="space-y-4">
                      {errorMsg && (
                        <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700">
                          {errorMsg}
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Student Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Enter student's name"
                            value={form.studentName}
                            onChange={(e) => setForm({ ...form, studentName: e.target.value })}
                            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-[#0f2744] focus:outline-none focus:ring-1 focus:ring-[#0f2744]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Parent / Guardian Name *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Father/Mother name"
                            value={form.parentName}
                            onChange={(e) => setForm({ ...form, parentName: e.target.value })}
                            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-[#0f2744] focus:outline-none focus:ring-1 focus:ring-[#0f2744]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Mobile Contact Number *
                          </label>
                          <input
                            type="tel"
                            required
                            pattern="[0-9]{10}"
                            placeholder="10-digit number"
                            value={form.mobile}
                            onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-[#0f2744] focus:outline-none focus:ring-1 focus:ring-[#0f2744]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Class Applying For
                          </label>
                          <select
                            value={form.className}
                            onChange={(e) => setForm({ ...form, className: e.target.value })}
                            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs text-slate-900 focus:border-[#0f2744] focus:outline-none focus:ring-1 focus:ring-[#0f2744]"
                          >
                            <option value="Class 9">Class 9 (High School)</option>
                            <option value="Class 10">Class 10 (High School)</option>
                            <option value="Class 11">Class 11 (Intermediate)</option>
                            <option value="Class 12">Class 12 (Intermediate)</option>
                            <option value="ITI Electrician">ITI — Electrician</option>
                            <option value="ITI Fitter">ITI — Fitter / Technical</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Preferred Stream
                          </label>
                          <select
                            value={form.stream}
                            onChange={(e) => setForm({ ...form, stream: e.target.value })}
                            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs text-slate-900 focus:border-[#0f2744] focus:outline-none focus:ring-1 focus:ring-[#0f2744]"
                          >
                            <option value="General">General / High School</option>
                            <option value="Humanities (Arts)">Arts (Humanities)</option>
                            <option value="Science (PCB/PCM)">Science</option>
                            <option value="Commerce">Commerce</option>
                            <option value="Agriculture">Agriculture</option>
                            <option value="ITI Trade">ITI Trade</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Village / Address (Bah, Agra &amp; Surrounding)
                        </label>
                        <input
                          type="text"
                          placeholder="Village, Post, Tehsil"
                          value={form.address}
                          onChange={(e) => setForm({ ...form, address: e.target.value })}
                          className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-[#0f2744] focus:outline-none focus:ring-1 focus:ring-[#0f2744]"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0f2744] to-[#1e3a5f] py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md hover:from-[#1e3a5f] hover:to-[#2a4a73] transition disabled:opacity-70"
                      >
                        {submitting ? "Submitting Enquiry..." : "Submit Admission Enquiry"}
                        <Send className="h-3.5 w-3.5 text-[#c9a227]" />
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 11: CONTACT, LOCATION & DIRECTIONS               */}
        {/* ========================================================= */}
        <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200" id="contact">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#0f2744]">
                  <MapPin className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">Campus Address</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  S.K.R. INTER COLLEGE &amp; S.K.R. PVT ITI<br />
                  Udaypur Khalsa, Post Bhadrauli,<br />
                  Tehsil: Bah, Block: Pinahat,<br />
                  District: Agra, Uttar Pradesh – 283113
                </p>
                <div className="pt-2">
                  <a
                    href="https://maps.app.goo.gl/8XxfUuM4fMUAxzqd7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0f2744] hover:underline"
                  >
                    Open in Google Maps <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-[#c9a227]">
                  <Phone className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">Contact Helplines</h3>
                <div className="space-y-2 text-xs text-slate-600">
                  <div>
                    <span className="text-slate-400 block">General Admissions &amp; Enquiries:</span>
                    <a href="tel:9837183726" className="text-slate-900 font-bold hover:text-[#0f2744]">
                      +91 9837183726
                    </a>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Principal Desk (Shri Uttam Singh Tyagi):</span>
                    <a href="tel:9719903732" className="text-slate-900 font-bold hover:text-[#0f2744]">
                      +91 9719903732
                    </a>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                  <Clock className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">Office Hours</h3>
                <div className="space-y-1.5 text-xs text-slate-600">
                  <p><strong>Monday – Saturday:</strong> 08:00 AM – 03:00 PM</p>
                  <p><strong>Sundays &amp; State Holidays:</strong> Closed</p>
                  <p className="text-[11px] text-slate-400 pt-1">
                    Administrative inquiries and admissions documents are accepted during school working hours.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
