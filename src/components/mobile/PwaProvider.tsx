"use client";

import { useEffect, useRef, useState } from "react";
import { Download, RefreshCw, Share, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const UPDATE_FLAG = "skr-pwa-update-pending";

export function PwaProvider({ children }: { children: React.ReactNode }) {
  const { locale } = useLanguage();
  const hi = locale === "hi";

  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstall, setShowInstall] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [standalone, setStandalone] = useState(false);
  const waitingRef = useRef<ServiceWorker | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Restore sticky update state if user closed app without updating
    try {
      if (sessionStorage.getItem(UPDATE_FLAG) === "1") {
        setShowUpdate(true);
      }
    } catch {
      /* ignore */
    }

    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      // @ts-expect-error iOS Safari
      window.navigator.standalone === true;
    setStandalone(isStandalone);

    const ua = window.navigator.userAgent;
    const ios =
      /iPad|iPhone|iPod/.test(ua) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    setIsIos(ios);

    function onBip(e: Event) {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
      const dismissed = localStorage.getItem("skr-pwa-dismissed");
      if (!dismissed && !isStandalone) setShowInstall(true);
    }
    window.addEventListener("beforeinstallprompt", onBip);

    let updateInterval: ReturnType<typeof setInterval> | undefined;

    function markUpdateReady(worker: ServiceWorker | null) {
      if (!worker) return;
      waitingRef.current = worker;
      setShowUpdate(true);
      try {
        sessionStorage.setItem(UPDATE_FLAG, "1");
      } catch {
        /* ignore */
      }
    }

    function trackWorker(worker: ServiceWorker | null) {
      if (!worker) return;
      worker.addEventListener("statechange", () => {
        // New SW installed and there is an active controller → update available
        if (worker.state === "installed" && navigator.serviceWorker.controller) {
          markUpdateReady(worker);
        }
      });
    }

    let onControllerChange: (() => void) | null = null;

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => {
          if (reg.waiting && navigator.serviceWorker.controller) {
            markUpdateReady(reg.waiting);
          }

          reg.addEventListener("updatefound", () => {
            trackWorker(reg.installing);
          });

          // Poll for updates while app is open
          updateInterval = setInterval(() => {
            reg.update().catch(() => {});
          }, 3 * 60 * 1000);

          setTimeout(() => reg.update().catch(() => {}), 4000);
        })
        .catch(() => {});

      // After user taps Update → SKIP_WAITING → new controller → full reload
      let refreshing = false;
      onControllerChange = () => {
        if (refreshing) return;
        refreshing = true;
        try {
          sessionStorage.removeItem(UPDATE_FLAG);
        } catch {
          /* ignore */
        }
        window.location.reload();
      };
      navigator.serviceWorker.addEventListener("controllerchange", onControllerChange);
    }

    let iosTimer: ReturnType<typeof setTimeout> | undefined;
    if (ios && !isStandalone) {
      iosTimer = setTimeout(() => {
        if (!localStorage.getItem("skr-pwa-dismissed")) setShowInstall(true);
      }, 2500);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", onBip);
      if (onControllerChange) {
        navigator.serviceWorker.removeEventListener("controllerchange", onControllerChange);
      }
      if (updateInterval) clearInterval(updateInterval);
      if (iosTimer) clearTimeout(iosTimer);
    };
  }, []);

  async function install() {
    if (!deferred) return;
    await deferred.prompt();
    await deferred.userChoice;
    setDeferred(null);
    setShowInstall(false);
  }

  function dismissInstall() {
    setShowInstall(false);
    try {
      localStorage.setItem("skr-pwa-dismissed", "1");
    } catch {
      /* ignore */
    }
  }

  function applyUpdate() {
    const worker = waitingRef.current;
    if (worker) {
      worker.postMessage({ type: "SKIP_WAITING" });
    }
    // Safety reload if controllerchange is slow
    setTimeout(() => {
      try {
        sessionStorage.removeItem(UPDATE_FLAG);
      } catch {
        /* ignore */
      }
      window.location.reload();
    }, 600);
  }

  return (
    <>
      {children}

      {/* FORCE UPDATE — stays until user taps Update now. No dismiss. */}
      {showUpdate && (
        <div className="fixed inset-0 z-[80] flex items-end justify-center bg-black/40 p-4 sm:items-center">
          <div className="w-full max-w-md rounded-2xl border border-amber-200 bg-white p-5 shadow-2xl">
            <div className="flex items-start gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#0f2744] text-amber-300">
                <RefreshCw className="h-6 w-6" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-base font-bold text-[#1a1a1a]">
                  {hi ? "ऐप अपडेट आवश्यक है" : "Update required"}
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  {hi
                    ? "नया वर्शन उपलब्ध है। कृपया पहले अपडेट करें, उसके बाद ही ऐप का उपयोग जारी रखें।"
                    : "A new version is available. Please update first to continue using the app."}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={applyUpdate}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#c8102e] px-4 py-3.5 text-sm font-bold text-white shadow-lg active:scale-[0.98]"
            >
              <RefreshCw className="h-4 w-4" />
              {hi ? "अभी अपडेट करें" : "Update now"}
            </button>
            <p className="mt-3 text-center text-[11px] text-slate-400">
              {hi
                ? "अपडेट के बाद ऐप अपने आप रीस्टार्ट हो जाएगा"
                : "App will restart automatically after update"}
            </p>
          </div>
        </div>
      )}

      {/* Install banner — only when not installed and no update blocking */}
      {showInstall && !standalone && !showUpdate && (
        <div className="fixed inset-x-0 bottom-[calc(4.5rem+env(safe-area-inset-bottom))] z-[60] px-3 sm:bottom-4 sm:px-4 lg:bottom-6">
          <div className="mx-auto flex max-w-lg items-start gap-3 rounded-2xl border border-[#efe6dc] bg-white p-4 shadow-[0_16px_40px_rgba(26,26,26,0.18)]">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[linear-gradient(145deg,#e31c23,#9a0c22)] text-xs font-extrabold text-white">
              SKR
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-[#1a1a1a]">
                {hi ? "SKR College ऐप इंस्टॉल करें" : "Install SKR College app"}
              </p>
              <p className="mt-0.5 text-xs leading-5 text-slate-500">
                {isIos
                  ? hi
                    ? "Share दबाएँ, फिर Add to Home Screen चुनें।"
                    : "Tap Share, then Add to Home Screen for an app-like experience."
                  : hi
                    ? "होम स्क्रीन पर जोड़ें — तेज़ पहुँच और फुल-स्क्रीन मोड।"
                    : "Add to your home screen for faster access, offline pages and full-screen mode."}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {!isIos && deferred && (
                  <button
                    type="button"
                    onClick={install}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#c8102e] px-3.5 py-1.5 text-xs font-bold text-white"
                  >
                    <Download className="h-3.5 w-3.5" /> {hi ? "इंस्टॉल" : "Install"}
                  </button>
                )}
                {isIos && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#fff0f1] px-3.5 py-1.5 text-xs font-bold text-[#c8102e]">
                    <Share className="h-3.5 w-3.5" /> {hi ? "Share → Home Screen" : "Share → Add to Home Screen"}
                  </span>
                )}
                <button
                  type="button"
                  onClick={dismissInstall}
                  className="rounded-full px-3 py-1.5 text-xs font-semibold text-slate-500"
                >
                  {hi ? "अभी नहीं" : "Not now"}
                </button>
              </div>
            </div>
            <button
              type="button"
              onClick={dismissInstall}
              className="rounded-lg p-1 text-slate-400 hover:bg-slate-50"
              aria-label="Dismiss"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
