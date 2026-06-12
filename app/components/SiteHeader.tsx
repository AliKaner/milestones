"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { api } from "@/convex/_generated/api";
import Logo from "./Logo";

const navLinks = [
  { href: "/", label: "Yol Haritası" },
  { href: "/kavramlar", label: "Sözlük" },
  { href: "/makaleler", label: "Makaleler" },
  { href: "/liderlik", label: "Liderlik" },
  { href: "/topluluklar", label: "Topluluklar" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const me = useQuery(api.users.me);
  const { signOut } = useAuthActions();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0a0a0f]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
        <Link href="/" className="flex items-center gap-2">
          <Logo size={30} />
          <span className="text-lg font-bold tracking-tight text-white">
            Dev<span className="text-emerald-400">Yol</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${
                isActive(l.href)
                  ? "bg-white/10 text-white"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {l.label}
            </Link>
          ))}
          {me?.role === "admin" && (
            <Link
              href="/admin"
              className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${
                isActive("/admin")
                  ? "bg-amber-500/15 text-amber-300"
                  : "text-amber-300/70 hover:text-amber-300"
              }`}
            >
              ⚙️ Admin
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-2">
          {me === undefined ? (
            <div className="h-9 w-24 animate-pulse rounded-lg bg-white/5" />
          ) : me ? (
            <>
              <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-sky-500 text-xs font-bold text-black">
                  {me.username.charAt(0).toLocaleUpperCase("tr")}
                </span>
                <div className="leading-tight">
                  <div className="text-sm font-medium text-white">
                    {me.username}
                  </div>
                  <div className="font-mono text-[11px] text-emerald-400">
                    {me.points} puan
                  </div>
                </div>
              </div>
              <button
                onClick={() => signOut()}
                className="rounded-lg border border-white/15 px-3 py-1.5 text-sm text-white/60 transition-colors hover:border-red-500/40 hover:text-red-300"
              >
                Çıkış
              </button>
            </>
          ) : (
            <>
              <Link
                href="/giris"
                className="rounded-lg px-3 py-1.5 text-sm text-white/70 transition-colors hover:text-white"
              >
                Giriş
              </Link>
              <button
                onClick={() => router.push("/kayit")}
                className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-1.5 text-sm font-medium text-emerald-300 transition-colors hover:bg-emerald-500/20"
              >
                Kayıt ol
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
