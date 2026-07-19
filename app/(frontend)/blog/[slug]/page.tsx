import { notFound } from "next/navigation";
import { getPayload } from "payload";
import config from "@payload-config";
import type { Metadata } from "next";
import BlogArticle from "@/components/BlogArticle";
import { site } from "@/data/content";

// ponytail: nu prerandera la build (DB inaccesibil în Docker build stage)
export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

async function getPost(slug: string) {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "blog",
    where: { slug: { equals: slug } },
    depth: 1,
    limit: 1,
  });
  return docs[0] || null;
}

// ponytail: helper timp citire din rich text
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Articolul nu a fost găsit" };

  const seo = (post as any).seo || {};
  const metaTitle = seo.titluSEO || `${post.titlu} — LESCINSCHI`;
  const metaDesc = seo.descriereSEO || (post.excerpt as string) || "";
  const cover =
    post.coverImage && typeof post.coverImage === "object" && "url" in post.coverImage
      ? (post.coverImage as { url: string }).url
      : "";

  return {
    title: { absolute: metaTitle },
    description: metaDesc,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      title: metaTitle,
      description: metaDesc,
      url: `${site.domain}/blog/${slug}`,
      images: cover ? [cover] : [],
      publishedTime: (post.publicatLa as string) || undefined,
      authors: [(post.autor as string) || "Alex Lescinschi"],
      tags: [(post.categorie as string) || ""].filter(Boolean),
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const data = formatDate(post.publicatLa as string);
  const cover =
    post.coverImage && typeof post.coverImage === "object" && "url" in post.coverImage
      ? (post.coverImage as { url: string }).url
      : "";

  // JSON-LD Article — pentru rich snippets Google.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.titlu,
    description: post.excerpt,
    image: cover ? [cover] : undefined,
    datePublished: (post.publicatLa as string) || undefined,
    dateModified: (post.updatedAt as string) || undefined,
    author: { "@type": "Person", name: (post.autor as string) || "Alex Lescinschi" },
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: site.domain,
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${site.domain}/blog/${slug}` },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Acasă", item: "/" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "/blog" },
      { "@type": "ListItem", position: 3, name: post.titlu },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <BlogArticle
        post={{
          titlu: post.titlu as string,
          categorie: (post.categorie as string) || "",
          autor: (post.autor as string) || "Alex Lescinschi",
          data,
          cover,
          readingTime: readingTime(post.continut),
          continut: post.continut,
        }}
      />
    </>
  );
}
