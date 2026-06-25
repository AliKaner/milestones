"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { paths, tiers } from "../../data/steps";

const pathById = Object.fromEntries(paths.map((p) => [p.id, p]));

export default function UsersAdmin() {
  const users = useQuery(api.users.listForAdmin);

  if (users === undefined) {
    return <p className="animate-pulse text-white/50">Yükleniyor…</p>;
  }

  return (
    <div>
      <p className="mb-4 text-sm text-white/55">
        {users.length} kullanıcı · kim hangi kariyer yolunda, ne kadar ilerledi.
      </p>
      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-white/10 text-xs uppercase tracking-wide text-white/45">
            <tr>
              <th className="px-4 py-3">Kullanıcı</th>
              <th className="px-4 py-3">Kariyer yolu</th>
              <th className="px-4 py-3 text-right">Puan</th>
              <th className="px-4 py-3 text-right">Görev</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => {
              const p = u.path ? pathById[u.path] : null;
              return (
                <tr
                  key={u._id}
                  className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]"
                >
                  <td className="px-4 py-3">
                    <span className="font-medium text-white/90">
                      {u.username}
                    </span>
                    {(() => {
                      const userTier = u.tier ? tiers.find((t) => t.id === u.tier) : null;
                      return userTier ? (
                        <span className="ml-2 rounded-full bg-white/10 px-1.5 py-0.5 text-[10px] font-bold text-white/80">
                          {userTier.emoji} {userTier.label}
                        </span>
                      ) : null;
                    })()}
                    {u.role === "admin" && (
                      <span className="ml-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold text-amber-300">
                        admin
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {p ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs text-emerald-200">
                        <span>{p.emoji}</span>
                        {p.label}
                      </span>
                    ) : (
                      <span className="text-white/30">— seçmemiş</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-white/80">
                    {u.points}
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-white/60">
                    {u.completed}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
