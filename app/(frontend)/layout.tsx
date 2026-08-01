import type { Metadata } from "next";
import "../globals.css";
import { getPayload } from "payload";
import config from "@payload-config";
import { services as fallbackServices, site } from "@/data/content";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Intro from "@/components/Intro";
import Nav, { type NavService } from "@/components/Nav";
import Footer from "@/components/Footer";

// Font global: Helvetica Neue (cdnfonts) — montat via @import în globals.css.

// Paginile statice reiau periodic serviciile, fără a interoga CMS-ul la fiecare vizită.
export const revalidate = 300;

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

async function getNavServices(): Promise<NavService[]> {
  try {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: "servicii",
      depth: 1,
      limit: 50,
      sort: "ordine",
      select: {
        titlu: true,
        slug: true,
        descriereScurta: true,
        imagine: true,
        ordine: true,
      },
    });

    const services = docs.flatMap((service) => {
      if (!service.slug) return [];
      const image = typeof service.imagine === "object" ? service.imagine.url || "" : "";
      return [{
        title: service.titlu,
        desc: service.descriereScurta || "",
        href: `/servicii/${service.slug}`,
        image,
      }];
    });

    if (services.length) return services;
  } catch {
    // Navigația rămâne utilizabilă și înainte ca baza de date să fie disponibilă.
  }

  return fallbackServices.map(({ title, desc, href }) => ({ title, desc, href, image: "" }));
}

export default async function FrontendLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const services = await getNavServices();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* ponytail: dacă JS nu rulează, [data-reveal] rămâne opacity:0 ascuns.
          Acest noscript forțează vizibilitatea fără animație. */}
      <noscript>
        <style>{`[data-reveal]{opacity:1 !important;transform:none !important}`}</style>
      </noscript>
      <Intro />
      <Cursor />
      <SmoothScroll>
        <Nav services={services} />
        {children}
        <Footer />
      </SmoothScroll>
    </>
  );
}
