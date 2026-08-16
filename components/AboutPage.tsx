"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  aboutStory,
  aboutStats,
  aboutPrinciples,
  aboutStack,
  aboutHighlights,
  founder,
  aboutFaqs,
} from "@/data/content";

export default function AboutPage() {
  const root = useRef<HTMLElement>(null);

  // Hero mask-reveal + inel lime.
  // ponytail: gsap.fromTo garantează starea finală.
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });
      tl.fromTo(".ab-hero .line__inner", { yPercent: 105 }, { yPercent: 0, duration: 1, ease: "power4.out", stagger: 0.12 })
        .fromTo(".ab-hero .ring path", { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.9, ease: "power2.inOut" }, "-=0.3")
        .fromTo(".ab-hero__aside", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.5");
    }, root);
    return () => ctx.revert();
  }, []);

  // Stats counter (reuse logica WhyUs).
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".ab-stat__num").forEach((el) => {
        const span = el.firstChild as HTMLElement | null;
        if (!span) return;
        const end = Number(el.dataset.num || "0");
        const obj = { v: 0 };
        span.textContent = "0";
        gsap.to(obj, {
          v: end, duration: 1.6, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
          onUpdate: () => { span.textContent = String(Math.round(obj.v)); },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={root}>
      {/* 1. Hero */}
      <section className="ab-hero section">
        <div className="container">
          <div data-reveal className="eyebrow" style={{ marginBottom: "1.6rem" }}>— Despre noi</div>
          <h1 className="ab-hero__title">
            <span className="line"><span className="line__inner">Construim</span></span>
            <span className="line"><span className="line__inner">web de</span></span>
            <span className="line"><span className="line__inner">
              {" "}<span className="ring-word">10 ani
                <svg className="ring" viewBox="0 0 300 120" preserveAspectRatio="none" aria-hidden="true">
                  <path pathLength={1} d="M150 12 C 62 8, 14 42, 22 68 C 30 98, 132 112, 212 105 C 286 98, 296 58, 248 34 C 206 14, 118 6, 66 22" />
                </svg>
              </span>
            </span></span>
          </h1>
          <p className="ab-hero__aside">De la Chișinău la București, din 2016 livrăm site-uri, magazine și integrări pentru clienți din 4 țări.</p>
        </div>
      </section>

      {/* 2. Povestea */}
      <section className="section ab-story">
        <div className="container ab-story__grid">
          <div data-reveal className="ab-story__head">
            <span className="eyebrow">Povestea</span>
          </div>
          <div className="ab-story__text">
            {aboutStory.map((p, i) => (
              <p data-reveal key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Stats */}
      <section className="section ab-stats">
        <div className="container ab-stats__grid">
          {aboutStats.map((s) => (
            <div data-reveal key={s.label} className="ab-stat">
              <div className="ab-stat__num" data-num={s.num}><span>{s.num}</span>{s.suffix}</div>
              <div className="ab-stat__label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Cum gândim */}
      <section className="section ab-principles">
        <div className="container">
          <div data-reveal className="eyebrow" style={{ marginBottom: "1.6rem" }}>— Cum gândim</div>
          <h2 data-reveal className="section-title" style={{ marginBottom: "3rem" }}>Principii.</h2>
          <div className="ab-principles__grid">
            {aboutPrinciples.map((p) => (
              <div data-reveal className="ab-principle" key={p.title}>
                <span className="ab-principle__icon" aria-hidden="true">{p.icon}</span>
                <h3 className="ab-principle__title">{p.title}</h3>
                <p className="ab-principle__desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Stack tehnic */}
      <section className="section ab-stack">
        <div className="container">
          <div data-reveal className="eyebrow" style={{ marginBottom: "1.6rem" }}>— Tehnologie</div>
          <h2 data-reveal className="section-title" style={{ marginBottom: "2rem" }}>Stack-ul nostru.</h2>
          <p data-reveal className="ab-stack__lead">
            <strong>Next.js + Payload 3 + PostgreSQL</strong>, deploy pe <strong>Railway</strong>.
            Frontend 100% custom, CMS în interiorul aplicației, un singur repo, un singur deploy.
          </p>
          <div data-reveal className="ab-stack__grid">
            {aboutStack.map((s) => (
              <div className="ab-stack__row" key={s.group}>
                <span className="ab-stack__k">{s.group}</span>
                <span className="ab-stack__v">{s.items}</span>
              </div>
            ))}
          </div>
          <p data-reveal className="ab-stack__note">
            <strong>De ce nu WordPress:</strong> 43% din web e pe WP, dar pentru magazine cu integrări reale (ERP, eMAG, multi-curier) devine un coșmar de plugin-uri. Construim custom când merită, folosim WooCommerce/Shopify când se potrivește. Alegem cu tine, nu pentru tine.
          </p>
        </div>
      </section>

      {/* 6. Fondator */}
      <section className="section ab-founder">
        <div className="container ab-founder__grid">
          <div data-reveal className="ab-founder__avatar" aria-hidden="true">
            {/* ponytail: avatar SVG cu monograma — înlocuiește cu foto real când ai */}
            <svg viewBox="0 0 200 200" width="100%" height="100%">
              <rect width="200" height="200" fill="var(--black)" />
              <circle cx="100" cy="100" r="92" fill="none" stroke="var(--lime)" strokeWidth="1.5" />
              <text x="100" y="118" textAnchor="middle" fill="var(--white)" fontFamily="var(--font-head)" fontSize="72" fontWeight="500" letterSpacing="-2">AL</text>
            </svg>
          </div>
          <div className="ab-founder__body">
            <span data-reveal className="eyebrow" style={{ marginBottom: "1rem" }}>— Fondator</span>
            <h2 data-reveal className="ab-founder__name">{founder.name}</h2>
            <p data-reveal className="ab-founder__role">{founder.role}</p>
            <p data-reveal className="ab-founder__bio">{founder.bio}</p>
            <p data-reveal className="ab-founder__bio">{founder.principles}</p>
            <p data-reveal className="ab-founder__loc">📍 {founder.location}</p>
          </div>
        </div>
      </section>

      {/* 7. Clienți highlight */}
      <section className="section ab-clients">
        <div className="container">
          <div data-reveal className="eyebrow" style={{ marginBottom: "1.6rem" }}>— Clienți</div>
          <h2 data-reveal className="section-title" style={{ marginBottom: "3rem" }}>Proiecte reprezentative.</h2>
          <div className="ab-clients__grid">
            {aboutHighlights.map((c) => (
              <a data-reveal className="ab-client" key={c.name} href={c.href} target="_blank" rel="noopener noreferrer">
                {c.name}
              </a>
            ))}
          </div>
          <a data-reveal className="ab-clients__more" href="/portofoliu">Vezi toate cele 37 de proiecte →</a>
        </div>
      </section>

      {/* 8. FAQ */}
      <section className="section ab-faq">
        <div className="container">
          <div data-reveal className="eyebrow" style={{ marginBottom: "1.6rem" }}>— Întrebări frecvente</div>
          <div className="ab-faq__list">
            {aboutFaqs.map((f, i) => (
              <details data-reveal key={i} className="ab-faq__item">
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 9. CTA final */}
      <section className="section ab-final">
        <div className="container ab-final__inner">
          <h2 data-reveal className="ab-final__title">Hai să construim ceva împreună.</h2>
          <div data-reveal className="ab-final__btns">
            <a className="btn btn--solid" href="/contact">Cere ofertă →</a>
            <a className="btn" href="/proces">Vezi cum lucrăm</a>
          </div>
        </div>
      </section>
    </main>
  );
}
