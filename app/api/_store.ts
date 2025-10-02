declare global {
  var __violet_store: Store | undefined;
}
export type User = {
  id: string;
  username: string;
  avatarUrl?: string;
  followers: string[]; // user ids
};

export type Activity = {
  id: string;
  type: "post" | "follow";
  actorId: string;
  targetId?: string; // post id or user id
  createdAt: number;
  meta?: { title?: string };
};

export type Post = {
  id: string;
  userId: string;
  title: string;
  content: string;
  headerImage?: string; // data URL for demo
  summary: string;
  createdAt: number;
};

type Store = {
  users: User[];
  posts: Post[];
  activities: Activity[];
  sessions: Record<string, string>; // token -> userId
};

if (!globalThis.__violet_store) {
  const demoUser: User = {
    id: "u_demo",
    username: "guest",
    avatarUrl: undefined,
    followers: [],
  };
  globalThis.__violet_store = {
    users: [demoUser],
    posts: [],
    activities: [],
    sessions: {},
  };
}

export function getStore(): Store {
  return globalThis.__violet_store as Store;
}

export function generateId(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}
