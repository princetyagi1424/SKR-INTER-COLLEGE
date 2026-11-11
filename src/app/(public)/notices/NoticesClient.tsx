"use client";

import Link from "next/link";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { useLanguage } from "@/context/LanguageContext";
import { Bell, CalendarDays } from "lucide-react";

type NoticeItem = {
  id: string;
  title: string;
  content: string;
  publishAt: string | null;
  createdAt: string;
  priority: string;
};

export function NoticesClient({ notices }: { notices: NoticeItem[] }) {
  const { t, locale } = useLanguage();

  return (
    <div className="flex min-h-screen flex-col bg-[#fff8f0] text-slate-900">
      <PublicHeader />
      <main className="flex-1">
        <section className="relative overflow-hidden border-b border-[#efe6dc] bg-white">
          <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
            <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#c8102e]">
              {t("announcements")}
            </p>
            <h1 className="max-w-3xl text-3xl font-extrabold tracking-tight text-[#1a1a1a] sm:text-4xl">
              {t("noticesPageTitle")}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              {t("noticesPageDesc")}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/apply-now"
                className="rounded-full bg-[var(--color-navy)] px-5 py-2.5 text-sm font-semibold text-white shadow-sm"
              >
                {t("admissionEnquiry")}
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700"
              >
                {t("contactOffice")}
              </Link>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          {notices.length === 0 ? (
            <div className="rounded-3xl border border-[#efe6dc] bg-white p-6 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                <Bell className="h-6 w-6" />
              </div>
              <h2 className="text-lg font-bold text-slate-900">{t("noNoticesYet")}</h2>
              <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                {t("noNoticesHint")}{" "}
                <a href="tel:9837183726" className="font-semibold text-[var(--color-navy)] underline">
                  9837183726
                </a>
                .
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {notices.map((n) => {
                const dateStr = new Date(n.publishAt || n.createdAt).toLocaleDateString(
                  locale === "hi" ? "hi-IN" : "en-IN",
                  { day: "numeric", month: "short", year: "numeric" }
                );
                return (
                  <article
                    key={n.id}
                    className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6"
                  >
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                      <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 font-semibold uppercase tracking-wide">
                        <CalendarDays className="h-3.5 w-3.5" />
                        {dateStr}
                      </span>
                      {n.priority && n.priority !== "NORMAL" && (
                        <span className="rounded-full bg-[#fff0f1] px-2.5 py-1 font-semibold text-[#c8102e]">
                          {n.priority}
                        </span>
                      )}
                    </div>
                    <h2 className="mt-3 text-lg font-bold text-slate-900">{n.title}</h2>
                    <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-slate-600">
                      {n.content}
                    </p>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
