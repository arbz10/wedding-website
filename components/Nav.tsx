"use client";

import { useEffect, useState } from "react";
import { wedding } from "@/lib/wedding";

const left = [
  ["#home", "Home"],
  ["#couple", "Couple"],
  ["#story", "Our Story"],
] as const;
const right = [
  ["#events", "Events"],
  ["#gallery", "Gallery"],
  ["#rsvp", "RSVP"],
] as const;

// Five-petal blossom drawn as a single line, used between the names in the logo.
function Blossom() {
  return (
    <svg className="logo__mark" viewBox="0 0 48 48" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
        {[0, 72, 144, 216, 288].map((r) => (
          <path key={r} d="M24 24 C19 17 20 9 24 6 C28 9 29 17 24 24Z" transform={`rotate(${r} 24 24)`} />
        ))}
        <circle cx="24" cy="24" r="2.2" />
        <path d="M24 30 C24 36 22 41 18 45" />
      </g>
    </svg>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const ids = [...left, ...right].map(([href]) => href);
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      // Highlight the last section whose top has passed the nav.
      let current = "#home";
      for (const id of ids) {
        const el = document.querySelector(id);
        if (el && el.getBoundingClientRect().top < 140) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const link = ([href, label]: readonly [string, string]) => (
    <a key={href} href={href} className={active === href ? "is-active" : ""} onClick={() => setOpen(false)}>
      {label}
    </a>
  );

  return (
    <header className={`nav ${scrolled ? "is-scrolled" : ""} ${open ? "is-open" : ""}`}>
      <nav className="nav__side nav__side--left">{left.map(link)}</nav>

      <a href="#home" className="logo" aria-label={`${wedding.bride.first} and ${wedding.groom.first}`}>
        <span className="logo__name">{wedding.bride.first}</span>
        <Blossom />
        <span className="logo__name">{wedding.groom.first}</span>
      </a>

      <nav className="nav__side nav__side--right">{right.map(link)}</nav>

      <button
        className="nav__toggle"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <span />
        <span />
        <span />
      </button>

      <nav className="nav__mobile" aria-hidden={!open}>
        {[...left, ...right].map(link)}
      </nav>
    </header>
  );
}
