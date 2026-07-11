import { testimonials } from "@/data/content";

export default function Testimonials() {
  return (
    <section className="section container">
      <span className="eyebrow" data-reveal>Ce spun clienții</span>
      <div className="tst__list">
        {testimonials.map((t, i) => (
          <blockquote className="tst" key={i} data-reveal>
            <p className="tst__quote">&ldquo;{t.quote}&rdquo;</p>
            <footer className="tst__role">{t.role}</footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
