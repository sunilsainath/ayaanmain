"use client";
// Site header in the institutional-website template: a thin utility strip with
// contact + portals, then a white navigation bar with grouped dropdowns, then a
// mobile drawer with collapsible groups.
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AYAAN_APP_URL } from "@/lib/appConfig";
import BrandLogo from "@/components/BrandLogo";
import { BRAND } from "@/lib/brand";

type Child = { label: string; href: string; desc?: string; external?: boolean };
type NavGroup = { label: string; href?: string; children?: Child[]; external?: boolean };

const NAV: NavGroup[] = [
  { label: "Home", href: "/" },
  {
    label: "About",
    children: [
      { label: "Our Institute", href: "/about", desc: "Director, method and results" },
      { label: "Aspirant Corner", href: "/academy", desc: "Campus, grounds and hostel" },
      { label: "Alumni", href: "/alumni", desc: "Where our students are now" },
    ],
  },
  {
    label: "Courses",
    children: [
      { label: "All Courses", href: "/courses", desc: "SI PC, Groups, SSC GD, Defence, UPSC" },
      { label: "SI PC", href: "/courses", desc: "Sub-Inspector and Constable" },
      { label: "Groups 1–4", href: "/courses", desc: "State services" },
      { label: "Army / Navy / Airforce", href: "/courses", desc: "Defence entries" },
    ],
  },
  {
    label: "Admissions",
    children: [
      { label: "Apply Online", href: "/admission", desc: "Register in four steps" },
      { label: "Track Application", href: "/login", desc: "Check status and corrections" },
      { label: "Fee & Payment", href: "/admission", desc: "Fee split and installments" },
    ],
  },
  {
    label: "Campus Life",
    children: [
      { label: "Aspirant Corner", href: "/academy", desc: "Inside the 15-acre campus" },
      { label: "Store", href: "/store", desc: "Uniforms and training gear" },
      { label: "Contact", href: "/contact", desc: "Visit or call a campus" },
    ],
  },
  { label: "Store", href: "/store" },
  { label: "Tests", href: AYAAN_APP_URL, external: true },
  { label: "Contact", href: "/contact" },
];

type AuthState = { role: string; name: string; isAdmin: boolean } | null;

export default function SiteHeader() {
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [drawer, setDrawer] = useState(false);
  const [openDrawerGroup, setOpenDrawerGroup] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [auth, setAuth] = useState<AuthState>(null);
  const router = useRouter();

  const fetchAuth = async () => {
    try {
      const [meRes, adminRes] = await Promise.all([
        fetch("/api/auth/me", { cache: "no-store", credentials: "same-origin" }).then((r) => r.json()).catch(() => ({ authenticated: false })),
        fetch("/api/admin/login", { cache: "no-store", credentials: "same-origin" }).then((r) => r.json()).catch(() => ({ authenticated: false })),
      ]);
      if (meRes?.authenticated && meRes?.user) {
        setAuth({ role: "student", name: meRes.user.name || meRes.user.email || "Student", isAdmin: false });
        return;
      }
      if (adminRes?.authenticated) {
        const role = String(adminRes.role || "").toLowerCase();
        if (role && role !== "student") {
          setAuth({ role: adminRes.role, name: adminRes.name || adminRes.user || "Admin", isAdmin: true });
          return;
        }
        if (role === "student") {
          setAuth({ role: "student", name: adminRes.name || "Student", isAdmin: false });
          return;
        }
      }
      setAuth(null);
    } catch {
      setAuth(null);
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    fetchAuth();
    const onVis = () => { if (document.visibilityState === "visible") fetchAuth(); };
    const onCustom = () => fetchAuth();
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("ayaan_auth_changed", onCustom as EventListener);
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("ayaan_auth_changed", onCustom as EventListener);
    };
  }, []);

  const logout = async () => {
    try { await fetch("/api/auth/logout", { method: "POST" }); } catch {}
    try { localStorage.setItem("ayaan_auth_changed", Date.now().toString()); window.dispatchEvent(new Event("ayaan_auth_changed")); } catch {}
    setAuth(null);
    router.push("/login");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-40">
      {/* utility strip */}
      <div className="bg-navy-900 text-white">
        <div className="container-soft flex h-9 items-center justify-between gap-3 text-[11px] sm:text-xs">
          <div className="flex items-center gap-4 min-w-0">
            <a href="tel:+918886667222" className="hidden sm:inline-flex items-center gap-1.5 hover:text-white/80">
              <span aria-hidden>☎</span> +91 88866 67222
            </a>
            <a href="mailto:ayaaninstitute.wgl@gmail.com" className="hidden md:inline-flex items-center gap-1.5 hover:text-white/80">
              <span aria-hidden>✉</span> ayaanInstitute.wgl@gmail.com
            </a>
            <span className="sm:hidden truncate text-white/70">{BRAND.tagline}</span>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link href="/login" className="hover:text-white/80">Student Login</Link>
            <span className="text-white/20">|</span>
            <Link href="/admin" className="hover:text-white/80">Admin</Link>
            <span className="hidden sm:inline text-white/20">|</span>
            <a
              href="https://api.whatsapp.com/send?phone=918886667222"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline hover:text-white/80"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* main bar */}
      <div className={`bg-white transition ${scrolled ? "shadow-sm" : "border-b border-slate-100"}`}>
        <div className="container-soft flex h-[70px] items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 shrink-0" aria-label={`${BRAND.fullName} — home`}>
            <BrandLogo height={48} />
          </Link>

          <nav className="hidden lg:flex items-center gap-0.5" onMouseLeave={() => setOpenGroup(null)}>
            {NAV.map((n) =>
              n.children ? (
                <div key={n.label} className="relative" onMouseEnter={() => setOpenGroup(n.label)}>
                  <button
                    onClick={() => setOpenGroup(openGroup === n.label ? null : n.label)}
                    aria-expanded={openGroup === n.label}
                    className={`px-3.5 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition inline-flex items-center gap-1 ${
                      openGroup === n.label ? "text-navy-900 bg-slate-50" : "text-slate-700 hover:text-navy-900 hover:bg-slate-50"
                    }`}
                  >
                    {n.label}
                    <span className={`text-[9px] transition ${openGroup === n.label ? "rotate-180" : ""}`} aria-hidden>▼</span>
                  </button>
                  {openGroup === n.label && (
                    <div className="absolute left-0 top-full pt-1 w-[320px]">
                      <div className="rounded-2xl border border-slate-100 bg-white shadow-xl overflow-hidden">
                        {n.children.map((c) => (
                          <Link
                            key={c.label}
                            href={c.href}
                            onClick={() => setOpenGroup(null)}
                            className="block px-4 py-3 hover:bg-slate-50 border-b border-slate-50 last:border-0"
                          >
                            <div className="text-sm font-medium text-navy-900">{c.label}</div>
                            {c.desc && <div className="text-xs text-slate-500 mt-0.5">{c.desc}</div>}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : n.external ? (
                <a
                  key={n.label}
                  href={n.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-lg text-sm font-medium whitespace-nowrap text-slate-700 hover:text-navy-900 hover:bg-slate-50"
                >
                  {n.label} ↗
                </a>
              ) : (
                <Link
                  key={n.label}
                  href={n.href!}
                  className="px-3.5 py-2 rounded-lg text-sm font-medium whitespace-nowrap text-slate-700 hover:text-navy-900 hover:bg-slate-50"
                >
                  {n.label}
                </Link>
              ),
            )}
          </nav>

          <div className="hidden lg:flex items-center gap-2">
            {auth ? (
              <>
                <Link
                  href={auth.isAdmin ? "/admin" : "/account"}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-navy-900 text-white text-sm font-medium hover:bg-navy-800"
                >
                  <span className="w-6 h-6 rounded-full bg-white/20 grid place-items-center text-xs font-bold">
                    {auth.name.trim().charAt(0).toUpperCase()}
                  </span>
                  <span className="max-w-[12ch] truncate">{auth.name}</span>
                </Link>
                <button onClick={logout} className="text-xs font-medium text-slate-600 hover:text-red-600 px-1">Logout</button>
              </>
            ) : (
              <Link href="/login" className="text-sm font-medium text-slate-700 hover:text-navy-900 px-2">Login</Link>
            )}
            <Link href="/admission" className="btn-primary !px-5 !py-2.5 text-sm whitespace-nowrap">Apply Online</Link>
          </div>

          <button
            onClick={() => setDrawer(!drawer)}
            className="lg:hidden w-10 h-10 rounded-full border border-slate-200 grid place-items-center bg-white"
            aria-label="Menu"
            aria-expanded={drawer}
          >
            <span className="text-lg" aria-hidden>{drawer ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      {/* mobile drawer */}
      {drawer && (
        <div className="lg:hidden bg-white border-t border-slate-100 shadow-lg max-h-[calc(100vh-110px)] overflow-auto">
          <div className="container-soft py-3">
            {NAV.map((n) =>
              n.children ? (
                <div key={n.label} className="border-b border-slate-100 last:border-0">
                  <button
                    onClick={() => setOpenDrawerGroup(openDrawerGroup === n.label ? null : n.label)}
                    aria-expanded={openDrawerGroup === n.label}
                    className="w-full flex items-center justify-between px-1 py-3 text-sm font-medium text-navy-900"
                  >
                    {n.label}
                    <span className={`text-[10px] transition ${openDrawerGroup === n.label ? "rotate-180" : ""}`} aria-hidden>▼</span>
                  </button>
                  {openDrawerGroup === n.label && (
                    <div className="pb-2 grid gap-0.5">
                      {n.children.map((c) => (
                        <Link
                          key={c.label}
                          href={c.href}
                          onClick={() => { setDrawer(false); setOpenDrawerGroup(null); }}
                          className="px-3 py-2.5 rounded-lg text-sm text-slate-600 hover:bg-slate-50"
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : n.external ? (
                <a
                  key={n.label}
                  href={n.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setDrawer(false)}
                  className="flex items-center justify-between px-1 py-3 text-sm font-medium text-navy-900 border-b border-slate-100 last:border-0"
                >
                  {n.label} ↗
                </a>
              ) : (
                <Link
                  key={n.label}
                  href={n.href!}
                  onClick={() => setDrawer(false)}
                  className="flex items-center justify-between px-1 py-3 text-sm font-medium text-navy-900 border-b border-slate-100 last:border-0"
                >
                  {n.label} <span className="text-slate-300" aria-hidden>→</span>
                </Link>
              ),
            )}

            <div className="mt-3 grid gap-2">
              <Link href="/admission" onClick={() => setDrawer(false)} className="btn-primary justify-center">Apply Online</Link>
              {auth ? (
                <>
                  <Link href={auth.isAdmin ? "/admin" : "/account"} onClick={() => setDrawer(false)} className="w-full py-3 rounded-xl bg-white border border-slate-200 grid place-items-center text-sm font-medium">
                    {auth.name} • {auth.isAdmin ? "Admin" : "My Account"}
                  </Link>
                  <button onClick={() => { setDrawer(false); logout(); }} className="w-full py-3 rounded-xl border border-slate-200 bg-white text-sm font-medium text-red-600">
                    Logout
                  </button>
                </>
              ) : (
                <Link href="/login" onClick={() => setDrawer(false)} className="w-full py-3 rounded-xl border border-slate-200 bg-white grid place-items-center text-sm font-medium">
                  Login to Account
                </Link>
              )}
              <div className="flex gap-2 text-xs">
                <a href="tel:+918886667222" className="flex-1 py-3 rounded-xl border border-slate-200 grid place-items-center font-medium">Call</a>
                <a href="https://api.whatsapp.com/send?phone=918886667222" target="_blank" rel="noreferrer" className="flex-1 py-3 rounded-xl bg-[#25D366] text-white grid place-items-center font-medium">WhatsApp</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}