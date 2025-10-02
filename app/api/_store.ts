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
  meta?: Record<string, any>;
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

const g = globalThis as any;
if (!g.__violet_store) {
  const demoUser: User = {
    id: "u_demo",
    username: "guest",
    avatarUrl: undefined,
    followers: [],
  };
  g.__violet_store = {
    users: [demoUser],
    posts: [],
    activities: [],
    sessions: {},
  } as Store;
}

export function getStore(): Store {
  return (globalThis as any).__violet_store as Store;
}

export function generateId(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}
