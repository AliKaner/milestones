"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { api } from "@/convex/_generated/api";
import Logo from "./Logo";
import { tiers, paths } from "../data/steps";
import {
  CompassIcon,
  MapIcon,
  SettingsIcon,
  LogOutIcon,
  BookOpenIcon,
  DatabaseIcon,
  NewspaperIcon,
  ChevronDownIcon,
} from "./icons";

/** Üst seviye gezinme — sade tutulur ki header taşmasın. */
const primaryLinks = [
  { href: "/", label: "Yol Haritası" },
  { href: "/oz-degerlendirme", label: "Öz-Değerlendirme" },
  { href: "/liderlik", label: "Liderlik" },
  { href: "/topluluklar", label: "Topluluklar" },
];

/** "Kaynaklar" başlığı altında toplanan referans sayfaları. */
const resourceLinks = [
  { href: "/kavramlar", label: "Sözlük", Icon: BookOpenIcon, desc: "450+ terimlik kavram sözlüğü" },
  { href: "/veri-setleri", label: "Veri Setleri", Icon: DatabaseIcon, desc: "Pratik için açık veri setleri" },
  { href: "/makaleler", label: "Makaleler", Icon: NewspaperIcon, desc: "Seçili yazılar ve konular" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const me = useQuery(api.users.me);
  const { signOut } = useAuthActions();

  const [menuOpen, setMenuOpen] = useState(false); // mobil menü
  const [resOpen, setResOpen] = useState(false); // kaynaklar dropdown
  const [userOpen, setUserOpen] = useState(false); // kullanıcı dropdown

  const resRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  // Dropdown'ları dışına tıklayınca kapat
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (resRef.current && !resRef.current.contains(e.target as Node)) setResOpen(false);
      if (userRef.current && !userRef.current.contains(e.target as Node)) setUserOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  // Yol değişince tüm açılır menüleri kapat
  useEffect(() => {
    setResOpen(false);
    setUserOpen(false);
    setMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);
  const resActive = resourceLinks.some((l) => isActive(l.href));

  const userTier = me?.tier ? tiers.find((t) => t.id === me.tier) : null;
  const userPath = me?.path ? paths.find((p) => p.id === me.path) : null;

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0a0a0f]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Logo size={30} />
          <span className="text-lg font-bold tracking-tight text-white">
            Mile<span className="text-emerald-400">stones</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {primaryLinks.map((l) => (
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

          {/* Kaynaklar dropdown */}
          <div ref={resRef} className="relative">
            <button
              onClick={() => setResOpen((o) => !o)}
              className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm transition-colors ${
                resActive || resOpen ? "bg-white/10 text-white" : "text-white/60 hover:text-white"
              }`}
            >
              Kaynaklar
              <ChevronDownIcon className={`h-3 w-3 transition-transform ${resOpen ? "rotate-180" : ""}`} />
            </button>
            {resOpen && (
              <div className="card-fade absolute left-0 top-full mt-2 w-64 overflow-hidden rounded-xl border border-white/10 bg-[#11111a] p-1.5 shadow-2xl shadow-black/40">
                {resourceLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={`flex items-start gap-2.5 rounded-lg px-3 py-2 transition-colors ${
                      isActive(l.href) ? "bg-white/10" : "hover:bg-white/5"
                    }`}
                  >
                    <l.Icon className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300/90" />
                    <span className="leading-tight">
                      <span className="block text-sm font-medium text-white">{l.label}</span>
                      <span className="block text-[11px] text-white/45">{l.desc}</span>
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {me?.role === "admin" && (
            <Link
              href="/admin"
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm transition-colors ${
                isActive("/admin")
                  ? "bg-amber-500/15 text-amber-300"
                  : "text-amber-300/70 hover:text-amber-300"
              }`}
            >
              <SettingsIcon className="h-3.5 w-3.5" /> Admin
            </Link>
          )}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          {me === undefined ? (
            <div className="h-9 w-24 animate-pulse rounded-lg bg-white/5" />
          ) : me ? (
            <div ref={userRef} className="relative">
              <button
                onClick={() => setUserOpen((o) => !o)}
                className={`flex items-center gap-2 rounded-xl border px-2 py-1 transition-colors ${
                  userOpen ? "border-white/25 bg-white/10" : "border-white/10 bg-white/5 hover:border-white/20"
                }`}
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-sky-500 text-xs font-bold text-black">
                  {me.username.charAt(0).toLocaleUpperCase("tr")}
                </span>
                <span className="hidden leading-tight sm:block">
                  <span className="block max-w-[120px] truncate text-left text-sm font-medium text-white">
                    {me.username}
                  </span>
                  <span className="block text-left font-mono text-[11px] text-emerald-400">
                    {me.points} puan
                  </span>
                </span>
                <ChevronDownIcon className={`h-3 w-3 text-white/50 transition-transform ${userOpen ? "rotate-180" : ""}`} />
              </button>

              {userOpen && (
                <div className="card-fade absolute right-0 top-full mt-2 w-72 overflow-hidden rounded-xl border border-white/10 bg-[#11111a] shadow-2xl shadow-black/40">
                  {/* Üst kimlik bloğu */}
                  <div className="flex items-center gap-3 border-b border-white/10 bg-gradient-to-br from-emerald-500/10 to-sky-500/10 px-4 py-3.5">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-sky-500 text-base font-bold text-black">
                      {me.username.charAt(0).toLocaleUpperCase("tr")}
                    </span>
                    <div className="min-w-0 leading-tight">
                      <div className="truncate text-sm font-semibold text-white">{me.username}</div>
                      {userTier && (
                        <div className="mt-0.5 inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold text-white/80">
                          {userTier.label}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Hızlı istatistik */}
                  <div className="grid grid-cols-2 gap-px bg-white/5 text-center">
                    <div className="bg-[#11111a] px-3 py-2.5">
                      <div className="font-mono text-base font-bold text-emerald-400">{me.points}</div>
                      <div className="text-[10px] uppercase tracking-wide text-white/40">Puan</div>
                    </div>
                    <div className="bg-[#11111a] px-3 py-2.5">
                      <div className="truncate text-sm font-semibold text-white">
                        {userPath ? userPath.label : "—"}
                      </div>
                      <div className="text-[10px] uppercase tracking-wide text-white/40">Kariyer Yolu</div>
                    </div>
                  </div>

                  {/* Menü */}
                  <div className="p-1.5">
                    <Link
                      href="/profil"
                      className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-white/80 transition-colors hover:bg-white/5"
                    >
                      <CompassIcon className="h-4 w-4 text-white/55" /> Profilim & İlerleyiş
                    </Link>
                    <Link
                      href="/"
                      className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-white/80 transition-colors hover:bg-white/5"
                    >
                      <MapIcon className="h-4 w-4 text-white/55" /> Yol Haritam
                    </Link>
                    {me.role === "admin" && (
                      <Link
                        href="/admin"
                        className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-amber-300/90 transition-colors hover:bg-amber-500/10"
                      >
                        <SettingsIcon className="h-4 w-4" /> Admin Paneli
                      </Link>
                    )}
                    <button
                      onClick={() => signOut()}
                      className="mt-0.5 flex w-full items-center gap-2.5 rounded-lg border-t border-white/5 px-3 py-2 text-left text-sm text-red-300/90 transition-colors hover:bg-red-500/10"
                    >
                      <LogOutIcon className="h-4 w-4" /> Çıkış yap
                    </button>
                  </div>
                </div>
              )}
            </div>
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
            {primaryLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className={`rounded-lg px-3 py-2 text-sm ${
                  isActive(l.href) ? "bg-white/10 text-white" : "text-white/70 hover:text-white"
                }`}
              >
                {l.label}
              </Link>
            ))}

            <div className="mt-1 px-3 pb-1 pt-2 text-[10px] uppercase tracking-wide text-white/35">
              Kaynaklar
            </div>
            {resourceLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${
                  isActive(l.href) ? "bg-white/10 text-white" : "text-white/70 hover:text-white"
                }`}
              >
                <l.Icon className="h-4 w-4 text-emerald-300/90" /> {l.label}
              </Link>
            ))}

            {me?.role === "admin" && (
              <Link
                href="/admin"
                onClick={() => setMenuOpen(false)}
                className="mt-1 flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-amber-300/80 hover:text-amber-300"
              >
                <SettingsIcon className="h-4 w-4" /> Admin
              </Link>
            )}

            <div className="my-1 border-t border-white/10" />

            {me ? (
              <>
                <Link
                  href="/profil"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-white/80 hover:text-white"
                >
                  <CompassIcon className="h-4 w-4 text-white/55" /> Profilim & İlerleyiş
                </Link>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    signOut();
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-red-300 hover:bg-red-500/10"
                >
                  <LogOutIcon className="h-4 w-4" /> Çıkış yap
                </button>
              </>
            ) : (
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
