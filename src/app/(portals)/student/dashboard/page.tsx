import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Role } from "@prisma/client";
import { PortalShell } from "@/components/portal/PortalShell";

const NAV = [
  { href: "/student/dashboard", labelKey: "overview" as const },
  { href: "/student/attendance", labelKey: "attendance" as const },
  { href: "/student/assignments", labelKey: "assignments" as const },
  { href: "/student/timetable", labelKey: "timetable" as const },
  { href: "/student/fees", labelKey: "fees" as const },
  { href: "/student/library", labelKey: "library" as const },
  { href: "/student/certificates", labelKey: "certificates" as const },
  { href: "/notices", labelKey: "notices" as const },
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
    },
  });

  if (!student) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--color-cream)] px-4">
        <div className="card-surface max-w-md p-6 text-center">
          <p className="text-sm text-slate-600">
            Student profile is not linked to this login. Contact the school office.
          </p>
          <Link href="/" className="mt-4 inline-block text-sm font-semibold text-[#c8102e] hover:underline">
            Back to website
          </Link>
        </div>
      </div>
    );
  }

  const enrollment = student.enrollments[0];

  return (
    <PortalShell title="Student Portal" subtitle={user.displayName || user.firstName} nav={NAV}>
      <h1 className="mb-2 text-xl font-bold text-slate-900">Overview</h1>
      <p className="mb-6 text-sm text-slate-500">
        {enrollment
          ? `${enrollment.class?.name || ""} ${enrollment.section?.name || ""} · ${enrollment.academicSession?.name || ""}`
          : "No active enrollment"}
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {["/student/attendance", "/student/fees", "/student/assignments", "/student/timetable"].map((href) => (
          <Link key={href} href={href} className="card-surface p-4 text-sm font-semibold text-slate-800 hover:border-[#c8102e]/30">
            {href.split("/").pop()}
          </Link>
        ))}
      </div>
    </PortalShell>
  );
}
