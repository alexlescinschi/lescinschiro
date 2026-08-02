import { notFound } from "next/navigation";
import { getPayload } from "payload";
import config from "@payload-config";
import type { Metadata } from "next";
import ServicePage from "@/components/servicii/ServicePage";

// ponytail: nu prerandera la build (DB inaccesibil în Docker build stage)
export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

async function getPage(slug: string) {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "servicii",
    where: { slug: { equals: slug } },
    depth: 1,
    limit: 1,
  });
  return docs[0] || null;
}

async function getProjects(serviceId: number, serviceTitle: string) {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "proiecte",
    where: { servicii: { equals: serviceId } },
    depth: 1,
    limit: 10,
    sort: "-createdAt",
  });
  return docs.map((project) => ({
    name: project.titlu || "",
    tag: serviceTitle,
    img:
      project.imagine && typeof project.imagine === "object" && "url" in project.imagine
        ? (project.imagine as { url: string }).url
        : "",
    href: project.linkLive || "",
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPage(slug);
  if (!page) return { title: "Pagina nu a fost găsită" };

  const metaTitle = page.metaTitlu || `${page.titlu} — LESCINSCHI`;
  const metaDesc = (page.descriereScurta as string) || "";
  return {
    title: { absolute: metaTitle }, // metaTitlu conține deja brandul — nu aplica template-ul din layout
    description: metaDesc,
    alternates: { canonical: `/servicii/${slug}` },
    openGraph: {
      title: metaTitle,
      description: metaDesc,
      images: page.imagine && typeof page.imagine === "object" && "url" in page.imagine
        ? [(page.imagine as { url: string }).url]
        : [],
    },
  };
}

export default async function ServiciuPage({ params }: Props) {
  const { slug } = await params;
  const page = await getPage(slug);
  if (!page) notFound();

  const projects = await getProjects(page.id, page.titlu);
  const heroImages = projects.map((project) => project.img).filter(Boolean).slice(0, 9);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.titlu,
    description: page.descriereScurta,
    provider: { "@type": "Organization", name: "LESCINSCHI" },
    offers: page.pret
      ? { "@type": "Offer", price: String(page.pret).replace(/[^0-9]/g, ""), priceCurrency: "EUR" }
      : undefined,
  };

  // FAQ rich snippets în Google
  const faq = (page.faq as { intrebare: string; raspuns: string }[] | undefined) || [];
  const faqLd = faq.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faq.map((f) => ({
          "@type": "Question",
          name: f.intrebare,
          acceptedAnswer: { "@type": "Answer", text: f.raspuns },
        })),
      }
    : null;

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Acasă", item: "/" },
      { "@type": "ListItem", position: 2, name: "Servicii", item: "/#servicii" },
      { "@type": "ListItem", position: 3, name: page.titlu },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {faqLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <ServicePage page={page} projects={projects} heroImages={heroImages} />
    </>
  );
}
