import type { Metadata } from "next";
import { getPayload } from "payload";
import config from "@payload-config";
import { projects as fallbackProjects, site } from "@/data/content";
import ContactPage from "@/components/ContactPage";
import type { ContactProject } from "@/components/ContactResults";

export const revalidate = 300;

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

const categoryLabels: Record<string, string> = {
  "magazin-online": "Magazin online",
  corporativ: "Site corporativ",
  "landing-page": "Landing page",
};

async function getProjects(): Promise<ContactProject[]> {
  try {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: "proiecte",
      depth: 1,
      limit: 12,
      sort: "-createdAt",
      select: {
        titlu: true,
        imagine: true,
        categorie: true,
        linkLive: true,
      },
    });
    const projects = docs.flatMap((project) => {
      const img = typeof project.imagine === "object" ? project.imagine.url || "" : "";
      if (!img) return [];
      return [{
        name: project.titlu,
        tag: categoryLabels[project.categorie || ""] || "Proiect digital",
        img,
        href: project.linkLive || "",
      }];
    });
    if (projects.length) return projects;
  } catch {
    // Pagina rămâne completă și dacă CMS-ul nu este disponibil temporar.
  }

  return fallbackProjects.map((project) => ({ ...project, href: "" }));
}

export default async function Page() {
  const projects = await getProjects();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ContactPage projects={projects} />
    </>
  );
}
