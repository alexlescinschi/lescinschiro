// Insert: Serviciu "Social Media Management (SMM)"
// ponytail: run once with `npx tsx --env-file=.env scripts/add-smm.ts`
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
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        }
        if (type === 'h2') { node.type = 'heading'; node.tag = 'h2' }
        else { node.type = 'paragraph'; node.textFormat = 0; node.textStyle = '' }
        return node
      }),
      direction: 'ltr',
      format: '',
      indent: 0,
      type: 'root',
      version: 1,
    },
  }
}

async function main() {
  const payload = await getPayload({ config })

  const existing = await payload.find({ collection: 'servicii', where: { slug: { equals: 'social-media-management' } }, limit: 1 })
  if (existing.docs.length) {
    console.log('ℹ️  Serviciul "social-media-management" există deja (id ' + existing.docs[0].id + ') — skip.')
    process.exit(0)
  }

  const imagineId = 4

  const doc = await payload.create({
    collection: 'servicii',
    data: {
      titlu: 'Social Media Management',
      categorie: '',
      metaTitlu: 'Social Media Management — Facebook, Instagram, TikTok, LinkedIn | LESCINSCHI',
      imagine: imagineId,
      descriereScurta: 'Servicii complete de Social Media Management (SMM): strategie, content calendar, postări organice, community management și reclame plătite pe Facebook, Instagram, TikTok și LinkedIn. Creștere reală, nu doar followeri vanity.',
      heroTitlu: 'Social media care CONSTRUIESC comunitate',
      heroSubtitlu: 'Content calendar, postări organice, community management și reclame plătite pe Facebook, Instagram, TikTok, LinkedIn. De la strategie la execuție.',
      heroCuvantInel: 'COMUNITATE',
      pret: '300–1.000€/lună',
      deliverables: 'Strategie socială, Content calendar lunar, Postări programate, Raport lunar, Mentenanță campanii',
      continut: lexical([
        ['h2', 'Followeri nu înseamnă afacere. Comunitate înseamnă.'],
        ['p', '10.000 de followeri cumpărați din Pakistan nu valorează nimic. 500 de followeri reali, interesați de ce vinzi, valorează tot. Construim comunități pe social media care generă conversii — oameni care cumpără, recomandă și revin.'],
        ['p', 'Nu vindem „postăm de 3 ori pe săptămână”. Vindem un sistem: strategie clară, content calendar documentat, postări testate, community management activ, reclame plătite care scalază ce funcționează organic.'],
        ['h2', 'Strategie bazată pe publicul tău real'],
        ['p', 'Înainte de prima postare, studiem: cine e clientul tău ideal, pe ce platforme petrece timp (Facebook 35+ / Instagram 18-34 / TikTok Gen Z / LinkedIn B2B), ce fel de conținut consumă, ce îl face să apese pe follow. Strategia socială e o extensie a strategiei de business, nu un add-on.'],
        ['p', 'Pe baza asta alegem platformele care contează pentru tine. Nu trebuie să fii pe toate — trebuie să fii acolo unde e publicul tău. Mai bine 2 platforme făcute bine decât 4 făcute la repezeală.'],
        ['h2', 'Content calendar lunar'],
        ['p', 'Planificăm tot conținutul o lună înainte: teme săptămânale, tipuri de postare (educațional, promoțional, behind-the-scenes, UGC), formate (feed, stories, reels, carousel), copy, hashtag-uri. Nimic improvizat cu o oră înainte de postare.'],
        ['p', 'Calendarul e documentat în Google Sheets / Notion — știi oricând ce se postează și de ce. Poți aproba, modifica, sugera. Transparență totală, fără „am uitat să postăm azi”.'],
        ['h2', 'Producție de conținut'],
        ['p', 'Creăm conținut care oprește scroll-ul: carusele educaționale, reels cu hook-uri puternice, stories zilnice, postări long-form pe LinkedIn. Folosim trend-uri curente, dar le adaptăm brandului tău — nu copiem pur și simplu ce e viral.'],
        ['p', 'Pentru magazine: postări produs cu lifestyle shots, unboxing reels, testimoniale clienți, GIF-uri cu use-case-uri. Pentru servicii B2B: case studies, thought leadership, industry insights pe LinkedIn.'],
        ['h2', 'Community management activ'],
        ['p', 'Răspundem la comentarii, DM-uri, recenzii în numele tău (sau te alertăm pe cele care necesită răspuns personal). Moderăm spam, gestionăm crize, transformăm complaining-uri în oportunități de customer delight. Un client cu problemă rezolvată pe social devine promotor.'],
        ['p', 'Timp mediu de răspuns: sub 4 ore în orele lucrătoare. Pe Instagram și Facebook, viteza de răspuns e un factor de ranking — conturile care răspund rapid primesc mai multă vizibilitate.'],
        ['h2', 'Reclame plătite pe social (paid social)'],
        ['p', 'Când o postare organică performează bine, o transformăm în reclamă și o scalăm. Targetare precisă: lookalike audiences bazate pe clienții existenți, retargeting pe vizitatorii site-ului, interest targeting pe nișă. Buget controlat zilnic, ROAS urmărit în GA4 și platformă.'],
        ['p', 'Nu aruncăm bani pe boosting posts fără strategie. Orice euro are un obiectiv: awareness, engagement, lead-uri, sau vânzări directe. Raportăm ce a generat fiecare campanie.'],
        ['h2', 'Influencer marketing (opțional)'],
        ['p', 'Identificăm micro-influenceri (1K-50K followers) relevanți pentru nișa ta, negociem colaborări, gestionăm brief-uri și livrabile. Micro-influencerii au engagement rate de 3-7% (vs 1-2% la cei mari) și costă mai puțin per conversie.'],
        ['h2', 'Analytics și rapoarte lunare'],
        ['p', 'În fiecare lună primești: reach și impressions, engagement rate, follower growth (real, nu cumpărat), traffic către site din social, conversii atribuite social, top postări cu „why”. Nimic vanity metrics — doar ceea ce contează pentru business.'],
        ['h2', 'Cât costă SMM?'],
        ['p', 'Între 300 € și 1.000+ € pe lună, în funcție de numărul de platforme, frecvența postărilor, producția de conținut (foto/video), bugetul de reclame gestionat și community management. Un pachet de start (2 platforme, 12 postări/lună, community management) pornește de la 300 €. Primești propunere fixă după brief.'],
      ]),

      tipuri: [
        { titlu: 'Facebook & Instagram', subtitlu: 'Public larg', descriere: 'Meta Business Suite, postări, stories, reels, reclame plătite. Pentru B2C și local business.', logouri: 'Facebook, Instagram, Meta Ads Manager' },
        { titlu: 'TikTok', subtitlu: 'Generația Z', descriere: 'Conținut scurt, trend-uri, hooks virale, TikTok Ads. Pentru branduri tinere sau produse vizuale.', logouri: 'TikTok, TikTok Ads Manager, CapCut' },
        { titlu: 'LinkedIn', subtitlu: 'B2B și profesional', descriere: 'Postări long-form, thought leadership, LinkedIn Ads. Pentru servicii B2B, recruitment, SaaS.', logouri: 'LinkedIn, LinkedIn Campaign Manager' },
        { titlu: 'YouTube & Shorts', subtitlu: 'Conținut video', descriere: 'Channel management, SEO YouTube, Shorts, Pre-roll Ads. Pentru conținut educațional și tutoriale.', logouri: 'YouTube, YouTube Studio, Google Ads' },
      ],

      features: [
        { icon: '📅', titlu: 'Content calendar lunar', descriere: 'Planificat, documentat, aprobat înainte.' },
        { icon: '✍️', titlu: 'Copywriting', descriere: 'Texte care opresc scroll-ul, cu voce de brand.' },
        { icon: '🎬', titlu: 'Producție vizuală', descriere: 'Foto, reels, carusele, stories. Design pe brand.' },
        { icon: '💬', titlu: 'Community management', descriere: 'Răspunsuri sub 4h, moderare, delight.' },
        { icon: '📊', titlu: 'Analytics lunar', descriere: 'Reach, engagement, conversii. Nimic vanity.' },
        { icon: '🎯', titlu: 'Audience targeting', descriere: 'Lookalike, retargeting, interest pe nișă.' },
        { icon: '💰', titlu: 'Reclame plătite', descriere: 'Campanii cu ROAS urmărit, nu boosting.' },
        { icon: '🤝', titlu: 'Influencer marketing', descriere: 'Micro-influenceri relevanți, NU mega-stars.' },
        { icon: '🔄', titlu: 'Repurposing', descriere: 'Un conținut → 5 formate (reel → carousel → blog).' },
        { icon: '📈', titlu: 'Growth real', descriere: 'Fără followeri cumpărați, fără engagement fals.' },
        { icon: '🚨', titlu: 'Crisis management', descriere: 'Răspuns rapid la recenzii negative, PR defensiv.' },
        { icon: '🌍', titlu: 'Multi-limbă', descriere: 'Conținut adaptat pentru piața RO / MD / FR / EN.' },
      ],

      integrari: [
        { eticheta: 'Platforme Meta', elemente: 'Facebook Pages, Instagram Business, Meta Business Suite, Ads Manager' },
        { eticheta: 'TikTok', elemente: 'TikTok Business, TikTok Ads Manager, CapCut' },
        { eticheta: 'LinkedIn', elemente: 'LinkedIn Pages, Campaign Manager, Sales Navigator' },
        { eticheta: 'YouTube', elemente: 'YouTube Studio, Google Ads (Pre-roll)' },
        { eticheta: 'Scheduling', elemente: 'Meta Business Suite, Later, Buffer, Hootsuite' },
        { eticheta: 'Design', elemente: 'Canva Pro, Figma, Adobe Creative Suite' },
        { eticheta: 'Analytics', elemente: 'Meta Insights, Google Analytics 4, Sprout Social' },
        { eticheta: 'Influencer', elemente: 'Brandwatch, HypeAuditor, Modash' },
      ],

      preturi: [
        { nume: 'SMM Starter', pret: '€300/lună', include: '2 platforme, 12 postări/lună, community management, raport lunar' },
        { nume: 'SMM Growth', pret: '€600/lună', include: '3 platforme, 20 postări, + reels, reclame plătite, influencer outreach' },
        { nume: 'SMM Pro', pret: '€1.000+/lună', include: '4+ platforme, conținut video, ads management, crisis management, multi-limbă' },
      ],

      faq: [
        { intrebare: 'De câte postări pe lună am nevoie?', raspuns: 'Depinde de platformă. Instagram: 3-4/săptămână feed + stories zilnice. LinkedIn: 2-3/săptămână. TikTok: 1-2/zi pentru algoritm. Calitatea bate cantitatea — un reel bun valorează cât 10 postări mediocre.' },
        { intrebare: 'Cât durează până văd rezultate?', raspuns: 'Creștere organică reală: 3-6 luni. Cu reclame plătite: primele conversii în 2-4 săptămâni. Cine îți promite „10K followers în 30 zile” minte sau îți vinde followeri falși care nu convertesc.' },
        { intrebare: 'Pe ce platforme trebuie să fiu?', raspuns: 'Depinde de publicul tău. B2C local: Facebook + Instagram. Gen Z: TikTok + Instagram. B2B: LinkedIn. Educațional: YouTube. La brief îți recomandăm doar platformele care aduc clientul tău.' },
        { intrebare: 'Cine produce imaginile/video?', raspuns: 'Noi, în echipă. Avem designer și editor video. Dacă ai fotograf profesional sau contractor, integrăm content-ul lui în calendar.' },
        { intrebare: 'Reclamele plătite sunt incluse?', raspuns: 'În pachetele Growth și Pro da. În Starter nu. Bugetul de reclame (ce plătești Facebook/TikTok) e separat de management fee-ul nostru.' },
        { intrebare: 'Pot aproba postările înainte să fie publicate?', raspuns: 'Da. Calendarul lunar e aprobat înainte, iar la nevoie poți modifica oricând. Nimic nu se postează fără acordul tău.' },
        { intrebare: 'Cât costă influencer marketing-ul?', raspuns: 'Micro-influenceri (1K-50K): 50-500€/colaborare. Mid-tier (50K-500K): 500-5.000€. Nu recomandăm mega-influenceri decât pentru brand awareness masiv — ROAS e slab la ei.' },
        { intrebare: 'Răspundeți la DM-uri în numele nostru?', raspuns: 'Da, în pachetele Growth și Pro. Cu playbook aprobat de tine: ce răspundem standard, ce escaladăm la tine. Timp mediu de răspuns: sub 4 ore.' },
        { intrebare: 'Cât buget de reclame lunar recomandați?', raspuns: 'Pentru a vedea rezultate: minim 300€/lună pe platformă. Sub asta, algoritmul n-are destule date să optimizeze. Ideal: 500-1.500€/lună per platformă.' },
        { intrebare: 'Faceți și content video (reels)?', raspuns: 'Da. Reels sunt prioritar pe Instagram și TikTok în 2026. Filmări, montaj, hooks, trend-jacking. În pachetul Pro includem și producție video originală.' },
        { intrebare: 'Migrați de la altă agenție?', raspuns: 'Da. Preiei ownership-ul contului (totul e pe contul tău, niciodată pe al nostru), primim acces, facem audit, propunem plan de îmbunătățire. Fără vendor lock-in.' },
        { intrebare: 'Ce se întâmplă dacă opresc după 3 luni?', raspuns: 'Toate asset-ele (postări, design, calendar, strategie) sunt ale tale. Le predăm pe Google Drive shared. Conturile rămân pe numele tău. Fără retenție forțată.' },
      ],
    },
  })

  console.log('✅ Serviciu creat:', doc.id, '—', doc.titlu, '| slug:', doc.slug)
  process.exit(0)
}

main().catch((e) => { console.error('❌ Eroare:', e); process.exit(1) })
