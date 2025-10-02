"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import AuthPanel from "./ui/AuthPanel";
import { useLang } from "./ui/LangContext";

export default function Home() {
  type Post = { id: string; title: string; summary: string };
  const [posts, setPosts] = useState<Post[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const { lang } = useLang();
  useEffect(() => {
    setHydrated(true);
    fetch("/api/posts")
      .then((r) => r.json())
      .then((data) => setPosts(data.posts));
  }, []);

  const t: Record<
    "en" | "fa",
    {
      title: string;
      subtitle: string;
      write: string;
      login: string;
      home: string;
      journal: string;
      stories: string;
      pen: string;
      about: string;
      search: string;
      like: string;
      comment: string;
      noPosts: string;
    }
  > = {
    en: {
      title: "Violet Paper",
      subtitle:
        "A futuristic, transparent microblog for sharing your thoughts, stories, and creativity. Enjoy a beautiful, animated experience and join the community!",
      write: "Write a New Post",
      login: "Join / Login",
      home: "Home",
      journal: "Journal",
      stories: "Story",
      pen: "Pen",
      about: "About",
      search: "Search...",
      like: "Like",
      comment: "Comment",
      noPosts: "No posts yet. Create one from Pen.",
    },
    fa: {
      title: "ویولت پیپر",
      subtitle:
        "یک میکروبلاگ شیشه‌ای و آینده‌نگر برای اشتراک‌گذاری افکار، داستان‌ها و خلاقیت شما. از تجربه‌ای زیبا و متحرک لذت ببرید و به جامعه بپیوندید!",
      write: "نوشتن پست جدید",
      login: "عضویت / ورود",
      home: "خانه",
      journal: "ژورنال",
      stories: "داستان",
      pen: "قلم",
      about: "درباره",
      search: "جستجو...",
      like: "پسندیدن",
      comment: "نظر دادن",
      noPosts: "هنوز پستی وجود ندارد. از بخش قلم یک پست بسازید.",
    },
  };

  if (!hydrated) return null;

  return (
    <div
      className="min-h-screen p-6 sm:p-10"
      dir={lang === "fa" ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="md:col-span-1">
          <div
            className="glass rounded-2xl p-6 flex flex-col gap-6 items-start bg-white/60 dark:bg-[#2a174d]/60 backdrop-blur-xl border border-white/20 dark:border-[#2a174d]/30 shadow-lg"
            style={{
              color: "var(--foreground)",
            }}
          >
            <nav className="flex flex-col gap-5 w-full">
              <Link
                href="/"
                className="flex items-center gap-3 text-lg font-medium hover:underline"
              >
                <span>🏠</span> {t[lang].home}
              </Link>
              <Link
                href="/journal"
                className="flex items-center gap-3 text-lg font-medium hover:underline"
              >
                <span>🗂️</span> {t[lang].journal}
              </Link>
              <Link
                href="/stories"
                className="flex items-center gap-3 text-lg font-medium hover:underline"
              >
                <span>📖</span> {t[lang].stories}
              </Link>
              <Link
                href="/pen"
                className="flex items-center gap-3 text-lg font-medium hover:underline"
              >
                <span>✏️</span> {t[lang].pen}
              </Link>
              <Link
                href="/about"
                className="flex items-center gap-3 text-lg font-medium hover:underline"
              >
                <span>🌱</span> {t[lang].about}
              </Link>
            </nav>
          </div>
        </aside>
        {/* Main Content */}
        <main className="md:col-span-3">
          {/* Search Bar at the top */}
          <div className="w-full flex justify-center mb-6">
            <input
              type="text"
              placeholder={t[lang].search}
              className="w-full max-w-xl px-5 py-3 rounded-xl text-base font-medium bg-white/40 dark:bg-[#2a174d]/40 backdrop-blur-xl border border-white/20 dark:border-[#2a174d]/30 shadow focus:outline-none focus:ring-2 focus:ring-[var(--accent-1)] transition"
              style={{ color: "var(--foreground)" }}
            />
          </div>
          {/* ...header section removed as requested... */}

          {/* Posts or No Posts section with margin */}
          {posts.length === 0 ? (
            <div className="glass rounded-2xl p-6 text-center opacity-70 mt-8 mb-8">
              {t[lang].noPosts}
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/post/${post.id}`}
                  className="glass rounded-2xl p-6 flex flex-col gap-2 hover:shadow-lg transition"
                >
                  <h2 className="text-xl font-semibold mb-1">{post.title}</h2>
                  <p className="opacity-80 text-sm mb-2">{post.summary}</p>
                  <div className="flex gap-3 mt-auto">
                    <span className="px-3 py-1 rounded-lg glassy-btn text-sm font-semibold">
                      {t[lang].like}
                    </span>
                    <span className="px-3 py-1 rounded-lg glassy-btn text-sm font-semibold">
                      {t[lang].comment}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
          <AuthPanel />
        </main>
      </div>
    </div>
  );
}
