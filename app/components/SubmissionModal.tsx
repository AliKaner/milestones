"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";

type Props = {
  stepId: Id<"steps">;
  stepTitle: string;
  stepPoints: number;
  /** Reddedilmiş bir gönderim varsa not gösterelim. */
  rejectedNote?: string | null;
  onClose: () => void;
};

export default function SubmissionModal({
  stepId,
  stepTitle,
  stepPoints,
  rejectedNote,
  onClose,
}: Props) {
  const generateUploadUrl = useMutation(api.submissions.generateUploadUrl);
  const createSubmission = useMutation(api.submissions.create);

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const pickFile = (f: File | null) => {
    setFile(f);
    setPreview(f ? URL.createObjectURL(f) : null);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!file) return setError("Lütfen bir ekran görüntüsü / resim ekle.");
    if (text.trim().length < 3) return setError("Lütfen kısa bir açıklama yaz.");
    setLoading(true);
    try {
      const uploadUrl = await generateUploadUrl();
      const res = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });
      const json = await res.json();
      if (!res.ok || !json.storageId) {
        throw new Error("Yükleme başarısız oldu.");
      }
      await createSubmission({
        stepId,
        imageStorageId: json.storageId as Id<"_storage">,
        text: text.trim(),
      });
      onClose();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Bir şeyler ters gitti."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
    >
      <div
        className="card-fade w-full max-w-md rounded-2xl border border-white/10 bg-[#15151d] p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-1 flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">Adımı tamamladım 🎉</h3>
          <button
            onClick={onClose}
            className="text-white/40 hover:text-white"
            aria-label="Kapat"
          >
            ✕
          </button>
        </div>
        <p className="mb-4 text-sm text-white/55">
          <span className="text-white/80">{stepTitle}</span> — kanıt gönder.
          Admin onaylayınca{" "}
          <span className="font-mono text-emerald-400">+{stepPoints} puan</span>{" "}
          kazanırsın.
        </p>

        {rejectedNote && (
          <p className="mb-4 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-sm text-amber-200">
            ⚠️ Önceki gönderimin reddedildi: {rejectedNote}
          </p>
        )}

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm text-white/70">
              Ekran görüntüsü / resim
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => pickFile(e.target.files?.[0] ?? null)}
              className="block w-full text-sm text-white/60 file:mr-3 file:rounded-lg file:border-0 file:bg-white/10 file:px-3 file:py-2 file:text-sm file:text-white hover:file:bg-white/20"
            />
            {preview && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={preview}
                alt="önizleme"
                className="mt-3 max-h-48 w-full rounded-lg border border-white/10 object-contain"
              />
            )}
          </div>
          <div>
            <label className="mb-1.5 block text-sm text-white/70">
              Açıklama
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={3}
              placeholder="Bu adımda ne yaptın? Kısaca anlat."
              className="w-full resize-none rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-white/30 outline-none transition focus:border-emerald-500/50 focus:bg-white/10"
            />
          </div>

          {error && (
            <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-gradient-to-r from-emerald-500 to-sky-500 px-4 py-2.5 text-sm font-semibold text-black transition hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Gönderiliyor…" : "Kanıtı gönder"}
          </button>
        </form>
      </div>
    </div>
  );
}
