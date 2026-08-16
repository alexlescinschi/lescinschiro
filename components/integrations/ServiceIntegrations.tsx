import Link from "next/link";
import type { IntegrationCardData, IntegrationCategory } from "@/lib/integrations";
import { CATEGORY_LABELS } from "./IntegrationCard";
import IntegrationLogo from "./IntegrationLogo";
import IntegrationRequestLink from "./IntegrationRequestLink";
import styles from "./integrations.module.css";

type LegacyIntegrationGroup = {
  eticheta?: string | null;
  elemente?: string | null;
};

type ServiceIntegrationsProps = {
  items: IntegrationCardData[];
  legacyGroups?: LegacyIntegrationGroup[] | null;
};

const categoryEntries = Object.entries(CATEGORY_LABELS) as [IntegrationCategory, string][];

export default function ServiceIntegrations({ items, legacyGroups }: ServiceIntegrationsProps) {
  const structuredGroups = categoryEntries
    .map(([category, label]) => ({
      category,
      label,
      items: items.filter((item) => item.category === category),
    }))
    .filter((group) => group.items.length > 0);

  const populatedLegacyGroups = items.length > 0
    ? []
    : (legacyGroups ?? []).flatMap((group, index) => {
        const elements = (group.elemente ?? "")
          .split(",")
          .map((element) => element.trim())
          .filter(Boolean);

        return elements.length > 0
          ? [{ label: group.eticheta?.trim() ?? "", elements, index }]
          : [];
      });

  if (structuredGroups.length === 0 && populatedLegacyGroups.length === 0) return null;

  return (
    <section className={styles.serviceIntegrations} aria-labelledby="service-integrations-title">
      <div className={styles.shell}>
        <header className={styles.serviceHeader}>
          <p className={styles.kicker}>Sisteme conectate</p>
          <div>
            <h2 id="service-integrations-title" className={styles.serviceTitle}>
              Integrări în contextul acestui serviciu
            </h2>
            <p className={styles.serviceLead}>
              Fluxurile și accesul tehnic se confirmă pentru sistemele și conturile folosite în proiect.
            </p>
          </div>
        </header>

        <div className={styles.serviceGroups}>
          {structuredGroups.map((group) => (
            <div key={group.category} className={styles.serviceGroup}>
              <h3>{group.label}</h3>
              <ul className={styles.serviceItems}>
                {group.items.map((item) => {
                  const content = (
                    <>
                      <span aria-hidden="true">
                        <IntegrationLogo
                          name={item.name}
                          src={item.logo}
                          alt={item.logoAlt}
                          onDark={item.logoOnDark}
                          className={styles.serviceLogo}
                        />
                      </span>
                      <span className={styles.serviceItemName}>{item.name}</span>
                      <span className={styles.serviceItemAction}>
                        {item.hasPublicPage ? "Detalii" : "Solicită"}
                      </span>
                    </>
                  );

                  return (
                    <li key={item.id}>
                      {item.hasPublicPage ? (
                        <Link
                          href={`/integrari/${encodeURIComponent(item.slug)}`}
                          className={styles.serviceItemLink}
                        >
                          {content}
                        </Link>
                      ) : (
                        <IntegrationRequestLink slug={item.slug} className={styles.serviceItemLink}>
                          {content}
                        </IntegrationRequestLink>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          {populatedLegacyGroups.map((group) => (
            <div key={`${group.label}-${group.index}`} className={styles.serviceGroup}>
              {group.label && <h3>{group.label}</h3>}
              <ul
                className={styles.legacyItems}
                aria-label={group.label || "Integrări disponibile"}
              >
                {group.elements.map((element, index) => (
                  <li key={`${element}-${index}`}>{element}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <footer className={styles.serviceFooter}>
          <p>Nu vezi sistemul folosit de echipa ta? Îl evaluăm pornind de la documentația reală.</p>
          <Link href="/integrari" className={`${styles.button} ${styles.buttonLime}`}>
            Vezi catalogul complet
          </Link>
        </footer>
      </div>
    </section>
  );
}
