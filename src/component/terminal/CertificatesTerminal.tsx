
'use client';

import { KeyboardEvent, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from './Sidebar';
import { Lang } from './content';
import { useLang } from './useLang';

type Certificate = {
  id: number;
  title: string;
  image: string;
};

const CERTIFICATES: Certificate[] = [
  {
    id: 1,
    title: 'L-KOM',
    image: '/certificates/LKOM.jpg',
  },
  {
    id: 2,
    title: 'Japanese Language N5',
    image: '/certificates/SERTIFIKAT JEPANG.jpg',
  },
  {
    id: 3,
    title: 'I-Tech',
    image: '/certificates/itech.png',
  },
];

const LABEL = {
  en: {
    title: 'CERTIFICATES',
    description: 'A collection of certificates and achievements.',
    empty: 'No certificates available yet.',
    add: 'Add your certificate images to public/certificates and register them in the CERTIFICATES array.',
    preview: 'Click an image to preview',
    commands: 'AVAILABLE COMMANDS',
    help: 'show available commands',
    list: 'display certificate gallery',
    language: 'switch language',
    back: 'return to the home page',
    clear: 'clear the terminal screen',
    notFound: (cmd: string) => `command not found: ${cmd}`,
    langUsage: 'Usage: lang <en|id>',
    going: 'Returning to home page...',
  },
  id: {
    title: 'SERTIFIKAT',
    description: 'Kumpulan sertifikat dan pencapaian.',
    empty: 'Belum ada sertifikat yang ditambahkan.',
    add: 'Tambahkan foto sertifikat ke public/certificates lalu daftarkan pada array CERTIFICATES.',
    preview: 'Klik gambar untuk melihat preview',
    commands: 'DAFTAR COMMAND',
    help: 'menampilkan daftar command',
    list: 'menampilkan galeri sertifikat',
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
      portofolio@stevejohaneslesmana:~/certificates$ 
    </span>
  );
}

function CertificateGallery({
  lang,
  onPreview,
}: {
  lang: Lang;
  onPreview: (index: number) => void;
}) {
  const tx = LABEL[lang];

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xs tracking-widest text-cyan-400">
          {tx.title}
        </h2>
        <p className="mt-2 text-slate-400">{tx.description}</p>
      </div>

      {CERTIFICATES.length === 0 ? (
        <div className="border border-dashed border-[#1f3a3f] p-6">
          <p className="text-slate-300">{tx.empty}</p>
          <p className="mt-2 text-xs text-slate-500">{tx.add}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {CERTIFICATES.map((certificate, index) => (
            <button
              key={certificate.id}
              type="button"
              onClick={() => onPreview(index)}
              className="group overflow-hidden border border-[#1f3a3f] bg-[#111a20] text-left transition-colors hover:border-cyan-400"
              aria-label={`Preview ${certificate.title}`}
            >
              <div className="aspect-[4/3] overflow-hidden bg-[#0b1116]">
                <img
                  src={certificate.image}
                  alt={certificate.title}
                  className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="border-t border-[#1f3a3f] px-3 py-3">
                <p className="text-sm text-slate-200">
                  {certificate.title}
                </p>
                <p className="mt-1 text-xs text-cyan-400">
                  {tx.preview}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function PreviewModal({
  index,
  onClose,
  onPrevious,
  onNext,
}: {
  index: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}) {
  const certificate = CERTIFICATES[index];

  if (!certificate) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="relative flex max-h-[95vh] w-full max-w-5xl flex-col border border-[#1f3a3f] bg-[#0f161c] p-3 sm:p-5"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={certificate.title}
      >
        <div className="mb-3 flex items-center justify-between gap-4">
          <p className="text-sm text-slate-200">{certificate.title}</p>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 text-slate-300 hover:text-red-400"
            aria-label="Close preview"
          >
            ✕
          </button>
        </div>

        <div className="flex min-h-0 flex-1 items-center justify-center overflow-hidden">
          <img
            src={certificate.image}
            alt={certificate.title}
            className="max-h-[75vh] max-w-full object-contain"
          />
        </div>

        {CERTIFICATES.length > 1 && (
          <div className="mt-4 flex items-center justify-between">
            <button
              type="button"
              onClick={onPrevious}
              className="border border-[#1f3a3f] px-4 py-2 text-xs text-slate-300 hover:border-cyan-400"
            >
              ← Previous
            </button>
            <span className="text-xs text-slate-500">
              {index + 1} / {CERTIFICATES.length}
            </span>
            <button
              type="button"
              onClick={onNext}
              className="border border-[#1f3a3f] px-4 py-2 text-xs text-slate-300 hover:border-cyan-400"
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Instructions({ lang }: { lang: Lang }) {
  const tx = LABEL[lang];

  const commands = [
    ['certificates', tx.list],
    ['ls', tx.list],
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

export default function CertificatesTerminal() {
  const router = useRouter();
  const [lang, setLang] = useLang();
  const [input, setInput] = useState('');
  const [entries, setEntries] = useState([
    { id: 1, raw: 'certificates' },
  ]);
  const [past, setPast] = useState<string[]>([]);
  const [idx, setIdx] = useState(-1);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);

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

    if (cmd === 'certificates' || cmd === 'ls') {
      return (
        <CertificateGallery
          lang={lang}
          onPreview={setPreviewIndex}
        />
      );
    }

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
        current="certificates"
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
              portofolio@stevejohaneslesmana: ~/certificates
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

      {previewIndex !== null && (
        <PreviewModal
          index={previewIndex}
          onClose={() => setPreviewIndex(null)}
          onPrevious={() =>
            setPreviewIndex(
              (previewIndex - 1 + CERTIFICATES.length) %
                CERTIFICATES.length,
            )
          }
          onNext={() =>
            setPreviewIndex((previewIndex + 1) % CERTIFICATES.length)
          }
        />
      )}
    </div>
  );
}
