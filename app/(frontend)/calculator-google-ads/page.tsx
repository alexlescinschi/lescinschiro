import type { Metadata } from "next";
import AdsCalculatorPage from "@/components/AdsCalculatorPage";
import { site } from "@/data/content";

export const metadata: Metadata = {
  title: "Calculator Reclame Google — află dacă ești profitabil",
  description: "Află dacă publicitatea ta în Google Ads este profitabilă și cu cât anume. Calculează instant traficul, venitul, profitul net, ROMI și ROAS.",
  alternates: { canonical: "/calculator-google-ads" },
  openGraph: {
    title: "Calculator Reclame Google — LESCINSCHI",
    description: "Află dacă publicitatea ta în Google Ads este profitabilă și cu cât anume. Calculator gratuit de profit.",
    url: `${site.domain}/calculator-google-ads`,
    type: "website",
  },
};

export default function Page() {
  return <AdsCalculatorPage />;
}
