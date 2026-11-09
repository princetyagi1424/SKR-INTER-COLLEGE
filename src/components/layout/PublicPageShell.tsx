import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";

export function PublicPageShell({
  eyebrow,
  title,
  description,
  children,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-[#fff8f0] text-slate-900">
      <PublicHeader />
      <main className="flex-1">
        <section className="relative overflow-hidden border-b border-[#efe6dc] bg-white">
          <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#c8102e]/10 blur-3xl" />
          <div className="pointer-events-none absolute -left-16 bottom-0 h-48 w-48 rounded-full bg-[#f5d76e]/20 blur-3xl" />
          <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
            {eyebrow && (
              <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#c8102e]">
                {eyebrow}
              </p>
            )}
            <h1 className="max-w-3xl text-3xl font-extrabold tracking-tight text-[#1a1a1a] sm:text-4xl">
              {title}
            </h1>
            {description && (
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">{description}</p>
            )}
            {actions && <div className="mt-6 flex flex-wrap gap-3">{actions}</div>}
          </div>
        </section>
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">{children}</div>
      </main>
      <PublicFooter />
    </div>
  );
}

export function SoftCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-3xl border border-[#efe6dc] bg-white p-6 shadow-[0_10px_30px_rgba(26,26,26,0.05)] ${className}`}>
      {children}
    </div>
  );
}
