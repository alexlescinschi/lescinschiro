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

export default function BlogArticle({ post }: { post: Post }) {
  const root = useRef<HTMLElement>(null);

  // Hero mask-reveal (ca Hero / Contact / Proces / Despre).
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.set(".ba-hero .line__inner", { yPercent: 105 });
      gsap.set(".ba-hero__meta", { opacity: 0, y: 20 });
      const tl = gsap.timeline({ delay: 0.3 });
      tl.to(".ba-hero .line__inner", { yPercent: 0, duration: 1, ease: "power4.out", stagger: 0.1 })
        .to(".ba-hero__meta", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.4");
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
            {post.titlu.split(" ").map((word, i, arr) => (
              <span className="line" key={i}>
                <span className="line__inner">
                  {word}{i < arr.length - 1 ? " " : ""}
                </span>
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
          <RichText data={post.continut} />
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
