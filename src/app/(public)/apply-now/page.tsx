"use client";

import { useState } from "react";
import Link from "next/link";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";

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
    academicSession: "2025-26",
    address: "",
    message: "",
  });

  function set(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admissions/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Submission failed");
        return;
      }
      setSuccess({ applicationNo: data.applicationNo });
    } catch {
      setError("Network error. Please try again or call 9837183726.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <PublicHeader />
      <main className="mx-auto max-w-2xl flex-1 px-4 py-12">
        <h1 className="mb-2 text-3xl font-bold text-[var(--color-navy)]">Admission Enquiry</h1>
        <p className="mb-8 text-slate-600">
          S.K.R. INTER COLLEGE & PVT ITI — Udaypur Khalsa, Agra. Fill this form to register your interest.
          The school office will contact you.
        </p>

        {success ? (
          <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-center">
            <p className="mb-2 text-lg font-semibold text-green-800">Enquiry submitted successfully</p>
            <p className="mb-4 text-sm text-green-700">
              Your reference number:{" "}
              <span className="font-mono font-bold">{success.applicationNo}</span>
            </p>
            <p className="text-sm text-green-700">Please save this number and call 9837183726 for follow-up.</p>
            <Link href="/" className="mt-4 inline-block text-sm font-medium text-[var(--color-navy)] underline">
              Back to home
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border bg-white p-6 shadow-sm">
            {error && (
              <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
            )}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium">Student name *</label>
                <input required value={form.studentName} onChange={(e) => set("studentName", e.target.value)}
                  className="w-full rounded-lg border px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Guardian name *</label>
                <input required value={form.guardianName} onChange={(e) => set("guardianName", e.target.value)}
                  className="w-full rounded-lg border px-3 py-2 text-sm" />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium">Phone *</label>
                <input required type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)}
                  className="w-full rounded-lg border px-3 py-2 text-sm" placeholder="10-digit mobile" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Email</label>
                <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)}
                  className="w-full rounded-lg border px-3 py-2 text-sm" />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium">Applying for *</label>
                <select value={form.applyingClass} onChange={(e) => set("applyingClass", e.target.value)}
                  className="w-full rounded-lg border px-3 py-2 text-sm">
                  <option>Class 9</option>
                  <option>Class 10</option>
                  <option>Class 11</option>
                  <option>Class 12</option>
                  <option>ITI Trade</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Academic session</label>
                <input value={form.academicSession} onChange={(e) => set("academicSession", e.target.value)}
                  className="w-full rounded-lg border px-3 py-2 text-sm" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Address</label>
              <textarea value={form.address} onChange={(e) => set("address", e.target.value)}
                rows={2} className="w-full rounded-lg border px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Message / remarks</label>
              <textarea value={form.message} onChange={(e) => set("message", e.target.value)}
                rows={2} className="w-full rounded-lg border px-3 py-2 text-sm" />
            </div>
            <p className="text-xs text-slate-500">
              By submitting, you agree that the school may contact you regarding admission.
              Personal data is used only for admission follow-up.
            </p>
            <button type="submit" disabled={loading}
              className="w-full rounded-lg bg-[var(--color-navy)] py-2.5 text-sm font-semibold text-white disabled:opacity-60">
              {loading ? "Submitting…" : "Submit enquiry"}
            </button>
          </form>
        )}
      </main>
      <PublicFooter />
    </div>
  );
}
