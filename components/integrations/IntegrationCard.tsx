import Link from "next/link";
import type {
  IntegrationCardData,
  IntegrationCategory,
  IntegrationRegion,
} from "@/lib/integrations";
import IntegrationLogo from "./IntegrationLogo";
import IntegrationRequestLink from "./IntegrationRequestLink";
import styles from "./integrations.module.css";

export const CATEGORY_LABELS: Record<IntegrationCategory, string> = {
  "plati-online": "Plăți online",
  "rate-finantare": "Rate și finanțare",
  "curierat-fulfillment": "Curierat și fulfillment",
  "erp-stoc-contabilitate": "ERP, stoc și contabilitate",
  "crm-vanzari": "CRM și vânzări",
  "marketplace-feeduri": "Marketplace și feeduri",
  "marketing-analytics": "Marketing și analytics",
  "automatizari-comunicare": "Automatizări și comunicare",
  "programari-sisteme-custom": "Programări și sisteme custom",
};

export const REGION_LABELS: Record<IntegrationRegion, string> = {
  md: "Moldova",
  ro: "România",
  ue: "Uniunea Europeană",
  international: "Internațional",
};

type IntegrationCardProps = {
  item: IntegrationCardData;
};

export default function IntegrationCard({ item }: IntegrationCardProps) {
  const capabilities = item.capabilities.slice(0, 3);
  const cardClasses = `${styles.card}${item.hasPublicPage ? ` ${styles.cardLinked}` : ""}`;

  return (
    <article className={cardClasses}>
      <div className={styles.cardHeader}>
        <IntegrationLogo name={item.name} src={item.logo} alt={item.logoAlt} onDark={item.logoOnDark} />
        <span className={styles.cardCategory}>{CATEGORY_LABELS[item.category]}</span>
      </div>

      <h3 className={styles.cardTitle}>
        {item.hasPublicPage ? (
          <Link className={styles.cardTitleLink} href={`/integrari/${encodeURIComponent(item.slug)}`}>
            {item.name}
          </Link>
        ) : (
          item.name
        )}
      </h3>

      <ul className={styles.regionList} aria-label="Regiuni disponibile">
        {item.regions.map((region) => (
          <li key={region}>{REGION_LABELS[region]}</li>
        ))}
      </ul>

      <p className={styles.cardSummary}>{item.summary}</p>

      {capabilities.length > 0 && (
        <ul className={styles.cardCapabilities} aria-label={`Capabilități ${item.name}`}>
          {capabilities.map((capability) => (
            <li key={capability}>{capability}</li>
          ))}
        </ul>
      )}

      <div className={styles.cardFooter}>
        {item.hasPublicPage ? (
          <span className={styles.cardReadMore} aria-hidden="true">
            Vezi detalii <span>+</span>
          </span>
        ) : (
          <IntegrationRequestLink slug={item.slug} className={styles.cardRequest}>
            Cere evaluarea
          </IntegrationRequestLink>
        )}
      </div>
    </article>
  );
}
