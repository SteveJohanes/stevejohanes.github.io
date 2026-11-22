"use client";

import { useEffect } from "react";

/** Efek halaman detail: kemunculan saat scroll, geser halus pada screenshot, dan tanda "kembali dari detail". */
export default function DetailEffects() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".px");
    if (!root) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) root.classList.add("rm");

    /* supaya saat kembali ke beranda, loader dilewati */
    try {
      sessionStorage.setItem("px-back", "1");
    } catch {
      /* abaikan */
    }

    const rv = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("in");
          rv.unobserve(e.target);
        }),
      { threshold: 0.15 }
    );
    root.querySelectorAll(".rv").forEach((el) => rv.observe(el));

    const layers = Array.from(root.querySelectorAll<HTMLElement>("[data-d]"));
    let busy = false;
    const tick = () => {
      busy = false;
      layers.forEach((el) => {
        const parent = el.parentElement;
        if (!parent) return;
        const r = parent.getBoundingClientRect();
        const c = r.top + r.height / 2 - window.innerHeight / 2;
        el.style.transform = `translateY(${(c * -0.06).toFixed(1)}px) scale(1.08)`;
      });
    };
    const onScroll = () => {
      if (busy) return;
      busy = true;
      requestAnimationFrame(tick);
    };
    if (!reduce) {
      window.addEventListener("scroll", onScroll, { passive: true });
      tick();
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      rv.disconnect();
    };
  }, []);

  return null;
}