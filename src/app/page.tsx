"use client";

import Link from "next/link";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import {
  BookOpen,
  Users,
  Award,
  Calendar,
  FileText,
  GraduationCap,
  ArrowRight,
  Phone,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function HomePage() {
  const { t } = useLanguage();

  const quick = [
    { href: "/notices", icon: FileText, label: t("noticesCirculars") },
    { href: "/login", icon: GraduationCap, label: t("resultsLogin") },
    { href: "/academics", icon: Calendar, label: t("academicCalendar") },
    { href: "/contact", icon: Phone, label: t("contactUs") },
  ];

  const features = [
    { icon: BookOpen, title: t("academics"), desc: "UP Board · ITI" },
    { icon: Users, title: t("staff"), desc: t("about") },
    { icon: Award, title: "Holistic", desc: t("buildingFutures") },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <PublicHeader />

      <main className="flex-1">
        <section className="relative overflow-hidden text-white">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url(/api/campus-image)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-navy-dark)]/90 via-[var(--color-navy)]/85 to-[var(--color-navy)]/80" />
          <div className="relative mx-auto max-w-7xl px-4 py-16 sm:py-24 lg:py-28">
            <div className="max-w-2xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[var(--color-gold)]">
                {t("tagline")}
              </p>
              <h1 className="mb-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                {t("fullName")}
                <span className="block text-xl font-medium text-[var(--color-gold)] sm:text-2xl">
                  {t("itiName")}
                </span>
              </h1>
              <p className="mb-8 text-base leading-relaxed text-white/85 sm:text-lg">
                {t("qualityEdu")}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/admissions"
                  className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-gold)] px-6 py-3 text-sm font-semibold text-[var(--color-navy-dark)] transition hover:bg-[var(--color-gold-light)]"
                >
                  {t("onlineAdmission")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  {t("studentParentLogin")}
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b bg-[var(--color-cream)]">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-slate-200 sm:grid-cols-4">
            {quick.map((item) => (
              <Link
                key={item.href + item.label}
                href={item.href}
                className="flex flex-col items-center gap-2 bg-white px-4 py-6 text-center transition hover:bg-slate-50"
              >
                <item.icon className="h-7 w-7 text-[var(--color-navy)]" />
                <span className="text-sm font-medium text-slate-700">{item.label}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="mb-2 text-sm font-semibold uppercase tracking-widest text-[var(--color-gold)]">
                {t("aboutInstitution")}
              </h2>
              <h3 className="mb-4 text-2xl font-bold text-[var(--color-navy)] sm:text-3xl">
                {t("buildingFutures")}
              </h3>
              <p className="mb-4 leading-relaxed text-slate-600">{t("qualityEdu")}</p>
              <p className="mb-6 leading-relaxed text-slate-600">{t("programmes")}</p>
              <Link
                href="/about"
                className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-navy)] hover:underline"
              >
                {t("about")} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-slate-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/api/campus-image"
                alt={t("fullName")}
                className="h-64 w-full object-cover sm:h-80"
              />
            </div>
          </div>
        </section>

        <section className="bg-[var(--color-cream)] py-12">
          <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:grid-cols-3">
            {features.map((c) => (
              <div
                key={c.title}
                className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100"
              >
                <c.icon className="mb-3 h-8 w-8 text-[var(--color-navy)]" />
                <h4 className="mb-1 font-semibold text-[var(--color-navy)]">{c.title}</h4>
                <p className="text-sm text-slate-600 line-clamp-2">{c.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
