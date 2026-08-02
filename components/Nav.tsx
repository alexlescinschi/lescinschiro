"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { site, nav } from "@/data/content";

const subscribe = () => () => {};

export type NavService = {
  title: string;
  desc: string;
  href: string;
  image: string;
};

export default function Nav({ services }: { services: NavService[] }) {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const navRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);

  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (servicesOpen) setServicesOpen(false);
      else if (open) setOpen(false);
    };
    const onPointerDown = (event: PointerEvent) => {
      if (servicesOpen && !navRef.current?.contains(event.target as Node)) setServicesOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open, servicesOpen]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [open]);

  const showServices = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setServicesOpen(true);
  };
  const hideServicesSoon = () => {
    closeTimer.current = setTimeout(() => setServicesOpen(false), 180);
  };
  const closeMobileMenu = () => {
    setOpen(false);
    setMobileServicesOpen(false);
  };

  const selectedService = services[activeService] || services[0];

  // ponytail: portal la body ca să scape de Lenis wrapper care strică position:fixed.
  // inert (React 19) când e închis → link-urile nu sunt focusabile din greșeală.
  const menuEl = (
    <div
      className={`menu${open ? " open" : ""}${mobileServicesOpen ? " menu--services-open" : ""}`}
      role="dialog"
      aria-modal={open}
      aria-hidden={!open}
      inert={!open ? true : undefined}
      data-lenis-prevent
    >
      <button className="menu__close" aria-label="Închide meniul" onClick={() => setOpen(false)}>×</button>
      <ul className="menu__list">
        {nav.map((n) => n.label === "Servicii" ? (
          <li className="menu__services-item" key={n.href}>
            <button
              className="menu__link menu__services-toggle"
              aria-expanded={mobileServicesOpen}
              aria-controls="mobile-services"
              onClick={() => setMobileServicesOpen((value) => !value)}
            >
              <span>{n.label}</span>
              <span className="menu__services-symbol" aria-hidden>{mobileServicesOpen ? "−" : "+"}</span>
            </button>
            <div className={`menu__services${mobileServicesOpen ? " open" : ""}`} id="mobile-services" inert={!mobileServicesOpen ? true : undefined}>
              <ol>
                {services.map((service, index) => (
                  <li key={service.href}>
                    <Link href={service.href} onClick={closeMobileMenu}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          </li>
        ) : (
          <li key={n.href}>
            <a className="menu__link" href={n.href} onClick={closeMobileMenu}>{n.label}</a>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <>
      <header
        className={`nav${servicesOpen ? " nav--mega-open" : ""}`}
        ref={navRef}
        onMouseEnter={() => {
          if (closeTimer.current) clearTimeout(closeTimer.current);
        }}
        onMouseLeave={hideServicesSoon}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setServicesOpen(false);
        }}
      >
        <Link className="nav__logo" href="/">{site.brand}</Link>
        <div className="nav__right">
          <nav className="nav__pills" aria-label="Principal">
            {nav.map((n) => n.label === "Servicii" ? (
              <button
                key={n.href}
                className="pill nav__services-trigger"
                aria-expanded={servicesOpen}
                aria-controls="services-mega-menu"
                onPointerEnter={showServices}
                onFocus={showServices}
                onClick={showServices}
              >
                {n.label}<span aria-hidden>+</span>
              </button>
            ) : (
              <a key={n.href} className="pill" href={n.href} onMouseEnter={() => setServicesOpen(false)}>{n.label}</a>
            ))}
          </nav>
          <button
            className="menu-btn"
            aria-label="Deschide meniul"
            aria-expanded={open}
            onClick={() => { setServicesOpen(false); setOpen(true); }}
          >
            <span /><span />
          </button>
        </div>

        <div
          className={`mega-menu${servicesOpen ? " open" : ""}`}
          id="services-mega-menu"
          aria-hidden={!servicesOpen}
          inert={!servicesOpen ? true : undefined}
          onMouseEnter={showServices}
        >
          <div className="mega-menu__inner" data-lenis-prevent>
            <div className="mega-menu__intro">
              <span className="mega-menu__eyebrow">Expertiză completă</span>
              <p>Construim ecosisteme digitale care cresc companii, nu doar pagini care arată bine.</p>
            </div>

            <nav className="mega-menu__services" aria-label="Serviciile noastre">
              <ol>
                {services.map((service, index) => (
                  <li key={service.href}>
                    <Link
                      className={index === activeService ? "active" : ""}
                      href={service.href}
                      onMouseEnter={() => setActiveService(index)}
                      onFocus={() => setActiveService(index)}
                      onClick={() => setServicesOpen(false)}
                    >
                      <span className="mega-menu__number">{String(index + 1).padStart(2, "0")}</span>
                      <span>{service.title}</span>
                      <span className="mega-menu__arrow" aria-hidden>↗</span>
                    </Link>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="mega-menu__preview" aria-live="polite">
              <div className="mega-menu__image">
                {selectedService?.image ? (
                  <Image key={selectedService.image} src={selectedService.image} alt="" fill sizes="32vw" />
                ) : (
                  <div className="mega-menu__image-fallback" aria-hidden />
                )}
              </div>
              <div className="mega-menu__caption">
                <span>{String(activeService + 1).padStart(2, "0")}</span>
                <p>{selectedService?.desc}</p>
              </div>
            </div>
          </div>
        </div>
      </header>
      {mounted && createPortal(menuEl, document.body)}
    </>
  );
}
