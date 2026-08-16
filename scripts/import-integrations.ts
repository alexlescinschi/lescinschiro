import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { getPayload } from 'payload'
import config from '../payload.config'
import { integrationSeeds, integrationLogos, defaultIntegrationPrice, type IntegrationSeed } from '../data/integrations-seed'

const write = process.argv.includes('write')
const overwriteEditorial = process.argv.includes('overwrite-editorial')

function normalize(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim()
}

function logoFor(seed: IntegrationSeed) {
  return seed.logoFisier ?? integrationLogos[seed.slug]?.logoFisier
}

function dataFromSeed(seed: IntegrationSeed) {
  return {
    nume: seed.nume,
    slug: seed.slug,
    aliasuri: seed.aliasuri.map((valoare) => ({ valoare })),
    logoFisier: logoFor(seed),
    logoFundalInchis: integrationLogos[seed.slug]?.logoFundalInchis ?? false,
    logoAlt: seed.logoAlt ?? `Logo ${seed.nume}`,
    categorie: seed.categorie,
    regiuni: seed.regiuni,
    rezumat: seed.rezumat,
    capabilitati: seed.capabilitati.map((valoare) => ({ valoare })),
    cerinte: seed.cerinte.map((valoare) => ({ valoare })),
    durata: seed.durata,
    pret: seed.pret ?? defaultIntegrationPrice,
    featuredHome: seed.featuredHome,
    ordine: seed.ordine,
    paginaPublica: seed.paginaPublica,
    continut: seed.continut,
    faq: seed.faq,
    urlOficial: seed.urlOficial,
    seo: { metaTitlu: seed.metaTitlu, metaDescriere: seed.metaDescriere },
  }
}

function validateSeeds() {
  const errors: string[] = []
  const identifiers = new Map<string, string>()

  for (const seed of integrationSeeds) {
    for (const identifier of [seed.nume, seed.slug, ...seed.aliasuri]) {
      const key = normalize(identifier)
      const owner = identifiers.get(key)
      if (owner && owner !== seed.slug) errors.push(`Identificator duplicat "${identifier}": ${owner} / ${seed.slug}`)
      else identifiers.set(key, seed.slug)
    }

    if (logoFor(seed)) {
      const relativePath = logoFor(seed)!.replace(/^\/+/, '')
      if (relativePath.includes('..') || !existsSync(resolve(process.cwd(), 'public', relativePath))) {
        errors.push(`Logo lipsă sau cale invalidă pentru ${seed.slug}: ${logoFor(seed)}`)
      }
    }
  }

  if (errors.length) throw new Error(errors.join('\n'))
}

async function main() {
  validateSeeds()
  const payload = await getPayload({ config })
  const idsBySlug = new Map<string, number>()
  let creates = 0
  let updates = 0
  let skips = 0

  for (const seed of integrationSeeds) {
    const result = await payload.find({
      collection: 'integrari',
      where: { slug: { equals: seed.slug } },
      depth: 0,
      limit: 1,
      overrideAccess: true,
    })
    const existing = result.docs[0]

    if (!existing) {
      creates += 1
      console.log(`${write ? 'CREATE' : 'WOULD CREATE'} ${seed.slug}`)
      if (write) {
        const created = await payload.create({
          collection: 'integrari',
          draft: true,
          overrideAccess: true,
          data: { ...dataFromSeed(seed), _status: 'draft' },
        })
        idsBySlug.set(seed.slug, created.id)
      }
      continue
    }

    idsBySlug.set(seed.slug, existing.id)
    if (!overwriteEditorial) {
      skips += 1
      console.log(`SKIP ${seed.slug} (există; folosește overwrite-editorial pentru actualizare)`)
      continue
    }

    updates += 1
    console.log(`${write ? 'UPDATE' : 'WOULD UPDATE'} ${seed.slug}`)
    if (write) {
      await payload.update({
        collection: 'integrari',
        id: existing.id,
        draft: existing._status !== 'published',
        overrideAccess: true,
        data: { ...dataFromSeed(seed), _status: existing._status ?? 'draft' },
      })
    }
  }

  if (write) {
    const services = await payload.find({ collection: 'servicii', depth: 0, limit: 100, overrideAccess: true })
    for (const service of services.docs) {
      const seedIds = integrationSeeds
        .filter((seed) => seed.serviceSlugs.includes(service.slug))
        .map((seed) => idsBySlug.get(seed.slug))
        .filter((id): id is number => id !== undefined)
      if (!seedIds.length) continue

      const existingIds = (service.integrariCatalog ?? []).map((value) => typeof value === 'number' ? value : value.id)
      await payload.update({
        collection: 'servicii',
        id: service.id,
        overrideAccess: true,
        data: { integrariCatalog: [...new Set([...existingIds, ...seedIds])] },
      })
    }
  }

  console.log(`\n${write ? 'Aplicat' : 'Dry-run'}: ${creates} create, ${updates} update, ${skips} skip.`)
  if (!write) console.log('Rulează din nou cu argumentul write pentru a salva. Intrările noi rămân draft.')
}

await main()
