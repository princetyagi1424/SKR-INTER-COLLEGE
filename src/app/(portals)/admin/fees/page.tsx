"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Invoice = {
  id: string;
  invoiceNumber: string;
  description: string | null;
  totalAmount: number;
  paidAmount: number;
  status: string;
  student?: { firstName: string; lastName: string | null; admissionNumber: string };
};

export default function FeesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [adm, setAdm] = useState("");
  const [amount, setAmount] = useState("");
  const [desc, setDesc] = useState("Tuition fee");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  async function load() {
    const res = await fetch("/api/fees");
    const data = await res.json();
    if (!res.ok) setErr(data.error || "Failed");
    else setInvoices(data.invoices || []);
  }
  useEffect(() => { load(); }, []);

  async function createInvoice(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    const res = await fetch("/api/fees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "invoice", admissionNumber: adm, amount: Number(amount), description: desc }),
    });
    const data = await res.json();
    if (!res.ok) setErr(data.error || "Failed");
    else { setMsg("Invoice " + data.invoice.invoiceNumber); setAmount(""); load(); }
  }

  async function pay(id: string, due: number) {
    const ref = prompt("Optional transaction reference (leave blank for cash). Duplicate refs are rejected.");
    const res = await fetch("/api/fees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "payment", invoiceId: id, amount: due, method: "CASH", transactionRef: ref || null }),
    });
    const data = await res.json();
    if (!res.ok) setErr(data.error || "Payment failed");
    else { setMsg("Receipt " + data.payment.receiptNumber); load(); }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white px-4 py-3">
        <Link href="/admin/dashboard" className="text-sm font-semibold text-[var(--color-navy)]">← Admin</Link>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="mb-4 text-xl font-bold">Fees</h1>
        {err && <p className="mb-3 text-sm text-red-700">{err}</p>}
        {msg && <p className="mb-3 text-sm text-green-700">{msg}</p>}
        <form onSubmit={createInvoice} className="mb-6 grid gap-2 rounded-xl border bg-white p-4 sm:grid-cols-4">
          <input required value={adm} onChange={(e) => setAdm(e.target.value)} placeholder="Admission no" className="rounded border px-3 py-2 text-sm" />
          <input required value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" type="number" min="1" className="rounded border px-3 py-2 text-sm" />
          <input value={desc} onChange={(e) => setDesc(e.target.value)} className="rounded border px-3 py-2 text-sm" />
          <button className="rounded bg-[var(--color-navy)] px-3 py-2 text-sm font-semibold text-white">Create invoice</button>
        </form>
        <ul className="divide-y rounded-xl border bg-white">
          {invoices.map((inv) => {
            const due = Math.max(0, inv.totalAmount - inv.paidAmount);
            return (
              <li key={inv.id} className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 text-sm">
                <div>
                  <div className="font-medium">{inv.invoiceNumber}</div>
                  <div className="text-xs text-slate-500">
                    {inv.student ? `${inv.student.firstName} ${inv.student.lastName || ""} · ${inv.student.admissionNumber}` : ""} · {inv.description}
                  </div>
                </div>
                <div className="text-right">
                  <div>₹{inv.paidAmount} / ₹{inv.totalAmount} · {inv.status}</div>
                  {due > 0 && (
                    <button onClick={() => pay(inv.id, due)} className="mt-1 text-xs font-semibold text-[var(--color-navy)] underline">Record cash ₹{due}</button>
                  )}
                </div>
              </li>
            );
          })}
          {invoices.length === 0 && <li className="p-4 text-sm text-slate-500">No invoices.</li>}
        </ul>
        <p className="mt-4 text-xs text-slate-500">Online gateway is not connected. Cash and bank entries are recorded by authorised staff only. Card numbers are never stored.</p>
      </main>
    </div>
  );
}
