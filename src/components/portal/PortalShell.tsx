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
    <div className="min-h-screen bg-[var(--color-cream)]">
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-[var(--color-navy)] text-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              className="rounded-lg p-2 hover:bg-white/10 lg:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--color-gold)] text-sm font-bold text-[var(--color-navy-dark)]">
              SKR
            </div>
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold">{title}</div>
              {subtitle && <div className="truncate text-xs text-white/65">{subtitle}</div>}
            </div>
          </div>
          <form action="/api/auth/logout" method="POST">
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-3 py-1.5 text-xs font-medium hover:bg-white/10"
            >
              <LogOut className="h-3.5 w-3.5" /> Logout
            </button>
          </form>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6 lg:py-8">
        <aside
          className={`${
            open ? "block" : "hidden"
          } w-full shrink-0 lg:block lg:w-56`}
        >
          <nav className="card-surface sticky top-20 space-y-0.5 p-2" aria-label="Portal">
            {nav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-lg px-3 py-2 text-sm font-medium transition ${
                    active
                      ? "bg-[var(--color-navy)] text-white"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
