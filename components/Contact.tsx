"use client";
import { useState } from "react";
import { site, services as defaultServices } from "@/data/content";

type ServiceOption = { title: string; slug: string };
type IntegrationOption = { slug: string; name: string };

// ponytail: serviciile vin din CMS (prop); fallback pe lista hardcodată.
export default function Contact({
  services: propServices,
  integration,
  integrationMode = false,
}: {
  services?: ServiceOption[];
  integration?: IntegrationOption | null;
  integrationMode?: boolean;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [whatsappHref, setWhatsappHref] = useState(`https://wa.me/${site.whatsapp}`);
  const [selected, setSelected] = useState<string[]>([]);

  const services: ServiceOption[] =
    propServices && propServices.length
      ? propServices
      : defaultServices.map((s) => ({ title: s.title, slug: s.title }));

  const toggleService = (title: string) => {
    setSelected((prev) => (prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    const g = (k: string) => String(f.get(k) || "");
    const serviciiText = selected.join(", ");
    const integrationName = integration?.name || g("sistemSursa");
    const whatsappMessage = encodeURIComponent(
      `Bună! Sunt ${g("nume")} și vreau să discutăm despre un proiect.${
        serviciiText ? `\n\nServicii dorite: ${serviciiText}` : ""
      }${integrationName ? `\nIntegrare: ${integrationName}` : ""}${
        g("sistemDestinatie") ? `\nDe conectat cu: ${g("sistemDestinatie")}` : ""
      }\n\n${g("detalii")}`
    );
    setWhatsappHref(`https://wa.me/${site.whatsapp}?text=${whatsappMessage}`);
    setStatus("sending");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...Object.fromEntries(f.entries()), servicii: serviciiText }),
      });
      const result = await response.json().catch(() => ({})) as { error?: string };
      if (!response.ok) throw new Error(result.error || "Mesajul nu a putut fi trimis.");
      form.reset();
      setSelected([]);
      setStatus("success");
      setMessage(`${integrationName ? `Cererea pentru ${integrationName}` : "Cererea"} a fost trimisă. Îți răspundem în maximum 24h.`);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Mesajul nu a putut fi trimis.");
    }
  };

  const directWhatsappMessage = integration
    ? `Bună! Vreau să discutăm despre integrarea ${integration.name}.`
    : integrationMode
      ? "Bună! Vreau să discutăm despre o integrare custom."
      : "";
  const directWhatsappHref = directWhatsappMessage
    ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(directWhatsappMessage)}`
    : `https://wa.me/${site.whatsapp}`;

  return (
    <section className="contact-cta section" id="contact">
      <div className="container contact-cta__grid">
        <div className="contact-cta__text">
          <div data-reveal className="eyebrow" style={{ marginBottom: "1.6rem" }}>Suntem mereu deschiși pentru proiecte noi</div>
          <h2 data-reveal className="contact-cta__title">Hai să discutăm.</h2>
          <p data-reveal className="contact-cta__sub">
            {integration
              ? `Spune-ne ce trebuie conectat cu ${integration.name}. Verificăm documentația și îți răspundem cu pașii următori.`
              : integrationMode
                ? "Descrie sistemele și fluxul dorit. Verificăm fezabilitatea înainte de ofertă."
                : "Dacă vrei să începi un proiect, să discuți o idee sau pur și simplu să ne saluți, scrie."}
          </p>
          <div data-reveal className="contact-cta__btns">
            <a className="contact-cta__pill" href={`tel:${site.phone.replace(/\s/g, "")}`}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              Apel
            </a>
            <a className="contact-cta__pill" href={directWhatsappHref} target="_blank" rel="noopener noreferrer">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp
            </a>
          </div>
        </div>

        <form className="contact-cta__form" onSubmit={onSubmit} data-reveal>
          <input type="hidden" name="integrareSlug" value={integration?.slug || ""} />
          <div className="contact-cta__honeypot" aria-hidden="true">
            <label htmlFor="company">Companie</label>
            <input id="company" name="company" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="field">
            <label>Servicii dorite</label>
            <div className="contact-cta__services">
              {services.map((s) => (
                <button
                  type="button"
                  key={s.title}
                  className={`contact-cta__service${selected.includes(s.title) ? " is-selected" : ""}`}
                  aria-pressed={selected.includes(s.title)}
                  onClick={() => toggleService(s.title)}
                >
                  {s.title}
                </button>
              ))}
            </div>
          </div>

          {(integrationMode || integration) && (
            <fieldset className="contact-cta__integration-brief">
              <legend>{integration ? `Brief integrare ${integration.name}` : "Brief integrare custom"}</legend>
              <p>Nu trimite parole, token-uri sau chei API prin formular.</p>
              <div className="field">
                <label htmlFor="sistemSursa">Ce sistem vrei să conectezi?</label>
                <input
                  id="sistemSursa"
                  name="sistemSursa"
                  defaultValue={integration?.name || ""}
                  required
                  maxLength={160}
                  placeholder="Exemplu: ERP, procesator, curier"
                />
              </div>
              <div className="field">
                <label htmlFor="sistemDestinatie">Cu ce trebuie conectat?</label>
                <input id="sistemDestinatie" name="sistemDestinatie" required maxLength={160} placeholder="Exemplu: magazinul online" />
              </div>
              <div className="contact-cta__row">
                <div className="field">
                  <label htmlFor="accesApi">Ai documentație sau acces API?</label>
                  <select id="accesApi" name="accesApi" defaultValue="nu-stiu">
                    <option value="da">Da</option>
                    <option value="nu">Nu</option>
                    <option value="nu-stiu">Nu știu încă</option>
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="volum">Volum aproximativ (opțional)</label>
                  <input id="volum" name="volum" maxLength={120} placeholder="Comenzi, produse sau evenimente / zi" />
                </div>
              </div>
              <div className="field">
                <label htmlFor="termen">Termen dorit (opțional)</label>
                <input id="termen" name="termen" maxLength={120} placeholder="Data sau intervalul estimat" />
              </div>
            </fieldset>
          )}

          <div className="field">
            <label htmlFor="nume">Nume</label>
            <input id="nume" name="nume" required autoComplete="name" placeholder="Numele tău" />
          </div>
          <div className="contact-cta__row">
            <div className="field"><label htmlFor="email">Email</label><input id="email" name="email" type="email" required autoComplete="email" placeholder="email@exemplu.com" /></div>
            <div className="field"><label htmlFor="telefon">Telefon</label><input id="telefon" name="telefon" type="tel" autoComplete="tel" placeholder="+373 67 550 980" /></div>
          </div>
          <div className="field">
            <label htmlFor="detalii">Detalii proiect</label>
            <textarea id="detalii" name="detalii" rows={4} required placeholder="Descrie-ne proiectul tău..." />
          </div>
          <button className="btn btn--solid contact-cta__submit" type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Se trimite…" : "Trimite cererea →"}
          </button>
          <div className={`contact-cta__status contact-cta__status--${status}`} aria-live="polite">
            {message}
            {status === "error" && (
              <span>
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer">Continuă pe WhatsApp</a>
                {" sau "}
                <a href={`mailto:${site.email}`}>trimite un email</a>.
              </span>
            )}
          </div>
        </form>
      </div>
      <p data-reveal className="contact-cta__alt container">Sau direct: <a href={`mailto:${site.email}`}>{site.email}</a></p>
    </section>
  );
}
