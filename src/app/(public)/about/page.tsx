"use client";

import Link from "next/link";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { useLanguage } from "@/context/LanguageContext";
import { schoolProfile, UPMSP_SOURCE } from "@/data/upmsp";
import { MapPin, Phone } from "lucide-react";

export default function AboutPage() {
  const { t } = useLanguage();
  const f = schoolProfile.facilities;

  const facilityRows: [string, string][] = [
    [t("classrooms"), String(f.classrooms)],
    ["CCTV", f.cctv.available ? `${t("available")} (${f.cctv.count})` : t("notListed")],
    [t("scienceLab").split(" — ")[0], f.scienceLab ? t("available") : t("notAvailable")],
    [t("computerLab").split(" — ")[0], f.computerLab ? t("available") : t("notAvailable")],
    ["Internet / Wi‑Fi", f.internetWifi ? t("available") : t("notAvailable")],
    [t("libraryAvailable").split(" — ")[0], f.library ? t("available") : t("notAvailable")],
    [t("playgroundAvailable").split(" — ")[0], f.playground ? t("available") : t("notAvailable")],
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-cream)]">
      <PublicHeader />
      <main className="flex-1">
        <section className="border-b border-slate-100 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-blue)]">{t("about")}</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">{t("fullName")}</h1>
            <p className="mt-3 max-w-2xl text-slate-600">{t("aboutPageLead")}</p>
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-600">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-[#c8102e]" />
                {t("addressShort")}
              </span>
              <a href="tel:9837183726" className="inline-flex items-center gap-1.5 hover:text-[#c8102e]">
                <Phone className="h-4 w-4" />
                9837183726
              </a>
            </div>
            <p className="mt-3 text-xs text-slate-500">
              {t("schoolCodeLabel")}: <strong>011424</strong> · {t("udiseLabel")}: <strong>09181302903</strong>
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10">
          <h2 className="mb-4 text-lg font-bold text-slate-900">{t("facilities")}</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {facilityRows.map(([k, v]) => (
              <div key={k} className="card-surface flex items-center justify-between px-4 py-3 text-sm">
                <span className="font-medium text-slate-800">{k}</span>
                <span className="text-slate-600">{v}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-slate-500">
            {t("source")}:{" "}
            <a href={UPMSP_SOURCE} target="_blank" rel="noopener noreferrer" className="text-[var(--color-blue)] underline">
              UPMSP 011424
            </a>
          </p>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-16">
          <div className="card-surface p-6">
            <h2 className="font-bold text-slate-900">{t("aboutInstitution")}</h2>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">{t("qualityEdu")}</p>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed">{t("programmes")}</p>
            <Link href="/admissions" className="mt-5 inline-flex rounded-xl bg-[#c8102e] px-5 py-2.5 text-sm font-bold text-white">
              {t("applyNow")}
            </Link>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
