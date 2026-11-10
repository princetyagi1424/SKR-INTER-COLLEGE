"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Phone, MapPin, Download, GraduationCap, UserCheck, ShieldCheck, ArrowRight, ExternalLink } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageToggle } from "@/components/ui/LanguageToggle";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

function useIsPwa() {
  const [isPwa, setIsPwa] = useState(false);
  useEffect(() => {
    const nav = window.navigator as Navigator & { standalone?: boolean };
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      nav.standalone === true;
    setIsPwa(!!isStandalone);
  }, []);
  return isPwa;
}

export function PublicHeader() {
  const [open, setOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const { t, locale } = useLanguage();
  const isPwa = useIsPwa();

  useEffect(() => {
    function onBip(e: Event) {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    }
    window.addEventListener("beforeinstallprompt", onBip);
    return () => window.removeEventListener("beforeinstallprompt", onBip);
  }, []);

  async function handleInstall() {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      setDeferredPrompt(null);
    } else {
      window.location.href = "/get-app";
    }
  }

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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)]">
      {/* Top Notification Announcement Bar */}
      <div className="bg-[#0f2744] text-white text-xs font-medium py-1.5 px-4 border-b border-amber-500/20">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="flex items-center gap-3 overflow-hidden text-slate-200">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#c9a227] text-[#0f2744] text-[10px] font-extrabold uppercase tracking-wider shrink-0">
              Notice
            </span>
            <span className="truncate text-xs text-white/90">
              {locale === "hi"
                ? "सत्र 2026-27 के लिए कक्षा 9, 10, 11, 12 एवं आईटीआई प्रवेश प्रारंभ | कोड: 011424"
                : "Admissions Open 2026–27 (Class 9, 10, 11, 12 & ITI Trades) • UPMSP Code: 011424"}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-5 text-xs text-slate-200 shrink-0">
            <a href="tel:9837183726" className="flex items-center gap-1.5 hover:text-[#c9a227] transition">
              <Phone className="h-3.5 w-3.5 text-[#c9a227]" />
              <span>+91 9837183726</span>
            </a>
            <span className="text-white/20">|</span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <MapPin className="h-3.5 w-3.5 text-[#c9a227]" />
              <span>Bah, Agra (UP)</span>
            </span>
            <span className="text-white/20">|</span>
            <LanguageToggle compact />
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5 sm:px-6 lg:px-8">
        {/* Brand Logo & Title */}
        <Link href="/" className="flex items-center gap-3 group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="S.K.R. Inter College Official Emblem"
            width={48}
            height={48}
            className="h-12 w-12 shrink-0 rounded-full bg-white object-contain p-0.5 shadow-md ring-2 ring-[#c9a227]/30 transition group-hover:scale-105"
          />
          <div className="min-w-0 leading-tight">
            <div className="text-base sm:text-lg font-extrabold tracking-tight text-[#0f2744] group-hover:text-[#1e3a5f] transition font-['Cinzel',serif]">
              S.K.R. INTER COLLEGE
            </div>
            <div className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#c9a227]">
              &amp; S.K.R. PVT ITI • Udaypur Khalsa, Agra
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-1 xl:gap-2 lg:flex" aria-label="Main Navigation">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100/80 hover:text-[#0f2744]"
            >
              {item.label}
            </Link>
          ))}

          {/* Apply Now Primary CTA */}
          <Link
            href="/admissions"
            className="ml-2 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#0f2744] to-[#1e3a5f] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition hover:shadow-md hover:from-[#1e3a5f] hover:to-[#2a4a73]"
          >
            {t("applyNow")}
            <ArrowRight className="h-3.5 w-3.5 text-[#c9a227]" />
          </Link>

          {/* Portal Dropdown / Login */}
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 transition hover:border-[#0f2744] hover:bg-slate-50 hover:text-[#0f2744]"
          >
            <GraduationCap className="h-3.5 w-3.5 text-[#0f2744]" />
            Portal
          </Link>

          {/* Download App Button - Browser Only (Hidden in PWA) */}
          {!isPwa && (
            <button
              type="button"
              onClick={handleInstall}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#c9a227] bg-amber-50/60 px-3.5 py-2 text-xs font-bold text-[#946c00] transition hover:bg-[#c9a227] hover:text-[#0f2744] hover:shadow-sm"
              title="Install official SKR College App"
            >
              <Download className="h-3.5 w-3.5 text-[#c9a227]" />
              App
            </button>
          )}
        </nav>

        {/* Mobile Header Controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <LanguageToggle compact />

          {/* Download App Button - Browser Only (Mobile) */}
          {!isPwa && (
            <button
              type="button"
              onClick={handleInstall}
              className="inline-flex items-center gap-1 rounded-full border border-[#c9a227] bg-amber-50 px-2.5 py-1.5 text-xs font-bold text-[#946c00]"
            >
              <Download className="h-3.5 w-3.5" />
              App
            </button>
          )}

          <button
            type="button"
            className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 transition focus:outline-none"
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation menu"
          >
            {open ? <X className="h-6 w-6 text-[#0f2744]" /> : <Menu className="h-6 w-6 text-[#0f2744]" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu - Pure Light Theme */}
      {open && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 shadow-xl lg:hidden animate-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col space-y-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-50 hover:text-[#0f2744]"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 gap-2">
            <Link
              href="/admissions"
              className="flex items-center justify-center gap-1.5 rounded-xl bg-[#0f2744] py-3 text-center text-xs font-bold text-white shadow-sm"
              onClick={() => setOpen(false)}
            >
              {t("applyNow")}
            </Link>
            <Link
              href="/login"
              className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-300 bg-slate-50 py-3 text-center text-xs font-bold text-slate-700"
              onClick={() => setOpen(false)}
            >
              <GraduationCap className="h-4 w-4" />
              {t("login")}
            </Link>
          </div>

          <div className="mt-3 flex items-center justify-center gap-4 text-xs text-slate-500 py-1">
            <a href="tel:9837183726" className="flex items-center gap-1 hover:text-[#0f2744]">
              <Phone className="h-3 w-3 text-[#c9a227]" /> 9837183726
            </a>
            <span>•</span>
            <Link href="/contact" onClick={() => setOpen(false)} className="hover:text-[#0f2744]">
              Udaypur Khalsa, Agra
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}