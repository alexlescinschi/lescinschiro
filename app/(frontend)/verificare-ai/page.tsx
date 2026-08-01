import type { Metadata } from "next";
import AIReadinessPage from "@/components/AIReadinessPage";
import { site } from "@/data/content";

export const metadata: Metadata = {
  title: "Verificare vizibilitate AI",
  description: "Verifică gratuit cât de bine este pregătit website-ul companiei tale pentru motoarele de căutare AI.",
  alternates: { canonical: "/verificare-ai" },
  openGraph: {
    title: "Verificare vizibilitate AI — LESCINSCHI",
    description: "Primește gratuit un scor preliminar și recomandări pentru vizibilitatea companiei tale în căutarea AI.",
    url: `${site.domain}/verificare-ai`,
    type: "website",
  },
};

export default function Page() {
  return <AIReadinessPage />;
}
