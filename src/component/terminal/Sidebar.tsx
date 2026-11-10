
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { contact, Lang } from './content';

const NAV = [
  ['home', '~/home', '/'],
  ['about', '~/about', '/about/'],
  ['projects', '~/projects', '/projects/'],
  ['skills', '~/skills', '/skills/'],
  ['certificates', '~/certificates', '/certificates/'],
  ['contact', '~/contact', '/contact/'],
] as const;

const btn =
  'min-h-[44px] w-full border px-3 text-left font-mono text-sm transition-colors';

export default function Sidebar({
  lang,
  onToggleLang,
  current,
}: {
  lang: Lang;
  onToggleLang: () => void;
  current:
    | 'home'
    | 'about'
    | 'projects'
    | 'skills'
    | 'certificates'
    | 'contact';
}) {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard tidak tersedia */
    }
  };

  return (
    <aside className="border-b border-[#1f2f36] p-6 md:sticky md:top-0 md:h-screen md:border-b-0 md:border-r">
      <div className="text-base font-extrabold text-green-400">
        SteveJohanesLesmana
      </div>

      <div className="mb-6 text-xs text-slate-400">
        Full Stack Developer / SEO Analyst
      </div>

      <nav aria-label="Main" className="flex flex-wrap gap-x-5 md:block">
        {NAV.map(([id, label, href]) => (
          <Link
            key={id}
            href={href}
            className={`block py-1.5 hover:text-cyan-400 ${
              id === current ? 'text-green-400' : 'text-slate-300'
            }`}
          >
            {label}
          </Link>
        ))}
      </nav>

      <div className="mt-6 flex flex-col gap-3">
        <button
          type="button"
          onClick={onToggleLang}
          aria-label="Switch language"
          className={`${btn} border-cyan-400 text-cyan-400 hover:bg-cyan-400/10`}
        >
          lang: {lang} → {lang === 'en' ? 'id' : 'en'}
        </button>

        <button
          type="button"
          onClick={copyEmail}
          className={`${btn} border-[#1f2f36] text-slate-300 hover:border-slate-500`}
        >
          {copied ? 'copied!' : 'copy email'}
        </button>
      </div>
    </aside>
  );
}
