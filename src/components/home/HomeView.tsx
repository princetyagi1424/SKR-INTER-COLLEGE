"use client";

import { useState } from "react";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { useLanguage } from "@/context/LanguageContext";
import { HomeTop } from "./HomeTop";
import { HomeBottom } from "./HomeBottom";

export function HomeView() {
  const { locale } = useLanguage();

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
        <HomeTop locale={locale} />
        <HomeBottom
          locale={locale}
          form={form}
          setForm={setForm}
          submitting={submitting}
          submitted={submitted}
          errorMsg={errorMsg}
          handleEnquirySubmit={handleEnquirySubmit}
        />
      </main>
      <PublicFooter />
    </div>
  );
}
