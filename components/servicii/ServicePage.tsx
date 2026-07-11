"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LiveClock from "@/components/LiveClock";
import Portfolio from "@/components/Portfolio";
import { site } from "@/data/content";

type Project = { name: string; tag: string; img: string; href: string };

// ---- date hardcodate (până când CMS are toate câmpurile) ----

const types = [
  {
    title: "Cod curat",
    tag: "Custom development",
    desc: "Control total. Nimic nu e imposibil. Perfect pentru cataloage mari, funcții custom și integrări complexe.",
    logos: ["Next.js", "React", "Node.js"],
  },
  {
    title: "WordPress / WooCommerce",
    tag: "CMS + eCommerce",
    desc: "Rapid, testat, milioane de plugin-uri. Ideal pentru buget mediu și gestiune proprie a conținutului.",
    logos: ["WordPress", "WooCommerce"],
  },
  {
    title: "Shopify",
    tag: "E-commerce platform",
    desc: "Lansare în zile, nu în săptămâni. Perfect pentru dropshipping sau magazine mici-medii care vor să vândă rapid.",
    logos: ["Shopify"],
  },
];

const features = [
  { icon: "📱", title: "Mobile-first", desc: "Design responsive, testat pe toate device-urile. Peste 60% din vânzări vin de pe mobil." },
  { icon: "🌍", title: "Multi-monede & limbi", desc: "RON, EUR, USD. Română, engleză — tradus automat sau manual, cu SEO per limbă." },
  { icon: "📦", title: "Cataloage mari", desc: "10.000+ produse fără probleme. Paginare, filtre avansate, căutare instant." },
  { icon: "🔄", title: "Stoc real-time", desc: "Sync instant între depozit, ERP și site. Fără vânzări duble, fără stocuri greșite." },
  { icon: "🛒", title: "Coș abandonat", desc: "Email automat după 2h/24h. Integrare Mailchimp, SendGrid sau custom." },
  { icon: "🔒", title: "Securitate", desc: "SSL, PCI DSS, backup automat zilnic, 2FA pentru admin." },
  { icon: "📊", title: "Analytics eCommerce", desc: "GA4 + tracking avansat. Rapoarte săptămânale: vânzări, conversie, surse trafic." },
  { icon: "🔌", title: "Automatizări", desc: "ERP/CRM ↔ magazin: produse, stoc, comenzi sync automat. n8n, Make, Zapier." },
  { icon: "🎯", title: "SEO produse", desc: "Rich snippets, schema Product, recenzii, optimizare imagini și viteză." },
];

const integrationGroups = [
  {
    label: "Plăți online",
    items: ["Netopia", "PayU", "Stripe", "PayPal", "Revolut", "MAIB", "Victoriabank"],
  },
  {
    label: "Curierat & AWB",
    items: ["FAN Courier", "Cargus", "Sameday", "DPD", "GLS", "Nova Poshta"],
  },
  {
    label: "Facturare",
    items: ["SmartBill", "Oblio"],
  },
  {
    label: "Marketplace",
    items: ["eMAG"],
  },
  {
    label: "ERP & CRM",
    items: ["1C", "SAP", "custom API", "n8n", "Make", "Zapier"],
  },
];

const processSteps = [
  { step: "01", title: "Brief & analiză", desc: "Discutăm obiectivele, studiem competiția, alegem platforma. Primești ofertă fixă în 24-48h." },
  { step: "02", title: "Design & prototip", desc: "Machetăm fiecare pagină — home, categorie, produs, coș, checkout. Aprobi înainte de cod." },
  { step: "03", title: "Dezvoltare & integrări", desc: "Construim, conectăm plăți, curierat, facturare, ERP. Testăm pe toate device-urile." },
  { step: "04", title: "Lansare & suport", desc: "Publicare, testare finală, training. Mentenanță lunară — suntem aici și după lansare." },
];

const faqItems = [
  { q: "Cât durează construcția unui magazin online?", a: "Un magazin de bază: 3-5 săptămâni. Avansat: 6-10 săptămâni. Enterprise: 8-16 săptămâni, în funcție de complexitate." },
  { q: "Pot să gestionez singur produsele și comenzile după lansare?", a: "Da. Toate magazinele includ un panou de administrare. Primești training de utilizare la predare." },
  { q: "Ce se întâmplă cu SEO-ul dacă migrez de pe o platformă veche?", a: "Păstrăm toate URL-urile (redirect 301), structura de link-uri și metadatele. Migrarea nu afectează pozițiile în Google." },
  { q: "Oferiți mentenanță după lansare?", a: "Da. Mentenanța lunară include: backup, actualizări de securitate, monitorizare uptime, modificări minore." },
  { q: "Integrați cu ERP-ul / CRM-ul meu existent?", a: "Da. Dacă sistemul tău are API, îl conectăm. Am integrat deja cu 1C, SAP, SmartBill, Oblio și sisteme custom." },
  { q: "Sunt datele clienților în siguranță?", a: "Da. Toate magazinele sunt SSL, respectă GDPR. Datele de plată sunt procesate direct de procesatorul de plăți — nu trec prin serverul nostru." },
];

const pricingRows = [
  { name: "Magazin de bază", from: "€800", items: ["Catalog + coș + checkout", "1 plată + 1 curierat", "Panou admin", "SEO de bază"] },
  { name: "Magazin avansat", from: "€1.500", items: ["+ ERP sync", "+ Multi-lingv & monede", "+ Coș abandonat", "+ Analytics avansat"] },
  { name: "Magazin enterprise", from: "€3.000", items: ["+ Marketplace (eMAG)", "+ AI recomandări", "+ B2B (preț per client)", "+ Integrare custom nelimitată"] },
];

// ---- componenta principală ----

export default function ServicePage({ page, projects }: { page: any; projects: Project[] }) {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);

    // hero animation
    const ctx = gsap.context(() => {
      gsap.set(".svc-hero__line-inner", { yPercent: 105 });
      gsap.set(".svc-hero__ring path", { strokeDasharray: 1, strokeDashoffset: 1 });
      gsap.set(".svc-hero__sub, .svc-hero__ctas, .svc-stamp", { opacity: 0, y: 20 });
      const tl = gsap.timeline({ delay: 0.3 });
      tl.to(".svc-hero__line-inner", { yPercent: 0, duration: 1, ease: "power4.out", stagger: 0.12 })
        .to(".svc-hero__ring path", { strokeDashoffset: 0, duration: 0.9, ease: "power2.inOut" }, "-=0.3")
        .to(".svc-hero__sub, .svc-hero__ctas, .svc-stamp", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.1 }, "-=0.6");
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // FAQ accordion
  const toggleFaq = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const item = btn.closest<HTMLElement>(".svc-faq__item");
    if (!item) return;
    const body = item.querySelector<HTMLElement>(".svc-faq__body");
    const arrow = item.querySelector<HTMLElement>(".svc-faq__arrow");
    const isOpen = item.classList.contains("is-open");

    if (isOpen) {
      item.classList.remove("is-open");
      if (body) body.style.maxHeight = "0px";
      if (arrow) arrow.style.transform = "rotate(0deg)";
    } else {
      // close all others
      item.parentElement?.querySelectorAll(".svc-faq__item.is-open").forEach((el) => {
        el.classList.remove("is-open");
        const b = el.querySelector<HTMLElement>(".svc-faq__body");
        const a = el.querySelector<HTMLElement>(".svc-faq__arrow");
        if (b) b.style.maxHeight = "0px";
        if (a) a.style.transform = "rotate(0deg)";
      });
      item.classList.add("is-open");
      if (body) body.style.maxHeight = body.scrollHeight + "px";
      if (arrow) arrow.style.transform = "rotate(45deg)";
    }
  };

  return (
    <>
      {/* ====== HERO ====== */}
      <section className="svc-hero" ref={heroRef}>
        <h1 className="svc-hero__title">
          <span className="svc-hero__line"><span className="svc-hero__line-inner">Magazine online</span></span>
          <span className="svc-hero__line"><span className="svc-hero__line-inner">
            care{" "}
            <span className="svc-hero__ring-word">VÂND
              <svg className="svc-hero__ring" viewBox="0 0 300 120" preserveAspectRatio="none" aria-hidden="true">
                <path pathLength={1} d="M150 12 C 62 8, 14 42, 22 68 C 30 98, 132 112, 212 105 C 286 98, 296 58, 248 34 C 206 14, 118 6, 66 22" />
              </svg>
            </span>
          </span></span>
        </h1>
        <p className="svc-hero__sub">
          De la catalog la checkout, plăți, curierat și facturare — construim magazine care convertesc.
          Cod curat, WordPress sau Shopify — alegem ce ți se potrivește.
        </p>
        <div className="svc-hero__ctas">
          <a className="btn btn--solid" href="#contact">Cere o ofertă</a>
          <a className="btn" href="#portofoliu">Vezi portofoliul</a>
        </div>
        <div className="svc-stamp">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" style={{ width: 13, height: 13 }}>
            <circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
          </svg>
          <LiveClock />
        </div>
      </section>

      {/* ====== INTRO ====== */}
      <section className="svc-intro section container" data-reveal>
        <p className="svc-intro__text">
          Un magazin online nu e doar o listă de produse cu un buton de „Adaugă în coș”.
          E un ecosistem complet: catalog, stoc, plăți, curierat, facturare, automatizări,
          analiză date și optimizare continuă. Îl construim de la zero sau îl migrăm
          dintr-o platformă veche — fără să pierzi SEO, comenzi sau clienți.
        </p>
      </section>

      {/* ====== TIPURI DE MAGAZINE ====== */}
      <section className="svc-types section container">
        <h2 className="section-title" data-reveal>Tipuri de magazine</h2>
        <div className="svc-types__grid">
          {types.map((t) => (
            <div className="svc-type" key={t.title} data-reveal>
              <div className="svc-type__tags">
                {t.logos.map((l) => <span key={l} className="svc-type__tag">{l}</span>)}
              </div>
              <h3 className="svc-type__title">{t.title}</h3>
              <span className="svc-type__label">{t.tag}</span>
              <p className="svc-type__desc">{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ====== FEATURES ====== */}
      <section className="svc-features section container">
        <h2 className="section-title" data-reveal>Ce primești</h2>
        <div className="svc-features__grid">
          {features.map((f) => (
            <div className="svc-feature" key={f.title} data-reveal>
              <span className="svc-feature__icon">{f.icon}</span>
              <h3 className="svc-feature__title">{f.title}</h3>
              <p className="svc-feature__desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ====== INTEGRĂRI ====== */}
      <section className="svc-integrations section container">
        <h2 className="section-title" data-reveal>Integrăm orice</h2>
        <div className="svc-integrations__list">
          {integrationGroups.map((g) => (
            <div className="svc-intg" key={g.label} data-reveal>
              <span className="svc-intg__label">{g.label}</span>
              <div className="svc-intg__items">
                {g.items.map((item) => <span key={item} className="svc-intg__item">{item}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ====== PROCES ====== */}
      <section className="svc-process section container" data-reveal>
        <h2 className="section-title">Cum lucrăm</h2>
        <div className="svc-process__grid">
          {processSteps.map((p) => (
            <div className="svc-process__step" key={p.step}>
              <span className="svc-process__n">{p.step}</span>
              <h3 className="svc-process__name">{p.title}</h3>
              <p className="svc-process__desc">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ====== PORTOFOLIU ====== */}
      <Portfolio projects={projects} eyebrow="Magazine online" title="Proiecte realizate" />

      {/* ====== PREȚURI ====== */}
      <section className="svc-pricing section container">
        <h2 className="section-title" data-reveal>Prețuri orientative</h2>
        <div className="svc-pricing__list" data-reveal>
          {pricingRows.map((r) => (
            <div className="svc-price" key={r.name}>
              <span className="svc-price__name">{r.name}</span>
              <div className="svc-price__items">
                {r.items.map((item) => <span key={item}>{item}</span>)}
              </div>
              <span className="svc-price__from">
                {r.from.replace("€", "")}<small>EUR</small>
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ====== FAQ ====== */}
      <section className="svc-faq section container">
        <h2 className="section-title" data-reveal>Întrebări frecvente</h2>
        <div className="svc-faq__list" data-reveal>
          {faqItems.map((f, i) => (
            <div className={`svc-faq__item${i === 0 ? " is-open" : ""}`} key={f.q}>
              <button className="svc-faq__btn" onClick={toggleFaq}>
                <span>{f.q}</span>
                <svg className="svc-faq__arrow" width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ transform: i === 0 ? "rotate(45deg)" : "rotate(0deg)" }}>
                  <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div className="svc-faq__body" style={{ maxHeight: i === 0 ? "10rem" : "0px" }}>
                <p className="svc-faq__text">{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ====== CTA ====== */}
      <section className="contact-cta section" id="contact">
        <div className="container">
          <div data-reveal className="eyebrow" style={{ marginBottom: "1.6rem" }}>Suntem mereu deschiși pentru proiecte noi</div>
          <h2 data-reveal className="contact-cta__title">Hai să discutăm.</h2>
          <p data-reveal className="contact-cta__sub" style={{ marginBottom: "1.5rem" }}>
            Dacă vrei să începi un proiect, să discuți o idee sau pur și simplu să ne saluți, scrie.
          </p>
          <div data-reveal className="contact-cta__btns">
            <a className="contact-cta__pill" href="tel:+40730304478">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              Apel
            </a>
            <a className="contact-cta__pill" href="https://wa.me/40730304478" target="_blank" rel="noopener noreferrer">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp
            </a>
          </div>
          <p data-reveal className="contact-cta__alt" style={{ marginTop: "1.5rem" }}>Sau direct: <a href={`mailto:${site.email}`}>{site.email}</a></p>
        </div>
      </section>
    </>
  );
}
