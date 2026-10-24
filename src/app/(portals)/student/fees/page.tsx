"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

type Inv = { id: string; invoiceNumber: string; description: string | null; totalAmount: number; paidAmount: number; status: string };

export default function StudentFees() {
  const [rows, setRows] = useState<Inv[]>([]);
  const [err, setErr] = useState("");
  useEffect(() => {
    fetch("/api/fees").then(async (r) => {
      const d = await r.json();
      if (!r.ok) setErr(d.error || "Failed"); else setRows(d.invoices || []);
    });
  }, []);
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white px-4 py-3"><Link href="/student/dashboard" className="text-sm font-semibold text-[var(--color-navy)]">← Dashboard</Link></header>
      <main className="mx-auto max-w-xl px-4 py-8">
        <h1 className="mb-4 text-xl font-bold">My fees</h1>
        {err && <p className="text-sm text-red-700">{err}</p>}
        <ul className="divide-y rounded-xl border bg-white text-sm">
          {rows.map((i) => <li key={i.id} className="px-4 py-3"><div className="font-medium">{i.invoiceNumber}</div><div className="text-slate-500">{i.description} · paid ₹{i.paidAmount} / ₹{i.totalAmount} · {i.status}</div></li>)}
          {rows.length === 0 && <li className="p-4 text-slate-500">No invoices.</li>}
        </ul>
      </main>
    </div>
  );
}
