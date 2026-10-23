import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "S.K.R. INTER COLLEGE & PVT ITI | Agra, Uttar Pradesh",
    template: "%s | S.K.R. INTER COLLEGE",
  },
  description:
    "S.K.R. INTER COLLEGE & PVT ITI, Udaypur Khalsa, Bah, Pinahat, Agra — Quality education for High School, Intermediate and ITI programmes.",
  keywords: ["SKR Inter College", "Agra", "UP Board", "ITI", "Bah", "Pinahat"],
  authors: [{ name: "S.K.R. INTER COLLEGE" }],
  openGraph: {
    title: "S.K.R. INTER COLLEGE & PVT ITI",
    description: "Quality education in Agra, Uttar Pradesh",
    type: "website",
    locale: "en_IN",
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/manifest.json",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+Devanagari:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#1e3a5f" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </head>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
