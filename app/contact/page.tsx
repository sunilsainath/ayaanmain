"use client";
import PageHero from "@/components/PageHero";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FALLBACK_BRANCHES, detailsFor, type Branch } from "@/lib/branchInfo";

export default function ContactPage() {
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
        eyebrow="Contact"
        title="Visit an Ayaan Institute near you"
        crumbs={[{ label: "Contact" }]}
        subtitle="Get directions, branch details and timings • Open daily 9am – 8pm • +91 88866 67222"
        actions={
          <>
            <Link href="/admission" className="px-6 py-3 rounded-full bg-white text-navy-900 text-sm font-semibold">Register Now</Link>
            <a href="https://api.whatsapp.com/send?phone=918886667222" target="_blank" rel="noreferrer" className="px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white text-sm font-semibold">WhatsApp us</a>
          </>
        }
      />

      <section className="container-soft mt-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="text-xs tracking-widest font-semibold text-sky-700">OUR INSTITUTES</div>
            <h2 className="font-display font-bold text-2xl text-navy-900 mt-1">Visit an Ayaan Institute near you</h2>
            <p className="text-sm text-slate-600 mt-1">Get directions, read about the institute and check timings before you visit.</p>
          </div>
          <span className="hidden sm:inline-flex px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs text-slate-600">{branches.length} Ayaan institutes</span>
        </div>

        <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-5">
          {branches.map((b) => {
            const q = encodeURIComponent(`${b.name}, ${b.address}`);
            const info = detailsFor(b);
            return (
              <div key={b.id} className="card overflow-hidden flex flex-col">
                <div className="p-6 flex-1 flex flex-col">
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
                    <a href={`https://api.whatsapp.com/send?phone=918886667222&text=${encodeURIComponent(`Hi, I want details about the ${b.name} institute`)}`} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-full border border-slate-200 text-xs font-medium hover:bg-slate-50">WhatsApp</a>
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

        <div className="card mt-6 p-6 lg:p-8 grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5">
            <div className="text-sm tracking-widest font-semibold text-sky-700">GET IN TOUCH</div>
            <h3 className="font-display font-bold text-xl text-navy-900 mt-2">Have a question?</h3>
            <p className="text-sm text-slate-600 mt-2">Course, fees, hostel, batch dates — we&apos;ll guide you. Fill the form or WhatsApp us.</p>
            <div className="mt-6 flex gap-2">
              <a href="https://api.whatsapp.com/send?phone=918886667222" target="_blank" rel="noreferrer" className="px-5 py-2.5 rounded-full bg-[#25D366] text-white text-sm font-semibold">WhatsApp Us</a>
              <a href="tel:+918886667222" className="px-5 py-2.5 rounded-full border border-slate-200 text-sm font-semibold">Call Now</a>
            </div>
          </div>
          <form className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
            <input placeholder="Name" className="px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm" />
            <input placeholder="Phone" className="px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm" />
            <input placeholder="Email" className="sm:col-span-2 px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm" />
            <textarea placeholder="Message — e.g., SI Telugu batch fees?" rows={4} className="sm:col-span-2 px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm" />
            <button type="button" className="sm:col-span-2 px-6 py-3 rounded-full bg-navy-900 text-white text-sm font-semibold">Submit Enquiry →</button>
          </form>
        </div>
      </section>
    </div>
  );
}
