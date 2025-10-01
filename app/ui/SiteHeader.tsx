"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLang } from "./LangContext";

export default function SiteHeader() {
  const [theme, setTheme] = useState("light");
  const { lang, setLang } = useLang();
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored) setTheme(stored);
    const storedLang = localStorage.getItem("lang");
    if (storedLang === "fa" || storedLang === "en") setLang(storedLang);
  }, []);

  function toggleTheme() {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.dataset.theme = next;
  }

  function switchLang() {
    const next = lang === "en" ? "fa" : "en";
    setLang(next);
    localStorage.setItem("lang", next);
  }

  // Simple translation map for header
  const t: Record<
    "en" | "fa",
    {
      title: string;
      stories: string;
      journal: string;
      pen: string;
      about: string;
      newPost: string;
      login: string;
      langSwitch: string;
    }
  > = {
    en: {
      title: "Violet Paper",
      stories: "Stories",
      journal: "Journal",
      pen: "Pen",
      about: "About",
      newPost: "New Post",
      login: "Login",
      langSwitch: "FA",
    },
    fa: {
      title: "ویولت پیپر",
      stories: "داستان‌ها",
      journal: "ژورنال",
      pen: "قلم",
      about: "درباره",
      newPost: "پست جدید",
      login: "ورود",
      langSwitch: "EN",
    },
  };

  return (
    <header className="px-4 sm:px-8 pt-6">
      <div className="max-w-7xl mx-auto glass rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-xl sm:text-2xl font-semibold"
            style={{ color: "var(--foreground)" }}
          >
            {t[lang].title}
          </Link>
          <nav className="hidden sm:flex gap-4 text-base">
            <Link href="/stories" className="hover:underline">
              {t[lang].stories}
            </Link>
            <Link href="/journal" className="hover:underline">
              {t[lang].journal}
            </Link>
            <Link href="/pen" className="hover:underline">
              {t[lang].pen}
            </Link>
            <Link href="/about" className="hover:underline">
              {t[lang].about}
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <button
            aria-label="Switch language"
            onClick={switchLang}
            className="rounded-md px-3 py-2 glassy-btn text-[var(--accent-1)]"
          >
            {t[lang].langSwitch}
          </button>
          <Link
            href="/pen"
            className="px-4 py-2 rounded-lg font-semibold bg-[var(--accent-1)] text-white shadow hover:opacity-90 transition"
          >
            {t[lang].newPost}
          </Link>
          <Link
            href="/login"
            className="px-4 py-2 rounded-lg font-semibold bg-white/70 text-[var(--accent-1)] shadow hover:bg-white/90 transition dark:bg-[#f8f4ff] dark:text-[#7c3aed]"
          >
            {t[lang].login}
          </Link>
          <button
            aria-label="Toggle theme"
            onClick={toggleTheme}
            className="rounded-md px-3 py-2 bg-white/30 text-[var(--accent-1)] hover:bg-white/50 transition"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>
      </div>
    </header>
  );
}
