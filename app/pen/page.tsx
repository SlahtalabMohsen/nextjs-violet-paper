"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

export default function PenPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [headerImage, setHeaderImage] = useState<string | undefined>(undefined);
  const canSave = title.trim() && content.trim();

  async function submit() {
    if (!canSave) return;
    setSaving(true);
    const token = localStorage.getItem("token") || "";
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: token ? `Bearer ${token}` : "" },
      body: JSON.stringify({ title, content, headerImage }),
    });
    const data = await res.json();
    setSaving(false);
    if (res.ok) router.push(`/post/${data.post.id}`);
  }

  return (
    <div className="min-h-screen p-6 sm:p-10">
      <div className="max-w-4xl mx-auto space-y-6">
        <header className="glass rounded-2xl p-6 flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl font-semibold">Its your Pen, Feel Free</h1>
          <Link href="/" className="text-[var(--accent-1)] underline">Back</Link>
        </header>
        <div className="glass rounded-2xl p-6">
          <div className="mb-3">
            {headerImage ? (
              <img src={headerImage} alt="Header" className="w-full h-48 object-cover rounded-md" />
            ) : (
              <div className="w-full h-32 rounded-md bg-white/60 grid place-items-center text-sm opacity-70">Header image (optional)</div>
            )}
            <input type="file" accept="image/*" className="mt-2"
              onChange={async (e) => {
                const f = e.target.files?.[0];
                if (!f) return;
                const b64 = await f.arrayBuffer().then((b) => `data:${f.type};base64,${Buffer.from(b as ArrayBuffer).toString("base64")}`);
                setHeaderImage(b64);
              }} />
          </div>
          <input
            className="w-full px-3 py-2 rounded-md mb-3 bg-white/70"
            placeholder="Post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="w-full min-h-[220px] px-3 py-2 rounded-md bg-white/70"
            placeholder="Write your story..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="flex gap-3 mt-4">
            <button disabled={!canSave || saving} onClick={submit} className="px-4 py-2 rounded-lg text-white disabled:opacity-50" style={{ background: "var(--accent-1)" }}>
              {saving ? "Saving..." : "Save"}
            </button>
            <button onClick={() => { setTitle(""); setContent(""); }} className="px-4 py-2 rounded-lg bg-white/70">Clear</button>
          </div>
        </div>
      </div>
    </div>
  );
}


