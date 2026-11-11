"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { ArrowRight } from "lucide-react";

const STAFF_ROLES = [
  "SUPER_ADMIN",
  "PRINCIPAL",
  "SCHOOL_ADMIN",
  "ADMISSION_OFFICER",
  "EXAM_CONTROLLER",
  "ACCOUNTANT",
  "HR",
  "LIBRARIAN",
  "TRANSPORT_MANAGER",
  "STAFF",
];

export default function LoginPage() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || t("loginFailed"));
        return;
      }
      const role = data.user?.role;
      let dest = "/";
      if (STAFF_ROLES.includes(role)) dest = "/admin/dashboard";
      else if (role === "TEACHER") dest = "/teacher/dashboard";
      else if (role === "STUDENT") dest = "/student/dashboard";
      else if (role === "PARENT") dest = "/parent/dashboard";
      window.location.assign(dest);
      return;
    } catch {
      setError(t("networkError"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-slate-50 via-white to-slate-100 px-4 py-8">
      <header className="absolute top-4 left-4 right-4 flex items-center justify-between max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white/80 backdrop-blur px-3 py-1.5 rounded-full border border-slate-200 shadow-sm transition"
        >
          ← {t("backToHome")}
        </Link>
        <div className="bg-white/90 backdrop-blur rounded-full p-1 border border-slate-200 shadow-sm">
          <LanguageToggle />
        </div>
      </header>

      <div className="w-full max-w-md pt-12 sm:pt-6">
        <div className="rounded-3xl bg-white p-7 sm:p-9 shadow-xl shadow-slate-200/60 border border-slate-200/80">
          <div className="mb-6 text-center">
            <div className="relative mx-auto mb-3 h-20 w-20 rounded-full bg-amber-50/50 p-1 shadow-md ring-2 ring-amber-300">
              <Image
                src="/logo.png"
                alt={t("fullName")}
                width={80}
                height={80}
                className="h-full w-full rounded-full object-contain"
                priority
              />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-[#0f2444]">{t("portalLoginTitle")}</h1>
            <p className="mt-1 text-xs text-slate-500">{t("portalLoginSubtitle")}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-xl bg-red-50 border border-red-200 px-3.5 py-2.5 text-xs font-medium text-red-700" role="alert">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-600">
                {t("emailOrPhone")}
              </label>
              <input
                id="email"
                type="text"
                autoComplete="username"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-slate-50/50 px-3.5 py-2.5 text-sm font-medium text-slate-900 outline-none transition focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100"
                placeholder={t("emailOrPhone")}
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-600">
                {t("password")}
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-slate-50/50 px-3.5 py-2.5 text-sm font-medium text-slate-900 outline-none transition focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100"
                placeholder="••••••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0f2444] to-[#1e3a5f] py-3 text-sm font-bold text-white shadow-md shadow-blue-950/20 transition hover:from-[#0b1a32] hover:to-[#162c4a] active:scale-[0.99] disabled:opacity-60"
            >
              {loading ? (
                <span>{t("verifying")}</span>
              ) : (
                <>
                  <span>{t("signInToPortal")}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="mt-5 text-center text-[11px] text-slate-500">{t("forgotLogin")}</p>
        </div>

        <p className="mt-6 text-center text-xs text-slate-500">
          {t("schoolCodeLabel")}: <span className="font-semibold text-slate-700">011424</span> · {t("udiseLabel")}:{" "}
          <span className="font-semibold text-slate-700">09181302903</span>
        </p>
      </div>
    </div>
  );
}
