export type IntegrationCategory =
  | "plati-online"
  | "rate-finantare"
  | "curierat-fulfillment"
  | "erp-stoc-contabilitate"
  | "crm-vanzari"
  | "marketplace-feeduri"
  | "marketing-analytics"
  | "automatizari-comunicare"
  | "programari-sisteme-custom";

export type IntegrationRegion = "md" | "ro" | "ue" | "international";

export const CATEGORY_LABELS: Record<IntegrationCategory, string> = {
  "plati-online": "Plăți online",
  "rate-finantare": "Rate și finanțare",
  "curierat-fulfillment": "Curierat și fulfillment",
  "erp-stoc-contabilitate": "ERP, stoc și contabilitate",
  "crm-vanzari": "CRM și vânzări",
  "marketplace-feeduri": "Marketplace și feeduri de produse",
  "marketing-analytics": "Marketing și analytics",
  "automatizari-comunicare": "Automatizări și comunicare",
  "programari-sisteme-custom": "Programări și sisteme custom",
};

export const CATEGORY_DESCRIPTIONS: Record<IntegrationCategory, string> = {
  "plati-online":
    "Conectăm checkout-ul cu bănci și procesatori pentru autorizare, confirmare și reconcilierea plăților.",
  "rate-finantare":
    "Legăm fluxul de comandă de soluții de creditare, după aprobarea comerciantului și a finanțatorului.",
  "curierat-fulfillment":
    "Automatizăm operațiunile disponibile prin API, precum AWB, etichete, tracking, pickup și retururi.",
  "erp-stoc-contabilitate":
    "Sincronizăm produse, stocuri, prețuri, comenzi și documente cu sistemul operațional al companiei.",
  "crm-vanzari":
    "Trimitem lead-uri și clienți în CRM și păstrăm activitățile comerciale conectate cu site-ul.",
  "marketplace-feeduri":
    "Publicăm și actualizăm oferte, stocuri și comenzi între magazin, marketplace-uri și cataloage de produse.",
  "marketing-analytics":
    "Implementăm măsurarea și activarea campaniilor cu evenimente, conversii, feeduri și controale de consimțământ.",
  "automatizari-comunicare":
    "Construim fluxuri între aplicații pentru notificări, mesagerie, email și procese operaționale repetitive.",
  "programari-sisteme-custom":
    "Conectăm calendare, rezervări și sisteme interne prin API-uri sau schimburi de date adaptate procesului.",
};

type LexicalTextNode = {
  detail: 0;
  format: 0;
  mode: "normal";
  style: "";
  text: string;
  type: "text";
  version: 1;
};

type LexicalBlockNode = {
  children: LexicalTextNode[];
  direction: "ltr";
  format: "";
  indent: 0;
  version: 1;
} & (
  | { type: "heading"; tag: "h2" }
  | { type: "paragraph"; textFormat: 0; textStyle: "" }
);

type PayloadLexicalJSON = {
  root: {
    children: LexicalBlockNode[];
    direction: "ltr";
    format: "";
    indent: 0;
    type: "root";
    version: 1;
  };
};

export type IntegrationSeed = {
  nume: string;
  slug: string;
  aliasuri: string[];
  logoFisier?: string;
  logoAlt?: string;
  categorie: IntegrationCategory;
  regiuni: IntegrationRegion[];
  rezumat: string;
  capabilitati: string[];
  cerinte: string[];
  durata?: string;
  pret?: string;
  featuredHome: boolean;
  ordine: number;
  paginaPublica: boolean;
  continut?: PayloadLexicalJSON;
  faq: { intrebare: string; raspuns: string }[];
  urlOficial?: string;
  metaTitlu: string;
  metaDescriere: string;
  serviceSlugs: string[];
};

type LexicalSourceBlock = readonly ["h2" | "p", string];

function lexical(blocks: readonly LexicalSourceBlock[]): PayloadLexicalJSON {
  const children: LexicalBlockNode[] = blocks.map(([type, text]) => {
    const textNode: LexicalTextNode = {
      detail: 0,
      format: 0,
      mode: "normal",
      style: "",
      text,
      type: "text",
      version: 1,
    };

    if (type === "h2") {
      return {
        children: [textNode],
        direction: "ltr",
        format: "",
        indent: 0,
        tag: "h2",
        type: "heading",
        version: 1,
      };
    }

    return {
      children: [textNode],
      direction: "ltr",
      format: "",
      indent: 0,
      textFormat: 0,
      textStyle: "",
      type: "paragraph",
      version: 1,
    };
  });

  return {
    root: {
      children,
      direction: "ltr",
      format: "",
      indent: 0,
      type: "root",
      version: 1,
    },
  };
}

// Logo-uri locale din public/integrari, descărcate din sursele oficiale sau Simple Icons.
// logoFundalInchis marchează variante albe care cer fundal întunecat.
export const integrationLogos: Record<string, { logoFisier: string; logoFundalInchis?: boolean }> = {
  '1c': { logoFisier: '/integrari/1c.png' },
  '999-md': { logoFisier: '/integrari/999-md.svg' },
  adyen: { logoFisier: '/integrari/adyen.svg' },
  'amazon-marketplace': { logoFisier: '/integrari/amazon-marketplace.svg' },
  bitrix24: { logoFisier: '/integrari/bitrix24.svg' },
  bpay: { logoFisier: '/integrari/bpay.svg' },
  braintree: { logoFisier: '/integrari/braintree.svg' },
  calendly: { logoFisier: '/integrari/calendly.svg' },
  dhl: { logoFisier: '/integrari/dhl.svg' },
  dpd: { logoFisier: '/integrari/dpd.svg' },
  emag: { logoFisier: '/integrari/emag.png' },
  euplatesc: { logoFisier: '/integrari/euplatesc.svg' },
  'fan-courier': { logoFisier: '/integrari/fan-courier.svg' },
  fedex: { logoFisier: '/integrari/fedex.svg' },
  fincombank: { logoFisier: '/integrari/fincombank.png', logoFundalInchis: true },
  'google-ads': { logoFisier: '/integrari/google-ads.svg' },
  'google-analytics-4': { logoFisier: '/integrari/google-analytics-4.svg' },
  'google-search-console': { logoFisier: '/integrari/google-search-console.svg' },
  'google-tag-manager': { logoFisier: '/integrari/google-tag-manager.svg' },
  hubspot: { logoFisier: '/integrari/hubspot.svg' },
  kommo: { logoFisier: '/integrari/kommo.png' },
  'linkedin-insight-lead-gen': { logoFisier: '/integrari/linkedin-insight-lead-gen.svg' },
  liqpay: { logoFisier: '/integrari/liqpay.svg', logoFundalInchis: true },
  maib: { logoFisier: '/integrari/maib.svg' },
  mailchimp: { logoFisier: '/integrari/mailchimp.svg', logoFundalInchis: true },
  make: { logoFisier: '/integrari/make.svg' },
  'meta-catalog': { logoFisier: '/integrari/meta-catalog.svg' },
  'meta-pixel': { logoFisier: '/integrari/meta-pixel.svg' },
  'meta-conversions-api': { logoFisier: '/integrari/meta-conversions-api.svg' },
  'meta-lead-ads': { logoFisier: '/integrari/meta-lead-ads.svg' },
  moldindconbank: { logoFisier: '/integrari/moldindconbank.png', logoFundalInchis: true },
  mollie: { logoFisier: '/integrari/mollie.png' },
  n8n: { logoFisier: '/integrari/n8n.svg' },
  netopia: { logoFisier: '/integrari/netopia.svg', logoFundalInchis: true },
  'nova-poshta': { logoFisier: '/integrari/nova-poshta.png', logoFundalInchis: true },
  oblio: { logoFisier: '/integrari/oblio.webp', logoFundalInchis: true },
  paynet: { logoFisier: '/integrari/paynet.png', logoFundalInchis: true },
  paypal: { logoFisier: '/integrari/paypal.svg' },
  plationline: { logoFisier: '/integrari/plationline.png' },
  'revolut-business': { logoFisier: '/integrari/revolut-business.svg' },
  salesforce: { logoFisier: '/integrari/salesforce.svg' },
  sap: { logoFisier: '/integrari/sap.svg' },
  slack: { logoFisier: '/integrari/slack.svg' },
  smartbill: { logoFisier: '/integrari/smartbill.svg' },
  stripe: { logoFisier: '/integrari/stripe.svg' },
  telegram: { logoFisier: '/integrari/telegram.svg' },
  twilio: { logoFisier: '/integrari/twilio.svg' },
  'una-erp': { logoFisier: '/integrari/una-erp.png' },
  ups: { logoFisier: '/integrari/ups.svg' },
  usps: { logoFisier: '/integrari/usps.svg' },
  victoriabank: { logoFisier: '/integrari/victoriabank.webp', logoFundalInchis: true },
  'whatsapp-business': { logoFisier: '/integrari/whatsapp-business.svg' },
  'x-ads': { logoFisier: '/integrari/x-ads.svg' },
  zapier: { logoFisier: '/integrari/zapier.svg' },
  'zoho-crm': { logoFisier: '/integrari/zoho-crm.svg' },
}

export const defaultIntegrationPrice = 'de la €100'

export const integrationSeeds: IntegrationSeed[] = [
  {
    nume: "1C",
    slug: "1c",
    aliasuri: ["1C:Enterprise"],
    categorie: "erp-stoc-contabilitate",
    regiuni: ["md", "ro", "international"],
    rezumat:
      "Integrăm 1C cu magazinul online pentru schimb controlat de produse, prețuri, stocuri, comenzi și documente.",
    capabilitati: [
      "Produse, categorii, prețuri și liste comerciale",
      "Stocuri pe depozite și disponibilitate online",
      "Comenzi, clienți, statusuri și documente asociate",
      "Sincronizare programată sau pe evenimente, în funcție de configurație",
    ],
    cerinte: [
      "Versiunea, configurația și extensiile exacte ale instalării 1C",
      "Acces la un web service, OData, extensie sau format de schimb acceptat",
      "Mediu de test și implicarea administratorului ori integratorului 1C",
      "Reguli aprobate pentru sursa de adevăr și rezolvarea conflictelor",
    ],
    durata: "De regulă 3-8 săptămâni, după auditul configurației 1C",
    featuredHome: true,
    ordine: 1,
    paginaPublica: true,
    continut: lexical([
      [
        "h2",
        "Ce conectăm între 1C și magazinul online",
      ],
      [
        "p",
        "O integrare 1C pornește de la configurația folosită efectiv de companie, nu de la un conector universal. Mapăm nomenclatoarele, variantele, unitățile de măsură, listele de preț, depozitele, clienții și documentele de comandă care trebuie schimbate cu magazinul.",
      ],
      ["h2", "Cum circulă datele"],
      [
        "p",
        "1C poate rămâne sursa de adevăr pentru preț și stoc, iar magazinul pentru coș, plată și datele de livrare. Schimbul se poate face prin servicii expuse de instalare, OData, o extensie dedicată sau fișiere validate. Alegem varianta numai după auditarea versiunii și a infrastructurii.",
      ],
      ["h2", "Conflicte, erori și trasabilitate"],
      [
        "p",
        "Definim ce se întâmplă când aceeași valoare este modificată în ambele sisteme, cum sunt reluate operațiunile eșuate și ce identificator leagă produsul ori comanda. Jurnalele exclud parolele și păstrează suficiente informații pentru diagnostic și reconciliere.",
      ],
      ["h2", "Pregătirea și lansarea"],
      [
        "p",
        "Testăm pe o copie sau bază separată, validăm un lot reprezentativ de produse și comenzi, apoi activăm sincronizarea gradual. Durata depinde mai ales de personalizările 1C, calitatea datelor și disponibilitatea persoanei care administrează sistemul.",
      ],
    ]),
    faq: [
      {
        intrebare: "Există o singură integrare valabilă pentru orice 1C?",
        raspuns:
          "Nu. 1C este o platformă cu versiuni, configurații și extensii diferite. Facem mai întâi un audit și proiectăm schimbul pentru instalarea concretă a clientului.",
      },
      {
        intrebare: "Ce sistem controlează stocul și prețul?",
        raspuns:
          "Regula se stabilește înainte de implementare. De obicei 1C rămâne sursa pentru stoc și preț, dar fluxul poate fi adaptat dacă procesul intern cere altă responsabilitate.",
      },
      {
        intrebare: "Se poate lucra dacă instalarea 1C nu are un API potrivit?",
        raspuns:
          "Uneori da, printr-o extensie sau un schimb de fișiere controlat. Fezabilitatea, securitatea și limitările se confirmă după accesul tehnic la configurație.",
      },
      {
        intrebare: "Cum evitați comenzile sau produsele duplicate?",
        raspuns:
          "Folosim identificatori stabili, operațiuni idempotente și un jurnal de sincronizare. Testăm separat reluarea după timeout și conflictele de date înainte de lansare.",
      },
    ],
    urlOficial: "https://www.1c.com/",
    metaTitlu: "Integrare 1C cu magazin online | LESCINSCHI",
    metaDescriere:
      "Integrare 1C pentru produse, prețuri, stocuri și comenzi. Audităm configurația, stabilim sursa de adevăr și lansăm sincronizarea controlat.",
    serviceSlugs: ["integrari-api", "magazine-online"],
  },
  {
    nume: "maib",
    slug: "maib",
    aliasuri: ["MAIB", "MAIB E-Commerce"],
    categorie: "plati-online",
    regiuni: ["md"],
    rezumat:
      "Integrăm fluxul maib e-commerce în checkout, cu inițierea plății și confirmarea sigură a statusului comenzii.",
    capabilitati: [
      "Inițierea plății din checkout prin fluxul aprobat de bancă",
      "Corelarea tranzacției cu identificatorul comenzii",
      "Confirmări server-to-server și actualizarea statusului",
      "Rambursări sau anulări atunci când sunt activate pentru comerciant",
    ],
    cerinte: [
      "Contract de acceptare plăți și cont comerciant aprobate de maib",
      "Credentiale separate pentru test și producție",
      "Domeniu HTTPS, pagini comerciale, politici de livrare și retur",
      "Metodele și monedele activate explicit în contractul comerciantului",
    ],
    durata: "De regulă 1-3 săptămâni după primirea accesului de test",
    featuredHome: true,
    ordine: 2,
    paginaPublica: true,
    continut: lexical([
      ["h2", "Integrarea maib în checkout"],
      [
        "p",
        "Magazinul creează o cerere de plată legată de comanda internă și trimite cumpărătorul prin interfața pusă la dispoziție pentru comerciant. După revenirea în site, comanda nu este marcată ca plătită doar pe baza paginii din browser, ci după confirmarea validată din sistemul de plată.",
      ],
      ["h2", "Statusuri și reconciliere"],
      [
        "p",
        "Păstrăm separat identificatorul comenzii, identificatorul tranzacției și statusul primit. Tratarea repetată a aceleiași notificări este idempotentă, iar plățile neclare rămân în verificare până la o confirmare sigură sau o reconciliere administrativă.",
      ],
      ["h2", "Condiții înainte de implementare"],
      [
        "p",
        "maib aprobă comerciantul și furnizează accesul disponibil conform contractului. Clientul trebuie să aibă domeniu securizat, informații comerciale complete și politicile cerute de bancă. Taxele, decontarea și metodele de plată țin de relația dintre comerciant și maib.",
      ],
      ["h2", "Testare și lansare"],
      [
        "p",
        "Verificăm plăți reușite, refuzate și întrerupte, revenirea cumpărătorului, notificările repetate și diferențele de sumă sau monedă. Cheile de producție sunt păstrate în secret și sunt activate numai după acceptarea testelor de către părțile implicate.",
      ],
    ]),
    faq: [
      {
        intrebare: "Este necesar un contract direct cu maib?",
        raspuns:
          "Da. Comerciantul solicită și obține serviciul de acceptare a plăților de la maib. Noi implementăm partea tehnică după ce banca oferă accesul necesar.",
      },
      {
        intrebare: "Site-ul nostru vede datele cardului?",
        raspuns:
          "Configurăm fluxul aprobat de bancă astfel încât datele sensibile să fie colectate în mediul de plată destinat acestui scop, nu stocate de magazin.",
      },
      {
        intrebare: "Cum știe magazinul că plata este confirmată?",
        raspuns:
          "Validăm notificarea tehnică și identificatorii tranzacției. Pagina de succes văzută de cumpărător nu este, singură, dovada finală a plății.",
      },
      {
        intrebare: "Puteți implementa rambursări din panoul magazinului?",
        raspuns:
          "Doar dacă funcția este disponibilă și activată pentru contul comerciantului. Confirmăm fluxul și drepturile în documentația primită înainte de ofertare.",
      },
    ],
    urlOficial: "https://www.maib.md/",
    metaTitlu: "Integrare maib pentru plăți online | LESCINSCHI",
    metaDescriere:
      "Integrăm maib în checkout pentru inițierea și confirmarea plăților, cu testare sandbox, statusuri corecte și reconcilierea comenzilor.",
    serviceSlugs: ["integrari-plati-online", "magazine-online"],
  },
  {
    nume: "MIA Plăți Instant",
    slug: "mia",
    aliasuri: ["MIA", "MIA Instant Payments"],
    categorie: "plati-online",
    regiuni: ["md"],
    rezumat:
      "Integrăm acceptarea plăților MIA prin banca sau prestatorul participant care oferă comerciantului accesul tehnic necesar.",
    capabilitati: [
      "Crearea unei cereri de plată în fluxul oferit de banca sau PSP-ul participant",
      "Afișarea unui QR ori link de plată atunci când soluția contractată îl oferă",
      "Confirmarea statusului și asocierea cu o comandă",
      "Evidență pentru reconcilierea plăților instant",
    ],
    cerinte: [
      "Contract de acceptare MIA cu o bancă sau un PSP participant",
      "Documentația și credentialele furnizate comerciantului",
      "Identificatorii comerciantului și mediul de test disponibil",
      "Clarificarea fluxului pentru anulări și restituiri",
    ],
    durata: "De regulă 1-3 săptămâni după confirmarea canalului de acces",
    featuredHome: true,
    ordine: 3,
    paginaPublica: true,
    continut: lexical([
      ["h2", "MIA se integrează printr-un participant autorizat"],
      [
        "p",
        "MIA este infrastructura de plăți instant din Republica Moldova, însă comerciantul nu primește automat o integrare directă cu operatorul sistemului. Fluxul concret, credentialele și funcțiile disponibile vin de la banca sau prestatorul de servicii de plată cu care comerciantul încheie contractul.",
      ],
      ["h2", "Fluxul unei comenzi"],
      [
        "p",
        "Magazinul creează o referință unică pentru sumă și comandă, afișează metoda pusă la dispoziție de participant și așteaptă confirmarea tehnică. Actualizăm comanda numai după validarea statusului, inclusiv când utilizatorul închide pagina înainte de întoarcerea în magazin.",
      ],
      ["h2", "Ce verificăm înainte de dezvoltare"],
      [
        "p",
        "Confirmăm dacă soluția contractată oferă API, link sau QR dinamic, notificări server-to-server, mediu de test și operațiuni ulterioare plății. Nu presupunem că toate băncile participante expun aceeași interfață sau aceleași funcții.",
      ],
      ["h2", "Control și reconciliere"],
      [
        "p",
        "Păstrăm referința participantului, suma, moneda și istoricul statusurilor fără a expune date sensibile. Testăm notificările întârziate sau duplicate și oferim un traseu clar pentru verificarea manuală a plăților rămase neconcludente.",
      ],
    ]),
    faq: [
      {
        intrebare: "Integrarea se face direct cu Banca Națională a Moldovei?",
        raspuns:
          "Nu în mod obișnuit. Comerciantul lucrează cu o bancă sau un prestator participant, iar integrarea folosește fluxul tehnic oferit prin acel contract.",
      },
      {
        intrebare: "Avem nevoie de un contract separat pentru MIA?",
        raspuns:
          "Da, disponibilitatea comercială și aprobarea comerciantului trebuie confirmate cu participantul ales înainte de implementare.",
      },
      {
        intrebare: "MIA înlocuiește complet plata cu cardul?",
        raspuns:
          "Nu neapărat. Poate fi oferită ca metodă suplimentară în checkout, alături de card sau ramburs, în funcție de publicul și contractele magazinului.",
      },
      {
        intrebare: "Cum tratăm o plată fără confirmare imediată?",
        raspuns:
          "Comanda rămâne într-un status intermediar și este reverificată prin mecanismul disponibil. Nu confirmăm plata numai din mesajul afișat în browser.",
      },
    ],
    urlOficial: "https://mia.bnm.md/",
    metaTitlu: "Integrare MIA Plăți Instant pentru site | LESCINSCHI",
    metaDescriere:
      "Integrăm plăți MIA prin banca sau PSP-ul participant, cu referințe de comandă, confirmări validate și reconciliere pentru magazine online.",
    serviceSlugs: ["integrari-plati-online", "magazine-online"],
  },
  {
    nume: "NETOPIA Payments",
    slug: "netopia",
    aliasuri: ["NETOPIA", "mobilPay"],
    categorie: "plati-online",
    regiuni: ["ro"],
    rezumat:
      "Integrăm NETOPIA Payments în checkout și legăm notificările procesatorului de statusurile reale ale comenzilor.",
    capabilitati: [
      "Inițierea plății și redirecționarea prin fluxul NETOPIA",
      "Confirmări de plată și actualizarea idempotentă a comenzii",
      "Păstrarea referințelor pentru reconciliere",
      "Rambursări sau metode suplimentare dacă sunt activate în cont",
    ],
    cerinte: [
      "Cont de comerciant NETOPIA aprobat și contract activ",
      "Credentiale și configurație pentru mediile de test și producție",
      "Domeniu HTTPS și pagini comerciale cerute la verificare",
      "Confirmarea monedelor și metodelor aprobate pentru cont",
    ],
    durata: "De regulă 1-3 săptămâni după accesul în mediul de test",
    featuredHome: true,
    ordine: 4,
    paginaPublica: true,
    continut: lexical([
      ["h2", "NETOPIA în checkout-ul magazinului"],
      [
        "p",
        "Creăm plata din datele comenzii, păstrăm o referință internă și direcționăm clientul prin fluxul acceptat pentru contul comerciantului. Metodele disponibile în interfață depind de contractul și configurarea aprobate de NETOPIA.",
      ],
      ["h2", "Confirmarea nu depinde de browser"],
      [
        "p",
        "Întoarcerea cumpărătorului este utilă pentru experiența de checkout, dar statusul comenzii este actualizat după verificarea notificării tehnice. Evenimentele repetate sunt tratate idempotent, astfel încât aceeași plată să nu genereze procesări duplicate.",
      ],
      ["h2", "Operațiuni după plată"],
      [
        "p",
        "Păstrăm identificatorii necesari pentru reconciliere și putem conecta rambursarea sau anularea doar dacă operațiunea este oferită și permisă contului. Factura, stocul și livrarea pornesc dintr-un eveniment de business verificat, nu direct dintr-un click.",
      ],
      ["h2", "Testare înainte de producție"],
      [
        "p",
        "Acoperim plăți reușite, refuzuri, abandon, notificări întârziate, sume neconforme și schimbarea cheilor între medii. Lansarea este condiționată de contul activ și de verificările cerute comerciantului de furnizor.",
      ],
    ]),
    faq: [
      {
        intrebare: "Trebuie să avem deja cont NETOPIA?",
        raspuns:
          "Da. Comerciantul încheie contractul și obține aprobarea contului. Putem pregăti integrarea în paralel când accesul de test este disponibil.",
      },
      {
        intrebare: "Putem activa rate sau portofele digitale?",
        raspuns:
          "Numai dacă metodele respective sunt disponibile tehnic și activate contractual pentru comerciant. Le confirmăm înainte de includerea în scopul proiectului.",
      },
      {
        intrebare: "Cum sunt tratate notificările duplicate?",
        raspuns:
          "Fiecare eveniment este validat și asociat tranzacției existente. Repetarea aceleiași confirmări nu recreează factura, livrarea sau comanda.",
      },
      {
        intrebare: "Integrarea include comisioanele NETOPIA?",
        raspuns:
          "Nu. Taxele procesatorului, decontarea și condițiile comerciale sunt stabilite direct între NETOPIA și comerciant și nu fac parte din serviciul nostru tehnic.",
      },
    ],
    urlOficial: "https://netopia-payments.com/",
    metaTitlu: "Integrare NETOPIA Payments în magazin | LESCINSCHI",
    metaDescriere:
      "Integrare NETOPIA Payments cu checkout, notificări validate, statusuri de comandă și reconciliere, după aprobarea contului de comerciant.",
    serviceSlugs: ["integrari-plati-online", "magazine-online"],
  },
  {
    nume: "SmartBill",
    slug: "smartbill",
    aliasuri: ["SmartBill Cloud", "SmartBill Facturare"],
    categorie: "erp-stoc-contabilitate",
    regiuni: ["ro"],
    rezumat:
      "Integrăm SmartBill pentru emiterea controlată a documentelor și, unde produsul contractat permite, sincronizarea gestiunii.",
    capabilitati: [
      "Clienți și date fiscale preluate din comandă",
      "Emiterea facturilor sau proformelor la evenimentul stabilit",
      "Atașarea referinței documentului la comandă",
      "Produse și stocuri când SmartBill Gestiune și API-ul contului permit",
    ],
    cerinte: [
      "Cont SmartBill cu acces API disponibil",
      "Serii, cote TVA, monede și reguli de numerotare configurate",
      "Decizia contabilă privind momentul emiterii și anulării",
      "Configurarea separată necesară pentru transmiterea în RO e-Factura",
    ],
    durata: "De regulă 1-3 săptămâni, în funcție de documente și gestiune",
    featuredHome: true,
    ordine: 5,
    paginaPublica: true,
    continut: lexical([
      ["h2", "De la comandă la document în SmartBill"],
      [
        "p",
        "Mapăm cumpărătorul, adresa fiscală, produsele, unitățile de măsură, TVA-ul, reducerile, transportul și moneda. Factura sau proforma se emite numai la evenimentul aprobat de client și contabil, de exemplu după confirmarea plății ori pregătirea expedierii.",
      ],
      ["h2", "Facturare și gestiune sunt fluxuri distincte"],
      [
        "p",
        "Un cont de facturare nu implică automat toate funcțiile de gestiune. Dacă proiectul cere stocuri sau documente de depozit, verificăm produsul SmartBill folosit, drepturile API și identificatorii articolelor înainte de a proiecta sincronizarea.",
      ],
      ["h2", "RO e-Factura și responsabilitatea fiscală"],
      [
        "p",
        "Integrarea poate pregăti și transmite documentele prin funcțiile disponibile în contul SmartBill, dar autorizarea SPV, certificatul și regulile fiscale aparțin companiei. Nu decidem automat tratamentul fiscal și nu înlocuim validarea contabilă.",
      ],
      ["h2", "Erori și corecții"],
      [
        "p",
        "Prevenim emiterea duplicată cu referințe idempotente și păstrăm răspunsul API lângă comandă. Pentru anulare, storno sau corectarea datelor folosim fluxul legal și operațiunile disponibile, nu ștergerea arbitrară a unui document emis.",
      ],
    ]),
    faq: [
      {
        intrebare: "Când se emite factura dintr-o comandă online?",
        raspuns:
          "Momentul se stabilește cu firma și contabilul: la plată, confirmare, expediere sau alt eveniment valid. Integrarea aplică regula aprobată, nu o presupune.",
      },
      {
        intrebare: "Integrarea trimite automat factura în RO e-Factura?",
        raspuns:
          "Poate folosi fluxul disponibil în contul SmartBill după ce firma configurează și autorizează accesul necesar. Eligibilitatea și obligațiile fiscale trebuie verificate separat.",
      },
      {
        intrebare: "Putem sincroniza și stocul?",
        raspuns:
          "Da, dacă firma folosește SmartBill Gestiune și interfața contului oferă operațiunile necesare. Stabilim întâi sistemul care controlează stocul.",
      },
      {
        intrebare: "Cum evitați emiterea aceleiași facturi de două ori?",
        raspuns:
          "Legăm documentul de un identificator unic al comenzii și repetăm sigur cererile după erori. O comandă deja facturată nu declanșează un document nou.",
      },
    ],
    urlOficial: "https://www.smartbill.ro/",
    metaTitlu: "Integrare SmartBill și e-Factura | LESCINSCHI",
    metaDescriere:
      "Integrăm SmartBill cu magazinul pentru clienți, facturi, referințe de comandă și gestiune, cu reguli fiscale și anti-duplicare definite clar.",
    serviceSlugs: ["integrari-api", "magazine-online"],
  },
  {
    nume: "eMAG Marketplace",
    slug: "emag",
    aliasuri: ["eMAG Marketplace API", "eMAG Seller"],
    categorie: "marketplace-feeduri",
    regiuni: ["ro", "ue"],
    rezumat:
      "Integrăm magazinul sau ERP-ul cu eMAG Marketplace pentru oferte, stocuri, prețuri, comenzi și statusuri.",
    capabilitati: [
      "Publicarea și actualizarea ofertelor eligibile",
      "Sincronizarea prețurilor și stocurilor pe canal",
      "Importul comenzilor și al datelor necesare procesării",
      "Actualizarea statusurilor și documentelor acceptate de API",
    ],
    cerinte: [
      "Cont eMAG Marketplace activ și acces API pentru seller",
      "Maparea categoriilor, atributelor, TVA-ului și identificatorilor de produs",
      "Reguli clare pentru preț, stoc și sursa de adevăr",
      "Respectarea cerințelor marketplace și aprobarea ofertelor de către eMAG",
    ],
    durata: "De regulă 3-6 săptămâni, după complexitatea catalogului",
    featuredHome: true,
    ordine: 6,
    paginaPublica: true,
    continut: lexical([
      ["h2", "Un catalog adaptat regulilor eMAG"],
      [
        "p",
        "Produsele magazinului sunt mapate la categoriile și familiile de atribute cerute în Marketplace. Separăm datele de produs de oferta comercială, astfel încât titlul, identificatorii, prețul, stocul și termenul de procesare să aibă surse și reguli explicite.",
      ],
      ["h2", "Stoc și comenzi pe mai multe canale"],
      [
        "p",
        "Importăm comenzile eMAG într-un flux comun cu magazinul și rezervăm stocul fără a pierde originea canalului. Actualizările sunt limitate și reluate controlat, iar un buffer de stoc poate fi configurat când operațiunile fizice nu sunt instantanee.",
      ],
      ["h2", "Moderarea rămâne la marketplace"],
      [
        "p",
        "Integrarea trimite datele în forma cerută, dar publicarea unei oferte, categoria acceptată și regulile comerciale sunt decise de eMAG. Raportăm erorile și respingerile astfel încât echipa să poată corecta datele, fără a promite aprobarea automată.",
      ],
      ["h2", "Lansare etapizată"],
      [
        "p",
        "Începem cu un lot mic de produse și scenarii reale de comandă, anulare și actualizare de stoc. Extindem catalogul după ce identificatorii, TVA-ul, statusurile și documentele sunt validate de echipa operațională.",
      ],
    ]),
    faq: [
      {
        intrebare: "Este obligatoriu un cont eMAG Marketplace?",
        raspuns:
          "Da. Clientul trebuie să fie seller aprobat și să primească accesul API aferent contului. Integrarea tehnică nu înlocuiește procesul comercial de înrolare.",
      },
      {
        intrebare: "Putem publica orice produs automat?",
        raspuns:
          "Nu. Produsele trebuie să respecte taxonomia, atributele și regulile eMAG și pot trece prin validare sau moderare. Integrarea transmite și raportează rezultatul.",
      },
      {
        intrebare: "Cum evitați vânzarea peste stoc?",
        raspuns:
          "Stabilim o singură sursă de adevăr, rezervăm comenzile importate și folosim actualizări idempotente. La nevoie aplicăm un buffer adaptat ritmului depozitului.",
      },
      {
        intrebare: "Comenzile eMAG pot intra în ERP-ul nostru?",
        raspuns:
          "Da, dacă ERP-ul oferă o cale de integrare. Mapăm separat canalul, taxele, livrarea și statusurile înainte de activarea fluxului complet.",
      },
    ],
    urlOficial: "https://marketplace.emag.ro/",
    metaTitlu: "Integrare eMAG Marketplace cu magazin și ERP",
    metaDescriere:
      "Integrare eMAG pentru produse, oferte, stocuri, prețuri și comenzi, cu mapare de categorii, tratarea erorilor și lansare etapizată.",
    serviceSlugs: ["integrari-api", "magazine-online"],
  },
  {
    nume: "Sameday",
    slug: "sameday",
    aliasuri: ["SAMEDAY", "easybox by SAMEDAY"],
    categorie: "curierat-fulfillment",
    regiuni: ["ro", "ue"],
    rezumat:
      "Integrăm Sameday pentru generarea expedierilor și, unde contul permite, selectarea easybox și urmărirea statusurilor.",
    capabilitati: [
      "Crearea AWB-ului din datele validate ale comenzii",
      "Generarea și tipărirea etichetei de transport",
      "Selectarea punctului easybox când serviciul este disponibil",
      "Preluarea statusurilor și actualizarea comenzii",
    ],
    cerinte: [
      "Contract Sameday și servicii activate pentru cont",
      "Credentiale API și nomenclatoarele aferente clientului",
      "Date corecte de adresă, greutate, dimensiuni și ramburs",
      "Confirmarea țărilor, serviciilor și lockerelor acoperite contractual",
    ],
    durata: "De regulă 1-3 săptămâni după accesul API",
    featuredHome: true,
    ordine: 7,
    paginaPublica: true,
    continut: lexical([
      ["h2", "AWB Sameday din comanda magazinului"],
      [
        "p",
        "Transformăm datele de livrare, colet și ramburs în cererea acceptată de contul Sameday. Răspunsul este păstrat lângă comandă, iar eticheta poate fi tipărită de echipa depozitului fără reintroducerea manuală a adresei.",
      ],
      ["h2", "Livrare la easybox"],
      [
        "p",
        "Dacă serviciul este activ și interfața oferă nomenclatorul necesar, clientul poate alege un easybox în checkout. Salvăm identificatorul punctului, nu doar adresa afișată, și îl trimitem împreună cu expedierea.",
      ],
      ["h2", "Statusuri și excepții"],
      [
        "p",
        "Mapăm statusurile curierului în stări utile magazinului fără a le confunda cu promisiuni de livrare. Evenimentele necunoscute sunt jurnalizate, iar anularea, returul sau schimbarea destinației sunt implementate numai dacă API-ul și contractul le permit.",
      ],
      ["h2", "Ce testăm"],
      [
        "p",
        "Verificăm livrarea la adresă și locker, rambursul, coletele multiple dacă sunt necesare, eticheta, adresele incomplete și reluarea după erori. Tarifele și timpii de transport sunt furnizate de Sameday, nu garantate de integrare.",
      ],
    ]),
    faq: [
      {
        intrebare: "Avem nevoie de contract Sameday?",
        raspuns:
          "Da. Clientul contractează serviciile și obține accesul API. Tipurile de livrare și tarifele disponibile depind de acel contract.",
      },
      {
        intrebare: "Putem afișa harta easybox în checkout?",
        raspuns:
          "Da, dacă serviciul și datele punctelor sunt disponibile pentru contul și piața respectivă. Confirmăm metoda tehnică înainte de implementare.",
      },
      {
        intrebare: "Se poate genera automat AWB-ul?",
        raspuns:
          "Da, pe baza unei reguli aprobate, de exemplu după confirmarea comenzii. Datele lipsă sau invalide sunt oprite pentru corectare, nu trimise automat.",
      },
      {
        intrebare: "Integrarea garantează termenul de livrare?",
        raspuns:
          "Nu. Noi automatizăm schimbul de date. Acoperirea, tariful și timpul de transport sunt stabilite și executate de curier conform contractului.",
      },
    ],
    urlOficial: "https://sameday.ro/",
    metaTitlu: "Integrare Sameday AWB și easybox | LESCINSCHI",
    metaDescriere:
      "Integrăm Sameday pentru AWB, etichete, easybox și statusuri, după activarea serviciilor și accesului API în contul comerciantului.",
    serviceSlugs: ["integrari-curierat", "magazine-online"],
  },
  {
    nume: "FAN Courier",
    slug: "fan-courier",
    aliasuri: ["FAN Courier API", "SelfAWB"],
    categorie: "curierat-fulfillment",
    regiuni: ["ro"],
    rezumat:
      "Integrăm FAN Courier cu fluxul de comenzi pentru AWB, etichete, tracking și operațiunile activate în cont.",
    capabilitati: [
      "Generarea AWB-ului cu serviciul și opțiunile contractate",
      "Descărcarea etichetei pentru depozit",
      "Urmărirea statusurilor expedierii",
      "Cereri de pickup sau anulare dacă accesul oferit le permite",
    ],
    cerinte: [
      "Contract FAN Courier și cont SelfAWB sau acces API",
      "Credentiale de test ori producție furnizate clientului",
      "Nomenclatoare de localități și reguli de validare a adresei",
      "Greutate, colete, ramburs și serviciu de livrare definite corect",
    ],
    durata: "De regulă 1-3 săptămâni după accesul tehnic",
    featuredHome: true,
    ordine: 8,
    paginaPublica: true,
    continut: lexical([
      ["h2", "AWB FAN Courier fără reintroducerea comenzii"],
      [
        "p",
        "Preluăm destinatarul, adresa, telefonul, conținutul, greutatea, numărul de colete și rambursul din comandă. Înainte de trimitere aplicăm validările convenite și păstrăm numărul AWB și eticheta în panoul magazinului.",
      ],
      ["h2", "Localități și servicii contractate"],
      [
        "p",
        "Adresele sunt mapate la nomenclatoarele și regulile cerute de interfața curierului. Serviciile, kilometrii exteriori, opțiunile de ramburs și alte condiții depind de contractul FAN Courier, nu sunt inventate sau garantate de magazin.",
      ],
      ["h2", "Tracking pentru echipă și client"],
      [
        "p",
        "Preluăm statusurile disponibile și le mapăm la un istoric lizibil al comenzii. Notificările către client pot fi declanșate doar pentru evenimente relevante, fără a transforma estimările curierului în termene promise de noi.",
      ],
      ["h2", "Testare operațională"],
      [
        "p",
        "Testăm eticheta în formatul imprimantei, rambursul, coletele multiple, adresele cu erori, anularea și reluarea cererilor. Echipa depozitului validează fluxul complet înainte ca AWB-ul automat să fie activat pentru toate comenzile.",
      ],
    ]),
    faq: [
      {
        intrebare: "Ce acces este necesar pentru integrarea FAN Courier?",
        raspuns:
          "Este necesar un contract activ și accesul tehnic asociat contului clientului. FAN Courier stabilește credentialele și serviciile disponibile.",
      },
      {
        intrebare: "AWB-ul poate fi creat imediat după comandă?",
        raspuns:
          "Da, dar recomandăm o regulă potrivită procesului, de exemplu după confirmare sau validarea plății. Comenzile incomplete rămân pentru verificare.",
      },
      {
        intrebare: "Putem urmări coletul în panoul magazinului?",
        raspuns:
          "Da, mapăm statusurile oferite de curier și păstrăm istoricul. Frecvența și detaliul actualizărilor depind de interfața FAN Courier.",
      },
      {
        intrebare: "Tariful de livrare este calculat de integrare?",
        raspuns:
          "Putem folosi informațiile și regulile disponibile pentru cont, dar tarifele finale și condițiile comerciale sunt cele din contractul clientului cu FAN Courier.",
      },
    ],
    urlOficial: "https://www.fancourier.ro/",
    metaTitlu: "Integrare FAN Courier pentru AWB și tracking",
    metaDescriere:
      "Integrare FAN Courier cu magazinul pentru AWB, etichete și tracking, pe baza contractului, nomenclatoarelor și accesului tehnic al clientului.",
    serviceSlugs: ["integrari-curierat", "magazine-online"],
  },
  {
    nume: "Nova Poshta",
    slug: "nova-poshta",
    aliasuri: ["Nova Poshta Moldova"],
    categorie: "curierat-fulfillment",
    regiuni: ["md", "ue", "international"],
    rezumat:
      "Integrăm Nova Poshta pentru expediții, puncte de ridicare și tracking, conform API-ului și contractului din piața folosită.",
    capabilitati: [
      "Crearea documentului de expediție și a etichetei",
      "Selectarea sucursalei sau lockerului când interfața îl oferă",
      "Nomenclatoare pentru localități și puncte de ridicare",
      "Preluarea statusurilor și a referinței de tracking",
    ],
    cerinte: [
      "Cont comercial și acces API pentru entitatea Nova Poshta relevantă",
      "Țara de origine, destinațiile și serviciile contractate confirmate",
      "Greutate, dimensiuni, conținut și valoare declarată corecte",
      "Proces separat pentru documentele vamale ale expedierilor eligibile",
    ],
    durata: "De regulă 2-4 săptămâni, în funcție de țări și servicii",
    featuredHome: true,
    ordine: 9,
    paginaPublica: true,
    continut: lexical([
      ["h2", "Nova Poshta în fluxul magazinului"],
      [
        "p",
        "Integrarea folosește contul și interfața aferente pieței în care expediază compania. Salvăm identificatorii Nova Poshta pentru localitate, sucursală sau locker, astfel încât documentul de transport să nu depindă de o adresă liberă introdusă diferit de fiecare client.",
      ],
      ["h2", "Expediere și tracking"],
      [
        "p",
        "Datele coletului și destinatarului sunt validate înainte de crearea expedierii. Numărul de tracking și statusurile disponibile sunt legate de comandă, iar evenimentele repetate sau temporar indisponibile sunt procesate fără dublarea documentului.",
      ],
      ["h2", "Livrările internaționale au cerințe suplimentare"],
      [
        "p",
        "Pentru cross-border verificăm separat rutele, serviciile, moneda, valoarea declarată și documentele vamale. Integrarea poate transporta datele acceptate de API, dar nu stabilește eligibilitatea vamală și nu garantează timpul de tranzit.",
      ],
      ["h2", "Validare înainte de lansare"],
      [
        "p",
        "Testăm destinații reale, puncte care devin indisponibile, colete cu limite diferite și anularea atunci când este permisă. Acoperirea exactă și costurile sunt confirmate de Nova Poshta în contractul clientului.",
      ],
    ]),
    faq: [
      {
        intrebare: "Integrarea funcționează pentru Nova Poshta Moldova?",
        raspuns:
          "Da, dacă firma are un cont și accesul tehnic necesar pentru serviciile din Moldova. Confirmăm entitatea și documentația înainte de implementare.",
      },
      {
        intrebare: "Clientul poate alege o sucursală sau un locker?",
        raspuns:
          "Da, când nomenclatorul și serviciul sunt disponibile în interfața contului. Păstrăm identificatorul oficial al punctului selectat.",
      },
      {
        intrebare: "Include și livrare internațională?",
        raspuns:
          "Poate include rutele contractate, însă țările, limitele și documentele vamale se verifică separat. Nu presupunem că fluxul intern este identic cu cel cross-border.",
      },
      {
        intrebare: "Puteți garanta data de livrare afișată?",
        raspuns:
          "Nu. Putem afișa informația disponibilă de la curier, dar executarea și termenul transportului aparțin furnizorului și condițiilor expedierii.",
      },
    ],
    urlOficial: "https://novaposhta.md/",
    metaTitlu: "Integrare Nova Poshta pentru magazin online",
    metaDescriere:
      "Integrăm Nova Poshta pentru expediții, sucursale, lockere și tracking în Moldova sau cross-border, în limitele contului și API-ului disponibil.",
    serviceSlugs: ["integrari-curierat", "magazine-online"],
  },
  {
    nume: "WhatsApp Business",
    slug: "whatsapp-business",
    aliasuri: ["WhatsApp Business Platform", "WhatsApp Cloud API", "WABA"],
    categorie: "automatizari-comunicare",
    regiuni: ["md", "ro", "ue", "international"],
    rezumat:
      "Integrăm WhatsApp Business Platform pentru conversații, șabloane aprobate, notificări și rutarea mesajelor către echipă.",
    capabilitati: [
      "Mesaje inițiate de client și răspunsuri în fereastra permisă",
      "Șabloane aprobate pentru notificări operaționale",
      "Webhook-uri pentru mesaje și statusuri de livrare",
      "Rutare către CRM, suport sau automatizări interne",
    ],
    cerinte: [
      "Meta Business Portfolio și WhatsApp Business Account configurate",
      "Număr de telefon eligibil și verificarea cerută de Meta",
      "Consimțământ documentat pentru mesajele inițiate de companie",
      "Șabloane aprobate și politici clare de retenție a conversațiilor",
    ],
    durata: "De regulă 2-4 săptămâni, inclusiv configurarea contului",
    featuredHome: false,
    ordine: 10,
    paginaPublica: true,
    continut: lexical([
      ["h2", "WhatsApp Business Platform, nu automatizare pe aplicația personală"],
      [
        "p",
        "Pentru integrare folosim interfața destinată companiilor, prin Meta Cloud API sau un furnizor compatibil ales de client. Nu automatizăm WhatsApp Web și nu cerem scanarea permanentă a unui cont personal.",
      ],
      ["h2", "Conversații și notificări"],
      [
        "p",
        "Mesajele primite pot crea un lead, un tichet sau o activitate în CRM. Pentru notificări inițiate de companie folosim șabloane aprobate, variabile validate și un scop legitim, precum actualizarea unei comenzi sau confirmarea unei programări.",
      ],
      ["h2", "Opt-in și reguli Meta"],
      [
        "p",
        "Clientul trebuie să știe pentru ce își oferă numărul și să poată opri comunicarea. Respectăm fereastra de conversație, categoriile șabloanelor și politicile platformei; integrarea nu este o cale pentru mesaje comerciale nesolicitate.",
      ],
      ["h2", "Securitate și operare"],
      [
        "p",
        "Token-urile sunt păstrate în secret, webhook-urile sunt validate, iar accesul agenților este separat pe roluri. Definim ce date intră în CRM, cât timp se păstrează și ce se întâmplă când livrarea unui mesaj eșuează.",
      ],
    ]),
    faq: [
      {
        intrebare: "Putem folosi numărul actual de WhatsApp?",
        raspuns:
          "Uneori da, în funcție de starea numărului și de procesul Meta disponibil la configurare. Verificăm condițiile înainte de migrare ca să evităm întreruperile.",
      },
      {
        intrebare: "Putem trimite orice mesaj automat?",
        raspuns:
          "Nu. Mesajele inițiate de companie trebuie să respecte opt-in-ul, șabloanele aprobate și politicile WhatsApp. Limităm automatizările la scenarii permise și utile.",
      },
      {
        intrebare: "WhatsApp se poate conecta la CRM?",
        raspuns:
          "Da. Putem crea sau actualiza contacte și conversații dacă CRM-ul oferă API și dacă maparea respectă scopul și retenția aprobate de companie.",
      },
      {
        intrebare: "Cine plătește taxele platformei sau ale furnizorului?",
        raspuns:
          "Clientul le achită direct conform contului și furnizorului ales. Aceste taxe sunt separate de implementarea și mentenanța tehnică oferite de noi.",
      },
    ],
    urlOficial: "https://business.whatsapp.com/",
    metaTitlu: "Integrare WhatsApp Business API | LESCINSCHI",
    metaDescriere:
      "Integrăm WhatsApp Business Platform cu site-ul și CRM-ul pentru conversații, șabloane aprobate și notificări bazate pe consimțământ.",
    serviceSlugs: [
      "integrari-api",
      "ai-automatizari",
      "creare-site-uri",
      "landing-page-uri",
      "reclame-meta",
    ],
  },
  {
    nume: "n8n",
    slug: "n8n",
    aliasuri: ["n8n Workflow Automation"],
    categorie: "automatizari-comunicare",
    regiuni: ["md", "ro", "ue", "international"],
    rezumat:
      "Construim fluxuri n8n între site, ERP, CRM și servicii de comunicare, cu credentiale, erori și reluări controlate.",
    capabilitati: [
      "Webhook-uri și fluxuri declanșate de evenimente",
      "Conectarea API-urilor prin noduri existente sau cereri HTTP",
      "Transformări, ramificații și validări de date",
      "Retry, alerte și jurnal operațional adaptat fluxului",
    ],
    cerinte: [
      "Cont n8n Cloud sau infrastructură administrată pentru self-hosting",
      "Acces API separat pentru fiecare sistem conectat",
      "Volum estimat, limite de rată și reguli de retenție",
      "Proprietar operațional pentru aprobarea și urmărirea fluxurilor",
    ],
    durata: "De regulă 1-4 săptămâni pentru primul set de fluxuri",
    featuredHome: true,
    ordine: 11,
    paginaPublica: true,
    continut: lexical([
      ["h2", "Când folosim n8n"],
      [
        "p",
        "n8n este potrivit când mai multe sisteme trebuie legate rapid, iar regulile pot fi exprimate ca pași și evenimente clare. Îl folosim pentru sincronizări, notificări, îmbogățirea lead-urilor și operațiuni interne, nu ca înlocuitor automat pentru orice serviciu critic.",
      ],
      ["h2", "Cloud sau self-hosted"],
      [
        "p",
        "Alegerea depinde de responsabilitatea pentru actualizări, backup, disponibilitate, date și costuri. Self-hosting oferă control, dar cere operare continuă; varianta cloud mută o parte din această responsabilitate către furnizor.",
      ],
      ["h2", "Fluxuri care pot fi reluate"],
      [
        "p",
        "Definim identificatori idempotenti, timeout-uri, retry și ramuri de eroare pentru fiecare apel extern. Operațiunile financiare sau de stoc primesc validări suplimentare și, când riscul o cere, un pas de aprobare umană.",
      ],
      ["h2", "Predare și mentenanță"],
      [
        "p",
        "Documentăm trigger-ul, credentialele folosite, intrările, ieșirile și persoana alertată la eșec. Accesul rămâne în contul clientului, iar schimbările de API sau de volum sunt evaluate înainte de a afecta fluxurile active.",
      ],
    ]),
    faq: [
      {
        intrebare: "n8n înlocuiește întotdeauna codul custom?",
        raspuns:
          "Nu. Este eficient pentru orchestrare și fluxuri clare. Pentru volum mare, latență strictă sau logică centrală complexă poate fi mai sigur un serviciu dedicat.",
      },
      {
        intrebare: "Putem găzdui n8n pe infrastructura noastră?",
        raspuns:
          "Da, dacă există responsabilitate pentru actualizări, backup, securitate și monitorizare. Stabilim aceste obligații înainte de alegerea self-hosted.",
      },
      {
        intrebare: "Cum sunt protejate cheile API?",
        raspuns:
          "Le stocăm în mecanismul de credentiale al instanței, limităm accesul și evităm includerea secretelor în noduri, loguri sau exporturi de workflow.",
      },
      {
        intrebare: "Ce se întâmplă dacă un sistem conectat nu răspunde?",
        raspuns:
          "Fluxul folosește timeout, retry și alertare potrivite operațiunii. Pentru date importante păstrăm o referință care permite reluarea fără dublarea efectului.",
      },
    ],
    urlOficial: "https://n8n.io/",
    metaTitlu: "Integrare n8n și automatizări API | LESCINSCHI",
    metaDescriere:
      "Construim automatizări n8n între site, ERP, CRM și mesagerie, cu fluxuri documentate, credentiale protejate, retry și monitorizare.",
    serviceSlugs: ["integrari-api", "ai-automatizari"],
  },
  {
    nume: "Oblio",
    slug: "oblio",
    aliasuri: ["Oblio.eu", "Oblio API"],
    categorie: "erp-stoc-contabilitate",
    regiuni: ["ro"],
    rezumat:
      "Integrăm Oblio cu magazinul pentru clienți, produse și documente, inclusiv fluxul e-Factura configurat în cont.",
    capabilitati: [
      "Crearea sau identificarea clientului din comandă",
      "Emiterea facturii ori proformei la evenimentul aprobat",
      "Păstrarea seriei, numărului și legăturii cu comanda",
      "Transmiterea prin fluxul e-Factura disponibil și autorizat în Oblio",
    ],
    cerinte: [
      "Cont Oblio activ și acces API",
      "Serii, cote TVA, unități, monede și datele firmei configurate",
      "Reguli validate de contabil pentru emitere, anulare și storno",
      "Autorizarea necesară pentru SPV și RO e-Factura",
    ],
    durata: "De regulă 1-3 săptămâni după configurarea contului",
    featuredHome: false,
    ordine: 12,
    paginaPublica: true,
    continut: lexical([
      ["h2", "Documente Oblio generate din evenimente clare"],
      [
        "p",
        "Mapăm datele firmei sau persoanei, liniile comenzii, reducerile, transportul, TVA-ul și moneda. Documentul se emite la momentul decis împreună cu echipa financiară, nu automat la orice creare de coș sau comandă neconfirmată.",
      ],
      ["h2", "Referințe și anti-duplicare"],
      [
        "p",
        "Fiecare cerere are o referință stabilă către comandă, iar seria și numărul returnate de Oblio sunt salvate în magazin. Dacă răspunsul întârzie, verificăm rezultatul înainte de reluare pentru a evita două documente pentru aceeași operațiune.",
      ],
      ["h2", "RO e-Factura"],
      [
        "p",
        "Putem conecta magazinul la fluxul disponibil în contul Oblio după ce firma autorizează SPV și își configurează obligațiile. Integrarea transportă și urmărește datele tehnice, dar tratamentul fiscal rămâne validat de companie și contabil.",
      ],
      ["h2", "Corecții și monitorizare"],
      [
        "p",
        "Anularea și storno urmează documentele și operațiunile legale oferite de sistem. Raportăm erorile de validare, păstrăm identificatorii necesari și nu includem token-uri sau date sensibile în logurile operaționale.",
      ],
    ]),
    faq: [
      {
        intrebare: "Ce este necesar pentru accesul API Oblio?",
        raspuns:
          "Clientul trebuie să aibă un cont și opțiunile necesare active și să furnizeze credentialele printr-un canal sigur. Confirmăm drepturile înainte de dezvoltare.",
      },
      {
        intrebare: "Factura poate fi emisă automat după plată?",
        raspuns:
          "Da, dacă acesta este evenimentul fiscal aprobat. Putem folosi și confirmarea sau expedierea, în funcție de procesul stabilit cu contabilul.",
      },
      {
        intrebare: "Integrarea include RO e-Factura?",
        raspuns:
          "Poate folosi funcția disponibilă în Oblio după configurarea și autorizarea firmei. Nu putem substitui accesul SPV sau deciziile fiscale ale clientului.",
      },
      {
        intrebare: "Cum se corectează o factură deja emisă?",
        raspuns:
          "Folosim fluxul de anulare sau storno permis de Oblio și de regulile contabile. Nu ștergem documentul și nu emitem automat altul fără trasabilitate.",
      },
    ],
    urlOficial: "https://www.oblio.eu/",
    metaTitlu: "Integrare Oblio și e-Factura | LESCINSCHI",
    metaDescriere:
      "Integrăm Oblio cu magazinul pentru clienți, facturi și e-Factura, cu serii configurate, referințe anti-duplicare și reguli contabile clare.",
    serviceSlugs: ["integrari-api", "magazine-online"],
  },
  {
    nume: "Moldindconbank (MICB)",
    slug: "moldindconbank",
    aliasuri: ["Moldindconbank", "MICB"],
    categorie: "plati-online",
    regiuni: ["md"],
    rezumat:
      "Integrăm soluția e-commerce contractată de la Moldindconbank pentru inițierea și confirmarea plăților online.",
    capabilitati: ["Inițiere plată", "Confirmare tranzacție", "Reconciliere comandă"],
    cerinte: ["Contract comerciant", "Acces tehnic oferit de bancă", "Site HTTPS și politici comerciale"],
    featuredHome: false,
    ordine: 13,
    paginaPublica: false,
    faq: [],
    urlOficial: "https://micb.md/",
    metaTitlu: "Integrare Moldindconbank pentru plăți online",
    metaDescriere:
      "Integrare tehnică Moldindconbank pentru checkout și confirmarea tranzacțiilor, în limitele produsului și contului aprobate comerciantului.",
    serviceSlugs: ["integrari-plati-online", "magazine-online"],
  },
  {
    nume: "Victoriabank",
    slug: "victoriabank",
    aliasuri: ["VictoriaBank", "Victoriabank eCommerce"],
    categorie: "plati-online",
    regiuni: ["md"],
    rezumat:
      "Integrăm gateway-ul e-commerce oferit comerciantului de Victoriabank și sincronizăm statusul plății cu magazinul.",
    capabilitati: ["Inițiere plată", "Statusuri de tranzacție", "Referințe pentru reconciliere"],
    cerinte: ["Contract Victoriabank", "Credentiale de test și producție", "Metode activate în cont"],
    featuredHome: false,
    ordine: 14,
    paginaPublica: false,
    faq: [],
    urlOficial: "https://www.victoriabank.md/",
    metaTitlu: "Integrare Victoriabank eCommerce | LESCINSCHI",
    metaDescriere:
      "Conectăm checkout-ul cu soluția Victoriabank aprobată comerciantului, pentru plăți, confirmări validate și evidența tranzacțiilor.",
    serviceSlugs: ["integrari-plati-online", "magazine-online"],
  },
  {
    nume: "FinComBank",
    slug: "fincombank",
    aliasuri: ["FCB", "FinComBank eCommerce"],
    categorie: "plati-online",
    regiuni: ["md"],
    rezumat:
      "Integrăm produsul de acceptare online activat de FinComBank pentru comerciant și legăm tranzacțiile de comenzi.",
    capabilitati: ["Cereri de plată", "Confirmări server-to-server", "Actualizarea statusului comenzii"],
    cerinte: ["Contract FinComBank", "Documentație și credentiale", "Mediu de test disponibil"],
    featuredHome: false,
    ordine: 15,
    paginaPublica: false,
    faq: [],
    urlOficial: "https://fincombank.com/",
    metaTitlu: "Integrare FinComBank pentru magazin online",
    metaDescriere:
      "Integrare FinComBank pentru inițierea plății și confirmarea sigură a comenzii, după aprobarea comerciantului și furnizarea accesului.",
    serviceSlugs: ["integrari-plati-online", "magazine-online"],
  },
  {
    nume: "Paynet",
    slug: "paynet",
    aliasuri: ["Paynet Moldova"],
    categorie: "plati-online",
    regiuni: ["md"],
    rezumat:
      "Integrăm fluxul Paynet disponibil comerciantului pentru plăți, confirmări și corelarea tranzacțiilor cu comenzile.",
    capabilitati: ["Inițiere plată", "Confirmare și status", "Reconciliere tranzacții"],
    cerinte: ["Contract Paynet", "Cont comerciant aprobat", "Acces API sau documentație furnizată"],
    featuredHome: false,
    ordine: 16,
    paginaPublica: false,
    faq: [],
    urlOficial: "https://paynet.md/",
    metaTitlu: "Integrare Paynet pentru plăți online",
    metaDescriere:
      "Conectăm Paynet la checkout și la statusurile comenzilor, folosind funcțiile aprobate și credentialele contului de comerciant.",
    serviceSlugs: ["integrari-plati-online", "magazine-online"],
  },
  {
    nume: "BPay",
    slug: "bpay",
    aliasuri: ["bpay.md"],
    categorie: "plati-online",
    regiuni: ["md"],
    rezumat:
      "Integrăm BPay în fluxul de încasare atunci când comerciantul are contractul și interfața tehnică necesare.",
    capabilitati: ["Crearea plății", "Referință de comandă", "Confirmarea statusului"],
    cerinte: ["Contract BPay", "Credentiale comerciant", "Verificarea operațiunilor disponibile"],
    featuredHome: false,
    ordine: 17,
    paginaPublica: false,
    faq: [],
    urlOficial: "https://bpay.md/",
    metaTitlu: "Integrare BPay pentru checkout online",
    metaDescriere:
      "Integrare BPay pentru inițierea și confirmarea plăților, condiționată de contractul, aprobarea și accesul tehnic ale comerciantului.",
    serviceSlugs: ["integrari-plati-online", "magazine-online"],
  },
  {
    nume: "MPay",
    slug: "mpay",
    aliasuri: ["MPay Moldova", "Serviciul guvernamental de plăți electronice"],
    categorie: "plati-online",
    regiuni: ["md"],
    rezumat:
      "Integrăm MPay numai pentru servicii și instituții eligibile, după confirmarea cadrului de conectare și a accesului.",
    capabilitati: ["Referințe de plată eligibile", "Redirecționare către fluxul disponibil", "Confirmarea statusului"],
    cerinte: ["Eligibilitate confirmată", "Acordul instituțional necesar", "Documentație și mediu de test"],
    featuredHome: false,
    ordine: 18,
    paginaPublica: false,
    faq: [],
    urlOficial: "https://mpay.gov.md/",
    metaTitlu: "Integrare MPay pentru proiecte eligibile",
    metaDescriere:
      "Integrare MPay pentru proiecte publice sau instituționale eligibile, după confirmarea accesului și a fluxului tehnic aplicabil.",
    serviceSlugs: ["integrari-plati-online", "integrari-api"],
  },
  {
    nume: "Banca Transilvania eCommerce",
    slug: "banca-transilvania-ecommerce",
    aliasuri: ["Banca Transilvania", "BT eCommerce"],
    categorie: "plati-online",
    regiuni: ["ro"],
    rezumat:
      "Integrăm produsul eCommerce contractat de la Banca Transilvania, cu confirmări de plată și statusuri de comandă.",
    capabilitati: ["Inițierea plății", "Confirmări de tranzacție", "Reconciliere cu comenzile"],
    cerinte: ["Produs eCommerce activ", "Contract și cont comerciant", "Credentiale și specificații curente"],
    featuredHome: false,
    ordine: 19,
    paginaPublica: false,
    faq: [],
    urlOficial: "https://www.bancatransilvania.ro/",
    metaTitlu: "Integrare Banca Transilvania eCommerce",
    metaDescriere:
      "Conectăm magazinul la produsul eCommerce Banca Transilvania activat comerciantului, pentru plăți și confirmarea comenzilor.",
    serviceSlugs: ["integrari-plati-online", "magazine-online"],
  },
  {
    nume: "LiqPay",
    slug: "liqpay",
    aliasuri: ["LIQPAY"],
    categorie: "plati-online",
    regiuni: ["md", "international"],
    rezumat:
      "Integrăm LiqPay pentru piețele și entitățile eligibile, cu checkout, notificări și referințe de tranzacție.",
    capabilitati: ["Checkout LiqPay", "Callback-uri de status", "Referințe pentru reconciliere"],
    cerinte: ["Cont merchant eligibil", "Credentiale API", "Țări și monede confirmate"],
    featuredHome: false,
    ordine: 20,
    paginaPublica: false,
    faq: [],
    urlOficial: "https://www.liqpay.ua/",
    metaTitlu: "Integrare LiqPay pentru plăți online",
    metaDescriere:
      "Integrare LiqPay pentru checkout și confirmări de tranzacție, în țările, monedele și funcțiile aprobate contului comerciantului.",
    serviceSlugs: ["integrari-plati-online", "magazine-online"],
  },
  {
    nume: "PayPal",
    slug: "paypal",
    aliasuri: ["PayPal Checkout"],
    categorie: "plati-online",
    regiuni: ["ro", "ue", "international"],
    rezumat:
      "Integrăm PayPal Checkout pentru conturi business eligibile și sincronizăm capturile și statusurile cu comenzile.",
    capabilitati: ["Checkout PayPal", "Captură și status", "Webhook-uri pentru comenzi"],
    cerinte: ["Cont PayPal Business eligibil", "Aplicație și credentiale API", "Țări și monede verificate"],
    featuredHome: false,
    ordine: 21,
    paginaPublica: false,
    faq: [],
    urlOficial: "https://www.paypal.com/",
    metaTitlu: "Integrare PayPal Checkout pentru magazin",
    metaDescriere:
      "Integrăm PayPal Checkout cu magazinul pentru plăți și statusuri, în limitele contului business, țării și monedelor acceptate.",
    serviceSlugs: ["integrari-plati-online", "magazine-online", "landing-page-uri"],
  },
  {
    nume: "Stripe",
    slug: "stripe",
    aliasuri: ["Stripe Payments", "Stripe Checkout"],
    categorie: "plati-online",
    regiuni: ["ro", "ue", "international"],
    rezumat:
      "Integrăm Stripe pentru checkout, Payment Intents, webhook-uri și operațiunile activate în contul companiei.",
    capabilitati: ["Stripe Checkout sau Elements", "Confirmări prin webhook", "Plăți și rambursări permise contului"],
    cerinte: ["Cont Stripe eligibil și verificat", "Chei separate pe medii", "Metode și monede activate"],
    featuredHome: true,
    ordine: 22,
    paginaPublica: false,
    faq: [],
    urlOficial: "https://stripe.com/",
    metaTitlu: "Integrare Stripe pentru checkout și plăți",
    metaDescriere:
      "Integrare Stripe cu checkout și webhook-uri validate pentru comenzi, după verificarea contului, metodelor și monedelor companiei.",
    serviceSlugs: ["integrari-plati-online", "magazine-online", "landing-page-uri"],
  },
  {
    nume: "Iute",
    slug: "iute",
    aliasuri: ["iutecredit", "Iute Credit"],
    categorie: "rate-finantare",
    regiuni: ["md"],
    rezumat:
      "Integrăm un flux Iute pentru finanțare numai după aprobarea comerciantului și definirea procesului comercial.",
    capabilitati: ["Trimiterea cererii eligibile", "Referință între comandă și solicitare", "Statusuri disponibile"],
    cerinte: ["Contract comercial cu finanțatorul", "Consimțământ și informare client", "Acces tehnic furnizat"],
    featuredHome: false,
    ordine: 23,
    paginaPublica: false,
    faq: [],
    urlOficial: "https://iute.md/",
    metaTitlu: "Integrare Iute pentru finanțarea comenzilor",
    metaDescriere:
      "Conectăm comenzile eligibile cu fluxul Iute, condiționat de contractul comercial, aprobarea finanțatorului și accesul tehnic.",
    serviceSlugs: ["integrari-plati-online", "magazine-online"],
  },
  {
    nume: "Microinvest",
    slug: "microinvest",
    aliasuri: ["Microinvest Moldova"],
    categorie: "rate-finantare",
    regiuni: ["md"],
    rezumat:
      "Integrăm fluxul de finanțare Microinvest pentru comercianții acceptați și scenariile aprobate de finanțator.",
    capabilitati: ["Cerere de finanțare", "Legătura cu oferta sau comanda", "Actualizarea statusului disponibil"],
    cerinte: ["Acord Microinvest", "Criterii și texte aprobate", "API sau metodă de schimb confirmată"],
    featuredHome: false,
    ordine: 24,
    paginaPublica: false,
    faq: [],
    urlOficial: "https://microinvest.md/",
    metaTitlu: "Integrare Microinvest pentru finanțare",
    metaDescriere:
      "Integrare Microinvest pentru cereri asociate comenzilor, după aprobarea comerciantului, a procesului și a accesului tehnic.",
    serviceSlugs: ["integrari-plati-online", "magazine-online"],
  },
  {
    nume: "Bitrix24",
    slug: "bitrix24",
    aliasuri: ["Bitrix 24"],
    categorie: "crm-vanzari",
    regiuni: ["md", "ro", "ue", "international"],
    rezumat:
      "Integrăm formularele și comenzile cu Bitrix24 pentru contacte, lead-uri, oportunități și activități comerciale.",
    capabilitati: ["Contacte și companii", "Lead-uri și oportunități", "Activități și webhooks"],
    cerinte: ["Cont Bitrix24", "Aplicație sau webhook autorizat", "Pipeline și câmpuri definite"],
    featuredHome: false,
    ordine: 25,
    paginaPublica: false,
    faq: [],
    urlOficial: "https://www.bitrix24.com/",
    metaTitlu: "Integrare Bitrix24 CRM cu site-ul",
    metaDescriere:
      "Conectăm site-ul cu Bitrix24 pentru lead-uri, contacte și oportunități, folosind câmpuri, permisiuni și reguli de deduplicare definite.",
    serviceSlugs: ["integrari-api", "landing-page-uri", "site-uri-corporative"],
  },
  {
    nume: "Kommo",
    slug: "kommo",
    aliasuri: ["amoCRM"],
    categorie: "crm-vanzari",
    regiuni: ["md", "ro", "ue", "international"],
    rezumat:
      "Integrăm Kommo cu site-ul și canalele de comunicare pentru lead-uri, contacte și etapele pipeline-ului.",
    capabilitati: ["Lead-uri și contacte", "Pipeline și taskuri", "Webhook-uri și surse de lead"],
    cerinte: ["Cont Kommo", "OAuth sau integrare autorizată", "Pipeline și deduplicare aprobate"],
    featuredHome: false,
    ordine: 26,
    paginaPublica: false,
    faq: [],
    urlOficial: "https://www.kommo.com/",
    metaTitlu: "Integrare Kommo CRM cu site și formulare",
    metaDescriere:
      "Integrare Kommo, cunoscut anterior ca amoCRM, pentru lead-uri, contacte, pipeline și automatizări conectate cu site-ul.",
    serviceSlugs: ["integrari-api", "landing-page-uri", "site-uri-corporative"],
  },
  {
    nume: "MoySklad",
    slug: "moysklad",
    aliasuri: ["Moy Sklad"],
    categorie: "erp-stoc-contabilitate",
    regiuni: ["md", "international"],
    rezumat:
      "Integrăm MoySklad pentru catalog, stoc, prețuri, comenzi și operațiuni de depozit disponibile prin API.",
    capabilitati: ["Produse și variante", "Stoc și preț", "Comenzi și statusuri"],
    cerinte: ["Cont MoySklad cu API", "Identificatori și depozite mapate", "Sursă de adevăr stabilită"],
    featuredHome: false,
    ordine: 27,
    paginaPublica: false,
    faq: [],
    urlOficial: "https://www.moysklad.ru/",
    metaTitlu: "Integrare MoySklad pentru stoc și comenzi",
    metaDescriere:
      "Conectăm MoySklad cu magazinul pentru produse, stocuri, prețuri și comenzi, cu mapare și reguli de sincronizare controlate.",
    serviceSlugs: ["integrari-api", "magazine-online"],
  },
  {
    nume: "999.md",
    slug: "999-md",
    aliasuri: ["999 Marketplace"],
    categorie: "marketplace-feeduri",
    regiuni: ["md"],
    rezumat:
      "Conectăm catalogul cu 999.md numai după verificarea metodei de schimb și a drepturilor disponibile contului comercial.",
    capabilitati: ["Export oferte", "Actualizare date comerciale", "Raportarea erorilor de publicare"],
    cerinte: ["Cont comercial eligibil", "Metodă de import sau API confirmată", "Reguli și categorii validate"],
    featuredHome: false,
    ordine: 28,
    paginaPublica: false,
    faq: [],
    urlOficial: "https://999.md/",
    metaTitlu: "Integrare catalog cu 999.md",
    metaDescriere:
      "Pregătim integrarea 999.md pentru oferte și actualizări numai după confirmarea accesului, formatului și regulilor contului comercial.",
    serviceSlugs: ["integrari-api", "magazine-online"],
  },
  {
    nume: "Meta Catalog",
    slug: "meta-catalog",
    aliasuri: ["Facebook Product Feed", "Meta Product Catalog"],
    categorie: "marketplace-feeduri",
    regiuni: ["md", "ro", "ue", "international"],
    rezumat:
      "Generăm și sincronizăm feedul de produse pentru Meta Catalog, cu identificatori stabili și validarea erorilor.",
    capabilitati: ["Feed produse și variante", "Preț și disponibilitate", "Diagnosticarea respingerilor"],
    cerinte: ["Business Portfolio și catalog", "Domeniu și sursă de date aprobate", "Politici și consimțământ relevante"],
    featuredHome: false,
    ordine: 29,
    paginaPublica: false,
    faq: [],
    urlOficial: "https://www.facebook.com/business/",
    metaTitlu: "Integrare Meta Catalog și Product Feed",
    metaDescriere:
      "Conectăm magazinul cu Meta Catalog printr-un feed valid pentru produse, variante, preț și stoc, cu diagnosticarea erorilor.",
    serviceSlugs: ["integrari-api", "magazine-online", "reclame-meta"],
  },
  {
    nume: "Google Merchant Center",
    slug: "google-merchant-center",
    aliasuri: ["Google Shopping Feed", "Merchant Center"],
    categorie: "marketplace-feeduri",
    regiuni: ["md", "ro", "ue", "international"],
    rezumat:
      "Conectăm catalogul la Google Merchant Center prin feeduri sau API-uri, cu produse, prețuri și disponibilitate coerente.",
    capabilitati: ["Feed de produse", "Actualizări de preț și stoc", "Diagnosticarea erorilor"],
    cerinte: ["Cont Merchant Center", "Domeniu verificat", "Date și politici conforme pieței țintă"],
    featuredHome: false,
    ordine: 30,
    paginaPublica: false,
    faq: [],
    urlOficial: "https://merchants.google.com/",
    metaTitlu: "Integrare Google Merchant Center și feed",
    metaDescriere:
      "Integrăm magazinul cu Google Merchant Center pentru feeduri de produse, prețuri și stoc, cu validare și remedierea erorilor de date.",
    serviceSlugs: ["integrari-api", "magazine-online", "reclame-google-ads"],
  },
  {
    nume: "Google Ads",
    slug: "google-ads",
    aliasuri: ["Google AdWords"],
    categorie: "marketing-analytics",
    regiuni: ["md", "ro", "ue", "international"],
    rezumat:
      "Integrăm Google Ads cu site-ul pentru conversii și audiențe, în acord cu consimțământul și strategia de măsurare.",
    capabilitati: ["Conversii web", "Parametri de campanie", "Audiențe eligibile"],
    cerinte: ["Cont Google Ads", "Plan de măsurare", "Mecanism de consimțământ configurat"],
    featuredHome: false,
    ordine: 31,
    paginaPublica: false,
    faq: [],
    urlOficial: "https://ads.google.com/",
    metaTitlu: "Integrare Google Ads și conversii",
    metaDescriere:
      "Configurăm integrarea Google Ads pentru conversii și audiențe, cu evenimente documentate, verificare și respectarea consimțământului.",
    serviceSlugs: ["reclame-google-ads", "landing-page-uri"],
  },
  {
    nume: "Meta Pixel",
    slug: "meta-pixel",
    aliasuri: ["Facebook Pixel"],
    categorie: "marketing-analytics",
    regiuni: ["md", "ro", "ue", "international"],
    rezumat:
      "Implementăm Meta Pixel pentru evenimente web și conversii, activat conform mecanismului de consimțământ al site-ului.",
    capabilitati: ["Page view și evenimente", "Conversii Meta", "Parametri de ecommerce validați"],
    cerinte: ["Dataset Meta", "Plan de evenimente", "Consimțământ pentru tracking"],
    featuredHome: false,
    ordine: 32,
    paginaPublica: false,
    faq: [],
    urlOficial: "https://www.facebook.com/business/tools/meta-pixel",
    metaTitlu: "Integrare Meta Pixel pentru conversii",
    metaDescriere:
      "Implementăm Meta Pixel cu evenimente și conversii verificate, fără dublări și cu activare condiționată de consimțământul utilizatorului.",
    serviceSlugs: ["reclame-meta", "landing-page-uri", "magazine-online"],
  },
  {
    nume: "Meta Conversions API",
    slug: "meta-conversions-api",
    aliasuri: ["Facebook Conversions API", "CAPI"],
    categorie: "marketing-analytics",
    regiuni: ["md", "ro", "ue", "international"],
    rezumat:
      "Integrăm Meta Conversions API pentru transmiterea controlată a evenimentelor server-side și deduplicarea cu Pixel.",
    capabilitati: ["Evenimente server-side", "Deduplicare event_id", "Monitorizarea calității datelor"],
    cerinte: ["Dataset și token autorizat", "Temei și consimțământ aplicabil", "Mapare și minimizare date"],
    featuredHome: false,
    ordine: 33,
    paginaPublica: false,
    faq: [],
    urlOficial: "https://www.facebook.com/business/m/one-sheeters/conversions-api",
    metaTitlu: "Integrare Meta Conversions API",
    metaDescriere:
      "Configurăm Meta Conversions API cu evenimente server-side, deduplicare și minimizarea datelor, aliniate cu Pixel și consimțământul.",
    serviceSlugs: ["reclame-meta", "integrari-api", "magazine-online"],
  },
  {
    nume: "Meta Lead Ads",
    slug: "meta-lead-ads",
    aliasuri: ["Facebook Lead Ads"],
    categorie: "marketing-analytics",
    regiuni: ["md", "ro", "ue", "international"],
    rezumat:
      "Trimitem lead-urile Meta Lead Ads către CRM sau echipă, cu mapare, deduplicare și acces limitat la date.",
    capabilitati: ["Preluare lead-uri", "Mapare în CRM", "Alerte și deduplicare"],
    cerinte: ["Pagină și cont autorizate", "Permisiuni Lead Ads", "Politică de confidențialitate și retenție"],
    featuredHome: false,
    ordine: 34,
    paginaPublica: false,
    faq: [],
    urlOficial: "https://www.facebook.com/business/ads/lead-ads",
    metaTitlu: "Integrare Meta Lead Ads cu CRM",
    metaDescriere:
      "Conectăm Meta Lead Ads cu CRM-ul pentru preluare rapidă, câmpuri validate, deduplicare și gestionarea controlată a datelor personale.",
    serviceSlugs: ["reclame-meta", "integrari-api", "landing-page-uri"],
  },
  {
    nume: "Amazon Marketplace / SP-API",
    slug: "amazon-marketplace",
    aliasuri: ["Amazon SP-API", "Selling Partner API"],
    categorie: "marketplace-feeduri",
    regiuni: ["ue", "international"],
    rezumat:
      "Integrăm conturile Amazon Seller eligibile prin SP-API pentru oferte, stocuri, comenzi și rapoartele permise.",
    capabilitati: ["Oferte și stoc", "Comenzi", "Rapoarte și statusuri disponibile"],
    cerinte: ["Cont Seller eligibil", "Aplicație SP-API autorizată", "Piețe, roluri și politici confirmate"],
    featuredHome: false,
    ordine: 35,
    paginaPublica: false,
    faq: [],
    urlOficial: "https://sell.amazon.com/",
    metaTitlu: "Integrare Amazon Marketplace SP-API",
    metaDescriere:
      "Conectăm magazinul sau ERP-ul cu Amazon Marketplace prin SP-API, în limitele rolurilor, piețelor și datelor aprobate sellerului.",
    serviceSlugs: ["integrari-api", "magazine-online"],
  },
  {
    nume: "LinkedIn Insight Tag / Lead Gen",
    slug: "linkedin-insight-lead-gen",
    aliasuri: ["LinkedIn Insight Tag", "LinkedIn Lead Gen Forms"],
    categorie: "marketing-analytics",
    regiuni: ["md", "ro", "ue", "international"],
    rezumat:
      "Integrăm măsurarea LinkedIn și formularele Lead Gen cu site-ul sau CRM-ul, conform accesului și consimțământului.",
    capabilitati: ["Insight Tag", "Conversii", "Preluare lead-uri autorizată"],
    cerinte: ["Campaign Manager", "Permisiuni și conturi corecte", "Consimțământ și retenție definite"],
    featuredHome: false,
    ordine: 36,
    paginaPublica: false,
    faq: [],
    urlOficial: "https://business.linkedin.com/marketing-solutions/insight-tag",
    metaTitlu: "Integrare LinkedIn Insight Tag și Lead Gen",
    metaDescriere:
      "Configurăm LinkedIn Insight Tag, conversii și preluarea Lead Gen în CRM, cu permisiuni, mapare și reguli de confidențialitate.",
    serviceSlugs: ["social-media-management", "integrari-api", "landing-page-uri"],
  },
  {
    nume: "X Ads Pixel / API",
    slug: "x-ads",
    aliasuri: ["Twitter Ads Pixel", "X Ads API"],
    categorie: "marketing-analytics",
    regiuni: ["md", "ro", "ue", "international"],
    rezumat:
      "Integrăm X Ads numai pentru un flux concret de conversii sau date, după confirmarea accesului disponibil contului.",
    capabilitati: ["Conversii web", "Evenimente de campanie", "API Ads dacă este aprobat"],
    cerinte: ["Cont X Ads eligibil", "Acces API unde este necesar", "Consimțământ și plan de evenimente"],
    featuredHome: false,
    ordine: 37,
    paginaPublica: false,
    faq: [],
    urlOficial: "https://business.x.com/",
    metaTitlu: "Integrare X Ads Pixel și API",
    metaDescriere:
      "Implementăm un flux X Ads concret pentru conversii sau API, condiționat de accesul contului și de regulile de consimțământ.",
    serviceSlugs: ["social-media-management", "integrari-api", "landing-page-uri"],
  },
  {
    nume: "UNA ERP",
    slug: "una-erp",
    aliasuri: ["UNA", "UNA Moldova"],
    categorie: "erp-stoc-contabilitate",
    regiuni: ["md"],
    rezumat:
      "Integrăm UNA ERP cu magazinul pentru datele și procesele expuse de instalarea și contractul clientului.",
    capabilitati: ["Produse și prețuri", "Stocuri", "Comenzi și documente disponibile"],
    cerinte: ["Instalare UNA identificată", "Acces API sau schimb de date", "Mapare validată cu echipa ERP"],
    featuredHome: false,
    ordine: 38,
    paginaPublica: false,
    faq: [],
    urlOficial: "https://una.md/",
    metaTitlu: "Integrare UNA ERP cu magazin online",
    metaDescriere:
      "Conectăm UNA ERP cu magazinul pentru produse, stoc și comenzi, după auditarea versiunii și a accesului tehnic disponibil.",
    serviceSlugs: ["integrari-api", "magazine-online"],
  },
  {
    nume: "EVS Courier",
    slug: "evs-courier",
    aliasuri: ["EVS", "EVS Moldova"],
    categorie: "curierat-fulfillment",
    regiuni: ["md"],
    rezumat:
      "Integrăm EVS Courier cu comenzile dacă serviciul contractat oferă accesul necesar pentru expediere și tracking.",
    capabilitati: ["Creare expediere", "Referință de transport", "Statusuri disponibile"],
    cerinte: ["Contract EVS", "Acces tehnic confirmat", "Servicii și zone definite"],
    featuredHome: false,
    ordine: 39,
    paginaPublica: false,
    faq: [],
    urlOficial: "https://evs.md/",
    metaTitlu: "Integrare EVS Courier pentru comenzi",
    metaDescriere:
      "Conectăm comenzile cu EVS Courier pentru operațiunile disponibile contului, după confirmarea contractului și interfeței tehnice.",
    serviceSlugs: ["integrari-curierat", "magazine-online"],
  },
  {
    nume: "FedEx",
    slug: "fedex",
    aliasuri: ["Federal Express"],
    categorie: "curierat-fulfillment",
    regiuni: ["ue", "international"],
    rezumat:
      "Integrăm FedEx pentru expediții internaționale, tarife sau tracking în limitele API-ului și contului clientului.",
    capabilitati: ["Creare expediere", "Etichete", "Tracking și tarife disponibile"],
    cerinte: ["Cont FedEx", "Credentiale API", "Servicii și documente cross-border confirmate"],
    featuredHome: false,
    ordine: 40,
    paginaPublica: false,
    faq: [],
    urlOficial: "https://www.fedex.com/",
    metaTitlu: "Integrare FedEx pentru livrări internaționale",
    metaDescriere:
      "Integrare FedEx pentru expediții, etichete și tracking, configurată după contul, țările și serviciile contractate de client.",
    serviceSlugs: ["integrari-curierat", "magazine-online"],
  },
  {
    nume: "UPS",
    slug: "ups",
    aliasuri: ["United Parcel Service"],
    categorie: "curierat-fulfillment",
    regiuni: ["ue", "international"],
    rezumat:
      "Integrăm UPS pentru crearea expedierilor și urmărirea coletelor pe serviciile activate în contul companiei.",
    capabilitati: ["Expediții și etichete", "Tracking", "Estimări oferite de cont"],
    cerinte: ["Cont UPS", "Aplicație și OAuth", "Țări, servicii și date vamale validate"],
    featuredHome: false,
    ordine: 41,
    paginaPublica: false,
    faq: [],
    urlOficial: "https://www.ups.com/",
    metaTitlu: "Integrare UPS pentru magazin online",
    metaDescriere:
      "Conectăm magazinul cu UPS pentru expediții, etichete și tracking, conform accesului API și serviciilor contractate de companie.",
    serviceSlugs: ["integrari-curierat", "magazine-online"],
  },
  {
    nume: "DHL",
    slug: "dhl",
    aliasuri: ["DHL Express"],
    categorie: "curierat-fulfillment",
    regiuni: ["ue", "international"],
    rezumat:
      "Integrăm serviciul DHL contractat pentru expediții, etichete și tracking, inclusiv date cross-border unde sunt cerute.",
    capabilitati: ["Creare expediere", "Etichete și documente disponibile", "Tracking"],
    cerinte: ["Cont DHL relevant", "Credentiale API", "Serviciu, țări și cerințe vamale confirmate"],
    featuredHome: false,
    ordine: 42,
    paginaPublica: false,
    faq: [],
    urlOficial: "https://www.dhl.com/",
    metaTitlu: "Integrare DHL pentru expediții și tracking",
    metaDescriere:
      "Integrăm DHL pentru expediții, etichete și tracking în piețele și serviciile activate în contul comercial al clientului.",
    serviceSlugs: ["integrari-curierat", "magazine-online"],
  },
  {
    nume: "USPS",
    slug: "usps",
    aliasuri: ["United States Postal Service"],
    categorie: "curierat-fulfillment",
    regiuni: ["international"],
    rezumat:
      "Integrăm interfețele USPS disponibile contului pentru etichete și tracking în scenarii de livrare din sau către SUA.",
    capabilitati: ["Etichete eligibile", "Tracking", "Validări disponibile"],
    cerinte: ["Cont și acces USPS", "Servicii eligibile", "Flux vamal confirmat pentru internațional"],
    featuredHome: false,
    ordine: 43,
    paginaPublica: false,
    faq: [],
    urlOficial: "https://www.usps.com/",
    metaTitlu: "Integrare USPS pentru expediții",
    metaDescriere:
      "Conectăm fluxul de comenzi la serviciile USPS eligibile pentru etichete și tracking, după confirmarea accesului și a rutelor.",
    serviceSlugs: ["integrari-curierat", "magazine-online"],
  },
  {
    nume: "Google Analytics 4",
    slug: "google-analytics-4",
    aliasuri: ["GA4", "Google Analytics"],
    categorie: "marketing-analytics",
    regiuni: ["md", "ro", "ue", "international"],
    rezumat:
      "Configurăm GA4 cu evenimente și conversii utile, un plan de măsurare și activare bazată pe consimțământ.",
    capabilitati: ["Evenimente și conversii", "Ecommerce recomandat", "Debug și verificarea datelor"],
    cerinte: ["Proprietate GA4", "Plan de măsurare", "Consimțământ și retenție configurate"],
    featuredHome: false,
    ordine: 44,
    paginaPublica: false,
    faq: [],
    urlOficial: "https://marketingplatform.google.com/about/analytics/",
    metaTitlu: "Integrare Google Analytics 4 și ecommerce",
    metaDescriere:
      "Implementăm GA4 cu evenimente, conversii și ecommerce validate, aliniate cu obiectivele site-ului și mecanismul de consimțământ.",
    serviceSlugs: [
      "seo-romania",
      "reclame-google-ads",
      "reclame-meta",
      "creare-site-uri",
      "landing-page-uri",
      "magazine-online",
    ],
  },
  {
    nume: "Google Reviews",
    slug: "google-reviews",
    aliasuri: ["Google Business Profile Reviews"],
    categorie: "marketing-analytics",
    regiuni: ["md", "ro", "ue", "international"],
    rezumat:
      "Integrăm un flux concret pentru recenzii Google, precum linkuri de solicitare sau afișarea datelor permise oficial.",
    capabilitati: ["Link de recenzie", "Date permise prin API", "Solicitări post-serviciu fără stimulente nepermise"],
    cerinte: ["Google Business Profile verificat", "Acces autorizat", "Politică de solicitare conformă"],
    featuredHome: false,
    ordine: 45,
    paginaPublica: false,
    faq: [],
    urlOficial: "https://www.google.com/business/",
    metaTitlu: "Integrare Google Reviews pentru site",
    metaDescriere:
      "Conectăm site-ul la un flux Google Reviews permis, cu profil verificat, acces autorizat și solicitări de recenzie conforme.",
    serviceSlugs: ["seo-romania", "creare-site-uri", "site-uri-corporative"],
  },
  {
    nume: "Google Tag Manager",
    slug: "google-tag-manager",
    aliasuri: ["GTM"],
    categorie: "marketing-analytics",
    regiuni: ["md", "ro", "ue", "international"],
    rezumat:
      "Configurăm Google Tag Manager ca strat controlat pentru taguri, evenimente și declanșare după consimțământ.",
    capabilitati: ["Data layer", "Taguri și trigger-e", "Preview, versiuni și publicare controlată"],
    cerinte: ["Container GTM", "Plan de taguri", "Consent Mode și responsabil de publicare"],
    featuredHome: false,
    ordine: 46,
    paginaPublica: false,
    faq: [],
    urlOficial: "https://marketingplatform.google.com/about/tag-manager/",
    metaTitlu: "Integrare Google Tag Manager și data layer",
    metaDescriere:
      "Implementăm GTM cu data layer, taguri documentate, verificare în preview și reguli de declanșare conectate la consimțământ.",
    serviceSlugs: ["seo-romania", "reclame-google-ads", "reclame-meta", "landing-page-uri"],
  },
  {
    nume: "Google Search Console",
    slug: "google-search-console",
    aliasuri: ["Search Console", "GSC"],
    categorie: "marketing-analytics",
    regiuni: ["md", "ro", "ue", "international"],
    rezumat:
      "Conectăm site-ul la Google Search Console pentru verificare, sitemap, erori de indexare și monitorizarea căutării organice.",
    capabilitati: ["Verificarea proprietății", "Sitemap", "Date și erori de indexare"],
    cerinte: ["Acces la domeniu sau DNS", "Proprietate Search Console", "Sitemap valid"],
    featuredHome: false,
    ordine: 47,
    paginaPublica: false,
    faq: [],
    urlOficial: "https://search.google.com/search-console/about",
    metaTitlu: "Integrare Google Search Console",
    metaDescriere:
      "Configurăm Google Search Console, verificarea domeniului și sitemap-ul pentru monitorizarea indexării și a performanței organice.",
    serviceSlugs: ["seo-romania", "reclame-google-ads", "creare-site-uri"],
  },
  {
    nume: "HubSpot",
    slug: "hubspot",
    aliasuri: ["HubSpot CRM"],
    categorie: "crm-vanzari",
    regiuni: ["md", "ro", "ue", "international"],
    rezumat:
      "Integrăm HubSpot cu formulare, comenzi și activități pentru un flux comercial urmărit din site până în CRM.",
    capabilitati: ["Contacte și companii", "Deal-uri și pipeline", "Formulare, activități și webhooks"],
    cerinte: ["Cont HubSpot", "Private app sau OAuth", "Câmpuri, pipeline și deduplicare definite"],
    featuredHome: true,
    ordine: 48,
    paginaPublica: false,
    faq: [],
    urlOficial: "https://www.hubspot.com/",
    metaTitlu: "Integrare HubSpot CRM cu site-ul",
    metaDescriere:
      "Conectăm site-ul și magazinul cu HubSpot pentru contacte, deal-uri și activități, cu mapare, permisiuni și deduplicare controlate.",
    serviceSlugs: ["integrari-api", "landing-page-uri", "site-uri-corporative", "magazine-online"],
  },
  {
    nume: "PayU",
    slug: "payu",
    aliasuri: ["PayU România"],
    categorie: "plati-online",
    regiuni: ["ro", "ue"],
    rezumat:
      "Integrăm PayU în checkout pentru plăți și confirmări, conform produselor activate în contul comerciantului.",
    capabilitati: ["Inițiere plată", "Notificări de status", "Rambursări dacă sunt disponibile"],
    cerinte: ["Cont PayU aprobat", "Credentiale", "Metode și monede contractate"],
    featuredHome: false,
    ordine: 49,
    paginaPublica: false,
    faq: [],
    urlOficial: "https://romania.payu.com/",
    metaTitlu: "Integrare PayU pentru magazin online",
    metaDescriere:
      "Conectăm PayU la checkout și statusurile comenzilor, în limitele metodelor și operațiunilor aprobate contului comerciantului.",
    serviceSlugs: ["integrari-plati-online", "magazine-online"],
  },
  {
    nume: "EuPlătesc",
    slug: "euplatesc",
    aliasuri: ["Eu Plătesc", "EuPlatesc.ro"],
    categorie: "plati-online",
    regiuni: ["ro"],
    rezumat:
      "Integrăm EuPlătesc pentru checkout și confirmarea plăților, după activarea contului de comerciant.",
    capabilitati: ["Inițiere plată", "Răspuns și notificare", "Reconciliere cu comanda"],
    cerinte: ["Contract EuPlătesc", "Credentiale pe medii", "Domeniu și politici aprobate"],
    featuredHome: false,
    ordine: 50,
    paginaPublica: false,
    faq: [],
    urlOficial: "https://www.euplatesc.ro/",
    metaTitlu: "Integrare EuPlătesc pentru checkout",
    metaDescriere:
      "Integrăm EuPlătesc cu magazinul pentru inițiere, confirmări validate și actualizarea comenzilor după aprobarea contului merchant.",
    serviceSlugs: ["integrari-plati-online", "magazine-online"],
  },
  {
    nume: "PlatiOnline",
    slug: "plationline",
    aliasuri: ["PlățiOnline.ro", "Plati Online"],
    categorie: "plati-online",
    regiuni: ["ro"],
    rezumat:
      "Integrăm serviciul PlatiOnline contractat de comerciant pentru checkout, notificări și corelarea tranzacțiilor.",
    capabilitati: ["Cereri de plată", "Confirmări", "Referințe pentru reconciliere"],
    cerinte: ["Contract merchant", "Documentație și credentiale", "Metode activate"],
    featuredHome: false,
    ordine: 51,
    paginaPublica: false,
    faq: [],
    urlOficial: "https://www.plationline.ro/",
    metaTitlu: "Integrare PlatiOnline pentru magazin",
    metaDescriere:
      "Conectăm PlatiOnline la checkout și la comenzile magazinului, folosind accesul și operațiunile aprobate comerciantului.",
    serviceSlugs: ["integrari-plati-online", "magazine-online"],
  },
  {
    nume: "Revolut Business",
    slug: "revolut-business",
    aliasuri: ["Revolut Merchant", "Revolut Pay"],
    categorie: "plati-online",
    regiuni: ["ro", "ue", "international"],
    rezumat:
      "Integrăm produsul Revolut Business eligibil pentru plăți sau operațiuni API, după aprobarea contului companiei.",
    capabilitati: ["Checkout eligibil", "Statusuri și webhooks", "Operațiuni permise contului"],
    cerinte: ["Cont Revolut Business verificat", "Produs merchant activ", "Credentiale și permisiuni"],
    featuredHome: false,
    ordine: 52,
    paginaPublica: false,
    faq: [],
    urlOficial: "https://www.revolut.com/business/",
    metaTitlu: "Integrare Revolut Business și Revolut Pay",
    metaDescriere:
      "Integrăm funcțiile eligibile Revolut Business pentru plăți și statusuri, după verificarea contului, produsului și permisiunilor.",
    serviceSlugs: ["integrari-plati-online", "magazine-online", "integrari-api"],
  },
  {
    nume: "Adyen",
    slug: "adyen",
    aliasuri: ["Adyen Payments"],
    categorie: "plati-online",
    regiuni: ["ue", "international"],
    rezumat:
      "Integrăm Adyen pentru companii eligibile, cu checkout, webhook-uri și operațiunile aprobate contului merchant.",
    capabilitati: ["Checkout", "Webhook-uri", "Metode și operațiuni activate"],
    cerinte: ["Cont Adyen aprobat", "API credentials", "Merchant account și metode configurate"],
    featuredHome: false,
    ordine: 53,
    paginaPublica: false,
    faq: [],
    urlOficial: "https://www.adyen.com/",
    metaTitlu: "Integrare Adyen pentru plăți online",
    metaDescriere:
      "Conectăm Adyen la checkout și comenzi pentru conturi eligibile, cu webhook-uri validate și metode aprobate comerciantului.",
    serviceSlugs: ["integrari-plati-online", "magazine-online"],
  },
  {
    nume: "Mollie",
    slug: "mollie",
    aliasuri: ["Mollie Payments"],
    categorie: "plati-online",
    regiuni: ["ue", "international"],
    rezumat:
      "Integrăm Mollie pentru comercianți eligibili din piețele acceptate, cu plăți și statusuri sincronizate.",
    capabilitati: ["Creare plată", "Webhook-uri", "Rambursări disponibile"],
    cerinte: ["Cont Mollie verificat", "Țară și entitate eligibile", "Chei API pe medii"],
    featuredHome: false,
    ordine: 54,
    paginaPublica: false,
    faq: [],
    urlOficial: "https://www.mollie.com/",
    metaTitlu: "Integrare Mollie Payments pentru magazin",
    metaDescriere:
      "Integrăm Mollie cu magazinul pentru plăți și webhook-uri, condiționat de eligibilitatea companiei și metodele activate în cont.",
    serviceSlugs: ["integrari-plati-online", "magazine-online"],
  },
  {
    nume: "Braintree",
    slug: "braintree",
    aliasuri: ["PayPal Braintree"],
    categorie: "plati-online",
    regiuni: ["ue", "international"],
    rezumat:
      "Integrăm Braintree pentru conturi merchant eligibile și fluxuri de plată aprobate pentru proiect.",
    capabilitati: ["Checkout", "Tokenizare prin componente aprobate", "Webhook-uri și statusuri"],
    cerinte: ["Cont Braintree eligibil", "Merchant ID și credentiale", "Metode și țări confirmate"],
    featuredHome: false,
    ordine: 55,
    paginaPublica: false,
    faq: [],
    urlOficial: "https://www.braintreepayments.com/",
    metaTitlu: "Integrare Braintree pentru plăți",
    metaDescriere:
      "Conectăm Braintree la checkout pentru conturi eligibile, cu credentiale separate, statusuri validate și metode aprobate.",
    serviceSlugs: ["integrari-plati-online", "magazine-online"],
  },
  {
    nume: "Cargus",
    slug: "cargus",
    aliasuri: ["Urgent Cargus", "Cargus Ship & Go"],
    categorie: "curierat-fulfillment",
    regiuni: ["ro"],
    rezumat:
      "Integrăm Cargus pentru AWB, etichete, tracking și puncte Ship & Go atunci când serviciile sunt activate.",
    capabilitati: ["AWB și etichetă", "Tracking", "Puncte Ship & Go disponibile"],
    cerinte: ["Contract Cargus", "Credentiale API", "Servicii și nomenclatoare activate"],
    featuredHome: false,
    ordine: 56,
    paginaPublica: false,
    faq: [],
    urlOficial: "https://www.cargus.ro/",
    metaTitlu: "Integrare Cargus AWB și Ship & Go",
    metaDescriere:
      "Integrăm Cargus cu magazinul pentru AWB, etichete, tracking și puncte eligibile, conform contractului și accesului API.",
    serviceSlugs: ["integrari-curierat", "magazine-online"],
  },
  {
    nume: "DPD",
    slug: "dpd",
    aliasuri: ["DPD România"],
    categorie: "curierat-fulfillment",
    regiuni: ["ro", "ue"],
    rezumat:
      "Integrăm DPD pentru expediții, etichete, tracking și puncte pickup disponibile în contractul clientului.",
    capabilitati: ["Creare expediere", "Etichete", "Tracking și pickup disponibil"],
    cerinte: ["Cont DPD", "Acces API", "Servicii, țări și puncte confirmate"],
    featuredHome: false,
    ordine: 57,
    paginaPublica: false,
    faq: [],
    urlOficial: "https://www.dpd.com/ro/ro/",
    metaTitlu: "Integrare DPD pentru AWB și tracking",
    metaDescriere:
      "Conectăm comenzile cu DPD pentru expediții, etichete și tracking, în serviciile și piețele activate pentru contul companiei.",
    serviceSlugs: ["integrari-curierat", "magazine-online"],
  },
  {
    nume: "GLS",
    slug: "gls",
    aliasuri: ["GLS România"],
    categorie: "curierat-fulfillment",
    regiuni: ["ro", "ue"],
    rezumat:
      "Integrăm GLS pentru generarea expedierilor și urmărirea coletelor pe serviciile contractate de client.",
    capabilitati: ["Expediții și etichete", "Tracking", "Servicii cross-border eligibile"],
    cerinte: ["Contract GLS", "Credentiale API", "Țări și servicii confirmate"],
    featuredHome: false,
    ordine: 58,
    paginaPublica: false,
    faq: [],
    urlOficial: "https://gls-group.com/RO/ro/",
    metaTitlu: "Integrare GLS pentru magazin online",
    metaDescriere:
      "Integrăm GLS cu magazinul pentru etichete și tracking, conform serviciilor naționale sau cross-border activate în cont.",
    serviceSlugs: ["integrari-curierat", "magazine-online"],
  },
  {
    nume: "Poșta Moldovei",
    slug: "posta-moldovei",
    aliasuri: ["Posta Moldovei"],
    categorie: "curierat-fulfillment",
    regiuni: ["md", "international"],
    rezumat:
      "Integrăm serviciile Poșta Moldovei numai după confirmarea unei interfețe tehnice și a produsului contractual aplicabil.",
    capabilitati: ["Date de expediere", "Identificator de urmărire", "Statusuri dacă sunt expuse"],
    cerinte: ["Contract sau eligibilitate", "Metodă tehnică verificată", "Servicii și formate confirmate"],
    featuredHome: false,
    ordine: 59,
    paginaPublica: false,
    faq: [],
    urlOficial: "https://posta.md/",
    metaTitlu: "Integrare Poșta Moldovei pentru comenzi",
    metaDescriere:
      "Pregătim integrarea Poșta Moldovei după verificarea accesului tehnic, serviciilor contractate și datelor de tracking disponibile.",
    serviceSlugs: ["integrari-curierat", "magazine-online"],
  },
  {
    nume: "Moto-Express",
    slug: "moto-express",
    aliasuri: ["Moto Express Moldova"],
    categorie: "curierat-fulfillment",
    regiuni: ["md"],
    rezumat:
      "Integrăm Moto-Express cu fluxul de comenzi după verificarea contractului și a metodei tehnice disponibile.",
    capabilitati: ["Transmitere comandă de livrare", "Referință expediere", "Statusuri disponibile"],
    cerinte: ["Contract comercial", "Acces sau format de schimb confirmat", "Zone și servicii definite"],
    featuredHome: false,
    ordine: 60,
    paginaPublica: false,
    faq: [],
    metaTitlu: "Integrare Moto-Express pentru livrări",
    metaDescriere:
      "Conectăm magazinul cu Moto-Express numai după confirmarea accesului tehnic, zonelor și operațiunilor disponibile clientului.",
    serviceSlugs: ["integrari-curierat", "magazine-online"],
  },
  {
    nume: "TNT",
    slug: "tnt",
    aliasuri: ["TNT Express"],
    categorie: "curierat-fulfillment",
    regiuni: ["ue", "international"],
    rezumat:
      "Integrăm serviciile TNT disponibile prin infrastructura curentă a furnizorului pentru expediții internaționale eligibile.",
    capabilitati: ["Date de expediere", "Etichete eligibile", "Tracking"],
    cerinte: ["Cont comercial", "Interfață curentă confirmată", "Țări și servicii validate"],
    featuredHome: false,
    ordine: 61,
    paginaPublica: false,
    faq: [],
    urlOficial: "https://www.tnt.com/",
    metaTitlu: "Integrare TNT pentru expediții internaționale",
    metaDescriere:
      "Conectăm comenzile cu serviciile TNT eligibile pentru etichete și tracking, după confirmarea contului și interfeței curente.",
    serviceSlugs: ["integrari-curierat", "magazine-online"],
  },
  {
    nume: "SAP",
    slug: "sap",
    aliasuri: ["SAP ERP", "SAP S/4HANA"],
    categorie: "erp-stoc-contabilitate",
    regiuni: ["md", "ro", "ue", "international"],
    rezumat:
      "Integrăm magazinul cu soluția SAP concretă a companiei prin API-uri sau middleware aprobate de echipa ERP.",
    capabilitati: ["Materiale și prețuri", "Stocuri", "Comenzi și documente definite"],
    cerinte: ["Produs și versiune SAP identificate", "API sau middleware", "Echipă SAP și mediu de test"],
    featuredHome: false,
    ordine: 62,
    paginaPublica: false,
    faq: [],
    urlOficial: "https://www.sap.com/",
    metaTitlu: "Integrare SAP cu magazin online",
    metaDescriere:
      "Conectăm magazinul cu instalarea SAP a companiei pentru datele aprobate, după auditul versiunii, middleware-ului și proceselor ERP.",
    serviceSlugs: ["integrari-api", "magazine-online", "site-uri-corporative"],
  },
  {
    nume: "Oracle NetSuite",
    slug: "oracle-netsuite",
    aliasuri: ["NetSuite", "Oracle Netsuite"],
    categorie: "erp-stoc-contabilitate",
    regiuni: ["ue", "international"],
    rezumat:
      "Integrăm Oracle NetSuite cu ecommerce și procesele operaționale folosind roluri și interfețe aprobate contului.",
    capabilitati: ["Articole și stoc", "Clienți și comenzi", "Statusuri și documente definite"],
    cerinte: ["Cont NetSuite", "Rol de integrare și autentificare", "Sandbox și mapare operațională"],
    featuredHome: false,
    ordine: 63,
    paginaPublica: false,
    faq: [],
    urlOficial: "https://www.netsuite.com/",
    metaTitlu: "Integrare Oracle NetSuite cu ecommerce",
    metaDescriere:
      "Conectăm Oracle NetSuite cu magazinul pentru articole, stoc și comenzi, folosind roluri minime, sandbox și mapări validate.",
    serviceSlugs: ["integrari-api", "magazine-online", "site-uri-corporative"],
  },
  {
    nume: "Facturis",
    slug: "facturis",
    aliasuri: ["Facturis Online"],
    categorie: "erp-stoc-contabilitate",
    regiuni: ["ro"],
    rezumat:
      "Integrăm Facturis cu magazinul pentru documentele și datele oferite prin accesul tehnic al contului clientului.",
    capabilitati: ["Clienți", "Facturi sau proforme", "Referințe de comandă"],
    cerinte: ["Cont Facturis", "Acces tehnic disponibil", "Serii și reguli fiscale validate"],
    featuredHome: false,
    ordine: 64,
    paginaPublica: false,
    faq: [],
    urlOficial: "https://facturis-online.ro/",
    metaTitlu: "Integrare Facturis cu magazin online",
    metaDescriere:
      "Conectăm Facturis cu magazinul pentru clienți și documente, după verificarea accesului, seriilor și regulilor fiscale ale companiei.",
    serviceSlugs: ["integrari-api", "magazine-online"],
  },
  {
    nume: "Salesforce",
    slug: "salesforce",
    aliasuri: ["Salesforce CRM"],
    categorie: "crm-vanzari",
    regiuni: ["ro", "ue", "international"],
    rezumat:
      "Integrăm site-ul cu Salesforce pentru lead-uri, conturi, oportunități și obiectele aprobate în organizația clientului.",
    capabilitati: ["Lead-uri și contacte", "Accounts și opportunities", "Obiecte și evenimente aprobate"],
    cerinte: ["Organizație Salesforce", "Connected App și permisiuni", "Model de date și sandbox"],
    featuredHome: false,
    ordine: 65,
    paginaPublica: false,
    faq: [],
    urlOficial: "https://www.salesforce.com/",
    metaTitlu: "Integrare Salesforce CRM cu site-ul",
    metaDescriere:
      "Conectăm site-ul cu Salesforce pentru lead-uri și oportunități, cu permisiuni minime, sandbox și maparea obiectelor organizației.",
    serviceSlugs: ["integrari-api", "landing-page-uri", "site-uri-corporative"],
  },
  {
    nume: "Pipedrive",
    slug: "pipedrive",
    aliasuri: ["Pipedrive CRM"],
    categorie: "crm-vanzari",
    regiuni: ["md", "ro", "ue", "international"],
    rezumat:
      "Integrăm Pipedrive cu formularele și comenzile pentru persoane, organizații, deal-uri și activități.",
    capabilitati: ["Persoane și organizații", "Deal-uri și pipeline", "Activități și webhooks"],
    cerinte: ["Cont Pipedrive", "OAuth sau token autorizat", "Pipeline și câmpuri definite"],
    featuredHome: false,
    ordine: 66,
    paginaPublica: false,
    faq: [],
    urlOficial: "https://www.pipedrive.com/",
    metaTitlu: "Integrare Pipedrive CRM cu formulare",
    metaDescriere:
      "Conectăm formularele și comenzile cu Pipedrive pentru persoane, deal-uri și activități, cu deduplicare și pipeline definit.",
    serviceSlugs: ["integrari-api", "landing-page-uri", "site-uri-corporative", "magazine-online"],
  },
  {
    nume: "Zoho CRM",
    slug: "zoho-crm",
    aliasuri: ["Zoho"],
    categorie: "crm-vanzari",
    regiuni: ["md", "ro", "ue", "international"],
    rezumat:
      "Integrăm Zoho CRM cu site-ul pentru lead-uri, contacte, deal-uri și modulele aprobate în cont.",
    capabilitati: ["Lead-uri și contacte", "Deal-uri", "Module și webhooks disponibile"],
    cerinte: ["Cont Zoho CRM", "Client OAuth", "Module, câmpuri și regiune de date confirmate"],
    featuredHome: false,
    ordine: 67,
    paginaPublica: false,
    faq: [],
    urlOficial: "https://www.zoho.com/crm/",
    metaTitlu: "Integrare Zoho CRM cu site-ul",
    metaDescriere:
      "Conectăm site-ul cu Zoho CRM pentru lead-uri, contacte și deal-uri, cu OAuth și maparea modulelor folosite de echipă.",
    serviceSlugs: ["integrari-api", "landing-page-uri", "site-uri-corporative"],
  },
  {
    nume: "Altex Marketplace",
    slug: "altex-marketplace",
    aliasuri: ["Altex"],
    categorie: "marketplace-feeduri",
    regiuni: ["ro"],
    rezumat:
      "Integrăm Altex Marketplace numai pentru selleri acceptați și metodele de schimb puse la dispoziția contului.",
    capabilitati: ["Oferte eligibile", "Stoc și preț", "Comenzi dacă interfața le expune"],
    cerinte: ["Cont seller aprobat", "Acces tehnic confirmat", "Categorii și reguli marketplace"],
    featuredHome: false,
    ordine: 68,
    paginaPublica: false,
    faq: [],
    urlOficial: "https://altex.ro/marketplace/",
    metaTitlu: "Integrare Altex Marketplace",
    metaDescriere:
      "Conectăm catalogul cu Altex Marketplace după aprobarea sellerului și confirmarea accesului pentru oferte, stoc și comenzi.",
    serviceSlugs: ["integrari-api", "magazine-online"],
  },
  {
    nume: "Make",
    slug: "make",
    aliasuri: ["Integromat", "Make.com"],
    categorie: "automatizari-comunicare",
    regiuni: ["md", "ro", "ue", "international"],
    rezumat:
      "Construim scenarii Make pentru fluxuri între aplicații, cu validări, tratarea erorilor și consum controlat de operațiuni.",
    capabilitati: ["Scenarii și webhooks", "Transformări de date", "Rutare și tratarea erorilor"],
    cerinte: ["Cont Make", "Acces API la aplicații", "Volum și responsabil operațional"],
    featuredHome: false,
    ordine: 69,
    paginaPublica: false,
    faq: [],
    urlOficial: "https://www.make.com/",
    metaTitlu: "Integrare Make pentru automatizări",
    metaDescriere:
      "Construim automatizări Make între aplicații, cu webhooks, validări, ramuri de eroare și estimarea consumului de operațiuni.",
    serviceSlugs: ["integrari-api", "ai-automatizari"],
  },
  {
    nume: "Zapier",
    slug: "zapier",
    aliasuri: ["Zapier Automation"],
    categorie: "automatizari-comunicare",
    regiuni: ["md", "ro", "ue", "international"],
    rezumat:
      "Configurăm fluxuri Zapier pentru conectarea rapidă a aplicațiilor, cu limite și responsabilități documentate.",
    capabilitati: ["Zaps și webhooks", "Maparea datelor", "Filtre și acțiuni condiționate"],
    cerinte: ["Cont Zapier", "Conturi autorizate în aplicații", "Volum și plan compatibil"],
    featuredHome: false,
    ordine: 70,
    paginaPublica: false,
    faq: [],
    urlOficial: "https://zapier.com/",
    metaTitlu: "Integrare Zapier pentru automatizări",
    metaDescriere:
      "Configurăm automatizări Zapier între site și aplicații, cu mapări clare, filtre, limite de plan și gestionarea erorilor.",
    serviceSlugs: ["integrari-api", "ai-automatizari"],
  },
  {
    nume: "Telegram",
    slug: "telegram",
    aliasuri: ["Telegram Bot API"],
    categorie: "automatizari-comunicare",
    regiuni: ["md", "ro", "ue", "international"],
    rezumat:
      "Integrăm Telegram Bot API pentru notificări și conversații în scenarii aprobate, fără automatizarea conturilor personale.",
    capabilitati: ["Boți și comenzi", "Notificări", "Webhook-uri"],
    cerinte: ["Bot creat oficial", "Token protejat", "Utilizatori sau grupuri autorizate"],
    featuredHome: false,
    ordine: 71,
    paginaPublica: false,
    faq: [],
    urlOficial: "https://telegram.org/",
    metaTitlu: "Integrare Telegram Bot API",
    metaDescriere:
      "Conectăm Telegram Bot API pentru notificări și comenzi controlate, cu token protejat, webhook validat și destinatari autorizați.",
    serviceSlugs: ["integrari-api", "ai-automatizari"],
  },
  {
    nume: "Slack",
    slug: "slack",
    aliasuri: ["Slack API"],
    categorie: "automatizari-comunicare",
    regiuni: ["md", "ro", "ue", "international"],
    rezumat:
      "Integrăm Slack pentru alerte și acțiuni interne, folosind o aplicație cu permisiuni limitate la spațiul clientului.",
    capabilitati: ["Mesaje și alerte", "Comenzi sau acțiuni", "Evenimente autorizate"],
    cerinte: ["Workspace Slack", "Aplicație instalată", "Scope-uri și canale aprobate"],
    featuredHome: false,
    ordine: 72,
    paginaPublica: false,
    faq: [],
    urlOficial: "https://slack.com/",
    metaTitlu: "Integrare Slack pentru alerte și fluxuri",
    metaDescriere:
      "Conectăm Slack cu site-ul și sistemele interne pentru alerte și acțiuni, prin aplicații cu scope-uri și canale limitate.",
    serviceSlugs: ["integrari-api", "ai-automatizari", "site-uri-corporative"],
  },
  {
    nume: "Twilio",
    slug: "twilio",
    aliasuri: ["Twilio SMS", "Twilio Messaging"],
    categorie: "automatizari-comunicare",
    regiuni: ["ro", "ue", "international"],
    rezumat:
      "Integrăm Twilio pentru SMS sau mesagerie în țările și cazurile de utilizare aprobate contului companiei.",
    capabilitati: ["SMS și statusuri", "Webhook-uri", "Șabloane sau expeditori unde sunt ceruți"],
    cerinte: ["Cont Twilio verificat", "Număr sau sender eligibil", "Consimțământ și țări confirmate"],
    featuredHome: false,
    ordine: 73,
    paginaPublica: false,
    faq: [],
    urlOficial: "https://www.twilio.com/",
    metaTitlu: "Integrare Twilio SMS și Messaging",
    metaDescriere:
      "Conectăm Twilio pentru SMS și notificări cu statusuri, expeditori eligibili și reguli de consimțământ adaptate fiecărei piețe.",
    serviceSlugs: ["integrari-api", "ai-automatizari", "creare-site-uri"],
  },
  {
    nume: "Mailchimp",
    slug: "mailchimp",
    aliasuri: ["Intuit Mailchimp"],
    categorie: "automatizari-comunicare",
    regiuni: ["md", "ro", "ue", "international"],
    rezumat:
      "Integrăm Mailchimp pentru audiențe și evenimente de marketing, cu consimțământ, deduplicare și preferințe păstrate.",
    capabilitati: ["Contacte și audiențe", "Taguri și segmente", "Evenimente ecommerce eligibile"],
    cerinte: ["Cont Mailchimp", "API key sau OAuth", "Opt-in și maparea preferințelor"],
    featuredHome: false,
    ordine: 74,
    paginaPublica: false,
    faq: [],
    urlOficial: "https://mailchimp.com/",
    metaTitlu: "Integrare Mailchimp cu site și magazin",
    metaDescriere:
      "Conectăm Mailchimp cu formularele și magazinul pentru contacte și evenimente, păstrând opt-in-ul, preferințele și deduplicarea.",
    serviceSlugs: ["integrari-api", "landing-page-uri", "magazine-online"],
  },
  {
    nume: "Calendly",
    slug: "calendly",
    aliasuri: ["Calendly API"],
    categorie: "programari-sisteme-custom",
    regiuni: ["md", "ro", "ue", "international"],
    rezumat:
      "Integrăm Calendly cu site-ul și CRM-ul pentru programări, invitați și evenimente disponibile prin contul clientului.",
    capabilitati: ["Embed sau link de programare", "Webhook-uri pentru evenimente", "Trimitere în CRM"],
    cerinte: ["Cont Calendly compatibil", "OAuth sau token", "Tipuri de eveniment și calendare configurate"],
    featuredHome: false,
    ordine: 75,
    paginaPublica: false,
    faq: [],
    urlOficial: "https://calendly.com/",
    metaTitlu: "Integrare Calendly cu site și CRM",
    metaDescriere:
      "Conectăm Calendly cu site-ul și CRM-ul pentru programări și webhook-uri, în limitele planului și permisiunilor contului clientului.",
    serviceSlugs: ["integrari-api", "creare-site-uri", "landing-page-uri"],
  },
];
