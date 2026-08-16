import type { Metadata } from "next";
import { cache } from "react";
import { notFound } from "next/navigation";
import IntegrationDetailPage from "@/components/integrations/IntegrationDetailPage";
import { getIntegrationRelations, getPublicIntegration, INTEGRATION_REGIONS } from "@/lib/integrations";
import { site } from "@/data/content";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

const getIntegration = cache(getPublicIntegration);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const integration = await getIntegration(slug);
  if (!integration) return { title: "Integrarea nu a fost găsită", robots: { index: false, follow: false } };

  const url = `${site.domain}/integrari/${integration.slug}`;
  const image = integration.logo ? `${site.domain}${integration.logo}` : undefined;
  return {
    title: { absolute: integration.metaTitle },
    description: integration.metaDescription,
    alternates: { canonical: `/integrari/${integration.slug}` },
    openGraph: {
      type: "website",
      title: integration.metaTitle,
      description: integration.metaDescription,
      url,
      images: image ? [{ url: image, alt: integration.logoAlt }] : [],
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const integration = await getIntegration(slug);
  if (!integration) notFound();

  const relations = await getIntegrationRelations(integration.id);
  const url = `${site.domain}/integrari/${integration.slug}`;
  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Integrare ${integration.name}`,
    description: integration.metaDescription,
    url,
    serviceType: "Integrare software și API",
    areaServed: integration.regions.map((region) => INTEGRATION_REGIONS[region]),
    provider: {
      "@type": "Organization",
      name: site.name,
      url: site.domain,
    },
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Acasă", item: site.domain },
      { "@type": "ListItem", position: 2, name: "Integrări", item: `${site.domain}/integrari` },
      { "@type": "ListItem", position: 3, name: integration.name, item: url },
    ],
  };
  const faqLd = integration.faq.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: integration.faq.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  } : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      {faqLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />}
      <IntegrationDetailPage integration={integration} relations={relations} />
    </>
  );
}
