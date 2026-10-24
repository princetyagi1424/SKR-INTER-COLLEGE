import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";

export const metadata = { title: "Terms of Use" };

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicHeader />
      <main className="mx-auto max-w-3xl flex-1 px-4 py-12">
        <h1 className="mb-2 text-3xl font-bold text-[var(--color-navy)]">Terms of Use</h1>
        <p className="mb-6 text-sm text-slate-500">S.K.R. INTER COLLEGE & PVT ITI</p>
        <div className="space-y-4 text-sm leading-relaxed text-slate-700">
          <p>
            This website provides public information and secure portals for students, parents and staff of
            S.K.R. INTER COLLEGE & PVT ITI, Udaypur Khalsa, Agra.
          </p>
          <p>
            Users must provide accurate information, keep login credentials confidential, and use the
            portals only for authorised purposes. Misuse of accounts or attempts to access another
            person's records is prohibited.
          </p>
          <p>
            Content on public pages is for information. Official decisions, fees, results and certificates
            are confirmed only by the school office or authorised portal records.
          </p>
          <p>
            The school may update these terms. Continued use of the site after changes constitutes acceptance.
          </p>
          <p>
            Contact: 9837183726 · Udaypur Khalsa, Post Bhadrauli, Bah, Pinahat, Agra — 283113.
          </p>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
