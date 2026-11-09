import Link from "next/link";
import { PublicPageShell, SoftCard } from "@/components/layout/PublicPageShell";
import { prisma } from "@/lib/prisma";
import { Bell, CalendarDays } from "lucide-react";

export const metadata = { title: "Notices & Circulars" };
export const dynamic = "force-dynamic";

export default async function NoticesPage() {
  let notices: {
    id: string;
    title: string;
    content: string;
    publishAt: Date | null;
    createdAt: Date;
    priority: string;
  }[] = [];
  try {
    notices = await prisma.notice.findMany({
      where: { isPublished: true, audience: { in: ["PUBLIC", "ALL"] } },
      orderBy: { createdAt: "desc" },
      take: 30,
    });
  } catch {
    notices = [];
  }

  return (
    <PublicPageShell
      eyebrow="Announcements"
      title="Notices & circulars"
      description="Official public announcements from S.K.R. INTER COLLEGE & PVT ITI. Private student notices remain available after login."
      actions={
        <>
          <Link href="/apply-now" className="rounded-full bg-[var(--color-navy)] px-5 py-2.5 text-sm font-semibold text-white shadow-sm">
            Admission enquiry
          </Link>
          <Link href="/contact" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700">
            Contact office
          </Link>
        </>
      }
    >
      {notices.length === 0 ? (
        <SoftCard className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
            <Bell className="h-6 w-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">No published notices yet</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
            When the office publishes circulars, they will appear here. For urgent information call{" "}
            <a href="tel:9837183726" className="font-semibold text-[var(--color-navy)] underline">9837183726</a>.
          </p>
        </SoftCard>
      ) : (
        <div className="grid gap-4">
          {notices.map((n) => (
            <article key={n.id} className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-[var(--shadow-card)] sm:p-6">
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 font-semibold uppercase tracking-wide">
                  <CalendarDays className="h-3.5 w-3.5" />
                  {(n.publishAt || n.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
                {n.priority && n.priority !== "NORMAL" && (
                  <span className="rounded-full bg-amber-50 px-2.5 py-1 font-semibold uppercase tracking-wide text-amber-800">
                    {n.priority}
                  </span>
                )}
              </div>
              <h2 className="mt-3 text-lg font-bold text-slate-900">{n.title}</h2>
              <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-slate-600">{n.content}</p>
            </article>
          ))}
        </div>
      )}
    </PublicPageShell>
  );
}
