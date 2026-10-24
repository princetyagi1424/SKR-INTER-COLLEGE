"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Phone, MapPin } from "lucide-react";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/academics", label: "Academics" },
  { href: "/admissions", label: "Admissions" },
  { href: "/notices", label: "Notices" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export function PublicHeader() {
  const [open, setOpen] = useState(false);

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
              Udaypur Khalsa, Bah, Agra — 283113
            </span>
          </div>
          <div className="flex gap-3">
            <Link href="/login" className="hover:text-[var(--color-gold)]">
              Student / Parent Login
            </Link>
            <Link href="/login?role=staff" className="hover:text-[var(--color-gold)]">
              Staff Login
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-gold)] text-lg font-bold text-[var(--color-navy-dark)]">
            SKR
          </div>
          <div className="leading-tight">
            <div className="text-base font-bold tracking-wide sm:text-lg">S.K.R. INTER COLLEGE</div>
            <div className="text-[10px] font-medium uppercase tracking-wider text-[var(--color-gold)] sm:text-xs">
              & Private ITI
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
            href="/apply-now"
            className="ml-2 rounded-md bg-[var(--color-gold)] px-4 py-2 text-sm font-semibold text-[var(--color-navy-dark)] transition hover:bg-[var(--color-gold-light)]"
          >
            Apply Now
          </Link>
        </nav>

        <button
          type="button"
          className="rounded-md p-2 hover:bg-white/10 lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
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
            href="/apply-now"
            className="mt-2 block rounded-md bg-[var(--color-gold)] px-3 py-2.5 text-center text-sm font-semibold text-[var(--color-navy-dark)]"
            onClick={() => setOpen(false)}
          >
            Apply Now
          </Link>
          <Link
            href="/login"
            className="mt-2 block rounded-md border border-white/20 px-3 py-2.5 text-center text-sm"
            onClick={() => setOpen(false)}
          >
            Login
          </Link>
        </div>
      )}
    </header>
  );
}
