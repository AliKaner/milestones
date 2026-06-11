"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { concepts } from "../data/concepts";

const categoryColor: Record<string, string> = {
  Temel: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
  Frontend: "border-sky-500/40 bg-sky-500/10 text-sky-300",
  Backend: "border-violet-500/40 bg-violet-500/10 text-violet-300",
  Araçlar: "border-amber-500/40 bg-amber-500/10 text-amber-300",
};

export default function ConceptsPage() {
  const [index, setIndex] = useState(0);
  const total = concepts.length;
  const concept = concepts[index];

  const next = useCallback(
    () => setIndex((i) => (i + 1) % total),
    [total]
  );
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + total) % total),
    [total]
  );

  // Klavye okları ile gezinme
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  return (
    <main className="grid-bg flex min-h-screen flex-col">
      {/* Üst bar */}
      <div className="border-b border-white/10 bg-[#0a0a0f]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="text-sm text-white/60 transition-colors hover:text-white"
          >
            ← Yol haritasına dön
          </Link>
          <span className="font-mono text-sm text-white/50">
            {index + 1} / {total}
          </span>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-6 py-10">
        <header className="mb-8 text-center">
          <h1 className="bg-gradient-to-r from-white to-sky-300 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
            Kavram Sözlüğü 📖
          </h1>
          <p className="mt-2 text-sm text-white/60">
            Sık duyulan jargonu insan diline çeviriyoruz. Oklarla (← →) veya
            butonlarla gez.
          </p>
        </header>

        {/* Kart + yan oklar */}
        <div className="flex flex-1 items-center gap-3">
          <button
            onClick={prev}
            aria-label="Önceki kavram"
            className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/15 text-xl text-white/70 transition hover:border-white/40 hover:text-white sm:flex"
          >
            ←
          </button>

          <article
            key={index}
            className="card-fade flex-1 rounded-3xl border border-white/10 bg-white/[0.03] p-8 shadow-xl"
          >
            <span
              className={`inline-block rounded-full border px-3 py-1 text-xs font-medium ${
                categoryColor[concept.category]
              }`}
            >
              {concept.category}
            </span>

            <h2 className="mt-4 text-3xl font-bold text-white">
              {concept.term}
            </h2>
            <p className="mt-2 text-lg text-white/80">{concept.short}</p>

            <p className="mt-5 leading-relaxed text-white/70">{concept.body}</p>

            {concept.analogy && (
              <div className="mt-6 rounded-xl border border-sky-500/20 bg-sky-500/5 px-4 py-3">
                <p className="text-sm text-sky-200">
                  <span className="font-semibold">🔍 Benzetme: </span>
                  {concept.analogy}
                </p>
              </div>
            )}
          </article>

          <button
            onClick={next}
            aria-label="Sonraki kavram"
            className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/15 text-xl text-white/70 transition hover:border-white/40 hover:text-white sm:flex"
          >
            →
          </button>
        </div>

        {/* Mobil oklar */}
        <div className="mt-6 flex justify-between sm:hidden">
          <button
            onClick={prev}
            className="rounded-lg border border-white/15 px-5 py-2 text-white/70"
          >
            ← Önceki
          </button>
          <button
            onClick={next}
            className="rounded-lg border border-white/15 px-5 py-2 text-white/70"
          >
            Sonraki →
          </button>
        </div>

        {/* Nokta göstergesi / hızlı atlama */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {concepts.map((c, i) => (
            <button
              key={c.term}
              onClick={() => setIndex(i)}
              title={c.term}
              aria-label={c.term}
              className={`h-2.5 rounded-full transition-all ${
                i === index ? "w-8 bg-sky-400" : "w-2.5 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
