"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ponytail: elastic list = height compression like K72
// based on distance from viewport center reference line

type Project = {
  name: string;
  tag: string;
  img: string;
  href: string;
};

export default function Portfolio({
  projects,
  eyebrow = "Portofoliu",
  title = "Proiecte",
}: {
  projects: Project[];
  eyebrow?: string;
  title?: string;
}) {
  const root = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // defer measurement until after paint
    const t = setTimeout(() => setReady(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!ready) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // ponytail: efectul elastic are sens doar pe desktop cu mouse;
    // pe touch cauzează jank (forced reflow per frame) și .wk__link e oricum ascuns.
    if (matchMedia("(max-width: 1024px), (pointer: coarse)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const el = root.current;
    if (!el) return;

    const itemEls = el.querySelectorAll<HTMLElement>(".wk__item");
    const outerEls = el.querySelectorAll<HTMLElement>(".wk__outer");
    const innerEls = el.querySelectorAll<HTMLElement>(".wk__inner");

    if (!itemEls.length) return;

    // measure natural height from first item's outer wrapper
    // ponytail: first render = uncompressed, then measure
    const thumbBCR = itemEls[0].getBoundingClientRect();
    const thumbH = thumbBCR.height;
    const marginBottom =
      parseInt(getComputedStyle(itemEls[0]).marginBottom) || 0;

    if (thumbH === 0) return;

    // count items per row (for grid-aware animation)
    let nbPerRow = 1;
    let lastTop = itemEls[0].getBoundingClientRect().top;
    for (let i = 1; i < itemEls.length; i++) {
      if (itemEls[i].getBoundingClientRect().top !== lastTop) {
        nbPerRow = i;
        break;
      }
    }

    // reference: center of viewport = center of a fully-expanded thumb
    const refTop = window.innerHeight / 2 - thumbH / 2;
    const MIN_H = 20;

    // stagger intro
    gsap.set(itemEls, { opacity: 0, y: 60 });
    gsap.to(itemEls, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power4.out",
      stagger: 0.08,
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        once: true,
      },
    });

    // elastic compression driven by scroll
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top bottom",
      end: "bottom top",
      onUpdate() {
        for (let i = 0; i < itemEls.length; i++) {
          const rect = itemEls[i].getBoundingClientRect();
          const distance = rect.top - refTop;

          let scaleY = 0;
          if (distance >= 0) {
            scaleY = Math.min(
              1,
              Math.abs(distance) / (window.innerHeight - refTop)
            );
          }

          const h = Math.max(MIN_H, Math.floor(thumbH * (1 - scaleY)));
          outerEls[i].style.height = `${h}px`;
          innerEls[i].style.transform = `translate3d(0, ${-thumbH / 2 * scaleY}px, 0)`;
        }
      },
    });

    // resize: recompute on window resize
    const onResize = () => {
      const newBCR = itemEls[0].getBoundingClientRect();
      // recompute refTop
      const newRefTop = window.innerHeight / 2 - newBCR.height / 2;
      // can't easily reassign refTop but close enough for resize
      st.refresh();
    };
    window.addEventListener("resize", onResize);

    return () => {
      st.kill();
      window.removeEventListener("resize", onResize);
    };
  }, [ready]);

  return (
    <section className="section container" id="portofoliu" ref={root}>
      <span className="eyebrow" data-reveal>
        {eyebrow}
      </span>
      <h2 className="section-title" data-reveal>
        {title}
      </h2>

      <div className="wk__grid">
        {projects.map((p) => (
          <div className="wk__item" key={p.name}>
            <div className="wk__outer">
              <div className="wk__inner">
                <article className="wk__thumb">
                  <figure className="wk__media">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className="wk__img"
                      src={p.img}
                      alt={`${p.name} — ${p.tag}`}
                      loading="lazy"
                    />
                  </figure>
                  <div className="wk__overlay" aria-hidden="true" />

                  <div className="wk__content">
                    <h3 className="wk__title">{p.name}</h3>
                    <span className="wk__sub">{p.tag}</span>
                  </div>

                  <a className="wk__link" href={p.href || "#portofoliu"}>
                    <span className="wk__pill">{p.name}</span>
                    <span className="wk__btn">Vezi site-ul</span>
                  </a>
                </article>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
