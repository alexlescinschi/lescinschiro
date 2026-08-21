import type { Metadata } from "next";
import { getPayload } from "payload";
import config from "@payload-config";
import PortfolioPage from "@/components/PortfolioPage";
import { site } from "@/data/content";
import { getProjectServices } from "@/lib/project-services";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Portofoliu",
  description:
    "Proiecte LESCINSCHI: magazine online, site-uri corporative și landing page-uri livrate în Moldova, Marea Britanie, Italia, Bulgaria, Slovacia, Polonia, Ucraina, Cipru, Spania și Portugalia. Filtre după servicii.",
  alternates: { canonical: "/portofoliu" },
  openGraph: {
    title: "Portofoliu — LESCINSCHI",
    description: "Magazine online, site-uri corporative, landing page-uri. 40+ proiecte livrate.",
    url: `${site.domain}/portofoliu`,
  },
};

export default async function Page() {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "proiecte",
    depth: 1,
    limit: 100,
    sort: "-createdAt",
  });

  const projects = docs.map((p) => {
    const services = getProjectServices(p);
    return {
      name: (p.titlu as string) || "",
      tag: services[0]?.title || "Proiect digital",
      services,
      img:
        p.imagine && typeof p.imagine === "object" && "url" in p.imagine
          ? (p.imagine as { url: string }).url
          : "",
      href: (p.linkLive as string) || "",
    };
  });

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
