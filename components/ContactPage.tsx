"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { site, contactFaqs } from "@/data/content";

export default function ContactPage() {
  const root = useRef<HTMLElement>(null);

  // Mask-reveal linie cu linie (ca Hero) + inel lime SVG draw.
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.set(".ch-hero .line__inner", { yPercent: 105 });
      gsap.set(".ch-hero .ring path", { strokeDasharray: 1, strokeDashoffset: 1 });
      gsap.set(".ch-hero__aside", { opacity: 0, y: 20 });
      const tl = gsap.timeline({ delay: 0.3 });
      tl.to(".ch-hero .line__inner", { yPercent: 0, duration: 1, ease: "power4.out", stagger: 0.12 })
        .to(".ch-hero .ring path", { strokeDashoffset: 0, duration: 0.9, ease: "power2.inOut" }, "-=0.3")
        .to(".ch-hero__aside", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.5");
    }, root);
    return () => ctx.revert();
  }, []);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const g = (k: string) => String(f.get(k) || "");
    const tip = g("tip");
    const subject = encodeURIComponent(`Cerere ofertă ${tip ? "(" + tip + ")" : ""} — ${g("prenume")} ${g("nume")}`);
    const body = encodeURIComponent(
      `Tip proiect: ${tip}\nNume: ${g("prenume")} ${g("nume")}\nEmail: ${g("email")}\nTelefon: ${g("telefon")}\n\n${g("detalii")}`
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  };

  return (
    <main ref={root as any}>
      {/* 1. Hero compact — mask-reveal + inel lime */}
      <section className="ch-hero section">
        <div className="container">
          <div data-reveal className="eyebrow" style={{ marginBottom: "1.6rem" }}>— Suntem la un click distanță</div>
          <h1 className="ch-hero__title">
            <span className="line"><span className="line__inner">Hai să</span></span>
            <span className="line"><span className="line__inner">
              {" "}<span className="ring-word">vorbim
                <svg className="ring" viewBox="0 0 300 120" preserveAspectRatio="none" aria-hidden="true">
                  <path pathLength={1} d="M150 12 C 62 8, 14 42, 22 68 C 30 98, 132 112, 212 105 C 286 98, 296 58, 248 34 C 206 14, 118 6, 66 22" />
                </svg>
              </span>
            </span></span>
          </h1>
          <p className="ch-hero__aside">Site-uri, magazine online, integrări. Răspundem în 24h.</p>
        </div>
      </section>

      {/* 2. Canale rapide — 4 pills */}
      <section className="section ch-channels">
        <div className="container ch-channels__grid">
          <a data-reveal className="ch-channel" href={`tel:${site.phone.replace(/\s/g, "")}`}>
            <span className="ch-channel__icon" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </span>
            <span className="ch-channel__label">Apel</span>
            <span className="ch-channel__value">{site.phone}</span>
          </a>
          <a data-reveal className="ch-channel" href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer">
            <span className="ch-channel__icon" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </span>
            <span className="ch-channel__label">WhatsApp</span>
            <span className="ch-channel__value">Chat direct →</span>
          </a>
          <a data-reveal className="ch-channel" href={`mailto:${site.email}`}>
            <span className="ch-channel__icon" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 5L2 7"/></svg>
            </span>
            <span className="ch-channel__label">Email</span>
            <span className="ch-channel__value">{site.email}</span>
          </a>
          <a data-reveal className="ch-channel" href="https://www.google.com/maps?q=București+Sectorul+3" target="_blank" rel="noopener noreferrer">
            <span className="ch-channel__icon" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            </span>
            <span className="ch-channel__label">Locație</span>
            <span className="ch-channel__value">București, S3</span>
          </a>
        </div>
      </section>

      {/* 3. Detalii + Hartă */}
      <section className="section ch-details">
        <div className="container ch-details__grid">
          <div data-reveal className="ch-details__info">
            <div className="ch-row"><span className="ch-row__k">Telefon</span>
              <span className="ch-row__v"><a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a> (RO)</span>
              <span className="ch-row__v"><a href={`tel:${site.phoneMD.replace(/\s/g, "")}`}>{site.phoneMD}</a> (MD)</span>
            </div>
            <div className="ch-row"><span className="ch-row__k">Email</span>
              <span className="ch-row__v"><a href={`mailto:${site.email}`}>{site.email}</a></span>
            </div>
            <div className="ch-row"><span className="ch-row__k">WhatsApp</span>
              <span className="ch-row__v"><a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer">wa.me/{site.whatsapp}</a></span>
            </div>
            <div className="ch-row"><span className="ch-row__k">Locație</span>
              <span className="ch-row__v">{site.address}</span>
            </div>
            <div className="ch-row"><span className="ch-row__k">Program</span>
              <span className="ch-row__v">Luni–Vineri: 9:00–18:00</span>
              <span className="ch-row__v">Răspuns oferte: sub 24h</span>
            </div>
          </div>
          <div data-reveal className="ch-details__map">
            <iframe
              title="Locație LESCINSCHI pe Google Maps"
              src="https://www.google.com/maps?q=București+Sectorul+3&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* 4. Formular cerere ofertă */}
      <section className="section ch-form">
        <div className="container">
          <div data-reveal className="eyebrow" style={{ marginBottom: "1.6rem" }}>— Cere ofertă</div>
          <h2 data-reveal className="section-title ch-form__title">Spune-ne despre proiect.</h2>
          <form className="ch-form__form" onSubmit={onSubmit} data-reveal>
            <div className="ch-form__row">
              <div className="field"><label htmlFor="prenume">Prenume</label><input id="prenume" name="prenume" required autoComplete="given-name" placeholder="Prenume" /></div>
              <div className="field"><label htmlFor="nume">Nume</label><input id="nume" name="nume" required autoComplete="family-name" placeholder="Nume" /></div>
            </div>
            <div className="ch-form__row">
              <div className="field"><label htmlFor="email">Email</label><input id="email" name="email" type="email" required autoComplete="email" placeholder="email@exemplu.com" /></div>
              <div className="field"><label htmlFor="telefon">Telefon</label><input id="telefon" name="telefon" type="tel" autoComplete="tel" placeholder="+40 7XX XXX XXX" /></div>
            </div>
            <div className="field">
              <label htmlFor="tip">Tip proiect</label>
              <select id="tip" name="tip" defaultValue="">
                <option value="" disabled>Selectează…</option>
                <option>Magazin online</option>
                <option>Site de prezentare</option>
                <option>Landing page</option>
                <option>Integrare (plăți / curierat / API)</option>
                <option>SEO România</option>
                <option>AI & Automatizări</option>
                <option>Altul</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="detalii">Detalii proiect</label>
              <textarea id="detalii" name="detalii" rows={5} required placeholder="Ce vrei să construim? Buget, termene, integrări necesare…" />
            </div>
            <button className="btn btn--solid ch-form__submit" type="submit">Trimite cererea →</button>
          </form>
        </div>
      </section>

      {/* 5. FAQ scurt */}
      <section className="section ch-faq">
        <div className="container">
          <div data-reveal className="eyebrow" style={{ marginBottom: "1.6rem" }}>— Întrebări frecvente</div>
          <div className="ch-faq__list">
            {contactFaqs.map((f, i) => (
              <details data-reveal key={i} className="ch-faq__item">
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CTA final */}
      <section className="section ch-final">
        <div className="container ch-final__inner">
          <h2 data-reveal className="ch-final__title">Gata să începem?</h2>
          <a data-reveal className="btn btn--solid" href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer">
            Deschide WhatsApp →
          </a>
          <p data-reveal className="ch-final__alt">Sau scrie-ne un email — răspundem astăzi.</p>
        </div>
      </section>
    </main>
  );
}
