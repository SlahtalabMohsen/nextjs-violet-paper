"use client";
import { useEffect, useState } from "react";
import { useLang } from "../ui/LangContext";
import Link from "next/link";
import MobileNav from "../ui/MobileNav"; // Updated import for MobileNav

type Post = {
  id: string;
  title: string;
  summary: string;
  headerImage?: string;
};

export default function StoriesPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const { lang } = useLang();
  useEffect(() => {
    fetch("/api/posts")
      .then((r) => r.json())
      .then((d) => setPosts(d.posts || []));
  }, []);
  return (
    <div className="min-h-screen p-6 sm:p-10">
      <div className="max-w-5xl mx-auto space-y-4">
        <div className="glass rounded-2xl p-6 text-xl font-semibold">
          {lang === "fa" ? "داستان‌ها" : "Stories"}
        </div>
        <ul className="grid gap-4">
          {posts.map((p) => (
            <li key={p.id} className="glass rounded-xl p-4">
              {p.headerImage && (
                <img
                  src={p.headerImage}
                  alt="Header"
                  className="w-full h-40 object-cover rounded-md mb-2"
                />
              )}
              <Link
                href={`/post/${p.id}`}
                className="text-lg font-semibold text-[color:var(--accent-1)] hover:underline"
              >
                {p.title}
              </Link>
              <p className="opacity-80 text-sm mt-1">{p.summary}</p>
              <div className="flex gap-3 mt-2">
                <button className="px-3 py-1 rounded-lg glassy-btn text-sm font-semibold transition">
                  {lang === "fa" ? "پسندیدن" : "Like"}
                </button>
                <button className="px-3 py-1 rounded-lg glassy-btn text-sm font-semibold transition">
                  {lang === "fa" ? "نظر دادن" : "Comment"}
                </button>
              </div>
            </li>
          ))}
          {posts.length === 0 && (
            <li className="opacity-70 text-sm">
              {lang === "fa" ? "هنوز پستی وجود ندارد." : "No posts yet."}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
