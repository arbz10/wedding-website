"use client";

import { useEffect, useState } from "react";
import { wedding } from "@/lib/wedding";

const links = [
  ["#home", "Home"],
  ["#couple", "Couple"],
  ["#story", "Our Story"],
  ["#events", "Events"],
  ["#gallery", "Gallery"],
] as const;

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`nav ${scrolled ? "is-scrolled" : ""} ${open ? "is-open" : ""}`}>
      <a href="#home" className="nav__brand">
        {wedding.bride.first[0]} <span>&amp;</span> {wedding.groom.first[0]}
      </a>
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
      <nav className="nav__links">
        {links.map(([href, label]) => (
          <a key={href} href={href} onClick={close}>
            {label}
          </a>
        ))}
        <a href="#rsvp" className="nav__cta" onClick={close}>
          RSVP
        </a>
      </nav>
    </header>
  );
}
