import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";
import { PortalShell } from "@/components/portal/PortalShell";

const NAV = [
  { href: "/parent/dashboard", labelKey: "overview" as const },
  { href: "/notices", labelKey: "notices" as const },
];

export default async function ParentDashboard() {
  const user = await getSession();
  if (!user || user.role !== Role.PARENT) redirect("/login");

  const parent = await prisma.parent.findFirst({
    where: { userId: user.id },
    include: {
      children: {
        include: {
          student: true,
        },
      },
    },
  });

  return (
    <PortalShell title="Parent Portal" subtitle={user.displayName || user.firstName} nav={NAV}>
      <h1 className="mb-2 text-xl font-bold text-slate-900">Overview</h1>
      <p className="mb-6 text-sm text-slate-500">Linked students and school notices.</p>
      <div className="space-y-3">
        {(parent?.children || []).map((link) => (
          <div key={link.id} className="card-surface p-4 text-sm">
            <div className="font-semibold text-slate-900">
              {link.student?.firstName} {link.student?.lastName}
            </div>
            <div className="text-xs text-slate-500">{link.student?.admissionNumber}</div>
          </div>
        ))}
        {!parent?.children?.length && (
          <p className="text-sm text-slate-500">No linked student profiles.</p>
        )}
      </div>
    </PortalShell>
  );
}
