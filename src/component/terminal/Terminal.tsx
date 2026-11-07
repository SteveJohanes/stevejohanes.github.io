'use client';

import { KeyboardEvent, ReactNode, useRef, useState } from 'react';
import { contact, help, Lang, projects, skills, text } from './content';

type Entry = { id: number; cmd: string; out: ReactNode };

const INITIAL = ['welcome', 'about', 'projects', 'skills', 'contact'];

const Prompt = () => (
  <span className="text-green-400">visitor@portfolio:~$ </span>
);

function run(raw: string, lang: Lang, setLang: (l: Lang) => void): ReactNode {
  const [cmd, ...args] = raw.trim().split(/\s+/);
  const tx = text[lang];
  switch (cmd.toLowerCase()) {
    case 'welcome':
      return (
        <div>
          <h1 className="text-4xl font-extrabold text-slate-100 sm:text-5xl">
            Steve Johanes<span className="text-green-400">_</span>
          </h1>
          <p className="text-cyan-400">Full Stack Developer &amp; SEO Analyst</p>
          <p className="mt-2 text-slate-400">{tx.welcome}</p>
          <p className="text-slate-400">{tx.hint}</p>
        </div>
      );
    case 'help':
      return (
        <div>
          {help.map(([c, d]) => (
            <div key={c} className="flex gap-4">
              <span className="w-36 shrink-0 text-amber-400">{c}</span>
              <span className="text-slate-400">{d}</span>
            </div>
          ))}
        </div>
      );
    case 'about':
      return <p className="max-w-2xl">{tx.about}</p>;
    case 'projects':
      return (
        <div className="grid gap-3 sm:grid-cols-2">
          {projects.map((p) => (
            <div key={p.name} className="relative border border-[#1f3a3f] bg-[#111a20] p-4 pt-6">
              <span className="absolute -top-2.5 left-3 bg-[#0f161c] px-2 text-[11px] tracking-widest text-cyan-400">
                {p.tag}
              </span>
              <h2 className="font-semibold text-slate-100">{p.name}/</h2>
              <div className="text-slate-400">{p[lang]}</div>
            </div>
          ))}
        </div>
      );
    case 'skills':
      return (
        <div className="space-y-2">
          {Object.entries(skills).map(([group, items]) => (
            <div key={group} className="flex flex-wrap items-center gap-2">
              <span className="w-24 text-slate-400">{group}</span>
              {items.map((s) => (
                <span key={s} className="border border-[#1f3a3f] px-2">{s}</span>
              ))}
            </div>
          ))}
        </div>
      );
    case 'contact':
      return (
        <div>
          <div>email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a className="text-amber-400 hover:underline" href={`mailto:${contact.email}`}>{contact.email}</a></div>
          <div>github&nbsp;&nbsp;&nbsp;<a className="text-amber-400 hover:underline" href={contact.github} target="_blank" rel="noreferrer">{contact.github}</a></div>
          <div>linkedin&nbsp;<a className="text-amber-400 hover:underline" href={contact.linkedin} target="_blank" rel="noreferrer">{contact.linkedin}</a></div>
        </div>
      );
    case 'lang': {
      const l = args[0];
      if (l === 'en' || l === 'id') {
        setLang(l);
        return text[l].langSet;
      }
      return tx.langUsage;
    }
    case 'clear':
      return 'CLEAR';
    default:
      return tx.notFound(cmd);
  }
}

export default function Terminal() {
  const [lang, setLang] = useState<Lang>('en');
  const [entries, setEntries] = useState<Entry[]>(() =>
    INITIAL.map((cmd, i) => ({ id: i + 1, cmd, out: run(cmd, 'en', () => {}) }))
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
    const out = run(raw, lang, setLang);
    if (out === 'CLEAR') {
      setEntries([]);
    } else {
      const id = nextId.current++;
      setEntries((e) => [...e, { id, cmd: raw, out }]);
    }
    setPast((p) => [...p, raw]);
    setIdx(-1);
    setInput('');
    requestAnimationFrame(() =>
      endRef.current?.scrollIntoView({ block: 'end' })
    );
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') submit();
    if (e.key === 'ArrowUp' && past.length) {
      e.preventDefault();
      const n = idx === -1 ? past.length - 1 : Math.max(0, idx - 1);
      setIdx(n);
      setInput(past[n]);
    }
    if (e.key === 'ArrowDown' && idx !== -1) {
      e.preventDefault();
      const n = idx + 1;
      if (n >= past.length) { setIdx(-1); setInput(''); }
      else { setIdx(n); setInput(past[n]); }
    }
  };

  return (
    <div
      className="mx-auto max-w-4xl border border-[#1f2f36] bg-[#0f161c] font-mono text-sm leading-7 text-slate-300"
      onClick={() => inputRef.current?.focus({ preventScroll: true })}
    >
      <div className="flex items-center gap-2 border-b border-[#1f2f36] bg-[#111a20] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
        <span className="ml-3 text-xs text-slate-400">visitor@stevejohanes.github.io: ~</span>
      </div>

      <div className="min-h-[70vh] p-5 sm:p-8">
        {entries.map((e) => (
          <div key={e.id} className="mb-5">
            <div><Prompt />{e.cmd}</div>
            <div className="mt-1">{e.out}</div>
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
  );
}