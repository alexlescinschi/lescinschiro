import type { Metadata } from "next";
import { site } from "@/data/content";
import ContactPage from "@/components/ContactPage";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactează LESCINSCHI: telefon, email, WhatsApp. București, Sectorul 3. Ofertă fixă în 24–48h. Site-uri, magazine online, integrări și SEO pentru România și Moldova.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact — LESCINSCHI",
    description:
      "Site-uri, magazine online, integrări, SEO. Răspundem în 24h. București, Sectorul 3.",
    url: `${site.domain}/contact`,
    type: "website",
  },
};

// JSON-LD LocalBusiness — pentru local SEO (Map Pack).
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: site.name,
  url: `${site.domain}/contact`,
  email: site.email,
  telephone: [site.phone, site.phoneMD],
  image: `${site.domain}/work/p05.png`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "București",
    addressRegion: "Sectorul 3",
    addressCountry: "RO",
  },
  areaServed: ["RO", "MD", "FR", "US"],
  openingHours: "Mo-Fr 09:00-18:00",
  priceRange: "€€",
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ContactPage />
    </>
  );
}
