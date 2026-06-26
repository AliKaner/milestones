"use client";

import { useEffect, useMemo, useState, type ComponentType } from "react";
import Link from "next/link";
import { softSkills } from "../data/softSkills";
import {
  MirrorIcon,
  MessageIcon,
  UsersIcon,
  SearchIcon,
  MessageSquareIcon,
  ClockIcon,
  SproutIcon,
  TrophyIcon,
  TargetIcon,
  TrendingUpIcon,
  RotateIcon,
  BookOpenIcon,
} from "../components/icons";

const STORAGE_KEY = "milestones-selfassessment-v1";

type IconType = ComponentType<{ className?: string }>;

/** Kategori → çizgi ikon (emoji yerine). */
const CAT_ICON: Record<string, IconType> = {
  iletisim: MessageIcon,
  catisma: UsersIcon,
  review: SearchIcon,
  "geri-bildirim": MessageSquareIcon,
  zaman: ClockIcon,
  sahiplenme: SproutIcon,
};

/** 4'lü sıklık ölçeği — 0..3. */
const SCALE = [
  { key: 0, label: "Hiç" },
  { key: 1, label: "Bazen" },
  { key: 2, label: "Çoğunlukla" },
  { key: 3, label: "Her zaman" },
] as const;

const MAX = 3;

/** Orana göre renk demeti (güçlü→zayıf). */
function band(ratio: number) {
  if (ratio >= 0.78)
    return { label: "Güçlü", text: "text-emerald-300", bar: "from-emerald-500 to-teal-400", ring: "border-emerald-500/30 bg-emerald-500/5" };
  if (ratio >= 0.55)
    return { label: "İyi", text: "text-sky-300", bar: "from-sky-500 to-cyan-400", ring: "border-sky-500/30 bg-sky-500/5" };
  if (ratio >= 0.33)
    return { label: "Gelişmekte", text: "text-amber-300", bar: "from-amber-500 to-orange-400", ring: "border-amber-500/30 bg-amber-500/5" };
  return { label: "Öncelik", text: "text-rose-300", bar: "from-rose-500 to-pink-400", ring: "border-rose-500/30 bg-rose-500/5" };
}

export default function SelfAssessmentPage() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [loaded, setLoaded] = useState(false);

  const totalStatements = useMemo(
    () => softSkills.reduce((n, c) => n + c.statements.length, 0),
    []
  );

  // localStorage'dan yükle
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setAnswers(JSON.parse(raw));
    } catch {
      /* yoksay */
    }
    setLoaded(true);
  }, []);

  // localStorage'a kaydet
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    } catch {
      /* yoksay */
    }
  }, [answers, loaded]);

  const answeredCount = Object.keys(answers).length;

  // Kategori bazlı skor (yalnızca cevaplananlar üzerinden).
  const perCategory = useMemo(
    () =>
      softSkills.map((cat) => {
        const ids = cat.statements.map((s) => s.id);
        const answered = ids.filter((id) => answers[id] !== undefined);
        const sum = answered.reduce((n, id) => n + answers[id], 0);
        const ratio = answered.length ? sum / (answered.length * MAX) : 0;
        return { cat, answered: answered.length, total: ids.length, sum, ratio };
      }),
    [answers]
  );

  const ranked = useMemo(
    () => perCategory.filter((c) => c.answered > 0).sort((a, b) => b.ratio - a.ratio),
    [perCategory]
  );
  const strongest = ranked[0];
  const focusAreas = ranked.slice(-2).reverse().filter((c) => c.ratio < 0.78);

  // Genel olgunluk: tüm cevaplanan ifadeler üzerinden.
  const overall = useMemo(() => {
    const vals = Object.values(answers);
    if (!vals.length) return 0;
    return vals.reduce((n, v) => n + v, 0) / (vals.length * MAX);
  }, [answers]);
  const overallPct = Math.round(overall * 100);
  const overallBand = band(overall);

  const set = (id: string, val: number) =>
    setAnswers((prev) => ({ ...prev, [id]: val }));

  const reset = () => {
    if (confirm("Tüm cevaplar silinsin mi?")) setAnswers({});
  };

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <header className="mb-8">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
            <MirrorIcon className="h-5 w-5" />
          </span>
          <h1 className="bg-gradient-to-r from-white to-emerald-300 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
            Öz-Değerlendirme
          </h1>
        </div>
        <p className="mt-3 max-w-2xl text-white/60">
          Teknik olmayan ama kariyeri belirleyen{" "}
          <strong className="text-white/80">pasif yetenekler</strong> (soft
          skills): iletişim, çatışma çözme, code review, geri bildirim… Her
          ifadenin sana ne sıklıkta uyduğunu dürüstçe işaretle; sonunda güçlü ve
          öncelik vermen gereken yönleri gör. Bu bir sınav değil, bir ayna.
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
        <section className={`card-fade mb-8 rounded-2xl border p-5 ${overallBand.ring}`}>
          {/* Genel olgunluk */}
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-wide text-white/40">
                Genel olgunluk
              </div>
              <div className="mt-0.5 flex items-baseline gap-2">
                <span className={`font-mono text-3xl font-bold ${overallBand.text}`}>
                  %{overallPct}
                </span>
                <span className={`text-sm font-semibold ${overallBand.text}`}>
                  {overallBand.label}
                </span>
              </div>
            </div>
            <button
              onClick={reset}
              className="flex items-center gap-1.5 rounded-lg border border-white/15 px-3 py-1.5 text-xs text-white/60 transition-colors hover:text-white"
            >
              <RotateIcon className="h-3.5 w-3.5" /> Sıfırla
            </button>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className={`h-full rounded-full bg-gradient-to-r ${overallBand.bar} transition-all duration-500`}
              style={{ width: `${overallPct}%` }}
            />
          </div>

          {/* Güçlü & öncelik */}
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {strongest && (
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-300">
                  <TrophyIcon className="h-3.5 w-3.5" /> En güçlü yönün
                </div>
                <div className="mt-1 flex items-center gap-1.5 text-sm font-medium text-white">
                  {(() => {
                    const Ic = CAT_ICON[strongest.cat.id] ?? MessageIcon;
                    return <Ic className="h-4 w-4 text-white/60" />;
                  })()}
                  {strongest.cat.label}
                </div>
              </div>
            )}
            {focusAreas[0] && (
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-300">
                  <TargetIcon className="h-3.5 w-3.5" /> Öncelikli gelişim
                </div>
                <div className="mt-1 flex items-center gap-1.5 text-sm font-medium text-white">
                  {(() => {
                    const Ic = CAT_ICON[focusAreas[0].cat.id] ?? MessageIcon;
                    return <Ic className="h-4 w-4 text-white/60" />;
                  })()}
                  {focusAreas[0].cat.label}
                </div>
              </div>
            )}
          </div>

          {/* Öncelik alanları için ipuçları */}
          {focusAreas.length > 0 && (
            <div className="mt-3 space-y-2">
              {focusAreas.map((c) => (
                <div
                  key={c.cat.id}
                  className="flex gap-2 rounded-lg bg-white/[0.03] p-3 text-sm text-white/70"
                >
                  <TrendingUpIcon className="mt-0.5 h-4 w-4 shrink-0 text-amber-300/80" />
                  <span>
                    <strong className="text-white/85">{c.cat.label}:</strong>{" "}
                    {c.cat.improveTip}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Kategori sıralaması */}
          <div className="mt-4 space-y-2">
            {ranked.map((c) => {
              const b = band(c.ratio);
              const Ic = CAT_ICON[c.cat.id] ?? MessageIcon;
              return (
                <div key={c.cat.id} className="flex items-center gap-3">
                  <Ic className="h-4 w-4 shrink-0 text-white/45" />
                  <span className="w-40 shrink-0 truncate text-xs text-white/70">
                    {c.cat.label}
                  </span>
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${b.bar}`}
                      style={{ width: `${Math.round(c.ratio * 100)}%` }}
                    />
                  </div>
                  <span className={`w-10 shrink-0 text-right font-mono text-xs ${b.text}`}>
                    %{Math.round(c.ratio * 100)}
                  </span>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Kategoriler */}
      <div className="space-y-6">
        {perCategory.map(({ cat, answered, total }) => {
          const Ic = CAT_ICON[cat.id] ?? MessageIcon;
          return (
            <section
              key={cat.id}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <h2 className="flex items-center gap-2 text-lg font-bold text-white">
                  <Ic className="h-5 w-5 text-emerald-300/90" />
                  {cat.label}
                  {cat.concept && (
                    <Link
                      href="/kavramlar"
                      className="flex items-center gap-1 text-xs font-normal text-emerald-400/70 hover:text-emerald-300"
                      title={`Sözlük: ${cat.concept}`}
                    >
                      <BookOpenIcon className="h-3.5 w-3.5" /> sözlük
                    </Link>
                  )}
                </h2>
                <span className="font-mono text-xs text-white/40">
                  {answered}/{total}
                </span>
              </div>

              <ul className="space-y-2.5">
                {cat.statements.map((s) => {
                  const val = answers[s.id];
                  return (
                    <li
                      key={s.id}
                      className="rounded-xl bg-white/[0.02] px-3 py-2.5"
                    >
                      <span className="text-sm text-white/80">{s.text}</span>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {SCALE.map((opt) => (
                          <button
                            key={opt.key}
                            onClick={() => set(s.id, opt.key)}
                            className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                              val === opt.key
                                ? "bg-emerald-500 text-black"
                                : "border border-white/15 text-white/55 hover:text-white"
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>

      <p className="mt-8 text-center text-xs text-white/30">
        Cevapların yalnızca bu cihazda, tarayıcında saklanır ve hesaplanır —
        hiçbir yere gönderilmez.
      </p>
    </main>
  );
}
