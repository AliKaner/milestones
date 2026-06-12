"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { concepts, type ConceptCategory } from "../data/concepts";

const categoryColor: Record<ConceptCategory, string> = {
  Temel: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
  JavaScript: "border-yellow-500/40 bg-yellow-500/10 text-yellow-300",
  React: "border-sky-500/40 bg-sky-500/10 text-sky-300",
  CSS: "border-pink-500/40 bg-pink-500/10 text-pink-300",
  Backend: "border-violet-500/40 bg-violet-500/10 text-violet-300",
  Veritabanı: "border-orange-500/40 bg-orange-500/10 text-orange-300",
  Araçlar: "border-amber-500/40 bg-amber-500/10 text-amber-300",
  Kavram: "border-teal-500/40 bg-teal-500/10 text-teal-300",
  Realtime: "border-rose-500/40 bg-rose-500/10 text-rose-300",
  Oyun: "border-lime-500/40 bg-lime-500/10 text-lime-300",
  AI: "border-fuchsia-500/40 bg-fuchsia-500/10 text-fuchsia-300",
  Mobil: "border-cyan-500/40 bg-cyan-500/10 text-cyan-300",
  DevOps: "border-indigo-500/40 bg-indigo-500/10 text-indigo-300",
};

const CATEGORIES = Object.keys(categoryColor) as ConceptCategory[];

// Türkçe karakterleri de doğru küçülten normalize
const norm = (s: string) => s.toLocaleLowerCase("tr-TR");

export default function ConceptsPage() {
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState<ConceptCategory | "Tümü">("Tümü");
  const [openTerm, setOpenTerm] = useState<string | null>(null);

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    concepts.forEach((x) => (c[x.category] = (c[x.category] ?? 0) + 1));
    return c;
  }, []);

  const results = useMemo(() => {
    const q = norm(query.trim());
    return concepts.filter((c) => {
      const matchCat = activeCat === "Tümü" || c.category === activeCat;
      if (!matchCat) return false;
      if (!q) return true;
      return (
        norm(c.term).includes(q) ||
        norm(c.short).includes(q) ||
        norm(c.body).includes(q)
      );
    });
  }, [query, activeCat]);

  return (
    <main className="grid-bg min-h-screen">
      {/* Üst bar — arama sticky kalır */}
      <div className="sticky top-14 z-30 border-b border-white/10 bg-[#0a0a0f]/90 backdrop-blur-md">
        <div className="mx-auto max-w-5xl px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/"
              className="shrink-0 text-sm text-white/60 transition-colors hover:text-white"
            >
              ← Yol haritası
            </Link>
            <div className="relative flex-1 max-w-xl">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/40">
                🔍
              </span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Kavram ara… (örn. hook, flexbox, jwt, big o)"
                className="w-full rounded-xl border border-white/15 bg-white/5 py-2.5 pl-10 pr-9 text-sm text-white placeholder-white/40 outline-none transition focus:border-sky-500/50 focus:bg-white/10"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  aria-label="Aramayı temizle"
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md px-2 py-0.5 text-white/40 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>
            <span className="hidden shrink-0 font-mono text-sm text-white/50 sm:block">
              {results.length} / {concepts.length}
            </span>
          </div>

          {/* Kategori filtreleri */}
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCat("Tümü")}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                activeCat === "Tümü"
                  ? "border-white/40 bg-white/15 text-white"
                  : "border-white/10 bg-white/[0.03] text-white/60 hover:border-white/25"
              }`}
            >
              Tümü · {concepts.length}
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                  activeCat === cat
                    ? categoryColor[cat]
                    : "border-white/10 bg-white/[0.03] text-white/60 hover:border-white/25"
                }`}
              >
                {cat} · {counts[cat] ?? 0}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-8">
        <header className="mb-6 text-center">
          <h1 className="bg-gradient-to-r from-white to-sky-300 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
            Kavram Sözlüğü 📖
          </h1>
          <p className="mt-2 text-sm text-white/60">
            {concepts.length} terim. Bir kelime ara veya kategoriye göre süz;
            karta tıklayınca açıklaması açılır.
          </p>
        </header>

        {results.length === 0 ? (
          <p className="py-20 text-center text-white/50">
            “{query}” için sonuç yok. Başka bir kelime dene.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((c) => {
              const open = openTerm === c.term;
              return (
                <button
                  key={c.term}
                  onClick={() => setOpenTerm(open ? null : c.term)}
                  className={`flex flex-col rounded-2xl border p-4 text-left transition-all ${
                    open
                      ? "border-white/25 bg-white/[0.06] sm:col-span-2 lg:col-span-3"
                      : "border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.05]"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${
                        categoryColor[c.category]
                      }`}
                    >
                      {c.category}
                    </span>
                    <span className="ml-auto text-xs text-white/30">
                      {open ? "▲" : "▼"}
                    </span>
                  </div>
                  <h3 className="mt-2 text-lg font-bold text-white">{c.term}</h3>
                  <p className="mt-1 text-sm text-white/70">{c.short}</p>

                  {open && (
                    <div className="card-fade mt-3 border-t border-white/10 pt-3">
                      <p className="text-sm leading-relaxed text-white/75">
                        {c.body}
                      </p>
                      {c.analogy && (
                        <p className="mt-3 rounded-lg border border-sky-500/20 bg-sky-500/5 px-3 py-2 text-xs text-sky-200">
                          🔍 {c.analogy}
                        </p>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
