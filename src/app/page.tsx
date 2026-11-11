"use client";

import Link from "next/link";
import { useState } from "react";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import {
  BookOpen,
  GraduationCap,
  ArrowRight,
  Phone,
  MapPin,
  Shield,
  Users,
  Trophy,
  Send,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function HomePage() {
  const { t } = useLanguage();
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
      if (res.ok) setSubmitted(true);
      else {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data.error || t("enquiryFailed"));
      }
    } catch {
      setErrorMsg(t("networkError"));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#fafaf9] text-slate-800">
      <PublicHeader />
      <main className="flex-1">
        <section className="relative overflow-hidden bg-gradient-to-b from-[#0f2744] via-[#16355d] to-[#0f2744] text-white pt-8 pb-16 sm:py-20">
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-12">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex flex-wrap items-center gap-2 rounded-full border border-amber-400/30 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-amber-200">
                  <span className="flex h-2 w-2 rounded-full bg-[#c9a227] animate-pulse" />
                  <span>UPMSP: 011424</span>
                  <span className="text-white/40">•</span>
                  <span>UDISE: 09181302903</span>
                </div>
                <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl leading-[1.15]">
                  <span className="block font-['Cinzel',serif]">{t("heroLine1")}</span>
                  <span className="block bg-gradient-to-r from-amber-300 via-[#e0c04a] to-amber-200 bg-clip-text text-transparent">
                    {t("heroLine2")}
                  </span>
                </h1>
                <p className="max-w-2xl text-base text-slate-200/90 leading-relaxed sm:text-lg">{t("heroDesc")}</p>
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href="#enquiry"
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#c9a227] to-[#e0c04a] px-6 py-3.5 text-sm font-bold text-[#0f2744] shadow-lg"
                  >
                    {t("admissionEnquiry")}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <Link
                    href="/login"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white"
                  >
                    <GraduationCap className="h-4 w-4 text-[#c9a227]" />
                    {t("login")}
                  </Link>
                </div>
                <div className="pt-4 grid grid-cols-3 gap-3 border-t border-white/10 text-xs text-slate-300">
                  <div>
                    <div className="font-extrabold text-white text-base">2004 / 2011</div>
                    <div className="text-slate-400">{t("hsRecog")}</div>
                  </div>
                  <div>
                    <div className="font-extrabold text-amber-300 text-base">100%</div>
                    <div className="text-slate-400">{t("boardExamRecord")}</div>
                  </div>
                  <div>
                    <div className="font-extrabold text-white text-base">22</div>
                    <div className="text-slate-400">CCTV</div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-5">
                <div className="relative mx-auto max-w-md rounded-3xl border border-white/15 bg-white/10 p-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/campus-gate.jpg"
                    alt={t("mainCampusGate")}
                    className="h-full w-full rounded-2xl object-cover aspect-[4/3]"
                  />
                  <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="rounded-xl bg-white/10 p-2.5">
                      <div className="font-bold text-amber-300 text-sm">UP Board</div>
                      <div className="text-[10px] text-slate-300">{t("affiliation")}</div>
                    </div>
                    <div className="rounded-xl bg-white/10 p-2.5">
                      <div className="font-bold text-white text-sm">PVT ITI</div>
                      <div className="text-[10px] text-slate-300">{t("technicalSkill")}</div>
                    </div>
                    <div className="rounded-xl bg-white/10 p-2.5">
                      <div className="font-bold text-emerald-400 text-sm">Grade A</div>
                      <div className="text-[10px] text-slate-300">{t("pehchanRank")}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-white py-8">
          <div className="mx-auto max-w-7xl px-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {[
              { icon: BookOpen, title: t("qualityEducation"), desc: t("qualityEducationDesc") },
              { icon: Trophy, title: t("boardResults"), desc: "100% UPMSP" },
              { icon: Shield, title: t("security"), desc: t("securityDesc") },
              { icon: Users, title: t("skilledFaculty"), desc: t("skilledFacultyDesc") },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#0f2744]">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{item.title}</h3>
                  <p className="text-xs text-slate-600 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-14 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c8102e]">{t("about")}</p>
            <h2 className="mt-2 text-2xl font-extrabold text-slate-900 sm:text-3xl">{t("aboutInstitution")}</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">{t("qualityEdu")}</p>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600">{t("programmes")}</p>
            <Link href="/about" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#0f2744] hover:underline">
              {t("learnMore")} <ArrowRight className="h-4 w-4 text-[#c9a227]" />
            </Link>
          </div>
        </section>

        <section className="py-12 bg-[#fff8f0]">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="text-xl font-bold text-slate-900 mb-4">{t("facilitiesTitle")}</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 text-sm">
              <div className="rounded-2xl border border-[#efe6dc] bg-white p-4">
                <div className="font-bold">{t("computerLabTitle")}</div>
                <div className="text-xs text-slate-500 mt-1">{t("computerLabDesc")}</div>
              </div>
              <div className="rounded-2xl border border-[#efe6dc] bg-white p-4">
                <div className="font-bold">{t("libraryAvailable")}</div>
                <div className="text-xs text-slate-500 mt-1">{t("libraryDesc")}</div>
              </div>
              <div className="rounded-2xl border border-[#efe6dc] bg-white p-4">
                <div className="font-bold">{t("playground")}</div>
                <div className="text-xs text-slate-500 mt-1">{t("playgroundDesc")}</div>
              </div>
              <div className="rounded-2xl border border-[#efe6dc] bg-white p-4">
                <div className="font-bold">{t("powerBackup")}</div>
                <div className="text-xs text-slate-500 mt-1">{t("powerBackupDesc")}</div>
              </div>
              <div className="rounded-2xl border border-[#efe6dc] bg-white p-4">
                <div className="font-bold">{t("security")}</div>
                <div className="text-xs text-slate-500 mt-1">{t("securityDesc")}</div>
              </div>
              <div className="rounded-2xl border border-[#efe6dc] bg-white p-4">
                <div className="font-bold">{t("scienceLab")}</div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="text-xl font-bold text-slate-900 mb-4">{t("boardResults")}</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 p-5">
                <h3 className="font-bold text-[#0f2744]">{t("class10Pass")}</h3>
                <p className="mt-2 text-2xl font-extrabold text-emerald-600">100%</p>
              </div>
              <div className="rounded-2xl border border-slate-200 p-5">
                <h3 className="font-bold text-[#0f2744]">{t("class12Pass")}</h3>
                <p className="mt-2 text-2xl font-extrabold text-emerald-600">100%</p>
              </div>
            </div>
            <Link href="/notices" className="mt-4 inline-block text-sm font-semibold text-[#c8102e] hover:underline">
              {t("viewAllNotices")}
            </Link>
          </div>
        </section>

        <section id="enquiry" className="py-14 bg-[#0f2744] text-white">
          <div className="mx-auto max-w-7xl px-4 grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-extrabold">{t("onlineAdmission")}</h2>
              <p className="mt-2 text-sm text-slate-300">{t("admissionsPageDesc")}</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-200">
                <li>• {t("admissionsOpenHs")}</li>
                <li>• {t("admissionsOpenInter")}</li>
                <li>• {t("itiTrades")}</li>
              </ul>
              <div className="mt-6 space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-[#c9a227] mt-0.5" />
                  <span>{t("address")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-[#c9a227]" />
                  <a href="tel:9837183726" className="hover:underline">9837183726</a>
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-6 text-slate-800 shadow-xl">
              {submitted ? (
                <div className="text-center py-8">
                  <h3 className="text-lg font-bold text-emerald-800">{t("enquirySuccessTitle")}</h3>
                  <p className="mt-2 text-sm text-slate-600">{t("enquirySuccess")}</p>
                </div>
              ) : (
                <form onSubmit={handleEnquirySubmit} className="space-y-3">
                  {errorMsg && (
                    <div className="rounded-xl bg-red-50 border border-red-200 px-3 py-2 text-xs text-red-700">{errorMsg}</div>
                  )}
                  <input
                    required
                    value={form.studentName}
                    onChange={(e) => setForm({ ...form, studentName: e.target.value })}
                    placeholder={t("studentNamePh")}
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm"
                  />
                  <input
                    required
                    value={form.parentName}
                    onChange={(e) => setForm({ ...form, parentName: e.target.value })}
                    placeholder={t("parentNamePh")}
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm"
                  />
                  <input
                    required
                    value={form.mobile}
                    onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                    placeholder={t("mobileNumber")}
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm"
                  />
                  <select
                    value={form.className}
                    onChange={(e) => setForm({ ...form, className: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm"
                  >
                    <option value="Class 9">{t("class9")}</option>
                    <option value="Class 10">{t("class10")}</option>
                    <option value="Class 11">{t("class11")}</option>
                    <option value="Class 12">{t("class12")}</option>
                    <option value="ITI Electrician">{t("itiElectrician")}</option>
                    <option value="ITI Fitter">{t("itiFitter")}</option>
                  </select>
                  <select
                    value={form.stream}
                    onChange={(e) => setForm({ ...form, stream: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm"
                  >
                    <option value="General">{t("streamGeneral")}</option>
                    <option value="Humanities (Arts)">{t("streamArts")}</option>
                    <option value="Science (PCB/PCM)">{t("streamScienceOpt")}</option>
                    <option value="Commerce">{t("streamCommerce")}</option>
                    <option value="Agriculture">{t("streamAgriculture")}</option>
                  </select>
                  <input
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    placeholder={t("addressPh")}
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm"
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#c8102e] py-3 text-sm font-bold text-white disabled:opacity-60"
                  >
                    <Send className="h-4 w-4" />
                    {submitting ? t("submittingEnquiry") : t("submitEnquiry")}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
