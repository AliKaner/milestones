import { action, query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { requireAdmin } from "./users";

/** dev.to public API'sinden güncel yazılım makalelerini çeker (anahtar gerekmez). */
export const fetchDevto = action({
  args: { tag: v.optional(v.string()) },
  handler: async (_ctx, { tag }) => {
    const url = `https://dev.to/api/articles?per_page=24${
      tag ? `&tag=${encodeURIComponent(tag)}` : ""
    }`;
    try {
      const res = await fetch(url);
      if (!res.ok) return [];
      const data = (await res.json()) as any[];
      return data.map((a) => ({
        id: a.id as number,
        title: a.title as string,
        url: a.url as string,
        description: (a.description ?? "") as string,
        author: (a.user?.name ?? "") as string,
        coverImage: (a.cover_image ?? null) as string | null,
        tags: (a.tag_list ?? []) as string[],
        readingMinutes: (a.reading_time_minutes ?? null) as number | null,
        reactions: (a.public_reactions_count ?? 0) as number,
      }));
    } catch {
      return [];
    }
  },
});

/** Admin'in eklediği makaleler. */
export const listCustom = query({
  args: {},
  handler: async (ctx) => {
    const rows = await ctx.db
      .query("articles")
      .withIndex("by_created")
      .order("desc")
      .collect();
    return rows.map((r) => ({
      _id: r._id,
      title: r.title,
      url: r.url,
      description: r.description ?? "",
      tag: r.tag ?? null,
    }));
  },
});

export const add = mutation({
  args: {
    title: v.string(),
    url: v.string(),
    description: v.optional(v.string()),
    tag: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await requireAdmin(ctx);
    if (!/^https?:\/\//.test(args.url)) {
      throw new Error("Geçerli bir URL gir (http/https).");
    }
    return await ctx.db.insert("articles", {
      ...args,
      createdBy: userId,
      createdAt: Date.now(),
    });
  },
});

export const remove = mutation({
  args: { id: v.id("articles") },
  handler: async (ctx, { id }) => {
    await requireAdmin(ctx);
    await ctx.db.delete(id);
  },
});
