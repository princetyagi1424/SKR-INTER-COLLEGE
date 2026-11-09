"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Phone, MapPin } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageToggle } from "@/components/ui/LanguageToggle";

export function PublicHeader() {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();

  const NAV = [
    { href: "/", label: t("home") },
    { href: "/about", label: t("about") },
    { href: "/academics", label: t("academics") },
    { href: "/admissions", label: t("admissions") },
    { href: "/notices", label: t("notices") },
    { href: "/gallery", label: t("gallery") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[var(--color-navy)] text-white shadow-md">
      <div className="hidden border-b border-white/10 bg-[var(--color-navy-dark)] px-4 py-1.5 text-xs sm:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="tel:9837183726" className="flex items-center gap-1.5 hover:text-[var(--color-gold)]">
              <Phone className="h-3.5 w-3.5" />
              9837183726
            </a>
            <span className="flex items-center gap-1.5 text-white/70">
              <MapPin className="h-3.5 w-3.5" />
              {t("address")}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <LanguageToggle compact />
            <Link href="/login" className="hover:text-[var(--color-gold)]">
              {t("studentParentLogin")}
            </Link>
            <Link href="/login?role=staff" className="hover:text-[var(--color-gold)]">
              {t("staffLogin")}
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/icons/icon-192.png"
            alt="SKR IC"
            width={44}
            height={44}
            className="h-11 w-11 shrink-0 rounded-full bg-white object-contain shadow-sm ring-1 ring-white/20"
          />
          <div className="min-w-0 leading-tight">
            <div className="truncate text-base font-bold tracking-wide sm:text-lg">
              {t("fullName")}
            </div>
            <div className="truncate text-[10px] font-medium uppercase tracking-wider text-[var(--color-gold)] sm:text-xs">
              {t("itiName")}
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium transition hover:bg-white/10 hover:text-[var(--color-gold)]"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/admissions"
            className="ml-2 rounded-md bg-[var(--color-gold)] px-4 py-2 text-sm font-semibold text-[var(--color-navy-dark)] transition hover:bg-[var(--color-gold-light)]"
          >
            {t("applyNow")}
          </Link>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageToggle compact />
          <button
            type="button"
            className="rounded-md p-2 hover:bg-white/10"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-[var(--color-navy-dark)] px-4 py-3 lg:hidden">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-md px-3 py-2.5 text-sm font-medium hover:bg-white/10"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/admissions"
            className="mt-2 block rounded-md bg-[var(--color-gold)] px-3 py-2.5 text-center text-sm font-semibold text-[var(--color-navy-dark)]"
            onClick={() => setOpen(false)}
          >
            {t("applyNow")}
          </Link>
          <Link
            href="/login"
            className="mt-2 block rounded-md border border-white/20 px-3 py-2.5 text-center text-sm"
            onClick={() => setOpen(false)}
          >
            {t("login")}
          </Link>
        </div>
      )}
    </header>
  );
}
