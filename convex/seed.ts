import { internalMutation } from "./_generated/server";
import { levels as staticLevels, tracks as staticTracks } from "../app/data/steps";

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
