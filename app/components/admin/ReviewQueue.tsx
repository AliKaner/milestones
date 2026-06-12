"use client";

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";

export default function ReviewQueue() {
  const pending = useQuery(api.submissions.listPending);
  const review = useMutation(api.submissions.review);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState<string | null>(null);

  const act = async (
    id: Id<"submissions">,
    status: "approved" | "rejected"
  ) => {
    setBusy(id);
    try {
      await review({ submissionId: id, status, note: notes[id]?.trim() || undefined });
    } finally {
      setBusy(null);
    }
  };

  if (pending === undefined) {
    return <p className="animate-pulse text-white/50">Yükleniyor…</p>;
  }
  if (pending.length === 0) {
    return (
      <p className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-8 text-center text-white/50">
        🎉 Bekleyen kanıt yok. Kuyruk temiz.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {pending.map((s) => (
        <div
          key={s._id}
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
        >
          <div className="flex flex-col gap-4 sm:flex-row">
            {s.imageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={s.imageUrl}
                alt="kanıt"
                className="max-h-52 w-full rounded-lg border border-white/10 object-contain sm:w-56"
              />
            )}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <span className="font-semibold text-white">{s.username}</span>
                <span className="text-white/40">·</span>
                <span className="text-white/70">{s.levelProject}</span>
              </div>
              <p className="mt-1 text-sm text-white/55">{s.stepTitle}</p>
              <span className="mt-2 inline-block rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-bold text-emerald-300">
                +{s.stepPoints} puan
              </span>
              <p className="mt-3 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80">
                {s.text}
              </p>

              <textarea
                value={notes[s._id] ?? ""}
                onChange={(e) =>
                  setNotes((p) => ({ ...p, [s._id]: e.target.value }))
                }
                rows={2}
                placeholder="Review notu (opsiyonel — özellikle redde gerekçe)"
                className="mt-3 w-full resize-none rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/30 outline-none focus:border-white/30"
              />

              <div className="mt-3 flex gap-2">
                <button
                  disabled={busy === s._id}
                  onClick={() => act(s._id, "approved")}
                  className="rounded-lg bg-gradient-to-r from-emerald-500 to-green-500 px-4 py-1.5 text-sm font-semibold text-black disabled:opacity-50"
                >
                  ✓ Onayla
                </button>
                <button
                  disabled={busy === s._id}
                  onClick={() => act(s._id, "rejected")}
                  className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-1.5 text-sm font-semibold text-red-300 disabled:opacity-50"
                >
                  ✕ Reddet
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
