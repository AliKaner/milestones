import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";
import { requireUserId } from "./users";

const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // karışabilecekler (0/O, 1/I) hariç

function randomCode(len = 6): string {
  let s = "";
  for (let i = 0; i < len; i++) {
    s += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  }
  return s;
}

/** Yeni topluluk oluştur; oluşturan otomatik üye olur. Benzersiz kod üretir. */
export const create = mutation({
  args: { name: v.string() },
  handler: async (ctx, { name }) => {
    const userId = await requireUserId(ctx);
    if (name.trim().length < 2) throw new Error("Topluluk adı çok kısa.");

    let code = randomCode();
    for (let i = 0; i < 5; i++) {
      const clash = await ctx.db
        .query("communities")
        .withIndex("by_code", (q) => q.eq("code", code))
        .unique();
      if (!clash) break;
      code = randomCode();
    }

    const communityId = await ctx.db.insert("communities", {
      name: name.trim(),
      code,
      createdBy: userId,
      createdAt: Date.now(),
    });
    await ctx.db.insert("memberships", {
      userId,
      communityId,
      joinedAt: Date.now(),
    });
    return { communityId, code };
  },
});

/** Kod ile topluluğa katıl. */
export const join = mutation({
  args: { code: v.string() },
  handler: async (ctx, { code }) => {
    const userId = await requireUserId(ctx);
    const community = await ctx.db
      .query("communities")
      .withIndex("by_code", (q) => q.eq("code", code.trim().toUpperCase()))
      .unique();
    if (!community) throw new Error("Bu kodla bir topluluk bulunamadı.");

    const existing = await ctx.db
      .query("memberships")
      .withIndex("by_user_community", (q) =>
        q.eq("userId", userId).eq("communityId", community._id)
      )
      .unique();
    if (existing) return community._id; // zaten üye

    await ctx.db.insert("memberships", {
      userId,
      communityId: community._id,
      joinedAt: Date.now(),
    });
    return community._id;
  },
});

/** Topluluktan ayrıl. */
export const leave = mutation({
  args: { communityId: v.id("communities") },
  handler: async (ctx, { communityId }) => {
    const userId = await requireUserId(ctx);
    const membership = await ctx.db
      .query("memberships")
      .withIndex("by_user_community", (q) =>
        q.eq("userId", userId).eq("communityId", communityId)
      )
      .unique();
    if (membership) await ctx.db.delete(membership._id);
  },
});

/** Kullanıcının üye olduğu topluluklar (+ üye sayısı). */
export const mine = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];
    const memberships = await ctx.db
      .query("memberships")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();
    return Promise.all(
      memberships.map(async (m) => {
        const c = await ctx.db.get(m.communityId);
        const memberCount = (
          await ctx.db
            .query("memberships")
            .withIndex("by_community", (q) =>
              q.eq("communityId", m.communityId)
            )
            .collect()
        ).length;
        return {
          _id: m.communityId,
          name: c?.name ?? "(silinmiş)",
          code: c?.code ?? "",
          memberCount,
        };
      })
    );
  },
});

/** Tek bir topluluğun detayları (+ üyelik durumu). */
export const get = query({
  args: { communityId: v.id("communities") },
  handler: async (ctx, { communityId }) => {
    const userId = await getAuthUserId(ctx);
    const c = await ctx.db.get(communityId);
    if (!c) return null;
    const memberships = await ctx.db
      .query("memberships")
      .withIndex("by_community", (q) => q.eq("communityId", communityId))
      .collect();
    const isMember = userId
      ? memberships.some((m) => m.userId === userId)
      : false;
    return {
      _id: c._id,
      name: c.name,
      code: c.code,
      memberCount: memberships.length,
      isMember,
    };
  },
});
