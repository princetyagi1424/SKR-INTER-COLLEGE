"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, Phone, ArrowUpRight } from "lucide-react";

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

function isActivePath(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function PublicHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);


  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 shadow-[0_4px_24px_rgba(15,23,42,0.04)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link href="/" className="group flex min-w-0 shrink-0 items-center gap-3 rounded-xl" aria-label="S.K.R. Inter College home">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--color-navy)] via-[var(--color-blue)] to-sky-500 text-sm font-extrabold tracking-tight text-white shadow-md shadow-blue-950/15 transition-transform group-hover:-rotate-3">
            SKR
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block truncate text-xs font-extrabold tracking-wide text-slate-900 sm:text-sm">S.K.R. INTER COLLEGE</span>
            <span className="mt-1 block text-[9px] font-bold uppercase tracking-[0.14em] text-[var(--color-blue)] sm:text-[10px]">
              &amp; Private ITI · Agra
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Main navigation">
          {NAV.map((item) => {
            const active = isActivePath(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`whitespace-nowrap rounded-full px-2.5 py-2 text-[13px] font-semibold transition-colors 2xl:px-3 2xl:text-sm ${
                  active
                    ? "bg-blue-50 text-[var(--color-navy)]"
                    : "text-slate-600 hover:bg-slate-50 hover:text-[var(--color-navy)]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden shrink-0 items-center gap-2 xl:flex">
          <a href="tel:9837183726" className="inline-flex items-center gap-1.5 rounded-full px-2 py-2 text-xs font-semibold text-slate-500 transition hover:text-[var(--color-navy)] 2xl:px-3">
            <Phone className="h-3.5 w-3.5" aria-hidden="true" />
            <span>9837183726</span>
          </a>
          <Link href="/login" className="rounded-full px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">
            Login
          </Link>
          <Link href="/apply-now" className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-navy)] px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[var(--color-navy-dark)] hover:shadow-md">
            Apply now <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 xl:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          aria-controls="mobile-site-navigation"
        >
          {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </div>

      {open && (
        <nav id="mobile-site-navigation" className="border-t border-slate-100 bg-white px-4 pb-5 pt-3 shadow-lg xl:hidden" aria-label="Mobile navigation">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-2 sm:grid-cols-3">
            {NAV.map((item) => {
              const active = isActivePath(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-xl px-3 py-3 text-sm font-semibold transition ${
                    active ? "bg-blue-50 text-[var(--color-navy)] ring-1 ring-blue-100" : "text-slate-700 hover:bg-slate-50"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
          <div className="mx-auto mt-3 flex max-w-7xl flex-col gap-2 sm:flex-row">
            <Link href="/apply-now" onClick={() => setOpen(false)} className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[var(--color-navy)] px-4 py-3 text-sm font-bold text-white transition hover:bg-[var(--color-navy-dark)]">
              Apply for admission <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href="/login" onClick={() => setOpen(false)} className="flex flex-1 items-center justify-center rounded-full border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">
              Student / staff login
            </Link>
            <a href="tel:9837183726" className="flex flex-1 items-center justify-center gap-2 rounded-full bg-amber-50 px-4 py-3 text-sm font-bold text-amber-900 hover:bg-amber-100">
              <Phone className="h-4 w-4" aria-hidden="true" /> 9837183726
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
