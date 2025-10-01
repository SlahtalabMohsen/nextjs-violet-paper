"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import MobileNav from "../../ui/MobileNav";
import { useLang } from "../../ui/LangContext";

const t: Record<"en" | "fa", any> = {
  en: {
    notFound: "Post not found.",
    back: "Back",
    like: "Like",
    comment: "Comment",
  },
  fa: {
    notFound: "پست پیدا نشد.",
    back: "بازگشت",
    like: "پسندیدن",
    comment: "نظر دادن",
  },
};

import React from "react";
export default function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const unwrappedParams = React.use(params);
  const [post, setPost] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const { lang } = useLang();
  const [userId, setUserId] = useState<string | null>(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setUserId(localStorage.getItem("token"));
    }
  }, []);
  useEffect(() => {
    fetch(`/api/posts?id=${unwrappedParams.id}`)
      .then((r) => r.json())
      .then((d) => {
        setPost(d.post || null);
        setLoading(false);
      });
  }, [unwrappedParams.id]);
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass rounded-2xl p-8 text-xl font-semibold">
          {lang === "fa" ? "در حال بارگذاری..." : "Loading..."}
        </div>
      </div>
    );
  if (!post)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass rounded-2xl p-8 text-xl font-semibold">
          {t[lang].notFound}
        </div>
      </div>
    );
  // Helper: format date
  function formatDate(ts: number) {
    const d = new Date(ts);
    return d.toLocaleString(lang === "fa" ? "fa-IR" : "en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  }
  // Get author info (simulate lookup)
  const authorName = post.userId === "u_demo" ? "guest" : post.userId;

  return (
    <div
      className="min-h-screen p-6 sm:p-10"
      dir={lang === "fa" ? "rtl" : "ltr"}
    >
      <div className="max-w-3xl mx-auto space-y-4">
        <header className="glass rounded-2xl p-6 flex flex-col gap-3">
          {post.headerImage && (
            <img
              src={post.headerImage}
              alt="Header"
              className="w-full max-h-64 object-cover rounded-xl mb-2"
            />
          )}
          <h1 className="text-3xl font-semibold mb-2">{post.title}</h1>
          <div className="flex items-center gap-3 text-sm opacity-80 mb-2">
            <span>{lang === "fa" ? "نویسنده:" : "Author:"}</span>
            <Link
              href={`/profile/${authorName}`}
              className="underline font-medium"
            >
              {authorName}
            </Link>
            <span>· {formatDate(post.createdAt)}</span>
            <button
              className="ml-2 px-2 py-1 rounded bg-[var(--accent-1)] text-white text-xs"
              onClick={async () => {
                await fetch(`/api/profile/${authorName}/follow`, {
                  method: "POST",
                  headers: { Authorization: userId ? `Bearer ${userId}` : "" },
                });
                alert(lang === "fa" ? "دنبال شد!" : "Followed!");
              }}
            >
              {lang === "fa" ? "دنبال کردن" : "Follow"}
            </button>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-1 px-4 py-2 rounded-lg font-medium bg-[var(--accent-1)] text-white hover:opacity-90 transition"
          >
            <span className="text-lg">←</span> {t[lang].back}
          </Link>
          {userId && userId === post.userId && (
            <div className="flex gap-2 mt-2">
              <button
                className="px-3 py-1 rounded-lg bg-yellow-400 text-black text-sm font-semibold"
                onClick={() => alert("Edit post (not implemented)")}
              >
                {lang === "fa" ? "ویرایش" : "Edit"}
              </button>
              <button
                className="px-3 py-1 rounded-lg bg-red-500 text-white text-sm font-semibold"
                onClick={async () => {
                  if (
                    !confirm(
                      lang === "fa" ? "آیا مطمئن هستید؟" : "Are you sure?"
                    )
                  )
                    return;
                  const res = await fetch(`/api/posts?id=${post.id}`, {
                    method: "DELETE",
                    headers: {
                      Authorization: userId ? `Bearer ${userId}` : "",
                    },
                  });
                  if (res.ok) window.location.href = "/profile/" + authorName;
                  else
                    alert(
                      lang === "fa" ? "خطا در حذف پست" : "Error deleting post"
                    );
                }}
              >
                {lang === "fa" ? "حذف" : "Delete"}
              </button>
            </div>
          )}
        </header>
        <article className="glass rounded-2xl p-6 leading-8">
          <p>{post.content}</p>
          <div className="flex gap-3 mt-4">
            <button className="px-3 py-1 rounded-lg glassy-btn text-sm font-semibold transition">
              {t[lang].like}
            </button>
            <button className="px-3 py-1 rounded-lg glassy-btn text-sm font-semibold transition">
              {t[lang].comment}
            </button>
          </div>
        </article>
      </div>
    </div>
  );
}
