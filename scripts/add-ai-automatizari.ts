// Insert: Serviciu "AI & Automatizări"
// ponytail: run once with `npx tsx --env-file=.env scripts/add-ai-automatizari.ts`
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
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        }
        if (type === 'h2') { node.type = 'heading'; node.tag = 'h2' }
        else { node.type = 'paragraph'; node.textFormat = 0; node.textStyle = '' }
        return node
      }),
      direction: 'ltr',
      format: '',
      indent: 0,
      type: 'root',
      version: 1,
    },
  }
}

async function main() {
  const payload = await getPayload({ config })

  const existing = await payload.find({ collection: 'servicii', where: { slug: { equals: 'ai-automatizari' } }, limit: 1 })
  if (existing.docs.length) {
    console.log('ℹ️  Serviciul "ai-automatizari" există deja (id ' + existing.docs[0].id + ') — skip.')
    process.exit(0)
  }

  const imagineId = 1

  const doc = await payload.create({
    collection: 'servicii',
    data: {
      titlu: 'AI & Automatizări',
      metaTitlu: 'AI & Automatizări — Chatbot, Fluxuri Auto, n8n, Make | LESCINSCHI',
      imagine: imagineId,
      descriereScurta: 'Implementăm AI și automatizări pentru afaceri: chatbot pe site care răspunde în română 24/7 pe baza produselor tale, automatizări de comenzi (comandă → AWB → factură → email), generare de conținut SEO, integrări n8n, Make, Zapier între site, CRM și WhatsApp.',
      heroTitlu: 'AI & automatizări care lucrează NOAPTEA',
      heroSubtitlu: 'Chatbot pe site în română, automatizări de comenzi (AWB + factură + email), generare de conținut SEO, integrări n8n/Make/Zapier între site, CRM, WhatsApp.',
      heroCuvantInel: 'NOAPTEA',
      pret: '300–2.000+€',
      deliverables: 'Automatizare live și testată, Codul tău pe GitHub, Documentație flux, Training, Mentenanță lunară',
      continut: lexical([
        ['h2', 'Dacă un om face de două ori același lucru, un bot îl poate face de o mie de ori'],
        ['p', 'Cea mai mare pierdere într-o afacere online nu e lipsa clienților, ci timpul pierdut pe operațiuni repetitive: copiezi comenzi dintr-un loc în altul, răspunzi la aceleași întrebări, generezi AWB-uri manual, trimiți email-uri de confirmare. Toate astea se pot automatiza.'],
        ['p', 'Nu vindem „AI magic”. Vindem fluxuri clare, testate, care economisesc 10–40 de ore pe săptămână din munca ta sau a echipei. Implementăm, le monitorizăm, le îmbunătățim. AI-ul e doar un instrument; valoarea e în cum îl folosești.'],
        ['h2', 'Chatbot pe site — răspunde 24/7, în română'],
        ['p', 'Un chatbot antrenat pe produsele, serviciile și întrebările tale frecvente. Când un client întreabă „aveți x pe stoc?”, „cât costă livrarea în Iași?”, „pot plăti în rate?” — botul răspunde instant, 24/7, în română. Când întrebarea e complexă sau emoțională, o transferă către un om cu tot istoricul conversației.'],
        ['p', 'Chatbot-ul nu înlocuiește oamenii — îi eliberează de întrebările repetitive ca să se concentreze pe vânzări și suport real. Răspunde în câteva secunde (nu în 4 ore), niciodată obosit, niciodată răsuflat.'],
        ['h2', 'Automatizări de comenzi end-to-end'],
        ['p', 'O comandă plasată pe site declanșează: verificare plată → generare factură SmartBill/Oblio → generare AWB curier → email client cu tracking → scădere stoc în ERP → update CRM → etichetare client (nou/recurent/VIP). Tot fluxul, fără un singur click uman.'],
        ['p', 'Pentru retururi: clientul dă click pe „retur” → AWB de retur generat → email cu instrucțiuni → stocul se reposiționează automat când coletul ajunge înapoi. Ceea ce lua 20 de minute per comandă acum durează 0 minute.'],
        ['h2', 'Generare de conținut cu AI (cu editare umană)'],
        ['p', 'Descrieri de produse pentru cataloage mari: 1.000 de produse fără descriere? AI-ul generează drafturi unice, optimizate SEO, pentru fiecare, pe baza specificațiilor. Un editor uman le rafinează. Rezultat: conținut care rank-uiește, fără 3 luni de muncă manuală.'],
        ['p', 'Articole de blog pe long-tail: AI-ul generează structura și primele drafturi, un editor uman adaugă expertiză și voce. 10x mai multe articole publicate pe lună, calitate superioară conținutului 100% AI. Google penalizează AI-ul brut; răsplătește AI-ul editat.'],
        ['h2', 'Integrări n8n, Make, Zapier — low-code pentru fluxuri rapide'],
        ['p', 'Pentru fluxuri între site, CRM, email, Slack, Google Sheets, WhatsApp — folosim n8n (self-hosted, fără abonament), Make sau Zapier. Construim fluxuri vizuale, ușor de modificat de tine sau de echipa noastră. Pentru volume mari și logică complexă: cod custom, mai rapid și mai ieftin pe termen lung.'],
        ['h2', 'Asistent intern pentru echipă'],
        ['p', 'Sortare automată a lead-urilor (cald/rece/nu răspunde), răspunsuri automate la email-uri repetitive, rapoarte săptămânale generate și trimise pe Slack/WhatsApp, rezumate ale întâlnirilor, extragerea acțiunilor din notițe. E ca un asistent virtual care nu doarme și nu cere salariu.'],
        ['h2', 'Analiză predictivă și recomandări'],
        ['p', 'Pe baza istoricului de comenzi, AI-ul prezice ce produse vor fi bestseller-uri lună viitoare (decizii de stoc), care clienți sunt pe cale să churn-eze (retargeting), ce produse recomandăm fiecărui (cross-sell/up-sell). Pentru magazine cu 1.000+ clienți, asta înseamnă +15–25% revenă.'],
        ['h2', 'Cât costă o automatizare AI?'],
        ['p', 'Între 300 € și 2.000+ €, în funcție de complexitate. Un chatbot simplu (FAQ + handoff uman) pornește de la 300 €. Fluxuri de automatizare cu 3–5 servicii: 500–1.000 €. Soluții enterprise (analiză predictivă, AI custom, multi-flux): 1.000–2.000+ €. Primești ofertă fixă în 24–48 de ore după brief.'],
      ]),

      tipuri: [
        { titlu: 'Chatbot pe site', subtitlu: 'Suport 24/7 în română', descriere: 'Antrenat pe produsele tale. Răspunde instant, transferă la om când e cazul.', logouri: 'OpenAI, Anthropic Claude, Dialogflow, Voiceflow' },
        { titlu: 'Automatizări de flux', subtitlu: 'Comenzi, email-uri, facturi', descriere: 'Fluxuri end-to-end care elimină munca manuală repetitivă.', logouri: 'n8n, Make, Zapier, Pipedream' },
        { titlu: 'Generare de conținut', subtitlu: 'AI + editare umană', descriere: 'Descrieri de produse, articole de blog, copy. Volum mare, calitate superioară.', logouri: 'OpenAI GPT-4, Claude, Jasper, Copy.ai' },
        { titlu: 'AI intern & predictiv', subtitlu: 'Asistent pentru echipă', descriere: 'Sortare lead-uri, rapoarte, recomandări, predicții de stoc.', logouri: 'OpenAI, LangChain, Pinecone, Vector DBs' },
      ],

      features: [
        { icon: '🤖', titlu: 'Chatbot 24/7', descriere: 'Răspunde în română, pe baza produselor tale.' },
        { icon: '🔄', titlu: 'Handoff către om', descriere: 'Întrebări complexe → transfer cu istoric.' },
        { icon: '📦', titlu: 'Automatizări comenzi', descriere: 'Comandă → factură → AWB → email, automat.' },
        { icon: '🧾', titlu: 'Facturare automată', descriere: 'SmartBill/Oblio la fiecare comandă.' },
        { icon: '📝', titlu: 'Conținut AI + uman', descriere: 'Drafturi AI, editare umană. Calitate, nu spam.' },
        { icon: '📧', titlu: 'Email-uri automate', descriere: 'Confirmări, tracking, abandoned cart, follow-up.' },
        { icon: '🔗', titlu: 'n8n / Make / Zapier', descriere: 'Fluxuri low-code între 3+ servicii.' },
        { icon: '💬', titlu: 'WhatsApp Business', descriere: 'Răspunsuri automate pe WhatsApp.' },
        { icon: '📊', titlu: 'Rapoarte automate', descriere: 'Pe Slack/email, generate săptămânal.' },
        { icon: '🎯', titlu: 'Recomandări AI', descriere: 'Cross-sell, up-sell pe baza istoricului.' },
        { icon: '🔮', titlu: 'Predictiv', descriere: 'Bestseller-uri, churn risk, predicții stoc.' },
        { icon: '🛡️', titlu: 'Safety & guardrails', descriere: 'AI-ul nu răspunde greșit. Filtre umane.' },
      ],

      integrari: [
        { eticheta: 'Modele AI', elemente: 'OpenAI GPT-4o, Anthropic Claude, Gemini, Mistral' },
        { eticheta: 'Chatbot & conversație', elemente: 'Dialogflow, Voiceflow, Chatbase, Intercom' },
        { eticheta: 'Low-code', elemente: 'n8n, Make (Integromat), Zapier, Pipedream' },
        { eticheta: 'CRM & marketing', elemente: 'HubSpot, Pipedrive, Mailchimp, NewsMAN, ActiveCampaign' },
        { eticheta: 'Mesagerie', elemente: 'WhatsApp Business API, Telegram, Facebook Messenger, Slack' },
        { eticheta: 'Generare conținut', elemente: 'Jasper, Copy.ai, Surfer SEO, Notion AI' },
        { eticheta: 'Vector DB & RAG', elemente: 'Pinecone, Weaviate, Qdrant, pgvector' },
        { eticheta: 'Monitoring AI', elemente: 'LangSmith, Langfuse, Helicone' },
      ],

      preturi: [
        { nume: 'Chatbot de bază', pret: '€300', include: 'Chatbot FAQ + handoff uman, antrenat pe conținutul tău, integrat pe site' },
        { nume: 'Automatizări multi-flux', pret: '€1.000', include: 'Chatbot + 3–5 fluxuri (comenzi, email-uri, facturare), n8n self-hosted' },
        { nume: 'Soluție AI enterprise', pret: '€2.000+', include: 'AI predictiv, RAG custom, generare conținut bulk, multi-flux, monitoring 24/7' },
      ],

      faq: [
        { intrebare: 'Chatbot-ul o să răspundă greșit clienților?', raspuns: 'Implementăm guardrails: botul răspunde doar pe ce știe sigur (produse, prețuri, livrare), refuză politicos când nu e sigur și transferă către un om. Monitorizăm conversațiile, ajustăm continuu. Mai bine „nu știu, te conectez cu un coleg” decât o minciună.' },
        { intrebare: 'În ce limbi răspunde chatbot-ul?', raspuns: 'În română (nativ), engleză, rusă (pentru Moldova), franceză (pentru clienții FR). Adăugăm limbi după nevoie. Pentru site-uri multi-regiune, botul detectează limba clientului automat.' },
        { intrebare: 'Chatbot-ul înlocuiește echipa de suport?', raspuns: 'Nu. O eliberează de întrebările repetitive (60–80% din volum) ca oamenii să se concentreze pe cazuri complexe și vânzări. Un bot bine configurat scade timpul de răspuns de la ore la secunde și crește satisfacția.' },
        { intrebare: 'Ce înseamnă „automatizare de comenzi end-to-end”?', raspuns: 'Comanda plasată declanșează singură: verificarea plății, generarea facturii (SmartBill/Oblio), AWB curier, email client cu tracking, scăderea stocului în ERP, update în CRM. Fără un click uman. Reduci timpul per comandă de la 20 min la 0 min.' },
        { intrebare: 'Folosiți n8n, Make sau Zapier?', raspuns: 'Depinde de caz. n8n self-hosted = fără abonament lunar, control total, ideal pentru volume mari. Make = UX excelent, bun pentru fluxuri complexe vizual. Zapier = cel mai simplu, dar scump la volume. Cod custom = pentru volume masive și logică specifică.' },
        { intrebare: 'Generați conținut cu AI pentru magazinul meu?', raspuns: 'Da. Descrieri de produse (1.000+ produse fără text), articole de blog pe long-tail, meta descrieri SEO, ad copy. AI-ul generează drafturi, un editor uman le rafinează. Volum mare, calitate superioară conținutului brut AI.' },
        { intrebare: 'Google penalizează conținutul generat de AI?', raspuns: 'Penalizează conținutul AI brut, nedateditat, fără valoare. Recompensează conținutul AI editat uman, cu expertiză (E-E-A-T). Noi nu livrăm niciodată 100% AI brute — tot conținutul trece prin editare umană.' },
        { intrebare: 'AI-ul poate prezice ce produse se vor vinde?', raspuns: 'Da, pe baza istoricului de comenzi, sezonalitate și tendințe. Modelul prezice bestseller-uri lună viitoare (decizii de stoc), clienți cu risc de churn (retargeting), recomandări personalizate (cross-sell). Pentru magazine cu 1.000+ clienți: +15–25% revenă.' },
        { intrebare: 'Cum integrați WhatsApp Business?', raspuns: 'Prin WhatsApp Business API oficial (Meta). Clientul îți scrie pe WhatsApp, botul răspunde automat pe baza produselor tale, transferă la om când e cazul. Trimiteți confirmări de comandă, AWB-uri, facturi pe WhatsApp. Conversații în loc de email-uri.' },
        { intrebare: 'Ce se întâmplă dacă AI-ul pică?', raspuns: 'Toate automatizările au fallback uman. Dacă OpenAI e jos, botul răspunde „momentan technical difficulties, vă contactează un coleg”. Fluxurile cu AI au queue persistent — nimic nu se pierde. Monitoring 24/7, alerte pe eroare.' },
        { intrebare: 'Datele clienților mei sunt în siguranță?', raspuns: 'Da. Pentru RAG/chatbot, folosim modele enterprise cu zero data retention (OpenAI API, Anthropic). Nu trimitem date sensibile (CNP, carduri) către AI. Pentru GDPR, logurile sunt pseudonimizate, stocate în UE.' },
        { intrebare: 'Cât durează implementarea?', raspuns: 'Chatbot simplu: 1–2 săptămâni. Automatizări multi-flux (3–5 servicii): 2–4 săptămâni. Soluție enterprise cu AI custom, RAG, predicții: 4–8 săptămâni. Implementăm în faze, vezi rezultate de la prima săptămână.' },
      ],
    },
  })

  console.log('✅ Serviciu creat:', doc.id, '—', doc.titlu, '| slug:', doc.slug)
  process.exit(0)
}

main().catch((e) => { console.error('❌ Eroare:', e); process.exit(1) })
