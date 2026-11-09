import Link from "next/link";
import { PublicPageShell, SoftCard } from "@/components/layout/PublicPageShell";
import { Download, FileText, Phone } from "lucide-react";

export const metadata = { title: "Downloads" };

export default function DownloadsPage() {
  const items = [
    {
      title: "Admission enquiry",
      desc: "Submit the online form — no PDF required for first contact.",
      href: "/apply-now",
      cta: "Open form",
    },
    {
      title: "Public notices",
      desc: "Circulars and announcements published by the office.",
      href: "/notices",
      cta: "View notices",
    },
    {
      title: "Student documents",
      desc: "Report cards and private files remain available after student or parent login.",
      href: "/login",
      cta: "Portal login",
    },
  ];

  return (
    <PublicPageShell
      eyebrow="Resources"
      title="Downloads & forms"
      description="Public forms and documents appear here once the administration uploads them. For current paper forms, contact the office."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((item) => (
          <SoftCard key={item.title} className="flex flex-col">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
              <FileText className="h-5 w-5" />
            </div>
            <h2 className="font-bold text-slate-900">{item.title}</h2>
            <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">{item.desc}</p>
            <Link href={item.href} className="mt-4 text-sm font-bold text-[var(--color-navy)] hover:underline">
              {item.cta} →
            </Link>
          </SoftCard>
        ))}
      </div>

      <SoftCard className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="rounded-2xl bg-amber-50 p-3 text-amber-700">
            <Download className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-bold text-slate-900">Need a prospectus or form today?</h2>
            <p className="mt-1 text-sm text-slate-600">Call the school office before visiting campus.</p>
          </div>
        </div>
        <a
          href="tel:9837183726"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-navy)] px-5 py-2.5 text-sm font-semibold text-white"
        >
          <Phone className="h-4 w-4" /> 9837183726
        </a>
      </SoftCard>
    </PublicPageShell>
  );
}
