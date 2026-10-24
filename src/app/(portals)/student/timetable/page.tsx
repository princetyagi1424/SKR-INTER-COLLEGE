import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default async function TimetablePage() {
  const user = await getSession();
  if (!user) redirect("/login");
  const student = await prisma.student.findFirst({
    where: { userId: user.id },
    include: { enrollments: { where: { status: "ENROLLED" }, take: 1 } },
  });
  const classId = student?.enrollments[0]?.classId;
  const tables = classId
    ? await prisma.timetable.findMany({
        where: { classId, isActive: true },
        include: { slots: { include: { subject: true }, orderBy: { periodNumber: "asc" } } },
      })
    : [];
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white px-4 py-3"><Link href="/student/dashboard" className="text-sm font-semibold text-[var(--color-navy)]">← Dashboard</Link></header>
      <main className="mx-auto max-w-xl px-4 py-8">
        <h1 className="mb-4 text-xl font-bold">Timetable</h1>
        {tables.length === 0 && <p className="text-sm text-slate-500">Timetable has not been published for your class yet.</p>}
        {tables.map((t) => (
          <section key={t.id} className="mb-4">
            <h2 className="mb-2 text-sm font-semibold">{DAYS[t.dayOfWeek] || `Day ${t.dayOfWeek}`}</h2>
            <ul className="divide-y rounded-xl border bg-white text-sm">
              {t.slots.map((s) => (
                <li key={s.id} className="px-4 py-2">Period {s.periodNumber} · {s.startTime}–{s.endTime} · {s.subject?.name || "Period"}</li>
              ))}
            </ul>
          </section>
        ))}
      </main>
    </div>
  );
}
