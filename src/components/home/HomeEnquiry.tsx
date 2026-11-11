"use client";

import Link from "next/link";
import {
  CheckCircle2,
  Clock,
  ExternalLink,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { homeCopy } from "@/lib/home-copy";

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
  locale,
  form,
  setForm,
  submitting,
  submitted,
  errorMsg,
  handleEnquirySubmit,
}: Props) {
  const c = homeCopy(locale);
  const hi = locale === "hi";

  return (
    <>
      <section className="py-16 sm:py-20 bg-white" id="enquiry">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#c9a227]">{c.admissionProcess}</span>
                <h2 className="mt-1 text-2xl font-extrabold text-slate-900 sm:text-3xl font-['Cinzel',serif]">
                  {hi ? "प्रवेश पूछताछ फॉर्म" : "Admission Enquiry Form"}
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  {hi
                    ? "नीचे फॉर्म भरें। कार्यालय जल्द संपर्क करेगा।"
                    : "Fill the form below. The office will contact you shortly."}
                </p>
              </div>

              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                  {c.processItem1}
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                  {c.processItem2}
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                  {c.processItem3}
                </li>
              </ul>

              {submitted ? (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
                  <p className="font-bold text-emerald-800">{c.enquirySuccess}</p>
                  <p className="mt-1 text-sm text-emerald-700">{c.enquirySuccessDesc}</p>
                  <button
                    type="button"
                    onClick={() => window.location.reload()}
                    className="mt-4 text-sm font-bold text-emerald-800 underline"
                  >
                    {c.submitAnother}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleEnquirySubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">{c.studentName}</label>
                      <input
                        required
                        value={form.studentName}
                        onChange={(e) => setForm({ ...form, studentName: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">{c.parentName}</label>
                      <input
                        required
                        value={form.parentName}
                        onChange={(e) => setForm({ ...form, parentName: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
                      />
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">{c.mobile}</label>
                      <input
                        required
                        type="tel"
                        value={form.mobile}
                        onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">{c.classLabel}</label>
                      <select
                        value={form.className}
                        onChange={(e) => setForm({ ...form, className: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
                      >
                        <option>Class 9</option>
                        <option>Class 10</option>
                        <option>Class 11</option>
                        <option>Class 12</option>
                        <option>ITI</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">{c.stream}</label>
                    <select
                      value={form.stream}
                      onChange={(e) => setForm({ ...form, stream: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
                    >
                      <option>General</option>
                      <option>Arts</option>
                      <option>Science</option>
                      <option>Commerce</option>
                      <option>Agriculture</option>
                      <option>ITI</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">{c.address}</label>
                    <input
                      value={form.address}
                      onChange={(e) => setForm({ ...form, address: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">{c.message}</label>
                    <textarea
                      rows={3}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
                    />
                  </div>
                  {errorMsg && <p className="text-sm text-red-600">{errorMsg}</p>}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#c8102e] px-6 py-3 text-sm font-bold text-white disabled:opacity-60"
                  >
                    <Send className="h-4 w-4" />
                    {submitting ? c.submitting : c.submitEnquiry}
                  </button>
                </form>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900 font-['Cinzel',serif]">{c.contactLocation}</h2>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-[#c8102e] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-slate-500">{c.campusAddress}</p>
                    <p className="text-sm text-slate-800">{c.fullAddress}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-[#c8102e] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-slate-500">{c.contactHelplines}</p>
                    <p className="text-sm font-semibold text-slate-800">+91 9837183726</p>
                    <p className="text-sm font-semibold text-slate-800">+91 9719903732</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-[#c8102e] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-slate-500">{hi ? "कार्यालय समय" : "Office Hours"}</p>
                    <p className="text-sm text-slate-800">
                      {hi ? "सोम–शनि, सुबह 9:00 – शाम 4:00" : "Mon–Sat, 9:00 AM – 4:00 PM"}
                    </p>
                  </div>
                </div>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#0f2744] hover:underline"
              >
                {hi ? "पूर्ण संपर्क पृष्ठ" : "Full contact page"}
                <ExternalLink className="h-4 w-4 text-[#c9a227]" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
