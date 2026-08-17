import type { Metadata } from "next";
import AdsCalculatorPage from "@/components/AdsCalculatorPage";
import { site } from "@/data/content";

export const metadata: Metadata = {
  title: "Calculator Google Ads — ROI & profit",
  description: "Estimează gratuit traficul, venitul și profitul unei campanii Google Ads: buget, cost per click, marjă, conversie, ROMI și ROAS.",
  alternates: { canonical: "/calculator-google-ads" },
  openGraph: {
    title: "Calculator Google Ads — LESCINSCHI",
    description: "Calculează în câteva secunde profitul estimat al unei campanii Google Ads pentru afacerea ta.",
    url: `${site.domain}/calculator-google-ads`,
    type: "website",
  },
};

export default function Page() {
  return <AdsCalculatorPage />;
}
