import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { FileText } from "lucide-react";

export const metadata = { title: "Notices & Circulars" };

export default function NoticesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicHeader />
      <main className="mx-auto max-w-4xl flex-1 px-4 py-12">
        <h1 className="mb-2 text-3xl font-bold text-[var(--color-navy)]">Notices & Circulars</h1>
        <p className="mb-10 text-slate-600">
          Official announcements from S.K.R. INTER COLLEGE & PVT ITI.
        </p>

        <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-10 text-center">
          <FileText className="mx-auto mb-4 h-12 w-12 text-slate-300" />
          <p className="mb-2 font-medium text-slate-700">No published notices yet</p>
          <p className="text-sm text-slate-500">
            Notices will appear here once the administration publishes them from the ERP panel.
            For urgent updates, please contact the school office at{" "}
            <a href="tel:9837183726" className="underline">9837183726</a>.
          </p>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
