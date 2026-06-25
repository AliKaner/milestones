"use client";

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";

type Props = {
  levelId: string;
  isLoggedIn: boolean;
  /** Kapalıyken rozette gösterilecek mesaj sayısı (page'den gelir). */
  count: number;
};

function timeAgo(ts: number): string {
  const d = Math.floor((Date.now() - ts) / 1000);
  if (d < 60) return "az önce";
  if (d < 3600) return `${Math.floor(d / 60)} dk önce`;
  if (d < 86400) return `${Math.floor(d / 3600)} sa önce`;
  return new Date(ts).toLocaleDateString("tr-TR");
}

export default function LevelForum({ levelId, isLoggedIn, count }: Props) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);

  // Sadece açıkken yükle.
  const posts = useQuery(
    api.forum.list,
    open ? { levelId: levelId as Id<"levels"> } : "skip"
  );
  const add = useMutation(api.forum.add);
  const remove = useMutation(api.forum.remove);

  const submit = async () => {
    const body = text.trim();
    if (!body || busy) return;
    setBusy(true);
    try {
      await add({ levelId: levelId as Id<"levels">, body });
      setText("");
    } finally {
      setBusy(false);
    }
  };

  const shownCount = posts?.length ?? count;

  return (
    <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.02]">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-4 py-2.5 text-sm text-white/70 transition-colors hover:text-white"
      >
        <span className="flex items-center gap-2">
          💬 Forum
          {shownCount > 0 && (
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/60">
              {shownCount}
            </span>
          )}
        </span>
        <span className="text-xs text-white/40">{open ? "gizle ▲" : "aç ▼"}</span>
      </button>

      {open && (
        <div className="border-t border-white/10 px-4 py-3">
          {/* Mesaj listesi */}
          {posts === undefined ? (
            <p className="py-2 text-sm text-white/40">Yükleniyor…</p>
          ) : posts.length === 0 ? (
            <p className="py-2 text-sm text-white/40">
              Henüz mesaj yok. İlk soruyu/ipucunu sen yaz! 👇
            </p>
          ) : (
            <ul className="flex flex-col gap-3">
              {posts.map((p) => (
                <li key={p._id} className="group">
                  <div className="mb-0.5 flex items-center gap-2 text-xs text-white/45">
                    <span className="font-medium text-white/70">
                      {p.authorName}
                    </span>
                    <span>· {timeAgo(p.createdAt)}</span>
                    {p.mine && (
                      <button
                        onClick={() => remove({ id: p._id })}
                        className="ml-auto text-white/30 opacity-0 transition-opacity hover:text-red-300 group-hover:opacity-100"
                      >
                        sil
                      </button>
                    )}
                  </div>
                  <p className="whitespace-pre-wrap break-words text-sm text-white/80">
                    {p.body}
                  </p>
                </li>
              ))}
            </ul>
          )}

          {/* Yeni mesaj */}
          {isLoggedIn ? (
            <div className="mt-3 flex flex-col gap-2">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Bir soru sor, ipucu paylaş veya takıldığın yeri anlat…"
                rows={2}
                className="w-full resize-y rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-emerald-400/50 focus:outline-none"
              />
              <div className="flex justify-end">
                <button
                  onClick={submit}
                  disabled={busy || !text.trim()}
                  className="rounded-lg bg-emerald-500/90 px-4 py-1.5 text-sm font-medium text-black transition-colors hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {busy ? "Gönderiliyor…" : "Gönder"}
                </button>
              </div>
            </div>
          ) : (
            <p className="mt-3 text-xs text-white/40">
              Mesaj yazmak için giriş yapmalısın.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
