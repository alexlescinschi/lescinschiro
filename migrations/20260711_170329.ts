import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "servicii_tipuri" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titlu" varchar NOT NULL,
  	"subtitlu" varchar,
  	"descriere" varchar,
  	"logouri" varchar
  );
  
  CREATE TABLE "servicii_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar NOT NULL,
  	"titlu" varchar NOT NULL,
  	"descriere" varchar
  );
  
  CREATE TABLE "servicii_integrari" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eticheta" varchar NOT NULL,
  	"elemente" varchar NOT NULL
  );
  
  CREATE TABLE "servicii_preturi" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"nume" varchar NOT NULL,
  	"pret" varchar,
  	"include" varchar
  );
  
  CREATE TABLE "servicii_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"intrebare" varchar NOT NULL,
  	"raspuns" varchar NOT NULL
  );
  
  ALTER TABLE "servicii" ADD COLUMN "hero_cuvant_inel" varchar;
  ALTER TABLE "servicii" ADD COLUMN "deliverables" varchar;
  ALTER TABLE "servicii_tipuri" ADD CONSTRAINT "servicii_tipuri_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."servicii"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "servicii_features" ADD CONSTRAINT "servicii_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."servicii"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "servicii_integrari" ADD CONSTRAINT "servicii_integrari_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."servicii"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "servicii_preturi" ADD CONSTRAINT "servicii_preturi_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."servicii"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "servicii_faq" ADD CONSTRAINT "servicii_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."servicii"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "servicii_tipuri_order_idx" ON "servicii_tipuri" USING btree ("_order");
  CREATE INDEX "servicii_tipuri_parent_id_idx" ON "servicii_tipuri" USING btree ("_parent_id");
  CREATE INDEX "servicii_features_order_idx" ON "servicii_features" USING btree ("_order");
  CREATE INDEX "servicii_features_parent_id_idx" ON "servicii_features" USING btree ("_parent_id");
  CREATE INDEX "servicii_integrari_order_idx" ON "servicii_integrari" USING btree ("_order");
  CREATE INDEX "servicii_integrari_parent_id_idx" ON "servicii_integrari" USING btree ("_parent_id");
  CREATE INDEX "servicii_preturi_order_idx" ON "servicii_preturi" USING btree ("_order");
  CREATE INDEX "servicii_preturi_parent_id_idx" ON "servicii_preturi" USING btree ("_parent_id");
  CREATE INDEX "servicii_faq_order_idx" ON "servicii_faq" USING btree ("_order");
  CREATE INDEX "servicii_faq_parent_id_idx" ON "servicii_faq" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "servicii_tipuri" CASCADE;
  DROP TABLE "servicii_features" CASCADE;
  DROP TABLE "servicii_integrari" CASCADE;
  DROP TABLE "servicii_preturi" CASCADE;
  DROP TABLE "servicii_faq" CASCADE;
  ALTER TABLE "servicii" DROP COLUMN "hero_cuvant_inel";
  ALTER TABLE "servicii" DROP COLUMN "deliverables";`)
}
