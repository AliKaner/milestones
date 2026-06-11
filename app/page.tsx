"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { levels } from "./data/steps";
import ProgressBar from "./components/ProgressBar";
import LevelSection from "./components/LevelSection";

const STORAGE_KEY = "devyol-progress";

// Bir seviyedeki tüm görev anahtarlarını üretir
function levelTaskKeys(levelIndex: number): string[] {
  const lvl = levels[levelIndex];
  const keys: string[] = [];
  lvl.steps.forEach((step, si) =>
    step.tasks.forEach((_, ti) => keys.push(`${lvl.id}:${si}:${ti}`))
  );
  return keys;
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

  // Bir seviye, kendinden önceki seviye %100 bitmemişse kilitlidir.
  const isLevelLocked = (levelIndex: number) => {
    if (levelIndex === 0) return false;
    const prevKeys = levelTaskKeys(levelIndex - 1);
    return !prevKeys.every((k) => checkedTasks[k]);
  };

  return (
    <main className="min-h-screen grid-bg">
      <ProgressBar completed={completed} total={total} />

      <div className="mx-auto max-w-3xl px-6 py-12">
        <header className="mb-12 text-center">
          <span className="inline-block rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1 text-xs font-medium text-emerald-300">
            JUNIOR DEVELOPER YOL HARİTASI · 4 SEVİYE
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

        {levels.map((level, i) => (
          <LevelSection
            key={level.id}
            level={level}
            locked={isLevelLocked(i)}
            checkedTasks={checkedTasks}
            onToggle={toggle}
          />
        ))}

        <footer className="mt-6 text-center text-sm text-white/40">
          İlerlemen tarayıcında otomatik kaydedilir. İyi kodlamalar! ✨
        </footer>
      </div>
    </main>
  );
}
