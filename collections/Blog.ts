import type { CollectionConfig } from 'payload'

// Slug din titlu, cu diacritice RO strip-uite (copiat din Servicii.ts).
function slugFromTitle(s: string) {
  return s
    .toLowerCase()
    .replace(/[ăâ]/g, 'a').replace(/[î]/g, 'i').replace(/[șş]/g, 's').replace(/[țţ]/g, 't')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export const Blog: CollectionConfig = {
  slug: 'blog',
  labels: { singular: 'Articol', plural: 'Articole' },
  admin: { useAsTitle: 'titlu', defaultColumns: ['titlu', 'categorie', 'publicatLa', '_status'] },
  // Drafts native Payload: scrie → salvează draft → publică mai târziu.
  versions: { drafts: true },
  access: {
    read: ({ req: { user } }) => {
      // ponytail: public vede doar publicate; admin vede tot.
      // publicatLa (backdate/scheduled) se filtrează în query, nu în access (TS picky).
      if (user) return true
      return { _status: { equals: 'published' } }
    },
  },
  fields: [
    { name: 'titlu', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      admin: { position: 'sidebar' },
      hooks: {
        // Auto din titlu dacă e gol; păstrat dacă e setat manual.
        beforeChange: [
          ({ data }) => {
            if (!data?.slug && data?.titlu) data.slug = slugFromTitle(data.titlu as string)
            return data?.slug
          },
        ],
      },
    },
    {
      name: 'categorie',
      type: 'select',
      required: true,
      admin: { position: 'sidebar' },
      options: [
        { label: 'Magazin online', value: 'magazin-online' },
        { label: 'SEO', value: 'seo' },
        { label: 'Web design', value: 'web-design' },
        { label: 'Integrări', value: 'integrari' },
        { label: 'AI & Automatizări', value: 'ai-automatizari' },
        { label: 'Sfaturi', value: 'sfaturi' },
      ],
    },
    { name: 'excerpt', type: 'textarea', required: true, label: 'Excerpt (max 160 char — pentru card + SEO)' },
    { name: 'autor', type: 'text', defaultValue: 'Alex Lescinschi', admin: { position: 'sidebar' } },
    {
      name: 'publicatLa',
      type: 'date',
      label: 'Data publicării',
      admin: { position: 'sidebar', date: { pickerAppearance: 'dayAndTime' } },
    },
    // @ts-expect-error allowEdit works at runtime but missing from Payload 3 upload field types
    { name: 'coverImage', type: 'upload', relationTo: 'media', required: true, label: 'Imagine cover', admin: { allowEdit: false } },
    { name: 'continut', type: 'richText', required: true, label: 'Conținut articol' },

    // SEO group (copiat din Proiecte.ts).
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      admin: { position: 'sidebar' },
      fields: [
        { name: 'titluSEO', type: 'text', label: 'Titlu SEO (dacă e gol, se folosește titlul)' },
        { name: 'descriereSEO', type: 'textarea', label: 'Descriere SEO (dacă e gol, se folosește excerpt)' },
      ],
    },
  ],
}
