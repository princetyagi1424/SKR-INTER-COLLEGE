"use client";

import { useState } from "react";
import Link from "next/link";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { ArrowLeft, ArrowRight, CheckCircle2, ClipboardList, GraduationCap, ShieldCheck } from "lucide-react";

const inputClass = "mt-1.5 min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10";

export default function ApplyNowPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<{ applicationNo: string } | null>(null);
  const [form, setForm] = useState({
    studentName: "",
    guardianName: "",
    phone: "",
    email: "",
    applyingClass: "Class 11",
    academicSession: "2026-27",
    address: "",
    message: "",
  });

  function set(field: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch("/api/admissions/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setError(data.error || "We couldn't submit your enquiry. Please try again or call 9837183726.");
        return;
      }
      setSuccess({ applicationNo: data.applicationNo });
    } catch {
      setError("Unable to connect right now. Please check your connection and try again, or call 9837183726.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-cream)]">
      <PublicHeader />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
        <Link href="/admissions" className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-[var(--color-navy)]">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Admission information
        </Link>

        <div className="grid items-start gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:gap-8">
          <aside className="relative overflow-hidden rounded-[1.75rem] bg-[var(--color-navy-dark)] p-6 text-white shadow-[var(--shadow-soft)] sm:p-8 lg:sticky lg:top-28">
            <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-sky-400/15 blur-3xl" />
            <div className="relative">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-[var(--color-gold)]"><ClipboardList className="h-6 w-6" aria-hidden="true" /></span>
              <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.18em] text-sky-200">S.K.R. Inter College &amp; Private ITI</p>
              <h1 className="mt-2 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">Start an admission enquiry</h1>
              <p className="mt-4 text-sm leading-7 text-white/70">
                Share a few details and the school office can follow up about current admissions, subject groups, seats and documents.
              </p>
              <div className="mt-7 space-y-4">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-emerald-200"><CheckCircle2 className="h-4 w-4" aria-hidden="true" /></span>
                  <div><p className="text-sm font-bold">Simple enquiry form</p><p className="mt-1 text-xs leading-5 text-white/55">Fields marked * are required.</p></div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-sky-200"><GraduationCap className="h-4 w-4" aria-hidden="true" /></span>
                  <div><p className="text-sm font-bold">For school and ITI enquiries</p><p className="mt-1 text-xs leading-5 text-white/55">Confirm current programmes and availability with the office.</p></div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-amber-200"><ShieldCheck className="h-4 w-4" aria-hidden="true" /></span>
                  <div><p className="text-sm font-bold">Need help?</p><p className="mt-1 text-xs leading-5 text-white/55">Call the office on 9837183726.</p></div>
                </div>
              </div>
            </div>
          </aside>

          <section className="card-surface min-w-0 p-5 sm:p-8">
            {success ? (
              <div className="py-8 text-center" role="status">
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700"><CheckCircle2 className="h-8 w-8" aria-hidden="true" /></span>
                <h2 className="mt-5 text-2xl font-extrabold text-slate-900">Enquiry submitted</h2>
                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">Your enquiry was received. Keep the reference number below for any follow-up with the school office.</p>
                <div className="mx-auto mt-5 max-w-sm rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-emerald-800">Reference number</p>
                  <p className="mt-1 break-all font-mono text-lg font-extrabold text-emerald-900">{success.applicationNo}</p>
                </div>
                <p className="mt-4 text-sm text-slate-600">For follow-up, call <a href="tel:9837183726" className="font-bold text-[var(--color-navy)] underline underline-offset-2">9837183726</a>.</p>
                <Link href="/" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--color-navy)] px-5 py-3 text-sm font-bold text-white transition hover:bg-[var(--color-navy-dark)]">Back to home <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
              </div>
            ) : (
              <>
                <div className="mb-6 border-b border-slate-100 pb-5">
                  <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[var(--color-blue)]">Student details</p>
                  <h2 className="mt-2 text-xl font-extrabold text-slate-900 sm:text-2xl">Tell us about the applicant</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">Please enter a working phone number so the office can contact you.</p>
                </div>

                {error && (
                  <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-5 text-red-800" role="alert">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="studentName" className="text-sm font-bold text-slate-700">Student name <span className="text-red-600">*</span></label>
                      <input id="studentName" name="studentName" autoComplete="name" required value={form.studentName} onChange={(event) => set("studentName", event.target.value)} className={inputClass} placeholder="Enter student's full name" />
                    </div>
                    <div>
                      <label htmlFor="guardianName" className="text-sm font-bold text-slate-700">Parent / guardian name <span className="text-red-600">*</span></label>
                      <input id="guardianName" name="guardianName" autoComplete="family-name" required value={form.guardianName} onChange={(event) => set("guardianName", event.target.value)} className={inputClass} placeholder="Enter parent or guardian name" />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="phone" className="text-sm font-bold text-slate-700">Mobile number <span className="text-red-600">*</span></label>
                      <input id="phone" name="phone" type="tel" inputMode="numeric" autoComplete="tel" required pattern="[6-9][0-9]{9}" minLength={10} maxLength={10} value={form.phone} onChange={(event) => set("phone", event.target.value.replace(/\D/g, "").slice(0, 10))} className={inputClass} placeholder="10-digit Indian mobile" aria-describedby="phone-help" />
                      <p id="phone-help" className="mt-1.5 text-xs text-slate-500">Enter 10 digits, starting with 6–9.</p>
                    </div>
                    <div>
                      <label htmlFor="email" className="text-sm font-bold text-slate-700">Email address <span className="font-normal text-slate-400">(optional)</span></label>
                      <input id="email" name="email" type="email" autoComplete="email" value={form.email} onChange={(event) => set("email", event.target.value)} className={inputClass} placeholder="you@example.com" />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="applyingClass" className="text-sm font-bold text-slate-700">Applying for <span className="text-red-600">*</span></label>
                      <select id="applyingClass" name="applyingClass" required value={form.applyingClass} onChange={(event) => set("applyingClass", event.target.value)} className={inputClass}>
                        <option>Class 9</option>
                        <option>Class 10</option>
                        <option>Class 11</option>
                        <option>Class 12</option>
                        <option>ITI Trade</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="academicSession" className="text-sm font-bold text-slate-700">Academic session</label>
                      <input id="academicSession" name="academicSession" value={form.academicSession} onChange={(event) => set("academicSession", event.target.value)} className={inputClass} placeholder="e.g. 2026-27" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="address" className="text-sm font-bold text-slate-700">Address <span className="font-normal text-slate-400">(optional)</span></label>
                    <textarea id="address" name="address" autoComplete="street-address" value={form.address} onChange={(event) => set("address", event.target.value)} rows={3} className={`${inputClass} resize-y`} placeholder="Village / town, district" />
                  </div>

                  <div>
                    <label htmlFor="message" className="text-sm font-bold text-slate-700">Message / questions <span className="font-normal text-slate-400">(optional)</span></label>
                    <textarea id="message" name="message" value={form.message} onChange={(event) => set("message", event.target.value)} rows={3} className={`${inputClass} resize-y`} placeholder="What would you like to know?" />
                  </div>

                  <div className="rounded-xl bg-slate-50 px-4 py-3 text-xs leading-5 text-slate-600">
                    By submitting, you agree that the school may contact you about this enquiry. Please avoid adding sensitive personal information that is not needed for admission follow-up.
                  </div>
                  <button type="submit" disabled={loading} className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[var(--color-navy)] px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[var(--color-navy-dark)] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60">
                    {loading ? "Submitting enquiry…" : "Submit admission enquiry"}
                    {!loading && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
                  </button>
                </form>
              </>
            )}
          </section>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
