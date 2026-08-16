import Link from "next/link";
import type { IntegrationCardData } from "@/lib/integrations";
import IntegrationLogo from "./IntegrationLogo";
import IntegrationRequestLink from "./IntegrationRequestLink";
import styles from "./integrations.module.css";

type IntegrationStripProps = {
  items: IntegrationCardData[];
  total: number;
};

export default function IntegrationStrip({ items, total }: IntegrationStripProps) {
  const visibleItems = items.slice(0, 16);
  const normalizedTotal = Number.isFinite(total) ? Math.max(0, Math.trunc(total)) : 0;
  const truthfulTotal = Math.max(items.length, normalizedTotal);
  const formattedTotal = new Intl.NumberFormat("ro-RO").format(truthfulTotal);
  const totalLabel = truthfulTotal === 1
    ? "integrare disponibilă în catalog"
    : "integrări disponibile în catalog";

  return (
    <section className={styles.integrationStrip} aria-labelledby="integration-strip-title">
      <div className={styles.shell}>
        <header className={styles.stripHeader}>
          <div className={styles.stripHeading}>
            <p className={styles.kicker}>Integrări</p>
            <h2 id="integration-strip-title" className={styles.stripTitle}>
              Conectăm sistemele pe care afacerea ta le folosește deja
            </h2>
          </div>

          {visibleItems.length > 0 && (
            <div className={styles.stripAside}>
              <p className={styles.stripCount} aria-label={`${formattedTotal} ${totalLabel}`}>
                <strong>{formattedTotal}</strong>
                <span>{totalLabel}</span>
              </p>
              <Link href="/integrari" className={`${styles.button} ${styles.buttonLime}`}>
                Vezi catalogul
              </Link>
            </div>
          )}
        </header>

        {visibleItems.length > 0 ? (
          <ul className={styles.stripRail} aria-label="Integrări selectate">
            {visibleItems.map((item) => {
              const content = (
                <>
                  <span aria-hidden="true">
                    <IntegrationLogo
                      name={item.name}
                      src={item.logo}
                      alt={item.logoAlt}
                      onDark={item.logoOnDark}
                      className={styles.stripLogo}
                    />
                  </span>
                  <span>
                    {item.name}
                    <span className={styles.visuallyHidden}>
                      {item.hasPublicPage ? ", vezi detalii" : ", solicită integrarea"}
                    </span>
                  </span>
                </>
              );

              return (
                <li key={item.id}>
                  {item.hasPublicPage ? (
                    <Link
                      href={`/integrari/${encodeURIComponent(item.slug)}`}
                      className={styles.stripItemLink}
                    >
                      {content}
                    </Link>
                  ) : (
                    <IntegrationRequestLink slug={item.slug} className={styles.stripItemLink}>
                      {content}
                    </IntegrationRequestLink>
                  )}
                </li>
              );
            })}
          </ul>
        ) : (
          <div className={styles.stripEmpty}>
            <p>
              Consultă toate sistemele din catalog sau spune-ne ce aplicație trebuie conectată.
            </p>
            <Link href="/integrari" className={`${styles.button} ${styles.buttonLime}`}>
              Explorează catalogul
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
