"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Cls = { id: string; name: string };
type Enr = { studentId: string; rollNumber: string | null; sectionId: string | null; section: { id: string } | null; student: { firstName: string; lastName: string | null } };

export default function AttendancePage() {
  const [classes, setClasses] = useState<Cls[]>([]);
  const [classId, setClassId] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [rows, setRows] = useState<Enr[]>([]);
  const [status, setStatus] = useState<Record<string, string>>({});
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    fetch("/api/attendance").then((r) => r.json()).then((d) => {
      setClasses(d.classes || []);
      if (d.classes?.[0]) setClassId(d.classes[0].id);
    });
  }, []);

  async function load() {
    if (!classId) return;
    const res = await fetch(`/api/attendance?classId=${classId}&date=${date}`);
    const data = await res.json();
    if (!res.ok) { setErr(data.error || "Failed"); return; }
    setRows(data.enrollments || []);
    const map: Record<string, string> = {};
    for (const e of data.enrollments || []) map[e.studentId] = "PRESENT";
    for (const ex of data.existing || []) map[ex.studentId] = ex.status;
    setStatus(map);
  }

  async function save() {
    const records = rows.map((r) => ({
      studentId: r.studentId,
      sectionId: r.sectionId || r.section?.id,
      status: status[r.studentId] || "PRESENT",
    }));
    const res = await fetch("/api/attendance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date, records }),
    });
    const data = await res.json();
    if (!res.ok) setErr(data.error || "Save failed");
    else setMsg(`Saved ${data.saved}`);
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white px-4 py-3">
        <Link href="/admin/dashboard" className="text-sm font-semibold text-[var(--color-navy)]">← Admin</Link>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="mb-4 text-xl font-bold">Attendance</h1>
        {err && <p className="mb-2 text-sm text-red-700">{err}</p>}
        {msg && <p className="mb-2 text-sm text-green-700">{msg}</p>}
        <div className="mb-4 flex flex-wrap gap-2">
          <select value={classId} onChange={(e) => setClassId(e.target.value)} className="rounded border px-3 py-2 text-sm">
            {classes.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="rounded border px-3 py-2 text-sm" />
          <button onClick={load} className="rounded border px-3 py-2 text-sm">Load</button>
          <button onClick={save} className="rounded bg-[var(--color-navy)] px-3 py-2 text-sm font-semibold text-white">Save</button>
        </div>
        <ul className="divide-y rounded-xl border bg-white">
          {rows.map((r) => (
            <li key={r.studentId} className="flex items-center justify-between px-4 py-2 text-sm">
              <span>{r.rollNumber || "—"} · {r.student.firstName} {r.student.lastName}</span>
              <select value={status[r.studentId] || "PRESENT"} onChange={(e) => setStatus((s) => ({ ...s, [r.studentId]: e.target.value }))} className="rounded border px-2 py-1 text-xs">
                {["PRESENT", "ABSENT", "LATE", "LEAVE", "HALF_DAY"].map((s) => <option key={s}>{s}</option>)}
              </select>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
