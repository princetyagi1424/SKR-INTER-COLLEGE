import Link from "next/link";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { ArrowRight, CheckCircle2, FileText, Phone, ShieldCheck, ClipboardList } from "lucide-react";

export const metadata = {
  title: "Admissions",
  description: "Admission information and enquiry for S.K.R. Inter College & Private ITI, Agra.",
};

const documents = [
  "Birth certificate or age proof",
  "Previous school transfer certificate / marksheet",
  "Student Aadhaar card, if required",
  "Recent passport-size photographs",
  "Parent or guardian ID proof",
  "Category certificate, if applicable",
  "Address proof",
  "Migration certificate, if required",
];

export default function AdmissionsPage() {
  return (
    <div className="min-h-screen bg-[#f7f8f5] text-slate-900">
      <PublicHeader />
      <main>
        <section className="relative isolate overflow-hidden bg-[#142f29] text-white">
          <div className="absolute -right-16 -top-20 -z-10 h-96 w-96 rounded-full bg-emerald-300/15 blur-[100px]" />
          <div className="absolute -bottom-28 left-1/3 -z-10 h-80 w-80 rounded-full bg-amber-300/10 blur-[100px]" />
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[.18em] text-amber-200"><ClipboardList className="h-4 w-4" /> Admissions</span>
            <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.04] tracking-[-.05em] sm:text-6xl">Every big journey<br /><span className="font-serif italic text-amber-300">starts with a first step.</span></h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/70">Find out how to enquire about admission at S.K.R. Inter College &amp; Private ITI. Current seats, subject groups, trade availability and fees should be confirmed with the school office.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row"><Link href="/apply-now" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-amber-300 px-6 text-sm font-extrabold text-slate-900 transition hover:-translate-y-1 hover:bg-amber-200">Start an enquiry <ArrowRight className="h-4 w-4" /></Link><a href="tel:9837183726" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/25 px-6 text-sm font-bold text-white transition hover:bg-white/10"><Phone className="h-4 w-4" /> Call school office</a></div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[.8fr_1.2fr] lg:px-10">
          <div className="reveal-on-view">
            <p className="text-xs font-extrabold uppercase tracking-[.2em] text-emerald-900">A simple process</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-.04em] sm:text-4xl">How to apply</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">Use this checklist to prepare, then contact the office for the latest instructions before submitting documents or fees.</p>
            <div className="mt-7 space-y-4">
              {[
                ["01", "Contact the school", "Ask about current admission dates, class or trade availability, and fees."],
                ["02", "Prepare your documents", "Bring the documents requested by the school for the selected programme."],
                ["03", "Visit the office", "Complete the official form and follow the school's submission process."],
                ["04", "Keep your receipt", "Retain the acknowledgement and any official fee receipt for your records."],
              ].map(([number,title,description]) => <div key={number} className="flex gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-5"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e6eee7] font-mono text-sm font-extrabold text-emerald-950">{number}</span><div><h3 className="font-extrabold">{title}</h3><p className="mt-1 text-sm leading-6 text-slate-600">{description}</p></div></div>)}
            </div>
          </div>
          <div className="reveal-on-view rounded-[1.8rem] border border-slate-200/80 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,.06)] sm:p-8">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-900"><FileText className="h-6 w-6" /></span>
            <h2 className="mt-5 text-2xl font-semibold tracking-tight">Documents to ask about</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">Requirements vary by class and programme. Confirm the final list with the school before collecting copies.</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {documents.map((item) => <li key={item} className="flex items-start gap-2.5 text-sm leading-6 text-slate-700"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-800" />{item}</li>)}
            </ul>
            <div className="mt-7 rounded-2xl bg-[#f0f4ef] p-4 sm:p-5"><div className="flex gap-3"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-900" /><div><p className="text-sm font-extrabold">Need an answer before visiting?</p><p className="mt-1 text-sm leading-6 text-slate-600">Call 9837183726 to check office hours, the admission process and currently available options.</p><a href="tel:9837183726" className="mt-3 inline-flex items-center gap-2 text-sm font-extrabold text-emerald-950 hover:underline">Call 9837183726 <ArrowRight className="h-4 w-4" /></a></div></div></div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
