import type { CollectionConfig } from 'payload'

export const Proiecte: CollectionConfig = {
  slug: 'proiecte',
  labels: { singular: 'Proiect', plural: 'Proiecte' },
  admin: { useAsTitle: 'titlu' },
  fields: [
    { name: 'titlu', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, admin: { position: 'sidebar' } },
    { name: 'imagine', type: 'upload', relationTo: 'media', required: true },
    {
      name: 'categorie',
      type: 'select',
      admin: { position: 'sidebar' },
      options: [
        { label: 'Magazin online', value: 'magazin-online' },
        { label: 'Corporativ', value: 'corporativ' },
        { label: 'Landing page', value: 'landing-page' },
      ],
    },
    { name: 'linkLive', type: 'text', label: 'Link live', admin: { position: 'sidebar' } },
    { name: 'studiuDeCaz', type: 'richText', label: 'Studiu de caz (opțional)' },
    {
      name: 'servicii',
      type: 'relationship',
      relationTo: 'servicii',
      hasMany: true,
      label: 'Servicii folosite',
    },
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
