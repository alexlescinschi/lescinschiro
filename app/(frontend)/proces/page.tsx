import type { Metadata } from "next";
import ProcessPage from "@/components/ProcessPage";
import { site, processFull } from "@/data/content";

export const metadata: Metadata = {
  title: "Proces de Lucru",
  description:
    "Procesul nostru în 4 pași: brief, design, dezvoltare, lansare. Preț fix, termene clare, cod pe GitHub. Ofertă în 24–48h. LESCINSCHI — site-uri, magazine online și integrări.",
  alternates: { canonical: "/proces" },
  openGraph: {
    title: "Proces de Lucru — LESCINSCHI",
    description: "4 pași: brief, design, dezvoltare, lansare. Preț fix, cod pe GitHub.",
    url: `${site.domain}/proces`,
  },
};

// JSON-LD HowTo — pentru rich snippets Google.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Cum lucrăm cu clienții LESCINSCHI",
  description: "Procesul de lucru în 4 pași, de la brief la lansare.",
  step: processFull.map((s, i) => ({
    "@type": "HowToStep",
    position: i + 1,
    name: s.title,
    text: `${s.desc} Durată: ${s.duration}. Livrabil: ${s.deliverable}.`,
  })),
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ProcessPage />
    </>
  );
}
