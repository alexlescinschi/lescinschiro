// Insert: Serviciu "Reclame Google Ads (PPC)"
// ponytail: run once with `npx tsx --env-file=.env scripts/add-google-ads.ts`
// Idempotent: dacă slug-ul există, face skip.
import { getPayload } from 'payload'
import config from '../payload.config'

type Block = ['h2' | 'p', string]
function lexical(blocks: Block[]) {
  return {
    root: {
      children: blocks.map(([type, text]) => {
        const node: any = {
          children: [{ detail: 0, format: 0, mode: 'normal', style: '', text, type: 'text', version: 1 }],
          direction: 'ltr', format: '', indent: 0, version: 1,
        }
        if (type === 'h2') { node.type = 'heading'; node.tag = 'h2' }
        else { node.type = 'paragraph'; node.textFormat = 0; node.textStyle = '' }
        return node
      }),
      direction: 'ltr', format: '', indent: 0, type: 'root', version: 1,
    },
  }
}

async function main() {
  const payload = await getPayload({ config })

  const existing = await payload.find({ collection: 'servicii', where: { slug: { equals: 'reclame-google-ads' } }, limit: 1 })
  if (existing.docs.length) {
    console.log('ℹ️  Serviciul "reclame-google-ads" există deja (id ' + existing.docs[0].id + ') — skip.')
    process.exit(0)
  }

  const imagineId = 1

  const doc = await payload.create({
    collection: 'servicii',
    data: {
      titlu: 'Reclame Google Ads',
      metaTitlu: 'Reclame Google Ads (PPC) — Search, Shopping, YouTube România | LESCINSCHI',
      imagine: imagineId,
      descriereScurta: 'Campanii Google Ads pentru România: Search Ads pe cuvinte-cheie comerciale, Shopping Ads pentru magazine, Display și YouTube Ads pentru brand awareness. Buget controlat, ROAS urmărit, optimizare continuă.',
      heroTitlu: 'Reclame Google care ADUC clienți',
      heroSubtitlu: 'Search Ads, Display, Shopping, YouTube. Plătești doar când cineva dă click. Buget controlat, ROAS urmărit, conversii măsurate.',
      heroCuvantInel: 'ADUC',
      pret: '300–1.000€/lună + buget',
      deliverables: 'Campanii live și optimizate, Conversion tracking, Raport săptămânal, Landing page advice, Mentenanță lunară',
      continut: lexical([
        ['h2', 'Plătești doar când cineva e interesat'],
        ['p', 'Spre deosebire de reclamele sociale (unde userul scroll-uiește), Google Ads prinde oamenii în momentul în care caută activ ce oferă tu. „Reparare laptop București”, „avocat divorț Sector 3”, „magazin online produse naturiste”. Intenție de cumpărare mare, conversie mare.'],
        ['p', 'Plătești doar când cineva dă click pe reclama ta — nu pentru impressions. Bugetul e controlabil la nivel de zi, campanie, cuvânt-cheie. Zero risipă (dacă e setat bine).'],
        ['h2', 'Search Ads — pe cuvintele care vând'],
        ['p', 'Cercetăm cuvintele-cheie cu intenție comercială: „[produs] pret”, „[serviciu] + [oraș]”, „cum cumpăr [X]”. Excludem cuvintele informaționale (care aduc click-uri fără conversii). Optimizăm continuu: ad copy, bidding, landing page.'],
        ['p', 'Pentru fiecare cuvânt-cheie scriem 3-5 variante de ad copy, testăm, păstrăm ce performează. Un cuvânt bun cu ad copy slab = bani pierduți. Un cuvânt mediu cu ad copy bun = ROAS bun.'],
        ['h2', 'Shopping Ads — pentru magazine'],
        ['p', 'Produsele tale apar cu imagine, preț și nume magazin direct sus în Google, deasupra rezultatelor organice. Pentru magazine online, Shopping Ads sunt sursa #1 de conversii plătite.'],
        ['p', 'Setăm feed-ul de produse în Google Merchant Center, îl optimizăm (titluri, descrieri, imagini), îl conectăm la Google Ads. Produsele apar automat pentru căutările relevante. ROAS mediu pe Shopping: 4-8x (pentru magazine bine optimizate).'],
        ['h2', 'Display Ads — brand awareness la scară'],
        ['p', 'Bannere pe milioane de site-uri din rețeaua Google. Pentru awareness, retargeting (oameni care au vizitat site-ul tău dar n-au convertit), și reach pe audiențe specifice. Cost per click mic (0.05-0.30€), bun pentru top-of-funnel.'],
        ['p', 'Creăm bannere responsive (Google le combină automat pentru a găsi cea mai bună variantă). Targetare pe topic, interes, demografie, sau remarketing.'],
        ['h2', 'YouTube Ads — video care convertește'],
        ['p', 'Pre-roll ads înainte de videoclipuri YouTube. Skippable (plătești doar dacă userul se uită 30s), Bumper ads (6 secunde neskipable), In-stream pentru awareness. Cel mai bun format pentru brand storytelling.'],
        ['p', 'Pentru magazine cu video de produs și branduri care vor awareness, YouTube Ads au cel mai mic CPM din toate platformele plătite.'],
        ['h2', 'Conversion tracking real, nu vanity'],
        ['p', 'Setăm GA4 + Google Ads conversion tracking pentru: form submissions, calls, WhatsApp clicks, add-to-cart, purchases. Orice euro cheltuit e atribuit unei acțiuni. Dacă o campanie nu generează conversii, o oprim — nu o ținem „pentru awareness”.'],
        ['p', 'Urmărim ROAS (Return on Ad Spend): pentru fiecare 1€ cheltuit, câți euro încasezi. Un ROAS bun variază: 3x pentru servicii, 4-8x pentru magazine. Sub 2x = campanie neprofitabilă, o oprim sau o refacem.'],
        ['h2', 'Optimizare continuă, nu set-and-forget'],
        ['p', 'Campaniile Google Ads nu se setează o dată și se uită. Optimizăm săptămânal: ajustăm bids, adăugăm/eliminăm cuvinte-cheie, testăm noi ad copy, ajustăm landing pages. Algoritmul Google învață, dar are nevoie de direcție umană.'],
        ['p', 'Raport săptămânal scurt (ce merge, ce nu, ce schimbăm), raport lunar detaliat (spend, conversions, ROAS, CPA, top keywords).'],
        ['h2', 'Cât costă Google Ads?'],
        ['p', 'Management fee: 300–1.000€/lună în funcție de complexitate (număr campanii, conturi, buget gestionat). Buget media (ce plătești Google): recomandat minim 500€/lună pentru a vedea rezultate, ideal 1.000–5.000€/lună. La brief îți spunem exact ce buget are sens pentru obiectivul tău.'],
      ]),

      tipuri: [
        { titlu: 'Search Ads', subtitlu: 'Căutare cu intenție', descriere: 'Text ads sus în Google pe cuvinte-cheie comerciale. Cele mai bune conversii.', logouri: 'Google Search, Google Ads, Keyword Planner' },
        { titlu: 'Shopping Ads', subtitlu: 'Pentru magazine', descriere: 'Produse cu imagine și preț în Google. Integrat cu Merchant Center.', logouri: 'Google Shopping, Merchant Center, Feed Management' },
        { titlu: 'Display Ads', subtitlu: 'Awareness și retargeting', descriere: 'Bannere pe milioane de site-uri. CPC mic, bun pentru top-of-funnel.', logouri: 'Google Display Network, Responsive Ads' },
        { titlu: 'YouTube Ads', subtitlu: 'Video pre-roll', descriere: 'Pre-roll, bumper, in-stream. Cel mai ieftin CPM din platformele plătite.', logouri: 'YouTube Ads, Google Ads Video, TrueView' },
      ],

      features: [
        { icon: '🔍', titlu: 'Cercetare cuvinte-cheie', descriere: 'Ce caută efectiv românii cu intenție de cumpărare.' },
        { icon: '🎯', titlu: 'Intenție comercială', descriere: 'Targetăm „[produs] pret”, nu „ce e [produs]”.' },
        { icon: '🛒', titlu: 'Shopping optimizat', descriere: 'Feed de produse cu titluri, imagini, prețuri pe poziție.' },
        { icon: '📊', titlu: 'Conversion tracking', descriere: 'GA4 + Google Ads, orice euro atribuit unei acțiuni.' },
        { icon: '💰', titlu: 'ROAS urmărit', descriere: 'Pentru fiecare 1€ cheltuit, câți euro încasezi.' },
        { icon: '🔁', titlu: 'Retargeting', descriere: 'Oameni care au vizitat site-ul dar n-au convertit.' },
        { icon: '🧪', titlu: 'A/B testing', descriere: '3-5 variante ad copy per cuvânt, păstrăm câștigătorul.' },
        { icon: '📅', titlu: 'Optimizare săptămânală', descriere: 'Bids, keywords, copy, landing. Set-and-forget = bani pierduți.' },
        { icon: '🎬', titlu: 'YouTube pre-roll', descriere: 'Cel mai bun format pentru brand storytelling.' },
        { icon: '🚫', titlu: 'Negative keywords', descriere: 'Excludem căutările care aduc click-uri fără conversii.' },
        { icon: '📞', titlu: 'Call tracking', descriere: 'Apeluri atribuite campaniilor, nu doar clicks.' },
        { icon: '🌍', titlu: 'Geo-targeting', descriere: 'Pe oraș, județ, rază în jurul locației tale.' },
      ],

      integrari: [
        { eticheta: 'Google Ads', elemente: 'Search, Display, Shopping, Video, Performance Max' },
        { eticheta: 'Google Merchant Center', elemente: 'Feed de produse, Shopping Ads' },
        { eticheta: 'Google Analytics 4', elemente: 'Conversion tracking, audience building' },
        { eticheta: 'Google Tag Manager', elemente: 'Implementare tracking code' },
        { eticheta: 'Google Search Console', elemente: 'Cuvinte-cheie organice → extindere PPC' },
        { eticheta: 'Keyword research', elemente: 'Keyword Planner, Ahrefs, Semrush, Ubersuggest' },
        { eticheta: 'Landing page tools', elemente: 'Unbounce, Instapage, sau pagini custom Next.js' },
      ],

      preturi: [
        { nume: 'PPC Starter', pret: '€300/lună', include: '1 campanie Search, 20 cuvinte-cheie, conversion tracking, optimizare săptămânală' },
        { nume: 'PPC Growth', pret: '€600/lună', include: 'Search + Shopping sau Display, retargeting, A/B testing, raport detaliat' },
        { nume: 'PPC Pro', pret: '€1.000+/lună', include: 'Search + Shopping + Display + YouTube, Performance Max, multi-cont, landing page advice' },
      ],

      faq: [
        { intrebare: 'Cât buget de media recomandați?', raspuns: 'Minim 500€/lună pentru a vedea conversii reale. Sub asta, algoritmul n-are destule date să optimizeze. Ideal: 1.000–5.000€/lună în funcție de obiectiv și competiție.' },
        { intrebare: 'Cât durează până văd rezultate?', raspuns: 'Primele conversii: 1-2 săptămâni (Search). Optimizare stabilă cu ROAS predictibil: 6-8 săptămâni. Shopping pentru magazine poate genera vânzări din prima săptămână.' },
        { intrebare: 'Ce ROAS (return on ad spend) pot să mă aștept?', raspuns: 'Pentru servicii: 3-5x. Pentru magazine bine optimizate: 4-8x. Pentru branduri noi, fără date: 1-2x la început, crește cu optimizarea.' },
        { intrebare: 'De ce să fac PPC când fac și SEO?', raspuns: 'Nu fie vs celălalt. PPC aduce conversii imediate (ziua 1), SEO aduce trafic pe termen lung (3-6 luni). În primele luni PPC susține afacerea cât crește SEO. Pe termen lung, SEO devine cea mai ieftină sursă.' },
        { intrebare: 'Plătesc per click sau per impresie?', raspuns: 'Depinde de strategie. Search: CPC (per click, 0.20–2€). Display: de obicei CPM (per 1000 impresii, 1–5€). YouTube: CPM mic (2–8€), ideal pentru awareness.' },
        { intrebare: 'Ce conversii urmăriți?', raspuns: 'Toate care contează pentru business: form submissions, calls, WhatsApp clicks, add-to-cart, purchases, newsletter signups. Setăm GA4 + Google Ads conversion tracking pentru fiecare.' },
        { intrebare: 'Faceți și optimizarea landing page?', raspuns: 'Da, recomandări. Dacă campania duce la o pagină slabă, conversiile sunt mici indiferent de cât băgăm în ads. În pachetul Pro, includem și build de landing page dedicată.' },
        { intrebare: 'Ce e Performance Max?', raspuns: 'Campanie Google care folosește AI să plaseze reclamele pe toate platformele (Search, Display, YouTube, Gmail, Discover). Bun pentru magazine, necesită feed și conversii bine setate.' },
        { intrebare: 'Pot vedea ce cheltuieli și unde?', raspuns: 'Da, transparent. Ai access la Google Ads cont (e al tău, niciodată pe al nostru). Raport săptămânal + lunar cu fiecare euro explicat.' },
        { intrebare: 'Dacă o campanie nu merge, o închideți?', raspuns: 'Da. Nu ținem campanii neprofitabile „pentru awareness”. Dacă nu generează conversii cu sens, o oprim sau o refacem. Fără să aruncăm banii tăi.' },
        { intrebare: 'Cât costă click-ul în România?', raspuns: 'Depinde de nișă. „Avocat divorț”: 2–5€/click. „Reparare laptop”: 0.50–1.50€/click. „Magazin online produse naturiste”: 0.30–1€. Cuvinte competitive = CPC mare.' },
        { intrebare: 'Migrați contul de la altă agenție?', raspuns: 'Da. Contul e al tău. Primim acces, facem audit complet, propunem plan de optimizare. Păstrăm ce merge, oprim ce nu. Fără vendor lock-in.' },
      ],
    },
  })

  console.log('✅ Serviciu creat:', doc.id, '—', doc.titlu, '| slug:', doc.slug)
  process.exit(0)
}

main().catch((e) => { console.error('❌ Eroare:', e); process.exit(1) })
