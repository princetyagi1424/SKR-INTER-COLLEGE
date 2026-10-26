import Link from "next/link";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { schoolProfile, UPMSP_SOURCE, highSchoolBoardResults, intermediateBoardResults, studentStatistics, schoolReportCard, schoolAchievements, officialLinks } from "@/data/upmsp";
import { MapPin, Phone, Building2, BookOpen, Shield } from "lucide-react";

export const metadata = {
  title: "About",
  description: "S.K.R. INTER COLLEGE, Udaypur Khalsa — UPMSP school code 011424 profile and facilities.",
};

export default function AboutPage() {
  const f = schoolProfile.facilities;
  const facilityRows: [string, string][] = [
    ["Classrooms", String(f.classrooms)],
    ["CCTV", f.cctv.available ? `Available (${f.cctv.count})` : "Not listed"],
    ["Science laboratory", f.scienceLab ? "Available" : "Not available"],
    ["Computer lab", f.computerLab ? "Available" : "Not available"],
    ["Internet / Wi‑Fi", f.internetWifi ? "Available" : "Not available"],
    ["Library", f.library ? "Available" : "Not available"],
    ["Playground", f.playground ? "Available" : "Not available"],
    ["Boundary wall & iron gate", f.boundaryWall && f.ironGate ? "Available" : "—"],
    ["Electricity & generator", f.electricity && f.generator ? "Available" : "—"],
    ["Drinking water", f.drinkingWater ? "Available" : "—"],
    ["Separate toilets (boys / girls)", f.toiletsBoys && f.toiletsGirls ? "Available" : "—"],
    ["Fire extinguisher", f.fireExtinguisher ? "Available" : "—"],
    ["Smart class", f.smartClass ? "Available" : "Not available (as per UPMSP)"],
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-cream)]">
      <PublicHeader />
      <main className="flex-1">
        <section className="border-b border-slate-100 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-blue)]">About</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">{schoolProfile.nameDisplay}</h1>
            <p className="mt-3 max-w-2xl text-slate-600">
              UP Board Intermediate institution at {schoolProfile.locationLine}. Official board school code{" "}
              <strong>{schoolProfile.code}</strong> (UDISE {schoolProfile.udise}).
            </p>
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-600">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-[var(--color-blue)]" /> Tehsil {schoolProfile.tehsil} · Block {schoolProfile.block}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Phone className="h-4 w-4 text-[var(--color-blue)]" /> Principal: {schoolProfile.principal.mobile}
              </span>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-6 px-4 py-10 lg:grid-cols-3">
          <div className="card-surface p-6 lg:col-span-2">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900">
              <Building2 className="h-5 w-5 text-[var(--color-blue)]" /> Official profile (UPMSP)
            </h2>
            <dl className="grid gap-3 sm:grid-cols-2 text-sm">
              {[
                ["School code", schoolProfile.code],
                ["Name (board record)", schoolProfile.nameEn],
                ["District / Tehsil / Block", `${schoolProfile.district} / ${schoolProfile.tehsil} / ${schoolProfile.block}`],
                ["Type", schoolProfile.type],
                ["Level", schoolProfile.level],
                ["High School recognition", String(schoolProfile.recognition.highSchool)],
                ["Intermediate recognition", String(schoolProfile.recognition.intermediate)],
                ["Principal", schoolProfile.principal.name],
                ["Manager / Director", schoolProfile.manager.name],
                ["Coordinates", `${schoolProfile.coordinates.lat}, ${schoolProfile.coordinates.lng}`],
              ].map(([k, v]) => (
                <div key={k} className="rounded-xl bg-slate-50 px-3 py-2">
                  <dt className="text-xs font-medium text-slate-500">{k}</dt>
                  <dd className="font-semibold text-slate-900">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-xs text-slate-500">
              Source:{" "}
              <a href={UPMSP_SOURCE} target="_blank" rel="noopener noreferrer" className="text-[var(--color-blue)] underline">
                UPMSP Pehchan — SchoolInformation Code 011424
              </a>
              . Figures reflect the public board record at the time of publication.
            </p>
          </div>

          <div className="space-y-4">
            <div className="card-surface p-5">
              <h3 className="font-semibold text-slate-900">Leadership</h3>
              <p className="mt-2 text-sm text-slate-600">
                <strong>Principal:</strong> {schoolProfile.principal.name}
                <br />
                Mobile: {schoolProfile.principal.mobile}
              </p>
              <p className="mt-2 text-sm text-slate-600">
                <strong>Manager:</strong> {schoolProfile.manager.name}
              </p>
            </div>
            <div className="card-surface p-5">
              <h3 className="mb-2 font-semibold text-slate-900">Quick links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/faculty" className="text-[var(--color-blue)] hover:underline">Teaching staff</Link></li>
                <li><Link href="/academics" className="text-[var(--color-blue)] hover:underline">Streams &amp; facilities</Link></li>
                <li><Link href="/gallery" className="text-[var(--color-blue)] hover:underline">Campus photos (UPMSP)</Link></li>
                <li><Link href="/apply-now" className="text-[var(--color-blue)] hover:underline">Admission enquiry</Link></li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-10">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900">
            <Shield className="h-5 w-5 text-emerald-600" /> Facilities (UPMSP)
          </h2>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {facilityRows.map(([label, value]) => (
              <div key={label} className="card-surface flex items-center justify-between gap-3 px-4 py-3 text-sm">
                <span className="text-slate-600">{label}</span>
                <span className="font-semibold text-slate-900">{value}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-16">
          <h2 className="mb-2 flex items-center gap-2 text-lg font-bold text-slate-900">
            <BookOpen className="h-5 w-5 text-[var(--color-blue)]" /> High School board results (UPMSP)
          </h2>
          <p className="mb-4 text-sm text-slate-500">
            Registered / appeared / passed as published on the Pehchan portal for this school code.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-slate-100 bg-white shadow-sm">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-4 py-3">Year</th>
                  <th className="px-4 py-3">Registered</th>
                  <th className="px-4 py-3">Appeared</th>
                  <th className="px-4 py-3">Passed</th>
                  <th className="px-4 py-3">Pass %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {highSchoolBoardResults.map((r) => (
                  <tr key={r.year}>
                    <td className="px-4 py-3 font-medium">{r.year}</td>
                    <td className="px-4 py-3">{r.registered}</td>
                    <td className="px-4 py-3">{r.appeared}</td>
                    <td className="px-4 py-3">{r.passed}</td>
                    <td className="px-4 py-3 font-semibold text-emerald-700">{r.passPercent}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-10">
          <div className="mb-4">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-blue)]">Public board record</p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900">Intermediate (Class 12) board results</h2>
            <p className="mt-2 text-sm text-slate-600">Year-wise aggregate figures from the UPMSP Pehchan profile. Please verify current records with the board.</p>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-slate-100 bg-white shadow-sm">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                <tr><th className="px-4 py-3">Year</th><th className="px-4 py-3">Registered</th><th className="px-4 py-3">Appeared</th><th className="px-4 py-3">Passed</th><th className="px-4 py-3">Pass %</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {intermediateBoardResults.map((r) => (
                  <tr key={r.year}>
                    <td className="px-4 py-3 font-medium">{r.year}</td><td className="px-4 py-3">{r.registered}</td><td className="px-4 py-3">{r.appeared}</td><td className="px-4 py-3">{r.passed}</td><td className="px-4 py-3 font-semibold text-emerald-700">{r.passPercent}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-10">
          <h2 className="mb-4 text-2xl font-bold text-slate-900">Student statistics (aggregate only)</h2>
          <p className="mb-4 text-sm text-slate-600">Only school-level counts are shown here; no student names, IDs or personal records are published.</p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {studentStatistics.map((row) => (
              <article key={row.className} className="card-surface p-4">
                <h3 className="font-semibold text-slate-900">{row.className}</h3>
                <p className="mt-2 text-2xl font-bold text-[var(--color-navy)]">{row.total}</p>
                <p className="text-xs text-slate-500">Total students</p>
                <p className="mt-2 text-xs text-slate-600">
                  {row.boys === null || row.girls === null ? "Gender breakdown not published" : `Boys: ${row.boys} · Girls: ${row.girls}`}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-10">
          <h2 className="mb-4 text-2xl font-bold text-slate-900">UPMSP Pehchan report card</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Total students", value: schoolReportCard.totalStudents },
              { label: "Listed teachers", value: schoolReportCard.totalTeachers },
              { label: "Classrooms", value: schoolReportCard.classrooms },
              { label: "Infrastructure", value: `${schoolReportCard.infrastructureAvailable}/${schoolReportCard.infrastructureTotal}` },
              { label: "Pehchan score", value: `${schoolReportCard.score}/${schoolReportCard.scoreOutOf}` },
              { label: "Board grade", value: schoolReportCard.grade },
              { label: "State rank", value: schoolReportCard.stateRank },
              { label: "District rank", value: schoolReportCard.districtRank },
            ].map((item) => (
              <div key={item.label} className="card-surface p-4">
                <p className="text-xs text-slate-500">{item.label}</p>
                <p className="mt-1 text-xl font-bold text-[var(--color-navy)]">{item.value}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-slate-500">These are figures shown on the public UPMSP Pehchan report card when inspected; rankings and totals can change over time.</p>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-10">
          <h2 className="mb-4 text-2xl font-bold text-slate-900">School activities & achievements</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {schoolAchievements.map((achievement) => (
              <div key={achievement} className="card-surface p-4 text-sm text-slate-700">{achievement}</div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-16">
          <h2 className="mb-4 text-2xl font-bold text-slate-900">Official education links</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {officialLinks.map((item) => (
              <a key={item.url} href={item.url} target="_blank" rel="noopener noreferrer" className="card-surface flex items-center justify-between gap-3 p-4 text-sm font-semibold text-[var(--color-blue)] hover:underline">
                <span>{item.title}</span><ArrowRight className="h-4 w-4 shrink-0" />
              </a>
            ))}
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
