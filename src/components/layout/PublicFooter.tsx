import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

export function PublicFooter() {
  return (
    <footer className="mt-auto bg-[#141414] text-white">
      <div className="h-1.5 w-full bg-[linear-gradient(90deg,#c8102e_0%,#e31c23_40%,#f5d76e_100%)]" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-1">
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(145deg,#e31c23,#9a0c22)] text-sm font-extrabold text-white">
              SKR
            </span>
            <div>
              <div className="text-sm font-extrabold">S.K.R. INTER COLLEGE</div>
              <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#f5d76e]">
                &amp; Private ITI
              </div>
            </div>
          </div>
          <p className="text-sm leading-7 text-white/65">
            Udaypur Khalsa, Post Bhadrauli, Bah, Pinahat, Agra, Uttar Pradesh — 283113
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-extrabold uppercase tracking-[0.18em] text-[#f5d76e]">Explore</h3>
          <ul className="space-y-2.5 text-sm text-white/75">
            <li><Link href="/about" className="transition hover:text-white">About</Link></li>
            <li><Link href="/academics" className="transition hover:text-white">Academics</Link></li>
            <li><Link href="/faculty" className="transition hover:text-white">Faculty</Link></li>
            <li><Link href="/gallery" className="transition hover:text-white">Gallery</Link></li>
            <li><Link href="/notices" className="transition hover:text-white">Notices</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-extrabold uppercase tracking-[0.18em] text-[#f5d76e]">Admissions</h3>
          <ul className="space-y-2.5 text-sm text-white/75">
            <li><Link href="/admissions" className="transition hover:text-white">Admission info</Link></li>
            <li><Link href="/apply-now" className="transition hover:text-white">Admission enquiry</Link></li>
            <li><Link href="/disclosures" className="transition hover:text-white">Mandatory disclosures</Link></li>
            <li><Link href="/downloads" className="transition hover:text-white">Downloads</Link></li>
            <li><Link href="/login" className="transition hover:text-white">Portal login</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-extrabold uppercase tracking-[0.18em] text-[#f5d76e]">Get in touch</h3>
          <ul className="space-y-4 text-sm text-white/75">
            <li className="flex items-start gap-3">
              <span className="mt-0.5 rounded-lg bg-white/10 p-2"><Phone className="h-4 w-4 text-[#c8102e]" /></span>
              <div>
                <a href="tel:9837183726" className="font-semibold text-white transition hover:text-[#f7c5cb]">9837183726</a>
                <p className="mt-0.5 text-xs text-white/50">School office</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 rounded-lg bg-white/10 p-2"><Mail className="h-4 w-4 text-[#c8102e]" /></span>
              <a href="mailto:skrintercollege@gmail.com" className="break-all transition hover:text-white">
                skrintercollege@gmail.com
              </a>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 rounded-lg bg-white/10 p-2"><MapPin className="h-4 w-4 text-[#c8102e]" /></span>
              <a href="https://maps.app.goo.gl/8XxfUuM4fMUAxzqd7" target="_blank" rel="noopener noreferrer" className="transition hover:text-white">
                Get directions on Google Maps
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-5 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 text-xs text-white/50 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} S.K.R. INTER COLLEGE &amp; PVT ITI. All rights reserved.</p>
          <nav className="flex flex-wrap gap-x-4 gap-y-2" aria-label="Legal links">
            <Link href="/privacy" className="transition hover:text-white">Privacy policy</Link>
            <Link href="/terms" className="transition hover:text-white">Terms of use</Link>
            <Link href="/safeguarding" className="transition hover:text-white">Child safeguarding</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
