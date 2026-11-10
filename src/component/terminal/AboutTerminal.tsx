"use client";

import { KeyboardEvent, ReactNode, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "./Sidebar";
import { Lang } from "./content";
import { AboutSection, aboutSections } from "./aboutContent";
import { useLang } from "./useLang";

const ABOUT_CONTENT: Record<Lang, string> = {
  en: "[Write your personal introduction here. Include your educational background, professional experience, interests, and career goals.]",

  id: "[Tuliskan perkenalan dirimu di sini. Masukkan latar belakang pendidikan, pengalaman profesional, minat, dan tujuan kariermu.]",
};

const LABEL = {
  en: {
    instructions: "AVAILABLE COMMANDS",
    commands: [
      ["cat about.txt", "display about information"],
      ["help", "show available commands"],
      ["lang <en|id>", "switch language"],
      ["back", "return to the home page"],
      ["clear", "clear the terminal screen"],
    ],
    notFound: (cmd: string) => `command not found: ${cmd}`,
    langUsage: "Usage: lang <en|id>",
    going: "",
  },

  id: {
    instructions: "DAFTAR COMMAND",
    commands: [
      ["cat about.txt", "menampilkan informasi tentang saya"],
      ["help", "menampilkan daftar command"],
      ["lang <en|id>", "mengubah bahasa"],
      ["back", "kembali ke halaman utama"],
      ["clear", "membersihkan terminal"],
    ],
    notFound: (cmd: string) => `command tidak ditemukan: ${cmd}`,
    langUsage: "Penggunaan: lang <en|id>",
    going: "Kembali ke halaman utama...",
  },
};

function Prompt() {
  return <span className="text-green-400">visitor@portfolio:~/about$ </span>;
}

function SectionBody({ section, lang }: { section: AboutSection; lang: Lang }) {
  switch (section.kind) {
    case "text":
      return (
        <div className="space-y-3">
          {section.body.map((p, i) => (
            <p key={i} className="max-w-3xl text-slate-300">
              {p[lang]}
            </p>
          ))}
        </div>
      );

    case "list":
      return (
        <ul className="space-y-2">
          {section.items.map((it, i) => (
            <li key={i} className="max-w-3xl text-slate-300">
              <span className="text-green-400">▸ </span>
              {it[lang]}
            </li>
          ))}
        </ul>
      );

    case "education":
      return (
        <div className="space-y-5">
          {section.items.map((e, i) => (
            <div key={i}>
              <div className="font-semibold text-slate-100">{e.school}</div>
              <div className="text-slate-300">{e.degree[lang]}</div>
              <div className="text-slate-500">{e.period}</div>
              {e.note && (
                <p className="mt-1 max-w-3xl text-slate-400">{e.note[lang]}</p>
              )}
            </div>
          ))}
        </div>
      );

    case "experience":
      return (
        <div className="space-y-6">
          {section.items.map((e, i) => (
            <div key={i}>
              <div className="font-semibold text-slate-100">{e.role[lang]}</div>
              <div className="text-slate-300">{e.org}</div>
              <div className="text-slate-500">{e.period}</div>
              <ul className="mt-2 space-y-1">
                {e.points.map((pt, j) => (
                  <li key={j} className="max-w-3xl text-slate-400">
                    <span className="text-green-400">▸ </span>
                    {pt[lang]}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );

    case "timeline":
      return (
        <div className="space-y-3 border-l border-[#1f3a3f] pl-4">
          {section.items.map((t, i) => (
            <div key={i} className="flex flex-col gap-1 sm:flex-row sm:gap-4">
              <span className="shrink-0 text-cyan-400 sm:w-36">{t.period}</span>
              <span className="max-w-3xl text-slate-300">{t.text[lang]}</span>
            </div>
          ))}
        </div>
      );
  }
}

function AboutContent({ lang }: { lang: Lang }) {
  return (
    <div className="border-t border-[#1f3a3f]">
      {aboutSections.map((s) => (
        <section key={s.no} className="border-b border-[#1f3a3f] py-6">
          <h2 className="mb-3 text-xs tracking-widest text-cyan-400">
            {s.no}&nbsp;&nbsp;{s.title[lang].toUpperCase()}
          </h2>
          <SectionBody section={s} lang={lang} />
        </section>
      ))}
    </div>
  );
}

function Instructions({ lang }: { lang: Lang }) {
  const label = LABEL[lang];

  return (
    <div className="border border-[#1f3a3f] bg-[#111a20] px-5 py-4">
      <div className="mb-3 text-xs tracking-widest text-cyan-400">
        {label.instructions}
      </div>

      <div className="space-y-1">
        {label.commands.map(([command, description]) => (
          <div key={command} className="flex flex-col sm:flex-row sm:gap-5">
            <span className="shrink-0 text-amber-400 sm:w-40">{command}</span>

            <span className="text-slate-400">{description}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function isBack(raw: string): boolean {
  const s = raw.trim().toLowerCase().replace(/\s+/g, " ");
  return ["back", "home", "cd", "cd ..", "cd ../", "cd ~", "cd /"].includes(s);
}

function view(raw: string, lang: Lang): ReactNode {
  const [cmd, ...args] = raw.trim().split(/\s+/);
  const label = LABEL[lang];

  if (isBack(raw)) return label.going;

  switch (cmd.toLowerCase()) {
    case "about":
      return <AboutContent lang={lang} />;

    case "cat": {
      const filename = args.join(" ").toLowerCase();

      if (filename === "about.txt" || filename === "./about.txt") {
        return <AboutContent lang={lang} />;
      }

      return label.notFound(raw);
    }

    case "help":
      return <Instructions lang={lang} />;

    case "lang":
      return args[0] === "en" || args[0] === "id" ? null : label.langUsage;

    case "back":
    case "home":
      return label.going;

    default:
      return label.notFound(cmd);
  }
}

export default function AboutTerminal() {
  const router = useRouter();
  const [lang, setLang] = useLang();

  const [entries, setEntries] = useState([{ id: 1, raw: "cat about.txt" }]);

  const [input, setInput] = useState("");
  const [past, setPast] = useState<string[]>([]);
  const [idx, setIdx] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(2);

  const submit = () => {
    const raw = input.trim();

    if (!raw) return;

    const [cmd, arg] = raw.toLowerCase().split(/\s+/);

    if (cmd === "clear") {
      setEntries([]);
    } else {
      if (cmd === "lang" && (arg === "en" || arg === "id")) {
        setLang(arg);
      }

      const id = nextId.current++;

      setEntries((current) => [...current, { id, raw }]);

      if (isBack(raw)) {
        setTimeout(() => router.push("/"), 400);
      }
    }

    setPast((current) => [...current, raw]);
    setIdx(-1);
    setInput("");

    requestAnimationFrame(() =>
      endRef.current?.scrollIntoView({ block: "end" }),
    );
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      submit();
    }

    if (e.key === "ArrowUp" && past.length > 0) {
      e.preventDefault();

      const next = idx === -1 ? past.length - 1 : Math.max(0, idx - 1);

      setIdx(next);
      setInput(past[next]);
    }

    if (e.key === "ArrowDown" && idx !== -1) {
      e.preventDefault();

      const next = idx + 1;

      if (next >= past.length) {
        setIdx(-1);
        setInput("");
      } else {
        setIdx(next);
        setInput(past[next]);
      }
    }
  };

  return (
    <div className="font-mono text-sm leading-relaxed text-slate-300 md:grid md:grid-cols-[240px_1fr]">
      <Sidebar
        lang={lang}
        onToggleLang={() => setLang(lang === "en" ? "id" : "en")}
        current="about"
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
              visitor@stevejohanes.github.io: ~/about
            </span>
          </div>

          <div className="min-h-[70vh] p-5 sm:min-h-[calc(100vh-4rem)] sm:p-8">
            {entries.map((entry) => (
              <div key={entry.id} className="mb-9">
                <div>
                  <Prompt />
                  {entry.raw}
                </div>

                <div className="mt-3">{view(entry.raw, lang)}</div>
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
