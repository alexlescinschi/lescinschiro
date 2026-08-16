/* eslint-disable @typescript-eslint/no-explicit-any -- script one-off de import */
// Seed: 3 articole de blog SEO-aligned.
// ponytail: run once with `npx tsx --env-file=.env scripts/add-blog-seed.ts`
// Idempotent: skip pe slug existent. Toate primesc _status: 'published'.
import { getPayload } from 'payload'
import config from '../payload.config'

type Block = ['h2' | 'h3' | 'p' | 'ul', string | string[]]
function lexical(blocks: Block[]) {
  return {
    root: {
      children: blocks.map(([type, content]) => {
        const node: any = { direction: 'ltr', format: '', indent: 0, version: 1 }
        if (type === 'h2' || type === 'h3') {
          node.type = 'heading'
          node.tag = type
          node.children = [{ detail: 0, format: 0, mode: 'normal', style: '', text: content as string, type: 'text', version: 1 }]
        } else if (type === 'p') {
          node.type = 'paragraph'
          node.textFormat = 0
          node.textStyle = ''
          node.children = [{ detail: 0, format: 0, mode: 'normal', style: '', text: content as string, type: 'text', version: 1 }]
        } else if (type === 'ul') {
          node.type = 'list'
          node.tag = 'ul'
          node.listType = 'bullet'
          node.start = 1
          node.children = (content as string[]).map((text) => ({
            type: 'listitem',
            value: 1,
            children: [{
              type: 'text',
              detail: 0, format: 0, mode: 'normal', style: '', text, version: 1,
              direction: 'ltr', indent: 0,
            }],
            direction: 'ltr', format: '', indent: 0, version: 1,
          }))
        }
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

// Cover images: reuse din public/work/ (id 1=p01.png, 2=p01-1.png, 3=svc-mag.png, 4=svc-mag-1.png)
// ponytail: temporar; schimbi cover din admin pentru fiecare articol.
const COVER_MEGA = 1
const COVER_SEO = 2
const COVER_DESIGN = 3

const ARTICOLE = [
  {
    titlu: 'Cât costă un magazin online în România în 2026',
    slug: 'cat-costa-magazin-online-romania-2026',
    categorie: 'magazin-online',
    excerpt: 'Prețul real al unui magazin online în România pornește de la 800€ pentru o variantă de bază și poate ajunge la 3.000€+ pentru soluții enterprise. Vezi ce primești la fiecare buget.',
    autor: 'Alex Lescinschi',
    coverImage: COVER_MEGA,
    continut: lexical([
      ['p', '„Cât costă un magazin online?" — e prima întrebare pe care o primim de la orice client care vrea să vândă online. Răspunsul corect nu e un număr, ci o plajă: între 800 € și 3.000+ €, în funcție de ce anume ai nevoie. Hai să descompunem exact ce primești la fiecare buget.'],
      ['h2', 'Ce determină prețul unui magazin online'],
      ['p', 'Patru factori principali dictează costul final. Înțelegându-i, poți decide unde merită să investești și unde poți taia din buget.'],
      ['ul', [
        'Numărul de produse și complexitatea catalogului (10 produse vs 10.000 cu variante de mărime/culoare)',
        'Integrările necesare: plăți online, curierat, facturare, ERP, marketplace eMAG',
        'Designul: temă adaptată (mai ieftin) sau design 100% custom (mai scump)',
        'Migrarea de pe o platformă existentă (WordPress, OpenCart, platformă veche)',
      ]],
      ['h2', 'Plaja de prețuri pe 2026'],
      ['h3', '800 € — Magazin de bază'],
      ['p', 'Catalog de produse, coș de cumpărături, checkout, o integrare de plăți (Netopia sau PayU), un curier (FAN Courier), panou de administrare, SEO de bază. Potrivit pentru un magazin care pornește cu sub 100 de produse și vrea să valideze piața.'],
      ['h3', '1.500 € — Magazin avansat'],
      ['p', 'Toate cele de la pachetul de bază, plus: integrare cu ERP/SmartBill pentru facturare automată, multi-limbă și multi-monede (RON + EUR), email-uri pentru coș abandonat, analytics avansat (GA4 + tracking evenimente), optimizare SEO pe paginile de categorie.'],
      ['h3', '3.000+ € — Soluție enterprise'],
      ['p', 'Integrare eMAG Marketplace (produse, stoc, comenzi sincronizate), recomandări AI pe produse, prețuri B2B pe client, integrări custom nelimitate (API-uri bancare, CRM, warehouse). Pentru magazine cu volume mari sau modele de business complexe.'],
      ['h2', 'Costuri recurente pe care trebuie să le știi'],
      ['p', 'Prețul de construcție e doar începutul. Un magazin online are costuri lunare care nu dispar:'],
      ['ul', [
        'Hosting + domeniu: 10–30 €/lună (Railway/VPS + domeniu .ro)',
        'Mentenanță (backup, actualizări, suport): 30–150 €/lună',
        'Comision procesator de plăți: 1.4–2% per tranzacție (îl plătești Netopia/PayU/Stripe)',
        'SEO (opțional, dar recomandat): 200–600 €/lună pentru rezultate reale',
      ]],
      ['h2', 'Hidden costs: atenție la oferte „prea bune"'],
      ['p', 'Dacă cineva îți oferă „magazin online complet la 200 €", întreabă-te ce nu primești. De obicei: temă gratuită generică, fără integrări reale, fără SEO, fără suport după lansare. După 3 luni vei avea nevoie de o reconstrucție care te va costa mai mult decât un magazin serios de la start.'],
      ['p', 'De asemenea, atenție la abonamentele platformelor SaaS: Shopify începe de la 30 €/lună, dar cu plugin-uri și comisioane poți ajunge rapid la 100–200 €/lună. Pe termen lung (2+ ani), un magazin custom sau WooCommerce poate fi mai ieftin.'],
      ['h2', 'Cum obții o ofertă fixă'],
      ['p', 'Regula noastră: niciun preț fără brief. Ne spui ce vinzi, câte produse, ce integrări vrei, pe ce piață (RO, MD, internațional) — iar în 24–48 de ore primești o ofertă fixă, scrisă, fără costuri ascunse. Prețul pe care-l semnezi e prețul pe care-l plătești.'],
      ['p', 'Vrei să știi exact cât te costă magazinul tău? Scrie-ne pe WhatsApp sau email și discutăm. Consultația inițială e gratuită.'],
    ]),
  },
  {
    titlu: 'WooCommerce vs Shopify vs Custom: ce alegi pentru magazinul tău',
    slug: 'woocommerce-vs-shopify-vs-custom',
    categorie: 'magazin-online',
    excerpt: 'WooCommerce, Shopify sau magazin custom construit în Next.js? Fiecare are avantaje și scenarii unde strălucește. Află care e alegerea potrivită pentru afacerea ta.',
    autor: 'Alex Lescinschi',
    coverImage: COVER_DESIGN,
    continut: lexical([
      ['p', '„Pe ce platformă îmi fac magazinul?" — a doua cea mai frecventă întrebare după cea despre preț. Răspunsul standard „depinde" e sincer, dar nu te ajută. Hai să-ți dau un răspuns concret: când are sens fiecare opțiune.'],
      ['h2', 'WooCommerce — control total, costuri mici lunare'],
      ['p', 'WooCommerce e un plugin de WordPress care transformă un site într-un magazin. E cea mai folosită platformă de eCommerce din lume (peste 23% din magazinele online).'],
      ['h3', 'Când alegi WooCommerce'],
      ['ul', [
        'Vrei control total asupra codului și datelor (totul e al tău)',
        'Buget mediu (800–1.500 € construcție, 10–30 €/lună hosting)',
        'Ai nevoie de integrări locale: Netopia mobilPay, FAN Courier, SmartBill, eMAG',
        'Vrei SEO tehnic puternic (cu Yoast/Rank Math)',
        'Catalog mediu sau mare (100–10.000+ produse)',
      ]],
      ['h3', 'Dezavantaje WooCommerce'],
      ['p', 'Necesită mentenanță (actualizări de plugin-uri, securitate). Performance poate fi o problemă fără caching. Pentru magazine cu 50.000+ produse sau volume uriașe de trafic, devine lent.'],
      ['h2', 'Shopify — cel mai rapid drum la prima vânzare'],
      ['p', 'Shopify e platformă SaaS hosted — tu plătești abonament, ei se ocupă de servere, SSL, securitate, update-uri. Începi să vinzi în zile, nu în săptămâni.'],
      ['h3', 'Când alegi Shopify'],
      ['ul', [
        'Vrei să lansezi rapid (1–2 săptămâni)',
        'Dropshipping sau magazine mici/medii',
        'Nu vrei să te atingi de servere, securitate, backup',
        'Buget flexibil (accepti abonament 30–200 €/lună)',
        'Public internațional (Shopify e strong în US/EU)',
      ]],
      ['h3', 'Dezavantaje Shopify'],
      ['p', 'Comisioane tranzacție pe lângă abonament (dacă nu folosești Shopify Payments). Integrările locale RO/MD sunt limitate — Netopia și FAN Courier există, dar nu la fel de mature ca pe WooCommerce. Pentru funcții custom, developerii Shopify sunt scumpi (150–200€/oră).'],
      ['h2', 'Custom (Next.js + Payload + Postgres) — fără limite'],
      ['p', 'Magazin construit 100% pe cod, pe stack modern. Fără constrângeri de platformă, fără „nu se poate fără un plugin de 50€/lună".'],
      ['h3', 'Când alegi Custom'],
      ['ul', [
        'Ai funcții pe care nici o platformă nu le oferă out-of-the-box',
        'Vrei viteză maximă (Core Web Vitals verde pentru SEO)',
        'Catalog masiv (10.000+ produse) sau logică complexă (B2B, marketplace)',
        'Integrări adânci cu ERP, CRM, sisteme proprietare',
        'Vrei design 100% unic, nu o temă',
      ]],
      ['h3', 'Dezavantaje Custom'],
      ['p', 'Cost inițial mai mare (1.500–3.000+ €). Necesită developer pentru orice modificare majoră. Mentenanță tehnică lunară obligatorie.'],
      ['h2', 'Tabel comparativ rapid'],
      ['ul', [
        'Cost inițial: WooCommerce 800–1.500 € · Shopify 500–1.000 € · Custom 1.500–3.000+ €',
        'Cost lunar: WooCommerce 10–30 € · Shopify 30–200 € · Custom 30–150 € (mentenanță)',
        'Timp lansare: WooCommerce 3–5 săptămâni · Shopify 1–2 săptămâni · Custom 4–8 săptămâni',
        'Control: WooCommerce maxim · Shopify limitat · Custom total',
        'Viteză: WooCommerce medie · Shopify bună · Custom maximă',
      ]],
      ['h2', 'Recomandarea noastră'],
      ['p', 'Nu vindem o singură platformă. La brief îți recomandăm gratuit pe cea potrivită pentru cazul tău concret — chiar dacă nu semnezi cu noi. Cea mai mare greșeală e să alegi după preț sau după ce auzi la o reclamă. Alegi după ce vinzi, cui și cu ce plan de creștere.'],
    ]),
  },
  {
    titlu: 'SEO pentru magazin online în România: ghid complet 2026',
    slug: 'seo-magazin-online-romania-ghid-2026',
    categorie: 'seo',
    excerpt: 'SEO pentru magazin online în România: optimizare tehnică, cercetare cuvinte-cheie, conținut, link building RO, Google Shopping. Tot ce trebuie pentru a ajunge pe prima pagină Google.',
    autor: 'Alex Lescinschi',
    coverImage: COVER_SEO,
    continut: lexical([
      ['p', 'Un magazin online fără SEO e ca un magazin fizic într-o stradă fără indicatoare. Poate ai cele mai bune produse, dar nimeni nu te găsește. În România, SEO bine făcut poate aduce 60–80% din traficul organic al unui magazin. Hai să vedem exact cum.'],
      ['h2', '1. SEO tehnic — fundația'],
      ['p', 'Fără site rapid și crawlable, orice altce e risipă. Google prioritizează site-urile care încarcă rapid și funcționează impecabil pe mobil.'],
      ['ul', [
        'Core Web Vitals: LCP sub 2.5s, INP sub 200ms, CLS sub 0.1',
        'Mobile-first: site-ul trebuie să fie excelent pe mobil, nu doar „responsive"',
        'Sitemap.xml curat, trimis în Google Search Console',
        'Robots.txt configurat corect (nu bloca pagini importante)',
        'Schema.org: Product, Offer, BreadcrumbList, FAQ — rich snippets în Google',
      ]],
      ['h2', '2. Cercetare cuvinte-cheie în limba română'],
      ['p', 'Nu traduci liste din engleză. Cercetezi ce caută efectiv românii. Diferența dintre intenția informațională („ce e un magazin online") și cea comercială („magazin online pret") e totul.'],
      ['ul', [
        'Head terms: „magazin online", „creare site" (volum mare, competiție mare)',
        'Long-tail: „magazin online produse naturiste", „site prezentare clinica" (volum mic, conversie mare)',
        'Local: „magazin online + [oraș]", „[produs] + București"',
        'Căutări comerciale: „[produs] pret", „[produs] ieftin", „[produs] reducere"',
      ]],
      ['h2', '3. Optimizarea paginilor de produs'],
      ['p', 'Fiecare pagină de produs e o șansă de a rank-ui pe un cuvânt-cheie. Majoritatea magazinelor pierd această oportunitate prin conținut duplicat (descrieri de la furnizor) sau lipsă descriere.'],
      ['ul', [
        'Titlu unic, optimizat (60–70 caractere, cu cuvântul-cheie principal)',
        'Meta description care să determine click-ul (150–160 caractere)',
        'Descriere unică, 300+ cuvinte, cu specificatii tehnice și beneficii',
        'Imagini optimizate (WebP, cu alt descriptiv, dimensiuni corecte)',
        'Recenzii clienți (generează conținut proaspăt, crește încrederea)',
        'Schema Product + Offer (arată prețul direct în Google)',
      ]],
      ['h2', '4. Conținut de blog pe long-tail'],
      ['p', 'Blogul e motorul SEO al unui magazin. Articole pe long-tail aduc trafic pe căutări pe care paginile de produs nu le pot targeta.'],
      ['ul', [
        '„Cum aleg [produs]" — ghiduri de cumpărare',
        '„[produs A] vs [produs B]" — comparații',
        '„Cele mai bune [categorie] în 2026" — liste',
        '„[Problemă comună]: cum o rezolvi cu [produsul tău]"',
      ]],
      ['p', 'Frecvența ideală: 2–4 articole/lună, 800–1500 cuvinte fiecare, optimizate pe un cuvânt-cheie principal + 3–5 secundare. Calitatea bate cantitatea — un articol bun valorează cât 10 mediocre.'],
      ['h2', '5. Link building din surse româenești'],
      ['p', 'Link-urile rămân un top-3 factor de ranking. Dar atenție: nu orice link e bun. 10 link-uri de calitate din surse relevante valorează mai mult decât 1000 de link-uri spam.'],
      ['ul', [
        'Guest post pe bloguri RO din nișa ta',
        'Presă locală și națională (comunicate, interviuri)',
        'Directorii de firmă (TotalBusiness, ListaFirme)',
        'Parteneriate cu branduri complementare',
        'HARO / Connectively — răspunzi la întrebări de jurnaliști',
      ]],
      ['h2', '6. Google Shopping & Merchant Center'],
      ['p', 'Pentru magazine, Google Shopping e sursa #1 de trafic calificat după SEO organic. Produsele tale apar cu imagine, preț și nume magazin direct în Google.'],
      ['ul', [
        'Creezi cont Google Merchant Center (gratuit)',
        'Generezi feed de produse (XML sau prin plugin)',
        'Optimizezi titluri, descrieri, imagini pentru Shopping',
        'Poți combina cu Google Ads pentru vizibilitate plătită',
      ]],
      ['h2', 'Cât costă SEO pentru magazin online'],
      ['p', 'Un pachet serios pornește de la 200 €/lună și merge până la 600 €/lună pentru nișe competitive (imobiliare, fashion, electronic). Include: optimizare tehnică, 4–12 articole/lună, link building, rapoarte lunare. Rezultate consistente: 3–6 luni. Top 3 pe cuvinte competitive: 6–12 luni.'],
      ['p', 'SEO e maraton, nu sprint. Dar e cea mai ieftină sursă de trafic calificat pe termen lung — plătești o dată, poziția rămâne.'],
    ]),
  },
]

async function main() {
  const payload = await getPayload({ config })

  // Verifică câte media există — dacă e prea puține, folosește prima disponibilă
  const media = await payload.find({ collection: 'media', limit: 10, depth: 0 })
  console.log(`ℹ️  Media disponibile: ${media.docs.length}`)
  if (media.docs.length === 0) {
    console.error('❌ Nu există nicio imagine în media. Rulează mai întâi seed-ul principal.')
    process.exit(1)
  }
  const getCover = (id: number) => {
    const found = media.docs.find((m: any) => Number(m.id) === id)
    return found ? Number(found.id) : Number((media.docs[0] as any).id)
  }

  // Snapshot existenți
  const existente = await payload.find({ collection: 'blog', limit: 100, depth: 0 })
  const sluguriExistente = new Set(existente.docs.map((p: any) => p.slug))
  console.log(`ℹ️  Articole existente: ${existente.docs.length}`)

  let inserate = 0
  for (const art of ARTICOLE) {
    if (sluguriExistente.has(art.slug)) {
      console.log(`⏭️  Skip "${art.titlu}" (slug există)`)
      continue
    }

    const doc = await payload.create({
      collection: 'blog',
      data: {
        titlu: art.titlu,
        slug: art.slug,
        categorie: art.categorie,
        excerpt: art.excerpt,
        autor: art.autor,
        publicatLa: new Date().toISOString(),
        coverImage: getCover(art.coverImage),
        continut: art.continut,
        _status: 'published',
      } as any,
    })

    console.log(`✅ [${doc.id}] ${art.titlu} (${art.categorie})`)
    inserate++
  }

  console.log(`\nDone: ${inserate} articole inserate.`)
  process.exit(0)
}

main().catch((e) => { console.error('❌ Eroare:', e); process.exit(1) })
