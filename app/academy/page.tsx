import PageHero from "@/components/PageHero";
import Link from "next/link";
import { ASPIRANT_GALLERY } from "@/lib/aspirantImages";

const EXAM_LINKS = [
  { title: "Sub-Inspector of Police", desc: "Eligibility, written syllabus and physical standards for SI.", href: "/courses" },
  { title: "Constable", desc: "PC notification, written rounds and the 1600m / field events.", href: "/courses" },
  { title: "Army", desc: "Agniveer and Army GD — written, physical and medical guidance.", href: "/courses" },
  { title: "SSC GD", desc: "Central armed forces — full syllabus, mocks and physical practice.", href: "/courses" },
  { title: "Group 1", desc: "State services prelims, mains and interview preparation.", href: "/courses" },
  { title: "Group 2", desc: "Subject-wise classes, current affairs and grand tests.", href: "/courses" },
  { title: "Group 3", desc: "Syllabus coverage, revision plan and model tests.", href: "/courses" },
];

const ACADEMIC_TRAINING = [
  { t: "Daily subject classes", d: "Senior faculty cover the full syllabus in Telugu and English, updated to the current notification." },
  { t: "Study material & previous papers", d: "Printed and digital notes, chapter-wise material and solved previous question papers." },
  { t: "Test cycle", d: "Daily practice test, weekly grand test and monthly model test — every paper followed by explanation." },
  { t: "Doubt clearing & mentoring", d: "Night doubt sessions, individual score reviews and extra classes for low scorers." },
  { t: "Current affairs & revision", d: "Daily current affairs, monthly compilations and structured revision before the exam." },
  { t: "Answer writing", d: "Descriptive answer practice for Groups and UPSC, reviewed by faculty." },
];

export default function AcademyPage() {
  return (
    <div className="bg-[#fcfcfd]">
      <PageHero
        eyebrow="Aspirant Corner • Residential • India's First"
        title="Aspirant Corner — Ayaan Police Academy"
        crumbs={[{ label: "Aspirant Corner" }]}
        subtitle="Own campus — classroom, grounds and hostel within 100m. Academic classes by senior faculty. Physical training by the Director himself. Your dedicated space for preparation strategy, facilities & hostel life."
        actions={
          <>
            <Link href="/admission" className="px-6 py-3 rounded-full bg-white text-navy-900 text-sm font-semibold">Register Now</Link>
            <Link href="/courses" className="px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white text-sm font-semibold">View Day-Scholar Option</Link>
          </>
        }
      />

      <section className="container-soft mt-8">
        <div className="card p-6 lg:p-8 border-l-4 border-l-navy-800">
          <div className="grid lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7">
              <div className="text-xs font-bold tracking-widest text-sky-700">ASPIRANTS CORNER</div>
              <h2 className="mt-2 font-display font-bold text-xl sm:text-2xl text-navy-900">Dear aspirants — start with the right information.</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Looking to crack the TS Police Constable, SI or Group exams? Our faculty has designed the syllabus,
                test schedule and physical plan around exactly what the notification asks for. Use the exam-wise
                links below to check eligibility, syllabus and physical standards before you join a batch.
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Preparation here is not physical alone. Academic classes, daily tests, study material and doubt
                sessions run alongside ground training — so written marks and physical scores improve together.
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5">
                <div className="text-sm font-semibold text-navy-900">Talk to admissions</div>
                <div className="text-sm text-slate-600 mt-1">Free counselling, demo class and campus visit. Open daily 9am – 8pm.</div>
                <div className="mt-3 flex flex-col gap-2">
                  <a href="tel:+918886667222" className="px-4 py-2.5 rounded-full bg-navy-900 text-white text-sm font-medium text-center">Call +91 88866 67222</a>
                  <a href="https://api.whatsapp.com/send?phone=918886667222" target="_blank" rel="noreferrer" className="px-4 py-2.5 rounded-full bg-[#25D366] text-white text-sm font-medium text-center">WhatsApp us</a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <div className="text-xs font-bold tracking-widest text-slate-500">EXAM-WISE DETAILS</div>
            <div className="mt-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {EXAM_LINKS.map((e) => (
                <Link key={e.title} href={e.href} className="group rounded-xl border border-slate-200 bg-white px-4 py-3 hover:bg-slate-50 hover:border-slate-300 transition">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold text-navy-900">{e.title}</span>
                    <span className="text-slate-400 group-hover:translate-x-0.5 transition" aria-hidden>→</span>
                  </div>
                  <div className="mt-1 text-xs text-slate-600 leading-relaxed">{e.desc}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-soft mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8">
            <div className="card p-8">
              <h2 className="font-display font-bold text-xl text-navy-900">Our Coaching Method</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">Faculty panel from across both Telugu states. Content updated to current competitive standards. Daily teaching + daily testing loop.</p>
              <h3 className="mt-6 font-semibold text-navy-900">Preparation Strategy (designed by Dr. Md Anwar)</h3>
              <div className="mt-3 grid sm:grid-cols-2 gap-3">
                {[
                  "Daily 4am – 6am Study Hours",
                  "Daily Evening Practice Test + Explanation",
                  "Night Study + Doubts Clarification",
                  "Weekly Grand Test + Explanation",
                  "Monthly Model Test + Explanation",
                  "Monthly Physical Assessment",
                ].map((x) => <div key={x} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">{x}</div>)}
              </div>

              <h3 className="mt-8 font-semibold text-navy-900">Academic Training</h3>
              <p className="mt-1 text-sm text-slate-600">The written exam is where most selections are won. Academics get the same structured attention as the ground.</p>
              <div className="mt-3 grid sm:grid-cols-2 gap-3">
                {ACADEMIC_TRAINING.map((a) => (
                  <div key={a.t} className="card p-4 border-slate-200">
                    <div className="text-sm font-semibold text-navy-900">{a.t}</div>
                    <div className="text-sm text-slate-600 mt-1 leading-relaxed">{a.d}</div>
                  </div>
                ))}
              </div>

              <h3 className="mt-8 font-semibold text-navy-900">Physical Training — 3 Level Grounds</h3>
              <div className="mt-3 grid sm:grid-cols-3 gap-3">
                {[
                  { l: "Level 1", t: "Track Events", d: "100m / 200m / 400m daily practice" },
                  { l: "Level 2", t: "Strength", d: "Gym + functional training" },
                  { l: "Level 3", t: "Events", d: "High Jump, Long Jump, Shot-put, Sand & Mud tracks" },
                ].map((x) => (
                  <div key={x.l} className="card p-4">
                    <div className="text-xs tracking-widest font-bold text-sky-700">{x.l}</div>
                    <div className="font-semibold text-navy-900">{x.t}</div>
                    <div className="text-sm text-slate-600 mt-1">{x.d}</div>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-slate-600">Ayaan is the only academy where the chief coach is the Director — Dr. Md Anwar, Ex-Police, SI State Topper 2009, NSG 2013, Indian Navy Officer and International Athlete.</p>
            </div>
          </div>
          <div className="lg:col-span-4">
            <div className="card p-6">
              <div className="font-semibold text-navy-900">Facilities</div>
              <ul className="mt-3 grid gap-2 text-sm text-slate-600">
                <li>• 25 acres • Own campus</li><li>• Boys & Girls Residential</li><li>• Special Grounds (Track, Sand, Mud)</li><li>• Library 24Hrs • Gym • Study Hall 24Hrs</li><li>• Dietary Hostel • Canteen</li>
              </ul>
              <div className="mt-6 p-4 rounded-xl bg-navy-900 text-white">
                <div className="text-sm font-semibold">Need hostel info?</div>
                <div className="text-sm text-white/70 mt-1">Food, discipline, timings, fees — talk to admissions.</div>
                <Link href="/contact" className="mt-3 inline-flex px-4 py-2 rounded-full bg-white text-navy-900 text-sm font-semibold">Contact Admissions →</Link>
              </div>
            </div>
            <div className="card p-6 mt-4">
              <div className="font-semibold text-navy-900">Courses at Academy</div>
              <div className="mt-3 grid gap-2">
                {["SI PC — SI + Constable →", "Army / Navy / Airforce →", "Groups 1-4 →", "SSC GD →", "UPSC →"].map((x) => <Link key={x} href="/courses" className="px-4 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-sm font-medium">{x}</Link>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-soft mt-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <h2 className="font-display font-bold text-xl text-navy-900">Inside Aspirant Corner</h2>
            <p className="mt-1 text-sm text-slate-600 max-w-2xl">The classroom, library, track, gym and hostel — what a normal day actually looks like here, by course.</p>
          </div>
          <span className="text-[11px] text-slate-400">Photos: Unsplash (free for commercial use)</span>
        </div>

        {(["SI PC", "Army / Navy / Airforce", "All courses"] as const).map((course) => {
          const shots = ASPIRANT_GALLERY.filter((g) => g.course === course);
          if (shots.length === 0) return null;
          return (
            <div key={course} className="mt-6">
              <div className="text-xs font-bold tracking-widest text-slate-500">{course}</div>
              <div className="mt-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {shots.map((g) => (
                  <figure key={g.title} className="card overflow-hidden group">
                    <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                      <img
                        src={g.src}
                        alt={g.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>
                    <figcaption className="p-4">
                      <div className="font-semibold text-navy-900 text-sm">{g.title}</div>
                      <div className="mt-1 text-xs text-slate-600 leading-relaxed">{g.caption}</div>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
