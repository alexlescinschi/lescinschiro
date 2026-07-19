"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { RichText } from "@payloadcms/richtext-lexical/react";

type Post = {
  titlu: string;
  categorie: string;
  autor: string;
  data: string;
  cover: string;
  readingTime: number;
  continut: any;
};

const CATEGORIE_LABEL: Record<string, string> = {
  "magazin-online": "Magazin online",
  seo: "SEO",
  "web-design": "Web design",
  integrari: "Integrări",
  "ai-automatizari": "AI & Automatizări",
  sfaturi: "Sfaturi",
};

// Împarte titlul în 2-3 linii vizuale (ca la celelalte hero-uri), NU per cuvânt.
// ponytail: heuristică simplă — target ~5 cuvinte/linie; ajustează la ultima linie scurtă.
function chunkTitle(titlu: string): string[] {
  const words = titlu.split(" ").filter(Boolean);
  if (words.length <= 4) return [titlu];
  if (words.length <= 8) {
    const mid = Math.ceil(words.length / 2);
    return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
  }
  // titluri lungi: 3 linii
  const third = Math.ceil(words.length / 3);
  return [
    words.slice(0, third).join(" "),
    words.slice(third, third * 2).join(" "),
    words.slice(third * 2).join(" "),
  ];
}

export default function BlogArticle({ post }: { post: Post }) {
  const root = useRef<HTMLElement>(null);

  // Hero mask-reveal (ca Hero / Contact / Proces / Despre).
  // ponytail: gsap.fromTo garantează starea finală chiar dacă timing-ul pică.
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });
      tl.fromTo(".ba-hero .line__inner",
        { yPercent: 105 },
        { yPercent: 0, duration: 1, ease: "power4.out", stagger: 0.1 }
      ).fromTo(".ba-hero__meta",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.4"
      );
    }, root);
    return () => ctx.revert();
  }, []);

  const catLabel = CATEGORIE_LABEL[post.categorie] || post.categorie;

  return (
    <main ref={root as any}>
      {/* Hero articol */}
      <section className="ba-hero section">
        <div className="container">
          <div className="ba-hero__breadcrumb" data-reveal>
            <a href="/blog">← Blog</a>
          </div>
          <div data-reveal className="eyebrow" style={{ marginBottom: "1.4rem" }}>— {catLabel}</div>
          <h1 className="ba-hero__title">
            {chunkTitle(post.titlu).map((line, i) => (
              <span className="line" key={i}>
                <span className="line__inner">{line}</span>
              </span>
            ))}
          </h1>
          <div className="ba-hero__meta">
            <span>✍️ {post.autor}</span>
            {post.data && (<><span aria-hidden="true">·</span><span>📅 {post.data}</span></>)}
            <span aria-hidden="true">·</span>
            <span>⏱ {post.readingTime} min citire</span>
          </div>
        </div>
      </section>

      {/* Cover image */}
      {post.cover && (
        <div className="ba-cover container" data-reveal>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.cover} alt={post.titlu} />
        </div>
      )}

      {/* Conținut rich text */}
      <section className="section ba-prose-wrap">
        <div className="container ba-prose" data-reveal>
          {post.continut ? <RichText data={post.continut} /> : null}
        </div>
      </section>

      {/* CTA final */}
      <section className="section ba-cta">
        <div className="container ba-cta__inner">
          <h2 data-reveal className="ba-cta__title">Vrei un proiect ca cele despre care scriem?</h2>
          <div data-reveal className="ba-cta__btns">
            <a className="btn btn--solid" href="/contact">Cere ofertă →</a>
            <a className="btn" href="/servicii/magazine-online">Vezi serviciile</a>
          </div>
        </div>
      </section>
    </main>
  );
}
