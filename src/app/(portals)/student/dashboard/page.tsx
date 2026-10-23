import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Role } from "@prisma/client";

export default async function StudentDashboard() {
  const user = await getSession();
  if (!user || user.role !== Role.STUDENT) redirect("/login");

  const student = await prisma.student.findFirst({
    where: { userId: user.id },
    include: {
      enrollments: {
        where: { status: "ENROLLED" },
        include: {
          class: true,
          section: true,
          academicSession: true,
        },
        take: 1,
      },
      reportCards: {
        where: { isCurrent: true },
        include: { exam: true },
        orderBy: { publishedAt: "desc" },
        take: 5,
      },
    },
  });

  if (!student) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-slate-500">Student profile not linked. Contact the school office.</p>
      </div>
    );
  }

  const enrollment = student.enrollments[0];
  const attendanceStats = await prisma.attendance.groupBy({
    by: ["status"],
    where: { studentId: student.id },
    _count: true,
  });
  const present = attendanceStats.find((a) => a.status === "PRESENT")?._count || 0;
  const total = attendanceStats.reduce((s, a) => s + a._count, 0);
  const pct = total > 0 ? Math.round((present / total) * 100) : null;

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-[var(--color-navy)] text-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <div>
            <div className="text-sm font-semibold">{student.firstName} {student.lastName}</div>
            <div className="text-xs text-white/70">
              {enrollment
                ? `${enrollment.class.name}${enrollment.section ? `-${enrollment.section.name}` : ""} · Roll ${enrollment.rollNumber || "—"}`
                : "Not enrolled"}
              {" · "}
              {student.admissionNumber}
            </div>
          </div>
          <form action="/api/auth/logout" method="POST">
            <button type="submit" className="text-xs hover:underline">
              Logout
            </button>
          </form>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="mb-6 text-xl font-bold text-slate-800">My Dashboard</h1>

        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border bg-white p-4">
            <div className="text-xs text-slate-500">Attendance</div>
            <div className="text-2xl font-bold text-[var(--color-navy)]">
              {pct != null ? `${pct}%` : "—"}
            </div>
          </div>
          <div className="rounded-xl border bg-white p-4">
            <div className="text-xs text-slate-500">Published Results</div>
            <div className="text-2xl font-bold text-[var(--color-navy)]">
              {student.reportCards.length}
            </div>
          </div>
          <div className="rounded-xl border bg-white p-4">
            <div className="text-xs text-slate-500">Class</div>
            <div className="text-lg font-bold text-[var(--color-navy)]">
              {enrollment?.class.name || "—"}
            </div>
          </div>
        </div>

        <section className="mb-6">
          <h2 className="mb-3 font-semibold text-slate-700">My Results</h2>
          {student.reportCards.length === 0 ? (
            <p className="rounded-xl border bg-white p-6 text-sm text-slate-500">
              No published results yet. Results appear here after the school publishes them.
            </p>
          ) : (
            <ul className="divide-y rounded-xl border bg-white">
              {student.reportCards.map((rc) => (
                <li key={rc.id} className="flex items-center justify-between px-4 py-3">
                  <div>
                    <div className="font-medium text-sm">{rc.exam.name}</div>
                    <div className="text-xs text-slate-500">
                      {rc.percentage != null ? `${rc.percentage.toFixed(1)}%` : ""} ·{" "}
                      {rc.resultStatus || ""} ·{" "}
                      {rc.publishedAt
                        ? new Date(rc.publishedAt).toLocaleDateString("en-IN")
                        : ""}
                    </div>
                  </div>
                  <Link
                    href={`/student/results/${rc.id}`}
                    className="rounded-md bg-[var(--color-navy)] px-3 py-1.5 text-xs font-medium text-white"
                  >
                    View / Download
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section>
          <h2 className="mb-3 font-semibold text-slate-700">Quick Links</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            <Link href="/student/attendance" className="rounded-lg border bg-white px-4 py-3 text-sm hover:bg-slate-50">
              Attendance History
            </Link>
            <Link href="/student/assignments" className="rounded-lg border bg-white px-4 py-3 text-sm hover:bg-slate-50">
              Homework & Assignments
            </Link>
            <Link href="/student/timetable" className="rounded-lg border bg-white px-4 py-3 text-sm hover:bg-slate-50">
              Timetable
            </Link>
            <Link href="/notices" className="rounded-lg border bg-white px-4 py-3 text-sm hover:bg-slate-50">
              School Notices
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
