"use client";
import { useEffect, useState } from "react";

type Activity = {
  id: string;
  type: "post" | "follow";
  actorId: string;
  targetId?: string;
  createdAt: number;
  meta?: any;
};

export default function JournalPage() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [username, setUsername] = useState<string>("");
  const { lang } = require("../ui/LangContext").useLang();

  useEffect(() => {
    const token = localStorage.getItem("token") || "";
    fetch("/api/auth", {
      headers: { Authorization: token ? `Bearer ${token}` : "" },
    })
      .then((r) => r.json())
      .then((d) => setUsername(d.user?.username || "you"));
    fetch("/api/user/activity", {
      headers: { Authorization: token ? `Bearer ${token}` : "" },
    })
      .then((r) => r.json())
      .then((d) => setActivities(d.activities || []));
  }, []);

  return (
    <div className="min-h-screen p-6 sm:p-10">
      <div className="max-w-5xl mx-auto space-y-4">
        <div className="glass rounded-2xl p-6 text-xl font-semibold">
          {lang === "fa" ? "ژورنال شما" : "Your Journal"}
        </div>
        <ul className="glass rounded-2xl p-6 space-y-3">
          {activities.length === 0 && (
            <li className="opacity-70 text-sm">
              {lang === "fa" ? "فعالیتی وجود ندارد." : "No recent activity."}
            </li>
          )}
          {activities.map((a) => (
            <li key={a.id} className="bg-white/60 rounded-lg px-4 py-2">
              {a.type === "post" ? (
                <span>
                  {lang === "fa"
                    ? `${username} پست کرد “${a.meta?.title}”`
                    : `${username} posted “${a.meta?.title}”`}
                </span>
              ) : (
                <span>
                  {lang === "fa"
                    ? `${username} کسی را دنبال کرد`
                    : `${username} followed someone`}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
