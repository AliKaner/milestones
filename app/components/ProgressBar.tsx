"use client";

type ProgressBarProps = {
  completed: number;
  total: number;
};

export default function ProgressBar({ completed, total }: ProgressBarProps) {
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="sticky top-0 z-30 backdrop-blur-md bg-[#0a0a0f]/80 border-b border-white/10">
      <div className="mx-auto max-w-3xl px-6 py-4">
        <div className="flex items-center justify-between mb-2 text-sm">
          <span className="font-medium text-white/80">İlerleme</span>
          <span className="font-mono text-emerald-400">
            {completed}/{total} görev · %{percent}
          </span>
        </div>
        <div className="h-3 w-full rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-green-400 to-teal-400 transition-all duration-500 ease-out"
            style={{ width: `${percent}%` }}
          />
        </div>
        {percent === 100 && (
          <p className="mt-2 text-center text-sm text-emerald-400 font-semibold">
            🎉 Tüm adımları tamamladın — artık bir geliştiricisin!
          </p>
        )}
      </div>
    </div>
  );
}
