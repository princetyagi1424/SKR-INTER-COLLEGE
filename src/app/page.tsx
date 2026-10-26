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
  ClipboardList,
  Image as ImageIcon,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-cream)]">
      <PublicHeader />
      <main className="flex-1">
        <section className="relative overflow-hidden bg-gradient-to-br from-[var(--color-navy-dark)] via-[var(--color-navy)] to-[var(--color-navy-light)] text-white">
          <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[var(--color-sky)]/20 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-[var(--color-teal)]/15 blur-3xl" />
          <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:py-20 lg:grid-cols-2 lg:items-center lg:py-24">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-gold)]">
                Udaypur Khalsa · Agra · Uttar Pradesh
              </p>
              <h1 className="mb-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                S.K.R. INTER COLLEGE
                <span className="mt-1 block text-xl font-medium text-[var(--color-sky)] sm:text-2xl">
                  & Private ITI
                </span>
              </h1>
              <p className="mb-8 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
                A rural institution committed to accessible Intermediate (UP Board) and ITI education —
                knowledge, values and skills for local students and families.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/apply-now" className="btn-primary">
                  Apply for Admission
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/login" className="btn-secondary">
                  Student / Parent Login
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap gap-4 text-sm text-white/75">
                <a href="tel:9837183726" className="inline-flex items-center gap-2 hover:text-white">
                  <Phone className="h-4 w-4 text-[var(--color-gold)]" /> 9837183726
                </a>
                <a
                  href="https://maps.app.goo.gl/8XxfUuM4fMUAxzqd7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-white"
                >
                  <MapPin className="h-4 w-4 text-[var(--color-gold)]" /> Get directions
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {[
                { title: "Inter College", desc: "High School & Intermediate pathways" },
                { title: "Private ITI", desc: "Skill-focused trade programmes" },
                { title: "Parent portal", desc: "Attendance, results & notices" },
                { title: "Secure ERP", desc: "Staff, exams & admissions tools" },
              ].map((c) => (
                <div key={c.title} className="rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur-sm sm:p-5">
                  <div className="mb-2 text-sm font-semibold text-white">{c.title}</div>
                  <p className="text-xs leading-relaxed text-white/65">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-slate-100 sm:grid-cols-5">
            {[
              { href: "/apply-now", icon: ClipboardList, label: "Admission enquiry" },
              { href: "/notices", icon: FileText, label: "Notices" },
              { href: "/calendar", icon: Calendar, label: "Academic calendar" },
              { href: "/login", icon: GraduationCap, label: "Results login" },
              { href: "/contact", icon: Phone, label: "Contact office" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex flex-col items-center gap-2 bg-white px-3 py-6 text-center transition hover:bg-[var(--color-cream)]"
              >
                <item.icon className="h-6 w-6 text-[var(--color-blue)]" />
                <span className="text-xs font-semibold text-slate-700 sm:text-sm">{item.label}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-teal)]">About</p>
              <h2 className="mb-4 text-2xl font-bold text-[var(--color-navy)] sm:text-3xl">
                Quality education for rural communities
              </h2>
              <p className="mb-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                S.K.R. INTER COLLEGE & PVT ITI serves families around Udaypur Khalsa, Post Bhadrauli,
                Bah, Pinahat, Agra. Academic programmes, recognition details and fee schedules are published
                only after office verification.
              </p>
              <p className="mb-6 text-sm leading-relaxed text-slate-600 sm:text-base">
                Parents can submit an online enquiry, and enrolled students can access attendance, homework
                and published results through the secure portal.
              </p>
              <Link href="/about" className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-blue)] hover:underline">
                Learn more <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {[
                { icon: BookOpen, title: "Academics", desc: "UP Board pathways & ITI trades" },
                { icon: Users, title: "Guidance", desc: "Dedicated teaching staff" },
                { icon: Award, title: "Values", desc: "Discipline, honesty, effort" },
                { icon: ImageIcon, title: "Campus life", desc: "Events shared after approval" },
              ].map((c) => (
                <div key={c.title} className="card-surface p-4 sm:p-5">
                  <c.icon className="mb-3 h-7 w-7 text-[var(--color-blue)]" />
                  <h3 className="mb-1 text-sm font-semibold text-slate-900">{c.title}</h3>
                  <p className="text-xs text-slate-500">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-14">
          <div className="mx-auto max-w-7xl px-4">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-teal)]">Admission</p>
                <h2 className="text-2xl font-bold text-[var(--color-navy)]">Start an online enquiry</h2>
              </div>
              <Link href="/admissions" className="hidden text-sm font-semibold text-[var(--color-blue)] hover:underline sm:inline">
                Full process
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { n: "1", t: "Submit enquiry", d: "Fill /apply-now with student and guardian details." },
                { n: "2", t: "Office follow-up", d: "Staff contacts you on the registered mobile." },
                { n: "3", t: "Complete admission", d: "Bring documents to the office for verification." },
              ].map((s) => (
                <div key={s.n} className="card-surface p-5">
                  <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-navy)] text-sm font-bold text-[var(--color-gold)]">
                    {s.n}
                  </div>
                  <h3 className="mb-1 font-semibold text-slate-900">{s.t}</h3>
                  <p className="text-sm text-slate-500">{s.d}</p>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Link href="/apply-now" className="btn-primary !bg-[var(--color-navy)] !text-white hover:!bg-[var(--color-navy-light)]">
                Open admission form
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-[var(--color-navy)] py-12 text-white">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-bold sm:text-2xl">Visit the campus office</h2>
              <p className="mt-1 text-sm text-white/70">Mon–Sat working hours · Call before long travel when possible.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="tel:9837183726" className="btn-primary">
                Call 9837183726
              </a>
              <a
                href="https://maps.app.goo.gl/8XxfUuM4fMUAxzqd7"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                Google Maps
              </a>
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
