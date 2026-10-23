"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }
      // Redirect based on role
      const role = data.user?.role;
      if (["SUPER_ADMIN", "PRINCIPAL", "SCHOOL_ADMIN", "ADMISSION_OFFICER", "EXAM_CONTROLLER", "ACCOUNTANT", "HR"].includes(role)) {
        router.push("/admin/dashboard");
      } else if (role === "TEACHER") {
        router.push("/teacher/dashboard");
      } else if (role === "STUDENT") {
        router.push("/student/dashboard");
      } else if (role === "PARENT") {
        router.push("/parent/dashboard");
      } else {
        router.push("/");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-navy)] text-xl font-bold text-[var(--color-gold)]">
            SKR
          </div>
          <h1 className="text-xl font-bold text-[var(--color-navy)]">Sign in to your account</h1>
          <p className="mt-1 text-sm text-slate-500">S.K.R. INTER COLLEGE Portal</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
              {error}
            </div>
          )}
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">
              Email or Phone
            </label>
            <input
              id="email"
              type="text"
              autoComplete="username"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-[var(--color-navy)] focus:ring-2 focus:ring-[var(--color-navy)]/20"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-[var(--color-navy)] focus:ring-2 focus:ring-[var(--color-navy)]/20"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[var(--color-navy)] py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--color-navy-dark)] disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-slate-400">
          <Link href="/" className="hover:underline">
            ← Back to website
          </Link>
        </p>
        <p className="mt-2 text-center text-xs text-slate-400">
          Demo: admin@skrcollege.local / ChangeMeImmediately123!
        </p>
      </div>
    </div>
  );
}
