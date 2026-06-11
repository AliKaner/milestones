import type { Accent } from "../components/accents";

export type Task = {
  /** Ulaşılacak hedef / çözülecek sorun — çözümün kendisi değil. */
  goal: string;
  /** Hangi kavrama bakması gerektiğini işaret eden küçük ipucu. */
  tip: string;
};

export type Step = {
  title: string;
  tasks: Task[];
  /** Bu adımda işine yarayan, yana dallanan kavramlar (concepts.ts'teki term'ler). */
  learn?: string[];
};

export type Level = {
  id: string;
  level: number;
  project: string;
  difficulty: string;
  emoji: string;
  accent: Accent; // emerald | sky | violet | amber
  description: string;
  skills: string[];
  steps: Step[];
};

/**
 * 4 seviyeli React proje yol haritası.
 *
 * Felsefe:
 *  - Her seviye gerçek bir React projesidir (1. seviye dahil hepsi React).
 *  - Her görev BİR HEDEF olarak yazılır (ne yapılacağı), çözüm reçetesi değil.
 *  - Altındaki "ipucu" sadece hangi kavrama / API'ye bakılacağını fısıldar.
 *  - Junior nasıl yapacağını kendi araştırır; böylece gerçekten öğrenir.
 *
 * Not: Türkçe akıcı tutulur; React/teknik terimler (state, props, hook,
 * component, deploy...) bilerek İngilizce bırakılır çünkü sektör dili budur.
 */
export const levels: Level[] = [
  // ═══════════════════════════ SEVİYE 1 ═══════════════════════════
  {
    id: "todo",
    level: 1,
    project: "To-Do List (React)",
    difficulty: "Başlangıç",
    emoji: "✅",
    accent: "emerald",
    description:
      "İlk React projen. Görev ekleyip silebileceğin, tamamlananı işaretleyebileceğin bir yapılacaklar listesi. Amaç: component, props, state ve event mantığına oturmak.",
    skills: [
      "Git & GitHub",
      "React component",
      "props",
      "useState",
      "Array metodları",
      "Controlled input",
      "localStorage",
    ],
    steps: [
      {
        title: "1. Repo'yu aç ve bilgisayarına indir",
        learn: ["Git & GitHub"],
        tasks: [
          {
            goal: "Projen için GitHub'da ortak bir ev (repository) oluştur.",
            tip: "GitHub → 'New repository' → ada `todo-react` ver, 'Add a README' işaretle.",
          },
          {
            goal: "Bu repo'yu kendi bilgisayarına bir kopya olarak indir.",
            tip: "Yeşil 'Code' butonundaki URL'i kopyala — ipucu: `git clone <url>`.",
          },
          {
            goal: "Terminalin doğru klasörde olduğundan emin ol.",
            tip: "İndirdiğin klasörün içine gir — ipucu: `cd todo-react`.",
          },
        ],
      },
      {
        title: "2. React projesini kur ve çalıştır",
        learn: ["npm", "Bundler", "V8 Engine", "Framework"],
        tasks: [
          {
            goal: "Boş klasörü çalışan bir React projesine dönüştür.",
            tip: "Hazır şablon var — ipucu: `npm create vite@latest` (React + TypeScript şablonu).",
          },
          {
            goal: "Gerekli paketleri indir ki proje çalışabilsin.",
            tip: "node_modules'ı oluşturan komut — ipucu: `npm install`.",
          },
          {
            goal: "Projeyi tarayıcıda canlı olarak aç ve örnek sayfayı gör.",
            tip: "Development server'ı başlat — ipucu: `npm run dev`, sonra localhost linkini aç.",
          },
          {
            goal: "Bu ilk halini GitHub'a kaydet ki geri dönebilesin.",
            tip: "Üç adım — ipucu: `git add .` → `git commit -m \"setup\"` → `git push`.",
          },
        ],
      },
      {
        title: "3. Arayüzü component'lere böl",
        learn: ["Component", "Props", "DOM"],
        tasks: [
          {
            goal: "Örnek sayfayı temizle, ekranda bir başlık ve boş bir liste görünsün.",
            tip: "App.tsx içindeki demo içeriği sil — JSX yaz (return içindeki HTML benzeri yapı).",
          },
          {
            goal: "Görev yazmak için bir input ve bir 'Ekle' butonu koy.",
            tip: "`<input>` + `<button>` — şimdilik çalışması gerekmiyor, sadece görünsün.",
          },
          {
            goal: "Tek bir görev satırını ayrı, yeniden kullanılabilir bir parça yap.",
            tip: "Aynı yapıyı tekrar yazma — ipucu: bir `TodoItem` component'i oluştur.",
          },
          {
            goal: "Görevin metnini bu parçaya dışarıdan gönderebilesin.",
            tip: "Component'e veri geçmek — ipucu: props (`<TodoItem text={...} />`).",
          },
        ],
      },
      {
        title: "4. State ile görevleri yönet",
        learn: ["State", "Hook"],
        tasks: [
          {
            goal: "Uygulama, görevlerin listesini hafızasında tutsun.",
            tip: "Bileşenin hafızası — ipucu: `useState` ile bir dizi (array) tut.",
          },
          {
            goal: "Kullanıcı input'a yazdıkça yazdığı değer takip edilsin.",
            tip: "Input'un value'sunu state'e bağla — ipucu: controlled input (`value` + `onChange`).",
          },
          {
            goal: "'Ekle'ye basınca yeni görev listeye eklensin ve input temizlensin.",
            tip: "Yeni eleman ekle — ipucu: `setTodos([...todos, yeni])`. Eski diziyi mutasyona uğratma.",
          },
          {
            goal: "Liste, state'teki her görev için otomatik bir satır bassın.",
            tip: "Diziyi JSX'e çevir — ipucu: `todos.map(...)` ve her elemana benzersiz `key`.",
          },
        ],
      },
      {
        title: "5. Sil ve tamamla özelliklerini ekle",
        learn: ["CSS", "Box Model", "Flexbox", "box-shadow"],
        tasks: [
          {
            goal: "Her görevin yanında 'Sil' butonu olsun, basınca o görev gitsin.",
            tip: "Listeden eleman çıkarmak — ipucu: `filter()` ile id'si farklı olanları tut.",
          },
          {
            goal: "Bir göreve tıklayınca 'tamamlandı' olarak işaretlensin (üstü çizili).",
            tip: "Bir alanı tersine çevir — ipucu: `map()` içinde ilgili id'nin `done` değerini değiştir.",
          },
          {
            goal: "Tamamlanan görev görsel olarak farklı görünsün.",
            tip: "Duruma göre stil — ipucu: koşullu className veya inline style (line-through).",
          },
          {
            goal: "Hiç görev yoksa 'Henüz görev yok' mesajı görünsün.",
            tip: "Duruma göre farklı JSX — ipucu: conditional rendering (`todos.length === 0 ? ... : ...`).",
          },
        ],
      },
      {
        title: "6. Kalıcılık ve yayın",
        learn: ["Deploy"],
        tasks: [
          {
            goal: "Sayfayı F5 ile yenileyince görevler KAYBOLMASIN.",
            tip: "Tarayıcı veriyi hatırlayabilir — ipucu: `localStorage` + bir `useEffect` ile senkronize et.",
          },
          {
            goal: "Açılışta kayıtlı görevler otomatik geri yüklensin.",
            tip: "İlk render'da oku — ipucu: `useState`'in başlangıç değerini localStorage'dan al.",
          },
          {
            goal: "Projeyi production için derle ve hatasız olduğunu doğrula.",
            tip: "Build komutu — ipucu: `npm run build`.",
          },
          {
            goal: "Siteyi internette canlı bir linkle yayınla ve paylaş.",
            tip: "Repo'yu bağla, otomatik deploy — ipucu: Vercel veya Netlify.",
          },
        ],
      },
    ],
  },

  // ═══════════════════════════ SEVİYE 2 ═══════════════════════════
  {
    id: "weather",
    level: 2,
    project: "Hava Durumu App (Next.js)",
    difficulty: "Kolay-Orta",
    emoji: "🌤️",
    accent: "sky",
    description:
      "Gerçek veriyle ilk tanışma. Bir şehir ara, canlı bir API'den hava durumunu çek ve göster. Amaç: useEffect, fetch, async akış, loading/error state ve conditional rendering.",
    skills: [
      "Next.js (App Router)",
      "useEffect",
      "fetch / async-await",
      "Loading & error state",
      "Conditional rendering",
      ".env (gizli anahtar)",
      "list rendering",
    ],
    steps: [
      {
        title: "1. Next.js projesini kur",
        tasks: [
          {
            goal: "GitHub'da yeni bir repo aç ve modern bir Next.js projesi başlat.",
            tip: "Hazır kurulum — ipucu: `npx create-next-app@latest` (TypeScript + App Router seç).",
          },
          {
            goal: "Projeyi çalıştır ve hazır gelen sayfayı tarayıcıda gör.",
            tip: "`npm run dev` → localhost:3000.",
          },
          {
            goal: "Açılış sayfasını temizle; ortada bir arama kutusu kalsın.",
            tip: "`app/page.tsx` içindeki örnek içeriği sil. Sayfa interaktif olacağı için en üste `\"use client\"` yaz.",
          },
        ],
      },
      {
        title: "2. Arama arayüzünü kur",
        learn: ["Position", "z-index"],
        tasks: [
          {
            goal: "Kullanıcı şehir adını yazabileceği bir arama formu görsün.",
            tip: "`<form>` + controlled `<input>` + `<button>`.",
          },
          {
            goal: "Kullanıcının yazdığı şehir adı state'te tutulsun.",
            tip: "Input'u state'e bağla — ipucu: `useState` + `onChange`.",
          },
          {
            goal: "Form gönderilince sayfa yenilenmesin, senin kodun çalışsın.",
            tip: "Tarayıcının default davranışını durdur — ipucu: `onSubmit` + `e.preventDefault()`.",
          },
          {
            goal: "Hava durumunu gösterecek kart parçasını ayrı component yap.",
            tip: "Tekrar kullanılabilir parça — ipucu: `WeatherCard` + props.",
          },
        ],
      },
      {
        title: "3. API'yi bağla",
        learn: ["API", "JSON"],
        tasks: [
          {
            goal: "Ücretsiz bir hava durumu API'sine kaydol ve erişim anahtarı al.",
            tip: "Örnek — ipucu: OpenWeatherMap, ücretsiz API key.",
          },
          {
            goal: "Anahtarın kaynak kodda açıkça GÖRÜNMESİN.",
            tip: "Gizli değer — ipucu: `.env.local` dosyası + `.gitignore`'da olduğundan emin ol.",
          },
          {
            goal: "Arama yapılınca o şehrin gerçek verisini internetten getir.",
            tip: "Sunucudan veri çekmek — ipucu: `fetch(url)` + `async/await`, dönen JSON'u parse et.",
          },
          {
            goal: "Gelen veriyi state'e koy ki ekranda gösterebilesin.",
            tip: "Veriyi sakla — ipucu: `useState` (örn. `const [weather, setWeather] = useState(null)`).",
          },
        ],
      },
      {
        title: "4. Durumları yönet (UX)",
        tasks: [
          {
            goal: "Veri gelene kadar kullanıcı 'Yükleniyor...' görsün.",
            tip: "Bir loading bayrağı — ipucu: `loading` state'i + conditional rendering.",
          },
          {
            goal: "Olmayan bir şehir aranırsa kullanıcıya anlaşılır bir hata göster.",
            tip: "Hatayı yakala — ipucu: `try/catch` + bir `error` state'i.",
          },
          {
            goal: "Sayfa ilk açıldığında otomatik bir şehir (örn. konum/varsayılan) yüklensin.",
            tip: "İlk render'da çalışan kod — ipucu: `useEffect(() => {...}, [])`.",
          },
        ],
      },
      {
        title: "5. Zenginleştir ve yayınla",
        learn: ["Responsive & Media Query", "CSS Grid", "Pseudo-class (:hover)"],
        tasks: [
          {
            goal: "5 günlük tahmini, her güne bir kart olacak şekilde listele.",
            tip: "Diziden JSX üret — ipucu: `forecast.map(...)` + `key`.",
          },
          {
            goal: "Hava durumuna göre arka plan/ikon değişsin (güneşli, yağmurlu...).",
            tip: "Duruma göre görsel — ipucu: condition → farklı emoji/className.",
          },
          {
            goal: "Projeyi her `git push`'ta otomatik güncellenen canlı bir siteye çevir.",
            tip: "GitHub'a bağlı deploy — ipucu: Vercel. API key'i Vercel'de Environment Variable olarak ekle.",
          },
        ],
      },
    ],
  },

  // ═══════════════════════════ SEVİYE 3 ═══════════════════════════
  {
    id: "blog",
    level: 3,
    project: "Blog Platformu (Full-stack + Auth)",
    difficulty: "Orta",
    emoji: "📝",
    accent: "violet",
    description:
      "İlk full-stack projen. Kullanıcılar kayıt olup giriş yapsın, kendi yazılarını ekleyip düzenlesin ve silsin. Amaç: database, authentication, CRUD, Context ve custom hook.",
    skills: [
      "Database & ORM",
      "Authentication",
      "CRUD (API routes)",
      "Context API",
      "Custom hook",
      "Authorization",
      "Form validation",
    ],
    steps: [
      {
        title: "1. Veri katmanını kur",
        tasks: [
          {
            goal: "Yazılar sunucu kapansa bile kalıcı bir yerde saklansın.",
            tip: "Tarayıcı değil, gerçek depo — ipucu: bir database (örn. Postgres). Ücretsiz: Supabase / Neon.",
          },
          {
            goal: "Database'i SQL ezberlemeden, JavaScript nesneleriyle yönet.",
            tip: "Kod ↔ DB köprüsü — ipucu: bir ORM (Prisma).",
          },
          {
            goal: "`User` ve `Post` tablolarını ve aralarındaki ilişkiyi tanımla.",
            tip: "Bir kullanıcının çok yazısı olur — ipucu: schema'da one-to-many relation.",
          },
          {
            goal: "Tabloları gerçekten database'e oluştur.",
            tip: "Schema'yı uygula — ipucu: Prisma migrate.",
          },
        ],
      },
      {
        title: "2. Authentication ekle",
        tasks: [
          {
            goal: "Kullanıcılar kendi hesabıyla kayıt olup giriş yapabilsin.",
            tip: "Sıfırdan yazma, hazır çözüm — ipucu: Auth.js (NextAuth).",
          },
          {
            goal: "Şifreleri DÜZ METİN olarak saklama; çalınırsa felaket olur.",
            tip: "Geri döndürülemez şekilde sakla — ipucu: password hashing (bcrypt) veya OAuth provider.",
          },
          {
            goal: "Giriş yapmamış biri 'Yeni Yazı' sayfasına ULAŞAMASIN.",
            tip: "Sayfayı koru — ipucu: oturum kontrolü + login'e redirect.",
          },
        ],
      },
      {
        title: "3. Oturum bilgisini paylaş (Context)",
        tasks: [
          {
            goal: "Giriş yapan kullanıcının bilgisine HER component'ten ulaşılsın.",
            tip: "Props'u 5 kat aşağı taşıma — ipucu: Context API (provider + consumer).",
          },
          {
            goal: "Bu kullanıcı bilgisini okuma işini tek satıra indir.",
            tip: "Tekrarı sarmala — ipucu: bir custom hook (`useAuth()`).",
          },
          {
            goal: "Header'da giriş yapılmışsa 'Çıkış', yapılmamışsa 'Giriş' görünsün.",
            tip: "Duruma göre UI — ipucu: conditional rendering, oturum state'ine bak.",
          },
        ],
      },
      {
        title: "4. CRUD işlemleri",
        learn: ["CRUD", "RESTful API", "HTTP Status Code'ları"],
        tasks: [
          {
            goal: "Kullanıcı yeni bir yazı oluşturabilsin (başlık + içerik).",
            tip: "Sunucuya veri gönder — ipucu: bir API route + `POST` (Create).",
          },
          {
            goal: "Tüm yazılar ana sayfada listelensin, tıklayınca detayı açılsın.",
            tip: "Veriyi getir ve göster — ipucu: Read + dynamic route (`/post/[id]`).",
          },
          {
            goal: "Kullanıcı kendi yazısını düzenleyebilsin ve silebilsin.",
            tip: "Güncelle ve sil — ipucu: `PUT`/`PATCH` ve `DELETE` (Update + Delete).",
          },
          {
            goal: "Bir yazıyı SADECE sahibi düzenleyip silebilsin.",
            tip: "İşlemden önce kontrol — ipucu: authorization (`post.authorId === session.user.id`).",
          },
        ],
      },
      {
        title: "5. Cila ve deploy",
        learn: ["word-break & overflow"],
        tasks: [
          {
            goal: "Boş başlıkla yazı gönderilince kullanıcı uyarılsın, kayıt olmasın.",
            tip: "Gönderimden önce kontrol — ipucu: form validation (örn. Zod).",
          },
          {
            goal: "Yazı kaydedilirken 'Kaydediliyor...', bitince geri bildirim göster.",
            tip: "İşlem durumu — ipucu: loading state + butonu disable et.",
          },
          {
            goal: "Projeyi database'iyle birlikte canlıya al.",
            tip: "Env + DB bağlantısı — ipucu: Vercel + hosted database, `DATABASE_URL` ekle.",
          },
        ],
      },
    ],
  },

  // ═══════════════════════════ SEVİYE 4 ═══════════════════════════
  {
    id: "saas",
    level: 4,
    project: "SaaS Ürünü (Ödeme + Dashboard)",
    difficulty: "İleri",
    emoji: "🏆",
    accent: "amber",
    description:
      "Bitirme projesi. Ödeme alan, kullanıcı paneli olan, test edilmiş gerçek bir ürün. Amaç: production seviyesi disiplin — payment, roller, testler, CI/CD ve monitoring.",
    skills: [
      "Stripe payment",
      "Webhook",
      "Role-based access",
      "Dashboard",
      "Testing (unit + e2e)",
      "CI/CD",
      "Error monitoring",
    ],
    steps: [
      {
        title: "1. Mimariyi planla",
        tasks: [
          {
            goal: "Kullanıcı, abonelik ve plan ilişkilerini koda başlamadan tasarla.",
            tip: "Önce kağıt/diyagram — ipucu: data model / schema tasarımı (free, pro planları).",
          },
          {
            goal: "Buton, input gibi parçalar tüm üründe tutarlı görünsün.",
            tip: "Tek kaynaktan stil — ipucu: design system / component library (örn. shadcn/ui).",
          },
          {
            goal: "Klasör yapısını büyüyebilecek şekilde düzenle.",
            tip: "Özellik bazlı ayır — ipucu: feature-based folder structure.",
          },
        ],
      },
      {
        title: "2. Ödeme entegrasyonu",
        tasks: [
          {
            goal: "Kullanıcı kredi kartıyla güvenli şekilde ödeme yapabilsin.",
            tip: "Kart verisini sen tutma — ipucu: Stripe Checkout (hosted page).",
          },
          {
            goal: "Önce gerçek para harcamadan test edebilesin.",
            tip: "Sahte kartlar — ipucu: Stripe test mode + test card numaraları.",
          },
          {
            goal: "Ödeme tamamlanınca kullanıcı OTOMATİK 'Pro' olsun.",
            tip: "Stripe sana haber versin — ipucu: webhook endpoint, `checkout.session.completed`.",
          },
          {
            goal: "Abonelik iptal edilince erişim de geri alınsın.",
            tip: "Aynı webhook mantığı — ipucu: `customer.subscription.deleted` event'i.",
          },
        ],
      },
      {
        title: "3. Dashboard ve roller",
        tasks: [
          {
            goal: "Kullanıcı giriş yapınca kendi paneline ve hesap ayarlarına ulaşsın.",
            tip: "Korumalı alan — ipucu: protected dashboard route.",
          },
          {
            goal: "Free kullanıcı, Pro özelliklerini GÖREMESİN/kullanamasın.",
            tip: "Plana göre kapı — ipucu: role/plan-based access control (hem frontend hem backend).",
          },
          {
            goal: "Kaç kullanıcı ve abonelik var — yöneticiye özetle.",
            tip: "Yönetim ekranı — ipucu: admin dashboard + temel analytics.",
          },
        ],
      },
      {
        title: "4. Güven: testler ve CI/CD",
        tasks: [
          {
            goal: "Bir fonksiyonu bozduğunda bunu canlıdan ÖNCE fark et.",
            tip: "Mantığı otomatik doğrula — ipucu: unit test (Vitest/Jest).",
          },
          {
            goal: "'Giriş yap → ödeme yap' gibi tam akış gerçekten çalışsın.",
            tip: "Kullanıcı gibi test et — ipucu: e2e test (Playwright).",
          },
          {
            goal: "Her push'ta testler otomatik çalışsın; kırmızıysa merge engellensin.",
            tip: "Otomasyon — ipucu: GitHub Actions (CI/CD pipeline).",
          },
        ],
      },
      {
        title: "5. Yayın ve izleme",
        tasks: [
          {
            goal: "Canlıda bir kullanıcı hata alınca SENİN haberin olsun.",
            tip: "Hataları topla — ipucu: error monitoring (Sentry).",
          },
          {
            goal: "Production'a özel ayarlar ve güvenlik kontrollerini gözden geçir.",
            tip: "Env değişkenleri, rate limit, secret rotation — ipucu: production checklist.",
          },
          {
            goal: "Ürünü canlıya al, gerçek bir kullanıcıdan geri bildirim topla. 🚀",
            tip: "İlk müşteri — ipucu: deploy + feedback döngüsü.",
          },
        ],
      },
    ],
  },
];
