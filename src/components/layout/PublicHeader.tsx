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
    <header className="sticky top-0 z-50 border-b border-[#efe6dc] bg-[#fff8f0]/92 shadow-[0_8px_30px_rgba(26,26,26,0.06)] backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link href="/" className="group flex min-w-0 shrink-0 items-center gap-3 rounded-xl" aria-label="S.K.R. Inter College home">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(145deg,#e31c23,#9a0c22)] text-sm font-extrabold tracking-tight text-white shadow-[0_10px_24px_rgba(200,16,46,0.35)] transition duration-300 group-hover:-rotate-6 group-hover:scale-105">
            SKR
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block truncate text-xs font-extrabold tracking-wide text-[#1a1a1a] sm:text-sm">
              S.K.R. INTER COLLEGE
            </span>
            <span className="mt-1 block text-[9px] font-bold uppercase tracking-[0.14em] text-[#c8102e] sm:text-[10px]">
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
                className={`rounded-full px-3.5 py-2 text-[13px] font-semibold transition ${
                  active
                    ? "bg-[#1a1a1a] text-white shadow-sm"
                    : "text-slate-600 hover:bg-[#f5ede3] hover:text-[#1a1a1a]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="tel:9837183726"
            className="hidden items-center gap-1.5 rounded-full border border-[#efe6dc] bg-white px-3 py-2 text-xs font-bold text-[#1a1a1a] shadow-sm transition hover:border-[#c8102e]/40 lg:inline-flex"
          >
            <Phone className="h-3.5 w-3.5 text-[#c8102e]" />
            9837183726
          </a>
          <Link
            href="/login"
            className="hidden rounded-full border border-[#efe6dc] bg-white px-3.5 py-2 text-xs font-bold text-[#1a1a1a] shadow-sm transition hover:bg-[#f5ede3] sm:inline-flex"
          >
            Portal
          </Link>
          <Link
            href="/apply-now"
            className="inline-flex items-center gap-1 rounded-full bg-[linear-gradient(135deg,#e31c23,#c8102e)] px-3.5 py-2 text-xs font-extrabold text-white shadow-[0_10px_22px_rgba(200,16,46,0.32)] transition hover:brightness-105 sm:px-4"
          >
            Apply
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
          <button
            type="button"
            className="inline-flex rounded-xl border border-[#efe6dc] bg-white p-2 text-[#1a1a1a] shadow-sm xl:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-[#efe6dc] bg-[#fff8f0] px-4 py-4 xl:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {NAV.map((item) => {
              const active = isActivePath(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-xl px-3 py-3 text-sm font-semibold ${
                    active ? "bg-[#1a1a1a] text-white" : "text-slate-700 hover:bg-[#f5ede3]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-xl border border-[#efe6dc] bg-white px-3 py-3 text-sm font-bold text-[#1a1a1a]"
            >
              Student / Parent / Staff portal
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
