"use client";

import { useMemo, type ReactNode } from "react";
import Link from "next/link";
import { useConvexAuth, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { paths, tiers, type TierId } from "../data/steps";
import type { RoadmapTree } from "../lib/roadmap";
import {
  CompassIcon,
  StarIcon,
  TrophyIcon,
  LayersIcon,
  CodeIcon,
  ServerIcon,
  CloudIcon,
  ChartIcon,
  FlaskIcon,
  CpuIcon,
  DatabaseIcon,
} from "../components/icons";

/** Her kariyer yolu için çizgi ikon. */
const PATH_ICON: Record<string, (p: { className?: string }) => ReactNode> = {
  fullstack: LayersIcon,
  frontend: CodeIcon,
  backend: ServerIcon,
  devops: CloudIcon,
  "data-engineering": DatabaseIcon,
  "data-science": ChartIcon,
  data: FlaskIcon,
  ai: CpuIcon,
};

const TIER_SEQUENCE: TierId[] = [
  "intern",
  "junior",
  "mid",
  "senior",
  "staff",
  "architect",
  "lead",
];

type PathStat = {
  pathId: string;
  label: string;
  totalTasks: number;
  doneTasks: number;
  totalLevels: number;
  doneLevels: number;
  earnedTierIndex: number; // -1 = henüz hiç tier hak edilmedi
};

/** Bir track'in (tree düğümü) tüm görevlerinden tamamlananları hesaplar. */
function computePathStat(
  pathId: string,
  tree: RoadmapTree,
  done: Set<string>
): PathStat {
  const path = paths.find((p) => p.id === pathId)!;
  const tracks = path.tracks
    .map((key) => tree.find((t) => t.key === key))
    .filter((t): t is RoadmapTree[number] => Boolean(t));

  const levels = tracks.flatMap((t) => t.levels);

  let totalTasks = 0;
  let doneTasks = 0;
  let doneLevels = 0;

  const levelComplete = (level: RoadmapTree[number]["levels"][number]) =>
    level.steps.length > 0 &&
    level.steps.every((s) => s.tasks.every((t) => done.has(t._id)));

  for (const level of levels) {
    for (const step of level.steps) {
      for (const task of step.tasks) {
        totalTasks += 1;
        if (done.has(task._id)) doneTasks += 1;
      }
    }
    if (levelComplete(level)) doneLevels += 1;
  }

  // Hak edilen kıdem: sırayla, bir tier'daki tüm seviyeler bittiyse bir üste geç.
  let earnedTierIndex = -1;
  for (let i = 0; i < TIER_SEQUENCE.length; i++) {
    const tierLevels = levels.filter((l) => (l.tier ?? "intern") === TIER_SEQUENCE[i]);
    if (tierLevels.length === 0) continue;
    if (tierLevels.every(levelComplete)) earnedTierIndex = i;
    else break;
  }

  return {
    pathId,
    label: path.label,
    totalTasks,
    doneTasks,
    totalLevels: levels.length,
    doneLevels,
    earnedTierIndex,
  };
}

export default function ProfilePage() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const me = useQuery(api.users.me, isAuthenticated ? {} : "skip");
  const tree = useQuery(api.roadmap.getTree);
  const completed = useQuery(api.progress.getMine, isAuthenticated ? {} : "skip");

  const doneSet = useMemo(() => new Set(completed ?? []), [completed]);

  const stats = useMemo<PathStat[]>(() => {
    if (!tree) return [];
    return paths.map((p) => computePathStat(p.id, tree, doneSet));
  }, [tree, doneSet]);

  if (isLoading || (isAuthenticated && me === undefined)) {
    return (
      <main className="grid-bg flex min-h-[60vh] items-center justify-center">
        <p className="animate-pulse text-white/50">Profil yükleniyor…</p>
      </main>
    );
  }

  if (!isAuthenticated || !me) {
    return (
      <main className="grid-bg flex min-h-[70vh] flex-col items-center justify-center gap-4 px-6 text-center">
        <CompassIcon className="h-14 w-14 text-emerald-400/80" />
        <h1 className="text-2xl font-bold text-white">Profilini görmek için giriş yap</h1>
        <p className="max-w-sm text-white/55">
          Giriş yaptığında her kariyer yolundaki ilerleyişini, kıdem rozetlerini ve
          kazandığın yıldızları burada görebilirsin.
        </p>
        <div className="mt-2 flex gap-3">
          <Link
            href="/giris"
            className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-5 py-2 text-sm font-medium text-emerald-300 hover:bg-emerald-500/20"
          >
            Giriş yap
          </Link>
          <Link
            href="/kayit"
            className="rounded-lg border border-white/15 px-5 py-2 text-sm text-white/70 hover:text-white"
          >
            Kayıt ol
          </Link>
        </div>
      </main>
    );
  }

  const activePath = paths.find((p) => p.id === (me.path ?? "fullstack"));
  const overallTier = tiers.find((t) => t.id === me.tier) ?? tiers[0];
  // Toplam yıldız: aktif yoldaki hak edilen kıdem sayısı (0..7)
  const activeStat = stats.find((s) => s.pathId === (me.path ?? "fullstack"));
  const earnedStars = (activeStat?.earnedTierIndex ?? -1) + 1;

  return (
    <main className="grid-bg min-h-screen">
      <div className="mx-auto max-w-3xl px-6 py-12">
        {/* ── Kimlik kartı ── */}
        <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-500/10 via-transparent to-sky-500/10 p-6 sm:p-8">
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="relative flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
            <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-sky-500 text-3xl font-bold text-black shadow-lg shadow-emerald-500/20">
              {me.username.charAt(0).toLocaleUpperCase("tr")}
            </span>
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl font-bold text-white">{me.username}</h1>
              <div className="mt-1.5 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                <span className={`tier-badge inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold ${tierBadgeClass(overallTier.id)}`}>
                  <TrophyIcon className="h-3.5 w-3.5" /> {overallTier.label}
                </span>
                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-xs font-bold text-emerald-300">
                  {me.points} puan
                </span>
                {activePath && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/70">
                    {(() => {
                      const Ic = PATH_ICON[activePath.id] ?? LayersIcon;
                      return <Ic className="h-3.5 w-3.5" />;
                    })()}
                    {activePath.label}
                  </span>
                )}
              </div>

              {/* Yıldız dizisi — kıdem atladıkça dolar */}
              <div className="mt-3 flex items-center justify-center gap-1 sm:justify-start">
                {TIER_SEQUENCE.map((t, i) => (
                  <StarIcon
                    key={t}
                    filled={i < earnedStars}
                    className={`h-5 w-5 transition-all ${
                      i < earnedStars ? "star-on text-amber-300" : "text-white/15"
                    }`}
                  />
                ))}
                <span className="ml-2 text-xs text-white/40">
                  {earnedStars}/{TIER_SEQUENCE.length} kıdem
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Yol bazlı ilerleyiş ── */}
        <div className="mt-8 mb-3 flex items-baseline justify-between">
          <h2 className="text-lg font-bold text-white">Kariyer Yollarındaki İlerleyişin</h2>
          <span className="text-xs text-white/40">{paths.length} yol</span>
        </div>

        <div className="flex flex-col gap-4">
          {stats.map((s) => (
            <PathProgressCard
              key={s.pathId}
              stat={s}
              isActive={s.pathId === (me.path ?? "fullstack")}
            />
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-white/40">
          Görevleri tamamladıkça yıldızların dolar, kıdemin yükselir. Devam et!
        </p>
      </div>
    </main>
  );
}

function tierBadgeClass(id: TierId): string {
  switch (id) {
    case "intern":
      return "border-slate-500/40 bg-slate-500/10 text-slate-200";
    case "junior":
      return "border-emerald-500/40 bg-emerald-500/10 text-emerald-200";
    case "mid":
      return "border-sky-500/40 bg-sky-500/10 text-sky-200";
    case "senior":
      return "border-violet-500/40 bg-violet-500/10 text-violet-200";
    case "staff":
      return "border-amber-500/40 bg-amber-500/10 text-amber-200";
    case "architect":
      return "border-rose-500/40 bg-rose-500/10 text-rose-200";
    case "lead":
      return "border-yellow-400/50 bg-yellow-400/10 text-yellow-200";
  }
}

function PathProgressCard({ stat, isActive }: { stat: PathStat; isActive: boolean }) {
  const percent =
    stat.totalTasks === 0 ? 0 : Math.round((stat.doneTasks / stat.totalTasks) * 100);
  const earnedTier =
    stat.earnedTierIndex >= 0 ? tiers.find((t) => t.id === TIER_SEQUENCE[stat.earnedTierIndex]) : null;
  const PathIcon = PATH_ICON[stat.pathId] ?? LayersIcon;

  return (
    <div
      className={`card-fade rounded-xl border p-5 transition-colors ${
        isActive
          ? "border-emerald-500/40 bg-emerald-500/5"
          : "border-white/10 bg-white/[0.03] hover:border-white/20"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className={`flex h-10 w-10 items-center justify-center rounded-lg border ${isActive ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300" : "border-white/10 bg-white/5 text-white/70"}`}>
            <PathIcon className="h-5 w-5" />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white">{stat.label}</span>
              {isActive && (
                <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-300">
                  Aktif
                </span>
              )}
            </div>
            <div className="mt-0.5 text-xs text-white/45">
              {stat.doneLevels}/{stat.totalLevels} proje · {stat.doneTasks}/{stat.totalTasks} görev
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="font-mono text-lg font-bold text-white">%{percent}</div>
          {earnedTier ? (
            <div className="flex items-center justify-end gap-1 text-[11px] font-medium text-amber-300">
              <TrophyIcon className="h-3 w-3" /> {earnedTier.label}
            </div>
          ) : (
            <div className="text-[11px] text-white/35">başlanmadı</div>
          )}
        </div>
      </div>

      {/* İlerleme çubuğu */}
      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-sky-400 transition-all duration-700"
          style={{ width: `${percent}%` }}
        />
      </div>

      {/* Kıdem basamakları — hak edilenler yıldızlı/parlak */}
      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        {TIER_SEQUENCE.map((t, i) => {
          const meta = tiers.find((x) => x.id === t)!;
          const earned = i <= stat.earnedTierIndex;
          return (
            <span
              key={t}
              title={meta.label}
              className={`flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[10px] font-medium transition-all ${
                earned
                  ? `tier-badge ${tierBadgeClass(t)}`
                  : "border-white/10 bg-white/[0.02] text-white/30"
              }`}
            >
              <StarIcon
                filled={earned}
                className={`h-3 w-3 ${earned ? "text-amber-300" : "text-white/20"}`}
              />
              <span>{meta.label}</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
