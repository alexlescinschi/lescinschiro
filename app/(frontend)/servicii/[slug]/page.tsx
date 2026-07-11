import { notFound } from "next/navigation";
import { getPayload } from "payload";
import config from "@payload-config";
import type { Metadata } from "next";
import ServicePage from "@/components/servicii/ServicePage";

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

async function getHeroImages(categorie?: string) {
  const payload = await getPayload({ config });
  const query: any = { collection: "proiecte", depth: 1, limit: 9, sort: "-createdAt" };
  if (categorie) query.where = { categorie: { equals: categorie } };
  const { docs } = await payload.find(query);
  return docs.map((p: any) =>
    p.imagine && typeof p.imagine === "object" && "url" in p.imagine
      ? (p.imagine as { url: string }).url
      : ""
  ).filter(Boolean);
}

async function getProjects() {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "proiecte",
    where: { categorie: { equals: "magazin-online" } },
    depth: 1,
    limit: 10,
    sort: "-createdAt",
  });
  return docs.map((p) => ({
    name: (p.titlu as string) || "",
    tag: "Magazin online",
    img:
      p.imagine && typeof p.imagine === "object" && "url" in p.imagine
        ? (p.imagine as { url: string }).url
        : "",
    href: (p.linkLive as string) || "",
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPage(slug);
  if (!page) return { title: "Pagina nu a fost găsită" };

  const seo = (page as any).seo || {};
  return {
    title: seo.titluSEO || `${page.titlu} — LESCINSCHI`,
    description: seo.descriereSEO || page.descriereScurta || "",
    alternates: { canonical: `/servicii/${slug}` },
    openGraph: {
      title: seo.titluSEO || `${page.titlu} — LESCINSCHI`,
      description: seo.descriereSEO || (page.descriereScurta as string) || "",
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

  const projects = slug === "magazine-online" ? await getProjects() : [];
  const heroImages = slug === "magazine-online" ? await getHeroImages("magazin-online") : [];

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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicePage page={page as any} projects={projects} heroImages={heroImages} />
    </>
  );
}
