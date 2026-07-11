"use client";
import { useEffect, useState } from "react";
import { site } from "@/data/content";

// Ora locală live din București — detaliu „studio real, acum".
export default function LiveClock() {
  const [t, setT] = useState("");
  useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat("ro-RO", {
        hour: "2-digit", minute: "2-digit", second: "2-digit", timeZone: site.tz,
      }).format(new Date());
    setT(fmt());
    const id = setInterval(() => setT(fmt()), 1000);
    return () => clearInterval(id);
  }, []);
  return <span suppressHydrationWarning>{site.city}_{t}</span>;
}
