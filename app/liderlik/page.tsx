"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const medal = (rank: number) =>
  rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : null;

export default function LeaderboardPage() {
  const rows = useQuery(api.leaderboard.global);

  return (
    <main className="grid-bg min-h-screen">
      <div className="mx-auto max-w-2xl px-6 py-12">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white">🏆 Liderlik Tablosu</h1>
          <p className="mt-2 text-sm text-white/55">
            Onaylanmış adım kanıtlarından kazanılan puanlara göre sıralama.
          </p>
        </header>

        {rows === undefined ? (
          <p className="animate-pulse text-center text-white/50">Yükleniyor…</p>
        ) : rows.length === 0 ? (
          <p className="text-center text-white/50">
            Henüz puan kazanan yok. İlk sen ol! 🚀
          </p>
        ) : (
          <ol className="space-y-2">
            {rows.map((r) => (
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
