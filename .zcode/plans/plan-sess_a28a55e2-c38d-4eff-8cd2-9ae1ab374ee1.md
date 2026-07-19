# Plan: Blog complet (colecție + 2 rute + 3 articole seed)

## Ce construiesc

Blog simplu dar interesant, în același stil dark-premium ca restul site-ului. Cu categorii, carduri cu preview, pagină articol cu rich text, animații GSAP, SEO complet (Article JSON-LD), și 3 articole reale pentru pornire.

## Decizii pe care le iau (cu rationale ponytail)

| Decizie | Alegere | De ce |
|---|---|---|
| **Categorii** | Câmp `select` cu 6 opțiuni (nu colecție separată) | Categorii = 6, rareori se schimbă. Colecție separată = overhead. Hardcodat în collection. Refactor mai târziu dacă ajung la 20+. |
| **Slug** | Auto din titlu (dacă e gol), păstrat dacă e setat | Calea Payload standard. Nu se strică URL-ul la editare titlu. |
| **Drafts** | Payload native `versions: { drafts: true }` | Lucrul ăsta dă "preview"-ul cerut: poți scrie un articol, salva ca draft, publica mai târziu. +scheduled publishing. |
| **Autor** | Câmp text simplu (default "Alex Lescinschi") | Ponytail: blog cu un singur autor. Relație users = prea complex acum. |
| **Excerpt** | Câmp separat (max 160 char) | Mai curat decât extragerea din rich text. Folosit pe card + SEO description. |
| **Timp citire** | Calculat din conținut (helper `readingTime`) | Nu se stochează. ~200 cuv/min. 15 linii de cod. |
| **Cover image** | Upload → Media (required) | Reutilizează colecția existentă. |
| **Data publicare** | Câmp separat `publicatLa` (default = acum) | Control asupra datei afișate (ex: backdate articol). |
| **Preview cards** | Imagine + categorie + titlu + excerpt + dată + timp citire | Toate pe cardul de listare. |
| **Preview draft Payload** | SĂRIT pentru v1 | Necesită rută preview + token secret. Mai târziu. Native drafts deja permit vizualizare în admin. |

**Cele 6 categorii** (aliniate cu serviciile + planul SEO §6):
1. Magazin online
2. SEO
3. Web design
4. Integrări
5. AI & Automatizări
6. Sfaturi

## Cele 3 articole seed (SEO-aligned, cross-link cu serviciile)

1. **„Cât costă un magazin online în România în 2026"** — intenție comercială mare
2. **„WooCommerce vs Shopify vs Custom: ce alegi"** — comparison long-tail
3. **„SEO pentru magazin online în România: ghid complet 2026"** — informational + comercial

Fiecare: 800-1200 cuvinte, rich text cu H2/paragraafe/liste, cover image (reuse din public/work/), excerpt real, FAQ la final.

## Fișiere de creat (6 noi)

| Fișier | Rol |
|---|---|
| `collections/Blog.ts` | Definiție colecție Payload |
| `app/(frontend)/blog/page.tsx` | Rută listă (server: fetch + metadata + JSON-LD Blog) |
| `app/(frontend)/blog/[slug]/page.tsx` | Rută articol (server: fetch + generateMetadata + Article JSON-LD) |
| `components/BlogList.tsx` | Client: filtre + grid carduri + GSAP reveal |
| `components/BlogArticle.tsx` | Client: hero articol + `<RichText>` + meta + CTA |
| `scripts/add-blog-seed.ts` | Seed 3 articole (idempotent, ca la servicii) |

## Fișiere de editat (4)

| Fișier | Ce adaug |
|---|---|
| `payload.config.ts` | Import `Blog` + adaug în array `collections` |
| `app/(frontend)/sitemap.ts` | Query `blog` + spread URL-uri `/blog` + `/blog/[slug]` |
| `data/content.ts` | Adaug `{ label: "Blog", href: "/blog" }` în `nav` |
| `app/globals.css` | Stiluri `.blog-*` (card, hero, meta, prose, filtre) |

## Pași execuție (ordine exactă)

1. **Colecția** `collections/Blog.ts` — slug hook (copiat din Servicii), SEO group (copiat din Proiecte), câmpuri: titlu, slug, categorie, excerpt, autor, publicatLa, coverImage, continut (richText), `versions: { drafts: true }`.
2. **Înregistrare** în `payload.config.ts`.
3. **Tipuri** — `npm run generate:types` (regenerează `payload-types.ts` cu interfața Blog).
4. **Ruta listă** `app/(frontend)/blog/page.tsx` — `force-dynamic`, fetch blog sortat după `publicatLa`, mapează la obiecte plain, pasează la BlogList, JSON-LD Blog.
5. **Ruta articol** `app/(frontend)/blog/[slug]/page.tsx` — async params, `generateMetadata` cu `title.absolute`, JSON-LD Article (author/datePublished/image/publisher), `readingTime(continut)`.
6. **Componenta listă** `BlogList.tsx` — reuse `.pf__filters` pattern pentru categorii, `.wk__grid`-style cards, GSAP stagger reveal (fără elastic compression — prea agresiv pentru text).
7. **Componenta articol** `BlogArticle.tsx` — hero (eyebrow categorie + titlu + meta cu autor/dată/timp), cover image, `<RichText data={continut} />` în `.blog-prose`, CTA final (link către serviciu relevant + contact).
8. **CSS** `.blog-*` în globals.css — `.blog-card`, `.blog-hero`, `.blog-meta`, `.blog-prose` (copiat din `.svc-prose`), responsive.
9. **Sitemap** — adaug blog URLs.
10. **Nav** — adaug Blog în `nav`.
11. **Seed script** `add-blog-seed.ts` — 3 articole complete cu cover (reuse `public/work/`).
12. **Run seed** — `npx tsx --env-file=.env scripts/add-blog-seed.ts`.
13. **Build verificare** — `npm run build` (Trebuie să treacă).
14. **Commit + push** — GitHub → Railway redeploy automat.

## Ce SARESC (ponytail)

- **Preview draft Payload** (rută separată cu secret) — mai târziu
- **Paginare** — 3 articole nu au nevoie. Adăugăm când trecem de 12.
- **Căutare blog** — YAGNI
- **Colecție Autori separată** — un autor acum
- **RSS feed** — dacă cere cineva
- **Taxonomie de tag-uri** — categorii sunt suficiente
- **Subscribers / newsletter** — feature separat, nu partea de blog

## Rezultat final

- `/blog` — listă cu filtre pe categorii (6), carduri cu preview, animații reveal
- `/blog/[slug]` — pagină articol cu rich text, hero, meta, CTA, JSON-LD Article
- 3 articole SEO-valabile populate în DB
- Blog în nav pe toate paginile
- Sitemap include toate URL-urile blog
- SEO complet per articol (title, description, OG, JSON-LD)
- Commit + push pe GitHub → Railway redeploy automat cu tot blogul

## Bonus observat în explorare

- Sitemap actual NU include `/portofoliu` static (inconsistență). Adaug și asta în același edit.
- `nav` folosește `<a href>` nu `<Link>` — `/blog` va fi full navigation, consistent cu restul. Nu modific.

Confirmă planul și execut totul în ordine.