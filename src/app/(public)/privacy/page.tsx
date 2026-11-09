import { PublicPageShell, SoftCard } from "@/components/layout/PublicPageShell";

export const metadata = { title: "Privacy policy" };

export default function Page() {
  return (
    <PublicPageShell eyebrow="Legal" title="Privacy policy">
      <SoftCard>
        <p className="text-sm leading-7 text-slate-600">
          S.K.R. INTER COLLEGE collects only the information needed for admissions, academics and school communication.
          Student data is not sold. Contact the office for data-related requests.
        </p>
        <p className="mt-4 text-xs text-slate-500">
          For formal policy documents, contact the school office. Public contact:{" "}
          <a href="tel:9837183726" className="font-semibold text-[var(--color-navy)] underline">9837183726</a>.
        </p>
      </SoftCard>
    </PublicPageShell>
  );
}
