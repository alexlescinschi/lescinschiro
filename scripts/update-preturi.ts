/* eslint-disable @typescript-eslint/no-explicit-any -- script one-off de migrare */
// Actualizează prețurile serviciilor (pret + pachete) + proza „Cât costă” din rich text.
// ponytail: run once with `npx payload run scripts/update-preturi.ts`
// Idempotent: setări deterministe; poate rula de mai multe ori.
import { getPayload } from 'payload'
import config from '../payload.config'

// slug → { orientativ, pachete (în ordinea din array) }
const PRETURI: Record<string, { pret: string; pachete: string[] }> = {
  'creare-site-uri': { pret: '200€', pachete: ['€100', '€250', '€250'] },
  'magazine-online': { pret: '600€', pachete: ['€400', '€500', '€1.000'] },
  'landing-page-uri': { pret: '100€', pachete: ['€100', '€200'] },
  'site-uri-corporative': { pret: '350€', pachete: ['€200', '€350', '€500'] },
  'integrari-plati-online': { pret: '150€', pachete: ['€150', '€200', '€500'] },
  'integrari-curierat': { pret: '150€', pachete: ['€150', '€200', '€500'] },
  'integrari-api': { pret: '150€', pachete: ['€150', '€250', '€500'] },
  'seo-romania': { pret: '100€/lună', pachete: ['€100', '€150', '€350'] },
  'seo-moldova': { pret: '100€/lună', pachete: ['€100', '€150', '€350'] },
  'ai-automatizari': { pret: '100€', pachete: ['€100', '€150', '€500'] },
  'social-media-management': { pret: '250€/lună', pachete: ['€150', '€250', '€450'] },
  'reclame-google-ads': { pret: '150€/lună + buget', pachete: ['€150', '€250', '€450'] },
  'reclame-meta': { pret: '150€/lună + buget', pachete: ['€150', '€250', '€450'] },
  'filmari-video': { pret: '200€/zi', pachete: ['€200', '€150', '€500'] },
  'montare-post-productie-video': { pret: '50€/proiect', pachete: ['€30', '€100', '€50'] },
}

// Proza „Cât costă X?” — înlocuiri exacte (old → new), aplicate în continuare + faq.
const PROZA: Array<[string, string]> = [
  // Landing page-uri
  ['Landing page simplu: 400–600€, 7–10 zile. Landing cu animații, video sau integrări (formular → CRM, checkout): 600–900€, 2 săptămâni. Ofertă fixă după brief.',
   'Landing simplu: 100€, 7–10 zile. Landing cu animații, video sau integrări (formular → CRM, checkout): 200€, 2 săptămâni. Ofertă fixă după brief.'],
  // Integrări plăți
  ['Între 100 € și 500+ €, în funcție de numărul de procesatori, complexitatea fluxului (rate, abonamente, fallback) și integrările cu facturare/ERP. O integrare simplă (un procesator, checkout, 3D Secure) pornește de la 100 €. Primești ofertă fixă în 24–48 de ore după brief.',
   'Între 150 € și 500 €, în funcție de numărul de procesatori, complexitatea fluxului (rate, abonamente, fallback) și integrările cu facturare/ERP. O integrare simplă (un procesator, checkout, 3D Secure) pornește de la 150 €. Primești ofertă fixă în 24–48 de ore după brief.'],
  // Integrări curierat
  ['Între 100 € și 400+ €, în funcție de numărul de curieri, lockere, tracking SMS și integrările cu ERP. O integrare simplă (un curier, AWB, tracking) pornește de la 100 €. Primești ofertă fixă în 24–48 de ore după brief.',
   'Între 150 € și 500 €, în funcție de numărul de curieri, lockere, tracking SMS și integrările cu ERP. O integrare simplă (un curier, AWB, tracking) pornește de la 150 €. Primești ofertă fixă în 24–48 de ore după brief.'],
  // Integrări API
  ['Între 200 € și 1.500+ €, în funcție de complexitatea API-ului (REST/GraphQL/SOAP), volumul de date, numărul de fluxuri, autentificare (OAuth, API key, IP whitelist) și necesitatea de a construi middleware. O integrare simplă (un API REST, webhook, sincronizare unidirecțională) pornește de la 200 €. Marketplace + ERP + CRM full sync: 1.000–1.500 €. Primești ofertă fixă în 24–48 de ore după brief.',
   'Între 150 € și 500 €, în funcție de complexitatea API-ului (REST/GraphQL/SOAP), volumul de date, numărul de fluxuri, autentificare (OAuth, API key, IP whitelist) și necesitatea de a construi middleware. O integrare simplă (un API REST, webhook, sincronizare unidirecțională) pornește de la 150 €. Marketplace + ERP + CRM full sync: 500 €. Primești ofertă fixă în 24–48 de ore după brief.'],
  // SEO
  ['Între 200 € și 600 € pe lună, în funcție de competiția nișei, numărul de cuvinte-cheie țintă și volumul de conținut necesar. Un pachet de start (audit + optimizare on-page + 4 articole/lună) pornește de la 200 €. Pentru nișe competitive (imobiliare, avocatură, financiar): 400–600 €. Primești propunere fixă în 24–48 de ore după brief.',
   'Între 100 € și 350 € pe lună, în funcție de competiția nișei, numărul de cuvinte-cheie țintă și volumul de conținut necesar. Un pachet de start (audit + optimizare on-page + 4 articole/lună) pornește de la 100 €. Pentru nișe competitive (imobiliare, avocatură, financiar): 350 €. Primești propunere fixă în 24–48 de ore după brief.'],
  ['Pentru nișe precum imobiliare, avocatură, financiar, asigurări: 400–600 €/lună. Competiția e mare, volumul de conținut și link building necesar e mai mare, dar ROI-ul pe termen lung e semnificativ.',
   'Pentru nișe precum imobiliare, avocatură, financiar, asigurări: 350 €/lună. Competiția e mare, volumul de conținut și link building necesar e mai mare, dar ROI-ul pe termen lung e semnificativ.'],
  // AI & Automatizări
  ['Între 300 € și 2.000+ €, în funcție de complexitate. Un chatbot simplu (FAQ + handoff uman) pornește de la 300 €. Fluxuri de automatizare cu 3–5 servicii: 500–1.000 €. Soluții enterprise (analiză predictivă, AI custom, multi-flux): 1.000–2.000+ €. Primești ofertă fixă în 24–48 de ore după brief.',
   'Între 100 € și 500 €, în funcție de complexitate. Un chatbot simplu (FAQ + handoff uman) pornește de la 100 €. Fluxuri de automatizare cu 3–5 servicii: 150 €. Soluții enterprise (analiză predictivă, AI custom, multi-flux): 500 €. Primești ofertă fixă în 24–48 de ore după brief.'],
  // SMM
  ['Între 300 € și 1.000+ € pe lună, în funcție de numărul de platforme, frecvența postărilor, producția de conținut (foto/video), bugetul de reclame gestionat și community management. Un pachet de start (2 platforme, 12 postări/lună, community management) pornește de la 300 €. Primești propunere fixă după brief.',
   'Între 150 € și 450 € pe lună, în funcție de numărul de platforme, frecvența postărilor, producția de conținut (foto/video), bugetul de reclame gestionat și community management. Un pachet de start (2 platforme, 12 postări/lună, community management) pornește de la 150 €. Primești propunere fixă după brief.'],
  // Google Ads
  ['Management fee: 300–1.000€/lună în funcție de complexitate (număr campanii, conturi, buget gestionat). Buget media (ce plătești Google): recomandat minim 500€/lună pentru a vedea rezultate, ideal 1.000–5.000€/lună. La brief îți spunem exact ce buget are sens pentru obiectivul tău.',
   'Management fee: 150–450€/lună în funcție de complexitate (număr campanii, conturi, buget gestionat). Buget media (ce plătești Google): recomandat minim 500€/lună pentru a vedea rezultate, ideal 1.000–5.000€/lună. La brief îți spunem exact ce buget are sens pentru obiectivul tău.'],
  // Meta Ads
  ['Management fee: 300–1.000€/lună în funcție de complexitate (număr campanii, creative production, audiences). Buget media (ce plătești Meta): minim 300€/lună per platformă, ideal 500–2.000€/lună. Pentru ROAS predictibil, recomandat 1.000€+/lună.',
   'Management fee: 150–450€/lună în funcție de complexitate (număr campanii, creative production, audiences). Buget media (ce plătești Meta): minim 300€/lună per platformă, ideal 500–2.000€/lună. Pentru ROAS predictibil, recomandat 1.000€+/lună.'],
  // Filmări video
  ['O zi de filmare: 500–1.500€ (în funcție de echipament și echipă). Brand film complet (1-3 min): 2.000–5.000€ (3-5 zile producție). Clipuri de produs (5-10 clipuri): 800–2.000€ per set. Reclame video: 1.000–3.000€ per set de 3 variante. Primești ofertă fixă după brief.',
   'O zi de filmare: 200€. Set clipuri produs (5-10 clipuri): 150€. Brand film complet (1-3 min): 500€. Primești ofertă fixă după brief.'],
  // Montare video
  ['Editare clip scurt (sub 60s): 200–500€. Brand film complet (1-3 min): 800–1.500€. Set reclame video (3 variante): 500–1.000€. Motion graphics + animație: 100–300€ per element. Color grading separat: 150–400€ per video. Primești ofertă fixă după brief.',
   'Editare clip scurt (sub 60s): 30€. Brand film complet (1-3 min): 100€. Set reclame video (3 variante): 50€. Primești ofertă fixă după brief.'],
]

function replaceProza(s: string): string {
  let out = s
  for (const [from, to] of PROZA) out = out.split(from).join(to)
  return out
}

function deepReplace(value: any): any {
  if (typeof value === 'string') return replaceProza(value)
  if (Array.isArray(value)) return value.map(deepReplace)
  if (value && typeof value === 'object' && !(value instanceof Date)) {
    const out: Record<string, any> = {}
    for (const [k, v] of Object.entries(value)) out[k] = deepReplace(v)
    return out
  }
  return value
}

async function main() {
  const payload = await getPayload({ config })

  for (const [slug, spec] of Object.entries(PRETURI)) {
    const result = await payload.find({ collection: 'servicii', where: { slug: { equals: slug } }, limit: 1, overrideAccess: true })
    const doc = result.docs[0] as any
    if (!doc) {
      console.log(`⚠️  Nu există serviciu cu slug "${slug}" — skip.`)
      continue
    }

    const preturi = (doc.preturi ?? []).map((p: any, i: number) => ({
      ...p,
      pret: spec.pachete[i] ?? p.pret,
    }))

    const data: any = deepReplace({ pret: spec.pret, preturi, continut: doc.continut, faq: doc.faq })
    await payload.update({ collection: 'servicii', id: doc.id, data, overrideAccess: true })
    console.log(`✅ ${doc.titlu} (${slug}): pret=${spec.pret}, pachete=${spec.pachete.length}`)
  }

  console.log('✅ Gata.')
}

await main()
