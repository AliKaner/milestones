import Link from "next/link";
import Logo from "./Logo";

export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/10 bg-[#0a0a0f]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 text-sm text-white/50 sm:flex-row">
        <div className="flex items-center gap-2">
          <Logo size={24} />
          <span className="font-semibold text-white/80">
            Dev<span className="text-emerald-400">Yol</span>
          </span>
        </div>
        <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          <Link href="/" className="transition-colors hover:text-white">
            Yol Haritası
          </Link>
          <Link href="/kavramlar" className="transition-colors hover:text-white">
            Sözlük
          </Link>
          <Link href="/makaleler" className="transition-colors hover:text-white">
            Makaleler
          </Link>
          <Link href="/liderlik" className="transition-colors hover:text-white">
            Liderlik
          </Link>
          <Link href="/topluluklar" className="transition-colors hover:text-white">
            Topluluklar
          </Link>
        </nav>
        <p className="text-center text-white/40">
          © {year} DevYol — Tüm hakları saklıdır.
        </p>
      </div>
    </footer>
  );
}
