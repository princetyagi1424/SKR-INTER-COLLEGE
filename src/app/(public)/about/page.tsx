import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";

export const metadata = { title: "About Us" };

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicHeader />
      <main className="mx-auto max-w-4xl flex-1 px-4 py-12">
        <h1 className="mb-2 text-3xl font-bold text-[var(--color-navy)]">About Us</h1>
        <p className="mb-8 text-sm text-slate-500">S.K.R. INTER COLLEGE &amp; PVT ITI</p>

        <section className="prose prose-slate max-w-none space-y-4 text-slate-700">
          <p>
            S.K.R. INTER COLLEGE &amp; PVT ITI is located at Udaypur Khalsa, Post Bhadrauli,
            Bah, Pinahat, Agra, Uttar Pradesh (PIN 283113). The institution serves students
            from surrounding rural communities through Inter College programmes and a
            Private ITI division.
          </p>
          <p>
            Official recognition, affiliation, establishment year and management details
            are maintained by the school administration. Only verified information is
            published on this website.
          </p>
          <h2 className="text-xl font-semibold text-[var(--color-navy)]">Vision</h2>
          <p>
            To provide quality education that empowers rural students to achieve academic
            excellence and become responsible citizens.
          </p>
          <h2 className="text-xl font-semibold text-[var(--color-navy)]">Mission</h2>
          <p>
            To nurture every student with knowledge, values and skills through dedicated
            teaching and a supportive learning environment.
          </p>
          <h2 className="text-xl font-semibold text-[var(--color-navy)]">Contact</h2>
          <p>
            Phone: <a href="tel:9837183726" className="text-[var(--color-navy)] underline">9837183726</a>
            <br />
            <a
              href="https://maps.app.goo.gl/8XxfUuM4fMUAxzqd7"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-navy)] underline"
            >
              Get directions on Google Maps
            </a>
          </p>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
