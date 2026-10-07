"use client";
// The Ayan logo as a reusable inline SVG component.
//
// Inline (not <img>) so it renders identically in the navbar, in print windows
// and wherever a network fetch is unavailable. Set `plain` to drop the shield
// and show just the wordmark (useful in tight nav bars).
import { BRAND } from "@/lib/brand";

export default function BrandLogo({
  height = 44,
  showWordmark = true,
  className = "",
  title = BRAND.documentTitle,
}: {
  height?: number;
  showWordmark?: boolean;
  className?: string;
  title?: string;
}) {
  const h = height;
  return (
    <span className={`inline-flex items-center ${className}`}>
      <svg
        viewBox="0 0 600 740"
        height={h}
        width={Math.round((h * 600) / 740)}
        role="img"
        aria-label={title}
        style={{ display: "block", flexShrink: 0 }}
      >
        <defs>
          <path id="ayan-sh" d="M300 14 C205 14 112 40 64 98 C40 252 62 434 300 726 C538 434 560 252 536 98 C488 40 395 14 300 14 Z" />
          <path id="ayan-arc" d="M104 250 A214 214 0 0 1 496 250" />
          <linearGradient id="ayan-gold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffe98a" />
            <stop offset="55%" stopColor="#ffd21f" />
            <stop offset="100%" stopColor="#f5a800" />
          </linearGradient>
          <linearGradient id="ayan-crown" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ff5b4a" />
            <stop offset="100%" stopColor="#d0131f" />
          </linearGradient>
          <linearGradient id="ayan-banner" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#0b1b73" />
            <stop offset="50%" stopColor="#132a99" />
            <stop offset="100%" stopColor="#0b1b73" />
          </linearGradient>
        </defs>

        {/* shield stack */}
        <use href="#ayan-sh" fill="#0b1b73" />
        <use href="#ayan-sh" fill="none" stroke="#0b1b73" strokeWidth="10" transform="translate(300 372) scale(0.955) translate(-300 -372)" />
        <use href="#ayan-sh" fill="#d0131f" transform="translate(300 372) scale(0.905) translate(-300 -372)" />
        <use href="#ayan-sh" fill="#ffffff" transform="translate(300 372) scale(0.855) translate(-300 -372)" />
        <use href="#ayan-sh" fill="url(#ayan-gold)" transform="translate(300 372) scale(0.815) translate(-300 -372)" />
        <use href="#ayan-sh" fill="none" stroke="#d0131f" strokeWidth="5" transform="translate(300 372) scale(0.79) translate(-300 -372)" />

        {/* strapline arc */}
        <text fontFamily="Inter, Segoe UI, Arial, sans-serif" fontSize="46" fontWeight="800" fill="#0b1b73">
          <textPath href="#ayan-arc" startOffset="50%" textAnchor="middle">
            {BRAND.claim}
          </textPath>
        </text>
        <text x="520" y="300" fontFamily="Inter, Arial, sans-serif" fontSize="34" fontWeight="700" fill="#0b1b73">
          ®
        </text>

        {/* crown */}
        <g transform="translate(300 322)">
          <path
            d="M-96 26 L-104 -34 L-58 2 L-30 -44 L0 6 L30 -44 L58 2 L104 -34 L96 26 Z"
            fill="url(#ayan-crown)"
            stroke="#d0131f"
            strokeWidth="5"
            strokeLinejoin="round"
          />
          <rect x="-98" y="26" width="196" height="18" rx="6" fill="url(#ayan-crown)" stroke="#d0131f" strokeWidth="5" />
          <circle cx="-30" cy="-50" r="8" fill="#ff5b4a" stroke="#d0131f" strokeWidth="4" />
          <circle cx="30" cy="-50" r="8" fill="#ff5b4a" stroke="#d0131f" strokeWidth="4" />
          <text x="0" y="24" textAnchor="middle" fontFamily="Georgia, Times New Roman, serif" fontSize="44" fontWeight="700" fill="#ffd21f" stroke="#d0131f" strokeWidth="1.5">
            A
          </text>
        </g>

        {/* AYAN */}
        <text
          x="300"
          y="452"
          textAnchor="middle"
          fontFamily="Georgia, Times New Roman, serif"
          fontSize="132"
          fontWeight="700"
          letterSpacing="6"
          fill="#e11d2e"
          stroke="#ffffff"
          strokeWidth="7"
          style={{ paintOrder: "stroke" }}
        >
          AYAN
        </text>
        <text x="300" y="452" textAnchor="middle" fontFamily="Georgia, Times New Roman, serif" fontSize="132" fontWeight="700" letterSpacing="6" fill="none" stroke="#ffd21f" strokeWidth="1.5">
          AYAN
        </text>

        <text x="300" y="502" textAnchor="middle" fontFamily="Inter, Arial, sans-serif" fontSize="34" fontWeight="800" fill="#0b1b73" stroke="#ffffff" strokeWidth="5" style={{ paintOrder: "stroke" }}>
          {BRAND.strapline}
        </text>
        <rect x="118" y="522" width="364" height="7" fill="#0b1b73" />
        <rect x="140" y="538" width="320" height="5" fill="#0b1b73" />

        {/* rays */}
        <g stroke="#0b1b73" strokeWidth="9" strokeLinecap="round">
          <line x1="300" y1="588" x2="300" y2="556" />
          <line x1="252" y1="596" x2="264" y2="562" />
          <line x1="348" y1="596" x2="336" y2="562" />
          <line x1="214" y1="614" x2="238" y2="580" />
          <line x1="386" y1="614" x2="362" y2="580" />
          <line x1="186" y1="640" x2="222" y2="614" />
          <line x1="414" y1="640" x2="378" y2="614" />
        </g>

        <text x="300" y="646" textAnchor="middle" fontFamily="Inter, Arial, sans-serif" fontSize="44" fontWeight="800" fontStyle="italic" letterSpacing="2" fill="#0b1b73" stroke="#ffffff" strokeWidth="4" style={{ paintOrder: "stroke" }}>
          {BRAND.tagline}
        </text>

        {/* banner */}
        <path d="M92 664 C210 640 390 640 508 664 C520 682 520 700 508 716 C390 742 210 742 92 716 C80 698 80 682 92 664 Z" fill="url(#ayan-banner)" />
        <g fill="#ffd21f">
          <polygon points="126,690 132,704 147,704 135,713 140,728 126,719 112,728 117,713 105,704 120,704" />
          <polygon points="180,684 186,698 201,698 189,707 194,722 180,713 166,722 171,707 159,698 174,698" />
          <polygon points="300,678 308,696 327,696 312,708 318,727 300,715 282,727 288,708 273,696 292,696" />
          <polygon points="420,684 426,698 441,698 429,707 434,722 420,713 406,722 411,707 399,698 414,698" />
          <polygon points="474,690 480,704 495,704 483,713 488,728 474,719 460,728 465,713 453,704 468,704" />
        </g>
        <g transform="translate(300 692)">
          <polygon points="0,-46 12,-15 45,-14 19,6 28,39 0,20 -28,39 -19,6 -45,-14 -12,-15" fill="#0b1b73" />
          <circle cx="0" cy="2" r="9" fill="#ffd21f" />
        </g>
      </svg>

      {showWordmark && (
        <span className="leading-tight hidden sm:block" style={{ marginLeft: 10 }}>
          <span className="font-display font-bold text-[16px] tracking-tight text-navy-800" style={{ display: "block" }}>
            AYAN INSTITUTE
          </span>
          <span className="text-[11px] tracking-[0.12em] text-slate-500 font-medium" style={{ display: "block" }}>
            {BRAND.strapline.toUpperCase()}
          </span>
        </span>
      )}
    </span>
  );
}