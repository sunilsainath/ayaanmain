"use client";
import PageHero from "@/components/PageHero";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FALLBACK_BRANCHES, detailsFor, type Branch } from "@/lib/branchInfo";
import { GALLERY } from "@/lib/gallery";

const DIRECTOR_CREDENTIALS = [
  "PC — 2004",
  "SI — 2009 State Topper",
  "NSG — 2013",
  "Indian Navy Officer",
  "International Athlete",
  "Ex-Police",
];

const PILLARS = [
  {
    n: "01",
    t: "Mission",
    d: "Stand by unemployed youth with high-standard written and physical coaching, so every aspirant becomes a strong competitor for their dream government job.",
    border: "border-t-navy-800",
    chip: "bg-navy-800 text-white",
    label: "text-navy-800",
  },
  {
    n: "02",
    t: "Vision",
    d: "Evidence-based academic coaching and physical training where every aspirant gains confidence and a proven, repeatable preparation strategy.",
    border: "border-t-violet-500",
    chip: "bg-violet-100 text-violet-700",
    label: "text-violet-700",
  },
  {
    n: "03",
    t: "Values",
    d: "We value desire. We teach, assess and mentor — till the goal is achieved. Discipline, empathy and results, in that order.",
    border: "border-t-emerald-500",
    chip: "bg-emerald-100 text-emerald-700",
    label: "text-emerald-700",
  },
];

export default function AboutPage() {
  const [branches, setBranches] = useState<Branch[]>(FALLBACK_BRANCHES);
  useEffect(() => {
    fetch("/api/branches", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => Array.isArray(d) && d.length > 0 && setBranches(d))
      .catch(() => {});
  }, []);
  return (
    <div className="bg-[#fcfcfd]">
      <PageHero
        eyebrow="About • Estd. 2016"
        title="Ayaan Group of Institutions"
        crumbs={[{ label: "About Us" }]}
        subtitle="Home of Ayaan Police Academy — built for the aspirant who has desire but needs the right guidance. Academic coaching + physical training, discipline + care."
      />

      <section className="container-soft mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {PILLARS.map((x) => (
            <div key={x.n} className={`card p-6 border-t-4 ${x.border}`}>
              <div className="flex items-center gap-3">
                <span className={`w-9 h-9 rounded-xl grid place-items-center text-xs font-bold ${x.chip}`}>{x.n}</span>
                <div className={`text-xs font-bold tracking-widest uppercase ${x.label}`}>{x.t}</div>
              </div>
              <div className="mt-3 text-sm leading-relaxed text-slate-700">{x.d}</div>
            </div>
          ))}
        </div>

        <div className="card mt-6 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-5 relative bg-gradient-to-br from-navy-900 via-navy-800 to-slate-900 text-white p-8 min-h-[380px] flex flex-col justify-between overflow-hidden">
              <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-white/5" aria-hidden />
              <div className="absolute -bottom-20 -left-10 w-64 h-64 rounded-full bg-white/5" aria-hidden />
              <div className="relative">
                <div className="text-[11px] tracking-[0.2em] font-semibold text-sky-300 uppercase">Director — Ayaan Police Academy</div>
                <div className="mt-6 w-28 h-28 rounded-full bg-white/10 border border-white/20 grid place-items-center">
                  <span className="font-display text-3xl font-bold tracking-wide">MA</span>
                </div>
                <div className="mt-5 font-display text-2xl font-bold">Dr. Md Anwar</div>
                <div className="text-sm text-white/70">Director, Ayaan Police Academy</div>
              </div>
              <div className="relative mt-6 flex flex-wrap gap-1.5 text-[11px]">
                {DIRECTOR_CREDENTIALS.map((c) => (
                  <span key={c} className="px-2.5 py-1 rounded-full bg-white/10 border border-white/20 text-white/90">{c}</span>
                ))}
              </div>
            </div>
            <div className="lg:col-span-7 p-8">
              <div className="badge bg-slate-50 border-slate-200 text-slate-700">DIRECTOR MESSAGE</div>
              <h2 className="mt-3 font-display font-bold text-xl sm:text-2xl text-navy-900">A message from Dr. Md Anwar</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                “I started as a Police Constable in 2004 and stood first in the state for Sub-Inspector in 2009.
                Service in the NSG in 2013, an officer&apos;s role in the Indian Navy and competing as an international
                athlete taught me the same lesson: selection is not luck — it is a system followed daily.”
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                “At Ayaan, academic classes and ground training are planned together. Senior faculty handle the
                written syllabus, daily tests and doubt sessions. I personally lead physical training because
                physical is not practice — it is preparation. I know what it feels like to wait for that one
                government job. We built Ayaan so that no aspirant fights alone.”
              </p>
              <div className="mt-5">
                <div className="text-xs font-bold tracking-widest text-slate-500">GOVERNMENT JOB ACHIEVER • EX-POLICE</div>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {DIRECTOR_CREDENTIALS.map((c) => (
                    <div key={c} className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-700">
                      <span className="w-4 h-4 rounded-full bg-emerald-600 text-white grid place-items-center text-[10px]">✓</span>
                      {c}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/academy" className="btn-primary !py-2.5">See Academy</Link>
                <Link href="/contact" className="btn-ghost !py-2.5">Talk to Dr. Md Anwar&apos;s Team</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid lg:grid-cols-2 gap-4">
          <div className="card p-6">
            <div className="font-semibold text-navy-900">Facilities</div>
            <ul className="mt-3 grid gap-2 text-sm text-slate-600">
              <li>• 25-acre residential campus • Boys/Girls hostels</li>
              <li>• 3-Level Grounds • Gym • 24×7 Library & Study Hall</li>
              <li>• Classroom • Mess (hygienic, dietary: eggs, milk, ragi malt) • Canteen</li>
              <li>• Indoor / Outdoor training blocks</li>
            </ul>
          </div>
          <div className="card p-6">
            <div className="flex items-center justify-between gap-3">
              <div className="font-semibold text-navy-900">Gallery & Awards</div>
              <Link href="/gallery" className="text-xs font-medium text-navy-800 hover:underline">View gallery →</Link>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {GALLERY.filter((g) => g.category === "Campus Life").slice(0, 6).map((g) => (
                <Link key={g.src} href="/gallery" className="relative aspect-square rounded-xl overflow-hidden border border-slate-200 group">
                  <img src={g.src} alt={g.alt} loading="lazy" className="w-full h-full object-cover transition duration-500 group-hover:scale-105" />
                </Link>
              ))}
            </div>
            <div className="mt-4 text-xs text-slate-500">Police Medals • NSG Championship • National Awards — displayed at campus. Tap a photo to see the full gallery.</div>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="text-xs tracking-widest font-semibold text-sky-700">OUR INSTITUTES</div>
              <h2 className="font-display font-bold text-2xl text-navy-900 mt-1">Visit an Ayaan Institute near you</h2>
              <p className="text-sm text-slate-600 mt-1">Get directions, branch details and timings — or call admissions before you visit.</p>
            </div>
            <span className="hidden sm:inline-flex px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs text-slate-600">{branches.length} Ayaan institutes</span>
          </div>
          <div className="mt-4 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {branches.map((b) => {
              const q = encodeURIComponent(`${b.name}, ${b.address}`);
              const info = detailsFor(b);
              return (
                <div key={b.id} className="card overflow-hidden flex flex-col">
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="font-semibold text-navy-900">{b.name}</div>
                    <div className="text-sm text-slate-600 mt-2 leading-relaxed">{b.address}</div>
                    <div className="mt-3 text-sm text-slate-600 leading-relaxed">{info.about}</div>
                    <div className="mt-3 flex flex-wrap gap-1.5 text-[11px]">
                      <span className="px-2 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800">{info.timings}</span>
                      {info.tags.map((t) => (
                        <span key={t} className="px-2 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-600">{t}</span>
                      ))}
                    </div>
                    {b.phone && <a href={`tel:${b.phone.replace(/\s/g, "")}`} className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-navy-900">☎ {b.phone}</a>}
                    <div className="mt-3 flex flex-wrap gap-2">
                      <a href={`https://www.google.com/maps/search/?api=1&query=${q}`} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-full bg-navy-900 text-white text-xs font-medium hover:bg-navy-800">Get Directions →</a>
                      {b.phone && <a href={`https://api.whatsapp.com/send?phone=918886667222&text=${encodeURIComponent(`Hi, I want details about the ${b.name} institute`)}`} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-full border border-slate-200 text-xs font-medium hover:bg-slate-50">WhatsApp</a>}
                    </div>
                  </div>
                  <div className="border-t border-slate-100">
                    <iframe
                      title={`Map — ${b.name}`}
                      src={`https://www.google.com/maps?q=${q}&output=embed`}
                      className="w-full h-52 border-0"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      allowFullScreen
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
