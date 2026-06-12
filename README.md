# DevYol 🚀

Junior developer'lar için **interaktif yol haritası**. Sıfırdan gerçek projeler
yaparak frontend → backend → uzmanlık dallarına ilerlersin. Her adımı bitirince
**kanıt (resim + metin)** gönderirsin; admin onaylayınca **puan** kazanır,
**liderlik tablosuna** ve **topluluk yarışlarına** girersin.

Yanında 400+ terimlik bir **kavram sözlüğü** (`/kavramlar`) bulunur.

## Özellikler

- 🗺️ **Yol haritası** — track'lere (Frontend / Backend / Uzmanlık Dalları)
  gruplanmış, bağımlılık bazlı kilitlenen seviyeler ve adımlar.
- 👤 **Auth** — kullanıcı adı + şifre ile kayıt/giriş (Convex Auth).
- ✅ **İlerleme** — anonimken tarayıcıda (localStorage), giriş yapınca buluta
  taşınır ve senkronlanır.
- 📸 **Kanıt + review** — adım bitince resim+metin gönderilir; admin onaylar /
  reddeder (+ not). Puan **yalnızca onayla** gelir.
- 🏆 **Liderlik** — global sıralama + topluluk içi **race**.
- 👥 **Topluluklar** — kod ile oluştur/katıl, birden fazla topluluğa üye olunur.
- ⚙️ **Admin paneli** — review kuyruğu + yol haritası CRUD (adım puan/tip/başlık,
  görev ekle-sil, seviye ekle).
- 📖 **Kavram sözlüğü** — arama + kategori filtresiyle 400+ terim.

## Teknolojiler

- [Next.js 16](https://nextjs.org/) (App Router, Turbopack) + React 19
- [Convex](https://convex.dev/) — veritabanı, fonksiyonlar, dosya depolama, realtime
- [Convex Auth](https://labs.convex.dev/auth) — username/şifre
- [Tailwind CSS 4](https://tailwindcss.com/)
- TypeScript

## Kurulum

```bash
npm install
```

### 1. Convex'i başlat (dev)

```bash
npx convex dev
```

Convex'e giriş yap ve projeyi seç. Bu komut:
- `convex/_generated` tiplerini üretir,
- şema + fonksiyonları **dev** deployment'a push'lar,
- `.env.local`'a `CONVEX_DEPLOYMENT` ve `NEXT_PUBLIC_CONVEX_URL` yazar.

Çalışır halde bırak.

### 2. Auth anahtarlarını kur

```bash
npx @convex-dev/auth
```

JWT anahtarlarını ve `SITE_URL`'i dev deployment'a ekler. **Bu adım olmadan
giriş/kayıt çalışmaz.**

### 3. Yol haritasını yükle (seed)

```bash
npx convex run seed:run
```

`app/data/steps.ts` içeriğini Convex tablolarına yükler. Çıktı:
`{ tracks: 3, levels: 9, steps: 43, tasks: 132 }`. Komut idempotenttir (önce
roadmap tablolarını temizler), istediğinde tekrar çalıştırabilirsin.

### 4. Uygulamayı çalıştır

```bash
npm run dev
```

→ http://localhost:3100 (port `3000` yerine **3100** kullanılır; bkz. Notlar).

### 5. Kendini admin yap

Kayıt olduktan sonra Convex Dashboard → **Data → `users`** → kendi satırında
`role` alanını `admin` yap. Sonra header'da **⚙️ Admin** görünür.

## Ortam değişkenleri (`.env.local`)

`npx convex dev` çoğunu otomatik yazar:

```
NEXT_PUBLIC_CONVEX_URL=https://<deployment>.convex.cloud
CONVEX_DEPLOYMENT=dev:<deployment>
```

> `.env.local` git tarafından yok sayılır (gizli kalır).

## Komutlar

| Komut | Açıklama |
| --- | --- |
| `npm run dev` | Geliştirme sunucusu (port 3100) |
| `npm run build` | Production build (tip kontrolü dahil) |
| `npm run start` | Build'i çalıştırır (port 3100) |
| `npx convex dev` | Convex dev (watch + codegen) |
| `npx convex run seed:run` | Dev'i seed'ler |

## Proje yapısı

```
app/
  page.tsx                 Ana yol haritası (Convex'ten okur)
  giris/ kayit/            Auth sayfaları
  liderlik/                Global liderlik
  topluluklar/ [id]/       Topluluklar + topluluk race'i
  admin/                   Admin paneli (review + roadmap CRUD)
  kavramlar/               Kavram sözlüğü
  components/              UI (Shell, SiteHeader/Footer, StepNode, SubmissionModal…)
  data/                    steps.ts (seed kaynağı) + concepts.ts (sözlük)
  lib/roadmap.ts           Convex getTree dönüş tipleri
convex/
  schema.ts                Tablolar (users, tracks/levels/steps/tasks,
                           completions, submissions, communities, memberships)
  auth.ts                  Convex Auth (username/şifre)
  roadmap.ts               getTree + admin CRUD
  progress.ts              İlerleme (getMine/toggle/syncLocal)
  submissions.ts           Kanıt yükleme + review + puan
  leaderboard.ts           Global + topluluk race
  communities.ts           Oluştur/katıl/ayrıl
  seed.ts                  steps.ts → Convex
proxy.ts                   Convex Auth middleware (Next 16 "proxy" konvansiyonu)
```

## Production'a alma

Dev ile prod **ayrı** deployment'lardır. Prod'u hazırlamak için:

```bash
npx convex deploy            # şema + fonksiyonları prod'a push'lar (tablolar oluşur)
npx @convex-dev/auth --prod  # prod auth anahtarları
npx convex run seed:run --prod   # prod'u seed'ler
```

Siteyi (ör. Vercel) yayınlarken ortam değişkeni olarak prod URL'ini ver:

```
NEXT_PUBLIC_CONVEX_URL=https://<prod-deployment>.convex.cloud
```

Build komutu olarak Convex'in önerdiği biçim:

```
npx convex deploy --cmd 'npm run build'
```

## Notlar

- **Port 3100:** `localhost:3000`'de başka bir uygulama çalışabildiği (ve eski
  service worker'lar takılabildiği) için DevYol bilinçli olarak **3100** portunu
  kullanır. Tarayıcıda eski içerik görürsen ilgili origin'de service worker'ı
  kaldır / hard reload yap.
- **Puan kaynağı tek yerde:** Puanlar yalnızca `submissions.review` onayında
  yazılır; bir adımın puanı admin panelden değiştirilebilir.
- **Anonim ilerleme:** Giriş yapmadan da görevleri işaretleyebilirsin; kayıt
  olunca localStorage ilerlemen otomatik buluta taşınır.
