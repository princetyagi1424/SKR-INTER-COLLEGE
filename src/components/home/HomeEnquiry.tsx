"use client";

import Link from "next/link";
import {
  CheckCircle2, Clock, ExternalLink, MapPin, Phone, Send,
} from "lucide-react";

type FormState = {
  studentName: string;
  parentName: string;
  mobile: string;
  className: string;
  stream: string;
  address: string;
  message: string;
};

type Props = {
  locale: "en" | "hi";
  form: FormState;
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
  submitting: boolean;
  submitted: boolean;
  errorMsg: string;
  handleEnquirySubmit: (e: React.FormEvent) => void;
};

export function HomeEnquiry({
  locale, form, setForm, submitting, submitted, errorMsg, handleEnquirySubmit,
}: Props) {
  return (
    <>
      <section className="py-16 sm:py-20 bg-white" id="enquiry">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-amber-50/20 p-8 sm:p-12 shadow-sm">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-5 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#c9a227]">ADMISSION PROCESS</span>
                <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl font-['Cinzel',serif]">
                  Apply for Admission (Session 2026–27)
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Submit your details online. Our admissions desk will contact you within 24–48 hours to confirm seat availability, documentation requirements, and fee details.
                </p>
                <div className="space-y-2 pt-2 text-xs text-slate-700">
                  <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" /><span>Admissions for High School (Class 9 & 10)</span></div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" /><span>Intermediate Streams: Arts, Science, Commerce, Agriculture</span></div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" /><span>S.K.R. Private ITI technical trades</span></div>
                </div>
              </div>

              <div className="lg:col-span-7">
                {submitted ? (
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
                    <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-600" />
                    <h3 className="mt-3 text-lg font-bold text-emerald-800">Enquiry Submitted Successfully!</h3>
                    <p className="mt-2 text-sm text-slate-600">The school office will contact you soon on the mobile number provided.</p>
                    <button type="button" onClick={() => window.location.reload()} className="mt-4 text-sm font-bold text-[#0f2744] hover:underline">Submit another enquiry</button>
                  </div>
                ) : (
                  <form onSubmit={handleEnquirySubmit} className="space-y-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    {errorMsg && <div className="rounded-xl bg-red-50 border border-red-200 px-3 py-2 text-xs text-red-700">{errorMsg}</div>}
                    <div className="grid gap-3 sm:grid-cols-2">
                      <input required value={form.studentName} onChange={(e) => setForm({ ...form, studentName: e.target.value })} placeholder="Student name" className="rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm" />
                      <input required value={form.parentName} onChange={(e) => setForm({ ...form, parentName: e.target.value })} placeholder="Parent / guardian name" className="rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm" />
                    </div>
                    <input required value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} placeholder="Mobile number" className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm" />
                    <div className="grid gap-3 sm:grid-cols-2">
                      <select value={form.className} onChange={(e) => setForm({ ...form, className: e.target.value })} className="rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm">
                        <option value="Class 9">Class 9</option>
                        <option value="Class 10">Class 10</option>
                        <option value="Class 11">Class 11</option>
                        <option value="Class 12">Class 12</option>
                        <option value="ITI">ITI</option>
                      </select>
                      <select value={form.stream} onChange={(e) => setForm({ ...form, stream: e.target.value })} className="rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm">
                        <option value="General">General</option>
                        <option value="Humanities (Arts)">Arts</option>
                        <option value="Science (PCB/PCM)">Science</option>
                        <option value="Commerce">Commerce</option>
                        <option value="Agriculture">Agriculture</option>
                      </select>
                    </div>
                    <input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Village / address" className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm" />
                    <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Message (optional)" rows={3} className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm" />
                    <button type="submit" disabled={submitting} className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#c8102e] py-3 text-sm font-bold text-white disabled:opacity-60">
                      <Send className="h-4 w-4" />
                      {submitting ? "Submitting…" : "Submit Admission Enquiry"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200" id="contact">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-slate-900 font-['Cinzel',serif]">Contact, Location & Directions</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#0f2744]"><MapPin className="h-5 w-5" /></div>
              <h3 className="font-bold text-slate-900 text-base">Campus Address</h3>
              <p className="text-xs text-slate-600 leading-relaxed">Udaypur Khalsa, Post Bhadrauli, Bah, Pinahat, Agra — 283113 (Uttar Pradesh)</p>
              <a href="https://maps.app.goo.gl/8XxfUuM4fMUAxzqd7" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0f2744] hover:underline">
                Open in Google Maps <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-[#c9a227]"><Phone className="h-5 w-5" /></div>
              <h3 className="font-bold text-slate-900 text-base">Contact Helplines</h3>
              <div className="space-y-2 text-xs text-slate-600">
                <div>
                  <span className="text-slate-400 block">General Admissions & Enquiries:</span>
                  <a href="tel:9837183726" className="text-slate-900 font-bold hover:text-[#0f2744]">+91 9837183726</a>
                </div>
                <div>
                  <span className="text-slate-400 block">Principal Desk (Shri Uttam Singh Tyagi):</span>
                  <a href="tel:9719903732" className="text-slate-900 font-bold hover:text-[#0f2744]">+91 9719903732</a>
                </div>
              </div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700"><Clock className="h-5 w-5" /></div>
              <h3 className="font-bold text-slate-900 text-base">Office Hours</h3>
              <div className="space-y-1.5 text-xs text-slate-600">
                <p><strong>Monday – Saturday:</strong> 08:00 AM – 03:00 PM</p>
                <p><strong>Sundays & State Holidays:</strong> Closed</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
