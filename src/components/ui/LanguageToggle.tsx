"use client";

import { useLanguage } from "@/context/LanguageContext";

export function LanguageToggle({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale, t } = useLanguage();

  return (
    <div
      className={`inline-flex items-center rounded-full border border-white/20 bg-black/20 p-0.5 text-xs font-semibold backdrop-blur-sm ${
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
            ? "bg-white text-[#c8102e] shadow"
            : "text-white/80 hover:text-white"
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLocale("hi")}
        className={`rounded-full px-2.5 py-1 transition ${
          locale === "hi"
            ? "bg-white text-[#c8102e] shadow"
            : "text-white/80 hover:text-white"
        }`}
      >
        हिं
      </button>
    </div>
  );
}
