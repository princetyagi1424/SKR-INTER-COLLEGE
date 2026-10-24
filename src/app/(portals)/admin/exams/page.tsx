"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type ExamRow = {
  id: string;
  name: string;
  examType: string;
  status: string;
  class: { name: string };
  _count?: { marks: number; reportCards: number };
};
type ClassRow = { id: string; name: string; subjects: { id: string }[] };

export default function AdminExamsPage() {
  const [exams, setExams] = useState<ExamRow[]>([]);
  const [classes, setClasses] = useState<ClassRow[]>([]);
  const [error, setError] = useState("");
  const [name, setName] = useState("Unit Test");
  const [classId, setClassId] = useState("");
  const [examType, setExamType] = useState("UNIT");
  const [busy, setBusy] = useState(false);

  async function load() {
    const res = await fetch("/api/exams");
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Could not load exams");
      return;
    }
    setExams(data.exams || []);
    setClasses(data.classes || []);
    if (!classId && data.classes?.[0]) setClassId(data.classes[0].id);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function createExam(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const res = await fetch("/api/exams", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, classId, examType, passingPercentage: 33 }),
    });
    const data = await res.json();
    setBusy(false);
    if (!res.ok) {
      setError(data.error || "Create failed");
      return;
    }
    window.location.href = `/admin/exams/${data.exam.id}`;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <Link href="/admin/dashboard" className="text-sm font-semibold text-[var(--color-navy)]">← Admin</Link>
          <div className="text-sm font-semibold">Examinations</div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8">
        {error && <p className="mb-4 rounded bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
        <form onSubmit={createExam} className="mb-8 grid gap-3 rounded-xl border bg-white p-4 sm:grid-cols-4">
          <input className="rounded border px-3 py-2 text-sm" value={name} onChange={(e) => setName(e.target.value)} placeholder="Exam name" required />
          <select className="rounded border px-3 py-2 text-sm" value={classId} onChange={(e) => setClassId(e.target.value)}>
            {classes.map((c) => (
              <option key={c.id} value={c.id}>{c.name} ({c.subjects.length} subjects)</option>
            ))}
          </select>
          <select className="rounded border px-3 py-2 text-sm" value={examType} onChange={(e) => setExamType(e.target.value)}>
            <option value="UNIT">Unit test</option>
            <option value="HALF">Half yearly</option>
            <option value="ANNUAL">Annual</option>
          </select>
          <button disabled={busy} className="rounded bg-[var(--color-navy)] px-3 py-2 text-sm font-semibold text-white disabled:opacity-60">
            {busy ? "Creating…" : "Create exam"}
          </button>
        </form>
        <ul className="divide-y rounded-xl border bg-white">
          {exams.length === 0 && <li className="p-4 text-sm text-slate-500">No exams yet.</li>}
          {exams.map((ex) => (
            <li key={ex.id} className="flex items-center justify-between px-4 py-3">
              <div>
                <div className="text-sm font-medium">{ex.name}</div>
                <div className="text-xs text-slate-500">{ex.class?.name} · {ex.examType} · {ex.status}</div>
              </div>
              <Link href={`/admin/exams/${ex.id}`} className="text-sm font-medium text-[var(--color-navy)]">Open</Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
