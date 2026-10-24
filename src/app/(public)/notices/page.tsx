import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Notices & Circulars" };
export const dynamic = "force-dynamic";

export default async function NoticesPage() {
  let notices: { id: string; title: string; content: string; publishAt: Date | null; createdAt: Date; priority: string }[] = [];
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
    <div className="flex min-h-screen flex-col">
      <PublicHeader />
      <main className="mx-auto max-w-4xl flex-1 px-4 py-12">
        <h1 className="mb-2 text-3xl font-bold text-[var(--color-navy)]">Notices & Circulars</h1>
        <p className="mb-8 text-slate-600">Official announcements from S.K.R. INTER COLLEGE & PVT ITI.</p>
        {notices.length === 0 ? (
          <p className="rounded-xl border bg-white p-6 text-sm text-slate-500">No public notices right now. Call 9837183726 for urgent updates.</p>
        ) : (
          <ul className="space-y-4">
            {notices.map((n) => (
              <li key={n.id} className="rounded-xl border bg-white p-5 shadow-sm">
                <div className="mb-1 text-xs text-slate-400">{(n.publishAt || n.createdAt).toLocaleDateString("en-IN")} · {n.priority}</div>
                <h2 className="font-semibold text-[var(--color-navy)]">{n.title}</h2>
                <p className="mt-2 whitespace-pre-wrap text-sm text-slate-700">{n.content}</p>
              </li>
            ))}
          </ul>
        )}
      </main>
      <PublicFooter />
    </div>
  );
}
