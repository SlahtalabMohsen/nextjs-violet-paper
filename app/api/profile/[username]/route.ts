import { NextRequest, NextResponse } from "next/server";
import { getStore } from "../../_store";

export async function GET(_req: NextRequest, { params }: { params: { username: string } }) {
  const store = getStore();
  const user = store.users.find((u) => u.username === params.username);
  if (!user) return NextResponse.json({ user: null });
  const posts = store.posts.filter((p) => p.userId === user.id).slice(-10).reverse();
  const followers = user.followers.length;
  const activities = store.activities.filter((a) => a.actorId === user.id).slice(-10).reverse();
  return NextResponse.json({ user: { id: user.id, username: user.username }, posts, followers, activities });
}


