"use client";

import { KeyboardEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "./Sidebar";
import { Lang } from "./content";
import { useLang } from "./useLang";

type SkillCategory = {
  title: Record<Lang, string>;
  items: string[];
};

const SKILLS: SkillCategory[] = [
  {
    title: {
      en: "Programming Languages",
      id: "Bahasa Pemrograman",
    },
    items: ["HTML", "CSS", "JavaScript", "PHP", "Java", "Dart"],
  },
  {
    title: {
      en: "Frameworks & Tools",
      id: "Framework & Tools",
    },
    items: ["Laravel", "Flutter", "React", "Next.js"],
  },
  {
    title: {
      en: "Design Tools",
      id: "Tools Desain",
    },
    items: [
      "Canva",
      "Adobe Photoshop",
      "CorelDRAW",
      "Adobe Illustrator",
      "Adobe Animate",
    ],
  },
  {
    title: {
      en: "Video Editing",
      id: "Editing Video",
    },
    items: [
      "Adobe After Effects",
      "Adobe Premiere Pro",
      "Alight Motion",
      "CapCut",
    ],
  },
  {
    title: {
      en: "Productivity Tools",
      id: "Tools Produktivitas",
    },
    items: ["Microsoft Word", "Excel", "PowerPoint", "Visio", "Project"],
  },
  {
    title: {
      en: "Languages",
      id: "Bahasa",
    },
    items: ["Indonesian", "English", "Japanese (JLPT N5)"],
  },
];

const LABEL = {
  en: {
    title: "TECHNICAL SKILLS",
    description: "A list of tools and technologies I have learned and used.",
    commands: "AVAILABLE COMMANDS",
    skills: "display technical skills",
    help: "show available commands",
    language: "switch language",
    back: "return to the home page",
    clear: "clear the terminal screen",
    langUsage: "Usage: lang <en|id>",
    notFound: (cmd: string) => `command not found: ${cmd}`,
    going: "Returning to home page...",
  },
  id: {
    title: "KETERAMPILAN TEKNIS",
    description:
      "Daftar teknologi dan tools yang telah saya pelajari dan gunakan.",
    commands: "DAFTAR COMMAND",
    skills: "menampilkan keterampilan teknis",
    help: "menampilkan daftar command",
    language: "mengubah bahasa",
    back: "kembali ke halaman utama",
    clear: "membersihkan terminal",
    langUsage: "Penggunaan: lang <en|id>",
    notFound: (cmd: string) => `command tidak ditemukan: ${cmd}`,
    going: "Kembali ke halaman utama...",
  },
};

function Prompt() {
  return (
    <span className="text-green-400">
      portofolio@stevejohaneslesmana:~/skills${" "}
    </span>
  );
}

function SkillsContent({ lang }: { lang: Lang }) {
  const tx = LABEL[lang];

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h2 className="text-xs tracking-widest text-cyan-400">{tx.title}</h2>
        <p className="mt-2 text-slate-400">{tx.description}</p>
      </div>

      <div className="border-t border-[#1f3a3f]">
        {SKILLS.map((category, index) => (
          <section
            key={category.title.en}
            className="border-b border-[#1f3a3f] py-5"
          >
            <div className="mb-3 flex items-center gap-3">
              <span className="text-xs text-green-400">
                [{String(index + 1).padStart(2, "0")}]
              </span>
              <h3 className="font-semibold text-slate-100">
                {category.title[lang]}
              </h3>
            </div>

            <div className="flex flex-wrap gap-2 pl-8">
              {category.items.map((item) => (
                <span
                  key={item}
                  className="border border-[#1f3a3f] bg-[#111a20] px-3 py-1.5 text-xs text-slate-300 transition-colors hover:border-cyan-400 hover:text-cyan-400"
                >
                  {item}
                </span>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function Instructions({ lang }: { lang: Lang }) {
  const tx = LABEL[lang];

  const commands = [
    ["cat skills.txt", tx.skills],
    ["help", tx.help],
    ["lang <en|id>", tx.language],
    ["back", tx.back],
    ["clear", tx.clear],
  ];

  return (
    <div className="border border-[#1f3a3f] bg-[#111a20] px-5 py-4">
      <div className="mb-3 text-xs tracking-widest text-cyan-400">
        {tx.commands}
      </div>

      <div className="space-y-1">
        {commands.map(([command, description]) => (
          <div key={command} className="flex flex-col sm:flex-row sm:gap-5">
            <span className="shrink-0 text-amber-400 sm:w-40">{command}</span>
            <span className="text-slate-400">{description}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SkillsTerminal() {
  const router = useRouter();
  const [lang, setLang] = useLang();
  const [input, setInput] = useState("");
  const [entries, setEntries] = useState([{ id: 1, raw: "cat skills.txt" }]);
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

      if (cmd === "back" || cmd === "home") {
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
    if (e.key === "Enter") submit();

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

  const renderCommand = (raw: string) => {
    const [cmd, ...args] = raw.trim().toLowerCase().split(/\s+/);
    const tx = LABEL[lang];

    if (cmd === "cat") {
      const filename = args.join(" ");

      if (filename === "skills.txt" || filename === "./skills.txt") {
        return <SkillsContent lang={lang} />;
      }

      return tx.notFound(raw);
    }

    if (cmd === "skills") return <SkillsContent lang={lang} />;
    if (cmd === "help") return <Instructions lang={lang} />;

    if (cmd === "lang") {
      return raw.trim().match(/^lang\s+(en|id)$/i) ? null : tx.langUsage;
    }

    if (cmd === "back" || cmd === "home") return tx.going;

    return tx.notFound(cmd);
  };

  return (
    <div className="font-mono text-sm leading-relaxed text-slate-300 md:grid md:grid-cols-[240px_1fr]">
      <Sidebar
        lang={lang}
        onToggleLang={() => setLang(lang === "en" ? "id" : "en")}
        current="skills"
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
              visitor@stevejohanes.github.io: ~/skills
            </span>
          </div>

          <div className="min-h-[70vh] p-5 sm:min-h-[calc(100vh-4rem)] sm:p-8">
            {entries.map((entry) => (
              <div key={entry.id} className="mb-9">
                <div>
                  <Prompt />
                  {entry.raw}
                </div>

                <div className="mt-3">{renderCommand(entry.raw)}</div>
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
