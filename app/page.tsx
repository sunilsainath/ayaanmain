"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AYAAN_APP_URL, AYAAN_PRO_FITNESS_APP_URL } from "@/lib/appConfig";
import { DUMMY, dummyForCourse } from "@/lib/dummyImages";
import { courseDetails as fallbackDetails } from "@/data/courseDetails";
import FloatingParticles, { SectionDivider } from "@/components/deco/AnimatedElements";
import { PoliceSilhouetteLarge } from "@/components/deco/PoliceSilhouette";
import { ArmySilhouetteLarge } from "@/components/deco/ArmySilhouette";
import { GovtSilhouetteLarge } from "@/components/deco/GovtSilhouette";
import HeroCarousel from "@/components/HeroCarousel";
import GalleryGrid from "@/components/GalleryGrid";
import { HOME_GALLERY } from "@/lib/gallery";
import AnimatedNumber from "@/components/AnimatedNumber";

// Same image source as the Courses page: Admin-managed course images
// (seeded into courseDetails) with the shared dummy fallback.
const courseImg = (slug: string) =>
  (fallbackDetails as readonly { slug: string; image?: string }[]).find((c) => c.slug === slug)?.image || dummyForCourse(slug);

const LEVEL_IMAGES: Record<1 | 2 | 3, string> = {
  1: "/images/level1.png",
  2: "/images/level2.png",
  3: "/images/level3.png",
};

const coursesData = [
  { id: 1, slug: "si-pc", title: "SI PC", tag: "SI PC", meta: "Sub-Inspector + Constable • One Track", desc: "SI Sub-Inspector and Police Constable (PC) together — full written syllabus, daily tests and ground physical training.", points: ["Both SI & PC syllabus", "1600m, long jump, high jump", "Weekly grands + explanation", "Director-led ground training"], popular: true, image: courseImg("si-pc") },
  { id: 3, slug: "groups", title: "Groups — 1 / 2 / 3 / 4", tag: "GROUPS", meta: "State Services", desc: "Updated content + current affairs focus.", points: ["Grand tests & analysis", "Paper discussions", "Interview guidance"], popular: false, image: courseImg("groups") },
  { id: 4, slug: "ssc-gd", title: "SSC GD", tag: "SSC", meta: "Central Armed Forces", desc: "Central forces — written + physical.", points: ["Hindi/English support", "Full mocks", "Physical at L1-L3"], popular: false, image: courseImg("ssc-gd") },
  { id: 5, slug: "army", title: "Army / Navy / Airforce", tag: "DEFENCE", meta: "Defence Entry", desc: "Written, medical, physical guidance.", points: ["Ground practice 3 levels", "Medical tips", "3000+ placed"], popular: false, image: courseImg("army") },
  { id: 7, slug: "online", title: "Online Batches", tag: "ONLINE", meta: "Live + Recorded", desc: "Forward/reverse unlimited, offline download.", points: ["Same offline faculty", "Unlimited rewatch", "Since 2018"], popular: false, image: courseImg("online") },
];

export default function Home() {
  const [goal, setGoal] = useState("SI PC");
  const [mode, setMode] = useState("Residential");
  const finderText = useMemo(() => {
    const map: Record<string, string> = { "SI PC": "SI PC", Groups: "Groups", "SSC GD": "SSC GD", Army: "Army/Navy/Airforce" };
    return `${map[goal] ?? goal} • ${mode}`;
  }, [goal, mode]);

  const [batches, setBatches] = useState<any[]>([]);
  useEffect(() => {
    fetch("/api/batches").then((r) => r.json()).then((d) => Array.isArray(d) && setBatches(d)).catch(() => {});
  }, []);
  const matchingBatches = useMemo(() => {
    if (!batches.length) return [];
    const goalKey = goal.toLowerCase();
    return batches.filter((b) => {
      if (b.status === "closed") return false;
      const c = String(b.course || "").toLowerCase();
      const mo = String(b.mode || "").toLowerCase();
      // "SI PC" is one course covering both, so a batch filed as SI, PC or SI PC matches it.
      const goalAliases: Record<string, string[]> = {
        "si pc": ["si", "pc", "s ipc", "sipc"],
        army: ["army", "defence", "navy", "airforce"],
        groups: ["group", "groups"],
        "ssc gd": ["ssc", "gd"],
      };
      const aliases = goalAliases[goalKey] || [goalKey.split(" ")[0]];
      const goalMatch = aliases.some((a) => c.includes(a));
      const modeMatch = mo === mode.toLowerCase();
      return goalMatch && modeMatch;
    });
  }, [batches, goal, mode]);
  const hasActive = matchingBatches.length > 0;

  const [activeTag, setActiveTag] = useState("ALL");
  const [search, setSearch] = useState("");
  const filteredCourses = useMemo(() => {
    return coursesData.filter((c) => {
      const tagOk = activeTag === "ALL" || c.tag === activeTag;
      const searchOk = search.trim() === "" || c.title.toLowerCase().includes(search.toLowerCase()) || c.desc.toLowerCase().includes(search.toLowerCase());
      return tagOk && searchOk;
    });
  }, [activeTag, search]);

  const [level, setLevel] = useState<1 | 2 | 3>(1);
  const [tIdx, setTIdx] = useState(0);
  const testimonials = [
    { name: "Sai Kumari", role: "Constable — 1st attempt", quote: "No pain, no gain. From day 1, physical + study. Top marks, got the job." },
    { name: "Sai Prasanna", role: "SI Aspirant", quote: "Theory + ground practice both. Under Dr. Md Anwar guidance most of us achieved our goal." },
    { name: "T. Sai Charan", role: "Constable", quote: "Failure is stepping stone. Faculty + Dr. Md Anwar relation is very cordial." },
    { name: "Naresh", role: "Auto driver → Constable", quote: "Desire is powerful. Economically low, got placed in 1st attempt." },
    { name: "Priya", role: "SSC GD", quote: "Online live + offline download saved me. Same faculty as offline." },
  ];
  useEffect(() => {
    const id = setInterval(() => setTIdx((i) => (i + 1) % testimonials.length), 4000);
    return () => clearInterval(id);
  }, [testimonials.length]);

  const [campus, setCampus] = useState(0);
  const campuses = [
    { title: "Warangal — Residential Academy", addr: "Don Bosco School, Opp. Vaagdevi College, Bollikunta, Warangal 506005", ph: "+91 88866 67222", note: "25 acres • Classroom + Grounds + Hostel within 100m" },
    { title: "Hanamkonda", addr: "2nd Floor, Kishanpura, Mayuri Mall, Hanamkonda, Warangal 506001", ph: "+91 88866 67222", note: "Day-scholar • Hostel available" },
    { title: "Hyderabad — Dilsukhnagar", addr: "Chenna Complex, Pillar 1542, Near Metro, Dilsukhnagar, Hyderabad", ph: "+91 88866 67222", note: "Heart of city • Telugu & English" },
  ];

  // Join modal (name + mobile -> admin leads)
  const [showJoin, setShowJoin] = useState(false);
  const [joinName, setJoinName] = useState("");
  const [joinPhone, setJoinPhone] = useState("");
  const [joinSending, setJoinSending] = useState(false);
  const [joinError, setJoinError] = useState("");
  const [joinDone, setJoinDone] = useState(false);
  const openJoin = () => { setJoinError(""); setJoinDone(false); setShowJoin(true); };
  const submitJoin = async () => {
    setJoinError("");
    if (!joinName.trim()) return setJoinError("Name required");
    if (!/^[0-9]{10}$/.test(joinPhone.trim())) return setJoinError("Valid 10-digit mobile required");
    setJoinSending(true);
    const r = await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: joinName.trim(), phone: joinPhone.trim(), course: goal, mode, batchId: hasActive ? matchingBatches[0].id : null }) });
    const d = await r.json();
    setJoinSending(false);
    if (r.ok) { setJoinDone(true); setJoinName(""); setJoinPhone(""); setTimeout(() => setShowJoin(false), 2000); }
    else setJoinError(d.error || "Failed");
  };

    return (
    <div className="bg-[#fcfcfd] pb-20 lg:pb-0">
      {/* Full-screen carousel — fits viewport with police & course imagery */}
      <HeroCarousel />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-white" />
        <div className="absolute -top-32 -right-32 w-[680px] h-[680px] rounded-full bg-sky-50 blur-3xl opacity-70 pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-[560px] h-[560px] rounded-full bg-amber-50 blur-3xl opacity-60 pointer-events-none" />
        <FloatingParticles count={8} />
        <div className="absolute top-1/4 -right-20 opacity-5 pointer-events-none hidden lg:block"><PoliceSilhouetteLarge color="#0ea5e9" /></div>
        <div className="absolute bottom-1/4 -left-20 opacity-5 pointer-events-none hidden lg:block"><ArmySilhouetteLarge color="#f59e0b" /></div>
        <div className="container-soft relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 lg:pt-12 pb-8 items-start">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-xs font-medium text-slate-700">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                India&apos;s First Residential Campus for Uniform Jobs
                <span className="hidden sm:inline text-slate-300">•</span>
                <span className="hidden sm:inline text-navy-800 font-semibold">Estd. 2016 • 4.7★</span>
              </div>
              <h1 className="mt-6 font-display font-bold tracking-tight text-navy-900 leading-[0.95] text-[36px] sm:text-[48px] lg:text-[54px]">
                Get your
                <span className="block text-slate-400 font-light">dream uniform.</span>
                <span className="block relative inline-block">We&apos;ll get you there.<span className="absolute left-0 -bottom-2 w-full h-2 bg-amber-200/60 -z-10 hidden lg:block" /></span>
              </h1>
              <p className="mt-5 text-[16px] sm:text-[17px] leading-relaxed text-slate-600 max-w-[560px]">Written + Physical coaching under one roof. Senior faculty for written. Physical by <span className="font-semibold text-navy-800">Dr. Md Anwar</span> — Ex-Police, SI State Topper ’09, NSG 2013, Indian Navy Officer, International Athlete.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/contact" className="btn-primary shadow-sm hover:shadow-md">Book Free Counselling →</Link>
                <Link href="/academy" className="btn-ghost">Explore Residential Campus</Link>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-3 text-xs">
                <span className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800">✓ 4.7★ • 100+ reviews</span>
                <span className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white border border-slate-200 text-slate-700">✓ Offline • Residential • Online</span>
                <span className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-sky-50 border border-sky-200 text-sky-800">✓ Telugu & English</span>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-3 max-w-[520px]">
                <div className="card p-3 sm:p-4 interactive-card"><div className="text-lg sm:text-xl font-bold text-navy-900"><AnimatedNumber value={9} suffix="+" /></div><div className="text-xs font-semibold tracking-wide text-slate-700">Years</div><div className="text-xs text-slate-500">Proven methods</div></div>
                <div className="card p-3 sm:p-4 interactive-card"><div className="text-lg sm:text-xl font-bold text-navy-900"><AnimatedNumber value={5000} suffix="+" /></div><div className="text-xs font-semibold tracking-wide text-slate-700">Selections</div><div className="text-xs text-slate-500">SI • Constable • Army</div></div>
                <div className="card p-3 sm:p-4 interactive-card"><div className="text-lg sm:text-xl font-bold text-navy-900"><AnimatedNumber value={25} suffix=" Acres" /></div><div className="text-xs font-semibold tracking-wide text-slate-700">Campus</div><div className="text-xs text-slate-500">Grounds + Hostel</div></div>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div id="find-batch" className="card overflow-hidden p-2 shadow-soft scroll-mt-24">
                <div className="rounded-2xl bg-slate-900 text-white p-1">
                  <div className="rounded-[14px] bg-white text-slate-900 p-5">
                    <div className="flex items-center justify-between"><div className="text-sm font-semibold text-navy-900">Find your batch</div><span className="text-xs px-2 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800">Interactive</span></div>
                    <div className="mt-4 grid gap-3">
                      <div><label className="text-xs font-medium text-slate-600">Goal</label><div className="mt-1 grid grid-cols-3 gap-2">{["SI PC", "Groups", "SSC GD", "Army"].map((g) => (<button key={g} onClick={() => setGoal(g)} className={`px-3 py-2.5 rounded-xl border-2 shadow-sm text-sm font-medium transition ${goal === g ? "bg-[#3e2723] text-white border-[#2b1b18] shadow-sm" : "bg-white border-slate-200 hover:bg-slate-50 text-slate-700"}`}>{g}</button>))}</div></div>
                      <div className="grid grid-cols-1 gap-3"><div><label className="text-xs font-medium text-slate-600">Mode</label><select value={mode} onChange={(e) => setMode(e.target.value)} className="mt-1 w-full py-2.5 px-3 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"><option>Residential</option><option>Offline</option><option>Online</option></select></div></div>
                      <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 flex items-center justify-between"><div><div className="text-xs text-slate-500">You selected</div><div className="text-sm font-semibold text-navy-900">{finderText}</div></div><span className={`w-8 h-8 rounded-full border grid place-items-center text-xs font-bold ${hasActive ? "bg-emerald-500 text-white border-emerald-500" : "bg-white border-slate-200"}`}>{hasActive ? "✓" : "•"}</span></div>
                      {hasActive ? (<div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3"><div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" /><span className="text-xs font-bold tracking-wide text-emerald-800 uppercase">Active Batch Available</span><span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-white border border-emerald-200 text-emerald-700">{matchingBatches[0].seats - matchingBatches[0].filled} seats left</span></div><div className="mt-2 text-sm font-semibold text-navy-900">{matchingBatches[0].course} • {matchingBatches[0].mode}</div><div className="mt-1 flex flex-wrap gap-1.5 text-xs"><span className="px-2 py-1 rounded-full bg-white border border-emerald-200 text-slate-700">Starts {new Date(matchingBatches[0].startDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span><span className="px-2 py-1 rounded-full bg-white border border-slate-200 text-slate-600">{matchingBatches[0].duration}</span><span className="px-2 py-1 rounded-full bg-navy-900 text-white">{matchingBatches[0].mode}</span></div>{matchingBatches[0].note && <div className="mt-2 text-xs text-slate-600">{matchingBatches[0].note}</div>}{matchingBatches.length > 1 && <div className="mt-1 text-xs text-emerald-700">+{matchingBatches.length - 1} more batch(es) for this combo</div>}</div>) : batches.length > 0 ? (<div className="rounded-xl border border-amber-200 bg-amber-50 p-3"><div className="text-xs font-semibold text-amber-800">No active batch for this exact combo</div><div className="text-xs text-slate-600 mt-1">Closest: {batches.filter((b) => b.status !== "closed")[0]?.course} • {batches.filter((b) => b.status !== "closed")[0]?.mode} — {batches[0] ? new Date(batches[0].startDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" }) : ""}</div><div className="text-xs text-slate-500 mt-1">Enquire — we’ll open a batch on demand or suggest closest.</div></div>) : (<div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center"><div className="text-xs text-slate-500">Loading batches…</div></div>)}
                      <button onClick={openJoin} className={`w-full justify-center !py-3 text-[15px] hover:shadow-md inline-flex items-center gap-2 rounded-full font-medium transition ${hasActive ? "bg-[#6b1def] hover:bg-[#5b18bd] text-white px-6" : "bg-[#3e2723] text-white hover:bg-[#4a2f2a] px-6"}`}>{hasActive ? `Join ${matchingBatches[0].course} — ${new Date(matchingBatches[0].startDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })} →` : `Enquire for ${goal} →`}</button>
                      <div className="text-center text-xs text-slate-500">{hasActive ? `${matchingBatches[0].filled}/${matchingBatches[0].seats} filled • Free demo available` : `${batches.filter((b) => b.status !== "closed").length} active batches overall • Free counselling`}</div>
                      <div className="flex gap-2 text-xs"><a href="tel:+918886667222" className="flex-1 py-2.5 rounded-xl border border-slate-200 bg-white grid place-items-center font-medium hover:bg-slate-50">Call Advisor</a><a href="https://api.whatsapp.com/send?phone=918886667222" target="_blank" className="flex-1 py-2.5 rounded-xl bg-[#25D366] text-white grid place-items-center font-medium hover:bg-[#1fb255]">WhatsApp</a></div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 divide-x divide-slate-100 mt-2 text-center"><div className="py-3"><div className="text-sm font-bold text-navy-900">Daily</div><div className="text-xs text-slate-500">Practice Tests</div></div><div className="py-3"><div className="text-sm font-bold text-navy-900">Weekly</div><div className="text-xs text-slate-500">Grand Tests</div></div><div className="py-3"><div className="text-sm font-bold text-navy-900">24×7</div><div className="text-xs text-slate-500">Doubts & Library</div></div></div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2 justify-center text-xs text-slate-500"><span className="px-3 py-1.5 rounded-full bg-white border border-slate-200">Hyderabad • Warangal • Hanamkonda</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* Director message */}
      <section className="container-soft mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
          <div className="lg:col-span-7">
            <div className="text-xs font-bold tracking-widest text-sky-700">DIRECTOR MESSAGE</div>
            <h2 className="mt-3 font-display font-bold text-2xl sm:text-3xl text-navy-900 leading-tight">
              A message from Dr. Md Anwar
            </h2>
            <p className="mt-4 text-sm sm:text-[15px] leading-relaxed text-slate-600">
              &ldquo;I started as a Police Constable in 2004 and stood first in the state for Sub-Inspector in 2009.
              Service in the NSG in 2013, an officer&rsquo;s role in the Indian Navy and competing as an international
              athlete taught me the same lesson: selection is not luck &mdash; it is a system followed daily.&rdquo;
            </p>
            <p className="mt-3 text-sm sm:text-[15px] leading-relaxed text-slate-600">
              &ldquo;At Ayaan, academic classes and ground training are planned together. Senior faculty handle the
              written syllabus, daily tests and doubt sessions. I personally lead physical training because physical
              is not practice &mdash; it is preparation. We built Ayaan so that no aspirant fights alone.&rdquo;
            </p>
            <div className="mt-5">
              <div className="text-xs font-bold tracking-widest text-slate-500">GOVERNMENT JOB ACHIEVER &bull; EX-POLICE</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {["PC — 2004", "SI — 2009 State Topper", "NSG — 2013", "Indian Navy Officer", "International Athlete", "Ex-Police"].map((c) => (
                  <span key={c} className="px-3 py-1.5 rounded-full bg-white border-2 border-slate-300 shadow-sm text-xs font-medium text-slate-700">{c}</span>
                ))}
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <Link href="/about" className="btn-primary !py-2.5">About the institute</Link>
              <Link href="/academy" className="btn-ghost !py-2.5">Visit the campus</Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="card overflow-hidden">
              <img
                src="/team/director.jpg"
                alt="Dr. Md Anwar, Director of Ayaan Police Academy, in police uniform"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      <SectionDivider variant="zigzag" />
      <section className="container-soft mt-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="text-xs font-bold tracking-widest text-sky-700">GALLERY</div>
            <h2 className="mt-2 font-display font-bold text-2xl text-navy-900">Inside Ayaan — campus life</h2>
            <p className="mt-1 text-sm text-slate-600 max-w-2xl">Classrooms, daily tests, morning assembly and ground training. Results, awards and events are in the full gallery.</p>
          </div>
          <Link href="/gallery" className="text-sm font-medium text-navy-800 hover:underline">View full gallery →</Link>
        </div>
        <div className="mt-5">
          <GalleryGrid items={HOME_GALLERY} limit={6} showFilters={false} layout="grid" showBadges={false} />
        </div>
      </section>

      <SectionDivider variant="wave" />
      <section className="container-soft mt-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[{ title: "Residential Academy", desc: "Stay + Study + Train within 100m. 25-acre campus.", tag: "Most Popular", href: "/academy", icon: "◆" },{ title: "Offline Institutes", desc: "Favourite in TS & AP. Same faculty, hostel option.", tag: "Hyderabad • Warangal", href: "/courses", icon: "◎" },{ title: "Online Coaching", desc: "Live, unlimited rewatch, offline download.", tag: "Since 2018", href: "/courses", icon: "▶" },{ title: "Pro Fitness", desc: "Police events, strength, ABS — by Dr. Md Anwar.", tag: "India’s First", href: "#", icon: "⚡" }].map((c) => (
            <Link key={c.title} href={c.href} className="card p-6 interactive-card group flex flex-col focus-ring">
              <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 grid place-items-center group-hover:bg-navy-900 group-hover:text-white group-hover:border-navy-900 transition">{c.icon}</div>
              <div className="mt-3 text-[11px] tracking-widest font-semibold text-sky-700">{c.tag}</div>
              <div className="font-display font-bold text-navy-900 leading-tight group-hover:text-navy-800">{c.title}</div>
              <div className="mt-2 text-sm leading-relaxed text-slate-600 flex-1">{c.desc}</div>
              <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-navy-800">Explore <span className="group-hover:translate-x-1 transition">→</span></div>
            </Link>
          ))}
        </div>
      </section>

      <SectionDivider variant="mountain" />
      <section className="container-soft mt-8 relative">
        <div className="card overflow-hidden relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-5 p-6 lg:p-8">
              <div className="badge bg-sky-50 border-sky-100 text-sky-700">ACADEMICS + PHYSICAL</div>
              <h2 className="mt-4 font-display font-bold text-[26px] leading-tight text-navy-900">A system that makes you complete — in class and on the ground.</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">Academic classes, daily tests and doubt sessions run alongside three levels of physical training — one campus, one timetable.</p>
              <div className="mt-6 flex gap-2 p-1 rounded-full bg-slate-100 border-2 border-slate-300 shadow-sm w-fit">{[1, 2, 3].map((n) => (<button key={n} onClick={() => setLevel(n as 1 | 2 | 3)} className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${level === n ? "bg-[#3e2723] text-white shadow-sm" : "text-slate-600 hover:bg-white"}`}>Level {n}</button>))}</div>
              <div className="mt-5">{level === 1 && (<div><div className="font-semibold text-navy-900">Level 1 — Daily Practice</div><div className="text-sm text-slate-600 mt-1">100m / 200m / 400m track. Speed & endurance, everyday.</div></div>)}{level === 2 && (<div><div className="font-semibold text-navy-900">Level 2 — Strength</div><div className="text-sm text-slate-600 mt-1">Gym, functional, core. Build the engine for events.</div></div>)}{level === 3 && (<div><div className="font-semibold text-navy-900">Level 3 — Events</div><div className="text-sm text-slate-600 mt-1">High Jump, Long Jump, Shot-put. Sand & Mud tracks.</div></div>)}</div>
              <div className="mt-6 grid gap-2">{[{ t: "Academics by senior faculty", d: "Subject-wise classes, Telugu & English, current competition level." },{ t: "Daily tests & doubt sessions", d: "Evening test with explanation, night doubts, monthly model tests." },{ t: "Physical by Director himself", d: "International athlete, NSG champion — leads every ground session." },{ t: "Preparation by design", d: "4am study • Daily test • Night doubts • Grands" }].map((r) => (<div key={r.t} className="flex gap-3 p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition cursor-default"><span className="mt-0.5 w-6 h-6 rounded-full bg-navy-900 text-white grid place-items-center text-xs shrink-0">✓</span><div><div className="text-sm font-semibold text-navy-900">{r.t}</div><div className="text-sm text-slate-600">{r.d}</div></div></div>))}</div>
              <div className="mt-6 flex gap-3"><Link href="/academy" className="btn-primary !py-2.5">See Facilities</Link><Link href="/contact" className="btn-ghost !py-2.5">Check Fees</Link></div>
            </div>
            <div className="lg:col-span-7 bg-slate-50 p-6 lg:p-8">
              <div className="card p-2"><div className={`rounded-2xl h-[220px] border transition ${level === 1 ? "bg-sky-50 border-sky-200" : level === 2 ? "bg-amber-50 border-amber-200" : "bg-emerald-50 border-emerald-200"}`}><img src={LEVEL_IMAGES[level]} alt={`Level ${level}`} className="h-[220px] w-full rounded-lg object-contain" /></div><div className="mt-3 grid grid-cols-3 gap-2 text-center"><div className={`p-3 rounded-xl border ${level === 1 ? "bg-navy-900 text-white border-navy-900" : "bg-white border-slate-200"}`}><div className="text-xs font-bold">Level 1</div><div className="text-xs opacity-80">Track</div></div><div className={`p-3 rounded-xl border ${level === 2 ? "bg-navy-900 text-white border-navy-900" : "bg-white border-slate-200"}`}><div className="text-xs font-bold">Level 2</div><div className="text-xs opacity-80">Strength</div></div><div className={`p-3 rounded-xl border ${level === 3 ? "bg-navy-900 text-white border-navy-900" : "bg-white border-slate-200"}`}><div className="text-xs font-bold">Level 3</div><div className="text-xs opacity-80">Events</div></div></div></div>
              <div className="mt-4 grid sm:grid-cols-2 gap-4"><div className="card p-5 interactive-card"><div className="text-sm font-semibold text-navy-900">24×7 Study & Library</div><div className="text-sm text-slate-600 mt-1">Study hall + doubts always open. Dietary hostel: eggs, milk, ragi malt.</div></div><div className="card p-5 bg-navy-900 text-white border-navy-900"><div className="text-sm font-semibold">Separate Hostels</div><div className="text-sm text-white/70 mt-1">Boys & Girls blocks. Canteen, hygiene, discipline.</div><div className="mt-3 inline-flex px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs">Bollikunta • 25 Acres</div></div></div>
              <div className="mt-4 card p-5 border-sky-100 bg-sky-50/60">
                <div className="text-sm font-semibold text-navy-900">Academic training — the other half of the system</div>
                <div className="text-sm text-slate-600 mt-1">Subject-wise classes by senior faculty, chapter tests, study material and individual mentoring. Low scorers get extra sessions instead of being left behind.</div>
                <div className="mt-3 flex flex-wrap gap-1.5 text-xs"><span className="px-2 py-1 rounded-full bg-white border border-slate-200">Daily classes</span><span className="px-2 py-1 rounded-full bg-white border border-slate-200">Weekly grand tests</span><span className="px-2 py-1 rounded-full bg-white border border-slate-200">Doubt clearing</span><span className="px-2 py-1 rounded-full bg-white border border-slate-200">Telugu & English</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider variant="zigzag" />
      <section className="container-soft mt-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4"><div><h2 className="font-display font-bold text-2xl text-navy-900">Courses for every uniform.</h2><p className="text-sm text-slate-600 mt-1">Tap a filter or search — find your batch instantly.</p></div><div className="flex flex-wrap gap-2 items-center w-full sm:w-auto"><div className="relative flex-1 min-w-0 sm:flex-none"><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search SI, Constable, Groups…" className="w-full sm:w-[260px] pl-9 pr-9 py-2.5 rounded-full border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500" /><span className="absolute left-3 top-2.5 text-slate-400">⌕</span>{search && (<button onClick={() => setSearch("")} className="absolute right-2 top-1.5 w-7 h-7 rounded-full bg-slate-100 grid place-items-center text-xs">✕</button>)}</div><Link href="/courses" className="hidden sm:inline-flex btn-ghost !py-2.5">View All →</Link></div></div>
        <div className="mt-5 flex gap-2 overflow-auto scrollbar-none pb-2">{["ALL", "SI PC", "GROUPS", "SSC", "DEFENCE", "ONLINE"].map((t) => (<button key={t} onClick={() => setActiveTag(t)} className={`shrink-0 px-4 py-2 rounded-full border-2 shadow-sm text-sm font-medium transition ${activeTag === t ? "bg-[#3e2723] text-white border-[#2b1b18] shadow-sm" : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"}`}>{t}</button>))}<span className="shrink-0 px-3 py-2 text-xs text-slate-500 self-center">{filteredCourses.length} courses</span></div>
        <div className="mt-4 grid md:grid-cols-2 lg:grid-cols-3 gap-5">{filteredCourses.map((c) => (<div key={c.id} className="card overflow-hidden interactive-card group flex flex-col"><img src={c.image} alt={c.title} loading="lazy" className="w-full h-40 object-cover" onError={(e) => { (e.target as HTMLImageElement).src = dummyForCourse(c.slug); }} /><div className="p-6 flex flex-col flex-1"><div className="flex items-center justify-between"><span className="text-xs tracking-widest font-semibold text-sky-700 uppercase">{c.meta}</span>{c.popular && <span className="text-xs px-2 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800">Popular</span>}</div><div className="mt-2 font-display font-bold text-navy-900 group-hover:text-navy-800 transition">{c.title}</div><div className="text-sm text-slate-600 mt-1">{c.desc}</div><ul className="mt-3 grid gap-1.5">{c.points.map((p) => (<li key={p} className="text-sm text-slate-600 flex gap-2"><span className="text-emerald-600">•</span> {p}</li>))}</ul><div className="mt-5 flex gap-2"><Link href="/courses" className="flex-1 py-2.5 rounded-full bg-[#3e2723] text-white text-sm font-medium grid place-items-center hover:bg-[#4a2f2a] active:scale-[0.98] transition">View Details</Link><Link href="/contact" className="px-4 py-2.5 rounded-full border border-slate-200 text-sm font-medium hover:bg-slate-50 grid place-items-center">Enquire</Link></div></div></div>))}</div>
        {filteredCourses.length === 0 && (<div className="card mt-4 p-10 text-center"><div className="text-navy-900 font-semibold">No batches match “{search}” in {activeTag}</div><div className="text-sm text-slate-500 mt-1">Try “SI” or switch to ALL. Or talk to an advisor — we’ll guide you in 2 mins.</div><button onClick={() => { setSearch(""); setActiveTag("ALL"); }} className="mt-4 btn-ghost !py-2.5">Clear filters</button></div>)}
      </section>

      <SectionDivider variant="mountain" />
      <section className="mt-8 bg-maroon-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, #fff 1px, transparent 1px)", backgroundSize: "22px 22px" }} aria-hidden />
        <div className="container-soft relative py-10">
          <div className="flex items-end justify-between gap-4"><div><div className="text-xs font-bold tracking-widest text-amber-300">TESTIMONIALS</div><h3 className="font-display font-bold text-2xl mt-1">What toppers say.</h3></div><div className="hidden sm:flex gap-2"><button onClick={() => setTIdx((i) => (i - 1 + testimonials.length) % testimonials.length)} className="w-9 h-9 rounded-full border-2 border-white/40 bg-white/10 shadow-sm grid place-items-center hover:bg-white/20">←</button><button onClick={() => setTIdx((i) => (i + 1) % testimonials.length)} className="w-9 h-9 rounded-full bg-white text-maroon-900 shadow-md grid place-items-center hover:bg-white/90">→</button></div></div>
          <div className="mt-6 relative overflow-hidden"><div className="grid grid-cols-1 md:grid-cols-3 gap-5">{[0, 1, 2].map((off) => { const t = testimonials[(tIdx + off) % testimonials.length]; const isCenter = off === 1; return (<div key={t.name + off} className={`card p-6 transition-all duration-300 ${isCenter ? "md:scale-[1.02] shadow-soft border-slate-200" : "opacity-95"}`}><div className="w-10 h-10 rounded-full bg-slate-100 grid place-items-center">▶</div><div className="mt-3 text-sm leading-relaxed text-slate-700">“{t.quote}”</div><div className="mt-4 flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-maroon-800 text-white grid place-items-center text-xs">{t.name[0]}</div><div><div className="text-sm font-semibold text-navy-900">{t.name}</div><div className="text-xs text-slate-500">{t.role}</div></div></div></div>); })}</div><div className="mt-4 flex items-center justify-center gap-2">{testimonials.map((_, i) => (<button key={i} onClick={() => setTIdx(i)} className={`h-1.5 rounded-full transition-all ${i === tIdx ? "w-8 bg-amber-300" : "w-1.5 bg-white/40 hover:bg-white/60"}`} aria-label={`Go to ${i + 1}`} />))}</div></div>
        </div>
      </section>

      <SectionDivider variant="zigzag" />
      <section className="container-soft mt-8 relative">
        <div className="absolute -top-10 -right-10 opacity-10 hidden lg:block pointer-events-none"><GovtSilhouetteLarge color="#ffffff" /></div>
        <div className="rounded-3xl bg-navy-900 text-white p-6 lg:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="flex gap-4"><div className="hidden sm:grid w-12 h-12 rounded-2xl bg-white/10 border border-white/20 place-items-center">◍</div><div><div className="text-sm tracking-widest font-semibold text-sky-300">GET THE APP • 50K+ DOWNLOADS</div><div className="font-display font-bold text-xl lg:text-2xl">Your preparation, in your pocket.</div><div className="text-white/70 text-sm mt-1">Ayaan Institutions • Pro Fitness — offline download, unlimited rewatch.</div></div></div>
          <div className="flex flex-wrap gap-3 w-full lg:w-auto"><a href={AYAAN_APP_URL} target="_blank" className="flex-1 lg:flex-none px-6 py-3 rounded-full bg-white text-navy-900 text-sm font-semibold grid place-items-center hover:bg-slate-100">Download Institutions</a><a href={AYAAN_PRO_FITNESS_APP_URL} target="_blank" className="flex-1 lg:flex-none px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white text-sm font-semibold grid place-items-center hover:bg-white/15">Pro Fitness App</a></div>
        </div>
      </section>

      <SectionDivider variant="wave" />
      <section className="container-soft mt-8 mb-8">
        <div className="flex items-center justify-between"><h3 className="font-display font-bold text-xl text-navy-900">Visit an Ayaan Institute near you</h3><span className="text-xs px-3 py-1.5 rounded-full bg-white border border-slate-200">3 institutes • Open 9am – 8pm</span></div>
        <div className="mt-4 flex gap-2 overflow-auto scrollbar-none pb-2">{campuses.map((c, idx) => (<button key={c.title} onClick={() => setCampus(idx)} className={`shrink-0 px-4 py-2 rounded-full border text-sm font-medium transition ${campus === idx ? "bg-[#3e2723] text-white border-[#2b1b18] shadow-sm" : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"}`}>{c.title.split("—")[0].trim()}</button>))}</div>
        <div className="card overflow-hidden"><div className="grid grid-cols-1 lg:grid-cols-12"><div className="lg:col-span-5 p-6"><div className="text-sm font-semibold text-navy-900">{campuses[campus].title}</div><div className="mt-2 text-sm leading-relaxed text-slate-600">{campuses[campus].addr}</div><div className="mt-3 inline-flex px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs text-slate-700">{campuses[campus].note}</div><div className="mt-4 flex gap-2"><a href="tel:+918886667222" className="flex-1 py-2.5 rounded-full bg-[#3e2723] text-white text-sm font-medium grid place-items-center hover:bg-[#4a2f2a]">{campuses[campus].ph} →</a><a href="https://api.whatsapp.com/send?phone=918886667222" target="_blank" className="px-5 py-2.5 rounded-full border border-slate-200 text-sm font-medium hover:bg-slate-50 grid place-items-center">WhatsApp</a></div><div className="mt-3"><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${campuses[campus].title}, ${campuses[campus].addr}`)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-navy-800 hover:underline">Get Directions →</a></div><div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-500"><span className="px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800">Open daily 9am – 8pm</span><span className="px-3 py-1.5 rounded-full bg-white border border-slate-200">Free parking</span></div></div><div className="lg:col-span-7 bg-slate-100 min-h-[260px] border-t lg:border-t-0 lg:border-l border-slate-200 grid place-items-center p-4"><div className="w-full h-[220px] rounded-2xl bg-white border border-slate-200 grid place-items-center text-sm text-slate-500 relative overflow-hidden"><div className="absolute inset-0 opacity-40" style={{ backgroundImage: `linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)`, backgroundSize: "20px 20px" }} /><div className="relative text-center"><div className="w-12 h-12 rounded-full bg-navy-900 text-white grid place-items-center mx-auto">📍</div><div className="mt-2 font-medium text-navy-900">{campuses[campus].title}</div><div className="text-xs text-slate-500">Map Preview • Tap to open in Google Maps</div></div></div></div></div></div>
      </section>

      {showJoin && (
        <div className="fixed inset-0 z-[70] bg-slate-900/40 backdrop-blur-sm p-4 grid place-items-center" onClick={() => setShowJoin(false)}>
          <div className="card w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-lg text-navy-900">Join {goal} —  • {mode}</h3>
              <button onClick={() => setShowJoin(false)} className="w-8 h-8 rounded-full bg-slate-100 grid place-items-center hover:bg-slate-200">✕</button>
            </div>
            <p className="text-sm text-slate-600 mt-1">Enter your details — we’ll call you for batch confirmation. Stored in admin portal.</p>
            {hasActive && <div className="mt-3 text-xs px-3 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800">Active batch: {matchingBatches[0].course} • Starts {new Date(matchingBatches[0].startDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })} • {matchingBatches[0].seats - matchingBatches[0].filled} seats left</div>}
            <div className="mt-4 grid gap-3">
              <div>
                <label className="text-xs font-medium text-slate-700">Name *</label>
                <input value={joinName} onChange={(e) => setJoinName(e.target.value)} placeholder="Your full name" className="mt-1 w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500" />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-700">Mobile Number * (10 digits)</label>
                <input value={joinPhone} onChange={(e) => setJoinPhone(e.target.value)} placeholder="9876543210" inputMode="numeric" maxLength={10} className="mt-1 w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500" />
              </div>
              {joinError && <div className="text-sm text-red-700 bg-red-50 border border-red-200 px-3 py-2 rounded-xl">{joinError}</div>}
              {joinDone && <div className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-xl">✓ Saved! We’ll contact you shortly. Check admin → Leads.</div>}
              <div className="flex gap-2">
                <button onClick={() => setShowJoin(false)} className="flex-1 py-2.5 rounded-full border border-slate-200 bg-white text-sm font-medium hover:bg-slate-50">Cancel</button>
                <button onClick={submitJoin} disabled={joinSending} className="flex-1 py-2.5 rounded-full bg-[#3e2723] text-white text-sm font-medium hover:bg-[#4a2f2a] disabled:opacity-50">{joinSending ? "Saving…" : joinDone ? "Saved ✓" : "Submit →"}</button>
              </div>
              <div className="text-xs text-slate-400 text-center">By joining, you agree to be contacted for counselling.</div>
            </div>
          </div>
        </div>
      )}

      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t-2 border-slate-300 shadow-[0_-6px_18px_rgba(15,36,71,0.12)] p-3 flex gap-2"><a href="tel:+918886667222" className="flex-1 py-3 rounded-full border-2 border-slate-300 shadow-sm grid place-items-center text-sm font-medium">Call</a><a href="https://api.whatsapp.com/send?phone=918886667222" target="_blank" className="flex-1 py-3 rounded-full bg-[#25D366] border-2 border-[#1ba94f] shadow-sm text-white grid place-items-center text-sm font-medium">WhatsApp</a><Link href="/contact" className="flex-1 py-3 rounded-full bg-navy-900 border-2 border-navy-900 shadow-sm text-white grid place-items-center text-sm font-medium">Enquire →</Link></div>
    </div>
  );
}
