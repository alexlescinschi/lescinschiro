import Link from "next/link";
import type { IntegrationCardData } from "@/lib/integrations";
import IntegrationCatalog from "./IntegrationCatalog";
import IntegrationRequestLink from "./IntegrationRequestLink";
import styles from "./integrations.module.css";

const syncItems = [
  {
    title: "Produse și variante",
    text: "Identificatori, categorii, atribute și date comerciale mapate între sisteme.",
  },
  {
    title: "Stoc și disponibilitate",
    text: "Cantități pe depozite, rezervări și reguli pentru sursa de adevăr.",
  },
  {
    title: "Prețuri și promoții",
    text: "Liste de preț, monede, taxe și reduceri, în limitele interfețelor disponibile.",
  },
  {
    title: "Comenzi și statusuri",
    text: "Date de comandă, confirmări și stări operaționale fără procesări duplicate.",
  },
  {
    title: "Clienți și lead-uri",
    text: "Datele necesare fluxului comercial, cu scop și responsabilități definite.",
  },
  {
    title: "Facturi și documente",
    text: "Referințe, documente și reguli de emitere stabilite împreună cu echipa clientului.",
  },
  {
    title: "Livrare și tracking",
    text: "AWB, etichete, puncte de livrare și evenimente, acolo unde API-ul le oferă.",
  },
  {
    title: "Evenimente și conversii",
    text: "Semnale pentru analytics și marketing, configurate cu controlul consimțământului.",
  },
];

const processSteps = [
  {
    title: "Context",
    text: "Clarificăm sistemele, utilizatorii și rezultatul operațional urmărit.",
  },
  {
    title: "Acces tehnic",
    text: "Verificăm documentația, contractul, mediile și operațiunile disponibile.",
  },
  {
    title: "Mapare",
    text: "Definim câmpurile, statusurile, sursa de adevăr și tratarea conflictelor.",
  },
  {
    title: "Implementare",
    text: "Construim fluxul și păstrăm credentialele în afara interfeței publice.",
  },
  {
    title: "Testare",
    text: "Acoperim scenariile normale, erorile, reluările și mesajele duplicate.",
  },
  {
    title: "Lansare",
    text: "Activăm controlat, documentăm operarea și stabilim responsabilitățile ulterioare.",
  },
];

export const integrationHubFaqs = [
  {
    question: "Ce înseamnă o integrare între două sisteme?",
    answer: "Este un schimb controlat de date și acțiuni între aplicații. Înainte de dezvoltare stabilim ce informații circulă, în ce direcție și care sistem decide valoarea finală.",
  },
  {
    question: "Ce fac dacă furnizorul meu nu apare în catalog?",
    answer: "Trimite-ne denumirea și fluxul dorit. Verificăm documentația și accesul disponibil, apoi îți spunem dacă integrarea este fezabilă și ce limitări are.",
  },
  {
    question: "Este obligatoriu ca furnizorul să aibă API?",
    answer: "Un API documentat este varianta preferată, dar unele proiecte pot folosi webhook-uri, exporturi sau schimburi de fișiere. Alegerea se face numai după o evaluare tehnică și de securitate.",
  },
  {
    question: "Cât durează implementarea?",
    answer: "Durata depinde de numărul fluxurilor, calitatea documentației, accesul la medii de test și regulile de business. Estimarea se oferă după ce aceste elemente sunt verificate.",
  },
  {
    question: "Cum se stabilește costul?",
    answer: "Oferta ține cont de operațiuni, mapări, scenarii de eroare și testare. Licențele, abonamentele sau comisioanele furnizorilor sunt contractate separat de client.",
  },
  {
    question: "Cum protejați credentialele și datele?",
    answer: "Proiectarea pornește de la acces minim necesar, separarea mediilor și evitarea secretelor în loguri sau interfața publică. Cerințele exacte depind de sistemele conectate.",
  },
  {
    question: "Sincronizarea este întotdeauna în timp real?",
    answer: "Nu. Webhook-urile pot permite actualizări rapide, iar alte sisteme cer sincronizare programată. Frecvența este aleasă în funcție de API, limite și nevoia operațională.",
  },
  {
    question: "Ce se întâmplă când furnizorul își schimbă API-ul?",
    answer: "Schimbările de versiune pot necesita retestare și adaptare. Monitorizarea și mentenanța se stabilesc explicit în propunerea tehnică, în funcție de criticitatea fluxului.",
  },
];

type IntegrationsPageProps = {
  items: IntegrationCardData[];
  total: number;
};

export default function IntegrationsPage({ items, total }: IntegrationsPageProps) {
  const formattedTotal = new Intl.NumberFormat("ro-RO").format(total);
  const totalLabel = total === 1 ? "integrare în catalog" : "integrări în catalog";

  return (
    <main className={styles.page}>
      <section className={styles.hubHero} aria-labelledby="integrations-title">
        <div className={styles.shell}>
          <div className={styles.heroTopline}>
            <span>Catalog tehnic</span>
            <span>MD / RO / UE / Internațional</span>
          </div>

          <div className={styles.hubHeroGrid}>
            <div>
              <p className={styles.kicker}>Integrări</p>
              <h1 id="integrations-title" className={styles.hubTitle}>
                Sisteme care <span>vorbesc</span> între ele.
              </h1>
            </div>

            <aside className={styles.heroAside}>
              <p>
                Găsește furnizorul după nume, alias, categorie sau regiune. Fezabilitatea și fluxurile se confirmă după verificarea documentației și a accesului tehnic.
              </p>
              <div className={styles.totalBlock} aria-label={`${formattedTotal} ${totalLabel}`}>
                <strong>{formattedTotal}</strong>
                <span>{totalLabel}</span>
              </div>
            </aside>
          </div>

          <div className={styles.heroRail} aria-hidden="true">
            <span>API</span>
            <span>WEBHOOK</span>
            <span>SYNC</span>
            <span>DATA</span>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.catalogSection}`} aria-labelledby="catalog-title">
        <div className={styles.shell}>
          <header className={styles.sectionHeader}>
            <p className={styles.kicker}>01 / Catalog</p>
            <div>
              <h2 id="catalog-title" className={styles.sectionTitle}>Alege punctul de pornire.</h2>
              <p className={styles.sectionLead}>
                Fiecare proiect pornește de la contul, contractul și interfața tehnică disponibile clientului.
              </p>
            </div>
          </header>
          <IntegrationCatalog items={items} />
        </div>
      </section>

      <section className={styles.syncSection} aria-labelledby="sync-title">
        <div className={styles.shell}>
          <header className={styles.invertedHeader}>
            <p className={styles.kicker}>02 / Date</p>
            <h2 id="sync-title" className={styles.sectionTitle}>Ce sincronizăm</h2>
          </header>
          <ol className={styles.syncGrid}>
            {syncItems.map((item, index) => (
              <li key={item.title} className={styles.syncItem}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="process-title">
        <div className={styles.shell}>
          <header className={styles.sectionHeader}>
            <p className={styles.kicker}>03 / Proces</p>
            <div>
              <h2 id="process-title" className={styles.sectionTitle}>Șase pași, fără presupuneri.</h2>
              <p className={styles.sectionLead}>Începem cu interfața reală a furnizorului, nu cu o promisiune generică.</p>
            </div>
          </header>
          <ol className={styles.processList}>
            {processSteps.map((step, index) => (
              <li key={step.title} className={styles.processItem}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={`${styles.section} ${styles.faqSection}`} aria-labelledby="faq-title">
        <div className={styles.shell}>
          <header className={styles.sectionHeader}>
            <p className={styles.kicker}>04 / FAQ</p>
            <h2 id="faq-title" className={styles.sectionTitle}>Întrebări înainte de integrare.</h2>
          </header>
          <div className={styles.faqGrid}>
            {integrationHubFaqs.map((faq, index) => (
              <article key={faq.question} className={styles.faqItem}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <aside className={styles.providerNote} aria-label="Notă despre furnizori și mărci">
        <div className={styles.shell}>
          <span>Notă</span>
          <p>
            Denumirile și logourile aparțin titularilor lor. Prezența în catalog descrie un context tehnic posibil și nu implică parteneriat, certificare sau aprobare oficială. Funcțiile disponibile depind de furnizor, contract, regiune și versiunea interfeței sale.
          </p>
        </div>
      </aside>

      <section className={styles.finalCta} aria-labelledby="hub-cta-title">
        <div className={`${styles.shell} ${styles.finalCtaInner}`}>
          <div>
            <p className={styles.kicker}>Următorul flux</p>
            <h2 id="hub-cta-title">Ai un sistem care trebuie conectat?</h2>
          </div>
          <div className={styles.ctaActions}>
            <IntegrationRequestLink slug="integrare-custom" className={`${styles.button} ${styles.buttonDark}`}>
              Discută integrarea
            </IntegrationRequestLink>
            <Link href="/proces" className={`${styles.button} ${styles.buttonOutlineDark}`}>
              Vezi procesul
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
