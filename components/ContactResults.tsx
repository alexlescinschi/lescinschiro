import Image from "next/image";

export type ContactProject = {
  name: string;
  tag: string;
  img: string;
  href: string;
};

function ProjectCard({ project }: { project: ContactProject }) {
  const content = (
    <>
      <div className="ch-results__image">
        <Image src={project.img} alt={`Proiect ${project.name}`} fill sizes="(max-width: 600px) 76vw, 36vw" />
      </div>
      <div className="ch-results__caption">
        <span>{project.tag}</span>
        <strong>{project.name}</strong>
      </div>
    </>
  );

  return project.href ? (
    <a className="ch-results__card" href={project.href} target="_blank" rel="noopener noreferrer">{content}</a>
  ) : (
    <div className="ch-results__card">{content}</div>
  );
}

function ResultRow({ projects, reverse = false }: { projects: ContactProject[]; reverse?: boolean }) {
  return (
    <div className={`ch-results__row${reverse ? " ch-results__row--reverse" : ""}`}>
      <div className="ch-results__track">
        {[false, true].map((duplicate) => (
          <div className="ch-results__group" aria-hidden={duplicate || undefined} inert={duplicate ? true : undefined} key={String(duplicate)}>
            {projects.map((project, index) => <ProjectCard project={project} key={`${project.name}-${index}`} />)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ContactResults({ projects }: { projects: ContactProject[] }) {
  if (!projects.length) return null;
  const firstRow = projects.filter((_, index) => index % 2 === 0);
  const secondRow = projects.filter((_, index) => index % 2 === 1);

  return (
    <section className="ch-results section" aria-labelledby="contact-results-title">
      <div className="container ch-results__head" data-reveal>
        <span className="eyebrow">Rezultatul colaborării</span>
        <h2 className="section-title" id="contact-results-title">Așa poate arăta proiectul tău.</h2>
      </div>
      <div className="ch-results__rows" data-reveal>
        <ResultRow projects={firstRow.length ? firstRow : projects} />
        <ResultRow projects={secondRow.length ? secondRow : projects} reverse />
      </div>
    </section>
  );
}
