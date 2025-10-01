"use client";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, avatarUrl, password }),
      });
      const data = await res.json();
      if (data.error) setError(data.error);
      else if (data.token) {
        localStorage.setItem("token", data.token);
        window.location.href = "/profile/" + username;
      }
    } catch (err) {
      setError("Network error");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
      <form
        className="glass rounded-2xl p-8 w-full max-w-md space-y-6"
        onSubmit={handleSubmit}
      >
        <h2
          className="text-2xl font-bold mb-2 text-center"
          style={{ color: "var(--foreground)" }}
        >
          {mode === "login" ? "Login" : "Sign Up"}
        </h2>
        <div className="space-y-2">
          <input
            className="w-full rounded-md px-3 py-2"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            className="w-full rounded-md px-3 py-2"
            type="password"
            placeholder="Password (not used yet)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            className="w-full rounded-md px-3 py-2"
            placeholder="Avatar URL (optional)"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
          />
        </div>
        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}
        <button
          type="submit"
          className="w-full py-2 rounded-md btn-accent2 font-semibold"
          disabled={loading}
        >
          {loading ? "Loading..." : mode === "login" ? "Login" : "Sign Up"}
        </button>
        <div className="text-center text-sm mt-2">
          {mode === "login" ? (
            <span>
              Don't have an account?{" "}
              <button
                type="button"
                className="underline"
                onClick={() => setMode("signup")}
              >
                Sign Up
              </button>
            </span>
          ) : (
            <span>
              Already have an account?{" "}
              <button
                type="button"
                className="underline"
                onClick={() => setMode("login")}
              >
                Login
              </button>
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
