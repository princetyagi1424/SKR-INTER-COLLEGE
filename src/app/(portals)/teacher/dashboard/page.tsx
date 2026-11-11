import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { Role } from "@prisma/client";
import Link from "next/link";
import { ClipboardList, BookOpen, FileSpreadsheet, Calendar } from "lucide-react";
import { PortalShell } from "@/components/portal/PortalShell";

const NAV = [
  { href: "/teacher/dashboard", labelKey: "overview" as const },
  { href: "/teacher/attendance", labelKey: "attendance" as const },
  { href: "/teacher/assignments", labelKey: "assignments" as const },
  { href: "/teacher/marks", labelKey: "marks" as const },
  { href: "/teacher/leave", labelKey: "leave" as const },
];

export default async function TeacherDashboard() {
  const user = await getSession();
  if (!user || user.role !== Role.TEACHER) redirect("/login");

  const cards = [
    { title: "Attendance", desc: "Mark class attendance", href: "/teacher/attendance", icon: ClipboardList },
    { title: "Assignments", desc: "Create and review work", href: "/teacher/assignments", icon: BookOpen },
    { title: "Marks", desc: "Enter exam marks", href: "/teacher/marks", icon: FileSpreadsheet },
    { title: "Leave", desc: "Apply for leave", href: "/teacher/leave", icon: Calendar },
  ];

  return (
    <PortalShell title="Teacher Portal" subtitle={user.displayName || user.firstName} nav={NAV}>
      <h1 className="mb-2 text-xl font-bold text-slate-900">Overview</h1>
      <p className="mb-6 text-sm text-slate-500">Quick links for daily teaching tasks.</p>
      <div className="mb-8 grid gap-3 sm:grid-cols-2">
        {cards.map((c) => (
          <Link key={c.href} href={c.href} className="card-surface flex gap-3 p-4 transition hover:border-[#c8102e]/30">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff0f1]">
              <c.icon className="h-5 w-5 text-[#c8102e]" />
            </div>
            <div>
              <div className="font-semibold text-slate-900">{c.title}</div>
              <div className="text-xs text-slate-500">{c.desc}</div>
            </div>
          </Link>
        ))}
      </div>
    </PortalShell>
  );
}
