import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import WhyUs from "@/components/WhyUs";
import Compare from "@/components/Compare";
import Process from "@/components/Process";
import Integrations from "@/components/Integrations";
import AI from "@/components/AI";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import ChatProcess from "@/components/ChatProcess";
import Contact from "@/components/Contact";
import SelectedWorks from "@/components/SelectedWorks";
import { getPayload } from "payload";
import config from "@payload-config";
import { getPrimaryService } from "@/lib/project-services";

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
    return docs.map((p) => {
      const primaryService = getPrimaryService(p);
      return {
        name: p.titlu as string,
        tag: primaryService?.title || "Proiect digital",
        img: (p.imagine && typeof p.imagine === "object" && "url" in p.imagine) ? (p.imagine as { url: string }).url : "",
        href: (p.linkLive as string) || "",
        tehnologii: ((p.tehnologii as string) || "").split(",").map((t) => t.trim()).filter(Boolean),
      };
    });
  } catch {
    // DB not migrated yet — admin login will trigger push
    return [];
  }
}

// Prima imagine dintr-un richText Lexical (nodul `upload`), căutare recursivă.
function firstImageFromRichText(node: unknown): string {
  if (!node || typeof node !== "object") return "";
  const record = node as Record<string, unknown>;
  const value = record.value;
  if (record.type === "upload" && value && typeof value === "object" && "url" in value && typeof value.url === "string") {
    return value.url;
  }
  const children = Array.isArray(record.children) ? record.children : [];
  for (const child of children) {
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
    return docs.map((s) => {
      const imagine = s.imagine && typeof s.imagine === "object" && "url" in s.imagine
        ? (s.imagine as { url: string }).url
        : "";
      return {
        title: s.titlu as string,
        slug: (s.slug as string) || "",
        desc: (s.descriereScurta as string) || "",
        href: `/servicii/${s.slug}`,
        // hover pe home = prima imagine din conținut (richText); dacă nu există → imaginea din câmpul „Imagine"
        image: firstImageFromRichText(s.continut) || imagine,
      };
    });
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
      <Compare />
      <Process />
      <Integrations />
      <AI />
      <Pricing />
      <Testimonials />
      <ChatProcess />
      <Contact services={services} />
      <SelectedWorks projects={projects.slice(0, 3)} />
    </main>
  );
}
