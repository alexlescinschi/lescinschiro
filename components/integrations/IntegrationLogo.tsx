"use client";

import { useState } from "react";
import styles from "./integrations.module.css";

type IntegrationLogoProps = {
  name: string;
  src?: string;
  alt?: string;
  onDark?: boolean;
  className?: string;
};

function getMonogram(name: string) {
  const words = name.trim().split(/\s+/).filter(Boolean);
  const firstCharacter = (word: string) => Array.from(word).find((character) => /[\p{L}\p{N}]/u.test(character)) || "";
  const letters = words.length > 1
    ? words.map(firstCharacter).filter(Boolean).slice(0, 2).join("")
    : Array.from(words[0] ?? "?").filter((character) => /[\p{L}\p{N}]/u.test(character)).slice(0, 2).join("");

  return (letters || "?").toLocaleUpperCase("ro-RO");
}

export default function IntegrationLogo({ name, src = "", alt, onDark = false, className }: IntegrationLogoProps) {
  const normalizedSource = src.trim();
  const localSource = normalizedSource.startsWith("/") && !normalizedSource.startsWith("//")
    ? normalizedSource
    : "";
  const [failedSource, setFailedSource] = useState<string | null>(null);
  const showImage = Boolean(localSource) && failedSource !== localSource;
  const accessibleLabel = alt?.trim() || `Logo ${name}`;
  const classes = [styles.logo, onDark && styles.logoDark, className].filter(Boolean).join(" ");

  return (
    <span className={classes}>
      {showImage ? (
        // Logo paths are managed locally in Payload and do not use remote assets.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className={styles.logoImage}
          src={localSource}
          alt={accessibleLabel}
          width={64}
          height={64}
          loading="lazy"
          decoding="async"
          onError={() => setFailedSource(localSource)}
        />
      ) : (
        <span className={styles.logoMonogram} role="img" aria-label={accessibleLabel}>
          {getMonogram(name)}
        </span>
      )}
    </span>
  );
}
