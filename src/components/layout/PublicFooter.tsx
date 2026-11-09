"use client";

import Link from "next/link";
import { Phone, MapPin } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function PublicFooter() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[var(--color-navy-dark)] text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="mb-3 flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/icons/icon-192.png"
              alt="SKR IC"
              width={36}
              height={36}
              className="h-9 w-9 rounded-full bg-white object-contain"
            />
            <span className="font-semibold">{t("fullName")}</span>
          </div>
          <p className="text-sm leading-relaxed text-white/70">{t("address")}</p>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--color-gold)]">
            {t("quickLinks")}
          </h3>
          <ul className="space-y-2 text-sm text-white/80">
            <li><Link href="/about" className="hover:text-white">{t("about")}</Link></li>
            <li><Link href="/academics" className="hover:text-white">{t("academics")}</Link></li>
            <li><Link href="/admissions" className="hover:text-white">{t("admissions")}</Link></li>
            <li><Link href="/notices" className="hover:text-white">{t("notices")}</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--color-gold)]">
            {t("portals")}
          </h3>
          <ul className="space-y-2 text-sm text-white/80">
            <li><Link href="/login" className="hover:text-white">{t("studentParentLogin")}</Link></li>
            <li><Link href="/login?role=staff" className="hover:text-white">{t("staffLogin")}</Link></li>
            <li><Link href="/admissions" className="hover:text-white">{t("onlineAdmission")}</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--color-gold)]">
            {t("contact")}
          </h3>
          <ul className="space-y-2 text-sm text-white/80">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-[var(--color-gold)]" />
              <a href="tel:9837183726">9837183726</a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-gold)]" />
              <a
                href="https://maps.app.goo.gl/8XxfUuM4fMUAxzqd7"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                {t("getDirections")}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-4">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 text-xs text-white/50 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {t("fullName")} &amp; {t("itiName")}. {t("allRights")}
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white">{t("privacy")}</Link>
            <Link href="/terms" className="hover:text-white">{t("terms")}</Link>
            <Link href="/safeguarding" className="hover:text-white">{t("safeguarding")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
