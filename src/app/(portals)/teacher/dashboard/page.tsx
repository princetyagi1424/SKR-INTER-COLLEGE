import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Role } from "@prisma/client";
import { ClipboardCheck, FileEdit, NotebookPen, CalendarDays } from "lucide-react";
import { PortalShell } from "@/components/portal/PortalShell";

const NAV = [
  { href: "/teacher/dashboard", label: "Overview" },
  { href: "/teacher/attendance", label: "Attendance" },
  { href: "/teacher/marks", label: "Marks" },
  { href: "/teacher/assignments", label: "Assignments" },
  { href: "/teacher/leave", label: "Leave" },
];

export default async function TeacherDashboard() {
  const user = await getSession();
  if (!user || user.role !== Role.TEACHER) redirect("/login");

  const staff = await prisma.staff.findFirst({
    where: { userId: user.id },
    include: {
      teacherSubjects: {
        include: { subject: { include: { class: true } } },
      },
    },
  });

  const cards = [
    { href: "/teacher/attendance", title: "Mark attendance", desc: "Daily class attendance", icon: ClipboardCheck },
    { href: "/teacher/marks", title: "Enter marks", desc: "Draft and submit for approval", icon: FileEdit },
    { href: "/teacher/assignments", title: "Assignments", desc: "Homework and submissions", icon: NotebookPen },
    { href: "/teacher/leave", title: "Leave request", desc: "Submit leave for approval", icon: CalendarDays },
  ];

  return (
    <PortalShell
      title="Teacher portal"
      subtitle={user.displayName || user.firstName}
      nav={NAV}
    >
      <h1 className="mb-2 text-2xl font-bold text-[var(--color-navy)]">Dashboard</h1>
      <p className="mb-6 text-sm text-[var(--color-muted-text)]">
        Use the tools below for classes assigned to you. Marks stay private until the exam office publishes them.
      </p>

      <div className="mb-8 grid gap-3 sm:grid-cols-2">
        {cards.map((c) => (
          <Link key={c.href} href={c.href} className="card-surface flex gap-3 p-4 transition hover:border-[var(--color-blue)]/30">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-navy)]/5">
              <c.icon className="h-5 w-5 text-[var(--color-blue)]" />
            </div>
            <div>
              <div className="font-semibold text-slate-900">{c.title}</div>
              <div className="text-xs text-slate-500">{c.desc}</div>
            </div>
          </Link>
        ))}
      </div>

      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[var(--color-muted-text)]">
        My subjects
      </h2>
      <div className="card-surface divide-y">
        {!staff || staff.teacherSubjects.length === 0 ? (
          <p className="p-5 text-sm text-slate-500">
            No subjects linked yet. Ask the admin to assign your teaching load.
          </p>
        ) : (
          staff.teacherSubjects.map((ts) => (
            <div key={ts.id} className="px-4 py-3 text-sm">
              <span className="font-medium text-slate-800">{ts.subject.name}</span>
              <span className="text-slate-500"> · {ts.subject.class.name}</span>
            </div>
          ))
        )}
      </div>
    </PortalShell>
  );
}
