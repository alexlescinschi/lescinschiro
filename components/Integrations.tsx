import { integrations } from "@/data/content";

export default function Integrations() {
  const items = [...integrations, ...integrations]; // dublat pentru buclă continuă
  return (
    <section aria-label="Integrări cu care lucrăm" style={{ margin: "60px 0" }}>
      <div className="marquee">
        <div className="marquee__track">
          {items.map((it, i) => (
            <span className="marquee__item" key={i}>{it}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
