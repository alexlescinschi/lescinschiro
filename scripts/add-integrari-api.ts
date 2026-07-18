// Insert: Serviciu "Integrări API"
// ponytail: run once with `npx tsx --env-file=.env scripts/add-integrari-api.ts`
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

  const existing = await payload.find({ collection: 'servicii', where: { slug: { equals: 'integrari-api' } }, limit: 1 })
  if (existing.docs.length) {
    console.log('ℹ️  Serviciul "integrari-api" există deja (id ' + existing.docs[0].id + ') — skip.')
    process.exit(0)
  }

  const imagineId = 4

  const doc = await payload.create({
    collection: 'servicii',
    data: {
      titlu: 'Integrări API',
      categorie: '',
      metaTitlu: 'Integrare API & ERP/CRM — eMAG, SmartBill, Oblio, 1C | LESCINSCHI',
      imagine: imagineId,
      descriereScurta: 'Integrăm orice API cu magazinul sau site-ul tău: ERP și contabilitate (SmartBill, Oblio, 1C, SAP), CRM, marketplace (eMAG, Altex), sisteme de rezervări, fluxuri custom. Sincronizare real-time a stocurilor, prețurilor și comenzilor, automatizări pe orice eveniment.',
      heroTitlu: 'Integrări API care CONECTEAZĂ',
      heroSubtitlu: 'ERP, CRM, eMAG, SmartBill, Oblio, sisteme de rezervări. Dacă are API, îl conectăm — fluxuri automate, zero introducere manuală.',
      heroCuvantInel: 'CONECTEAZĂ',
      pret: '200–1.500+€',
      deliverables: 'Integrare live și testată, Codul tău pe GitHub, Documentație API, Training, Mentenanță lunară',
      continut: lexical([
        ['h2', 'Dacă are API, îl conectăm'],
        ['p', 'Indiferent ce sistem folosești — ERP, CRM, facturare, marketplace, curier, bancă sau o platformă proprie — dacă expune un API, îl putem conecta la magazinul sau site-ul tău. Am integrat zeci de sisteme diferite și nu am dat peste un „nu se poate” tehnic, doar peste deadline-uri pe care le-am respectat.'],
        ['p', 'Scopul nu e „să avem o integrare”. Scopul e ca datele să curgă singure între sisteme, fără ca un om să copieze dintr-un ecran în altul. Dacă un angajat tastează aceeași informație în două locuri, acolo e un API pe care nu l-ai scris încă.'],
        ['h2', 'ERP, contabilitate și facturare'],
        ['p', 'SmartBill, Oblio, Facturis, 1C, SAP, Oracle — orice sistem de contabilitate sau ERP se conectează la magazin. La fiecare comandă: factură automată, update stoc, export contabil, sincronizare clienți. La fiecare modificare de preț în ERP, prețul se actualizează pe site în minute. La fiecare scădere de stoc în depozit, stocul scade și pe site — fără overselling, fără comenzi pe produse indisponibile.'],
        ['h2', 'Marketplace sync (eMAG, Altex, ePiesa)'],
        ['p', 'Vinzi pe eMAG și pe site-ul propriu simultan? Integrăm marketplace-ul cu magazinul tău: produsele, stocurile și prețurile se sincronizează automat în ambele direcții. Comanda plasată pe eMAG intră în același panou de administrare ca restul comenzilor, AWB-ul se generează o singură dată, stocul scade peste tot. Vinzi pe toate canalele ca pe unul singur.'],
        ['h2', 'CRM și automatizări de marketing'],
        ['p', 'Conectăm HubSpot, Salesforce, Pipedrive, NewsMAN, Mailchimp, ActiveCampaign. Când un client nou plasează prima comandă, intră automat în CRM cu istoric complet. Când abandonează coșul, declanșează un email de retargeting după 2 ore. Când ajunge la o sumă cumulată, intră în grupa VIP cu discount automat. Marketingul devine reactiv, nu manual.'],
        ['h2', 'Sisteme de rezervări și programări'],
        ['p', 'Clinici, saloane, restaurante, auto-service. Integrăm sisteme precum Calendly, Cal.com, SetMore sau construim unul custom. Clientul alege slotul pe site, rezervarea se sincronizează cu calendarul tău, primești notificare pe SMS/email, plata se face în avans sau la fața locului. Diminețile fără telefon sunând „ați avea un loc la 14?”.'],
        ['h2', 'Webhook-uri și fluxuri eveniment'],
        ['p', 'Orice eveniment din magazin (comandă nouă, plată confirmată, stoc sub prag, client nou, retur) poate declanșa un flux automat: webhook către ERP, email, SMS, push notification, task în CRM, rulare script. Lucrul ăsta e coloana vertebrală a automatizărilor — nu build-uim „funcție magică”, ci fluxuri clare, testabile, monitorizate.'],
        ['h2', 'n8n, Make, Zapier — low-code când merită'],
        ['p', 'Pentru fluxuri între 3+ servicii (site + CRM + email + Slack + Google Sheets), uneori e mai ieftin să folosim n8n (self-hosted, fără abonament) sau Make/Zapier. Evaluăm de la caz la caz: cod custom pentru volume mari și logică complexă, low-code pentru prototipare și fluxuri simple. Niciodată nu te blocăm într-un instrument scump dacă o rutină de 50 de linii de cod o face mai bine.'],
        ['h2', 'API-uri bancare și financiare'],
        ['p', 'BT, BCR, Revolut Business, Wise — citire sold și tranzacții, reconciliere automată cu facturile, export contabil. Pentru SRL-uri cu volume mari, asta înseamnă zile de muncă contabilă salvate în fiecare lună.'],
        ['h2', 'Cât costă o integrare API?'],
        ['p', 'Între 200 € și 1.500+ €, în funcție de complexitatea API-ului (REST/GraphQL/SOAP), volumul de date, numărul de fluxuri, autentificare (OAuth, API key, IP whitelist) și necesitatea de a construi middleware. O integrare simplă (un API REST, webhook, sincronizare unidirecțională) pornește de la 200 €. Marketplace + ERP + CRM full sync: 1.000–1.500 €. Primești ofertă fixă în 24–48 de ore după brief.'],
      ]),

      tipuri: [
        { titlu: 'ERP & contabilitate', subtitlu: 'Datele curg singure', descriere: 'SmartBill, Oblio, 1C, SAP, Facturis — factură automată, sync stoc, export contabil.', logouri: 'SmartBill, Oblio, Facturis, 1C, SAP, Oracle' },
        { titlu: 'Marketplace sync', subtitlu: 'Vinzi peste tot', descriere: 'eMAG, Altex, ePiesa — produse, stoc și preț sincronizate în ambele direcții.', logouri: 'eMAG, Altex, ePiesa, PC Garage' },
        { titlu: 'CRM & marketing', subtitlu: 'Clienți pe autopilot', descriere: 'HubSpot, Salesforce, Pipedrive, Mailchimp, NewsMAN, ActiveCampaign.', logouri: 'HubSpot, Salesforce, Pipedrive, Mailchimp, NewsMAN, ActiveCampaign' },
        { titlu: 'Rezervări & programări', subtitlu: 'Fără telefon', descriere: 'Calendly, Cal.com, SetMore, sau sistem custom — rezervări online cu plată în avans.', logouri: 'Calendly, Cal.com, SetMore, FullCalendar' },
      ],

      features: [
        { icon: '🔌', titlu: 'Orice API', descriere: 'REST, GraphQL, SOAP. Cu sau fără documentație.' },
        { icon: '🔄', titlu: 'Bidirectional sync', descriere: 'Datele curg în ambele direcții, fără conflict.' },
        { icon: '📊', titlu: 'Real-time webhooks', descriere: 'Evenimente care declanșează fluxuri automate.' },
        { icon: '🏪', titlu: 'Marketplace unificat', descriere: 'eMAG + site = un singur panou comenzi.' },
        { icon: '🧾', titlu: 'Facturare automată', descriere: 'Comandă → factură SmartBill/Oblio fără om.' },
        { icon: '💰', titlu: 'Sync preț & stoc', descriere: 'Modificare în ERP → actualizare pe site în minute.' },
        { icon: '🔐', titlu: 'OAuth & API keys', descriere: 'Autentificare sigură, token refresh automat.' },
        { icon: '🧰', titlu: 'Middleware custom', descriere: 'Când API-urile nu vorbesc, le traducem noi.' },
        { icon: '⚡', titlu: 'Low-code (n8n/Make)', descriere: 'Pentru fluxuri simple, fără cod custom.' },
        { icon: '📈', titlu: 'CRM sync', descriere: 'Clienți și istoric comenzi în HubSpot/Salesforce.' },
        { icon: '📅', titlu: 'Rezervări online', descriere: 'Slot-uri, calendar, plată în avans, SMS reminder.' },
        { icon: '🔍', titlu: 'Monitoring & logs', descriere: 'Toate integrările monitorizate, alerte pe eroare.' },
      ],

      integrari: [
        { eticheta: 'ERP & contabilitate', elemente: 'SmartBill, Oblio, Facturis, 1C, SAP, Oracle Netsuite' },
        { eticheta: 'Marketplace', elemente: 'eMAG Marketplace, Altex, ePiesa, PC Garage' },
        { eticheta: 'CRM', elemente: 'HubSpot, Salesforce, Pipedrive, Zoho CRM, Bitrix24' },
        { eticheta: 'Email & marketing', elemente: 'Mailchimp, NewsMAN, ActiveCampaign, Brevo' },
        { eticheta: 'Rezervări', elemente: 'Calendly, Cal.com, SetMore, FullCalendar' },
        { eticheta: 'Bănci & financiar', elemente: 'Banca Transilvania API, BCR API, Revolut Business, Wise' },
        { eticheta: 'Low-code & automatizări', elemente: 'n8n, Make (Integromat), Zapier' },
        { eticheta: 'Messaging & notificări', elemente: 'WhatsApp Business, Telegram, Slack, Twilio (SMS)' },
      ],

      preturi: [
        { nume: 'Integrare single', pret: '€200', include: '1 API REST + webhook, sync unidirecțional, test & live, logs' },
        { nume: 'Multi-sistem', pret: '€600', include: '2–3 API-uri, sync bidirecțional, facturare, marketplace sync' },
        { nume: 'Soluție enterprise', pret: '€1.500+', include: 'ERP+CRM+marketplace+banking, middleware custom, monitoring 24/7' },
      ],

      faq: [
        { intrebare: 'Ce sisteme puteți integra?', raspuns: 'Orice sistem care expune un API: ERP (SmartBill, Oblio, 1C, SAP), CRM (HubSpot, Salesforce, Pipedrive), marketplace (eMAG, Altex), curier, bancă, sistem de rezervări. Dacă are API public sau intern, îl conectăm.' },
        { intrebare: 'API-ul meu e vechi/fără documentație. Se poate?', raspuns: 'Da. Lucrăm frecvent cu API-uri legacy (SOAP, XML, RPC). Reverse-engineering pe răspunsurile API-ului, documentăm ce am găsit, construim integrarea. Asta poate adăuga timp, dar nu e un blocker.' },
        { intrebare: 'Cât durează o integrare?', raspuns: '1–2 săptămâni pentru un API REST standard cu documentație bună. 3–6 săptămâni pentru integrări complexe (multi-sistem, bidirecțional, middleware custom).' },
        { intrebare: 'Pot vinde pe eMAG direct din magazinul meu?', raspuns: 'Da. Integrăm eMAG Marketplace: produse, stoc și preț sincronizate în ambele direcții, comenzile de pe eMAG intră în același panou ca cele de pe site, AWB unic. Vinzi pe toate canalele ca pe unul singur.' },
        { intrebare: 'Cum se face facturarea automată?', raspuns: 'La fiecare comandă plătită, sistemul apelează API-ul SmartBill/Oblio, generează factura cu datele fiscale corecte, o trimite pe email clientului și o asociază cu comanda. Fără introducere manuală, fără eroare.' },
        { intrebare: 'Dacă prețul se schimbă în ERP, se actualizează pe site?', raspuns: 'Da, automat. Modifici prețul în ERP, în câteva minute prețul e actualizat și pe site. La fel și stocul: scade în depozit, scade și pe site. Fără overselling.' },
        { intrebare: 'Folosiți n8n, Make sau Zapier?', raspuns: 'Evaluăm de la caz. Pentru fluxuri între 3+ servicii, n8n self-hosted e adesea cea mai ieftină soluție (fără abonament). Pentru prototipare rapidă, Make sau Zapier. Pentru volume mari, cod custom — mai rapid și mai ieftin pe termen lung.' },
        { intrebare: 'Cum tratați conflictele de date?', raspuns: 'Sync bidirecțional înseamnă conflicte potențiale (ex: stoc modificat simultan în ERP și pe site). Definim reguli clare la brief: care sistem e sursa de adevăr pentru fiecare câmp, cum se rezolvă conflictele, cum se loghează excepțiile.' },
        { intrebare: 'Ce se întâmplă dacă un API pică?', raspuns: 'Toate integrările au retry cu exponential backoff (3–5 încercări), queue persistent pentru a nu pierde evenimente, alerte pe eroare. Dacă API-ul e jos 30 min, datele se sincronizează când revine, fără intervenție.' },
        { intrebare: 'Integrarea e sigură?', raspuns: 'Da. OAuth 2.0 sau API keys stocate criptat, IP whitelist unde e necesar, HTTPS peste tot, token refresh automat. Nu logăm niciodată date sensibile (carduri, parole). Pentru GDPR, pseudonimizăm datele clienților în loguri.' },
        { intrebare: 'Pot adăuga o integrare mai târziu?', raspuns: 'Da. Arhitectura noastră e modulară: fiecare integrare e un modul independent. Adaugi un nou sistem peste 6 luni fără să rescriem restul. Costul depinde de complexitatea noului API.' },
        { intrebare: 'Oferiți mentenanță?', raspuns: 'Da. API-urile se schimbă (endpoint depreciat, auth schimbat, rate limit modificat). Mentenanța lunară include monitoring, actualizări de compatibilitate, suport pe webhook-uri și adăugare de fluxuri noi. Pornește de la 50€/lună.' },
      ],
    },
  })

  console.log('✅ Serviciu creat:', doc.id, '—', doc.titlu, '| slug:', doc.slug)
  process.exit(0)
}

main().catch((e) => { console.error('❌ Eroare:', e); process.exit(1) })
