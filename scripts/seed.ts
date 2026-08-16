/* eslint-disable @typescript-eslint/no-explicit-any -- script one-off de import */
// Seed: creează utilizatorul admin + proiectul de exemplu Climatperfect
import { getPayload } from 'payload'
import config from '../payload.config'
import path from 'path'
import fs from 'fs'

async function seed() {
  const payload = await getPayload({ config })

  // creează utilizator admin
  try {
    await payload.create({
      collection: 'users',
      data: {
        email: 'alex.lescinschi@gmail.com',
        password: 'mariuta',
      } as any,
    })
    console.log('✅ Admin user created: alex.lescinschi@gmail.com')
  } catch (e: any) {
    if (e.message?.includes('duplicate') || e.message?.includes('unique')) {
      console.log('ℹ️ Admin user already exists')
    } else {
      console.error('❌ Failed to create user:', e.message)
    }
  }

  // upload media (copiază imaginea în folderul media Payload)
  const imgPath = path.resolve('public/work/p01.png')
  const imgBuffer = fs.readFileSync(imgPath)

  const media = await payload.create({
    collection: 'media',
    data: {},
    file: {
      data: imgBuffer,
      mimetype: 'image/png',
      name: 'p01.png',
      size: imgBuffer.length,
    },
  })
  console.log('✅ Media uploaded:', media.id)

  const { docs: services } = await payload.find({
    collection: 'servicii',
    where: { slug: { equals: 'magazine-online' } },
    limit: 1,
  })
  if (!services[0]) throw new Error('Serviciul Magazine online trebuie creat înainte de proiecte')

  // creează proiectul
  const project = await payload.create({
    collection: 'proiecte',
    data: {
      titlu: 'Climatperfect',
      slug: 'climatperfect',
      servicii: [services[0].id],
      linkLive: 'https://climatperfect.ro',
      imagine: media.id,
    },
  })
  console.log('✅ Project created:', project.id, '—', project.titlu)
  console.log('Done. Goto http://localhost:3000/admin to manage.')
  process.exit(0)
}

seed()
