import Link from "next/link";
import { RichText } from "@payloadcms/richtext-lexical/react";
import type { DefaultTypedEditorState } from "@payloadcms/richtext-lexical";
import type { IntegrationDetailData, IntegrationRelations } from "@/lib/integrations";
import { CATEGORY_LABELS, REGION_LABELS } from "./IntegrationCard";
import IntegrationLogo from "./IntegrationLogo";
import IntegrationRequestLink from "./IntegrationRequestLink";
import styles from "./integrations.module.css";

function isRenderableRichText(value: unknown): value is DefaultTypedEditorState {
  if (!value || typeof value !== "object") return false;
  const root = (value as { root?: unknown }).root;
  if (!root || typeof root !== "object") return false;
  const typedRoot = root as { type?: unknown; version?: unknown; children?: unknown };

  return typedRoot.type === "root"
    && typeof typedRoot.version === "number"
    && Array.isArray(typedRoot.children);
}

function safeExternalUrl(value: string) {
  if (!value) return "";

  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url.href : "";
  } catch {
    return "";
  }
}

type IntegrationDetailPageProps = {
  integration: IntegrationDetailData;
  relations: IntegrationRelations;
};

export default function IntegrationDetailPage({ integration, relations }: IntegrationDetailPageProps) {
  const richContent = isRenderableRichText(integration.content) ? integration.content : null;
  const officialUrl = safeExternalUrl(integration.officialUrl);
  const hasRelations = relations.services.length > 0
    || relations.posts.length > 0;

  return (
    <main className={styles.detailPage}>
      <section className={styles.detailHero} aria-labelledby="integration-title">
        <div className={styles.shell}>
          <nav className={styles.breadcrumb} aria-label="Fir de navigare">
            <ol>
              <li><Link href="/">Acasă</Link></li>
              <li><Link href="/integrari">Integrări</Link></li>
              <li aria-current="page">{integration.name}</li>
            </ol>
          </nav>

          <div className={styles.detailHeroGrid}>
            <div className={styles.detailIdentity}>
              <div className={styles.detailLogoLine}>
                <IntegrationLogo name={integration.name} src={integration.logo} alt={integration.logoAlt} onDark={integration.logoOnDark} />
                <span>{CATEGORY_LABELS[integration.category]}</span>
              </div>
              <h1 id="integration-title" className={styles.detailTitle}>
                <span>Integrare</span>
                {integration.name}
              </h1>
            </div>

            <aside className={styles.detailHeroAside}>
              <ul className={styles.regionList} aria-label="Regiuni disponibile">
                {integration.regions.map((region) => (
                  <li key={region}>{REGION_LABELS[region]}</li>
                ))}
              </ul>
              <p>{integration.summary}</p>
              <div className={styles.ctaActions}>
                <IntegrationRequestLink slug={integration.slug} className={`${styles.button} ${styles.buttonLime}`}>
                  Cere o evaluare
                </IntegrationRequestLink>
                <Link href="/integrari" className={`${styles.button} ${styles.buttonOutline}`}>
                  Înapoi la catalog
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {integration.capabilities.length > 0 && (
        <section className={`${styles.section} ${styles.detailCapabilities}`} aria-labelledby="capabilities-title">
          <div className={styles.shell}>
            <header className={styles.sectionHeader}>
              <p className={styles.kicker}>01 / Capabilități</p>
              <div>
                <h2 id="capabilities-title" className={styles.sectionTitle}>Ce poate intra în scop.</h2>
                <p className={styles.sectionLead}>Disponibilitatea finală se confirmă pentru contul și interfața tehnică a clientului.</p>
              </div>
            </header>
            <ol className={styles.capabilityGrid}>
              {integration.capabilities.map((capability, index) => (
                <li key={capability}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{capability}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {richContent && richContent.root.children.length > 0 && (
        <section className={`${styles.section} ${styles.richSection}`} aria-label={`Despre integrarea ${integration.name}`}>
          <div className={styles.shell}>
            <RichText className={styles.prose} data={richContent} />
          </div>
        </section>
      )}

      {integration.requirements.length > 0 && (
        <section className={styles.requirementsSection} aria-labelledby="requirements-title">
          <div className={`${styles.shell} ${styles.requirementsLayout}`}>
            <header>
              <p className={styles.kicker}>02 / Înainte de start</p>
              <h2 id="requirements-title" className={styles.sectionTitle}>Ce avem nevoie.</h2>
            </header>
            <ul className={styles.requirementsList}>
              {integration.requirements.map((requirement, index) => (
                <li key={requirement}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{requirement}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className={styles.deliveryBand} aria-labelledby="delivery-title">
        <div className={styles.shell}>
          <header className={styles.deliveryHeader}>
            <p className={styles.kicker}>03 / Cadru de lucru</p>
            <h2 id="delivery-title" className={styles.sectionTitle}>Estimare, proces, siguranță.</h2>
          </header>
          <dl className={styles.deliveryGrid}>
            <div>
              <dt>Durată orientativă</dt>
              <dd>{integration.duration || "Se stabilește după verificarea fluxurilor și a accesului tehnic."}</dd>
            </div>
            <div>
              <dt>Proces</dt>
              <dd>Audit tehnic, mapare, implementare, testare și activare controlată.</dd>
            </div>
            <div>
              <dt>Siguranță</dt>
              <dd>Planul definește accesul minim necesar, separarea mediilor, validarea mesajelor și tratarea erorilor.</dd>
            </div>
            {integration.price && (
              <div>
                <dt>Preț orientativ</dt>
                <dd>
                  {integration.price}
                  <small>Licențele, abonamentele și comisioanele furnizorului se confirmă separat.</small>
                </dd>
              </div>
            )}
          </dl>
        </div>
      </section>

      {hasRelations && (
        <section className={`${styles.section} ${styles.relationsSection}`} aria-labelledby="relations-title">
          <div className={styles.shell}>
            <header className={styles.sectionHeader}>
              <p className={styles.kicker}>04 / În context</p>
              <h2 id="relations-title" className={styles.sectionTitle}>Mai departe în proiect.</h2>
            </header>
            <div className={styles.relationsGrid}>
              {relations.services.length > 0 && (
                <article className={styles.relationGroup}>
                  <h3>Servicii asociate</h3>
                  <ul>
                    {relations.services.map((service) => (
                      <li key={service.slug}>
                        <Link href={`/servicii/${encodeURIComponent(service.slug)}`}>{service.title}</Link>
                      </li>
                    ))}
                  </ul>
                </article>
              )}

              {relations.posts.length > 0 && (
                <article className={styles.relationGroup}>
                  <h3>Articole asociate</h3>
                  <ul>
                    {relations.posts.map((post) => (
                      <li key={post.slug}>
                        <Link href={`/blog/${encodeURIComponent(post.slug)}`}>{post.title}</Link>
                      </li>
                    ))}
                  </ul>
                </article>
              )}
            </div>
          </div>
        </section>
      )}

      {integration.faq.length > 0 && (
        <section className={`${styles.section} ${styles.faqSection}`} aria-labelledby="detail-faq-title">
          <div className={styles.shell}>
            <header className={styles.sectionHeader}>
              <p className={styles.kicker}>05 / FAQ</p>
              <h2 id="detail-faq-title" className={styles.sectionTitle}>Întrebări despre {integration.name}.</h2>
            </header>
            <div className={styles.faqGrid}>
              {integration.faq.map((faq, index) => (
                <article key={faq.question} className={styles.faqItem}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{faq.question}</h3>
                  <p>{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <aside className={styles.providerNote} aria-label="Notă despre furnizor și marcă">
        <div className={styles.shell}>
          <span>Notă</span>
          <p>
            Denumirea și logoul {integration.name} aparțin titularului lor. Această prezentare descrie servicii tehnice independente și nu indică un parteneriat, o certificare sau o aprobare oficială. Funcțiile depind de contractul clientului, regiune și versiunea interfeței furnizorului.
          </p>
          {officialUrl && (
            <a href={officialUrl} target="_blank" rel="noopener noreferrer">
              Pagina oficială a furnizorului
            </a>
          )}
        </div>
      </aside>

      <section className={styles.finalCta} aria-labelledby="detail-cta-title">
        <div className={`${styles.shell} ${styles.finalCtaInner}`}>
          <div>
            <p className={styles.kicker}>Integrarea {integration.name}</p>
            <h2 id="detail-cta-title">Verificăm fluxul tău concret.</h2>
          </div>
          <IntegrationRequestLink slug={integration.slug} className={`${styles.button} ${styles.buttonDark}`}>
            Cere o evaluare
          </IntegrationRequestLink>
        </div>
      </section>
    </main>
  );
}
