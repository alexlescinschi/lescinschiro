// Migrație: câmpul `tehnologii` pe proiecte (chips pe cardurile de portofoliu).
import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "proiecte" ADD COLUMN IF NOT EXISTS "tehnologii" varchar;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "proiecte" DROP COLUMN IF EXISTS "tehnologii";
  `)
}
