// ponytail: migrație pentru colecția Blog + rename SEO în Servicii.
// SQL extras din schema generată de Payload pushDevSchema (convenții Payload 3 + drizzle).
// Verificat contra pg_dump pe DB nou creat.

import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // === Enums pentru Blog (categorii + status drafts) ===
  await db.execute(sql`
    CREATE TYPE "public"."enum_blog_categorie" AS ENUM ('magazin-online', 'seo', 'web-design', 'integrari', 'ai-automatizari', 'sfaturi');
  `)
  await db.execute(sql`
    CREATE TYPE "public"."enum_blog_status" AS ENUM ('draft', 'published');
  `)
  await db.execute(sql`
    CREATE TYPE "public"."enum__blog_v_version_categorie" AS ENUM ('magazin-online', 'seo', 'web-design', 'integrari', 'ai-automatizari', 'sfaturi');
  `)
  await db.execute(sql`
    CREATE TYPE "public"."enum__blog_v_version_status" AS ENUM ('draft', 'published');
  `)

  // === Tabela blog ===
  await db.execute(sql`
    CREATE TABLE "blog" (
      "id" serial PRIMARY KEY NOT NULL,
      "titlu" varchar,
      "slug" varchar,
      "categorie" "enum_blog_categorie",
      "excerpt" varchar,
      "autor" varchar DEFAULT 'Alex Lescinschi',
      "publicat_la" timestamp(3) with time zone,
      "cover_image_id" integer,
      "continut" jsonb,
      "seo_titlu_s_e_o" varchar,
      "seo_descriere_s_e_o" varchar,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "_status" "enum_blog_status" DEFAULT 'draft'
    );
  `)

  // === Tabela _blog_v (drafts/versions pentru versions.drafts: true) ===
  await db.execute(sql`
    CREATE TABLE "_blog_v" (
      "id" serial PRIMARY KEY NOT NULL,
      "parent_id" integer,
      "version_titlu" varchar,
      "version_slug" varchar,
      "version_categorie" "enum__blog_v_version_categorie",
      "version_excerpt" varchar,
      "version_autor" varchar DEFAULT 'Alex Lescinschi',
      "version_publicat_la" timestamp(3) with time zone,
      "version_cover_image_id" integer,
      "version_continut" jsonb,
      "version_seo_titlu_s_e_o" varchar,
      "version_seo_descriere_s_e_o" varchar,
      "version_updated_at" timestamp(3) with time zone,
      "version_created_at" timestamp(3) with time zone,
      "version__status" "enum__blog_v_version_status" DEFAULT 'draft',
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "latest" boolean
    );
  `)

  // === Indexuri blog ===
  await db.execute(sql`CREATE INDEX "blog__status_idx" ON "blog" USING btree ("_status");`)
  await db.execute(sql`CREATE INDEX "blog_cover_image_idx" ON "blog" USING btree ("cover_image_id");`)
  await db.execute(sql`CREATE INDEX "blog_created_at_idx" ON "blog" USING btree ("created_at");`)
  await db.execute(sql`CREATE UNIQUE INDEX "blog_slug_idx" ON "blog" USING btree ("slug");`)
  await db.execute(sql`CREATE INDEX "blog_updated_at_idx" ON "blog" USING btree ("updated_at");`)

  // === Indexuri _blog_v ===
  await db.execute(sql`CREATE INDEX "_blog_v_created_at_idx" ON "_blog_v" USING btree ("created_at");`)
  await db.execute(sql`CREATE INDEX "_blog_v_latest_idx" ON "_blog_v" USING btree ("latest");`)
  await db.execute(sql`CREATE INDEX "_blog_v_parent_idx" ON "_blog_v" USING btree ("parent_id");`)
  await db.execute(sql`CREATE INDEX "_blog_v_updated_at_idx" ON "_blog_v" USING btree ("updated_at");`)
  await db.execute(sql`CREATE INDEX "_blog_v_version_version__status_idx" ON "_blog_v" USING btree ("version__status");`)
  await db.execute(sql`CREATE INDEX "_blog_v_version_version_cover_image_idx" ON "_blog_v" USING btree ("version_cover_image_id");`)
  await db.execute(sql`CREATE INDEX "_blog_v_version_version_created_at_idx" ON "_blog_v" USING btree ("version_created_at");`)
  await db.execute(sql`CREATE INDEX "_blog_v_version_version_slug_idx" ON "_blog_v" USING btree ("version_slug");`)
  await db.execute(sql`CREATE INDEX "_blog_v_version_version_updated_at_idx" ON "_blog_v" USING btree ("version_updated_at");`)

  // === FK constraints ===
  await db.execute(sql`
    ALTER TABLE "_blog_v" ADD CONSTRAINT "_blog_v_parent_id_blog_id_fk"
      FOREIGN KEY ("parent_id") REFERENCES "public"."blog"("id") ON DELETE SET NULL;
  `)
  await db.execute(sql`
    ALTER TABLE "_blog_v" ADD CONSTRAINT "_blog_v_version_cover_image_id_media_id_fk"
      FOREIGN KEY ("version_cover_image_id") REFERENCES "public"."media"("id") ON DELETE SET NULL;
  `)
  await db.execute(sql`
    ALTER TABLE "blog" ADD CONSTRAINT "blog_cover_image_id_media_id_fk"
      FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE SET NULL;
  `)

  // === payload_locked_documents_rels: adaugă coloana blog_id + index + FK ===
  await db.execute(sql`ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "blog_id" integer;`)
  await db.execute(sql`CREATE INDEX "payload_locked_documents_rels_blog_id_idx" ON "payload_locked_documents_rels" USING btree ("blog_id");`)
  await db.execute(sql`
    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_blog_fk"
      FOREIGN KEY ("blog_id") REFERENCES "public"."blog"("id") ON DELETE CASCADE;
  `)

  // === Servicii: rename SEO → metaTitlu (codul cere meta_titlu, DB vechi are seo_*) ===
  await db.execute(sql`ALTER TABLE "servicii" ADD COLUMN "meta_titlu" varchar;`)
  // ponytail: copiem valoarea veche înainte de drop, ca să nu pierdem SEO title existent.
  await db.execute(sql`UPDATE "servicii" SET "meta_titlu" = "seo_titlu_s_e_o" WHERE "meta_titlu" IS NULL AND "seo_titlu_s_e_o" IS NOT NULL;`)
  await db.execute(sql`ALTER TABLE "servicii" DROP COLUMN "seo_titlu_s_e_o";`)
  await db.execute(sql`ALTER TABLE "servicii" DROP COLUMN "seo_descriere_s_e_o";`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // Reverse pentru rollback (nu folosim, dar Payload cere funcția).
  await db.execute(sql`ALTER TABLE "servicii" ADD COLUMN "seo_descriere_s_e_o" varchar;`)
  await db.execute(sql`ALTER TABLE "servicii" ADD COLUMN "seo_titlu_s_e_o" varchar;`)
  await db.execute(sql`UPDATE "servicii" SET "seo_titlu_s_e_o" = "meta_titlu" WHERE "meta_titlu" IS NOT NULL;`)
  await db.execute(sql`ALTER TABLE "servicii" DROP COLUMN "meta_titlu";`)

  await db.execute(sql`ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_blog_fk";`)
  await db.execute(sql`DROP INDEX IF EXISTS "payload_locked_documents_rels_blog_id_idx";`)
  await db.execute(sql`ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "blog_id";`)

  await db.execute(sql`ALTER TABLE "blog" DROP CONSTRAINT IF EXISTS "blog_cover_image_id_media_id_fk";`)
  await db.execute(sql`ALTER TABLE "_blog_v" DROP CONSTRAINT IF EXISTS "_blog_v_version_cover_image_id_media_id_fk";`)
  await db.execute(sql`ALTER TABLE "_blog_v" DROP CONSTRAINT IF EXISTS "_blog_v_parent_id_blog_id_fk";`)

  await db.execute(sql`DROP INDEX IF EXISTS "_blog_v_version_version_updated_at_idx";`)
  await db.execute(sql`DROP INDEX IF EXISTS "_blog_v_version_version_slug_idx";`)
  await db.execute(sql`DROP INDEX IF EXISTS "_blog_v_version_version_created_at_idx";`)
  await db.execute(sql`DROP INDEX IF EXISTS "_blog_v_version_version_cover_image_idx";`)
  await db.execute(sql`DROP INDEX IF EXISTS "_blog_v_version_version__status_idx";`)
  await db.execute(sql`DROP INDEX IF EXISTS "_blog_v_updated_at_idx";`)
  await db.execute(sql`DROP INDEX IF EXISTS "_blog_v_parent_idx";`)
  await db.execute(sql`DROP INDEX IF EXISTS "_blog_v_latest_idx";`)
  await db.execute(sql`DROP INDEX IF EXISTS "_blog_v_created_at_idx";`)

  await db.execute(sql`DROP INDEX IF EXISTS "blog_updated_at_idx";`)
  await db.execute(sql`DROP INDEX IF EXISTS "blog_slug_idx";`)
  await db.execute(sql`DROP INDEX IF EXISTS "blog_created_at_idx";`)
  await db.execute(sql`DROP INDEX IF EXISTS "blog_cover_image_idx";`)
  await db.execute(sql`DROP INDEX IF EXISTS "blog__status_idx";`)

  await db.execute(sql`DROP TABLE IF EXISTS "_blog_v";`)
  await db.execute(sql`DROP TABLE IF EXISTS "blog";`)

  await db.execute(sql`DROP TYPE IF EXISTS "enum__blog_v_version_status";`)
  await db.execute(sql`DROP TYPE IF EXISTS "enum__blog_v_version_categorie";`)
  await db.execute(sql`DROP TYPE IF EXISTS "enum_blog_status";`)
  await db.execute(sql`DROP TYPE IF EXISTS "enum_blog_categorie";`)
}
