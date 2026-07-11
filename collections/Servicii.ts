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
        { name: 'icon', type: 'text', required: true, label: 'Icon (emoji sau SVG)' },
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
