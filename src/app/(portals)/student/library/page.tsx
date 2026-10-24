"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function StudentLibrary() {
  const [q, setQ] = useState("");
  const [books, setBooks] = useState<{ id: string; title: string; author: string | null; availableCopies: number }[]>([]);
  const [issues, setIssues] = useState<{ id: string; status: string; dueDate: string; book: { title: string } }[]>([]);
  async function load(query = q) {
    const res = await fetch("/api/library?q=" + encodeURIComponent(query));
    const d = await res.json();
    setBooks(d.books || []);
    setIssues(d.issues || []);
  }
  useEffect(() => { load(""); }, []);
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white px-4 py-3"><Link href="/student/dashboard" className="text-sm font-semibold text-[var(--color-navy)]">← Dashboard</Link></header>
      <main className="mx-auto max-w-xl px-4 py-8">
        <h1 className="mb-3 text-xl font-bold">Library</h1>
        <form onSubmit={(e) => { e.preventDefault(); load(); }} className="mb-4 flex gap-2">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search title" className="flex-1 rounded border px-3 py-2 text-sm" />
          <button className="rounded bg-[var(--color-navy)] px-3 py-2 text-sm text-white">Search</button>
        </form>
        <ul className="mb-6 divide-y rounded-xl border bg-white text-sm">
          {books.map((b) => <li key={b.id} className="flex justify-between px-4 py-2"><span>{b.title}{b.author ? ` · ${b.author}` : ""}</span><span>{b.availableCopies} free</span></li>)}
        </ul>
        <h2 className="mb-2 font-semibold">My issues</h2>
        <ul className="divide-y rounded-xl border bg-white text-sm">
          {issues.map((i) => <li key={i.id} className="px-4 py-2">{i.book.title} · {i.status} · due {new Date(i.dueDate).toLocaleDateString("en-IN")}</li>)}
          {issues.length === 0 && <li className="p-4 text-slate-500">No books issued.</li>}
        </ul>
      </main>
    </div>
  );
}
