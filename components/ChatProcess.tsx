"use client";
import { chatProcess } from "@/data/content";

// „Fără formulare. Fără hopuri. Doar atât." — conversație mock WhatsApp-style.
// Mesajul: cu noi lucrezi direct, pe WhatsApp, fără procese greoaie.
export default function ChatProcess() {
  const { steps } = chatProcess;

  return (
    <section className="section container">
      <span className="eyebrow" data-reveal>{chatProcess.eyebrow}</span>
      <h2 className="section-title" data-reveal>{chatProcess.title}</h2>

      <div className="chat" data-reveal>
        <div className="chat__head">
          <div className="chat__avatars" aria-hidden="true">
            <span className="chat__avatar chat__avatar--them">L</span>
            <span className="chat__avatar chat__avatar--you">Tu</span>
          </div>
          <div className="chat__meta">
            <span className="chat__channel">{chatProcess.channel}</span>
            <span className="chat__online">
              <span className="chat__dot" aria-hidden="true" />
              {chatProcess.online}
            </span>
          </div>
        </div>

        <div className="chat__body">
          {steps.map((s) => (
            <div className="chat__group" key={s.n}>
              <div className="chat__step">
                <span className="chat__step-n">{s.n}</span>
                <span className="chat__step-label">{s.label}</span>
              </div>

              {s.you && (
                <div className="chat__row">
                  <span className="chat__who chat__who--you">Tu</span>
                  <div className="chat__bubble chat__bubble--you">{s.you}</div>
                </div>
              )}

              {s.file && (
                <div className="chat__row">
                  <span className="chat__who chat__who--you">Tu</span>
                  <div className="chat__file">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <path d="M14 2v6h6M9 15h6M9 18h4" />
                    </svg>
                    {s.file}
                  </div>
                </div>
              )}

              {s.them && (
                <div className="chat__row">
                  <span className="chat__who chat__who--them">LESCINSCHI</span>
                  <div className="chat__bubble chat__bubble--them">{s.them}</div>
                </div>
              )}

              {s.them2 && (
                <div className="chat__row">
                  <span className="chat__who chat__who--you">Tu</span>
                  <div className="chat__bubble chat__bubble--you">{s.them2}</div>
                </div>
              )}

              {s.them3 && (
                <div className="chat__row">
                  <span className="chat__who chat__who--them">LESCINSCHI</span>
                  <div className="chat__bubble chat__bubble--them chat__bubble--final">{s.them3}</div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="chat__cta">
          <a className="btn btn--solid" href="#contact">{chatProcess.cta}</a>
          <a className="btn" href="https://wa.me/40730304478" target="_blank" rel="noopener noreferrer">Scrie pe WhatsApp</a>
        </div>
      </div>
    </section>
  );
}
