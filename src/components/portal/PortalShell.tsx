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

  return (
    <div className="min-h-screen bg-[#eef2f7]">
      <div className="mx-auto flex min-h-screen max-w-[1440px]">
        <aside
          className={`${
            open ? "fixed inset-y-0 left-0 z-50 flex" : "hidden lg:flex"
          } w-64 flex-col border-r border-slate-100 bg-white shadow-sm`}
        >
          <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-sm font-bold text-white">
              SKR
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">EduSKR</div>
              <div className="text-[10px] font-medium uppercase tracking-wide text-slate-400">Portal</div>
            </div>
            <button
              type="button"
              className="ml-auto rounded-lg p-1.5 text-slate-400 hover:bg-slate-50 lg:hidden"
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
                      ? "bg-emerald-50 text-emerald-700 shadow-sm"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-slate-100 p-3">
            <form action="/api/auth/logout" method="POST">
              <button
                type="submit"
                className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-500 hover:bg-red-50 hover:text-red-600"
              >
                <LogOut className="h-4 w-4" /> Logout
              </button>
            </form>
          </div>
        </aside>

        {open && (
          <button
            type="button"
            className="fixed inset-0 z-40 bg-slate-900/30 lg:hidden"
            aria-label="Close overlay"
            onClick={() => setOpen(false)}
          />
        )}

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-slate-100 bg-white/90 px-4 py-3 backdrop-blur-md sm:px-6">
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                className="rounded-xl p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
              <div className="min-w-0">
                <div className="truncate text-sm font-bold text-slate-900">{title}</div>
                {subtitle && <div className="truncate text-xs text-slate-500">{subtitle}</div>}
              </div>
            </div>
            <Link href="/" className="hidden text-xs font-semibold text-emerald-600 hover:underline sm:inline">
              Public website
            </Link>
          </header>
          <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
