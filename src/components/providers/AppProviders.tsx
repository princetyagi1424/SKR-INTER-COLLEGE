"use client";

import { LanguageProvider } from "@/context/LanguageContext";
import { SplashScreen } from "@/components/mobile/SplashScreen";
import type { ReactNode } from "react";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <SplashScreen />
      {children}
    </LanguageProvider>
  );
}
