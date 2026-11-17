import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Terms governing use of the Ayaan website, student portal, admissions, fees, campus conduct and store orders.",
};

const LAST_UPDATED = "October 2026";

type Section = { id: string; title: string; body: React.ReactNode };

const sections: Section[] = [
  {
    id: "acceptance",
    title: "1. Using this site",
    body: (
      <>
        <p>
          These terms govern your use of the Ayaan website and student portal, and your relationship with Ayaan
          Group of Competitive Institutions (“Ayaan”, “we”, “us”). By browsing the site, submitting an enquiry,
          applying for admission or creating an account, you accept them.
        </p>
        <p>
          If you do not agree, please do not use the site. You must be at least 17 to apply, and where you are
          under 18 a parent or guardian must consent.
        </p>
      </>
    ),
  },
  {
    id: "applications",
    title: "2. Applications and admission",
    body: (
      <>
        <ul className="list-disc pl-5 grid gap-1.5">
          <li>Submitting the form creates an application only. It is not an offer of a seat.</li>
          <li>Admission is granted at our discretion, after review, and must be approved by our admissions team.</li>
          <li>
            You confirm that everything you submit is true, including your qualification, category and the
            documents you upload. False or altered documents cancel your admission without refund.
          </li>
          <li>The course, batch, duration and fee recorded at approval are what your account will reflect.</li>
          <li>Your login is created on approval. You must change the temporary password on first sign-in.</li>
        </ul>
      </>
    ),
  },
  {
    id: "fees",
    title: "3. Fees and dues",
    body: (
      <>
        <ul className="list-disc pl-5 grid gap-1.5">
          <li>Fees are those displayed for your course, mode, duration and campus at the time of approval.</li>
          <li>Payments recorded against your admission generate a receipt; keep it for your records.</li>
          <li>The balance and due date shown in your account are the amounts we expect by those dates.</li>
          <li>
            Payments made by UPI or bank transfer are confirmed once the transaction ID and proof are verified.
            Unverified or failed payments do not reduce your balance.
          </li>
          <li>Discounts, where granted, are applied at approval and are reflected in the locked fee.</li>
        </ul>
        <p className="mt-3">
          Refunds and transfers are governed by the fee terms communicated to you at the time of admission and by
          the policy of your campus. Please speak to the admissions office before making a payment you may later
          need to reverse.
        </p>
      </>
    ),
  },
  {
    id: "conduct",
    title: "4. Campus conduct and physical training",
    body: (
      <>
        <ul className="list-disc pl-5 grid gap-1.5">
          <li>Attendance, punctuality and conduct standards apply to all batches, including hostel residents.</li>
          <li>
            Physical training carries an inherent risk of injury. By enrolling you confirm you are medically fit,
            and you follow coach instructions and safety rules.
          </li>
          <li>We may suspend or cancel admission for serious misconduct, damage to property or endangering others.</li>
          <li>Hostel and mess facilities are subject to separate campus rules communicated on arrival.</li>
        </ul>
      </>
    ),
  },
  {
    id: "account",
    title: "5. Your account and digital ID",
    body: (
      <>
        <ul className="list-disc pl-5 grid gap-1.5">
          <li>Keep your password private. You are responsible for activity under your login.</li>
          <li>Tell us immediately if you believe your account has been accessed by someone else.</li>
          <li>
            Your student ID and digital ID belong to Ayaan and are issued for identification on campus and with
            our partners. They are not transferable.
          </li>
          <li>We may revoke a digital ID on expiry of your course or on suspension.</li>
        </ul>
      </>
    ),
  },
  {
    id: "store",
    title: "6. Store orders",
    body: (
      <>
        <ul className="list-disc pl-5 grid gap-1.5">
          <li>Prices and availability are shown in the store and may change.</li>
          <li>An order is confirmed once payment succeeds, or when staff record a counter sale against your account.</li>
          <li>Unpaid counter sales remain payable and appear as an amount due on your account.</li>
          <li>
            Exchange of uniforms and gear is subject to size availability at your campus. Items that have been
            worn, washed or damaged cannot normally be exchanged.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "content",
    title: "7. Course material and intellectual property",
    body: (
      <>
        <p>
          Notes, tests, question banks, recordings and course material provided to you are for your personal
          study. The Ayaan name and logo are our property.
        </p>
        <p className="mt-3">
          You may not record classes, share material publicly, resell it, or reproduce it commercially. Doing so
          may result in loss of access and cancellation of admission.
        </p>
      </>
    ),
  },
  {
    id: "availability",
    title: "8. Site availability and accuracy",
    body: (
      <>
        <p>
          We work to keep the site and portal available, but we do not guarantee uninterrupted access. We may
          change, suspend or withdraw features, and may correct errors in course, fee or batch information.
        </p>
        <p className="mt-3">
          Batch dates, notification dates and exam schedules shown on the site are indicative. Official
          notifications from the recruiting body always prevail.
        </p>
      </>
    ),
  },
  {
    id: "liability",
    title: "9. Limits of our responsibility",
    body: (
      <>
        <p>
          We provide coaching and guidance. We do not guarantee selection in any examination, rank, or that any
          particular notification will be issued.
        </p>
        <p className="mt-3">
          To the extent permitted by law, we are not liable for indirect or consequential losses, or for losses
          arising from information you submit that proves to be inaccurate.
        </p>
      </>
    ),
  },
  {
    id: "law",
    title: "10. Governing law",
    body: (
      <>
        <p>
          These terms are governed by the laws of India. Disputes are subject to the exclusive jurisdiction of
          the courts at Warangal, Telangana.
        </p>
        <p className="mt-3">
          We may update these terms from time to time. The version on this page, with the date above, is the one
          that applies.
        </p>
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <div className="bg-[#fcfcfd]">
      <section className="bg-navy-900 text-white">
        <div className="container-soft py-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs">
            LEGAL • TERMS
          </div>
          <h1 className="mt-3 font-display font-bold text-3xl lg:text-4xl">Terms &amp; Conditions</h1>
          <p className="mt-2 text-white/70 max-w-2xl">
            The rules that apply to this website, your application, fees, campus conduct and store orders.
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

            <div className="card p-6 bg-sky-50 border-sky-200">
              <div className="font-semibold text-navy-900">Need something clarified?</div>
              <p className="text-sm text-slate-600 mt-1">
                Call <a className="text-sky-700 hover:underline" href="tel:+918886667222">+91 88866 67222</a> or email{" "}
                <a className="text-sky-700 hover:underline" href="mailto:ayaaninstitute.wgl@gmail.com">ayaaninstitute.wgl@gmail.com</a>. See also our{" "}
                <Link href="/privacy" className="text-sky-700 hover:underline">Privacy Policy</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}