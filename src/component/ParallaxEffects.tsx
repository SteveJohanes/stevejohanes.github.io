/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Foto hero. Letakkan di public/:
 *  - foto-steve.png        (wajib, PNG background transparan)
 *  - foto-steve-hover.png  (opsional, foto yang sama dengan "efek" yang dibuka kursor)
 */
export function Photo() {
  const [main, setMain] = useState(true);
  const [alt, setAlt] = useState(true);
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const i = ref.current;
    if (i && i.complete && i.naturalWidth === 0) setMain(false);
  }, []);

  return (
    <div className="photo">
      {main ? (
        <img
          ref={ref}
          src="/foto-steve.png"
          alt="Steve Johanes Lesmana"
          onError={() => setMain(false)}
        />
      ) : (
        <svg
          viewBox="0 0 400 520"
          preserveAspectRatio="xMidYMax meet"
          role="img"
          aria-label="Tempat foto"
        >
          <circle cx="200" cy="150" r="88" />
          <path d="M10 520C10 390 100 322 200 322s190 68 190 198z" />
        </svg>
      )}
      {main && alt && (
        <img
          className="alt"
          src="/foto-steve-hover.png"
          alt=""
          aria-hidden="true"
          onError={() => setAlt(false)}
        />
      )}
    </div>
  );
}

/**
 * Semua efek: loader, urutan masuk, scroll (latar gelap + foto), jejak kursor,
 * topeng piksel, indikator menu, kemunculan kartu, dan galeri horizontal.
 * Jika OS memakai "kurangi animasi", efek dekoratif dimatikan. Tes paksa: ?motion=1
 */
export default function ParallaxEffects() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".px");
    const stage = root?.querySelector<HTMLElement>(".stage");
    const cv = root?.querySelector<HTMLCanvasElement>(".trail");
    if (!root || !stage || !cv) return;

    const forced = new URLSearchParams(window.location.search).has("motion");
    const reduce =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches && !forced;
    const html = document.documentElement;
    const prevBehavior = html.style.scrollBehavior;
    const prevRestore = window.history.scrollRestoration;
    if (reduce) root.classList.add("rm");

    /* kembali dari halaman detail: lewati loader dan buka bagian sesuai hash */
    let back = false;
    try {
      back = sessionStorage.getItem("px-back") === "1";
      sessionStorage.removeItem("px-back");
    } catch {
      /* abaikan */
    }

    window.history.scrollRestoration = "manual";
    html.style.scrollBehavior = "auto";
    let goTimer = 0;
    let unlockTimer = 0;

    if (back) {
      root.classList.add("go", "skip");
      let target: HTMLElement | null = null;
      try {
        target = window.location.hash
          ? root.querySelector<HTMLElement>(window.location.hash)
          : null;
      } catch {
        /* abaikan */
      }
      window.scrollTo(
        0,
        target ? target.getBoundingClientRect().top + window.scrollY : 0,
      );
      html.style.scrollBehavior = reduce ? "auto" : "smooth";
    } else {
      /* kunjungan biasa: mulai dari atas dan kunci scroll selama loader */
      if (window.location.hash) {
        window.history.replaceState(
          null,
          "",
          window.location.pathname + window.location.search,
        );
      }
      window.scrollTo(0, 0);
      html.style.overflow = "hidden";
      goTimer = window.setTimeout(
        () => root.classList.add("go"),
        reduce ? 0 : 1800,
      );
      unlockTimer = window.setTimeout(
        () => {
          html.style.overflow = "";
          html.style.scrollBehavior = reduce ? "auto" : "smooth";
        },
        reduce ? 0 : 2900,
      );
    }

    /* ---- menu: indikator meluncur + section aktif berdasarkan posisi ---- */
    const nav = root.querySelector<HTMLElement>(".nav");
    const ind = root.querySelector<HTMLElement>(".ind");
    const links = Array.from(
      root.querySelectorAll<HTMLAnchorElement>(".nav a"),
    );
    const secs = Array.from(
      root.querySelectorAll<HTMLElement>("main section[id]"),
    );
    let activeId = "";
    const place = () => {
      const a = links.find((l) => l.classList.contains("on")) ?? links[0];
      if (!a || !ind || !nav) return;
      ind.style.width = `${a.offsetWidth}px`;
      ind.style.transform = `translateX(${a.offsetLeft}px)`;
    };
    const setActive = () => {
      let cur = secs[0];
      secs.forEach((s) => {
        if (s.getBoundingClientRect().top <= window.innerHeight * 0.4) cur = s;
      });
      if (!cur || cur.id === activeId) return;
      activeId = cur.id;
      links.forEach((a) =>
        a.classList.toggle("on", a.getAttribute("href") === `#${cur.id}`),
      );
      place();
    };
    place();
    document.fonts.ready.then(place);
    window.addEventListener("resize", place);

    /* ---- galeri: progres scroll -> posisi, kedalaman, dan putaran kartu ---- */
    const gal = root.querySelector<HTMLElement>(".gal-pin");
    const cards = Array.from(root.querySelectorAll<HTMLElement>(".gcard"));
    const k = reduce ? 0 : 1;
    const layoutGal = () => {
      if (!gal || !cards.length) return;
      const span = Math.max(1, gal.offsetHeight - window.innerHeight);
      const g = Math.min(
        1,
        Math.max(0, -gal.getBoundingClientRect().top / span),
      );
      const f = g * (cards.length - 1);
      const w = cards[0].offsetWidth;
      cards.forEach((c, i) => {
        const d = i - f;
        const a = Math.abs(d);
        c.style.transform =
          `translate(-50%,-50%) translateX(${(d * w * 1.12).toFixed(1)}px) translateZ(${(a * 90 * k).toFixed(1)}px) ` +
          `rotateY(${(-d * 24 * k).toFixed(2)}deg) rotateZ(${(d * 2.5 * k).toFixed(2)}deg) translateY(${(a * a * 16 * k).toFixed(1)}px)`;
        c.style.opacity = String(Math.max(0, 1 - Math.max(0, a - 2.4) * 1.2));
        c.style.zIndex = String(100 - Math.round(a * 10));
        c.classList.toggle("on", a < 0.5);
      });
    };

    /* ---- scroll: --p, elemen data-s, galeri, menu aktif ---- */
    const layers = Array.from(root.querySelectorAll<HTMLElement>("[data-s]"));
    let busy = false;
    const tick = () => {
      busy = false;
      const p = Math.min(
        1,
        Math.max(0, window.scrollY / (window.innerHeight * 0.9)),
      );
      stage.style.setProperty("--p", p.toFixed(4));
      setActive();
      layoutGal();
      if (reduce) return;
      layers.forEach((el) => {
        const parent = el.parentElement;
        if (!parent) return;
        const r = parent.getBoundingClientRect();
        const shift =
          (r.top + r.height / 2 - window.innerHeight / 2) *
          Number(el.dataset.s);
        el.style.transform = `translateY(${shift.toFixed(1)}px)`;
      });
    };
    const onScroll = () => {
      if (busy) return;
      busy = true;
      requestAnimationFrame(tick);
    };
    const onResize = () => tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    tick();

    /* ---- kartu muncul + cincin skill terisi ---- */
    const rv = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("in");
          rv.unobserve(e.target);
        }),
      { threshold: 0.25 },
    );
    root.querySelectorAll(".rv").forEach((el) => rv.observe(el));

    /* ---- mouse: jejak tinta + topeng piksel pada foto ---- */
    const photo = root.querySelector<HTMLElement>(".photo");
    const ctx = cv.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      cv.width = window.innerWidth * dpr;
      cv.height = window.innerHeight * dpr;
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const pts: { x: number; y: number; t: number }[] = [];
    const LIFE = 650;
    let drawRaf = 0;
    const render = (now: number) => {
      if (!ctx) return;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      while (pts.length && now - pts[0].t > LIFE) pts.shift();
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      for (let i = 1; i < pts.length; i++) {
        const life = 1 - (now - pts[i].t) / LIFE;
        ctx.strokeStyle = `rgba(48,70,255,${(life * life * 0.9).toFixed(3)})`;
        ctx.lineWidth = 1 + life * 7;
        ctx.shadowColor = "rgba(60,90,255,.8)";
        ctx.shadowBlur = 14 * life;
        ctx.beginPath();
        ctx.moveTo(pts[i - 1].x, pts[i - 1].y);
        ctx.lineTo(pts[i].x, pts[i].y);
        ctx.stroke();
      }
      drawRaf = pts.length ? requestAnimationFrame(render) : 0;
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      pts.push({ x: e.clientX, y: e.clientY, t: performance.now() });
      if (pts.length > 90) pts.shift();
      if (!drawRaf) drawRaf = requestAnimationFrame(render);
      if (photo) {
        const r = photo.getBoundingClientRect();
        const inside =
          e.clientX > r.left &&
          e.clientX < r.right &&
          e.clientY > r.top &&
          e.clientY < r.bottom;
        photo.style.setProperty("--cx", `${e.clientX - r.left}px`);
        photo.style.setProperty("--cy", `${e.clientY - r.top}px`);
        photo.classList.toggle("hot", inside);
      }
    };
    if (!reduce)
      window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      clearTimeout(goTimer);
      cancelAnimationFrame(drawRaf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", resize);
      window.removeEventListener("resize", place);
      window.removeEventListener("resize", onResize);
      rv.disconnect();
      html.style.scrollBehavior = prevBehavior;
    };
  }, []);

  return null;
}
