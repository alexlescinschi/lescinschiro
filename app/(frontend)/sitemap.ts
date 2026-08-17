import type { MetadataRoute } from "next";
import { getPayload } from "payload";
import config from "@payload-config";
import { site } from "@/data/content";
import { getPublicIntegrationSitemapEntries } from "@/lib/integrations";

// ponytail: nu prerandera la build (DB inaccesibil în Docker build stage)
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let servicii: { slug: string; updatedAt: string }[] = [];
  let blog: { slug: string; updatedAt: string }[] = [];
  try {
    const payload = await getPayload({ config });
    const [serviceResult, blogResult] = await Promise.all([
      payload.find({
        collection: "servicii",
        limit: 100,
        depth: 0,
        select: { slug: true, updatedAt: true },
      }),
      payload.find({
        collection: "blog",
        limit: 100,
        depth: 0,
        where: {
          and: [
            { _status: { equals: "published" } },
            {
              or: [
                { publicatLa: { less_than_equal: new Date().toISOString() } },
                { publicatLa: { exists: false } },
              ],
            },
          ],
        },
        select: { slug: true, updatedAt: true },
      }),
    ]);
    servicii = serviceResult.docs.flatMap((doc) => doc.slug ? [{ slug: doc.slug, updatedAt: doc.updatedAt }] : []);
    blog = blogResult.docs.flatMap((doc) => doc.slug ? [{ slug: doc.slug, updatedAt: doc.updatedAt }] : []);
  } catch {
    // Paginile statice rămân disponibile când CMS-ul este temporar inaccesibil.
  }
  const integrations = await getPublicIntegrationSitemapEntries();

  const staticPages: MetadataRoute.Sitemap = [
    { url: site.domain, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${site.domain}/portofoliu`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.domain}/proces`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${site.domain}/despre-noi`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${site.domain}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.domain}/verificare-ai`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.domain}/calculator-google-ads`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.domain}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${site.domain}/integrari`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.domain}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
    { url: `${site.domain}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
  ];

  return [
    ...staticPages,
    ...servicii.map((d) => ({
      url: `${site.domain}/servicii/${d.slug}`,
      lastModified: new Date(d.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...blog.map((d) => ({
      url: `${site.domain}/blog/${d.slug}`,
      lastModified: new Date(d.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...integrations.map((integration) => ({
      url: `${site.domain}/integrari/${integration.slug}`,
      lastModified: new Date(integration.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
