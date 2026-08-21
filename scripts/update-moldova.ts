/* eslint-disable @typescript-eslint/no-explicit-any -- script one-off de migrare */
// Scoate „România" din poziționare și redenumește serviciul SEO în „SEO Moldova".
// ponytail: run once with `npx tsx --env-file=.env scripts/update-moldova.ts`
// Idempotent: dacă un doc nu se schimbă, îl lasă în pace; dacă seo-moldova există, face skip la rename.
import { getPayload } from 'payload'
import config from '../payload.config'

// Referințe legitime la servicii/limbă RO — protejate de înlocuire (păstrate).
const PROTECTED: Array<[string, string]> = [
  ['PayU România', '\u0000P1\u0000'],
  ['DPD România', '\u0000P2\u0000'],
  ['GLS România', '\u0000P3\u0000'],
  ['Poșta Română', '\u0000P4\u0000'],
  ['bănci din România', '\u0000P5\u0000'],
  ['Curieri România', '\u0000P6\u0000'],
  ['Procesatori România', '\u0000P7\u0000'],
  ['RO e-Factura', '\u0000P8\u0000'],
  ['RO, EN, FR, RU', '\u0000P9\u0000'],
  ['/RO/ro/', '\u0000P10\u0000'],
  ['română', '\u0000P11\u0000'],
]

// Poziționare → Moldova. Ordinea contează (mai specific înainte).
const REPLACE: Array<[string, string]> = [
  ['România și Moldova', 'Moldova'],
  ['României', 'Moldovei'],
  ['pentru România', 'pentru Moldova'],
  ['din România', 'din Moldova'],
  ['în România', 'în Moldova'],
  ['România', 'Moldova'],
  ['românii', 'moldovenii'],
  ['românești', 'moldovenești'],
  ['românească', 'moldovenească'],
  ['București, Cluj, Iași, Constanța', 'Chișinău, Bălți, Cahul, Orhei'],
  ['București și Cluj', 'Chișinău și Bălți'],
  ['București, Chișinău', 'Chișinău'],
  ['în Iași', 'în Bălți'],
  ['București', 'Chișinău'],
  ['Sector 3', 'Chișinău'],
  ['RO / MD / FR / EN', 'MD / FR / EN'],
  ['RO + MD', 'MD'],
  ['RO și MD', 'MD'],
  ['RO, MD', 'MD'],
  ['RO/MD', 'MD'],
  ['Top pe .ro', 'Top pe .md'],
]

function replaceText(input: string): string {
  let s = input
  for (const [from, token] of PROTECTED) s = s.split(from).join(token)
  for (const [from, to] of REPLACE) s = s.split(from).join(to)
  s = s.replace(/\bRO\b/g, 'MD')
  for (const [from, token] of PROTECTED) s = s.split(token).join(from)
  return s
}

function transform(value: any): any {
  if (typeof value === 'string') return replaceText(value)
  if (Array.isArray(value)) return value.map(transform)
  if (value && typeof value === 'object' && !(value instanceof Date)) {
    const out: Record<string, any> = {}
    for (const [k, v] of Object.entries(value)) out[k] = transform(v)
    return out
  }
  return value
}

async function findAll(payload: any, collection: any): Promise<any[]> {
  const docs: any[] = []
  let page = 1
  while (true) {
    const result = await payload.find({ collection, limit: 100, page, depth: 0, overrideAccess: true })
    docs.push(...result.docs)
    if (!result.hasNextPage) break
    page = (result.nextPage as number) ?? page + 1
  }
  return docs
}

function toData(doc: any): Record<string, any> {
  const data: Record<string, any> = { ...doc }
  delete data.id
  delete data.createdAt
  delete data.updatedAt
  return data
}

async function main() {
  const payload = await getPayload({ config })

  // 1) Servicii (fără drafts — update direct)
  const services = await findAll(payload, 'servicii')
  for (const doc of services) {
    const data = transform(toData(doc))
    if (doc.slug === 'seo-romania') {
      const exists = await payload.find({ collection: 'servicii', where: { slug: { equals: 'seo-moldova' } }, limit: 1, overrideAccess: true })
      if (exists.docs.length) {
        console.log('⚠️  slug "seo-moldova" există deja — skip rename (id ' + doc.id + ')')
        continue
      }
      data.slug = 'seo-moldova'
      console.log('✅ SEO service: seo-romania → seo-moldova (id ' + doc.id + ')')
      await payload.update({ collection: 'servicii', id: doc.id, data, overrideAccess: true })
    } else if (JSON.stringify(data) !== JSON.stringify(toData(doc))) {
      console.log('✏️  Serviciu actualizat:', doc.titlu)
      await payload.update({ collection: 'servicii', id: doc.id, data, overrideAccess: true })
    }
  }

  // 2) Blog (drafts — păstrăm statusul curent)
  const posts = await findAll(payload, 'blog')
  for (const doc of posts) {
    const data = transform(toData(doc))
    if (typeof data.slug === 'string' && data.slug.includes('romania')) {
      data.slug = data.slug.split('romania').join('moldova')
    }
    if (JSON.stringify(data) === JSON.stringify(toData(doc))) continue
    console.log('✏️  Blog actualizat:', doc.titlu)
    await payload.update({ collection: 'blog', id: doc.id, draft: doc._status !== 'published', data, overrideAccess: true })
  }

  console.log('✅ Gata.')
}

await main()
