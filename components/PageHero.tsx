// Shared inner-page banner used by every public page so the template reads
// consistently: breadcrumb, title, optional subtitle and actions.
import Link from "next/link";
import type { ReactNode } from "react";

export type Crumb = { label: string; href?: string };

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  crumbs = [],
  actions,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: ReactNode;
  crumbs?: Crumb[];
  actions?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="bg-navy-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none" aria-hidden
        style={{ backgroundImage: "radial-gradient(circle at 20% 20%, #fff 1px, transparent 1px)", backgroundSize: "22px 22px" }}
      />
      <div className="container-soft relative py-8 sm:py-10">
        {crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-[11px] text-white/50">
            <Link href="/" className="hover:text-white">Home</Link>
            {crumbs.map((c) => (
              <span key={c.label} className="flex items-center gap-1.5">
                <span aria-hidden>/</span>
                {c.href ? <Link href={c.href} className="hover:text-white">{c.label}</Link> : <span className="text-white/80">{c.label}</span>}
              </span>
            ))}
          </nav>
        )}

        {eyebrow && (
          <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold tracking-widest uppercase">
            {eyebrow}
          </div>
        )}

        <h1 className="mt-3 font-display font-bold text-2xl sm:text-3xl lg:text-4xl leading-tight">{title}</h1>
        {subtitle && <p className="mt-2 max-w-3xl text-sm sm:text-[15px] leading-relaxed text-white/70">{subtitle}</p>}
        {actions && <div className="mt-5 flex flex-wrap gap-2">{actions}</div>}
        {children}
      </div>
    </section>
  );
}