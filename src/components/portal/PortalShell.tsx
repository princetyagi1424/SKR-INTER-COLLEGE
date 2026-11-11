"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LogOut, Menu, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import type { TranslationKey } from "@/lib/i18n";

export type PortalNavItem = {
  href: string;
  labelKey?: TranslationKey;
  label?: string;
};

export function PortalShell({
  title,
  subtitle,
  nav,
  children,
}: {
  title: string;
  subtitle?: string;
  nav: PortalNavItem[];
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const { t } = useLanguage();

  async function handleLogout() {
    if (loggingOut) return;
    setLoggingOut(true);
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
        redirect: "manual",
      });
    } catch {
      /* still leave */
    }
    window.location.replace("/login?loggedOut=1");
  }

  const bottom = nav.slice(0, 4);

  function itemLabel(item: PortalNavItem) {
    if (item.labelKey) return t(item.labelKey);
    return item.label || item.href;
  }

  return (
    <div className="portal-app-shell min-h-screen bg-[#fff8f0]">
      <div className="mx-auto flex min-h-screen max-w-[1440px]">
        <aside
          className={`${
            open ? "fixed inset-y-0 left-0 z-50 flex" : "hidden lg:flex"
          } w-64 flex-col border-r border-[#efe6dc] bg-white shadow-sm`}
        >
          <div className="flex items-center gap-3 border-b border-[#efe6dc] px-5 py-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[linear-gradient(145deg,#e31c23,#9a0c22)] text-sm font-bold text-white">
              SKR
            </div>
            <div>
              <div className="text-sm font-bold text-[#1a1a1a]">{t("eduPortal")}</div>
              <div className="text-[10px] font-medium uppercase tracking-wide text-[#c8102e]">
                {t("portalWord")}
              </div>
            </div>
            <button
              type="button"
              className="ml-auto rounded-lg p-1.5 text-slate-400 hover:bg-[#fff0f1] lg:hidden"
              onClick={() => setOpen(false)}
              aria-label={t("closeMenu")}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex-1 space-y-0.5 overflow-y-auto p-3" aria-label={t("portalWord")}>
            {nav.map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href + "/"));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                    active
                      ? "bg-[#fff0f1] font-semibold text-[#c8102e] shadow-sm"
                      : "text-slate-600 hover:bg-[#f5ede3] hover:text-[#1a1a1a]"
                  }`}
                >
                  {itemLabel(item)}
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-[#efe6dc] p-3 space-y-2">
            <div className="px-1">
              <LanguageToggle />
            </div>
            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-500 hover:bg-[#fff0f1] hover:text-[#c8102e] disabled:opacity-60"
            >
              <LogOut className="h-4 w-4" />
              {loggingOut ? t("loggingOut") : t("logout")}
            </button>
          </div>
        </aside>

        {open && (
          <button
            type="button"
            className="fixed inset-0 z-40 bg-black/30 lg:hidden"
            aria-label={t("closeMenu")}
            onClick={() => setOpen(false)}
          />
        )}

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-[#efe6dc] bg-[#fff8f0]/92 px-4 py-3 backdrop-blur-md sm:px-6">
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                className="rounded-xl p-2 text-slate-600 hover:bg-white lg:hidden"
                onClick={() => setOpen(true)}
                aria-label={t("openMenu")}
              >
                <Menu className="h-5 w-5" />
              </button>
              <div className="min-w-0">
                <div className="truncate text-sm font-bold text-[#1a1a1a]">{title}</div>
                {subtitle && <div className="truncate text-xs text-slate-500">{subtitle}</div>}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <LanguageToggle compact />
              <Link
                href="/"
                className="hidden text-xs font-semibold text-[#c8102e] hover:underline sm:inline"
              >
                {t("publicWebsite")}
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                disabled={loggingOut}
                className="inline-flex items-center gap-1.5 rounded-xl bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm ring-1 ring-[#efe6dc] hover:text-[#c8102e] disabled:opacity-60"
              >
                <LogOut className="h-3.5 w-3.5" />
                {loggingOut ? t("loggingOut") : t("logout")}
              </button>
            </div>
          </header>

          <main className="flex-1 px-4 py-5 sm:px-6 sm:py-6">{children}</main>

          <nav className="fixed bottom-0 left-0 right-0 z-40 flex border-t border-[#efe6dc] bg-white/95 backdrop-blur lg:hidden">
            {bottom.map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href + "/"));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex flex-1 flex-col items-center justify-center gap-0.5 py-2 text-[10px] font-semibold ${
                    active ? "text-[#c8102e]" : "text-slate-500"
                  }`}
                >
                  <span className="max-w-[4.5rem] truncate">{itemLabel(item)}</span>
                </Link>
              );
            })}
          </nav>
          <div className="h-14 lg:hidden" />
        </div>
      </div>
    </div>
  );
}
