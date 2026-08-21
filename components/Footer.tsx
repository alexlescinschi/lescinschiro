"use client";
import Link from "next/link";
import LiveClock from "./LiveClock";
import { site, nav } from "@/data/content";

const digits = site.phone.replace(/[^\d]/g, ""); // pentru wa.me / tel:

export default function Footer() {
  const toTop = () => {
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: number) => void } }).__lenis;
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">
      {/* sus: iconițe pe stânga, buton mare pe dreapta (ca la k72) */}
      <div className="footer__bar">
        <div className="footer__icons">
          <a className="footer__icon" href={`tel:+${digits}`} aria-label="Sună">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.98.36 1.94.7 2.86a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.92.34 1.88.57 2.86.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </a>
          <a className="footer__icon" href={`https://wa.me/${digits}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2a10 10 0 0 0-8.53 15.25L2 22l4.9-1.42A10 10 0 1 0 12 2zm0 18.13a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-2.9.85.86-2.83-.2-.3A8.13 8.13 0 1 1 12 20.13zm4.5-6.1c-.25-.12-1.46-.72-1.68-.8-.23-.08-.4-.12-.56.13-.16.25-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.23-1.46-1.37-1.71-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.42h-.48c-.16 0-.43.06-.65.31-.22.25-.86.84-.86 2.05 0 1.21.88 2.38 1 2.54.12.16 1.73 2.64 4.2 3.7.59.26 1.04.4 1.4.52.59.18 1.12.16 1.55.1.47-.07 1.46-.6 1.66-1.17.2-.58.2-1.07.14-1.17-.06-.11-.22-.18-.47-.3z" />
            </svg>
          </a>
          <a className="footer__icon" href={`mailto:${site.email}`} aria-label="Email">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 6-10 7L2 6" />
            </svg>
          </a>
        </div>
        <a className="footer__cta" href="/contact">Comandă site <span aria-hidden="true">♥</span></a>
      </div>

      {/* rândul de jos, lipit de baza footerului */}
      <div className="footer__bottom">
        <span className="footer__loc">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" width="15" height="15">
            <circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
          </svg>
          <LiveClock />
        </span>

        {/* meniu inline (nu sub buton); dacă un punct capătă subpuncte, ele se deschid în SUS */}
        <nav className="footer__menu" aria-label="Meniu">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="footer__mi">{n.label}</a>
          ))}
          <Link href="/privacy" className="footer__mi">Confidențialitate</Link>
          <Link href="/terms" className="footer__mi">Termeni</Link>
        </nav>

        <button className="footer__totop" onClick={toTop}>Înapoi sus ↑</button>
      </div>
    </footer>
  );
}
