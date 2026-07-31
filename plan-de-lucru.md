# Plan de lucru — Site agenție web

> Document de bază. Ne întoarcem mereu aici.
> Ultima actualizare: 2026-07-25

---

## TASKURI ACTIVE — ce avem de făcut ACUM

### 🔴 Bug: Toate proiectele arată aceeași imagine

**Problema:** `scripts/add-proiecte-bulk.ts` seed-uie toate cele 37 de proiecte cu `imagine: 1` (același media ID). Când înlocuiești fișierul media-ului 1 din admin, TOATE proiectele primesc noua imagine.

**Ce trebuie făcut:**
- [ ] **Task 1.1:** Pregătești screenshot-uri individuale pentru fiecare proiect (37 bucăți). Le pui într-un folder (ex: `media/proiecte/`), numite simplu: `prunovicgor.png`, `artcharm-ro.png`, etc.
- [ ] **Task 1.2:** Scriu un script nou care pentru fiecare proiect: upload imaginea corespunzătoare ca media record NOU, apoi actualizează proiectul să pointeze la noul media ID.
- [ ] **Task 1.3:** Rulam scriptul pe server (`docker compose exec app npx tsx scripts/...`).

**Alternativă manuală:** Editezi fiecare proiect din `/admin`, dai "Change" la imagine, uploadezi screenshot-ul corect → Payload creează media nou + actualizează doar proiectul ăla. Dar sunt 37 de proiecte, deci scriptul e mai rapid.

---

### 🔴 Bug: Utilizator admin nu există pe server

**Problema:** `scripts/seed.ts` creează userul `alex.lescinschi@gmail.com` / `mariuta`, dar NU rulează automat la deploy (Dockerfile + entrypoint.sh nu includ seed).

**Ce trebuie făcut:**
- [ ] **Task 2.1:** Rulam seed-ul pe server: `docker compose exec app npx tsx scripts/seed.ts`
- [ ] **Task 2.2:** (Opțional) Adaug seed automat în `entrypoint.sh` — rulează doar dacă userul nu există, ca să nu pice la fiecare deploy.

---

### 🟡 Task 3: Formular contact cu backend real

**Problema:** Momentan contact form trimite prin `mailto:` — deschide clientul de email local. Pe telefon/mobil fără client de email configurat, mesajele se pierd.

**Ce trebuie făcut:**
- [ ] **Task 3.1:** Instalez o librărie de email (Resend sau Nodemailer — Resend e mai simplu, are API key, 100 emailuri/lună gratis).
- [ ] **Task 3.2:** Creez un API route (`app/api/contact/route.ts`) care primește formularul și trimite email.
- [ ] **Task 3.3:** Adaug `RESEND_API_KEY` și `CONTACT_EMAIL` în `.env`.
- [ ] **Task 3.4:** Modific componentele `Contact.tsx` și `ContactPage.tsx` să folosească `fetch()` către API route în loc de `mailto:`.

---

### 🟡 Task 4: Pagini detaliu proiect (studiu de caz)

**Problema:** Colecția `Proiecte` are câmpul `studiuDeCaz` (rich text) + `seo` (titlu SEO, descriere SEO), dar nu există pagină frontend care să le afișeze. Proiectele link-uiesc direct la URL-ul extern al clientului.

**Ce trebuie făcut:**
- [ ] **Task 4.1:** Creez `app/(frontend)/portofoliu/[slug]/page.tsx` — pagină dinamică pentru fiecare proiect care are `studiuDeCaz` completat.
- [ ] **Task 4.2:** Creez componenta `ProiectDetail` care afișează: titlu, imagine mare, conținut rich text, servicii folosite, link live, CTA "Vrei ceva similar?".
- [ ] **Task 4.3:** Modific `PortfolioPage.tsx` și `Portfolio.tsx`: dacă proiectul are `studiuDeCaz`, cardul link-uiește intern (`/portofoliu/[slug]`); dacă nu, link-uiește extern (comportamentul curent).
- [ ] **Task 4.4:** Adaug ruta în `sitemap.ts`.

---

### 🟢 Task 5: Îmbunătățiri mici (nice to have)

- [ ] **Task 5.1:** `Cache-Control: no-store` pe paginile care listează proiecte, să nu fie cache-uite de Cloudflare/CDN.
- [ ] **Task 5.2:** Schimbă `PAYLOAD_SECRET` din `hunter2-local-dev-only` într-o valoare reală pe server.
- [ ] **Task 5.3:** Verifică dacă `lescinschi.art` e domeniul final — actualizează `site.domain` în `data/content.ts`.
- [ ] **Task 5.4:** Adaugă testimoniale reale (momentan sunt placeholder).
- [ ] **Task 5.5:** Înlocuiește `scripts/add-blog-seed.ts` cover images (toate folosesc media ID-urile 1-3, aceeași problemă ca la proiecte).

---

## REFERINȚĂ — ce e deja construit (nu se modifică)

### Stack
Next.js 16 + React 19 + Payload CMS 3.86 + GSAP 3.15 + Lenis 1.3. Postgres pe server, SQLite local. Docker + docker-compose pe VPS.

### Frontend — pagini gata
| Rută | Status |
|---|---|
| `/` (home) | ✅ Toate 11 secțiuni + animații GSAP |
| `/portofoliu` | ✅ Grid cu filtre, elastic scroll |
| `/servicii/[slug]` | ✅ Dinamic din Payload |
| `/blog` | ✅ Listare + JSON-LD |
| `/blog/[slug]` | ✅ Articol complet + JSON-LD |
| `/despre-noi` | ✅ |
| `/proces` | ✅ |
| `/contact` | ✅ (dar formularul e mailto) |
| `/portofoliu/[slug]` | ❌ NU EXISTĂ — Task 4 |

### CMS (Payload) — colecții gata
| Colecție | Status |
|---|---|
| `media` | ✅ Upload imagini |
| `servicii` | ✅ Cu toate câmpurile |
| `proiecte` | ✅ + studiuDeCaz + SEO (dar SEED-ul are bug-ul cu imagine: 1) |
| `blog` | ✅ Cu drafts, 6 categorii, SEO |
| `users` | ✅ Built-in Payload auth |

### Scripturi seed gata
13 scripturi: seed principal, bulk proiecte (37), blog (3 articole), 10 pagini de serviciu.

### SEO
- ✅ `sitemap.ts` (dinamic, include servicii + blog)
- ✅ `robots.ts`
- ✅ JSON-LD pe toate paginile (Organization, Service, FAQ, BlogPosting, BreadcrumbList, CollectionPage)
- ✅ Metadata API per pagină

### Stiluri
- ✅ `globals.css` (974 linii) — tot designul K72 dark + Inter
- ✅ `fonts.css` — Switzer variable self-hosted
- ✅ Responsive complet

---

## ORDINEA DE LUCRU (priorități)

1. **Task 2.1** — Rulezi seed-ul pe server (5 minute, deblochezi accesul la admin)
2. **Task 1.1** — Pregătești screenshot-urile pentru cele 37 de proiecte (tu, nu eu — ai nevoie de acces la site-urile reale)
3. **Task 1.2 + 1.3** — Scriptul de imagini per proiect + rulare pe server
4. **Task 3** — Formular contact cu backend real
5. **Task 4** — Pagini detaliu proiect (studiu de caz)
6. **Task 5** — Îmbunătățiri mici
