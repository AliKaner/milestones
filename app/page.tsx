"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useConvexAuth, useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import LevelSection from "./components/LevelSection";
import SubmissionModal from "./components/SubmissionModal";
import Logo from "./components/Logo";
import { StarIcon, LockIcon } from "./components/icons";
import type { LevelData, StepData } from "./lib/roadmap";
import { paths, tiers, type TierId } from "./data/steps";

/** Tier ayracındaki dikey renk çubuğu — kıdem aksanına göre. */
const TIER_BAR: Record<string, string> = {
  intern: "bg-slate-400",
  junior: "bg-emerald-400",
  mid: "bg-sky-400",
  senior: "bg-violet-400",
  staff: "bg-amber-400",
  architect: "bg-rose-400",
  lead: "bg-yellow-400",
};

const LOCAL_V2 = "devyol-progress-v2"; // string[] taskId
const LOCAL_OLD = "devyol-progress"; // Record<stableKey, boolean>
const LOCAL_PATH = "devyol-path"; // seçili kariyer yolu (path id)

export default function Home() {
  const { isAuthenticated, isLoading: authLoading } = useConvexAuth();
  const tree = useQuery(api.roadmap.getTree);
  const serverCompleted = useQuery(
    api.progress.getMine,
    isAuthenticated ? {} : "skip"
  );
  const mySubs = useQuery(
    api.submissions.getMine,
    isAuthenticated ? {} : "skip"
  );
  const toggleServer = useMutation(api.progress.toggle);
  const syncLocal = useMutation(api.progress.syncLocal);
  const setMyPath = useMutation(api.users.setMyPath);
  const me = useQuery(api.users.me, isAuthenticated ? {} : "skip");
  const forumCounts = useQuery(api.forum.counts);

  const [localChecked, setLocalChecked] = useState<Set<string>>(new Set());
  const [modalStep, setModalStep] = useState<StepData | null>(null);
  const [pathId, setPathId] = useState<string>("fullstack");
  const migratedRef = useRef(false);

  // Seçili path'i localStorage'dan yükle
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_PATH);
    if (saved && paths.some((p) => p.id === saved)) setPathId(saved);
  }, []);

  const serverPathApplied = useRef(false);

  const selectPath = (id: string) => {
    setPathId(id);
    localStorage.setItem(LOCAL_PATH, id);
    if (isAuthenticated) void setMyPath({ path: id });
  };

  // Giriş yapan kullanıcının kayıtlı path'i varsa (bir kez) onu uygula.
  useEffect(() => {
    if (me?.path && !serverPathApplied.current) {
      serverPathApplied.current = true;
      setPathId(me.path);
    }
  }, [me]);

  const selectedPath = useMemo(
    () => paths.find((p) => p.id === pathId) ?? paths[0],
    [pathId]
  );

  // stableKey → taskId haritası (tree'den)
  const stableKeyToId = useMemo(() => {
    const m = new Map<string, string>();
    tree?.forEach((track) =>
      track.levels.forEach((level) =>
        level.steps.forEach((step) =>
          step.tasks.forEach((task) => m.set(task.stableKey, task._id))
        )
      )
    );
    return m;
  }, [tree]);

  // Anonim: localStorage'tan yükle (+ eski formatı taşı)
  useEffect(() => {
    if (isAuthenticated || !tree) return;
    try {
      const v2 = JSON.parse(localStorage.getItem(LOCAL_V2) ?? "[]") as string[];
      const set = new Set(v2);
      const oldRaw = localStorage.getItem(LOCAL_OLD);
      if (oldRaw) {
        const old = JSON.parse(oldRaw) as Record<string, boolean>;
        Object.entries(old).forEach(([k, v]) => {
          if (v) {
            const id = stableKeyToId.get(k);
            if (id) set.add(id);
          }
        });
        localStorage.removeItem(LOCAL_OLD);
        localStorage.setItem(LOCAL_V2, JSON.stringify([...set]));
      }
      setLocalChecked(set);
    } catch {
      /* yoksay */
    }
  }, [isAuthenticated, tree, stableKeyToId]);

  // Giriş yapınca: yerel ilerlemeyi sunucuya taşı (bir kez)
  useEffect(() => {
    if (!isAuthenticated || migratedRef.current) return;
    migratedRef.current = true;
    try {
      const v2 = JSON.parse(localStorage.getItem(LOCAL_V2) ?? "[]") as string[];
      const oldRaw = localStorage.getItem(LOCAL_OLD);
      const stableKeys: string[] = [];
      if (oldRaw) {
        const old = JSON.parse(oldRaw) as Record<string, boolean>;
        Object.entries(old).forEach(([k, v]) => v && stableKeys.push(k));
      }
      if (v2.length > 0 || stableKeys.length > 0) {
        void syncLocal({ taskIds: v2, stableKeys }).then(() => {
          localStorage.removeItem(LOCAL_V2);
          localStorage.removeItem(LOCAL_OLD);
        });
      }
    } catch {
      /* yoksay */
    }
  }, [isAuthenticated, syncLocal]);

  const checkedSet = useMemo(
    () => (isAuthenticated ? new Set(serverCompleted ?? []) : localChecked),
    [isAuthenticated, serverCompleted, localChecked]
  );

  const isChecked = (taskId: string) => checkedSet.has(taskId);

  const onToggle = (taskId: string) => {
    const next = !checkedSet.has(taskId);
    if (isAuthenticated) {
      void toggleServer({ taskId: taskId as Id<"tasks">, checked: next });
    } else {
      setLocalChecked((prev) => {
        const s = new Set(prev);
        if (next) s.add(taskId);
        else s.delete(taskId);
        localStorage.setItem(LOCAL_V2, JSON.stringify([...s]));
        return s;
      });
    }
  };

  const submissionByStep = useMemo(() => {
    const m: Record<string, { status: any; reviewNote: string | null }> = {};
    mySubs?.forEach((s) => {
      m[s.stepId] = { status: s.status, reviewNote: s.reviewNote };
    });
    return m;
  }, [mySubs]);

  // ── Path filtreleme ───────────────────────────────────────────
  // Seçili path'in track'lerini (o sırayla) tree'den topla.
  const visibleTracks = useMemo(() => {
    if (!tree) return [];
    return selectedPath.tracks
      .map((key) => tree.find((t) => t.key === key))
      .filter((t): t is NonNullable<typeof t> => Boolean(t));
  }, [tree, selectedPath]);

  // Kilit ve ilerleme, sadece seçili path'in seviyeleri üzerinden hesaplanır.
  const visibleLevels: LevelData[] = useMemo(() => {
    if (!tree) return [];
    const list = visibleTracks.flatMap((t) => t.levels);
    const tierSequence = ["intern", "junior", "mid", "senior", "staff", "architect", "lead"];
    return [...list].sort((a, b) => {
      const aTier = a.tier ?? "intern";
      const bTier = b.tier ?? "intern";
      const aIdx = tierSequence.indexOf(aTier);
      const bIdx = tierSequence.indexOf(bTier);
      if (aIdx !== bIdx) return aIdx - bIdx;
      // Keep original relative order for levels in the same tier
      return list.indexOf(a) - list.indexOf(b);
    });
  }, [tree, visibleTracks]);

  // ── İlerleme & kilit hesapları ────────────────────────────────
  const levelComplete = (level: LevelData) =>
    level.steps.length > 0 &&
    level.steps.every((s) => s.tasks.every((t) => checkedSet.has(t._id)));

  // Seçili path içinde, görüntülenen sırayla ardışık kilitleme:
  // bir seviye, kendinden önceki tüm seviyeler bitmeden açılmaz.
  const isLevelLocked = (level: LevelData) => {
    const idx = visibleLevels.findIndex((l) => l._id === level._id);
    return !visibleLevels.slice(0, idx).every(levelComplete);
  };

  // ── Earned tier & next tier calculations ──
  const { earnedTier, projectsLeft, nextTier } = useMemo(() => {
    const tierSequence = ["intern", "junior", "mid", "senior", "staff", "architect", "lead"];
    let earnedTierIndex = 0; // Intern by default
    
    for (let i = 0; i < tierSequence.length; i++) {
      const tierId = tierSequence[i];
      const levelsInTier = visibleLevels.filter((l) => (l.tier ?? "intern") === tierId);
      if (levelsInTier.length > 0) {
        const allCompleted = levelsInTier.every(levelComplete);
        if (allCompleted) {
          earnedTierIndex = Math.min(i + 1, tierSequence.length - 1);
        } else {
          break;
        }
      }
    }

    const earnedTierId = tierSequence[earnedTierIndex];
    const earnedTierMeta = tiers.find((t) => t.id === earnedTierId) ?? tiers[0];

    const nextTierId = tierSequence[earnedTierIndex]; // the one they are working on
    const nextTierLevels = visibleLevels.filter((l) => (l.tier ?? "intern") === nextTierId);
    const uncompletedNextLevels = nextTierLevels.filter((l) => !levelComplete(l));
    const nextTierMeta = tiers.find((t) => t.id === nextTierId) ?? tiers[0];

    return {
      earnedTier: earnedTierMeta,
      projectsLeft: uncompletedNextLevels.length,
      nextTier: nextTierMeta,
    };
  }, [visibleLevels, checkedSet]);

  const [activeTierId, setActiveTierId] = useState<string>("intern");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const tier = entry.target.getAttribute("data-tier");
            if (tier) {
              setActiveTierId(tier);
            }
          }
        });
      },
      {
        rootMargin: "-20% 0px -60% 0px",
      }
    );

    const sections = document.querySelectorAll(".tier-section");
    sections.forEach((s) => observer.observe(s));

    return () => {
      sections.forEach((s) => observer.unobserve(s));
    };
  }, [visibleLevels]);

  function getTierBgGradient(tierId: string) {
    switch (tierId) {
      case "intern":
        return "bg-[radial-gradient(ellipse_at_top,rgba(30,41,59,0.25),transparent_60%)]";
      case "junior":
        return "bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.12),transparent_60%)]";
      case "mid":
        return "bg-[radial-gradient(ellipse_at_top,rgba(14,165,233,0.12),transparent_60%)]";
      case "senior":
        return "bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.12),transparent_60%)]";
      case "staff":
        return "bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.12),transparent_60%)]";
      case "architect":
        return "bg-[radial-gradient(ellipse_at_top,rgba(244,63,94,0.12),transparent_60%)]";
      case "lead":
        return "bg-[radial-gradient(ellipse_at_top,rgba(234,179,8,0.12),transparent_60%)]";
      default:
        return "";
    }
  }

  const groupedLevels = useMemo(() => {
    const groups: Record<string, LevelData[]> = {};
    visibleLevels.forEach((level) => {
      const t = level.tier ?? "intern";
      if (!groups[t]) groups[t] = [];
      groups[t].push(level);
    });
    return groups;
  }, [visibleLevels]);

  const activeTiersInPath = useMemo(() => {
    const set = new Set<string>();
    visibleLevels.forEach((l) => set.add(l.tier ?? "intern"));
    return tiers.filter((t) => set.has(t.id));
  }, [visibleLevels]);

  const isTierLocked = (tierId: string) => {
    const levelsInTier = groupedLevels[tierId] ?? [];
    if (levelsInTier.length === 0) return false;
    return isLevelLocked(levelsInTier[0]);
  };

  const { total, completed } = useMemo(() => {
    let total = 0;
    let completed = 0;
    visibleLevels.forEach((l) =>
      l.steps.forEach((s) =>
        s.tasks.forEach((t) => {
          total += 1;
          if (checkedSet.has(t._id)) completed += 1;
        })
      )
    );
    return { total, completed };
  }, [visibleLevels, checkedSet]);

  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  const resetLocal = () => {
    if (confirm("Yerel ilerlemen sıfırlanacak. Emin misin?")) {
      localStorage.removeItem(LOCAL_V2);
      setLocalChecked(new Set());
    }
  };

  if (tree === undefined || authLoading) {
    return (
      <main className="grid-bg flex min-h-[60vh] items-center justify-center">
        <p className="animate-pulse text-white/50">Yol haritası yükleniyor…</p>
      </main>
    );
  }

  return (
    <main className="grid-bg min-h-screen">
      <div className={`fixed inset-0 -z-10 transition-all duration-1000 ${getTierBgGradient(activeTierId)}`} />
      <div className="mx-auto max-w-3xl px-6 py-12">
        <header className="mb-12 text-center">
          <div className="mb-6 flex items-center justify-center gap-2.5">
            <Logo size={34} />
            <span className="text-xl font-bold tracking-tight text-white">
              Mile<span className="text-emerald-400">stones</span>
            </span>
          </div>
          <span className="inline-block rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1 text-xs font-medium text-emerald-300">
            YAZILIM KARİYER YOL HARİTASI · {visibleTracks.length} TRACK ·{" "}
            {visibleLevels.length} PROJE
          </span>
          <h1 className="mt-4 bg-gradient-to-r from-white via-white to-emerald-300 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl">
            Sıfırdan Geliştiriciye 🚀
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-white/60">
            Her seviyede gerçek bir proje yap. Görevleri bitir, kanıtını gönder,
            onaylanınca puan kazan ve liderlik tablosuna yüksel.
          </p>

          {/* Kariyer yolu (path) seçici */}
          <div className="mx-auto mt-7 max-w-xl">
            <p className="mb-2 text-xs uppercase tracking-wide text-white/40">
              Kariyer yolunu seç
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {paths.map((p) => {
                const active = p.id === selectedPath.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => selectPath(p.id)}
                    className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                      active
                        ? "border-emerald-400/60 bg-emerald-500/15 text-emerald-200"
                        : "border-white/15 text-white/60 hover:border-white/30 hover:text-white/80"
                    }`}
                  >
                    <span className="mr-1">{p.emoji}</span>
                    {p.label}
                    {p.soon && (
                      <span className="ml-1.5 rounded-full bg-white/10 px-1.5 py-0.5 text-[10px] text-white/50">
                        yakında
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            <p className="mt-2.5 text-sm text-white/50">
              {selectedPath.description}
            </p>
          </div>

          {/* Genel ilerleme */}
          <div className="mx-auto mt-6 max-w-md">
            <div className="mb-1.5 flex justify-between text-xs text-white/50">
              <span>Genel ilerleme</span>
              <span className="font-mono text-emerald-400">
                {completed}/{total} · %{percent}
              </span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-sky-400 transition-all duration-500"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/kavramlar"
              className="rounded-lg border border-sky-500/40 bg-sky-500/10 px-4 py-2 text-sm font-medium text-sky-300 transition-colors hover:bg-sky-500/20"
            >
              📖 Kavram Sözlüğü
            </Link>
            <Link
              href="/liderlik"
              className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-4 py-2 text-sm font-medium text-amber-300 transition-colors hover:bg-amber-500/20"
            >
              🏆 Liderlik Tablosu
            </Link>
            {!isAuthenticated && (
              <button
                onClick={resetLocal}
                className="rounded-lg border border-white/15 px-4 py-2 text-sm text-white/60 transition-colors hover:border-red-500/40 hover:text-red-300"
              >
                İlerlemeyi sıfırla
              </button>
            )}
          </div>

          {!isAuthenticated && (
            <p className="mt-4 text-sm text-white/50">
              İlerlemen tarayıcında tutuluyor.{" "}
              <Link href="/kayit" className="text-emerald-400 hover:underline">
                Kayıt ol
              </Link>{" "}
              da buluta taşınsın, puan kazan.
            </p>
          )}
        </header>

        {/* Sticky Tier Banner */}
        <div className="sticky top-[57px] z-30 -mx-6 mb-8 border-b border-white/5 bg-[#0a0a0f]/80 px-6 py-2.5 backdrop-blur-md">
          <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-white/40">Görüntülenen Seviye:</span>
              {(() => {
                const currentTierMeta = tiers.find((t) => t.id === activeTierId);
                return currentTierMeta ? (
                  <span className="flex items-center gap-1 font-bold text-white">
                    <span>{currentTierMeta.emoji}</span> {currentTierMeta.label}
                  </span>
                ) : null;
              })()}
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="text-white/40">Ünvanın:</span>
                <span className="rounded-full bg-white/5 px-2 py-0.5 font-bold text-emerald-400">
                  {earnedTier.emoji} {earnedTier.label}
                </span>
              </div>
              {projectsLeft > 0 ? (
                <span className="text-white/50">
                  Bir sonraki seviyeye <strong className="font-bold text-white">{projectsLeft}</strong> proje kaldı
                </span>
              ) : (
                <span className="text-emerald-400 font-medium">🎉 Zirvedesin!</span>
              )}
            </div>
          </div>
        </div>

        {activeTiersInPath.map((tier) => {
          const levelsInTier = groupedLevels[tier.id] ?? [];
          const locked = isTierLocked(tier.id);
          return (
            <div
              key={tier.id}
              data-tier={tier.id}
              className="tier-section py-4"
            >
              {/* Tier ayracı: soldan yatay çizgi, sağda kıdem etiketi */}
              <div className="relative my-10 flex items-center gap-4">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-white/25" />
                <div className="flex items-center gap-2.5">
                  <div className="text-right leading-tight">
                    <div className="flex items-center justify-end gap-1.5 text-sm font-bold uppercase tracking-wider text-white">
                      {!locked && <StarIcon filled className="h-3.5 w-3.5 text-amber-300" />}
                      {tier.label}
                    </div>
                    <div className="mt-0.5 flex items-center justify-end gap-1 text-[11px] text-white/40">
                      {locked ? (
                        <>
                          <LockIcon className="h-3 w-3" /> Kilitli — önceki seviyeleri tamamla
                        </>
                      ) : (
                        <>Açık · {levelsInTier.length} Proje</>
                      )}
                    </div>
                  </div>
                  <span
                    className={`h-9 w-1 rounded-full ${TIER_BAR[tier.id] ?? "bg-white/30"} ${
                      locked ? "opacity-30" : ""
                    }`}
                  />
                </div>
              </div>

              {levelsInTier.map((level) => (
                <LevelSection
                  key={level._id}
                  level={level}
                  locked={isLevelLocked(level)}
                  isLoggedIn={isAuthenticated}
                  isChecked={isChecked}
                  onToggle={onToggle}
                  submissionByStep={submissionByStep}
                  onSubmitProof={(step) => setModalStep(step)}
                  forumCount={forumCounts?.[level._id] ?? 0}
                />
              ))}
            </div>
          );
        })}

        <footer className="mt-6 text-center text-sm text-white/40">
          {isAuthenticated
            ? "İlerlemen buluta kaydediliyor. İyi kodlamalar! ✨"
            : "İlerlemen tarayıcında otomatik kaydedilir. İyi kodlamalar! ✨"}
        </footer>
      </div>

      {modalStep && (
        <SubmissionModal
          stepId={modalStep._id as Id<"steps">}
          stepTitle={modalStep.title}
          stepPoints={modalStep.points}
          question={modalStep.question}
          rejectedNote={
            submissionByStep[modalStep._id]?.status === "rejected"
              ? submissionByStep[modalStep._id]?.reviewNote
              : null
          }
          onClose={() => setModalStep(null)}
        />
      )}
    </main>
  );
}
