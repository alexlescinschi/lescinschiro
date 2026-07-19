// Insert: Serviciu "Montare & post-producție video"
// ponytail: run once with `npx tsx --env-file=.env scripts/add-montare-video.ts`
// Idempotent: dacă slug-ul există, face skip.
import { getPayload } from 'payload'
import config from '../payload.config'

type Block = ['h2' | 'p', string]
function lexical(blocks: Block[]) {
  return {
    root: {
      children: blocks.map(([type, text]) => {
        const node: any = {
          children: [{ detail: 0, format: 0, mode: 'normal', style: '', text, type: 'text', version: 1 }],
          direction: 'ltr', format: '', indent: 0, version: 1,
        }
        if (type === 'h2') { node.type = 'heading'; node.tag = 'h2' }
        else { node.type = 'paragraph'; node.textFormat = 0; node.textStyle = '' }
        return node
      }),
      direction: 'ltr', format: '', indent: 0, type: 'root', version: 1,
    },
  }
}

async function main() {
  const payload = await getPayload({ config })

  const existing = await payload.find({ collection: 'servicii', where: { slug: { equals: 'montare-video' } }, limit: 1 })
  if (existing.docs.length) {
    console.log('ℹ️  Serviciul "montare-video" există deja (id ' + existing.docs[0].id + ') — skip.')
    process.exit(0)
  }

  const imagineId = 1

  const doc = await payload.create({
    collection: 'servicii',
    data: {
      titlu: 'Montare & post-producție video',
      categorie: '',
      metaTitlu: 'Montare & Post-Producție Video — Editare, Color, Motion | LESCINSCHI',
      imagine: imagineId,
      descriereScurta: 'Servicii de montare și post-producție video: editare, color grading cinematografic, motion graphics, animații, subtitrare, sound design și optimizare pentru Reels, TikTok, YouTube și reclame plătite. Din materia primă, conținut care convertește.',
      heroTitlu: 'Montare video care PRINDE',
      heroSubtitlu: 'Editare, color grading, motion graphics, subtitrare, sound design. Optimizat pentru Reels, Shorts, YouTube, ads. Materia primă devine conținut care convertește.',
      heroCuvantInel: 'PRINDE',
      pret: '200–1.500+€/proiect',
      deliverables: 'Video final multi-format, Project files, Subtitrare, Sound mixat, 2 runde revizii',
      continut: lexical([
        ['h2', '60% din impactul unui video vine din editare, nu din filmare'],
        ['p', 'Filmarea bună contează. Dar materia primă devine conținut doar prin montaj. Un take mediocru cu editare bună bate un take bun cu editare slabă. Editarea dictează ritmul, emoția, tensiunea, mesajul.'],
        ['p', 'Lucrăm în DaVinci Resolve, Premiere Pro și After Effects — standardul industriei. Din materia primă (a ta sau filmată de noi), facem conținut care oprește scroll-ul și convertește.'],
        ['h2', 'Editare & pacing'],
        ['p', 'Tăieturile corecte țin atenția. Un clip de 30s cu pacing lent piere în primele 5s. Un clip cu jump cuts rapide, B-roll inserat, zoom-uri punctuale, menține atenția până la final. Studiem ce ține atenția pe fiecare platformă și edităm conform.'],
        ['p', 'Pentru Reels/TikTok: pacing alert, hook în primele 1.5 secunde, caption sync cu audio-ul. Pentru YouTube: ritm narativ, structură clară, chapter markers. Pentru ads: mesaj clar, CTA vizibil în ultimele 3 secunde.'],
        ['h2', 'Color grading cinematografic'],
        ['p', 'Imaginea brută din cameră e flat (log profile). Color grading-ul o aduce la viață: contrast corect, skin tones naturale, look cinematografic pe brandul tău. Creez LUT-uri custom pentru brand — toate videoclipurile tale arată consistent.'],
        ['p', 'Color grading-ul separă un video „OK” de un video „wow”. E diferența dintre „filmat cu telefonul” și „filmat profesiionist”.'],
        ['h2', 'Motion graphics & animații'],
        ['p', 'Text animat, logo stings, transitions custom, lower thirds, infografice animate, callouts. Pentru conținut educațional, explainer-uri și presentations, motion graphics fac mesajul clar și premium.'],
        ['p', 'Animăm în After Effects cu template-uri custom pe brandul tău. O dată construite, le reutilizăm pentru toate videoclipurile — consistență vizuală fără muncă duplicată.'],
        ['h2', 'Sound design'],
        ['p', 'Audio-ul e 50% din experiența video. Sunet slab = video care pare amator, indiferent de imagine. Mixăm voice-over + muzică + SFX (sound effects), cu ducking automat pentru claritate voce.'],
        ['p', 'Pentru Reels/TikTok: alegem trending audio care ajută la reach. Pentru YouTube: muzică licențiată (Artlist, Epidemic Sound) fără copyright strikes. Pentru ads: voice-over profesionist (ro/en/fr).'],
        ['h2', 'Subtitrare & captions'],
        ['p', '85% din vizionările pe social se fac fără sunet. Fără subtitrare, pierzi majoritatea audienței. Adăugăm captions animate, sync cu audio-ul, optimizați pentru Reels/TikTok (stil Alex Hormozi).'],
        ['p', 'Subtitrare în ro/en/fr. Pentru YouTube, captions .srt pentru SEO (Google indexează textul din subtitrări).'],
        ['h2', 'Multi-format output'],
        ['p', 'Dintr-un video, livrăm toate formatele: 9:16 vertical (Reels/TikTok/Shorts), 16:9 orizontal (YouTube/site), 1:1 square (Facebook feed), 4:5 (Instagram feed). Fără cost suplimentar — facem o dată, exportăm în toate formatele.'],
        ['p', 'Platforma corectă, formatul corect. Un Reels nu e un YouTube video — structura diferă, pacing diferă, hook diferă. Optimizăm pentru fiecare.'],
        ['h2', 'Versioning pentru ads'],
        ['p', 'Pentru reclame plătite, facem multiple variante: hook-uri diferite în primele 3s, CTA-uri diferite la final, copy diferit pe caption. Testăm A/B ce performează mai bine — algoritmul alege câștigătorul.'],
        ['p', 'Un video cu 3 hook-uri diferite = 3x șanse să găsești câștigătorul. Aici e ROI-ul real al editing-ului bun: mai bun ROAS pe campanii.'],
        ['h2', 'Cât costă montajul video?'],
        ['p', 'Editare clip scurt (sub 60s): 200–500€. Brand film complet (1-3 min): 800–1.500€. Set reclame video (3 variante): 500–1.000€. Motion graphics + animație: 100–300€ per element. Color grading separat: 150–400€ per video. Primești ofertă fixă după brief.'],
      ]),

      tipuri: [
        { titlu: 'Clip scurt (Reels/TikTok)', subtitlu: 'Sub 60s', descriere: 'Pacing alert, hook în primele 1.5s, captions animate. Pentru social organic și ads.', logouri: 'Vertical 9:16, Captions sync, Trending audio' },
        { titlu: 'Brand film & YouTube', subtitlu: '1-5 min', descriere: 'Ritm narativ, B-roll, chapter markers, color cinematic.', logouri: 'Horizontal 16:9, Sound design, Multi-cam edit' },
        { titlu: 'Reclame video', subtitlu: 'Pentru Meta & Google Ads', descriere: 'Multiple variante hook + CTA. A/B testing. Format per platformă.', logouri: '6s/15s/30s, Square + Vertical, CTA overlay' },
        { titlu: 'Motion graphics', subtitlu: 'Animații & explainers', descriere: 'Text animat, infografice, logo stings, lower thirds.', logouri: 'After Effects, Lottie, Custom templates' },
      ],

      features: [
        { icon: '✂️', titlu: 'Editare & pacing', descriere: 'Jump cuts, B-roll, zoom-uri. Ritm care ține atenția.' },
        { icon: '🎨', titlu: 'Color grading', descriere: 'Look cinematografic, LUT-uri custom pe brand.' },
        { icon: '🎬', titlu: 'Motion graphics', descriere: 'Text animat, infografice, logo stings, lower thirds.' },
        { icon: '🔊', titlu: 'Sound design', descriere: 'Voice-over + muzică + SFX mixat, cu ducking.' },
        { icon: '📝', titlu: 'Subtitrare animată', descriere: 'Captions sync cu audio, stil Hormozi, ro/en/fr.' },
        { icon: '📦', titlu: 'Multi-format', descriere: 'Vertical, orizontal, square. Dintr-un video, toate formatele.' },
        { icon: '⚡', titlu: 'Hook în primele 1.5s', descriere: 'Pentru Reels/TikTok, primul cadru oprește scroll-ul.' },
        { icon: '🎵', titlu: 'Trending audio', descriere: 'Pentru Reels/TikTok, alegem sunet care ajută la reach.' },
        { icon: '🎙️', titlu: 'Voice-over', descriere: 'Profesional ro/en/fr, inclus în pachet.' },
        { icon: '🔄', titlu: 'Versioning ads', descriere: 'Multiple hook-uri și CTA-uri, A/B testing.' },
        { icon: '📊', titlu: 'Captions .srt', descriere: 'Pentru YouTube, SEO boost (Google indexează textul).' },
        { icon: '✅', titlu: '2 runde revizii', descriere: 'Incluse. Revizii suplimentare: 50€/oră.' },
      ],

      integrari: [
        { eticheta: 'Editare', elemente: 'DaVinci Resolve, Adobe Premiere Pro, Final Cut Pro' },
        { eticheta: 'Motion graphics', elemente: 'Adobe After Effects, Lottie, Blender (3D)' },
        { eticheta: 'Color', elemente: "DaVinci Resolve Color Page, FilmConvert" },
        { eticheta: 'Audio', elemente: 'Adobe Audition, iZotope RX, Epidemic Sound, Artlist' },
        { eticheta: 'Subtitrare', elemente: 'Premiere Auto-Captions, Descript, Rev' },
        { eticheta: 'Stock & assets', elemente: 'Envato Elements, Motion Array, Artgrid' },
        { eticheta: 'Distribuție', elemente: 'Meta Ads, TikTok Ads, YouTube Studio, Vimeo' },
      ],

      preturi: [
        { nume: 'Clip scurt social', pret: '€200–500', include: 'Editare clip sub 60s, captions, sound, 1 format (vertical sau orizontal)' },
        { nume: 'Brand film complet', pret: '€800–1.500', include: '1-3 min edit, color grading, sound design, motion graphics, multi-format' },
        { nume: 'Set reclame video', pret: '€500–1.000', include: '3 variante hook diferite, multi-format, CTA overlay, A/B ready' },
      ],

      faq: [
        { intrebare: 'Lucrați cu materia primă a clientului?', raspuns: 'Da. Dacă ai filmat tu sau altă echipă, edităm din cadrele tale. Preferăm format RAW sau ProRes pentru calitate maximă, dar lucrăm și cu MP4/MOV de pe telefon.' },
        { intrebare: 'Ce program folosiți?', raspuns: 'DaVinci Resolve pentru color grading, Premiere Pro pentru editare, After Effects pentru motion graphics. Standardul industriei. Livrăm și project files la cerere.' },
        { intrebare: 'Cât durează editarea?', raspuns: 'Clip scurt (sub 60s): 2-3 zile lucrătoare. Brand film 1-3 min: 5-7 zile. Set reclame 3 variante: 3-5 zile. Urgent: -50% timp cu +30% tarif.' },
        { intrebare: 'Includeți subtitrare?', raspuns: 'Da, în toate pachetele. Captions animate, sync cu audio. ro/en/fr. Pentru YouTube, livrăm și .srt pentru SEO. 85% din vizionările pe social sunt fără sunet — fără captions pierzi.' },
        { intrebare: 'Câte runde de revizii includ?', raspuns: '2 runde, în toate pachetele. Revizii suplimentare: 50€/oră. Brief detaliat înainte = mai puține revizii necesare.' },
        { intrebare: 'Puteți face voice-over?', raspuns: 'Da, voice-over profesionist în română, engleză, franceză. Voce masculin sau feminin, la alegere. Pentru ads, recomandăm voice-over — crește conversion cu 20-40%.' },
        { intrebare: 'Faceți motion graphics / animații?', raspuns: 'Da, în After Effects. Text animat, infografice, logo stings, lower thirds. Construim template-uri custom pe brand — consistență vizuală pe toate videoclipurile tale.' },
        { intrebare: 'Cum funcționează trending audio pentru Reels?', raspuns: 'Alegem audio trending pe Instagram/TikTok care se potrivește brandului tău (și nu are copyright issues). Trending audio poate crește reach cu 2-5x dacă e prins la timp.' },
        { intrebare: 'Pentru ce platforme optimizați?', raspuns: 'Toate: Reels/TikTok (9:16 vertical, sub 60s), YouTube (16:9 orizontal, 1-10 min), Shorts (9:16, sub 60s), Facebook Feed (1:1 sau 4:5), Vimeo (16:9 high quality). Dintr-un video, mai multe formate fără cost suplimentar.' },
        { intrebare: 'Puteți face versioning pentru ads?', raspuns: 'Da. Facem 3-5 variante ale aceluiași video, cu hook diferit în primele 3s și CTA diferit la final. Algoritmul alege câștigătorul — ROI mare pe ad spend.' },
        { intrebare: 'Primești project files?', raspuns: 'Da, la cerere, pe toate pachetele. Înseamnă că poți modifica mai târziu cu alt editor, fără să înceapă de la zero. Fără vendor lock-in.' },
        { intrebare: 'Cât de mare pot fi fișierele?', raspuns: 'Pentru upload: până la 50GB pe WeTransfer / Google Drive / Dropbox. Pentru livrare: livrăm pe Google Drive shared. Pentru proiecte cu 4K/6K RAW: 100-500GB, recomandăm HDD fizic.' },
      ],
    },
  })

  console.log('✅ Serviciu creat:', doc.id, '—', doc.titlu, '| slug:', doc.slug)
  process.exit(0)
}

main().catch((e) => { console.error('❌ Eroare:', e); process.exit(1) })
