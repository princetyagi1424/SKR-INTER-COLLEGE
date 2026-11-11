"use client";

import Link from "next/link";
import {
  ArrowRight, Computer, Flame, GraduationCap, Library, Microscope, Shield, Trees, Trophy,
} from "lucide-react";
import {
  highSchoolBoardResults,
  intermediateBoardResults,
} from "@/data/upmsp";
import { homeCopy } from "@/lib/home-copy";

type Props = { locale: "en" | "hi" };

export function HomeAcademics({ locale }: Props) {
  const c = homeCopy(locale);
  return (
    <>
      <section className="py-16 sm:py-20 bg-white" id="academics">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#c9a227]">{c.curriculumCourses}</span>
            <h2 className="text-2xl font-extrabold text-slate-900 sm:text-4xl font-['Cinzel',serif] mt-1">
              {locale === "hi" ? "शैक्षणिक कार्यक्रम और धाराएँ" : "Academic Programmes & Streams"}
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              {locale === "hi"
                ? "हाई स्कूल, इण्टरमीडिएट (कला, विज्ञान, वाणिज्य, कृषि) और प्राइवेट आईटीआई तकनीकी ट्रेड्स एक ही परिसर में।"
                : "High School, Intermediate (Arts, Science, Commerce, Agriculture) and Private ITI technical trades under one campus."}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {["High School (9-10)", "Arts", "Science", "Commerce", "Agriculture", "Private ITI"].map((name) => (
              <div key={name} className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5 hover:shadow-sm transition">
                <GraduationCap className="h-6 w-6 text-[#c9a227] mb-2" />
                <h3 className="font-bold text-slate-900 text-sm">{name}</h3>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link href="/academics" className="inline-flex items-center gap-2 text-sm font-bold text-[#0f2744] hover:underline">
              {locale === "hi" ? "पूर्ण शैक्षणिक पृष्ठ देखें" : "Explore full academics page"}
              <ArrowRight className="h-4 w-4 text-[#c9a227]" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-slate-50 border-y border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#c9a227]">{locale === "hi" ? "परिसर" : "CAMPUS"}</span>
            <h2 className="text-2xl font-extrabold text-slate-900 sm:text-4xl font-['Cinzel',serif] mt-1">{c.campusFacilities}</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Library, title: locale === "hi" ? "पुस्तकालय" : "Library", desc: locale === "hi" ? "संदर्भ और पाठ्य पुस्तकें" : "Reference & textbooks" },
              { icon: Microscope, title: locale === "hi" ? "विज्ञान प्रयोगशाला" : "Science Lab", desc: locale === "hi" ? "व्यावहारिक प्रयोग" : "Hands-on experiments" },
              { icon: Computer, title: locale === "hi" ? "कंप्यूटर लैब" : "Computer Lab", desc: locale === "hi" ? "डिजिटल साक्षरता" : "Digital literacy" },
              { icon: Trees, title: locale === "hi" ? "खेल मैदान" : "Playground", desc: locale === "hi" ? "खेल और गतिविधियाँ" : "Sports & activities" },
              { icon: Shield, title: locale === "hi" ? "सीसीटीवी सुरक्षा" : "CCTV Security", desc: locale === "hi" ? "22 कमरे निगरानी" : "22 rooms monitored" },
              { icon: Flame, title: locale === "hi" ? "सुरक्षा व्यवस्था" : "Fire Safety", desc: locale === "hi" ? "आपातकालीन तैयारी" : "Emergency readiness" },
              { icon: Trophy, title: locale === "hi" ? "परिणाम रिकॉर्ड" : "Results Record", desc: locale === "hi" ? "100% उत्तीर्ण" : "100% pass record" },
              { icon: GraduationCap, title: locale === "hi" ? "आईटीआई विंग" : "ITI Wing", desc: locale === "hi" ? "व्यावसायिक ट्रेड्स" : "Vocational trades" },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <item.icon className="h-6 w-6 text-[#c9a227] mb-2" />
                <h3 className="font-bold text-slate-900 text-sm">{item.title}</h3>
                <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#c9a227]">{c.upmspAcademicRecord}</span>
            <h2 className="text-2xl font-extrabold text-slate-900 sm:text-4xl font-['Cinzel',serif] mt-1">
              {locale === "hi" ? "सत्यापित बोर्ड परिणाम (2020–2026)" : "Verified Board Results (2020–2026)"}
            </h2>
          </div>
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 overflow-hidden">
              <div className="bg-[#0f2744] text-white px-4 py-3 font-bold text-sm">
                {locale === "hi" ? "कक्षा 10 (हाई स्कूल)" : "Class 10 (High School)"}
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 text-slate-600">
                    <tr>
                      <th className="px-3 py-2">Year</th>
                      <th className="px-3 py-2">Appeared</th>
                      <th className="px-3 py-2">Passed</th>
                      <th className="px-3 py-2">%</th>
                    </tr>
                  </thead>
                  <tbody>
                    {highSchoolBoardResults.map((r) => (
                      <tr key={r.year} className="border-t border-slate-100">
                        <td className="px-3 py-2 font-semibold">{r.year}</td>
                        <td className="px-3 py-2">{r.appeared}</td>
                        <td className="px-3 py-2">{r.passed}</td>
                        <td className="px-3 py-2 text-emerald-700 font-bold">{r.passPercent}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 overflow-hidden">
              <div className="bg-[#0f2744] text-white px-4 py-3 font-bold text-sm">
                {locale === "hi" ? "कक्षा 12 (इण्टरमीडिएट)" : "Class 12 (Intermediate)"}
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 text-slate-600">
                    <tr>
                      <th className="px-3 py-2">Year</th>
                      <th className="px-3 py-2">Appeared</th>
                      <th className="px-3 py-2">Passed</th>
                      <th className="px-3 py-2">%</th>
                    </tr>
                  </thead>
                  <tbody>
                    {intermediateBoardResults.map((r) => (
                      <tr key={r.year} className="border-t border-slate-100">
                        <td className="px-3 py-2 font-semibold">{r.year}</td>
                        <td className="px-3 py-2">{r.appeared}</td>
                        <td className="px-3 py-2">{r.passed}</td>
                        <td className="px-3 py-2 text-emerald-700 font-bold">{r.passPercent}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#c9a227]">{locale === "hi" ? "अपडेट" : "UPDATES"}</span>
              <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl font-['Cinzel',serif] mt-1">{c.latestNotices}</h2>
            </div>
            <Link href="/notices" className="text-sm font-bold text-[#c8102e] hover:underline">{c.viewAllNotices}</Link>
          </div>
          <p className="text-sm text-slate-600">
            {locale === "hi"
              ? "नवीनतम सूचनाओं के लिए नोटिस पेज देखें।"
              : "Visit the notices page for the latest circulars and updates."}
          </p>
        </div>
      </section>
    </>
  );
}
