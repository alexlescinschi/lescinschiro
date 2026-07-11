import Nav from "@/components/Nav";
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
import Footer from "@/components/Footer";
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

export default async function Home() {
  const projects = await getProjects();

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Services />
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
      <Footer />
    </>
  );
}
