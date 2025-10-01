import { NextRequest, NextResponse } from "next/server";
import { getStore } from "../../_store";

export async function GET(req: NextRequest) {
  const token = req.headers.get("authorization")?.replace("Bearer ", "");
  const store = getStore();
  const userId = token ? store.sessions[token] : undefined;
  if (!userId) return NextResponse.json({ activities: [] });
  const activities = store.activities
    .filter((a) => a.actorId === userId)
    .sort((a, b) => b.createdAt - a.createdAt);
  return NextResponse.json({ activities });
}


