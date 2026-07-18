// Tot conținutul paginii de acasă, într-un singur loc.
// ponytail: hardcodat acum; se mută în Payload CMS secțiune cu secțiune, la nevoie.

export const site = {
  name: "LESCINSCHI",
  // ponytail: schimbă cu domeniul real de producție când e cumpărat
  domain: "https://lescinschi.ro",
  email: "alex@lescinschi.ro",
  phone: "+40 730 304 478",        // RO
  phoneMD: "+373 67 550 980",      // MD
  whatsapp: "40730304478",
  address: "București, Sectorul 3, România",
  city: "BUCUREȘTI",
  tz: "Europe/Bucharest",
  github: "https://github.com/alexlescinschi/lescinschiro",
};

export const contactFaqs = [
  { q: "Cât de repede răspundeți?", a: "Sub 24h în zilele lucrătoare. Pentru urgențe, WhatsApp e cel mai rapid." },
  { q: "Lucrați cu clienți din afara României?", a: "Da — MD, RO, FR, US. Comunicăm în română, engleză, franceză." },
  { q: "Faceți oferte gratuit?", a: "Da. Ofertă fixă în 24–48h după un scurt brief telefonic sau pe email." },
  { q: "Pot veni la birou?", a: "Suntem în București, Sectorul 3. Întâlnirile se programează în avans." },
];

export const nav = [
  { label: "Servicii", href: "#servicii" },
  { label: "Proiecte", href: "#portofoliu" },
  { label: "Proces", href: "#proces" },
  { label: "Prețuri", href: "#preturi" },
  { label: "Contact", href: "#contact" },
];

export const services = [
  { n: "01", title: "Creare site-uri", desc: "De la landing la platformă. Design pe brandul tău, rapid, optimizat pentru Google.", href: "/servicii/site-uri-de-prezentare" },
  { n: "02", title: "Magazine online", desc: "Catalog, coș, checkout, plăți, curierat, facturare — gata de vânzare.", href: "/servicii/magazine-online" },
  { n: "03", title: "Landing page-uri", desc: "O pagină, un obiectiv: conversie. Viteză maximă și tracking pentru campanii.", href: "/servicii/landing-page-uri" },
  { n: "04", title: "Site-uri corporative", desc: "Prezență profesională, structură clară, multilingv și SEO local.", href: "/servicii/site-uri-de-prezentare" },
  { n: "05", title: "Integrări plăți", desc: "Netopia, PayU, Stripe, PayPal, Revolut + bănci din România. 3D Secure.", href: "/servicii/integrari-plati-online" },
  { n: "06", title: "Integrări curierat", desc: "FAN Courier, Cargus, Sameday, DPD, Nova Poshta — AWB și tracking automat.", href: "/servicii/integrari-curierat" },
  { n: "07", title: "Integrări API", desc: "ERP, CRM, eMAG, SmartBill, Oblio. Dacă are API, îl conectăm.", href: "/servicii/integrari-api" },
  { n: "08", title: "SEO România", desc: "Optimizare tehnică și de conținut pentru piața din România.", href: "/servicii/seo-romania" },
  { n: "09", title: "AI & Automatizări", desc: "Chatbot, automatizări de comenzi, generare de conținut.", href: "/servicii/ai-automatizari" },
];

// Imagini reale de pe lescinschi.art (descărcate în public/work).
// ponytail: pairing nume↔poză aproximativ (doar Solum + Prunovicgor sigure); fixează exact din CMS.
export const projects = [
  { name: "Solumshop", tag: "Magazin online", img: "/work/p05.png" },
  { name: "Prunovicgor", tag: "Magazin online", img: "/work/p11.jpg" },
  { name: "Artcharm", tag: "Magazin online", img: "/work/p03.png" },
  { name: "MySleep", tag: "Magazin online", img: "/work/p04.png" },
  { name: "Superdent", tag: "Corporativ", img: "/work/p06.png" },
  { name: "Babycity", tag: "Magazin online", img: "/work/p07.png" },
  { name: "Climatperfect", tag: "Magazin online", img: "/work/p08.png" },
  { name: "Leoparchet", tag: "Magazin online", img: "/work/p09.png" },
  { name: "Peisagist360", tag: "Corporativ", img: "/work/p10.png" },
  { name: "Printly", tag: "Magazin online", img: "/work/p12.png" },
];

// Fundalul hero care se schimbă (crossfade) — subset de proiecte landscape.
export const heroImages = [
  "/work/p05.png", "/work/p03.png", "/work/p04.png", "/work/p06.png", "/work/p08.png", "/work/p10.png",
];

export const why = [
  { num: 40, suffix: "+", label: "proiecte livrate" },
  { num: 4, suffix: "", label: "țări: MD · RO · FR · US" },
  { num: 24, suffix: "h", label: "răspuns la ofertă" },
  { num: 100, suffix: "%", label: "cod al tău, pe GitHub" },
];

// === Pagina /despre-noi ===
export const aboutStory = [
  "Am început cu un singur magazin online. În 2016, primul proiect a fost un magazin în Moldova. Nu aveam echipă, nu aveam portofoliu — aveam un client care avea încredere și un deadline de două săptămâni. Am livrat. Apoi a venit al doilea, al zecelea, al treizecilea.",
  "Acum suntem o echipă mică, cu procese clare. Nu suntem o agenție mare cu account manageri și ședințe. Suntem oamenii care scriu codul, care discută cu tine direct, care răspund pe WhatsApp la 22:00 când pică un plugin. Lucrăm cu clienți din România, Moldova, Franța și SUA — de la clinici stomatologice la magazine cu 10.000 de produse.",
  "Nu vindem promisiuni, vindem cod care merge. Fiecare proiect e tratat ca al nostru: preț fix scris, machetă aprobată înainte de cod, predare pe GitHub. Dacă nu putem livra bine, refuzăm — nu luăm proiecte pe care nu le putem onora.",
];

export const aboutStats = [
  { num: 40, suffix: "+", label: "proiecte livrate" },
  { num: 4, suffix: "", label: "țări: MD · RO · FR · US" },
  { num: 10, suffix: " ani", label: "experiență în web" },
  { num: 100, suffix: "%", label: "cod predat pe GitHub" },
];

export const aboutPrinciples = [
  { icon: "💎", title: "Calitate > viteză", desc: "Mai bine 2 săptămâni în plus decât un cod pe care-l refaci peste 6 luni." },
  { icon: "🤝", title: "Parteneriat, nu vendor", desc: "Câștigăm când câștigă clientul. Nu vindem retenție forțată." },
  { icon: "📖", title: "Transparență totală", desc: "Cod pe GitHub, acces la Figma, staging public, facturi clare." },
  { icon: "🚀", title: "Tehnologie modernă", desc: "Next.js, Payload, Postgres. Fără WordPress patch-uri din 2015." },
];

export const aboutStack = [
  { group: "Frontend", items: "Next.js 16, React 19, GSAP, Lenis" },
  { group: "CMS", items: "Payload 3, Lexical editor" },
  { group: "Database", items: "PostgreSQL, SQLite (local)" },
  { group: "Deploy", items: "Railway, GitHub CI/CD, auto-deploy" },
  { group: "Magazine", items: "WooCommerce, Shopify, Custom Next.js" },
  { group: "Integrări", items: "Netopia, FAN Courier, eMAG, SmartBill, n8n" },
];

export const aboutHighlights = [
  { name: "Solumshop", href: "https://solumshop.ro" },
  { name: "Climatperfect", href: "https://climatperfect.ro" },
  { name: "Superdent", href: "https://superdent.clinic" },
  { name: "Prunovicgor", href: "https://prunovicgor.md" },
  { name: "Artcharm", href: "https://artcharm.ro" },
  { name: "Axean", href: "https://axean.us" },
];

export const founder = {
  name: "Alex Lescinschi",
  role: "Fondator & Lead Developer",
  bio: "Programez de 10 ani. Am început în Chișinău cu un singur client și un magazin online care trebuia gata în două săptămâni. De atunci, am livrat peste 40 de proiecte — de la landing page-uri de 150€ la magazine enterprise cu 10.000 de produse, integrări ERP, marketplace eMAG și plăți multi-acquirer. Specializarea mea: magazine online cu integrări complexe și site-uri unde performanța și SEO contează cu adevărat.",
  principles: "Cred că un cod curat și un client informat fac mai mult decât orice contract de mentenanță. Predau totul pe GitHub. Răspund direct, fără account manager.",
  location: "București, România · originar din Chișinău, MD",
};

export const aboutFaqs = [
  { q: "Lucrați cu startup-uri sau doar cu firme mari?", a: "Cu ambele. Cel mai mic proiect: 150€ landing. Cel mai mare: 3.000€+ magazin enterprise. Bugetul nu e filtrul — seriozitatea da." },
  { q: "Cât de mare e echipa?", a: "Nucleu mic + rețea de specialiști (designeri, SEO, devOps) pe proiect. Nu plătești overhead de agenție mare. Vorbești direct cu cine scrie codul." },
  { q: "Vorbiți engleză / franceză?", a: "Da. Comunicăm în română, engleză și franceză (pentru clienții FR din conceptpersonnalise.fr și alții)." },
  { q: "De ce LESCINSCHI și nu o agenție de 50 de oameni?", a: "Vorbești direct cu cine construiește. Decizii rapide, fără 3 straturi de management. Cod curat, predat pe GitHub, fără vendor lock-in." },
];

export const process = [
  { step: "01", title: "Brief & ofertă", desc: "Discutăm obiectivele. Primești o ofertă fixă în 24-48h." },
  { step: "02", title: "Design & structură", desc: "Machetă aprobată înainte de orice linie de cod." },
  { step: "03", title: "Dezvoltare & integrări", desc: "Site, plăți, curierat, API și SEO tehnic." },
  { step: "04", title: "Lansare & suport", desc: "Testare, publicare, training și mentenanță lunară." },
];

export const deliverables = [
  "Site live și rapid",
  "Codul tău, pe GitHub",
  "SEO configurat",
  "Training de utilizare",
  "Mentenanță lunară",
];

// Deliverables ca grilă cu iconițe (pentru pagina /proces)
export const deliverablesGrid = [
  { icon: "🚀", label: "Site live și rapid" },
  { icon: "📦", label: "Codul tău, pe GitHub" },
  { icon: "🔍", label: "SEO configurat" },
  { icon: "👤", label: "Training de utilizare" },
  { icon: "🛠️", label: "Mentenanță lunară" },
  { icon: "📊", label: "Analytics + Search Console" },
];

// Cele 4 etape extinse (pagina /proces)
export const processFull = [
  {
    step: "01",
    title: "Brief & ofertă",
    desc: "Discutăm obiectivele, publicul țintă și integrările necesare. Primești ofertă fixă în 24–48h.",
    details: ["Call 30 min (video/telefon)", "Analiza cerințelor tehnice", "Ofertă scrisă, preț fix, termene", "Semnare contract + avans 30%"],
    duration: "1–3 zile",
    deliverable: "Ofertă detaliată PDF",
  },
  {
    step: "02",
    title: "Design & structură",
    desc: "Wireframe + mockup Figma, arhitectura paginilor, structura SEO. Aprobăm macheta înainte de orice linie de cod.",
    details: ["Wireframe pe secțiuni", "Mockup Figma complet", "Arhitectură URL + SEO", "Aprobare scrisă de la tine"],
    duration: "1–2 săptămâni",
    deliverable: "Mockup Figma aprobat",
  },
  {
    step: "03",
    title: "Dezvoltare & integrări",
    desc: "Programare frontend + CMS, integrări (plăți, curier, ERP, API), conținut, testare. Primești link staging săptămânal.",
    details: ["Frontend custom + Payload CMS", "Integrări: plăți, curierat, ERP, API", "Conținut (texte, imagini, traduceri)", "Testare pe staging.url.ro"],
    duration: "3–8 săptămâni",
    deliverable: "Site pe staging",
  },
  {
    step: "04",
    title: "Lansare & suport",
    desc: "Testare finală, migrare date, configurare DNS, deploy, training admin. Apoi mentenanță lunară opțională.",
    details: ["QA final pe toate device-urile", "Migrare date + redirect 301", "DNS + deploy + SSL", "Training admin + predare GitHub"],
    duration: "1 săptămână + ongoing",
    deliverable: "Site live + GitHub",
  },
];

export const processPrinciples = [
  { icon: "💰", title: "Preț fix, scris", desc: "Nicio factură surpriză. Oferta semnată e lege." },
  { icon: "🐙", title: "Cod pe GitHub, al tău", desc: "Niciodată blocat într-un contract de mentenanță." },
  { icon: "🎨", title: "Machetă înainte de cod", desc: "Vezi exact cum arată, aprobăm, apoi programăm." },
  { icon: "💬", title: "Comunicare directă", desc: "Fără account manager. Vorbești cu cine construiește." },
];

export const processFaqs = [
  { q: "Pot începe fără să știu exact ce vreau?", a: "Da. Avem un brief ghidat care-ți clarifică ideea pas cu pas. Multe proiecte pornesc cu „vreau un magazin” și se conturează în call-ul inițial." },
  { q: "Ce se întâmplă dacă vreau schimbări în timpul dezvoltării?", a: "Schimbările mici intră în preț. Cele care modifică substantial scope-ul se evaluează transparent și se adaugă la ofertă — nimic ascuns, nimic facturat surpriză." },
  { q: "Cine deține codul după lansare?", a: "Tu. Predăm totul pe GitHub, cu documentație. Poți pleca oricând cu codul tău la altă echipă — nu te blocăm." },
  { q: "Oferiți mentenanță după lansare?", a: "Da, opțional, lunar. Include backup, actualizări de securitate, monitorizare uptime și suport pe email. Pornește de la 30€/lună." },
  { q: "Care sunt termenele de plată?", a: "30% avans la semnarea contractului, 40% la aprobarea machetei, 30% la lansare. Facturăm în EUR sau RON, la cursul zilei." },
];

export const integrations = [
  "Netopia", "PayU", "Stripe", "PayPal", "Revolut", "FAN Courier",
  "Cargus", "Sameday", "DPD", "GLS", "eMAG", "SmartBill", "Oblio",
];

export const ai = [
  { title: "Chatbot pe site", desc: "Răspunde clienților 24/7, în română, pe baza serviciilor tale." },
  { title: "Automatizări de comenzi", desc: "Comandă → AWB curier → email client → factură, fără mâna omului." },
  { title: "Generare de conținut", desc: "Descrieri de produse și articole de blog optimizate SEO." },
  { title: "Integrări no-code", desc: "n8n / Make / Zapier între site, CRM, WhatsApp și email." },
];

export const pricing = [
  { name: "Landing page", from: "€150", items: ["1 pagină", "Formular de contact", "SEO de bază", "Mobile-first"] },
  { name: "Site prezentare", from: "€400", items: ["5–10 pagini", "Multilingv", "SEO on-page", "Panou admin"] },
  { name: "Magazin online", from: "€800", items: ["Catalog + checkout", "1 plată + 1 curier", "Facturare", "SEO produse"] },
];

// ponytail: testimoniale placeholder — înlocuiește cu citate reale de la clienți.
export const testimonials = [
  { quote: "Site nou, comenzi în prima săptămână. Integrarea cu curierul ne-a scăpat de muncă manuală zilnică.", role: "Fondator, magazin online" },
  { quote: "Ne-au dus pe prima pagină Google pe cuvintele care contează. Traficul a crescut constant.", role: "Manager marketing" },
  { quote: "Rapizi, serioși, cod curat predat pe GitHub. Exact ce cauți la o agenție.", role: "Administrator, clinică" },
];

// Poze care plutesc în jurul CTA-ului de contact.
export const floatImages = ["/work/p03.png", "/work/p06.png", "/work/p08.png", "/work/p10.png"];

// Lucrări featured cu efect de scroll (secțiunea „Ce vei primi").
export const featured = [
  { name: "Solumshop", tag: "Magazin online — plăți & curierat", img: "/work/p05.png" },
  { name: "Superdent", tag: "Clinică — site corporativ", img: "/work/p06.png" },
  { name: "Prunovicgor", tag: "Magazin online", img: "/work/p11.jpg" },
];

// ponytail: pune linkurile sociale reale.
export const socials = [
  { label: "Instagram", short: "IG", href: "https://instagram.com" },
  { label: "Facebook", short: "FB", href: "https://facebook.com" },
  { label: "LinkedIn", short: "IN", href: "https://linkedin.com" },
  { label: "Behance", short: "BE", href: "https://behance.net" },
];
