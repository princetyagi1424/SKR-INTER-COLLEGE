"use client";

import Link from "next/link";
import { Phone, MapPin, Mail, ExternalLink, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function PublicFooter() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#0f2744] text-white border-t-2 border-[#c9a227]">
      {/* Upper Main Footer Grid */}
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:px-8 sm:grid-cols-2 lg:grid-cols-4">
        {/* Col 1: Brand & Affiliation Badges */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="S.K.R. Inter College Official Emblem"
              width={48}
              height={48}
              className="h-12 w-12 rounded-full bg-white object-contain p-0.5 shadow-md ring-2 ring-[#c9a227]/40"
            />
            <div>
              <div className="font-extrabold text-sm sm:text-base font-['Cinzel',serif] tracking-tight">
                S.K.R. INTER COLLEGE
              </div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-[#c9a227]">
                &amp; S.K.R. PVT ITI • Agra
              </div>
            </div>
          </div>

          <p className="text-xs leading-relaxed text-slate-300">
            Dedicated rural educational institution recognized by Uttar Pradesh Madhyamik Shiksha Parishad (UPMSP) providing High School, Intermediate &amp; Technical ITI trades.
          </p>

          <div className="space-y-1.5 text-xs text-slate-300 border-t border-white/10 pt-3">
            <div><strong>UPMSP School Code:</strong> 011424</div>
            <div><strong>UDISE+ Code:</strong> 09181302903</div>
            <div><strong>DIOS Office:</strong> Agra District, Uttar Pradesh</div>
          </div>
        </div>

        {/* Col 2: Academic Links */}
        <div>
          <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-[#c9a227] flex items-center gap-1.5">
            Academic Streams
          </h3>
          <ul className="space-y-2 text-xs text-slate-300">
            <li><Link href="/academics" className="hover:text-white transition">High School (Class 9 &amp; 10)</Link></li>
            <li><Link href="/academics" className="hover:text-white transition">Humanities (Arts Stream)</Link></li>
            <li><Link href="/academics" className="hover:text-white transition">Science (PCB / PCM)</Link></li>
            <li><Link href="/academics" className="hover:text-white transition">Agriculture (Part 1 &amp; 2)</Link></li>
            <li><Link href="/academics" className="hover:text-white transition">Commerce Stream</Link></li>
            <li><Link href="/academics" className="hover:text-[#c9a227] font-semibold transition">S.K.R. Private ITI Technical Trades</Link></li>
            <li><Link href="/faculty" className="hover:text-white transition">Faculty &amp; Teaching Staff</Link></li>
          </ul>
        </div>

        {/* Col 3: Portals & Government Links */}
        <div>
          <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-[#c9a227]">
            Portals &amp; Official Links
          </h3>
          <ul className="space-y-2 text-xs text-slate-300">
            <li><Link href="/login" className="hover:text-white transition">Student &amp; Parent Portal</Link></li>
            <li><Link href="/login?role=staff" className="hover:text-white transition">Staff &amp; Faculty Login</Link></li>
            <li><Link href="/admissions" className="hover:text-white transition">Online Admission Enquiry</Link></li>
            <li><Link href="/notices" className="hover:text-white transition">Official Circulars &amp; Notices</Link></li>
            <li><Link href="/gallery" className="hover:text-white transition">Campus Photo Gallery</Link></li>
            <li className="pt-2 border-t border-white/10">
              <a
                href="https://upmsp.edu.in/Pehchan/SchoolInformation.aspx?Code=011424"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-slate-300 hover:text-amber-300 transition"
              >
                UPMSP Pehchan Portal <ExternalLink className="h-3 w-3" />
              </a>
            </li>
            <li>
              <a
                href="https://services.india.gov.in/service/detail/scholarship-and-fee-reimbursement-online-system-uttar-pradesh-1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-slate-300 hover:text-amber-300 transition"
              >
                UP Scholarship System <ExternalLink className="h-3 w-3" />
              </a>
            </li>
          </ul>
        </div>

        {/* Col 4: Institutional Contact */}
        <div>
          <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-[#c9a227]">
            Contact &amp; Location
          </h3>
          <ul className="space-y-3 text-xs text-slate-300">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#c9a227]" />
              <span>
                Udaypur Khalsa, Post Bhadrauli, Tehsil: Bah, Block: Pinahat, Agra, Uttar Pradesh – 283113
              </span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-[#c9a227]" />
              <a href="tel:9837183726" className="hover:text-white font-semibold">+91 9837183726</a>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-emerald-400" />
              <a href="tel:9719903732" className="hover:text-white">Principal: +91 9719903732</a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 shrink-0 text-[#c9a227]" />
              <a href="mailto:skrintercollege@gmail.com" className="hover:text-white">skrintercollege@gmail.com</a>
            </li>
            <li className="pt-2">
              <a
                href="https://maps.app.goo.gl/8XxfUuM4fMUAxzqd7"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-[11px] font-semibold text-slate-200 hover:bg-white/10 hover:text-white transition"
              >
                <MapPin className="h-3 w-3 text-[#c9a227]" />
                Get Driving Directions on Google Maps
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Sub-Footer */}
      <div className="border-t border-white/10 bg-[#091b30] px-4 py-4 text-xs text-slate-400">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} S.K.R. INTER COLLEGE &amp; S.K.R. PVT ITI (UPMSP Code: 011424). {t("allRights")}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
            <Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-white transition">Terms of Use</Link>
            <span>•</span>
            <Link href="/safeguarding" className="hover:text-white transition">Student Safety</Link>
            <span>•</span>
            <Link href="/disclosures" className="hover:text-white transition">Mandatory Disclosures</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
