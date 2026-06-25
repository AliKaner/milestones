import { query } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";
import { computeUserTier } from "./users";

/** Global liderlik tablosu — puana göre azalan. */
export const global = query({
  args: {},
  handler: async (ctx) => {
    const me = await getAuthUserId(ctx);
    const users = await ctx.db
      .query("users")
      .withIndex("by_points")
      .order("desc")
      .take(100);

    const completions = await ctx.db.query("completions").collect();
    const tracks = await ctx.db.query("tracks").collect();
    const levels = await ctx.db.query("levels").collect();
    const steps = await ctx.db.query("steps").collect();
    const tasks = await ctx.db.query("tasks").collect();

    return users.map((u, i) => {
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
        rank: i + 1,
        username: u.username ?? u.email ?? "kullanıcı",
        points: u.points ?? 0,
        isMe: me ? u._id === me : false,
        tier,
      };
    });
  },
});

/** Topluluk içi yarış — sadece üyeler, puana göre. */
export const community = query({
  args: { communityId: v.id("communities") },
  handler: async (ctx, { communityId }) => {
    const me = await getAuthUserId(ctx);
    const memberships = await ctx.db
      .query("memberships")
      .withIndex("by_community", (q) => q.eq("communityId", communityId))
      .collect();
    const members = await Promise.all(
      memberships.map((m) => ctx.db.get(m.userId))
    );

    const completions = await ctx.db.query("completions").collect();
    const tracks = await ctx.db.query("tracks").collect();
    const levels = await ctx.db.query("levels").collect();
    const steps = await ctx.db.query("steps").collect();
    const tasks = await ctx.db.query("tasks").collect();

    const rows = members
      .filter((u): u is NonNullable<typeof u> => u !== null)
      .map((u) => {
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
          points: u.points ?? 0,
          isMe: me ? u._id === me : false,
          tier,
        };
      })
      .sort((a, b) => b.points - a.points)
      .map((r, i) => ({ ...r, rank: i + 1 }));
    return rows;
  },
});
