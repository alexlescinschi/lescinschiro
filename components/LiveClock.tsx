"use client";
import { useEffect, useState } from "react";
import { site } from "@/data/content";

function formatLocalTime() {
  return new Intl.DateTimeFormat("ro-RO", {
    hour: "2-digit", minute: "2-digit", second: "2-digit", timeZone: site.tz,
  }).format(new Date());
}

// Ora locală live din Chișinău — detaliu „studio real, acum".
export default function LiveClock() {
  const [t, setT] = useState(formatLocalTime);
  useEffect(() => {
    const id = setInterval(() => setT(formatLocalTime()), 1000);
    return () => clearInterval(id);
  }, []);
  return <span suppressHydrationWarning>{site.city}_{t}</span>;
}
