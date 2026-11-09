import { PublicPageShell, SoftCard } from "@/components/layout/PublicPageShell";

export const metadata = { title: "Terms of use" };

export default function Page() {
  return (
    <PublicPageShell eyebrow="Legal" title="Terms of use">
      <SoftCard>
        <p className="text-sm leading-7 text-slate-600">
          This website provides institutional information and secure portals for authorised users.
          Misuse of login credentials or attempts to access another person&apos;s records is prohibited.
        </p>
        <p className="mt-4 text-xs text-slate-500">
          For formal policy documents, contact the school office. Public contact:{" "}
          <a href="tel:9837183726" className="font-semibold text-[var(--color-navy)] underline">9837183726</a>.
        </p>
      </SoftCard>
    </PublicPageShell>
  );
}
