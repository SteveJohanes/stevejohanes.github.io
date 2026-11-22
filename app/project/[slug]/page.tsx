/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { IconType } from "react-icons";
import * as Si from "react-icons/si";
import { archivo, serif } from "../../parallax-fonts";
import DetailEffects from "../../../src/component/DetailEffects";
import { projectDetails } from "../../../src/component/terminal/content";
import ThemeToggle from "../../../src/component/ThemeToggle";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams() {
  return projectDetails.map((p) => ({ slug: p.name }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = projectDetails.find((x) => x.name === slug);
  if (!p) return {};
  return {
    title: `${p.title ?? slug} – Steve Johanes Lesmana`,
    description: p.summary.en,
  };
}

const SI = Si as unknown as Record<string, IconType | undefined>;

/* Nama teknologi -> kandidat nama ikon. Tambah baris baru di sini kalau ada teknologi lain. */
const ICON_KEYS: Record<string, string[]> = {
  "Express JS": ["SiExpress"],
  PostgreSQL: ["SiPostgresql"],
  Supabase: ["SiSupabase"],
  "Supabase Storage": ["SiSupabase"],
  Vercel: ["SiVercel"],
  "Cloudflare R2": ["SiCloudflare"],
  "React Native": ["SiReact"],
  Expo: ["SiExpo"],
  "Expo Router": ["SiExpo"],
  Redis: ["SiRedis"],
  "Next.js": ["SiNextdotjs"],
  React: ["SiReact"],
  Firebase: ["SiFirebase"],
  Cloudinary: ["SiCloudinary"],
  Flutter: ["SiFlutter"],
  Dart: ["SiDart"],
  "Vue.js": ["SiVuedotjs"],
  "Tailwind CSS": ["SiTailwindcss"],
  TypeScript: ["SiTypescript"],
  JavaScript: ["SiJavascript"],
  "Node.js": ["SiNodedotjs"],
  Laravel: ["SiLaravel"],
  Blade: ["SiLaravel"],
  PHP: ["SiPhp"],
  HTML: ["SiHtml5"],
  CSS: ["SiCss3", "SiCss"],
  NestJS: ["SiNestjs"],
  "Prisma ORM": ["SiPrisma"],
  "Socket.IO": ["SiSocketdotio", "SiSocketio"],
  "OBS WebSocket": ["SiObsstudio"],
  "YouTube Data API": ["SiYoutube"],
  Docker: ["SiDocker"],
  Git: ["SiGit"],
  GitHub: ["SiGithub"],
};

function iconFor(name: string): IconType | undefined {
  for (const key of ICON_KEYS[name] ?? []) {
    const Icon = SI[key];
    if (Icon) return Icon;
  }
  return undefined;
}

function Chip({ name }: { name: string }) {
  const Icon = iconFor(name);
  return (
    <span className="d-chip">
      {Icon && <Icon aria-hidden />}
      {name}
    </span>
  );
}



const themeScript = `try{var t=localStorage.getItem("px-theme");if(t==="dark"||t==="light"){document.querySelector(".px").setAttribute("data-theme",t)}}catch(e){}`;

export default async function ProjectPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const i = projectDetails.findIndex((x) => x.name === slug);
  if (i < 0) notFound();

  const p = projectDetails[i];
  const next = projectDetails[(i + 1) % projectDetails.length];
  const title = p.title ?? p.name;
  const groups =
    p.stackGroups ??
    (p.stack.length
      ? [{ label: { en: "Stack", id: "Stack" }, items: p.stack }]
      : []);
  const tech = groups.flatMap((g) => g.items);

  return (
    <div
      className={`px ${archivo.variable} ${serif.variable}`}
      data-theme="light"
      suppressHydrationWarning
    >
      <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      <DetailEffects />

      <header className="d-bar">
        <Link className="d-back" href="/#projects">
          ← Projects
        </Link>
        <div className="d-r">
          <ThemeToggle className="d-live" />
          {p.link && (
            <a
              className="d-live"
              href={p.link}
              target="_blank"
              rel="noreferrer"
            >
              Visit site ↗
            </a>
          )}
        </div>
      </header>

      <main>
        <div className="wrap">
          <section className="d-hero">
            <h1 className="d-title">
              <span>{title}</span>
            </h1>
            <p className="d-lead">{(p.description ?? p.summary).en}</p>
            <dl className="d-meta">
              <div>
                <dt>Type</dt>
                <dd>{p.tag === "APP" ? "Application" : "Website"}</dd>
              </div>
              {p.status && (
                <div>
                  <dt>Status</dt>
                  <dd>
                    {p.status.en.charAt(0).toUpperCase() + p.status.en.slice(1)}
                  </dd>
                </div>
              )}
              {tech.length > 0 && (
                <div>
                  <dt>Built with</dt>
                  <dd>{tech.slice(0, 3).join(", ")}</dd>
                </div>
              )}
              {p.link && (
                <div>
                  <dt>Link</dt>
                  <dd>
                    <a href={p.link} target="_blank" rel="noreferrer">
                      Open site
                    </a>
                  </dd>
                </div>
              )}
            </dl>
          </section>

          {p.images && p.images.length > 0 && (
            <div className="d-shots">
              {p.images.map((img) => (
                <figure className="d-shot rv" key={img.src}>
                  <img data-d src={img.src} alt={img.alt.en} loading="lazy" />
                </figure>
              ))}
            </div>
          )}

          <div className="d-body">
            {p.goals && p.goals.length > 0 && (
              <section className="d-sec rv">
                <h2>Goals</h2>
                <ul className="d-list lg">
                  {p.goals.map((g) => (
                    <li key={g.en}>{g.en}</li>
                  ))}
                </ul>
              </section>
            )}

            <section className="d-sec rv">
              <h2>Key features</h2>
              <ul className="d-list">
                {p.features.map((f) => (
                  <li key={f.en}>{f.en}</li>
                ))}
              </ul>
            </section>

            {groups.length > 0 && (
              <section className="d-sec rv">
                <h2>Stack</h2>
                <div>
                  <div className="d-stack">
                    {groups.map((g) => (
                      <div key={g.label.en}>
                        <h3>{g.label.en}</h3>
                        <div className="d-chips">
                          {g.items.map((n) => (
                            <Chip key={n} name={n} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  {p.stackNote && <p className="d-note">{p.stackNote.en}</p>}
                </div>
              </section>
            )}
          </div>
        </div>

        <Link className="d-next" href={`/project/${next.name}`}>
          <div className="wrap">
            <small>Next project</small>
            <b>{next.title ?? next.name}</b>
          </div>
        </Link>
      </main>
    </div>
  );
}
