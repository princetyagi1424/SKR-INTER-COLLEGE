import Link from "next/link";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { galleryImages, schoolProfile, UPMSP_SOURCE } from "@/data/upmsp";
import {
  BookOpen,
  Users,
  Award,
  MapPin,
  Phone,
  ArrowRight,
  GraduationCap,
  Wrench,
  Shield,
  Sparkles,
  ClipboardList,
  FileText,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-cream)]">
      <PublicHeader />
      <main className="flex-1">
        <section className="relative overflow-hidden px-4 pb-24 pt-10 sm:pt-14">
          <div className="hero-mesh relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] px-6 py-14 text-white shadow-[var(--shadow-soft)] sm:px-12 sm:py-20">
            <div className="pointer-events-none absolute -right-10 top-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-sky-400/20 blur-3xl" />

            <div className="relative grid items-center gap-10 lg:grid-cols-2">
              <div>
                <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sky-100 backdrop-blur">
                  <Sparkles className="h-3.5 w-3.5" />
                  Udaypur Khalsa · Bah · Agra
                </span>
                <h1 className="mb-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                  Building futures through
                  <span className="block text-sky-200">quality education</span>
                </h1>
                <p className="mb-8 max-w-lg text-sm leading-relaxed text-white/80 sm:text-base">
                  S.K.R. INTER COLLEGE &amp; Private ITI serves local families with Intermediate (UP Board)
                  pathways and skill-focused ITI programmes — knowledge, values and practical training.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link href="/apply-now" className="btn-primary">
                    Apply for Admission <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link href="/about" className="btn-secondary">
                    About the college
                  </Link>
                </div>
                <div className="mt-8 flex flex-wrap gap-5 text-sm text-white/75">
                  <a href="tel:9837183726" className="inline-flex items-center gap-2 hover:text-white">
                    <Phone className="h-4 w-4 text-amber-300" /> 9837183726
                  </a>
                  <a
                    href="https://maps.app.goo.gl/8XxfUuM4fMUAxzqd7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 hover:text-white"
                  >
                    <MapPin className="h-4 w-4 text-amber-300" /> Directions
                  </a>
                </div>
              </div>

              <div className="relative hidden lg:block">
                <div className="rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur-md">
                  <div className="mb-4 text-sm font-semibold text-sky-100">Campus focus</div>
                  <ul className="space-y-3 text-sm text-white/85">
                    <li className="flex gap-3 rounded-2xl bg-white/10 p-3">
                      <GraduationCap className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" />
                      <span>Inter College streams guided by UP Board curriculum</span>
                    </li>
                    <li className="flex gap-3 rounded-2xl bg-white/10 p-3">
                      <Wrench className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
                      <span>Private ITI trades for practical, job-ready skills</span>
                    </li>
                    <li className="flex gap-3 rounded-2xl bg-white/10 p-3">
                      <Shield className="mt-0.5 h-5 w-5 shrink-0 text-sky-300" />
                      <span>Secure parent &amp; student portals for results and attendance</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 mx-auto -mt-10 grid max-w-5xl grid-cols-2 gap-3 px-4 sm:grid-cols-4">
            {[
              { label: "Inter College", sub: "High School & Intermediate" },
              { label: "Private ITI", sub: "Skill programmes" },
              { label: "Agra, UP", sub: "Udaypur Khalsa campus" },
              { label: "Online enquiry", sub: "Apply in minutes" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border border-white bg-white p-4 text-center shadow-[var(--shadow-soft)]">
                <div className="text-sm font-bold text-[var(--color-navy)] sm:text-base">{s.label}</div>
                <div className="mt-0.5 text-[11px] text-slate-500 sm:text-xs">{s.sub}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-6 sm:py-10">
          <div className="mb-8 text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-blue)]">Programmes</p>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">What we offer</h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-slate-500">
              Course lists and trade names are confirmed by the office before publication.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: BookOpen, title: "Academics", desc: "UP Board pathways for Intermediate education.", href: "/academics" },
              { icon: Wrench, title: "ITI trades", desc: "Practical skill programmes under Private ITI.", href: "/academics" },
              { icon: Users, title: "Guidance", desc: "Teaching staff supporting local students.", href: "/about" },
              { icon: Award, title: "Values", desc: "Discipline, honesty and steady effort.", href: "/about" },
            ].map((c) => (
              <Link key={c.title} href={c.href} className="card-surface group p-6 transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)]">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[var(--color-blue)] transition group-hover:bg-[var(--color-navy)] group-hover:text-white">
                  <c.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-1 font-semibold text-slate-900">{c.title}</h3>
                <p className="text-sm text-slate-500">{c.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10">
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { href: "/apply-now", icon: ClipboardList, title: "Admission enquiry", desc: "Submit an online form — office will call back." },
              { href: "/notices", icon: FileText, title: "Notices", desc: "Published circulars and updates." },
              { href: "/login", icon: GraduationCap, title: "Student portal", desc: "Attendance, results and homework after login." },
            ].map((a) => (
              <Link key={a.href} href={a.href} className="card-surface flex gap-4 p-5 transition hover:border-blue-200">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <a.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900">{a.title}</div>
                  <p className="text-sm text-slate-500">{a.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="px-4 pb-16">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 overflow-hidden rounded-[2rem] bg-[var(--color-navy)] px-8 py-10 text-white sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-bold sm:text-2xl">Ready to start an enquiry?</h2>
              <p className="mt-1 text-sm text-white/70">Visit the office or submit the online form. Call before travelling if possible.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/apply-now" className="btn-primary">Open form</Link>
              <a href="tel:9837183726" className="btn-secondary">Call 9837183726</a>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-12">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-blue)]">Our campus</p>
              <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">A closer look at S.K.R. Inter College</h2>
              <p className="mt-2 max-w-2xl text-sm text-slate-600">
                School photographs and public profile information sourced from UPMSP Pehchan, school code {schoolProfile.code}.
              </p>
            </div>
            <Link href="/gallery" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-blue)] hover:underline">
              View all campus photos <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {galleryImages.slice(0, 4).map((photo) => (
              <figure key={photo.title} className="card-surface overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="aspect-[4/3] w-full object-cover"
                  loading="lazy"
                />
                <figcaption className="px-4 py-3 text-sm font-semibold text-slate-700">{photo.title}</figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "UPMSP school code", value: schoolProfile.code },
              { label: "UDISE code", value: schoolProfile.udise },
              { label: "High School recognition", value: String(schoolProfile.recognition.highSchool) },
              { label: "Intermediate recognition", value: String(schoolProfile.recognition.intermediate) },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                <p className="text-xs text-slate-500">{item.label}</p>
                <p className="mt-1 font-bold text-[var(--color-navy)]">{item.value}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-slate-500">
            Official source: <a href={UPMSP_SOURCE} target="_blank" rel="noopener noreferrer" className="underline hover:text-[var(--color-blue)]">UPMSP Pehchan school profile</a>.
            Public profile details may change; the official board record should be used to verify them.
          </p>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
