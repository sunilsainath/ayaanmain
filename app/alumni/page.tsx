"use client";
// Alumni = success stories, modelled on the AKS IAS-style "Success Stories"
// section: a highlighted flagship story, then a clean grid of portraits with
// quotes, plus the numbers that back them up.
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import AnimatedNumber from "@/components/AnimatedNumber";

type Alumni = { id: string; name: string; role: string; batch: string; course: string; quote: string; video: string; image: string; featured: boolean; createdAt: string };

function toEmbed(url: string) {
  if (!url) return "";
  try {
    const u = new URL(url);
    const v = u.searchParams.get("v");
    if (v) return `https://www.youtube.com/embed/${v}`;
    if (u.hostname.includes("youtu.be")) return `https://www.youtube.com/embed/${u.pathname.slice(1)}`;
    return url;
  } catch { return url; }
}

function ytId(url: string) {
  if (!url) return "";
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) return u.pathname.slice(1);
    const v = u.searchParams.get("v");
    if (v) return v;
    const m = u.pathname.match(/\/(embed|shorts|live)\/([\w-]{11})/);
    if (m) return m[2];
  } catch {}
  return "";
}

const NUMBERS = [
  { v: 5000, suffix: "+", label: "Selections" },
  { v: 183, suffix: "+", label: "TS Constable 2023" },
  { v: 9, suffix: "+", label: "Years of coaching" },
  { v: 25, suffix: "", label: "Acre campus" },
];

export default function AlumniPage() {
  const [list, setList] = useState<Alumni[]>([]);
  const [course, setCourse] = useState("All");
  const [q, setQ] = useState("");
  const [playing, setPlaying] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/alumni", { cache: "no-store" }).then((r) => r.json()).then((d) => Array.isArray(d) && setList(d)).catch(() => {});
  }, []);

  const courses = useMemo(() => ["All", ...Array.from(new Set(list.map((x) => x.course)))], [list]);
  const filtered = useMemo(() => {
    return list.filter((x) => {
      const okCourse = course === "All" || x.course === course;
      const okQ = !q || `${x.name} ${x.role} ${x.quote} ${x.batch}`.toLowerCase().includes(q.toLowerCase());
      return okCourse && okQ;
    });
  }, [list, course, q]);

  // Flagship story (shown big) only on the unfiltered view, like the
  // reference site's hero success story.
  const hero = !q && course === "All" && list.length > 0 ? (list.find((x) => x.featured) || list[0]) : null;
  const rest = hero ? filtered.filter((x) => x.id !== hero.id) : filtered;

  const thumbFor = (a: Alumni) => a.image || (a.video ? `https://img.youtube.com/vi/${ytId(a.video)}/hqdefault.jpg` : "");

  return (
    <div className="bg-[#fcfcfd]">
      <section className="bg-navy-900 text-white">
        <div className="container-soft py-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border-2 border-white/20 text-xs">ALUMNI • A LEGACY OF SUCCESS</div>
          <h1 className="mt-3 font-display font-bold text-3xl lg:text-4xl">Success stories from our students</h1>
          <p className="mt-2 text-white/70 max-w-2xl text-sm leading-relaxed">From auto driver to constable, day-1 physical to top marks — hear how they did it at Ayaan Police Academy.</p>
        </div>
      </section>

      <section className="container-soft mt-6">
        <div className="card p-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {NUMBERS.map((n) => (
              <div key={n.label} className="text-center">
                <div className="font-display font-bold text-2xl text-navy-900 leading-none"><AnimatedNumber value={n.v} suffix={n.suffix} /></div>
                <div className="text-xs text-slate-600 mt-1.5">{n.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {hero && (
        <section className="container-soft mt-6">
          <div className="card overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-5 bg-slate-100">
                {thumbFor(hero) ? (
                  <img src={thumbFor(hero)} alt={hero.name} className="w-full h-full object-cover aspect-[4/3] lg:aspect-auto lg:h-full" />
                ) : (
                  <div className="aspect-[4/3] grid place-items-center text-4xl font-display font-bold text-slate-400">{hero.name[0]}</div>
                )}
              </div>
              <div className="lg:col-span-7 p-6 lg:p-8 flex flex-col">
                <div className="badge bg-amber-50 border-amber-200 text-amber-700 w-fit">FEATURED STORY</div>
                <div className="mt-4 text-lg sm:text-xl leading-relaxed text-navy-900 font-display font-semibold">“{hero.quote}”</div>
                <div className="mt-5 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden shrink-0 grid place-items-center text-sm font-bold text-slate-600">
                    {thumbFor(hero) ? <img src={thumbFor(hero)} alt={hero.name} className="w-full h-full object-cover" /> : hero.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-navy-900">{hero.name}</div>
                    <div className="text-xs text-slate-500">{hero.role} • {hero.batch} • {hero.course}</div>
                  </div>
                </div>
                {hero.video && (
                  <div className="mt-6">
                    {playing === hero.id ? (
                      <div className="rounded-xl overflow-hidden border-2 border-slate-200 bg-black aspect-video">
                        <iframe src={toEmbed(hero.video)} title={hero.name} className="w-full h-full" allow="autoplay; encrypted-media" allowFullScreen />
                      </div>
                    ) : (
                      <button onClick={() => setPlaying(hero.id)} className="w-full flex items-center gap-3 p-3 rounded-xl border-2 border-slate-300 bg-slate-50 hover:bg-white hover:shadow-md transition text-left">
                        <span className="w-10 h-10 rounded-full bg-red-600 text-white grid place-items-center shrink-0">▶</span>
                        <div className="flex-1 min-w-0"><div className="text-sm font-medium text-navy-900">Watch {hero.name.split(" ")[0]}’s story</div><div className="text-xs text-slate-500 truncate">Video testimonial</div></div>
                        <span className="shrink-0 text-xs text-slate-400">Play</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="container-soft mt-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="text-xs font-bold tracking-widest text-sky-700">OUR TREND SETTERS</div>
            <h2 className="font-display font-bold text-2xl text-navy-900 mt-1">A legacy of success continues</h2>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="flex gap-2 overflow-auto scrollbar-none">
              {courses.map((c) => (
                <button key={c} onClick={() => setCourse(c)} className={`shrink-0 px-4 py-2 rounded-full border-2 shadow-sm text-sm font-medium transition ${course === c ? "bg-[#3e2723] text-white border-[#2b1b18]" : "bg-white border-slate-300 text-slate-600 hover:bg-slate-50"}`}>{c}</button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 card p-4 flex flex-col lg:flex-row gap-3 items-start lg:items-center justify-between">
          <div className="relative flex-1 w-full lg:max-w-[320px]">
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, role, quote…" className="w-full pl-9 pr-3 py-2.5 rounded-full border-2 border-slate-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500" />
            <span className="absolute left-3 top-2.5 text-slate-400">⌕</span>
          </div>
          <span className="hidden sm:inline-flex items-center px-3 py-2 rounded-full bg-slate-50 border-2 border-slate-300 text-xs text-slate-600">{filtered.length} stories</span>
        </div>

        {rest.length === 0 && !hero ? (
          <div className="card mt-6 p-12 text-center">
            <div className="text-sm font-semibold text-navy-900">No alumni for “{course}” {q ? `+ “${q}”` : ""}</div>
            <div className="text-sm text-slate-500 mt-1">Try All or clear search. Add new via Admin → Alumni.</div>
          </div>
        ) : rest.length > 0 ? (
          <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((a) => {
              const thumb = thumbFor(a);
              return (
                <div key={a.id} className="card overflow-hidden flex flex-col">
                  {thumb ? (
                    <div className="relative aspect-[4/3] bg-slate-100">
                      <img src={thumb} alt={a.name} loading="lazy" className="w-full h-full object-cover" />
                      {a.video && playing !== a.id && (
                        <button onClick={() => setPlaying(a.id)} aria-label={`Play ${a.name}'s video`} className="absolute inset-0 grid place-items-center bg-navy-900/25 hover:bg-navy-900/35 transition">
                          <span className="w-12 h-12 rounded-full bg-red-600 text-white grid place-items-center shadow-lg">▶</span>
                        </button>
                      )}
                      {a.featured && <span className="absolute left-3 top-3 text-xs px-2 py-1 rounded-full bg-amber-500/95 border-2 border-amber-700 text-white shadow-sm">Featured</span>}
                    </div>
                  ) : (
                    <div className="relative aspect-[4/3] bg-slate-100 grid place-items-center">
                      <span className="text-4xl font-display font-bold text-slate-400">{a.name[0]}</span>
                      {a.featured && <span className="absolute left-3 top-3 text-xs px-2 py-1 rounded-full bg-amber-500/95 border-2 border-amber-700 text-white shadow-sm">Featured</span>}
                    </div>
                  )}
                  <div className="p-5 flex flex-col flex-1">
                    <div className="text-sm font-semibold text-navy-900">{a.name}</div>
                    <div className="text-xs text-slate-500">{a.role} • {a.batch} • {a.course}</div>
                    <div className="mt-3 text-sm leading-relaxed text-slate-700 flex-1">“{a.quote}”</div>
                    {a.video && (
                      <div className="mt-4">
                        {playing === a.id ? (
                          <div className="rounded-xl overflow-hidden border-2 border-slate-200 bg-black aspect-video">
                            <iframe src={toEmbed(a.video)} title={a.name} className="w-full h-full" allow="autoplay; encrypted-media" allowFullScreen />
                          </div>
                        ) : (
                          <button onClick={() => setPlaying(a.id)} className="w-full flex items-center gap-3 p-3 rounded-xl border-2 border-slate-300 bg-slate-50 hover:bg-white hover:shadow-md transition text-left">
                            <span className="w-9 h-9 rounded-full bg-red-600 text-white grid place-items-center shrink-0">▶</span>
                            <div className="flex-1 min-w-0"><div className="text-sm font-medium text-navy-900">Watch story</div><div className="text-xs text-slate-500 truncate">Video testimonial</div></div>
                          </button>
                        )}
                      </div>
                    )}
                    <div className="mt-3 text-xs text-slate-400">{new Date(a.createdAt).toLocaleDateString("en-IN", { year: "numeric", month: "short" })} • {a.id}</div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="card mt-6 p-8 text-center text-sm text-slate-600">
            No more stories for this filter — the featured story above is the only one for “{course}”.
          </div>
        )}

        <div className="card mt-8 p-6 text-center">
          <div className="font-semibold text-navy-900">Your story next?</div>
          <div className="text-sm text-slate-600 mt-1">Join a batch, get your uniform, share your journey.</div>
          <div className="mt-4 flex gap-2 justify-center">
            <Link href="/admission" className="btn-violet">Register Online</Link>
            <Link href="/contact" className="btn-ghost">Visit Campus</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
