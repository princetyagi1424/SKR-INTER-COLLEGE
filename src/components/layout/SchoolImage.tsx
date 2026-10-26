"use client";

import { useState } from "react";
import { ImageOff, School } from "lucide-react";

type SchoolImageProps = {
  src: string;
  alt: string;
  className?: string;
  loading?: "eager" | "lazy";
  fallbackText?: string;
};

/**
 * Keep public pages tidy when the upstream UPMSP image service is unavailable.
 * The fallback remains accessible and preserves the image's layout footprint.
 */
export function SchoolImage({
  src,
  alt,
  className = "",
  loading = "lazy",
  fallbackText = "Campus photo temporarily unavailable",
}: SchoolImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={`${alt} — image unavailable`}
        className={`${className} flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-amber-50 p-5 text-center`}
      >
        <div className="flex max-w-xs flex-col items-center gap-2 text-slate-500">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-100 bg-white text-[var(--color-navy)] shadow-sm">
            {fallbackText.length <= 3 ? (
              <School className="h-6 w-6" aria-hidden="true" />
            ) : (
              <ImageOff className="h-6 w-6" aria-hidden="true" />
            )}
          </div>
          {fallbackText.length <= 3 ? (
            <span className="text-sm font-bold tracking-wide text-slate-600">{fallbackText}</span>
          ) : (
            <span className="text-xs font-medium">{fallbackText}</span>
          )}
        </div>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
