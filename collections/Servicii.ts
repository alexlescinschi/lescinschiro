import type { CollectionConfig } from 'payload'

function slugFromTitle(s: string) {
  return s
    .toLowerCase()
    .replace(/[ăâ]/g, 'a').replace(/[î]/g, 'i').replace(/[șş]/g, 's').replace(/[țţ]/g, 't')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export const Servicii: CollectionConfig = {
  slug: 'servicii',
  labels: { singular: 'Serviciu', plural: 'Servicii' },
  admin: { useAsTitle: 'titlu' },
  fields: [
    { name: 'titlu', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { position: 'sidebar' },
      hooks: {
        beforeChange: [
          ({ data }) => {
            if (data?.titlu) data.slug = slugFromTitle(data.titlu as string)
            return data?.slug
          },
        ],
      },
    },
    { name: 'ordine', type: 'number', label: 'Ordine pe pagina de acasă', admin: { position: 'sidebar', description: 'Mai mic = mai sus în listă' } },
    { name: 'metaTitlu', type: 'text', label: 'Meta title (SEO — dacă e gol, se folosește titlul)', admin: { position: 'sidebar' } },
    // @ts-expect-error allowEdit works at runtime but missing from Payload 3 upload field types
    { name: 'imagine', type: 'upload', relationTo: 'media', required: true, admin: { allowEdit: false } },
    { name: 'descriereMeniu', type: 'textarea', label: 'Descriere scurtă pentru meniul principal' },
    { name: 'descriereScurta', type: 'textarea', label: 'Descriere scurtă (și SEO description)' },
    { name: 'heroTitlu', type: 'text', label: 'Hero — titlu' },
    { name: 'heroSubtitlu', type: 'text', label: 'Hero — subtitlu' },
    { name: 'heroCuvantInel', type: 'text', label: 'Hero — cuvântul încercuit cu lime', admin: { position: 'sidebar' } },
    { name: 'continut', type: 'richText', label: 'Conținut pagină' },
    { name: 'pret', type: 'text', admin: { position: 'sidebar' }, label: 'Preț orientativ' },

    // Tipuri de magazine / variante serviciu
    {
      name: 'tipuri',
      type: 'array',
      label: 'Tipuri / variante',
      fields: [
        { name: 'titlu', type: 'text', required: true },
        { name: 'subtitlu', type: 'text' },
        { name: 'descriere', type: 'textarea' },
        { name: 'logouri', type: 'text', label: 'Logo-uri (separate prin virgulă)' },
      ],
    },

    // Features grid
    {
      name: 'features',
      type: 'array',
      label: 'Avantaje / Features',
      fields: [
        { name: 'icon', type: 'textarea', label: 'Icon (emoji sau cod SVG)' },
        { name: 'titlu', type: 'text', required: true },
        { name: 'descriere', type: 'textarea' },
      ],
    },

    // Integrations
    {
      name: 'integrari',
      type: 'array',
      label: 'Integrări',
      fields: [
        { name: 'eticheta', type: 'text', required: true, label: 'Categorie' },
        { name: 'elemente', type: 'text', required: true, label: 'Elemente (separate prin virgulă)' },
      ],
    },

    // Pricing rows
    {
      name: 'preturi',
      type: 'array',
      label: 'Pachete și prețuri',
      fields: [
        { name: 'nume', type: 'text', required: true },
        { name: 'pret', type: 'text', label: 'Preț (ex: €800)' },
        { name: 'include', type: 'text', label: 'Ce include (separat prin virgulă)' },
      ],
    },

    // FAQ
    {
      name: 'faq',
      type: 'array',
      label: 'Întrebări frecvente',
      fields: [
        { name: 'intrebare', type: 'text', required: true },
        { name: 'raspuns', type: 'textarea', required: true },
      ],
    },

    // Deliverables
    {
      name: 'deliverables',
      type: 'text',
      label: 'Deliverables (separate prin virgulă)',
    },
  ],
}
