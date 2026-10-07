// Single source of truth for the Ayan logo and wordmark.
//
// Prefer the official raster when it exists in /public/brand (drop `ayan-logo.png`
// next to the svg and it is picked up automatically). The inline SVG below is a
// vector recreation used as the fallback so nothing renders without a mark.
//
// Inline is deliberate: the logo appears in print windows (receipts, admission
// forms) and in email HTML, where an external <img> would be blocked or blank.

export const LOGO_SVG_PATH = "/brand/ayaan-logo.svg";
export const LOGO_RASTER_PATH = "/brand/ayan-logo.png";

export const BRAND = {
  name: "Ayan",
  fullName: "Ayan Group of Competitive Institutions",
  tagline: "We Target Your Aim",
  strapline: "Group Of Competitive Institutions",
  // Used for <title>, meta and printed documents.
  documentTitle: "Ayan Group Of Competitive Institutions",
  claim: "Most favourite institute of TS & AP Aspirants",
} as const;

// The SVG markup, inlined so print/email output never depends on a network fetch.
export const LOGO_SVG_INLINE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 740" role="img" aria-label="Ayan Group of Competitive Institutions">
<defs>
<path id="sh" d="M300 14 C205 14 112 40 64 98 C40 252 62 434 300 726 C538 434 560 252 536 98 C488 40 395 14 300 14 Z"/>
<path id="arc" d="M104 250 A214 214 0 0 1 496 250"/>
<linearGradient id="gg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#ffe98a"/><stop offset="55%" stop-color="#ffd21f"/><stop offset="100%" stop-color="#f5a800"/></linearGradient>
<linearGradient id="cg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#ff5b4a"/><stop offset="100%" stop-color="#d0131f"/></linearGradient>
<linearGradient id="bg" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#0b1b73"/><stop offset="50%" stop-color="#132a99"/><stop offset="100%" stop-color="#0b1b73"/></linearGradient>
</defs>
<use href="#sh" fill="#0b1b73"/>
<use href="#sh" fill="none" stroke="#0b1b73" stroke-width="10" transform="translate(300 372) scale(0.955) translate(-300 -372)"/>
<use href="#sh" fill="#d0131f" transform="translate(300 372) scale(0.905) translate(-300 -372)"/>
<use href="#sh" fill="#ffffff" transform="translate(300 372) scale(0.855) translate(-300 -372)"/>
<use href="#sh" fill="url(#gg)" transform="translate(300 372) scale(0.815) translate(-300 -372)"/>
<use href="#sh" fill="none" stroke="#d0131f" stroke-width="5" transform="translate(300 372) scale(0.79) translate(-300 -372)"/>
<text font-family="Inter, Segoe UI, Arial, sans-serif" font-size="46" font-weight="800" fill="#0b1b73"><textPath href="#arc" startOffset="50%" text-anchor="middle">Most favourite institute of TS &amp; AP Aspirants</textPath></text>
<text x="520" y="300" font-family="Inter, Arial, sans-serif" font-size="34" font-weight="700" fill="#0b1b73">&#174;</text>
<g transform="translate(300 322)">
<path d="M-96 26 L-104 -34 L-58 2 L-30 -44 L0 6 L30 -44 L58 2 L104 -34 L96 26 Z" fill="url(#cg)" stroke="#d0131f" stroke-width="5" stroke-linejoin="round"/>
<rect x="-98" y="26" width="196" height="18" rx="6" fill="url(#cg)" stroke="#d0131f" stroke-width="5"/>
<circle cx="-30" cy="-50" r="8" fill="#ff5b4a" stroke="#d0131f" stroke-width="4"/>
<circle cx="30" cy="-50" r="8" fill="#ff5b4a" stroke="#d0131f" stroke-width="4"/>
<text x="0" y="24" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="44" font-weight="700" fill="#ffd21f" stroke="#d0131f" stroke-width="1.5">A</text>
</g>
<text x="300" y="452" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="132" font-weight="700" letter-spacing="6" fill="#e11d2e" stroke="#ffffff" stroke-width="7" paint-order="stroke">AYAN</text>
<text x="300" y="452" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="132" font-weight="700" letter-spacing="6" fill="none" stroke="#ffd21f" stroke-width="1.5">AYAN</text>
<text x="300" y="502" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="34" font-weight="800" fill="#0b1b73" stroke="#ffffff" stroke-width="5" paint-order="stroke">Group Of Competitive Institutions</text>
<rect x="118" y="522" width="364" height="7" fill="#0b1b73"/>
<rect x="140" y="538" width="320" height="5" fill="#0b1b73"/>
<g stroke="#0b1b73" stroke-width="9" stroke-linecap="round"><line x1="300" y1="588" x2="300" y2="556"/><line x1="252" y1="596" x2="264" y2="562"/><line x1="348" y1="596" x2="336" y2="562"/><line x1="214" y1="614" x2="238" y2="580"/><line x1="386" y1="614" x2="362" y2="580"/><line x1="186" y1="640" x2="222" y2="614"/><line x1="414" y1="640" x2="378" y2="614"/></g>
<text x="300" y="646" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="44" font-weight="800" font-style="italic" letter-spacing="2" fill="#0b1b73" stroke="#ffffff" stroke-width="4" paint-order="stroke">WE TARGET YOUR AIM</text>
<path d="M92 664 C210 640 390 640 508 664 C520 682 520 700 508 716 C390 742 210 742 92 716 C80 698 80 682 92 664 Z" fill="url(#bg)"/>
<g fill="#ffd21f"><polygon points="126,690 132,704 147,704 135,713 140,728 126,719 112,728 117,713 105,704 120,704"/><polygon points="180,684 186,698 201,698 189,707 194,722 180,713 166,722 171,707 159,698 174,698"/><polygon points="300,678 308,696 327,696 312,708 318,727 300,715 282,727 288,708 273,696 292,696"/><polygon points="420,684 426,698 441,698 429,707 434,722 420,713 406,722 411,707 399,698 414,698"/><polygon points="474,690 480,704 495,704 483,713 488,728 474,719 460,728 465,713 453,704 468,704"/></g>
<g transform="translate(300 692)"><polygon points="0,-46 12,-15 45,-14 19,6 28,39 0,20 -28,39 -19,6 -45,-14 -12,-15" fill="#0b1b73"/><circle cx="0" cy="2" r="9" fill="#ffd21f"/></g>
</svg>`;

// Data URI form for <img src>, used where inline JSX is not practical (email).
export const LOGO_DATA_URI = `data:image/svg+xml;base64,${
  typeof Buffer !== "undefined"
    ? Buffer.from(LOGO_SVG_INLINE, "utf8").toString("base64")
    : ""
}`;