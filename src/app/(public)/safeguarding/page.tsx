import { PublicPageShell, SoftCard } from "@/components/layout/PublicPageShell";

export const metadata = { title: "Child safeguarding" };

export default function Page() {
  return (
    <PublicPageShell eyebrow="Safety" title="Child safeguarding">
      <SoftCard>
        <p className="text-sm leading-7 text-slate-600">
          The school is committed to a safe environment for every student.
          Concerns about student safety should be reported promptly to the Principal or school office at 9837183726.
        </p>
        <p className="mt-4 text-xs text-slate-500">
          For formal policy documents, contact the school office. Public contact:{" "}
          <a href="tel:9837183726" className="font-semibold text-[var(--color-navy)] underline">9837183726</a>.
        </p>
      </SoftCard>
    </PublicPageShell>
  );
}
