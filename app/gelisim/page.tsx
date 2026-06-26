"use client";

import { useState, type ComponentType } from "react";
import Link from "next/link";
import {
  CodeIcon,
  BookOpenIcon,
  NewspaperIcon,
  UsersIcon,
  TargetIcon,
  TrophyIcon,
  MessageSquareIcon,
  SproutIcon,
  TrendingUpIcon,
  ChevronDownIcon,
  CompassIcon,
  ClockIcon,
} from "../components/icons";

type IconType = ComponentType<{ className?: string }>;
/** `soon: true` → henüz hazır olmayan, "yakında" rozetiyle gösterilen planlı rota. */
type Route = { href: string; label: string; soon?: boolean };

type Section = {
  id: string;
  Icon: IconType;
  title: string;
  tagline: string;
  accent: string; // tailwind renk adı
  intro: string;
  actions: string[];
  routes: Route[];
};

const SECTIONS: Section[] = [
  {
    id: "proje",
    Icon: CodeIcon,
    title: "Proje yap (en önemlisi)",
    tagline: "Bir geliştirici, bitirdiği projeler kadar geliştiricidir.",
    accent: "emerald",
    intro:
      "Gelişimin %80'i klavyenin başında olur. İzlediğin/okuduğun şeyi 24 saat içinde küçük de olsa bir koda dönüştür. 'Tutorial cehenneminden' çıkmanın tek yolu kendi başına, takılarak, çözerek proje bitirmektir.",
    actions: [
      "Yol haritasındaki bir sonraki projeyi seç ve BUGÜN ilk adımı at — mükemmel planı bekleme.",
      "Sevdiğin bir uygulamayı (Spotify, Trello, Twitter…) küçük ölçekte klonla; tasarımı kopyalamak utanç değil, alıştırmadır.",
      "Her projeyi gerçekten CANLIYA al (deploy) ve linkini bir yere koy — 'bitmiş' demek yayında demek.",
      "Bir açık kaynak projeye küçük bir katkı yap: önce dokümantasyon/typo, sonra küçük bir bug.",
      "Build in public: ne yaptığını kısa kısa paylaş; geri bildirim ve motivasyon ikisi birden gelir.",
      "Kendi günlük hayatındaki bir sorunu çözen küçük bir araç yaz — en kalıcı motivasyon budur.",
    ],
    routes: [
      { href: "/", label: "Yol Haritası" },
      { href: "/veri-setleri", label: "Veri Setleri" },
      { href: "/proje-fikirleri", label: "Proje Fikirleri", soon: true },
    ],
  },
  {
    id: "oku",
    Icon: BookOpenIcon,
    title: "Oku & temeli sağlamlaştır",
    tagline: "Kıdem, isimlendirme ve karar verme farkıdır — bunlar okumayla gelir.",
    accent: "sky",
    intro:
      "Kod yazmak kasları, okumak ise mimari sezgiyi büyütür. Senior'ları junior'dan ayıran şey çoğu zaman 'daha hızlı yazmak' değil, 'doğru kararı vermek'tir. Bu da kavramları ve başkalarının deneyimini okumaktan gelir.",
    actions: [
      "Sözlükten her gün 1–2 yeni kavram öğren; öğrendiğini kendi cümlenle bir yere yaz.",
      "Klasikleri sırayla oku: 'The Pragmatic Programmer', 'Clean Code', 'Refactoring', sonra 'Designing Data-Intensive Applications'.",
      "Kullandığın aracın resmi dokümantasyonunu oku — Stack Overflow'dan önce kaynağa git.",
      "İyi yazılmış açık kaynak repo'ların kodunu oku; 'bunu neden böyle yapmışlar?' diye sor.",
      "Bir konuyu öğrendiğinde Feynman tekniği uygula: bir başkasına anlatabiliyorsan öğrenmişsindir.",
    ],
    routes: [
      { href: "/kavramlar", label: "Kavram Sözlüğü" },
      { href: "/makaleler", label: "Makaleler" },
      { href: "/kaynaklar", label: "Kitap & Kaynak Listesi", soon: true },
    ],
  },
  {
    id: "yenilik",
    Icon: NewspaperIcon,
    title: "Yenilikleri takip et & olayın içine gir",
    tagline: "Sektör hızlı; izlemeyen geride kalır, takip eden konuşulanı anlar.",
    accent: "violet",
    intro:
      "Amaç her yeni şeyi öğrenmek değil — neyin neden konuşulduğunu anlayacak kadar haberdar olmak. Gürültüyü filtrele, sinyali takip et; sonra denemek istediğin birini seçip elini kirlet.",
    actions: [
      "Birkaç kaliteli haber kaynağı seç (changelog/release notes, bir-iki newsletter, konferans konuşmaları) ve düzenli tara.",
      "Kullandığın araçların sürüm notlarını oku — yeni bir özelliği ilk öğrenenlerden ol.",
      "Yeni çıkan bir teknolojiyi 'merak edip okumak' yerine 1 saatlik küçük bir denemeyle (spike) sına.",
      "Bir teknoloji tartışmasında 'neden' tarafını öğren: hype mı, gerçek bir sorunu mu çözüyor?",
      "Konferans konuşmalarını izle; çoğu ücretsiz ve yılların deneyimini 30 dakikaya sıkıştırır.",
    ],
    routes: [
      { href: "/makaleler", label: "Makaleler & Konular" },
      { href: "/haberler", label: "Haftalık Haber Akışı", soon: true },
    ],
  },
  {
    id: "topluluk",
    Icon: UsersIcon,
    title: "Başka geliştiricilerle konuş",
    tagline: "Tek başına hızlı gidersin, birlikte uzağa.",
    accent: "amber",
    intro:
      "Kod yazmak sosyal bir iştir. Takılınca sormak, başkasının koduna bakmak, fikir tartışmak — bunlar yıllar alacak öğrenmeyi haftalara indirir. İzole çalışmak en yavaş büyüme yoludur.",
    actions: [
      "Bir topluluğa katıl; takıldığın yeri 'neyi denedim, ne bekliyordum, ne oldu' diye düzgün sor.",
      "Pair programming yap: birinin nasıl düşündüğünü canlı izlemek, saatlerce okumaktan iyidir.",
      "Code review iste ve VER — başkasının kodunu okumak kendi kodunu da iyileştirir.",
      "Bir mentor bul ya da sen birine mentorluk yap; öğretmek en hızlı öğrenmedir.",
      "Sorulara cevap ver: bildiğin küçük bir şeyi paylaşmak hem topluluğa katkı hem tekrar pekiştirmedir.",
    ],
    routes: [
      { href: "/topluluklar", label: "Topluluklar" },
      { href: "/liderlik", label: "Liderlik Tablosu" },
    ],
  },
  {
    id: "paylas",
    Icon: MessageSquareIcon,
    title: "Paylaş & öğret",
    tagline: "Anlatamıyorsan tam öğrenmemişsindir.",
    accent: "rose",
    intro:
      "Öğrendiğini paylaşmak hem bilgini sağlamlaştırır hem de seni görünür kılar. Blog yazısı, kısa bir not, bir cevap… Hepsi 'gelecekteki sana' ve başkalarına bırakılmış birer iz.",
    actions: [
      "Çözdüğün bir sorunu kısa bir yazı/not olarak yaz — 'bugün şunu öğrendim' bile yeterli.",
      "Projelerini iyi bir README ile sun: ne, neden, nasıl çalıştırılır.",
      "Bir kavramı bir başkasına anlat; takıldığın yer, eksik öğrendiğin yerdir.",
      "Topluluk forumunda bir soruya doğru, gerekçeli bir cevap yaz.",
      "Yaptığın işi portföyünde topla; görünür olmayan emek değerlenmez.",
    ],
    routes: [
      { href: "/topluluklar", label: "Toplulukta Paylaş" },
      { href: "/kavramlar", label: "Sözlüğe Bak" },
      { href: "/blog", label: "Blog / Yazılar", soon: true },
    ],
  },
  {
    id: "meydan",
    Icon: TrophyIcon,
    title: "Kendine meydan oku",
    tagline: "Kas, ancak zorlandığında büyür.",
    accent: "lime",
    intro:
      "Konfor bölgesinde kalan gelişmez. Düzenli olarak bildiğin sınırın biraz ötesinde bir şey dene; başarısız olmak da öğrenmenin parçasıdır. Her seviyede gerçek, biraz 'fazla zor' gelen bir proje seç.",
    actions: [
      "Yol haritasında bir sonraki kıdem (tier) projesine geç — kilidi açmak için önceki seviyeyi bitir.",
      "Daha önce hiç kullanmadığın bir teknolojiyle küçük bir şey yap.",
      "Bir algoritma/veri yapısı problemini, ezberlemeden, kendi çözümünü kurarak çöz.",
      "Bir projeni 'production-grade' yap: test, hata yönetimi, log, deploy ekle.",
      "Kendine küçük bir süre sınırı koy (örn. hafta sonu hackathonu) ve bir şey bitir.",
    ],
    routes: [
      { href: "/", label: "Yol Haritası — Sonraki Seviye" },
      { href: "/meydan-okumalar", label: "Haftalık Meydan Okuma", soon: true },
    ],
  },
  {
    id: "hedef",
    Icon: TargetIcon,
    title: "Hedef koy & kendini ölç",
    tagline: "Ölçülmeyen ilerleme, ilerleme hissi vermez.",
    accent: "cyan",
    intro:
      "Yön olmadan çaba dağılır. Nereye gitmek istediğini netleştir, büyük hedefi küçük adımlara böl ve düzenli olarak nerede olduğunu kontrol et. Görmek, motive eder.",
    actions: [
      "Bir kariyer yolu (path) seç ve odaklan; aynı anda her şeyi öğrenmeye çalışma.",
      "Büyük hedefi haftalık küçük, somut adımlara böl ('X projesini bitir' yerine 'bugün şu adımı').",
      "İlerlemeni düzenli takip et; bitirdiğin görevleri gör, bu motivasyonu besler.",
      "Soft skill'lerini de değerlendir — teknik beceri kadar belirleyicidir.",
      "Ayda bir geriye bak: 'Bir ay önce yapamadığım neyi şimdi yapabiliyorum?'",
    ],
    routes: [
      { href: "/profil", label: "Profilim & İlerleyiş" },
      { href: "/oz-degerlendirme", label: "Öz-Değerlendirme" },
    ],
  },
  {
    id: "sureklilik",
    Icon: SproutIcon,
    title: "Süreklilik & sürdürülebilirlik",
    tagline: "Az ama her gün, çok ama ara sıra'yı yener.",
    accent: "indigo",
    intro:
      "Gelişim bir sprint değil, maraton. Tutarlılık yetenekten önemlidir; ama tükenmeden. Küçük, düzenli adımlar zamanla şaşırtıcı bir mesafe kat ettirir.",
    actions: [
      "Her gün küçük de olsa kod yaz — seriyi (streak) kırmamaya çalış, 15 dakika bile sayılır.",
      "Öğrenmeyi bir alışkanlığa bağla (sabah kahvesi + 1 kavram gibi).",
      "Tükenmişliğe (burnout) dikkat et: dinlenmek de üretkenliğin parçasıdır.",
      "Karşılaştırmayı bırak; tek rakibin dünkü sensin.",
      "Mola ver, uyu, hareket et — beyin arka planda problem çözer.",
    ],
    routes: [{ href: "/oz-degerlendirme", label: "Kendini Tart" }],
  },
];

const ACCENT: Record<string, { icon: string; chip: string; line: string }> = {
  emerald: { icon: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300", chip: "hover:border-emerald-400/50 hover:text-emerald-200", line: "bg-emerald-400" },
  sky: { icon: "border-sky-500/30 bg-sky-500/10 text-sky-300", chip: "hover:border-sky-400/50 hover:text-sky-200", line: "bg-sky-400" },
  violet: { icon: "border-violet-500/30 bg-violet-500/10 text-violet-300", chip: "hover:border-violet-400/50 hover:text-violet-200", line: "bg-violet-400" },
  amber: { icon: "border-amber-500/30 bg-amber-500/10 text-amber-300", chip: "hover:border-amber-400/50 hover:text-amber-200", line: "bg-amber-400" },
  rose: { icon: "border-rose-500/30 bg-rose-500/10 text-rose-300", chip: "hover:border-rose-400/50 hover:text-rose-200", line: "bg-rose-400" },
  lime: { icon: "border-lime-500/30 bg-lime-500/10 text-lime-300", chip: "hover:border-lime-400/50 hover:text-lime-200", line: "bg-lime-400" },
  cyan: { icon: "border-cyan-500/30 bg-cyan-500/10 text-cyan-300", chip: "hover:border-cyan-400/50 hover:text-cyan-200", line: "bg-cyan-400" },
  indigo: { icon: "border-indigo-500/30 bg-indigo-500/10 text-indigo-300", chip: "hover:border-indigo-400/50 hover:text-indigo-200", line: "bg-indigo-400" },
};

export default function GrowthPage() {
  // Açık bölümler (birden fazla açık olabilir). İlk bölüm açık başlasın.
  const [open, setOpen] = useState<Set<string>>(new Set([SECTIONS[0].id]));

  const toggle = (id: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <header className="mb-8">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
            <TrendingUpIcon className="h-5 w-5" />
          </span>
          <h1 className="bg-gradient-to-r from-white to-emerald-300 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
            Gelişmek için ne yapabilirim?
          </h1>
        </div>
        <p className="mt-3 max-w-2xl text-white/60">
          Her başlığa tıkla, içindeki somut adımları gör. Tek bir sırrı yok:
          <strong className="text-white/80"> proje yap, oku, paylaş, konuş ve sürekli ol.</strong>{" "}
          Aşağıdaki kutuların çoğu seni sitenin ilgili bölümüne de götürür.
        </p>
        <div className="mt-3 flex gap-2">
          <button
            onClick={() => setOpen(new Set(SECTIONS.map((s) => s.id)))}
            className="rounded-lg border border-white/15 px-3 py-1.5 text-xs text-white/60 transition-colors hover:text-white"
          >
            Tümünü aç
          </button>
          <button
            onClick={() => setOpen(new Set())}
            className="rounded-lg border border-white/15 px-3 py-1.5 text-xs text-white/60 transition-colors hover:text-white"
          >
            Tümünü kapat
          </button>
        </div>
      </header>

      <div className="space-y-3">
        {SECTIONS.map((s) => {
          const isOpen = open.has(s.id);
          const a = ACCENT[s.accent];
          return (
            <section
              key={s.id}
              className={`overflow-hidden rounded-2xl border transition-colors ${
                isOpen ? "border-white/15 bg-white/[0.04]" : "border-white/10 bg-white/[0.02]"
              }`}
            >
              <button
                onClick={() => toggle(s.id)}
                className="flex w-full items-center gap-3 px-5 py-4 text-left"
              >
                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${a.icon}`}>
                  <s.Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-bold text-white">{s.title}</span>
                  <span className="block truncate text-xs text-white/45">{s.tagline}</span>
                </span>
                <ChevronDownIcon
                  className={`h-4 w-4 shrink-0 text-white/40 transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isOpen && (
                <div className="card-fade px-5 pb-5">
                  <div className="flex gap-3 border-t border-white/10 pt-4">
                    <span className={`mt-1 h-full w-1 shrink-0 rounded-full ${a.line}`} />
                    <div className="min-w-0">
                      <p className="text-sm text-white/70">{s.intro}</p>

                      <ul className="mt-3 space-y-2">
                        {s.actions.map((act, i) => (
                          <li key={i} className="flex gap-2 text-sm text-white/80">
                            <span className="mt-0.5 text-emerald-400">›</span>
                            <span>{act}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {s.routes.map((r) =>
                          r.soon ? (
                            <span
                              key={r.href}
                              title="Bu rota yakında eklenecek"
                              className="flex cursor-default items-center gap-1.5 rounded-lg border border-dashed border-white/15 px-3 py-1.5 text-xs font-medium text-white/40"
                            >
                              <CompassIcon className="h-3.5 w-3.5" />
                              {r.label}
                              <span className="rounded-full bg-white/10 px-1.5 py-0.5 text-[9px] uppercase tracking-wide text-white/50">
                                yakında
                              </span>
                            </span>
                          ) : (
                            <Link
                              key={r.href}
                              href={r.href}
                              className={`flex items-center gap-1.5 rounded-lg border border-white/15 px-3 py-1.5 text-xs font-medium text-white/70 transition-colors ${a.chip}`}
                            >
                              <CompassIcon className="h-3.5 w-3.5" />
                              {r.label}
                              <span className="text-white/30">→</span>
                            </Link>
                          )
                        )}

                        {/* Canlı (tıklanabilir) rota yoksa: boş-durum notu */}
                        {!s.routes.some((r) => !r.soon) && (
                          <span className="flex items-center gap-1.5 rounded-lg border border-dashed border-white/15 px-3 py-1.5 text-xs text-white/40">
                            <ClockIcon className="h-3.5 w-3.5" /> Bu alana yakında yeni rotalar eklenecek
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </section>
          );
        })}
      </div>

      <p className="mt-8 text-center text-sm text-white/40">
        En iyi gün bugün. Bir kutu seç, tek bir adımı şimdi at.
      </p>
    </main>
  );
}
