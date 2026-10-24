import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { FileText } from "lucide-react";

export const metadata = { title: "Mandatory Disclosures" };

const SECTIONS = [
  {
    title: "Institution identity",
    items: [
      "Name: S.K.R. INTER COLLEGE & PVT ITI",
      "Address: Udaypur Khalsa, Post Bhadrauli, Bah, Pinahat, Agra, Uttar Pradesh — PIN 283113",
      "Phone: 9837183726",
      "UDISE Code: 09151302903 (as recorded; confirm with office for latest official records)",
    ],
  },
  {
    title: "Recognition & affiliation",
    items: [
      "Official recognition, affiliation and registration details are maintained by the school administration.",
      "Only verified documents approved by the management will be published here.",
      "Parents may request certified copies from the school office during working hours.",
    ],
  },
  {
    title: "Academic programmes",
    items: [
      "Inter College stream (High School / Intermediate) — UP Board curriculum as applicable",
      "Private ITI programmes — trades as offered by the institution",
      "Detailed subject lists and textbooks are shared at the start of each session",
    ],
  },
  {
    title: "Fee structure & calendar",
    items: [
      "Fee structure is decided by the management for each academic year.",
      "Academic calendar, examination schedule and holiday list are published in Notices.",
      "Contact the office for the current fee booklet — do not rely on unofficial sources.",
    ],
  },
  {
    title: "Staff & infrastructure",
    items: [
      "Teaching and non-teaching staff details are available on request from the office.",
      "Infrastructure and facilities information is maintained by the administration.",
      "No fabricated claims are published on this website.",
    ],
  },
];

export default function DisclosuresPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicHeader />
      <main className="mx-auto max-w-4xl flex-1 px-4 py-12">
        <h1 className="mb-2 text-3xl font-bold text-[var(--color-navy)]">Mandatory Disclosures</h1>
        <p className="mb-8 text-slate-600">
          Information published here is limited to verified school details. Additional official documents
          can be obtained from the school office.
        </p>
        <div className="space-y-6">
          {SECTIONS.map((s) => (
            <section key={s.title} className="rounded-xl border bg-white p-6 shadow-sm">
              <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-[var(--color-navy)]">
                <FileText className="h-5 w-5" /> {s.title}
              </h2>
              <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
                {s.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-slate-500">
          For certified documents call{" "}
          <a href="tel:9837183726" className="font-medium text-[var(--color-navy)] underline">9837183726</a>
          {" "}or visit the office (Mon–Sat, 8:00 AM – 2:00 PM).
        </p>
      </main>
      <PublicFooter />
    </div>
  );
}
