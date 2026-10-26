"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { SchoolImage } from "@/components/layout/SchoolImage";

export type SchoolGalleryPhoto = {
  title: string;
  src: string;
};

export function SchoolGallery({ photos }: { photos: SchoolGalleryPhoto[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (activeIndex === null) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowLeft") {
        setActiveIndex((index) => index === null ? null : (index - 1 + photos.length) % photos.length);
      }
      if (event.key === "ArrowRight") {
        setActiveIndex((index) => index === null ? null : (index + 1) % photos.length);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, photos.length]);

  const activePhoto = activeIndex === null ? null : photos[activeIndex];

  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {photos.map((photo, index) => (
          <button
            type="button"
            key={photo.src}
            onClick={() => setActiveIndex(index)}
            className="group min-w-0 rounded-2xl text-left focus-visible:outline-offset-4"
            aria-label={`Open photo: ${photo.title}`}
          >
            <figure className="card-surface h-full overflow-hidden transition duration-300 group-hover:-translate-y-1 group-hover:shadow-[var(--shadow-soft)]">
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                <SchoolImage
                  src={photo.src}
                  alt={photo.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute bottom-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-[var(--color-navy)] opacity-0 shadow-md transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                  <ZoomIn className="h-4 w-4" aria-hidden="true" />
                </span>
              </div>
              <figcaption className="flex items-center justify-between gap-3 px-4 py-4 text-sm font-semibold text-slate-800">
                <span>{photo.title}</span>
                <span className="text-xs font-medium text-[var(--color-blue)]">View photo</span>
              </figcaption>
            </figure>
          </button>
        ))}
      </div>

      {activePhoto && activeIndex !== null && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/90 p-3 backdrop-blur-sm sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`Photo viewer: ${activePhoto.title}`}
          onClick={() => setActiveIndex(null)}
        >
          <div className="flex max-h-full w-full max-w-6xl flex-col" onClick={(event) => event.stopPropagation()}>
            <div className="mb-3 flex items-center justify-between gap-4 text-white">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold sm:text-base">{activePhoto.title}</p>
                <p className="mt-0.5 text-xs text-white/60">{activeIndex + 1} of {photos.length}</p>
              </div>
              <button
                type="button"
                onClick={() => setActiveIndex(null)}
                aria-label="Close photo viewer"
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20 focus-visible:outline-white"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded-2xl bg-black/30">
              <div className="h-[68vh] max-h-[800px] w-full">
                <SchoolImage
                  src={activePhoto.src}
                  alt={activePhoto.title}
                  className="h-full w-full object-contain"
                  loading="eager"
                />
              </div>
              {photos.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => setActiveIndex((activeIndex - 1 + photos.length) % photos.length)}
                    aria-label="Previous photo"
                    className="absolute left-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-lg transition hover:bg-white"
                  >
                    <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveIndex((activeIndex + 1) % photos.length)}
                    aria-label="Next photo"
                    className="absolute right-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-lg transition hover:bg-white"
                  >
                    <ChevronRight className="h-5 w-5" aria-hidden="true" />
                  </button>
                </>
              )}
            </div>
            <p className="mt-3 text-center text-xs text-white/60">Use ← → to browse and Esc to close</p>
          </div>
        </div>
      )}
    </>
  );
}
