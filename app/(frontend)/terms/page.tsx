import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Termeni și condiții",
  description: "Termenii minimali pentru serviciile LESCINSCHI: oferte, plată, termene, proprietatea codului, integrări terțe și răspundere.",
  alternates: { canonical: "/terms" },
};

export default function Page() {
  return (
    <LegalPage
      title="Termeni și condiții"
      intro="Acești termeni reglementează colaborarea cu Alex Lescinschi, persoană fizică, care operează sub numele LESCINSCHI, pentru servicii de creare site-uri, magazine online, integrări, SEO și automatizări."
      updated="16 august 2026"
      sections={[
        {
          heading: "Obiectul serviciilor",
          paragraphs: [
            "Serviciile noastre constau în creare de site-uri, magazine online, landing page-uri, integrări software (plăți, curierat, ERP, CRM, marketplace), SEO și automatizări. Detaliile exacte, livrabilele și termenul se stabilesc prin oferta scrisă, care face parte din contract.",
          ],
        },
        {
          heading: "Oferte și prețuri",
          paragraphs: [
            "Prețurile afișate pe site sunt orientative. Prețul final este cel din oferta scrisă, pe care o primești după un brief. Oferta este fixă pentru lucrările descrise; modificările de scop se evaluează separat și se confirmă în scris înainte de execuție.",
          ],
        },
        {
          heading: "Plată",
          paragraphs: [
            "Dacă oferta nu prevede altfel, plata se face astfel: 30% avans la semnare, 40% la aprobarea machetei și 30% la lansare. Facturăm în EUR sau RON, conform ofertei. Întârzierea plății poate duce la suspendarea lucrărilor până la regularizare.",
          ],
        },
        {
          heading: "Termene și responsabilități",
          paragraphs: [
            "Termenele din ofertă sunt estimative și presupun feedback-ul și materialele tale livrate la timp. Întârzierile cauzate de lipsa materialelor sau a aprobărilor prelungesc termenul corespunzător.",
          ],
        },
        {
          heading: "Proprietatea rezultatelor",
          paragraphs: [
            "La plata integrală, primești codul sursă și dreptul de utilizare a livrabilelor create pentru tine, inclusiv accesul pe GitHub. Materialele tale (logo-uri, texte, imagini) rămân proprietatea ta. Noi putem folosi în continuare componentele, bibliotecile și know-how-ul propriu sau open-source.",
          ],
        },
        {
          heading: "Integrări cu servicii terțe",
          paragraphs: [
            "Integrările depind de furnizorii terți (bănci, curieri, ERP-uri, marketplace-uri) și de contractele tale cu aceștia. Taxele, abonamentele și comisioanele furnizorilor terți se plătesc separat de tine și nu sunt incluse în prețul nostru. Nu garantăm disponibilitatea sau modificarea interfețelor terțe.",
          ],
        },
        {
          heading: "Rezultate așteptate",
          paragraphs: [
            "Livrăm serviciile descrise în ofertă. Nu garantăm rezultate externe precum poziții în motoarele de căutare, trafic, vânzări sau clienți, care depind de factori din afara controlului nostru.",
          ],
        },
        {
          heading: "Răspundere",
          paragraphs: [
            "Răspunderea noastră pentru daune directe este limitată, în măsura permisă de lege, la valoarea serviciilor prestate pentru proiectul respectiv. Nu răspundem pentru daune indirecte sau pierderi de profit.",
          ],
        },
        {
          heading: "Legea aplicabilă și litigii",
          paragraphs: [
            "Acești termeni sunt guvernați de legislația Republicii Moldova. Orice neînțelegere se rezolvă mai întâi pe cale amiabilă; în caz contrar, competența revine instanțelor din Chișinău.",
          ],
        },
        {
          heading: "Date personale",
          paragraphs: [
            "Prelucrarea datelor tale personale este descrisă în Politica de confidențialitate, disponibilă pe această pagină: /privacy.",
          ],
        },
      ]}
    />
  );
}
