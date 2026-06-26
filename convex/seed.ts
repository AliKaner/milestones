import { internalMutation } from "./_generated/server";
import { levels as coreLevels, tracks as staticTracks } from "../app/data/steps";
import { extraLevels } from "../app/data/extraLevels";

/** Çekirdek + ek müfredat birlikte seed edilir. */
const staticLevels = [...coreLevels, ...extraLevels];

/** Adım tipini başlığa göre kabaca tahmin eder (admin sonradan düzenler). */
function guessType(title: string): string {
  const t = title.toLocaleLowerCase("tr");
  if (t.includes("kur") || t.includes("setup") || t.includes("başla"))
    return "kurulum";
  if (t.includes("deploy") || t.includes("yayın") || t.includes("yayınla"))
    return "yayın";
  if (t.includes("müşteri")) return "özellik";
  if (t.includes("cila") || t.includes("test")) return "kalite";
  return "geliştirme";
}

/**
 * Yol haritasını (app/data/steps.ts) Convex tablolarına yükler.
 * Çalıştır: `npx convex run seed:run`
 * Tekrar çalıştırılabilir: önce roadmap tablolarını temizler.
 */
export const run = internalMutation({
  args: {},
  handler: async (ctx) => {
    // Temizle (sadece roadmap; kullanıcı/ilerleme/kanıt verisine dokunma)
    for (const table of ["tasks", "steps", "levels", "tracks"] as const) {
      const rows = await ctx.db.query(table).collect();
      for (const r of rows) await ctx.db.delete(r._id);
    }

    const trackIdByKey = new Map<string, any>();
    for (let i = 0; i < staticTracks.length; i++) {
      const track = staticTracks[i];
      const id = await ctx.db.insert("tracks", {
        key: track.id,
        label: track.label,
        emoji: track.emoji,
        description: track.description,
        order: i,
      });
      trackIdByKey.set(track.id, id);
    }

    let levelOrder = 0;
    for (const level of staticLevels) {
      const trackId = trackIdByKey.get(level.track);
      if (!trackId) continue;
      const levelId = await ctx.db.insert("levels", {
        trackId,
        key: level.id,
        levelNo: level.level,
        project: level.project,
        difficulty: level.difficulty,
        emoji: level.emoji,
        accent: level.accent,
        description: level.description,
        skills: level.skills,
        order: levelOrder++,
        tier: level.tier ?? "intern",
      });

      const stepPoints = 20 + level.level * 10; // L1=30 ... L9=110
      for (let si = 0; si < level.steps.length; si++) {
        const step = level.steps[si];
        const stepId = await ctx.db.insert("steps", {
          levelId,
          title: step.title,
          order: si,
          points: stepPoints,
          type: guessType(step.title),
          learn: step.learn ?? [],
          question: step.question,
        });
        for (let ti = 0; ti < step.tasks.length; ti++) {
          const task = step.tasks[ti];
          await ctx.db.insert("tasks", {
            stepId,
            goal: task.goal,
            tip: task.tip,
            order: ti,
          });
        }
      }
    }

    const counts = {
      tracks: (await ctx.db.query("tracks").collect()).length,
      levels: (await ctx.db.query("levels").collect()).length,
      steps: (await ctx.db.query("steps").collect()).length,
      tasks: (await ctx.db.query("tasks").collect()).length,
    };
    return counts;
  },
});

/**
 * EK müfredatı (extraLevels) mevcut veriye DOKUNMADAN ekler.
 * - Çekirdek level'ları, kullanıcı ilerlemesini (completions) ve kanıtları KORUR;
 *   sadece extraLevels'i ekler/günceller.
 * - Idempotent: aynı key'e sahip bir ek level zaten varsa, önce onun
 *   step/task'larını silip yeniden yazar (id'ler değişir ama yalnızca ek
 *   içerikte; çekirdek görevlerin id'leri sabit kalır).
 * Çalıştır: `npx convex run seed:runExtra`
 */
export const runExtra = internalMutation({
  args: {},
  handler: async (ctx) => {
    const tracks = await ctx.db.query("tracks").collect();
    const trackIdByKey = new Map<string, any>();
    for (const t of tracks) trackIdByKey.set(t.key, t._id);

    const allLevels = await ctx.db.query("levels").collect();
    // Ek level'ların devam edeceği sıralama numarası (çakışmasın diye sona ekle).
    let levelOrder = allLevels.reduce((m, l) => Math.max(m, l.order), 0) + 1;

    const extraKeys = new Set(extraLevels.map((l) => l.id));

    // Önce: aynı key'li eski ek level varsa temizle (idempotent yeniden yazım).
    for (const lvl of allLevels) {
      if (!extraKeys.has(lvl.key)) continue;
      const steps = await ctx.db
        .query("steps")
        .withIndex("by_level", (q) => q.eq("levelId", lvl._id))
        .collect();
      for (const s of steps) {
        const tasks = await ctx.db
          .query("tasks")
          .withIndex("by_step", (q) => q.eq("stepId", s._id))
          .collect();
        for (const t of tasks) await ctx.db.delete(t._id);
        await ctx.db.delete(s._id);
      }
      await ctx.db.delete(lvl._id);
    }

    let added = 0;
    for (const level of extraLevels) {
      const trackId = trackIdByKey.get(level.track);
      if (!trackId) continue;
      const levelId = await ctx.db.insert("levels", {
        trackId,
        key: level.id,
        levelNo: level.level,
        project: level.project,
        difficulty: level.difficulty,
        emoji: level.emoji,
        accent: level.accent,
        description: level.description,
        skills: level.skills,
        order: levelOrder++,
        tier: level.tier ?? "intern",
      });

      const stepPoints = 20 + level.level * 10;
      for (let si = 0; si < level.steps.length; si++) {
        const step = level.steps[si];
        const stepId = await ctx.db.insert("steps", {
          levelId,
          title: step.title,
          order: si,
          points: stepPoints,
          type: guessType(step.title),
          learn: step.learn ?? [],
          question: step.question,
        });
        for (let ti = 0; ti < step.tasks.length; ti++) {
          const task = step.tasks[ti];
          await ctx.db.insert("tasks", {
            stepId,
            goal: task.goal,
            tip: task.tip,
            order: ti,
          });
        }
      }
      added++;
    }

    return { addedLevels: added };
  },
});
