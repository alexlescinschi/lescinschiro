// Backfill: completează câmpul `tehnologii` pe proiecte, din relația `servicii`.
// Rulare: NODE_ENV=production + DATABASE_URI (tunel) — vezi istoricul sesiunii.
// Idempotent: suprascrie tehnologiile doar dacă proiectul nu are deja.
import { getPayload } from 'payload'
import config from '../payload.config'

const STACK: Record<string, string> = {
  'magazine-online': 'Next.js, Netopia, FAN Courier, SmartBill',
  'creare-site-uri': 'Next.js, Payload, Postgres',
  'site-uri-corporative': 'Next.js, Payload, Postgres',
  'landing-page-uri': 'Next.js, GSAP',
  'integrari-plati-online': 'Netopia, PayU, Stripe',
  'integrari-curierat': 'FAN Courier, Cargus, Sameday',
  'integrari-api': 'REST API, n8n, Make',
  'seo-romania': 'GA4, Search Console, Ahrefs',
  'ai-automatizari': 'OpenAI, n8n, Make',
  'social-media-management': 'Meta Business, TikTok, Canva',
  'reclame-google-ads': 'Google Ads, GA4',
  'reclame-meta': 'Meta Pixel, Meta Ads',
  'filmari-video': 'DaVinci Resolve, Premiere',
  'montare-post-productie-video': 'Premiere, After Effects',
}

async function main() {
  const payload = await getPayload({ config })

  const { docs: servicii } = await payload.find({ collection: 'servicii', limit: 100, depth: 0 })
  const slugById = new Map(servicii.map((s: any) => [s.id, s.slug]))

  const { docs: proiecte } = await payload.find({ collection: 'proiecte', limit: 200, depth: 1 })
  let actualizate = 0, sarite = 0

  for (const p of proiecte as any[]) {
    if (p.tehnologii) { sarite++; continue }

    const serv = Array.isArray(p.servicii) ? p.servicii : []
    const slugs = serv
      .map((s: any) => (typeof s === 'object' && s && s.slug ? s.slug : slugById.get(typeof s === 'object' ? s?.id : s)))
      .filter(Boolean) as string[]

    const parts: string[] = []
    for (const slug of slugs) {
      for (const t of (STACK[slug] || '').split(',').map((x) => x.trim()).filter(Boolean)) {
        if (!parts.includes(t)) parts.push(t)
      }
    }

    if (!parts.length) { sarite++; continue }

    await payload.update({ collection: 'proiecte', id: p.id, data: { tehnologii: parts.join(', ') } })
    actualizate++
    console.log(`✅ [${p.id}] ${p.titlu} → ${parts.join(', ')}`)
  }

  console.log(`\nDone: ${actualizate} actualizate, ${sarite} sărite.`)
  process.exit(0)
}

main().catch((e) => { console.error('❌ Eroare:', e); process.exit(1) })
