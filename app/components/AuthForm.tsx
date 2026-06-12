"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthActions } from "@convex-dev/auth/react";
import Logo from "./Logo";

export default function AuthForm({ flow }: { flow: "signIn" | "signUp" }) {
  const { signIn } = useAuthActions();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const isSignUp = flow === "signUp";

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const fd = new FormData();
      // Username, Convex Auth'un hesap kimliği olan `email` alanına yazılır.
      fd.set("email", username.trim());
      fd.set("password", password);
      fd.set("flow", flow);
      await signIn("password", fd);
      router.push("/");
    } catch (err) {
      const msg =
        err instanceof Error && err.message ? err.message : String(err);
      // ConvexError mesajını ayıkla, yoksa genel mesaj göster
      const clean = msg.replace(/^.*ConvexError:\s*/i, "").split("\n")[0];
      setError(
        clean && clean.length < 120
          ? clean
          : isSignUp
            ? "Kayıt başarısız. Kullanıcı adı alınmış olabilir."
            : "Giriş başarısız. Kullanıcı adı veya şifre hatalı."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="grid-bg flex min-h-[70vh] items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <Logo size={44} />
          <h1 className="text-2xl font-bold text-white">
            {isSignUp ? "DevYol'a kayıt ol" : "Tekrar hoş geldin"}
          </h1>
          <p className="text-sm text-white/55">
            {isSignUp
              ? "İlerlemeni kaydet, puan topla, liderlik tablosuna gir."
              : "İlerlemene ve puanlarına kaldığın yerden devam et."}
          </p>
        </div>

        <form
          onSubmit={submit}
          className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6"
        >
          <div>
            <label className="mb-1.5 block text-sm text-white/70">
              Kullanıcı adı
            </label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              placeholder="örn. alikaner"
              className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-white/30 outline-none transition focus:border-emerald-500/50 focus:bg-white/10"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm text-white/70">Şifre</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={isSignUp ? "new-password" : "current-password"}
              placeholder="••••••••"
              className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-white/30 outline-none transition focus:border-emerald-500/50 focus:bg-white/10"
            />
          </div>

          {error && (
            <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !username || !password}
            className="w-full rounded-lg bg-gradient-to-r from-emerald-500 to-sky-500 px-4 py-2.5 text-sm font-semibold text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Lütfen bekle…"
              : isSignUp
                ? "Kayıt ol"
                : "Giriş yap"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-white/55">
          {isSignUp ? (
            <>
              Zaten hesabın var mı?{" "}
              <Link href="/giris" className="text-emerald-400 hover:underline">
                Giriş yap
              </Link>
            </>
          ) : (
            <>
              Hesabın yok mu?{" "}
              <Link href="/kayit" className="text-emerald-400 hover:underline">
                Kayıt ol
              </Link>
            </>
          )}
        </p>
      </div>
    </main>
  );
}
