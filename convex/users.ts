import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";
import { QueryCtx, MutationCtx } from "./_generated/server";
import { Id } from "./_generated/dataModel";
import { paths } from "../app/data/steps";

export function computeUserTier({
  completedTaskIds,
  pathId,
  tracks,
  levels,
  steps,
  tasks,
}: {
  completedTaskIds: Set<string>;
  pathId: string;
  tracks: any[];
  levels: any[];
  steps: any[];
  tasks: any[];
}) {
  const path = paths.find((p) => p.id === pathId) ?? paths[0];
  if (!path) return "intern";

  const pathTracks = tracks.filter((t) => path.tracks.includes(t.key as any));
  const trackIds = new Set(pathTracks.map((t) => t._id));
  const pathLevels = levels.filter((l) => trackIds.has(l.trackId));

  const levelIds = new Set(pathLevels.map((l) => l._id));
  const pathSteps = steps.filter((s) => levelIds.has(s.levelId));
  const stepIds = new Set(pathSteps.map((s) => s._id));
  const pathTasks = tasks.filter((t) => stepIds.has(t.stepId));

  const isLevelCompleted = (levelId: string) => {
    const lvlSteps = pathSteps.filter((s) => s.levelId === levelId);
    if (lvlSteps.length === 0) return false;
    return lvlSteps.every((step) => {
      const stepTasks = pathTasks.filter((t) => t.stepId === step._id);
      if (stepTasks.length === 0) return false;
      return stepTasks.every((task) => completedTaskIds.has(task._id as string));
    });
  };

  const tierSequence = ["intern", "junior", "mid", "senior", "staff", "architect", "lead"];
  let currentTierIndex = 0;

  for (const tier of tierSequence) {
    const levelsInTier = pathLevels.filter((l) => l.tier === tier);
    if (levelsInTier.length > 0) {
      const allCompleted = levelsInTier.every((l) => isLevelCompleted(l._id));
      if (allCompleted) {
        currentTierIndex = Math.min(tierSequence.indexOf(tier) + 1, tierSequence.length - 1);
      } else {
        break;
      }
    }
  }

  return tierSequence[currentTierIndex];
}


/** Giriş yapan kullanıcının id'sini döner, yoksa hata fırlatır. */
export async function requireUserId(
  ctx: QueryCtx | MutationCtx
): Promise<Id<"users">> {
  const userId = await getAuthUserId(ctx);
  if (!userId) throw new Error("Bu işlem için giriş yapmalısın.");
  return userId;
}

/** Kullanıcının admin olduğunu doğrular. */
export async function requireAdmin(
  ctx: QueryCtx | MutationCtx
): Promise<Id<"users">> {
  const userId = await requireUserId(ctx);
  const user = await ctx.db.get(userId);
  if (!user || user.role !== "admin") {
    throw new Error("Bu işlem için admin yetkisi gerekiyor.");
  }
  return userId;
}

/** Header / user card için mevcut kullanıcı. */
export const me = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;
    const user = await ctx.db.get(userId);
    if (!user) return null;

    const completions = await ctx.db
      .query("completions")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();
    const completedTaskIds = new Set(completions.map((c) => c.taskId as string));

    const tracks = await ctx.db.query("tracks").collect();
    const levels = await ctx.db.query("levels").collect();
    const steps = await ctx.db.query("steps").collect();
    const tasks = await ctx.db.query("tasks").collect();

    const pathId = user.path ?? "fullstack";
    const tier = computeUserTier({
      completedTaskIds,
      pathId,
      tracks,
      levels,
      steps,
      tasks,
    });

    return {
      _id: user._id,
      username: user.username ?? user.email ?? "kullanıcı",
      points: user.points ?? 0,
      role: user.role ?? "user",
      path: user.path ?? null,
      tier,
    };
  },
});

/** Giriş yapan kullanıcının seçili kariyer yolunu (path) kaydeder. */
export const setMyPath = mutation({
  args: { path: v.string() },
  handler: async (ctx, { path }) => {
    const userId = await requireUserId(ctx);
    await ctx.db.patch(userId, { path });
  },
});

/**
 * Admin için kullanıcı listesi: kim hangi path'te, kaç puan, ne kadar ilerledi.
 * `completed` = işaretli görev (completions) sayısı.
 */
export const listForAdmin = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);
    const users = await ctx.db.query("users").collect();
    
    const completions = await ctx.db.query("completions").collect();
    const tracks = await ctx.db.query("tracks").collect();
    const levels = await ctx.db.query("levels").collect();
    const steps = await ctx.db.query("steps").collect();
    const tasks = await ctx.db.query("tasks").collect();

    const rows = users.map((u) => {
      const userCompletions = completions.filter((c) => c.userId === u._id);
      const completedTaskIds = new Set(userCompletions.map((c) => c.taskId as string));
      
      const pathId = u.path ?? "fullstack";
      const tier = computeUserTier({
        completedTaskIds,
        pathId,
        tracks,
        levels,
        steps,
        tasks,
      });

      return {
        _id: u._id,
        username: u.username ?? u.email ?? "kullanıcı",
        role: u.role ?? "user",
        points: u.points ?? 0,
        path: u.path ?? null,
        completed: userCompletions.length,
        tier,
      };
    });
    rows.sort((a, b) => b.points - a.points);
    return rows;
  },
});
