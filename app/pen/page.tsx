"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLang } from "../ui/LangContext";

export default function PenPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [headerImage, setHeaderImage] = useState<string | undefined>(undefined);
  const canSave = title.trim() && content.trim();
  const { lang } = useLang();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  async function submit() {
    if (!canSave) return;
    setError(null);
    setSaving(true);
    const token = localStorage.getItem("token") || "";
    if (!token) {
      setError(
        lang === "fa"
          ? "برای ارسال پست باید وارد شوید."
          : "You must be logged in to post."
      );
      setSaving(false);
      return;
    }
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, content, headerImage }),
    });
    const data = await res.json();
    setSaving(false);
    if (res.ok) router.push(`/post/${data.post.id}`);
    else
      setError(
        data.error ||
          (lang === "fa" ? "خطا در ارسال پست." : "Error creating post.")
      );
  }

  if (!hydrated) return null;

  return (
    <div className="min-h-screen p-6 sm:p-10">
      {error && (
        <div className="bg-red-100 text-red-700 rounded-lg p-3 mb-4 text-center">
          {error}
        </div>
      )}
      {/* ...existing code... */}
      <div className="max-w-4xl mx-auto space-y-6">
        {/* ...existing code... */}
        <header className="glass rounded-2xl p-6 flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl font-semibold">
            {lang === "fa"
              ? "قلم شما، آزاد بنویسید"
              : "Its your Pen, Feel Free"}
          </h1>
          <Link href="/" className="text-[var(--accent-1)] underline">
            {lang === "fa" ? "بازگشت" : "Back"}
          </Link>
        </header>
        {/* ...existing code... */}
        <div className="glass rounded-2xl p-6">
          <div className="mb-3">
            {headerImage ? (
              <img
                src={headerImage}
                alt="Header"
                className="w-full h-48 object-cover rounded-md"
              />
            ) : (
              <div className="w-full h-32 rounded-md bg-white/60 grid place-items-center text-sm opacity-70">
                {lang === "fa"
                  ? "تصویر سربرگ (اختیاری)"
                  : "Header image (optional)"}
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              className="mt-2"
              onChange={async (e) => {
                const f = e.target.files?.[0];
                if (!f) return;
                const b64 = await f
                  .arrayBuffer()
                  .then(
                    (b) =>
                      `data:${f.type};base64,${Buffer.from(
                        b as ArrayBuffer
                      ).toString("base64")}`
                  );
                setHeaderImage(b64);
              }}
            />
          </div>
          <input
            className="w-full px-3 py-2 rounded-md mb-3 bg-white/70"
            placeholder={lang === "fa" ? "عنوان پست" : "Post title"}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="w-full min-h-[220px] px-3 py-2 rounded-md bg-white/70"
            placeholder={
              lang === "fa" ? "داستان خود را بنویسید..." : "Write your story..."
            }
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="flex gap-3 mt-4">
            <button
              disabled={!canSave || saving}
              onClick={submit}
              className="px-4 py-2 rounded-lg text-white disabled:opacity-50"
              style={{ background: "var(--accent-1)" }}
            >
              {saving
                ? lang === "fa"
                  ? "در حال ذخیره..."
                  : "Saving..."
                : lang === "fa"
                ? "ذخیره"
                : "Save"}
            </button>
            <button
              onClick={() => {
                setTitle("");
                setContent("");
              }}
              className="px-4 py-2 rounded-lg bg-white/70"
            >
              {lang === "fa" ? "پاک کردن" : "Clear"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
