"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import AuthPanel from "./(ui)/AuthPanel";

type Post = { id: string; title: string; summary: string };

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch("/api/posts")
      .then((r) => r.json())
      .then((data) => setPosts(data.posts));
  }, []);

  return (
    <div className="min-h-screen p-6 sm:p-10">
      <div className="max-w-7xl mx-auto">
        <header className="glass rounded-xl px-6 py-4 mb-6 flex items-center justify-between">
          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight" style={{color:"#2d204d"}}>Welcome to violet paper</h1>
          <Link href="/pen" className="rounded-lg px-4 py-2 text-sm font-medium bg-[var(--accent-1)] text-white hover:opacity-90">New Post</Link>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr_1fr] gap-6">
          <aside className="glass rounded-2xl p-5 lg:sticky lg:top-6 h-max">
            <nav className="grid gap-4 text-[18px]">
              <Link href="/" className="flex items-center gap-3 hover:underline"><span>🏠</span> Home</Link>
              <Link href="/journal" className="flex items-center gap-3 hover:underline"><span>🗂️</span> Journal</Link>
              <Link href="/story" className="flex items-center gap-3 hover:underline"><span>📖</span> Story</Link>
              <Link href="/pen" className="flex items-center gap-3 hover:underline"><span>✏️</span> Pen</Link>
              <Link href="/about" className="flex items-center gap-3 hover:underline"><span>🌱</span> About</Link>
            </nav>
          </aside>

          <main className="glass rounded-2xl p-5 col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <span>🔍</span>
              <input className="w-full rounded-lg px-3 py-2 bg-white/70 outline-none ring-accent" placeholder="Search..." />
            </div>
            <ul className="grid gap-4">
              {posts.map((p) => (
                <li key={p.id} className="rounded-xl bg-white/70 px-4 py-3">
                  <Link href={`/post/${p.id}`} className="text-lg font-semibold text-[color:var(--accent-1)] hover:underline">{p.title}</Link>
                  <p className="opacity-80 text-sm mt-1">{p.summary}</p>
                </li>
              ))}
              {posts.length === 0 && (
                <li className="text-sm opacity-70">No posts yet. Create one from Pen.</li>
              )}
            </ul>
          </main>

          <section className="hidden lg:block"><AuthPanel /></section>
        </div>
      </div>
    </div>
  );
}
