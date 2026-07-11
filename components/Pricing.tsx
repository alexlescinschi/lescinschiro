import { pricing } from "@/data/content";

export default function Pricing() {
  return (
    <section className="section container" id="preturi">
      <span className="eyebrow" data-reveal>Prețuri</span>
      <h2 className="section-title" data-reveal>Pachete transparente</h2>
      <div className="pricing__list">
        {pricing.map((p) => (
          <div className="price" key={p.name} data-reveal>
            <div className="price__name">{p.name}</div>
            <div className="price__items">
              {p.items.map((it) => (<span key={it}>{it}</span>))}
            </div>
            <div className="price__from">{p.from}<small>de la</small></div>
          </div>
        ))}
      </div>
      <p className="contact__alt">
        Prețuri orientative, în EUR. Oferta finală după brief. <a href="#contact">Cere o ofertă →</a>
      </p>
    </section>
  );
}
