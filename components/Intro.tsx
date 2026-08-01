"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { site } from "@/data/content";

// Cortina de intrare: numele urcă, apoi tot panoul se ridică.
export default function Intro() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { el.remove(); return; }

    const word = el.querySelector(".intro__word span");
    const tl = gsap.timeline();
    tl.from(word, { yPercent: 120, duration: 0.7, ease: "power3.out" })
      .to(word, { yPercent: -120, duration: 0.6, ease: "power3.in", delay: 0.35 })
      .to(el, { yPercent: -100, duration: 0.8, ease: "power4.inOut" }, "-=0.1")
      .set(el, { display: "none" });
    return () => { tl.kill(); };
  }, []);

  return (
    <div className="intro" ref={ref} aria-hidden>
      <div className="intro__word"><span>{site.brand}</span></div>
    </div>
  );
}
