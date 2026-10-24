import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { Download } from "lucide-react";

export const metadata = { title: "Downloads" };

export default function DownloadsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicHeader />
      <main className="mx-auto max-w-4xl flex-1 px-4 py-12">
        <h1 className="mb-2 text-3xl font-bold text-[var(--color-navy)]">Downloads</h1>
        <p className="mb-8 text-slate-600">
          Official forms and public documents. Private student documents remain available only after login.
        </p>
        <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-10 text-center">
          <Download className="mx-auto mb-4 h-12 w-12 text-slate-300" />
          <p className="mb-2 font-medium text-slate-700">Documents will appear here</p>
          <p className="text-sm text-slate-500">
            Prospectus, syllabus, academic calendar and approved forms will be published by the
            administration. For current forms, contact the school office at 9837183726.
          </p>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
