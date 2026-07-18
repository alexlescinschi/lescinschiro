// Insert: Serviciu "Integrări curierat"
// ponytail: run once with `npx tsx --env-file=.env scripts/add-integrari-curierat.ts`
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

  const existing = await payload.find({ collection: 'servicii', where: { slug: { equals: 'integrari-curierat' } }, limit: 1 })
  if (existing.docs.length) {
    console.log('ℹ️  Serviciul "integrari-curierat" există deja (id ' + existing.docs[0].id + ') — skip.')
    process.exit(0)
  }

  const imagineId = 4

  const doc = await payload.create({
    collection: 'servicii',
    data: {
      titlu: 'Integrări curierat',
      categorie: '',
      metaTitlu: 'Integrare Curierat & AWB Automat — FAN Courier, Cargus, Sameday | LESCINSCHI',
      imagine: imagineId,
      descriereScurta: 'Integrăm firme de curierat pentru România și Moldova: FAN Courier, Cargus, Sameday easybox, DPD, GLS, Nova Poshta, Poșta Moldovei. Generare AWB automată, calcul cost livrare live, tracking automat pe e-mail și SMS, re-expediere și retur.',
      heroTitlu: 'Integrări curierat care LIVREAZĂ',
      heroSubtitlu: 'FAN Courier, Cargus, Sameday easybox, DPD, GLS + Nova Poshta, Poșta Moldovei. AWB automat, calcul livrare live, tracking la client.',
      heroCuvantInel: 'LIVREAZĂ',
      pret: '100–400€',
      deliverables: 'AWB automat și testat, Codul tău pe GitHub, Documentație, Training, Mentenanță lunară',
      continut: lexical([
        ['h2', 'AWB-ul se generează singur, la fiecare comandă'],
        ['p', 'În momentul în care o comandă e plătită sau confirmată, sistemul citește greutatea, dimensiunile și adresa, apelează API-ul curierului și generează AWB-ul. Operatorul doar lipește eticheta pe colet. Niciun câmp completat manual, nicio greșeală de adresă, niciun timp pierdut pe portalul curierului.'],
        ['p', 'Funcționează identic pentru toate firmele: schimbi curierul dintr-un dropdown, restul e identic. Comenzile vechi rămân pe curierul cu care au fost expediate; comenzile noi merg pe cel nou.'],
        ['h2', 'Calcul livrare live în coș'],
        ['p', 'Clientul introduce adresa și vede imediat costul real de livrare, calculat după zonă, greutate și plată la ramburs (COD). Nu mai „livrare 30 lei” uniformă care te costă pe tine diferența la județele scumpe. Prețul corect pentru fiecare comandă, afișat înainte de checkout — clienții abandonează mai rar când știu exact.'],
        ['p', 'Pentru magazine B2B, setăm reguli: transport gratuit peste o sumă, tarif pe grup de clienți, curier fixat pe regiune. Calculul e mereu transparent și profitabil.'],
        ['h2', 'Locker-e (easybox, Cargus Ship & Go)'],
        ['p', 'Curieratul prin lockere e cel mai ieftin și preferat de clienții din orașe. Integrăm Sameday easybox și Cargus Ship & Go direct în checkout: clientul alege locker-ul cel mai apropiat pe hartă, AWB-ul include automat codul locker-ului, prețul scade cu 30–50%. Returnarea merge tot prin locker — clientul scanează codul, pune coletul, gata.'],
        ['h2', 'Tracking automat pentru client'],
        ['p', 'Imediat ce curierul scanează coletul, clientul primește notificare pe e-mail și (opțional) SMS: „Comanda a fost ridicată”, „Este în tranzit”, „Urmează să fie livrată azi între 10–14”. Statusul se actualizează automat în panoul tău. Când coletul e livrat, plata COD se înregistrează ca încasată și declanșează factura. Fără să suni la curier, fără să întrebi clientul „a ajuns?”.'],
        ['h2', 'Retururi și re-expediere'],
        ['p', 'Clientul refuză sau vrea retur? Un click în panou generează AWB de retur, cu aceleași date. Coletul se întoarce automat la depozit, stocul se reposiționează, rambursarea se procesează prin curier sau prin procesatorul de plăți. Tracking-ul de retur e la fel de automat ca livrarea — clientul știe mereu unde e coletul lui.'],
        ['h2', 'Sincronizare cu ERP și stoc'],
        ['p', 'Fiecare expediere declanșează un webhook care scade stocul în ERP, creează un document de expediție, actualizează statusul comenzii în CRM. Dacă vinzi pe eMAG și pe site simultan, stocul se sincronizează între toate canalele în timp real — nu vindeți niciodată un produs care nu mai e pe stoc.'],
        ['h2', 'Repartizare inteligentă pe curier'],
        ['p', 'Pentru volume mari, setăm reguli automate: comenzile sub 1 kg cu destinație București merg prin Sameday (cel mai rapid în capitală), coletele peste 5 kg prin FAN Courier (tarif mai bun), zona rurală prin Poșta Română / Cargus. Sistemul alege singur cel mai ieftin și mai rapid curier pentru fiecare comandă. Reduci costul de livrare cu 15–25% fără să ridici un deget.'],
        ['h2', 'Cât costă o integrare de curierat?'],
        ['p', 'Între 100 € și 400+ €, în funcție de numărul de curieri, lockere, tracking SMS și integrările cu ERP. O integrare simplă (un curier, AWB, tracking) pornește de la 100 €. Primești ofertă fixă în 24–48 de ore după brief.'],
      ]),

      tipuri: [
        { titlu: 'Curieri România', subtitlu: 'Livrare națională', descriere: 'FAN Courier, Cargus, Sameday, DPD, GLS — acoperire completă, AWB și pickup.', logouri: 'FAN Courier, Cargus, Sameday, DPD, GLS, Urgent Cargus' },
        { titlu: 'Locker-e', subtitlu: 'Cel mai ieftin', descriere: 'Sameday easybox, Cargus Ship & Go — livrare prin locker, retur prin locker.', logouri: 'Sameday easybox, Cargus Ship & Go, DPD Pickup' },
        { titlu: 'Curieri Moldova', subtitlu: 'Livrare națională MD', descriere: 'Nova Poshta, Poșta Moldovei, curieri locali — livrare în 24h în toată țara.', logouri: 'Nova Poshta, Poșta Moldovei, Moto-Express, curieri locali' },
        { titlu: 'Curieri internaționali', subtitlu: 'Cross-border', descriere: 'DHL, FedEx, UPS — pentru comenzi în afara RO/MD.', logouri: 'DHL, FedEx, UPS, TNT' },
      ],

      features: [
        { icon: '📦', titlu: 'AWB automat', descriere: 'Generat la fiecare comandă. Zero introducere manuală.' },
        { icon: '🗺️', titlu: 'Calcul livrare live', descriere: 'Cost real după zonă, greutate, COD. În coș.' },
        { icon: '🏢', titlu: 'Locker-e (easybox)', descriere: 'Cel mai ieftin. Retur prin locker.' },
        { icon: '📧', titlu: 'Tracking automat', descriere: 'E-mail și SMS la fiecare status.' },
        { icon: '🔁', titlu: 'Retururi', descriere: 'AWB de retur cu un click.' },
        { icon: '⚖️', titlu: 'Multi-curier', descriere: 'Comutabil per comandă sau per zonă.' },
        { icon: '🏷️', titlu: 'Etichetă PDF', descriere: 'Print direct, format curier (A6/A4).' },
        { icon: '💰', titlu: 'COD automat', descriere: 'Ramburs înregistrat la livrare.' },
        { icon: '🔄', titlu: 'Sync ERP/stoc', descriere: 'Webhook către ERP/CRM.' },
        { icon: '🚚', titlu: 'Pickup programat', descriere: 'Comenzi de ridicare automate.' },
        { icon: '🎯', titlu: 'Repartizare inteligentă', descriere: 'Cel mai ieftin/rapid curier per comandă.' },
        { icon: '📊', titlu: 'Rapoarte livrare', descriere: 'Cost, timpi, succes/eșec per curier.' },
      ],

      integrari: [
        { eticheta: 'Curieri România', elemente: 'FAN Courier, Cargus, Sameday, DPD, GLS, Urgent Cargus' },
        { eticheta: 'Locker-e', elemente: 'Sameday easybox, Cargus Ship & Go, DPD Pickup' },
        { eticheta: 'Curieri Moldova', elemente: 'Nova Poshta, Poșta Moldovei, Moto-Express, curieri locali' },
        { eticheta: 'Curieri internaționali', elemente: 'DHL, FedEx, UPS, TNT' },
        { eticheta: 'ERP & contabilitate', elemente: 'SmartBill, Oblio, 1C, SAP' },
        { eticheta: 'Marketplace sync', elemente: 'eMAG, Altex (comenzi + stoc)' },
        { eticheta: 'Notificări', elemente: 'E-mail, SMS, WhatsApp Business' },
      ],

      preturi: [
        { nume: 'Integrare single', pret: '€100', include: '1 curier + AWB automat, etichetă PDF, tracking e-mail' },
        { nume: 'Multi-curier', pret: '€200', include: '2+ curieri, locker-e, calcul livrare live, tracking SMS' },
        { nume: 'Soluție enterprise', pret: '€400+', include: 'Repartizare inteligentă, sync ERP, retur automat, marketplace' },
      ],

      faq: [
        { intrebare: 'Ce curier recomandați pentru România?', raspuns: 'Depinde de zonă și volum. FAN Courier pentru acoperire națională și pickup rapid. Cargus pentru preț bun la volume. Sameday pentru viteză în București + locker-e. DPD și GLS pentru colete internaționale/UE.' },
        { intrebare: 'Cum funcționează locker-ele (easybox)?', raspuns: 'Clientul alege locker-ul pe hartă la checkout. AWB-ul include codul locker-ului. Costul scade cu 30–50%, livrarea e în 24h. Returul merge tot prin locker — cel mai ieftin și convenabil.' },
        { intrebare: 'AWB-ul se generează cu adevărat singur?', raspuns: 'Da. La confirmarea/plata comenzii, sistemul apelează API-ul curierului cu datele de livrare, greutate, plată și generează AWB-ul. Operatorul doar printează eticheta și lipește pe colet.' },
        { intrebare: 'Pot calcula costul de livrare în coș?', raspuns: 'Da. Clientul introduce adresa și vede costul real calculat după zonă, greutate și COD. Setăm și reguli: transport gratuit peste sumă, tarif pe grup de clienți.' },
        { intrebare: 'Clientul primește tracking?', raspuns: 'Da, automat pe e-mail și (opțional) SMS la fiecare status: ridicat, în tranzit, urmează livrare, livrat. Statusul se actualizează și în panoul tău.' },
        { intrebare: 'Cum funcționează plata la ramburs (COD)?', raspuns: 'Curierul încasează cash de la client la livrare și virează în contul tău în 7–14 zile. Noi setăm ca la livrare, suma să se înregistreze ca încasată și să declanșeze factura.' },
        { intrebare: 'Pot schimba curierul fără să pierd istoricul?', raspuns: 'Da. Comenzile vechi rămân pe curierul original. Schimbi curierul default dintr-un dropdown — comenzile noi merg pe cel nou.' },
        { intrebare: 'Funcționează și pentru Moldova?', raspuns: 'Da. Nova Poshta, Poșta Moldovei și curieri locali (Moto-Express). AWB automat, calcul livrare pe zonă (Chișinău / raioane), tracking.' },
        { intrebare: 'Cum gestionez retururile?', raspuns: 'Un click în panou generează AWB de retur cu aceleași date. Coletul se întoarce la depozit, stocul se reposiționează, rambursarea se procesează. Tracking-ul de retur e automat.' },
        { intrebare: 'Pot avea mai mulți curieri și să aleg automat?', raspuns: 'Da. Pentru volume mari setăm reguli: colete mici în București → Sameday, peste 5 kg → FAN Courier, rural → Cargus. Sistemul alege singur — economisești 15–25%.' },
        { intrebare: 'Integrarea se face cu ERP-ul meu?', raspuns: 'Da. Fiecare expediere declanșează un webhook către ERP (1C, SAP, SmartBill). Stocul scade automat, documentul de expediție se creează, statusul comenzii se actualizează.' },
        { intrebare: 'Cât durează o integrare?', raspuns: '3–7 zile pentru un curier standard (API + AWB + tracking). Multi-curier cu locker-e și sync ERP: 1–2 săptămâni.' },
      ],
    },
  })

  console.log('✅ Serviciu creat:', doc.id, '—', doc.titlu, '| slug:', doc.slug)
  process.exit(0)
}

main().catch((e) => { console.error('❌ Eroare:', e); process.exit(1) })
