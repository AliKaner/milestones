"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { softSkills } from "../data/softSkills";

type Answer = "evet" | "hayir";

export default function SelfAssessmentPage() {
  const [answers, setAnswers] = useState<Record<string, Answer>>({});

  const totalStatements = useMemo(
    () => softSkills.reduce((n, c) => n + c.statements.length, 0),
    []
  );
  const answeredCount = Object.keys(answers).length;

  // Kategori bazlı skor (sadece cevaplananlar üzerinden).
  const perCategory = softSkills.map((cat) => {
    const ids = cat.statements.map((s) => s.id);
    const answered = ids.filter((id) => answers[id]);
    const evet = ids.filter((id) => answers[id] === "evet").length;
    return {
      cat,
      evet,
      answered: answered.length,
      total: ids.length,
      ratio: answered.length ? evet / answered.length : 0,
    };
  });

  const totalEvet = perCategory.reduce((n, c) => n + c.evet, 0);
  const allDone = answeredCount === totalStatements;

  const ranked = [...perCategory]
    .filter((c) => c.answered > 0)
    .sort((a, b) => b.ratio - a.ratio);
  const strongest = ranked[0];
  const weakest = ranked[ranked.length - 1];

  const set = (id: string, val: Answer) =>
    setAnswers((prev) => ({ ...prev, [id]: val }));

  const reset = () => setAnswers({});

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <header className="mb-8">
        <h1 className="bg-gradient-to-r from-white to-emerald-300 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
          Öz-Değerlendirme 🪞
        </h1>
        <p className="mt-3 max-w-2xl text-white/60">
          Teknik olmayan ama kariyeri belirleyen{" "}
          <strong className="text-white/80">pasif yetenekler</strong> (soft
          skills): iletişim, çatışma çözme, code review, geri bildirim… Her
          ifadeyi dürüstçe <strong>Evet/Hayır</strong> diye işaretle; sonunda
          güçlü ve geliştirmen gereken yönleri gör. Bu bir sınav değil, bir
          ayna.
        </p>
      </header>

      {/* İlerleme */}
      <div className="mb-6 flex items-center gap-3 text-sm text-white/50">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-sky-400 transition-all"
            style={{ width: `${(answeredCount / totalStatements) * 100}%` }}
          />
        </div>
        <span className="font-mono">
          {answeredCount}/{totalStatements}
        </span>
      </div>

      {/* Sonuç paneli */}
      {answeredCount > 0 && (
        <section className="mb-8 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-5">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="text-lg font-bold text-white">
              Skor: {totalEvet}/{allDone ? totalStatements : answeredCount}
            </h2>
            {!allDone && (
              <span className="text-xs text-white/40">
                (cevapladıkça güncellenir)
              </span>
            )}
          </div>
          {strongest && (
            <p className="mt-2 text-sm text-white/70">
              💪 <strong>Güçlü:</strong> {strongest.cat.emoji}{" "}
              {strongest.cat.label}
            </p>
          )}
          {weakest && weakest !== strongest && (
            <div className="mt-1 text-sm text-white/70">
              <p>
                🎯 <strong>Geliştir:</strong> {weakest.cat.emoji}{" "}
                {weakest.cat.label}
              </p>
              <p className="mt-1 text-white/50">{weakest.cat.improveTip}</p>
            </div>
          )}
          <button
            onClick={reset}
            className="mt-3 rounded-lg border border-white/15 px-3 py-1.5 text-xs text-white/60 transition-colors hover:text-white"
          >
            Sıfırla
          </button>
        </section>
      )}

      {/* Kategoriler */}
      <div className="space-y-6">
        {perCategory.map(({ cat, evet, answered, total }) => (
          <section
            key={cat.id}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
          >
            <div className="mb-3 flex items-center justify-between gap-3">
              <h2 className="flex items-center gap-2 text-lg font-bold text-white">
                <span>{cat.emoji}</span>
                {cat.label}
                {cat.concept && (
                  <Link
                    href="/kavramlar"
                    className="text-xs font-normal text-emerald-400/70 hover:text-emerald-300"
                    title={`Sözlük: ${cat.concept}`}
                  >
                    ↗ sözlük
                  </Link>
                )}
              </h2>
              {answered > 0 && (
                <span className="font-mono text-xs text-white/40">
                  {evet}/{total}
                </span>
              )}
            </div>

            <ul className="space-y-2.5">
              {cat.statements.map((s) => {
                const val = answers[s.id];
                return (
                  <li
                    key={s.id}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-white/[0.02] px-3 py-2.5"
                  >
                    <span className="flex-1 text-sm text-white/80">
                      {s.text}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => set(s.id, "evet")}
                        className={`rounded-lg px-3 py-1 text-sm font-medium transition-colors ${
                          val === "evet"
                            ? "bg-emerald-500 text-black"
                            : "border border-white/15 text-white/60 hover:text-white"
                        }`}
                      >
                        Evet
                      </button>
                      <button
                        onClick={() => set(s.id, "hayir")}
                        className={`rounded-lg px-3 py-1 text-sm font-medium transition-colors ${
                          val === "hayir"
                            ? "bg-rose-500 text-black"
                            : "border border-white/15 text-white/60 hover:text-white"
                        }`}
                      >
                        Hayır
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>

      <p className="mt-8 text-center text-xs text-white/30">
        Sonuçlar yalnızca bu cihazda, tarayıcında hesaplanır — hiçbir yere
        gönderilmez.
      </p>
    </main>
  );
}
