// Insert bulk: proiectele reale ale agenției.
// ponytail: run once with `npx tsx --env-file=.env scripts/add-proiecte-bulk.ts`
// Toate primesc imagine_id=1 (prima media din DB) — schimbi din admin pentru fiecare.
// Idempotent: skip pe slug existent. Sare peste climatperfect (deja în DB).
import { getPayload } from 'payload'
import config from '../payload.config'

type Cat = 'magazin-online' | 'corporativ' | 'landing-page'
const IMAGINE_ID = 1

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[ăâ]/g, 'a').replace(/[î]/g, 'i').replace(/[șş]/g, 's').replace(/[țţ]/g, 't')
    .replace(/é/g, 'e').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

// [titlu, url, categorie]
const PROIECTE: [string, string, Cat][] = [
  // Magazine online
  ['Prunovicgor', 'https://prunovicgor.md', 'magazin-online'],
  ['Artcharm RO', 'https://artcharm.ro', 'magazin-online'],
  ['Vendmax', 'https://vendmax.md', 'magazin-online'],
  ['Servisan', 'https://servisan.md', 'magazin-online'],
  ['Leoparchet', 'https://leoparchet.md', 'magazin-online'],
  ['MySleep', 'https://mysleep.md', 'magazin-online'],
  ['Dynutrition', 'https://dynutrition.md', 'magazin-online'],
  ['Artcharm MD', 'https://artcharm.md', 'magazin-online'],
  ['Solumshop', 'https://solumshop.ro', 'magazin-online'],
  ['Concept Personnalisé', 'https://conceptpersonnalise.fr', 'magazin-online'],
  ['Bestfit', 'https://bestfit.md', 'magazin-online'],
  ['Collanteca', 'https://collanteca.md', 'magazin-online'],
  ['Babycity', 'https://babycity.md', 'magazin-online'],
  ['Printly', 'https://printly.md', 'magazin-online'],
  ['Magazin Apicol', 'https://magazinapicol.md', 'magazin-online'],
  ['Faguri', 'https://faguri.md', 'magazin-online'],
  ['RNS Auto', 'https://rnsauto.md', 'magazin-online'],
  ['Riguti', 'https://riguti.com', 'magazin-online'],
  ['Franzoni', 'https://franzoni.md', 'magazin-online'],

  // Site corporativ
  ['Agenție Hostess', 'https://agentiehostess.md', 'corporativ'],
  ['Superdent', 'https://superdent.clinic', 'corporativ'],
  ['Gear Systems', 'https://gearsystems.md', 'corporativ'],
  ['Astronic', 'https://astronic.md', 'corporativ'],
  ['IC Cardiologie', 'https://icardiologie.md', 'corporativ'],
  ['Peisagist 360', 'https://peisagist360.com', 'corporativ'],
  ['Spa Hostess', 'https://spahostess.md', 'corporativ'],
  ['Consar House', 'https://consarhouse.md', 'corporativ'],
  ['Axean', 'https://axean.us', 'corporativ'],

  // Landing page
  ['Business Plan', 'https://business-plan.md', 'landing-page'],
  ['Plan de Afaceri', 'https://plandeafaceri.md', 'landing-page'],
  ['JTA Logistics', 'https://jtalogisticsllc.com', 'landing-page'],
  ['Hostess Chișinău', 'https://hostesschisinau.md', 'landing-page'],
  ['Hostess Training', 'https://hostesstraining.md', 'landing-page'],
  ['Balcon', 'https://balcon.md', 'landing-page'],
  ['Gur Gury', 'https://gur-gury.space/en', 'landing-page'],
  ['Readymag', 'https://readymag.website/u40993028/1423327', 'landing-page'],
]

async function main() {
  const payload = await getPayload({ config })

  // Snapshot existenți
  const existente = await payload.find({ collection: 'proiecte', limit: 200, depth: 0 })
  const sluguriExistente = new Set(existente.docs.map((p: any) => p.slug))
  console.log(`ℹ️  Proiecte existente în DB: ${existente.docs.length}`)

  let inserate = 0, sarite = 0
  for (const [titlu, linkLive, categorie] of PROIECTE) {
    const slug = slugify(titlu)
    if (sluguriExistente.has(slug)) {
      console.log(`⏭️  Skip "${titlu}" (slug "${slug}" există deja)`)
      sarite++
      continue
    }
    const doc = await payload.create({
      collection: 'proiecte',
      data: { titlu, slug, categorie, linkLive, imagine: IMAGINE_ID },
    })
    sluguriExistente.add(slug)
    inserate++
    console.log(`✅ [${doc.id}] ${titlu} (${categorie}) → ${linkLive}`)
  }

  console.log(`\nDone: ${inserate} inserate, ${sarite} sărite.`)
  process.exit(0)
}

main().catch((e) => { console.error('❌ Eroare:', e); process.exit(1) })
