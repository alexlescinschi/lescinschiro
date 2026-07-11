import type { Metadata } from "next";
import "../globals.css";
import { site } from "@/data/content";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Intro from "@/components/Intro";

// Font global: Helvetica Neue (cdnfonts) — montat via @import în globals.css.

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default: "LESCINSCHI — Creare site-uri, magazine online & SEO România",
    template: "%s — LESCINSCHI",
  },
  description:
    "Agenție web: creare site-uri, magazine online, landing page-uri și site-uri corporative. Integrări plăți, curierat și API. SEO pentru România și automatizări AI.",
  keywords: [
    "creare site", "magazin online", "site corporativ", "landing page",
    "SEO România", "integrare plăți online", "integrare curierat", "agenție web",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ro_RO",
    url: site.domain,
    siteName: site.name,
    title: "LESCINSCHI — Creare site-uri, magazine online & SEO România",
    description:
      "Site-uri, magazine online și integrări care aduc clienți. SEO pentru România, automatizări AI.",
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.domain,
  email: site.email,
  areaServed: ["RO", "MD", "FR", "US"],
  makesOffer: [
    "Creare site-uri", "Magazine online", "Landing page-uri", "Site-uri corporative",
    "Integrări plăți online", "Integrări curierat", "Integrări API", "SEO România", "AI & Automatizări",
  ].map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s } })),
};

export default function FrontendLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Intro />
      <Cursor />
      <SmoothScroll>{children}</SmoothScroll>
    </>
  );
}
