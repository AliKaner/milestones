"use client";

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const inputCls =
  "w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/30 outline-none focus:border-white/30";

export default function ArticlesAdmin() {
  const list = useQuery(api.articles.listCustom);
  const add = useMutation(api.articles.add);
  const remove = useMutation(api.articles.remove);

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await add({
        title: title.trim(),
        url: url.trim(),
        description: description.trim() || undefined,
        tag: tag.trim() || undefined,
      });
      setTitle("");
      setUrl("");
      setDescription("");
      setTag("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Eklenemedi.");
    }
  };

  return (
    <div className="space-y-6">
      <form
        onSubmit={submit}
        className="space-y-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4"
      >
        <h2 className="font-semibold text-white">Makale / konu ekle</h2>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Başlık"
          className={inputCls}
        />
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://..."
          className={inputCls}
        />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Kısa açıklama (opsiyonel)"
          className={inputCls}
        />
        <input
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          placeholder="etiket (opsiyonel, örn. react)"
          className={inputCls}
        />
        {error && (
          <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={!title.trim() || !url.trim()}
          className="rounded-lg bg-gradient-to-r from-emerald-500 to-sky-500 px-4 py-2 text-sm font-semibold text-black disabled:opacity-50"
        >
          Ekle
        </button>
      </form>

      <div className="space-y-2">
        {list === undefined ? (
          <p className="animate-pulse text-white/50">Yükleniyor…</p>
        ) : list.length === 0 ? (
          <p className="text-white/50">Henüz eklenmiş makale yok.</p>
        ) : (
          list.map((a) => (
            <div
              key={a._id}
              className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3"
            >
              <div className="min-w-0">
                <a
                  href={a.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-white hover:underline"
                >
                  {a.title}
                </a>
                <p className="truncate text-xs text-white/40">{a.url}</p>
              </div>
              <button
                onClick={() =>
                  confirm("Makale silinsin mi?") && remove({ id: a._id })
                }
                className="shrink-0 rounded-lg px-3 py-1.5 text-sm text-red-300 hover:bg-red-500/10"
              >
                Sil
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
