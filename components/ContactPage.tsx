"use client";

import Contact from "@/components/Contact";
import ContactResults, { type ContactProject } from "@/components/ContactResults";
import { contactFaqs, site } from "@/data/content";

export default function ContactPage({
  projects,
  services,
  integration,
  integrationMode = false,
}: {
  projects: ContactProject[];
  services?: { title: string; slug: string }[];
  integration?: { slug: string; name: string } | null;
  integrationMode?: boolean;
}) {
  return (
    <main>
      <div className="ch-page-top">
        <Contact services={services} integration={integration} integrationMode={integrationMode} />
      </div>
      <ContactResults projects={projects} />

      <section className="section ch-info" aria-label="Date de contact">
        <div className="container ch-info__grid">
          <div className="ch-info__item" data-reveal>
            <span>Telefon</span>
            <a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone} · RO</a>
            <a href={`tel:${site.phoneMD.replace(/\s/g, "")}`}>{site.phoneMD} · MD</a>
          </div>
          <div className="ch-info__item" data-reveal>
            <span>Email</span>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </div>
          <div className="ch-info__item" data-reveal>
            <span>Locație</span>
            <p>{site.address}</p>
          </div>
          <div className="ch-info__item" data-reveal>
            <span>Program</span>
            <p>Luni–Vineri, 09:00–18:00</p>
            <p>Răspuns în maximum 24h</p>
          </div>
        </div>
      </section>

      <section className="section ch-faq">
        <div className="container">
          <div data-reveal className="eyebrow" style={{ marginBottom: "1.6rem" }}>Întrebări frecvente</div>
          <div className="ch-faq__list">
            {contactFaqs.map((faq) => (
              <details data-reveal key={faq.q} className="ch-faq__item">
                <summary>{faq.q}</summary>
                <p>{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
