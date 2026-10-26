import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Role } from "@prisma/client";
import { PortalShell } from "@/components/portal/PortalShell";

const NAV = [
  { href: "/student/dashboard", label: "Overview" },
  { href: "/student/attendance", label: "Attendance" },
  { href: "/student/assignments", label: "Assignments" },
  { href: "/student/timetable", label: "Timetable" },
  { href: "/student/fees", label: "Fees" },
  { href: "/student/library", label: "Library" },
  { href: "/student/certificates", label: "Certificates" },
  { href: "/notices", label: "Notices" },
];

export default async function StudentDashboard() {
  const user = await getSession();
  if (!user || user.role !== Role.STUDENT) redirect("/login");

  const student = await prisma.student.findFirst({
    where: { userId: user.id },
    include: {
      enrollments: {
        where: { status: "ENROLLED" },
        include: { class: true, section: true, academicSession: true },
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
      <div className="flex min-h-screen items-center justify-center bg-[var(--color-cream)] px-4">
        <div className="card-surface max-w-md p-6 text-center">
          <p className="text-sm text-slate-600">Student profile is not linked to this login. Contact the school office.</p>
          <Link href="/" className="mt-4 inline-block text-sm font-semibold text-[var(--color-blue)] hover:underline">
            Back to website
          </Link>
        </div>
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

  const links = [
    { href: "/student/attendance", label: "Attendance history" },
    { href: "/student/assignments", label: "Homework & assignments" },
    { href: "/student/timetable", label: "Timetable" },
    { href: "/student/fees", label: "Fees" },
    { href: "/student/library", label: "Library" },
    { href: "/student/certificates", label: "Certificates" },
    { href: "/notices", label: "School notices" },
  ];

  return (
    <PortalShell
      title="Student portal"
      subtitle={
        enrollment
          ? `${student.firstName} · ${enrollment.class.name}${enrollment.section ? `-${enrollment.section.name}` : ""} · ${student.admissionNumber}`
          : `${student.firstName} · ${student.admissionNumber}`
      }
      nav={NAV}
    >
      <h1 className="mb-6 text-2xl font-bold text-[var(--color-navy)]">My dashboard</h1>

      <div className="mb-8 grid gap-3 sm:grid-cols-3">
        <div className="card-surface p-4">
          <div className="text-xs text-[var(--color-muted-text)]">Attendance</div>
          <div className="mt-1 text-2xl font-bold text-[var(--color-navy)]">{pct != null ? `${pct}%` : "—"}</div>
          <div className="text-xs text-slate-400">{total > 0 ? `${present} / ${total} days` : "No records yet"}</div>
        </div>
        <div className="card-surface p-4">
          <div className="text-xs text-[var(--color-muted-text)]">Published results</div>
          <div className="mt-1 text-2xl font-bold text-[var(--color-navy)]">{student.reportCards.length}</div>
        </div>
        <div className="card-surface p-4">
          <div className="text-xs text-[var(--color-muted-text)]">Class</div>
          <div className="mt-1 text-lg font-bold text-[var(--color-navy)]">{enrollment?.class.name || "—"}</div>
        </div>
      </div>

      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[var(--color-muted-text)]">My results</h2>
      <div className="card-surface mb-8 divide-y">
        {student.reportCards.length === 0 ? (
          <p className="p-5 text-sm text-slate-500">
            No published results yet. They appear here after the school publishes them.
          </p>
        ) : (
          student.reportCards.map((rc) => (
            <div key={rc.id} className="flex items-center justify-between gap-3 px-4 py-3">
              <div>
                <div className="text-sm font-medium text-slate-800">{rc.exam.name}</div>
                <div className="text-xs text-slate-500">
                  {rc.percentage != null ? `${rc.percentage.toFixed(1)}%` : ""}
                  {rc.resultStatus ? ` · ${rc.resultStatus}` : ""}
                  {rc.publishedAt ? ` · ${new Date(rc.publishedAt).toLocaleDateString("en-IN")}` : ""}
                </div>
              </div>
              <Link
                href={`/student/results/${rc.id}`}
                className="rounded-lg bg-[var(--color-navy)] px-3 py-1.5 text-xs font-semibold text-white"
              >
                View
              </Link>
            </div>
          ))
        )}
      </div>

      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[var(--color-muted-text)]">Quick links</h2>
      <div className="grid gap-2 sm:grid-cols-2">
        {links.map((l) => (
          <Link key={l.href} href={l.href} className="card-surface px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-[var(--color-blue)]/30">
            {l.label}
          </Link>
        ))}
      </div>
    </PortalShell>
  );
}
