import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { requireAdmin } from "./users";

/**
 * Tüm yol haritasını iç içe (tracks → levels → steps → tasks) döner.
 * Her task'a, localStorage taşıması için stabil bir anahtar eklenir:
 *   `${level.key}:${stepSırası}:${taskSırası}`  (eski statik format ile uyumlu)
 */
export const getTree = query({
  args: {},
  handler: async (ctx) => {
    const tracks = await ctx.db.query("tracks").collect();
    tracks.sort((a, b) => a.order - b.order);
    const levels = await ctx.db.query("levels").collect();
    const steps = await ctx.db.query("steps").collect();
    const tasks = await ctx.db.query("tasks").collect();

    const byOrder = <T extends { order: number }>(arr: T[]) =>
      [...arr].sort((a, b) => a.order - b.order);

    return byOrder(tracks).map((track) => ({
      _id: track._id,
      key: track.key,
      label: track.label,
      emoji: track.emoji,
      description: track.description,
      levels: byOrder(levels.filter((l) => l.trackId === track._id)).map(
        (level) => ({
          _id: level._id,
          key: level.key,
          levelNo: level.levelNo,
          project: level.project,
          difficulty: level.difficulty,
          emoji: level.emoji,
          accent: level.accent,
          description: level.description,
          skills: level.skills,
          trackKey: track.key,
          steps: byOrder(steps.filter((s) => s.levelId === level._id)).map(
            (step, si) => ({
              _id: step._id,
              title: step.title,
              points: step.points,
              type: step.type,
              learn: step.learn,
              question: step.question ?? null,
              tasks: byOrder(tasks.filter((t) => t.stepId === step._id)).map(
                (task, ti) => ({
                  _id: task._id,
                  goal: task.goal,
                  tip: task.tip,
                  stableKey: `${level.key}:${si}:${ti}`,
                })
              ),
            })
          ),
        })
      ),
    }));
  },
});

// ─────────────────────────── ADMIN CRUD ───────────────────────────

export const createTrack = mutation({
  args: {
    key: v.string(),
    label: v.string(),
    emoji: v.string(),
    description: v.string(),
    order: v.number(),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    return await ctx.db.insert("tracks", args);
  },
});

export const updateTrack = mutation({
  args: {
    id: v.id("tracks"),
    label: v.optional(v.string()),
    emoji: v.optional(v.string()),
    description: v.optional(v.string()),
    order: v.optional(v.number()),
  },
  handler: async (ctx, { id, ...patch }) => {
    await requireAdmin(ctx);
    await ctx.db.patch(id, patch);
  },
});

export const createLevel = mutation({
  args: {
    trackId: v.id("tracks"),
    key: v.string(),
    levelNo: v.number(),
    project: v.string(),
    difficulty: v.string(),
    emoji: v.string(),
    accent: v.string(),
    description: v.string(),
    skills: v.array(v.string()),
    order: v.number(),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    return await ctx.db.insert("levels", args);
  },
});

export const updateLevel = mutation({
  args: {
    id: v.id("levels"),
    trackId: v.optional(v.id("tracks")),
    project: v.optional(v.string()),
    difficulty: v.optional(v.string()),
    emoji: v.optional(v.string()),
    accent: v.optional(v.string()),
    description: v.optional(v.string()),
    skills: v.optional(v.array(v.string())),
    order: v.optional(v.number()),
  },
  handler: async (ctx, { id, ...patch }) => {
    await requireAdmin(ctx);
    await ctx.db.patch(id, patch);
  },
});

export const createStep = mutation({
  args: {
    levelId: v.id("levels"),
    title: v.string(),
    order: v.number(),
    points: v.number(),
    type: v.string(),
    learn: v.array(v.string()),
    question: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    return await ctx.db.insert("steps", args);
  },
});

export const updateStep = mutation({
  args: {
    id: v.id("steps"),
    title: v.optional(v.string()),
    order: v.optional(v.number()),
    points: v.optional(v.number()),
    type: v.optional(v.string()),
    learn: v.optional(v.array(v.string())),
    question: v.optional(v.string()),
  },
  handler: async (ctx, { id, ...patch }) => {
    await requireAdmin(ctx);
    await ctx.db.patch(id, patch);
  },
});

export const createTask = mutation({
  args: {
    stepId: v.id("steps"),
    goal: v.string(),
    tip: v.string(),
    order: v.number(),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    return await ctx.db.insert("tasks", args);
  },
});

export const updateTask = mutation({
  args: {
    id: v.id("tasks"),
    goal: v.optional(v.string()),
    tip: v.optional(v.string()),
    order: v.optional(v.number()),
  },
  handler: async (ctx, { id, ...patch }) => {
    await requireAdmin(ctx);
    await ctx.db.patch(id, patch);
  },
});

/** Bir kaydı ve (gerekirse) altındaki çocukları siler. */
export const remove = mutation({
  args: {
    table: v.union(
      v.literal("tracks"),
      v.literal("levels"),
      v.literal("steps"),
      v.literal("tasks")
    ),
    id: v.string(),
  },
  handler: async (ctx, { table, id }) => {
    await requireAdmin(ctx);
    if (table === "tasks") {
      await ctx.db.delete(id as any);
      return;
    }
    if (table === "steps") {
      const tasks = await ctx.db
        .query("tasks")
        .withIndex("by_step", (q) => q.eq("stepId", id as any))
        .collect();
      for (const t of tasks) await ctx.db.delete(t._id);
      await ctx.db.delete(id as any);
      return;
    }
    if (table === "levels") {
      const steps = await ctx.db
        .query("steps")
        .withIndex("by_level", (q) => q.eq("levelId", id as any))
        .collect();
      for (const s of steps) {
        const tasks = await ctx.db
          .query("tasks")
          .withIndex("by_step", (q) => q.eq("stepId", s._id))
          .collect();
        for (const t of tasks) await ctx.db.delete(t._id);
        await ctx.db.delete(s._id);
      }
      await ctx.db.delete(id as any);
      return;
    }
    // tracks
    const levels = await ctx.db
      .query("levels")
      .withIndex("by_track", (q) => q.eq("trackId", id as any))
      .collect();
    for (const l of levels) {
      const steps = await ctx.db
        .query("steps")
        .withIndex("by_level", (q) => q.eq("levelId", l._id))
        .collect();
      for (const s of steps) {
        const tasks = await ctx.db
          .query("tasks")
          .withIndex("by_step", (q) => q.eq("stepId", s._id))
          .collect();
        for (const t of tasks) await ctx.db.delete(t._id);
        await ctx.db.delete(s._id);
      }
      await ctx.db.delete(l._id);
    }
    await ctx.db.delete(id as any);
  },
});
