/* eslint-disable @next/next/no-img-element */
import "./parallax.css";
import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { archivo, serif } from "./parallax-fonts";
import ParallaxEffects, { Photo } from "../src/component/ParallaxEffects";
import { projectDetails } from "@/src/component/terminal/content";
import Link from "next/link";
import ThemeToggle from "../src/component/ThemeToggle";
import GalleryStrip from "../src/component/GalleryStrip";

export const metadata: Metadata = {
  title: "Steve Johanes Lesmana – Front-end and SEO Analyst",
  description:
    "Portfolio of Steve Johanes Lesmana, Front-end developer and SEO analyst from Bandung.",
};

const nav = [
  ["home", "Home"],
  ["about", "About"],
  ["skills", "Skills"],
  ["projects", "Projects"],
  ["gallery", "Gallery"],
  ["experience", "Experience"],
];

/* PERHATIAN: angka "level" di bawah hanya contoh. Ganti dengan penilaianmu sendiri. */
const skillGroups = [
  {
    title: "Programming Languages",
    items: ["HTML", "CSS", "JavaScript", "PHP", "Dart"],
  },
  {
    title: "Frameworks & Tools",
    items: ["Laravel", "Flutter", "React", "Next.js"],
  },
  {
    title: "Design Tools",
    items: [
      "Canva",
      "Adobe Photoshop",
      "CorelDRAW",
      "Adobe Illustrator",
      "Adobe Animate",
    ],
  },
  {
    title: "Video Editing",
    items: ["Adobe Premiere Pro", "Alight Motion", "CapCut"],
  },
  {
    title: "Productivity Tools",
    items: ["Microsoft Word", "Excel", "PowerPoint", "Visio", "Project"],
  },
  {
    title: "Languages",
    items: ["Indonesian", "English", "Japanese (JLPT N5)"],
  },
];
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

/* Kartu proyek dan galeri diambil dari projectDetails (data yang sama dengan situs lama). */
const projects = projectDetails.map((p) => {
  const stack = p.stack.length
    ? p.stack
    : (p.stackGroups?.flatMap((g) => g.items) ?? []);
  return {
    slug: p.name,
    title: p.title ?? cap(p.name.replace(/-/g, " ")),
    tags: [cap(p.tag), ...stack.slice(0, 2)],
    image: p.images?.[0]?.src,
    href: `/project/${p.name}`,
  };
});

const gallery = [
  {
    title: "Pocari Sweat",
    sub: "Poster Iklan Product Pocari Sweat",
    src: "/assets/pocari.png",
  },
  {
    title: "Tomoro Coffee",
    sub: "Poster Iklan Tomoro Coffee",
    src: "/assets/tomoro.png",
  },
  {
    title: "NewJeans",
    sub: "Poster Konser NewJeans",
    src: "/assets/poster konser newjeans.png",
  },
];

const timeline = [
  ["Internship", "Full Stack Developer", "Built web features in Laravel."],
  [
    "Internship",
    "SEO Analyst",
    "Worked on improving the performance of a domain in search.",
  ],
  [
    "2022 to 2026",
    "Informatics, STMIK LIKMI",
    "Major in Software Engineering. Graduated after defending the noise level thesis.",
  ],
];

/** Memecah kalimat jadi kata-kata yang muncul bergantian. */
function Words({ text, start = 0 }: { text: string; start?: number }) {
  return (
    <>
      {text.split(" ").map((w, i) => (
        <span className="w" key={i}>
          <span
            style={{ transitionDelay: `${(start + i * 0.05).toFixed(2)}s` }}
          >
            {w}
          </span>
        </span>
      ))}
    </>
  );
}
const themeScript = `try{var t=localStorage.getItem("px-theme");if(t==="dark"||t==="light"){document.querySelector(".px").setAttribute("data-theme",t)}}catch(e){}`;
export default function Home() {
  return (
    <div
      className={`px ${archivo.variable} ${serif.variable}`}
      data-theme="light"
      suppressHydrationWarning
    >
      <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      <ParallaxEffects />

      <div className="loader" aria-hidden="true">
        <span className="mark">Steve Johanes Lesmana</span>
      </div>
      <canvas className="trail" aria-hidden="true" />

      <header className="bar">
        <nav className="nav" aria-label="Main">
          <i className="ind" aria-hidden="true" />
          {nav.map(([id, label], i) => (
            <a key={id} href={`#${id}`} className={i === 0 ? "on" : undefined}>
              {label}
            </a>
          ))}
        </nav>
        <div className="bar-r">
          <ThemeToggle className="cta" />
          <a className="cta" href="https://github.com/SteveJohanes">
            GitHub
          </a>
        </div>
      </header>

      <main>
        <div className="stage">
          <div className="pin">
            <div className="pinin">
              <Photo />
            </div>
          </div>

          <section id="home" className="hero">
            <div className="intro">
              <p>
                <Words
                  start={1.2}
                  text="Front-end developer and SEO analyst. I build web and mobile products with Laravel, Next.js and Flutter."
                />
              </p>
              <p>
                <Words
                  start={1.7}
                  text="Based in Bandung. Open to full stack and SEO roles."
                />
              </p>
            </div>
            <div className="side" aria-hidden="true">
              Software Engineering, STMIK LIKMI, 2022–2026
            </div>
            <h1 className="name">
              <span>STEVE JOHANES LESMANA</span>
            </h1>
          </section>

          <section id="about" className="about-sec">
            <div className="wrap about">
              <h2 className="ab-h" data-s=".08">
                I’m Steve, building web and mobile products that are clean,
                solid, &amp; <em>easy to find.</em>
              </h2>
              <div className="ab-body">
                <div className="ab-text">
                  <p>
                    A Front-end developer and SEO analyst from Bandung. I
                    started out wanting to make my own game, and websites,
                    design and editing pulled me toward the web.
                  </p>
                  <p>
                    I graduated in Informatics with a major in Software
                    Engineering from STMIK LIKMI. Right now I’m building
                    Streamdex and a home lab on Ubuntu Server.
                  </p>
                  <div className="ab-btn">
                    <a className="pill solid" href="#projects">
                      View projects →
                    </a>
                    <a className="pill" href="https://github.com/SteveJohanes">
                      GitHub
                    </a>
                  </div>
                </div>
                <dl className="ab-card">
                  <div>
                    <dt>Role</dt>
                    <dd>Front-end Developer and SEO Analyst</dd>
                  </div>
                  <div>
                    <dt>Location</dt>
                    <dd>Bandung, Indonesia</dd>
                  </div>
                  <div>
                    <dt>Status</dt>
                    <dd>Open for roles</dd>
                  </div>
                  <div>
                    <dt>Focus</dt>
                    <dd>Web, mobile and search</dd>
                  </div>
                </dl>
              </div>
            </div>
          </section>
        </div>

        <section id="skills" className="sec">
          <div className="wrap">
            <h2 className="sec-h" data-s=".1">
              Technical <em>Skills</em>
            </h2>
            <p className="sec-sub">
              Languages, frameworks and tools I work with, from code to design.
            </p>
            <div className="sg">
              {skillGroups.map((g, i) => (
                <div
                  key={g.title}
                  className="sg-card rv"
                  style={{ transitionDelay: `${(i % 3) * 0.08}s` }}
                >
                  <h3>{g.title}</h3>
                  <ul>
                    {g.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="sec" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="ph">
              <h2 className="sec-h" data-s=".1">
                My Latest <em>Projects</em>
              </h2>
              <a
                className="btn-dark"
                href="https://github.com/SteveJohanes?tab=repositories"
              >
                View All Projects <i aria-hidden="true">→</i>
              </a>
            </div>
            <div className="pgrid">
              {projects.map((p, i) => {
                const inner = (
                  <>
                    <div className="pimg">
                      <i
                        style={{
                          backgroundImage: p.image
                            ? `url("${p.image}")`
                            : undefined,
                        }}
                      />
                    </div>
                    <div className="tags">
                      {p.tags.map((t) => (
                        <span className="tag" key={t}>
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="pfoot">
                      <h3>{p.title}</h3>
                      <span className="go-btn" aria-hidden="true">
                        ↗
                      </span>
                    </div>
                  </>
                );
                const style = { transitionDelay: `${(i % 2) * 0.1}s` };
                return (
                  <Link
                    key={p.slug}
                    className="pcard rv"
                    href={p.href}
                    style={style}
                  >
                    {inner}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section id="gallery" className="gal">
          <div className="wrap gal-head">
            <h2 className="sec-h" data-s=".1">
              Visual <em>Gallery</em>
            </h2>
            <p className="sec-sub">
              Screens and moments from the things I’ve built.
            </p>
          </div>
          <GalleryStrip items={gallery} />
        </section>

        <section id="experience" className="dark">
          <div className="wrap">
            <h2 className="h2" data-s=".1">
              Where I’ve worked and studied
            </h2>
            <div className="tl">
              {timeline.map(([when, title, text]) => (
                <article key={title}>
                  <div className="when">{when}</div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="foot">
        <div className="wrap">
          <div className="fgrid">
            <p>Open to full stack developer and SEO analyst roles.</p>
            <ul>
              <li>
                <a href="https://github.com/SteveJohanes">
                  github.com/SteveJohanes
                </a>
              </li>
              <li>
                <a href="https://stevejohaneslesmana.my.id">
                  stevejohaneslesmana.my.id
                </a>
              </li>
              <li className="mute" style={{ color: "var(--dkmute)" }}>
                Bandung, Indonesia
              </li>
            </ul>
          </div>
        </div>
        <div className="big" aria-hidden="true">
          STEVE JOHANES
        </div>
      </footer>
    </div>
  );
}
