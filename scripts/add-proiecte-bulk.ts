/* eslint-disable @typescript-eslint/no-explicit-any -- script one-off de import */
// Insert bulk: proiectele reale ale agenției.
// ponytail: run once with `npx tsx --env-file=.env scripts/add-proiecte-bulk.ts`
// Toate primesc imagine_id=1 (prima media din DB) — schimbi din admin pentru fiecare.
// Idempotent: skip pe slug existent. Sare peste climatperfect (deja în DB).
import { getPayload } from 'payload'
import config from '../payload.config'

type ServiceSlug = 'magazine-online' | 'site-uri-corporative' | 'landing-page-uri'
const IMAGINE_ID = 1

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[ăâ]/g, 'a').replace(/[î]/g, 'i').replace(/[șş]/g, 's').replace(/[țţ]/g, 't')
    .replace(/é/g, 'e').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

// [titlu, url, serviciu principal]
const PROIECTE: [string, string, ServiceSlug][] = [
  // Magazine online
  ['Prunovicgor', 'https://prunovicgor.md', 'magazine-online'],
  ['Artcharm RO', 'https://artcharm.ro', 'magazine-online'],
  ['Vendmax', 'https://vendmax.md', 'magazine-online'],
  ['Servisan', 'https://servisan.md', 'magazine-online'],
  ['Leoparchet', 'https://leoparchet.md', 'magazine-online'],
  ['MySleep', 'https://mysleep.md', 'magazine-online'],
  ['Dynutrition', 'https://dynutrition.md', 'magazine-online'],
  ['Artcharm MD', 'https://artcharm.md', 'magazine-online'],
  ['Solumshop', 'https://solumshop.ro', 'magazine-online'],
  ['Concept Personnalisé', 'https://conceptpersonnalise.fr', 'magazine-online'],
  ['Bestfit', 'https://bestfit.md', 'magazine-online'],
  ['Collanteca', 'https://collanteca.md', 'magazine-online'],
  ['Babycity', 'https://babycity.md', 'magazine-online'],
  ['Printly', 'https://printly.md', 'magazine-online'],
  ['Magazin Apicol', 'https://magazinapicol.md', 'magazine-online'],
  ['Faguri', 'https://faguri.md', 'magazine-online'],
  ['RNS Auto', 'https://rnsauto.md', 'magazine-online'],
  ['Riguti', 'https://riguti.com', 'magazine-online'],
  ['Franzoni', 'https://franzoni.md', 'magazine-online'],

  // Site corporativ
  ['Agenție Hostess', 'https://agentiehostess.md', 'site-uri-corporative'],
  ['Superdent', 'https://superdent.clinic', 'site-uri-corporative'],
  ['Gear Systems', 'https://gearsystems.md', 'site-uri-corporative'],
  ['Astronic', 'https://astronic.md', 'site-uri-corporative'],
  ['IC Cardiologie', 'https://icardiologie.md', 'site-uri-corporative'],
  ['Peisagist 360', 'https://peisagist360.com', 'site-uri-corporative'],
  ['Spa Hostess', 'https://spahostess.md', 'site-uri-corporative'],
  ['Consar House', 'https://consarhouse.md', 'site-uri-corporative'],
  ['Axean', 'https://axean.us', 'site-uri-corporative'],

  // Landing page
  ['Business Plan', 'https://business-plan.md', 'landing-page-uri'],
  ['Plan de Afaceri', 'https://plandeafaceri.md', 'landing-page-uri'],
  ['JTA Logistics', 'https://jtalogisticsllc.com', 'landing-page-uri'],
  ['Hostess Chișinău', 'https://hostesschisinau.md', 'landing-page-uri'],
  ['Hostess Training', 'https://hostesstraining.md', 'landing-page-uri'],
  ['Balcon', 'https://balcon.md', 'landing-page-uri'],
  ['Gur Gury', 'https://gur-gury.space/en', 'landing-page-uri'],
  ['Readymag', 'https://readymag.website/u40993028/1423327', 'landing-page-uri'],
]

async function main() {
  const payload = await getPayload({ config })

  // Snapshot existenți
  const existente = await payload.find({ collection: 'proiecte', limit: 200, depth: 0 })
  const sluguriExistente = new Set(existente.docs.map((p: any) => p.slug))
  const servicii = await payload.find({
    collection: 'servicii',
    where: { slug: { in: ['magazine-online', 'site-uri-corporative', 'landing-page-uri'] } },
    limit: 10,
  })
  const serviciiIds = new Map(servicii.docs.map((service) => [service.slug, service.id]))
  console.log(`ℹ️  Proiecte existente în DB: ${existente.docs.length}`)

  let inserate = 0, sarite = 0
  for (const [titlu, linkLive, serviceSlug] of PROIECTE) {
    const slug = slugify(titlu)
    if (sluguriExistente.has(slug)) {
      console.log(`⏭️  Skip "${titlu}" (slug "${slug}" există deja)`)
      sarite++
      continue
    }
    const serviceId = serviciiIds.get(serviceSlug)
    if (!serviceId) throw new Error(`Serviciul ${serviceSlug} nu există`)
    const doc = await payload.create({
      collection: 'proiecte',
      data: { titlu, slug, servicii: [serviceId], linkLive, imagine: IMAGINE_ID },
    })
    sluguriExistente.add(slug)
    inserate++
    console.log(`✅ [${doc.id}] ${titlu} (${serviceSlug}) → ${linkLive}`)
  }

  console.log(`\nDone: ${inserate} inserate, ${sarite} sărite.`)
  process.exit(0)
}

main().catch((e) => { console.error('❌ Eroare:', e); process.exit(1) })
