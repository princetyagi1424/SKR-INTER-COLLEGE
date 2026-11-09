import type { Metadata, Viewport } from "next";
import "./globals.css";
import { PwaProvider } from "@/components/mobile/PwaProvider";
import { MobileBottomNav } from "@/components/mobile/MobileBottomNav";

export const metadata: Metadata = {
  title: {
    default: "S.K.R. INTER COLLEGE & PVT ITI | Agra, Uttar Pradesh",
    template: "%s | S.K.R. INTER COLLEGE",
  },
  description:
    "S.K.R. INTER COLLEGE & PVT ITI, Udaypur Khalsa, Bah, Pinahat, Agra — Quality education for High School, Intermediate and ITI programmes. Installable school app for students, parents and staff.",
  keywords: ["SKR Inter College", "Agra", "UP Board", "ITI", "Bah", "Pinahat", "school app"],
  authors: [{ name: "S.K.R. INTER COLLEGE" }],
  applicationName: "SKR College",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "SKR College",
  },
  formatDetection: {
    telephone: true,
  },
  openGraph: {
    title: "S.K.R. INTER COLLEGE & PVT ITI",
    description: "Quality education in Agra, Uttar Pradesh — website & school portals",
    type: "website",
    locale: "en_IN",
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/api/pwa-icon?size=192", sizes: "192x192", type: "image/png" },
      { url: "/api/pwa-icon?size=512", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/api/pwa-icon?size=180", sizes: "180x180" }],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#c8102e" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1a1a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Noto+Sans+Devanagari:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="apple-touch-icon" href="/api/pwa-icon?size=180" />
      </head>
      <body className="min-h-screen antialiased app-shell">
        <PwaProvider>
          {children}
          <MobileBottomNav />
        </PwaProvider>
      </body>
    </html>
  );
}
