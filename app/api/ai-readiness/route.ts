import { lookup } from "node:dns/promises";
import { isIP } from "node:net";

export const runtime = "nodejs";

type Status = "pass" | "partial" | "fail";

type AuditCheck = {
  id: string;
  label: string;
  status: Status;
  detail: string;
  points: number;
};

type FetchResult = {
  ok: boolean;
  status: number;
  text: string;
  url: URL;
  contentType: string;
};

const MAX_BODY_SIZE = 800_000;
const MAX_REDIRECTS = 3;

function isPrivateAddress(address: string) {
  const mappedIpv4 = address.toLowerCase().match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/)?.[1];
  if (mappedIpv4) return isPrivateAddress(mappedIpv4);

  if (isIP(address) === 4) {
    const [a, b] = address.split(".").map(Number);
    return a === 10
      || a === 127
      || a === 0
      || (a === 169 && b === 254)
      || (a === 172 && b >= 16 && b <= 31)
      || (a === 192 && b === 168)
      || (a >= 224);
  }

  const value = address.toLowerCase();
  return value === "::1"
    || value === "::"
    || value.startsWith("fc")
    || value.startsWith("fd")
    || value.startsWith("fe8")
    || value.startsWith("fe9")
    || value.startsWith("fea")
    || value.startsWith("feb")
    || value.startsWith("::ffff:");
}

async function assertPublicUrl(url: URL) {
  if (!['http:', 'https:'].includes(url.protocol)) throw new Error("Adresa trebuie să folosească HTTP sau HTTPS.");
  if (url.username || url.password || url.port) throw new Error("Adresa website-ului nu este validă.");
  if (url.hostname === "localhost" || !url.hostname.includes(".")) throw new Error("Introdu un domeniu public valid.");

  const addresses = await lookup(url.hostname, { all: true, verbatim: true });
  if (!addresses.length || addresses.some(({ address }) => isPrivateAddress(address))) {
    throw new Error("Domeniul nu poate fi analizat.");
  }
}

async function readLimitedBody(response: Response) {
  if (!response.body) return "";
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let size = 0;
  let text = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > MAX_BODY_SIZE) {
      await reader.cancel();
      break;
    }
    text += decoder.decode(value, { stream: true });
  }
  return text + decoder.decode();
}

async function safeFetch(initialUrl: URL): Promise<FetchResult> {
  let url = initialUrl;

  for (let redirect = 0; redirect <= MAX_REDIRECTS; redirect++) {
    await assertPublicUrl(url);
    const response = await fetch(url, {
      redirect: "manual",
      signal: AbortSignal.timeout(8_000),
      headers: {
        accept: "text/html,text/plain,application/xml;q=0.9,*/*;q=0.5",
        "user-agent": "LESCINSCHI-AI-Readiness/1.0",
      },
    });

    if ([301, 302, 303, 307, 308].includes(response.status)) {
      const location = response.headers.get("location");
      if (!location || redirect === MAX_REDIRECTS) throw new Error("Website-ul are prea multe redirecționări.");
      url = new URL(location, url);
      continue;
    }

    return {
      ok: response.ok,
      status: response.status,
      text: await readLimitedBody(response),
      url,
      contentType: response.headers.get("content-type") || "",
    };
  }

  throw new Error("Website-ul nu a putut fi accesat.");
}

function normalizeWebsite(value: string) {
  const trimmed = value.trim();
  return new URL(/^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`);
}

function fold(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function decodeHtml(value: string) {
  const entities: Record<string, string> = {
    amp: "&",
    quot: '"',
    apos: "'",
    lt: "<",
    gt: ">",
    nbsp: " ",
  };
  return value.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (entity, code: string) => {
    if (code[0] !== "#") return entities[code.toLowerCase()] ?? entity;
    const hex = code[1]?.toLowerCase() === "x";
    const point = Number.parseInt(code.slice(hex ? 2 : 1), hex ? 16 : 10);
    return Number.isFinite(point) ? String.fromCodePoint(point) : entity;
  });
}

function hasMeaningfulMatch(html: string, value: string) {
  const words = fold(value).split(/[^a-z0-9]+/).filter((word) => word.length >= 4);
  const page = fold(html.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " "));
  return words.some((word) => page.includes(word));
}

function check(
  id: string,
  label: string,
  status: Status,
  detail: string,
  maxPoints: number,
): AuditCheck {
  const factor = status === "pass" ? 1 : status === "partial" ? 0.5 : 0;
  return { id, label, status, detail, points: Math.round(maxPoints * factor) };
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as Record<string, unknown>;
    const company = String(body.company || "").trim().slice(0, 100);
    const service = String(body.service || "").trim().slice(0, 100);
    const location = String(body.location || "").trim().slice(0, 100);
    const websiteValue = String(body.website || "").trim().slice(0, 300);

    if (!company || !service || !location || !websiteValue) {
      return Response.json({ error: "Completează toate câmpurile pentru a genera raportul." }, { status: 400 });
    }

    const website = normalizeWebsite(websiteValue);
    const home = await safeFetch(website);
    if (!home.ok || !home.contentType.toLowerCase().includes("text/html")) {
      return Response.json({ error: "Nu am putut citi pagina principală a website-ului." }, { status: 422 });
    }

    const origin = new URL(home.url.origin);
    const [robots, sitemap, llms] = await Promise.allSettled([
      safeFetch(new URL("/robots.txt", origin)),
      safeFetch(new URL("/sitemap.xml", origin)),
      safeFetch(new URL("/llms.txt", origin)),
    ]);
    const html = home.text;
    const rawTitle = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1].replace(/\s+/g, " ").trim() || "";
    const rawDescription = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i)?.[1]
      || html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']description["']/i)?.[1]
      || "";
    const title = decodeHtml(rawTitle);
    const description = decodeHtml(rawDescription);
    const h1Count = (html.match(/<h1\b/gi) || []).length;
    const hasSchema = /application\/ld\+json/i.test(html);
    const hasBusinessSchema = /"@type"\s*:\s*"(?:Organization|LocalBusiness|ProfessionalService)"/i.test(html);
    const hasContact = /mailto:|tel:|\+\d[\d\s().-]{7,}/i.test(html);
    const serviceMatch = hasMeaningfulMatch(html, service);
    const locationMatch = hasMeaningfulMatch(html, location);
    const robotsOk = robots.status === "fulfilled" && robots.value.ok && /user-agent:/i.test(robots.value.text);
    const sitemapOk = sitemap.status === "fulfilled" && sitemap.value.ok && /<urlset|<sitemapindex/i.test(sitemap.value.text);
    const llmsOk = llms.status === "fulfilled" && llms.value.ok && llms.value.text.trim().length > 20;

    const checks: AuditCheck[] = [
      check("access", "Website accesibil", "pass", `Pagina principală răspunde corect la ${home.url.hostname}.`, 15),
      check("title", "Titlu clar", title.length >= 25 && title.length <= 65 ? "pass" : title ? "partial" : "fail", title ? `Titlu detectat: „${title.slice(0, 90)}”` : "Pagina nu are un titlu detectabil.", 10),
      check("description", "Descriere pentru motoare", description.length >= 70 && description.length <= 180 ? "pass" : description ? "partial" : "fail", description.length >= 70 && description.length <= 180 ? "Meta descrierea există și are o lungime potrivită." : description ? "Descrierea există, dar poate fi făcută mai explicită." : "Lipsește meta descrierea paginii principale.", 10),
      check("heading", "Structură principală", h1Count === 1 ? "pass" : h1Count > 0 ? "partial" : "fail", h1Count === 1 ? "Pagina are un singur titlu H1." : `Am detectat ${h1Count} titluri H1; recomandat este unul singur.`, 8),
      check("service", "Serviciu identificabil", serviceMatch ? "pass" : "fail", serviceMatch ? `Serviciul „${service}” este menționat pe homepage.` : `Serviciul „${service}” nu este suficient de vizibil pe homepage.`, 10),
      check("location", "Semnal local", locationMatch ? "pass" : "fail", locationMatch ? `Locația „${location}” este menționată.` : `Locația „${location}” nu a fost identificată pe homepage.`, 8),
      check("schema", "Date structurate", hasSchema ? "pass" : "fail", hasSchema ? "Am detectat date structurate JSON-LD." : "Nu am detectat date structurate JSON-LD.", 12),
      check("business-schema", "Entitate de business", hasBusinessSchema ? "pass" : hasSchema ? "partial" : "fail", hasBusinessSchema ? "Compania este definită ca entitate în Schema.org." : "Lipsește o schemă Organization sau LocalBusiness clară.", 8),
      check("contact", "Date de contact", hasContact ? "pass" : "fail", hasContact ? "Datele de contact sunt ușor de identificat." : "Nu am detectat telefon sau email pe homepage.", 7),
      check("robots", "Acces crawlere", robotsOk ? "pass" : "fail", robotsOk ? "Fișierul robots.txt este disponibil." : "robots.txt lipsește sau nu este valid.", 5),
      check("sitemap", "Hartă XML", sitemapOk ? "pass" : "fail", sitemapOk ? "Sitemap-ul XML este disponibil." : "Nu am găsit un sitemap XML valid.", 4),
      check("llms", "Ghid pentru AI", llmsOk ? "pass" : "fail", llmsOk ? "Website-ul publică un fișier llms.txt." : "Nu am găsit fișierul opțional llms.txt.", 3),
    ];

    const score = checks.reduce((total, item) => total + item.points, 0);
    const level = score >= 75 ? "Bun" : score >= 50 ? "Mediu" : "De îmbunătățit";
    const recommendations = checks
      .filter((item) => item.status !== "pass")
      .slice(0, 4)
      .map((item) => {
        const actions: Record<string, string> = {
          title: `Rescrie titlul principal pentru a include clar ${service} și ${location}.`,
          description: "Adaugă o descriere de 120-160 caractere care explică serviciul, locația și diferențiatorul companiei.",
          heading: "Păstrează un singur H1 descriptiv pe pagina principală.",
          service: `Creează o secțiune sau o pagină dedicată serviciului „${service}”.`,
          location: `Adaugă explicit aria deservită: ${location}, inclusiv în pagina de contact și datele structurate.`,
          schema: "Adaugă JSON-LD Organization/LocalBusiness și Service pentru a defini compania fără ambiguități.",
          "business-schema": "Definește compania ca Organization sau LocalBusiness în Schema.org.",
          contact: "Afișează emailul și telefonul în HTML, în header, footer sau pagina principală.",
          robots: "Publică un robots.txt valid și permite accesul crawlerelor importante.",
          sitemap: "Generează un sitemap.xml și declară-l în robots.txt.",
          llms: "Publică un llms.txt scurt cu serviciile și paginile importante ale companiei.",
        };
        return actions[item.id] || item.detail;
      });
    if (!recommendations.length) recommendations.push("Menține informațiile actualizate și publică periodic exemple concrete, rezultate și răspunsuri la întrebările clienților.");

    return Response.json({
      company,
      website: home.url.origin,
      service,
      location,
      score,
      level,
      checks,
      recommendations,
      queries: [
        `Care este cea mai bună companie de ${service.toLowerCase()} din ${location}?`,
        `Recomandă-mi o firmă de ${service.toLowerCase()} în ${location}.`,
        `Ce alternative există pentru ${service.toLowerCase()} în ${location}?`,
      ],
    });
  } catch (error) {
    const message = error instanceof Error && error.message
      ? error.message
      : "Analiza nu a putut fi finalizată. Încearcă din nou.";
    return Response.json({ error: message }, { status: 400 });
  }
}
