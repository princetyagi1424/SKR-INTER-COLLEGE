import Link from "next/link";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { SchoolImage } from "@/components/layout/SchoolImage";
import { galleryImages, schoolProfile, UPMSP_SOURCE } from "@/data/upmsp";
import {
  ArrowRight, Award, BookOpen, CheckCircle2, GraduationCap,
  MapPin, Phone, ShieldCheck, Sparkles, Users, Wrench,
} from "lucide-react";

const pathways = [
  { number: "01", icon: GraduationCap, title: "High School", copy: "Strong foundations for board success and the next stage of learning.", href: "/academics", tag: "UP Board" },
  { number: "02", icon: BookOpen, title: "Intermediate", copy: "Subject groups across Humanities, Science, Commerce and more.", href: "/academics", tag: "Classes XI–XII" },
  { number: "03", icon: Wrench, title: "Private ITI", copy: "Skill pathways — confirm current trades with the school office.", href: "/contact", tag: "Skill development" },
];

const highlights = [
  { icon: Award, title: "UP Board affiliated", text: "Recognised Intermediate college under UPMSP records." },
  { icon: Users, title: "Dedicated faculty", text: "Teachers listed on the official Pehchan school profile." },
  { icon: ShieldCheck, title: "Transparent process", text: "Public disclosures, notices and enquiry form online." },
];

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-clip bg-[#fff8f0] text-slate-900">
      <PublicHeader />
      <main>
        <section className="relative isolate min-h-[640px] overflow-hidden text-white lg:min-h-[720px]">
          <div className="absolute inset-0 -z-20">
            <SchoolImage
              src={galleryImages[0]?.src || ""}
              alt="S.K.R. Inter College campus"
              className="h-full w-full object-cover opacity-45"
              loading="eager"
            />
          </div>
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(105deg,rgba(20,20,20,.96)_0%,rgba(26,12,16,.9)_48%,rgba(200,16,46,.55)_100%)]" />
          <div className="absolute -left-24 top-16 -z-10 h-72 w-72 rounded-full bg-[#c8102e]/30 blur-[100px] animate-drift" />
          <div className="absolute right-[10%] top-28 -z-10 h-64 w-64 rounded-full bg-[#f5d76e]/15 blur-[90px] animate-drift-delayed" />

          <div className="mx-auto grid min-h-[640px] max-w-7xl items-center gap-10 px-5 py-16 sm:px-8 lg:min-h-[720px] lg:grid-cols-[1.1fr_.9fr] lg:gap-12 lg:px-10">
            <div className="relative z-10 max-w-2xl">
              <div className="animate-rise inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[.18em] text-[#f7c5cb] backdrop-blur-md">
                <Sparkles className="h-4 w-4 text-[#f5d76e]" />
                UPMSP code {schoolProfile.code} · Agra
              </div>
              <h1 className="animate-rise mt-6 text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-5xl lg:text-6xl">
                Building futures through{" "}
                <span className="bg-[linear-gradient(90deg,#fff,#f5d76e)] bg-clip-text text-transparent">
                  disciplined learning
                </span>
              </h1>
              <p className="animate-rise mt-5 max-w-xl text-base leading-8 text-white/75 sm:text-lg">
                S.K.R. INTER COLLEGE &amp; Private ITI — Udaypur Khalsa, Bah, Agra. High School, Intermediate and skill pathways under one institution.
              </p>
              <div className="animate-rise mt-8 flex flex-wrap gap-3">
                <Link
                  href="/apply-now"
                  className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[linear-gradient(135deg,#e31c23,#c8102e)] px-6 text-sm font-extrabold text-white shadow-[0_14px_32px_rgba(200,16,46,0.4)] transition hover:-translate-y-0.5 hover:brightness-105"
                >
                  Admission enquiry <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/30 bg-white/5 px-6 text-sm font-bold text-white backdrop-blur transition hover:bg-white/15"
                >
                  About the college
                </Link>
              </div>
              <div className="animate-rise mt-8 flex flex-wrap items-center gap-4 text-sm text-white/70">
                <span className="inline-flex items-center gap-2">
                  <Phone className="h-4 w-4 text-[#f5d76e]" />
                  <a href="tel:9837183726" className="font-semibold text-white hover:underline">9837183726</a>
                </span>
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[#f5d76e]" />
                  Bah · Pinahat · Agra
                </span>
              </div>
            </div>

            <div className="relative z-10 hidden lg:block">
              <div className="overflow-hidden rounded-[1.75rem] border border-white/15 bg-white/10 p-3 shadow-2xl backdrop-blur-md">
                <SchoolImage
                  src={galleryImages[1]?.src || galleryImages[0]?.src || ""}
                  alt="Campus"
                  className="aspect-[4/3] w-full rounded-[1.25rem] object-cover"
                />
                <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="rounded-xl bg-black/35 px-2 py-3">
                    <div className="text-lg font-extrabold text-white">{schoolProfile.recognition.highSchool}</div>
                    <div className="mt-0.5 text-white/60">HS recog.</div>
                  </div>
                  <div className="rounded-xl bg-black/35 px-2 py-3">
                    <div className="text-lg font-extrabold text-white">{schoolProfile.recognition.intermediate}</div>
                    <div className="mt-0.5 text-white/60">Inter recog.</div>
                  </div>
                  <div className="rounded-xl bg-[#c8102e]/80 px-2 py-3">
                    <div className="text-lg font-extrabold text-white">UP</div>
                    <div className="mt-0.5 text-white/80">Board</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
          <div className="mb-10 max-w-2xl">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#c8102e]">Programmes</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#1a1a1a] sm:text-4xl">Learning pathways</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">Choose the track that matches your goals. Details are confirmed each session by the office.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {pathways.map((p) => {
              const Icon = p.icon;
              return (
                <Link
                  key={p.number}
                  href={p.href}
                  className="group rounded-[1.5rem] border border-[#efe6dc] bg-white p-6 shadow-[0_10px_30px_rgba(26,26,26,0.05)] transition hover:-translate-y-1 hover:border-[#c8102e]/35 hover:shadow-[0_18px_40px_rgba(200,16,46,0.12)]"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff0f1] text-[#c8102e]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-xs font-bold text-slate-400">{p.number}</span>
                  </div>
                  <div className="mt-5 text-[11px] font-bold uppercase tracking-wider text-[#c8102e]">{p.tag}</div>
                  <h3 className="mt-1 text-xl font-extrabold text-[#1a1a1a]">{p.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{p.copy}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-[#c8102e] group-hover:gap-2">
                    Explore <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="border-y border-[#efe6dc] bg-white">
          <div className="mx-auto grid max-w-7xl gap-6 px-5 py-14 sm:px-8 md:grid-cols-3 lg:px-10">
            {highlights.map((h) => {
              const Icon = h.icon;
              return (
                <div key={h.title} className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#1a1a1a] text-[#f5d76e]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1a1a1a]">{h.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{h.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#c8102e]">Campus</p>
              <h2 className="mt-2 text-3xl font-extrabold text-[#1a1a1a]">A glimpse of SKR</h2>
            </div>
            <Link href="/gallery" className="text-sm font-bold text-[#c8102e] hover:underline">
              Full gallery →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {galleryImages.slice(0, 3).map((photo) => (
              <Link key={photo.src} href="/gallery" className="group relative overflow-hidden rounded-[1.5rem]">
                <SchoolImage src={photo.src} alt={photo.title} className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <span className="absolute bottom-4 left-4 text-sm font-bold text-white">{photo.title}</span>
              </Link>
            ))}
          </div>
          <p className="mt-4 text-xs text-slate-500">
            Photos sourced from{" "}
            <a href={UPMSP_SOURCE} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#c8102e] underline">
              UPMSP Pehchan
            </a>
            .
          </p>
        </section>

        <section className="px-5 pb-16 sm:px-8 sm:pb-24 lg:px-10">
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#1a1a1a] px-6 py-10 text-white sm:px-10 sm:py-14">
            <div className="absolute -right-10 -top-10 h-56 w-56 rounded-full bg-[#c8102e]/40 blur-3xl" />
            <div className="absolute -bottom-16 left-10 h-48 w-48 rounded-full bg-[#f5d76e]/15 blur-3xl" />
            <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.2em] text-[#f5d76e]">
                  <CheckCircle2 className="h-4 w-4" /> Take the next step
                </span>
                <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-.03em] sm:text-4xl">
                  Your journey starts with one conversation.
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-7 text-white/70">
                  Ask about admissions, subject groups, fees and documents. Our office will guide the next steps.
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-3 sm:flex-row md:flex-col">
                <Link
                  href="/apply-now"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#e31c23,#c8102e)] px-6 text-sm font-extrabold text-white shadow-[0_12px_28px_rgba(200,16,46,0.35)]"
                >
                  Admission enquiry <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="tel:9837183726"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/25 px-6 text-sm font-bold text-white transition hover:bg-white/10"
                >
                  <Phone className="h-4 w-4" /> 9837183726
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
