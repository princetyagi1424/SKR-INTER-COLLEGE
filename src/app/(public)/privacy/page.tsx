import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";

export const metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicHeader />
      <main className="mx-auto max-w-3xl flex-1 px-4 py-12 prose prose-slate">
        <h1 className="text-3xl font-bold text-[var(--color-navy)]">Privacy Policy</h1>
        <p className="text-sm text-slate-500">S.K.R. INTER COLLEGE & PVT ITI · Last updated: October 2026</p>
        <section className="mt-6 space-y-4 text-sm leading-relaxed text-slate-700">
          <p>
            This website and portal collect personal information only for legitimate school operations:
            admission enquiries, student records, attendance, examinations, fees and parent communication.
          </p>
          <h2 className="text-lg font-semibold text-[var(--color-navy)]">Information we collect</h2>
          <ul className="list-disc pl-5">
            <li>Name, contact details and address provided in forms</li>
            <li>Student academic and attendance records for enrolled students</li>
            <li>Login activity for security of portal accounts</li>
          </ul>
          <h2 className="text-lg font-semibold text-[var(--color-navy)]">How we use information</h2>
          <p>
            Data is used to process admissions, deliver education services, publish authorised results,
            manage fees and communicate with parents/guardians. We do not sell personal data.
          </p>
          <h2 className="text-lg font-semibold text-[var(--color-navy)]">Children's data</h2>
          <p>
            Student data is treated as sensitive. Access is limited to authorised staff and verified parents.
            Public pages do not display private marks or personal identifiers.
          </p>
          <h2 className="text-lg font-semibold text-[var(--color-navy)]">Contact</h2>
          <p>
            For privacy requests contact the school office: 9837183726,
            Udaypur Khalsa, Post Bhadrauli, Bah, Pinahat, Agra — 283113.
          </p>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
