"use client";
import { useEffect, useState } from "react";

export default function AuthPanel() {
  const [user, setUser] = useState<any>(null);
  const [username, setUsername] = useState("");

  async function refresh() {
    const token = localStorage.getItem("token") || "";
    const res = await fetch("/api/auth", { headers: { Authorization: token ? `Bearer ${token}` : "" } });
    const data = await res.json();
    setUser(data.user);
  }

  useEffect(() => { refresh(); }, []);

  async function login() {
    const res = await fetch("/api/auth", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username }) });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      refresh();
    }
  }

  async function logout() {
    const token = localStorage.getItem("token") || "";
    await fetch("/api/auth", { method: "DELETE", headers: { Authorization: token ? `Bearer ${token}` : "" } });
    localStorage.removeItem("token");
    refresh();
  }

  if (user) {
    return (
      <div className="glass rounded-2xl p-5">
        <div className="flex items-center gap-3">
          <div className="text-3xl">👤</div>
          <div>
            <div className="font-semibold">{user.username}</div>
            <button className="text-sm underline" onClick={logout}>Logout</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex items-center gap-3">
        <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Your username" className="flex-1 rounded-md px-3 py-2 bg-white/70"/>
        <button onClick={login} className="px-3 py-2 rounded-md bg-[var(--accent-2)] text-black/80">Login</button>
      </div>
    </div>
  );
}


