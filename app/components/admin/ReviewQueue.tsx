"use client";

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";

export default function ReviewQueue() {
  const pending = useQuery(api.submissions.listPending);
  const reviewed = useQuery(api.submissions.listReviewed);
  const review = useMutation(api.submissions.review);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState<string | null>(null);
  const [view, setView] = useState<"pending" | "reviewed">("pending");

  const act = async (
    id: Id<"submissions">,
    status: "approved" | "rejected"
  ) => {
    setBusy(id);
    try {
      await review({
        submissionId: id,
        status,
        note: notes[id]?.trim() || undefined,
      });
    } finally {
      setBusy(null);
    }
  };

  return (
    <div>
      <div className="mb-4 inline-flex rounded-lg border border-white/10 p-1">
        <button
          onClick={() => setView("pending")}
          className={`rounded-md px-3 py-1.5 text-sm ${
            view === "pending" ? "bg-white/10 text-white" : "text-white/55"
          }`}
        >
          Bekleyenler {pending ? `(${pending.length})` : ""}
        </button>
        <button
          onClick={() => setView("reviewed")}
          className={`rounded-md px-3 py-1.5 text-sm ${
            view === "reviewed" ? "bg-white/10 text-white" : "text-white/55"
          }`}
        >
          Değerlendirilenler {reviewed ? `(${reviewed.length})` : ""}
        </button>
      </div>

      {view === "pending" ? (
        pending === undefined ? (
          <p className="animate-pulse text-white/50">Yükleniyor…</p>
        ) : pending.length === 0 ? (
          <p className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-8 text-center text-white/50">
            🎉 Bekleyen kanıt yok. Kuyruk temiz.
          </p>
        ) : (
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
                      <span className="font-semibold text-white">
                        {s.username}
                      </span>
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
                    {s.question && (
                      <div className="mt-2 rounded-lg border border-sky-500/30 bg-sky-500/5 px-3 py-2 text-sm">
                        <p className="font-medium text-sky-200">
                          ❓ {s.question}
                        </p>
                        <p className="mt-1 text-white/80">
                          {s.answer || (
                            <span className="text-white/40">(cevap yok)</span>
                          )}
                        </p>
                      </div>
                    )}

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
        )
      ) : reviewed === undefined ? (
        <p className="animate-pulse text-white/50">Yükleniyor…</p>
      ) : reviewed.length === 0 ? (
        <p className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-8 text-center text-white/50">
          Henüz değerlendirme yapmadın.
        </p>
      ) : (
        <div className="space-y-3">
          {reviewed.map((s) => (
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
                    className="max-h-40 w-full rounded-lg border border-white/10 object-contain sm:w-44"
                  />
                )}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 text-sm">
                    <span className="font-semibold text-white">
                      {s.username}
                    </span>
                    <span className="text-white/40">·</span>
                    <span className="text-white/70">{s.levelProject}</span>
                    <span
                      className={`ml-auto rounded-full px-2 py-0.5 text-xs font-bold ${
                        s.status === "approved"
                          ? "bg-emerald-500/15 text-emerald-300"
                          : "bg-red-500/15 text-red-300"
                      }`}
                    >
                      {s.status === "approved"
                        ? `✓ Onaylı +${s.stepPoints}`
                        : "✕ Reddedildi"}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-white/55">{s.stepTitle}</p>
                  {s.question && (
                    <p className="mt-2 text-sm text-white/70">
                      <span className="text-sky-300">❓ {s.question}</span> —{" "}
                      {s.answer || "(cevap yok)"}
                    </p>
                  )}
                  {s.reviewNote && (
                    <p className="mt-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/70">
                      📝 Not: {s.reviewNote}
                    </p>
                  )}

                  {/* Kararı değiştir */}
                  <div className="mt-3 flex gap-2">
                    {s.status === "approved" ? (
                      <button
                        disabled={busy === s._id}
                        onClick={() => act(s._id, "rejected")}
                        className="rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-1.5 text-xs font-semibold text-red-300 disabled:opacity-50"
                      >
                        Reddet'e çevir
                      </button>
                    ) : (
                      <button
                        disabled={busy === s._id}
                        onClick={() => act(s._id, "approved")}
                        className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-300 disabled:opacity-50"
                      >
                        Onayla'ya çevir
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
