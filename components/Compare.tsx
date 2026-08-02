"use client";
import { compare } from "@/data/content";

// „Același brief. Alt studio." — comparație agenții tipice vs LESCINSCHI.
export default function Compare() {
  return (
    <section className="section container">
      <span className="eyebrow" data-reveal>{compare.eyebrow}</span>
      <h2 className="section-title" data-reveal>{compare.title}</h2>

      <div className="cmp">
        <div className="cmp__col cmp__col--bad" data-reveal>
          <div className="cmp__head">
            <span className="cmp__label">{compare.bad.label}</span>
            <span className="cmp__tag cmp__tag--bad">{compare.bad.locked}</span>
          </div>
          <ul className="cmp__list">
            {compare.bad.items.map((it) => (
              <li className="cmp__item" key={it}>
                <svg className="cmp__x" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
                {it}
              </li>
            ))}
          </ul>
        </div>

        <div className="cmp__col cmp__col--good" data-reveal>
          <div className="cmp__head">
            <span className="cmp__label">{compare.good.label}</span>
            <span className="cmp__tag cmp__tag--good">{compare.good.selected}</span>
          </div>
          <ul className="cmp__list">
            {compare.good.items.map((it) => (
              <li className="cmp__item" key={it}>
                <svg className="cmp__check" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                {it}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
