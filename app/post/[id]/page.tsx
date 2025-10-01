import Link from "next/link";
import { headers } from "next/headers";

async function fetchPost(id: string) {
  const hdrs = headers();
  const host = hdrs.get("host");
  const proto = hdrs.get("x-forwarded-proto") || "http";
  const base = `${proto}://${host}`;
  const res = await fetch(`${base}/api/posts`, { cache: "no-store" });
  const data = await res.json();
  return (data.posts as any[]).find((p) => p.id === id);
}

export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await fetchPost(params.id);
  if (!post) {
    return (
      <div className="min-h-screen p-6 sm:p-10">
        <div className="max-w-3xl mx-auto glass rounded-2xl p-6">
          <p>Post not found.</p>
          <Link className="text-[var(--accent-1)] underline" href="/">Go back</Link>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen p-6 sm:p-10">
      <div className="max-w-3xl mx-auto space-y-4">
        <header className="glass rounded-2xl p-6">
          <h1 className="text-3xl font-semibold mb-2">{post.title}</h1>
          <Link className="text-sm text-[var(--accent-1)] underline" href="/">← Back</Link>
        </header>
        <article className="glass rounded-2xl p-6 leading-8">
          <p>{post.content}</p>
        </article>
      </div>
    </div>
  );
}


