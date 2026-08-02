// Migrație: texte concise dedicate mega-meniului de servicii.
import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "servicii" ADD COLUMN IF NOT EXISTS "descriere_meniu" varchar;

    UPDATE "servicii"
    SET "descriere_meniu" = CASE "slug"
      WHEN 'creare-site-uri' THEN 'De la landing la platformă. Design pe brandul tău, rapid și optimizat pentru Google.'
      WHEN 'magazine-online' THEN 'Catalog, coș, checkout, plăți, curierat și facturare — gata de vânzare.'
      WHEN 'landing-page-uri' THEN 'O pagină, un obiectiv: conversie. Viteză maximă și tracking pentru campanii.'
      WHEN 'site-uri-corporative' THEN 'Prezență profesională, structură clară, multilingv și SEO local.'
      WHEN 'integrari-plati-online' THEN 'Netopia, PayU, Stripe, PayPal și Revolut. Checkout sigur și plăți fără fricțiune.'
      WHEN 'integrari-curierat' THEN 'FAN Courier, Cargus, Sameday, DPD și GLS. AWB și tracking automat.'
      WHEN 'integrari-api' THEN 'ERP, CRM, eMAG, SmartBill și Oblio. Dacă are API, îl conectăm.'
      WHEN 'seo-romania' THEN 'Optimizare tehnică și conținut care te ajută să fii găsit în România.'
      WHEN 'ai-automatizari' THEN 'Chatboți și fluxuri automate care reduc munca repetitivă din afacere.'
      WHEN 'social-media-management' THEN 'Strategie, conținut și campanii pentru canalele unde sunt clienții tăi.'
      WHEN 'reclame-google-ads' THEN 'Search, Shopping, Display și YouTube. Buget controlat, rezultate măsurate.'
      WHEN 'reclame-meta' THEN 'Campanii Facebook și Instagram cu targetare, retargeting și creative care convertesc.'
      WHEN 'filmari-video' THEN 'Filmări de produs, reclame și brand films realizate cu imagine și sunet profesionist.'
      WHEN 'montare-post-productie-video' THEN 'Editare, color grading, animații și sound design pentru conținut care convinge.'
      ELSE "descriere_scurta"
    END
    WHERE "descriere_meniu" IS NULL OR "descriere_meniu" = '';
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "servicii" DROP COLUMN IF EXISTS "descriere_meniu";
  `)
}
