import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'
import { Media } from './collections/Media'
import { Servicii } from './collections/Servicii'
import { Proiecte } from './collections/Proiecte'

// ponytail: sqlite local, postgres pe vps
// Function to avoid build-time evaluation of process.env
function getDB() {
  if (process.env.DATABASE_URI) {
    return postgresAdapter({
      pool: { connectionString: process.env.DATABASE_URI },
      push: true,
    })
  }
  return sqliteAdapter({ client: { url: 'file:./payload.db' } })
}

export default buildConfig({
  editor: lexicalEditor(),
  collections: [Media, Servicii, Proiecte],
  secret: process.env.PAYLOAD_SECRET || '',
  db: getDB(),
  sharp,
})
