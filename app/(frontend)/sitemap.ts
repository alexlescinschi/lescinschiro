import type { MetadataRoute } from "next";
import { getPayload } from "payload";
import config from "@payload-config";
import { site } from "@/data/content";

// ponytail: nu prerandera la build (DB inaccesibil în Docker build stage)
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload({ config });
  const [servicii, blog] = await Promise.all([
    payload.find({ collection: "servicii", limit: 100, depth: 0 }),
    payload.find({
      collection: "blog",
      limit: 100,
      depth: 0,
      where: { _status: { equals: "published" } },
    }),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    { url: site.domain, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${site.domain}/portofoliu`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.domain}/proces`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${site.domain}/despre-noi`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${site.domain}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.domain}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
  ];

  return [
    ...staticPages,
    ...servicii.docs.map((d) => ({
      url: `${site.domain}/servicii/${d.slug}`,
      lastModified: new Date(d.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...blog.docs.map((d) => ({
      url: `${site.domain}/blog/${d.slug}`,
      lastModified: new Date(d.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
