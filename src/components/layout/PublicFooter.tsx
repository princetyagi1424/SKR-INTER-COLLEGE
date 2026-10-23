import Link from "next/link";
import { Phone, MapPin, Mail } from "lucide-react";

export function PublicFooter() {
  return (
    <footer className="bg-[var(--color-navy-dark)] text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-gold)] text-sm font-bold text-[var(--color-navy-dark)]">
              SKR
            </div>
            <span className="font-semibold">S.K.R. INTER COLLEGE</span>
          </div>
          <p className="text-sm leading-relaxed text-white/70">
            Udaypur Khalsa, Post Bhadrauli, Bah, Pinahat, Agra, Uttar Pradesh — PIN 283113
          </p>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--color-gold)]">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm text-white/80">
            <li><Link href="/about" className="hover:text-white">About Us</Link></li>
            <li><Link href="/academics" className="hover:text-white">Academics</Link></li>
            <li><Link href="/admissions" className="hover:text-white">Admissions</Link></li>
            <li><Link href="/notices" className="hover:text-white">Notices</Link></li>
            <li><Link href="/disclosures" className="hover:text-white">Mandatory Disclosures</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--color-gold)]">
            Portals
          </h3>
          <ul className="space-y-2 text-sm text-white/80">
            <li><Link href="/login" className="hover:text-white">Student Login</Link></li>
            <li><Link href="/login" className="hover:text-white">Parent Login</Link></li>
            <li><Link href="/login" className="hover:text-white">Teacher / Staff Login</Link></li>
            <li><Link href="/admissions" className="hover:text-white">Admission Enquiry</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--color-gold)]">
            Contact
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
                Get Directions on Google Maps
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-4">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 text-xs text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} S.K.R. INTER COLLEGE &amp; PVT ITI. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white">Terms of Use</Link>
            <Link href="/safeguarding" className="hover:text-white">Child Safeguarding</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
