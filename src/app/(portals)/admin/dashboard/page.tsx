import { redirect } from "next/navigation";
import { getSession, ADMIN_ROLES, STAFF_ROLES } from "@/lib/auth";
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
  LogOut,
} from "lucide-react";

export default async function AdminDashboard() {
  const user = await getSession();
  if (!user || !STAFF_ROLES.includes(user.role)) {
    redirect("/login");
  }

  const session = await prisma.academicSession.findFirst({ where: { isCurrent: true } });
  const sessionId = session?.id;

  const [
    studentCount,
    staffCount,
    classCount,
    pendingAdmissions,
    todayAttendance,
    pendingFees,
    upcomingExams,
    recentNotices,
  ] = await Promise.all([
    prisma.student.count({ where: { isActive: true } }),
    prisma.staff.count({ where: { isActive: true } }),
    prisma.class.count({ where: { isActive: true, academicSessionId: sessionId || undefined } }),
    prisma.admissionApplication.count({ where: { status: "SUBMITTED" } }),
    sessionId
      ? prisma.attendance.count({
          where: {
            date: new Date(new Date().toISOString().slice(0, 10)),
            academicSessionId: sessionId,
            status: "PRESENT",
          },
        })
      : 0,
    prisma.feeInvoice.aggregate({
      where: { status: { in: ["PENDING", "PARTIAL", "OVERDUE"] } },
      _sum: { totalAmount: true },
    }),
    prisma.exam.count({
      where: { status: { in: ["SCHEDULED", "ONGOING", "MARKS_ENTRY"] } },
    }),
    prisma.notice.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  const stats = [
    { label: "Enrolled Students", value: studentCount, icon: Users, href: "/admin/students" },
    { label: "Active Staff", value: staffCount, icon: GraduationCap, href: "/admin/staff" },
    { label: "Classes", value: classCount, icon: BookOpen, href: "/admin/classes" },
    { label: "Pending Admissions", value: pendingAdmissions, icon: ClipboardList, href: "/admin/admissions" },
    { label: "Today Present", value: todayAttendance, icon: ClipboardList, href: "/admin/attendance" },
    {
      label: "Pending Fees (₹)",
      value: Math.round(pendingFees._sum.totalAmount || 0).toLocaleString("en-IN"),
      icon: IndianRupee,
      href: "/admin/fees",
    },
    { label: "Active Exams", value: upcomingExams, icon: FileSpreadsheet, href: "/admin/exams" },
    { label: "Notices", value: recentNotices.length, icon: Bell, href: "/admin/notices" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top bar */}
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-navy)] text-sm font-bold text-[var(--color-gold)]">
              SKR
            </div>
            <div>
              <div className="text-sm font-semibold text-[var(--color-navy)]">Admin Dashboard</div>
              <div className="text-xs text-slate-500">
                {session?.name || "No active session"} · {user.displayName || user.firstName}
              </div>
            </div>
          </div>
          <form action="/api/auth/logout" method="POST">
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100"
            >
              <LogOut className="h-4 w-4" /> Logout
            </button>
          </form>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="mb-6 text-2xl font-bold text-slate-800">Overview</h1>

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <Link
              key={s.label}
              href={s.href}
              className="rounded-xl border bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="mb-2 flex items-center justify-between">
                <s.icon className="h-5 w-5 text-[var(--color-navy)]" />
              </div>
              <div className="text-2xl font-bold text-slate-800">{s.value}</div>
              <div className="text-xs text-slate-500">{s.label}</div>
            </Link>
          ))}
        </div>

        {/* Quick actions */}
        <h2 className="mb-4 text-lg font-semibold text-slate-800">Quick Actions</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            href="/admin/students/import"
            className="rounded-xl border border-[var(--color-navy)]/20 bg-white p-4 text-sm font-medium text-[var(--color-navy)] shadow-sm hover:bg-slate-50"
          >
            📥 Bulk Import Students (Excel)
          </Link>
          <Link
            href="/admin/students"
            className="rounded-xl border bg-white p-4 text-sm font-medium shadow-sm hover:bg-slate-50"
          >
            👥 Manage Students
          </Link>
          <Link
            href="/admin/exams"
            className="rounded-xl border bg-white p-4 text-sm font-medium shadow-sm hover:bg-slate-50"
          >
            📝 Examinations & Results
          </Link>
          <Link
            href="/admin/attendance"
            className="rounded-xl border bg-white p-4 text-sm font-medium shadow-sm hover:bg-slate-50"
          >
            ✅ Attendance
          </Link>
          <Link
            href="/admin/fees"
            className="rounded-xl border bg-white p-4 text-sm font-medium shadow-sm hover:bg-slate-50"
          >
            💰 Fees & Payments
          </Link>
          <Link
            href="/admin/notices"
            className="rounded-xl border bg-white p-4 text-sm font-medium shadow-sm hover:bg-slate-50"
          >
            📢 Notices
          </Link>
          <Link
            href="/admin/settings"
            className="rounded-xl border bg-white p-4 text-sm font-medium shadow-sm hover:bg-slate-50"
          >
            ⚙️ School Settings
          </Link>
          <Link
            href="/admin/reports"
            className="rounded-xl border bg-white p-4 text-sm font-medium shadow-sm hover:bg-slate-50"
          >
            📊 Reports
          </Link>
        </div>

        {/* Recent notices */}
        {recentNotices.length > 0 && (
          <div className="mt-8">
            <h2 className="mb-4 text-lg font-semibold text-slate-800">Recent Notices</h2>
            <ul className="divide-y rounded-xl border bg-white">
              {recentNotices.map((n) => (
                <li key={n.id} className="px-4 py-3 text-sm">
                  <span className="font-medium">{n.title}</span>
                  <span className="ml-2 text-xs text-slate-400">
                    {new Date(n.createdAt).toLocaleDateString("en-IN")}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
