// Tot conținutul paginii de acasă, într-un singur loc.
// ponytail: hardcodat acum; se mută în Payload CMS secțiune cu secțiune, la nevoie.

export const site = {
  name: "LESCINSCHI",
  // ponytail: schimbă cu domeniul real de producție când e cumpărat
  domain: "https://lescinschi.ro",
  email: "alex@lescinschi.ro",
  phone: "+373 60 000 000",
  city: "BUCUREȘTI",
  tz: "Europe/Bucharest",
  github: "https://github.com/alexlescinschi/lescinschiro",
};

export const nav = [
  { label: "Servicii", href: "#servicii" },
  { label: "Proiecte", href: "#portofoliu" },
  { label: "Proces", href: "#proces" },
  { label: "Prețuri", href: "#preturi" },
  { label: "Contact", href: "#contact" },
];

export const services = [
  { n: "01", title: "Creare site-uri", desc: "De la landing la platformă. Design pe brandul tău, rapid, optimizat pentru Google." },
  { n: "02", title: "Magazine online", desc: "Catalog, coș, checkout, plăți, curierat, facturare — gata de vânzare." },
  { n: "03", title: "Landing page-uri", desc: "O pagină, un obiectiv: conversie. Viteză maximă și tracking pentru campanii." },
  { n: "04", title: "Site-uri corporative", desc: "Prezență profesională, structură clară, multilingv și SEO local." },
  { n: "05", title: "Integrări plăți", desc: "Netopia, PayU, Stripe, PayPal, Revolut + bănci din România. 3D Secure." },
  { n: "06", title: "Integrări curierat", desc: "FAN Courier, Cargus, Sameday, DPD, Nova Poshta — AWB și tracking automat." },
  { n: "07", title: "Integrări API", desc: "ERP, CRM, eMAG, SmartBill, Oblio. Dacă are API, îl conectăm." },
  { n: "08", title: "SEO România", desc: "Optimizare tehnică și de conținut pentru piața din România." },
  { n: "09", title: "AI & Automatizări", desc: "Chatbot, automatizări de comenzi, generare de conținut." },
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
