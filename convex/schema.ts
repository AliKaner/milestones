import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

/**
 * DevYol veri modeli.
 * - authTables: Convex Auth'un yönettiği oturum/hesap tabloları.
 * - users: Convex Auth'un users tablosunu genişletiyoruz (username, role, points).
 * - Yol haritası (tracks → levels → steps → tasks) admin tarafından düzenlenebilsin
 *   diye statik steps.ts yerine burada tutulur.
 */
export default defineSchema({
  ...authTables,

  users: defineTable({
    // Convex Auth varsayılan alanları:
    name: v.optional(v.string()),
    image: v.optional(v.string()),
    email: v.optional(v.string()),
    emailVerificationTime: v.optional(v.number()),
    phone: v.optional(v.string()),
    phoneVerificationTime: v.optional(v.number()),
    isAnonymous: v.optional(v.boolean()),
    // DevYol'a özel:
    username: v.optional(v.string()),
    role: v.optional(v.union(v.literal("admin"), v.literal("user"))),
    points: v.optional(v.number()),
  })
    .index("email", ["email"])
    .index("phone", ["phone"])
    .index("by_points", ["points"]),

  tracks: defineTable({
    key: v.string(), // "frontend" | "backend" | "branch"
    label: v.string(),
    emoji: v.string(),
    description: v.string(),
    order: v.number(),
  }).index("by_order", ["order"]),

  levels: defineTable({
    trackId: v.id("tracks"),
    key: v.string(), // "todo", "weather", ...
    levelNo: v.number(),
    project: v.string(),
    difficulty: v.string(),
    emoji: v.string(),
    accent: v.string(),
    description: v.string(),
    skills: v.array(v.string()),
    order: v.number(),
  })
    .index("by_track", ["trackId"])
    .index("by_order", ["order"]),

  steps: defineTable({
    levelId: v.id("levels"),
    title: v.string(),
    order: v.number(),
    points: v.number(),
    type: v.string(), // adım tipi/etiketi (admin düzenler)
    learn: v.array(v.string()), // concepts.ts term'leri
  }).index("by_level", ["levelId"]),

  tasks: defineTable({
    stepId: v.id("steps"),
    goal: v.string(),
    tip: v.string(),
    order: v.number(),
  }).index("by_step", ["stepId"]),

  // Kişisel ilerleme: bir kaydın varlığı = o task işaretli.
  completions: defineTable({
    userId: v.id("users"),
    taskId: v.id("tasks"),
  })
    .index("by_user", ["userId"])
    .index("by_user_task", ["userId", "taskId"]),

  // Adım kanıtları (resim + metin) ve review durumu.
  submissions: defineTable({
    userId: v.id("users"),
    stepId: v.id("steps"),
    imageStorageId: v.id("_storage"),
    text: v.string(),
    status: v.union(
      v.literal("pending"),
      v.literal("approved"),
      v.literal("rejected")
    ),
    reviewNote: v.optional(v.string()),
    reviewedBy: v.optional(v.id("users")),
    createdAt: v.number(),
    reviewedAt: v.optional(v.number()),
  })
    .index("by_status", ["status"])
    .index("by_user", ["userId"])
    .index("by_user_step", ["userId", "stepId"]),

  communities: defineTable({
    name: v.string(),
    code: v.string(),
    createdBy: v.id("users"),
    createdAt: v.number(),
  }).index("by_code", ["code"]),

  memberships: defineTable({
    userId: v.id("users"),
    communityId: v.id("communities"),
    joinedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_community", ["communityId"])
    .index("by_user_community", ["userId", "communityId"]),
});
