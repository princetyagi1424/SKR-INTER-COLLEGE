"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LogOut, Menu, X } from "lucide-react";

export type PortalNavItem = { href: string; label: string };

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

  return (
    <div className="min-h-screen bg-[#fff8f0]">
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
              <div className="text-sm font-bold text-[#1a1a1a]">EduSKR</div>
              <div className="text-[10px] font-medium uppercase tracking-wide text-[#c8102e]">Portal</div>
            </div>
            <button
              type="button"
              className="ml-auto rounded-lg p-1.5 text-slate-400 hover:bg-[#fff0f1] lg:hidden"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex-1 space-y-0.5 overflow-y-auto p-3" aria-label="Portal">
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
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-[#efe6dc] p-3">
            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-500 hover:bg-[#fff0f1] hover:text-[#c8102e] disabled:opacity-60"
            >
              <LogOut className="h-4 w-4" />
              {loggingOut ? "Logging out…" : "Logout"}
            </button>
          </div>
        </aside>

        {open && (
          <button
            type="button"
            className="fixed inset-0 z-40 bg-black/30 lg:hidden"
            aria-label="Close overlay"
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
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
              <div className="min-w-0">
                <div className="truncate text-sm font-bold text-[#1a1a1a]">{title}</div>
                {subtitle && <div className="truncate text-xs text-slate-500">{subtitle}</div>}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/" className="hidden text-xs font-semibold text-[#c8102e] hover:underline sm:inline">
                Public website
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                disabled={loggingOut}
                className="rounded-full border border-[#efe6dc] bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-[#fff0f1] disabled:opacity-60"
              >
                {loggingOut ? "…" : "Logout"}
              </button>
            </div>
          </header>
          <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
