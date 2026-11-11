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

export function HomeView() {
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
        {/* SECTION 1: HERO */}
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
                  <span className="block font-['Cinzel',serif] text-white">
                    {locale === "hi" ? "युवा मनों को सशक्त बनाना," : "Empowering Young Minds,"}
                  </span>
                  <span className="block bg-gradient-to-r from-amber-300 via-[#e0c04a] to-amber-200 bg-clip-text text-transparent">
                    {locale === "hi" ? "कल का निर्माण।" : "Building Tomorrow."}
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
                    {locale === "hi" ? "प्रवेश पूछताछ" : "Admission Enquiry"}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <a
                    href="#campus"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
                  >
                    {locale === "hi" ? "कैंपस देखें" : "Explore Campus"}
                  </a>
                  <Link
                    href="/login"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-transparent px-4 py-3.5 text-sm font-medium text-slate-300 transition hover:text-white"
                  >
                    <GraduationCap className="h-4 w-4 text-[#c9a227]" />
                    {locale === "hi" ? "विद्यार्थी / स्टाफ पोर्टल" : "Student / Staff Portal"}
                  </Link>
                </div>

                <div className="pt-4 grid grid-cols-3 gap-3 border-t border-white/10 text-xs text-slate-300">
                  <div>
                    <div className="font-extrabold text-white text-base">2004 / 2011</div>
                    <div className="text-slate-400">{locale === "hi" ? "हाई स्कूल एवं इंटर मान्यता" : "HS & Inter Recog."}</div>
                  </div>
                  <div>
                    <div className="font-extrabold text-amber-300 text-base">100% Pass</div>
                    <div className="text-slate-400">{locale === "hi" ? "बोर्ड परीक्षा रिकॉर्ड" : "Board Exam Record"}</div>
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
                    <img
                      src="/images/campus-gate.jpg"
                      alt="S.K.R. Inter College Campus"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <div className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                        {locale === "hi" ? "मुख्य कैंपस गेट" : "Main Campus Gate"}
                      </div>
                      <div className="text-sm font-semibold truncate">
                        एस.के.आर. इण्टर कॉलेज, उदयपुर (खालसा) बाह (आगरा)
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="rounded-xl bg-white/10 p-2.5">
                      <div className="font-bold text-amber-300 text-sm">UP Board</div>
                      <div className="text-[10px] text-slate-300">{locale === "hi" ? "संबद्धता" : "Affiliation"}</div>
                    </div>
                    <div className="rounded-xl bg-white/10 p-2.5">
                      <div className="font-bold text-white text-sm">PVT ITI</div>
                      <div className="text-[10px] text-slate-300">{locale === "hi" ? "तकनीकी कौशल" : "Technical Skill"}</div>
                    </div>
                    <div className="rounded-xl bg-white/10 p-2.5">
                      <div className="font-bold text-emerald-400 text-sm">Grade A</div>
                      <div className="text-[10px] text-slate-300">{locale === "hi" ? "पहचान रैंक" : "Pehchan Rank"}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: PILLARS */}
        <section className="border-b border-slate-200 bg-white shadow-sm">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              <div className="flex items-start gap-3.5 rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#0f2744]">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{locale === "hi" ? "व्यापक धाराएँ" : "Comprehensive Streams"}</h3>
                  <p className="text-xs text-slate-600 mt-0.5">{locale === "hi" ? "हाई स्कूल, कला, विज्ञान, वाणिज्य, कृषि" : "High School, Arts, Science, Commerce, Agriculture"}</p>
                </div>
              </div>
              <div className="flex items-start gap-3.5 rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-[#c9a227]">
                  <Trophy className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{locale === "hi" ? "100% उत्तीर्ण रिकॉर्ड" : "100% Pass Record"}</h3>
                  <p className="text-xs text-slate-600 mt-0.5">UPMSP Board Result</p>
                </div>
              </div>
              <div className="flex items-start gap-3.5 rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{locale === "hi" ? "सुरक्षित कैंपस" : "Secure Campus"}</h3>
                  <p className="text-xs text-slate-600 mt-0.5">{locale === "hi" ? "22 सीसीटीवी मॉनिटर्ड कक्ष" : "22 CCTV monitored rooms"}</p>
                </div>
              </div>
              <div className="flex items-start gap-3.5 rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{locale === "hi" ? "अनुभवी संकाय" : "Experienced Faculty"}</h3>
                  <p className="text-xs text-slate-600 mt-0.5">{locale === "hi" ? "16+ समर्पित शिक्षक" : "16+ dedicated teachers"}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: ABOUT */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="space-y-5">
                <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-[#0f2744]">
                  <Building className="h-3.5 w-3.5 text-[#c9a227]" />
                  {locale === "hi" ? "संस्थान के बारे में" : "ABOUT THE INSTITUTION"}
                </div>
                <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-4xl font-['Cinzel',serif]">
                  {locale === "hi"
                    ? "ग्रामीण आगरा में मूल्य-आधारित शिक्षा की विरासत"
                    : "A Legacy of Value-Based Education in Rural Agra"}
                </h2>
                <p className="text-base text-slate-600 leading-relaxed">
                  {locale === "hi"
                    ? "एस.के.आर. इंटर कॉलेज एवं प्राइवेट आईटीआई उदयपुर खालसा, पोस्ट भदरौली, बाह, पिनाहट, आगरा में स्थित है। संस्थान आसपास के ग्रामीण समुदायों के विद्यार्थियों को सुलभ, मूल्य-आधारित शिक्षा देने के लिए प्रतिबद्ध है।"
                    : "S.K.R. INTER COLLEGE & S.K.R. PVT ITI was established with a singular mission: to provide high-quality, disciplined, and accessible education to the youth of Udaypur Khalsa, Post Bhadrauli, Bah, Pinahat, and surrounding communities in Agra district."}
                </p>
                <p className="text-base text-slate-600 leading-relaxed">
                  {locale === "hi"
                    ? "उत्तर प्रदेश माध्यमिक शिक्षा परिषद द्वारा मान्यता प्राप्त (हाई स्कूल 2004, इंटरमीडिएट 2011)। संस्थान शैक्षणिक पाठ्यक्रम के साथ प्राइवेट आईटीआई के माध्यम से व्यावसायिक प्रशिक्षण भी देता है।"
                    : "Recognized by the Uttar Pradesh Madhyamik Shiksha Parishad (High School recognition in 2004, Intermediate in 2011), the institution blends rigorous academic curricula with practical vocational training through its Private ITI wing."}
                </p>
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3 text-sm text-slate-700">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                    <span><strong>UPMSP:</strong> 011424 · DIOS Agra</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-700">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                    <span><strong>UDISE:</strong> 09181302903 · Block Pinahat, Tehsil Bah</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-700">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                    <span>{locale === "hi" ? "हाई स्कूल + इंटर + आईटीआई एकीकृत कैंपस" : "Integrated campus: High School + Intermediate + ITI"}</span>
                  </div>
                </div>
                <div className="pt-4">
                  <Link href="/about" className="inline-flex items-center gap-2 text-sm font-bold text-[#0f2744] hover:underline">
                    {locale === "hi" ? "विस्तृत प्रोफ़ाइल पढ़ें" : "Read Detailed Institutional Profile"}
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
                    <p className="text-xs font-semibold text-[#c9a227] uppercase tracking-wider">& S.K.R. Private ITI · Udaypur Khalsa</p>
                  </div>
                  <p className="text-xs text-slate-500 max-w-sm italic">
                    &ldquo;विद्या ददाति विनयं, विनयाद् याति पात्रताम्&rdquo;
                  </p>
                  <div className="w-full pt-4 border-t border-slate-200/80 grid grid-cols-2 gap-4 text-left text-xs">
                    <div>
                      <span className="text-slate-400 block">{locale === "hi" ? "मैनेजर:" : "Manager:"}</span>
                      <strong className="text-slate-800 text-sm">Shri Omveer Tyagi</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">{locale === "hi" ? "प्रधानाचार्य:" : "Principal:"}</span>
                      <strong className="text-slate-800 text-sm">Shri Uttam Singh Tyagi</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: PRINCIPAL */}
        <section className="py-16 sm:py-20 bg-slate-50 border-y border-slate-200/80">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm">
              <div className="flex flex-col gap-6 md:flex-row md:items-start">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#0f2744] text-amber-300">
                  <MessageSquare className="h-7 w-7" />
                </div>
                <div className="flex-1 space-y-3">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c9a227]">
                    {locale === "hi" ? "प्रधानाचार्य डेस्क" : "Principal's Desk"}
                  </p>
                  <h2 className="text-2xl font-extrabold text-slate-900">Shri Uttam Singh Tyagi</h2>
                  <p className="text-sm leading-7 text-slate-600 max-w-3xl">
                    {locale === "hi"
                      ? "हमारा लक्ष्य प्रत्येक विद्यार्थी को अनुशासन, ज्ञान और व्यावसायिक कौशल से सशक्त बनाना है, ताकि वे समाज और राष्ट्र की सेवा कर सकें। ग्रामीण पृष्ठभूमि के बच्चों को गुणवत्तापूर्ण शिक्षा उपलब्ध कराना हमारी प्राथमिकता है।"
                      : "Our goal is to empower every student with discipline, knowledge and vocational skill so they can serve society and the nation. Providing quality education to children from rural backgrounds remains our priority."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: STATS */}
        <section className="py-16 sm:py-20 bg-[#0f2744] text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
              {[
                { v: "2004", l: locale === "hi" ? "हाई स्कूल मान्यता" : "HS Recognition" },
                { v: "2011", l: locale === "hi" ? "इंटर मान्यता" : "Inter Recognition" },
                { v: "100%", l: locale === "hi" ? "बोर्ड उत्तीर्ण" : "Board Pass Rate" },
                { v: "22+", l: locale === "hi" ? "कक्षा / कक्ष" : "Teaching Rooms" },
              ].map((s) => (
                <div key={s.l} className="text-center">
                  <div className="text-3xl font-extrabold text-amber-300 sm:text-4xl">{s.v}</div>
                  <div className="mt-1 text-xs text-slate-300 sm:text-sm">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 6: ACADEMICS */}
        <section className="py-16 sm:py-20 bg-white" id="academics">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c8102e]">{locale === "hi" ? "अकादमिक" : "Academics"}</p>
            <h2 className="mt-2 text-2xl font-extrabold text-slate-900 sm:text-3xl">
              {locale === "hi" ? "शैक्षणिक धाराएँ एवं कार्यक्रम" : "Academic Streams & Programmes"}
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { t: locale === "hi" ? "हाई स्कूल (कक्षा 9–10)" : "High School (Class 9–10)", d: locale === "hi" ? "यूपी बोर्ड पाठ्यक्रम" : "UP Board curriculum" },
                { t: locale === "hi" ? "कला (मानविकी)" : "Arts (Humanities)", d: locale === "hi" ? "इंटरमीडिएट" : "Intermediate" },
                { t: locale === "hi" ? "विज्ञान (पीसीबी / पीसीएम)" : "Science (PCB / PCM)", d: locale === "hi" ? "इंटरमीडिएट" : "Intermediate" },
                { t: locale === "hi" ? "वाणिज्य" : "Commerce", d: locale === "hi" ? "इंटरमीडिएट" : "Intermediate" },
                { t: locale === "hi" ? "कृषि" : "Agriculture", d: locale === "hi" ? "भाग 1 एवं 2" : "Part 1 & 2" },
                { t: locale === "hi" ? "प्राइवेट आईटीआई" : "Private ITI", d: locale === "hi" ? "तकनीकी ट्रेड" : "Technical trades" },
              ].map((c) => (
                <div key={c.t} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <div className="font-bold text-slate-900">{c.t}</div>
                  <div className="mt-1 text-xs text-slate-500">{c.d}</div>
                </div>
              ))}
            </div>
            <Link href="/academics" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#0f2744] hover:underline">
              {locale === "hi" ? "अकादमिक विवरण देखें" : "Explore academics"} <ArrowRight className="h-4 w-4 text-[#c9a227]" />
            </Link>
          </div>
        </section>

        {/* SECTION 7: FACILITIES */}
        <section className="py-16 sm:py-20 bg-slate-50 border-y border-slate-200/80">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-extrabold text-slate-900">{locale === "hi" ? "कैंपस सुविधाएँ" : "Campus Facilities"}</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: Computer, t: locale === "hi" ? "कंप्यूटर लैब" : "Computer Lab", d: locale === "hi" ? "ब्रॉडबैंड वाई‑फाई" : "Broadband WiFi" },
                { icon: Library, t: locale === "hi" ? "पुस्तकालय" : "Library", d: locale === "hi" ? "एनसीईआरटी पुस्तकें" : "NCERT books & journals" },
                { icon: Microscope, t: locale === "hi" ? "विज्ञान प्रयोगशाला" : "Science Lab", d: locale === "hi" ? "उपलब्ध" : "Available" },
                { icon: Trees, t: locale === "hi" ? "खेल का मैदान" : "Playground", d: locale === "hi" ? "खेल एवं एथलेटिक्स" : "Sports & athletics" },
                { icon: Shield, t: locale === "hi" ? "सीसीटीवी सुरक्षा" : "CCTV Security", d: locale === "hi" ? "पूर्ण कैंपस कवरेज" : "Full campus coverage" },
                { icon: Flame, t: locale === "hi" ? "पावर बैकअप" : "Power Backup", d: locale === "hi" ? "जेनरेटर एवं सुरक्षित जल" : "Generator & safe water" },
              ].map((f) => (
                <div key={f.t} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-[#c9a227]">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">{f.t}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{f.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 8: BOARD RESULTS */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-extrabold text-slate-900">{locale === "hi" ? "बोर्ड परिणाम" : "Board Results"}</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 p-6">
                <h3 className="font-bold text-[#0f2744]">{locale === "hi" ? "कक्षा 10 (हाई स्कूल)" : "Class 10 (High School)"}</h3>
                <p className="mt-2 text-3xl font-extrabold text-emerald-600">100%</p>
                <p className="text-xs text-slate-500 mt-1">UPMSP verified pass rate</p>
              </div>
              <div className="rounded-2xl border border-slate-200 p-6">
                <h3 className="font-bold text-[#0f2744]">{locale === "hi" ? "कक्षा 12 (इंटरमीडिएट)" : "Class 12 (Intermediate)"}</h3>
                <p className="mt-2 text-3xl font-extrabold text-emerald-600">100%</p>
                <p className="text-xs text-slate-500 mt-1">UPMSP verified pass rate</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: NOTICES TEASER */}
        <section className="py-16 sm:py-20 bg-slate-50 border-y border-slate-200/80" id="notices">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900">{locale === "hi" ? "नवीनतम सूचनाएँ" : "Latest Notices"}</h2>
                <p className="mt-1 text-sm text-slate-600">{locale === "hi" ? "आधिकारिक परिपत्र एवं घोषणाएँ" : "Official circulars and announcements"}</p>
              </div>
              <Link href="/notices" className="text-sm font-bold text-[#c8102e] hover:underline">
                {locale === "hi" ? "सभी सूचनाएँ देखें" : "View all notices"}
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION 10: ENQUIRY FORM */}
        <section className="py-16 sm:py-20 bg-white" id="enquiry">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">{locale === "hi" ? "ऑनलाइन प्रवेश पूछताछ" : "Online Admission Enquiry"}</h2>
              <p className="mt-2 text-sm text-slate-600">
                {locale === "hi"
                  ? "फॉर्म भरें — कार्यालय दिए गए मोबाइल पर संपर्क करेगा।"
                  : "Fill the form — the office will contact you on the mobile number provided."}
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                <li className="flex gap-2"><Check className="h-4 w-4 text-emerald-600 mt-0.5" /> {locale === "hi" ? "हाई स्कूल (कक्षा 9–10)" : "High School (Class 9–10)"}</li>
                <li className="flex gap-2"><Check className="h-4 w-4 text-emerald-600 mt-0.5" /> {locale === "hi" ? "इंटर: कला, विज्ञान, वाणिज्य, कृषि" : "Inter: Arts, Science, Commerce, Agriculture"}</li>
                <li className="flex gap-2"><Check className="h-4 w-4 text-emerald-600 mt-0.5" /> {locale === "hi" ? "प्राइवेट आईटीआई ट्रेड" : "Private ITI trades"}</li>
              </ul>
              <div className="mt-6 space-y-2 text-sm">
                <div className="flex items-start gap-2"><MapPin className="h-4 w-4 text-[#c9a227] mt-0.5" /><span>Udaypur Khalsa, Post Bhadrauli, Bah, Pinahat, Agra — 283113</span></div>
                <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-[#c9a227]" /><a href="tel:9837183726" className="font-semibold hover:underline">9837183726</a></div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
              {submitted ? (
                <div className="text-center py-10">
                  <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-600" />
                  <h3 className="mt-3 text-lg font-bold text-emerald-800">{locale === "hi" ? "पूछताछ सफलतापूर्वक जमा!" : "Enquiry Submitted Successfully!"}</h3>
                  <p className="mt-2 text-sm text-slate-600">{locale === "hi" ? "स्कूल शीघ्र संपर्क करेगा।" : "The school will contact you soon."}</p>
                </div>
              ) : (
                <form onSubmit={handleEnquirySubmit} className="space-y-3">
                  {errorMsg && <div className="rounded-xl bg-red-50 border border-red-200 px-3 py-2 text-xs text-red-700">{errorMsg}</div>}
                  <input required value={form.studentName} onChange={(e) => setForm({ ...form, studentName: e.target.value })} placeholder={locale === "hi" ? "विद्यार्थी का नाम" : "Student name"} className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm" />
                  <input required value={form.parentName} onChange={(e) => setForm({ ...form, parentName: e.target.value })} placeholder={locale === "hi" ? "अभिभावक का नाम" : "Parent / guardian name"} className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm" />
                  <input required value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} placeholder={locale === "hi" ? "मोबाइल नंबर" : "Mobile number"} className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm" />
                  <select value={form.className} onChange={(e) => setForm({ ...form, className: e.target.value })} className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm">
                    <option value="Class 9">{locale === "hi" ? "कक्षा 9" : "Class 9"}</option>
                    <option value="Class 10">{locale === "hi" ? "कक्षा 10" : "Class 10"}</option>
                    <option value="Class 11">{locale === "hi" ? "कक्षा 11" : "Class 11"}</option>
                    <option value="Class 12">{locale === "hi" ? "कक्षा 12" : "Class 12"}</option>
                    <option value="ITI">ITI</option>
                  </select>
                  <select value={form.stream} onChange={(e) => setForm({ ...form, stream: e.target.value })} className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm">
                    <option value="General">{locale === "hi" ? "सामान्य" : "General"}</option>
                    <option value="Humanities (Arts)">{locale === "hi" ? "कला" : "Arts"}</option>
                    <option value="Science (PCB/PCM)">{locale === "hi" ? "विज्ञान" : "Science"}</option>
                    <option value="Commerce">{locale === "hi" ? "वाणिज्य" : "Commerce"}</option>
                    <option value="Agriculture">{locale === "hi" ? "कृषि" : "Agriculture"}</option>
                  </select>
                  <input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder={locale === "hi" ? "पता / गाँव" : "Address / village"} className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm" />
                  <button type="submit" disabled={submitting} className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#c8102e] py-3 text-sm font-bold text-white disabled:opacity-60">
                    <Send className="h-4 w-4" />
                    {submitting ? (locale === "hi" ? "भेजा जा रहा है..." : "Submitting...") : (locale === "hi" ? "पूछताछ जमा करें" : "Submit Enquiry")}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* SECTION 11: CONTACT */}
        <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200" id="contact">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-extrabold text-slate-900">{locale === "hi" ? "संपर्क" : "Contact"}</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <MapPin className="h-5 w-5 text-[#c9a227]" />
                <div className="mt-2 font-bold text-slate-900">{locale === "hi" ? "पता" : "Address"}</div>
                <p className="mt-1 text-sm text-slate-600">Udaypur Khalsa, Post Bhadrauli, Bah, Pinahat, Agra — 283113</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <Phone className="h-5 w-5 text-[#c9a227]" />
                <div className="mt-2 font-bold text-slate-900">{locale === "hi" ? "फ़ोन" : "Phone"}</div>
                <a href="tel:9837183726" className="mt-1 block text-sm font-semibold text-[#c8102e] hover:underline">9837183726</a>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <Clock className="h-5 w-5 text-[#c9a227]" />
                <div className="mt-2 font-bold text-slate-900">{locale === "hi" ? "कार्यालय समय" : "Office hours"}</div>
                <p className="mt-1 text-sm text-slate-600">{locale === "hi" ? "सोम–शनि 9:00–3:00 · रविवार बंद" : "Mon–Sat 9:00–3:00 · Sunday closed"}</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
