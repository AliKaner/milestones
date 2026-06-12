"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useConvexAuth, useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function CommunitiesPage() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const mine = useQuery(api.communities.mine, isAuthenticated ? {} : "skip");
  const createCommunity = useMutation(api.communities.create);
  const joinCommunity = useMutation(api.communities.join);
  const router = useRouter();

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [newCode, setNewCode] = useState<string | null>(null);

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const { code } = await createCommunity({ name });
      setNewCode(code);
      setName("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Oluşturulamadı.");
    }
  };

  const join = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const id = await joinCommunity({ code });
      router.push(`/topluluklar/${id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Katılınamadı.");
    }
  };

  if (isLoading) {
    return (
      <main className="grid-bg flex min-h-[60vh] items-center justify-center">
        <p className="animate-pulse text-white/50">Yükleniyor…</p>
      </main>
    );
  }

  if (!isAuthenticated) {
    return (
      <main className="grid-bg flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
        <h1 className="text-2xl font-bold text-white">Topluluklar</h1>
        <p className="text-white/55">
          Topluluk oluşturmak veya katılmak için giriş yapmalısın.
        </p>
        <Link
          href="/giris"
          className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-300 hover:bg-emerald-500/20"
        >
          Giriş yap
        </Link>
      </main>
    );
  }

  return (
    <main className="grid-bg min-h-screen">
      <div className="mx-auto max-w-2xl px-6 py-12">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white">👥 Topluluklar</h1>
          <p className="mt-2 text-sm text-white/55">
            Arkadaşlarınla bir topluluk kur, kodla katıl, aranızda yarışın.
          </p>
        </header>

        <div className="mb-8 grid gap-4 sm:grid-cols-2">
          <form
            onSubmit={create}
            className="space-y-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5"
          >
            <h2 className="font-semibold text-white">Topluluk oluştur</h2>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Topluluk adı"
              className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-emerald-500/50"
            />
            <button
              type="submit"
              disabled={!name.trim()}
              className="w-full rounded-lg bg-gradient-to-r from-emerald-500 to-sky-500 px-4 py-2 text-sm font-semibold text-black disabled:opacity-50"
            >
              Oluştur
            </button>
            {newCode && (
              <p className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200">
                Kod: <span className="font-mono font-bold">{newCode}</span> —
                paylaş!
              </p>
            )}
          </form>

          <form
            onSubmit={join}
            className="space-y-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5"
          >
            <h2 className="font-semibold text-white">Kodla katıl</h2>
            <input
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="örn. K7P2QX"
              className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 font-mono text-sm uppercase text-white placeholder-white/30 outline-none focus:border-emerald-500/50"
            />
            <button
              type="submit"
              disabled={!code.trim()}
              className="w-full rounded-lg border border-sky-500/40 bg-sky-500/10 px-4 py-2 text-sm font-semibold text-sky-300 disabled:opacity-50"
            >
              Katıl
            </button>
          </form>
        </div>

        {error && (
          <p className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
            {error}
          </p>
        )}

        <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-white/50">
          Üye olduğun topluluklar
        </h2>
        {mine === undefined ? (
          <p className="animate-pulse text-white/50">Yükleniyor…</p>
        ) : mine.length === 0 ? (
          <p className="text-white/50">Henüz bir topluluğa üye değilsin.</p>
        ) : (
          <ul className="space-y-2">
            {mine.map((c) => (
              <li key={c._id}>
                <Link
                  href={`/topluluklar/${c._id}`}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 transition-colors hover:border-white/25"
                >
                  <div>
                    <div className="font-medium text-white">{c.name}</div>
                    <div className="font-mono text-xs text-white/45">
                      {c.code} · {c.memberCount} üye
                    </div>
                  </div>
                  <span className="text-white/40">→</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
