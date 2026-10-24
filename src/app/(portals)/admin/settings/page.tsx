"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function SettingsPage() {
  const [form, setForm] = useState({ phone: "", email: "", workingHours: "", address: "", vision: "", mission: "", principalMessage: "" });
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  useEffect(() => {
    fetch("/api/settings").then((r) => r.json()).then((d) => { if (d.setting) setForm((f) => ({ ...f, ...d.setting })); });
  }, []);
  function set(k: string, v: string) { setForm((f) => ({ ...f, [k]: v })); }
  async function save(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/settings", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    const d = await res.json();
    if (!res.ok) setErr(d.error || "Failed"); else setMsg("Saved");
  }
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white px-4 py-3"><Link href="/admin/dashboard" className="text-sm font-semibold text-[var(--color-navy)]">← Admin</Link></header>
      <main className="mx-auto max-w-xl px-4 py-8">
        <h1 className="mb-4 text-xl font-bold">School settings</h1>
        {err && <p className="text-sm text-red-700">{err}</p>}
        {msg && <p className="text-sm text-green-700">{msg}</p>}
        <form onSubmit={save} className="space-y-3 rounded-xl border bg-white p-4">
          {(["phone", "email", "workingHours", "address", "vision", "mission", "principalMessage"] as const).map((k) => (
            k === "address" || k === "vision" || k === "mission" || k === "principalMessage"
              ? <textarea key={k} value={form[k] || ""} onChange={(e) => set(k, e.target.value)} placeholder={k} rows={3} className="w-full rounded border px-3 py-2 text-sm" />
              : <input key={k} value={form[k] || ""} onChange={(e) => set(k, e.target.value)} placeholder={k} className="w-full rounded border px-3 py-2 text-sm" />
          ))}
          <button className="rounded bg-[var(--color-navy)] px-4 py-2 text-sm font-semibold text-white">Save</button>
        </form>
      </main>
    </div>
  );
}
