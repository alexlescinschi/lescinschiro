"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { process as defaultSteps, deliverables as defaultDeliverables } from "@/data/content";

interface Props {
  steps?: { step: string; title: string; desc: string }[];
  deliverables?: string[];
}

export default function Process({ steps = defaultSteps, deliverables = defaultDeliverables }: Props) {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (matchMedia("(max-width: 1024px)").matches) return; // touch & tablet: derulează vertical
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
              <a className="process__link" href="/proces">Vezi detalii →</a>
            </div>
          </div>
          {steps.map((p) => (
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
