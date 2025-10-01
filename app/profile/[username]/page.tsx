import { headers } from "next/headers";

async function fetchProfile(username: string) {
  const hdrs = headers();
  const host = hdrs.get("host");
  const proto = hdrs.get("x-forwarded-proto") || "http";
  const base = `${proto}://${host}`;
  const res = await fetch(`${base}/api/profile/${username}`, { cache: "no-store" });
  return res.json();
}

export default async function ProfilePage({ params }: { params: { username: string } }) {
  const data = await fetchProfile(params.username);
  if (!data.user) return <div className="min-h-screen p-6 sm:p-10"><div className="max-w-4xl mx-auto glass rounded-2xl p-6">User not found.</div></div>;
  const { user, posts, followers, activities } = data;
  return (
    <div className="min-h-screen p-6 sm:p-10">
      <div className="max-w-5xl mx-auto space-y-4">
        <div className="glass rounded-2xl p-6 flex items-center gap-4">
          <div className="text-5xl">👤</div>
          <div>
            <div className="text-2xl font-semibold">{user.username}</div>
            <div className="text-sm opacity-70">{followers} followers</div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="glass rounded-2xl p-6">
            <h2 className="font-semibold mb-2">Recent Posts</h2>
            <ul className="space-y-2">
              {posts.map((p: any) => (
                <li key={p.id} className="bg-white/60 rounded-lg px-3 py-2">{p.title}</li>
              ))}
              {posts.length === 0 && <li className="opacity-70 text-sm">No posts yet.</li>}
            </ul>
          </div>
          <div className="glass rounded-2xl p-6">
            <h2 className="font-semibold mb-2">Activity</h2>
            <ul className="space-y-2">
              {activities.map((a: any) => (
                <li key={a.id} className="bg-white/60 rounded-lg px-3 py-2 text-sm">{a.type === "post" ? `Posted “${a.meta?.title}”` : "Followed someone"}</li>
              ))}
              {activities.length === 0 && <li className="opacity-70 text-sm">No activity yet.</li>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}


