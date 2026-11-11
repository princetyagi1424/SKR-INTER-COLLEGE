"use client";

import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { useLanguage } from "@/context/LanguageContext";
import { Phone, MapPin, Mail } from "lucide-react";

export default function ContactPage() {
  const { t } = useLanguage();

  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-cream)]">
      <PublicHeader />
      <main className="flex-1">
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--color-blue)]">{t("contact")}</p>
            <div className="mt-3 grid gap-5 md:grid-cols-[1fr_0.7fr] md:items-end">
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">{t("contactTitle")}</h1>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">{t("contactLead")}</p>
              </div>
              <a
                href="tel:9837183726"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--color-navy)] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 md:justify-self-end"
              >
                <Phone className="h-4 w-4" /> {t("callNow")} 9837183726
              </a>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-5 px-4 py-8 sm:px-6 sm:py-12 lg:grid-cols-2">
          <article className="card-surface p-5 sm:p-6">
            <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-[var(--color-blue)]">
              <MapPin className="h-5 w-5" />
            </span>
            <h2 className="font-extrabold text-slate-900">{t("addressShort")}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{t("address")}</p>
            <a
              href="https://maps.app.goo.gl/8XxfUuM4fMUAxzqd7"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex text-sm font-semibold text-[var(--color-blue)] hover:underline"
            >
              {t("getDirections")}
            </a>
          </article>

          <article className="card-surface p-5 sm:p-6">
            <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-[var(--color-blue)]">
              <Phone className="h-5 w-5" />
            </span>
            <h2 className="font-extrabold text-slate-900">{t("phone")}</h2>
            <p className="mt-2 text-sm text-slate-600">
              <a href="tel:9837183726" className="font-semibold text-slate-900 hover:text-[#c8102e]">
                9837183726
              </a>
            </p>
            <p className="mt-3 flex items-center gap-2 text-sm text-slate-600">
              <Mail className="h-4 w-4" />
              omkartyagi75@gmail.com
            </p>
          </article>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
