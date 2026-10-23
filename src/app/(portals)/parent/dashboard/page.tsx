import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Role } from "@prisma/client";

export default async function ParentDashboard() {
  const user = await getSession();
  if (!user || user.role !== Role.PARENT) redirect("/login");

  const parent = await prisma.parent.findFirst({
    where: { userId: user.id },
    include: {
      children: {
        include: {
          student: {
            include: {
              enrollments: {
                where: { status: "ENROLLED" },
                include: { class: true, section: true },
                take: 1,
              },
              reportCards: {
                where: { isCurrent: true },
                include: { exam: true },
                take: 3,
              },
            },
          },
        },
      },
    },
  });

  const children = parent?.children.map((c) => c.student) || [];

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-[var(--color-navy)] text-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <div>
            <div className="text-sm font-semibold">{user.displayName || user.firstName}</div>
            <div className="text-xs text-white/70">Parent Portal</div>
          </div>
          <form action="/api/auth/logout" method="POST">
            <button type="submit" className="text-xs hover:underline">Logout</button>
          </form>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="mb-6 text-xl font-bold text-slate-800">My Children</h1>

        {children.length === 0 ? (
          <p className="rounded-xl border bg-white p-6 text-sm text-slate-500">
            No linked children. Contact the school office to link your ward&apos;s profile.
          </p>
        ) : (
          <div className="space-y-4">
            {children.map((child) => {
              const enr = child.enrollments[0];
              return (
                <div key={child.id} className="rounded-xl border bg-white p-5 shadow-sm">
                  <div className="mb-2 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-slate-800">
                        {child.firstName} {child.lastName}
                      </div>
                      <div className="text-xs text-slate-500">
                        {enr ? `${enr.class.name}${enr.section ? `-${enr.section.name}` : ""}` : ""} ·{" "}
                        {child.admissionNumber}
                      </div>
                    </div>
                  </div>
                  {child.reportCards.length > 0 && (
                    <div className="mt-3 border-t pt-3">
                      <div className="mb-1 text-xs font-medium text-slate-500">Recent Results</div>
                      {child.reportCards.map((rc) => (
                        <div key={rc.id} className="flex justify-between text-sm">
                          <span>{rc.exam.name}</span>
                          <span>
                            {rc.percentage != null ? `${rc.percentage.toFixed(1)}%` : "—"}{" "}
                            <Link
                              href={`/parent/results/${rc.id}`}
                              className="text-[var(--color-navy)] hover:underline"
                            >
                              View
                            </Link>
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
