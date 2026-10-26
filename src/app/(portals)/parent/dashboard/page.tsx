import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Role } from "@prisma/client";
import { PortalShell } from "@/components/portal/PortalShell";

const NAV = [
  { href: "/parent/dashboard", label: "My children" },
  { href: "/notices", label: "Notices" },
  { href: "/contact", label: "Contact school" },
];

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
    <PortalShell
      title="Parent portal"
      subtitle={user.displayName || user.firstName}
      nav={NAV}
    >
      <h1 className="mb-2 text-2xl font-bold text-[var(--color-navy)]">My children</h1>
      <p className="mb-6 text-sm text-[var(--color-muted-text)]">
        Only verified linked students are shown. Ask the office if a child is missing.
      </p>

      {children.length === 0 ? (
        <div className="card-surface p-6 text-sm text-slate-500">
          No linked children yet. Contact the school office to link your ward's profile to this account.
        </div>
      ) : (
        <div className="space-y-4">
          {children.map((child) => {
            const enr = child.enrollments[0];
            return (
              <div key={child.id} className="card-surface p-5">
                <div className="mb-1 text-base font-semibold text-slate-900">
                  {child.firstName} {child.lastName}
                </div>
                <div className="text-xs text-slate-500">
                  {enr ? `${enr.class.name}${enr.section ? `-${enr.section.name}` : ""} · ` : ""}
                  {child.admissionNumber}
                </div>
                {child.reportCards.length > 0 && (
                  <div className="mt-4 border-t border-slate-100 pt-3">
                    <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Recent results
                    </div>
                    <ul className="space-y-2">
                      {child.reportCards.map((rc) => (
                        <li key={rc.id} className="flex items-center justify-between text-sm">
                          <span className="text-slate-700">{rc.exam.name}</span>
                          <span className="flex items-center gap-2">
                            <span className="text-slate-500">
                              {rc.percentage != null ? `${rc.percentage.toFixed(1)}%` : "—"}
                            </span>
                            <Link
                              href={`/parent/results/${rc.id}`}
                              className="font-semibold text-[var(--color-blue)] hover:underline"
                            >
                              View
                            </Link>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </PortalShell>
  );
}
