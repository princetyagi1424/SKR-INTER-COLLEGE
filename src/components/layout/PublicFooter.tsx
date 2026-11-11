"use client";

import Link from "next/link";
import { Phone, MapPin, Mail, ExternalLink } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function PublicFooter() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#0f2744] text-white border-t-2 border-[#c9a227]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:px-8 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt={t("fullName")}
              width={48}
              height={48}
              className="h-12 w-12 rounded-full bg-white object-contain p-0.5 shadow-md ring-2 ring-[#c9a227]/40"
            />
            <div>
              <div className="font-extrabold text-sm sm:text-base tracking-tight">{t("fullName")}</div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-[#c9a227]">
                {t("brandSubtitle")}
              </div>
            </div>
          </div>
          <p className="text-xs leading-relaxed text-slate-300">{t("footerAboutText")}</p>
          <div className="space-y-1.5 text-xs text-slate-300 border-t border-white/10 pt-3">
            <div><strong>{t("schoolCodeLabel")}:</strong> 011424</div>
            <div><strong>{t("udiseLabel")}:</strong> 09181302903</div>
            <div><strong>{t("diosLabel")}:</strong> {t("diosValue")}</div>
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-[#c9a227]">{t("academicStreams")}</h3>
          <ul className="space-y-2 text-xs text-slate-300">
            <li><Link href="/academics" className="hover:text-white transition">{t("highSchoolClasses")}</Link></li>
            <li><Link href="/academics" className="hover:text-white transition">{t("humanitiesArts")}</Link></li>
            <li><Link href="/academics" className="hover:text-white transition">{t("scienceStream")}</Link></li>
            <li><Link href="/academics" className="hover:text-white transition">{t("agricultureStream")}</Link></li>
            <li><Link href="/academics" className="hover:text-white transition">{t("commerceStream")}</Link></li>
            <li><Link href="/academics" className="hover:text-[#c9a227] font-semibold transition">{t("itiTrades")}</Link></li>
            <li><Link href="/faculty" className="hover:text-white transition">{t("facultyStaff")}</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-[#c9a227]">{t("portalsOfficial")}</h3>
          <ul className="space-y-2 text-xs text-slate-300">
            <li><Link href="/login" className="hover:text-white transition">{t("studentParentPortal")}</Link></li>
            <li><Link href="/login?role=staff" className="hover:text-white transition">{t("staffFacultyLogin")}</Link></li>
            <li><Link href="/admissions" className="hover:text-white transition">{t("onlineAdmission")}</Link></li>
            <li><Link href="/notices" className="hover:text-white transition">{t("officialCirculars")}</Link></li>
            <li><Link href="/gallery" className="hover:text-white transition">{t("campusGallery")}</Link></li>
            <li className="pt-2 border-t border-white/10">
              <a href="https://upmsp.edu.in/Pehchan/SchoolInformation.aspx?Code=011424" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-slate-300 hover:text-amber-300 transition">
                {t("upmspPehchan")} <ExternalLink className="h-3 w-3" />
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-[#c9a227]">{t("contactUs")}</h3>
          <ul className="space-y-3 text-xs text-slate-300">
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#c9a227]" /><span>{t("address")}</span></li>
            <li className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 shrink-0 text-[#c9a227]" /><a href="tel:9837183726" className="hover:text-white">9837183726</a></li>
            <li className="flex items-center gap-2"><Mail className="h-3.5 w-3.5 shrink-0 text-[#c9a227]" /><span>omkartyagi75@gmail.com</span></li>
          </ul>
          <div className="mt-4 flex flex-wrap gap-2 text-[10px]">
            <Link href="/privacy" className="hover:text-white underline-offset-2 hover:underline">{t("privacy")}</Link>
            <span className="text-white/30">·</span>
            <Link href="/terms" className="hover:text-white underline-offset-2 hover:underline">{t("terms")}</Link>
            <span className="text-white/30">·</span>
            <Link href="/safeguarding" className="hover:text-white underline-offset-2 hover:underline">{t("safeguarding")}</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-[11px] text-slate-400">
        © {new Date().getFullYear()} {t("fullName")}. {t("allRights")}
      </div>
    </footer>
  );
}
