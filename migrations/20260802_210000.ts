// Migrație: proiectele folosesc direct relația cu servicii; categoriile duplicate dispar.
import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    INSERT INTO "proiecte_rels" ("order", "parent_id", "path", "servicii_id")
    SELECT
      1,
      p."id",
      'servicii',
      s."id"
    FROM "proiecte" p
    JOIN "servicii" s ON s."slug" = CASE p."categorie"::text
      WHEN 'magazin-online' THEN 'magazine-online'
      WHEN 'corporativ' THEN 'site-uri-corporative'
      WHEN 'landing-page' THEN 'landing-page-uri'
    END
    WHERE p."categorie" IS NOT NULL
      AND NOT EXISTS (
        SELECT 1
        FROM "proiecte_rels" r
        WHERE r."parent_id" = p."id" AND r."path" = 'servicii'
      );

    DO $$
    BEGIN
      IF EXISTS (
        SELECT 1
        FROM "proiecte" p
        WHERE NOT EXISTS (
          SELECT 1 FROM "proiecte_rels" r
          WHERE r."parent_id" = p."id" AND r."path" = 'servicii'
        )
      ) THEN
        RAISE EXCEPTION 'Migrarea a fost oprită: există proiecte fără servicii asociate';
      END IF;
    END $$;

    ALTER TABLE "proiecte" DROP COLUMN IF EXISTS "categorie";
    DROP TYPE IF EXISTS "public"."enum_proiecte_categorie";
    ALTER TABLE "servicii" DROP COLUMN IF EXISTS "categorie";
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    CREATE TYPE "public"."enum_proiecte_categorie" AS ENUM ('magazin-online', 'corporativ', 'landing-page');
    ALTER TABLE "proiecte" ADD COLUMN "categorie" "enum_proiecte_categorie";
    ALTER TABLE "servicii" ADD COLUMN "categorie" varchar;

    UPDATE "proiecte" p
    SET "categorie" = CASE s."slug"
      WHEN 'magazine-online' THEN 'magazin-online'::"enum_proiecte_categorie"
      WHEN 'site-uri-corporative' THEN 'corporativ'::"enum_proiecte_categorie"
      WHEN 'landing-page-uri' THEN 'landing-page'::"enum_proiecte_categorie"
    END
    FROM "proiecte_rels" r
    JOIN "servicii" s ON s."id" = r."servicii_id"
    WHERE r."parent_id" = p."id"
      AND r."path" = 'servicii'
      AND s."slug" IN ('magazine-online', 'site-uri-corporative', 'landing-page-uri');

    UPDATE "servicii"
    SET "categorie" = CASE "slug"
      WHEN 'magazine-online' THEN 'magazin-online'
      WHEN 'landing-page-uri' THEN 'landing-page'
      WHEN 'site-uri-corporative' THEN 'corporativ'
      WHEN 'creare-site-uri' THEN 'corporativ'
    END;
  `)
}
