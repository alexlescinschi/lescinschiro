import Link from "next/link";
import { process as defaultSteps, deliverables as defaultDeliverables } from "@/data/content";

interface Props {
  steps?: { step: string; title: string; desc: string }[];
  deliverables?: string[];
}

export default function Process({ steps = defaultSteps, deliverables = defaultDeliverables }: Props) {
  return (
    <section className="process section" id="proces">
      <div className="container">
        <header className="process__intro" data-reveal>
          <div>
            <span className="eyebrow">Proces</span>
            <h2 className="section-title">Cum lucrăm</h2>
          </div>
          <Link className="process__link" href="/proces">Vezi detalii →</Link>
        </header>

        <div className="process__timeline">
          {steps.map((p, index) => (
            <article
              className={`process__panel${index % 2 ? " process__panel--right" : ""}`}
              data-reveal
              key={p.step}
            >
              <div className="process__body">
                <div className="process__step">{p.step}</div>
                <h3 className="process__title">{p.title}</h3>
                <p className="process__desc">{p.desc}</p>
              </div>
              <div className="process__marker" aria-hidden="true">{p.step}</div>
            </article>
          ))}
        </div>

        <div className="deliverables" data-reveal>
          <div className="deliverables__heading">
            <span>Rezultatul</span>
            <h3>Ce primești</h3>
          </div>
          <div className="deliverables__list">
            {deliverables.map((d) => (
              <div className="deliverables__item" key={d}>{d}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
