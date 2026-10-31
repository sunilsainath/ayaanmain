"use client";
// Masonry photo gallery with category filters and a keyboard-friendly lightbox.
// Images use their natural aspect ratio so result posters are never cropped.
import { useEffect, useMemo, useState } from "react";
import { GALLERY, GALLERY_CATEGORIES, type GalleryCategory, type GalleryItem } from "@/lib/gallery";

type Props = {
  items?: GalleryItem[];
  limit?: number;
  showFilters?: boolean;
};

export default function GalleryGrid({ items = GALLERY, limit, showFilters = true }: Props) {
  const [active, setActive] = useState<"All" | GalleryCategory>("All");
  const [open, setOpen] = useState<number | null>(null);

  const categories = useMemo(
    () => GALLERY_CATEGORIES.filter((c) => items.some((i) => i.category === c)),
    [items]
  );

  const shown = useMemo(() => {
    const base = active === "All" ? items : items.filter((i) => i.category === active);
    return typeof limit === "number" ? base.slice(0, limit) : base;
  }, [items, active, limit]);

  useEffect(() => {
    setOpen(null);
  }, [active]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((i) => (i === null ? null : (i + 1) % shown.length));
      if (e.key === "ArrowLeft") setOpen((i) => (i === null ? null : (i - 1 + shown.length) % shown.length));
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, shown.length]);

  const current = open !== null ? shown[open] : null;

  return (
    <div>
      {showFilters && categories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {(["All", ...categories] as const).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setActive(c as "All" | GalleryCategory)}
              className={`px-4 py-2 rounded-full border text-sm font-medium transition ${
                active === c
                  ? "bg-navy-900 text-white border-navy-900 shadow-sm"
                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      <div className={`columns-1 sm:columns-2 lg:columns-3 gap-4 ${showFilters ? "mt-5" : ""}`}>
        {shown.map((item, idx) => (
          <figure key={item.src} className="mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <button
              type="button"
              onClick={() => setOpen(idx)}
              className="relative block w-full text-left focus-ring group"
              aria-label={`Open photo: ${item.title}`}
            >
              <img
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                loading="lazy"
                className="w-full h-auto bg-slate-100 transition duration-500 group-hover:scale-[1.02]"
              />
              <span className="absolute left-3 top-3 px-2.5 py-1 rounded-full bg-navy-900/85 text-white text-[10px] font-semibold tracking-wide uppercase">
                {item.category}
              </span>
            </button>
            <figcaption className="p-4">
              <div className="font-semibold text-navy-900 text-sm">{item.title}</div>
              <div className="mt-1 text-xs text-slate-600 leading-relaxed">{item.caption}</div>
            </figcaption>
          </figure>
        ))}
      </div>

      {shown.length === 0 && (
        <div className="card mt-4 p-8 text-center text-sm text-slate-600">No photos in this category yet.</div>
      )}

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.title}
          className="fixed inset-0 z-[80] bg-slate-950/90 backdrop-blur-sm p-4 sm:p-8 flex flex-col"
          onClick={() => setOpen(null)}
        >
          <div className="flex items-center justify-between text-white/90 shrink-0" onClick={(e) => e.stopPropagation()}>
            <div className="text-xs tracking-widest">
              {open! + 1} / {shown.length}
            </div>
            <button
              type="button"
              onClick={() => setOpen(null)}
              className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-medium hover:bg-white/20"
            >
              ✕ Close
            </button>
          </div>

          <div className="flex-1 min-h-0 flex items-center justify-center gap-2 sm:gap-4" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setOpen((i) => (i === null ? null : (i - 1 + shown.length) % shown.length))}
              className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 border border-white/20 text-white text-xl hover:bg-white/20 grid place-items-center"
              aria-label="Previous photo"
            >
              ←
            </button>
            <img
              src={current.src}
              alt={current.alt}
              className="max-h-full max-w-full object-contain rounded-xl shadow-2xl"
            />
            <button
              type="button"
              onClick={() => setOpen((i) => (i === null ? null : (i + 1) % shown.length))}
              className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 border border-white/20 text-white text-xl hover:bg-white/20 grid place-items-center"
              aria-label="Next photo"
            >
              →
            </button>
          </div>

          <div className="mt-3 text-center text-white shrink-0" onClick={(e) => e.stopPropagation()}>
            <div className="font-semibold">{current.title}</div>
            <div className="text-sm text-white/70 mt-1">{current.caption}</div>
          </div>
        </div>
      )}
    </div>
  );
}
