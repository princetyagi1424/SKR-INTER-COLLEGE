"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Phone, MapPin, Download } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageToggle } from "@/components/ui/LanguageToggle";

function useIsPwa() {
  const [isPwa, setIsPwa] = useState(false);
  useEffect(() => {
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      // @ts-expect-error iOS Safari
      window.navigator.standalone === true;
    setIsPwa(isStandalone);
  }, []);
  return isPwa;
}

export function PublicHeader() {
  const [open, setOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
  const { t } = useLanguage();
  const isPwa = useIsPwa();

  useEffect(() => {
    function onBip(e: Event) {
      e.preventDefault();
      setDeferredPrompt(e);
    }
    window.addEventListener("beforeinstallprompt", onBip);
    return () => window.removeEventListener("beforeinstallprompt", onBip);
  }, []);

  async function handleInstall() {
    if (!deferredPrompt) return;
    // @ts-expect-error prompt exists
    await deferredPrompt.prompt();
    setDeferredPrompt(null);
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
    <header className="sticky top-0 z-50 bg-white text-slate-800 shadow-sm border-b border-slate-200">
      {/* Top bar - only visible on desktop */}
      <div className="hidden border-b border-slate-100 bg-slate-50 px-4 py-1.5 text-xs sm:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="tel:9837183726" className="flex items-center gap-1.5 text-slate-600 hover:text-[#c8102e]">
              <Phone className="h-3.5 w-3.5" />
              9837183726
            </a>
            <span className="flex items-center gap-1.5 text-slate-500">
              <MapPin className="h-3.5 w-3.5" />
              {t("address")}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <LanguageToggle compact />
            <Link href="/login" className="text-slate-600 hover:text-[#c8102e]">
              {t("studentParentLogin")}
            </Link>
            <Link href="/login?role=staff" className="text-slate-600 hover:text-[#c8102e]">
              {t("staffLogin")}
            </Link>
          </div>
        </div>
      </div>

      {/* Main nav bar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/icons/icon-192.png"
            alt="SKR IC"
            width={44}
            height={44}
            className="h-11 w-11 shrink-0 rounded-full bg-[#fef2f2] object-contain shadow-sm ring-2 ring-[#c8102e]/20"
          />
          <div className="min-w-0 leading-tight">
            <div className="truncate text-base font-bold tracking-wide text-slate-900 sm:text-lg">
              {t("fullName")}
            </div>
            <div className="truncate text-[10px] font-medium uppercase tracking-wider text-[#c8102e] sm:text-xs">
              {t("itiName")}
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-[#c8102e]"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/admissions"
            className="ml-2 rounded-md bg-[#c8102e] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#a50d26]"
          >
            {t("applyNow")}
          </Link>
          {/* Download App button - only shown in browser (not in PWA/app) */}
          {!isPwa && (
            <button
              type="button"
              onClick={handleInstall}
              className="ml-1 inline-flex items-center gap-1.5 rounded-md border border-[#c8102e] px-3 py-2 text-sm font-medium text-[#c8102e] transition hover:bg-[#fef2f2]"
            >
              <Download className="h-4 w-4" />
              Download App
            </button>
          )}
        </nav>

        {/* Mobile right side */}
        <div className="flex items-center gap-2 lg:hidden">
          <LanguageToggle compact />
          {/* Download App button - only shown in browser (not in PWA/app) */}
          {!isPwa && (
            <button
              type="button"
              onClick={handleInstall}
              className="inline-flex items-center gap-1 rounded-full border border-[#c8102e] px-2.5 py-1.5 text-xs font-semibold text-[#c8102e] hover:bg-[#fef2f2]"
            >
              <Download className="h-3.5 w-3.5" />
              App
            </button>
          )}
          <button
            type="button"
            className="rounded-md p-2 text-slate-700 hover:bg-slate-100"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {open && (
        <div className="border-t border-slate-100 bg-white px-4 py-3 lg:hidden">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-md px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-[#c8102e]"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/admissions"
            className="mt-2 block rounded-md bg-[#c8102e] px-3 py-2.5 text-center text-sm font-semibold text-white"
            onClick={() => setOpen(false)}
          >
            {t("applyNow")}
          </Link>
          <Link
            href="/login"
            className="mt-2 block rounded-md border border-slate-200 px-3 py-2.5 text-center text-sm text-slate-700"
            onClick={() => setOpen(false)}
          >
            {t("login")}
          </Link>
        </div>
      )}
    </header>
  );
}
