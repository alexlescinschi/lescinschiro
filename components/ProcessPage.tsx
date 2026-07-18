"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  processFull,
  processPrinciples,
  processFaqs,
  deliverablesGrid,
} from "@/data/content";

export default function ProcessPage() {
  const root = useRef<HTMLElement>(null);

  // Hero mask-reveal + inel lime (ca Hero / Contact).
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.set(".pp-hero .line__inner", { yPercent: 105 });
      gsap.set(".pp-hero .ring path", { strokeDasharray: 1, strokeDashoffset: 1 });
      gsap.set(".pp-hero__aside", { opacity: 0, y: 20 });
      const tl = gsap.timeline({ delay: 0.3 });
      tl.to(".pp-hero .line__inner", { yPercent: 0, duration: 1, ease: "power4.out", stagger: 0.12 })
        .to(".pp-hero .ring path", { strokeDashoffset: 0, duration: 0.9, ease: "power2.inOut" }, "-=0.3")
        .to(".pp-hero__aside", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.5");
    }, root);
    return () => ctx.revert();
  }, []);

  // Timeline SVG draw pe scroll.
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const path = root.current?.querySelector<SVGPathElement>(".pp-timeline__line path");
      if (!path) return;
      const len = path.getTotalLength();
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: { trigger: ".pp-timeline", start: "top 70%", end: "bottom 60%", scrub: 0.6 },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={root as any}>
      {/* 1. Hero */}
      <section className="pp-hero section">
        <div className="container">
          <div data-reveal className="eyebrow" style={{ marginBottom: "1.6rem" }}>— Cum lucrăm</div>
          <h1 className="pp-hero__title">
            <span className="line"><span className="line__inner">Patru</span></span>
            <span className="line"><span className="line__inner">
              {" "}<span className="ring-word">pași
                <svg className="ring" viewBox="0 0 300 120" preserveAspectRatio="none" aria-hidden="true">
                  <path pathLength={1} d="M150 12 C 62 8, 14 42, 22 68 C 30 98, 132 112, 212 105 C 286 98, 296 58, 248 34 C 206 14, 118 6, 66 22" />
                </svg>
              </span>
            </span></span>
            <span className="line"><span className="line__inner">până la lansare.</span></span>
          </h1>
          <p className="pp-hero__aside">De la primul brief la prima vânzare. Fără surprize, fără costuri ascunse.</p>
        </div>
      </section>

      {/* 2. Cele 4 etape — vertical, alternat */}
      <section className="section pp-steps">
        <div className="container">
          {processFull.map((s, i) => (
            <article
              data-reveal
              className={`pp-step${i % 2 === 1 ? " pp-step--rev" : ""}`}
              key={s.step}
            >
              <div className="pp-step__num" aria-hidden="true">{s.step}</div>
              <div className="pp-step__body">
                <h2 className="pp-step__title">{s.title}</h2>
                <p className="pp-step__desc">{s.desc}</p>
                <ul className="pp-step__list">
                  {s.details.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
                <div className="pp-step__meta">
                  <span><strong>⏱</strong> {s.duration}</span>
                  <span><strong>📋</strong> {s.deliverable}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 3. Timeline visual */}
      <section className="section pp-timeline">
        <div className="container">
          <div data-reveal className="eyebrow" style={{ marginBottom: "1.6rem" }}>— Proiect tipic</div>
          <h2 data-reveal className="section-title" style={{ marginBottom: "3rem" }}>8 săptămâni, pas cu pas.</h2>
          <svg className="pp-timeline__line" viewBox="0 0 800 80" preserveAspectRatio="none" aria-hidden="true">
            <path d="M20 40 L780 40" fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="1" />
            <path d="M20 40 L780 40" fill="none" stroke="var(--lime)" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <div className="pp-timeline__weeks">
            {["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8"].map((w, i) => (
              <div className="pp-timeline__wk" key={w}>
                <span className="pp-timeline__dot" data-reveal />
                <span className="pp-timeline__label">{w}</span>
                {i === 0 && <span className="pp-timeline__phase">Brief</span>}
                {i === 1 && <span className="pp-timeline__phase">Design</span>}
                {i === 5 && <span className="pp-timeline__phase">Dezvoltare</span>}
                {i === 7 && <span className="pp-timeline__phase">Lansare</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Deliverables grilă */}
      <section className="section pp-deliver">
        <div className="container">
          <div data-reveal className="eyebrow" style={{ marginBottom: "1.6rem" }}>— Ce primești</div>
          <h2 data-reveal className="section-title" style={{ marginBottom: "3rem" }}>Livrabile clare.</h2>
          <div className="pp-deliver__grid">
            {deliverablesGrid.map((d) => (
              <div data-reveal className="pp-deliver__item" key={d.label}>
                <span className="pp-deliver__icon" aria-hidden="true">{d.icon}</span>
                <span className="pp-deliver__label">{d.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Principii */}
      <section className="section pp-principles">
        <div className="container">
          <div data-reveal className="eyebrow" style={{ marginBottom: "1.6rem" }}>— Cum gândim</div>
          <h2 data-reveal className="section-title" style={{ marginBottom: "3rem" }}>Principii.</h2>
          <div className="pp-principles__grid">
            {processPrinciples.map((p) => (
              <div data-reveal className="pp-principle" key={p.title}>
                <span className="pp-principle__icon" aria-hidden="true">{p.icon}</span>
                <h3 className="pp-principle__title">{p.title}</h3>
                <p className="pp-principle__desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FAQ */}
      <section className="section pp-faq">
        <div className="container">
          <div data-reveal className="eyebrow" style={{ marginBottom: "1.6rem" }}>— Întrebări frecvente</div>
          <div className="pp-faq__list">
            {processFaqs.map((f, i) => (
              <details data-reveal key={i} className="pp-faq__item">
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CTA final */}
      <section className="section pp-final">
        <div className="container pp-final__inner">
          <h2 data-reveal className="pp-final__title">Hai să începem cu pasul 01.</h2>
          <div data-reveal className="pp-final__btns">
            <a className="btn btn--solid" href="/contact">Cere ofertă →</a>
            <a className="btn" href="/portofoliu">Vezi portofoliu</a>
          </div>
        </div>
      </section>
    </main>
  );
}
