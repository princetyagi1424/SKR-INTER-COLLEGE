"use client";

import { useLanguage } from "@/context/LanguageContext";

export function LanguageToggle({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale, t } = useLanguage();

  return (
    <div
      className={`inline-flex items-center rounded-full border border-slate-300 bg-slate-100 p-0.5 text-xs font-semibold ${
        compact ? "" : "shadow-sm"
      }`}
      role="group"
      aria-label={t("language")}
    >
      <button
        type="button"
        onClick={() => setLocale("en")}
        className={`rounded-full px-2.5 py-1 text-xs font-bold transition ${
          locale === "en"
            ? "bg-[#0f2744] text-white shadow-sm"
            : "text-slate-600 hover:text-slate-900"
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLocale("hi")}
        className={`rounded-full px-2.5 py-1 text-xs font-bold transition ${
          locale === "hi"
            ? "bg-[#0f2744] text-white shadow-sm"
            : "text-slate-600 hover:text-slate-900"
        }`}
      >
        हिं
      </button>
    </div>
  );
}