import Link from "next/link";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import {
  BookOpen,
  Users,
  Award,
  Calendar,
  FileText,
  GraduationCap,
  ArrowRight,
  MapPin,
  Phone,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[var(--color-navy-dark)] via-[var(--color-navy)] to-[var(--color-navy-light)] text-white">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-[var(--color-gold)] blur-3xl" />
          </div>
          <div className="relative mx-auto max-w-7xl px-4 py-16 sm:py-24 lg:py-28">
            <div className="max-w-2xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[var(--color-gold)]">
                Udaypur Khalsa, Agra · Uttar Pradesh
              </p>
              <h1 className="mb-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                S.K.R. INTER COLLEGE
                <span className="block text-xl font-medium text-[var(--color-gold)] sm:text-2xl">
                  &amp; Private ITI
                </span>
              </h1>
              <p className="mb-8 text-base leading-relaxed text-white/80 sm:text-lg">
                A trusted educational institution serving High School, Intermediate (UP Board)
                and ITI programmes — nurturing rural students with knowledge, values and skills.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/admissions"
                  className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-gold)] px-6 py-3 text-sm font-semibold text-[var(--color-navy-dark)] transition hover:bg-[var(--color-gold-light)]"
                >
                  Online Admission Enquiry
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Student / Parent Login
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Quick links */}
        <section className="border-b bg-[var(--color-cream)]">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-slate-200 sm:grid-cols-4">
            {[
              { href: "/notices", icon: FileText, label: "Notices & Circulars" },
              { href: "/login", icon: GraduationCap, label: "Results Login" },
              { href: "/academics", icon: Calendar, label: "Academic Calendar" },
              { href: "/contact", icon: Phone, label: "Contact Us" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center gap-2 bg-white px-4 py-6 text-center transition hover:bg-slate-50"
              >
                <item.icon className="h-7 w-7 text-[var(--color-navy)]" />
                <span className="text-sm font-medium text-slate-700">{item.label}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* About teaser */}
        <section className="mx-auto max-w-7xl px-4 py-16">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="mb-2 text-sm font-semibold uppercase tracking-widest text-[var(--color-gold)]">
                About the Institution
              </h2>
              <h3 className="mb-4 text-2xl font-bold text-[var(--color-navy)] sm:text-3xl">
                Building futures through quality education
              </h3>
              <p className="mb-4 leading-relaxed text-slate-600">
                S.K.R. INTER COLLEGE &amp; PVT ITI is located at Udaypur Khalsa, Post Bhadrauli,
                Bah, Pinahat, Agra. The institution is committed to providing accessible,
                value-based education to students from surrounding rural communities.
              </p>
              <p className="mb-6 leading-relaxed text-slate-600">
                We offer programmes under the Inter College stream and a Private ITI division.
                Academic details, affiliations and recognition information are maintained by
                the school administration and published only after official verification.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-navy)] hover:underline"
              >
                Learn more about us <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: BookOpen, title: "Academics", desc: "UP Board curriculum & ITI trades" },
                { icon: Users, title: "Dedicated Faculty", desc: "Committed teaching staff" },
                { icon: Award, title: "Holistic Growth", desc: "Values, skills & knowledge" },
                { icon: MapPin, title: "Rural Focus", desc: "Serving local communities" },
              ].map((c) => (
                <div
                  key={c.title}
                  className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm"
                >
                  <c.icon className="mb-3 h-8 w-8 text-[var(--color-navy)]" />
                  <h4 className="mb-1 font-semibold text-slate-800">{c.title}</h4>
                  <p className="text-xs text-slate-500">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA band */}
        <section className="bg-[var(--color-navy)] py-12 text-white">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 sm:flex-row">
            <div>
              <h2 className="text-xl font-bold sm:text-2xl">Ready to join S.K.R. Inter College?</h2>
              <p className="mt-1 text-white/70">Submit an admission enquiry or contact the school office.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/admissions"
                className="rounded-lg bg-[var(--color-gold)] px-5 py-2.5 text-sm font-semibold text-[var(--color-navy-dark)] hover:bg-[var(--color-gold-light)]"
              >
                Admission Enquiry
              </Link>
              <a
                href="https://maps.app.goo.gl/8XxfUuM4fMUAxzqd7"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-white/30 px-5 py-2.5 text-sm font-semibold hover:bg-white/10"
              >
                Get Directions
              </a>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
