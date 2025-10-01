import { NextRequest, NextResponse } from "next/server";
import { Activity, Post, generateId, getStore } from "../_store";

export async function GET() {
  const posts = getStore()
    .posts
    .slice()
    .sort((a, b) => b.createdAt - a.createdAt)
    .map(({ id, title, content, summary, createdAt }) => ({ id, title, content, summary, createdAt }));
  return NextResponse.json({ posts });
}

export async function POST(req: NextRequest) {
  const store = getStore();
  const token = req.headers.get("authorization")?.replace("Bearer ", "");
  const userId = token ? store.sessions[token] : undefined;
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const title = String(body.title || "").trim();
  const content = String(body.content || "").trim();
  const headerImage = typeof body.headerImage === "string" ? body.headerImage : undefined;
  if (!title || !content) {
    return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
  }
  const summary = content.length > 160 ? content.slice(0, 157) + "..." : content;
  const post: Post = {
    id: generateId("p"),
    userId,
    title,
    content,
    headerImage,
    summary,
    createdAt: Date.now(),
  };
  store.posts.push(post);
  const activity: Activity = { id: generateId("a"), type: "post", actorId: userId, targetId: post.id, createdAt: Date.now(), meta: { title } };
  store.activities.push(activity);
  return NextResponse.json({ post }, { status: 201 });
}


