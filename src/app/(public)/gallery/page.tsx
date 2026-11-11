"use client";

import Link from "next/link";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { useLanguage } from "@/context/LanguageContext";

export default function GalleryPage() {
  const { t } = useLanguage();
  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-cream)]">
      <PublicHeader />
      <main className="flex-1">
        <section className="border-b border-slate-100 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16">
            <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">{t("galleryPageTitle")}</h1>
            <p className="mt-3 max-w-2xl text-sm text-slate-600">{t("galleryPageDesc")}</p>
            <div className="mt-6">
              <Link href="/contact" className="rounded-full bg-[#0f2744] px-5 py-2.5 text-sm font-semibold text-white">{t("contactOffice")}</Link>
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-7xl px-4 py-10 text-sm text-slate-500">
          <p>{t("noData")}</p>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
