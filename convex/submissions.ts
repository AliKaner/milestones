import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";
import { requireUserId, requireAdmin } from "./users";

/** Resim yüklemek için imzalı URL üretir. */
export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    await requireUserId(ctx);
    return await ctx.storage.generateUploadUrl();
  },
});

/**
 * Bir adım için kanıt gönderir (resim + metin).
 * Aynı adım için bekleyen/reddedilen kayıt varsa onu günceller (yeniden gönderim).
 * Onaylanmış kayıt varsa tekrar göndermeye izin vermez.
 */
export const create = mutation({
  args: {
    stepId: v.id("steps"),
    imageStorageId: v.id("_storage"),
    text: v.string(),
  },
  handler: async (ctx, { stepId, imageStorageId, text }) => {
    const userId = await requireUserId(ctx);
    if (text.trim().length < 3) {
      throw new Error("Lütfen kısa bir açıklama yaz.");
    }
    const existing = await ctx.db
      .query("submissions")
      .withIndex("by_user_step", (q) =>
        q.eq("userId", userId).eq("stepId", stepId)
      )
      .unique();

    if (existing) {
      if (existing.status === "approved") {
        throw new Error("Bu adım zaten onaylandı.");
      }
      await ctx.db.patch(existing._id, {
        imageStorageId,
        text,
        status: "pending",
        reviewNote: undefined,
        reviewedBy: undefined,
        reviewedAt: undefined,
        createdAt: Date.now(),
      });
      return existing._id;
    }

    return await ctx.db.insert("submissions", {
      userId,
      stepId,
      imageStorageId,
      text,
      status: "pending",
      createdAt: Date.now(),
    });
  },
});

/** Giriş yapan kullanıcının adım bazlı kanıt durumları. */
export const getMine = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];
    const rows = await ctx.db
      .query("submissions")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();
    return Promise.all(
      rows.map(async (r) => ({
        _id: r._id,
        stepId: r.stepId as string,
        status: r.status,
        text: r.text,
        reviewNote: r.reviewNote ?? null,
        imageUrl: await ctx.storage.getUrl(r.imageStorageId),
      }))
    );
  },
});

/** Admin: bekleyen kanıt kuyruğu. */
export const listPending = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);
    const rows = await ctx.db
      .query("submissions")
      .withIndex("by_status", (q) => q.eq("status", "pending"))
      .collect();
    rows.sort((a, b) => a.createdAt - b.createdAt);
    return Promise.all(
      rows.map(async (r) => {
        const user = await ctx.db.get(r.userId);
        const step = await ctx.db.get(r.stepId);
        const level = step ? await ctx.db.get(step.levelId) : null;
        return {
          _id: r._id,
          text: r.text,
          createdAt: r.createdAt,
          imageUrl: await ctx.storage.getUrl(r.imageStorageId),
          username: user?.username ?? user?.email ?? "kullanıcı",
          stepTitle: step?.title ?? "(silinmiş adım)",
          stepPoints: step?.points ?? 0,
          levelProject: level?.project ?? "",
        };
      })
    );
  },
});

/** Admin: bir kanıtı onayla/reddet (+ not). Onay puanı buradan yönetilir. */
export const review = mutation({
  args: {
    submissionId: v.id("submissions"),
    status: v.union(v.literal("approved"), v.literal("rejected")),
    note: v.optional(v.string()),
  },
  handler: async (ctx, { submissionId, status, note }) => {
    const adminId = await requireAdmin(ctx);
    const sub = await ctx.db.get(submissionId);
    if (!sub) throw new Error("Kanıt bulunamadı.");

    const step = await ctx.db.get(sub.stepId);
    const points = step?.points ?? 0;

    // Puan farkını hesapla
    const wasApproved = sub.status === "approved";
    const willApprove = status === "approved";
    if (wasApproved !== willApprove) {
      const user = await ctx.db.get(sub.userId);
      if (user) {
        const current = user.points ?? 0;
        const delta = willApprove ? points : -points;
        await ctx.db.patch(sub.userId, {
          points: Math.max(0, current + delta),
        });
      }
    }

    await ctx.db.patch(submissionId, {
      status,
      reviewNote: note,
      reviewedBy: adminId,
      reviewedAt: Date.now(),
    });
  },
});
