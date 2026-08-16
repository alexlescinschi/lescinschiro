import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'
import { Media } from './collections/Media'
import { Servicii } from './collections/Servicii'
import { Proiecte } from './collections/Proiecte'
import { Blog } from './collections/Blog'
import { Integrari } from './collections/Integrari'
import { migrations } from './migrations'

// ponytail: sqlite local (push automat), postgres pe vps (prodMigrations la boot).
// push:true e ignorat când NODE_ENV=production; prodMigrations îl înlocuiește.
function getDB() {
  if (process.env.DATABASE_URI) {
    return postgresAdapter({
      pool: { connectionString: process.env.DATABASE_URI },
      prodMigrations: migrations,
    })
  }
  return sqliteAdapter({ client: { url: process.env.SQLITE_URL || 'file:./payload.db' } })
}

export default buildConfig({
  editor: lexicalEditor(),
  collections: [Media, Servicii, Proiecte, Blog, Integrari],
  secret: process.env.PAYLOAD_SECRET || '',
  db: getDB(),
  sharp,
})
