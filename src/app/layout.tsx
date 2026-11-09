import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AppProviders } from "@/components/providers/AppProviders";

export const metadata: Metadata = {
  title: {
    default: "SKR IC | S.K.R. INTER COLLEGE & PVT ITI",
    template: "%s | SKR IC",
  },
  description:
    "S.K.R. INTER COLLEGE & PVT ITI, Udaypur Khalsa, Bah, Pinahat, Agra — Quality education for High School, Intermediate and ITI programmes.",
  keywords: ["SKR IC", "SKR Inter College", "Agra", "UP Board", "ITI", "Bah", "Pinahat"],
  authors: [{ name: "S.K.R. INTER COLLEGE" }],
  openGraph: {
    title: "SKR IC — S.K.R. INTER COLLEGE & PVT ITI",
    description: "Quality education in Agra, Uttar Pradesh",
    type: "website",
    locale: "en_IN",
    images: [{ url: "/icons/icon-512.png", width: 512, height: 512, alt: "SKR IC" }],
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
  themeColor: "#c8102e",
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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+Devanagari:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="SKR IC" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16.png" />
      </head>
      <body className="min-h-screen antialiased font-[Inter,'Noto_Sans_Devanagari',system-ui,sans-serif]">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
