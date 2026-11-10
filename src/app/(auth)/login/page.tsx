"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { ShieldCheck, GraduationCap, UserCheck, Users, KeyRound, Sparkles, ArrowRight } from "lucide-react";

interface DemoAccount {
  role: string;
  badge: string;
  name: string;
  email: string;
  pass: string;
  icon: typeof ShieldCheck;
  color: string;
}

const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    role: "Admin",
    badge: "प्रशासक",
    name: "System Administrator",
    email: "admin@skrcollege.local",
    pass: "ChangeMeImmediately123!",
    icon: ShieldCheck,
    color: "bg-red-50 text-red-700 border-red-200 hover:bg-red-100",
  },
  {
    role: "Teacher",
    badge: "शिक्षक",
    name: "Mr. Ramesh Sharma (PGT)",
    email: "teacher.demo@skrcollege.local",
    pass: "Teacher@123",
    icon: UserCheck,
    color: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100",
  },
  {
    role: "Student",
    badge: "छात्र",
    name: "Aarav Kumar (Class 11)",
    email: "skr2025001@student.skrcollege.local",
    pass: "Student@123",
    icon: GraduationCap,
    color: "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100",
  },
  {
    role: "Parent",
    badge: "अभिभावक",
    name: "Suresh Kumar (Father)",
    email: "parent.demo@skrcollege.local",
    pass: "Parent@123",
    icon: Users,
    color: "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100",
  },
];

export default function LoginPage() {
  const router = useRouter();
  const { locale, t } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeFill, setActiveFill] = useState<string | null>(null);

  function fillDemo(account: DemoAccount) {
    setEmail(account.email);
    setPassword(account.pass);
    setActiveFill(account.role);
    setError("");
  }

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
        setError(data.error || (locale === "hi" ? "लॉगिन विफल रहा" : "Login failed"));
        return;
      }
      const role = data.user?.role;
      if (
        [
          "SUPER_ADMIN",
          "PRINCIPAL",
          "SCHOOL_ADMIN",
          "ADMISSION_OFFICER",
          "EXAM_CONTROLLER",
          "ACCOUNTANT",
          "HR",
        ].includes(role)
      ) {
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
      setError(
        locale === "hi"
          ? "नेटवर्क त्रुटि, कृपया पुनः प्रयास करें।"
          : "Network error. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-slate-50 via-white to-slate-100 px-4 py-8">
      {/* Top Bar with Language and Back */}
      <header className="absolute top-4 left-4 right-4 flex items-center justify-between max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white/80 backdrop-blur px-3 py-1.5 rounded-full border border-slate-200 shadow-sm transition"
        >
          ← {locale === "hi" ? "मुख्य पृष्ठ" : "Back to Home"}
        </Link>
        <div className="bg-white/90 backdrop-blur rounded-full p-1 border border-slate-200 shadow-sm">
          <LanguageToggle />
        </div>
      </header>

      <div className="w-full max-w-md pt-12 sm:pt-6">
        {/* Main Card */}
        <div className="rounded-3xl bg-white p-7 sm:p-9 shadow-xl shadow-slate-200/60 border border-slate-200/80">
          <div className="mb-6 text-center">
            <div className="relative mx-auto mb-3 h-20 w-20 rounded-full bg-amber-50/50 p-1 shadow-md ring-2 ring-amber-300">
              <Image
                src="/logo.png"
                alt="S.K.R. Inter College Emblem"
                width={80}
                height={80}
                className="h-full w-full rounded-full object-contain"
                priority
              />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-[#0f2444]">
              {locale === "hi" ? "एस.के.आर. कॉलेज पोर्टल लॉगिन" : "S.K.R. College Portal Login"}
            </h1>
            <p className="mt-1 text-xs text-slate-500">
              {locale === "hi"
                ? "छात्र, अभिभावक, शिक्षक एवं प्रशासनिक पोर्टल"
                : "Student, Parent, Teacher & Administrative Access"}
            </p>
          </div>

          {/* Quick 1-Click Demo Logins */}
          <div className="mb-6 rounded-2xl bg-slate-50 p-3.5 border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                {locale === "hi" ? "डेमो आईडी व पासवर्ड (1-क्लिक भरें)" : "Demo Accounts (1-Click Fill)"}
              </span>
              <span className="text-[10px] text-slate-400 font-medium">Click to populate</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {DEMO_ACCOUNTS.map((acc) => {
                const Icon = acc.icon;
                const isSelected = activeFill === acc.role;
                return (
                  <button
                    key={acc.role}
                    type="button"
                    onClick={() => fillDemo(acc)}
                    className={`flex items-center gap-2 p-2 rounded-xl text-left border text-xs font-semibold transition ${
                      isSelected
                        ? "ring-2 ring-slate-900 bg-white border-slate-900 shadow-sm"
                        : acc.color
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <div className="truncate">
                      <div className="font-bold leading-tight truncate">{acc.role}</div>
                      <div className="text-[10px] opacity-80 truncate">{acc.badge}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-xl bg-red-50 border border-red-200 px-3.5 py-2.5 text-xs font-medium text-red-700" role="alert">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-600">
                {locale === "hi" ? "ईमेल अथवा मोबाइल नंबर" : "Email or Phone Number"}
              </label>
              <input
                id="email"
                type="text"
                autoComplete="username"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-slate-50/50 px-3.5 py-2.5 text-sm font-medium text-slate-900 outline-none transition focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100"
                placeholder="admin@skrcollege.local"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                  {locale === "hi" ? "पासवर्ड" : "Password"}
                </label>
              </div>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-slate-50/50 px-3.5 py-2.5 text-sm font-medium text-slate-900 outline-none transition focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100"
                placeholder="••••••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0f2444] to-[#1e3a5f] py-3 text-sm font-bold text-white shadow-md shadow-blue-950/20 transition hover:from-[#0b1a32] hover:to-[#162c4a] active:scale-[0.99] disabled:opacity-60"
            >
              {loading ? (
                <span>{locale === "hi" ? "सत्यापित हो रहा है..." : "Verifying..."}</span>
              ) : (
                <>
                  <span>{locale === "hi" ? "पोर्टल में प्रवेश करें" : "Sign In to Portal"}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Institutional Credentials Reference List */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <details className="text-xs text-slate-600 group">
              <summary className="cursor-pointer font-semibold text-slate-700 flex items-center justify-between select-none hover:text-slate-900">
                <span className="flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-slate-500" />
                  {locale === "hi" ? "सभी लॉगिन विवरण देखें (Credentials)" : "View All Role Credentials"}
                </span>
                <span className="text-[10px] text-blue-600 group-open:rotate-180 transition">▼</span>
              </summary>
              <div className="mt-3 space-y-2 text-[11px] bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div>
                  <strong className="text-slate-900">1. Admin (प्रशासक):</strong>
                  <div className="text-slate-600 font-mono">admin@skrcollege.local</div>
                  <div className="text-slate-500">Pass: <code className="bg-white px-1 py-0.5 rounded border">ChangeMeImmediately123!</code></div>
                </div>
                <div>
                  <strong className="text-slate-900">2. Teacher (शिक्षक):</strong>
                  <div className="text-slate-600 font-mono">teacher.demo@skrcollege.local</div>
                  <div className="text-slate-500">Pass: <code className="bg-white px-1 py-0.5 rounded border">Teacher@123</code></div>
                </div>
                <div>
                  <strong className="text-slate-900">3. Student (छात्र):</strong>
                  <div className="text-slate-600 font-mono">skr2025001@student.skrcollege.local</div>
                  <div className="text-slate-500">Pass: <code className="bg-white px-1 py-0.5 rounded border">Student@123</code></div>
                </div>
                <div>
                  <strong className="text-slate-900">4. Parent (अभिभावक):</strong>
                  <div className="text-slate-600 font-mono">parent.demo@skrcollege.local</div>
                  <div className="text-slate-500">Pass: <code className="bg-white px-1 py-0.5 rounded border">Parent@123</code></div>
                </div>
              </div>
            </details>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-slate-500">
          UPMSP Pehchan Code: <span className="font-semibold text-slate-700">011424</span> &bull; UDISE+: <span className="font-semibold text-slate-700">09151302903</span>
        </p>
      </div>
    </div>
  );
}
