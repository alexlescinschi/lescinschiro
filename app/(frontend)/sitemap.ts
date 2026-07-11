import type { MetadataRoute } from "next";
import { site } from "@/data/content";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: site.domain, lastModified: new Date(), changeFrequency: "monthly", priority: 1 }];
}
