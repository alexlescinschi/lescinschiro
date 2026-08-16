import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "integrari" ADD COLUMN "logo_fundal_inchis" boolean DEFAULT false;
  ALTER TABLE "_integrari_v" ADD COLUMN "version_logo_fundal_inchis" boolean DEFAULT false;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "integrari" DROP COLUMN "logo_fundal_inchis";
  ALTER TABLE "_integrari_v" DROP COLUMN "version_logo_fundal_inchis";`)
}
