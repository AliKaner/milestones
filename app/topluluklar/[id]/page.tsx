"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useConvexAuth, useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";

const medal = (rank: number) =>
  rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : null;

export default function CommunityDetailPage() {
  const params = useParams();
  const router = useRouter();
  const communityId = params.id as Id<"communities">;
  const { isAuthenticated } = useConvexAuth();

  const community = useQuery(api.communities.get, { communityId });
  const race = useQuery(api.leaderboard.community, { communityId });
  const join = useMutation(api.communities.join);
  const leave = useMutation(api.communities.leave);

  if (community === undefined) {
    return (
      <main className="grid-bg flex min-h-[60vh] items-center justify-center">
        <p className="animate-pulse text-white/50">Yükleniyor…</p>
      </main>
    );
  }

  if (community === null) {
    return (
      <main className="grid-bg flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
        <p className="text-white/55">Topluluk bulunamadı.</p>
        <Link href="/topluluklar" className="text-emerald-400 hover:underline">
          ← Topluluklar
        </Link>
      </main>
    );
  }

  return (
    <main className="grid-bg min-h-screen">
      <div className="mx-auto max-w-2xl px-6 py-12">
        <Link
          href="/topluluklar"
          className="text-sm text-white/55 hover:text-white"
        >
          ← Topluluklar
        </Link>

        <header className="mt-4 mb-8 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">{community.name}</h1>
            <p className="mt-1 font-mono text-sm text-white/45">
              Kod: {community.code} · {community.memberCount} üye
            </p>
          </div>
          {isAuthenticated &&
            (community.isMember ? (
              <button
                onClick={async () => {
                  await leave({ communityId });
                  router.push("/topluluklar");
                }}
                className="rounded-lg border border-white/15 px-3 py-1.5 text-sm text-white/60 hover:border-red-500/40 hover:text-red-300"
              >
                Ayrıl
              </button>
            ) : (
              <button
                onClick={() => join({ code: community.code })}
                className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-1.5 text-sm font-medium text-emerald-300 hover:bg-emerald-500/20"
              >
                Katıl
              </button>
            ))}
        </header>

        <h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-white">
          🏁 Topluluk Yarışı
        </h2>
        {race === undefined ? (
          <p className="animate-pulse text-white/50">Yükleniyor…</p>
        ) : race.length === 0 ? (
          <p className="text-white/50">Henüz üye yok.</p>
        ) : (
          <ol className="space-y-2">
            {race.map((r) => (
              <li
                key={r._id}
                className={`flex items-center gap-4 rounded-xl border px-4 py-3 ${
                  r.isMe
                    ? "border-emerald-500/40 bg-emerald-500/10"
                    : "border-white/10 bg-white/[0.03]"
                }`}
              >
                <span className="w-8 text-center text-lg font-bold text-white/70">
                  {medal(r.rank) ?? r.rank}
                </span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-sky-500 text-sm font-bold text-black">
                  {r.username.charAt(0).toLocaleUpperCase("tr")}
                </span>
                <span className="flex-1 font-medium text-white">
                  {r.username}
                  {r.isMe && (
                    <span className="ml-2 text-xs text-emerald-400">(sen)</span>
                  )}
                </span>
                <span className="font-mono text-sm font-semibold text-emerald-400">
                  {r.points} puan
                </span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </main>
  );
}
