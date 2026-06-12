"use client";

import { accents, type Accent } from "./accents";
import StepNode from "./StepNode";
import type { LevelData, StepData, SubmissionStatus } from "../lib/roadmap";

type LevelSectionProps = {
  level: LevelData;
  locked: boolean;
  isLoggedIn: boolean;
  isChecked: (taskId: string) => boolean;
  onToggle: (taskId: string) => void;
  submissionByStep: Record<
    string,
    { status: SubmissionStatus; reviewNote: string | null }
  >;
  onSubmitProof: (step: StepData) => void;
};

export default function LevelSection({
  level,
  locked,
  isLoggedIn,
  isChecked,
  onToggle,
  submissionByStep,
  onSubmitProof,
}: LevelSectionProps) {
  const c = accents[level.accent as Accent] ?? accents.emerald;

  let total = 0;
  let done = 0;
  level.steps.forEach((step) =>
    step.tasks.forEach((t) => {
      total += 1;
      if (isChecked(t._id)) done += 1;
    })
  );
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);
  const levelDone = total > 0 && done === total;
  const isBranch = level.trackKey === "branch";

  return (
    <section className="mb-4">
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
              {isBranch
                ? `DAL · ${level.difficulty}`
                : `SEVİYE ${level.levelNo} · ${level.difficulty}`}
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

        <div className="mt-4">
          <div className="mb-1.5 flex justify-between text-xs text-white/50">
            <span>{locked ? "🔒 Önce gerekli seviyeleri bitir" : "Bu seviye"}</span>
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

      <div className="mt-6 pl-2">
        {level.steps.map((step, si) => (
          <StepNode
            key={step._id}
            step={step}
            stepIndex={si}
            accent={(level.accent as Accent) ?? "emerald"}
            isLast={si === level.steps.length - 1}
            locked={locked}
            isLoggedIn={isLoggedIn}
            isChecked={isChecked}
            onToggle={onToggle}
            submission={submissionByStep[step._id]}
            onSubmitProof={() => onSubmitProof(step)}
          />
        ))}
      </div>

      <div className="flex justify-center">
        <div className="h-10 w-0.5 rounded-full bg-white/15" />
      </div>
    </section>
  );
}
