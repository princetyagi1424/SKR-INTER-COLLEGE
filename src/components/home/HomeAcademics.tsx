"use client";

import Link from "next/link";
import {
  ArrowRight,
  Computer,
  Flame,
  GraduationCap,
  Library,
  Microscope,
  Shield,
  Trees,
  Trophy,
} from "lucide-react";
import {
  highSchoolBoardResults,
  intermediateBoardResults,
} from "@/data/upmsp";
import { homeCopy } from "@/lib/home-copy";

type Props = { locale: "en" | "hi" };

export function HomeAcademics({ locale }: Props) {
  const c = homeCopy(locale);
  const hi = locale === "hi";

  const streams = hi
    ? [
        {
          t: "हाई स्कूल (कक्षा 9 और 10)",
          d: "व्यापक यूपीएमएसपी हाई स्कूल पाठ्यक्रम — हिंदी, अंग्रेज़ी, गणित, विज्ञान, सामाजिक विज्ञान, तथा वैकल्पिक वाणिज्य या कंप्यूटर अध्ययन।",
        },
        {
          t: "मानविकी (कला धारा)",
          d: "इण्टरमीडिएट कला — भाषा, इतिहास, राजनीति विज्ञान, भूगोल और यूपी बोर्ड के अनुसार संबंधित विषय।",
        },
        {
          t: "विज्ञान (पीसीबी / पीसीएम)",
          d: "भौतिकी, रसायन, जीव विज्ञान / गणित — चिकित्सा और इंजीनियरिंग आकांक्षाओं के लिए।",
        },
        {
          t: "वाणिज्य धारा",
          d: "लेखाशास्त्र, व्यवसाय अध्ययन, अर्थशास्त्र और संबंधित वाणिज्य विषय।",
        },
        {
          t: "कृषि (भाग 1 और 2)",
          d: "यूपी बोर्ड इण्टरमीडिएट के अंतर्गत मान्यता प्राप्त कृषि धारा।",
        },
        {
          t: "एस.के.आर. प्राइवेट आईटीआई",
          d: "व्यावसायिक कौशल के लिए प्राइवेट आईटीआई प्रभाग के अंतर्गत तकनीकी ट्रेड्स।",
        },
      ]
    : [
        {
          t: "High School (Class 9 & 10)",
          d: "Comprehensive UPMSP High School course covering Hindi, English, Mathematics, Science, Social Science, and optional Commerce or Computer studies.",
        },
        {
          t: "Humanities (Arts Stream)",
          d: "Intermediate Arts with language, history, political science, geography and related subjects as per UP Board.",
        },
        {
          t: "Science (PCB / PCM)",
          d: "Physics, Chemistry, Biology / Mathematics pathway for medical and engineering aspirations.",
        },
        {
          t: "Commerce Stream",
          d: "Accountancy, Business Studies, Economics and related commerce subjects.",
        },
        {
          t: "Agriculture (Part 1 & 2)",
          d: "Agriculture stream recognised under UP Board Intermediate.",
        },
        {
          t: "S.K.R. Private ITI",
          d: "Technical trades under the Private ITI division for vocational skill development.",
        },
      ];

  const facilities = hi
    ? [
        { icon: Library, title: "पुस्तकालय", desc: "संदर्भ और पाठ्य पुस्तकें" },
        { icon: Microscope, title: "विज्ञान प्रयोगशाला", desc: "व्यावहारिक प्रयोग" },
        { icon: Computer, title: "कंप्यूटर लैब", desc: "डिजिटल साक्षरता" },
        { icon: Trees, title: "खेल मैदान", desc: "खेल और गतिविधियाँ" },
        { icon: Shield, title: "सीसीटीवी सुरक्षा", desc: "22 कमरे निगरानी" },
        { icon: Flame, title: "अग्नि सुरक्षा", desc: "आपातकालीन तैयारी" },
        { icon: Trophy, title: "परिणाम रिकॉर्ड", desc: "100% उत्तीर्ण" },
        { icon: GraduationCap, title: "आईटीआई विंग", desc: "व्यावसायिक ट्रेड्स" },
      ]
    : [
        { icon: Library, title: "Library", desc: "Reference & textbooks" },
        { icon: Microscope, title: "Science Lab", desc: "Hands-on experiments" },
        { icon: Computer, title: "Computer Lab", desc: "Digital literacy" },
        { icon: Trees, title: "Playground", desc: "Sports & activities" },
        { icon: Shield, title: "CCTV Security", desc: "22 rooms monitored" },
        { icon: Flame, title: "Fire Safety", desc: "Emergency readiness" },
        { icon: Trophy, title: "Results Record", desc: "100% pass record" },
        { icon: GraduationCap, title: "ITI Wing", desc: "Vocational trades" },
      ];

  return (
    <>
      <section className="py-16 sm:py-20 bg-white" id="academics">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#c9a227]">{c.curriculumCourses}</span>
            <h2 className="text-2xl font-extrabold text-slate-900 sm:text-4xl font-['Cinzel',serif] mt-1">
              {hi ? "शैक्षणिक कार्यक्रम और धाराएँ" : "Academic Programmes & Streams"}
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              {hi
                ? "हाई स्कूल, इण्टरमीडिएट (कला, विज्ञान, वाणिज्य, कृषि) और प्राइवेट आईटीआई तकनीकी ट्रेड्स एक ही परिसर में।"
                : "High School, Intermediate (Arts, Science, Commerce, Agriculture) and Private ITI technical trades under one campus."}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {streams.map((s) => (
              <div key={s.t} className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5 hover:shadow-sm transition">
                <GraduationCap className="h-6 w-6 text-[#c9a227] mb-2" />
                <h3 className="font-bold text-slate-900 text-sm">{s.t}</h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link href="/academics" className="inline-flex items-center gap-2 text-sm font-bold text-[#0f2744] hover:underline">
              {hi ? "पूर्ण शैक्षणिक पृष्ठ देखें" : "Explore full academics page"}
              <ArrowRight className="h-4 w-4 text-[#c9a227]" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-slate-50 border-y border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#c9a227]">{hi ? "परिसर" : "CAMPUS"}</span>
            <h2 className="text-2xl font-extrabold text-slate-900 sm:text-4xl font-['Cinzel',serif] mt-1">{c.campusFacilities}</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {facilities.map((item) => (
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
              {hi ? "सत्यापित बोर्ड परिणाम (2020–2026)" : "Verified Board Results (2020–2026)"}
            </h2>
          </div>
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 overflow-hidden">
              <div className="bg-[#0f2744] text-white px-4 py-3 font-bold text-sm">
                {hi ? "कक्षा 10 (हाई स्कूल)" : "Class 10 (High School)"}
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 text-slate-600">
                    <tr>
                      <th className="px-3 py-2">{hi ? "वर्ष" : "Year"}</th>
                      <th className="px-3 py-2">{hi ? "उपस्थित" : "Appeared"}</th>
                      <th className="px-3 py-2">{hi ? "उत्तीर्ण" : "Passed"}</th>
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
                {hi ? "कक्षा 12 (इण्टरमीडिएट)" : "Class 12 (Intermediate)"}
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 text-slate-600">
                    <tr>
                      <th className="px-3 py-2">{hi ? "वर्ष" : "Year"}</th>
                      <th className="px-3 py-2">{hi ? "उपस्थित" : "Appeared"}</th>
                      <th className="px-3 py-2">{hi ? "उत्तीर्ण" : "Passed"}</th>
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
              <span className="text-xs font-bold uppercase tracking-wider text-[#c9a227]">{hi ? "अपडेट" : "UPDATES"}</span>
              <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl font-['Cinzel',serif] mt-1">{c.latestNotices}</h2>
            </div>
            <Link href="/notices" className="text-sm font-bold text-[#c8102e] hover:underline">{c.viewAllNotices}</Link>
          </div>
          <p className="text-sm text-slate-600">
            {hi
              ? "नवीनतम सूचनाओं के लिए नोटिस पेज देखें।"
              : "Visit the notices page for the latest circulars and updates."}
          </p>
        </div>
      </section>
    </>
  );
}
