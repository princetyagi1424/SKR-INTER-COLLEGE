"use client";

import { useEffect, useState } from "react";
import { Download, RefreshCw, Share, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

export function PwaProvider({ children }: { children: React.ReactNode }) {
  const { locale } = useLanguage();
  const hi = locale === "hi";

  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstall, setShowInstall] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [standalone, setStandalone] = useState(false);
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

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
    let registration: ServiceWorkerRegistration | null = null;

    function trackWorker(worker: ServiceWorker | null) {
      if (!worker) return;
      worker.addEventListener("statechange", () => {
        if (worker.state === "installed" && navigator.serviceWorker.controller) {
          setWaitingWorker(worker);
          setShowUpdate(true);
        }
      });
    }

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => {
          registration = reg;

          if (reg.waiting && navigator.serviceWorker.controller) {
            setWaitingWorker(reg.waiting);
            setShowUpdate(true);
          }

          reg.addEventListener("updatefound", () => {
            trackWorker(reg.installing);
          });

          // Check for updates periodically (especially useful for installed apps)
          updateInterval = setInterval(() => {
            reg.update().catch(() => {});
          }, 5 * 60 * 1000);

          // Check once shortly after open
          setTimeout(() => reg.update().catch(() => {}), 8000);
        })
        .catch(() => {});

      // When a new SW takes control after SKIP_WAITING, reload once
      let refreshing = false;
      const onControllerChange = () => {
        if (refreshing) return;
        refreshing = true;
        window.location.reload();
      };
      navigator.serviceWorker.addEventListener("controllerchange", onControllerChange);

      return () => {
        window.removeEventListener("beforeinstallprompt", onBip);
        navigator.serviceWorker.removeEventListener("controllerchange", onControllerChange);
        if (updateInterval) clearInterval(updateInterval);
      };
    }

    if (ios && !isStandalone) {
      const t = setTimeout(() => {
        if (!localStorage.getItem("skr-pwa-dismissed")) setShowInstall(true);
      }, 2500);
      return () => {
        clearTimeout(t);
        window.removeEventListener("beforeinstallprompt", onBip);
      };
    }

    return () => window.removeEventListener("beforeinstallprompt", onBip);
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
    const worker = waitingWorker;
    if (worker) {
      worker.postMessage({ type: "SKIP_WAITING" });
    }
    // Fallback reload if controllerchange does not fire quickly
    setTimeout(() => window.location.reload(), 400);
  }

  function dismissUpdate() {
    setShowUpdate(false);
  }

  return (
    <>
      {children}

      {/* Update banner — for users who already installed the app */}
      {showUpdate && (
        <div className="fixed inset-x-0 top-[calc(0.75rem+env(safe-area-inset-top))] z-[70] px-3 sm:px-4">
          <div className="mx-auto flex max-w-lg items-start gap-3 rounded-2xl border border-amber-200 bg-white p-4 shadow-[0_16px_40px_rgba(26,26,26,0.18)]">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0f2744] text-amber-300">
              <RefreshCw className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-[#1a1a1a]">
                {hi ? "ऐप अपडेट उपलब्ध है" : "App update available"}
              </p>
              <p className="mt-0.5 text-xs leading-5 text-slate-500">
                {hi
                  ? "नया वर्शन तैयार है। बेहतर अनुभव के लिए अभी अपडेट करें।"
                  : "A new version is ready. Update now for the latest features and fixes."}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={applyUpdate}
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#c8102e] px-3.5 py-1.5 text-xs font-bold text-white"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  {hi ? "अभी अपडेट करें" : "Update now"}
                </button>
                <button
                  type="button"
                  onClick={dismissUpdate}
                  className="rounded-full px-3 py-1.5 text-xs font-semibold text-slate-500"
                >
                  {hi ? "बाद में" : "Later"}
                </button>
              </div>
            </div>
            <button
              type="button"
              onClick={dismissUpdate}
              className="rounded-lg p-1 text-slate-400 hover:bg-slate-50"
              aria-label="Dismiss"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Install banner — only when not already installed */}
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
