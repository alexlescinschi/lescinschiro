// Insert: Serviciu "SEO România"
// ponytail: run once with `npx tsx --env-file=.env scripts/add-seo-romania.ts`
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

  const existing = await payload.find({ collection: 'servicii', where: { slug: { equals: 'seo-romania' } }, limit: 1 })
  if (existing.docs.length) {
    console.log('ℹ️  Serviciul "seo-romania" există deja (id ' + existing.docs[0].id + ') — skip.')
    process.exit(0)
  }

  const imagineId = 4

  const doc = await payload.create({
    collection: 'servicii',
    data: {
      titlu: 'SEO România',
      categorie: '',
      metaTitlu: 'SEO România — Optimizare SEO pentru Piața RO | LESCINSCHI',
      imagine: imagineId,
      descriereScurta: 'Servicii SEO pentru România: optimizare tehnică (Core Web Vitals, sitemap, schema.org), cercetare cuvinte-cheie în limba română, conținut optimizat, link building din surse RO, Google Business Profile și rapoarte lunare de poziții și trafic.',
      heroTitlu: 'SEO care te aduce pe PRIMA PAGINĂ',
      heroSubtitlu: 'Optimizare tehnică + de conținut pentru piața din România. Cercetare cuvinte-cheie în română, link building RO, Google Business Profile, rapoarte lunare de poziții.',
      heroCuvantInel: 'PRIMA PAGINĂ',
      pret: '200–600€/lună',
      deliverables: 'Audit SEO complet, Strategie pe cuvinte-cheie, Raport lunar, Monitorizare Search Console, Mentenanță tehnică',
      continut: lexical([
        ['h2', 'SEO nu e magie, e muncă sistematică'],
        ['p', 'Nu vindem „primele 3 locuri pe Google în 30 de zile” pentru că asta nu există — cine promite asta minte. Ceea ce facem e munca care, aplicată constant 3–6 luni, urcă pozițiile pe cuvintele care aduc clienți reali: optimizare tehnică, conținut pe cuvinte-cheie cu intenție comercială, link building din surse româenești relevante.'],
        ['p', 'Diferența între SEO și reclame: plătești o dată pentru SEO și poziția rămâne. Plătești pentru Google Ads și, când termini bugetul, dispari. Pe termen lung, SEO e cea mai ieftină sursă de trafic calificat.'],
        ['h2', 'Cercetare cuvinte-cheie în limba română'],
        ['p', 'Nu traducem liste de cuvinte din engleză. Cercetăm ce caută efectiv românii: „creare magazin online”, „reparare laptop București”, „avocat divorț Sector 3”. Diferența dintre intenția informațională („ce e un SRL”) și cea comercială („înființare SRL preț”) e totul — pe cea comercială vinzi, pe cea informațională doar educa.'],
        ['p', 'Lucrăm cu un mix: head terms (volum mare, competiție mare), long-tail (volum mic, conversie mare), local SEO („[serviciu] + [oraș]”). Pentru fiecare pagină, alegem 1 cuvânt principal + 3–5 secundare, iar conținutul se construiește în jurul lor.'],
        ['h2', 'SEO tehnic — fundația'],
        ['p', 'Fără site rapid și crawlable, orice altce e risipă. Optimizăm Core Web Vitals (LCP, INP, CLS), rezolvăm erorile de crawl, sitemap.xml curat, robots.txt configurat, arhitectură URL logică, schema.org (Product, LocalBusiness, Organization, FAQ, BreadcrumbList), hreflang pentru site-uri multi-regiune. Un site care încarcă în 1.5s în loc de 4s urcă singur 2–3 poziții.'],
        ['h2', 'Conținut care convinge și pe Google, și pe client'],
        ['p', 'Scriem articole și pagini optimizate care nu se citesc ca SEO. Fără keyword stuffing, fără paragraafe cu „cel mai bun X din România” repetat de 12 ori. Conținut documentat, care răspunde la întrebarea reală din spatele căutării, cu H1-H2-H3 clare, internal linking strategic, imagini cu alt descriptiv.'],
        ['p', 'Pentru magazine: descrieri de produse optimizate, pagini de categorie cu copy unic, blog cu articole pe long-tail („cum alegi X”, „X vs Y”, „cele mai bune X în 2026”). Asta aduce trafic pe căutări pe care nu le bănuiai.'],
        ['h2', 'Local SEO — Google Business Profile'],
        ['p', 'Cauți clienți în București, Cluj, Iași, Constanța? Google Business Profile optimizat înseamnă apariția în „Map Pack” (cele 3 firme de sus, cu hartă). Optimizăm profilul, adăugăm foto, răspundem la recenzii, generăm recenzii noi de la clienți reali, postăm regulat. Pentru clinici, restaurante, saloane, firme locale — local SEO e sursa #1 de clienți noi.'],
        ['h2', 'Link building din surse româenești'],
        ['p', 'Link-urile rămân un top-3 factor de ranking. Construim link-uri albe (nu PBN, nu spam): guest post pe bloguri RO relevante, mențiuni în presă locală, parteneriate, directorii de nișă, HARO RO. Fiecare link cu anchor text natural, de pe site-uri cu autoritate reală. Zero risc de penalizare.'],
        ['h2', 'Rapoarte lunare — nimic ascuns'],
        ['p', 'În fiecare lună primești: pozițiile pe cuvintele-cheie țintă (înainte/acum/delta), traficul organic (Google Analytics 4 + Search Console), link-urile construite, lucrările executate, planul pentru luna următoare. Fără metrics vanity („am publicat 10 articole”), doar ceea ce contează: poziții, trafic, lead-uri.'],
        ['h2', 'Cât costă SEO în România?'],
        ['p', 'Între 200 € și 600 € pe lună, în funcție de competiția nișei, numărul de cuvinte-cheie țintă și volumul de conținut necesar. Un pachet de start (audit + optimizare on-page + 4 articole/lună) pornește de la 200 €. Pentru nișe competitive (imobiliare, avocatură, financiar): 400–600 €. Primești propunere fixă în 24–48 de ore după brief.'],
      ]),

      tipuri: [
        { titlu: 'SEO Național', subtitlu: 'Top pe .ro', descriere: 'Cuvinte-cheie la nivel național: „creare magazin online”, „avocat X”. Pentru servicii fără legătură cu un oraș.', logouri: 'Google, Bing, DuckDuckGo' },
        { titlu: 'SEO Local', subtitlu: 'Top în orașul tău', descriere: 'Google Business Profile + optimizare pentru „[serviciu] + [oraș]”. Apari în Map Pack.', logouri: 'Google Maps, Google Business Profile, Waze' },
        { titlu: 'SEO eCommerce', subtitlu: 'Produse pe primul loc', descriere: 'Optimizare catalog, pagini categorie, schema Product, feed Google Shopping.', logouri: 'Google Shopping, Google Merchant Center' },
        { titlu: 'SEO Tehnic', subtitlu: 'Core Web Vitals & indexare', descriere: 'Viteză, indexare, schema.org, hreflang. Pentru site-uri mari cu probleme tehnice.', logouri: 'Google Search Console, PageSpeed Insights, Screaming Frog' },
      ],

      features: [
        { icon: '🔍', titlu: 'Cercetare cuvinte-cheie RO', descriere: 'Ce caută efectiv românii. Nu traduceri.' },
        { icon: '🚀', titlu: 'Core Web Vitals', descriere: 'LCP, INP, CLS optimizate. Site rapid = poziții mai bune.' },
        { icon: '🗺️', titlu: 'Sitemap & robots', descriere: 'Indexare curată, fără pagini orfane.' },
        { icon: '🏷️', titlu: 'Schema.org', descriere: 'Product, LocalBusiness, FAQ, Breadcrumb. Rich snippets.' },
        { icon: '📝', titlu: 'Conținut optimizat', descriere: 'Fără keyword stuffing. Copy care vinde și rank-uiește.' },
        { icon: '🏢', titlu: 'Google Business Profile', descriere: 'Apari în Map Pack. Recenzii, foto, postări.' },
        { icon: '🔗', titlu: 'Link building RO', descriere: 'Guest post, presă, directorii. Link-uri albe.' },
        { icon: '🌐', titlu: 'Hreflang multi-regiune', descriere: '.ro / .md / .fr fără conținut duplicat.' },
        { icon: '📊', titlu: 'Search Console', descriere: 'Monitorizare indexare, erori crawl, performanță.' },
        { icon: '📈', titlu: 'Rapoarte lunare', descriere: 'Poziții, trafic, lead-uri. Nimic ascuns.' },
        { icon: '🎯', titlu: 'Long-tail keywords', descriere: 'Căutări specifice cu conversie mare.' },
        { icon: '🤖', titlu: 'AI & GEO (generativ)', descriere: 'Optimizare pentru AI Overviews, ChatGPT, Perplexity.' },
      ],

      integrari: [
        { eticheta: 'Cercetare', elemente: 'Google Keyword Planner, Ahrefs, Semrush, Ubersuggest' },
        { eticheta: 'Tehnic', elemente: 'Google Search Console, PageSpeed Insights, Screaming Frog, Sitebulb' },
        { eticheta: 'Conținut', elemente: 'Google Trends, AnswerThePublic, Surfer SEO' },
        { eticheta: 'Analytics', elemente: 'Google Analytics 4, Google Tag Manager, Microsoft Clarity' },
        { eticheta: 'Local', elemente: 'Google Business Profile, Google Maps, Waze Places' },
        { eticheta: 'Link building', elemente: 'Ahrefs, Majestic, HARO, Connectively' },
        { eticheta: 'Generativ/AI', elemente: 'Google AI Overviews, ChatGPT, Perplexity, Bing Copilot' },
      ],

      preturi: [
        { nume: 'SEO Starter', pret: '€200/lună', include: 'Audit complet, optimizare on-page, 4 articole/lună, raport lunar' },
        { nume: 'SEO Growth', pret: '€400/lună', include: '+ link building RO, Google Business Profile, long-tail, 8 articole/lună' },
        { nume: 'SEO Competitive', pret: '€600/lună', include: 'Nișe competitive (imobiliare, avocatură, financiar), link building agresiv, 12 articole/lună' },
      ],

      faq: [
        { intrebare: 'În cât timp văd rezultate?', raspuns: 'Primele mișcări de poziție: 4–8 săptămâni. Rezultate consistente (top 10): 3–6 luni. Top 3 pe cuvinte competitive: 6–12 luni. SEO e maraton, nu sprint — cine îți promite altceva minte.' },
        { intrebare: 'Ce garanție aveți?', raspuns: 'Nu garantăm poziția #1 (nimeni nu poate, doar Google decide). Garantăm execuția integrală a strategiei, transparența rapoartelor și ajustarea continuă pe baza datelor. Garantăm că nu folosim tehnici care te penalizează.' },
        { intrebare: 'Trebuie să apar articole pe blog?', raspuns: 'Da, dacă vrei trafic organic consistent. Fără conținut proaspăt pe cuvinte-cheie, site-ul stagnează. 4–12 articole/lună, în funcție de pachet, pe subiecte cu volum de căutare real.' },
        { intrebare: 'Folosiți conținut generat de AI?', raspuns: 'Parțial. AI-ul generează prime drafturi, un editor uman le rafinează, adaugă expertiză, verifică faptele. Conținut 100% AI fără editare umană e detectat de Google și penalizat. Noi nu livrăm așa ceva.' },
        { intrebare: 'Faceți link building?', raspuns: 'Da, dar doar link-uri albe: guest post pe bloguri RO, presă locală, directorii de nișă, HARO. Zero PBN, zero spam, zero link-uri cumpărate. Fiecare link cu anchor natural, de pe site-uri cu autoritate reală.' },
        { intrebare: 'Ce e Google Business Profile și de ce contează?', raspuns: 'E listingul tău gratuit pe Google Maps. Pentru servicii locale (clinici, saloane, avocați, restaurante), e sursa #1 de clienți noi. Optimizat corect, te pune în „Map Pack” (cele 3 firme de sus cu hartă).' },
        { intrebare: 'Site-ul meu e pe WordPress / Shopify / custom. Se poate optimiza?', raspuns: 'Da, orice platformă. SEO tehnic diferă puțin (plugin-uri pe WP, apps pe Shopify, cod pe custom), dar principiile sunt identice. Am optimizat site-uri pe toate platformele.' },
        { intrebare: 'Cât costă SEO pe cuvinte competitive?', raspuns: 'Pentru nișe precum imobiliare, avocatură, financiar, asigurări: 400–600 €/lună. Competiția e mare, volumul de conținut și link building necesar e mai mare, dar ROI-ul pe termen lung e semnificativ.' },
        { intrebare: 'Pot face SEO singur?', raspuns: 'Pentru cuvinte neconcurențiale, da — cu timp și învățare. Pentru cuvinte comerciale competitive, nu — AI-ii și concurența cu echipe dedicate câștigă. SEO e full-time job; mai bine plătești o echipă și te concentrezi pe afacere.' },
        { intrebare: 'Ce se întâmplă dacă opresc SEO după 6 luni?', raspuns: 'Pozițiile nu cad instant, dar scad gradual pe parcursul a 6–12 luni pe cuvintele competitive (concurenții continuă, tu nu). Pe long-tail și conținutul de calitate, pozițiile rămân mai mult. SEO e ca mersul la sală — continuitatea contează.' },
        { intrebare: 'Aveți experiență cu GEO/AI Overviews?', raspuns: 'Da. Optimizăm conținutul pentru a fi citat de AI Overviews, ChatGPT, Perplexity. Căutarea generativă crește, iar site-urile care oferă răspunsuri clare, structurate, cu E-E-A-T, vor fi citate. E noua frontieră SEO.' },
        { intrebare: 'Oferiți audit SEO gratuit?', raspuns: 'Da, un mini-audit (30 min, 10 puncte cheie) la primul call. Audit complet cu plan de acțiune detaliat: inclus în pachetul de start sau contra cost (150 €) standalone.' },
      ],
    },
  })

  console.log('✅ Serviciu creat:', doc.id, '—', doc.titlu, '| slug:', doc.slug)
  process.exit(0)
}

main().catch((e) => { console.error('❌ Eroare:', e); process.exit(1) })
