"use client";

import { useEffect, useState } from "react";
import { wedding } from "@/lib/wedding";
import { SectionHead } from "./Ornaments";
import Photo from "./Photo";
import Reveal from "./Reveal";

export default function Gallery() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!active) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return (
    <section className="section gallery" id="gallery">
      <div className="container">
        <Reveal>
          <SectionHead eyebrow="Captured moments" title="Our Gallery" />
        </Reveal>
        <div className="gallery__grid">
          {wedding.gallery.map((g, i) => (
            <Reveal key={g.src} className={`gallery__cell gallery__cell--${g.size}`}>
              <button
                type="button"
                className="gallery__item"
                aria-label={`Open photo ${i + 1}`}
                onClick={() => setActive(g.src)}
              >
                <Photo src={g.src} />
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {active && (
        <div className="lightbox" role="dialog" aria-modal="true" onClick={(e) => e.target === e.currentTarget && setActive(null)}>
          <button className="lightbox__close" aria-label="Close" onClick={() => setActive(null)}>
            &times;
          </button>
          <Photo src={active} className="lightbox__img" />
        </div>
      )}
    </section>
  );
}
