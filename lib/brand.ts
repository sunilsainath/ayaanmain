// Single source of truth for the Ayaan brand strings and logo paths.
//
// The official mark is a raster (public/brand/ayaan-logo.png), supplied as
// artwork and cleaned up to a transparent background. The inline copy used by
// print windows, ID cards and email lives in lib/logoInline.ts so it is only
// bundled on the routes that actually render it.

export const LOGO_SVG_PATH = "/brand/ayaan-logo.svg";
export const LOGO_RASTER_PATH = "/brand/ayaan-logo.png";

export const BRAND = {
  name: "Ayaan",
  fullName: "Ayaan Group of Competitive Institutions",
  tagline: "We Target Your Aim",
  strapline: "Group Of Competitive Institutions",
  // Used for <title>, meta and printed documents.
  documentTitle: "Ayaan Group Of Competitive Institutions",
  claim: "Most favourite institute of TS & AP Aspirants",
} as const;
