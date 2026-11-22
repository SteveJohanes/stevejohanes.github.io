"use client";

import { useEffect, useState } from "react";

/** Tombol ganti tema putih/hitam. Pilihan disimpan di localStorage. */
export default function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem("px-theme");
    } catch {
      /* abaikan */
    }
    const t = saved === "dark" ? "dark" : "light";
    setTheme(t);
    document.querySelector(".px")?.setAttribute("data-theme", t);
  }, []);

  const toggle = () => {
    const t = theme === "light" ? "dark" : "light";
    setTheme(t);
    document.querySelector(".px")?.setAttribute("data-theme", t);
    try {
      localStorage.setItem("px-theme", t);
    } catch {
      /* abaikan */
    }
  };

  return (
    <button
      type="button"
      className={className}
      onClick={toggle}
      aria-label={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
    >
      {theme === "light" ? "Dark" : "Light"}
    </button>
  );
}