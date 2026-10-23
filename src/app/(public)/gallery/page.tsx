import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { ImageIcon } from "lucide-react";

export const metadata = { title: "Gallery" };

export default function GalleryPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicHeader />
      <main className="mx-auto max-w-4xl flex-1 px-4 py-12">
        <h1 className="mb-2 text-3xl font-bold text-[var(--color-navy)]">Gallery</h1>
        <p className="mb-10 text-slate-600">
          Campus life and events at S.K.R. INTER COLLEGE & PVT ITI.
        </p>

        <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-10 text-center">
          <ImageIcon className="mx-auto mb-4 h-12 w-12 text-slate-300" />
          <p className="mb-2 font-medium text-slate-700">Photos coming soon</p>
          <p className="text-sm text-slate-500">
            The school will upload campus and event photographs here. Check back later,
            or visit the campus at Udaypur Khalsa, Bah, Agra.
          </p>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
