import type { Metadata } from "next";
import { getIntegrationCatalog } from "@/lib/integrations";
import IntegrationsPage, { integrationHubFaqs } from "@/components/integrations/IntegrationsPage";
import { site } from "@/data/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Integrări API, plăți, curierat și ERP pentru Moldova și internațional",
  description: "Catalog de integrări pentru magazine și site-uri: plăți, curieri, ERP, facturare, CRM, marketplace, analytics și automatizări.",
  alternates: { canonical: "/integrari" },
  openGraph: {
    title: "Integrări care conectează sistemele afacerii tale",
    description: "Plăți, curierat, ERP, CRM, marketplace și automatizări pentru Moldova și proiecte internaționale.",
    url: `${site.domain}/integrari`,
  },
};

export default async function Page() {
  const { items, total } = await getIntegrationCatalog();
  const pageUrl = `${site.domain}/integrari`;

  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Catalog integrări LESCINSCHI",
    description: metadata.description,
    url: pageUrl,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: total,
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url: item.hasPublicPage
          ? `${site.domain}/integrari/${item.slug}`
          : `${site.domain}/contact?integrare=${item.slug}`,
      })),
    },
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Acasă", item: site.domain },
      { "@type": "ListItem", position: 2, name: "Integrări", item: pageUrl },
    ],
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: integrationHubFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <IntegrationsPage items={items} total={total} />
    </>
  );
}
