import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { requireUserId } from "./users";
import { getAuthUserId } from "@convex-dev/auth/server";

/** Bir level'in forum mesajları (eskiden yeniye), yazar adıyla birlikte. */
export const list = query({
  args: { levelId: v.id("levels") },
  handler: async (ctx, { levelId }) => {
    const posts = await ctx.db
      .query("forumPosts")
      .withIndex("by_level", (q) => q.eq("levelId", levelId))
      .collect();
    posts.sort((a, b) => a.createdAt - b.createdAt);

    const meId = await getAuthUserId(ctx);
    return await Promise.all(
      posts.map(async (p) => {
        const author = await ctx.db.get(p.userId);
        return {
          _id: p._id,
          body: p.body,
          createdAt: p.createdAt,
          authorName: author?.username ?? author?.email ?? "kullanıcı",
          mine: meId === p.userId,
        };
      })
    );
  },
});

/** Tüm levellerin mesaj sayısı: { [levelId]: count } (rozet için). */
export const counts = query({
  args: {},
  handler: async (ctx) => {
    const posts = await ctx.db.query("forumPosts").collect();
    const map: Record<string, number> = {};
    for (const p of posts) {
      map[p.levelId] = (map[p.levelId] ?? 0) + 1;
    }
    return map;
  },
});

/** Foruma mesaj ekler (giriş gerekli). */
export const add = mutation({
  args: { levelId: v.id("levels"), body: v.string() },
  handler: async (ctx, { levelId, body }) => {
    const userId = await requireUserId(ctx);
    const text = body.trim();
    if (!text) throw new Error("Mesaj boş olamaz.");
    if (text.length > 2000) throw new Error("Mesaj çok uzun (en fazla 2000 karakter).");
    return await ctx.db.insert("forumPosts", {
      levelId,
      userId,
      body: text,
      createdAt: Date.now(),
    });
  },
});

/** Mesajı siler — yalnızca sahibi veya admin. */
export const remove = mutation({
  args: { id: v.id("forumPosts") },
  handler: async (ctx, { id }) => {
    const userId = await requireUserId(ctx);
    const post = await ctx.db.get(id);
    if (!post) return;
    const me = await ctx.db.get(userId);
    if (post.userId !== userId && me?.role !== "admin") {
      throw new Error("Bu mesajı silme yetkin yok.");
    }
    await ctx.db.delete(id);
  },
});
