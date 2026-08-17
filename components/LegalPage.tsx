type LegalSection = {
  heading: string;
  paragraphs?: string[];
  items?: string[];
};

export default function LegalPage({
  title,
  intro,
  updated,
  sections,
}: {
  title: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <main>
      <section className="section container legal">
        <span className="eyebrow" data-reveal>Legal</span>
        <h1 className="legal__title" data-reveal>{title}</h1>
        <p className="legal__intro" data-reveal>{intro}</p>
        <p className="legal__updated" data-reveal>Ultima actualizare: {updated}</p>

        {sections.map((section, index) => (
          <div className="legal__item" key={section.heading} data-reveal>
            <h2 className="legal__heading">{String(index + 1).padStart(2, "0")} · {section.heading}</h2>
            {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {section.items && (
              <ul>
                {section.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            )}
          </div>
        ))}
      </section>
    </main>
  );
}
