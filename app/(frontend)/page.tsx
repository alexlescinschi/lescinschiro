import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import WhyUs from "@/components/WhyUs";
import Process from "@/components/Process";
import Integrations from "@/components/Integrations";
import AI from "@/components/AI";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import SelectedWorks from "@/components/SelectedWorks";
import { getPayload } from "payload";
import config from "@payload-config";

export const dynamic = "force-dynamic";

// ponytail: projects din Payload CMS, nu hardcodate
// Graceful fallback if DB not yet migrated — returns empty array
async function getProjects() {
  try {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: "proiecte",
      depth: 1,
      limit: 20,
      sort: "-createdAt",
    });
    return docs.map((p) => ({
      name: p.titlu as string,
      tag: (p.categorie === "magazin-online" ? "Magazin online" : p.categorie === "corporativ" ? "Corporativ" : "Landing page") as string,
      img: (p.imagine && typeof p.imagine === "object" && "url" in p.imagine) ? (p.imagine as { url: string }).url : "",
      href: (p.linkLive as string) || "",
    }));
  } catch {
    // DB not migrated yet — admin login will trigger push
    return [];
  }
}

// Prima imagine dintr-un richText Lexical (nodul `upload`), căutare recursivă.
function firstImageFromRichText(node: any): string {
  if (!node || typeof node !== "object") return "";
  if (node.type === "upload" && node.value && typeof node.value === "object" && node.value.url) {
    return node.value.url;
  }
  for (const child of node.children || []) {
    const url = firstImageFromRichText(child);
    if (url) return url;
  }
  return "";
}

// ponytail: servicii din Payload CMS (câmpul `ordine` controlează ordinea pe home)
async function getServices() {
  try {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: "servicii",
      depth: 2,
      limit: 50,
      sort: "ordine",
    });
    return docs.map((s: any) => ({
      title: s.titlu as string,
      desc: (s.descriereScurta as string) || "",
      href: `/servicii/${s.slug}`,
      // hover pe home = prima imagine din conținut (richText); cât timp nu există, rămâne gradient
      image: firstImageFromRichText(s.continut),
    }));
  } catch {
    return [];
  }
}

// Ultimele 10 imagini distincte de proiect (pentru sliderul din hero)
function getHeroImages(projects: { img: string }[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const p of projects) {
    if (!p.img || seen.has(p.img)) continue;
    seen.add(p.img);
    out.push(p.img);
    if (out.length === 10) break;
  }
  return out;
}

export default async function Home() {
  const [projects, services] = await Promise.all([getProjects(), getServices()]);

  return (
    <main>
      <Hero images={getHeroImages(projects)} />
      <Services services={services} />
      <Portfolio projects={projects} />
      <WhyUs />
      <Process />
      <Integrations />
      <AI />
      <Pricing />
      <Testimonials />
      <Contact />
      <SelectedWorks projects={projects.slice(0, 3)} />
    </main>
  );
}
