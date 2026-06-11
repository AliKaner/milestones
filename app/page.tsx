"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { levels, tracks, type Level } from "./data/steps";
import ProgressBar from "./components/ProgressBar";
import LevelSection from "./components/LevelSection";

const STORAGE_KEY = "devyol-progress";

// Bir seviyenin tüm görevleri tamamlandı mı?
function isLevelComplete(
  level: Level,
  checkedTasks: Record<string, boolean>
): boolean {
  return level.steps.every((step, si) =>
    step.tasks.every((_, ti) => checkedTasks[`${level.id}:${si}:${ti}`])
  );
}

export default function Home() {
  const [checkedTasks, setCheckedTasks] = useState<Record<string, boolean>>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setCheckedTasks(JSON.parse(raw));
    } catch {
      /* sessizce geç */
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(checkedTasks));
    }
  }, [checkedTasks, loaded]);

  const toggle = (taskKey: string) =>
    setCheckedTasks((prev) => ({ ...prev, [taskKey]: !prev[taskKey] }));

  const reset = () => {
    if (confirm("Tüm ilerlemen sıfırlanacak. Emin misin?")) {
      setCheckedTasks({});
    }
  };

  const { total, completed } = useMemo(() => {
    const total = levels.reduce(
      (acc, l) =>
        acc + l.steps.reduce((a, s) => a + s.tasks.length, 0),
      0
    );
    const completed = Object.values(checkedTasks).filter(Boolean).length;
    return { total, completed };
  }, [checkedTasks]);

  // Ana yol (frontend + backend) bittiğinde tüm dallar açılır.
  const allCoreDone = useMemo(
    () =>
      levels
        .filter((l) => l.track !== "branch")
        .every((l) => isLevelComplete(l, checkedTasks)),
    [checkedTasks]
  );

  // Kilitleme:
  //  - Ana yol seviyeleri ardışıktır (önceki ana seviye bitmeden açılmaz).
  //  - Dallar ise ana yol tamamen bitince hep birlikte açılır; aralarında sıra yoktur.
  const isLevelLocked = (level: Level) => {
    if (level.track === "branch") return !allCoreDone;
    const idx = levels.indexOf(level);
    return !levels
      .slice(0, idx)
      .filter((l) => l.track !== "branch")
      .every((l) => isLevelComplete(l, checkedTasks));
  };

  return (
    <main className="min-h-screen grid-bg">
      <ProgressBar completed={completed} total={total} />

      <div className="mx-auto max-w-3xl px-6 py-12">
        <header className="mb-12 text-center">
          {/* Logo kilidi */}
          <div className="mb-6 flex items-center justify-center gap-2.5">
            <svg
              width="34"
              height="34"
              viewBox="0 0 32 32"
              fill="none"
              aria-hidden="true"
            >
              <rect width="32" height="32" rx="8" fill="#15151d" />
              <path
                d="M8 24 L16 16 L24 8"
                stroke="url(#logoGrad)"
                strokeWidth="2.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="8" cy="24" r="3.25" fill="#15151d" stroke="url(#logoGrad)" strokeWidth="2.25" />
              <circle cx="16" cy="16" r="3.25" fill="#15151d" stroke="url(#logoGrad)" strokeWidth="2.25" />
              <circle cx="24" cy="8" r="3.5" fill="url(#logoGrad)" />
              <defs>
                <linearGradient id="logoGrad" x1="6" y1="26" x2="26" y2="6" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#34d399" />
                  <stop offset="1" stopColor="#38bdf8" />
                </linearGradient>
              </defs>
            </svg>
            <span className="text-xl font-bold tracking-tight text-white">
              Dev<span className="text-emerald-400">Yol</span>
            </span>
          </div>
          <span className="inline-block rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1 text-xs font-medium text-emerald-300">
            JUNIOR DEVELOPER YOL HARİTASI · {tracks.length} TRACK · {levels.length} PROJE
          </span>
          <h1 className="mt-4 bg-gradient-to-r from-white via-white to-emerald-300 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl">
            Sıfırdan Geliştiriciye 🚀
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-white/60">
            Her seviyede gerçek bir proje yap. Görevler sana ne yapacağını
            söyler, <span className="text-white/80">nasıl yapacağını</span> sen
            araştırırsın — takılırsan 💡 ipucu butonuna bas. Bir seviyeyi
            bitirince sıradaki açılır.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/kavramlar"
              className="rounded-lg border border-sky-500/40 bg-sky-500/10 px-4 py-2 text-sm font-medium text-sky-300 transition-colors hover:bg-sky-500/20"
            >
              📖 Kavram Sözlüğü — bundler, hook, CRUD, API nedir?
            </Link>
            <button
              onClick={reset}
              className="rounded-lg border border-white/15 px-4 py-2 text-sm text-white/60 transition-colors hover:border-red-500/40 hover:text-red-300"
            >
              İlerlemeyi sıfırla
            </button>
          </div>
        </header>

        {tracks.map((track) => {
          const trackLevels = levels.filter((l) => l.track === track.id);
          if (trackLevels.length === 0) return null;
          const locked = track.id === "branch" && !allCoreDone;
          return (
            <div key={track.id}>
              {/* Track (milestone tipi) başlığı */}
              <div className="mb-5 mt-2 flex items-center gap-3">
                <span className="text-2xl">{track.emoji}</span>
                <div>
                  <h2 className="flex items-center gap-2 text-lg font-bold uppercase tracking-wide text-white/90">
                    {track.label}
                    {locked && <span className="text-sm">🔒</span>}
                  </h2>
                  <p className="text-xs text-white/50">{track.description}</p>
                </div>
              </div>

              {trackLevels.map((level) => (
                <LevelSection
                  key={level.id}
                  level={level}
                  locked={isLevelLocked(level)}
                  checkedTasks={checkedTasks}
                  onToggle={toggle}
                />
              ))}
            </div>
          );
        })}

        <footer className="mt-6 text-center text-sm text-white/40">
          İlerlemen tarayıcında otomatik kaydedilir. İyi kodlamalar! ✨
        </footer>
      </div>
    </main>
  );
}
