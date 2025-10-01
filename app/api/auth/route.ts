import { NextRequest, NextResponse } from "next/server";
import { generateId, getStore } from "../_store";

// POST /api/auth -> login or register by username
export async function POST(req: NextRequest) {
  const { username, avatarUrl } = await req.json();
  if (!username || typeof username !== "string") {
    return NextResponse.json({ error: "username required" }, { status: 400 });
  }
  const store = getStore();
  let user = store.users.find((u) => u.username === username);
  if (!user) {
    user = { id: generateId("u"), username, avatarUrl, followers: [] };
    store.users.push(user);
  } else if (avatarUrl) {
    user.avatarUrl = avatarUrl;
  }
  const token = generateId("t");
  store.sessions[token] = user.id;
  return NextResponse.json({ token, user });
}

// DELETE /api/auth -> logout
export async function DELETE(req: NextRequest) {
  const token = req.headers.get("authorization")?.replace("Bearer ", "");
  if (!token) return NextResponse.json({ ok: true });
  const store = getStore();
  delete store.sessions[token];
  return NextResponse.json({ ok: true });
}

// GET /api/auth -> current user
export async function GET(req: NextRequest) {
  const token = req.headers.get("authorization")?.replace("Bearer ", "");
  const store = getStore();
  const userId = token ? store.sessions[token] : undefined;
  const user = userId ? store.users.find((u) => u.id === userId) : undefined;
  return NextResponse.json({ user: user || null });
}


