"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Portfolio pagină separată — identic cu home + filtre sus.
// ponytail: la schimbarea filtrului, key pe grid forțează re-mount → GSAP se reinițializează.

type Project = {
  name: string;
  tag: string;
  img: string;
  href: string;
  services: { title: string; slug: string }[];
};

export default function PortfolioPage({ projects }: { projects: Project[] }) {
  const root = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState("all");
  const [ready, setReady] = useState(false);

  const serviceFilters = Array.from(
    new Map(projects.flatMap((project) => project.services.map((service) => [service.slug, service] as const))).values()
  );
  const filters = [{ title: "Toate", slug: "all" }, ...serviceFilters];
  const filtered = filter === "all" ? projects : projects.filter((project) =>
    project.services.some((service) => service.slug === filter)
  );

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 100);
    return () => clearTimeout(t);
  }, [filter]); // re-measure la schimbarea filtrului

  // Animație identică cu Portfolio.tsx (elastic scroll compression + stagger intro)
  useEffect(() => {
    if (!ready) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // ponytail: elastic doar pe desktop cu mouse (vezi Portfolio.tsx).
    if (matchMedia("(max-width: 1024px), (pointer: coarse)").matches) return;
    gsap.registerPlugin(ScrollTrigger);

    const el = root.current;
    if (!el) return;

    const itemEls = el.querySelectorAll<HTMLElement>(".wk__item");
    const outerEls = el.querySelectorAll<HTMLElement>(".wk__outer");
    const innerEls = el.querySelectorAll<HTMLElement>(".wk__inner");
    if (!itemEls.length) return;

    const thumbBCR = itemEls[0].getBoundingClientRect();
    const thumbH = thumbBCR.height;
    if (thumbH === 0) return;

    const refTop = window.innerHeight / 2 - thumbH / 2;
    const MIN_H = 20;

    gsap.set(itemEls, { opacity: 0, y: 60 });
    gsap.to(itemEls, {
      opacity: 1, y: 0, duration: 1, ease: "power4.out", stagger: 0.08,
      scrollTrigger: { trigger: el, start: "top 85%", once: true },
    });

    const st = ScrollTrigger.create({
      trigger: el, start: "top bottom", end: "bottom top",
      onUpdate() {
        for (let i = 0; i < itemEls.length; i++) {
          const rect = itemEls[i].getBoundingClientRect();
          const distance = rect.top - refTop;
          let scaleY = 0;
          if (distance >= 0) scaleY = Math.min(1, Math.abs(distance) / (window.innerHeight - refTop));
          const h = Math.max(MIN_H, Math.floor(thumbH * (1 - scaleY)));
          outerEls[i].style.height = `${h}px`;
          innerEls[i].style.transform = `translate3d(0, ${-thumbH / 2 * scaleY}px, 0)`;
        }
      },
    });

    const onResize = () => st.refresh();
    window.addEventListener("resize", onResize);
    return () => { st.kill(); window.removeEventListener("resize", onResize); };
  }, [ready, filter]);

  return (
    <section className="section container" id="portofoliu" ref={root}>
      <span className="eyebrow" data-reveal>Portofoliu</span>
      <h2 className="section-title" data-reveal>Proiecte recente.</h2>

      <div className="pf__filters" data-reveal>
        {filters.map((service) => (
          <button
            key={service.slug}
            className={`pf__filter${filter === service.slug ? " is-active" : ""}`}
            onClick={() => setFilter(service.slug)}
            aria-pressed={filter === service.slug}
          >
            {service.title}
            <span className="pf__count">
              {service.slug === "all"
                ? projects.length
                : projects.filter((project) => project.services.some((item) => item.slug === service.slug)).length}
            </span>
          </button>
        ))}
      </div>

      <div className="wk__grid" key={filter}>
        {filtered.map((p) => (
          <div className="wk__item" key={p.name}>
            <div className="wk__outer">
              <div className="wk__inner">
                <article className="wk__thumb">
                  <figure className="wk__media">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="wk__img" src={p.img} alt={`${p.name} — ${p.tag}`} loading="lazy" />
                  </figure>
                  <div className="wk__overlay" aria-hidden="true" />
                  <div className="wk__content">
                    <h3 className="wk__title">{p.name}</h3>
                    <span className="wk__sub">{p.tag}</span>
                  </div>
                  <a className="wk__link" href={p.href || "#portofoliu"} target={p.href?.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                    <span className="wk__pill">{p.name}</span>
                    <span className="wk__btn">Vezi site-ul</span>
                  </a>
                </article>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="pf__empty" data-reveal>Nu există proiecte pentru acest serviciu.</p>
      )}
    </section>
  );
}
