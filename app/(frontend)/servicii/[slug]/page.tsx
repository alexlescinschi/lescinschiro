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

const CATEGORIE_LABEL: Record<string, string> = {
  "magazin-online": "Magazin online",
  corporativ: "Corporativ",
  "landing-page": "Landing page",
};

async function getProjects(categorie: string) {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "proiecte",
    where: { categorie: { equals: categorie } },
    depth: 1,
    limit: 10,
    sort: "-createdAt",
  });
  return docs.map((p) => ({
    name: (p.titlu as string) || "",
    tag: CATEGORIE_LABEL[categorie] || "",
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

  const metaTitle = (page as any).metaTitlu || `${page.titlu} — LESCINSCHI`;
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

  const categorie = (page.categorie as string) || "";
  const projects = categorie ? await getProjects(categorie) : [];
  const heroImages = categorie ? await getHeroImages(categorie) : [];

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
      <ServicePage page={page as any} projects={projects} heroImages={heroImages} />
    </>
  );
}
