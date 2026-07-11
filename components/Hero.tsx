"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import LiveClock from "./LiveClock";
import { heroImages } from "@/data/content";

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  // Fundal care se schimbă (crossfade) — ca pe site-ul de referință.
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const imgs = root.current?.querySelectorAll<HTMLElement>(".hero__bg-img");
    if (!imgs || imgs.length < 2) return;
    let idx = 0;
    const id = setInterval(() => {
      imgs[idx].classList.remove("is-active");
      idx = (idx + 1) % imgs.length;
      imgs[idx].classList.add("is-active");
    }, 3500);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.set(".line__inner", { yPercent: 105 });
      gsap.set(".ring path", { strokeDasharray: 1, strokeDashoffset: 1 });
      gsap.set(".hero__aside, .hero__ctas, .stamp", { opacity: 0, y: 20 });
      const tl = gsap.timeline({ delay: 1.3 }); // după cortina de intrare
      tl.to(".line__inner", { yPercent: 0, duration: 1, ease: "power4.out", stagger: 0.12 })
        .to(".ring path", { strokeDashoffset: 0, duration: 0.9, ease: "power2.inOut" }, "-=0.3")
        .to(".hero__aside, .hero__ctas, .stamp", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.1 }, "-=0.6");
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" id="top" ref={root}>
      <div className="hero__bg" aria-hidden="true">
        {heroImages.map((src, i) => (
          <div
            key={src}
            className={`hero__bg-img${i === 0 ? " is-active" : ""}`}
            style={{ backgroundImage: `url(${src})` }}
          />
        ))}
      </div>
      <div className="hero__scrim" aria-hidden="true" />

      <h1 className="hero__title">
        <span className="line"><span className="line__inner">Site-uri care</span></span>
        <span className="line"><span className="line__inner">
          aduc{" "}
          <span className="ring-word">clienți
            <svg className="ring" viewBox="0 0 300 120" preserveAspectRatio="none" aria-hidden="true">
              <path pathLength={1} d="M150 12 C 62 8, 14 42, 22 68 C 30 98, 132 112, 212 105 C 286 98, 296 58, 248 34 C 206 14, 118 6, 66 22" />
            </svg>
          </span>
        </span></span>
      </h1>

      <p className="hero__aside">
        Creăm site-uri, magazine online și landing page-uri optimizate SEO pentru România
        — cu plăți, curierat și automatizări AI incluse.
      </p>

      <div className="hero__ctas">
        <a className="btn btn--solid" href="#contact">Cere o ofertă</a>
        <a className="btn" href="https://wa.me/40730304478" target="_blank" rel="noopener noreferrer">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          Mesaj WhatsApp
        </a>
      </div>

      <div className="stamp">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
        </svg>
        <LiveClock />
      </div>
    </section>
  );
}
