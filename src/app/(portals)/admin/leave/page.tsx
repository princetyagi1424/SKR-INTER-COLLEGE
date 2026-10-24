"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

type Row = { id: string; fromDate: string; toDate: string; reason: string | null; status: string; staff?: { firstName: string; employeeId: string } };

export default function LeaveAdmin() {
  const [rows, setRows] = useState<Row[]>([]);
  const [err, setErr] = useState("");
  async function load() {
    const res = await fetch("/api/leave");
    const d = await res.json();
    if (!res.ok) setErr(d.error || "Failed"); else setRows(d.rows || []);
  }
  useEffect(() => { load(); }, []);
  async function decide(id: string, status: string) {
    await fetch("/api/leave", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "decide", id, status }) });
    load();
  }
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white px-4 py-3"><Link href="/admin/dashboard" className="text-sm font-semibold text-[var(--color-navy)]">← Admin</Link></header>
      <main className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="mb-4 text-xl font-bold">Staff leave</h1>
        {err && <p className="text-sm text-red-700">{err}</p>}
        <ul className="divide-y rounded-xl border bg-white text-sm">
          {rows.map((r) => (
            <li key={r.id} className="flex flex-wrap items-center justify-between gap-2 px-4 py-3">
              <span>{r.staff?.firstName} ({r.staff?.employeeId}) · {new Date(r.fromDate).toLocaleDateString("en-IN")} – {new Date(r.toDate).toLocaleDateString("en-IN")} · {r.reason || ""} · {r.status}</span>
              {r.status === "PENDING" && (
                <span className="flex gap-2">
                  <button onClick={() => decide(r.id, "APPROVED")} className="text-xs font-semibold text-green-700">Approve</button>
                  <button onClick={() => decide(r.id, "REJECTED")} className="text-xs font-semibold text-red-700">Reject</button>
                </span>
              )}
            </li>
          ))}
          {rows.length === 0 && <li className="p-4 text-slate-500">No leave requests.</li>}
        </ul>
      </main>
    </div>
  );
}
