import Link from "next/link";
import { PublicPageShell, SoftCard } from "@/components/layout/PublicPageShell";
import { schoolProfile, UPMSP_SOURCE } from "@/data/upmsp";

export const metadata = { title: "Mandatory Disclosures" };

const SECTIONS = [
  {
    title: "Institution identity",
    items: [
      `Name: ${"S.K.R. INTER COLLEGE"} & Private ITI`,
      "Board record name: SKR I C UDAYPUR KHALSA BHADRAULI BAH AGRA",
      "UPMSP school code: 011424",
      "UDISE: 09181302903",
      "Address: Udaypur Khalsa, Bhadrauli, Bah, Agra, Uttar Pradesh",
      "Public phone: 9837183726",
      "Principal (UPMSP): Uttam Singh Tyagi",
    ],
  },
  {
    title: "Recognition",
    items: [
      "High School recognition year: 2004",
      "Intermediate recognition year: 2011",
      "School type: वित्तविहीन (self-financed / unaided)",
      "Parents may request certified copies from the school office during working hours.",
    ],
  },
  {
    title: "Academic programmes",
    items: [
      "Inter College streams (UP Board) — as listed under Academics",
      "Private ITI programmes — confirm current trades at the office",
      "Subject groups on UPMSP Pehchan: Humanities, Science, Commerce, Agriculture, Vocational",
    ],
  },
  {
    title: "Contact & maps",
    items: [
      "Office phone: 9837183726",
      "Google Maps: https://maps.app.goo.gl/8XxfUuM4fMUAxzqd7",
      "Coordinates (UPMSP): 26.8671452, 78.4519261",
    ],
  },
];

export default function DisclosuresPage() {
  return (
    <PublicPageShell
      eyebrow="Transparency"
      title="Mandatory disclosures"
      description="Key public facts about S.K.R. INTER COLLEGE drawn from the institution and the UPMSP Pehchan record for school code 011424."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {SECTIONS.map((section) => (
          <SoftCard key={section.title}>
            <h2 className="text-base font-bold text-slate-900">{section.title}</h2>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
              {section.items.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </SoftCard>
        ))}
      </div>
      <p className="mt-6 text-xs text-slate-500">
        Source:{" "}
        <a href={UPMSP_SOURCE} target="_blank" rel="noopener noreferrer" className="font-semibold text-[var(--color-navy)] underline">
          UPMSP Pehchan school code 011424
        </a>
        . Additional certificates are available from the school office.
      </p>
      <div className="mt-4">
        <Link href="/about" className="text-sm font-bold text-[var(--color-navy)] hover:underline">
          View full about page →
        </Link>
      </div>
    </PublicPageShell>
  );
}
