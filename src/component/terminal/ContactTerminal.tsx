
'use client';

import { KeyboardEvent, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from './Sidebar';
import { contact, Lang } from './content';
import { useLang } from './useLang';

const PHONE = '+62 85871424750'; 

const LABEL = {
  en: {
    title: 'CONTACT INFORMATION',
    description: 'Feel free to reach out through the contact details below.',
    name: 'Name',
    email: 'Email',
    phone: 'Phone',
    location: 'Location',
    locationValue: 'Bandung, Indonesia',
    phonePlaceholder: 'Add your phone number',
    commands: 'AVAILABLE COMMANDS',
    help: 'show available commands',
    contact: 'display contact information',
    language: 'switch language',
    back: 'return to the home page',
    clear: 'clear the terminal screen',
    notFound: (cmd: string) => `command not found: ${cmd}`,
    langUsage: 'Usage: lang <en|id>',
    going: 'Returning to home page...',
  },
  id: {
    title: 'INFORMASI KONTAK',
    description: 'Silakan hubungi saya melalui informasi kontak berikut.',
    name: 'Nama',
    email: 'Email',
    phone: 'Nomor Telepon',
    location: 'Lokasi',
    locationValue: 'Bandung, Indonesia',
    phonePlaceholder: 'Tambahkan nomor telepon',
    commands: 'DAFTAR COMMAND',
    help: 'menampilkan daftar command',
    contact: 'menampilkan informasi kontak',
    language: 'mengubah bahasa',
    back: 'kembali ke halaman utama',
    clear: 'membersihkan terminal',
    notFound: (cmd: string) => `command tidak ditemukan: ${cmd}`,
    langUsage: 'Penggunaan: lang <en|id>',
    going: 'Kembali ke halaman utama...',
  },
};

function Prompt() {
  return (
    <span className="text-green-400">
      portofolio@stevejohaneslesmana:~/contact$ 
    </span>
  );
}

function ContactContent({ lang }: { lang: Lang }) {
  const tx = LABEL[lang];

  const details = [
    {
      label: tx.name,
      value: 'Steve Johanes Lesmana',
    },
    {
      label: tx.email,
      value: contact.email,
      href: `mailto:${contact.email}`,
    },
    {
      label: tx.phone,
      value: PHONE || tx.phonePlaceholder,
      href: PHONE ? `tel:${PHONE.replace(/\s/g, '')}` : undefined,
    },
    {
      label: tx.location,
      value: tx.locationValue,
    },
  ];

  return (
    <div className="max-w-2xl space-y-5">
      <div>
        <h2 className="text-xs tracking-widest text-cyan-400">
          {tx.title}
        </h2>
        <p className="mt-2 text-slate-400">{tx.description}</p>
      </div>

      <div className="border-y border-[#1f3a3f]">
        {details.map((item) => (
          <div
            key={item.label}
            className="grid grid-cols-1 gap-1 border-b border-[#1f3a3f] py-4 last:border-b-0 sm:grid-cols-[140px_1fr] sm:gap-4"
          >
            <span className="text-slate-500">{item.label}</span>
            {item.href ? (
              <a
                href={item.href}
                className="break-all text-slate-200 transition-colors hover:text-cyan-400"
              >
                {item.value}
              </a>
            ) : (
              <span className="break-words text-slate-200">
                {item.value}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function Instructions({ lang }: { lang: Lang }) {
  const tx = LABEL[lang];

  const commands = [
    ['contact', tx.contact],
    ['help', tx.help],
    ['lang <en|id>', tx.language],
    ['back', tx.back],
    ['clear', tx.clear],
  ];

  return (
    <div className="border border-[#1f3a3f] bg-[#111a20] px-5 py-4">
      <div className="mb-3 text-xs tracking-widest text-cyan-400">
        {tx.commands}
      </div>
      <div className="space-y-1">
        {commands.map(([command, description]) => (
          <div key={command} className="flex flex-col sm:flex-row sm:gap-5">
            <span className="shrink-0 text-amber-400 sm:w-40">
              {command}
            </span>
            <span className="text-slate-400">{description}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ContactTerminal() {
  const router = useRouter();
  const [lang, setLang] = useLang();
  const [input, setInput] = useState('');
  const [entries, setEntries] = useState([
    { id: 1, raw: 'contact' },
  ]);
  const [past, setPast] = useState<string[]>([]);
  const [idx, setIdx] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(2);

  const submit = () => {
    const raw = input.trim();
    if (!raw) return;

    const [cmd, arg] = raw.toLowerCase().split(/\s+/);

    if (cmd === 'clear') {
      setEntries([]);
    } else {
      if (cmd === 'lang' && (arg === 'en' || arg === 'id')) {
        setLang(arg);
      }

      const id = nextId.current++;
      setEntries((current) => [...current, { id, raw }]);

      if (cmd === 'back' || cmd === 'home') {
        setTimeout(() => router.push('/'), 400);
      }
    }

    setPast((current) => [...current, raw]);
    setIdx(-1);
    setInput('');

    requestAnimationFrame(() =>
      endRef.current?.scrollIntoView({ block: 'end' }),
    );
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') submit();

    if (e.key === 'ArrowUp' && past.length > 0) {
      e.preventDefault();
      const next = idx === -1 ? past.length - 1 : Math.max(0, idx - 1);
      setIdx(next);
      setInput(past[next]);
    }

    if (e.key === 'ArrowDown' && idx !== -1) {
      e.preventDefault();
      const next = idx + 1;

      if (next >= past.length) {
        setIdx(-1);
        setInput('');
      } else {
        setIdx(next);
        setInput(past[next]);
      }
    }
  };

  const renderCommand = (raw: string) => {
    const [cmd] = raw.trim().toLowerCase().split(/\s+/);
    const tx = LABEL[lang];

    if (cmd === 'help') return <Instructions lang={lang} />;

    if (cmd === 'contact') return <ContactContent lang={lang} />;

    if (cmd === 'lang') {
      return raw.trim().match(/^lang\s+(en|id)$/i)
        ? null
        : tx.langUsage;
    }

    if (cmd === 'back' || cmd === 'home') return tx.going;

    return tx.notFound(cmd);
  };

  return (
    <div className="font-mono text-sm leading-relaxed text-slate-300 md:grid md:grid-cols-[240px_1fr]">
      <Sidebar
        lang={lang}
        onToggleLang={() => setLang(lang === 'en' ? 'id' : 'en')}
        current="contact"
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
              portofolio@stevejohaneslesmana: ~/contact
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
