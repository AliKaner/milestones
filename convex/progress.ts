import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";
import { requireUserId } from "./users";

/** Giriş yapan kullanıcının işaretli task id'leri (string olarak). */
export const getMine = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [] as string[];
    const rows = await ctx.db
      .query("completions")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();
    return rows.map((r) => r.taskId as string);
  },
});

/** Bir task'ı işaretle/kaldır. */
export const toggle = mutation({
  args: { taskId: v.id("tasks"), checked: v.boolean() },
  handler: async (ctx, { taskId, checked }) => {
    const userId = await requireUserId(ctx);
    const existing = await ctx.db
      .query("completions")
      .withIndex("by_user_task", (q) =>
        q.eq("userId", userId).eq("taskId", taskId)
      )
      .unique();
    if (checked && !existing) {
      await ctx.db.insert("completions", { userId, taskId });
    } else if (!checked && existing) {
      await ctx.db.delete(existing._id);
    }
  },
});

/**
 * localStorage'daki anonim ilerlemeyi Convex'e taşır.
 * Hem yeni format (taskId) hem eski format (stableKey: level.key:stepNo:taskNo) kabul edilir.
 */
export const syncLocal = mutation({
  args: {
    taskIds: v.optional(v.array(v.string())),
    stableKeys: v.optional(v.array(v.string())),
  },
  handler: async (ctx, { taskIds = [], stableKeys = [] }) => {
    const userId = await requireUserId(ctx);

    const toAdd = new Set<string>();

    // Geçerli task id'leri doğrula
    for (const id of taskIds) {
      const task = await ctx.db.get(id as any);
      if (task) toAdd.add(id);
    }

    // stableKey → taskId eşlemesi (eski format)
    if (stableKeys.length > 0) {
      const levels = await ctx.db.query("levels").collect();
      const steps = await ctx.db.query("steps").collect();
      const tasks = await ctx.db.query("tasks").collect();
      const byOrder = <T extends { order: number }>(arr: T[]) =>
        [...arr].sort((a, b) => a.order - b.order);
      const keyToId = new Map<string, string>();
      for (const level of levels) {
        const lvlSteps = byOrder(steps.filter((s) => s.levelId === level._id));
        lvlSteps.forEach((step, si) => {
          const stepTasks = byOrder(tasks.filter((t) => t.stepId === step._id));
          stepTasks.forEach((task, ti) => {
            keyToId.set(`${level.key}:${si}:${ti}`, task._id as string);
          });
        });
      }
      for (const k of stableKeys) {
        const id = keyToId.get(k);
        if (id) toAdd.add(id);
      }
    }

    // Mevcut olmayanları ekle
    const existing = await ctx.db
      .query("completions")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();
    const have = new Set(existing.map((r) => r.taskId as string));
    for (const id of toAdd) {
      if (!have.has(id)) {
        await ctx.db.insert("completions", { userId, taskId: id as any });
      }
    }
  },
});
