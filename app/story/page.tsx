"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

type Post = { id: string; title: string; summary: string; headerImage?: string };

export default function StoryPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => { fetch("/api/posts").then((r) => r.json()).then((d) => setPosts(d.posts || [])); }, []);
  return (
    <div className="min-h-screen p-6 sm:p-10">
      <div className="max-w-5xl mx-auto space-y-4">
        <div className="glass rounded-2xl p-6 text-xl font-semibold">Stories</div>
        <ul className="grid gap-4">
          {posts.map((p) => (
            <li key={p.id} className="glass rounded-xl p-4">
              {p.headerImage && <img src={p.headerImage} alt="Header" className="w-full h-40 object-cover rounded-md mb-2" />}
              <Link href={`/post/${p.id}`} className="text-lg font-semibold text-[color:var(--accent-1)] hover:underline">{p.title}</Link>
              <p className="opacity-80 text-sm mt-1">{p.summary}</p>
            </li>
          ))}
          {posts.length === 0 && <li className="opacity-70 text-sm">No posts yet.</li>}
        </ul>
      </div>
    </div>
  );
}


