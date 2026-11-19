"use client";
import { useEffect, useState } from "react";

type Slide = {
  id: string | number;
  badge: string;
  title: string;
  highlight: string;
  desc: string;
  cta: { label: string; href: string };
  cta2?: { label: string; href: string };
  image: string;
  accent: string;
};

const fallbackSlides: Slide[] = [
  {
    id: 1,
    badge: "SI • CONSTABLE • MOST DEMANDED",
    title: "Wear the Khaki",
    highlight: "with Pride.",
    desc: "Telangana's No.1 for Uniform Jobs. 9 Years • 5000+ Selections. Written + Physical under one roof.",
    cta: { label: "Join SI Batch →", href: "/admission" },
    cta2: { label: "View Batches", href: "/courses" },
    image: "https://images.unsplash.com/photo-1542395975-d6d3f2761a28?q=80&w=1600&auto=format&fit=crop",
    accent: "from-sky-600 to-navy-900",
  },
  {
    id: 2,
    badge: "DEFENCE • ARMY • NAVY • AIRFORCE",
    title: "Serve the Nation",
    highlight: "in Uniform.",
    desc: "3-Level Grounds • L1 Track • L2 Strength • L3 Events. Trained by Dr. Md Anwar — International Athlete.",
    cta: { label: "Defence Coaching →", href: "/courses" },
    cta2: { label: "Pro Fitness", href: "/academy" },
    image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?q=80&w=1600&auto=format&fit=crop",
    accent: "from-emerald-600 to-teal-800",
  },
  {
    id: 3,
    badge: "GROUPS 1/2/3/4 • STATE SERVICES",
    title: "Crack Groups",
    highlight: "& State Services.",
    desc: "Updated syllabus + Daily Current Affairs + Weekly Grand Tests. Bilingual — Telugu & English.",
    cta: { label: "Explore Groups →", href: "/courses" },
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1600&auto=format&fit=crop",
    accent: "from-amber-600 to-orange-700",
  },
  {
    id: 4,
    badge: "RESIDENTIAL • INDIA'S FIRST • 25 ACRES",
    title: "Live. Learn.",
    highlight: "Conquer.",
    desc: "Bollikunta, Warangal — Classroom + Grounds + Hostel within 100m. 4am Study • Daily Tests • 24×7 Library.",
    cta: { label: "Aspirant Corner →", href: "/academy" },
    cta2: { label: "Book Hostel Tour", href: "/contact" },
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600&auto=format&fit=crop",
    accent: "from-violet-600 to-indigo-800",
  },
];

export default function HeroCarousel() {
  // null = still loading, [] = admin deleted every slide (render nothing), array = show these.
  // The DB is the source of truth — fallback slides are used ONLY when the request fails,
  // never when the API legitimately returns an empty list (that is how deleted slides used
  // to keep reappearing on the homepage).
  const [slides, setSlides] = useState<Slide[] | null>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/carousel", { cache: "no-store" })
      .then((r) => {
        if (!r.ok) throw new Error(`carousel ${r.status}`);
        return r.json();
      })
      .then((d) => {
        if (cancelled) return;
        const mapped: Slide[] = (Array.isArray(d) ? d : [])
          .filter((s: any) => !/upsc/i.test(`${s.badge || ""} ${s.title || ""} ${s.desc || ""}`))
          .map((s: any) => ({
          id: s.id,
          badge: s.badge || "",
          title: s.title || "",
          highlight: s.highlight || "",
          desc: s.desc || "",
          cta: { label: s.ctaLabel || "Learn More →", href: s.ctaHref || "/courses" },
          cta2: s.cta2Label ? { label: s.cta2Label, href: s.cta2Href || "/contact" } : undefined,
          image: s.image,
          accent: s.accent || "from-sky-600 to-navy-900",
        }));
        setSlides(mapped);
        setActive(0);
      })
      .catch(() => {
        // Network/server failure only — fall back so the hero is never blank
        if (!cancelled) { setSlides(fallbackSlides); setActive(0); }
      });
    return () => { cancelled = true; };
  }, []);

  // Poll so admin add/edit/delete appears without a manual refresh
  useEffect(() => {
    const id = setInterval(() => {
      fetch("/api/carousel", { cache: "no-store" })
        .then((r) => (r.ok ? r.json() : null))
        .then((d) => {
          if (!Array.isArray(d)) return;
          const mapped: Slide[] = d
            .filter((s: any) => !/upsc/i.test(`${s.badge || ""} ${s.title || ""} ${s.desc || ""}`))
            .map((s: any) => ({
            id: s.id,
            badge: s.badge || "",
            title: s.title || "",
            highlight: s.highlight || "",
            desc: s.desc || "",
            cta: { label: s.ctaLabel || "Learn More →", href: s.ctaHref || "/courses" },
            cta2: s.cta2Label ? { label: s.cta2Label, href: s.cta2Href || "/contact" } : undefined,
            image: s.image,
            accent: s.accent || "from-sky-600 to-navy-900",
          }));
          setSlides((prev) => {
            if (prev === null) return mapped;
            // only reset the active index when the set of slides actually changed
            const same = prev.length === mapped.length && prev.every((p, i) => p.id === mapped[i].id && p.image === mapped[i].image);
            if (!same) setActive(0);
            return mapped;
          });
        })
        .catch(() => {});
    }, 30000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (paused || !slides || slides.length <= 1) return;
    const id = setInterval(() => setActive((i) => (i + 1) % slides.length), 4000);
    return () => clearInterval(id);
  }, [paused, slides]);

  // Render nothing while loading or when every slide was deleted. Critically, the
  // fallback slides are NOT shown here — doing so is what made deleted images
  // "persist". A neutral skeleton keeps the layout stable without stale content.
  if (slides === null) {
    return (
      <div className="relative w-full overflow-hidden bg-slate-900">
        <div className="relative aspect-video">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 animate-pulse" />
        </div>
      </div>
    );
  }
  if (slides.length === 0) return null;

  const list = slides;
  const go = (i: number) => setActive((i + list.length) % list.length);

  return (
    <div
      className="relative w-full overflow-hidden bg-slate-900"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      {/* slides */}
      <div className="relative aspect-video">
        {list.map((s, idx) => (
          <div
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-out ${idx === active ? "opacity-100 z-10" : "opacity-0 z-0"}`}
          >
            {/* image — slides are direct uploads, shown in admin order with no text overlay */}
            <img src={s.image} alt="" className="absolute inset-0 w-full h-full object-contain" />
            {/* subtle gradient so the dots/arrows stay readable */}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-900/50 to-transparent" />
          </div>
        ))}
      </div>

      {/* controls */}
      <div className="absolute bottom-6 left-0 right-0 z-20">
        <div className="container-soft flex items-center justify-between">
          <div className="flex items-center gap-2">
            {list.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`transition-all rounded-full ${i === active ? "w-8 h-2 bg-white" : "w-2 h-2 bg-white/40 hover:bg-white/70"}`}
              />
            ))}
            </div>
            <div className="flex items-center gap-2">
            <button onClick={() => go(active - 1)} className="w-9 h-9 rounded-full bg-white/10 border border-white/20 text-white backdrop-blur grid place-items-center hover:bg-white/15" aria-label="Previous">‹</button>
            <button onClick={() => go(active + 1)} className="w-9 h-9 rounded-full bg-white text-navy-900 grid place-items-center hover:bg-slate-100" aria-label="Next">›</button>
          </div>
        </div>
      </div>

      {/* top progress */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-white/10 z-20">
        <div className="h-full bg-white transition-all duration-500" style={{ width: `${((active + 1) / list.length) * 100}%` }} />
      </div>
    </div>
  );
}
