"use client";

import { KeyboardEvent, ReactNode, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "./Sidebar";
import { Lang, ProjectDetail, projectDetails, text } from "./content";
import { useLang } from "./useLang";
import type { IconType } from "react-icons";

import {
  SiCloudflare,
  SiCloudinary,
  SiExpo,
  SiExpress,
  SiFirebase,
  SiNextdotjs,
  SiPostgresql,
  SiReact,
  SiRedis,
  SiSupabase,
  SiVercel,
  SiDart,
  SiFlutter,
  SiJavascript,
  SiNodedotjs,
  SiTailwindcss,
  SiTypescript,
  SiVuedotjs,
} from "react-icons/si";

type Entry = { id: number; raw: string };

const T = {
  en: {
    heading: "Instructions",
    cmds: [
      ["ls", "show all project files"],
      [
        "cat <filename>",
        "display project details (example: cat streamdex.txt)",
      ],
      ["lang <en|id>", "switch language"],
      ["back", "return to the home page"],
      ["clear", "clear the screen"],
      ["help", "show these instructions"],
    ],
    total: (n: number) => `total ${n} projects`,
    usage: "Usage: cat <project-name>.txt (example: cat streamdex.txt)",
    unknown: (q: string) =>
      `file not found: ${q}. Type \`ls\` to see available files.`,
    features: "key features",
    goals: "goals",
    preview: "preview",
    stack: "stack",
    status: "status",
    link: "link",
    back: "Type \`ls\` to see the project files again.",
    going: "",
  },
  id: {
    heading: "Petunjuk",
    cmds: [
      ["ls", "menampilkan semua file project"],
      [
        "cat <nama-file>",
        "menampilkan detail project (contoh: cat streamdex.txt)",
      ],
      ["lang <en|id>", "mengganti bahasa"],
      ["back", "kembali ke halaman utama"],
      ["clear", "membersihkan layar"],
      ["help", "menampilkan petunjuk ini"],
    ],
    total: (n: number) => `total ${n} project`,
    usage: "Penggunaan: cat <nama-project>.txt (contoh: cat streamdex.txt)",
    unknown: (q: string) =>
      `file tidak ditemukan: ${q}. Ketik \`ls\` untuk melihat daftar file.`,
    features: "fitur utama",
    preview: "pratinjau",
    goals: "tujuan",
    stack: "teknologi",
    status: "status",
    link: "tautan",
    back: "Ketik \`ls\` untuk melihat daftar file project lagi.",
    going: "Kembali ke halaman utama...",
  },
};

const Prompt = () => (
  <span className="text-green-400">portofolio@stevejohaneslesmana:~/projects$ </span>
);

function findProject(q: string): ProjectDetail | undefined {
  const s = q
    .trim()
    .toLowerCase()
    .replace(/^\.\/+/, "")
    .replace(/\/$/, "")
    .replace(/\.txt$/, "");

  if (!s) return undefined;

  if (/^\d+$/.test(s)) {
    return projectDetails[Number(s) - 1];
  }

  const exact = projectDetails.find((p) => p.name.toLowerCase() === s);
  if (exact) return exact;

  const starts = projectDetails.filter((p) =>
    p.name.toLowerCase().startsWith(s),
  );

  return starts.length === 1 ? starts[0] : undefined;
}

function Instructions({ lang }: { lang: Lang }) {
  const tx = T[lang];

  return (
    <div className="mb-5 border border-[#1f3a3f] bg-[#111a20] px-5 py-4">
      <div className="mb-2 text-xs tracking-widest text-cyan-400">
        {tx.heading.toUpperCase()}
      </div>

      {tx.cmds.map(([c, d]) => (
        <div key={c} className="flex flex-col sm:flex-row sm:gap-4">
          <span className="shrink-0 text-amber-400 sm:w-48">{c}</span>
          <span className="text-slate-400">{d}</span>
        </div>
      ))}
    </div>
  );
}

function List({ lang }: { lang: Lang }) {
  return (
    <div>
      <div className="border-t border-[#1f3a3f]">
        {projectDetails.map((p, i) => (
          <div
            key={p.name}
            className="flex flex-col gap-1 border-b border-[#1f3a3f] py-3 sm:flex-row sm:items-baseline sm:gap-4"
          >
            <span className="w-8 shrink-0 text-slate-500">
              {String(i + 1).padStart(2, "0")}
            </span>

            <h2 className="shrink-0 font-semibold text-slate-100 sm:w-44">
              {p.name}.txt
            </h2>

            <span className="w-12 shrink-0 text-xs tracking-widest text-cyan-400">
              {p.tag}
            </span>

            <span className="text-slate-400">{p.summary[lang]}</span>
          </div>
        ))}
      </div>

      <div className="mt-2 text-slate-500">
        {T[lang].total(projectDetails.length)}
      </div>
    </div>
  );
}

const TECH: Record<string, { icon: IconType; color: string }> = {
  "Express JS": { icon: SiExpress, color: "#e2e8f0" },
  PostgreSQL: { icon: SiPostgresql, color: "#4169e1" },
  Supabase: { icon: SiSupabase, color: "#3ecf8e" },
  Vercel: { icon: SiVercel, color: "#e2e8f0" },
  "Cloudflare R2": { icon: SiCloudflare, color: "#f38020" },
  "React Native": { icon: SiReact, color: "#61dafb" },
  "Expo Router": { icon: SiExpo, color: "#e2e8f0" },
  Redis: { icon: SiRedis, color: "#ff4438" },
  "Next.js": { icon: SiNextdotjs, color: "#e2e8f0" },
  React: { icon: SiReact, color: "#61dafb" },
  Firebase: { icon: SiFirebase, color: "#ffca28" },
  Cloudinary: { icon: SiCloudinary, color: "#6c85ff" },
  Flutter: { icon: SiFlutter, color: "#42a5f5" },
  Dart: { icon: SiDart, color: "#40c4ff" },
  "Vue.js": { icon: SiVuedotjs, color: "#4fc08d" },
  "Tailwind CSS": { icon: SiTailwindcss, color: "#38bdf8" },
  TypeScript: { icon: SiTypescript, color: "#5aa2ff" },
  JavaScript: { icon: SiJavascript, color: "#f7df1e" },
  "Node.js": { icon: SiNodedotjs, color: "#7cc16a" },
};

function Tech({ name }: { name: string }) {
  const t = TECH[name];
  const Icon = t?.icon;

  return (
    <span className="inline-flex items-center gap-2 border border-[#1f3a3f] bg-[#0f161c] px-2.5 py-1">
      {Icon && (
        <Icon
          aria-hidden
          className="h-4 w-4 shrink-0"
          style={{ color: t.color }}
        />
      )}
      {name}
    </span>
  );
}

function Section({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="mt-5 border-t border-dashed border-[#1f3a3f] pt-4">
      <div className="mb-2 text-xs tracking-widest text-cyan-400">
        {label.toUpperCase()}
      </div>
      {children}
    </div>
  );
}

function Detail({ p, lang }: { p: ProjectDetail; lang: Lang }) {
  const tx = T[lang];

  return (
    <div className="relative border border-[#1f3a3f] bg-[#111a20] px-5 pb-5 pt-7">
      <span className="absolute -top-2.5 left-3.5 bg-[#0f161c] px-2 text-[11px] tracking-widest text-cyan-400">
        {p.tag}
      </span>

      <h2 className="text-lg font-semibold text-slate-100">
        {p.title ?? `${p.name}.txt`}
      </h2>
      {p.title && <div className="text-slate-500">{p.name}.txt</div>}

      <p className="mt-3 max-w-3xl text-slate-300">
        {(p.description ?? p.summary)[lang]}
      </p>

      {p.status && (
        <p className="mt-3">
          <span className="text-slate-400">{tx.status}: </span>
          {p.status[lang]}
        </p>
      )}

            {p.images && p.images.length > 0 && (
        <Section label={tx.preview}>
          <div className="flex flex-wrap gap-4">
            {p.images.map((img) => (
              <a
                key={img.src}
                href={img.src}
                target="_blank"
                rel="noreferrer"
                className="block border border-[#1f3a3f] bg-[#0f161c] p-2 hover:border-cyan-400"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt={img.alt[lang]}
                  loading="lazy"
                  className="h-auto max-h-[26rem] w-auto max-w-full object-contain"
                />
              </a>
            ))}
          </div>
        </Section>
      )}

      {p.goals && p.goals.length > 0 && (
        <Section label={tx.goals}>
          <ol className="space-y-1">
            {p.goals.map((g, i) => (
              <li key={g.en} className="max-w-3xl">
                <span className="text-green-400">
                  {String(i + 1).padStart(2, "0")}{" "}
                </span>
                {g[lang]}
              </li>
            ))}
          </ol>
        </Section>
      )}

      <Section label={tx.features}>
        <ul className="space-y-1">
          {p.features.map((f) => (
            <li key={f.en}>
              <span className="text-green-400">▸ </span>
              {f[lang]}
            </li>
          ))}
        </ul>
      </Section>

      {(p.stackGroups || p.stack.length > 0) && (
        <Section label={tx.stack}>
          {p.stackGroups ? (
            <div className="space-y-3">
              {p.stackGroups.map((g) => (
                <div
                  key={g.label.en}
                  className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4"
                >
                  <span className="shrink-0 text-slate-400 sm:w-28">
                    {g.label[lang]}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {g.items.map((n) => (
                      <Tech key={n} name={n} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {p.stack.map((n) => (
                <Tech key={n} name={n} />
              ))}
            </div>
          )}

          {p.stackNote && (
            <p className="mt-3 max-w-3xl text-slate-500">{p.stackNote[lang]}</p>
          )}
        </Section>
      )}

      {p.link && (
        <p className="mt-5">
          <span className="text-slate-400">{tx.link}: </span>
          <a
            className="text-amber-400 hover:underline"
            href={p.link}
            target="_blank"
            rel="noreferrer"
          >
            {p.link}
          </a>
        </p>
      )}

      <p className="mt-5 text-slate-500">{tx.back}</p>
    </div>
  );
}

function isBack(raw: string): boolean {
  const s = raw.trim().toLowerCase().replace(/\s+/g, " ");
  return ["back", "home", "cd", "cd ..", "cd ../", "cd ~", "cd /"].includes(s);
}

function view(raw: string, lang: Lang): ReactNode {
  const [cmd, ...args] = raw.trim().split(/\s+/);
  const tx = T[lang];

  if (isBack(raw)) return tx.going;

  switch (cmd.toLowerCase()) {
    case "projects":
      return (
        <>
          <Instructions lang={lang} />
          <List lang={lang} />
        </>
      );

    case "help":
      return <Instructions lang={lang} />;

    case "list":
    case "ls":
      return <List lang={lang} />;

    case "cat": {
      const q = args.join(" ");

      if (!q) return tx.usage;

      const p = findProject(q);

      return p ? <Detail p={p} lang={lang} /> : tx.unknown(q);
    }

    case "lang": {
      const l = args[0];

      return l === "en" || l === "id" ? text[l].langSet : text[lang].langUsage;
    }

    case "back":
    case "home":
      return tx.going;

    default:
      return text[lang].notFound(cmd);
  }
}

export default function ProjectsTerminal() {
  const router = useRouter();
  const [lang, setLang] = useLang();

  const [entries, setEntries] = useState<Entry[]>([{ id: 1, raw: "projects" }]);

  const [input, setInput] = useState("");
  const [past, setPast] = useState<string[]>([]);
  const [idx, setIdx] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(2);

    const scrollTarget = useRef<{ id: number; top: boolean } | null>(null);

  useEffect(() => {
    const target = scrollTarget.current;
    if (!target) return;
    scrollTarget.current = null;

    if (target.top) {
      document
        .getElementById(`entry-${target.id}`)
        ?.scrollIntoView({ block: "start" });
    } else {
      endRef.current?.scrollIntoView({ block: "end" });
    }
  }, [entries]);

    const submit = () => {
    const raw = input.trim();

    if (!raw) return;

    const [cmd, arg] = raw.toLowerCase().split(/\s+/);

    if (cmd === "clear") {
      scrollTarget.current = null;
      setEntries([]);
    } else {
      if (cmd === "lang" && (arg === "en" || arg === "id")) {
        setLang(arg);
      }

      const id = nextId.current++;
      scrollTarget.current = { id, top: cmd === "cat" };

      setEntries((e) => [...e, { id, raw }]);

      if (isBack(raw)) {
        setTimeout(() => router.push("/"), 100);
      }
    }

    setPast((p) => [...p, raw]);
    setIdx(-1);
    setInput("");
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      submit();
    }

    if (e.key === "ArrowUp" && past.length) {
      e.preventDefault();

      const n = idx === -1 ? past.length - 1 : Math.max(0, idx - 1);

      setIdx(n);
      setInput(past[n]);
    }

    if (e.key === "ArrowDown" && idx !== -1) {
      e.preventDefault();

      const n = idx + 1;

      if (n >= past.length) {
        setIdx(-1);
        setInput("");
      } else {
        setIdx(n);
        setInput(past[n]);
      }
    }
  };

  return (
    <div className="font-mono text-sm leading-relaxed text-slate-300 md:grid md:grid-cols-[240px_1fr]">
      <Sidebar
        lang={lang}
        onToggleLang={() => setLang(lang === "en" ? "id" : "en")}
        current="projects"
      />

      <main className="p-3 sm:p-8">
        <div
          className="w-full border border-[#1f2f36] bg-[#0f161c]"
          onClick={() => inputRef.current?.focus({ preventScroll: true })}
        >
          <div className="flex items-center gap-2 border-b border-[#1f2f36] bg-[#111a20] px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500" />

            <span className="ml-3 text-xs text-slate-400">
              visitor@stevejohanes.github.io: ~/projects
            </span>
          </div>

          <div className="min-h-[70vh] p-5 sm:min-h-[calc(100vh-4rem)] sm:p-8">
            {entries.map((e) => (
              <div key={e.id} id={`entry-${e.id}`} className="mb-9 scroll-mt-4">
                <div>
                  <Prompt />
                  {e.raw}
                </div>

                <div className="mt-3">{view(e.raw, lang)}</div>
              </div>
            ))}

            <div className="flex items-center">
              <Prompt />

              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                aria-label="Terminal command input"
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                className="ml-1 flex-1 bg-transparent text-slate-100 caret-green-400 outline-none"
              />
            </div>

            <div ref={endRef} />
          </div>
        </div>
      </main>
    </div>
  );
}
