'use client';

import { useEffect, useState } from 'react';
import type { Lang } from './content';

export function useLang(): [Lang, (l: Lang) => void] {
  const [lang, setLangState] = useState<Lang>('en');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('lang');
      if (saved === 'en' || saved === 'id') setLangState(saved);
    } catch {
      /* storage tidak tersedia */
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem('lang', l);
    } catch {
      /* abaikan */
    }
  };

  return [lang, setLang];
}