"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { why } from "@/data/content";

export default function WhyUs() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".why__num").forEach((el) => {
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
    <section className="section container" ref={root}>
      <span className="eyebrow" data-reveal>De ce noi</span>
      <div className="why__grid">
        {why.map((w) => (
          <div key={w.label} data-reveal>
            <div className="why__num" data-num={w.num}><span>{w.num}</span>{w.suffix}</div>
            <div className="why__label">{w.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
