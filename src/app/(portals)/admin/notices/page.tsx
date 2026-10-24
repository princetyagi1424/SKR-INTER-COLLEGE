"use client";

import { useState } from "react";
import Link from "next/link";

export default function AdminNoticesPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [audience, setAudience] = useState("PUBLIC");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  async function publish(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    const res = await fetch("/api/notices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, audience, priority: "NORMAL" }),
    });
    const data = await res.json();
    if (!res.ok) setErr(data.error || "Failed");
    else {
      setMsg("Notice published");
      setTitle("");
      setContent("");
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white px-4 py-3">
        <Link href="/admin/dashboard" className="text-sm font-semibold text-[var(--color-navy)]">← Admin</Link>
      </header>
      <main className="mx-auto max-w-xl px-4 py-8">
        <h1 className="mb-4 text-xl font-bold">Publish notice</h1>
        {err && <p className="mb-3 text-sm text-red-700">{err}</p>}
        {msg && <p className="mb-3 text-sm text-green-700">{msg} · <Link href="/notices" className="underline">View public list</Link></p>}
        <form onSubmit={publish} className="space-y-3 rounded-xl border bg-white p-4">
          <input required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="w-full rounded border px-3 py-2 text-sm" />
          <textarea required value={content} onChange={(e) => setContent(e.target.value)} rows={5} placeholder="Notice text" className="w-full rounded border px-3 py-2 text-sm" />
          <select value={audience} onChange={(e) => setAudience(e.target.value)} className="w-full rounded border px-3 py-2 text-sm">
            <option value="PUBLIC">Public</option>
            <option value="STUDENTS">Students</option>
            <option value="PARENTS">Parents</option>
            <option value="TEACHERS">Teachers</option>
            <option value="ALL">All</option>
          </select>
          <button className="rounded bg-[var(--color-navy)] px-4 py-2 text-sm font-semibold text-white">Publish</button>
        </form>
      </main>
    </div>
  );
}
