/* eslint-disable @next/next/no-img-element */
"use client";

import { useRef } from "react";

type Item = { title: string; sub: string; src: string };

/** Galeri sederhana: strip foto yang bisa digeser, dengan tombol Prev dan Next. */
export default function GalleryStrip({ items }: { items: Item[] }) {
  const ref = useRef<HTMLDivElement>(null);

  const go = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".gs-card");
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <div className="gs">
      <div className="gs-track" ref={ref} tabIndex={0} aria-label="Gallery">
        {items.map((g, i) => (
          <figure className="gs-card" key={`${g.src}-${i}`}>
            <img className="gs-img" src={g.src} alt={g.title} loading="lazy" decoding="async" />
            <figcaption>
              <b>{g.title}</b>
              <span>{g.sub}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="gs-ctl">
        <button type="button" onClick={() => go(-1)} aria-label="Previous photo">Prev</button>
        <button type="button" onClick={() => go(1)} aria-label="Next photo">Next</button>
      </div>
    </div>
  );
}