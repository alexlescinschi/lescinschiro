"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Post = {
  slug: string;
  titlu: string;
  excerpt: string;
  categorie: string;
  categorieLabel: string;
  autor: string;
  data: string;
  cover: string;
  readingTime: number;
};

const CATEGORII: { label: string; value: string }[] = [
  { label: "Toate", value: "all" },
  { label: "Magazin online", value: "magazin-online" },
  { label: "SEO", value: "seo" },
  { label: "Web design", value: "web-design" },
  { label: "Integrări", value: "integrari" },
  { label: "AI & Automatizări", value: "ai-automatizari" },
  { label: "Sfaturi", value: "sfaturi" },
];

export default function BlogList({ posts }: { posts: Post[] }) {
  const root = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? posts : posts.filter((p) => p.categorie === filter);

  // Stagger reveal la carduri (fără elastic compression — prea agresiv pentru text).
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const cards = root.current?.querySelectorAll<HTMLElement>(".blog-card");
      if (!cards?.length) return;
      gsap.set(cards, { opacity: 0, y: 40 });
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power4.out",
        stagger: 0.08,
        scrollTrigger: { trigger: root.current, start: "top 75%", once: true },
      });
    }, root);
    return () => ctx.revert();
  }, [filter]);

  return (
    <section className="section container" id="blog" ref={root}>
      <span className="eyebrow" data-reveal>Blog</span>
      <h2 className="section-title" data-reveal>Articole & ghiduri.</h2>
      <p className="blog__lead" data-reveal>
        Ghiduri practice despre magazin online, SEO, web design și integrări pentru piața din România și Moldova.
      </p>

      {/* Filtru pe categorii (reuse .pf__filter style) */}
      <div className="pf__filters" data-reveal>
        {CATEGORII.map((c) => {
          const count = c.value === "all" ? posts.length : posts.filter((p) => p.categorie === c.value).length;
          if (c.value !== "all" && count === 0) return null; // ascunde categoriile goale
          return (
            <button
              key={c.value}
              className={`pf__filter${filter === c.value ? " is-active" : ""}`}
              onClick={() => setFilter(c.value)}
              aria-pressed={filter === c.value}
            >
              {c.label}
              <span className="pf__count">{count}</span>
            </button>
          );
        })}
      </div>

      <div className="blog__grid" key={filter}>
        {filtered.map((p) => (
          <article className="blog-card" key={p.slug}>
            <a className="blog-card__link" href={`/blog/${p.slug}`}>
              <figure className="blog-card__media">
                {p.cover ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img className="blog-card__img" src={p.cover} alt={`${p.titlu} — ${p.categorieLabel}`} loading="lazy" />
                ) : null}
              </figure>
              <div className="blog-card__body">
                <div className="blog-card__meta">
                  <span className="blog-card__cat">{p.categorieLabel}</span>
                  <span className="blog-card__dot" aria-hidden="true">·</span>
                  <span>{p.readingTime} min citire</span>
                </div>
                <h3 className="blog-card__title">{p.titlu}</h3>
                <p className="blog-card__excerpt">{p.excerpt}</p>
                <div className="blog-card__foot">
                  <span>{p.autor}</span>
                  {p.data && (<><span aria-hidden="true">·</span><span>{p.data}</span></>)}
                </div>
              </div>
            </a>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="pf__empty" data-reveal>Nu există articole în această categorie încă.</p>
      )}
    </section>
  );
}
