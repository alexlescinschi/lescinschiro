import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'
import { integrationSeeds, integrationLogos, defaultIntegrationPrice, type IntegrationSeed } from '../data/integrations-seed'

function relationId(value: number | { id: number }) {
  return typeof value === 'number' ? value : value.id
}

function logoFor(seed: IntegrationSeed) {
  return seed.logoFisier ?? integrationLogos[seed.slug]?.logoFisier
}

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const idsBySlug = new Map<string, number>()

  for (const seed of integrationSeeds) {
    const existing = await payload.find({
      collection: 'integrari',
      where: { slug: { equals: seed.slug } },
      depth: 0,
      limit: 1,
      overrideAccess: true,
      req,
    })

    if (existing.docs[0]) {
      idsBySlug.set(seed.slug, existing.docs[0].id)
      continue
    }

    const integration = await payload.create({
      collection: 'integrari',
      draft: true,
      overrideAccess: true,
      req,
      data: {
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
        seo: {
          metaTitlu: seed.metaTitlu,
          metaDescriere: seed.metaDescriere,
        },
        _status: 'draft',
      },
    })

    idsBySlug.set(seed.slug, integration.id)
  }

  const services = await payload.find({
    collection: 'servicii',
    depth: 0,
    limit: 100,
    overrideAccess: true,
    req,
  })

  for (const service of services.docs) {
    const catalogIds = integrationSeeds
      .filter((seed) => seed.serviceSlugs.includes(service.slug))
      .map((seed) => idsBySlug.get(seed.slug))
      .filter((id): id is number => id !== undefined)

    if (!catalogIds.length) continue

    const existingIds = (service.integrariCatalog ?? []).map(relationId)
    const mergedIds = [...new Set([...existingIds, ...catalogIds])]

    await payload.update({
      collection: 'servicii',
      id: service.id,
      overrideAccess: true,
      req,
      data: { integrariCatalog: mergedIds },
    })
  }
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  for (const seed of integrationSeeds) {
    await payload.delete({
      collection: 'integrari',
      where: { slug: { equals: seed.slug } },
      overrideAccess: true,
      req,
    })
  }
}
