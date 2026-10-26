import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { galleryImages, UPMSP_SOURCE } from "@/data/upmsp";

export const metadata = {
  title: "Gallery",
  description: "Campus photographs from the UPMSP Pehchan school profile.",
};

export default function GalleryPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-cream)]">
      <PublicHeader />
      <main className="flex-1">
        <section className="border-b border-slate-100 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-12">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-blue)]">Gallery</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">Campus photos</h1>
            <p className="mt-3 max-w-2xl text-sm text-slate-600">
              Images hosted on the official UPMSP Pehchan portal for school code 011424.
            </p>
            <p className="mt-1 text-xs text-slate-500">
              <a href={UPMSP_SOURCE} target="_blank" rel="noopener noreferrer" className="text-[var(--color-blue)] underline">
                View full profile on upmsp.edu.in
              </a>
            </p>
          </div>
        </section>
        <section className="mx-auto max-w-7xl px-4 py-10">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {galleryImages.map((g) => (
              <figure key={g.title} className="card-surface overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={g.src}
                  alt={g.title}
                  className="aspect-[4/3] w-full object-cover"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <figcaption className="px-4 py-3 text-sm font-medium text-slate-700">{g.title}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
