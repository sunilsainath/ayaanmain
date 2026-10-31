import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import GalleryGrid from "@/components/GalleryGrid";
import { GALLERY } from "@/lib/gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photographs from Ayaan Police Academy — campus life, academic classes, daily training, awards and TS Constable 2023 toppers.",
};

export default function GalleryPage() {
  return (
    <div className="bg-[#fcfcfd]">
      <PageHero
        eyebrow="Gallery • Campus • Results • Events"
        title="Inside Ayaan — campus, toppers and events"
        crumbs={[{ label: "Gallery" }]}
        subtitle="Real photographs from the 25-acre residential campus: morning assembly, academic classes, ground training, awards and our TS Constable 2023 achievers."
      />

      <section className="container-soft mt-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="text-xs tracking-widest font-semibold text-sky-700">{GALLERY.length} PHOTOGRAPHS</div>
            <h2 className="font-display font-bold text-2xl text-navy-900 mt-1">Campus life & achievements</h2>
            <p className="text-sm text-slate-600 mt-1">Filter by category, then tap any photo to view it full size.</p>
          </div>
        </div>
        <div className="mt-5">
          <GalleryGrid items={GALLERY} />
        </div>
      </section>
    </div>
  );
}
