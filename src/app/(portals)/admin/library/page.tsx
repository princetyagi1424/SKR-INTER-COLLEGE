"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

type Book = { id: string; title: string; author: string | null; availableCopies: number; totalCopies: number; shelfLocation: string | null };
type Issue = { id: string; dueDate: string; book: { title: string }; student: { firstName: string; admissionNumber: string } | null };

export default function LibraryAdmin() {
  const [books, setBooks] = useState<Book[]>([]);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [copies, setCopies] = useState("1");
  const [bookId, setBookId] = useState("");
  const [adm, setAdm] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  async function load() {
    const res = await fetch("/api/library");
    const d = await res.json();
    if (!res.ok) setErr(d.error || "Failed");
    else { setBooks(d.books || []); setIssues(d.issues || []); if (!bookId && d.books?.[0]) setBookId(d.books[0].id); }
  }
  useEffect(() => { load(); }, []);

  async function add(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/library", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "add", title, author, totalCopies: Number(copies) }) });
    const d = await res.json();
    if (!res.ok) setErr(d.error || "Failed"); else { setMsg("Book added"); setTitle(""); load(); }
  }
  async function issue(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/library", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "issue", bookId, admissionNumber: adm, days: 14 }) });
    const d = await res.json();
    if (!res.ok) setErr(d.error || "Failed"); else { setMsg("Issued"); load(); }
  }
  async function ret(id: string) {
    const res = await fetch("/api/library", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "return", issueId: id }) });
    const d = await res.json();
    if (!res.ok) setErr(d.error || "Failed"); else { setMsg(d.fine ? `Returned. Fine ₹${d.fine}` : "Returned"); load(); }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white px-4 py-3"><Link href="/admin/dashboard" className="text-sm font-semibold text-[var(--color-navy)]">← Admin</Link></header>
      <main className="mx-auto max-w-4xl px-4 py-8 space-y-6">
        <h1 className="text-xl font-bold">Library</h1>
        {err && <p className="text-sm text-red-700">{err}</p>}
        {msg && <p className="text-sm text-green-700">{msg}</p>}
        <form onSubmit={add} className="grid gap-2 rounded-xl border bg-white p-4 sm:grid-cols-4">
          <input required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="rounded border px-3 py-2 text-sm" />
          <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author" className="rounded border px-3 py-2 text-sm" />
          <input value={copies} onChange={(e) => setCopies(e.target.value)} type="number" min="1" className="rounded border px-3 py-2 text-sm" />
          <button className="rounded bg-[var(--color-navy)] px-3 py-2 text-sm font-semibold text-white">Add book</button>
        </form>
        <form onSubmit={issue} className="grid gap-2 rounded-xl border bg-white p-4 sm:grid-cols-3">
          <select value={bookId} onChange={(e) => setBookId(e.target.value)} className="rounded border px-3 py-2 text-sm">
            {books.map((b) => <option key={b.id} value={b.id}>{b.title} ({b.availableCopies}/{b.totalCopies})</option>)}
          </select>
          <input required value={adm} onChange={(e) => setAdm(e.target.value)} placeholder="Admission number" className="rounded border px-3 py-2 text-sm" />
          <button className="rounded border px-3 py-2 text-sm font-semibold">Issue 14 days</button>
        </form>
        <section>
          <h2 className="mb-2 font-semibold">Out on loan</h2>
          <ul className="divide-y rounded-xl border bg-white text-sm">
            {issues.map((i) => (
              <li key={i.id} className="flex items-center justify-between px-4 py-2">
                <span>{i.book.title} · {i.student?.firstName} {i.student?.admissionNumber} · due {new Date(i.dueDate).toLocaleDateString("en-IN")}</span>
                <button onClick={() => ret(i.id)} className="text-xs font-semibold underline">Return</button>
              </li>
            ))}
            {issues.length === 0 && <li className="p-4 text-slate-500">No open issues.</li>}
          </ul>
        </section>
      </main>
    </div>
  );
}
