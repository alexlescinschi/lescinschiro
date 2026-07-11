import type { CollectionConfig } from 'payload'

export const Servicii: CollectionConfig = {
  slug: 'servicii',
  labels: { singular: 'Serviciu', plural: 'Servicii' },
  admin: { useAsTitle: 'titlu' },
  fields: [
    { name: 'titlu', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, admin: { position: 'sidebar' } },
    { name: 'categorie', type: 'text', admin: { position: 'sidebar' } },
    { name: 'imagine', type: 'upload', relationTo: 'media', required: true },
    { name: 'descriereScurta', type: 'textarea', label: 'Descriere scurtă' },
    { name: 'heroTitlu', type: 'text', label: 'Hero — titlu' },
    { name: 'heroSubtitlu', type: 'text', label: 'Hero — subtitlu' },
    { name: 'continut', type: 'richText', label: 'Conținut pagină' },
    { name: 'pret', type: 'text', admin: { position: 'sidebar' }, label: 'Preț orientativ' },
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      admin: { position: 'sidebar' },
      fields: [
        { name: 'titluSEO', type: 'text', label: 'Titlu SEO' },
        { name: 'descriereSEO', type: 'textarea', label: 'Descriere SEO' },
      ],
    },
  ],
}
