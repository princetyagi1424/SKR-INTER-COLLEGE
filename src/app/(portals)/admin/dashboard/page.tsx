import { redirect } from "next/navigation";
import { getSession, STAFF_ROLES } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  Users,
  GraduationCap,
  ClipboardList,
  IndianRupee,
  FileSpreadsheet,
  BookOpen,
  Bell,
  Upload,
  Library,
  ScrollText,
  Settings,
  BarChart3,
} from "lucide-react";
import { PortalShell } from "@/components/portal/PortalShell";

const NAV = [
  { href: "/admin/dashboard", labelKey: "overview" as const },
  { href: "/admin/students", labelKey: "students" as const },
  { href: "/admin/students/import", labelKey: "bulkImport" as const },
  { href: "/admin/admissions", labelKey: "admissions" as const },
  { href: "/admin/attendance", labelKey: "attendance" as const },
  { href: "/admin/exams", labelKey: "exams" as const },
  { href: "/admin/fees", labelKey: "fees" as const },
  { href: "/admin/notices", labelKey: "notices" as const },
  { href: "/admin/library", labelKey: "library" as const },
  { href: "/admin/certificates", labelKey: "certificates" as const },
  { href: "/admin/leave", labelKey: "staffLeave" as const },
  { href: "/admin/settings", labelKey: "settings" as const },
  { href: "/admin/reports", labelKey: "reports" as const },
];

export default async function AdminDashboard() {
  const user = await getSession();
  if (!user || !STAFF_ROLES.includes(user.role)) {
    redirect("/login");
  }

  const session = await prisma.academicSession.findFirst({ where: { isCurrent: true } });
  const sessionId = session?.id;

  const [studentCount, staffCount, classCount, pendingAdmissions, upcomingExams] =
    await Promise.all([
      prisma.student.count({ where: { isActive: true } }),
      prisma.staff.count({ where: { isActive: true } }),
      prisma.class.count({
        where: { isActive: true, academicSessionId: sessionId || undefined },
      }),
      prisma.admissionApplication.count({ where: { status: { in: ["NEW", "SUBMITTED"] } } }),
      prisma.exam.count({
        where: { status: { in: ["SCHEDULED", "ONGOING", "MARKS_ENTRY"] } },
      }),
    ]);

  const cards = [
    { title: "Students", value: studentCount, href: "/admin/students", icon: Users },
    { title: "Staff", value: staffCount, href: "/admin/dashboard", icon: GraduationCap },
    { title: "Classes", value: classCount, href: "/admin/dashboard", icon: BookOpen },
    { title: "Pending admissions", value: pendingAdmissions, href: "/admin/admissions", icon: ClipboardList },
    { title: "Upcoming exams", value: upcomingExams, href: "/admin/exams", icon: FileSpreadsheet },
  ];

  return (
    <PortalShell title="Administration" subtitle={user.displayName || user.firstName} nav={NAV}>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-900">Overview</h1>
        <p className="text-sm text-slate-500">
          {session?.name || "Current session"} · {user.role}
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <Link
            key={c.title}
            href={c.href}
            className="card-surface flex items-center gap-3 p-4 transition hover:border-[#c8102e]/30"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff0f1]">
              <c.icon className="h-5 w-5 text-[#c8102e]" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">{c.value}</div>
              <div className="text-xs text-slate-500">{c.title}</div>
            </div>
          </Link>
        ))}
      </div>
    </PortalShell>
  );
}
