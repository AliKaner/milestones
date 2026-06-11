"use client";

import type { Level } from "../data/steps";
import { accents } from "./accents";
import StepNode from "./StepNode";

type LevelSectionProps = {
  level: Level;
  locked: boolean;
  checkedTasks: Record<string, boolean>;
  onToggle: (taskKey: string) => void;
};

export default function LevelSection({
  level,
  locked,
  checkedTasks,
  onToggle,
}: LevelSectionProps) {
  const c = accents[level.accent];

  // Bu seviyedeki toplam/biten görevleri hesapla
  let total = 0;
  let done = 0;
  level.steps.forEach((step, si) => {
    step.tasks.forEach((_, ti) => {
      total += 1;
      if (checkedTasks[`${level.id}:${si}:${ti}`]) done += 1;
    });
  });
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);
  const levelDone = done === total;

  return (
    <section className="mb-4">
      {/* Seviye başlığı */}
      <div
        className={`rounded-2xl border p-5 ring-1 ${
          levelDone ? c.card : "border-white/10 bg-white/[0.02]"
        } ${c.ring}`}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <span
              className={`inline-block rounded-full border px-3 py-1 text-xs font-bold ${c.badge}`}
            >
              {level.track === "branch"
                ? `DAL · ${level.difficulty}`
                : `SEVİYE ${level.level} · ${level.difficulty}`}
            </span>
            <h2 className="mt-3 flex items-center gap-2 text-2xl font-bold text-white">
              <span>{level.emoji}</span>
              {level.project}
            </h2>
            <p className="mt-1 max-w-xl text-sm text-white/60">
              {level.description}
            </p>
          </div>
          {levelDone && (
            <span className={`shrink-0 text-sm font-bold ${c.text}`}>
              Tamamlandı ✓
            </span>
          )}
        </div>

        {/* Kazanılacak yetkinlikler */}
        <div className="mt-4 flex flex-wrap gap-2">
          {level.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-md bg-white/5 px-2.5 py-1 text-xs text-white/70"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Seviye ilerleme çubuğu */}
        <div className="mt-4">
          <div className="mb-1.5 flex justify-between text-xs text-white/50">
            <span>{locked ? "🔒 Önceki seviyeyi bitir" : "Bu seviye"}</span>
            <span className="font-mono">
              {done}/{total} · %{percent}
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className={`h-full rounded-full bg-gradient-to-r ${c.bar} transition-all duration-500`}
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Adım node'ları */}
      <div className="mt-6 pl-2">
        {level.steps.map((step, si) => (
          <StepNode
            key={si}
            step={step}
            stepIndex={si}
            levelId={level.id}
            accent={level.accent}
            isLast={si === level.steps.length - 1}
            locked={locked}
            checkedTasks={checkedTasks}
            onToggle={onToggle}
          />
        ))}
      </div>

      {/* Seviyeler arası bağlantı */}
      <div className="flex justify-center">
        <div className="h-10 w-0.5 rounded-full bg-white/15" />
      </div>
    </section>
  );
}
