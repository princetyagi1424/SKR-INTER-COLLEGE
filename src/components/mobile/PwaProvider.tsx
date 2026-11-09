"use client";

import { useEffect, useState } from "react";
import { Download, Share, X } from "lucide-react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

export function PwaProvider({ children }: { children: React.ReactNode }) {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [show, setShow] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [standalone, setStandalone] = useState(false);

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

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }

    function onBip(e: Event) {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
      const dismissed = localStorage.getItem("skr-pwa-dismissed");
      if (!dismissed && !isStandalone) setShow(true);
    }
    window.addEventListener("beforeinstallprompt", onBip);

    if (ios && !isStandalone) {
      const t = setTimeout(() => {
        if (!localStorage.getItem("skr-pwa-dismissed")) setShow(true);
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
    setShow(false);
  }

  function dismiss() {
    setShow(false);
    try {
      localStorage.setItem("skr-pwa-dismissed", "1");
    } catch {
      /* ignore */
    }
  }

  return (
    <>
      {children}
      {show && !standalone && (
        <div className="fixed inset-x-0 bottom-[calc(4.5rem+env(safe-area-inset-bottom))] z-[60] px-3 sm:bottom-4 sm:px-4 lg:bottom-6">
          <div className="mx-auto flex max-w-lg items-start gap-3 rounded-2xl border border-[#efe6dc] bg-white p-4 shadow-[0_16px_40px_rgba(26,26,26,0.18)]">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[linear-gradient(145deg,#e31c23,#9a0c22)] text-xs font-extrabold text-white">
              SKR
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-[#1a1a1a]">Install SKR College app</p>
              <p className="mt-0.5 text-xs leading-5 text-slate-500">
                {isIos
                  ? "Tap Share, then Add to Home Screen for an app-like experience."
                  : "Add to your home screen for faster access, offline pages and full-screen mode."}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {!isIos && deferred && (
                  <button
                    type="button"
                    onClick={install}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#c8102e] px-3.5 py-1.5 text-xs font-bold text-white"
                  >
                    <Download className="h-3.5 w-3.5" /> Install
                  </button>
                )}
                {isIos && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#fff0f1] px-3.5 py-1.5 text-xs font-bold text-[#c8102e]">
                    <Share className="h-3.5 w-3.5" /> Share → Add to Home Screen
                  </span>
                )}
                <button type="button" onClick={dismiss} className="rounded-full px-3 py-1.5 text-xs font-semibold text-slate-500">
                  Not now
                </button>
              </div>
            </div>
            <button type="button" onClick={dismiss} className="rounded-lg p-1 text-slate-400 hover:bg-slate-50" aria-label="Dismiss">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
