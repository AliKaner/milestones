import { query } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

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
    return users.map((u, i) => ({
      _id: u._id,
      rank: i + 1,
      username: u.username ?? u.email ?? "kullanıcı",
      points: u.points ?? 0,
      isMe: me ? u._id === me : false,
    }));
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
    const rows = members
      .filter((u): u is NonNullable<typeof u> => u !== null)
      .map((u) => ({
        _id: u._id,
        username: u.username ?? u.email ?? "kullanıcı",
        points: u.points ?? 0,
        isMe: me ? u._id === me : false,
      }))
      .sort((a, b) => b.points - a.points)
      .map((r, i) => ({ ...r, rank: i + 1 }));
    return rows;
  },
});
