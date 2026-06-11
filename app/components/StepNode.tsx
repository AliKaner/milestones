"use client";

import { useState } from "react";
import type { Step } from "../data/steps";
import { accents, type Accent } from "./accents";

type StepNodeProps = {
  step: Step;
  stepIndex: number;
  levelId: string;
  accent: Accent;
  isLast: boolean;
  locked: boolean;
  checkedTasks: Record<string, boolean>;
  onToggle: (taskKey: string) => void;
};

export default function StepNode({
  step,
  stepIndex,
  levelId,
  accent,
  isLast,
  locked,
  checkedTasks,
  onToggle,
}: StepNodeProps) {
  const c = accents[accent];
  const [openTips, setOpenTips] = useState<Record<number, boolean>>({});

  const taskKeys = step.tasks.map((_, i) => `${levelId}:${stepIndex}:${i}`);
  const doneCount = taskKeys.filter((k) => checkedTasks[k]).length;
  const allDone = doneCount === step.tasks.length;
  const started = doneCount > 0;

  const nodeState = allDone
    ? `${c.nodeDone} pulse-ring`
    : started
      ? c.nodeStarted
      : "bg-[#15151d] border-white/20 text-white/40";

  return (
    <div className={`relative flex gap-4 ${locked ? "opacity-50" : ""}`}>
      {/* Node + bağlantı çizgisi */}
      <div className="flex flex-col items-center">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors duration-300 ${nodeState}`}
        >
          {allDone ? "✓" : locked ? "🔒" : stepIndex + 1}
        </div>
        {!isLast && (
          <div
            className={`my-1.5 w-0.5 grow rounded-full transition-colors duration-500 ${
              allDone ? c.line : "bg-white/15"
            }`}
          />
        )}
      </div>

      {/* Kart */}
      <div
        className={`mb-6 flex-1 rounded-xl border p-4 transition-all duration-300 ${
          allDone ? c.card : "border-white/10 bg-white/[0.03]"
        }`}
      >
        <div className="flex items-center justify-between gap-3">
          <h4 className="text-base font-semibold text-white">{step.title}</h4>
          <span className="shrink-0 rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-mono text-white/70">
            {doneCount}/{step.tasks.length}
          </span>
        </div>

        <ul className="mt-3 space-y-2.5">
          {step.tasks.map((task, i) => {
            const key = `${levelId}:${stepIndex}:${i}`;
            const checked = !!checkedTasks[key];
            const tipOpen = !!openTips[i];
            return (
              <li key={key}>
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={checked}
                    disabled={locked}
                    onChange={() => onToggle(key)}
                    aria-label={task.goal}
                    className={`mt-0.5 h-5 w-5 shrink-0 accent-current ${c.text} ${
                      locked ? "cursor-not-allowed" : "cursor-pointer"
                    }`}
                  />
                  <div className="flex-1">
                    {/* HEDEF — ne yapılacağı, nasıl yapılacağı değil */}
                    <span
                      className={`text-sm transition-colors ${
                        checked ? "text-white/40 line-through" : "text-white/90"
                      }`}
                    >
                      {task.goal}
                    </span>

                    {/* İpucu butonu — junior takılırsa açar */}
                    <button
                      type="button"
                      disabled={locked}
                      onClick={() =>
                        setOpenTips((p) => ({ ...p, [i]: !p[i] }))
                      }
                      className={`ml-2 align-middle text-xs ${c.text} opacity-70 transition hover:opacity-100 ${
                        locked ? "cursor-not-allowed" : "cursor-pointer"
                      }`}
                    >
                      {tipOpen ? "ipucunu gizle" : "💡 ipucu"}
                    </button>

                    {tipOpen && (
                      <p className="mt-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70">
                        {task.tip}
                      </p>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
