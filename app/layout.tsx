import type { Metadata } from "next";
import "./globals.css";
import { BRAND, LOGO_SVG_PATH } from "@/lib/brand";
import SiteChrome from "@/components/SiteChrome";
import MetaMaskGuard from "@/components/MetaMaskGuard";

export const metadata: Metadata = {
  title: {
    default: `${BRAND.documentTitle} — ${BRAND.tagline} | Telangana`,
    template: `%s | ${BRAND.documentTitle}`,
  },
  description: `${BRAND.claim}. India's first residential campus for uniform jobs. SI PC, Army, SSC GD & Group exams. Offline, Residential & Online coaching by Mohd. Anwar Sir.`,
  applicationName: BRAND.fullName,
  icons: {
    icon: [{ url: LOGO_SVG_PATH, type: "image/svg+xml" }],
    apple: [{ url: LOGO_SVG_PATH }],
  },
  openGraph: {
    title: `${BRAND.documentTitle} — ${BRAND.tagline}`,
    description: `${BRAND.claim}. SI PC, Army, SSC GD & Group exams in Telangana.`,
    siteName: BRAND.fullName,
    images: [{ url: LOGO_SVG_PATH, type: "image/svg+xml", alt: BRAND.fullName }],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: `${BRAND.documentTitle} — ${BRAND.tagline}`,
    description: `${BRAND.claim}.`,
    images: [LOGO_SVG_PATH],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => {
  const isMM = (m) => /MetaMask|Failed to connect|inpage\\.js|chrome-extension.*ejbalbakoplchlghecdalmeeeajnimhm/i.test(m||"");
  const handler = (e) => {
    const msg = (e && (e.message || (e.reason && e.reason.message) || e.reason || "")) + " " + (e && e.filename || "") + " " + (e && e.error && e.error.stack || "");
    if (isMM(msg) || (e && e.filename && e.filename.includes("inpage.js"))) {
      if (e.preventDefault) e.preventDefault();
      if (e.stopPropagation) e.stopPropagation();
      if (e.stopImmediatePropagation) e.stopImmediatePropagation();
      return true;
    }
  };
  window.addEventListener("error", handler, true);
  window.addEventListener("unhandledrejection", handler, true);
  const origConsoleError = console.error;
  console.error = function(...args) {
    const m = args.join(" ");
    if (isMM(m)) return;
    return origConsoleError.apply(this, args);
  };
})();`,
          }}
        />
      </head>
      <body className="font-sans bg-[#fcfcfd]">
        <MetaMaskGuard />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
