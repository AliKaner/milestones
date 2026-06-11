"use client";

import { useState } from "react";
import type { Step } from "../data/steps";
import { conceptByTerm } from "../data/concepts";
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
  const [openConcept, setOpenConcept] = useState<string | null>(null);

  const taskKeys = step.tasks.map((_, i) => `${levelId}:${stepIndex}:${i}`);
  const doneCount = taskKeys.filter((k) => checkedTasks[k]).length;
  const allDone = doneCount === step.tasks.length;
  const started = doneCount > 0;
  const learn = (step.learn ?? []).filter((t) => conceptByTerm[t]);

  const nodeState = allDone
    ? `${c.nodeDone} pulse-ring`
    : started
      ? c.nodeStarted
      : "bg-[#15151d] border-white/20 text-white/40";

  return (
    <div className={`relative flex gap-4 ${locked ? "opacity-50" : ""}`}>
      {/* Spine: node + dikey bağlantı çizgisi */}
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

      {/* İçerik: kart + yana dallanan kavramlar */}
      <div className="mb-6 flex-1">
        {/* Adım kartı */}
        <div
          className={`rounded-xl border p-4 transition-all duration-300 ${
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
                      <span
                        className={`text-sm transition-colors ${
                          checked ? "text-white/40 line-through" : "text-white/90"
                        }`}
                      >
                        {task.goal}
                      </span>
                      <button
                        type="button"
                        disabled={locked}
                        onClick={() => setOpenTips((p) => ({ ...p, [i]: !p[i] }))}
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

        {/* Yana dallanan kavram node'ları */}
        {learn.length > 0 && (
          <div className="mt-3 space-y-2">
            <p className="pl-7 text-[11px] font-medium uppercase tracking-wide text-white/35">
              ⤷ Bu adımda öğren
            </p>
            {learn.map((term) => {
              const concept = conceptByTerm[term];
              const open = openConcept === term;
              return (
                <div key={term} className="relative pl-7">
                  {/* Spine'dan dala uzanan dirsek bağlantı */}
                  <span className="pointer-events-none absolute left-1 top-4 h-px w-5 bg-white/20" />
                  <span
                    className={`pointer-events-none absolute left-1 top-1.5 h-2.5 w-2.5 rounded-full border ${
                      open ? `${c.line} border-transparent` : "border-white/30 bg-[#15151d]"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setOpenConcept(open ? null : term)}
                    className={`flex w-full items-center gap-2 rounded-lg border px-3 py-2 text-left text-sm transition-colors ${
                      open
                        ? `${c.card} ${c.text}`
                        : "border-white/10 bg-white/[0.03] text-white/80 hover:border-white/25"
                    }`}
                  >
                    <span className="font-semibold">🔎 {concept.term} nedir?</span>
                    <span className="ml-auto text-xs text-white/40">
                      {open ? "kapat ▲" : "aç ▼"}
                    </span>
                  </button>
                  {open && (
                    <div className="card-fade mt-1.5 rounded-lg border border-white/10 bg-white/[0.04] p-4">
                      <p className="text-sm font-medium text-white/90">
                        {concept.short}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-white/65">
                        {concept.body}
                      </p>
                      {concept.analogy && (
                        <p className="mt-3 rounded-lg border border-sky-500/20 bg-sky-500/5 px-3 py-2 text-xs text-sky-200">
                          🔍 {concept.analogy}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
