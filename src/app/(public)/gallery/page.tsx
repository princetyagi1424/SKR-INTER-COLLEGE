import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { SchoolGallery } from "@/components/layout/SchoolGallery";
import { galleryImages, UPMSP_SOURCE } from "@/data/upmsp";
import { Images, ArrowUpRight } from "lucide-react";

export const metadata = {
  title: "Campus Gallery",
  description: "Explore campus photographs from the UPMSP Pehchan school profile for S.K.R. Inter College, Agra.",
};

export default function GalleryPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-cream)]">
      <PublicHeader />
      <main className="flex-1">
        <section className="relative overflow-hidden bg-white">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--color-gold)] via-sky-400 to-emerald-400" />
          <div className="mx-auto flex max-w-7xl flex-col gap-7 px-4 py-10 sm:px-6 sm:py-14 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[var(--color-blue)]">
                <Images className="h-3.5 w-3.5" aria-hidden="true" /> Campus gallery
              </span>
              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">A closer look at our campus</h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                Browse school building, classrooms and campus facilities. Select any photo to open the larger viewer.
              </p>
            </div>
            <a
              href={UPMSP_SOURCE}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-[var(--color-navy)] transition hover:border-blue-200 hover:bg-blue-50 md:self-auto"
            >
              Official UPMSP profile <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900">School photographs</h2>
              <p className="mt-1 text-sm text-slate-500">{galleryImages.length} photos listed from the public school image profile</p>
            </div>
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600">UPMSP school code 011424</span>
          </div>
          <SchoolGallery photos={galleryImages} />
          <p className="mt-8 rounded-2xl border border-blue-100 bg-blue-50/70 px-4 py-4 text-xs leading-5 text-slate-600">
            Photos are requested from the UPMSP Pehchan image service. If the source temporarily stops serving an image, a fallback is shown instead of a broken-image icon.
          </p>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
