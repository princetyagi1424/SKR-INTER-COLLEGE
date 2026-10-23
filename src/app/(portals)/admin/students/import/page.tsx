"use client";

import { useState, useCallback } from "react";
import Link from "next/link";

type PreviewRow = {
  row: number;
  data: Record<string, string>;
  errors: string[];
  isDuplicate: boolean;
  isValid: boolean;
};

type PreviewResult = {
  totalRows: number;
  validRows: number;
  invalidRows: number;
  duplicates: number;
  rows: PreviewRow[];
  mapping: Record<string, string>;
  jobId: string;
};

const FIELD_OPTIONS = [
  { value: "", label: "— Skip —" },
  { value: "admissionNumber", label: "Admission Number *" },
  { value: "firstName", label: "First Name *" },
  { value: "lastName", label: "Last Name" },
  { value: "className", label: "Class *" },
  { value: "sectionName", label: "Section" },
  { value: "rollNumber", label: "Roll Number" },
  { value: "gender", label: "Gender" },
  { value: "dateOfBirth", label: "Date of Birth" },
  { value: "phone", label: "Phone" },
  { value: "email", label: "Email" },
  { value: "fatherName", label: "Father Name" },
  { value: "motherName", label: "Mother Name" },
  { value: "address", label: "Address" },
];

export default function BulkImportPage() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [file, setFile] = useState<File | null>(null);
  const [headers, setHeaders] = useState<string[]>([]);
  const [mapping, setMapping] = useState<Record<string, string>>({});
  const [preview, setPreview] = useState<PreviewResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<{ imported: number; skipped: number; failed: number } | null>(null);

  const onFile = useCallback(async (f: File) => {
    setFile(f);
    setError("");
    setLoading(true);
    try {
      const form = new FormData();
      form.append("file", f);
      form.append("action", "headers");
      const res = await fetch("/api/import/students", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to read file");
      setHeaders(data.headers || []);
      // Auto-map common headers
      const auto: Record<string, string> = {};
      for (const h of data.headers || []) {
        const lower = h.toLowerCase().replace(/[_\s]+/g, "");
        if (lower.includes("admission") || lower.includes("regno") || lower.includes("regno")) auto[h] = "admissionNumber";
        else if (lower === "firstname" || lower === "name" || lower === "studentname" || lower.includes("विद्यार्थी")) auto[h] = "firstName";
        else if (lower === "lastname" || lower === "surname") auto[h] = "lastName";
        else if (lower === "class" || lower === "grade" || lower === "className") auto[h] = "className";
        else if (lower === "section") auto[h] = "sectionName";
        else if (lower.includes("roll")) auto[h] = "rollNumber";
        else if (lower === "gender" || lower === "sex") auto[h] = "gender";
        else if (lower.includes("dob") || lower.includes("birth")) auto[h] = "dateOfBirth";
        else if (lower.includes("phone") || lower.includes("mobile") || lower.includes("contact")) auto[h] = "phone";
        else if (lower.includes("email")) auto[h] = "email";
        else if (lower.includes("father")) auto[h] = "fatherName";
        else if (lower.includes("mother")) auto[h] = "motherName";
        else if (lower.includes("address")) auto[h] = "address";
      }
      setMapping(auto);
      setStep(2);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setLoading(false);
    }
  }, []);

  async function runPreview() {
    if (!file) return;
    setLoading(true);
    setError("");
    try {
      const form = new FormData();
      form.append("file", file);
      form.append("action", "preview");
      form.append("mapping", JSON.stringify(mapping));
      const res = await fetch("/api/import/students", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Preview failed");
      setPreview(data);
      setStep(3);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Preview failed");
    } finally {
      setLoading(false);
    }
  }

  async function confirmImport(mode: "new_only" | "skip_existing") {
    if (!preview) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/import/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "confirm", jobId: preview.jobId, mode }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Import failed");
      setResult(data);
      setStep(4);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Import failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <div>
            <Link href="/admin/dashboard" className="text-xs text-slate-500 hover:underline">
              ← Dashboard
            </Link>
            <h1 className="text-lg font-bold text-[var(--color-navy)]">Bulk Import Students</h1>
          </div>
          <a
            href="/api/import/students?action=template"
            className="rounded-lg border px-3 py-1.5 text-sm font-medium hover:bg-slate-50"
          >
            Download Template
          </a>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-8">
        {/* Steps */}
        <div className="mb-8 flex gap-2 text-xs font-medium">
          {["Upload", "Map Columns", "Preview", "Done"].map((label, i) => (
            <div
              key={label}
              className={`flex-1 rounded-full py-1.5 text-center ${
                step > i + 1
                  ? "bg-green-100 text-green-700"
                  : step === i + 1
                  ? "bg-[var(--color-navy)] text-white"
                  : "bg-slate-200 text-slate-500"
              }`}
            >
              {i + 1}. {label}
            </div>
          ))}
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
        )}

        {/* Step 1 */}
        {step === 1 && (
          <div
            className="rounded-xl border-2 border-dashed border-slate-300 bg-white p-12 text-center"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const f = e.dataTransfer.files[0];
              if (f) onFile(f);
            }}
          >
            <p className="mb-2 text-lg font-medium text-slate-700">Drop Excel / CSV file here</p>
            <p className="mb-4 text-sm text-slate-500">Supports .xlsx, .xls, .csv · Max 5 MB · Max 2000 rows</p>
            <label className="inline-block cursor-pointer rounded-lg bg-[var(--color-navy)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[var(--color-navy-dark)]">
              {loading ? "Reading…" : "Select File"}
              <input
                type="file"
                accept=".xlsx,.xls,.csv"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])}
              />
            </label>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="rounded-xl border bg-white p-6">
            <h2 className="mb-4 font-semibold">Map spreadsheet columns to fields</h2>
            <p className="mb-4 text-sm text-slate-500">
              File: <strong>{file?.name}</strong> · {headers.length} columns detected
            </p>
            <div className="space-y-3">
              {headers.map((h) => (
                <div key={h} className="flex items-center gap-3">
                  <span className="w-40 truncate text-sm font-medium text-slate-600" title={h}>
                    {h}
                  </span>
                  <span className="text-slate-400">→</span>
                  <select
                    value={mapping[h] || ""}
                    onChange={(e) => setMapping({ ...mapping, [h]: e.target.value })}
                    className="flex-1 rounded-lg border px-3 py-2 text-sm"
                  >
                    {FIELD_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="rounded-lg border px-4 py-2 text-sm"
              >
                Back
              </button>
              <button
                onClick={runPreview}
                disabled={loading}
                className="rounded-lg bg-[var(--color-navy)] px-5 py-2 text-sm font-semibold text-white disabled:opacity-60"
              >
                {loading ? "Validating…" : "Preview & Validate"}
              </button>
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && preview && (
          <div className="rounded-xl border bg-white p-6">
            <h2 className="mb-4 font-semibold">Preview & Validation</h2>
            <div className="mb-4 grid grid-cols-4 gap-3 text-center text-sm">
              <div className="rounded-lg bg-slate-50 p-3">
                <div className="text-xl font-bold">{preview.totalRows}</div>
                <div className="text-xs text-slate-500">Total</div>
              </div>
              <div className="rounded-lg bg-green-50 p-3">
                <div className="text-xl font-bold text-green-700">{preview.validRows}</div>
                <div className="text-xs text-slate-500">Valid</div>
              </div>
              <div className="rounded-lg bg-red-50 p-3">
                <div className="text-xl font-bold text-red-700">{preview.invalidRows}</div>
                <div className="text-xs text-slate-500">Invalid</div>
              </div>
              <div className="rounded-lg bg-amber-50 p-3">
                <div className="text-xl font-bold text-amber-700">{preview.duplicates}</div>
                <div className="text-xs text-slate-500">Duplicates</div>
              </div>
            </div>

            <div className="mb-4 max-h-64 overflow-auto rounded border text-xs">
              <table className="w-full">
                <thead className="sticky top-0 bg-slate-100">
                  <tr>
                    <th className="px-2 py-1.5 text-left">Row</th>
                    <th className="px-2 py-1.5 text-left">Name</th>
                    <th className="px-2 py-1.5 text-left">Adm No</th>
                    <th className="px-2 py-1.5 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {preview.rows.slice(0, 50).map((r) => (
                    <tr key={r.row} className={r.isValid ? "" : "bg-red-50"}>
                      <td className="px-2 py-1">{r.row}</td>
                      <td className="px-2 py-1">{r.data.firstName} {r.data.lastName}</td>
                      <td className="px-2 py-1">{r.data.admissionNumber}</td>
                      <td className="px-2 py-1">
                        {r.isDuplicate ? "Duplicate" : r.isValid ? "OK" : r.errors.join("; ")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-wrap gap-3">
              <button onClick={() => setStep(2)} className="rounded-lg border px-4 py-2 text-sm">
                Back
              </button>
              <button
                onClick={() => confirmImport("new_only")}
                disabled={loading || preview.validRows === 0}
                className="rounded-lg bg-[var(--color-navy)] px-5 py-2 text-sm font-semibold text-white disabled:opacity-60"
              >
                {loading ? "Importing…" : `Import ${preview.validRows} valid new records`}
              </button>
              <button
                onClick={() => confirmImport("skip_existing")}
                disabled={loading}
                className="rounded-lg border px-4 py-2 text-sm"
              >
                Skip all existing
              </button>
            </div>
          </div>
        )}

        {/* Step 4 */}
        {step === 4 && result && (
          <div className="rounded-xl border bg-white p-8 text-center">
            <div className="mb-4 text-4xl">✅</div>
            <h2 className="mb-2 text-xl font-bold text-green-700">Import Complete</h2>
            <p className="mb-4 text-slate-600">
              Imported: <strong>{result.imported}</strong> · Skipped: <strong>{result.skipped}</strong> ·
              Failed: <strong>{result.failed}</strong>
            </p>
            <div className="flex justify-center gap-3">
              <Link
                href="/admin/students"
                className="rounded-lg bg-[var(--color-navy)] px-5 py-2 text-sm font-semibold text-white"
              >
                View Students
              </Link>
              <button
                onClick={() => {
                  setStep(1);
                  setFile(null);
                  setPreview(null);
                  setResult(null);
                }}
                className="rounded-lg border px-4 py-2 text-sm"
              >
                Import More
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
