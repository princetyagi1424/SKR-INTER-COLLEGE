"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

const SPLASH_KEY = "skr-ic-splash-seen";
const SPLASH_MS = 2800;

export function SplashScreen() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    let skip = false;
    try {
      if (sessionStorage.getItem(SPLASH_KEY) === "1") {
        skip = true;
      }
    } catch {
      /* ignore */
    }

    if (skip) {
      setVisible(false);
      return;
    }

    const showTimer = setTimeout(() => setShowContent(true), 80);
    const fadeTimer = setTimeout(() => setFadeOut(true), SPLASH_MS - 500);
    const hideTimer = setTimeout(() => {
      setVisible(false);
      try {
        sessionStorage.setItem(SPLASH_KEY, "1");
      } catch {
        /* ignore */
      }
    }, SPLASH_MS);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden transition-opacity duration-500 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      role="dialog"
      aria-label="App loading"
    >
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{
          backgroundImage: "url(/api/campus-image)",
          filter: "blur(2px)",
          transform: showContent ? "scale(1.08)" : "scale(1.02)",
          transition: "transform 3s ease-out",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/70" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.45)_100%)]" />

      <div
        className={`relative z-10 flex flex-col items-center px-6 text-center transition-all duration-700 ${
          showContent ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/icons/icon-192.png"
          alt=""
          width={96}
          height={96}
          className={`mb-5 h-24 w-24 rounded-full bg-white/95 object-contain p-1 shadow-2xl ring-2 ring-white/40 transition-transform duration-1000 ${
            showContent ? "scale-100" : "scale-75"
          }`}
        />
        <h1 className="text-2xl font-bold tracking-wide text-white drop-shadow-lg sm:text-3xl">
          {t("splashTitle")}
        </h1>
        <p className="mt-1.5 text-base font-medium text-[#f5d76e] drop-shadow sm:text-lg">
          {t("splashSubtitle")}
        </p>
        <p className="mt-3 max-w-xs text-xs text-white/80 sm:text-sm">
          {t("tagline")}
        </p>

        <div className="mt-8 h-1 w-40 overflow-hidden rounded-full bg-white/20">
          <div className="skr-splash-progress-bar h-full rounded-full bg-[#c8102e]" />
        </div>
        <p className="mt-3 text-[11px] uppercase tracking-widest text-white/60">
          {t("splashLoading")}
        </p>
      </div>
    </div>
  );
}
