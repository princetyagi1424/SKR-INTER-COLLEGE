import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Role } from "@prisma/client";

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

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-[var(--color-navy)] text-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <div>
            <div className="text-sm font-semibold">{user.displayName || user.firstName}</div>
            <div className="text-xs text-white/70">Teacher Portal</div>
          </div>
          <form action="/api/auth/logout" method="POST">
            <button type="submit" className="text-xs hover:underline">Logout</button>
          </form>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="mb-6 text-xl font-bold text-slate-800">Teacher Dashboard</h1>

        <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <Link href="/teacher/attendance" className="rounded-xl border bg-white p-4 shadow-sm hover:shadow-md">
            <div className="font-semibold text-[var(--color-navy)]">Mark Attendance</div>
            <div className="text-xs text-slate-500">Daily class attendance</div>
          </Link>
          <Link href="/teacher/marks" className="rounded-xl border bg-white p-4 shadow-sm hover:shadow-md">
            <div className="font-semibold text-[var(--color-navy)]">Enter Marks</div>
            <div className="text-xs text-slate-500">Exam marks entry & draft</div>
          </Link>
          <Link href="/teacher/assignments" className="rounded-xl border bg-white p-4 shadow-sm hover:shadow-md">
            <div className="font-semibold text-[var(--color-navy)]">Assignments</div>
            <div className="text-xs text-slate-500">Homework & submissions</div>
          </Link>
        </div>

        {staff && staff.teacherSubjects.length > 0 && (
          <section>
            <h2 className="mb-3 font-semibold text-slate-700">My Subjects</h2>
            <ul className="divide-y rounded-xl border bg-white">
              {staff.teacherSubjects.map((ts) => (
                <li key={ts.id} className="px-4 py-3 text-sm">
                  {ts.subject.name} · {ts.subject.class.name}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
