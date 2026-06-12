"use client";

import { useEffect, useState } from "react";
import { useAction, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

type DevtoArticle = {
  id: number;
  title: string;
  url: string;
  description: string;
  author: string;
  coverImage: string | null;
  tags: string[];
  readingMinutes: number | null;
  reactions: number;
};

const TAGS = ["react", "javascript", "typescript", "webdev", "css", "nextjs", "node"];

export default function ArticlesPage() {
  const fetchDevto = useAction(api.articles.fetchDevto);
  const custom = useQuery(api.articles.listCustom);

  const [tag, setTag] = useState("react");
  const [articles, setArticles] = useState<DevtoArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetchDevto({ tag })
      .then((res) => {
        if (active) setArticles(res as DevtoArticle[]);
      })
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [tag, fetchDevto]);

  return (
    <main className="grid-bg min-h-screen">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white">📚 Makaleler</h1>
          <p className="mt-2 text-sm text-white/55">
            dev.to'dan güncel yazılım makaleleri + ekibimizin seçtikleri.
          </p>
        </header>

        {/* Admin/seçili makaleler */}
        {custom && custom.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-white/50">
              ⭐ Seçilmiş içerikler
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {custom.map((a) => (
                <a
                  key={a._id}
                  href={a.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 transition-colors hover:border-amber-500/40"
                >
                  <h3 className="font-semibold text-white">{a.title}</h3>
                  {a.description && (
                    <p className="mt-1 line-clamp-2 text-sm text-white/60">
                      {a.description}
                    </p>
                  )}
                  {a.tag && (
                    <span className="mt-2 inline-block rounded-md bg-white/10 px-2 py-0.5 text-xs text-white/60">
                      #{a.tag}
                    </span>
                  )}
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Etiket filtreleri */}
        <div className="mb-5 flex flex-wrap gap-2">
          {TAGS.map((t) => (
            <button
              key={t}
              onClick={() => setTag(t)}
              className={`rounded-lg border px-3 py-1.5 text-sm transition-colors ${
                tag === t
                  ? "border-sky-500/50 bg-sky-500/15 text-sky-200"
                  : "border-white/10 text-white/60 hover:text-white"
              }`}
            >
              #{t}
            </button>
          ))}
        </div>

        {/* dev.to makaleleri */}
        {loading ? (
          <p className="animate-pulse text-white/50">Makaleler yükleniyor…</p>
        ) : articles.length === 0 ? (
          <p className="text-white/50">Bu etiket için makale bulunamadı.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {articles.map((a) => (
              <a
                key={a.id}
                href={a.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] transition-colors hover:border-white/25"
              >
                {a.coverImage && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={a.coverImage}
                    alt=""
                    className="h-36 w-full object-cover"
                  />
                )}
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="font-semibold text-white">{a.title}</h3>
                  {a.description && (
                    <p className="mt-1 line-clamp-2 text-sm text-white/60">
                      {a.description}
                    </p>
                  )}
                  <div className="mt-auto flex items-center gap-3 pt-3 text-xs text-white/45">
                    <span>{a.author}</span>
                    {a.readingMinutes && <span>· {a.readingMinutes} dk</span>}
                    <span>· ❤ {a.reactions}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}

        <p className="mt-8 text-center text-xs text-white/30">
          Makaleler dev.to public API'sinden çekilir.
        </p>
      </div>
    </main>
  );
}
