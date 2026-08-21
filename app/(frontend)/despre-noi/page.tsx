import type { Metadata } from "next";
import AboutPage from "@/components/AboutPage";
import { site, founder } from "@/data/content";

export const metadata: Metadata = {
  title: "Despre Noi",
  description:
    "Echipa LESCINSCHI: 40+ proiecte livrate în MD, GB, IT, BG, SK, PL, UA, CY, ES, PT. 10 ani de experiență în web. Next.js + Payload + Postgres. Cod pe GitHub, preț fix, comunicare directă.",
  alternates: { canonical: "/despre-noi" },
  openGraph: {
    title: "Despre Noi — LESCINSCHI",
    description: "10 ani, 40+ proiecte, 10 țări. Cod curat, predat pe GitHub.",
    url: `${site.domain}/despre-noi`,
  },
};

// JSON-LD AboutPage + Person (fondator).
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "Despre LESCINSCHI",
  url: `${site.domain}/despre-noi`,
  mainEntity: {
    "@type": "Organization",
    name: site.name,
    url: site.domain,
    foundingDate: "2016",
    email: site.email,
    founder: {
      "@type": "Person",
      name: founder.name,
      jobTitle: founder.role,
      description: founder.bio,
    },
    areaServed: ["MD", "GB", "IT", "BG", "SK", "PL", "UA", "CY", "ES", "PT"],
  },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <AboutPage />
    </>
  );
}
