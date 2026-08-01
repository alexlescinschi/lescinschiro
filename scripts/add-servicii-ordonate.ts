// Insert: 4 servicii de bază lipsă + setare ordine 1–14 pentru toate serviciile.
// Rulare: NODE_ENV=production + DATABASE_URI (tunel) — vezi istoricul sesiunii.
// Idempotent: skip pe slug existent; ordinea se resetează la fiecare rulare.
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

const IMAGINE_ID = 1

// ordine: 1-14 (13 rânduri home + Montare ca rând 14)
const ORDINE: Record<string, number> = {
  'creare-site-uri': 1,
  'magazine-online': 2,
  'landing-page-uri': 3,
  'site-uri-corporative': 4,
  'integrari-plati-online': 5,
  'integrari-curierat': 6,
  'integrari-api': 7,
  'seo-romania': 8,
  'ai-automatizari': 9,
  'social-media-management': 10,
  'reclame-google-ads': 11,
  'reclame-meta': 12,
  'filmari-video': 13,
  'montare-post-productie-video': 14,
}

const NOI: {
  slug: string
  titlu: string
  descriereScurta: string
  heroTitlu: string
  heroSubtitlu: string
  pret: string
  deliverables: string
  continut: Block[]
  tipuri: { titlu: string; subtitlu?: string; descriere: string; logouri?: string }[]
  features: { icon: string; titlu: string; descriere: string }[]
  integrari: { eticheta: string; elemente: string }[]
  preturi: { nume: string; pret: string; include: string }[]
  faq: { intrebare: string; raspuns: string }[]
}[] = [
  {
    slug: 'creare-site-uri',
    titlu: 'Creare site-uri',
    descriereScurta: 'Creăm site-uri de prezentare rapide, moderne și optimizate Google: landing, afaceri locale, avocați, clinici, restaurante. Design pe brandul tău, predare pe GitHub.',
    heroTitlu: 'Site-uri care CONVERTESC',
    heroSubtitlu: 'Landing-uri și site-uri de prezentare, rapide, moderne, optimizate pentru Google. Design pe brandul tău, text bine scris, machetă aprobată înainte de cod.',
    heroCuvantInel: 'CONVERTESC',
    pret: '400–1.500€',
    deliverables: 'Machetă aprobată înainte de cod, Site optimizat SEO, Codul tău pe GitHub, Formular contact + WhatsApp, Mentenanță lunară',
    continut: lexical([
      ['h2', 'Un site nu e „un șablon instalat”. E prima impresie a afacerii tale'],
      ['p', '90% dintre vizitatori judecă un site în sub 5 secunde. Dacă arată vechi, e lent sau nu se deschide pe telefon, pleacă la concurență. Noi construim site-uri care arată bine peste tot, se încarcă rapid și explică clar ce faci, în 2 minute.'],
      ['p', 'Lucrăm pe brandul tău: culori, fonturi, tone de voce. Nu copiem un template și îl umplem cu text — discutăm, propunem structură și text, facem machetă înainte să scriem o linie de cod. Aprobarea machetei înseamnă că știi exact ce primești înainte să plătești tot.'],
      ['h2', 'Ce primești la un site de prezentare'],
      ['p', 'Pagini: acasă, servicii, despre, contact + blog opțional. Formular de contact care trimite pe email și pe WhatsApp. Harta, program, recenzii Google. Secțiuni de recenzii, întrebări frecvente, portofoliu. Design responsive: mobil, tabletă, desktop.'],
      ['p', 'Text scris pentru vânzare, nu pentru completare: titluri clare, beneficii, apel la acțiune vizibil. SEO de bază: titlu, descriere, structură, viteza de încărcare peste 90/100 pe PageSpeed.'],
      ['h2', 'Cât de repede e gata?'],
      ['p', 'Site de prezentare: 2–3 săptămâni de la machetă aprobată. Landing page: 1–2 săptămâni. Primești staging public — poți urmări progresul live, nu pe promisiuni.'],
    ]),
    tipuri: [
      { titlu: 'Site de prezentare', subtitlu: '5–8 pagini', descriere: 'Acasă, servicii, despre, contact, blog. Pentru afaceri care au nevoie de prezență serioasă.', logouri: 'Next.js, Payload CMS' },
      { titlu: 'Landing page', subtitlu: '1 pagină, 1 obiectiv', descriere: 'Conversie maximă pentru o campanie: curs, serviciu, eveniment, ofertă.', logouri: 'Next.js, GSAP' },
      { titlu: 'Site de firmă', subtitlu: 'Avocați, clinici, firme', descriere: 'Structură clară, autoritate, programări online, recenzii.', logouri: 'Next.js, Payload CMS' },
      { titlu: 'Restaurant & local', subtitlu: 'Meniu + rezervări', descriere: 'Meniu vizual, program, hartă, rezervare pe WhatsApp.', logouri: 'Next.js' },
    ],
    features: [
      { icon: '⚡', titlu: 'Viteză peste 90', descriere: 'PageSpeed 90+, Core Web Vitals verzi.' },
      { icon: '📱', titlu: 'Perfect pe mobil', descriere: 'Design adaptiv, butoane mari, text citibil.' },
      { icon: '🔍', titlu: 'SEO de bază', descriere: 'Titluri, descrieri, structură, sitemap.' },
      { icon: '✍️', titlu: 'Text pentru vânzare', descriere: 'Copy scris pentru conversie, nu completat.' },
      { icon: '💬', titlu: 'WhatsApp integrat', descriere: 'Buton WhatsApp — cea mai folosită cale de contact.' },
      { icon: '📈', titlu: 'Google Analytics', descriere: 'Măsurăm vizitele și conversiile din prima zi.' },
      { icon: '🗺️', titlu: 'SEO local', descriere: 'Google Business Profile conectat, recenzii.' },
      { icon: '🔒', titlu: 'HTTPS + hosting', descriere: 'Găzduire rapidă, certificat SSL inclus.' },
    ],
    integrari: [
      { eticheta: 'Formulare', elemente: 'Email, WhatsApp, Google Sheets, SmartBill' },
      { eticheta: 'Analytics', elemente: 'Google Analytics 4, Meta Pixel, Search Console' },
      { eticheta: 'Programări', elemente: 'Calendly, Cal.com, rezervare pe WhatsApp' },
      { eticheta: 'Chat', elemente: 'WhatsApp Business, Chatbot AI' },
      { eticheta: 'CMS', elemente: 'Payload (editezi tu textul), sau static pur' },
    ],
    preturi: [
      { nume: 'Landing page', pret: '€400–700', include: '1 pagină, machetă, copy, SEO, hosting, WhatsApp' },
      { nume: 'Site de prezentare', pret: '€700–1.200', include: '5–8 pagini, CMS, blog opțional, SEO, hosting' },
      { nume: 'Site de firmă', pret: '€1.200–1.500', include: 'Structură complexă, programări, multi-limbă, recenzii' },
    ],
    faq: [
      { intrebare: 'Cât durează un site de prezentare?', raspuns: '2–3 săptămâni de la aprobarea machetei. Landing page: 1–2 săptămâni. Primești staging live ca să urmărești progresul.' },
      { intrebare: 'Pot să editez textul singur după predare?', raspuns: 'Da. Construim cu un CMS ușor (Payload) unde editezi textele, articolele și pozele fără programator. Dacă vrei static pur, îți facem modificările noi.' },
      { intrebare: 'Include hosting-ul?', raspuns: 'Da, primul an e inclus la toate pachetele. După, e ~30–60€/an, plătit direct de tine către furnizor — fără comisioane ascunse.' },
      { intrebare: 'Site-ul apare pe Google?', raspuns: 'Da. Optimizăm tehnic (viteză, structură, sitemap, meta) și te conectăm cu Google Search Console + Business Profile. Pentru poziții pe cuvinte grele, vezi serviciul SEO.' },
    ],
  },
  {
    slug: 'magazine-online',
    titlu: 'Magazine online',
    descriereScurta: 'Construim magazine online gata de vânzare: catalog, coș, checkout, plăți Netopia/PayU/Stripe, curierat FAN/Cargus/Sameday, facturare SmartBill. Predare pe GitHub.',
    heroTitlu: 'Magazin online care VINDE',
    heroSubtitlu: 'Catalog, coș, checkout, plăți (Netopia, PayU, Stripe), curierat (FAN, Cargus, Sameday), facturare (SmartBill). Totul integrat, testat, gata de vânzare.',
    heroCuvantInel: 'VINDE',
    pret: '800–3.500€',
    deliverables: 'Machetă aprobată, Plăți + curierat + facturare integrate, Import produse, Codul tău pe GitHub, Training + suport',
    continut: lexical([
      ['h2', 'Un magazin online nu e un plugin. E o mașină de vânzări'],
      ['p', 'Shopify și WooCommerce promit „gata în weekend”, dar după un an plătești lunar 100+€, rămâi blocat cu pluginuri care se bat cap în cap și nu poți scoate datele. Noi construim magazine custom, rapide, pe care le controlezi 100% — codul e al tău, pe GitHub.'],
      ['p', 'Fiecare magazin e conectat la ce ai tu nevoie: plăți românești (Netopia, PayU, Stripe, Revolut), curierat (FAN Courier, Cargus, Sameday, DPD), facturare (SmartBill, Oblio), eMAG Marketplace, ERP. Clientul face click, restul merge singur.'],
      ['h2', 'Ce face un magazin gata de vânzare'],
      ['p', 'Catalog cu filtre și căutare instantă, pagină de produs care vinde (galerie, variații, stoc, livrare), coș cu upsell inteligent, checkout rapid cu plăți 3D Secure, cont client cu istoric, email-uri automate (comandă, livrare, abandoned cart).'],
      ['p', 'Speed: magazinele noastre se încarcă sub 1 secundă — Google iubește asta, clienții la fel. Mobil perfect: 70%+ din comenzi vin de pe telefon. Viteza nu e un moft, e un factor de conversie.'],
      ['h2', 'Import și produse'],
      ['p', 'Dacă ai deja un catalog (Excel, CSV sau alt magazin), îl migrăm: produse, poze, categorii, prețuri, stoc. Peste 1.000 de produse nu e o problemă, ci o rutină pentru noi.'],
    ]),
    tipuri: [
      { titlu: 'Magazin custom', subtitlu: 'Next.js + Payload', descriere: 'Rapid, scalabil, codul tău. Pentru magazine serioase care cresc.', logouri: 'Next.js, Payload, Postgres' },
      { titlu: 'Magazin WooCommerce', subtitlu: 'Migrare sau optimizare', descriere: 'Dacă ai deja WooCommerce, îl facem rapid, securizat, cu plăți și curierat.', logouri: 'WooCommerce, PHP' },
      { titlu: 'Magazin Shopify', subtitlu: 'Lansare rapidă', descriere: 'Start rapid, temă customizată, integrări România (plăți, AWB).', logouri: 'Shopify, Liquid' },
      { titlu: 'Marketplace eMAG', subtitlu: 'Catalog sincronizat', descriere: 'Sincronizare produse/stoc/comenzi între site și eMAG.', logouri: 'eMAG Marketplace API' },
    ],
    features: [
      { icon: '💳', titlu: 'Plăți românești', descriere: 'Netopia, PayU, Stripe, Revolut, rate 3D Secure.' },
      { icon: '📦', titlu: 'Curierat integrat', descriere: 'FAN Courier, Cargus, Sameday, DPD. AWB automat.' },
      { icon: '🧾', titlu: 'Facturare', descriere: 'SmartBill / Oblio la fiecare comandă.' },
      { icon: '⚡', titlu: 'Viteză sub 1s', descriere: 'Magazin rapid, indexat excelent de Google.' },
      { icon: '📱', titlu: 'Mobil perfect', descriere: '70%+ din comenzi vin de pe telefon.' },
      { icon: '🔔', titlu: 'Email-uri automate', descriere: 'Confirmare, livrare, abandoned cart, follow-up.' },
      { icon: '🔄', titlu: 'Stoc & ERP', descriere: 'Sincronizare cu stocul tău, automat sau manual.' },
      { icon: '🛒', titlu: 'eMAG Marketplace', descriere: 'Catalog sincronizat, comenzi centralizate.' },
      { icon: '📊', titlu: 'Rapoarte', descriere: 'Vânzări, produse, clienți, ROI campanii.' },
      { icon: '🔒', titlu: 'Securitate', descriere: '3D Secure, GDPR, backup zilnic, monitorizare.' },
    ],
    integrari: [
      { eticheta: 'Plăți', elemente: 'Netopia, PayU, Stripe, PayPal, Revolut' },
      { eticheta: 'Curierat', elemente: 'FAN Courier, Cargus, Sameday, DPD, Nova Poshta' },
      { eticheta: 'Facturare', elemente: 'SmartBill, Oblio, e-Factura' },
      { eticheta: 'Marketplace', elemente: 'eMAG, Allegro, Cdiscount' },
      { eticheta: 'ERP / stoc', elemente: 'SAP, Epicor, Myne, mERP, custom API' },
      { eticheta: 'Email & CRM', elemente: 'Mailchimp, NewsMAN, HubSpot, Pipedrive' },
      { eticheta: 'Plăți la livrare', elemente: 'CARD la curier, numerar, ramburs' },
    ],
    preturi: [
      { nume: 'Magazin de start', pret: '€800–1.500', include: '200–500 produse, plăți, curierat, facturare, import catalog' },
      { nume: 'Magazin complet', pret: '€1.500–2.500', include: '1.000+ produse, filtre avansate, email-uri automate, eMAG' },
      { nume: 'Magazin enterprise', pret: '€2.500–3.500+', include: 'ERP, multi-magazin, marketplace-uri, automatizări AI' },
    ],
    faq: [
      { intrebare: 'De ce nu Shopify sau WooCommerce direct?', raspuns: 'Pentru un magazin simplu, sunt ok. Pentru un magazin care crește, îți iei abonament lunar, pluginuri scumpe și date blocate. Un magazin custom costă o singură dată, e rapid de 5–10x și codul e al tău, pe GitHub.' },
      { intrebare: 'Ce plăți acceptă clienții mei?', raspuns: 'Card (Visa, Mastercard), Apple/Google Pay, rate, transfer bancar, ramburs cu card la curier. Integrăm Netopia, PayU, Stripe sau procesatorul tău.' },
      { intrebare: 'Cum primesc comenzile?', raspuns: 'Automat: comandă → factură SmartBill → AWB curier → email client cu tracking → scădere stoc. Nu atingi nimic manual dacă nu vrei.' },
      { intrebare: 'Îmi mutați catalogul din magazinul vechi?', raspuns: 'Da. Migrăm produse, poze, categorii, prețuri, stoc și istoricul de comenzi din WooCommerce, Shopify sau din CSV/Excel.' },
      { intrebare: 'Cât durează?', raspuns: 'Magazin de start: 3–4 săptămâni. Magazin complet: 4–6 săptămâni. Enterprise: 6–10 săptămâni. Primești staging live pe parcurs.' },
    ],
  },
  {
    slug: 'landing-page-uri',
    titlu: 'Landing page-uri',
    descriereScurta: 'Landing page-uri cu un singur obiectiv: conversie. Viteză maximă, tracking pentru campanii, testare A/B. Pentru Google Ads, Meta Ads și campanii de lansare.',
    heroTitlu: 'Landing page-uri care CONVERTESC',
    heroSubtitlu: 'O pagină, un obiectiv: vânzarea sau lead-ul. Viteză maximă, tracking complet pentru campanii, testare A/B de la prima zi.',
    heroCuvantInel: 'CONVERTESC',
    pret: '400–900€',
    deliverables: 'Structură de conversie, Copy bazat pe date, Tracking (GA4 + Pixel), Viteză 95+, Testare A/B, Hosting inclus',
    continut: lexical([
      ['h2', 'O pagină. Un obiectiv. Zero distrageri'],
      ['p', 'Landing page-ul nu e o pagină „mai scurtă”. E o pagină construită pentru un singur lucru: conversia. Fiecare secțiune are un rol — să ducă vizitatorul mai aproape de buton. Fără meniuri, fără linkuri care distrag, fără „cui îi place”.'],
      ['p', 'Lucrăm cu structuri dovedite: promisiune clară, dovadă (recenzii, numere), ofertă, urgență, apel la acțiune repetat. Copy-ul scrie pe baza ofertei tale și a obiecțiilor reale ale clienților tăi.'],
      ['h2', 'Tracking care arată ce merge'],
      ['p', 'GA4 + Meta Pixel configurați din prima zi: evenimente de conversie, scroll depth, click-uri pe butoane, abandonare. Știi exact ce secțiune convinge și ce pagină primește click-uri — nu ghici.'],
      ['p', 'Pentru campanii plătite (Google Ads, Meta), paginile noastre se încarcă sub 0,8 secunde. Asta scade costul pe click (Quality Score) și crește conversia. În plus, testăm A/B titlurile și ofertele să îmbunătățim constant.'],
      ['h2', 'Cât costă și cât durează'],
      ['p', 'Landing page simplu: 400–600€, 7–10 zile. Landing cu animații, video sau integrări (formular → CRM, checkout): 600–900€, 2 săptămâni. Ofertă fixă după brief.'],
    ]),
    tipuri: [
      { titlu: 'Landing pentru Ads', subtitlu: 'Google / Meta', descriere: 'Pagină rapidă, aliniată cu textul reclamei, tracking complet.', logouri: 'GA4, Meta Pixel' },
      { titlu: 'Landing de vânzare', subtitlu: 'Ofertă unică', descriere: 'Produs, curs, serviciu. Structură de conversie, urgență, dovadă.', logouri: 'Next.js' },
      { titlu: 'Lead magnet', subtitlu: 'Formular + download', descriere: 'Captare lead-uri: formular, ebook, demo, cerere de ofertă.', logouri: 'HubSpot, Pipedrive' },
      { titlu: 'Landing multi-scop', subtitlu: 'A/B + variante', descriere: 'Aceeași ofertă, variante testate. Date în loc de păreri.', logouri: 'GA4, Vercel' },
    ],
    features: [
      { icon: '🎯', titlu: 'Un singur obiectiv', descriere: 'Fără meniuri, fără distrageri, fără linkuri.' },
      { icon: '⚡', titlu: 'Viteză sub 0.8s', descriere: 'Cost pe click mai mic, conversie mai mare.' },
      { icon: '📈', titlu: 'Tracking complet', descriere: 'GA4 + Pixel + evenimente de conversie.' },
      { icon: '✍️', titlu: 'Copy pe obiecții', descriere: 'Răspunde la întrebările reale ale clientului.' },
      { icon: '🧪', titlu: 'Testare A/B', descriere: 'Titluri și oferte testate, nu ghicite.' },
      { icon: '📱', titlu: 'Mobil perfect', descriere: '70%+ din trafic vine de pe telefon.' },
      { icon: '🔔', titlu: 'Retargeting gata', descriere: 'Pixel instalat pentru campanii de retargeting.' },
      { icon: '🤝', titlu: 'Conectat la CRM', descriere: 'Lead-urile ajung direct în CRM sau pe email.' },
    ],
    integrari: [
      { eticheta: 'Formulare', elemente: 'HubSpot, Pipedrive, Mailchimp, Google Sheets, Slack' },
      { eticheta: 'Plăți', elemente: 'Netopia, Stripe, PayPal — checkout direct pe pagină' },
      { eticheta: 'Tracking', elemente: 'GA4, Meta Pixel, TikTok Pixel, Hotjar, Clarity' },
      { eticheta: 'WhatsApp', elemente: 'WhatsApp Business — click-to-chat' },
      { eticheta: 'Calendar', elemente: 'Calendly, Cal.com — programare directă' },
    ],
    preturi: [
      { nume: 'Landing simplu', pret: '€400–600', include: '1 pagină, copy, tracking, hosting, 7–10 zile' },
      { nume: 'Landing premium', pret: '€600–900', include: 'Animații, video, integrări (CRM, plăți), A/B setup' },
    ],
    faq: [
      { intrebare: 'De ce un landing page separat, nu pagina de acasă?', raspuns: 'Pagina de acasă vorbește cu toată lumea despre tot. Landing-ul vorbește cu un singur tip de client despre un singur lucru. Traficul plătit către un landing relevant convertește de 2–3x mai bine și îți scade costul pe lead.' },
      { intrebare: 'Scrieți și textul?', raspuns: 'Da. Copy-ul face jumătate din conversie. Scriem pe baza ofertei și a obiecțiilor reale — dacă e nevoie, discutăm cu tine sau cu clienții tăi înainte.' },
      { intrebare: 'Cum măsurăm succesul?', raspuns: 'GA4 + Pixel cu evenimente de conversie din prima zi. Primești raport simplu: vizite, click-uri pe CTA, conversii, cost per lead. Și testăm A/B ca să îmbunătățim.' },
      { intrebare: 'Pentru ce campanii merge?', raspuns: 'Google Ads (Search, Shopping, Display), Meta Ads (Facebook, Instagram), TikTok, campanii de lansare, email, print cu QR. Orice trafic plătit sau organic care vrea o acțiune clară.' },
    ],
  },
  {
    slug: 'site-uri-corporative',
    titlu: 'Site-uri corporative',
    descriereScurta: 'Site-uri corporative profesionale pentru companii: prezență solidă, multilingv, structură clară, autoritate, SEO local și integrare cu echipele tale.',
    heroTitlu: 'Prezență profesională pe MĂSURA companiei tale',
    heroSubtitlu: 'Structură clară, multilingv, autoritate în industrie, SEO local. Site-uri care arată bine în fața clienților, partenerilor și investitorilor.',
    heroCuvantInel: 'MĂSURA',
    pret: '1.500–3.000€',
    deliverables: 'Audit + structură informațională, Multilingv (opțional), Intranet/extranet, Integrări (CRM, ERP, intranet), Codul tău pe GitHub',
    continut: lexical([
      ['h2', 'Un site corporativ e parte din brand, nu un proiect IT'],
      ['p', 'O companie serioasă nu se recomandă cu un site de prezentare simplu. Ai nevoie de structură: produse și servicii clare, divizii, cariere, presă, relații cu investitorii, multilingv. Arhitectura informațională e primul pas — cum navighează un vizitator ca să găsească ce caută în 20 de secunde.'],
      ['p', 'Lucrăm cu echipele interne: marketing, HR, IT. Integrăm CMS-ul cu fluxurile voastre — postări de blog, comunicate, cariere, formulare care ajung în CRM. Toți editează fără programator, cu roluri de permisiuni.'],
      ['h2', 'Multilingv și piețe multiple'],
      ['p', 'RO, EN, FR, RU sau orice combinație: structură i18n curată, URL-uri corecte (lescinschi.art/en/...), traducere gestionabilă din CMS, SEO per limbă. Pentru companii cu clienți în mai multe țări, e diferența dintre „site” și „prezență internațională”.'],
      ['h2', 'Ce include un proiect corporativ'],
      ['p', 'Audit al structurii actuale + propunere de arhitectură, design sistem pe brand (componente reutilizabile), pagini: acasă, despre, servicii/divizii, cariere, presă, contact, blog. SEO local pentru fiecare locație. Viteză și securitate enterprise: backup, monitorizare, uptime 99,9%.'],
    ]),
    tipuri: [
      { titlu: 'Corporativ standard', subtitlu: '5–10 pagini', descriere: 'Prezență solidă: acasă, despre, servicii, cariere, presă, contact.', logouri: 'Next.js, Payload CMS' },
      { titlu: 'Multilingv', subtitlu: '2–4 limbi', descriere: 'Structură i18n, SEO per limbă, traduceri din CMS.', logouri: 'Next.js, i18n' },
      { titlu: 'Extranet / intranet', subtitlu: 'Zonă de parteneri', descriere: 'Zonă logată pentru parteneri sau angajați: documente, rapoarte.', logouri: 'Next.js, Postgres' },
      { titlu: 'Corporate + platformă', subtitlu: 'Integrări complexe', descriere: 'CRM, ERP, portal clienți, cariere automatizate.', logouri: 'HubSpot, SAP, API custom' },
    ],
    features: [
      { icon: '🏛️', titlu: 'Arhitectură clară', descriere: 'Structură informațională gândită cu tine.' },
      { icon: '🌍', titlu: 'Multilingv', descriere: 'RO, EN, FR, RU — SEO separat per limbă.' },
      { icon: '🔐', titlu: 'Roluri & permisiuni', descriere: 'Fiecare echipă editează doar secțiunea ei.' },
      { icon: '📰', titlu: 'Comunicate & presă', descriere: 'Publicare ușoară, arhivă media, contact presă.' },
      { icon: '💼', titlu: 'Cariere', descriere: 'Joburi publicate, aplicări cu CV, integrare ATS.' },
      { icon: '📊', titlu: 'Rapoarte interne', descriere: 'Dashboard de administrare: trafic, conversii, leads.' },
      { icon: '🛡️', titlu: 'Securitate enterprise', descriere: 'SSL, backup zilnic, monitorizare 24/7, audit log.' },
      { icon: '⚡', titlu: 'Performanță', descriere: 'PageSpeed 90+, uptime 99,9%.' },
    ],
    integrari: [
      { eticheta: 'CRM', elemente: 'HubSpot, Salesforce, Pipedrive, Microsoft Dynamics' },
      { eticheta: 'HR / cariere', elemente: 'Jobvite, BambooHR, formular + ATS custom' },
      { eticheta: 'Autentificare', elemente: 'SSO, Azure AD, Google Workspace, Keycloak' },
      { eticheta: 'Comunicare', elemente: 'Slack, Teams, newsletter corporativ' },
      { eticheta: 'Media', elemente: 'Arhivă de presă, comunicate, imagini brand' },
    ],
    preturi: [
      { nume: 'Corporativ standard', pret: '€1.500–2.000', include: '5–10 pagini, CMS cu roluri, blog, SEO local, 4–6 săptămâni' },
      { nume: 'Multilingv', pret: '€2.000–2.500', include: '2–4 limbi, i18n, SEO per limbă, +1–2 săptămâni' },
      { nume: 'Platformă corporate', pret: '€2.500–3.000+', include: 'Extranet, CRM/ERP, cariere automatizate, suport dedicat' },
    ],
    faq: [
      { intrebare: 'Cine editează conținutul?', raspuns: 'Echipele voastre. CMS-ul are roluri: marketing editează blogul, HR editează carierele, admin-ul controlează tot. Fiecare vede doar secțiunile lui, fără programator.' },
      { intrebare: 'Luați în calcul brand-ul existent?', raspuns: 'Da. Plecăm de la ghidul vostru de brand (culori, fonturi, logo, tone of voice) și construim design system pe el. Dacă nu există ghid, propunem unul și îl aprobați înainte.' },
      { intrebare: 'Cât durează un proiect corporativ?', raspuns: 'Standard: 4–6 săptămâni. Multilingv: 6–8 săptămâni. Platformă cu integrări: 8–12 săptămâni. Dependează de viteza de feedback a echipei voastre.' },
      { intrebare: 'Ce se întâmplă după lansare?', raspuns: 'Prima lună include suport gratuit pentru ajustări. După, oferim mentenanță lunară (update-uri, backup, monitorizare, modificări mici) sau asistență la nevoie. Codul e al vostru, pe GitHub — nu sunteți blocați.' },
    ],
  },
]

async function main() {
  const payload = await getPayload({ config })

  let create = 0
  for (const s of NOI) {
    const existing = await payload.find({ collection: 'servicii', where: { slug: { equals: s.slug } }, limit: 1 })
    if (existing.docs.length) {
      console.log(`⏭️  Skip "${s.titlu}" (slug "${s.slug}" există)`)
      continue
    }
    await payload.create({
      collection: 'servicii',
      data: {
        titlu: s.titlu,
        slug: s.slug,
        categorie: s.slug === 'magazine-online' ? 'magazin-online' : '',
        imagine: IMAGINE_ID,
        descriereScurta: s.descriereScurta,
        heroTitlu: s.heroTitlu,
        heroSubtitlu: s.heroSubtitlu,
        heroCuvantInel: s.heroCuvantInel,
        pret: s.pret,
        deliverables: s.deliverables,
        continut: s.continut,
        tipuri: s.tipuri,
        features: s.features,
        integrari: s.integrari,
        preturi: s.preturi,
        faq: s.faq,
      } as any,
    })
    create++
    console.log(`✅ Creat: ${s.titlu} (${s.slug})`)
  }

  let ordinate = 0
  for (const [slug, ordine] of Object.entries(ORDINE)) {
    const found = await payload.find({ collection: 'servicii', where: { slug: { equals: slug } }, limit: 1 })
    const doc = found.docs[0] as any
    if (!doc) { console.log(`⚠️  Nu există serviciu cu slug "${slug}"`); continue }
    if (doc.ordine !== ordine) {
      await payload.update({ collection: 'servicii', id: doc.id, data: { ordine } })
    }
    ordinate++
    console.log(`🔢 ${ordine} → ${doc.titlu}`)
  }

  console.log(`\nDone: ${create} create, ${ordinate} ordine setate.`)
  process.exit(0)
}

main().catch((e) => { console.error('❌ Eroare:', e); process.exit(1) })
