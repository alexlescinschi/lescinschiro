// Insert: Serviciu "Reclame Meta (Facebook & Instagram)"
// ponytail: run once with `npx tsx --env-file=.env scripts/add-reclame-meta.ts`
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

  const existing = await payload.find({ collection: 'servicii', where: { slug: { equals: 'reclame-meta' } }, limit: 1 })
  if (existing.docs.length) {
    console.log('ℹ️  Serviciul "reclame-meta" există deja (id ' + existing.docs[0].id + ') — skip.')
    process.exit(0)
  }

  const imagineId = 4

  const doc = await payload.create({
    collection: 'servicii',
    data: {
      titlu: 'Reclame Meta',
      categorie: '',
      metaTitlu: 'Reclame Meta — Facebook & Instagram Ads România | LESCINSCHI',
      imagine: imagineId,
      descriereScurta: 'Campanii Facebook & Instagram Ads pentru România: audience targeting precis (lookalike, retargeting, interest), creative care convertește, optimizare continuă. Buget controlat, ROAS urmărit, conversii măsurate în GA4 și Meta Ads Manager.',
      heroTitlu: 'Reclame Facebook & Instagram care SCALĂ',
      heroSubtitlu: 'Facebook Ads, Instagram Ads, Meta Ads Manager. Audience targeting precis, creative care oprește scroll-ul, ROAS urmărit. De la primul lead la scalare.',
      heroCuvantInel: 'SCALĂ',
      pret: '300–1.000€/lună + buget',
      deliverables: 'Campanii live și optimizate, Creative design, Conversion tracking, Raport săptămânal, Mentenanță lunară',
      continut: lexical([
        ['h2', 'Facebook & Instagram sunt cel mai puternic motor de conversii social'],
        ['p', 'Cu 4 miliarde de utilizatori activi, Meta deține cea mai bogată sursă de date demografice și comportamentale din lume. Știm ce apasă pe fiecare utilizator — și folosim asta ca să-ți găsim clienții.'],
        ['p', 'Reclamele Meta funcționează pentru că prind oamenii în pauza lor: scroll pe Instagram la prânz, Facebook seara după muncă. Nu caută activ, dar dacă reclama e bună, fac click. Intenție mai mică ca Google, dar reach mult mai mare.'],
        ['h2', 'Audience targeting precis'],
        ['p', 'Nu „toți românii 18-65”. Construim audiențe care contează: femei 25-45 cu interes în cosmetice bio, care cumpără online, în București și Cluj. Sau manageri IT 30-50 interesați de SaaS B2B. Cu cât mai specific, cu atât mai bun ROAS.'],
        ['p', 'Tipuri de audience: cold (interest + lookalike), warm (retargeting pe vizitatori site), hot (retargeting pe abandon cart). Fiecare are mesaj propriu — cold awareness, warm considerație, hot conversie.'],
        ['h2', 'Creative care oprește scroll-ul'],
        ['p', 'Pe Meta, creative-ul e 70% din succes. Un targeting perfect cu creative plictisitor = bani pierduți. Un targeting mediu cu creative bun = ROAS bun. Investim în creative: foto produs lifestyle, reels cu hook în primele 3 secunde, carusele cu storytelling.'],
        ['p', 'Testăm 4-8 variante creative per ad set, păstrăm câștigătorul, îl scalăm. „Creative fatigue” e real — după 7-14 zile, un ad bun se epuizează și trebuie înlocuit. Avem pipeline continuu de creative nou.'],
        ['h2', 'Reels Ads — prioritar în 2026'],
        ['p', 'Instagram Reels și Facebook Reels sunt cele mai importante placement-uri acum. Algoritmul le prioritizează masiv. Construim reels cu hook vizual puternic în primele 3 secunde, content nativ (nu arată ca reclamă), CTA clar.'],
        ['p', 'Reels au cea mai ieftină reach de pe Meta acum. CPM sub 1€, ideal pentru awareness și reach pe audiențe mari.'],
        ['h2', 'Retargeting — cei care aproape au cumpărat'],
        ['p', '97% dintre vizitatori nu convertesc la prima vizită. Retargeting îi prinde pe cei care au vizitat site-ul, au adăugat în coș dar au abandonat, sau s-au uitat la un produs specific. Mesaj personalizat: „uite la ce ai lăsat în coș” + discount code.'],
        ['p', 'Retargeting are cel mai bun ROAS din toate campaniile Meta — 5-15x e normal, pentru că audiența e deja calificată. Dacă faci Meta Ads fără retargeting, lași bani pe masă.'],
        ['h2', 'Conversion tracking + CAPI'],
        ['p', 'Setăm Meta Pixel + Conversions API (CAPI) pentru tracking care merge și după iOS 14.5 (care a tăiat ~40% din tracking pe iPhone). GA4 + Meta Ads Manager aliniate, conversiile atribuite corect.'],
        ['p', 'Fără tracking bine setat, faci reclamă oarbă. Orice euro cheltuit are un obiectiv și e măsurat. Raportăm zilnic la început, săptămânal după stabilizare.'],
        ['h2', 'Lookalike audiences'],
        ['p', 'Luăm lista ta de clienți existenți (sau vizitatori site, sau engageri pe pagină) și cerem Meta să găsească oameni similari. Lookalike 1% = cel mai asemănător, 5-10% = mai larg. Cel mai bun mod de a găsi clienți noi care convertesc.'],
        ['p', 'Pentru magazine: lookalike pe cumpărători. Pentru lead gen: lookalike pe form submitters. Pentru awareness: lookalike pe video viewers.'],
        ['h2', 'Optimizare continuă, nu set-and-forget'],
        ['p', 'Campaniile Meta se schimbă săptămânal: kill ads sub-performanți, scalăm câștigătorii, adăugăm creative nou, ajustăm audiences, testăm noi placements. Algoritmul Meta învață, dar are nevoie de input uman.'],
        ['p', 'Raport săptămânal: spend, CPA, ROAS, frequency, top ads, top audiences. Lunar: strategie + plan pentru luna următoare.'],
        ['h2', 'Cât costă reclamele Meta?'],
        ['p', 'Management fee: 300–1.000€/lună în funcție de complexitate (număr campanii, creative production, audiences). Buget media (ce plătești Meta): minim 300€/lună per platformă, ideal 500–2.000€/lună. Pentru ROAS predictibil, recomandat 1.000€+/lună.'],
      ]),

      tipuri: [
        { titlu: 'Facebook Ads', subtitlu: 'Cel mai larg reach', descriere: 'Feed ads, Marketplace, Stories, Reels. Pentru public larg și B2C.', logouri: 'Facebook, Meta Ads Manager' },
        { titlu: 'Instagram Ads', subtitlu: 'Vizual & aspirațional', descriere: 'Feed, Stories, Reels, Explore. Pentru produse vizuale, lifestyle, fashion.', logouri: 'Instagram, Meta Ads Manager' },
        { titlu: 'Messenger Ads', subtitlu: 'Direct & conversațional', descriere: 'Reclame care deschid conversație în Messenger. Pentru lead gen și suport.', logouri: 'Messenger, Meta Ads Manager' },
        { titlu: 'WhatsApp Ads', subtitlu: 'Direct conversion', descriere: 'Click-to-WhatsApp ads. Pentru servicii și magazine cu suport pe WhatsApp.', logouri: 'WhatsApp Business, Meta Ads Manager' },
      ],

      features: [
        { icon: '🎯', titlu: 'Audience targeting', descriere: 'Lookalike, retargeting, interest, behavioral, custom audiences.' },
        { icon: '🎬', titlu: 'Creative production', descriere: 'Foto, reels, carusele. Hook în primele 3 secunde.' },
        { icon: '📲', titlu: 'Reels Ads prioritare', descriere: 'Cel mai important placement în 2026.' },
        { icon: '🔄', titlu: 'Retargeting', descriere: 'Vizitatori site, abandon cart, engageri. Cel mai bun ROAS.' },
        { icon: '👯', titlu: 'Lookalike audiences', descriere: 'Clienți noi similari cu cei existenți.' },
        { icon: '📊', titlu: 'Conversion tracking', descriere: 'Pixel + CAPI pentru tracking post-iOS 14.5.' },
        { icon: '🧪', titlu: 'A/B testing creative', descriere: '4-8 variante per ad set, păstrăm câștigătorul.' },
        { icon: '💰', titlu: 'ROAS urmărit', descriere: '5-15x pe retargeting, 2-5x pe cold audiences.' },
        { icon: '🛒', titlu: 'Catalog Ads', descriere: 'Produsele tale în reclame dinamice (pentru magazine).' },
        { icon: '🚫', titlu: 'Frequency cap', descriere: 'Nu batem ochii cu aceeași reclamă de 20 de ori.' },
        { icon: '📅', titlu: 'Optimizare săptămânală', descriere: 'Kill losers, scale winners, creative nou.' },
        { icon: '📈', titlu: 'Lead ads', descriere: 'Formulare native Facebook, fără landing page.' },
      ],

      integrari: [
        { eticheta: 'Meta Ads', elemente: 'Facebook, Instagram, Messenger, WhatsApp, Audience Network' },
        { eticheta: 'Meta Business Suite', elemente: 'Ads Manager, Business Manager, Events Manager' },
        { eticheta: 'Tracking', elemente: 'Meta Pixel, Conversions API (CAPI), Meta Verified' },
        { eticheta: 'Analytics', elemente: 'Meta Insights, GA4, Triple Whale (pentru eCommerce)' },
        { eticheta: 'Creative', elemente: 'Canva Pro, Figma, CapCut, Adobe Creative Suite' },
        { eticheta: 'Catalog', elemente: 'Meta Catalog, Feed pentru Dynamic Ads' },
        { eticheta: 'CRM', elemente: 'HubSpot, Pipedrive, Mailchimp (pentru lead sync)' },
      ],

      preturi: [
        { nume: 'Meta Starter', pret: '€300/lună', include: '1 platformă (FB sau IG), 2 campanii, 5 creative, conversion tracking, optimizare săptămânală' },
        { nume: 'Meta Growth', pret: '€600/lună', include: 'FB + IG, 4 campanii, retargeting, lookalike, 10+ creative, raport detaliat' },
        { nume: 'Meta Pro', pret: '€1.000+/lună', include: 'FB + IG + Messenger + WhatsApp, catalog ads, reels production, landing page advice' },
      ],

      faq: [
        { intrebare: 'De ce Meta Ads și nu doar Google Ads?', raspuns: 'Google prinde intenția (cineva caută activ). Meta creează intenția (cineva scroll-uiește și face click). Cele mai bune campanii folosesc ambele: Meta pentru awareness și lead gen, Google pentru conversii high-intent.' },
        { intrebare: 'Cât buget de media recomandați?', raspuns: 'Minim 300€/lună per platformă pentru date suficiente. Ideal: 500–2.000€/lună. Sub 300€, algoritmul nu optimizează bine și riști să arunci bani.' },
        { intrebare: 'iOS 14.5 a distrus tracking-ul?', raspuns: 'A tăiat ~40% din tracking-ul iPhone. Soluția: Conversions API (CAPI) + Pixel, cu server-side tracking. Setăm mereu ambele. Tracking-ul nu e perfect, dar cu CAPI e suficient pentru optimizare.' },
        { intrebare: 'Cât durează faza de învățare?', raspuns: 'Algoritmul Meta are nevoie de 50 conversii per ad set în 7 zile să iasă din learning phase. Sub asta, performanța e imprevizibilă. Pentru conturi noi cu puține date: 2-4 săptămâni până la stabilizare.' },
        { intrebare: 'Ce ROAS pot să mă aștept?', raspuns: 'Cold audiences: 2-5x. Retargeting: 5-15x. Lookalike: 3-8x. Magazine bine optimizate: 4-10x overall. Servicii B2B: 2-4x (ciclu lung de vânzare).' },
        { intrebare: 'Creative-ul e inclus?', raspuns: 'Da, în toate pachetele. Numărul variază: Starter (5/lună), Growth (10+), Pro (production continuă). Avem designer + editor video. Dacă ai fotograf/contractor, integrăm content-ul lor.' },
        { intrebare: 'De ce Reels sunt atât de importante?', raspuns: 'Algoritmul Meta prioritizează masiv Reels în 2026. Au cea mai mare reach organic, CPM sub 1€, și audiențe tinere. Dacă nu faci Reels Ads, pierzi 50% din reach-ul posibil.' },
        { intrebare: 'Cum funcționează Catalog Ads?', raspuns: 'Connectăm catalogul tău de produse la Meta. Reclama afișează automat produsul corect fiecărui user (ex: cine s-a uitat la pantoful X vede reclama cu pantoful X). ROAS foarte mare pe retargeting eCommerce.' },
        { intrebare: 'Pot vedea ce cheltuieli și unde?', raspuns: 'Da, complet transparent. Ai access la Meta Ads Manager (e contul tău). Rapoarte săptămânale + lunare cu fiecare euro explicat. Nimic ascuns.' },
        { intrebare: 'Dacă o campanie nu merge, ce faceți?', raspuns: 'O oprim. Nu ținem ads sub-performanți „să mai vedem”. Necazul cu Meta e că un ad bun se epuizează după 7-14 zile (creative fatigue). Pipeline-ul de creative nou e continuu.' },
        { intrebare: 'Faceți lead gen B2B?', raspuns: 'Da, cu Lead Ads (formulare native în Facebook) sau click-to-WhatsApp pentru calificare. Pentru B2B îngust, LinkedIn Ads are mai mult sens (vezi serviciul nostru SMM).' },
        { intrebare: 'Migrați contul de la altă agenție?', raspuns: 'Da. Contul e al tău (Business Manager pe numele tău). Primim acces, facem audit, propunem plan. Păstrăm ce merge, oprim ce nu. Fără vendor lock-in.' },
      ],
    },
  })

  console.log('✅ Serviciu creat:', doc.id, '—', doc.titlu, '| slug:', doc.slug)
  process.exit(0)
}

main().catch((e) => { console.error('❌ Eroare:', e); process.exit(1) })
