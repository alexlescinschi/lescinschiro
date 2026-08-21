import type { Metadata } from "next";
import { getPayload } from "payload";
import config from "@payload-config";
import BlogList from "@/components/BlogList";
import { site } from "@/data/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog — Articole Web, SEO & Magazin Online",
  description:
    "Articole despre creare site-uri, magazine online, SEO pentru Moldova, integrări plăți & curierat, AI și automatizări. Ghiduri practice scrise de echipa LESCINSCHI.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog — LESCINSCHI",
    description: "Articole web, SEO, magazin online, integrări. Scrise de echipa LESCINSCHI.",
    url: `${site.domain}/blog`,
  },
};

const CATEGORIE_LABEL: Record<string, string> = {
  "magazin-online": "Magazin online",
  seo: "SEO",
  "web-design": "Web design",
  integrari: "Integrări",
  "ai-automatizari": "AI & Automatizări",
  sfaturi: "Sfaturi",
};

// ponytail: helper timp citire din rich text (~200 cuv/min)
function readingTime(continut: unknown): number {
  const text = JSON.stringify(continut ?? "");
  const words = (text.match(/[A-Za-zăâîșțĂÂÎȘȚ]+/g) || []).length;
  return Math.max(1, Math.round(words / 200));
}

function formatDate(d?: string): string {
  if (!d) return "";
  try {
    return new Date(d).toLocaleDateString("ro-RO", { day: "numeric", month: "long", year: "numeric" });
  } catch {
    return "";
  }
}

export default async function Page() {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "blog",
    depth: 1,
    limit: 100,
    sort: "-publicatLa",
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
  });

  const posts = docs.map((p) => ({
    slug: (p.slug as string) || "",
    titlu: (p.titlu as string) || "",
    excerpt: (p.excerpt as string) || "",
    categorie: (p.categorie as string) || "",
    categorieLabel: CATEGORIE_LABEL[(p.categorie as string) || ""] || "",
    autor: (p.autor as string) || "Alex Lescinschi",
    data: formatDate(p.publicatLa as string),
    cover:
      p.coverImage && typeof p.coverImage === "object" && "url" in p.coverImage
        ? (p.coverImage as { url: string }).url
        : "",
    readingTime: readingTime(p.continut),
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Blog LESCINSCHI",
    url: `${site.domain}/blog`,
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.titlu,
      url: `${site.domain}/blog/${p.slug}`,
      description: p.excerpt,
      datePublished: p.data,
      author: { "@type": "Person", name: p.autor },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BlogList posts={posts} />
    </>
  );
}
