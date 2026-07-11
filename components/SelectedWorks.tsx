type Project = { name: string; tag: string; img: string; href: string };

// Slide-uri full-bleed care se stivuiesc la scroll (efect k72 cta-slides).
// Lenis = scroll nativ, deci `position: sticky` face stivuirea singur — fără GSAP.
export default function SelectedWorks({ projects }: { projects: Project[] }) {
  return (
    <section className="fw">
      <div className="fw__head">
        <a className="fw__all" href="#portofoliu">Vezi toate proiectele →</a>
      </div>
      <div className="fw__list">
        {projects.map((p) => (
          <div className="fw__item" key={p.name}>
            <a className="fw__card" href={p.href || "#contact"} target={p.href ? "_blank" : undefined} rel={p.href ? "noopener noreferrer" : undefined}>
              <div className="fw__visual" style={{ backgroundImage: `url(${p.img})` }} />
              <div className="fw__content">
                <span className="fw__subtitle">{p.tag}</span>
                <span className="fw__name">{p.name}</span>
              </div>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
