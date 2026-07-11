# 02 — Pagină serviciu: Magazine online (eCommerce)

> Creat: 2026-07-11
> Status: plan
> Route: `/servicii/magazine-online`

## Structura paginii

| # | Secțiune | Animație | SEO |
|---|----------|----------|-----|
| 0 | Nav + Footer (global) | — | — |
| 1 | Hero | Mask-reveal text + inel lime | `H1` |
| 2 | Ce facem (intro) | Reveal scroll | `H2` |
| 3 | Tipuri magazine (3 carduri: Cod/WP/Shopify) | Reveal staggered | `H3` |
| 4 | Features (grilă 3×3 iconițe) | Reveal scroll | `H2` |
| 5 | Integrări (logo-uri + marquee) | Marquee orizontal | `H2` |
| 6 | Proces (4 pași, scroll orizontal) | Pin GSAP | `H2` |
| 7 | Portofoliu (doar magazin-online din CMS) | Elastic list K72 | `H2` |
| 8 | Prețuri (3 rânduri) | Reveal, hover | `H2` |
| 9 | FAQ (acordeon) | Expand/collapse CSS | Schema FAQ |
| 10 | CTA final (identic Contact home) | Reveal scroll | `H2` |

## Conținut per secțiune

### 1. Hero
```
Titlu: Magazine online care VÂND
       [inel lime pe "VÂND"]

Subtitlu: De la catalog la checkout, plăți, curierat și facturare —
          construim magazine care convertesc. Cod curat, WordPress sau
          Shopify — alegem ce ți se potrivește.

CTA: [Cere o ofertă]  [Vezi portofoliul]
Stamp: BUCUREȘTI — ora live
```

### 2. Ce facem
```
Mai mult decât un coș de cumpărături

Un magazin online nu e doar o listă de produse cu un buton de "Adaugă în coș".
E un ecosistem complet: catalog, stoc, plăți, curierat, facturare, automatizări,
analiză date și optimizare continuă.
```

### 3. Tipuri de magazine (3 carduri)
```
[Cod curat]       [WordPress/Woo]     [Shopify]
Control total      Rapid, testat       Lansare în zile
Funcții custom     Milioane pluginuri   Fără bătăi de cap
Cataloage mari     Buget mediu          Dropshipping
```

### 4. Features (grilă 3×3)
```
📱 Mobile-first | 🌍 Multi-monede/limbi | 📦 10k+ produse
🔄 Stoc real-time | 🛒 Coș abandonat | 🔒 Securitate PCI
📊 Analytics eComm | 🔌 Automatizări ERP | 🎯 SEO produse
```

### 5. Integrări
```
Plăți: Netopia, PayU, Stripe, PayPal, Revolut, MAIB, Victoriabank
Curierat: FAN Courier, Cargus, Sameday, DPD, GLS, Nova Poshta
Facturare: SmartBill, Oblio
Marketplace: eMAG
ERP/CRM: 1C, SAP, custom API, n8n, Make, Zapier
```

### 6. Proces
```
01 Brief & analiză → ofertă fixă 24-48h
02 Design & prototip → machetă înainte de cod
03 Dezvoltare & integrări → plăți, curierat, ERP
04 Lansare & suport → testare, training, mentenanță
```

### 7. Portofoliu
Proiecte filtrate din CMS: `categorie = magazin-online`.
Aceeași componentă elastic list (identică home).

### 8. Prețuri
```
Magazin de bază:      800–1500€  (catalog + checkout + 1 plată + 1 curier)
Magazin avansat:     1500–3000€  (+ ERP sync, multi-lingv, coș abandonat)
Magazin enterprise:   3000€+     (+ marketplace, AI, B2B)

Add-on-uri: plată extra 100-300€, curierat AWB 100-400€,
            API custom 200-1500€+, migrare 500-2000€
Mentenanță: 50-200€/lună, SEO eCommerce: 300-800€/lună
```

### 9. FAQ
6 întrebări: cât durează, gestiune după lansare, migrare SEO,
mentenanță, integrare ERP/CRM, securitate date.

### 10. CTA final
Identic cu secțiunea Contact de pe home (butoane Apel + WhatsApp + email).

## SEO

- `title`: Magazine online — Creare magazin online profesionist | LESCINSCHI
- `description`: Creăm magazine online complete: catalog, checkout, plăți, curierat, facturare. WordPress, WooCommerce, Shopify sau custom.
- Schema: `Service`, `FAQ`, `Organization`, `BreadcrumbList`
- `og:image`: din CMS
- `canonical`: `/servicii/magazine-online`

## Implementare

### Colecția în Payload (de creat)
`pagini-servicii` cu fields:
- titlu, slug, serviciu (rel → servicii)
- heroTitlu, heroSubtitlu, heroCuvantInel, heroImagine
- continut (blocks: text, features, integrations, pricing, faq)
- seo (titluSEO, descriereSEO)

### Ruta
`/app/(frontend)/servicii/[slug]/page.tsx`
async → getPayload → find by slug → render secțiuni

### Componente noi
| Componentă | Note |
|------------|------|
| ServiceHero | Ca Hero home, date din CMS |
| ServiceTypes | 3 carduri full-bleed cu logo tehnologii |
| ServiceFeatures | Grilă 3×3 iconițe SVG simple |
| ServiceIntegrations | Marquee + grid logo-uri |
| ServiceProcess | Adaptare Process home |
| ServicePricing | Refolosim Pricing home |
| Portfolio (filtrat) | Refolosim, query cu where: { categorie } |
| ServiceFAQ | Acordeon CSS + GSAP |
| Contact | Refolosim Contact.tsx |

### Animații GSAP
- Hero: mask-reveal + SVG ring draw
- Features: ScrollTrigger.batch reveal staggered
- Process: pin + scroll orizontal
- Portofoliu: elastic list (identic home)
- FAQ: height transition + arrow rotate
- Restul: [data-reveal] global

### Logo-uri tehnologii
WP, Shopify, Stripe, PayPal, Netopia, PayU, FAN Courier, Sameday, etc.
— SVG-uri simple, alb pe negru, găsite din surse publice sau desenate.

## Execuție (~5 ore)

| Pas | Ce | Timp |
|-----|---|------|
| 1 | Colecția `pagini-servicii` în Payload | 20 min |
| 2 | Ruta `/servicii/[slug]/page.tsx` | 15 min |
| 3 | ServiceHero + CSS | 30 min |
| 4 | ServiceTypes (3 carduri + logo-uri SVG) | 45 min |
| 5 | ServiceFeatures (3×3 iconițe) | 45 min |
| 6 | ServiceIntegrations (marquee + logo-uri) | 30 min |
| 7 | ServiceProcess (adaptare) | 20 min |
| 8 | Portofoliu filtrat (refolosire) | 15 min |
| 9 | ServicePricing (refolosire) | 20 min |
| 10 | ServiceFAQ (acordeon) | 30 min |
| 11 | CTA final (refolosire) | 10 min |
| 12 | SEO (metadata, schema) | 20 min |
| 13 | Seed pagină exemplu în CMS | 15 min |
| 14 | Build + test | 15 min |
