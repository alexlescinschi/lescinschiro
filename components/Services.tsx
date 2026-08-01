"use client";
import { useEffect, useRef } from "react";
import { services as defaultServices } from "@/data/content";

type ServiceRow = { title: string; desc: string; href?: string; image?: string };

// ponytail: serviciile vin din Payload (prop); fallback pe lista hardcodată dacă lipsesc.
export default function Services({ services: propServices }: { services?: ServiceRow[] }) {
  const previewRef = useRef<HTMLDivElement>(null);
  const services: ServiceRow[] =
    propServices && propServices.length
      ? propServices
      : defaultServices.map(({ title, desc, href }) => ({ title, desc, href }));

  useEffect(() => {
    const el = previewRef.current;
    if (!el || matchMedia("(pointer: coarse)").matches) return;

    const move = (e: PointerEvent) => { el.style.left = e.clientX + "px"; el.style.top = e.clientY + "px"; };
    const rows = Array.from(document.querySelectorAll<HTMLElement>(".srv"));
    const cleanups: (() => void)[] = [];
    window.addEventListener("pointermove", move);
    rows.forEach((r, i) => {
      const image = r.getAttribute("data-img") || "";
      const hue = (i * 40) % 360;
      const enter = () => {
        el.style.opacity = "1";
        el.style.transform = "translate(-50%, -50%) scale(1)";
        if (image) {
          // poza din CMS (prima imagine din conținut) — fallback pe gradient dacă nu există
          el.style.backgroundImage = `url(${image})`;
        } else {
          el.style.background = `linear-gradient(135deg, hsl(${hue} 60% 22%), hsl(${hue} 70% 42%))`;
        }
      };
      const leave = () => { el.style.opacity = "0"; el.style.transform = "translate(-50%, -50%) scale(0.85)"; };
      r.addEventListener("pointerenter", enter);
      r.addEventListener("pointerleave", leave);
      cleanups.push(() => { r.removeEventListener("pointerenter", enter); r.removeEventListener("pointerleave", leave); });
    });
    return () => { window.removeEventListener("pointermove", move); cleanups.forEach((c) => c()); };
  }, [services]);

  return (
    <section className="section container" id="servicii">
      <span className="eyebrow" data-reveal>Servicii</span>
      <h2 className="section-title" data-reveal>Tot ce ai nevoie ca să vinzi online</h2>
      <div className="services__list">
        {services.map((s, i) => {
          const n = String(i + 1).padStart(2, "0");
          const inner = (
            <>
              <span className="srv__n">{n}</span>
              <span className="srv__title">{s.title}</span>
              <span className="srv__desc">{s.desc}</span>
            </>
          );
          // rândurile cu pagină proprie devin linkuri (SEO intern + navigare)
          return s.href ? (
            <a className="srv" key={s.title} href={s.href} data-img={s.image || ""} data-reveal>{inner}</a>
          ) : (
            <div className="srv" key={s.title} data-img={s.image || ""} data-reveal>{inner}</div>
          );
        })}
      </div>
      <div className="srv-preview" ref={previewRef} aria-hidden />
    </section>
  );
}
