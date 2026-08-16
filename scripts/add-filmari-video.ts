/* eslint-disable @typescript-eslint/no-explicit-any -- script one-off de import */
// Insert: Serviciu "Filmări video"
// ponytail: run once with `npx tsx --env-file=.env scripts/add-filmari-video.ts`
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

  const existing = await payload.find({ collection: 'servicii', where: { slug: { equals: 'filmari-video' } }, limit: 1 })
  if (existing.docs.length) {
    console.log('ℹ️  Serviciul "filmari-video" există deja (id ' + existing.docs[0].id + ') — skip.')
    process.exit(0)
  }

  const imagineId = 1

  const doc = await payload.create({
    collection: 'servicii',
    data: {
      titlu: 'Filmări video',
      metaTitlu: 'Filmări Video Profesionale — Clip Produs, Brand Film, Reclame | LESCINSCHI',
      imagine: imagineId,
      descriereScurta: 'Filmări video profesionale pentru afaceri: clipuri de produs, brand films, reclame video, corporate videos, interview-uri. Echipă profesională, echipamente cinema (4K/6K), lighting, sunet. De la storyboard la filmare pe locație în România și Moldova.',
      heroTitlu: 'Filmări video care POVESTESC',
      heroSubtitlu: 'Clipuri de produs, brand films, reclame video, corporate. De la storyboard la filmare pe locație, cu echipă profesională. Echipamente cinema, storytelling real.',
      heroCuvantInel: 'POVESTESC',
      pret: '500–3.000+€/zi',
      deliverables: 'Filmare live și cadre brute, Storyboard aprobat, Echipă profesională, Echipamente cinema, Toate take-urile pe drive',
      continut: lexical([
        ['h2', 'Video e limbajul anului 2026. Textul e complementar.'],
        ['p', 'TikTok, Reels, YouTube Shorts, pre-roll pe Meta și Google — video-ul domină distribuția atenției. Brandurile care nu au video content pierd 70% din reach-ul posibil pe social. Dar nu orice video — un video care spune o poveste, nu doar arată imagini.'],
        ['p', 'Filmăm conținut care funcționează: clipuri de produs care opresc scroll-ul, brand films care creează emoție, reclame video care convertesc, corporate videos care comunică profesionalism. Cu echipă profesionistă, echipamente cinema și storytelling real.'],
        ['h2', 'Storyboard înainte de filmare'],
        ['p', 'Nimic improvizat pe locație. Înainte de filmare, scriem storyboard: fiecare cadru planificat, unghiuri de cameră, mișcări, voice-over, muzică. Tu aprobi storyboard-ul înainte să fim pe locație. Asta înseamnă filmare eficientă — o zi de filmare face 4-6 asset-uri, nu unul.'],
        ['p', 'Storyboardul e documentat în Figma/PDF — îl primești, îl modifici, îl aprobi. Fără surprize pe ziua filmării.'],
        ['h2', 'Clipuri de produs'],
        ['p', 'Produsul tău arată bine. Dar pe o poză statică, nu se vede cum funcționează, cum se simte, cum se folosește. Clipul de produs rezolvă asta: 15-30 secunde care arată produsul în acțiune, cu unboxing, cu detail shots, cu lifestyle use-case.'],
        ['p', 'Folosim lighting controlat, fundaluri profesionale, macro shots pentru detalii. Produsul arată premium chiar și dacă e un produs de 10€. Pentru magazine, clipul de produs crește conversion rate cu 30-80%.'],
        ['h2', 'Brand films'],
        ['p', 'Un film scurt (1-3 minute) care spune povestea brandului tău: cine ești, de ce faci ce faci, ce te diferențiază. Nu un corporate video plictisitor cu oameni în costum la birou — un film care creează conexiune emoțională.'],
        ['p', 'Brand films se folosesc pe pagina principală a site-ului, pe presentări de vânzări, pe YouTube channel. Sunt investment pe termen lung — un brand film bun durează 2-3 ani.'],
        ['h2', 'Reclame video'],
        ['p', 'Clipuri de 6, 15, 30 secunde pentru reclame plătite: Meta Ads, TikTok Ads, YouTube Pre-roll, Google Display. Formatul corect pentru fiecare platformă (vertical pentru Reels, orizontal pentru YouTube).'],
        ['p', 'Scriem mai multe variante de ad copy, testăm hook-uri diferite în primele 3 secunde. Un ad video bun are 3-5x mai bun ROAS decât un ad static.'],
        ['h2', 'Corporate & interview'],
        ['p', 'Filme pentru pagina About, interview-uri cu fondatorul, prezentări de servicii, training-uri interne. Calitate broadcast — sunet profesionist, lighting controlat, cadre cinematice.'],
        ['p', 'Pentru B2B și corporate, un video well-produced comunică profesionalism mai bine decât 1000 de cuvinte pe un site.'],
        ['h2', 'Echipamente cinema'],
        ['p', 'Filmăm cu camere 4K/6K (Sony FX6, Blackmagic), lens-uri cinema, gimbal DJI Ronin pentru cadre stabilize, drone DJI pentru aerian, lighting Aputure, microfoane boom + lavalier. Sunet înregistrat separat și sincronizat în post-producție.'],
        ['p', 'Echipa: 1 director + 1 DOP (director de imagine) + 1 sound engineer + 1 lighting assistant. Pe ziua filmării, suntem 3-4 oameni.'],
        ['h2', 'Locații & permisiuni'],
        ['p', 'Filmăm în studio (București, Chișinău), pe locație (magazin, fabrică, birou), sau în exterior. Pentru exterior cu drone, obținem autorizații (necesare în RO/MD pentru zbor comercial).'],
        ['p', 'Călătorim pentru filmare în toată România și Moldova. Pentru producții mari, colaborăm cu echipe locale în alte orașe.'],
        ['h2', 'Cât costă o filmare?'],
        ['p', 'O zi de filmare: 500–1.500€ (în funcție de echipament și echipă). Brand film complet (1-3 min): 2.000–5.000€ (3-5 zile producție). Clipuri de produs (5-10 clipuri): 800–2.000€ per set. Reclame video: 1.000–3.000€ per set de 3 variante. Primești ofertă fixă după brief.'],
      ]),

      tipuri: [
        { titlu: 'Clip de produs', subtitlu: 'Pentru magazine', descriere: '15-30s care arată produsul în acțiune, cu unboxing și detalii. Lighting profesional.', logouri: 'Macro shots, Studio lighting, Background profesional' },
        { titlu: 'Brand film', subtitlu: 'Povestea brandului', descriere: 'Film scurt 1-3 min care comunică identitatea și valorile brandului.', logouri: 'Cinematic, Documentary style, Emotional storytelling' },
        { titlu: 'Reclame video', subtitlu: 'Pentru Meta & Google Ads', descriere: '6/15/30s optimizate pentru Reels, Stories, YouTube. Hook în primele 3s.', logouri: 'Vertical, Horizontal, Square, Multi-format' },
        { titlu: 'Corporate & interview', subtitlu: 'Pentru B2B și pagini About', descriere: 'Interview-uri, prezentări servicii, training-uri. Calitate broadcast.', logouri: 'Multi-cam, Studio, On-location' },
      ],

      features: [
        { icon: '🎬', titlu: 'Storyboard înainte', descriere: 'Fiecare cadru planificat, aprobat de tine.' },
        { icon: '📷', titlu: 'Echipamente cinema', descriere: 'Sony FX6, Blackmagic 4K/6K, lens-uri cinema.' },
        { icon: '🎥', titlu: 'Gimbal & drone', descriere: 'Cadre stabilize, aerian profesional.' },
        { icon: '💡', titlu: 'Lighting profesional', descriere: 'Aputure, 3-point lighting, controlled environment.' },
        { icon: '🎙️', titlu: 'Sunet pro', descriere: 'Boom + lavalier, înregistrat separat, sincronizat.' },
        { icon: '👥', titlu: 'Echipă 3-4 oameni', descriere: 'Director, DOP, sound, lighting assistant.' },
        { icon: '🎯', titlu: 'Hook în primele 3s', descriere: 'Pentru reclame video, primul cadru oprește scroll-ul.' },
        { icon: '📦', titlu: 'Multi-format', descriere: 'Vertical (Reels), orizontal (YouTube), square (Feed).' },
        { icon: '✨', titlu: 'Color grading', descriere: 'Look cinematografic, pe brandul tău.' },
        { icon: '🏢', titlu: 'Locații multiple', descriere: 'Studio, birou, fabrică, exterior. Autorizații drone incluse.' },
        { icon: '🌍', titlu: 'RO + MD', descriere: 'Filmăm în toată România și Moldova.' },
        { icon: '📁', titlu: 'Toate take-urile', descriere: 'Primești cadre brute + finalize, pe drive.' },
      ],

      integrari: [
        { eticheta: 'Camere', elemente: 'Sony FX6, Blackmagic Pocket 6K, Sony A7S III' },
        { eticheta: 'Lens-uri', elemente: 'Sigma Art, Sony G-Master, lens-uri cinema anamorphic' },
        { eticheta: 'Stabilizare', elemente: 'DJI Ronin RS3 Pro (gimbal), DJI Inspire 3 (drone)' },
        { eticheta: 'Lighting', elemente: 'Aputure 600D, Aputure 300X, Amaran panels, modifiers' },
        { eticheta: 'Sunet', elemente: 'Sennheiser boom, Rode Wireless PRO lavalier, Zoom F8 recorder' },
        { eticheta: 'Post-producție', elemente: 'DaVinci Resolve, Adobe Premiere Pro, After Effects' },
        { eticheta: 'Distribuție', elemente: 'Meta Ads, TikTok Ads, YouTube Ads, organic social' },
      ],

      preturi: [
        { nume: 'Zi de filmare', pret: '€500–1.500', include: '1 zi filmare, echipă 3 oameni, echipament cinema, 4-6 asset-uri, storyboard' },
        { nume: 'Set clipuri produs', pret: '€800–2.000', include: '5-10 clipuri de produs, lighting studio, 1 zi, format multi (vertical + orizontal)' },
        { nume: 'Brand film complet', pret: '€2.000–5.000', include: 'Storyboard + 2-3 zile filmare + editing + color + sound design, 1-3 min' },
      ],

      faq: [
        { intrebare: 'Cât durează de la brief la video final?', raspuns: 'Clip de produs: 7-10 zile. Brand film: 3-4 săptămâni (storyboard + filmare + post). Reclame video: 2-3 săptămâni. Urgent: se poate cu +30% tarif.' },
        { intrebare: 'Ce echipamente folosiți?', raspuns: 'Camere 4K/6K (Sony FX6, Blackmagic), lens-uri cinema, gimbal DJI Ronin, drone DJI, lighting Aputure, sunet Sennheiser + Zoom. Echipament de nivel broadcast, nu DSLR consumer.' },
        { intrebare: 'Câți oameni vin pe locație?', raspuns: '3-4: regizor, DOP (cameraman), sound engineer, lighting assistant. Pentru producții mari, mai mulți. Pentru clipuri simple, 2 fac uneori.' },
        { intrebare: 'Filmăm și seara/noaptea?', raspuns: 'Da. Avem lighting profesional care simulează daylight. Filmăm 24/7 dacă trebuie. Pentru exterior noaptea, avem lighting HMI.' },
        { intrebare: 'Pentru ce platforme optimizați video?', raspuns: 'Toate: Instagram Reels (9:16 vertical), YouTube (16:9 orizontal), TikTok (9:16), Facebook Feed (1:1 square sau 4:5). Dintr-o filmare, livrăm toate formatele.' },
        { intrebare: 'Cât durează o zi de filmare?', raspuns: '8-10 ore pe locație, inclusiv setup. Producem 4-6 asset-uri finale într-o zi (dacă storyboardul e bun și locația e pregătită).' },
        { intrebare: 'Pot participa la filmare?', raspuns: 'Da, încurajăm. Aprobi cadre pe loc, sugerezi ajustări. E video-ul tău. Noi suntem execuția, tu ești brandul.' },
        { intrebare: 'Ai nevoie de actori/modeli?', raspuns: 'Pentru unboxing și clipuri produs, nu. Pentru lifestyle shots cu oameni, da — lucrăm cu model agency sau cu angajații tăi (de multe ori, autentic bate profesional).' },
        { intrebare: 'Puteți filma cu drone?', raspuns: 'Da. Avem licență și autorizații pentru zbor comercial în RO și MD. Pentru exterior cu drone, obținem permisele (necesare 7-14 zile în avans).' },
        { intrebare: 'Cine face editarea?', raspuns: 'Noi, în echipă. Vezi serviciul „Montare & post-producție video” pentru detalii. Prețul de filmare include și un basic edit; pentru editing complex e separat.' },
        { intrebare: 'Dacă vrem schimbări după filmare?', raspuns: '2 runde de revizii sunt incluse. Revizii suplimentare: 50€/oră. De aceea facem storyboard înainte — ca să minimizăm nevoia de schimbări.' },
        { intrebare: 'Călătoriți pentru filmare?', raspuns: 'Da, în toată România și Moldova. Pentru alte țări, la cerere. Costurile de călătorie + cazare sunt suportate de client, estimate transparent în ofertă.' },
      ],
    },
  })

  console.log('✅ Serviciu creat:', doc.id, '—', doc.titlu, '| slug:', doc.slug)
  process.exit(0)
}

main().catch((e) => { console.error('❌ Eroare:', e); process.exit(1) })
