"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function StudentCertificates() {
  const [rows, setRows] = useState<{ id: string; serialNumber: string; type: string; status: string }[]>([]);
  const [type, setType] = useState("BONAFIDE");
  const [note, setNote] = useState("");
  const [msg, setMsg] = useState("");
  async function load() {
    const d = await (await fetch("/api/certificates")).json();
    setRows(d.certificates || []);
  }
  useEffect(() => { load(); }, []);
  async function ask(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/certificates", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "request", type, note }) });
    const d = await res.json();
    setMsg(res.ok ? "Requested " + d.certificate.serialNumber : d.error);
    load();
  }
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white px-4 py-3"><Link href="/student/dashboard" className="text-sm font-semibold text-[var(--color-navy)]">← Dashboard</Link></header>
      <main className="mx-auto max-w-xl px-4 py-8">
        <h1 className="mb-4 text-xl font-bold">Certificates</h1>
        {msg && <p className="mb-2 text-sm">{msg}</p>}
        <form onSubmit={ask} className="mb-4 space-y-2 rounded-xl border bg-white p-4">
          <select value={type} onChange={(e) => setType(e.target.value)} className="w-full rounded border px-3 py-2 text-sm">
            {["BONAFIDE", "CHARACTER", "STUDY"].map((t) => <option key={t}>{t}</option>)}
          </select>
          <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Purpose" className="w-full rounded border px-3 py-2 text-sm" />
          <button className="rounded bg-[var(--color-navy)] px-3 py-2 text-sm font-semibold text-white">Request</button>
        </form>
        <ul className="divide-y rounded-xl border bg-white text-sm">
          {rows.map((r) => <li key={r.id} className="px-4 py-2">{r.serialNumber} · {r.type} · {r.status}</li>)}
        </ul>
      </main>
    </div>
  );
}
