"use client";

import { useMemo, useState } from "react";
import { site } from "@/data/content";

type Currency = "EUR" | "RON";

const currencyLabel: Record<Currency, string> = { EUR: "EUR", RON: "RON" };

const presets: Record<Currency, { id: string; label: string; click: number }[]> = {
  EUR: [
    { id: "low", label: "Joasă", click: 0.2 },
    { id: "med", label: "Medie", click: 0.5 },
    { id: "high", label: "Ridicată", click: 1 },
    { id: "veryhigh", label: "Înaltă", click: 2.5 },
  ],
  RON: [
    { id: "low", label: "Joasă", click: 1 },
    { id: "med", label: "Medie", click: 2.5 },
    { id: "high", label: "Ridicată", click: 5 },
    { id: "veryhigh", label: "Înaltă", click: 10 },
  ],
};

const domenii = [
  "Stomatologie",
  "E-commerce",
  "Construcții",
  "Transport & logistică",
  "Imobiliare",
  "Beauty & SPA",
  "Auto & service",
  "HoReCa",
  "Educație",
  "Finanțe & asigurări",
  "Altul",
];

function num(value: string) {
  const parsed = parseFloat(value.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : 0;
}

function fmt(value: number, max = 2, min = 0) {
  return new Intl.NumberFormat("ro-RO", {
    minimumFractionDigits: min,
    maximumFractionDigits: max,
  }).format(value);
}

export default function AdsCalculatorPage() {
  const [currency, setCurrency] = useState<Currency>("EUR");
  const [presetId, setPresetId] = useState("med");
  const [budget, setBudget] = useState("3000");
  const [ownCpc, setOwnCpc] = useState("0.8");
  const [srcheck, setSrcheck] = useState("100");
  const [revenue, setRevenue] = useState("30");
  const [conv, setConv] = useState("2");
  const [investment, setInvestment] = useState("500");
  const [other, setOther] = useState("0");

  const [domeniu, setDomeniu] = useState(domenii[0]);
  const [altDomeniu, setAltDomeniu] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [whatsappHref, setWhatsappHref] = useState(`https://wa.me/${site.whatsapp}`);

  const result = useMemo(() => {
    const click = presetId === "own"
      ? num(ownCpc)
      : (presets[currency].find((p) => p.id === presetId)?.click ?? 0);
    const b = num(budget);
    const order = num(srcheck);
    const margin = num(revenue);
    const rate = num(conv);
    const mgmt = num(investment);
    const extra = num(other);
    const visitors = click ? b / click : 0;
    const sells = (visitors * rate) / 100;
    const income = (visitors * order * rate) / 100;
    const profitPerOrder = (order * margin) / 100;
    const gross = (income * margin) / 100;
    const totalInv = mgmt + extra + b;
    const profit = gross - totalInv;
    const romi = totalInv ? ((income - totalInv) / totalInv) * 100 : 0;
    const roas = b ? income / b : 0;
    return { click, visitors, sells, income, profitPerOrder, gross, profit, romi, roas };
  }, [presetId, ownCpc, currency, budget, srcheck, revenue, conv, investment, other]);

  const unit = currencyLabel[currency];

  const summary = [
    `Domeniu: ${domeniu}${domeniu === "Altul" ? ` (${altDomeniu.trim() || "nespecificat"})` : ""}`,
    `Monedă: ${unit}`,
    `Buget lunar: ${fmt(num(budget))} ${unit} · CPC: ${fmt(result.click)} ${unit}`,
    `Comanda medie: ${fmt(num(srcheck))} ${unit} · Marja: ${fmt(num(revenue))}% · Conversie: ${fmt(num(conv))}%`,
    `Trafic: ${fmt(result.visitors)} vizite · Clienți: ${fmt(result.sells)}`,
    `Venit estimat: ${fmt(result.income)} ${unit} · Profit brut: ${fmt(result.gross)} ${unit}`,
    `Profit net: ${fmt(result.profit)} ${unit} · ROMI: ${result.romi > 0 ? "+" : ""}${fmt(result.romi)}% · ROAS: ${fmt(result.roas, 1)} : 1`,
  ].join("\n");

  const consultWhatsappHref = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
    `Bună! Vreau o consultație Google Ads pentru domeniul ${domeniu === "Altul" ? altDomeniu || "meu" : domeniu}.\n\n${summary}`
  )}`;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    setWhatsappHref(consultWhatsappHref);
    setStatus("sending");
    setMessage("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...Object.fromEntries(f.entries()),
          domeniu: domeniu === "Altul" ? `Altul (${altDomeniu.trim()})` : domeniu,
          calculator: summary,
        }),
      });
      const resultData = await response.json().catch(() => ({})) as { error?: string };
      if (!response.ok) throw new Error(resultData.error || "Mesajul nu a putut fi trimis.");
      form.reset();
      setStatus("success");
      setMessage("Cererea de consultație a fost trimisă. Îți răspundem în maximum 24h.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Mesajul nu a putut fi trimis.");
    }
  }

  return (
    <main className="adcalc">
      <section className="adcalc-hero section">
        <div className="container">
          <span className="eyebrow">Calculator de profit</span>
          <h1 className="adcalc-hero__title">Calculator Reclame Google</h1>
          <p className="adcalc-hero__msg">Află dacă publicitatea ta în Google Ads este profitabilă — și cu cât anume. Completezi bugetul și indicatorii afacerii tale și primești instant traficul, venitul, profitul net, ROMI și ROAS.</p>
          <div className="adcalc-hero__facts">
            <span>Fără date personale</span>
            <span>Rezultat instant</span>
            <span>Fără obligații</span>
          </div>
        </div>
      </section>

      <section className="adcalc-main section" style={{ paddingTop: 0 }}>
        <div className="container adcalc-grid">
          <div className="adcalc-inputs" data-reveal>
            <div className="field">
              <label htmlFor="adcalc-budget">Buget lunar Google Ads</label>
              <input id="adcalc-budget" type="text" inputMode="decimal" value={budget} onChange={(e) => setBudget(e.target.value)} />
            </div>

            <div className="field">
              <label>Cost per click (CPC)</label>
              <div className="adcalc-presets">
                {presets[currency].map((p) => (
                  <button
                    type="button"
                    key={p.id}
                    className={`adcalc-preset${presetId === p.id ? " is-active" : ""}`}
                    aria-pressed={presetId === p.id}
                    onClick={() => setPresetId(p.id)}
                  >
                    {p.label} · {fmt(p.click)} {unit}
                  </button>
                ))}
                <button
                  type="button"
                  className={`adcalc-preset${presetId === "own" ? " is-active" : ""}`}
                  aria-pressed={presetId === "own"}
                  onClick={() => setPresetId("own")}
                >
                  Costul tău
                </button>
              </div>
              {presetId === "own" && (
                <div className="field" style={{ marginTop: 12 }}>
                  <label htmlFor="adcalc-cpc">CPC-ul tău</label>
                  <input id="adcalc-cpc" type="text" inputMode="decimal" value={ownCpc} onChange={(e) => setOwnCpc(e.target.value)} />
                </div>
              )}
            </div>

            <div className="adcalc-row">
              <div className="field">
                <label htmlFor="adcalc-order">Valoarea medie a comenzii</label>
                <input id="adcalc-order" type="text" inputMode="decimal" value={srcheck} onChange={(e) => setSrcheck(e.target.value)} />
              </div>
              <div className="field">
                <label htmlFor="adcalc-margin">Marja de profit (%)</label>
                <input id="adcalc-margin" type="text" inputMode="decimal" value={revenue} onChange={(e) => setRevenue(e.target.value)} />
              </div>
            </div>

            <div className="field">
              <label htmlFor="adcalc-conv">Rata de conversie a site-ului (%)</label>
              <input id="adcalc-conv" type="text" inputMode="decimal" value={conv} onChange={(e) => setConv(e.target.value)} />
            </div>

            <div className="adcalc-row">
              <div className="field">
                <label htmlFor="adcalc-mgmt">Managementul campaniei (lunar)</label>
                <input id="adcalc-mgmt" type="text" inputMode="decimal" value={investment} onChange={(e) => setInvestment(e.target.value)} />
              </div>
              <div className="field">
                <label htmlFor="adcalc-other">Alte investiții lunare</label>
                <input id="adcalc-other" type="text" inputMode="decimal" value={other} onChange={(e) => setOther(e.target.value)} />
              </div>
            </div>

            <p className="adcalc-note">* Estimare orientativă, bazată pe medii de piață. Rezultatele reale depind de industrie, concurență și calitatea campaniei.</p>
          </div>

          <aside className="adcalc-results" data-reveal aria-live="polite">
            <div className="adcalc-results__head">
              <span>Estimare lunară</span>
              <div className="adcalc-currency" role="group" aria-label="Monedă">
                {(Object.keys(currencyLabel) as Currency[]).map((c) => (
                  <button
                    key={c}
                    type="button"
                    className={currency === c ? "is-active" : ""}
                    aria-pressed={currency === c}
                    onClick={() => setCurrency(c)}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <div className="adcalc-result">
              <span>Trafic (vizite)</span>
              <strong>{fmt(result.visitors)}</strong>
            </div>
            <div className="adcalc-result">
              <span>Venit estimat</span>
              <strong>{fmt(result.income)} {unit}</strong>
            </div>
            <div className="adcalc-result">
              <span>Profit per comandă</span>
              <strong>{fmt(result.profitPerOrder)} {unit}</strong>
            </div>
            <div className="adcalc-result">
              <span>Profit brut</span>
              <strong>{fmt(result.gross, 1)} {unit}</strong>
            </div>
            <div className="adcalc-result">
              <span>Clienți atrași</span>
              <strong>{fmt(result.sells)}</strong>
            </div>
            <div className="adcalc-result adcalc-result--main">
              <span>Profit net</span>
              <strong className={result.profit < 0 ? "is-negative" : ""}>{fmt(result.profit)} {unit}</strong>
            </div>
            <div className="adcalc-result">
              <span>ROMI</span>
              <strong>{result.romi > 0 ? "+" : ""}{fmt(result.romi)}%</strong>
            </div>
            <div className="adcalc-result">
              <span>ROAS</span>
              <strong>{fmt(result.roas, 1)} : 1</strong>
            </div>
            <p className="adcalc-results__foot">Profit net = profit brut − (buget + management + alte investiții).</p>
          </aside>
        </div>
      </section>

      <section className="adcalc-consult section" id="consultatie">
        <div className="container adcalc-consult__grid">
          <div className="adcalc-consult__text" data-reveal>
            <div className="eyebrow">Consultație gratuită</div>
            <h2>Discută cu un specialist pe domeniul tău.</h2>
            <p>Trimite-ne estimarea și domeniul în care activezi. Analizăm cifrele, verificăm competiția și îți răspundem cu un plan concret pentru Google Ads.</p>
            <div className="contact-cta__btns">
              <a className="contact-cta__pill" href={`tel:${site.phone.replace(/\s/g, "")}`}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                {site.phone}
              </a>
              <a className="contact-cta__pill" href={`tel:${site.phoneMD.replace(/\s/g, "")}`}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                {site.phoneMD}
              </a>
              <a className="contact-cta__pill" href={consultWhatsappHref} target="_blank" rel="noopener noreferrer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp
              </a>
            </div>
          </div>

          <form className="adcalc-consult__form" onSubmit={onSubmit} data-reveal>
            <input type="hidden" name="servicii" value="Reclame Google Ads" />
            <div className="contact-cta__honeypot" aria-hidden="true">
              <label htmlFor="adcalc-company">Companie</label>
              <input id="adcalc-company" name="company" tabIndex={-1} autoComplete="off" />
            </div>
            <div className="field">
              <label htmlFor="adcalc-domeniu">Domeniul în care activezi</label>
              <select id="adcalc-domeniu" value={domeniu} onChange={(e) => setDomeniu(e.target.value)}>
                {domenii.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            {domeniu === "Altul" && (
              <div className="field">
                <label htmlFor="adcalc-alt-domeniu">Domeniul tău</label>
                <input id="adcalc-alt-domeniu" maxLength={160} value={altDomeniu} onChange={(e) => setAltDomeniu(e.target.value)} placeholder="Ex. panificație artizanală" />
              </div>
            )}
            <div className="field">
              <label htmlFor="adcalc-nume">Nume</label>
              <input id="adcalc-nume" name="nume" required autoComplete="name" placeholder="Numele tău" />
            </div>
            <div className="contact-cta__row">
              <div className="field"><label htmlFor="adcalc-email">Email</label><input id="adcalc-email" name="email" type="email" required autoComplete="email" placeholder="email@exemplu.com" /></div>
              <div className="field"><label htmlFor="adcalc-telefon">Telefon</label><input id="adcalc-telefon" name="telefon" type="tel" autoComplete="tel" placeholder="+40 7xx xxx xxx" /></div>
            </div>
            <div className="field">
              <label htmlFor="adcalc-detalii">Ce vrei să obținem împreună?</label>
              <textarea id="adcalc-detalii" name="detalii" rows={4} required placeholder="Ex. vreau mai multe comenzi din București, în 2 luni..." />
            </div>
            <button className="btn btn--solid adcalc-consult__submit" type="submit" disabled={status === "sending"}>
              {status === "sending" ? "Se trimite…" : "Cere consultația →"}
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
            <p className="adcalc-consult__note">Estimarea ta se trimite automat împreună cu mesajul.</p>
          </form>
        </div>
      </section>
    </main>
  );
}
