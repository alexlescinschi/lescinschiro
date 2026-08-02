import { site } from "@/data/content";

export const runtime = "nodejs";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 5;
const attempts = new Map<string, { count: number; resetAt: number }>();

type ContactPayload = {
  nume?: unknown;
  email?: unknown;
  telefon?: unknown;
  detalii?: unknown;
  servicii?: unknown;
  company?: unknown;
};

function text(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function line(value: unknown, max: number) {
  return text(value, max).replace(/[\r\n]+/g, " ");
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[character] || character);
}

function clientIp(request: Request) {
  return request.headers.get("cf-connecting-ip")
    || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || "unknown";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  if (attempts.size > 1_000) {
    for (const [key, value] of attempts) if (value.resetAt <= now) attempts.delete(key);
  }
  const attempt = attempts.get(ip);
  if (!attempt || attempt.resetAt <= now) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  attempt.count += 1;
  return attempt.count > MAX_REQUESTS;
}

export async function POST(request: Request) {
  if (Number(request.headers.get("content-length") || 0) > 20_000) {
    return Response.json({ error: "Cererea este prea mare." }, { status: 413 });
  }

  let payload: ContactPayload;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Datele trimise nu sunt valide." }, { status: 400 });
  }

  // Boții completează de obicei câmpul ascuns; răspunsul neutru nu le oferă indicii.
  if (text(payload.company, 100)) return Response.json({ ok: true });
  if (isRateLimited(clientIp(request))) {
    return Response.json({ error: "Prea multe cereri. Încearcă din nou peste câteva minute." }, { status: 429 });
  }

  const nume = line(payload.nume, 80);
  const email = line(payload.email, 160).toLowerCase();
  const telefon = line(payload.telefon, 40);
  const servicii = line(payload.servicii, 500);
  const detalii = text(payload.detalii, 4_000);

  if (!nume || !detalii || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Completează numele, un email valid și detaliile proiectului." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL || site.email;
  if (!apiKey || !from) {
    return Response.json({ error: "Trimiterea nu este configurată momentan." }, { status: 503 });
  }

  const fullName = nume;
  const plainText = [
    `Cerere nouă de pe ${site.domain}`,
    "",
    `Nume: ${fullName}`,
    `Email: ${email}`,
    `Telefon: ${telefon || "Nespecificat"}`,
    `Servicii: ${servicii || "Nespecificate"}`,
    "",
    "Detalii proiect:",
    detalii,
  ].join("\n");

  let response: Response;
  try {
    response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        authorization: `Bearer ${apiKey}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Cerere ofertă — ${fullName}`,
        text: plainText,
        html: `
          <h1>Cerere nouă de ofertă</h1>
          <p><strong>Nume:</strong> ${escapeHtml(fullName)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Telefon:</strong> ${escapeHtml(telefon || "Nespecificat")}</p>
          <p><strong>Servicii:</strong> ${escapeHtml(servicii || "Nespecificate")}</p>
          <h2>Detalii proiect</h2>
          <p>${escapeHtml(detalii).replace(/\n/g, "<br>")}</p>
        `,
      }),
      signal: AbortSignal.timeout(10_000),
    });
  } catch (error) {
    console.error("Resend contact request failed", error);
    return Response.json({ error: "Mesajul nu a putut fi trimis. Folosește WhatsApp sau email." }, { status: 502 });
  }

  if (!response.ok) {
    console.error("Resend contact error", response.status, await response.text());
    return Response.json({ error: "Mesajul nu a putut fi trimis. Folosește WhatsApp sau email." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
