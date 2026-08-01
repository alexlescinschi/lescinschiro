"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/data/content";

type Check = {
  id: string;
  label: string;
  status: "pass" | "partial" | "fail";
  detail: string;
  points: number;
};

type Report = {
  company: string;
  website: string;
  service: string;
  location: string;
  score: number;
  level: string;
  checks: Check[];
  recommendations: string[];
  queries: string[];
};

const stages = [
  { label: "Website", detail: "Citim structura și informațiile publice." },
  { label: "Semnale AI", detail: "Evaluăm cât de clar este definită compania." },
  { label: "Prezență locală", detail: "Verificăm serviciul și aria deservită." },
  { label: "Raport", detail: "Prioritizăm acțiunile cu impact." },
];

function stageProgress(progress: number, index: number) {
  const start = index * 25;
  return Math.max(0, Math.min(100, (progress - start) * 4));
}

export default function AIReadinessPage() {
  const [view, setView] = useState<"form" | "progress" | "report">("form");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [report, setReport] = useState<Report | null>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearInterval(timer.current);
  }, []);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setProgress(4);
    setView("progress");
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const startedAt = Date.now();

    timer.current = setInterval(() => {
      setProgress((value) => Math.min(92, value + (value < 50 ? 7 : 3)));
    }, 420);

    try {
      const response = await fetch("/api/ai-readiness", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Analiza nu a putut fi finalizată.");

      const minimumWait = Math.max(0, 4_800 - (Date.now() - startedAt));
      await new Promise((resolve) => setTimeout(resolve, minimumWait));
      if (timer.current) clearInterval(timer.current);
      setProgress(100);
      await new Promise((resolve) => setTimeout(resolve, 500));
      setReport(result);
      setView("report");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (caught) {
      if (timer.current) clearInterval(timer.current);
      setError(caught instanceof Error ? caught.message : "Analiza nu a putut fi finalizată.");
      setView("form");
    }
  }

  function restart() {
    setReport(null);
    setProgress(0);
    setError("");
    setView("form");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const whatsappMessage = report
    ? encodeURIComponent(`Salut! Doresc o consultație gratuită pentru raportul AI al companiei ${report.company} (${report.website}), scor preliminar ${report.score}/100.`)
    : "";

  return (
    <main className="agrader">
      {view === "form" && (
        <>
          <section className="agrader-hero section">
            <div className="container agrader-hero__grid">
              <div>
                <span className="eyebrow">Analiză preliminară gratuită</span>
                <h1 className="agrader-hero__title">Poate AI să-ți înțeleagă afacerea?</h1>
              </div>
              <div className="agrader-hero__aside">
                <p>Verificăm în câteva secunde dacă site-ul oferă semnalele de care motoarele AI au nevoie pentru a identifica și recomanda o companie.</p>
                <div className="agrader-hero__facts">
                  <span>Fără card</span><span>Rezultat imediat</span><span>Verificări reale</span>
                </div>
              </div>
            </div>
          </section>

          <section className="agrader-form-section section">
            <div className="container agrader-form-grid">
              <div>
                <span className="agrader-index">01 / DATELE COMPANIEI</span>
                <h2>Începe verificarea.</h2>
                <p>Nu interogăm încă platformele AI. Analizăm gratuit fundația tehnică și claritatea informațiilor publice.</p>
              </div>
              <form className="agrader-form" onSubmit={onSubmit}>
                <div className="field">
                  <label htmlFor="company">Numele companiei</label>
                  <input id="company" name="company" required maxLength={100} autoComplete="organization" placeholder="Ex. ACME Construct" />
                </div>
                <div className="field">
                  <label htmlFor="website">Website</label>
                  <input id="website" name="website" required maxLength={300} inputMode="url" autoComplete="url" placeholder="exemplu.ro" />
                </div>
                <div className="agrader-form__row">
                  <div className="field">
                    <label htmlFor="service">Serviciul principal</label>
                    <input id="service" name="service" required maxLength={100} placeholder="Ex. construcții case" />
                  </div>
                  <div className="field">
                    <label htmlFor="location">Oraș / zonă</label>
                    <input id="location" name="location" required maxLength={100} autoComplete="address-level2" placeholder="Ex. București" />
                  </div>
                </div>
                {error && <p className="agrader-error" role="alert">{error}</p>}
                <button className="btn btn--solid agrader-form__submit" type="submit">Generează raportul →</button>
                <p className="agrader-form__note">Prin trimitere accepți analiza automată a informațiilor publice de pe website.</p>
              </form>
            </div>
          </section>
        </>
      )}

      {view === "progress" && (
        <section className="agrader-progress section" aria-live="polite">
          <div className="container">
            <span className="eyebrow">Analiză în desfășurare</span>
            <div className="agrader-progress__head">
              <h1>Construim raportul.</h1>
              <strong>{Math.round(progress)}%</strong>
            </div>
            <div className="agrader-progress__line"><span style={{ width: `${progress}%` }} /></div>
            <div className="agrader-progress__stages">
              {stages.map((stage, index) => {
                const value = stageProgress(progress, index);
                return (
                  <div className={`agrader-stage${value === 100 ? " complete" : ""}`} key={stage.label}>
                    <div className="agrader-stage__top"><span>0{index + 1}</span><strong>{Math.round(value)}%</strong></div>
                    <h2>{stage.label}</h2>
                    <p>{stage.detail}</p>
                    <div><span style={{ width: `${value}%` }} /></div>
                  </div>
                );
              })}
            </div>
            <p className="agrader-progress__note">Nu închide pagina. Verificarea durează de obicei sub 15 secunde.</p>
          </div>
        </section>
      )}

      {view === "report" && report && (
        <>
          <section className="agrader-report-hero section">
            <div className="container">
              <div className="agrader-report-hero__meta">
                <span>Raport preliminar</span>
                <button type="button" onClick={restart}>Analizează alt site ↗</button>
              </div>
              <div className="agrader-report-hero__grid">
                <div>
                  <p>{report.location} · {report.service}</p>
                  <h1>{report.company}</h1>
                  <a href={report.website} target="_blank" rel="noopener noreferrer">{report.website.replace(/^https?:\/\//, "")} ↗</a>
                </div>
                <div className="agrader-score">
                  <span>Pregătire pentru AI</span>
                  <strong>{report.score}<small>/100</small></strong>
                  <em>{report.level}</em>
                </div>
              </div>
              <p className="agrader-report-hero__disclaimer">Scorul măsoară fundația tehnică și claritatea informațiilor publice. Nu reprezintă o verificare live în ChatGPT, Gemini sau Perplexity.</p>
            </div>
          </section>

          <section className="agrader-results section">
            <div className="container">
              <span className="agrader-index">02 / CE AM VERIFICAT</span>
              <div className="agrader-checks">
                {report.checks.map((item, index) => (
                  <article className="agrader-check" key={item.id}>
                    <span className={`agrader-check__status ${item.status}`} aria-label={item.status}>{item.status === "pass" ? "OK" : item.status === "partial" ? "PARȚIAL" : "LIPSĂ"}</span>
                    <span className="agrader-check__number">{String(index + 1).padStart(2, "0")}</span>
                    <div><h2>{item.label}</h2><p>{item.detail}</p></div>
                    <strong>+{item.points}</strong>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="agrader-query-section section">
            <div className="container agrader-query-grid">
              <div>
                <span className="agrader-index">03 / CUM AR PUTEA CĂUTA CLIENȚII</span>
                <h2>Întrebările care contează.</h2>
                <p>Acestea sunt exemple pentru auditul complet. În versiunea gratuită nu au fost trimise către platformele AI.</p>
              </div>
              <ol className="agrader-queries">
                {report.queries.map((query, index) => <li key={query}><span>0{index + 1}</span><q>{query}</q></li>)}
              </ol>
            </div>
          </section>

          <section className="agrader-actions section">
            <div className="container agrader-actions__grid">
              <div>
                <span className="agrader-index">04 / PRIORITĂȚI</span>
                <h2>Ce merită reparat prima dată.</h2>
              </div>
              <ol>
                {report.recommendations.map((recommendation, index) => <li key={recommendation}><span>{String(index + 1).padStart(2, "0")}</span><p>{recommendation}</p></li>)}
              </ol>
            </div>
          </section>

          <section className="agrader-consult section">
            <div className="container agrader-consult__inner">
              <span>Audit complet · Consultație gratuită</span>
              <h2>Vrei să aflăm dacă AI chiar te recomandă?</h2>
              <p>Verificăm manual întrebările relevante, competitorii și sursele care influențează răspunsurile.</p>
              <div>
                <a className="btn btn--solid" href={`https://wa.me/${site.whatsapp}?text=${whatsappMessage}`} target="_blank" rel="noopener noreferrer">Comandă consultația →</a>
                <a className="btn" href="/contact">Vezi contactele</a>
              </div>
            </div>
          </section>
        </>
      )}
    </main>
  );
}
