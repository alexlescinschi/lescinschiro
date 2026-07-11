"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Lenis smooth scroll + reveal global pentru orice element cu [data-reveal].
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return; // static, tot vizibil

    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis; // pentru back-to-top din footer
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      gsap.set("[data-reveal]", { opacity: 0, y: 42 }); // stare inițială ascunsă (nu în CSS → fără FOUC blocant)
      ScrollTrigger.batch("[data-reveal]", {
        start: "top 88%",
        onEnter: (batch) =>
          gsap.to(batch, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.08, overwrite: true }),
      });
    });

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    // Anchor-urile (#…) fac smooth-scroll prin Lenis → secțiunile se revelează pe drum,
    // deci nu rămân ascunse la un salt direct.
    const onAnchorClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest('a[href^="#"]');
      const hash = a?.getAttribute("href");
      if (!hash || hash === "#") return;
      const target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement);
    };
    document.addEventListener("click", onAnchorClick);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      ctx.revert();
      window.removeEventListener("load", onLoad);
      document.removeEventListener("click", onAnchorClick);
    };
  }, []);

  return <>{children}</>;
}
