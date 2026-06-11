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

/**
 * Bir projenin hangi "milestone tipine" ait olduğu.
 *  - frontend / backend: ardışık ilerleyen ana kariyer yolu.
 *  - branch: ana yolu bitirince açılan, istediğin sırada yapılabilen uzmanlık dalları
 *    (oyun, AI, mobil, devops, realtime...). Birbirlerine bağlı değildir.
 */
export type Track = "frontend" | "backend" | "branch";

export type Level = {
  id: string;
  level: number;
  track: Track;
  project: string;
  difficulty: string;
  emoji: string;
  accent: Accent; // emerald | sky | violet | amber
  description: string;
  skills: string[];
  steps: Step[];
};

/** Section başlıkları için track metası. `levels` bu sırayla gruplanır. */
export const tracks: {
  id: Track;
  label: string;
  emoji: string;
  description: string;
}[] = [
  {
    id: "frontend",
    label: "Frontend",
    emoji: "🎨",
    description: "Kullanıcının gördüğü arayüz. Yolculuk buradan başlar.",
  },
  {
    id: "backend",
    label: "Backend & Full-stack",
    emoji: "🗄️",
    description: "Veri, kimlik doğrulama ve sunucu tarafı.",
  },
  {
    id: "branch",
    label: "Uzmanlık Dalları",
    emoji: "🌿",
    description:
      "Ana yolu (Frontend + Backend) bitirince açılır. Birbirinden bağımsız; ilgini çekenden başla.",
  },
];

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
    track: "frontend",
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
        title: "6. Müşteri isteği: Görünüm seçenekleri",
        learn: ["CSS Grid", "Flexbox", "Conditional Rendering"],
        tasks: [
          {
            goal: "Kullanıcı görevleri liste ve kart (grid) düzeni arasında değiştirebilsin.",
            tip: "Tek arayüz, iki yerleşim — ipucu: bir `layout` state'i + koşullu className (flex kolon ↔ CSS Grid).",
          },
          {
            goal: "Aktif görünümü değiştiren bir düğme/seçici ekle.",
            tip: "Duruma göre UI — ipucu: butona basınca `setLayout(...)`, seçili olan vurgulansın.",
          },
          {
            goal: "Seçilen düzen sayfa yenilense de hatırlansın.",
            tip: "Tercihi de sakla — ipucu: `layout`'u görevlerle aynı şekilde localStorage'a yaz, açılışta oku.",
          },
        ],
      },
      {
        title: "7. Kalıcılık ve yayın",
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
    track: "frontend",
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
    track: "backend",
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
        title: "5. Müşteri isteği: Taslak otomatik kaydı",
        learn: ["useEffect", "Debounce & Throttle"],
        tasks: [
          {
            goal: "Kullanıcı yazı yazarken taslağı kendiliğinden yerelde saklansın (kaydet'e basmadan).",
            tip: "Her tuşta değil, ara ara yaz — ipucu: debounce + localStorage; başlık ve içeriği (her bölümü) ayrı anahtarda tut.",
          },
          {
            goal: "Sayfa kazara kapanıp tekrar açılınca yarım kalan taslak forma geri yüklensin.",
            tip: "Açılışta oku — ipucu: localStorage'daki taslakla formu doldur.",
          },
          {
            goal: "Yazı başarıyla kaydedilince taslak temizlensin (eski taslak tekrar dolmasın).",
            tip: "İşi bitince sil — ipucu: `localStorage.removeItem(...)`.",
          },
        ],
      },
      {
        title: "6. Cila ve deploy",
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
    track: "backend",
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

  // ═══════════════════════════ SEVİYE 5 ═══════════════════════════
  {
    id: "chat",
    level: 5,
    track: "branch",
    project: "Canlı Sohbet (Realtime)",
    difficulty: "İleri",
    emoji: "💬",
    accent: "rose",
    description:
      "Gerçek zamanlı dünya! Mesajlar anında, sayfa yenilemeden gelsin. Amaç: WebSocket, çift yönlü iletişim, optimistic UI ve presence (kim online).",
    skills: [
      "WebSocket",
      "Realtime senkron",
      "Optimistic UI",
      "Presence",
      "Pub/Sub",
      "Debounce",
      "Race condition",
    ],
    steps: [
      {
        title: "1. Bağlantıyı kur",
        learn: ["WebSocket", "Polling vs Push"],
        tasks: [
          {
            goal: "Sunucuyla SÜREKLİ açık, çift yönlü bir hat kur (her mesaj için yeniden istek atma).",
            tip: "HTTP'nin iste-cevap modeli yetmez — ipucu: WebSocket (örn. Socket.io).",
          },
          {
            goal: "Bağlantı koptuğunda otomatik yeniden bağlanılsın.",
            tip: "Ağ her zaman güvenilir değil — ipucu: reconnect + bağlantı durumu state'i.",
          },
        ],
      },
      {
        title: "2. Mesajlaşma",
        learn: ["Optimistic UI", "Broadcast & Room"],
        tasks: [
          {
            goal: "Bir kullanıcının mesajı, odadaki HERKESE anında ulaşsın.",
            tip: "Sunucu mesajı dağıtsın — ipucu: broadcast / room (pub-sub).",
          },
          {
            goal: "Kullanıcı 'Gönder'e basınca mesaj, sunucudan onay BEKLEMEDEN ekranda görünsün.",
            tip: "Hızlı his — ipucu: optimistic UI (sonra sunucu onayıyla eşitle).",
          },
          {
            goal: "Gönderilemeyen mesaj 'başarısız' işaretlensin, tekrar denenebilsin.",
            tip: "İyimserliğin bedeli — ipucu: hata durumunda rollback.",
          },
        ],
      },
      {
        title: "3. Canlılık hissi",
        learn: ["Presence", "Debounce & Throttle"],
        tasks: [
          {
            goal: "Kimlerin online olduğu listede görünsün, çıkınca kaybolsun.",
            tip: "Kim burada — ipucu: presence (bağlan/kopar olaylarını izle).",
          },
          {
            goal: "Birisi yazarken 'yazıyor…' göstergesi çıksın.",
            tip: "Her tuşta event atma — ipucu: debounce / throttle.",
          },
        ],
      },
      {
        title: "4. Tutarlılık & deploy",
        learn: ["Race Condition"],
        tasks: [
          {
            goal: "Aynı anda gelen iki mesajın sırası bozulmasın/biri kaybolmasın.",
            tip: "Eşzamanlılık tuzağı — ipucu: race condition; sunucu zaman damgası/sıra no.",
          },
          {
            goal: "Eski mesajlar veritabanında kalsın, yeni giren geçmişi görsün.",
            tip: "Realtime + kalıcılık — ipucu: mesajları DB'ye de yaz.",
          },
          {
            goal: "WebSocket destekleyen bir ortama deploy et.",
            tip: "Her host WS sevmez — ipucu: uygun platform + ölçeklemede sticky session.",
          },
        ],
      },
    ],
  },

  // ═══════════════════════════ SEVİYE 6 ═══════════════════════════
  {
    id: "game",
    level: 6,
    track: "branch",
    project: "Tarayıcı Oyunu (Canvas)",
    difficulty: "İleri",
    emoji: "🎮",
    accent: "lime",
    description:
      "Eğlenceli ve zorlu! Canvas üzerinde çalışan, gerçek bir oyun döngüsü olan basit bir oyun (örn. yılan/uzay). Amaç: game loop, render, çarpışma ve oyun state'i.",
    skills: [
      "Game loop",
      "Canvas",
      "requestAnimationFrame",
      "Delta time",
      "Collision detection",
      "Oyun state'i",
      "Input handling",
    ],
    steps: [
      {
        title: "1. Tuvali hazırla",
        learn: ["Canvas", "Game Loop", "requestAnimationFrame"],
        tasks: [
          {
            goal: "Ekrana çizim yapabileceğin bir alan oluştur ve bir kare çiz.",
            tip: "Piksel piksel çizim yüzeyi — ipucu: `<canvas>` + 2D context.",
          },
          {
            goal: "Ekranı saniyede ~60 kez temizleyip yeniden çizen sürekli bir döngü kur.",
            tip: "Oyunun kalbi — ipucu: game loop + requestAnimationFrame.",
          },
        ],
      },
      {
        title: "2. Hareket ve kontrol",
        learn: ["Delta Time", "Input Handling"],
        tasks: [
          {
            goal: "Oyuncu klavye oklarıyla bir nesneyi hareket ettirsin.",
            tip: "Tuşları izle — ipucu: keydown/keyup + bir 'keys' durumu.",
          },
          {
            goal: "Hız, bilgisayar hızlı da olsa yavaş da olsa AYNI hissedilsin.",
            tip: "FPS'e bağlı kalma — ipucu: delta time ile hareketi ölçekle.",
          },
        ],
      },
      {
        title: "3. Oyun mekaniği",
        learn: ["Collision Detection", "Oyun State'i"],
        tasks: [
          {
            goal: "Nesne bir şeye (duvar/yem/düşman) çarptığında bunu algıla.",
            tip: "Kutular kesişiyor mu — ipucu: collision detection (AABB).",
          },
          {
            goal: "Skor, can, 'oyun bitti' gibi durumları yönet.",
            tip: "Oyunun beyni — ipucu: tek bir oyun state'i (playing/paused/over).",
          },
          {
            goal: "Oyun bitince tekrar başlatılabilsin.",
            tip: "Durumu sıfırla — ipucu: restart fonksiyonu.",
          },
        ],
      },
      {
        title: "4. Cila & yayın",
        learn: ["FPS"],
        tasks: [
          {
            goal: "En yüksek skor F5 sonrası unutulmasın.",
            tip: "Kalıcı kayıt — ipucu: localStorage (high score).",
          },
          {
            goal: "Ses efekti ve basit animasyonlarla oyunu canlandır.",
            tip: "His kat — ipucu: Web Audio / küçük sprite'lar.",
          },
          {
            goal: "Oyunu yayınla ve arkadaşlarınla skor yarışı yap. 🏆",
            tip: "Statik deploy yeter — ipucu: Vercel/Netlify.",
          },
        ],
      },
    ],
  },

  // ═══════════════════════════ SEVİYE 7 ═══════════════════════════
  {
    id: "ai",
    level: 7,
    track: "branch",
    project: "AI Asistan (Claude API)",
    difficulty: "İleri+",
    emoji: "🤖",
    accent: "fuchsia",
    description:
      "En güncel track! Claude API ile konuşan, akıllı bir asistan/uygulama yap. Amaç: LLM entegrasyonu, streaming, prompt tasarımı, tool use ve RAG.",
    skills: [
      "LLM",
      "Claude API",
      "Token & Context",
      "Streaming",
      "Prompt engineering",
      "Tool use",
      "RAG & Embedding",
    ],
    steps: [
      {
        title: "1. İlk çağrı",
        learn: ["LLM", "Claude API", "Token", "Context Window"],
        tasks: [
          {
            goal: "Bir kullanıcı sorusunu modele gönderip cevabını ekranda göster.",
            tip: "Resmi kütüphane — ipucu: Anthropic SDK (`@anthropic-ai/sdk`), model `claude-opus-4-8`.",
          },
          {
            goal: "API anahtarın tarayıcıya/koda SIZMASIN.",
            tip: "Çağrıyı sunucuda yap — ipucu: server route + `.env` (ANTHROPIC_API_KEY).",
          },
          {
            goal: "Çok uzun girdide neden hata/kesilme olduğunu anla.",
            tip: "Modelin sınırı var — ipucu: token + context window.",
          },
        ],
      },
      {
        title: "2. Sohbet deneyimi",
        learn: ["Streaming", "System Prompt"],
        tasks: [
          {
            goal: "Cevap, tamamı beklenmeden kelime kelime akarak görünsün.",
            tip: "Uzun cevapta bekletme — ipucu: streaming (`messages.stream`).",
          },
          {
            goal: "Asistanın kişiliğini/kurallarını sen belirle (örn. 'kısa ve Türkçe yanıtla').",
            tip: "Modele rol ver — ipucu: system prompt.",
          },
          {
            goal: "Asistan önceki mesajları hatırlasın (çok turlu sohbet).",
            tip: "API durumsuzdur — ipucu: tüm geçmişi her istekte gönder.",
          },
        ],
      },
      {
        title: "3. Yetenek kazandır",
        learn: ["Prompt Engineering", "Tool Use", "Hallucination"],
        tasks: [
          {
            goal: "Modelin cevabını istediğin biçime (örn. JSON) güvenle sok.",
            tip: "Doğru yönlendirme — ipucu: prompt engineering + structured outputs.",
          },
          {
            goal: "Asistan hava durumu/veritabanı gibi GERÇEK aksiyonları çağırabilsin.",
            tip: "Modele araç ver — ipucu: tool use (function calling).",
          },
          {
            goal: "Modelin 'uydurmasını' (yanlış ama emin cevap) fark et ve azalt.",
            tip: "Kaynağa dayandır — ipucu: hallucination; doğrulama/araç kullan.",
          },
        ],
      },
      {
        title: "4. Kendi verinle konuştur (RAG)",
        learn: ["RAG", "Embedding", "Vector Database"],
        tasks: [
          {
            goal: "Asistan, senin dökümanlarına dayanarak cevap versin (genel bilgiyle değil).",
            tip: "Getir-ve-üret — ipucu: RAG (Retrieval-Augmented Generation).",
          },
          {
            goal: "Metni 'anlam'a göre aranabilir hale getir.",
            tip: "Metni sayıya çevir — ipucu: embedding + vector database.",
          },
          {
            goal: "Asistanı canlıya al, maliyet ve hız dengesini izle.",
            tip: "Token = para — ipucu: prompt caching + uygun model/effort.",
          },
        ],
      },
    ],
  },

  // ═══════════════════════════ SEVİYE 8 ═══════════════════════════
  {
    id: "mobile",
    level: 8,
    track: "branch",
    project: "Mobil Uygulama (Expo)",
    difficulty: "İleri+",
    emoji: "📱",
    accent: "cyan",
    description:
      "React bilgini telefona taşı! Tek koddan iOS ve Android'de çalışan bir uygulama yap. Amaç: React Native, native API'ler, navigation ve store yayını.",
    skills: [
      "React Native",
      "Expo",
      "Native API",
      "Navigation",
      "Push notification",
      "OTA update",
      "App Store / Play Store",
    ],
    steps: [
      {
        title: "1. Mobil projeyi kur",
        learn: ["React Native", "Expo", "Native & Bridge"],
        tasks: [
          {
            goal: "Tek bir kod tabanından hem iOS hem Android'de çalışan proje başlat.",
            tip: "Web değil mobil React — ipucu: React Native + Expo (`npx create-expo-app`).",
          },
          {
            goal: "Uygulamayı kendi telefonunda canlı olarak gör.",
            tip: "QR ile anında — ipucu: Expo Go uygulaması.",
          },
          {
            goal: "`<div>` yerine neden `<View>`/`<Text>` kullandığını anla.",
            tip: "DOM yok — ipucu: native bileşenler (bridge ile native'e çevrilir).",
          },
        ],
      },
      {
        title: "2. Ekranlar ve gezinme",
        learn: ["Navigation"],
        tasks: [
          {
            goal: "Birden çok ekran arasında geçiş yapılabilsin (liste → detay).",
            tip: "Mobilde router — ipucu: React Navigation / Expo Router.",
          },
          {
            goal: "Alt menü (tab bar) ile ana bölümler arasında gezinilsin.",
            tip: "Mobil kalıp — ipucu: bottom tab navigator.",
          },
        ],
      },
      {
        title: "3. Telefonun gücünü kullan",
        learn: ["Native API", "Push Notification"],
        tasks: [
          {
            goal: "Kamera, konum veya kişiler gibi cihaz özelliklerine eriş.",
            tip: "Donanıma izinle eriş — ipucu: Expo native API'leri + permission.",
          },
          {
            goal: "Kullanıcıya uygulama kapalıyken bile bildirim gönder.",
            tip: "Geri çağır — ipucu: push notification.",
          },
          {
            goal: "Veriyi cihazda kalıcı sakla (mobilde localStorage yok).",
            tip: "Mobil depolama — ipucu: AsyncStorage / SecureStore.",
          },
        ],
      },
      {
        title: "4. Yayın",
        learn: ["OTA Update", "App Store / Play Store"],
        tasks: [
          {
            goal: "Mağaza onayını beklemeden küçük güncellemeleri anında dağıt.",
            tip: "Havadan güncelleme — ipucu: OTA update (EAS Update).",
          },
          {
            goal: "Uygulamayı App Store ve Play Store'a göndermeye hazırla.",
            tip: "Derle ve imzala — ipucu: EAS Build + store hesapları.",
          },
        ],
      },
    ],
  },

  // ═══════════════════════════ SEVİYE 9 ═══════════════════════════
  {
    id: "devops",
    level: 9,
    track: "branch",
    project: "Üretim Altyapısı (DevOps)",
    difficulty: "Uzman",
    emoji: "🛰️",
    accent: "indigo",
    description:
      "Son seviye: ölçek! Uygulamanı binlerce kullanıcıya dayanacak, kendini iyileştiren bir sisteme dönüştür. Amaç: container, ölçekleme, kuyruk ve gözlemlenebilirlik.",
    skills: [
      "Docker",
      "Orchestration",
      "Horizontal scaling",
      "Load balancer",
      "Message queue",
      "Microservices",
      "Observability",
    ],
    steps: [
      {
        title: "1. Paketle ve taşınabilir yap",
        learn: ["Container", "Infrastructure as Code"],
        tasks: [
          {
            goal: "Uygulaman her makinede AYNI şekilde çalışsın ('bende çalışıyordu' bitsin).",
            tip: "Bağımlılıklarıyla paketle — ipucu: Docker container.",
          },
          {
            goal: "Sunucu kurulumunu tıklayarak değil, kodla tanımla.",
            tip: "Tekrarlanabilir altyapı — ipucu: Infrastructure as Code (Terraform).",
          },
        ],
      },
      {
        title: "2. Ölçeklendir",
        learn: ["Horizontal Scaling", "Load Balancer", "Orchestration"],
        tasks: [
          {
            goal: "Tek sunucu yetmeyince, aynı uygulamadan çok kopya çalıştır.",
            tip: "Yatay büyüme — ipucu: horizontal scaling.",
          },
          {
            goal: "Gelen trafiği bu kopyalara dengeli dağıt.",
            tip: "Trafik polisi — ipucu: load balancer.",
          },
          {
            goal: "Onlarca container'ı elle değil, otomatik yönet.",
            tip: "Konteyner orkestrası — ipucu: orchestration (Kubernetes).",
          },
        ],
      },
      {
        title: "3. Dayanıklılık",
        learn: ["Message Queue", "Microservices", "Caching"],
        tasks: [
          {
            goal: "Ağır işler (e-posta, video işleme) isteği bekletmeden arka planda yapılsın.",
            tip: "İşi kuyruğa al — ipucu: message queue (RabbitMQ/SQS).",
          },
          {
            goal: "Dev tek uygulamayı, bağımsız parçalara böl.",
            tip: "Böl ve yönet — ipucu: microservices (ölçü ve tradeoff'larıyla).",
          },
          {
            goal: "Sık istenen veriyi her seferinde DB'den çekme.",
            tip: "Önbellek katmanı — ipucu: Redis / CDN cache.",
          },
        ],
      },
      {
        title: "4. Gözlemle & güvenle yayınla",
        learn: ["Observability", "Blue-Green Deployment", "Health Check"],
        tasks: [
          {
            goal: "Sistem yavaşladığında NEREDE olduğunu loglardan/metriklerden gör.",
            tip: "İçini görebilmek — ipucu: observability (log + metrik + trace).",
          },
          {
            goal: "Bir kopya çökerse otomatik fark edilip yenisi ayağa kalksın.",
            tip: "Nabız yokla — ipucu: health check + auto-restart.",
          },
          {
            goal: "Yeni sürümü, kullanıcıyı kesintiye uğratmadan yayınla.",
            tip: "Sıfır kesinti — ipucu: blue-green / canary deployment.",
          },
        ],
      },
    ],
  },
];
