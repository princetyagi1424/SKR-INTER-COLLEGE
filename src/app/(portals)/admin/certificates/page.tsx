"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

type Row = { id: string; serialNumber: string; type: string; title: string; status: string; student?: { firstName: string; admissionNumber: string } };

export default function CertificatesAdmin() {
  const [rows, setRows] = useState<Row[]>([]);
  const [adm, setAdm] = useState("");
  const [type, setType] = useState("BONAFIDE");
  const [purpose, setPurpose] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  async function load() {
    const res = await fetch("/api/certificates");
    const d = await res.json();
    if (!res.ok) setErr(d.error || "Failed"); else setRows(d.certificates || []);
  }
  useEffect(() => { load(); }, []);

  async function issue(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/certificates", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "issue", admissionNumber: adm, type, purpose, title: type }) });
    const d = await res.json();
    if (!res.ok) setErr(d.error || "Failed"); else { setMsg("Issued " + d.certificate.serialNumber); load(); }
  }
  async function approve(id: string) {
    const res = await fetch("/api/certificates", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "approve", id }) });
    const d = await res.json();
    if (!res.ok) setErr(d.error || "Failed"); else { setMsg("Approved"); load(); }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white px-4 py-3"><Link href="/admin/dashboard" className="text-sm font-semibold text-[var(--color-navy)]">← Admin</Link></header>
      <main className="mx-auto max-w-4xl px-4 py-8">
        <h1 className="mb-2 text-xl font-bold">Certificates</h1>
        <p className="mb-4 text-xs text-slate-500">Issuing a transfer certificate records the document. It does not delete the student or past marks.</p>
        {err && <p className="text-sm text-red-700">{err}</p>}
        {msg && <p className="text-sm text-green-700">{msg}</p>}
        <form onSubmit={issue} className="mb-6 grid gap-2 rounded-xl border bg-white p-4 sm:grid-cols-4">
          <input required value={adm} onChange={(e) => setAdm(e.target.value)} placeholder="Admission no" className="rounded border px-3 py-2 text-sm" />
          <select value={type} onChange={(e) => setType(e.target.value)} className="rounded border px-3 py-2 text-sm">
            {["BONAFIDE", "CHARACTER", "STUDY", "TRANSFER_CERTIFICATE", "OTHER"].map((t) => <option key={t}>{t}</option>)}
          </select>
          <input value={purpose} onChange={(e) => setPurpose(e.target.value)} placeholder="Purpose" className="rounded border px-3 py-2 text-sm" />
          <button className="rounded bg-[var(--color-navy)] px-3 py-2 text-sm font-semibold text-white">Issue</button>
        </form>
        <ul className="divide-y rounded-xl border bg-white text-sm">
          {rows.map((r) => (
            <li key={r.id} className="flex items-center justify-between px-4 py-2">
              <span>{r.serialNumber} · {r.type} · {r.student?.admissionNumber} {r.student?.firstName} · {r.status}</span>
              {r.status === "REQUESTED" && <button onClick={() => approve(r.id)} className="text-xs font-semibold underline">Approve</button>}
            </li>
          ))}
          {rows.length === 0 && <li className="p-4 text-slate-500">None yet.</li>}
        </ul>
      </main>
    </div>
  );
}
