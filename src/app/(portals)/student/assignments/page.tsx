"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

type A = { id: string; title: string; description: string | null; dueDate: string | null };

export default function StudentAssignments() {
  const [rows, setRows] = useState<A[]>([]);
  useEffect(() => { fetch("/api/assignments").then((r) => r.json()).then((d) => setRows(d.assignments || [])); }, []);
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white px-4 py-3"><Link href="/student/dashboard" className="text-sm font-semibold text-[var(--color-navy)]">← Dashboard</Link></header>
      <main className="mx-auto max-w-xl px-4 py-8">
        <h1 className="mb-4 text-xl font-bold">Homework</h1>
        <ul className="space-y-3">
          {rows.map((a) => (
            <li key={a.id} className="rounded-xl border bg-white p-4 text-sm">
              <div className="font-semibold">{a.title}</div>
              <p className="text-slate-600">{a.description}</p>
              <p className="text-xs text-slate-400">{a.dueDate ? new Date(a.dueDate).toLocaleDateString("en-IN") : "No due date"}</p>
            </li>
          ))}
          {rows.length === 0 && <li className="text-sm text-slate-500">No published homework.</li>}
        </ul>
      </main>
    </div>
  );
}
