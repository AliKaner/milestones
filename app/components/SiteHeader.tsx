"use client";

import { useState } from "react";
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
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const links =
    me?.role === "admin"
      ? [...navLinks, { href: "/admin", label: "⚙️ Admin" }]
      : navLinks;

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
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${
                isActive(l.href)
                  ? l.href === "/admin"
                    ? "bg-amber-500/15 text-amber-300"
                    : "bg-white/10 text-white"
                  : l.href === "/admin"
                    ? "text-amber-300/70 hover:text-amber-300"
                    : "text-white/60 hover:text-white"
              }`}
            >
              {l.label}
            </Link>
          ))}
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
                className="hidden rounded-lg border border-white/15 px-3 py-1.5 text-sm text-white/60 transition-colors hover:border-red-500/40 hover:text-red-300 sm:block"
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
                className="hidden rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-1.5 text-sm font-medium text-emerald-300 transition-colors hover:bg-emerald-500/20 sm:block"
              >
                Kayıt ol
              </button>
            </>
          )}

          {/* Mobil menü düğmesi */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Menü"
            className="rounded-lg border border-white/15 p-2 text-white/70 md:hidden"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobil açılır menü */}
      {menuOpen && (
        <nav className="border-t border-white/10 bg-[#0a0a0f] px-5 py-3 md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className={`rounded-lg px-3 py-2 text-sm ${
                  isActive(l.href)
                    ? "bg-white/10 text-white"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {l.label}
              </Link>
            ))}
            {me && (
              <button
                onClick={() => {
                  setMenuOpen(false);
                  signOut();
                }}
                className="mt-1 rounded-lg px-3 py-2 text-left text-sm text-red-300 hover:bg-red-500/10"
              >
                Çıkış
              </button>
            )}
            {!me && (
              <Link
                href="/kayit"
                onClick={() => setMenuOpen(false)}
                className="mt-1 rounded-lg bg-emerald-500/10 px-3 py-2 text-sm font-medium text-emerald-300"
              >
                Kayıt ol
              </Link>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
