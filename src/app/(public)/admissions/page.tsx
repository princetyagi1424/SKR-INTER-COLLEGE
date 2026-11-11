"use client";

import Link from "next/link";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { useLanguage } from "@/context/LanguageContext";

export default function AdmissionsPage() {
  const { t } = useLanguage();
  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-cream)]">
      <PublicHeader />
      <main className="flex-1">
        <section className="border-b border-slate-100 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16">
            <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">{t("admissionsPageTitle")}</h1>
            <p className="mt-3 max-w-2xl text-sm text-slate-600">{t("admissionsPageDesc")}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/contact" className="rounded-full bg-[#0f2744] px-5 py-2.5 text-sm font-semibold text-white">{t("contactOffice")}</Link>
              <Link href="/login" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700">{t("login")}</Link>
              <a href="tel:9837183726" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700">{t("callNow")} 9837183726</a>
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-7xl px-4 py-10 text-sm text-slate-600">
          <p>{t("qualityEdu")}</p>
          <p className="mt-3">{t("programmes")}</p>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
