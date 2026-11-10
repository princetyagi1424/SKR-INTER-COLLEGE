"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Info, GraduationCap, Bell, User } from "lucide-react";

const ITEMS = [
  { href: "/", label: "Home", icon: Home, match: (p: string) => p === "/" },
  { href: "/about", label: "About", icon: Info, match: (p: string) => p.startsWith("/about") },
  { href: "/admissions", label: "Admit", icon: GraduationCap, match: (p: string) => p.startsWith("/admissions") || p.startsWith("/apply-now") },
  { href: "/notices", label: "Notices", icon: Bell, match: (p: string) => p.startsWith("/notices") },
  { href: "/login", label: "Portal", icon: User, match: (p: string) => p.startsWith("/login") },
];

function isPortalPath(pathname: string) {
  return (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/teacher") ||
    pathname.startsWith("/student") ||
    pathname.startsWith("/parent")
  );
}

export function MobileBottomNav() {
  const pathname = usePathname();
  if (isPortalPath(pathname)) return null;

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden"
      aria-label="App navigation"
    >
      <div className="mx-auto flex max-w-lg items-stretch justify-between px-1 pt-1">
        {ITEMS.map((item) => {
          const active = item.match(pathname);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex min-w-0 flex-1 flex-col items-center gap-0.5 rounded-xl px-1 py-2 text-[10px] font-semibold transition ${
                active ? "text-[#c8102e]" : "text-slate-400 hover:text-slate-700"
              }`}
            >
              <span className={`flex h-8 w-8 items-center justify-center rounded-xl ${active ? "bg-[#fef2f2]" : ""}`}>
                <Icon className="h-5 w-5" strokeWidth={active ? 2.4 : 2} />
              </span>
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
