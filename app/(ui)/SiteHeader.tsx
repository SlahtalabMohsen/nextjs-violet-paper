"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SiteHeader() {
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored) setTheme(stored);
  }, []);

  function toggleTheme() {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.dataset.theme = next;
  }

  return (
    <header className="px-4 sm:px-8 pt-6">
      <div className="max-w-7xl mx-auto glass rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl sm:text-2xl font-semibold" style={{color:"#2d204d"}}>Violet Paper</Link>
        <div className="flex items-center gap-2 sm:gap-3">
          <Link href="/stories" className="hidden sm:inline text-sm">Stories</Link>
          <Link href="/journal" className="hidden sm:inline text-sm">Your Journal</Link>
          <Link href="/pen" className="hidden sm:inline text-sm">Your Pen</Link>
          <button aria-label="Toggle theme" onClick={toggleTheme} className="rounded-md px-3 py-2 bg-white/70">
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>
      </div>
    </header>
  );
}


