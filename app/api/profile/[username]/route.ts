// POST /api/profile/[username]/follow to follow a user
export async function POST(
  req: NextRequest,
  { params }: { params: { username: string } }
) {
  const store = getStore();
  const token = req.headers.get("authorization")?.replace("Bearer ", "");
  const userId = token ? store.sessions[token] : undefined;
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const targetUser = store.users.find((u) => u.username === params.username);
  if (!targetUser)
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  if (!targetUser.followers.includes(userId)) {
    targetUser.followers.push(userId);
  }
  return NextResponse.json({ success: true });
}
import { NextRequest, NextResponse } from "next/server";
import { getStore } from "../../_store";

export async function GET(
  req: NextRequest,
  { params }: { params: { username?: string } }
) {
  const store = getStore();
  let user;
  if (params.username) {
    user = store.users.find((u) => u.username === params.username);
  } else {
    const token = req.headers.get("authorization")?.replace("Bearer ", "");
    const userId = token ? store.sessions[token] : undefined;
    user = store.users.find((u) => u.id === userId);
  }
  if (!user) return NextResponse.json({ user: null });
  const posts = store.posts
    .filter((p) => p.userId === user.id)
    .slice(-10)
    .reverse();
  const followers = user.followers.length;
  const activities = store.activities
    .filter((a) => a.actorId === user.id)
    .slice(-10)
    .reverse();
  return NextResponse.json({
    user: { id: user.id, username: user.username },
    posts,
    followers,
    activities,
  });
}
