"use client";

import Link from "next/link";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { useLanguage } from "@/context/LanguageContext";
import { schoolProfile, UPMSP_SOURCE } from "@/data/upmsp";
import type { TranslationKey } from "@/lib/i18n";

const STREAM_KEYS: Record<string, TranslationKey> = {
  "Humanities (Arts)": "streamHumanities",
  Science: "streamScience",
  Commerce: "streamCommerce",
  "Agriculture Part-1": "streamAgri1",
  "Agriculture Part-2": "streamAgri2",
  Vocational: "streamVocational",
};

export default function AcademicsPage() {
  const { t } = useLanguage();

  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-cream)]">
      <PublicHeader />
      <main className="flex-1">
        <section className="border-b border-slate-100 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-blue)]">{t("academics")}</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">{t("academicsPageTitle")}</h1>
            <p className="mt-3 max-w-2xl text-sm text-slate-600">{t("academicsPageLead")}</p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10">
          <h2 className="mb-4 text-lg font-bold text-slate-900">{t("intermediateGroups")}</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {schoolProfile.streamsInter.map((s) => {
              const key = STREAM_KEYS[s];
              return (
                <div key={s} className="card-surface px-5 py-4 font-medium text-slate-800">
                  {key ? t(key) : s}
                </div>
              );
            })}
          </div>
          <p className="mt-4 text-xs text-slate-500">
            {t("source")}:{" "}
            <a href={UPMSP_SOURCE} target="_blank" rel="noopener noreferrer" className="text-[var(--color-blue)] underline">
              UPMSP SchoolInformation Code 011424
            </a>
          </p>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-10">
          <h2 className="mb-4 text-lg font-bold text-slate-900">{t("campusLearning")}</h2>
          <ul className="grid gap-3 sm:grid-cols-2 text-sm text-slate-700">
            <li className="card-surface p-4">{schoolProfile.facilities.classrooms} {t("teachingRooms")}</li>
            <li className="card-surface p-4">{t("scienceLab")}</li>
            <li className="card-surface p-4">{t("computerLab")}</li>
            <li className="card-surface p-4">{t("libraryAvailable")}</li>
            <li className="card-surface p-4">CCTV — {schoolProfile.facilities.cctv.count}</li>
            <li className="card-surface p-4">{t("playgroundAvailable")}</li>
          </ul>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-16">
          <div className="card-surface flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-bold text-slate-900">{t("privateIti")}</h2>
              <p className="text-sm text-slate-600">{t("privateItiDesc")}</p>
            </div>
            <Link href="/admissions" className="inline-flex items-center justify-center rounded-xl bg-[#c8102e] px-5 py-2.5 text-sm font-bold text-white">
              {t("applyNow")}
            </Link>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
