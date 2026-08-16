import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_integrari_regiuni" AS ENUM('md', 'ro', 'ue', 'international');
  CREATE TYPE "public"."enum_integrari_categorie" AS ENUM('plati-online', 'rate-finantare', 'curierat-fulfillment', 'erp-stoc-contabilitate', 'crm-vanzari', 'marketplace-feeduri', 'marketing-analytics', 'automatizari-comunicare', 'programari-sisteme-custom');
  CREATE TYPE "public"."enum_integrari_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__integrari_v_version_regiuni" AS ENUM('md', 'ro', 'ue', 'international');
  CREATE TYPE "public"."enum__integrari_v_version_categorie" AS ENUM('plati-online', 'rate-finantare', 'curierat-fulfillment', 'erp-stoc-contabilitate', 'crm-vanzari', 'marketplace-feeduri', 'marketing-analytics', 'automatizari-comunicare', 'programari-sisteme-custom');
  CREATE TYPE "public"."enum__integrari_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "servicii_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"integrari_id" integer
  );
  
  CREATE TABLE "blog_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"integrari_id" integer
  );
  
  CREATE TABLE "_blog_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"integrari_id" integer
  );
  
  CREATE TABLE "integrari_aliasuri" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"valoare" varchar
  );
  
  CREATE TABLE "integrari_regiuni" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_integrari_regiuni",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "integrari_capabilitati" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"valoare" varchar
  );
  
  CREATE TABLE "integrari_cerinte" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"valoare" varchar
  );
  
  CREATE TABLE "integrari_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"intrebare" varchar,
  	"raspuns" varchar
  );
  
  CREATE TABLE "integrari" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"nume" varchar,
  	"slug" varchar,
  	"logo_fisier" varchar,
  	"logo_alt" varchar,
  	"categorie" "enum_integrari_categorie",
  	"rezumat" varchar,
  	"durata" varchar,
  	"pret" varchar,
  	"featured_home" boolean DEFAULT false,
  	"ordine" numeric DEFAULT 100,
  	"pagina_publica" boolean DEFAULT false,
  	"continut" jsonb,
  	"url_oficial" varchar,
  	"seo_meta_titlu" varchar,
  	"seo_meta_descriere" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_integrari_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_integrari_v_version_aliasuri" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"valoare" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_integrari_v_version_regiuni" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__integrari_v_version_regiuni",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_integrari_v_version_capabilitati" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"valoare" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_integrari_v_version_cerinte" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"valoare" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_integrari_v_version_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"intrebare" varchar,
  	"raspuns" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_integrari_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_nume" varchar,
  	"version_slug" varchar,
  	"version_logo_fisier" varchar,
  	"version_logo_alt" varchar,
  	"version_categorie" "enum__integrari_v_version_categorie",
  	"version_rezumat" varchar,
  	"version_durata" varchar,
  	"version_pret" varchar,
  	"version_featured_home" boolean DEFAULT false,
  	"version_ordine" numeric DEFAULT 100,
  	"version_pagina_publica" boolean DEFAULT false,
  	"version_continut" jsonb,
  	"version_url_oficial" varchar,
  	"version_seo_meta_titlu" varchar,
  	"version_seo_meta_descriere" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__integrari_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  ALTER TABLE "proiecte_rels" ADD COLUMN "integrari_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "integrari_id" integer;
  ALTER TABLE "servicii_rels" ADD CONSTRAINT "servicii_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."servicii"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "servicii_rels" ADD CONSTRAINT "servicii_rels_integrari_fk" FOREIGN KEY ("integrari_id") REFERENCES "public"."integrari"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_rels" ADD CONSTRAINT "blog_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."blog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_rels" ADD CONSTRAINT "blog_rels_integrari_fk" FOREIGN KEY ("integrari_id") REFERENCES "public"."integrari"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_v_rels" ADD CONSTRAINT "_blog_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_blog_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_v_rels" ADD CONSTRAINT "_blog_v_rels_integrari_fk" FOREIGN KEY ("integrari_id") REFERENCES "public"."integrari"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "integrari_aliasuri" ADD CONSTRAINT "integrari_aliasuri_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."integrari"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "integrari_regiuni" ADD CONSTRAINT "integrari_regiuni_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."integrari"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "integrari_capabilitati" ADD CONSTRAINT "integrari_capabilitati_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."integrari"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "integrari_cerinte" ADD CONSTRAINT "integrari_cerinte_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."integrari"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "integrari_faq" ADD CONSTRAINT "integrari_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."integrari"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_integrari_v_version_aliasuri" ADD CONSTRAINT "_integrari_v_version_aliasuri_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_integrari_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_integrari_v_version_regiuni" ADD CONSTRAINT "_integrari_v_version_regiuni_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_integrari_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_integrari_v_version_capabilitati" ADD CONSTRAINT "_integrari_v_version_capabilitati_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_integrari_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_integrari_v_version_cerinte" ADD CONSTRAINT "_integrari_v_version_cerinte_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_integrari_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_integrari_v_version_faq" ADD CONSTRAINT "_integrari_v_version_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_integrari_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_integrari_v" ADD CONSTRAINT "_integrari_v_parent_id_integrari_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."integrari"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "servicii_rels_order_idx" ON "servicii_rels" USING btree ("order");
  CREATE INDEX "servicii_rels_parent_idx" ON "servicii_rels" USING btree ("parent_id");
  CREATE INDEX "servicii_rels_path_idx" ON "servicii_rels" USING btree ("path");
  CREATE INDEX "servicii_rels_integrari_id_idx" ON "servicii_rels" USING btree ("integrari_id");
  CREATE INDEX "blog_rels_order_idx" ON "blog_rels" USING btree ("order");
  CREATE INDEX "blog_rels_parent_idx" ON "blog_rels" USING btree ("parent_id");
  CREATE INDEX "blog_rels_path_idx" ON "blog_rels" USING btree ("path");
  CREATE INDEX "blog_rels_integrari_id_idx" ON "blog_rels" USING btree ("integrari_id");
  CREATE INDEX "_blog_v_rels_order_idx" ON "_blog_v_rels" USING btree ("order");
  CREATE INDEX "_blog_v_rels_parent_idx" ON "_blog_v_rels" USING btree ("parent_id");
  CREATE INDEX "_blog_v_rels_path_idx" ON "_blog_v_rels" USING btree ("path");
  CREATE INDEX "_blog_v_rels_integrari_id_idx" ON "_blog_v_rels" USING btree ("integrari_id");
  CREATE INDEX "integrari_aliasuri_order_idx" ON "integrari_aliasuri" USING btree ("_order");
  CREATE INDEX "integrari_aliasuri_parent_id_idx" ON "integrari_aliasuri" USING btree ("_parent_id");
  CREATE INDEX "integrari_regiuni_order_idx" ON "integrari_regiuni" USING btree ("order");
  CREATE INDEX "integrari_regiuni_parent_idx" ON "integrari_regiuni" USING btree ("parent_id");
  CREATE INDEX "integrari_capabilitati_order_idx" ON "integrari_capabilitati" USING btree ("_order");
  CREATE INDEX "integrari_capabilitati_parent_id_idx" ON "integrari_capabilitati" USING btree ("_parent_id");
  CREATE INDEX "integrari_cerinte_order_idx" ON "integrari_cerinte" USING btree ("_order");
  CREATE INDEX "integrari_cerinte_parent_id_idx" ON "integrari_cerinte" USING btree ("_parent_id");
  CREATE INDEX "integrari_faq_order_idx" ON "integrari_faq" USING btree ("_order");
  CREATE INDEX "integrari_faq_parent_id_idx" ON "integrari_faq" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "integrari_slug_idx" ON "integrari" USING btree ("slug");
  CREATE INDEX "integrari_categorie_idx" ON "integrari" USING btree ("categorie");
  CREATE INDEX "integrari_featured_home_idx" ON "integrari" USING btree ("featured_home");
  CREATE INDEX "integrari_ordine_idx" ON "integrari" USING btree ("ordine");
  CREATE INDEX "integrari_pagina_publica_idx" ON "integrari" USING btree ("pagina_publica");
  CREATE INDEX "integrari_updated_at_idx" ON "integrari" USING btree ("updated_at");
  CREATE INDEX "integrari_created_at_idx" ON "integrari" USING btree ("created_at");
  CREATE INDEX "integrari__status_idx" ON "integrari" USING btree ("_status");
  CREATE INDEX "_integrari_v_version_aliasuri_order_idx" ON "_integrari_v_version_aliasuri" USING btree ("_order");
  CREATE INDEX "_integrari_v_version_aliasuri_parent_id_idx" ON "_integrari_v_version_aliasuri" USING btree ("_parent_id");
  CREATE INDEX "_integrari_v_version_regiuni_order_idx" ON "_integrari_v_version_regiuni" USING btree ("order");
  CREATE INDEX "_integrari_v_version_regiuni_parent_idx" ON "_integrari_v_version_regiuni" USING btree ("parent_id");
  CREATE INDEX "_integrari_v_version_capabilitati_order_idx" ON "_integrari_v_version_capabilitati" USING btree ("_order");
  CREATE INDEX "_integrari_v_version_capabilitati_parent_id_idx" ON "_integrari_v_version_capabilitati" USING btree ("_parent_id");
  CREATE INDEX "_integrari_v_version_cerinte_order_idx" ON "_integrari_v_version_cerinte" USING btree ("_order");
  CREATE INDEX "_integrari_v_version_cerinte_parent_id_idx" ON "_integrari_v_version_cerinte" USING btree ("_parent_id");
  CREATE INDEX "_integrari_v_version_faq_order_idx" ON "_integrari_v_version_faq" USING btree ("_order");
  CREATE INDEX "_integrari_v_version_faq_parent_id_idx" ON "_integrari_v_version_faq" USING btree ("_parent_id");
  CREATE INDEX "_integrari_v_parent_idx" ON "_integrari_v" USING btree ("parent_id");
  CREATE INDEX "_integrari_v_version_version_slug_idx" ON "_integrari_v" USING btree ("version_slug");
  CREATE INDEX "_integrari_v_version_version_categorie_idx" ON "_integrari_v" USING btree ("version_categorie");
  CREATE INDEX "_integrari_v_version_version_featured_home_idx" ON "_integrari_v" USING btree ("version_featured_home");
  CREATE INDEX "_integrari_v_version_version_ordine_idx" ON "_integrari_v" USING btree ("version_ordine");
  CREATE INDEX "_integrari_v_version_version_pagina_publica_idx" ON "_integrari_v" USING btree ("version_pagina_publica");
  CREATE INDEX "_integrari_v_version_version_updated_at_idx" ON "_integrari_v" USING btree ("version_updated_at");
  CREATE INDEX "_integrari_v_version_version_created_at_idx" ON "_integrari_v" USING btree ("version_created_at");
  CREATE INDEX "_integrari_v_version_version__status_idx" ON "_integrari_v" USING btree ("version__status");
  CREATE INDEX "_integrari_v_created_at_idx" ON "_integrari_v" USING btree ("created_at");
  CREATE INDEX "_integrari_v_updated_at_idx" ON "_integrari_v" USING btree ("updated_at");
  CREATE INDEX "_integrari_v_latest_idx" ON "_integrari_v" USING btree ("latest");
  ALTER TABLE "proiecte_rels" ADD CONSTRAINT "proiecte_rels_integrari_fk" FOREIGN KEY ("integrari_id") REFERENCES "public"."integrari"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_integrari_fk" FOREIGN KEY ("integrari_id") REFERENCES "public"."integrari"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "proiecte_rels_integrari_id_idx" ON "proiecte_rels" USING btree ("integrari_id");
  CREATE INDEX "payload_locked_documents_rels_integrari_id_idx" ON "payload_locked_documents_rels" USING btree ("integrari_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "servicii_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "blog_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_blog_v_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "integrari_aliasuri" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "integrari_regiuni" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "integrari_capabilitati" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "integrari_cerinte" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "integrari_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "integrari" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_integrari_v_version_aliasuri" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_integrari_v_version_regiuni" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_integrari_v_version_capabilitati" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_integrari_v_version_cerinte" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_integrari_v_version_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_integrari_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "proiecte_rels" DROP CONSTRAINT "proiecte_rels_integrari_fk";
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_integrari_fk";
  DROP INDEX "proiecte_rels_integrari_id_idx";
  DROP INDEX "payload_locked_documents_rels_integrari_id_idx";
  ALTER TABLE "proiecte_rels" DROP COLUMN "integrari_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "integrari_id";
  DROP TABLE "servicii_rels" CASCADE;
  DROP TABLE "blog_rels" CASCADE;
  DROP TABLE "_blog_v_rels" CASCADE;
  DROP TABLE "integrari_aliasuri" CASCADE;
  DROP TABLE "integrari_regiuni" CASCADE;
  DROP TABLE "integrari_capabilitati" CASCADE;
  DROP TABLE "integrari_cerinte" CASCADE;
  DROP TABLE "integrari_faq" CASCADE;
  DROP TABLE "integrari" CASCADE;
  DROP TABLE "_integrari_v_version_aliasuri" CASCADE;
  DROP TABLE "_integrari_v_version_regiuni" CASCADE;
  DROP TABLE "_integrari_v_version_capabilitati" CASCADE;
  DROP TABLE "_integrari_v_version_cerinte" CASCADE;
  DROP TABLE "_integrari_v_version_faq" CASCADE;
  DROP TABLE "_integrari_v" CASCADE;
  DROP TYPE "public"."enum_integrari_regiuni";
  DROP TYPE "public"."enum_integrari_categorie";
  DROP TYPE "public"."enum_integrari_status";
  DROP TYPE "public"."enum__integrari_v_version_regiuni";
  DROP TYPE "public"."enum__integrari_v_version_categorie";
  DROP TYPE "public"."enum__integrari_v_version_status";`)
}
