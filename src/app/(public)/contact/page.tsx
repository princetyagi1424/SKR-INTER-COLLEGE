import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { Phone, MapPin } from "lucide-react";

export const metadata = { title: "Contact Us" };

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicHeader />
      <main className="mx-auto max-w-4xl flex-1 px-4 py-12">
        <h1 className="mb-8 text-3xl font-bold text-[var(--color-navy)]">Contact Us</h1>
        <div className="grid gap-8 sm:grid-cols-2">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 h-5 w-5 text-[var(--color-gold)]" />
              <div>
                <div className="font-semibold">Address</div>
                <p className="text-sm text-slate-600">
                  Udaypur Khalsa, Post Bhadrauli, Bah, Pinahat,<br />
                  Agra, Uttar Pradesh, India — PIN 283113
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="mt-1 h-5 w-5 text-[var(--color-gold)]" />
              <div>
                <div className="font-semibold">Phone</div>
                <a href="tel:9837183726" className="text-sm text-[var(--color-navy)] underline">
                  9837183726
                </a>
              </div>
            </div>
            <a
              href="https://maps.app.goo.gl/8XxfUuM4fMUAxzqd7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-lg bg-[var(--color-navy)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[var(--color-navy-dark)]"
            >
              Open in Google Maps
            </a>
          </div>
          <div className="rounded-xl border bg-slate-50 p-6 text-sm text-slate-600">
            <p className="mb-2 font-medium text-slate-800">School Office Hours</p>
            <p>Monday – Saturday: 8:00 AM – 2:00 PM</p>
            <p className="mt-4 text-xs text-slate-500">
              For admission enquiries, please use the{" "}
              <a href="/admissions" className="underline">online admission form</a> or call the office.
            </p>
          </div>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
