import { query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { QueryCtx, MutationCtx } from "./_generated/server";
import { Id } from "./_generated/dataModel";

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
    return {
      _id: user._id,
      username: user.username ?? user.email ?? "kullanıcı",
      points: user.points ?? 0,
      role: user.role ?? "user",
    };
  },
});
