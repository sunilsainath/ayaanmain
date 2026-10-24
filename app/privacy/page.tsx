import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Ayaan Group of Competitive Institutions collects, uses, stores and protects your personal data, including Aadhaar documents and payment records.",
};

const LAST_UPDATED = "October 2026";

type Section = { id: string; title: string; body: React.ReactNode };

const sections: Section[] = [
  {
    id: "who-we-are",
    title: "1. Who we are",
    body: (
      <>
        <p>
          Ayaan Group of Competitive Institutions (“Ayaan”, “we”, “us”) runs competitive-exam coaching
          from its campuses in Warangal, Hanamkonda, Hyderabad and Bollikunta. This policy explains how we
          handle personal data collected through this website, the student portal and our admissions process.
        </p>
        <p>
          For any privacy request, write to <a className="text-sky-700 hover:underline" href="mailto:ayaaninstitute.wgl@gmail.com">ayaaninstitute.wgl@gmail.com</a>{" "}
          or call <a className="text-sky-700 hover:underline" href="tel:+918886667222">+91 88866 67222</a>.
        </p>
      </>
    ),
  },
  {
    id: "what-we-collect",
    title: "2. What we collect",
    body: (
      <>
        <ul className="list-disc pl-5 grid gap-1.5">
          <li>
            <b>Identity and contact details</b> — name, father&apos;s name, mobile number, email address,
            postal address and the reference you give us.
          </li>
          <li>
            <b>Identity documents</b> — Aadhaar number and photographs of the front and back of your Aadhaar
            card, plus a passport photograph.
          </li>
          <li>
            <b>Course details</b> — course, mode, branch, duration, batch and any add-ons you select.
          </li>
          <li>
            <b>Payment records</b> — amounts, method, transaction identifiers, and screenshots you upload as
            proof of payment.
          </li>
          <li>
            <b>Account data</b> — your login email, session cookie, password change status, student ID and
            digital ID status.
          </li>
          <li>
            <b>Communications</b> — enquiries and leads, complaints you raise, and our replies.
          </li>
          <li>
            <b>Store orders</b> — items ordered, sizes, quantities and delivery status.
          </li>
        </ul>
        <p className="mt-3">
          We do not collect biometric data, and we do not use advertising or cross-site tracking cookies.
        </p>
      </>
    ),
  },
  {
    id: "why",
    title: "3. Why we use it",
    body: (
      <>
        <ul className="list-disc pl-5 grid gap-1.5">
          <li>To process your application, verify your identity and decide on admission.</li>
          <li>To create and maintain your student account and digital ID.</li>
          <li>To record fees, issue receipts, track dues and reconcile payments.</li>
          <li>To run classes, tests, batches and physical training.</li>
          <li>To answer enquiries, resolve complaints and provide support.</li>
          <li>To send service messages — admission status, payment acknowledgement, receipts and account notices.</li>
          <li>To keep internal activity logs for security, audit and fraud prevention.</li>
        </ul>
        <p className="mt-3">
          We rely on your consent (which you give when you submit the admission form), the performance of our
          contract with you as a student, and our legitimate interest in securing and operating the institute.
        </p>
      </>
    ),
  },
  {
    id: "aadhaar",
    title: "4. Aadhaar documents",
    body: (
      <>
        <p>
          Aadhaar images are collected only to confirm identity during admission. They are stored in a private
          storage bucket that is not publicly readable. Staff view them through short-lived signed links that
          expire after ten minutes, and access is limited to admissions and finance administrators who need
          them for verification.
        </p>
        <p className="mt-3">
          We do not share Aadhaar data with third parties for marketing, and we do not publish it. Please do
          not send Aadhaar images to us over WhatsApp or email — upload them through the admission form so they
          stay inside the private store.
        </p>
      </>
    ),
  },
  {
    id: "sharing",
    title: "5. Who we share it with",
    body: (
      <>
        <p>We share the minimum necessary with service providers who process data on our behalf:</p>
        <ul className="mt-2 list-disc pl-5 grid gap-1.5">
          <li><b>Supabase</b> — database, authentication and file storage (hosted in Singapore).</li>
          <li><b>Vercel</b> — application hosting and delivery.</li>
          <li><b>Razorpay</b> — card, UPI and netbanking payments for store orders.</li>
          <li><b>Our email provider</b> — transactional email such as receipts and login details.</li>
        </ul>
        <p className="mt-3">
          We may also disclose information where the law requires it, or to establish or defend a legal claim.
          We never sell your personal data.
        </p>
      </>
    ),
  },
  {
    id: "retention",
    title: "6. How long we keep it",
    body: (
      <>
        <p>
          Application and student records are kept while you are enrolled and afterwards for as long as we need
          them for fee records, certificates and statutory obligations. Internal activity logs are pruned
          automatically after roughly six months. Aadhaar images are retained for the duration of your
          admission record.
        </p>
        <p className="mt-3">
          If you ask us to delete data we are not legally required to keep, we will remove it or anonymise it.
        </p>
      </>
    ),
  },
  {
    id: "security",
    title: "7. How we protect it",
    body: (
      <>
        <p>
          Access to the admin panel is role-based and campus-scoped, sessions are held in an HTTP-only cookie,
          and passwords are never stored in plain text. Document uploads are validated and stored privately.
        </p>
        <p className="mt-3">
          No system is perfectly secure. If we ever become aware of a breach affecting your data, we will
          inform affected users and take remedial steps.
        </p>
      </>
    ),
  },
  {
    id: "your-rights",
    title: "8. Your choices and rights",
    body: (
      <>
        <ul className="list-disc pl-5 grid gap-1.5">
          <li>Ask for a copy of the personal data we hold about you.</li>
          <li>Ask us to correct anything inaccurate.</li>
          <li>Ask us to delete data we no longer need to keep.</li>
          <li>Withdraw consent for non-essential communication at any time.</li>
        </ul>
        <p className="mt-3">
          Write to the email above with your name, registered mobile number and what you want us to do. We may
          need to verify your identity before acting.
        </p>
      </>
    ),
  },
  {
    id: "minors",
    title: "9. Applicants under 18",
    body: (
      <>
        <p>
          Some defence entries accept applicants from 17. Where the applicant is under 18, the parent or
          guardian submitting the form confirms they consent to the collection and use described here.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    title: "10. Changes to this policy",
    body: (
      <>
        <p>
          We may update this policy as our systems or the law change. The current version is always on this
          page, with the date shown at the top. Material changes affecting how we use identity documents will
          be notified to enrolled students.
        </p>
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <div className="bg-[#fcfcfd]">
      <section className="bg-navy-900 text-white">
        <div className="container-soft py-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs">
            LEGAL • PRIVACY
          </div>
          <h1 className="mt-3 font-display font-bold text-3xl lg:text-4xl">Privacy Policy</h1>
          <p className="mt-2 text-white/70 max-w-2xl">
            What we collect, why we collect it, who can see it, and how to ask us to change or delete it.
          </p>
          <p className="mt-3 text-xs text-white/50">Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      <section className="container-soft mt-8 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-6 items-start">
          <nav className="card p-4 lg:sticky lg:top-[88px] hidden lg:block">
            <div className="text-xs font-bold tracking-widest text-slate-500">ON THIS PAGE</div>
            <ul className="mt-3 grid gap-1.5 text-sm">
              {sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="text-slate-600 hover:text-navy-900">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="grid grid-cols-1 gap-4">
            {sections.map((s) => (
              <article key={s.id} id={s.id} className="card p-6 scroll-mt-24">
                <h2 className="font-display font-bold text-lg text-navy-900">{s.title}</h2>
                <div className="mt-2 text-sm leading-relaxed text-slate-600 grid gap-2">{s.body}</div>
              </article>
            ))}

            <div className="card p-6 bg-amber-50 border-amber-200">
              <div className="font-semibold text-navy-900">Questions about your data?</div>
              <p className="text-sm text-slate-600 mt-1">
                Email <a className="text-sky-700 hover:underline" href="mailto:ayaaninstitute.wgl@gmail.com">ayaaninstitute.wgl@gmail.com</a> or call{" "}
                <a className="text-sky-700 hover:underline" href="tel:+918886667222">+91 88866 67222</a>. See also our{" "}
                <Link href="/terms" className="text-sky-700 hover:underline">Terms &amp; Conditions</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}