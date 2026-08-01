"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { site, nav } from "@/data/content";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // ponytail: portal la body ca să scape de Lenis wrapper care strică position:fixed.
  // inert (React 19) când e închis → link-urile nu sunt focusabile din greșeală.
  const menuEl = (
    <div
      className={`menu${open ? " open" : ""}`}
      role="dialog"
      aria-modal={open}
      aria-hidden={!open}
      inert={!open ? true : undefined}
    >
      <button className="menu__close" aria-label="Închide meniul" onClick={() => setOpen(false)}>×</button>
      <ul className="menu__list">
        {nav.map((n) => (
          <li key={n.href}>
            <a className="menu__link" href={n.href} onClick={() => setOpen(false)}>{n.label}</a>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <>
      <header className="nav">
        <a className="nav__logo" href="/">{site.brand}</a>
        <div className="nav__right">
          <nav className="nav__pills" aria-label="Principal">
            {nav.map((n) => (
              <a key={n.href} className="pill" href={n.href}>{n.label}</a>
            ))}
          </nav>
          <button
            className="menu-btn"
            aria-label="Deschide meniul"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <span /><span />
          </button>
        </div>
      </header>
      {mounted && createPortal(menuEl, document.body)}
    </>
  );
}
