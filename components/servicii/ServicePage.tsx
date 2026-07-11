"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LiveClock from "@/components/LiveClock";
import Portfolio from "@/components/Portfolio";
import Process from "@/components/Process";

type Project = { name: string; tag: string; img: string; href: string };

// defaults, folosite când CMS nu are date
const DEFAULT_TYPES = [
  { titlu: "Cod curat", subtitlu: "Custom development", descriere: "Control total. Nimic nu e imposibil. Perfect pentru cataloage mari, funcții custom și integrări complexe.", logouri: "Next.js, React, Node.js" },
  { titlu: "WordPress / WooCommerce", subtitlu: "CMS + eCommerce", descriere: "Rapid, testat, milioane de plugin-uri. Ideal pentru buget mediu și gestiune proprie a conținutului.", logouri: "WordPress, WooCommerce" },
  { titlu: "Shopify", subtitlu: "E-commerce platform", descriere: "Lansare în zile, nu în săptămâni. Perfect pentru dropshipping sau magazine mici-medii care vor să vândă rapid.", logouri: "Shopify" },
];
const DEFAULT_FEATURES = [
  { icon: "📱", titlu: "Mobile-first", descriere: "Design responsive, testat pe toate device-urile. Peste 60% din vânzări vin de pe mobil." },
  { icon: "🌍", titlu: "Multi-monede & limbi", descriere: "RON, EUR, USD. Română, engleză — tradus automat sau manual, cu SEO per limbă." },
  { icon: "📦", titlu: "Cataloage mari", descriere: "10.000+ produse fără probleme. Paginare, filtre avansate, căutare instant." },
  { icon: "🔄", titlu: "Stoc real-time", descriere: "Sync instant între depozit, ERP și site. Fără vânzări duble, fără stocuri greșite." },
  { icon: "🛒", titlu: "Coș abandonat", descriere: "Email automat după 2h/24h. Integrare Mailchimp, SendGrid sau custom." },
  { icon: "🔒", titlu: "Securitate", descriere: "SSL, PCI DSS, backup automat zilnic, 2FA pentru admin." },
  { icon: "📊", titlu: "Analytics eCommerce", descriere: "GA4 + tracking avansat. Rapoarte săptămânale: vânzări, conversie, surse trafic." },
  { icon: "🔌", titlu: "Automatizări", descriere: "ERP/CRM ↔ magazin: produse, stoc, comenzi sync automat. n8n, Make, Zapier." },
  { icon: "🎯", titlu: "SEO produse", descriere: "Rich snippets, schema Product, recenzii, optimizare imagini și viteză." },
];
const DEFAULT_INTEGRATIONS = [
  { eticheta: "Plăți online", elemente: "Netopia, PayU, Stripe, PayPal, Revolut, MAIB, Victoriabank" },
  { eticheta: "Curierat & AWB", elemente: "FAN Courier, Cargus, Sameday, DPD, GLS, Nova Poshta" },
  { eticheta: "Facturare", elemente: "SmartBill, Oblio" },
  { eticheta: "Marketplace", elemente: "eMAG" },
  { eticheta: "ERP & CRM", elemente: "1C, SAP, custom API, n8n, Make, Zapier" },
];
const DEFAULT_PRICING = [
  { nume: "Magazin de bază", pret: "€800", include: "Catalog + coș + checkout, 1 plată + 1 curierat, Panou admin, SEO de bază" },
  { nume: "Magazin avansat", pret: "€1.500", include: "ERP sync, Multi-lingv & monede, Coș abandonat, Analytics avansat" },
  { nume: "Magazin enterprise", pret: "€3.000", include: "Marketplace (eMAG), AI recomandări, B2B preț per client, Integrare custom nelimitată" },
];
const DEFAULT_FAQ = [
  { intrebare: "Cât durează construcția unui magazin online?", raspuns: "Un magazin de bază: 3-5 săptămâni. Avansat: 6-10 săptămâni. Enterprise: 8-16 săptămâni, în funcție de complexitate." },
  { intrebare: "Pot să gestionez singur produsele și comenzile după lansare?", raspuns: "Da. Toate magazinele includ un panou de administrare. Primești training de utilizare la predare." },
  { intrebare: "Ce se întâmplă cu SEO-ul dacă migrez de pe o platformă veche?", raspuns: "Păstrăm toate URL-urile (redirect 301), structura de link-uri și metadatele. Migrarea nu afectează pozițiile în Google." },
  { intrebare: "Oferiți mentenanță după lansare?", raspuns: "Da. Mentenanța lunară include: backup, actualizări de securitate, monitorizare uptime, modificări minore." },
  { intrebare: "Integrați cu ERP-ul / CRM-ul meu existent?", raspuns: "Da. Dacă sistemul tău are API, îl conectăm. Am integrat deja cu 1C, SAP, SmartBill, Oblio și sisteme custom." },
  { intrebare: "Sunt datele clienților în siguranță?", raspuns: "Da. Toate magazinele sunt SSL, respectă GDPR. Datele de plată sunt procesate direct de procesatorul de plăți — nu trec prin serverul nostru." },
];
const DEFAULT_DELIVERABLES = "Site live și rapid, Codul tău pe GitHub, SEO configurat, Training de utilizare, Mentenanță lunară";

function parseCsv(s: string): string[] {
  return s.split(",").map((x) => x.trim()).filter(Boolean);
}

// ---- componenta principală ----

export default function ServicePage({ page, projects, heroImages = [] }: { page: any; projects: Project[]; heroImages?: string[] }) {
  const heroRef = useRef<HTMLElement>(null);
  const heroTitle = page.heroTitlu || (page.titlu ? `${page.titlu} care CONVERTESC` : "Servicii");
  const heroSub = page.heroSubtitlu || page.descriereScurta || "";
  const heroRingWord = page.heroCuvantInel || "CONVERTESC";
  const types: any[] = page.tipuri?.length ? page.tipuri : DEFAULT_TYPES;
  const feats: any[] = page.features?.length ? page.features : DEFAULT_FEATURES;
  const intgs: any[] = page.integrari?.length ? page.integrari : DEFAULT_INTEGRATIONS;
  const pricing: any[] = page.preturi?.length ? page.preturi : DEFAULT_PRICING;
  const faq: any[] = page.faq?.length ? page.faq : DEFAULT_FAQ;
  const deliv: string[] = page.deliverables ? parseCsv(page.deliverables) : parseCsv(DEFAULT_DELIVERABLES);

  // split hero title around ring word
  const ringWordRE = new RegExp(`\\b(${heroRingWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})\\b`, 'i');
  const titleParts = heroTitle.split(ringWordRE);
  // titleParts: [before, match, after] or just [full] if no match
  const before = titleParts[0] || "";
  const ringWord = titleParts[1] || heroRingWord;
  const after = titleParts[2] || "";

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);

    // crossfade background (like home hero)
    const bgImgs = heroRef.current?.querySelectorAll<HTMLElement>(".hero__bg-img");
    let intervalId: ReturnType<typeof setInterval> | null = null;
    if (bgImgs && bgImgs.length > 1) {
      let idx = 0;
      intervalId = setInterval(() => {
        bgImgs[idx].classList.remove("is-active");
        idx = (idx + 1) % bgImgs.length;
        bgImgs[idx].classList.add("is-active");
      }, 3500);
    }

    const ctx = gsap.context(() => {
      gsap.set(".svc-hero__line-inner", { yPercent: 105 });
      gsap.set(".svc-hero__ring path", { strokeDasharray: 1, strokeDashoffset: 1 });
      gsap.set(".svc-hero__sub, .svc-hero__ctas, .svc-stamp", { opacity: 0, y: 20 });
      const tl = gsap.timeline({ delay: 0.3 });
      tl.to(".svc-hero__line-inner", { yPercent: 0, duration: 1, ease: "power4.out", stagger: 0.12 })
        .to(".svc-hero__ring path", { strokeDashoffset: 0, duration: 0.9, ease: "power2.inOut" }, "-=0.3")
        .to(".svc-hero__sub, .svc-hero__ctas, .svc-stamp", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.1 }, "-=0.6");
    }, heroRef);
    return () => {
      ctx.revert();
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

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
        {heroImages.length > 0 && (
          <>
            <div className="hero__bg" aria-hidden="true">
              {heroImages.map((src, i) => (
                <div key={src} className={`hero__bg-img${i === 0 ? " is-active" : ""}`} style={{ backgroundImage: `url(${src})` }} />
              ))}
            </div>
            <div className="hero__scrim" aria-hidden="true" />
          </>
        )}
        <h1 className="svc-hero__title">
          <span className="svc-hero__line"><span className="svc-hero__line-inner">{before}</span></span>
          <span className="svc-hero__line"><span className="svc-hero__line-inner">
            {before ? "" : ""}
            <span className="svc-hero__ring-word">{ringWord}
              <svg className="svc-hero__ring" viewBox="0 0 300 120" preserveAspectRatio="none" aria-hidden="true">
                <path pathLength={1} d="M150 12 C 62 8, 14 42, 22 68 C 30 98, 132 112, 212 105 C 286 98, 296 58, 248 34 C 206 14, 118 6, 66 22" />
              </svg>
            </span>
            {after ? ` ${after}` : ""}
          </span></span>
        </h1>
        {heroSub && <p className="svc-hero__sub">{heroSub}</p>}
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
      {page.descriereScurta && (
        <section className="svc-intro section container" data-reveal>
          <p className="svc-intro__text">{page.descriereScurta}</p>
        </section>
      )}

      {/* ====== TIPURI ====== */}
      {types.length > 0 && (
        <section className="svc-types section container">
          <h2 className="section-title" data-reveal>Tipuri de {page.titlu || "servicii"}</h2>
          <div className="svc-types__grid">
            {types.map((t: any) => (
              <div className="svc-type" key={t.titlu || t.id} data-reveal>
                <div className="svc-type__tags">
                  {parseCsv(t.logouri || "").map((l: string) => <span key={l} className="svc-type__tag">{l}</span>)}
                </div>
                <h3 className="svc-type__title">{t.titlu}</h3>
                {t.subtitlu && <span className="svc-type__label">{t.subtitlu}</span>}
                {t.descriere && <p className="svc-type__desc">{t.descriere}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ====== FEATURES ====== */}
      {feats.length > 0 && (
        <section className="svc-features section container">
          <h2 className="section-title" data-reveal>Ce primești</h2>
          <div className="svc-features__grid">
            {feats.map((f: any) => (
              <div className="svc-feature" key={f.titlu || f.id} data-reveal>
                {f.icon && (
                  <span className="svc-feature__icon">
                    {String(f.icon).trim().startsWith("<svg") ? (
                      <span dangerouslySetInnerHTML={{ __html: f.icon }} />
                    ) : (
                      f.icon
                    )}
                  </span>
                )}
                <h3 className="svc-feature__title">{f.titlu}</h3>
                {f.descriere && <p className="svc-feature__desc">{f.descriere}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ====== INTEGRĂRI ====== */}
      {intgs.length > 0 && (
        <section className="svc-integrations section container">
          <h2 className="section-title" data-reveal>Integrăm orice</h2>
          <div className="svc-integrations__list">
            {intgs.map((g: any) => (
              <div className="svc-intg" key={g.eticheta || g.id} data-reveal>
                <span className="svc-intg__label">{g.eticheta}</span>
                <div className="svc-intg__items">
                  {parseCsv(g.elemente || "").map((item: string) => <span key={item} className="svc-intg__item">{item}</span>)}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ====== PROCES ====== */}
      <Process deliverables={deliv} />

      {/* ====== PORTOFOLIU ====== */}
      <Portfolio projects={projects} eyebrow={page.titlu || "Portofoliu"} title="Proiecte realizate" />

      {/* ====== PREȚURI ====== */}
      {pricing.length > 0 && (
        <section className="svc-pricing section container">
          <h2 className="section-title" data-reveal>Prețuri orientative</h2>
          <div className="svc-pricing__list" data-reveal>
            {pricing.map((r: any) => (
              <div className="svc-price" key={r.nume || r.id}>
                <span className="svc-price__name">{r.nume}</span>
                <div className="svc-price__items">
                  {parseCsv(r.include || "").map((item: string) => <span key={item}>{item}</span>)}
                </div>
                <span className="svc-price__from">
                  {(r.pret || "").replace("€", "")}<small>EUR</small>
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ====== FAQ ====== */}
      {faq.length > 0 && (
        <section className="svc-faq section container">
          <h2 className="section-title" data-reveal>Întrebări frecvente</h2>
          <div className="svc-faq__list" data-reveal>
            {faq.map((f: any, i: number) => (
              <div className={`svc-faq__item${i === 0 ? " is-open" : ""}`} key={f.intrebare || f.id}>
                <button className="svc-faq__btn" onClick={toggleFaq}>
                  <span>{f.intrebare}</span>
                  <svg className="svc-faq__arrow" width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ transform: i === 0 ? "rotate(45deg)" : "rotate(0deg)" }}>
                    <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <div className="svc-faq__body" style={{ maxHeight: i === 0 ? "10rem" : "0px" }}>
                  <p className="svc-faq__text">{f.raspuns}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
