import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { schoolProfile } from "@/data/upmsp";
import { Phone, MapPin, Mail, Clock3, ArrowUpRight, MessageCircle } from "lucide-react";

export const metadata = {
  title: "Contact the School",
  description: "Contact S.K.R. Inter College and Private ITI in Udaypur Khalsa, Bah, Agra.",
};

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-cream)]">
      <PublicHeader />
      <main className="flex-1">
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--color-blue)]">We’re here to help</p>
            <div className="mt-3 grid gap-5 md:grid-cols-[1fr_0.7fr] md:items-end">
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Contact S.K.R. Inter College</h1>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                  Have a question about admission, subject groups or campus facilities? Contact the school office before visiting.
                </p>
              </div>
              <a href="tel:9837183726" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--color-navy)] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[var(--color-navy-dark)] md:justify-self-end">
                <Phone className="h-4 w-4" aria-hidden="true" /> Call 9837183726
              </a>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-5 px-4 py-8 sm:px-6 sm:py-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="grid gap-4 sm:grid-cols-2">
            <article className="card-surface p-5 sm:p-6">
              <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-[var(--color-blue)]"><MapPin className="h-5 w-5" aria-hidden="true" /></span>
              <h2 className="font-extrabold text-slate-900">Visit the campus</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Udaypur Khalsa, Post Bhadrauli, Bah, Pinahat, Agra, Uttar Pradesh — PIN 283113.
              </p>
              <a href="https://maps.app.goo.gl/8XxfUuM4fMUAxzqd7" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-[var(--color-blue)] hover:underline hover:underline-offset-4">
                Open Google Maps <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </article>

            <article className="card-surface p-5 sm:p-6">
              <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700"><Phone className="h-5 w-5" aria-hidden="true" /></span>
              <h2 className="font-extrabold text-slate-900">Call the office</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">For current admissions, seat availability and fee-related questions.</p>
              <a href="tel:9837183726" className="mt-4 inline-block text-lg font-extrabold tracking-tight text-[var(--color-navy)] hover:underline">9837183726</a>
            </article>

            <article className="card-surface p-5 sm:col-span-2 sm:p-6">
              <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-700"><Mail className="h-5 w-5" aria-hidden="true" /></span>
              <h2 className="font-extrabold text-slate-900">Email the school</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">Send a message if you need written information or want to ask before visiting.</p>
              <a href={`mailto:${schoolProfile.publicEmail}`} className="mt-3 inline-flex items-center gap-2 break-all text-sm font-bold text-[var(--color-blue)] hover:underline hover:underline-offset-4">{schoolProfile.publicEmail} <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" /></a>
            </article>
          </div>

          <aside className="relative overflow-hidden rounded-[1.75rem] bg-[var(--color-navy-dark)] p-6 text-white shadow-[var(--shadow-soft)] sm:p-8">
            <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-sky-400/15 blur-3xl" />
            <div className="relative">
              <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-[var(--color-gold)]"><Clock3 className="h-5 w-5" aria-hidden="true" /></span>
              <h2 className="text-xl font-extrabold">Planning a visit?</h2>
              <p className="mt-2 text-sm leading-6 text-white/70">Call first to confirm that the office is open and the right staff member is available to help.</p>
              <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-sky-200">Office hours listed on this site</p>
                <p className="mt-2 text-base font-bold">Monday – Saturday</p>
                <p className="mt-1 text-sm text-white/70">8:00 AM – 2:00 PM</p>
              </div>
              <a href="tel:9837183726" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--color-gold)] px-5 py-3 text-sm font-extrabold text-[var(--color-navy-dark)] transition hover:bg-[var(--color-gold-light)]">
                <MessageCircle className="h-4 w-4" aria-hidden="true" /> Call before travelling
              </a>
              <p className="mt-5 text-xs leading-5 text-white/45">School identity and contact email are listed on the public UPMSP school profile. Please verify time-sensitive details with the office.</p>
            </div>
          </aside>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
