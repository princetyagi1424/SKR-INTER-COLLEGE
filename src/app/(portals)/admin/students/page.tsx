import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession, canManageStudents } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function StudentsPage() {
  const user = await getSession();
  if (!user || !canManageStudents(user.role)) redirect("/login");
  const students = await prisma.student.findMany({
    where: { isActive: true },
    orderBy: { admissionNumber: "asc" },
    take: 200,
    include: { enrollments: { where: { status: "ENROLLED" }, include: { class: true, section: true }, take: 1 } },
  });
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white px-4 py-3 flex gap-4">
        <Link href="/admin/dashboard" className="text-sm font-semibold text-[var(--color-navy)]">← Admin</Link>
        <Link href="/admin/students/import" className="text-sm font-semibold text-[var(--color-navy)]">Bulk import</Link>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="mb-4 text-xl font-bold">Students ({students.length})</h1>
        <ul className="divide-y rounded-xl border bg-white">
          {students.map((s) => {
            const en = s.enrollments[0];
            return (
              <li key={s.id} className="flex justify-between px-4 py-3 text-sm">
                <span>{s.admissionNumber} · {s.firstName} {s.lastName}</span>
                <span className="text-slate-500">{en ? `${en.class.name}${en.section ? "-" + en.section.name : ""}` : "Not enrolled"}</span>
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
}
