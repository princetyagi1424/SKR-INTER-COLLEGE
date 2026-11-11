"use client";

import { LanguageProvider } from "@/context/LanguageContext";
import { SplashScreen } from "@/components/mobile/SplashScreen";
import { PwaProvider } from "@/components/mobile/PwaProvider";
import type { ReactNode } from "react";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <PwaProvider>
        <SplashScreen />
        {children}
      </PwaProvider>
    </LanguageProvider>
  );
}
