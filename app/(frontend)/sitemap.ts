import type { MetadataRoute } from "next";
import { getPayload } from "payload";
import config from "@payload-config";
import { site } from "@/data/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({ collection: "servicii", limit: 100, depth: 0 });
  return [
    { url: site.domain, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    ...docs.map((d) => ({
      url: `${site.domain}/servicii/${d.slug}`,
      lastModified: new Date(d.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
