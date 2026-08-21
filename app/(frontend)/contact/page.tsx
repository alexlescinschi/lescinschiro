import type { Metadata } from "next";
import { getPayload } from "payload";
import config from "@payload-config";
import { projects as fallbackProjects, site } from "@/data/content";
import ContactPage from "@/components/ContactPage";
import type { ContactProject } from "@/components/ContactResults";
import { getPrimaryService } from "@/lib/project-services";
import { getPublishedIntegrationRequest } from "@/lib/integrations";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactează LESCINSCHI: telefon, email, WhatsApp. Chișinău, Moldova. Ofertă fixă în 24–48h. Site-uri, magazine online, integrări și SEO pentru Moldova.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact — LESCINSCHI",
    description:
      "Site-uri, magazine online, integrări, SEO. Răspundem în 24h. Chișinău, Moldova.",
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
  telephone: [site.phone],
  image: `${site.domain}/work/p05.png`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Chișinău",
    addressCountry: "MD",
  },
  areaServed: ["MD", "GB", "IT", "BG", "SK", "PL", "UA", "CY", "ES", "PT"],
  openingHours: "Mo-Fr 09:00-18:00",
  priceRange: "€€",
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
        servicii: true,
        linkLive: true,
      },
    });
    const projects = docs.flatMap((project) => {
      const img = typeof project.imagine === "object" ? project.imagine.url || "" : "";
      if (!img) return [];
      const primaryService = getPrimaryService(project);
      return [{
        name: project.titlu,
        tag: primaryService?.title || "Proiect digital",
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

async function getServices(): Promise<{ title: string; slug: string }[]> {
  try {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: "servicii",
      depth: 0,
      limit: 50,
      sort: "ordine",
    });
    return docs.map((s) => ({ title: (s as { titlu: string }).titlu, slug: (s as { slug: string }).slug }));
  } catch {
    return [];
  }
}

type Props = {
  searchParams: Promise<{ integrare?: string | string[] }>;
};

export default async function Page({ searchParams }: Props) {
  const params = await searchParams;
  const requestedValue = Array.isArray(params.integrare) ? params.integrare[0] : params.integrare;
  const requestedSlug = requestedValue?.trim().toLowerCase() || "";
  const canResolveIntegration = /^[a-z0-9-]{1,80}$/.test(requestedSlug);
  const [projects, services, integration] = await Promise.all([
    getProjects(),
    getServices(),
    canResolveIntegration ? getPublishedIntegrationRequest(requestedSlug) : Promise.resolve(null),
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ContactPage
        projects={projects}
        services={services}
        integration={integration}
        integrationMode={Boolean(requestedValue)}
      />
    </>
  );
}
