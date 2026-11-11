"use client";

import { useLanguage } from "@/context/LanguageContext";

export function LanguageToggle({
  compact = false,
  variant = "light",
}: {
  compact?: boolean;
  variant?: "light" | "dark";
}) {
  const { locale, setLocale, t } = useLanguage();
  const dark = variant === "dark";

  return (
    <div
      className={`inline-flex items-center rounded-full p-0.5 text-xs font-semibold ${
        dark
          ? "border border-white/25 bg-white/10"
          : "border border-slate-300 bg-slate-100"
      } ${compact ? "" : "shadow-sm"}`}
      role="group"
      aria-label={t("language")}
    >
      <button
        type="button"
        onClick={() => setLocale("en")}
        className={`rounded-full px-2.5 py-1 text-xs font-bold transition ${
          locale === "en"
            ? dark
              ? "bg-white text-[#0f2744] shadow-sm"
              : "bg-[#0f2744] text-white shadow-sm"
            : dark
              ? "text-white/80 hover:text-white"
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
            ? dark
              ? "bg-white text-[#0f2744] shadow-sm"
              : "bg-[#0f2744] text-white shadow-sm"
            : dark
              ? "text-white/80 hover:text-white"
              : "text-slate-600 hover:text-slate-900"
        }`}
      >
        हिं
      </button>
    </div>
  );
}
