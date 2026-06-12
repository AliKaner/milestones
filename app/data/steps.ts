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
  /** Adım bitince kullanıcıya sorulan, kanıtla birlikte cevaplanması gereken soru. */
  question?: string;
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
  accent: Accent;
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
 * Proje yol haritası.
 *
 * Felsefe:
 *  - İlk 4 proje (Frontend + Backend) ÇOK küçük "micro" adımlara bölünmüştür:
 *    her adım tek bir somut iş (bir component yaz, bir prop geç, bir state ekle).
 *  - Her adımın sonunda bir SORU vardır; kullanıcı kanıtıyla birlikte cevaplar,
 *    admin değerlendirir.
 *  - Uzmanlık dalları (5-9) daha üst seviye, daha geniş adımlardır.
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
      "İlk React projen. Görev ekleyip silebileceğin, tamamlananı işaretleyebileceğin bir liste. Amaç: component, props, state ve event mantığına oturmak — adım adım, en küçük parçalarla.",
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
        title: "1. Repo'yu hazırla",
        learn: ["Git & GitHub"],
        question:
          "`git clone` komutu tam olarak ne yapar? Kendi cümlenle açıkla.",
        tasks: [
          {
            goal: "GitHub'da `todo-react` adında yeni bir repository oluştur.",
            tip: "GitHub → 'New repository' → 'Add a README' işaretle.",
          },
          {
            goal: "Repoyu bilgisayarına bir kopya olarak indir.",
            tip: "Yeşil 'Code' butonundaki URL — ipucu: `git clone <url>`.",
          },
          {
            goal: "Terminalde proje klasörünün içine gir.",
            tip: "İpucu: `cd todo-react`.",
          },
        ],
      },
      {
        title: "2. React projesini kur",
        learn: ["npm", "Bundler", "Framework"],
        question:
          "`npm install` çalışınca oluşan `node_modules` klasöründe ne var?",
        tasks: [
          {
            goal: "Klasörü Vite ile React + TypeScript projesine dönüştür.",
            tip: "İpucu: `npm create vite@latest` (React + TS şablonu).",
          },
          {
            goal: "Projenin çalışması için gerekli paketleri indir.",
            tip: "İpucu: `npm install`.",
          },
        ],
      },
      {
        title: "3. Çalıştır ve ilk commit",
        learn: ["V8 Engine"],
        question:
          "`npm run dev` ile `npm run build` arasındaki fark nedir?",
        tasks: [
          {
            goal: "Development server'ı başlat ve örnek sayfayı tarayıcıda aç.",
            tip: "İpucu: `npm run dev` → localhost linki.",
          },
          {
            goal: "Bu ilk hali GitHub'a gönder.",
            tip: "Üç adım — `git add .` → `git commit -m \"setup\"` → `git push`.",
          },
        ],
      },
      {
        title: "4. Sayfayı temizle",
        learn: ["JSX", "DOM"],
        question: "JSX nedir ve normal HTML'den farkı nedir?",
        tasks: [
          {
            goal: "`App.tsx` içindeki demo içeriği tamamen sil.",
            tip: "return içini boşalt, sade bir `<div>` bırak.",
          },
          {
            goal: "Ekrana 'Yapılacaklar' başlığı bas.",
            tip: "Bir `<h1>` ekle (JSX).",
          },
        ],
      },
      {
        title: "5. Girdi alanını koy",
        learn: ["Fragment"],
        question:
          "Bir component neden tek bir kök element döndürmeli? Fragment bunu nasıl çözer?",
        tasks: [
          {
            goal: "Görev yazmak için bir metin `<input>`'u ekle.",
            tip: "Şimdilik çalışması gerekmiyor, sadece görünsün.",
          },
          {
            goal: "Yanına bir 'Ekle' `<button>`'ı koy.",
            tip: "`<input>` + `<button>`.",
          },
        ],
      },
      {
        title: "6. TodoItem component'ini oluştur",
        learn: ["Component"],
        question:
          "Arayüzü ayrı component'lere bölmek hangi avantajları sağlar?",
        tasks: [
          {
            goal: "`TodoItem.tsx` adında yeni bir dosya aç ve bir component yaz.",
            tip: "function component + `export default`.",
          },
          {
            goal: "TodoItem bir `<li>` döndürsün, içinde sabit bir metin olsun.",
            tip: "Önce sabit; veriyi sonra geçeceğiz.",
          },
          {
            goal: "App içinde TodoItem'ı import edip kullan.",
            tip: "`import TodoItem from './TodoItem'` → `<TodoItem />`.",
          },
        ],
      },
      {
        title: "7. Props ile veri geç",
        learn: ["Props"],
        question: "Props neden child component tarafından değiştirilemez?",
        tasks: [
          {
            goal: "TodoItem'a `text` adında bir prop tanımla.",
            tip: "`function TodoItem({ text })`.",
          },
          {
            goal: "App'ten `<TodoItem text=\"Süt al\" />` ile metni gönder.",
            tip: "JSX attribute.",
          },
          {
            goal: "Gelen `text`'i `<li>` içinde göster.",
            tip: "`{text}`.",
          },
        ],
      },
      {
        title: "8. State ile listeyi tut",
        learn: ["State", "useState", "List Rendering", "key Prop"],
        question: "State değiştiğinde React ne yapar?",
        tasks: [
          {
            goal: "App'te görevleri tutan bir state dizisi oluştur.",
            tip: "`const [todos, setTodos] = useState([...])` (başta birkaç örnek).",
          },
          {
            goal: "Diziyi `map` ile gezip her eleman için bir TodoItem bas.",
            tip: "`todos.map(t => <TodoItem key={t.id} text={t.text} />)`.",
          },
        ],
      },
      {
        title: "9. Input'u state'e bağla (controlled)",
        learn: ["Controlled Component"],
        question: "Controlled component nedir, 'tek doğru kaynak' ne demek?",
        tasks: [
          {
            goal: "Input'un değerini bir state'te tut.",
            tip: "`const [text, setText] = useState('')`.",
          },
          {
            goal: "Input'a `value` ver ve `onChange` ile state'i güncelle.",
            tip: "`value={text} onChange={e => setText(e.target.value)}`.",
          },
        ],
      },
      {
        title: "10. Görev ekle",
        learn: ["Spread (...)", "Immutability"],
        question:
          "Neden `todos.push(x)` yerine `[...todos, x]` kullanıyoruz?",
        tasks: [
          {
            goal: "'Ekle'ye basınca yeni görevi listeye ekle.",
            tip: "`setTodos([...todos, { id, text }])`. Eski diziyi mutasyona uğratma.",
          },
          {
            goal: "Ekledikten sonra input'u temizle.",
            tip: "`setText('')`.",
          },
        ],
      },
      {
        title: "11. Görev sil",
        learn: ["filter()"],
        question: "Listeden eleman silmek için neden `filter` uygun?",
        tasks: [
          {
            goal: "Her TodoItem'a 'Sil' butonu koy.",
            tip: "Butonu prop'la gelen bir `onDelete`'e bağla.",
          },
          {
            goal: "Basınca o görevi listeden çıkar.",
            tip: "`setTodos(todos.filter(t => t.id !== id))`.",
          },
        ],
      },
      {
        title: "12. Tamamlandı işareti",
        learn: ["map()", "Mutation"],
        question:
          "Bir dizideki TEK bir elemanı immutable şekilde nasıl güncellersin?",
        tasks: [
          {
            goal: "Bir göreve tıklayınca 'done' değerini tersine çevir.",
            tip: "`map` içinde id eşleşince `{ ...t, done: !t.done }`.",
          },
          {
            goal: "Tamamlanan görev görsel olarak farklı görünsün.",
            tip: "Koşullu className veya inline style (line-through).",
          },
        ],
      },
      {
        title: "13. Boş durum ve sayaç",
        learn: ["Conditional Rendering", "Ternary (?:)"],
        question:
          "JSX içinde koşullu render için hangi yöntemleri kullanabilirsin?",
        tasks: [
          {
            goal: "Hiç görev yoksa 'Henüz görev yok' mesajı göster.",
            tip: "`todos.length === 0 ? ... : ...`.",
          },
          {
            goal: "Kaç görevin tamamlanmadığını ekranda göster.",
            tip: "`filter` + `.length`.",
          },
        ],
      },
      {
        title: "14. Müşteri isteği: Görünüm seçenekleri",
        learn: ["CSS Grid", "Flexbox"],
        question:
          "Aynı veriyi iki farklı layout'ta (liste/grid) tek component'te nasıl gösterirsin?",
        tasks: [
          {
            goal: "Görevleri liste ve kart (grid) düzeni arasında değiştiren bir düğme ekle.",
            tip: "Bir `layout` state'i + koşullu className (flex kolon ↔ CSS Grid).",
          },
          {
            goal: "Seçilen düzen sayfa yenilense de hatırlansın.",
            tip: "`layout`'u localStorage'a yaz, açılışta oku.",
          },
        ],
      },
      {
        title: "15. Kalıcılık (localStorage)",
        learn: ["useEffect"],
        question: "useEffect'in dependency array'i ne işe yarar?",
        tasks: [
          {
            goal: "Görevler F5 ile yenileyince KAYBOLMASIN.",
            tip: "`localStorage` + bir `useEffect` ile senkronize et.",
          },
          {
            goal: "Açılışta kayıtlı görevler otomatik yüklensin.",
            tip: "`useState`'in başlangıç değerini localStorage'dan al.",
          },
        ],
      },
      {
        title: "16. Build & deploy",
        learn: ["Deploy"],
        question:
          "Yayınladığın site neden senin localhost'undan farklı bir ortamda çalışır?",
        tasks: [
          {
            goal: "Production için derle ve hatasız olduğunu doğrula.",
            tip: "`npm run build`.",
          },
          {
            goal: "Siteyi canlı bir linkle yayınla.",
            tip: "Vercel veya Netlify, repo'yu bağla.",
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
      "Gerçek veriyle ilk tanışma. Bir şehir ara, canlı API'den hava durumunu çek ve göster. Amaç: useEffect, fetch, async akış, loading/error state — küçük adımlarla.",
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
        learn: ["Next.js", "Framework"],
        question: "Next.js, React'in üstüne ne katar? Bir framework neden işe yarar?",
        tasks: [
          {
            goal: "GitHub'da repo aç ve modern bir Next.js projesi başlat.",
            tip: "`npx create-next-app@latest` (TypeScript + App Router).",
          },
          {
            goal: "Projeyi çalıştır ve hazır sayfayı gör.",
            tip: "`npm run dev` → localhost:3000.",
          },
        ],
      },
      {
        title: "2. Sayfayı temizle ve client yap",
        learn: ["Server Component"],
        question:
          "Next.js App Router'da `\"use client\"` ne zaman ve neden gerekir?",
        tasks: [
          {
            goal: "`app/page.tsx` içindeki örnek içeriği sil, ortada bir alan bırak.",
            tip: "Sade bir `<main>`.",
          },
          {
            goal: "Sayfa interaktif olacağı için en üste `\"use client\"` yaz.",
            tip: "Dosyanın ilk satırı.",
          },
        ],
      },
      {
        title: "3. Arama formunu kur",
        learn: ["Controlled Component"],
        question: "Form gönderiminde `e.preventDefault()` olmazsa ne olur?",
        tasks: [
          {
            goal: "Şehir adı için bir `<form>` + `<input>` + `<button>` koy.",
            tip: "Controlled input.",
          },
          {
            goal: "Yazılan şehir adını bir state'te tut.",
            tip: "`useState` + `onChange`.",
          },
          {
            goal: "Form gönderilince sayfa yenilenmesin, senin kodun çalışsın.",
            tip: "`onSubmit` + `e.preventDefault()`.",
          },
        ],
      },
      {
        title: "4. API anahtarını güvenle sakla",
        learn: ["API", "Environment Variable"],
        question:
          "API anahtarını koda yazmak yerine neden `.env.local` kullanırız?",
        tasks: [
          {
            goal: "Ücretsiz bir hava durumu API'sine kaydol ve anahtar al.",
            tip: "Örn. OpenWeatherMap.",
          },
          {
            goal: "Anahtar kaynak kodda açıkça GÖRÜNMESİN.",
            tip: "`.env.local` + `.gitignore`'da olduğundan emin ol.",
          },
        ],
      },
      {
        title: "5. Veriyi çek",
        learn: ["fetch API", "async / await", "JSON"],
        question: "`fetch` neden 404/500'de hata fırlatmaz? Nasıl kontrol edersin?",
        tasks: [
          {
            goal: "Arama yapılınca o şehrin gerçek verisini internetten getir.",
            tip: "`fetch(url)` + `async/await`, dönen JSON'u parse et.",
          },
          {
            goal: "Gelen veriyi bir state'e koy.",
            tip: "`const [weather, setWeather] = useState(null)`.",
          },
        ],
      },
      {
        title: "6. Sonucu göster (WeatherCard)",
        learn: ["Component", "Props"],
        question: "Veriyi gösteren parçayı neden ayrı bir component yaptın?",
        tasks: [
          {
            goal: "Hava durumunu gösteren `WeatherCard` component'ini yaz.",
            tip: "Veriyi props ile al.",
          },
          {
            goal: "Sıcaklık, şehir ve durumu kartta göster.",
            tip: "`{weather.temp}` vb.",
          },
        ],
      },
      {
        title: "7. Durumları yönet (UX)",
        learn: ["Conditional Rendering", "Error Handling"],
        question: "Loading, error ve başarı durumlarını nasıl ayrı ayrı yönetirsin?",
        tasks: [
          {
            goal: "Veri gelene kadar 'Yükleniyor...' göster.",
            tip: "`loading` state + conditional rendering.",
          },
          {
            goal: "Olmayan şehir aranınca anlaşılır bir hata göster.",
            tip: "`try/catch` + `error` state.",
          },
        ],
      },
      {
        title: "8. İlk yükleme (useEffect)",
        learn: ["useEffect"],
        question: "Boş dependency array'li `useEffect(() => {}, [])` ne zaman çalışır?",
        tasks: [
          {
            goal: "Sayfa ilk açıldığında varsayılan bir şehir otomatik yüklensin.",
            tip: "`useEffect(() => {...}, [])`.",
          },
        ],
      },
      {
        title: "9. Zenginleştir ve yayınla",
        learn: ["Responsive & Media Query", "CSS Grid", "Deploy"],
        question:
          "Vercel'de environment variable'ı neden ayrıca eklemen gerekir?",
        tasks: [
          {
            goal: "5 günlük tahmini her güne bir kart olacak şekilde listele.",
            tip: "`forecast.map(...)` + `key`.",
          },
          {
            goal: "Hava durumuna göre ikon/arka plan değişsin.",
            tip: "Koşullu emoji/className.",
          },
          {
            goal: "Projeyi yayınla; API key'i Vercel'de env variable olarak ekle.",
            tip: "Vercel → Environment Variables.",
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
      "İlk full-stack projen. Kullanıcılar kayıt olup giriş yapsın, kendi yazılarını ekleyip düzenlesin ve silsin. Amaç: database, authentication, CRUD, Context ve custom hook — adım adım.",
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
        title: "1. Database'i bağla",
        learn: ["Database", "SQL"],
        question: "Veriyi tarayıcı (localStorage) yerine neden database'de tutarız?",
        tasks: [
          {
            goal: "Yazılar sunucu kapansa bile kalıcı bir yerde saklansın.",
            tip: "Bir database (Postgres). Ücretsiz: Supabase / Neon.",
          },
          {
            goal: "Bağlantı bilgisini `.env`'e koy.",
            tip: "`DATABASE_URL`.",
          },
        ],
      },
      {
        title: "2. ORM ve şema",
        learn: ["ORM", "Schema", "Relation (İlişki)"],
        question: "ORM ne işe yarar? One-to-many ilişki ne demek?",
        tasks: [
          {
            goal: "Database'i JavaScript nesneleriyle yönetmek için ORM kur.",
            tip: "Prisma.",
          },
          {
            goal: "`User` ve `Post` tablolarını ve aralarındaki ilişkiyi tanımla.",
            tip: "Bir kullanıcının çok yazısı olur — one-to-many.",
          },
        ],
      },
      {
        title: "3. Migration",
        learn: ["Migration"],
        question: "Migration nedir, şema değişince neden gerekir?",
        tasks: [
          {
            goal: "Tanımladığın tabloları gerçekten database'e oluştur.",
            tip: "`npx prisma migrate dev`.",
          },
        ],
      },
      {
        title: "4. Authentication kur",
        learn: ["Authentication"],
        question: "Auth'u sıfırdan yazmak yerine hazır çözüm kullanmak neden daha güvenli?",
        tasks: [
          {
            goal: "Kullanıcılar kendi hesabıyla kayıt olup giriş yapabilsin.",
            tip: "Auth.js (NextAuth).",
          },
          {
            goal: "Şifreleri DÜZ METİN saklama.",
            tip: "Password hashing (bcrypt) veya OAuth.",
          },
        ],
      },
      {
        title: "5. Sayfayı koru",
        learn: ["Authorization"],
        question: "Authentication ile authorization arasındaki fark nedir?",
        tasks: [
          {
            goal: "Giriş yapmamış biri 'Yeni Yazı' sayfasına ULAŞAMASIN.",
            tip: "Oturum kontrolü + login'e redirect.",
          },
        ],
      },
      {
        title: "6. Oturumu paylaş (Context)",
        learn: ["Context API", "Prop Drilling"],
        question: "Context API, prop drilling problemini nasıl çözer?",
        tasks: [
          {
            goal: "Giriş yapan kullanıcı bilgisine her component'ten ulaşılsın.",
            tip: "Context API (provider + consumer).",
          },
        ],
      },
      {
        title: "7. Custom hook",
        learn: ["Custom Hook"],
        question: "Custom hook ne zaman yazılır? `use` öneki neden zorunlu?",
        tasks: [
          {
            goal: "Kullanıcı bilgisini okuma işini tek satıra indir.",
            tip: "Bir `useAuth()` custom hook'u.",
          },
          {
            goal: "Header'da giriş varsa 'Çıkış', yoksa 'Giriş' göster.",
            tip: "Conditional rendering, oturum state'ine bak.",
          },
        ],
      },
      {
        title: "8. Oluştur (Create)",
        learn: ["CRUD", "RESTful API", "HTTP Metotları"],
        question: "REST'te Create işlemi için hangi HTTP metodu kullanılır ve neden?",
        tasks: [
          {
            goal: "Kullanıcı yeni bir yazı oluşturabilsin (başlık + içerik).",
            tip: "Bir API route + `POST`.",
          },
        ],
      },
      {
        title: "9. Listele ve oku (Read)",
        learn: ["HTTP Status Code'ları"],
        question: "Dynamic route (`/post/[id]`) nasıl çalışır?",
        tasks: [
          {
            goal: "Tüm yazılar ana sayfada listelensin.",
            tip: "Read + map.",
          },
          {
            goal: "Bir yazıya tıklayınca detayı açılsın.",
            tip: "Dynamic route (`/post/[id]`).",
          },
        ],
      },
      {
        title: "10. Güncelle ve sil (Update/Delete)",
        question: "PUT ile PATCH arasındaki fark nedir?",
        tasks: [
          {
            goal: "Kullanıcı kendi yazısını düzenleyebilsin.",
            tip: "`PUT`/`PATCH`.",
          },
          {
            goal: "Kullanıcı kendi yazısını silebilsin.",
            tip: "`DELETE`.",
          },
        ],
      },
      {
        title: "11. Yetki kontrolü",
        learn: ["Authorization"],
        question:
          "Yetki kontrolünü neden hem frontend hem backend'de yapmak gerekir?",
        tasks: [
          {
            goal: "Bir yazıyı SADECE sahibi düzenleyip silebilsin.",
            tip: "`post.authorId === session.user.id` (sunucuda).",
          },
        ],
      },
      {
        title: "12. Doğrulama + taslak kaydı",
        learn: ["word-break & overflow", "useEffect", "Debounce & Throttle"],
        question: "Form doğrulamasını yalnızca frontend'de yapmak neden yetersiz?",
        tasks: [
          {
            goal: "Boş başlıkla yazı gönderilince uyarı çıksın, kayıt olmasın.",
            tip: "Form validation (Zod).",
          },
          {
            goal: "Kullanıcı yazarken taslak otomatik yerelde saklansın.",
            tip: "Debounce + localStorage; bölüm bazlı anahtar.",
          },
          {
            goal: "Sayfa kapanıp açılınca yarım taslak geri yüklensin.",
            tip: "Açılışta localStorage'dan oku.",
          },
        ],
      },
      {
        title: "13. Deploy",
        learn: ["Deploy", "Environment Variable"],
        question: "Database'li bir uygulamayı canlıya alırken nelere dikkat edersin?",
        tasks: [
          {
            goal: "Projeyi database'iyle birlikte canlıya al.",
            tip: "Vercel + hosted DB, `DATABASE_URL` ekle.",
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
        question: "Kod yazmadan önce data model tasarlamak neden önemli?",
        tasks: [
          {
            goal: "Kullanıcı, abonelik ve plan ilişkilerini tasarla.",
            tip: "Data model / schema (free, pro planları).",
          },
          {
            goal: "Klasör yapısını büyüyebilecek şekilde kur.",
            tip: "Feature-based folder structure.",
          },
        ],
      },
      {
        title: "2. Design system",
        learn: ["Component"],
        question: "Component library kullanmak tutarlılık için ne sağlar?",
        tasks: [
          {
            goal: "Buton, input gibi parçalar tüm üründe tutarlı görünsün.",
            tip: "Design system (örn. shadcn/ui).",
          },
        ],
      },
      {
        title: "3. Ödemeyi bağla",
        question: "Kart bilgisini neden kendi sunucunda TUTMAMALISIN?",
        tasks: [
          {
            goal: "Kullanıcı kredi kartıyla güvenli ödeme yapabilsin.",
            tip: "Stripe Checkout (hosted page).",
          },
          {
            goal: "Gerçek para harcamadan test et.",
            tip: "Stripe test mode + test kartları.",
          },
        ],
      },
      {
        title: "4. Webhook",
        learn: ["Webhook"],
        question: "Webhook nedir? Polling yerine neden tercih edilir?",
        tasks: [
          {
            goal: "Ödeme tamamlanınca kullanıcı OTOMATİK 'Pro' olsun.",
            tip: "Webhook endpoint, `checkout.session.completed`.",
          },
          {
            goal: "Abonelik iptal edilince erişim geri alınsın.",
            tip: "`customer.subscription.deleted` event'i.",
          },
        ],
      },
      {
        title: "5. Dashboard ve roller",
        question: "Plan/rol kontrolünü sadece frontend'de yapmak neden tehlikeli?",
        tasks: [
          {
            goal: "Kullanıcı giriş yapınca kendi paneline ulaşsın.",
            tip: "Protected dashboard route.",
          },
          {
            goal: "Free kullanıcı Pro özelliklerini GÖREMESİN/kullanamasın.",
            tip: "Role/plan-based access (hem frontend hem backend).",
          },
        ],
      },
      {
        title: "6. Admin & analytics",
        question: "Bir SaaS'ta hangi temel metrikleri izlemek istersin?",
        tasks: [
          {
            goal: "Kaç kullanıcı ve abonelik var, yöneticiye özetle.",
            tip: "Admin dashboard + temel analytics.",
          },
        ],
      },
      {
        title: "7. Testler",
        question: "Unit test ile e2e test arasındaki fark nedir, hangisi ne zaman?",
        tasks: [
          {
            goal: "Bir fonksiyonu bozduğunu canlıdan ÖNCE fark et.",
            tip: "Unit test (Vitest/Jest).",
          },
          {
            goal: "'Giriş → ödeme' gibi tam akış gerçekten çalışsın.",
            tip: "e2e test (Playwright).",
          },
        ],
      },
      {
        title: "8. CI/CD",
        learn: ["CI/CD"],
        question: "CI/CD pipeline'ı bir ekibe ne kazandırır?",
        tasks: [
          {
            goal: "Her push'ta testler otomatik çalışsın; kırmızıysa merge engellensin.",
            tip: "GitHub Actions.",
          },
        ],
      },
      {
        title: "9. Yayın ve izleme",
        learn: ["Deploy"],
        question: "Error monitoring olmadan production'da ne kaçırırsın?",
        tasks: [
          {
            goal: "Canlıda bir kullanıcı hata alınca SENİN haberin olsun.",
            tip: "Error monitoring (Sentry).",
          },
          {
            goal: "Production checklist'i gözden geçir (env, rate limit, secrets).",
            tip: "Güvenlik kontrolleri.",
          },
          {
            goal: "Ürünü canlıya al, gerçek kullanıcıdan geri bildirim topla. 🚀",
            tip: "Deploy + feedback döngüsü.",
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
            goal: "Sunucuyla SÜREKLI açık, çift yönlü bir hat kur (her mesaj için yeniden istek atma).",
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
