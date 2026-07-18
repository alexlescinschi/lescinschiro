import type { Metadata } from "next";
import { getPayload } from "payload";
import config from "@payload-config";
import PortfolioPage from "@/components/PortfolioPage";
import { site } from "@/data/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Portofoliu",
  description:
    "Proiecte LESCINSCHI: magazine online, site-uri corporative și landing page-uri livrate în România, Moldova, Franța și SUA. Filtre pe categorii.",
  alternates: { canonical: "/portofoliu" },
  openGraph: {
    title: "Portofoliu — LESCINSCHI",
    description: "Magazine online, site-uri corporative, landing page-uri. 40+ proiecte livrate.",
    url: `${site.domain}/portofoliu`,
  },
};

const CATEGORIE_LABEL: Record<string, string> = {
  "magazin-online": "Magazin online",
  corporativ: "Corporativ",
  "landing-page": "Landing page",
};

export default async function Page() {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "proiecte",
    depth: 1,
    limit: 100,
    sort: "-createdAt",
  });

  const projects = docs.map((p) => ({
    name: (p.titlu as string) || "",
    tag: CATEGORIE_LABEL[(p.categorie as string) || ""] || "",
    categorie: (p.categorie as string) || "",
    img:
      p.imagine && typeof p.imagine === "object" && "url" in p.imagine
        ? (p.imagine as { url: string }).url
        : "",
    href: (p.linkLive as string) || "",
  }));

  // JSON-LD CollectionPage — ajută la SEO pentru indexarea listei.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Portofoliu LESCINSCHI",
    url: `${site.domain}/portofoliu`,
    hasPart: projects.map((p) => ({
      "@type": "CreativeWork",
      name: p.name,
      url: p.href,
      about: p.tag,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PortfolioPage projects={projects} />
    </>
  );
}
