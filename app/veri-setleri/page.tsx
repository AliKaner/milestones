"use client";

import { useEffect, useState } from "react";

type Dataset = {
  dosya: string;
  ad: string;
  satir: number;
  temiz: boolean;
  not?: string;
  kullanim: string[];
  sutunlar: Record<string, string>;
};

type Manifest = {
  base: string;
  guncelleme: string;
  setler: Dataset[];
};

export default function DatasetsPage() {
  const [manifest, setManifest] = useState<Manifest | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/datasets/manifest.json")
      .then((r) => {
        if (!r.ok) throw new Error("manifest");
        return r.json();
      })
      .then((m: Manifest) => setManifest(m))
      .catch(() => setError(true));
  }, []);

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <header className="mb-8">
        <h1 className="bg-gradient-to-r from-white to-emerald-300 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
          Veri Setleri 🗃️
        </h1>
        <p className="mt-3 max-w-2xl text-white/60">
          Veri ödevlerinde kullanabileceğin, bizim sunduğumuz gerçek veri
          setleri. Doğrudan koddan çekebilirsin:{" "}
          <code className="rounded bg-white/10 px-1.5 py-0.5 text-emerald-300">
            pd.read_csv(&quot;/datasets/dosya.csv&quot;)
          </code>
          . Bazıları bilerek <strong>dağınık</strong> bırakıldı (temizlik alıştırması
          için).
        </p>
        <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/60">
          <strong className="text-white/80">Veri Mühendisi (DE)</strong> bu
          veriyi <em>akıtır ve temizler</em> ·{" "}
          <strong className="text-white/80">Veri Analisti (DA)</strong> geçmişi{" "}
          <em>raporlar</em> ·{" "}
          <strong className="text-white/80">Veri Bilimci (DS)</strong> geleceği{" "}
          <em>tahmin eder</em>. Aynı veri, üç farklı amaç.
        </div>
      </header>

      {error && (
        <p className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-300">
          Veri seti listesi yüklenemedi.
        </p>
      )}

      {!manifest && !error && (
        <p className="animate-pulse text-white/40">Yükleniyor…</p>
      )}

      <div className="space-y-5">
        {manifest?.setler.map((d) => (
          <article
            key={d.dosya}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <h2 className="text-lg font-bold text-white">{d.ad}</h2>
                <span
                  className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${
                    d.temiz
                      ? "bg-emerald-500/15 text-emerald-300"
                      : "bg-amber-500/15 text-amber-300"
                  }`}
                >
                  {d.temiz ? "temiz" : "dağınık"}
                </span>
                <span className="font-mono text-xs text-white/40">
                  {d.satir} satır
                </span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={`/datasets/${d.dosya}`}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-white/15 px-3 py-1.5 text-sm text-white/70 transition-colors hover:text-white"
                >
                  Görüntüle
                </a>
                <a
                  href={`/datasets/${d.dosya}`}
                  download
                  className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-1.5 text-sm font-medium text-emerald-300 transition-colors hover:bg-emerald-500/20"
                >
                  İndir
                </a>
              </div>
            </div>

            <p className="mt-2 font-mono text-xs text-white/40">{d.dosya}</p>

            {d.not && (
              <p className="mt-3 rounded-lg border border-amber-500/20 bg-amber-500/5 px-3 py-2 text-sm text-amber-200/80">
                ⚠️ {d.not}
              </p>
            )}

            <div className="mt-3 flex flex-wrap gap-1.5">
              {d.kullanim.map((k) => (
                <span
                  key={k}
                  className="rounded-full bg-white/5 px-2.5 py-0.5 text-xs text-white/50"
                >
                  {k}
                </span>
              ))}
            </div>

            <div className="mt-4 overflow-hidden rounded-lg border border-white/10">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-white/5 text-white/50">
                    <th className="px-3 py-1.5 font-medium">Sütun</th>
                    <th className="px-3 py-1.5 font-medium">Açıklama</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(d.sutunlar).map(([col, desc]) => (
                    <tr key={col} className="border-t border-white/5">
                      <td className="px-3 py-1.5 font-mono text-emerald-300/90">
                        {col}
                      </td>
                      <td className="px-3 py-1.5 text-white/60">{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
