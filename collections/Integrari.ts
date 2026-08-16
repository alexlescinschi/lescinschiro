import type { CollectionConfig } from 'payload'

function slugFromName(value: string) {
  return value
    .toLowerCase()
    .replace(/[ăâ]/g, 'a').replace(/[î]/g, 'i').replace(/[șş]/g, 's').replace(/[țţ]/g, 't')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export const Integrari: CollectionConfig = {
  slug: 'integrari',
  labels: { singular: 'Integrare', plural: 'Integrări' },
  admin: {
    useAsTitle: 'nume',
    defaultColumns: ['nume', 'categorie', 'regiuni', 'paginaPublica', 'featuredHome', '_status'],
  },
  versions: { drafts: true },
  access: {
    read: ({ req: { user } }) => user ? true : { _status: { equals: 'published' } },
  },
  fields: [
    { name: 'nume', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { position: 'sidebar' },
      hooks: {
        beforeChange: [
          ({ data }) => {
            if (!data?.slug && data?.nume) data.slug = slugFromName(data.nume as string)
            return data?.slug
          },
        ],
      },
    },
    {
      name: 'aliasuri',
      type: 'array',
      label: 'Aliasuri și denumiri alternative',
      fields: [{ name: 'valoare', type: 'text', required: true }],
    },
    { name: 'logoFisier', type: 'text', label: 'Logo local', admin: { description: 'Cale din public, de exemplu /integrari/maib.svg' } },
    { name: 'logoFundalInchis', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar', description: 'Bifează pentru logo-uri albe care au nevoie de fundal închis' } },
    { name: 'logoAlt', type: 'text', label: 'Text alternativ logo' },
    {
      name: 'categorie',
      type: 'select',
      required: true,
      index: true,
      options: [
        { label: 'Plăți online', value: 'plati-online' },
        { label: 'Rate și finanțare', value: 'rate-finantare' },
        { label: 'Curierat și fulfillment', value: 'curierat-fulfillment' },
        { label: 'ERP, stoc și contabilitate', value: 'erp-stoc-contabilitate' },
        { label: 'CRM și vânzări', value: 'crm-vanzari' },
        { label: 'Marketplace și feeduri de produse', value: 'marketplace-feeduri' },
        { label: 'Marketing și analytics', value: 'marketing-analytics' },
        { label: 'Automatizări și comunicare', value: 'automatizari-comunicare' },
        { label: 'Programări și sisteme custom', value: 'programari-sisteme-custom' },
      ],
    },
    {
      name: 'regiuni',
      type: 'select',
      hasMany: true,
      required: true,
      options: [
        { label: 'Moldova', value: 'md' },
        { label: 'România', value: 'ro' },
        { label: 'Uniunea Europeană', value: 'ue' },
        { label: 'Internațional', value: 'international' },
      ],
    },
    { name: 'rezumat', type: 'textarea', required: true },
    {
      name: 'capabilitati',
      type: 'array',
      label: 'Ce sincronizăm',
      fields: [{ name: 'valoare', type: 'text', required: true }],
    },
    {
      name: 'cerinte',
      type: 'array',
      label: 'Cerințe înainte de implementare',
      fields: [{ name: 'valoare', type: 'text', required: true }],
    },
    { name: 'durata', type: 'text', label: 'Durată orientativă' },
    { name: 'pret', type: 'text', label: 'Preț orientativ' },
    { name: 'featuredHome', type: 'checkbox', defaultValue: false, index: true, admin: { position: 'sidebar' } },
    { name: 'ordine', type: 'number', defaultValue: 100, index: true, admin: { position: 'sidebar' } },
    { name: 'paginaPublica', type: 'checkbox', defaultValue: false, index: true, admin: { position: 'sidebar' } },
    { name: 'continut', type: 'richText', label: 'Conținutul paginii individuale' },
    {
      name: 'faq',
      type: 'array',
      label: 'Întrebări frecvente',
      fields: [
        { name: 'intrebare', type: 'text', required: true },
        { name: 'raspuns', type: 'textarea', required: true },
      ],
    },
    { name: 'urlOficial', type: 'text', label: 'URL oficial', admin: { position: 'sidebar' } },
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      admin: { position: 'sidebar' },
      fields: [
        { name: 'metaTitlu', type: 'text', label: 'Titlu SEO' },
        { name: 'metaDescriere', type: 'textarea', label: 'Descriere SEO' },
      ],
    },
  ],
}
