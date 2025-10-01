"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useLang } from "../../ui/LangContext";

import React from "react";
export default function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const unwrappedParams = React.use(params);
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const { lang } = useLang();
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
    fetch(`/api/profile/${unwrappedParams.username}`)
      .then((r) => r.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      });
  }, [unwrappedParams.username]);
  if (!hydrated) return null;
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass rounded-2xl p-8 text-xl font-semibold">
          {lang === "fa" ? "در حال بارگذاری..." : "Loading..."}
        </div>
      </div>
    );
  if (!data?.user)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass rounded-2xl p-8 text-xl font-semibold">
          {lang === "fa" ? "پروفایل پیدا نشد" : "Profile not found"}
        </div>
      </div>
    );
  const { user, posts, followers, activities } = data;
  return (
    <div className="min-h-screen p-6 sm:p-10">
      <div className="max-w-5xl mx-auto space-y-4">
        <div className="glass rounded-2xl p-6 flex items-center gap-4">
          <div className="text-5xl">👤</div>
          <div>
            <div className="text-2xl font-semibold">{user.username}</div>
            <div className="text-sm opacity-70">{followers} followers</div>
            <button className="mt-2 px-4 py-1 rounded-lg font-medium bg-[var(--accent-1)] text-white shadow hover:opacity-90 transition text-sm">
              Follow
            </button>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="glass rounded-2xl p-6">
            <h2 className="font-semibold mb-2">Recent Posts</h2>
            <ul className="space-y-2">
              {posts.map((p: any) => (
                <li
                  key={p.id}
                  className="bg-white/60 rounded-lg px-3 py-2 flex justify-between items-center"
                >
                  <Link
                    href={`/post/${p.id}`}
                    className="font-medium underline"
                  >
                    {p.title}
                  </Link>
                  <span className="text-xs opacity-70 ml-2">
                    {new Date(p.createdAt).toLocaleString(
                      lang === "fa" ? "fa-IR" : "en-US",
                      { dateStyle: "medium", timeStyle: "short" }
                    )}
                  </span>
                </li>
              ))}
              {posts.length === 0 && (
                <li className="opacity-70 text-sm">No posts yet.</li>
              )}
            </ul>
          </div>
          <div className="glass rounded-2xl p-6">
            <h2 className="font-semibold mb-2">Activity</h2>
            <ul className="space-y-2">
              {activities.map((a: any) => (
                <li
                  key={a.id}
                  className="bg-white/60 rounded-lg px-3 py-2 text-sm"
                >
                  {a.type === "post"
                    ? `Posted “${a.meta?.title}”`
                    : "Followed someone"}
                </li>
              ))}
              {activities.length === 0 && (
                <li className="opacity-70 text-sm">No activity yet.</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
