import Link from "next/link";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { SchoolImage } from "@/components/layout/SchoolImage";
import { galleryImages, schoolProfile, UPMSP_SOURCE } from "@/data/upmsp";
import {
  ArrowDown, ArrowRight, ArrowUpRight, Award, BookOpen, CheckCircle2,
  GraduationCap, MapPin, Phone, ShieldCheck, Sparkles, Users, Wrench,
} from "lucide-react";

const pathways = [
  { number: "01", icon: GraduationCap, title: "High School", copy: "A strong foundation for the next stage of learning.", href: "/academics", tag: "UP Board" },
  { number: "02", icon: BookOpen, title: "Intermediate", copy: "Explore subject groups and plan your academic path.", href: "/academics", tag: "Classes XI–XII" },
  { number: "03", icon: Wrench, title: "Private ITI", copy: "Ask our team about current trades and skill pathways.", href: "/contact", tag: "Skill development" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-clip bg-[#f7f8f5] text-slate-900">
      <PublicHeader />
      <main>
        <section className="relative isolate min-h-[680px] overflow-hidden bg-[#101f36] text-white lg:min-h-[740px]">
          <div className="absolute inset-0 -z-20">
            <SchoolImage src={galleryImages[0].src} alt="S.K.R. Inter College campus" className="h-full w-full object-cover opacity-50" loading="eager" />
          </div>
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(8,22,42,.97)_0%,rgba(8,22,42,.88)_42%,rgba(8,22,42,.38)_100%)]" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#101f36] via-transparent to-[#101f36]/25" />
          <div className="absolute -left-28 top-24 -z-10 h-80 w-80 rounded-full bg-cyan-400/20 blur-[100px] animate-drift" />
          <div className="absolute right-[12%] top-24 -z-10 h-72 w-72 rounded-full bg-amber-300/15 blur-[100px] animate-drift-delayed" />
          <div className="mx-auto grid min-h-[680px] max-w-7xl items-center gap-10 px-5 py-16 sm:px-8 lg:min-h-[740px] lg:grid-cols-[1.05fr_.95fr] lg:gap-14 lg:px-10">
            <div className="relative z-10 max-w-2xl">
              <div className="animate-rise inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[.19em] text-cyan-100 backdrop-blur-md sm:text-xs">
                <Sparkles className="h-4 w-4 text-amber-300" /> A place to learn. A future to shape.
              </div>
              <h1 className="animate-rise animation-delay-100 mt-7 text-[clamp(2.8rem,6.4vw,5.7rem)] font-semibold leading-[.98] tracking-[-.055em]">
                Where young minds
                <span className="mt-2 block font-serif italic font-medium text-amber-300">find their future.</span>
              </h1>
              <p className="animate-rise animation-delay-200 mt-7 max-w-xl text-base leading-8 text-slate-200 sm:text-lg">
                Welcome to S.K.R. Inter College &amp; Private ITI, Udaypur Khalsa, Agra — a learning community built around opportunity, confidence and progress.
              </p>
              <div className="animate-rise animation-delay-300 mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/apply-now" className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-amber-300 px-7 text-sm font-extrabold text-[#17253a] shadow-[0_12px_45px_rgba(252,211,77,.18)] transition duration-300 hover:-translate-y-1 hover:bg-amber-200">
                  Start an admission enquiry <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>
                <Link href="/about" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-white/30 bg-white/5 px-7 text-sm font-bold text-white backdrop-blur transition hover:border-white/60 hover:bg-white/10">
                  Discover our school <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="animate-rise animation-delay-300 mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-200">
                <a href="tel:9837183726" className="inline-flex items-center gap-2 transition hover:text-amber-300"><Phone className="h-4 w-4 text-amber-300" /> 9837183726</a>
                <a href="https://maps.app.goo.gl/8XxfUuM4fMUAxzqd7" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition hover:text-amber-300"><MapPin className="h-4 w-4 text-amber-300" /> Udaypur Khalsa, Agra</a>
              </div>
            </div>

            <div className="relative hidden min-h-[480px] lg:block">
              <div className="animate-float absolute right-3 top-4 h-[420px] w-[min(100%,440px)] overflow-hidden rounded-[11rem_11rem_2rem_2rem] border border-white/25 bg-white/10 p-2 shadow-2xl shadow-black/25">
                <div className="relative h-full overflow-hidden rounded-[10.5rem_10.5rem_1.5rem_1.5rem]">
                  <SchoolImage src={galleryImages[1]?.src || galleryImages[0].src} alt="School campus and facilities" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c1b30]/85 via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-8">
                    <p className="text-xs font-bold uppercase tracking-[.2em] text-amber-300">Our campus · Our community</p>
                    <p className="mt-3 text-2xl font-semibold leading-tight">Learning that opens doors.</p>
                  </div>
                </div>
              </div>
              <div className="animate-rise animation-delay-300 absolute bottom-4 left-0 max-w-[235px] rounded-2xl border border-white/15 bg-[#f8fafc] p-5 text-slate-900 shadow-2xl">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800"><ShieldCheck className="h-5 w-5" /></span>
                  <div><p className="text-[10px] font-bold uppercase tracking-[.15em] text-slate-500">Public school profile</p><p className="mt-1 text-lg font-extrabold">{schoolProfile.code}</p></div>
                </div>
                <a href={UPMSP_SOURCE} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-blue-800 hover:underline">Verify official record <ArrowUpRight className="h-3.5 w-3.5" /></a>
              </div>
              <div className="absolute right-0 top-0 flex h-20 w-20 items-center justify-center rounded-full border border-amber-200/40 bg-amber-300 text-center text-[10px] font-black uppercase leading-4 tracking-widest text-slate-900 shadow-lg animate-spin-slow">Learn<br />Grow<br />Lead</div>
            </div>
          </div>
          <a href="#pathways" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] font-bold uppercase tracking-[.2em] text-white/60 transition hover:text-white lg:flex">
            Scroll to explore <ArrowDown className="h-4 w-4 animate-bounce" />
          </a>
        </section>

        <section id="pathways" className="relative z-10 mx-auto -mt-1 max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
          <div className="reveal-on-view mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="text-xs font-extrabold uppercase tracking-[.22em] text-emerald-800">Your next chapter starts here</p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-.04em] sm:text-5xl">A path for every <span className="font-serif italic text-emerald-800">ambition.</span></h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-slate-600">Explore the learning pathways available through the college. Contact the office to confirm current subjects, trades, seats and admission requirements.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {pathways.map((item, index) => (
              <Link key={item.number} href={item.href} className={`reveal-on-view group relative overflow-hidden rounded-[1.6rem] border border-slate-200/80 bg-white p-6 transition duration-500 hover:-translate-y-2 hover:border-emerald-800/30 hover:shadow-[0_24px_65px_rgba(15,23,42,.09)] sm:p-8 ${index===1?"animation-delay-100":index===2?"animation-delay-200":""}`}>
                <div className="flex items-start justify-between">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-900 transition duration-500 group-hover:rotate-[-6deg] group-hover:scale-110"><item.icon className="h-6 w-6" /></span>
                  <span className="font-mono text-xs text-slate-400">{item.number}</span>
                </div>
                <span className="mt-8 inline-flex rounded-full bg-slate-100 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[.16em] text-slate-600">{item.tag}</span>
                <h3 className="mt-4 text-2xl font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-3 min-h-12 text-sm leading-6 text-slate-600">{item.copy}</p>
                <span className="mt-7 flex items-center justify-between border-t border-slate-100 pt-4 text-sm font-bold text-emerald-900">Explore pathway <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 transition duration-300 group-hover:translate-x-1 group-hover:bg-emerald-900 group-hover:text-white"><ArrowRight className="h-4 w-4" /></span></span>
                <div className="absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-emerald-50 opacity-0 blur-2xl transition duration-500 group-hover:opacity-100" />
              </Link>
            ))}
          </div>
        </section>

        <section className="bg-[#e9eee8] py-16 sm:py-20">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[.85fr_1.15fr] lg:items-center lg:gap-16 lg:px-10">
            <div className="reveal-on-view">
              <p className="text-xs font-extrabold uppercase tracking-[.22em] text-emerald-900">Grounded in our community</p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-.04em] sm:text-5xl">A school with roots.<br /><span className="font-serif italic text-emerald-900">A future in view.</span></h2>
              <p className="mt-5 text-sm leading-7 text-slate-700">We help students and families find the information they need to take the next step. Explore the public school profile, campus facilities and learning information.</p>
              <Link href="/about" className="group mt-7 inline-flex items-center gap-3 rounded-full bg-[#173c31] px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-1 hover:bg-[#245747]">Learn about the college <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {[
                { icon: ShieldCheck, value: schoolProfile.code, label: "UPMSP school code" },
                { icon: Award, value: String(schoolProfile.recognition.highSchool), label: "High School recognition" },
                { icon: BookOpen, value: String(schoolProfile.recognition.intermediate), label: "Intermediate recognition" },
                { icon: Users, value: String(schoolProfile.facilities.classrooms), label: "Teaching rooms listed" },
              ].map((item, index) => (
                <div key={item.label} className={`reveal-on-view rounded-2xl border border-white/80 bg-white/85 p-5 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-7 ${index===1||index===3?"animation-delay-100":""}`}>
                  <item.icon className="h-5 w-5 text-emerald-900" />
                  <p className="mt-5 text-2xl font-extrabold tracking-tight sm:text-3xl">{item.value}</p>
                  <p className="mt-2 text-xs leading-5 text-slate-600">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24 lg:px-10">
          <div className="reveal-on-view mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div><p className="text-xs font-extrabold uppercase tracking-[.22em] text-emerald-800">Campus in focus</p><h2 className="mt-3 text-3xl font-semibold tracking-[-.04em] sm:text-5xl">A glimpse of <span className="font-serif italic text-emerald-800">school life.</span></h2></div>
            <Link href="/gallery" className="inline-flex items-center gap-2 self-start text-sm font-extrabold text-emerald-900 hover:gap-3">Explore all photographs <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="grid auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[220px] sm:gap-4 lg:grid-cols-4">
            {galleryImages.slice(0,4).map((photo,index)=>(
              <Link key={photo.src} href="/gallery" className={`reveal-on-view group relative overflow-hidden rounded-2xl bg-slate-200 ${index===0?"col-span-2 row-span-2":""} ${index===3?"hidden lg:block":""}`}>
                <SchoolImage src={photo.src} alt={photo.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-70 transition group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-5"><span className="text-sm font-bold text-white sm:text-base">{photo.title}</span><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/40 bg-white/15 text-white backdrop-blur transition group-hover:bg-white group-hover:text-slate-900"><ArrowUpRight className="h-4 w-4" /></span></div>
              </Link>
            ))}
          </div>
        </section>

        <section className="px-5 pb-16 sm:px-8 sm:pb-24 lg:px-10">
          <div className="reveal-on-view relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#142f29] px-6 py-10 text-white sm:px-10 sm:py-14 lg:px-16">
            <div className="absolute -right-16 -top-20 h-80 w-80 rounded-full border border-white/10" /><div className="absolute -right-5 -top-9 h-60 w-60 rounded-full border border-white/10" /><div className="absolute -right-20 bottom-[-7rem] h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl" />
            <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl"><span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.2em] text-amber-300"><CheckCircle2 className="h-4 w-4" /> Take the next step</span><h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-.04em] sm:text-5xl">Your journey starts<br className="hidden sm:block" /> with one conversation.</h2><p className="mt-4 max-w-xl text-sm leading-7 text-white/70">Ask about current admissions, subject groups, fees and the documents you may need. Our office can guide you on the next steps.</p></div>
              <div className="flex shrink-0 flex-col gap-3 sm:flex-row md:flex-col"><Link href="/apply-now" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-amber-300 px-6 text-sm font-extrabold text-slate-900 transition hover:-translate-y-1 hover:bg-amber-200">Admission enquiry <ArrowRight className="h-4 w-4" /></Link><a href="tel:9837183726" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/25 px-6 text-sm font-bold text-white transition hover:bg-white/10"><Phone className="h-4 w-4" /> 9837183726</a></div>
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
