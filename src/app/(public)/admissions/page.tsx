"use client";

import Link from "next/link";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { useLanguage } from "@/context/LanguageContext";
import {
  GraduationCap,
  FileText,
  Phone,
  CheckCircle2,
  ArrowRight,
  Building2,
  ClipboardList,
} from "lucide-react";

export default function AdmissionsPage() {
  const { t, locale } = useLanguage();
  const hi = locale === "hi";

  const steps = [
    {
      n: "01",
      titleEn: "Check eligibility",
      titleHi: "पात्रता जाँचें",
      descEn: "Confirm the class / stream (High School, Intermediate Arts/Science/Commerce/Agriculture, or ITI trade).",
      descHi: "कक्षा / स्ट्रीम की पुष्टि करें (हाई स्कूल, इंटरमीडिएट कला/विज्ञान/वाणिज्य/कृषि, या आईटीआई ट्रेड)।",
    },
    {
      n: "02",
      titleEn: "Submit online enquiry",
      titleHi: "ऑनलाइन पूछताछ जमा करें",
      descEn: "Fill the admission enquiry form on the homepage or contact page. Office will call back on your mobile.",
      descHi: "होमपेज या संपर्क पेज पर प्रवेश पूछताछ फॉर्म भरें। कार्यालय आपके मोबाइल पर कॉल करेगा।",
    },
    {
      n: "03",
      titleEn: "Visit the office",
      titleHi: "कार्यालय आएँ",
      descEn: "Complete the official form with required documents and follow the school's submission process.",
      descHi: "आवश्यक दस्तावेज़ों के साथ आधिकारिक फॉर्म भरें और स्कूल की जमा प्रक्रिया का पालन करें।",
    },
  ];

  const programmes = [
    { en: "High School (Class 9 & 10)", hi: "हाई स्कूल (कक्षा 9 और 10)" },
    { en: "Intermediate — Humanities (Arts)", hi: "इंटरमीडिएट — मानविकी (कला)" },
    { en: "Intermediate — Science (PCB / PCM)", hi: "इंटरमीडिएट — विज्ञान (पीसीबी / पीसीएम)" },
    { en: "Intermediate — Commerce", hi: "इंटरमीडिएट — वाणिज्य" },
    { en: "Intermediate — Agriculture", hi: "इंटरमीडिएट — कृषि" },
    { en: "S.K.R. Private ITI — technical trades", hi: "एस.के.आर. प्राइवेट आईटीआई — तकनीकी ट्रेड" },
  ];

  const docs = [
    { en: "Aadhaar card (student & parent)", hi: "आधार कार्ड (विद्यार्थी एवं अभिभावक)" },
    { en: "Previous class marksheet / TC", hi: "पिछली कक्षा का मार्कशीट / टीसी" },
    { en: "Passport-size photographs", hi: "पासपोर्ट साइज़ फोटो" },
    { en: "Caste / income certificate if applicable", hi: "जाति / आय प्रमाणपत्र (यदि लागू हो)" },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-cream)]">
      <PublicHeader />
      <main className="flex-1">
        <section className="relative isolate overflow-hidden bg-[#0f2744] text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(201,162,39,0.25),transparent_50%)]" />
          <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-amber-200">
              <GraduationCap className="h-3.5 w-3.5" /> {t("admissions")}
            </span>
            <h1 className="mt-4 max-w-3xl text-3xl font-extrabold tracking-tight sm:text-5xl">
              {t("admissionsPageTitle")}
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base">
              {t("admissionsPageDesc")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/#enquiry"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#c9a227] to-[#e0c04a] px-5 py-2.5 text-sm font-bold text-[#0f2744]"
              >
                {t("admissionEnquiry")} <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="tel:9837183726"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white"
              >
                <Phone className="h-4 w-4" /> {t("callNow")} 9837183726
              </a>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-slate-200"
              >
                {t("login")}
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[.9fr_1.1fr]">
          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-bold text-[#0f2744]">
                <ClipboardList className="h-5 w-5 text-[#c9a227]" />
                {hi ? "प्रवेश के चरण" : "Admission steps"}
              </div>
              <ol className="mt-5 space-y-4">
                {steps.map((s) => (
                  <li key={s.n} className="flex gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0f2744] text-xs font-bold text-amber-300">
                      {s.n}
                    </span>
                    <div>
                      <div className="font-bold text-slate-900">{hi ? s.titleHi : s.titleEn}</div>
                      <p className="mt-1 text-sm leading-6 text-slate-600">{hi ? s.descHi : s.descEn}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-bold text-[#0f2744]">
                <FileText className="h-5 w-5 text-[#c9a227]" />
                {hi ? "आवश्यक दस्तावेज़" : "Documents required"}
              </div>
              <ul className="mt-4 space-y-2">
                {docs.map((d) => (
                  <li key={d.en} className="flex items-start gap-2 text-sm text-slate-700">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    {hi ? d.hi : d.en}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-bold text-[#0f2744]">
                <Building2 className="h-5 w-5 text-[#c9a227]" />
                {t("academicStreams")}
              </div>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {programmes.map((p) => (
                  <li
                    key={p.en}
                    className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800"
                  >
                    {hi ? p.hi : p.en}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-amber-200 bg-amber-50/80 p-6">
              <h3 className="font-bold text-[#0f2744]">{t("contactHelplines")}</h3>
              <p className="mt-2 text-sm text-slate-700">{t("generalAdmissions")}</p>
              <a href="tel:9837183726" className="mt-2 inline-block text-lg font-extrabold text-[#c8102e] hover:underline">
                9837183726
              </a>
              <p className="mt-4 text-sm text-slate-600">{t("address")}</p>
              <p className="mt-2 text-xs text-slate-500">
                {t("officeHours")} {t("monSat")} 9:00 AM – 3:00 PM · {t("sunClosed")}
              </p>
              <Link
                href="/#enquiry"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#c8102e] px-5 py-2.5 text-sm font-bold text-white"
              >
                {t("submitEnquiry")} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
