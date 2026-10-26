"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/academics", label: "Academics" },
  { href: "/admissions", label: "Admissions" },
  { href: "/faculty", label: "Faculty" },
  { href: "/notices", label: "Notices" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export function PublicHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--color-navy)] to-[var(--color-blue)] text-sm font-bold text-white shadow-md">
            SKR
          </div>
          <div className="leading-tight">
            <div className="text-sm font-bold text-slate-900 sm:text-base">S.K.R. INTER COLLEGE</div>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-blue)]">
              & Private ITI · Agra
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-[var(--color-navy)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <a href="tel:9837183726" className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-medium text-slate-500 hover:text-[var(--color-navy)]">
            <Phone className="h-3.5 w-3.5" /> 9837183726
          </a>
          <Link href="/login" className="rounded-full px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            Login
          </Link>
          <Link
            href="/apply-now"
            className="rounded-full bg-[var(--color-navy)] px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-[var(--color-navy-dark)]"
          >
            Apply Now
          </Link>
        </div>

        <button
          type="button"
          className="rounded-xl p-2 text-slate-700 hover:bg-slate-100 lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-100 bg-white px-4 py-3 lg:hidden" role="dialog" aria-label="Mobile menu">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/apply-now"
            className="mt-2 block rounded-full bg-[var(--color-navy)] px-3 py-2.5 text-center text-sm font-semibold text-white"
            onClick={() => setOpen(false)}
          >
            Apply Now
          </Link>
          <Link
            href="/login"
            className="mt-2 block rounded-full border border-slate-200 px-3 py-2.5 text-center text-sm font-medium"
            onClick={() => setOpen(false)}
          >
            Login
          </Link>
        </div>
      )}
    </header>
  );
}
