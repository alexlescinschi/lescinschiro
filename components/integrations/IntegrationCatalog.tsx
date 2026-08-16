"use client";

import { useDeferredValue, useId, useState } from "react";
import type {
  IntegrationCardData,
  IntegrationCategory,
  IntegrationRegion,
} from "@/lib/integrations";
import IntegrationCard, { CATEGORY_LABELS, REGION_LABELS } from "./IntegrationCard";
import IntegrationRequestLink from "./IntegrationRequestLink";
import styles from "./integrations.module.css";

const categoryOptions = Object.entries(CATEGORY_LABELS) as [IntegrationCategory, string][];
const regionOptions = Object.entries(REGION_LABELS) as [IntegrationRegion, string][];

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("ro-RO")
    .trim();
}

function countLabel(count: number) {
  return count === 1 ? "1 integrare" : `${count} integrări`;
}

type IntegrationCatalogProps = {
  items: IntegrationCardData[];
};

export default function IntegrationCatalog({ items }: IntegrationCatalogProps) {
  const searchId = useId();
  const categoryId = useId();
  const regionId = useId();
  const countId = useId();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<IntegrationCategory | "all">("all");
  const [region, setRegion] = useState<IntegrationRegion | "all">("all");
  const deferredSearch = useDeferredValue(search);
  const query = normalize(deferredSearch);

  const filteredItems = items.filter((item) => {
    const matchesCategory = category === "all" || item.category === category;
    const matchesRegion = region === "all" || item.regions.includes(region);
    const searchableText = normalize([
      item.name,
      ...item.aliases,
      CATEGORY_LABELS[item.category],
      item.summary,
      ...item.capabilities,
    ].join(" "));
    const matchesSearch = !query || searchableText.includes(query);

    return matchesCategory && matchesRegion && matchesSearch;
  });

  const hasFilters = Boolean(search) || category !== "all" || region !== "all";

  function resetFilters() {
    setSearch("");
    setCategory("all");
    setRegion("all");
  }

  return (
    <div className={styles.catalog}>
      <div className={styles.filters} role="group" aria-label="Filtrează catalogul">
        <div className={styles.searchField}>
          <label htmlFor={searchId}>Caută după nume sau alias</label>
          <input
            id={searchId}
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Exemplu: curier, ERP, plăți"
            autoComplete="off"
            aria-describedby={countId}
          />
        </div>

        <div className={styles.selectField}>
          <label htmlFor={categoryId}>Categorie</label>
          <select
            id={categoryId}
            value={category}
            onChange={(event) => setCategory(event.target.value as IntegrationCategory | "all")}
          >
            <option value="all">Toate cele 9 categorii</option>
            {categoryOptions.map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>

        <div className={styles.selectField}>
          <label htmlFor={regionId}>Regiune</label>
          <select
            id={regionId}
            value={region}
            onChange={(event) => setRegion(event.target.value as IntegrationRegion | "all")}
          >
            <option value="all">Toate regiunile</option>
            {regionOptions.map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.catalogStatus}>
        <p id={countId} role="status" aria-live="polite" aria-atomic="true">
          {countLabel(filteredItems.length)}
        </p>
        <button type="button" onClick={resetFilters} disabled={!hasFilters}>
          Resetează filtrele
        </button>
      </div>

      {filteredItems.length > 0 ? (
        <div className={styles.cardGrid}>
          {filteredItems.map((item) => (
            <IntegrationCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className={styles.catalogEmpty}>
          <span aria-hidden="true">00</span>
          <div>
            <h3>Nu am găsit o potrivire exactă.</h3>
            <p>
              Putem evalua o integrare custom după ce verificăm documentația, accesul tehnic și fluxurile necesare.
            </p>
          </div>
          <IntegrationRequestLink slug="integrare-custom" className={`${styles.button} ${styles.buttonLime}`}>
            Propune o integrare
          </IntegrationRequestLink>
        </div>
      )}
    </div>
  );
}
