import { site } from "@/data/content";
import { getIntegrationCatalog } from "@/lib/integrations";

export const dynamic = "force-dynamic";

export async function GET() {
  const { items } = await getIntegrationCatalog();
  const publicPages = items.filter((item) => item.hasPublicPage);
  const lines = [
    `# ${site.name}`,
    "",
    "> Studio web pentru site-uri, magazine online, integrări software, SEO și automatizări, cu proiecte în România și Moldova.",
    "",
    "## Pagini principale",
    "",
    `- [Acasă](${site.domain})`,
    `- [Servicii](${site.domain}/#servicii)`,
    `- [Catalog integrări](${site.domain}/integrari)`,
    `- [Portofoliu](${site.domain}/portofoliu)`,
    `- [Proces](${site.domain}/proces)`,
    `- [Blog](${site.domain}/blog)`,
    `- [Contact](${site.domain}/contact)`,
    "",
    "## Integrări cu pagini editoriale publice",
    "",
    ...publicPages.map((item) => `- [Integrare ${item.name}](${site.domain}/integrari/${item.slug}): ${item.summary}`),
    "",
    "## Contact",
    "",
    `- Email: ${site.email}`,
    `- Catalog și cereri custom: ${site.domain}/integrari`,
    "",
    "Denumirile furnizorilor nu indică parteneriat sau certificare. Disponibilitatea depinde de contract, regiune și accesul tehnic oferit clientului.",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "private, no-store",
    },
  });
}
