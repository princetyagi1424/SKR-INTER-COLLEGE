"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type AppRow = {
  id: string;
  applicationNo: string;
  studentName: string;
  fatherName: string | null;
  phone: string;
  applyingClass: string | null;
  status: string;
  createdAt: string;
};

const STATUSES = ["SUBMITTED", "IN_REVIEW", "INFO_REQUESTED", "APPROVED", "REJECTED"];

export default function AdmissionsAdminPage() {
  const [rows, setRows] = useState<AppRow[]>([]);
  const [error, setError] = useState("");

  async function load() {
    const res = await fetch("/api/admissions");
    const data = await res.json();
    if (!res.ok) setError(data.error || "Failed");
    else setRows(data.applications || []);
  }
  useEffect(() => { load(); }, []);

  async function setStatus(id: string, status: string) {
    const res = await fetch("/api/admissions", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Update failed");
      return;
    }
    load();
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white px-4 py-3">
        <Link href="/admin/dashboard" className="text-sm font-semibold text-[var(--color-navy)]">← Admin</Link>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="mb-4 text-xl font-bold">Admission enquiries</h1>
        {error && <p className="mb-3 text-sm text-red-700">{error}</p>}
        <div className="overflow-x-auto rounded-xl border bg-white">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase text-slate-500">
              <tr>
                <th className="px-3 py-2">Ref</th>
                <th className="px-3 py-2">Student</th>
                <th className="px-3 py-2">Phone</th>
                <th className="px-3 py-2">Class</th>
                <th className="px-3 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t">
                  <td className="px-3 py-2 font-mono text-xs">{r.applicationNo}</td>
                  <td className="px-3 py-2">{r.studentName}<div className="text-xs text-slate-400">{r.fatherName}</div></td>
                  <td className="px-3 py-2">{r.phone}</td>
                  <td className="px-3 py-2">{r.applyingClass || "—"}</td>
                  <td className="px-3 py-2">
                    <select value={r.status} onChange={(e) => setStatus(r.id, e.target.value)} className="rounded border px-2 py-1 text-xs">
                      {STATUSES.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && <tr><td className="px-3 py-6 text-slate-500" colSpan={5}>No enquiries yet.</td></tr>}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
