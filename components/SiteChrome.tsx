"use client";
// Site chrome (public navbar, banner, footer, chat bot, WhatsApp button) is
// rendered here so it can be suppressed on consoles that bring their own shell.
// The admin console has its own header, nav and logout, so stacking the public
// navbar on top of it is both redundant and confusing.
import { usePathname } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import RagBot from "@/components/RagBot";
import Banner from "@/components/Banner";

const BARE_ROUTES = ["/admin"];
// Task-focused pages: the chat launcher would sit on top of form fields on a phone.
const NO_CHAT_ROUTES = ["/admission", "/apply", "/login"];

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "/";
  const bare = BARE_ROUTES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  const hideChat = NO_CHAT_ROUTES.some((p) => pathname === p || pathname.startsWith(`${p}/`));

  if (bare) {
    // No public chrome: the console owns the full viewport.
    return <main className="min-h-screen">{children}</main>;
  }

  return (
    <>
      <Banner />
      <SiteHeader />
      <main>{children}</main>
      <Footer />
      {!hideChat && <RagBot />}
      <a
        href="https://api.whatsapp.com/send?phone=918886667222"
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
        className="fixed bottom-[76px] right-4 lg:bottom-6 lg:right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white grid place-items-center shadow-lg hover:scale-105 transition"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.05 4.94A9.82 9.82 0 0 0 12.04 2C6.58 2 2.14 6.44 2.14 10.9c0 1.57.41 3.1 1.19 4.45L2 22l6.82-1.78a9.86 9.86 0 0 0 4.72 1.2h.01c5.46 0 9.9-4.44 9.9-9.9 0-2.64-1.03-5.13-2.9-6.99l.01.01ZM12.05 19.6h-.01a8.03 8.03 0 0 1-4.09-1.12l-.29-.17-4.05 1.06 1.08-3.95-.19-.31a8.08 8.08 0 0 1-1.24-4.21c0-4.48 3.65-8.13 8.14-8.13 2.17 0 4.21.85 5.75 2.38a8.07 8.07 0 0 1 2.38 5.75c0 4.48-3.64 8.13-8.13 8.13l.55-.43ZM17.42 13.7c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.39-.41-.54-.42l-.46-.01c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.69 2.58 4.1 3.62.57.25 1.02.4 1.37.51.58.18 1.1.16 1.51.1.46-.07 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" />
        </svg>
      </a>
    </>
  );
}