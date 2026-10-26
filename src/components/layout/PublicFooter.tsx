import Link from "next/link";
import { Phone, MapPin, Mail, ArrowUpRight } from "lucide-react";

const QUICK_LINKS = [
  { href: "/about", label: "About the college" },
  { href: "/academics", label: "Academics" },
  { href: "/admissions", label: "Admissions" },
  { href: "/faculty", label: "Teaching staff" },
  { href: "/notices", label: "Notices & circulars" },
  { href: "/gallery", label: "Campus gallery" },
];

export function PublicFooter() {
  return (
    <footer className="mt-auto bg-[var(--color-navy-dark)] text-white">
      <div className="h-1 w-full bg-gradient-to-r from-[var(--color-gold)] via-sky-400 to-emerald-400" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 sm:py-14 md:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_0.9fr_1fr] lg:gap-8">
        <div>
          <Link href="/" className="mb-4 inline-flex items-center gap-3 rounded-xl" aria-label="S.K.R. Inter College home">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--color-gold)] text-sm font-extrabold text-[var(--color-navy-dark)] shadow-md">SKR</span>
            <span className="font-bold leading-tight">S.K.R. INTER COLLEGE<span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.14em] text-white/60">&amp; Private ITI · Agra</span></span>
          </Link>
          <p className="max-w-sm text-sm leading-6 text-white/70">
            Udaypur Khalsa, Post Bhadrauli, Bah, Pinahat, Agra, Uttar Pradesh — PIN 283113.
          </p>
          <a href="https://upmsp.edu.in/Pehchan/SchoolInformation.aspx?Code=011424" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-sky-200 transition hover:text-white">
            Official UPMSP profile <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--color-gold)]">Explore</h3>
          <ul className="space-y-2.5 text-sm text-white/75">
            {QUICK_LINKS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition hover:text-white hover:underline hover:underline-offset-4">{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--color-gold)]">Portals</h3>
          <ul className="space-y-2.5 text-sm text-white/75">
            <li><Link href="/login" className="transition hover:text-white hover:underline hover:underline-offset-4">Student login</Link></li>
            <li><Link href="/login" className="transition hover:text-white hover:underline hover:underline-offset-4">Parent login</Link></li>
            <li><Link href="/login" className="transition hover:text-white hover:underline hover:underline-offset-4">Teacher / staff login</Link></li>
            <li><Link href="/apply-now" className="transition hover:text-white hover:underline hover:underline-offset-4">Admission enquiry</Link></li>
            <li><Link href="/disclosures" className="transition hover:text-white hover:underline hover:underline-offset-4">Mandatory disclosures</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--color-gold)]">Get in touch</h3>
          <ul className="space-y-4 text-sm text-white/75">
            <li className="flex items-start gap-3">
              <span className="mt-0.5 rounded-lg bg-white/10 p-2"><Phone className="h-4 w-4 text-[var(--color-gold)]" aria-hidden="true" /></span>
              <div><a href="tel:9837183726" className="font-semibold text-white transition hover:text-sky-200">9837183726</a><p className="mt-0.5 text-xs text-white/50">School office</p></div>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 rounded-lg bg-white/10 p-2"><Mail className="h-4 w-4 text-[var(--color-gold)]" aria-hidden="true" /></span>
              <a href="mailto:skrintercollege@gmail.com" className="break-all transition hover:text-white">skrintercollege@gmail.com</a>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 rounded-lg bg-white/10 p-2"><MapPin className="h-4 w-4 text-[var(--color-gold)]" aria-hidden="true" /></span>
              <a href="https://maps.app.goo.gl/8XxfUuM4fMUAxzqd7" target="_blank" rel="noopener noreferrer" className="transition hover:text-white">Get directions on Google Maps</a>
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
