"use client";
// The Ayaan logo as a reusable component.
//
// The supplied artwork is used directly (raster) so the crest matches the
// official brand mark. `showWordmark` adds the small type lock-up next to it
// for wide headers; compact places (footer, dashboards) turn it off.
import { BRAND, LOGO_RASTER_PATH } from "@/lib/brand";

export default function BrandLogo({
  height = 44,
  showWordmark = true,
  className = "",
  title = BRAND.documentTitle,
}: {
  height?: number;
  showWordmark?: boolean;
  className?: string;
  title?: string;
}) {
  return (
    <span className={`inline-flex items-center ${className}`}>
      <img
        src={LOGO_RASTER_PATH}
        alt={title}
        height={height}
        style={{ height, width: "auto", display: "block", flexShrink: 0 }}
      />

      {showWordmark && (
        <span className="leading-tight hidden sm:block" style={{ marginLeft: 10 }}>
          <span className="font-display font-bold text-[16px] tracking-tight text-navy-800" style={{ display: "block" }}>
            AYAAN INSTITUTE
          </span>
          <span className="text-[11px] tracking-[0.12em] text-slate-500 font-medium" style={{ display: "block" }}>
            {BRAND.strapline.toUpperCase()}
          </span>
        </span>
      )}
    </span>
  );
}
