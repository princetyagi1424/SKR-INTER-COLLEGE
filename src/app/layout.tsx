import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AppProviders } from "@/components/providers/AppProviders";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  metadataBase: new URL("https://skr-inter-college.vercel.app"),
  title: {
    default: "S.K.R. INTER COLLEGE & PVT ITI | Bah, Agra (UPMSP: 011424)",
    template: "%s | S.K.R. INTER COLLEGE",
  },
  description:
    "S.K.R. INTER COLLEGE & S.K.R. PVT ITI, Udaypur Khalsa, Post Bhadrauli, Bah, Pinahat, Agra, Uttar Pradesh – 283113. Quality UP Board High School, Intermediate and ITI vocational education.",
  keywords: ["SKR IC", "SKR Inter College", "Agra", "UP Board", "ITI", "Bah", "Pinahat", "011424", "UDISE 09181302903"],
  authors: [{ name: "S.K.R. INTER COLLEGE" }],
  openGraph: {
    title: "S.K.R. INTER COLLEGE & PVT ITI — Agra, Uttar Pradesh",
    description: "Quality Education for High School, Intermediate & ITI in Agra",
    type: "website",
    locale: "en_IN",
    images: [{ url: "/logo.png", width: 512, height: 512, alt: "S.K.R. Inter College Official Emblem" }],
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/icons/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "SKR IC",
  },
  applicationName: "SKR IC",
};

export const viewport: Viewport = {
  themeColor: "#0f2744",
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
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700;800&family=Inter:wght@300;400;500;600;700&family=Noto+Sans+Devanagari:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="SKR IC" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16.png" />
      </head>
      <body className="min-h-screen antialiased bg-[#fdfdfd] text-slate-900 font-['Inter',system-ui,sans-serif]">
        <AppProviders>{children}</AppProviders>
        <Analytics />
      </body>
    </html>
  );
}
