"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function StudentAttendance() {
  const [rows, setRows] = useState<{ id: string; date: string; status: string }[]>([]);
  const [err, setErr] = useState("");
  useEffect(() => {
    fetch("/api/attendance").then(async (r) => {
      const d = await r.json();
      if (!r.ok) setErr(d.error || "Failed");
      else setRows(d.rows || []);
    });
  }, []);
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white px-4 py-3"><Link href="/student/dashboard" className="text-sm font-semibold text-[var(--color-navy)]">← Dashboard</Link></header>
      <main className="mx-auto max-w-xl px-4 py-8">
        <h1 className="mb-4 text-xl font-bold">Attendance</h1>
        {err && <p className="text-sm text-red-700">{err}</p>}
        <ul className="divide-y rounded-xl border bg-white text-sm">
          {rows.map((r) => <li key={r.id} className="flex justify-between px-4 py-2"><span>{new Date(r.date).toLocaleDateString("en-IN")}</span><span>{r.status}</span></li>)}
          {rows.length === 0 && <li className="p-4 text-slate-500">No attendance recorded yet.</li>}
        </ul>
      </main>
    </div>
  );
}
