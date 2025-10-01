"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AuthPanel() {
  const [user, setUser] = useState<any>(null);
  const [username, setUsername] = useState("");

  async function refresh() {
    const token = localStorage.getItem("token") || "";
    const res = await fetch("/api/auth", {
      headers: { Authorization: token ? `Bearer ${token}` : "" },
    });
    const data = await res.json();
    setUser(data.user);
  }

  useEffect(() => {
    refresh();
  }, []);

  async function logout() {
    const token = localStorage.getItem("token") || "";
    await fetch("/api/auth", {
      method: "DELETE",
      headers: { Authorization: token ? `Bearer ${token}` : "" },
    });
    localStorage.removeItem("token");
    refresh();
  }

  if (user) {
    return (
      <div className="glass rounded-2xl p-5 flex flex-col items-center text-center gap-3">
        {user.avatarUrl ? (
          <img
            src={user.avatarUrl}
            alt="avatar"
            className="w-14 h-14 rounded-full object-cover border mb-2"
          />
        ) : (
          <div className="text-4xl mb-2">👤</div>
        )}
        <div className="font-semibold text-lg">
          <Link href={`/profile/${user.username}`}>{user.username}</Link>
        </div>
        <div className="text-sm opacity-80 mb-2">
          Welcome back! Here are your stats:
        </div>
        <ul className="text-sm opacity-90 mb-2">
          <li>
            Posts: <span className="font-bold">{user.posts?.length ?? 0}</span>
          </li>
          <li>
            Followers:{" "}
            <span className="font-bold">{user.followers?.length ?? 0}</span>
          </li>
        </ul>
        <button className="text-sm underline" onClick={logout}>
          Logout
        </button>
      </div>
    );
  }

  // Example trending topics (could be fetched from API)
  const trending = [
    "AI & Future",
    "Travel",
    "Productivity",
    "Design",
    "React",
    "Next.js",
    "TailwindCSS",
  ];

  return (
    <div className="glass rounded-2xl p-5 flex flex-col items-center text-center gap-3">
      <div className="mb-2 text-base font-semibold">Trending Topics</div>
      <ul className="flex flex-wrap gap-2 justify-center mb-2">
        {trending.map((topic) => (
          <li key={topic}>
            <span className="px-3 py-1 rounded-full bg-white/70 text-[var(--accent-1)] text-xs font-medium shadow cursor-pointer hover:bg-white/90 transition dark:bg-[#f8f4ff] dark:text-[#7c3aed] dark:hover:bg-[#e0c3fc]">
              {topic}
            </span>
          </li>
        ))}
      </ul>
      <div className="text-xs opacity-70">
        Sign up to follow topics and get personalized content!
      </div>
    </div>
  );
}
