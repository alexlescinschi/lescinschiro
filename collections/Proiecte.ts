import type { CollectionConfig } from 'payload'

export const Proiecte: CollectionConfig = {
  slug: 'proiecte',
  labels: { singular: 'Proiect', plural: 'Proiecte' },
  admin: { useAsTitle: 'titlu', defaultColumns: ['titlu', 'servicii', 'updatedAt'] },
  fields: [
    { name: 'titlu', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, admin: { position: 'sidebar' } },
    // @ts-expect-error allowEdit works at runtime but missing from Payload 3 upload field types
    { name: 'imagine', type: 'upload', relationTo: 'media', required: true, admin: { allowEdit: false } },
    { name: 'linkLive', type: 'text', label: 'Link live', admin: { position: 'sidebar' } },
    { name: 'tehnologii', type: 'text', label: 'Tehnologii (separate prin virgulă)', admin: { position: 'sidebar', description: 'Ex: Next.js, Netopia, FAN Courier, SmartBill' } },
    {
      name: 'integrariConfirmate',
      type: 'relationship',
      relationTo: 'integrari',
      hasMany: true,
      label: 'Integrări confirmate',
      admin: { description: 'Selectează numai integrările verificate în proiect.' },
    },
    { name: 'studiuDeCaz', type: 'richText', label: 'Studiu de caz (opțional)' },
    {
      name: 'servicii',
      type: 'relationship',
      relationTo: 'servicii',
      hasMany: true,
      required: true,
      label: 'Servicii folosite',
      admin: { description: 'Primul serviciu selectat este eticheta principală a proiectului.' },
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
