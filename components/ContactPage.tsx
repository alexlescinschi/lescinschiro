"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Contact from "@/components/Contact";
import ContactResults, { type ContactProject } from "@/components/ContactResults";
import { contactFaqs, site } from "@/data/content";

export default function ContactPage({ projects }: { projects: ContactProject[] }) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });
      tl.fromTo(".ch-hero .line__inner", { yPercent: 105 }, { yPercent: 0, duration: 1, ease: "power4.out", stagger: 0.12 })
        .fromTo(".ch-hero .ring path", { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.9, ease: "power2.inOut" }, "-=0.3")
        .fromTo(".ch-hero__aside, .ch-hero__actions", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.1 }, "-=0.5");
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={root}>
      <section className="ch-hero section">
        <div className="container ch-hero__grid">
          <div>
            <div className="eyebrow" style={{ marginBottom: "1.6rem" }}>Suntem la un click distanță</div>
            <h1 className="ch-hero__title">
              <span className="line"><span className="line__inner">Hai să</span></span>
              <span className="line"><span className="line__inner">
                <span className="ring-word">vorbim
                  <svg className="ring" viewBox="0 0 300 120" preserveAspectRatio="none" aria-hidden="true">
                    <path pathLength={1} d="M150 12 C 62 8, 14 42, 22 68 C 30 98, 132 112, 212 105 C 286 98, 296 58, 248 34 C 206 14, 118 6, 66 22" />
                  </svg>
                </span>
              </span></span>
            </h1>
          </div>
          <div className="ch-hero__aside">
            <p>Spune-ne ce vrei să construim. Răspundem în maximum 24h.</p>
            <div className="ch-hero__actions">
              <a className="contact-cta__pill" href={`tel:${site.phone.replace(/\s/g, "")}`}>Apel</a>
              <a className="contact-cta__pill" href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
              <a className="ch-hero__email" href={`mailto:${site.email}`}>{site.email}</a>
            </div>
          </div>
        </div>
      </section>

      <ContactResults projects={projects} />
      <Contact />

      <section className="section ch-info" aria-label="Date de contact">
        <div className="container ch-info__grid">
          <div className="ch-info__item" data-reveal>
            <span>Telefon</span>
            <a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone} · RO</a>
            <a href={`tel:${site.phoneMD.replace(/\s/g, "")}`}>{site.phoneMD} · MD</a>
          </div>
          <div className="ch-info__item" data-reveal>
            <span>Email</span>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </div>
          <div className="ch-info__item" data-reveal>
            <span>Locație</span>
            <p>{site.address}</p>
          </div>
          <div className="ch-info__item" data-reveal>
            <span>Program</span>
            <p>Luni–Vineri, 09:00–18:00</p>
            <p>Răspuns în maximum 24h</p>
          </div>
        </div>
      </section>

      <section className="section ch-faq">
        <div className="container">
          <div data-reveal className="eyebrow" style={{ marginBottom: "1.6rem" }}>Întrebări frecvente</div>
          <div className="ch-faq__list">
            {contactFaqs.map((faq) => (
              <details data-reveal key={faq.q} className="ch-faq__item">
                <summary>{faq.q}</summary>
                <p>{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
