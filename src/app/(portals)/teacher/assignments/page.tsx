"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function TeacherAssignments() {
  const [classes, setClasses] = useState<{ id: string; name: string }[]>([]);
  const [rows, setRows] = useState<{ id: string; title: string; class?: { name: string } }[]>([]);
  const [title, setTitle] = useState("");
  const [classId, setClassId] = useState("");
  const [description, setDescription] = useState("");
  const [msg, setMsg] = useState("");

  async function load() {
    const res = await fetch("/api/assignments");
    const d = await res.json();
    setRows(d.assignments || []);
    setClasses(d.classes || []);
    if (!classId && d.classes?.[0]) setClassId(d.classes[0].id);
  }
  useEffect(() => { load(); }, []);

  async function create(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/assignments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, classId, description }),
    });
    const d = await res.json();
    if (!res.ok) setMsg(d.error || "Failed");
    else { setMsg("Published"); setTitle(""); load(); }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white px-4 py-3"><Link href="/teacher/dashboard" className="text-sm font-semibold text-[var(--color-navy)]">← Teacher</Link></header>
      <main className="mx-auto max-w-xl px-4 py-8">
        <h1 className="mb-4 text-xl font-bold">Assignments</h1>
        {msg && <p className="mb-2 text-sm">{msg}</p>}
        <form onSubmit={create} className="mb-4 space-y-2 rounded-xl border bg-white p-4">
          <input required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="w-full rounded border px-3 py-2 text-sm" />
          <select value={classId} onChange={(e) => setClassId(e.target.value)} className="w-full rounded border px-3 py-2 text-sm">
            {classes.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full rounded border px-3 py-2 text-sm" rows={3} placeholder="Instructions" />
          <button className="rounded bg-[var(--color-navy)] px-3 py-2 text-sm font-semibold text-white">Publish</button>
        </form>
        <ul className="divide-y rounded-xl border bg-white text-sm">
          {rows.map((r) => <li key={r.id} className="px-4 py-2">{r.title} · {r.class?.name}</li>)}
        </ul>
      </main>
    </div>
  );
}
