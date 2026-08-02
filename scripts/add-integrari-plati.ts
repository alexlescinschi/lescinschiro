// Insert: Serviciu "Integrări plăți online"
// ponytail: run once with `npx tsx --env-file=../.env scripts/add-integrari-plati.ts` (din root: --env-file=.env)
// Idempotent: dacă slug-ul există, face skip.
import { getPayload } from 'payload'
import config from '../payload.config'

// Helper: construiește Lexical JSON dintr-o listă de blocuri [tip, text]
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

  // Idempotență
  const existing = await payload.find({ collection: 'servicii', where: { slug: { equals: 'integrari-plati-online' } }, limit: 1 })
  if (existing.docs.length) {
    console.log('ℹ️  Serviciul "integrari-plati-online" există deja (id ' + existing.docs[0].id + ') — skip.')
    process.exit(0)
  }

  // imagine: reuse id 4 (svc-mag-1.png) — ponytail: temporar, schimbi din admin
  const imagineId = 1

  const doc = await payload.create({
    collection: 'servicii',
    data: {
      titlu: 'Integrări plăți online',
      metaTitlu: 'Integrare Plăți Online România — Netopia, PayU, Stripe | LESCINSCHI',
      imagine: imagineId,
      descriereScurta: 'Integrăm procesatori de plăți pentru România și Moldova: Netopia mobilPay, EuPlătesc, PayU, Stripe, PayPal, Revolut Business, MAIB, Victoriabank. Checkout 3D Secure, plată în rate, Apple Pay, Google Pay, plată la livrare.',
      heroTitlu: 'Integrări plăți care ÎNCASEAZĂ',
      heroSubtitlu: 'Netopia, PayU, Stripe, EuPlătesc, Revolut + bănci din Moldova. 3D Secure, rate, Apple Pay — toate metodele de pe piața RO/MD.',
      heroCuvantInel: 'ÎNCASEAZĂ',
      pret: '100–500€',
      deliverables: 'Plată live și testată, Codul tău pe GitHub, Documentație, Training, Mentenanță lunară',
      continut: lexical([
        ['h2', 'Procesăm plăți din orice sursă'],
        ['p', 'Indiferent dacă vinzi în România, Moldova sau internațional, integrăm procesatorul potrivit pentru fiecare piață. Netopia mobilPay și EuPlătesc pentru lei, Stripe și PayPal pentru clienți internaționali, MAIB și Victoriabank pentru piața din Moldova. Mai mulți procesatori în același checkout înseamnă că nicio tranzacție nu se pierde: dacă unul refuză, al doilea preia.'],
        ['p', 'Checkout-ul îl construim ca să vândă, nu doar să încaseze. Apple Pay și Google Pay cu un tap pe mobil, plată în rate, plată la livrare, abonamente recurente — toate opțiunile pe care clienții tăi le așteaptă, într-un singur flux curat.'],
        ['h2', '3D Secure, PSD2 și conformitate'],
        ['p', 'Toate integrările noastre sunt SCA-compliant (Strong Customer Authentication), conform PSD2. 3D Secure v2 este standard, nu opțional — fără el, băncile refuză tranzacția. Construim mereu arhitectura astfel încât datele cardului să nu atingă serverul tău: Hosted Checkout, Stripe Elements sau un SDK validat. Asta înseamnă PCI DSS la nivel minim (SAQ-A), zero stres de compliance.'],
        ['h2', 'Multi-monede, multi-țări'],
        ['p', 'Vânzi în România, dar livrezi în toată UE? Prețul afișat automat în moneda clientului (RON, EUR, USD, MDL), cu conversie la cursul zilei. Setăm reguli pe țară: procesator preferat, metode de plată permise, monedă de facturare. Aceeași comandă, plătită în moneda potrivită, de oriunde.'],
        ['h2', 'Facturare și contabilitate automată'],
        ['p', 'La fiecare plată confirmată, o factură se generează automat în SmartBill sau Oblio, cu toate datele fiscale corecte. Webhook-ul plății declanșează fluxul: factură → email client → update ERP → AWB curier. Fără introducere manuală, fără eroare umană.'],
        ['h2', 'Webhook-uri și sincronizare real-time'],
        ['p', 'Orice plată — succes, refuz, rambursare, chargeback — declanșează un webhook care sincronizează statusul cu ERP, CRM sau panoul tău. Comanda știe mereu dacă e plătită, parțial plătită sau refuzată. Poți construi automatizări pe orice status: email, discount, follow-up, blacklist.'],
        ['h2', 'Anti-fraudă și gestionarea riscului'],
        ['p', 'Pentru volume mari, implementăm filtre anti-fraudă: BIN detection, velocity check, blocklist, AVS/CVV checks. Pentru COD, validare telefonică automată și limită pe valoare. Rata de chargeback scade, marja crește.'],
        ['h2', 'Cât costă o integrare de plăți?'],
        ['p', 'Între 100 € și 500+ €, în funcție de numărul de procesatori, complexitatea fluxului (rate, abonamente, fallback) și integrările cu facturare/ERP. O integrare simplă (un procesator, checkout, 3D Secure) pornește de la 100 €. Primești ofertă fixă în 24–48 de ore după brief.'],
      ]),

      tipuri: [
        { titlu: 'Procesatori România', subtitlu: 'Plăți în lei', descriere: 'Netopia, EuPlătesc, PayU — pentru magazine care vând în RON, cu 3D Secure obligatoriu.', logouri: 'Netopia, EuPlătesc, PayU, Plăți Online BCR, Twispay' },
        { titlu: 'Procesatori internaționali', subtitlu: 'Cross-border', descriere: 'Stripe, PayPal, Adyen — pentru vânzări în multi-monede, clienți din toată lumea.', logouri: 'Stripe, PayPal, Adyen, Revolut Business, Braintree, Mollie' },
        { titlu: 'Bănci Moldova', subtitlu: 'Plăți în MDL', descriere: 'MAIB, Victoriabank, MICB, paynet — pentru piața din Moldova, în lei moldovenești.', logouri: 'MAIB, Victoriabank, MICB, paynet' },
        { titlu: 'Metode moderne', subtitlu: 'Conversie mai mare', descriere: 'Apple Pay, Google Pay, plată în rate, SEPA, transfer bancar — un tap, fără formular.', logouri: 'Apple Pay, Google Pay, SEPA, rate BRD/BCR/TBI/BT' },
      ],

      features: [
        { icon: '🔒', titlu: '3D Secure', descriere: 'Autentificare SCA, conform PSD2. Tranzacții sigure.' },
        { icon: '💳', titlu: 'Multi-procesator', descriere: '2+ procesatori: fallback automat dacă unul pică.' },
        { icon: '🌍', titlu: 'Multi-monede', descriere: 'RON, EUR, USD, MDL. Preț afișat în moneda clientului.' },
        { icon: '🍎', titlu: 'Apple Pay / Google Pay', descriere: 'Un tap, fără formular. Conversie mai mare pe mobil.' },
        { icon: '📅', titlu: 'Plată în rate', descriere: 'Rate via BRD, BCR, TBI, BT sau procesator nativ.' },
        { icon: '🧾', titlu: 'Facturare automată', descriere: 'Plățile declanșează facturi SmartBill / Oblio.' },
        { icon: '🔄', titlu: 'Abonamente', descriere: 'Plăți recurente pentru servicii, membre, SaaS.' },
        { icon: '📊', titlu: 'Webhook-uri', descriere: 'Status plată sync instant cu ERP/CRM.' },
        { icon: '🛡️', titlu: 'Anti-fraudă', descriere: 'BIN detection, velocity check, blocklist.' },
        { icon: '💰', titlu: 'Ramburs la livrare (COD)', descriere: 'Plată la curier, cu limită de risc.' },
        { icon: '🔁', titlu: 'Retururi & rambursări', descriere: 'Ramburs automat prin procesator.' },
        { icon: '🧪', titlu: 'Mediu de test', descriere: 'Sandbox complet înainte de live.' },
      ],

      integrari: [
        { eticheta: 'Procesatori România', elemente: 'Netopia mobilPay, EuPlătesc, PayU, Plăți Online BCR, Twispay' },
        { eticheta: 'Procesatori internaționali', elemente: 'Stripe, PayPal, Adyen, Revolut Business, Braintree, Mollie' },
        { eticheta: 'Bănci Moldova', elemente: 'MAIB E-Commerce, Victoriabank, MICB, paynet' },
        { eticheta: 'Metode moderne', elemente: 'Apple Pay, Google Pay, SEPA, transfer bancar, crypto (opțional)' },
        { eticheta: 'Facturare', elemente: 'SmartBill, Oblio, Facturis' },
        { eticheta: 'Rate & credit', elemente: 'BRD, BCR, TBI Credit, Banca Transilvania' },
        { eticheta: 'Conformitate', elemente: '3D Secure / SCA (PSD2), PCI DSS (SAQ-A), GDPR' },
      ],

      preturi: [
        { nume: 'Integrare single', pret: '€100', include: 'Netopia/PayU/Stripe + checkout, 3D Secure, test & live, webhook' },
        { nume: 'Multi-procesator', pret: '€250', include: '2+ procesatori, fallback, multi-monede, rate, facturare automată' },
        { nume: 'Soluție enterprise', pret: '€500+', include: 'Multi-acquirer routing, anti-fraudă avansată, abonamente, marketplace split' },
      ],

      faq: [
        { intrebare: 'Ce procesator recomandați pentru România?', raspuns: 'Depinde de volum și monedă. Netopia și PayU pentru vânzări în lei, cu suport RO și 3D Secure. Stripe pentru vânzări internaționale, API excelent. EuPlătesc pentru volume mari (comision negociabil). La brief îți recomandăm pe cel potrivit.' },
        { intrebare: 'Cât durează o integrare?', raspuns: '2–5 zile pentru un procesator standard (sandbox + live). Multi-procesator sau rate/abonamente: 1–2 săptămâni.' },
        { intrebare: 'Ce comision per tranzacție am?', raspuns: 'Nu încasăm noi comisionul — îl plătești procesatorului. Netopia ~1.5–2% + 0.15€, Stripe 1.4% + 0.25€ (EU), PayU ~1.9%. Comision negociabil pe volum.' },
        { intrebare: 'Pot accepta ramburs la livrare (COD)?', raspuns: 'Da. Combinăm plată online cu COD, clientul alege la checkout. Pentru COD setăm limită de risc și validare telefonică pentru a reduce retururile.' },
        { intrebare: 'Trebuie să fiu PCI DSS compliant?', raspuns: 'Nu, dacă folosești checkout-ul procesatorului (Hosted Checkout / Stripe Elements). Datele cardului nu ating serverul tău. Noi implementăm mereu varianta SAQ-A.' },
        { intrebare: 'Pot vinde în rate?', raspuns: 'Da. Conectăm parteneri de creditare (BRD, BCR, TBI, BT) sau funcția nativă a procesatorului. Clientul alege 3/6/12 rate la checkout.' },
        { intrebare: 'Apple Pay și Google Pay merg pe orice site?', raspuns: 'Da, cu Stripe, Netopia sau PayU. Pe Safari, Apple Pay nativ. Pe Android, Google Pay. Un tap, fără formular.' },
        { intrebare: 'Cum funcționează cu băncile din Moldova?', raspuns: 'MAIB și Victoriabank au gateway-uri e-commerce proprii (MAIB E-Commerce, Victoriabank). Plățile în MDL, cu 3D Secure. Le integrăm direct sau prin paynet.' },
        { intrebare: 'Pot avea două plăți simultane (fallback)?', raspuns: 'Da. Procesator principal + backup. Dacă principalul refuză sau pică, tranzacția merge automat la al doilea — rată de succes mai mare.' },
        { intrebare: 'Ce se întâmplă cu o tranzacție refuzată?', raspuns: 'Clientul vede motivul și poate încerca alt card/procesator. Tu primești notificare în panou și webhook în ERP/CRM.' },
        { intrebare: 'Cum primesc banii în cont?', raspuns: 'Procesatorul virsează zilnic sau săptămânal în contul tău bancar. Noi setăm totul, nu faci nimic tehnic.' },
        { intrebare: 'Oferiți mentenanță?', raspuns: 'Da. Monitoring, actualizări de securitate, schimb de chei API, suport webhook și rambursări. Mentenanța lunară pornește de la 30€.' },
      ],
    },
  })

  console.log('✅ Serviciu creat:', doc.id, '—', doc.titlu, '| slug:', doc.slug)
  process.exit(0)
}

main().catch((e) => { console.error('❌ Eroare:', e); process.exit(1) })
