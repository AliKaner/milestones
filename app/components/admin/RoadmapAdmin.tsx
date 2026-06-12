"use client";

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import type { LevelData, StepData, TaskData } from "@/app/lib/roadmap";

const inputCls =
  "rounded-lg border border-white/15 bg-white/5 px-2.5 py-1.5 text-sm text-white placeholder-white/30 outline-none focus:border-white/30";
const btnCls =
  "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors disabled:opacity-50";

function EditableTask({ task }: { task: TaskData }) {
  const update = useMutation(api.roadmap.updateTask);
  const remove = useMutation(api.roadmap.remove);
  const [goal, setGoal] = useState(task.goal);
  const [tip, setTip] = useState(task.tip);
  const dirty = goal !== task.goal || tip !== task.tip;

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-white/10 bg-white/[0.02] p-2 sm:flex-row sm:items-center">
      <input
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        className={`${inputCls} flex-1`}
        placeholder="Hedef"
      />
      <input
        value={tip}
        onChange={(e) => setTip(e.target.value)}
        className={`${inputCls} flex-1`}
        placeholder="İpucu"
      />
      <div className="flex gap-1">
        <button
          disabled={!dirty}
          onClick={() => update({ id: task._id, goal, tip })}
          className={`${btnCls} bg-emerald-500/15 text-emerald-300`}
        >
          Kaydet
        </button>
        <button
          onClick={() =>
            confirm("Görev silinsin mi?") &&
            remove({ table: "tasks", id: task._id })
          }
          className={`${btnCls} text-red-300 hover:bg-red-500/10`}
        >
          Sil
        </button>
      </div>
    </div>
  );
}

function EditableStep({ step }: { step: StepData }) {
  const update = useMutation(api.roadmap.updateStep);
  const remove = useMutation(api.roadmap.remove);
  const createTask = useMutation(api.roadmap.createTask);
  const [title, setTitle] = useState(step.title);
  const [type, setType] = useState(step.type);
  const [points, setPoints] = useState(step.points);
  const [question, setQuestion] = useState(step.question ?? "");
  const dirty =
    title !== step.title ||
    type !== step.type ||
    points !== step.points ||
    question !== (step.question ?? "");

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
      <div className="flex flex-wrap items-center gap-2">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`${inputCls} min-w-[200px] flex-1`}
          placeholder="Adım başlığı"
        />
        <input
          value={type}
          onChange={(e) => setType(e.target.value)}
          className={`${inputCls} w-28`}
          placeholder="tip"
        />
        <input
          type="number"
          value={points}
          onChange={(e) => setPoints(Number(e.target.value))}
          className={`${inputCls} w-20`}
          placeholder="puan"
        />
        <button
          disabled={!dirty}
          onClick={() =>
            update({ id: step._id, title, type, points, question })
          }
          className={`${btnCls} bg-emerald-500/15 text-emerald-300`}
        >
          Kaydet
        </button>
        <button
          onClick={() =>
            confirm("Adım ve görevleri silinsin mi?") &&
            remove({ table: "steps", id: step._id })
          }
          className={`${btnCls} text-red-300 hover:bg-red-500/10`}
        >
          Sil
        </button>
      </div>

      <input
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className={`${inputCls} mt-2 w-full`}
        placeholder="Adım sonu sorusu (boş = soru yok)"
      />

      <div className="mt-2 space-y-2 pl-2">
        {step.tasks.map((t) => (
          <EditableTask key={t._id} task={t} />
        ))}
        <button
          onClick={() =>
            createTask({
              stepId: step._id,
              goal: "Yeni görev",
              tip: "",
              order: step.tasks.length,
            })
          }
          className={`${btnCls} border border-white/15 text-white/60 hover:text-white`}
        >
          + Görev ekle
        </button>
      </div>
    </div>
  );
}

function LevelBlock({ level }: { level: LevelData }) {
  const createStep = useMutation(api.roadmap.createStep);
  const remove = useMutation(api.roadmap.remove);
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-bold text-white">
          {level.emoji} {level.project}{" "}
          <span className="text-xs font-normal text-white/40">
            ({level.difficulty})
          </span>
        </h3>
        <button
          onClick={() =>
            confirm("Seviye, adımları ve görevleri silinsin mi?") &&
            remove({ table: "levels", id: level._id })
          }
          className={`${btnCls} text-red-300 hover:bg-red-500/10`}
        >
          Seviyeyi sil
        </button>
      </div>
      <div className="space-y-3">
        {level.steps.map((s) => (
          <EditableStep key={s._id} step={s} />
        ))}
        <button
          onClick={() =>
            createStep({
              levelId: level._id,
              title: "Yeni adım",
              order: level.steps.length,
              points: 30,
              type: "geliştirme",
              learn: [],
            })
          }
          className={`${btnCls} border border-white/15 text-white/60 hover:text-white`}
        >
          + Adım ekle
        </button>
      </div>
    </div>
  );
}

function AddLevel({ trackId }: { trackId: Id<"tracks"> }) {
  const createLevel = useMutation(api.roadmap.createLevel);
  const [open, setOpen] = useState(false);
  const [project, setProject] = useState("");
  const [key, setKey] = useState("");
  const [emoji, setEmoji] = useState("🧩");
  const [accent, setAccent] = useState("emerald");
  const [difficulty, setDifficulty] = useState("Orta");

  if (!open)
    return (
      <button
        onClick={() => setOpen(true)}
        className={`${btnCls} border border-white/15 text-white/60 hover:text-white`}
      >
        + Bu track'e seviye ekle
      </button>
    );

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-3">
      <input value={project} onChange={(e) => setProject(e.target.value)} placeholder="Proje adı" className={`${inputCls} flex-1`} />
      <input value={key} onChange={(e) => setKey(e.target.value)} placeholder="key (örn. todo)" className={`${inputCls} w-32`} />
      <input value={emoji} onChange={(e) => setEmoji(e.target.value)} placeholder="emoji" className={`${inputCls} w-16`} />
      <input value={accent} onChange={(e) => setAccent(e.target.value)} placeholder="accent" className={`${inputCls} w-24`} />
      <input value={difficulty} onChange={(e) => setDifficulty(e.target.value)} placeholder="zorluk" className={`${inputCls} w-24`} />
      <button
        disabled={!project || !key}
        onClick={async () => {
          await createLevel({
            trackId,
            key,
            levelNo: 99,
            project,
            difficulty,
            emoji,
            accent,
            description: "",
            skills: [],
            order: 99,
          });
          setOpen(false);
          setProject("");
          setKey("");
        }}
        className={`${btnCls} bg-emerald-500/15 text-emerald-300`}
      >
        Ekle
      </button>
      <button onClick={() => setOpen(false)} className={`${btnCls} text-white/50`}>
        İptal
      </button>
    </div>
  );
}

export default function RoadmapAdmin() {
  const tree = useQuery(api.roadmap.getTree);

  if (tree === undefined) {
    return <p className="animate-pulse text-white/50">Yükleniyor…</p>;
  }

  return (
    <div className="space-y-8">
      <p className="text-sm text-white/50">
        Adımların başlık / tip / puanlarını düzenle, görev ekle-çıkar, yeni
        seviye/adım oluştur. Değişiklikler anında frontend'e yansır.
      </p>
      {tree.map((track) => (
        <div key={track._id}>
          <h2 className="mb-3 text-lg font-bold uppercase tracking-wide text-white/90">
            {track.emoji} {track.label}
          </h2>
          <div className="space-y-4">
            {track.levels.map((level) => (
              <LevelBlock key={level._id} level={level} />
            ))}
            <AddLevel trackId={track._id} />
          </div>
        </div>
      ))}
    </div>
  );
}
