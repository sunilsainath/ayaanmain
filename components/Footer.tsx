import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";
import { BRAND } from "@/lib/brand";

const QUICK = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "All Courses", href: "/courses" },
  { label: "Register Now", href: "/admission" },
  { label: "Find Your Batch", href: "/#find-batch" },
  { label: "Aspirant Corner", href: "/academy" },
  { label: "Gallery", href: "/gallery" },
  { label: "Alumni", href: "/alumni" },
  { label: "Store", href: "/store" },
  { label: "Contact", href: "/contact" },
];

const COURSES = [
  { label: "SI PC", href: "/courses" },
  { label: "Groups 1 – 4", href: "/courses" },
  { label: "SSC GD", href: "/courses" },
  { label: "Army / Navy / Airforce", href: "/courses" },
  { label: "UPSC Civil Services", href: "/courses" },
  { label: "Online Coaching", href: "/courses" },
];

const PORTALS = [
  { label: "Student Login", href: "/login" },
  { label: "My Account", href: "/account" },
  { label: "Admin Console", href: "/admin" },
  { label: "Track Application", href: "/login" },
];

export default function Footer() {
  return (
    <footer className="mt-16 bg-navy-900 text-slate-300">
      {/* top strip */}
      <div className="border-b border-white/10">
        <div className="container-soft py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="font-display font-bold text-white text-lg">Admissions open for the next batch</div>
            <div className="text-sm text-slate-400 mt-0.5">Free counselling, demo class and campus visit.</div>
          </div>
          <div className="flex gap-2 shrink-0">
            <Link href="/admission" className="px-5 py-2.5 rounded-full bg-white text-navy-900 text-sm font-semibold hover:bg-slate-100">
              Register Now
            </Link>
            <a href="tel:+918886667222" className="px-5 py-2.5 rounded-full border border-white/25 text-white text-sm font-medium hover:bg-white/10">
              Call us
            </a>
          </div>
        </div>
      </div>

      <div className="container-soft py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.3fr] gap-10">
          {/* brand */}
          <div>
            <div className="flex items-center gap-3">
              <div className="rounded-xl overflow-hidden flex items-center justify-center shrink-0" style={{ width: 48, height: 48, background: "#fff" }}>
                <BrandLogo height={44} showWordmark={false} />
              </div>
              <div>
                <div className="font-display font-bold text-white leading-none">{BRAND.fullName.toUpperCase()}</div>
                <div className="text-xs tracking-widest text-slate-400 mt-1">ESTD. 2016 • TELANGANA</div>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-400 max-w-sm">
              {BRAND.claim}. India&apos;s first residential campus for uniform jobs — written and physical training under one roof, led by Dr. Md Anwar.
            </p>
            <div className="mt-6 flex gap-2">
              <a aria-label="Facebook" className="w-9 h-9 rounded-full bg-white/10 grid place-items-center hover:bg-white/20" href="#">f</a>
              <a aria-label="Instagram" className="w-9 h-9 rounded-full bg-white/10 grid place-items-center hover:bg-white/20" href="#">◎</a>
              <a aria-label="LinkedIn" className="w-9 h-9 rounded-full bg-white/10 grid place-items-center hover:bg-white/20" href="#">in</a>
              <a aria-label="YouTube" className="w-9 h-9 rounded-full bg-white/10 grid place-items-center hover:bg-white/20" href="#">▶</a>
            </div>
          </div>

          {/* quick links */}
          <div>
            <div className="text-sm font-semibold text-white">Quick Links</div>
            <ul className="mt-4 grid gap-2.5 text-sm text-slate-400">
              {QUICK.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="hover:text-white">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* courses */}
          <div>
            <div className="text-sm font-semibold text-white">Courses</div>
            <ul className="mt-4 grid gap-2.5 text-sm text-slate-400">
              {COURSES.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="hover:text-white">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* contact + portals */}
          <div>
            <div className="text-sm font-semibold text-white">Reach Us</div>
            <div className="mt-4 grid gap-3 text-sm text-slate-300">
              <div>
                <div className="font-medium text-white">Warangal — Residential</div>
                <div className="text-slate-400 leading-relaxed">Don Bosco School, Opp. Vaagdevi College, Bollikunta, Warangal 506005</div>
              </div>
              <div>
                <div className="font-medium text-white">Hyderabad</div>
                <div className="text-slate-400">Chenna Complex, Pillar 1542, Dilsukhnagar</div>
              </div>
              <div className="flex flex-col gap-1">
                <a href="tel:+918886667222" className="text-white font-medium hover:text-white/80">+91 88866 67222</a>
                <a href="mailto:ayaaninstitute.wgl@gmail.com" className="text-slate-400 hover:text-white break-anywhere">ayaaninstitute.wgl@gmail.com</a>
              </div>
            </div>

            <div className="mt-5 rounded-2xl bg-white/5 border border-white/10 p-4">
              <div className="text-xs font-semibold text-white tracking-wide">PORTALS</div>
              <div className="mt-2 grid grid-cols-2 gap-1.5 text-xs">
                {PORTALS.map((p) => (
                  <Link key={p.label} href={p.href} className="px-2.5 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-center">
                    {p.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row gap-3 items-center justify-between text-xs text-slate-400">
          <span>© {new Date().getFullYear()} {BRAND.fullName}. All rights reserved.</span>
          <span className="flex flex-wrap gap-4 items-center justify-center md:justify-end">
            <Link className="hover:text-white" href="/privacy">Privacy Policy</Link>
            <Link className="hover:text-white" href="/terms">Terms &amp; Conditions</Link>
            <span>Developed by DREP Software Solutions</span>
          </span>
        </div>
      </div>
    </footer>
  );
}