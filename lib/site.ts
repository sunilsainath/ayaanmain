// Single source of truth for the public app origin.
//
// Every outward-facing link (emails, Supabase auth redirects, correction
// links) must point at the deployed domain, never localhost. Supabase falls
// back to its own Site URL when a redirect is not supplied, which is how
// reset links ended up pointing at http://localhost:3000.
//
// Set NEXT_PUBLIC_SITE_URL to override. Local dev keeps localhost so the
// developer experience still works.

const FALLBACK = "https://ayaanmain-smoky.vercel.app";

export function appOrigin(): string {
  const raw = String(process.env.NEXT_PUBLIC_SITE_URL || "").trim();
  const base = raw || FALLBACK;
  // Strip trailing slash so `${appOrigin()}/login` never doubles up.
  return base.replace(/\/+$/, "");
}

export function appUrl(path: string): string {
  const p = String(path || "");
  if (/^https?:\/\//i.test(p)) return p;
  return `${appOrigin()}${p.startsWith("/") ? p : `/${p}`}`;
}

// Redirect target for Supabase auth emails (OTP / magic link / recovery).
// These must be allow-listed in Supabase → Authentication → URL Configuration.
export function authRedirect(path = "/login"): string {
  return appUrl(path);
}