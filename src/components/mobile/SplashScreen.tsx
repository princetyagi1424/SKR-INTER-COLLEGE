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
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, rgba(200,16,46,0.35) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(30,58,95,0.9) 0%, #0a1628 70%), linear-gradient(160deg, #1a2744 0%, #0f1c2e 40%, #1a0a0e 100%)",
          transform: showContent ? "scale(1.05)" : "scale(1)",
          transition: "transform 3s ease-out",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(0,0,0,0.55)_100%)]" />
      <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#c8102e] to-transparent opacity-80" />

      <div
        className={`relative z-10 flex flex-col items-center px-6 text-center transition-all duration-700 ${
          showContent ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/icons/icon-192.png"
          alt=""
          width={104}
          height={104}
          className={`mb-5 h-[104px] w-[104px] rounded-full bg-white object-contain p-1.5 shadow-2xl ring-2 ring-white/50 transition-transform duration-1000 ${
            showContent ? "scale-100" : "scale-75"
          }`}
        />
        <h1 className="text-2xl font-bold tracking-wide text-white drop-shadow-lg sm:text-3xl">
          {t("splashTitle")}
        </h1>
        <p className="mt-1.5 text-base font-medium text-[#f5d76e] drop-shadow sm:text-lg">
          {t("splashSubtitle")}
        </p>
        <p className="mt-3 max-w-xs text-xs text-white/75 sm:text-sm">
          {t("tagline")}
        </p>

        <div className="mt-8 h-1 w-44 overflow-hidden rounded-full bg-white/20">
          <div className="skr-splash-progress-bar h-full rounded-full bg-[#c8102e]" />
        </div>
        <p className="mt-3 text-[11px] uppercase tracking-widest text-white/55">
          {t("splashLoading")}
        </p>
      </div>
    </div>
  );
}
