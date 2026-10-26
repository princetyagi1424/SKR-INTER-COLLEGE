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
  { href: "/admin/dashboard", label: "Overview" },
  { href: "/admin/students", label: "Students" },
  { href: "/admin/students/import", label: "Bulk import" },
  { href: "/admin/admissions", label: "Admissions" },
  { href: "/admin/attendance", label: "Attendance" },
  { href: "/admin/exams", label: "Exams" },
  { href: "/admin/fees", label: "Fees" },
  { href: "/admin/notices", label: "Notices" },
  { href: "/admin/library", label: "Library" },
  { href: "/admin/certificates", label: "Certificates" },
  { href: "/admin/leave", label: "Staff leave" },
  { href: "/admin/content", label: "Gallery & files" },
  { href: "/admin/settings", label: "Settings" },
  { href: "/admin/reports", label: "Reports" },
];

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
    prisma.admissionApplication.count({ where: { status: { in: ["NEW", "SUBMITTED"] } } }),
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
    { label: "Enrolled students", value: studentCount, icon: Users, href: "/admin/students" },
    { label: "Active staff", value: staffCount, icon: GraduationCap, href: "/admin/students" },
    { label: "Classes", value: classCount, icon: BookOpen, href: "/admin/dashboard" },
    { label: "Pending enquiries", value: pendingAdmissions, icon: ClipboardList, href: "/admin/admissions" },
    { label: "Present today", value: todayAttendance, icon: ClipboardList, href: "/admin/attendance" },
    {
      label: "Pending fees (₹)",
      value: Math.round(pendingFees._sum.totalAmount || 0).toLocaleString("en-IN"),
      icon: IndianRupee,
      href: "/admin/fees",
    },
    { label: "Active exams", value: upcomingExams, icon: FileSpreadsheet, href: "/admin/exams" },
    { label: "Recent notices", value: recentNotices.length, icon: Bell, href: "/admin/notices" },
  ];

  const actions = [
    { href: "/admin/students/import", label: "Bulk import students", desc: "Excel / CSV", icon: Upload },
    { href: "/admin/admissions", label: "Admission enquiries", desc: "Follow up", icon: ClipboardList },
    { href: "/admin/exams", label: "Exams & results", desc: "Publish cards", icon: FileSpreadsheet },
    { href: "/admin/attendance", label: "Attendance", desc: "Daily records", icon: ClipboardList },
    { href: "/admin/fees", label: "Fees", desc: "Invoices & receipts", icon: IndianRupee },
    { href: "/admin/library", label: "Library", desc: "Issue & return", icon: Library },
    { href: "/admin/certificates", label: "Certificates", desc: "Bonafide / TC", icon: ScrollText },
    { href: "/admin/notices", label: "Notices", desc: "Publish updates", icon: Bell },
    { href: "/admin/settings", label: "School settings", desc: "Contact & hours", icon: Settings },
    { href: "/admin/reports", label: "Reports", desc: "Operational counts", icon: BarChart3 },
  ];

  return (
    <PortalShell
      title="Admin portal"
      subtitle={`${session?.name || "No active session"} · ${user.displayName || user.firstName}`}
      nav={NAV}
    >
      <div className="mb-6 overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 p-6 text-white shadow-lg sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-white/70">Admin workspace</p>
        <h1 className="mt-1 text-2xl font-bold sm:text-3xl">Welcome back</h1>
        <p className="mt-2 max-w-xl text-sm text-white/80">
          Live counts from the school database. Empty modules stay at zero until real data is entered.
        </p>
      </div>

      <div className="mb-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="rounded-2xl border border-white bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="mb-3 flex items-center justify-between">
              <s.icon className="h-5 w-5 text-emerald-600" />
              <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">Open</span>
            </div>
            <div className="text-2xl font-bold text-slate-900">{s.value}</div>
            <div className="mt-0.5 text-xs text-slate-500">{s.label}</div>
          </Link>
        ))}
      </div>

      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">Quick actions</h2>
      <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {actions.map((a) => (
          <Link
            key={a.href}
            href={a.href}
            className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition hover:border-emerald-200"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50">
              <a.icon className="h-4 w-4 text-emerald-700" />
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-900">{a.label}</div>
              <div className="text-xs text-slate-500">{a.desc}</div>
            </div>
          </Link>
        ))}
      </div>

      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">Latest published notices</h2>
      <div className="divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        {recentNotices.length === 0 ? (
          <p className="p-5 text-sm text-slate-500">No published notices yet.</p>
        ) : (
          recentNotices.map((n) => (
            <div key={n.id} className="flex items-center justify-between gap-3 px-4 py-3 text-sm">
              <div className="min-w-0">
                <div className="truncate font-medium text-slate-800">{n.title}</div>
                <div className="text-xs text-slate-500">
                  {n.publishedAt ? new Date(n.publishedAt).toLocaleDateString("en-IN") : ""}
                </div>
              </div>
              <Link href="/admin/notices" className="shrink-0 text-xs font-semibold text-emerald-600 hover:underline">
                Manage
              </Link>
            </div>
          ))
        )}
      </div>
    </PortalShell>
  );
}
