import Link from "next/link";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { SchoolImage } from "@/components/layout/SchoolImage";
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
  ShieldCheck,
  Sparkles,
  ClipboardList,
  FileText,
  CheckCircle2,
} from "lucide-react";

const learningLinks = [
  { icon: BookOpen, title: "Academics", desc: "Explore UP Board subject groups and campus learning facilities.", href: "/academics", tone: "bg-blue-50 text-blue-700" },
  { icon: Wrench, title: "Private ITI", desc: "Ask the school office about current trades, eligibility and seats.", href: "/academics", tone: "bg-amber-50 text-amber-700" },
  { icon: Users, title: "Teaching staff", desc: "Meet the faculty listed on the public school profile.", href: "/faculty", tone: "bg-emerald-50 text-emerald-700" },
  { icon: Award, title: "School profile", desc: "View recognition details, public results and facilities.", href: "/about", tone: "bg-violet-50 text-violet-700" },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-cream)]">
      <PublicHeader />
      <main className="flex-1">
        <section className="relative overflow-hidden px-4 pb-16 pt-6 sm:px-6 sm:pb-24 sm:pt-10">
          <div className="hero-mesh relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] px-5 py-8 text-white shadow-[var(--shadow-soft)] sm:px-9 sm:py-12 lg:px-12 lg:py-14">
            <div className="pointer-events-none absolute -right-12 -top-12 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-sky-400/15 blur-3xl" />

            <div className="relative grid min-w-0 items-center gap-9 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
              <div className="min-w-0 py-2 sm:py-4">
                <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.17em] text-sky-100 backdrop-blur sm:text-xs">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                  Udaypur Khalsa · Bah · Agra
                </span>
                <h1 className="max-w-2xl text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.45rem]">
                  Building futures through
                  <span className="mt-1 block bg-gradient-to-r from-sky-200 to-emerald-200 bg-clip-text text-transparent">quality education</span>
                </h1>
                <p className="mt-5 max-w-xl text-sm leading-7 text-white/80 sm:text-base">
                  S.K.R. INTER COLLEGE &amp; Private ITI supports local learners through High School, Intermediate and skill-focused pathways — with a campus rooted in the Agra community.
                </p>
                <div className="mt-7 flex flex-col gap-3 min-[420px]:flex-row">
                  <Link href="/apply-now" className="btn-primary min-h-12 gap-2">
                    Admission enquiry <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <Link href="/about" className="btn-secondary min-h-12">
                    Explore the college
                  </Link>
                </div>
                <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3 text-sm text-white/80">
                  <a href="tel:9837183726" className="inline-flex items-center gap-2 rounded-lg transition hover:text-white">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10"><Phone className="h-3.5 w-3.5 text-amber-300" aria-hidden="true" /></span>
                    <span><span className="block text-[10px] uppercase tracking-wide text-white/55">Call the office</span><span className="font-semibold">9837183726</span></span>
                  </a>
                  <a href="https://maps.app.goo.gl/8XxfUuM4fMUAxzqd7" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg transition hover:text-white">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10"><MapPin className="h-3.5 w-3.5 text-amber-300" aria-hidden="true" /></span>
                    <span><span className="block text-[10px] uppercase tracking-wide text-white/55">Find the campus</span><span className="font-semibold">Get directions</span></span>
                  </a>
                </div>
              </div>

              <div className="relative min-w-0">
                <figure className="relative min-h-[280px] overflow-hidden rounded-[1.6rem] border border-white/20 bg-white/10 shadow-2xl shadow-slate-950/20 sm:min-h-[360px] lg:min-h-[450px]">
                  <SchoolImage
                    src={galleryImages[0].src}
                    alt="S.K.R. Inter College school building"
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="eager"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/15 to-slate-950/10" />
                  <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-slate-950/35 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md sm:left-5 sm:top-5 sm:text-xs">
                    <span className="h-2 w-2 rounded-full bg-emerald-300" />
                    School profile · UPMSP
                  </div>
                  <figcaption className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                    <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-sky-200">
                      <MapPin className="h-4 w-4" aria-hidden="true" /> Udaypur Khalsa, Agra
                    </div>
                    <h2 className="max-w-md text-2xl font-bold tracking-tight text-white sm:text-3xl">A place to learn, grow and prepare for tomorrow.</h2>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white/90">High School</span>
                      <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white/90">Intermediate</span>
                      <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white/90">Private ITI</span>
                    </div>
                  </figcaption>
                </figure>
                <div className="absolute -bottom-4 right-4 flex items-center gap-3 rounded-2xl border border-white/70 bg-white px-4 py-3 text-slate-800 shadow-xl sm:-right-3 sm:px-5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                    <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span><span className="block text-[10px] font-semibold uppercase tracking-wider text-slate-500">UPMSP school code</span><span className="text-sm font-extrabold text-[var(--color-navy)]">{schoolProfile.code}</span></span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 mx-auto -mt-7 grid max-w-5xl grid-cols-2 gap-3 px-1 sm:-mt-10 sm:grid-cols-4 sm:px-4">
            {[
              { icon: GraduationCap, label: "High School", sub: "UP Board pathway" },
              { icon: BookOpen, label: "Intermediate", sub: "Subject groups listed" },
              { icon: Wrench, label: "Private ITI", sub: "Ask about current trades" },
              { icon: ClipboardList, label: "Admission enquiry", sub: "Start an application", href: "/apply-now" },
            ].map((item) => {
              const content = (
                <>
                  <span className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-[var(--color-blue)]">
                    <item.icon className="h-4.5 w-4.5" aria-hidden="true" />
                  </span>
                  <span className="block text-sm font-extrabold text-[var(--color-navy)] sm:text-base">{item.label}</span>
                  <span className="mt-1 block text-[10px] leading-4 text-slate-500 sm:text-xs">{item.sub}</span>
                </>
              );
              return item.href ? (
                <Link key={item.label} href={item.href} className="rounded-2xl border border-slate-100 bg-white p-3 text-center shadow-[var(--shadow-soft)] transition hover:-translate-y-1 hover:border-blue-200 sm:p-4">{content}</Link>
              ) : (
                <div key={item.label} className="rounded-2xl border border-slate-100 bg-white p-3 text-center shadow-[var(--shadow-soft)] sm:p-4">{content}</div>
              );
            })}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
          <div className="mb-7 flex flex-col gap-3 sm:mb-9 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 text-[10px] font-extrabold uppercase tracking-[0.2em] text-[var(--color-blue)] sm:text-xs">Learning pathways</p>
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">Explore the college</h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">Helpful information for students and families, from subject groups to public school records.</p>
            </div>
            <Link href="/academics" className="inline-flex items-center gap-2 text-sm font-bold text-[var(--color-blue)] transition hover:gap-3">View academics <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {learningLinks.map((item) => (
              <Link key={item.title} href={item.href} className="card-surface group min-w-0 p-5 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[var(--shadow-soft)] sm:p-6">
                <span className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl transition group-hover:scale-105 ${item.tone}`}>
                  <item.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="font-bold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.desc}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-[var(--color-blue)]">Learn more <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" aria-hidden="true" /></span>
              </Link>
            ))}
          </div>
          <p className="mt-5 rounded-xl border border-blue-100 bg-blue-50/70 px-4 py-3 text-xs leading-5 text-slate-600">
            Subject combinations, current ITI trade availability, seats and fees can vary by session. Please contact the school office to confirm current details before applying.
          </p>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
          <div className="grid gap-4 lg:grid-cols-3">
            <Link href="/apply-now" className="group card-surface flex items-start gap-4 p-5 transition hover:border-blue-200 hover:shadow-[var(--shadow-soft)]">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700"><ClipboardList className="h-5 w-5" aria-hidden="true" /></span>
              <span><span className="font-bold text-slate-900">Admission enquiry</span><span className="mt-1 block text-sm leading-5 text-slate-600">Send your details so the office can follow up.</span></span>
            </Link>
            <Link href="/notices" className="group card-surface flex items-start gap-4 p-5 transition hover:border-blue-200 hover:shadow-[var(--shadow-soft)]">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-700"><FileText className="h-5 w-5" aria-hidden="true" /></span>
              <span><span className="font-bold text-slate-900">Notices &amp; updates</span><span className="mt-1 block text-sm leading-5 text-slate-600">Check published school circulars and announcements.</span></span>
            </Link>
            <Link href="/login" className="group card-surface flex items-start gap-4 p-5 transition hover:border-blue-200 hover:shadow-[var(--shadow-soft)]">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700"><GraduationCap className="h-5 w-5" aria-hidden="true" /></span>
              <span><span className="font-bold text-slate-900">Student &amp; parent portal</span><span className="mt-1 block text-sm leading-5 text-slate-600">Open the portal for available school services.</span></span>
            </Link>
          </div>
        </section>

        <section className="px-4 py-8 sm:px-6 sm:py-12">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 overflow-hidden rounded-[2rem] bg-[var(--color-navy)] px-6 py-8 text-white sm:flex-row sm:items-center sm:justify-between sm:px-9 sm:py-10">
            <div className="max-w-2xl">
              <span className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-sky-200"><CheckCircle2 className="h-4 w-4" aria-hidden="true" /> Need admission information?</span>
              <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Let’s plan the next step together.</h2>
              <p className="mt-2 text-sm leading-6 text-white/70">Ask about current subject groups, seats, fee details and the documents required for admission.</p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <Link href="/apply-now" className="btn-primary">Start an enquiry <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
              <a href="tel:9837183726" className="btn-secondary"><Phone className="h-4 w-4" aria-hidden="true" /> Call office</a>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-14 pt-6 sm:px-6 sm:pb-16">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[var(--color-blue)] sm:text-xs">Our campus</p>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">A closer look at S.K.R. Inter College</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">Campus photos and public school profile details for UPMSP school code {schoolProfile.code}.</p>
            </div>
            <Link href="/gallery" className="inline-flex items-center gap-2 text-sm font-bold text-[var(--color-blue)] transition hover:gap-3">Explore the gallery <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {galleryImages.slice(0, 4).map((photo) => (
              <Link key={photo.src} href="/gallery" className="card-surface group overflow-hidden transition hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]">
                <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                  <SchoolImage src={photo.src} alt={photo.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="flex items-center justify-between gap-3 px-4 py-3">
                  <span className="text-sm font-semibold text-slate-800">{photo.title}</span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-[var(--color-blue)] transition group-hover:translate-x-1" aria-hidden="true" />
                </div>
              </Link>
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
                <p className="mt-1 font-extrabold text-[var(--color-navy)]">{item.value}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs leading-5 text-slate-500">
            Official source: <a href={UPMSP_SOURCE} target="_blank" rel="noopener noreferrer" className="font-semibold text-[var(--color-blue)] underline underline-offset-2 hover:text-[var(--color-navy)]">UPMSP Pehchan school profile</a>. Use the official board record to verify current details.
          </p>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
