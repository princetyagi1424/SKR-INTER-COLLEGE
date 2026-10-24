"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

type Subject = { id: string; subjectId: string; maxTheory: number; maxPractical: number; subject: { name: string } };
type Enr = { studentId: string; rollNumber: string | null; section: { id: string; name: string } | null; student: { firstName: string; lastName: string | null; admissionNumber: string } };
type Mark = { studentId: string; subjectId: string; theoryMarks: number | null; practicalMarks: number | null; isAbsent: boolean };

export default function MarksPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const [examName, setExamName] = useState("");
  const [status, setStatus] = useState("");
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [enrollments, setEnrollments] = useState<Enr[]>([]);
  const [grid, setGrid] = useState<Record<string, { theory: string; practical: string; absent: boolean }>>({});
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  function key(studentId: string, subjectId: string) {
    return studentId + ":" + subjectId;
  }

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/exams/${id}/marks`);
      const data = await res.json();
      if (!res.ok) {
        setErr(data.error || "Load failed");
        return;
      }
      setExamName(data.exam.name);
      setStatus(data.exam.status);
      setSubjects(data.exam.examSubjects);
      setEnrollments(data.enrollments);
      const next: Record<string, { theory: string; practical: string; absent: boolean }> = {};
      for (const m of data.marks as Mark[]) {
        next[key(m.studentId, m.subjectId)] = {
          theory: m.theoryMarks == null ? "" : String(m.theoryMarks),
          practical: m.practicalMarks == null ? "" : String(m.practicalMarks),
          absent: m.isAbsent,
        };
      }
      setGrid(next);
    })();
  }, [id]);

  function cell(studentId: string, subjectId: string) {
    return grid[key(studentId, subjectId)] || { theory: "", practical: "", absent: false };
  }
  function setCell(studentId: string, subjectId: string, patch: Partial<{ theory: string; practical: string; absent: boolean }>) {
    const k = key(studentId, subjectId);
    setGrid((g) => ({ ...g, [k]: { ...cell(studentId, subjectId), ...patch } }));
  }

  async function save() {
    setBusy(true);
    setErr("");
    setMsg("");
    const marks = [];
    for (const en of enrollments) {
      for (const s of subjects) {
        const c = cell(en.studentId, s.subjectId);
        marks.push({
          studentId: en.studentId,
          subjectId: s.subjectId,
          theoryMarks: c.theory === "" ? null : Number(c.theory),
          practicalMarks: c.practical === "" ? null : Number(c.practical),
          isAbsent: c.absent,
        });
      }
    }
    const res = await fetch(`/api/exams/${id}/marks`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ marks }),
    });
    const data = await res.json();
    setBusy(false);
    if (!res.ok) setErr(data.error || "Save failed");
    else setMsg(`Saved ${data.saved} cells${data.errors?.length ? " · " + data.errors[0] : ""}`);
  }

  async function submit() {
    setBusy(true);
    const res = await fetch(`/api/exams/${id}/submit`, { method: "POST" });
    const data = await res.json();
    setBusy(false);
    if (!res.ok) setErr(data.error || "Submit failed");
    else { setMsg("Submitted for review"); setStatus("UNDER_REVIEW"); }
  }

  async function publish() {
    if (!confirm("Publish results? Students and parents will see report cards.")) return;
    setBusy(true);
    const res = await fetch(`/api/exams/${id}/publish`, { method: "POST" });
    const data = await res.json();
    setBusy(false);
    if (!res.ok) setErr(data.error || "Publish failed");
    else { setMsg(`Published ${data.reportCards} report cards`); setStatus("PUBLISHED"); }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link href="/admin/exams" className="text-sm text-[var(--color-navy)]">← Exams</Link>
          <div className="text-sm font-semibold">{examName || "Marks"} · {status}</div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6">
        {err && <p className="mb-3 rounded bg-red-50 px-3 py-2 text-sm text-red-700">{err}</p>}
        {msg && <p className="mb-3 rounded bg-green-50 px-3 py-2 text-sm text-green-800">{msg}</p>}
        <p className="mb-3 text-xs text-slate-500">Leave a cell blank if marks are not entered. Blank is not zero. Tick AB for absent.</p>
        <div className="overflow-x-auto rounded-xl border bg-white">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase text-slate-500">
              <tr>
                <th className="px-3 py-2">Roll</th>
                <th className="px-3 py-2">Student</th>
                {subjects.map((s) => (
                  <th key={s.id} className="px-3 py-2">{s.subject.name}<div className="font-normal normal-case">T/{s.maxTheory}{s.maxPractical ? ` P/${s.maxPractical}` : ""}</div></th>
                ))}
              </tr>
            </thead>
            <tbody>
              {enrollments.map((en) => (
                <tr key={en.studentId} className="border-t">
                  <td className="px-3 py-2">{en.rollNumber || "—"}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{en.student.firstName} {en.student.lastName}<div className="text-xs text-slate-400">{en.student.admissionNumber}</div></td>
                  {subjects.map((s) => {
                    const c = cell(en.studentId, s.subjectId);
                    return (
                      <td key={s.id} className="px-2 py-2">
                        <div className="flex gap-1">
                          <input disabled={c.absent || status === "PUBLISHED"} value={c.theory} onChange={(e) => setCell(en.studentId, s.subjectId, { theory: e.target.value })} className="w-16 rounded border px-1 py-1" placeholder="Th" />
                          {s.maxPractical > 0 && (
                            <input disabled={c.absent || status === "PUBLISHED"} value={c.practical} onChange={(e) => setCell(en.studentId, s.subjectId, { practical: e.target.value })} className="w-16 rounded border px-1 py-1" placeholder="Pr" />
                          )}
                          <label className="flex items-center gap-1 text-xs">
                            <input type="checkbox" checked={c.absent} disabled={status === "PUBLISHED"} onChange={(e) => setCell(en.studentId, s.subjectId, { absent: e.target.checked })} />
                            AB
                          </label>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <button onClick={save} disabled={busy || status === "PUBLISHED"} className="rounded bg-[var(--color-navy)] px-4 py-2 text-sm font-semibold text-white disabled:opacity-50">Save draft</button>
          <button onClick={submit} disabled={busy || status === "PUBLISHED"} className="rounded border px-4 py-2 text-sm font-semibold">Submit for review</button>
          <button onClick={publish} disabled={busy || status === "PUBLISHED"} className="rounded bg-emerald-700 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50">Approve & publish</button>
        </div>
      </main>
    </div>
  );
}
