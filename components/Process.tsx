"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { process, deliverables } from "@/data/content";

export default function Process() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (matchMedia("(max-width: 720px)").matches) return; // ponytail: pe mobil = stivă verticală; nu re-calculăm la resize
    gsap.registerPlugin(ScrollTrigger);
    const el = track.current, sec = root.current;
    if (!el || !sec) return;
    const ctx = gsap.context(() => {
      gsap.to(el, {
        x: () => -(el.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: sec,
          start: "top top",
          end: () => "+=" + (el.scrollWidth - window.innerWidth),
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="process" id="proces" ref={root}>
      <div className="process__pin">
        <div className="process__track" ref={track}>
          <div className="process__intro">
            <div>
              <span className="eyebrow">Proces</span>
              <h2 className="section-title">Cum lucrăm</h2>
            </div>
          </div>
          {process.map((p) => (
            <div className="process__panel" key={p.step}>
              <div className="process__step">{p.step}</div>
              <h3 className="process__title">{p.title}</h3>
              <p className="process__desc">{p.desc}</p>
            </div>
          ))}
          <div className="deliverables">
            <h3>Ce primești</h3>
            {deliverables.map((d) => (
              <div className="deliverables__item" key={d}>{d}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
