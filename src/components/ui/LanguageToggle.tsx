"use client";

import { useLanguage } from "@/context/LanguageContext";

export function LanguageToggle({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale, t } = useLanguage();

  return (
    <div
      className={`inline-flex items-center rounded-full border border-slate-200 bg-slate-100 p-0.5 text-xs font-semibold ${
        compact ? "" : "shadow-sm"
      }`}
      role="group"
      aria-label={t("language")}
    >
      <button
        type="button"
        onClick={() => setLocale("en")}
        className={`rounded-full px-2.5 py-1 transition ${
          locale === "en"
            ? "bg-white text-[#c8102e] shadow-sm"
            : "text-slate-500 hover:text-slate-800"
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLocale("hi")}
        className={`rounded-full px-2.5 py-1 transition ${
          locale === "hi"
            ? "bg-white text-[#c8102e] shadow-sm"
            : "text-slate-500 hover:text-slate-800"
        }`}
      >
        हिं
      </button>
    </div>
  );
}
