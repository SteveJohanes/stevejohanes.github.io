
'use client';

import Link from 'next/link';
import { KeyboardEvent, ReactNode, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from './Sidebar';
import { contact, help, Lang, projectDetails, skills, text } from './content';
import { useLang } from './useLang';

type Entry = {
  id: number;
  raw: string;
  anchor?: string;
  cwd: string;
};

const INITIAL = ['welcome', 'about', 'projects', 'skills', 'contact'];

const DIRECTORIES = ['about/', 'project/', 'contact/'];

const HOME_HELP = [
  ...help,
  ['ls', 'list available directories'],
  ['cd <directory>', 'enter a directory'],
  ['cd ..', 'return to home directory'],
];

const Prompt = ({ cwd = '~' }: { cwd?: string }) => (
  <span className="text-green-400">portofolio@stevejohaneslesmana:{cwd}$ </span>
);


const NAV_TEXT = {
  en: {
    heading: 'TERMINAL INSTRUCTIONS',
    commands: [
      ['help', 'show this list'],
      ['ls', 'show available directories'],
      ['cd', 'enter a directory (about, project, contact); without an argument, return to Home'],
      ['cd ..', 'return to Home directory'],
      ['about', 'show personal information'],
      ['projects', 'show built projects'],
      ['skills', 'show technical skills'],
      ['contact', 'show contact information'],
      ['lang <en|id>', 'switch language'],
      ['clear', 'clear the terminal screen'],
    ],
    entering: (name: string) => `Entering ~/${name} ...`,
    returned: 'Returned to Home directory.',
    invalid: (name: string) =>
      `cd: ${name}: No such directory. Type \`ls\` to see available directories.`,
    usage: 'Usage: cd <directory>',
    opening: 'Opening Projects...',
    changed: (name: string) => `Changed directory to ~/${name}.`,
  },
  id: {
    heading: 'PETUNJUK TERMINAL',
    commands: [
      ['ls', 'menampilkan direktori yang tersedia'],
      ['cd', 'masuk ke direktori (about, project, contact); tanpa argumen kembali ke Home'],
      ['cd ..', 'kembali ke direktori Home'],
      ['about', 'menampilkan informasi pribadi'],
      ['projects', 'menampilkan proyek yang telah dibuat'],
      ['skills', 'menampilkan keahlian teknis'],
      ['contact', 'menampilkan informasi kontak'],
      ['lang <en|id>', 'mengganti bahasa'],
      ['clear', 'membersihkan layar terminal'],
    ],
    entering: (name: string) => `Memasuki ~/${name} ...`,
    returned: 'Kembali ke direktori Home.',
    invalid: (name: string) =>
      `cd: ${name}: Direktori tidak ditemukan. Ketik \`ls\` untuk melihat direktori yang tersedia.`,
    usage: 'Penggunaan: cd <direktori>',
    opening: 'Membuka halaman Projects...',
    changed: (name: string) => `Berpindah ke direktori ~/${name}.`,
  },
};



function NavigationInstructions({ lang }: { lang: Lang }) {
  const tx = NAV_TEXT[lang];

  return (
    <div className="mb-9 border border-[#1f3a3f] bg-[#111a20] px-5 py-4">
      <div className="mb-3 text-xs tracking-widest text-cyan-400">
        {tx.heading}
      </div>

      <div className="space-y-1">
        {tx.commands.map(([command, description]) => (
          <div
            key={command}
            className="flex flex-col sm:flex-row sm:gap-5"
          >
            <span className="shrink-0 text-amber-400 sm:w-36">
              {command}
            </span>

            <span className="text-slate-400">
              {description}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}


function view(raw: string, lang: Lang): ReactNode {
  const [cmd, ...args] = raw.trim().split(/\s+/);
  const tx = text[lang];
  const nav = NAV_TEXT[lang];

  switch (cmd.toLowerCase()) {
    case 'welcome':
      return (
        <div>
          <h1 className="text-4xl font-extrabold text-slate-100 sm:text-5xl">
            Steve Johanes Lesmana <span className="text-green-400">_</span>
          </h1>

          <p className="text-lg text-cyan-400">
            Full Stack Developer &amp; SEO Analyst
          </p>

          <p className="mt-3 text-slate-400">{tx.welcome}</p>
        </div>
      );

    case 'help':
      return (
        <div>
          {HOME_HELP.map(([c, d]) => (
            <div key={c} className="flex flex-col sm:flex-row sm:gap-4">
              <span className="shrink-0 text-amber-400 sm:w-40">
                {c}
              </span>
              <span className="text-slate-400">{d}</span>
            </div>
          ))}
        </div>
      );

    case 'ls':
      return (
        <div className="flex flex-wrap gap-x-5 text-amber-400">
          {DIRECTORIES.map((directory) => (
            <span key={directory}>{directory}</span>
          ))}
        </div>
      );

    case 'cd': {
      const target = args[0]?.toLowerCase().replace(/\/$/, '');

      if (!target || target === '..' || target === '~' || target === '/') {
        return nav.returned;
      }

      if (target === 'project') {
        return nav.opening;
      }

      if (target === 'about' || target === 'contact') {
        return nav.changed(target);
      }

      return nav.invalid(args[0]);
    }

    case 'about':
      return <p className="max-w-3xl">{tx.about}</p>;

        case 'projects':
      return (
        <div>
          <div className="mt-3 border-t border-[#1f3a3f]">
            {projectDetails.map((p, i) => (
              <div
                key={p.name}
                className="flex flex-col gap-1 border-b border-[#1f3a3f] py-3 sm:flex-row sm:items-baseline sm:gap-4"
              >
                <span className="w-8 shrink-0 text-slate-500">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h2 className="shrink-0 font-semibold text-slate-100 sm:w-48">
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
            total {projectDetails.length} {lang === 'id' ? 'project' : 'projects'}
          </div>
          <p className="mt-4 text-slate-400">
            {lang === 'id' ? 'Lihat detail setiap project: ' : 'See the details of each project: '}
            <Link href="/projects/" className="text-amber-400 hover:underline">
              ~/projects
            </Link>
          </p>
        </div>
      );

    case 'skills':
      return (
        <div className="mt-2 space-y-3">
          {Object.entries(skills).map(([group, items]) => (
            <div
              key={group}
              className="flex flex-wrap items-center gap-2"
            >
              <span className="w-28 text-slate-400">{group}</span>

              {items.map((s) => (
                <span
                  key={s}
                  className="border border-[#1f3a3f] px-2.5 py-0.5"
                >
                  {s}
                </span>
              ))}
            </div>
          ))}
        </div>
      );

    case 'contact':
      return (
        <div>
          <div>
            email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <a
              className="text-amber-400 hover:underline"
              href={`mailto:${contact.email}`}
            >
              {contact.email}
            </a>
          </div>

          <div>
            github&nbsp;&nbsp;&nbsp;
            <a
              className="text-amber-400 hover:underline"
              href={contact.github}
              target="_blank"
              rel="noreferrer"
            >
              {contact.github}
            </a>
          </div>

          <div>
            linkedin&nbsp;
            <a
              className="text-amber-400 hover:underline"
              href={contact.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              {contact.linkedin}
            </a>
          </div>
        </div>
      );

    case 'lang': {
      const l = args[0];
      return l === 'en' || l === 'id'
        ? text[l].langSet
        : tx.langUsage;
    }

    default:
      return tx.notFound(cmd);
  }
}

export default function Terminal() {
  const router = useRouter();
  const [lang, setLang] = useLang();

  const [cwd, setCwd] = useState('~');

  const [entries, setEntries] = useState<Entry[]>(() =>
    INITIAL.map((raw, i) => ({
      id: i + 1,
      raw,
      cwd: '~',
      anchor: raw === 'welcome' ? 'home' : raw,
    }))
  );

  const [input, setInput] = useState('');
  const [past, setPast] = useState<string[]>([]);
  const [idx, setIdx] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(INITIAL.length + 1);

  const submit = () => {
    const raw = input.trim();

    if (!raw) return;

    const [cmd, ...args] = raw.toLowerCase().split(/\s+/);

    const target = args[0]?.replace(/\/$/, '');

    if (cmd === 'clear') {
      setEntries([]);
    } else {
      const id = nextId.current++;

      setEntries((e) => [
        ...e,
        {
          id,
          raw,
          cwd,
        },
      ]);

      if (cmd === 'lang' && (target === 'en' || target === 'id')) {
        setLang(target);
      }

      if (cmd === 'cd') {
        if (!target || target === '..' || target === '~' || target === '/') {
          setCwd('~');

          requestAnimationFrame(() => {
            document.getElementById('home')?.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
          });
        } else if (target === 'project') {
          router.push('/projects/');
        } else if (target === 'about' || target === 'contact') {
          setCwd(`~/${target}`);

          requestAnimationFrame(() => {
            document.getElementById(target)?.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
          });
        }
      }
    }

    setPast((p) => [...p, raw]);
    setIdx(-1);
    setInput('');

    requestAnimationFrame(() =>
      endRef.current?.scrollIntoView({
        block: 'end',
        behavior: 'smooth',
      })
    );
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      submit();
    }

    if (e.key === 'ArrowUp' && past.length) {
      e.preventDefault();

      const n =
        idx === -1 ? past.length - 1 : Math.max(0, idx - 1);

      setIdx(n);
      setInput(past[n]);
    }

    if (e.key === 'ArrowDown' && idx !== -1) {
      e.preventDefault();

      const n = idx + 1;

      if (n >= past.length) {
        setIdx(-1);
        setInput('');
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
        onToggleLang={() => setLang(lang === 'en' ? 'id' : 'en')}
        current="home"
      />

      <main className="p-3 sm:p-8">
        <div
          className="w-full border border-[#1f2f36] bg-[#0f161c]"
          onClick={() =>
            inputRef.current?.focus({ preventScroll: true })
          }
        >
          <div className="flex items-center gap-2 border-b border-[#1f2f36] bg-[#111a20] px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500" />

            <span className="ml-3 text-xs text-slate-400">
              portofolio@SteveJohanesLesmana: {cwd}
            </span>
          </div>

          <div className="min-h-[70vh] p-5 sm:min-h-[calc(100vh-4rem)] sm:p-8">
            {entries.map((e) => (
              <div
                key={e.id}
                id={e.anchor}
                className="mb-9 scroll-mt-6"
              >
                <div>
                  <Prompt cwd={e.cwd} />
                  {e.raw}
                </div>

                <div className="mt-2">
                  {view(e.raw, lang)}
                </div>

                {e.anchor === 'contact' && (
                  <div className="mt-6">
                    <NavigationInstructions lang={lang} />
                  </div>
                )}
              </div>
            ))}

            <div className="flex items-center">
              <Prompt cwd={cwd} />

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
