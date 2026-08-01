import { ai } from "@/data/content";

export default function AI() {
  return (
    <section className="section container">
      <span className="eyebrow" data-reveal>AI &amp; Automatizări</span>
      <h2 className="section-title" data-reveal>Pune tehnologia să lucreze în locul tău</h2>
      <div className="ai__list">
        {ai.map((a) => (
          <div className="ai__item" key={a.title} data-reveal>
            <div className="ai__title">{a.title}</div>
            <div className="ai__desc">{a.desc}</div>
          </div>
        ))}
      </div>
      <a className="btn ai__audit-link" href="/verificare-ai" data-reveal>Verifică vizibilitatea AI →</a>
    </section>
  );
}
