import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession, ADMIN_ROLES } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function ReportsPage() {
  const user = await getSession();
  if (!user || !ADMIN_ROLES.includes(user.role)) redirect("/login");
  const [students, staff, invoices, published, books] = await Promise.all([
    prisma.student.count({ where: { isActive: true } }),
    prisma.staff.count({ where: { isActive: true } }),
    prisma.feeInvoice.aggregate({ _sum: { totalAmount: true, paidAmount: true } }),
    prisma.reportCard.count({ where: { isCurrent: true } }),
    prisma.libraryBook.count({ where: { isActive: true } }),
  ]);
  const billed = invoices._sum.totalAmount || 0;
  const paid = invoices._sum.paidAmount || 0;
  const rows = [
    ["Active students", String(students)],
    ["Active staff", String(staff)],
    ["Current report cards", String(published)],
    ["Library titles", String(books)],
    ["Fees billed", `₹${Math.round(billed)}`],
    ["Fees collected", `₹${Math.round(paid)}`],
    ["Fees outstanding", `₹${Math.round(billed - paid)}`],
  ];
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white px-4 py-3"><Link href="/admin/dashboard" className="text-sm font-semibold text-[var(--color-navy)]">← Admin</Link></header>
      <main className="mx-auto max-w-xl px-4 py-8">
        <h1 className="mb-4 text-xl font-bold">Reports</h1>
        <ul className="divide-y rounded-xl border bg-white text-sm">
          {rows.map(([k, v]) => <li key={k} className="flex justify-between px-4 py-3"><span>{k}</span><span className="font-semibold">{v}</span></li>)}
        </ul>
      </main>
    </div>
  );
}
