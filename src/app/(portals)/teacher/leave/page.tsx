"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function TeacherLeave() {
  const [rows, setRows] = useState<{ id: string; fromDate: string; toDate: string; status: string; reason: string | null }[]>([]);
  const [fromDate, setFrom] = useState("");
  const [toDate, setTo] = useState("");
  const [reason, setReason] = useState("");
  const [msg, setMsg] = useState("");
  async function load() {
    const d = await (await fetch("/api/leave")).json();
    setRows(d.rows || []);
  }
  useEffect(() => { load(); }, []);
  async function send(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/leave", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ fromDate, toDate, reason }) });
    const d = await res.json();
    setMsg(res.ok ? "Submitted" : d.error);
    load();
  }
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white px-4 py-3"><Link href="/teacher/dashboard" className="text-sm font-semibold text-[var(--color-navy)]">← Teacher</Link></header>
      <main className="mx-auto max-w-xl px-4 py-8">
        <h1 className="mb-4 text-xl font-bold">Leave</h1>
        {msg && <p className="mb-2 text-sm">{msg}</p>}
        <form onSubmit={send} className="mb-4 space-y-2 rounded-xl border bg-white p-4">
          <input required type="date" value={fromDate} onChange={(e) => setFrom(e.target.value)} className="w-full rounded border px-3 py-2 text-sm" />
          <input required type="date" value={toDate} onChange={(e) => setTo(e.target.value)} className="w-full rounded border px-3 py-2 text-sm" />
          <input value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Reason" className="w-full rounded border px-3 py-2 text-sm" />
          <button className="rounded bg-[var(--color-navy)] px-3 py-2 text-sm font-semibold text-white">Submit</button>
        </form>
        <ul className="divide-y rounded-xl border bg-white text-sm">
          {rows.map((r) => <li key={r.id} className="px-4 py-2">{new Date(r.fromDate).toLocaleDateString("en-IN")} – {new Date(r.toDate).toLocaleDateString("en-IN")} · {r.status}</li>)}
        </ul>
      </main>
    </div>
  );
}
