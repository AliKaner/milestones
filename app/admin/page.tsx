"use client";

import { useState } from "react";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import ReviewQueue from "../components/admin/ReviewQueue";
import RoadmapAdmin from "../components/admin/RoadmapAdmin";
import ArticlesAdmin from "../components/admin/ArticlesAdmin";

export default function AdminPage() {
  const me = useQuery(api.users.me);
  const [tab, setTab] = useState<"review" | "roadmap" | "articles">("review");

  if (me === undefined) {
    return (
      <main className="grid-bg flex min-h-[60vh] items-center justify-center">
        <p className="animate-pulse text-white/50">Yükleniyor…</p>
      </main>
    );
  }

  if (!me || me.role !== "admin") {
    return (
      <main className="grid-bg flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
        <h1 className="text-2xl font-bold text-white">⛔ Yetkin yok</h1>
        <p className="text-white/55">
          Bu sayfa yalnızca admin kullanıcılar içindir.
        </p>
        <Link href="/" className="text-emerald-400 hover:underline">
          ← Ana sayfa
        </Link>
      </main>
    );
  }

  return (
    <main className="grid-bg min-h-screen">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-white">⚙️ Admin Panel</h1>
          <p className="mt-1 text-sm text-white/55">
            Kanıtları incele ve yol haritasını yönet.
          </p>
        </header>

        <div className="mb-6 flex gap-2 border-b border-white/10">
          {(
            [
              ["review", "📥 Review Kuyruğu"],
              ["roadmap", "🗺️ Yol Haritası"],
              ["articles", "📚 Makaleler"],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`-mb-px border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
                tab === key
                  ? "border-emerald-400 text-white"
                  : "border-transparent text-white/50 hover:text-white"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === "review" ? (
          <ReviewQueue />
        ) : tab === "roadmap" ? (
          <RoadmapAdmin />
        ) : (
          <ArticlesAdmin />
        )}
      </div>
    </main>
  );
}
