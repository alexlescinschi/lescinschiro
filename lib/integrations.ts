import config from '@payload-config'
import type { Integrari } from '@/payload-types'
import { getPayload, type Where } from 'payload'
import { getProjectServices } from '@/lib/project-services'

export type IntegrationCategory = Integrari['categorie']
export type IntegrationRegion = Integrari['regiuni'][number]

export const INTEGRATION_CATEGORIES: Record<IntegrationCategory, { label: string; description: string }> = {
  'plati-online': {
    label: 'Plăți online',
    description: 'Checkout, confirmarea plății și reconciliere cu bănci și procesatori.',
  },
  'rate-finantare': {
    label: 'Rate și finanțare',
    description: 'Fluxuri de creditare conectate după aprobarea comerciantului și finanțatorului.',
  },
  'curierat-fulfillment': {
    label: 'Curierat și fulfillment',
    description: 'AWB, etichete, pickup, tracking, ramburs și retururi, unde API-ul le permite.',
  },
  'erp-stoc-contabilitate': {
    label: 'ERP, stoc și contabilitate',
    description: 'Produse, prețuri, stocuri, comenzi, facturi și documente operaționale.',
  },
  'crm-vanzari': {
    label: 'CRM și vânzări',
    description: 'Lead-uri, clienți și activități comerciale sincronizate cu site-ul.',
  },
  'marketplace-feeduri': {
    label: 'Marketplace și feeduri',
    description: 'Oferte, stocuri și comenzi între magazin, marketplace și cataloage de produse.',
  },
  'marketing-analytics': {
    label: 'Marketing și analytics',
    description: 'Evenimente, conversii și feeduri configurate cu controlul consimțământului.',
  },
  'automatizari-comunicare': {
    label: 'Automatizări și comunicare',
    description: 'Fluxuri între aplicații pentru mesagerie, email și operațiuni repetitive.',
  },
  'programari-sisteme-custom': {
    label: 'Programări și sisteme custom',
    description: 'Calendare, rezervări și aplicații interne conectate prin schimburi adaptate.',
  },
}

export const INTEGRATION_REGIONS: Record<IntegrationRegion, string> = {
  md: 'Moldova',
  ro: 'România',
  ue: 'Uniunea Europeană',
  international: 'Internațional',
}

type IntegrationCardDocument = Pick<
  Integrari,
  | 'id'
  | 'nume'
  | 'slug'
  | 'aliasuri'
  | 'logoFisier'
  | 'logoFundalInchis'
  | 'logoAlt'
  | 'categorie'
  | 'regiuni'
  | 'rezumat'
  | 'capabilitati'
  | 'paginaPublica'
  | 'ordine'
  | 'updatedAt'
>

export type IntegrationCardData = {
  id: number
  name: string
  slug: string
  aliases: string[]
  logo: string
  logoOnDark: boolean
  logoAlt: string
  category: IntegrationCategory
  regions: IntegrationRegion[]
  summary: string
  capabilities: string[]
  hasPublicPage: boolean
  order: number
  updatedAt: string
}

export type IntegrationDetailData = IntegrationCardData & {
  requirements: string[]
  duration: string
  price: string
  content: Integrari['continut']
  faq: { question: string; answer: string }[]
  officialUrl: string
  metaTitle: string
  metaDescription: string
}

export type IntegrationRelations = {
  services: { title: string; slug: string }[]
  posts: { title: string; slug: string }[]
  projects: { name: string; tag: string; img: string; href: string }[]
}

const cardSelect = {
  nume: true,
  slug: true,
  aliasuri: true,
  logoFisier: true,
  logoFundalInchis: true,
  logoAlt: true,
  categorie: true,
  regiuni: true,
  rezumat: true,
  capabilitati: true,
  paginaPublica: true,
  ordine: true,
  updatedAt: true,
} as const

function values(items: { valoare: string }[] | null | undefined) {
  return items?.map((item) => item.valoare).filter(Boolean) ?? []
}

function toCard(doc: IntegrationCardDocument): IntegrationCardData {
  return {
    id: doc.id,
    name: doc.nume,
    slug: doc.slug,
    aliases: values(doc.aliasuri),
    logo: doc.logoFisier ?? '',
    logoOnDark: Boolean(doc.logoFundalInchis),
    logoAlt: doc.logoAlt ?? `Logo ${doc.nume}`,
    category: doc.categorie,
    regions: doc.regiuni,
    summary: doc.rezumat,
    capabilities: values(doc.capabilitati),
    hasPublicPage: Boolean(doc.paginaPublica),
    order: doc.ordine ?? 100,
    updatedAt: doc.updatedAt,
  }
}

async function findAllCards(where: Where) {
  const payload = await getPayload({ config })
  const docs: IntegrationCardDocument[] = []
  let page = 1

  while (true) {
    const result = await payload.find({
      collection: 'integrari',
      where,
      select: cardSelect,
      depth: 0,
      limit: 100,
      page,
      sort: 'ordine',
      overrideAccess: true,
    })

    docs.push(...result.docs)
    if (!result.hasNextPage) break
    page = result.nextPage ?? page + 1
  }

  return docs.map(toCard)
}

export async function getIntegrationCatalog(): Promise<{ items: IntegrationCardData[]; total: number }> {
  try {
    const where: Where = { _status: { equals: 'published' } }
    const payload = await getPayload({ config })
    const [items, count] = await Promise.all([
      findAllCards(where),
      payload.count({ collection: 'integrari', where, overrideAccess: true }),
    ])
    return { items, total: count.totalDocs }
  } catch {
    return { items: [], total: 0 }
  }
}

export async function getFeaturedIntegrations(): Promise<IntegrationCardData[]> {
  try {
    return await findAllCards({
      and: [
        { _status: { equals: 'published' } },
        { featuredHome: { equals: true } },
      ],
    })
  } catch {
    return []
  }
}

export async function getPublishedIntegrationsByIds(ids: number[]): Promise<IntegrationCardData[]> {
  if (!ids.length) return []
  try {
    return await findAllCards({
      and: [
        { _status: { equals: 'published' } },
        { id: { in: ids } },
      ],
    })
  } catch {
    return []
  }
}

export async function getPublicIntegration(slug: string): Promise<IntegrationDetailData | null> {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'integrari',
      where: {
        and: [
          { slug: { equals: slug } },
          { _status: { equals: 'published' } },
          { paginaPublica: { equals: true } },
        ],
      },
      depth: 0,
      limit: 1,
      overrideAccess: true,
    })
    const doc = result.docs[0]
    if (!doc) return null

    return {
      ...toCard(doc),
      requirements: values(doc.cerinte),
      duration: doc.durata ?? '',
      price: doc.pret ?? '',
      content: doc.continut,
      faq: doc.faq?.map((item) => ({ question: item.intrebare, answer: item.raspuns })) ?? [],
      officialUrl: doc.urlOficial ?? '',
      metaTitle: doc.seo?.metaTitlu ?? `${doc.nume} integrare — LESCINSCHI`,
      metaDescription: doc.seo?.metaDescriere ?? doc.rezumat,
    }
  } catch {
    return null
  }
}

export async function getPublishedIntegrationRequest(slug: string) {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'integrari',
      where: {
        and: [
          { slug: { equals: slug } },
          { _status: { equals: 'published' } },
        ],
      },
      select: { nume: true, slug: true },
      depth: 0,
      limit: 1,
      overrideAccess: true,
    })
    const doc = result.docs[0]
    return doc ? { slug: doc.slug, name: doc.nume } : null
  } catch {
    return null
  }
}

export async function getIntegrationRelations(id: number): Promise<IntegrationRelations> {
  try {
    const payload = await getPayload({ config })
    const now = new Date().toISOString()
    const [services, posts, projectDocs] = await Promise.all([
      payload.find({
        collection: 'servicii',
        where: { integrariCatalog: { equals: id } },
        select: { titlu: true, slug: true },
        depth: 0,
        limit: 100,
        overrideAccess: true,
      }),
      payload.find({
        collection: 'blog',
        where: {
          and: [
            { integrariMentionate: { equals: id } },
            { _status: { equals: 'published' } },
            {
              or: [
                { publicatLa: { less_than_equal: now } },
                { publicatLa: { exists: false } },
              ],
            },
          ],
        },
        select: { titlu: true, slug: true },
        depth: 0,
        limit: 100,
        overrideAccess: true,
      }),
      payload.find({
        collection: 'proiecte',
        where: { integrariConfirmate: { equals: id } },
        depth: 1,
        limit: 100,
        sort: '-createdAt',
        overrideAccess: true,
      }),
    ])

    const projects = projectDocs.docs.map((doc) => {
      const image = doc.imagine && typeof doc.imagine === 'object' && 'url' in doc.imagine
        ? (doc.imagine as { url: string }).url
        : ''
      const tag = getProjectServices(doc)[0]?.title || 'Proiect digital'
      return {
        name: doc.titlu ?? '',
        tag,
        img: image,
        href: doc.linkLive ?? '',
      }
    }).filter((project) => project.name && project.img)

    return {
      services: services.docs.map((doc) => ({ title: doc.titlu, slug: doc.slug })),
      posts: posts.docs
        .filter((doc) => Boolean(doc.slug))
        .map((doc) => ({ title: doc.titlu ?? '', slug: doc.slug ?? '' })),
      projects,
    }
  } catch {
    return { services: [], posts: [], projects: [] }
  }
}

export async function getPublicIntegrationSitemapEntries() {
  try {
    const items = await findAllCards({
      and: [
        { _status: { equals: 'published' } },
        { paginaPublica: { equals: true } },
      ],
    })
    return items.map(({ slug, updatedAt }) => ({ slug, updatedAt }))
  } catch {
    return []
  }
}
