import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Politica de confidențialitate",
  description: "Ce date colectăm prin site-ul LESCINSCHI, cum le folosim, cât le păstrăm și ce drepturi ai, conform GDPR.",
  alternates: { canonical: "/privacy" },
};

export default function Page() {
  return (
    <LegalPage
      title="Politica de confidențialitate"
      intro="Această politică explică, pe scurt, ce date personale colectăm prin lescinschi.art, de ce le procesăm și ce drepturi ai, conform Regulamentului (UE) 2016/679 (GDPR)."
      updated="16 august 2026"
      sections={[
        {
          heading: "Cine prelucrează datele",
          paragraphs: [
            "Operatorul datelor este Alex Lescinschi, persoană fizică, care operează sub numele LESCINSCHI. Contact: alex@lescinschi.art, București, România.",
          ],
        },
        {
          heading: "Ce date colectăm și de unde",
          paragraphs: [
            "Colectăm doar datele pe care ni le trimiți voluntar:",
          ],
          items: [
            "Formularul de contact: nume, email, telefon, detalii despre proiect și, opțional, informații despre sistemele pe care vrei să le conectezi.",
            "Comunicări directe pe email, telefon sau WhatsApp.",
            "Datele tehnice minime necesare funcționării site-ului (ex. adresă IP, înregistrări de securitate ale serverului).",
          ],
        },
        {
          heading: "Ce NU colectăm",
          paragraphs: [
            "Nu colectăm date de plată, nu avem conturi publice de utilizator și nu folosim servicii de analiză web sau de publicitate comportamentală pe acest site.",
          ],
        },
        {
          heading: "Scopul și temeiul legal",
          paragraphs: [
            "Folosim datele pentru a-ți răspunde, a pregăti oferte și a încheia și executa contracte (art. 6 alin. (1) lit. b GDPR — măsuri precontractuale la cererea ta), precum și pentru corespondență de afaceri în interes legitim (art. 6 alin. (1) lit. f).",
          ],
        },
        {
          heading: "Cui transmitem datele",
          paragraphs: [
            "Datele pot fi procesate de furnizorii noștri strict necesari: serviciul de email prin care primești răspunsurile și serviciul de găzduire al site-ului, ambele găzduite în Uniunea Europeană. Nu vindem datele și nu le transmitem terților în scopuri de marketing.",
          ],
        },
        {
          heading: "Cât păstrăm datele",
          paragraphs: [
            "Păstrăm datele cât este necesar pentru scopul pentru care au fost colectate (ex. derularea unei discuții sau a unui proiect), plus perioadele legale aplicabile documentelor contabile și fiscale.",
          ],
        },
        {
          heading: "Cookie-uri și tehnologii similare",
          paragraphs: [
            "Site-ul nu folosește cookie-uri de marketing sau de analiză. Sunt folosite doar funcționalități tehnice strict necesare pentru livrarea paginilor și securitate. Panoul de administrare al CMS-ului folosește o sesiune tehnică, accesibilă doar echipei.",
          ],
        },
        {
          heading: "Drepturile tale",
          items: [
            "Acces: poți cere o copie a datelor tale.",
            "Rectificare: corectăm datele inexacte.",
            "Ștergere: ceri ștergerea, în limitele obligațiilor legale.",
            "Restricționare și opoziție: poți limita sau contesta prelucrarea.",
            "Portabilitate: primești datele într-un format uzual.",
            "Plângere: te poți adresa Autorității Naționale de Supraveghere a Prelucrării Datelor cu Caracter Personal (www.dataprotection.ro).",
          ],
        },
        {
          heading: "Securitate și modificări",
          paragraphs: [
            "Aplicăm măsuri tehnice rezonabile: conexiuni HTTPS, acces restricționat la date și minimizarea datelor colectate. Putem actualiza această politică; versiunea curentă rămâne mereu pe această pagină. Pentru orice întrebare legată de datele tale: alex@lescinschi.art.",
          ],
        },
      ]}
    />
  );
}
