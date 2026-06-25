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
 * Bir projenin hangi track'e (teknik alana) ait olduğu.
 * Track'ler, üstlerindeki "path" (kariyer yolu) seçimine göre filtrelenerek gösterilir.
 *  - frontend / backend / devops: Full-Stack yolunun bileşenleri.
 *  - data-engineering / ai: bağımsız uzmanlık yolları.
 */
export type Track =
  | "frontend"
  | "backend"
  | "devops"
  | "data-engineering"
  | "data-science"
  | "ai";

export type TierId = "intern" | "junior" | "mid" | "senior" | "staff" | "architect" | "lead";

export type Tier = {
  id: TierId;
  label: string;
  emoji: string;
  order: number;
  bgClass: string;
  accent: string;
};

export const tiers: Tier[] = [
  { id: "intern", label: "Intern (Stajyer)", emoji: "🥚", order: 0, bgClass: "from-slate-900/60 to-slate-950/60 border-slate-800", accent: "slate" },
  { id: "junior", label: "Junior", emoji: "🌱", order: 1, bgClass: "from-emerald-950/20 to-emerald-950/40 border-emerald-900/30", accent: "emerald" },
  { id: "mid", label: "Mid", emoji: "🌿", order: 2, bgClass: "from-sky-950/20 to-sky-950/40 border-sky-900/30", accent: "sky" },
  { id: "senior", label: "Senior", emoji: "🌳", order: 3, bgClass: "from-violet-950/20 to-violet-950/40 border-violet-900/30", accent: "violet" },
  { id: "staff", label: "Staff / Expert", emoji: "🔧", order: 4, bgClass: "from-amber-950/20 to-amber-950/40 border-amber-900/30", accent: "amber" },
  { id: "architect", label: "Architect", emoji: "🏛️", order: 5, bgClass: "from-rose-950/20 to-rose-950/40 border-rose-900/30", accent: "rose" },
  { id: "lead", label: "Lead", emoji: "👑", order: 6, bgClass: "from-yellow-950/30 via-amber-950/20 to-yellow-950/30 border-yellow-900/40", accent: "yellow" },
];

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
  tier?: TierId;
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
    label: "Backend",
    emoji: "🗄️",
    description: "Veri, kimlik doğrulama ve sunucu tarafı.",
  },
  {
    id: "devops",
    label: "DevOps",
    emoji: "🛰️",
    description: "Dağıtım, ölçekleme ve üretim altyapısı.",
  },
  {
    id: "data-engineering",
    label: "Data Engineering",
    emoji: "📊",
    description: "Veri boru hatları (pipeline), ETL ve veri depolama — veriyi AKITAN taraf.",
  },
  {
    id: "data-science",
    label: "Data Science",
    emoji: "🔬",
    description: "İstatistik, analiz ve makine öğrenmesi — veriden TAHMİN üreten taraf.",
  },
  {
    id: "ai",
    label: "AI",
    emoji: "🤖",
    description: "LLM'ler, RAG ve akıllı uygulamalar.",
  },
];

/**
 * Kariyer yolları (path). Kullanıcı bir path seçer; yol haritası o path'in
 * `tracks` listesine göre filtrelenir. Bir track birden çok path'te yer alabilir
 * (örn. Full-Stack hem frontend hem backend hem devops'u kapsar).
 */
export type Path = {
  id: string;
  label: string;
  emoji: string;
  description: string;
  /** Bu path'te (bu sırayla) gösterilecek track'ler. */
  tracks: Track[];
  /** İçerik henüz hazırlanıyorsa "yakında" rozeti göster. */
  soon?: boolean;
};

export const paths: Path[] = [
  {
    id: "fullstack",
    label: "Full-Stack Developer",
    emoji: "🧩",
    description:
      "Frontend + Backend + DevOps. Uçtan uca ürün geliştirmeyi öğren — varsayılan yol.",
    tracks: ["frontend", "backend", "devops"],
  },
  {
    id: "frontend",
    label: "Frontend",
    emoji: "🎨",
    description: "Arayüz, React ve kullanıcı deneyimi.",
    tracks: ["frontend"],
  },
  {
    id: "backend",
    label: "Backend",
    emoji: "🗄️",
    description: "API'ler, veritabanı ve sunucu tarafı — küçük bir Todo API'siyle başla.",
    tracks: ["backend"],
  },
  {
    id: "devops",
    label: "DevOps",
    emoji: "🛰️",
    description: "Container, ölçekleme ve üretim altyapısı.",
    tracks: ["devops"],
  },
  {
    id: "data-engineering",
    label: "Data Engineering",
    emoji: "📊",
    description: "Veri boru hatları, ETL ve veri depolama — veriyi AKITAN taraf.",
    tracks: ["data-engineering"],
  },
  {
    id: "data-science",
    label: "Data Science",
    emoji: "🔬",
    description: "EDA, istatistik ve makine öğrenmesi — veriden TAHMİN üreten taraf.",
    tracks: ["data-science"],
  },
  {
    id: "data",
    label: "Veri (DE + DS)",
    emoji: "🧬",
    description: "Veri mühendisliği + veri bilimini birlikte gez; aradaki farkı yaşayarak öğren.",
    tracks: ["data-engineering", "data-science"],
  },
  {
    id: "ai",
    label: "AI",
    emoji: "🤖",
    description: "LLM uygulamaları, tool use ve RAG.",
    tracks: ["ai"],
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
    id: "personal-page",
    level: 1,
    track: "frontend",
    project: "Kişisel Sayfa (HTML/CSS)",
    difficulty: "Başlangıç",
    emoji: "🎨",
    accent: "emerald",
    tier: "intern",
    description:
      "Web dünyasına ilk adım. Kendini tanıttığın, sevdiğin teknolojileri ve projelerini sergilediğin semantik bir kişisel web sayfası geliştir. Amaç: HTML yapısı, CSS stil yönetimi, Flexbox/Grid ve responsive tasarım temellerine hakim olmak.",
    skills: [
      "HTML5",
      "Semantik Etiketler",
      "CSS Seçiciler",
      "Flexbox",
      "CSS Grid",
      "Responsive Tasarım",
      "Media Queries",
    ],
    steps: [
      {
        title: "1. HTML yapısını oluştur",
        learn: ["HTML"],
        question: "HTML'de semantik (anlamsal) etiketlerin kullanılması SEO ve erişilebilirlik açısından neden önemlidir?",
        tasks: [
          {
            goal: "GitHub'da 'personal-website' adında bir repo oluştur ve bilgisayarına indir.",
            tip: "İpucu: git clone <url>.",
          },
          {
            goal: "index.html dosyası oluşturup temel semantik etiketleri (<header>, <main>, <section>, <footer>) ekle.",
            tip: "HTML şablonu için ! kısayolunu kullan.",
          },
        ],
      },
      {
        title: "2. Flexbox ile navigasyon barı",
        learn: ["Flexbox"],
        question: "Flexbox'ta justify-content ile align-items arasındaki temel fark nedir?",
        tasks: [
          {
            goal: "Sayfanın üst kısmına Flexbox kullanarak responsive bir menü barı yerleştir; logoyu sola, menü linklerini sağa yasla.",
            tip: "display: flex ve justify-content: space-between kullan.",
          },
        ],
      },
      {
        title: "3. CSS Grid ile projeler bölümü",
        learn: ["CSS Grid"],
        question: "CSS Grid kullanırken auto-fit ile auto-fill değerleri arasındaki fark nedir?",
        tasks: [
          {
            goal: "Grid kullanarak portfolyo projelerini sergileyeceğin 3 kolonlu ve responsive bir kart yerleşimi tasarla.",
            tip: "grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)) kullan.",
          },
        ],
      },
      {
        title: "4. Responsive yap (Media Queries)",
        learn: ["Responsive & Media Query"],
        question: "Responsive tasarımda mobil öncelikli (mobile-first) geliştirme yapmak ne anlama gelir?",
        tasks: [
          {
            goal: "Sayfanın mobil cihazlarda da kusursuz görünmesi için en az bir kırılma noktası (breakpoint) ekle.",
            tip: "@media (max-width: 768px) bloğu kullan.",
          },
        ],
      },
      {
        title: "5. Canlıya al (Deploy)",
        learn: ["Deploy"],
        question: "Tamamen statik bir sitenin sunulması (hosting) ile dinamik bir web sunucusunun çalıştırılması arasındaki fark nedir?",
        tasks: [
          {
            goal: "Siteni internete ücretsiz olarak yükle ve bağlantıyı doğrula.",
            tip: "GitHub Pages, Netlify veya Vercel'e repo'yu bağlayıp yayınla.",
          },
        ],
      },
    ],
  },
  {
    id: "todo",
    level: 1,
    track: "frontend",
    project: "To-Do List (React)",
    difficulty: "Başlangıç",
    emoji: "✅",
    accent: "emerald",
    tier: "junior",
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
    tier: "junior",
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

  // ═══════════════════════════ SEVİYE 2 ═══════════════════════════
  {
    id: "movie-discovery",
    level: 2,
    track: "frontend",
    project: "Film & Dizi Keşif (TMDB API)",
    difficulty: "Kolay-Orta",
    emoji: "🎬",
    accent: "sky",
    tier: "junior",
    description:
      "Dinamik yönlendirme ve API entegrasyonu. TMDB API kullanarak filmleri listele, kategoriye göre filtrele, arama yap ve detay sayfaları oluştur. Amaç: dynamic routes, URL state, pagination ve skeleton loading.",
    skills: [
      "Next.js (App Router)",
      "Dynamic Routing",
      "URL Search Params",
      "Pagination",
      "Skeleton Loading",
      "TMDB API",
    ],
    steps: [
      {
        title: "1. TMDB Entegrasyonu & Listeleme",
        learn: ["API", "Environment Variable"],
        question: "API anahtarlarını istemci tarafında (browser) doğrudan kullanmak yerine Next.js route handler (sunucu) arkasına gizlemek neden gereklidir?",
        tasks: [
          {
            goal: "TMDB API'sinden popüler filmleri çekip ana sayfada kartlar halinde listele.",
            tip: "Next.js server component içinde fetch at ve .env.local'daki API key'i kullan.",
          },
        ],
      },
      {
        title: "2. Dinamik Yönlendirme (Dynamic Routing)",
        learn: ["Next.js", "URL"],
        question: "Next.js App Router'da dynamic route ([id]) klasör yapısı nasıl çalışır? params nesnesi nasıl elde edilir?",
        tasks: [
          {
            goal: "Bir filme tıklandığında /movie/[id] sayfasına gitmesini sağla ve detay sayfasını tasarla.",
            tip: "Link bileşeni ile [id] parametresini geçir ve sayfada film detaylarını göster.",
          },
        ],
      },
      {
        title: "3. URL ile Arama ve Filtreleme",
        learn: ["Query Parameters", "State"],
        question: "Arama ve filtreleme durumlarını (state) React state'i yerine URL Query Params'da saklamanın kullanıcı deneyimi (paylaşılabilirlik, geri butonu) açısından faydaları nelerdir?",
        tasks: [
          {
            goal: "Arama çubuğu ve kategori filtrelerini URL query parametrelerine (?search=avatar&genre=action) bağla.",
            tip: "Next.js useSearchParams ve useRouter hook'larını kullan.",
          },
        ],
      },
      {
        title: "4. Sayfalama (Pagination)",
        learn: ["Pagination"],
        question: "İstemci tarafında sayfalama (client-side pagination) ile sunucu tarafında sayfalama (server-side pagination) arasındaki fark nedir? Hangisi büyük veri kümeleri için uygundur?",
        tasks: [
          {
            goal: "Kullanıcının sonraki sayfadaki filmleri görmesini sağlayan sayfalama düğmeleri ekle.",
            tip: "URL'e ?page=2` parametresi ekleyip TMDB API'sine sayfa numarasını gönder.",
          },
        ],
      },
      {
        title: "5. Yükleme Durumları (Skeleton Loading)",
        learn: ["Suspense", "Conditional Rendering"],
        question: "Kullanıcıya veri yüklenirken düz bir spinner/loading yazısı göstermek yerine Skeleton (iskelet) yer tutucular göstermek algılanan performansı (perceived performance) nasıl etkiler?",
        tasks: [
          {
            goal: "Filmler yüklenirken boş film kartı iskeletleri (Skeleton) gösteren bir yükleme ekranı ekle.",
            tip: "Next.js loading.tsx dosyası veya React Suspense ile Skeleton kartlarını render et.",
          },
        ],
      },
    ],
  },

  // ═══════════════════════════ SEVİYE 3 ═══════════════════════════
  {
    id: "kanban",
    level: 3,
    track: "frontend",
    project: "Kanban Board (Drag & Drop)",
    difficulty: "Orta",
    emoji: "🗂️",
    accent: "lime",
    tier: "mid",
    description:
      "Trello tarzı bir görev panosu. Kartları sürükleyip bırakarak kolonlar arasında taşı. Amaç: türetilmiş state, sürükle-bırak, kalıcılık ve daha karmaşık bir veri modelini React'te yönetmek — adım adım.",
    skills: [
      "Drag & Drop",
      "Türetilmiş state",
      "Immutable güncelleme",
      "localStorage",
      "Component kompozisyonu",
      "useReducer",
      "Optimistic UI",
    ],
    steps: [
      {
        title: "1. Veri modelini tasarla",
        learn: ["State", "Immutability", "Data Structure"],
        question: "Kolonları ve kartları nasıl bir veri yapısında tutmak, taşıma/güncelleme işini kolaylaştırır?",
        tasks: [
          {
            goal: "Kolonları (örn. Yapılacak / Yapılıyor / Bitti) ve her kolonun kartlarını tutan bir state tasarla.",
            tip: "Kart id'lerini kolonlara bağla; kartların kendisini ayrı bir map'te tutmak taşımayı kolaylaştırır.",
          },
          {
            goal: "Başlangıç için birkaç örnek kart ile panoyu ekrana bas.",
            tip: "Kolonları `map`'le, her kolonun kartlarını içeride `map`'le (`key` unutma).",
          },
        ],
      },
      {
        title: "2. Kart ve kolon component'leri",
        learn: ["Component", "Props", "List Rendering"],
        question: "Pano, Kolon ve Kart'ı ayrı component'lere bölmek hangi avantajı sağlar?",
        tasks: [
          {
            goal: "`Column` ve `Card` component'lerini ayır; veriyi props ile geçir.",
            tip: "Column kartları alıp listeler; Card tek bir kartı çizer.",
          },
        ],
      },
      {
        title: "3. Kart ekle/sil",
        learn: ["Spread (...)", "filter()", "Immutability"],
        question: "Bir kartı immutable şekilde eklerken/ silerken iç içe state'i nasıl bozmadan güncellersin?",
        tasks: [
          {
            goal: "Bir kolona yeni kart eklenebilsin.",
            tip: "Yalnızca ilgili kolonu kopyalayıp güncelle; diğerlerine dokunma (spread).",
          },
          {
            goal: "Bir kart silinebilsin.",
            tip: "`filter` ile kartı çıkar; kart map'inden de temizle.",
          },
        ],
      },
      {
        title: "4. Sürükle-bırak (drag & drop)",
        learn: ["Input Handling", "Optimistic UI"],
        question: "HTML5 drag-and-drop olaylarında `onDragStart`, `onDragOver` ve `onDrop` sırasıyla ne işe yarar?",
        tasks: [
          {
            goal: "Bir kartı tutup başka bir kolona sürükleyip bırakabilesin.",
            tip: "`draggable`, `onDragStart` (taşınan kart id'si), `onDrop` (hedef kolon).",
          },
          {
            goal: "Bırakınca kart hedef kolona anında geçsin.",
            tip: "Kaynaktan çıkar, hedefe ekle — tek bir immutable güncellemede yap.",
          },
        ],
      },
      {
        title: "5. Sıralamayı koru",
        learn: ["Array (Dizi)", "key Prop"],
        question: "Aynı kolon içinde kartların sırasını sürüklemeyle değiştirmek için diziyi nasıl yeniden düzenlersin?",
        tasks: [
          {
            goal: "Bir kartı aynı kolon içinde yukarı/aşağı taşıyabilesin.",
            tip: "Hedef index'i hesapla; diziden çıkar, doğru konuma ekle.",
          },
        ],
      },
      {
        title: "6. State'i sadeleştir (useReducer)",
        learn: ["useReducer", "Pure Function"],
        question: "Çok parçalı bu state için `useReducer`, dağınık `useState`'lere göre neyi kolaylaştırır?",
        tasks: [
          {
            goal: "Ekle/sil/taşı işlemlerini tek bir reducer'da action olarak topla.",
            tip: "`dispatch({ type: 'MOVE_CARD', ... })`; reducer saf ve immutable olsun.",
          },
        ],
      },
      {
        title: "7. Kalıcılık + cila",
        learn: ["useEffect", "localStorage / sessionStorage", "Deploy"],
        question: "Pano durumunu kaydederken her küçük değişiklikte yazmak yerine ne yapmak daha doğru olabilir?",
        tasks: [
          {
            goal: "Pano F5 sonrası aynı kalsın.",
            tip: "State'i `useEffect` ile localStorage'a yaz; açılışta oku.",
          },
          {
            goal: "Boş kolona 'kart yok' ipucu ve sürükleme sırasında görsel vurgu ekle.",
            tip: "Koşullu render + `onDragOver` sırasında hedef kolona stil.",
          },
          {
            goal: "Panoyu canlı bir linkle yayınla.",
            tip: "Statik deploy yeter — Vercel/Netlify.",
          },
        ],
      },
    ],
  },

  // ═══════════════════════ FRONTEND EK PROJELER ══════════════════════
  {
    id: "calculator",
    level: 1,
    track: "frontend",
    project: "Hesap Makinesi & Birim Çevirici",
    difficulty: "Başlangıç",
    emoji: "🧮",
    accent: "sky",
    tier: "junior",
    description:
      "Küçük ama öğretici. Çalışan bir hesap makinesi ve bir birim çevirici (örn. para/sıcaklık) yap. Amaç: controlled input, olay yönetimi, saf hesap fonksiyonları ve hata durumları — adım adım.",
    skills: ["Controlled input", "Event handling", "Pure function", "State", "Hata durumu", "Formatlama"],
    steps: [
      {
        title: "1. Arayüzü kur",
        learn: ["Component", "State"],
        question: "Hesap makinesinin 'ekranı'nı tek bir state'te tutmak neden mantıklı?",
        tasks: [
          { goal: "Rakam ve işlem tuşlarından oluşan bir tuş takımı çiz.", tip: "Buton ızgarası (CSS Grid); ekran için bir state." },
          { goal: "Bir tuşa basınca ekrandaki ifade güncellensin.", tip: "onClick → state'e ekle." },
        ],
      },
      {
        title: "2. Hesabı yap (saf fonksiyon)",
        learn: ["Pure Function", "Function (Fonksiyon)"],
        question: "Hesaplama mantığını UI'dan ayrı saf bir fonksiyona almak test ve bakım açısından ne kazandırır?",
        tasks: [
          { goal: "'=' basınca ifadeyi hesaplayıp sonucu göster.", tip: "Hesabı saf bir `hesapla(ifade)` fonksiyonunda yap." },
          { goal: "Temizle (C) ve geri sil tuşlarını ekle.", tip: "State'i sıfırla / son karakteri çıkar." },
        ],
      },
      {
        title: "3. Hata durumları",
        learn: ["Error Handling", "Truthy / Falsy"],
        question: "Sıfıra bölme veya geçersiz ifade gibi durumları çökmeden nasıl yönetirsin?",
        tasks: [
          { goal: "Geçersiz işlemde 'Hata' göster, uygulama çökmesin.", tip: "try/catch + anlamlı mesaj." },
        ],
      },
      {
        title: "4. Birim çevirici sekmesi",
        learn: ["Controlled Component", "Conditional Rendering"],
        question: "İki farklı aracı (hesap / çevirici) tek sayfada nasıl yönetirsin?",
        tasks: [
          { goal: "Sıcaklık veya para birimi çeviren ikinci bir mod ekle.", tip: "Bir 'mod' state'i + koşullu render." },
          { goal: "Sonucu okunur biçimde formatla (ondalık/binlik).", tip: "`Intl.NumberFormat`." },
        ],
      },
    ],
  },
  {
    id: "quiz",
    level: 1,
    track: "frontend",
    project: "Quiz / Bilgi Yarışması",
    difficulty: "Başlangıç",
    emoji: "❓",
    accent: "fuchsia",
    tier: "junior",
    description:
      "Sorulardan oluşan, skor tutan bir bilgi yarışması. Amaç: adım adım state, koşullu render, skor mantığı ve sonuç ekranı — küçük parçalarla.",
    skills: ["State", "Conditional rendering", "List rendering", "Skor mantığı", "Array metodları", "Sonuç ekranı"],
    steps: [
      {
        title: "1. Soruları modelle",
        learn: ["Array (Dizi)", "Object (Nesne)"],
        question: "Bir soruyu (metin, şıklar, doğru cevap) nasıl bir veri yapısıyla temsil edersin?",
        tasks: [
          { goal: "Soruları bir dizi nesne olarak tanımla ve ilkini ekrana bas.", tip: "`[{ soru, secenekler, dogru }]`." },
        ],
      },
      {
        title: "2. Şıkları göster ve seçtir",
        learn: ["List Rendering", "State"],
        question: "Hangi şıkkın seçildiğini takip etmek için neye ihtiyacın var?",
        tasks: [
          { goal: "Şıkları map ile butonlara dök.", tip: "`secenekler.map(...)` + key." },
          { goal: "Seçilen şıkkı işaretle.", tip: "Bir `secili` state." },
        ],
      },
      {
        title: "3. Skor ve ilerleme",
        learn: ["Conditional Rendering", "Immutability"],
        question: "Doğru cevap sayısını (skor) güncellerken state'i neden doğrudan değiştirmemelisin?",
        tasks: [
          { goal: "Doğru cevapta skoru artır, sonraki soruya geç.", tip: "`setSkor(s => s + 1)`; indeks ilerlet." },
          { goal: "İlerlemeyi göster (3/10 gibi).", tip: "Mevcut indeks + toplam." },
        ],
      },
      {
        title: "4. Sonuç ve tekrar",
        learn: ["Conditional Rendering", "Ternary (?:)"],
        question: "Sorular bitince farklı bir ekran göstermeyi nasıl kararlaştırırsın?",
        tasks: [
          { goal: "Son soru bitince skoru özetleyen bir sonuç ekranı göster.", tip: "Koşullu render: soru ekranı ↔ sonuç." },
          { goal: "'Tekrar oyna' ile baştan başlat.", tip: "State'leri sıfırla." },
        ],
      },
    ],
  },
  {
    id: "markdown-notes",
    level: 2,
    track: "frontend",
    project: "Markdown Not Defteri",
    difficulty: "Kolay-Orta",
    emoji: "📝",
    accent: "amber",
    tier: "junior",
    description:
      "Yazarken canlı önizleme veren bir not defteri. Markdown yaz, sağda HTML olarak gör, notlar kaybolmasın. Amaç: controlled input, canlı dönüşüm, kalıcılık ve debounce.",
    skills: ["Controlled input", "Live preview", "localStorage", "Debounce", "Klavye kısayolu", "useEffect"],
    steps: [
      {
        title: "1. Editör + önizleme",
        learn: ["Controlled Component"],
        question: "Metin alanının değerini state'te tutmak (controlled) canlı önizleme için neden gerekli?",
        tasks: [
          { goal: "Solda bir textarea, sağda önizleme alanı koy.", tip: "İki sütun (Flexbox/Grid); metin bir state." },
        ],
      },
      {
        title: "2. Markdown'ı HTML'e çevir",
        learn: ["Library (Kütüphane)", "DOM"],
        question: "Markdown'ı kendin parse etmek yerine hazır bir kütüphane kullanmanın artısı/riski nedir (XSS)?",
        tasks: [
          { goal: "Yazılan markdown anında HTML olarak görünsün.", tip: "Bir markdown kütüphanesi (örn. marked); güvenli render." },
        ],
      },
      {
        title: "3. Kalıcılık + debounce",
        learn: ["useEffect", "localStorage / sessionStorage", "Debounce & Throttle"],
        question: "Her tuşta localStorage'a yazmak yerine debounce kullanmak neyi iyileştirir?",
        tasks: [
          { goal: "Notlar F5 sonrası kaybolmasın.", tip: "useEffect + localStorage." },
          { goal: "Yazma durunca (örn. 500ms) kaydet.", tip: "Debounce." },
        ],
      },
      {
        title: "4. Cila: kısayol ve dışa aktar",
        learn: ["Input Handling"],
        question: "Klavye kısayolu eklerken tarayıcının varsayılan davranışını ne zaman engellemelisin?",
        tasks: [
          { goal: "Ctrl/Cmd+S ile kaydet (sayfa kaydetme açılmasın).", tip: "keydown + preventDefault." },
          { goal: "Notu .md dosyası olarak indir.", tip: "Blob + indirme linki." },
        ],
      },
    ],
  },
  {
    id: "pomodoro",
    level: 2,
    track: "frontend",
    project: "Pomodoro & Alışkanlık Takibi",
    difficulty: "Kolay-Orta",
    emoji: "🍅",
    accent: "rose",
    tier: "junior",
    description:
      "Odak zamanlayıcısı + günlük alışkanlık serisi (streak). Amaç: zamanlayıcı yönetimi, useEffect temizliği, useRef ve kalıcı seri takibi.",
    skills: ["Timer", "setInterval", "useEffect cleanup", "useRef", "Streak", "Bildirim"],
    steps: [
      {
        title: "1. Geri sayan zamanlayıcı",
        learn: ["setTimeout / setInterval", "useEffect"],
        question: "Zamanlayıcıyı `useEffect` içinde kurarken temizlik (cleanup) fonksiyonu neden şart?",
        tasks: [
          { goal: "25 dakikadan geri sayan bir sayaç yap.", tip: "setInterval + saniye state; cleanup ile temizle." },
          { goal: "Başlat / duraklat / sıfırla kontrolleri ekle.", tip: "Bir 'çalışıyor' state." },
        ],
      },
      {
        title: "2. Doğru zaman (drift'siz)",
        learn: ["useRef", "Event Loop"],
        question: "setInterval zamanla kayabilir (drift); gerçek geçen süreyi nasıl daha doğru ölçersin?",
        tasks: [
          { goal: "Geçen süreyi başlangıç zaman damgasından hesapla.", tip: "`Date.now()` farkı; useRef ile başlangıcı tut." },
        ],
      },
      {
        title: "3. Mola döngüsü + bildirim",
        learn: ["Conditional Rendering", "Native API"],
        question: "Tarayıcı bildirimi göndermeden önce neden izin istemen gerekir?",
        tasks: [
          { goal: "Süre bitince çalışma↔mola moduna geç.", tip: "Mod state + otomatik geçiş." },
          { goal: "Süre dolunca bildirim/ses ver.", tip: "Notification API (izinle) veya ses." },
        ],
      },
      {
        title: "4. Alışkanlık serisi (streak)",
        learn: ["localStorage / sessionStorage", "useEffect"],
        question: "Günlük seriyi (streak) hesaplarken 'dün' ve 'bugün'ü nasıl karşılaştırırsın?",
        tasks: [
          { goal: "Tamamlanan pomodoroları güne göre kaydet.", tip: "localStorage; tarih anahtarı." },
          { goal: "Kaç gündür üst üste çalıştığını göster.", tip: "Ardışık günleri say." },
        ],
      },
    ],
  },
  {
    id: "infinite-scroll",
    level: 3,
    track: "frontend",
    project: "Sonsuz Akış (Infinite Scroll)",
    difficulty: "Orta",
    emoji: "♾️",
    accent: "cyan",
    tier: "mid",
    description:
      "Sona gelince otomatik daha fazla içerik yükleyen bir akış. Amaç: IntersectionObserver, sayfalama (pagination), iskelet (skeleton) ve custom hook.",
    skills: ["IntersectionObserver", "Pagination", "Skeleton", "Custom hook", "Loading state", "fetch"],
    steps: [
      {
        title: "1. Sayfalı veri çek",
        learn: ["fetch API", "Pagination"],
        question: "Tüm veriyi tek seferde çekmek yerine sayfalamak (pagination) neden önemlidir?",
        tasks: [
          { goal: "Bir API'den ilk sayfayı (örn. 20 öğe) çekip listele.", tip: "`?page=1&limit=20`." },
          { goal: "Yüklenirken iskelet (skeleton) göster.", tip: "Koşullu placeholder." },
        ],
      },
      {
        title: "2. Sona gelmeyi algıla",
        learn: ["IntersectionObserver"],
        question: "Scroll olayını dinlemek yerine IntersectionObserver kullanmak performans açısından neden daha iyi?",
        tasks: [
          { goal: "Listenin sonundaki bir 'sentinel' eleman görününce tetikle.", tip: "IntersectionObserver + ref." },
        ],
      },
      {
        title: "3. Bir sonraki sayfayı ekle",
        learn: ["Spread (...)", "Immutability"],
        question: "Yeni sayfayı mevcut listeye eklerken state'i nasıl immutable güncellersin?",
        tasks: [
          { goal: "Tetiklenince sonraki sayfayı çekip listeye EKLE (sıfırlama).", tip: "`setItems(prev => [...prev, ...yeni])`." },
          { goal: "Veri bitince daha fazla istek atma.", tip: "'hasMore' bayrağı." },
        ],
      },
      {
        title: "4. Custom hook'a topla",
        learn: ["Custom Hook"],
        question: "Bu mantığı `useInfiniteScroll` gibi bir hook'a almak hangi tekrarları önler?",
        tasks: [
          { goal: "Yükleme/sayfa/observer mantığını tek bir custom hook'ta topla.", tip: "`const { items, loading } = useInfinite(fetcher)`." },
        ],
      },
    ],
  },
  {
    id: "ecommerce-store",
    level: 3,
    track: "frontend",
    project: "E-ticaret Vitrini + Sepet",
    difficulty: "Orta",
    emoji: "🛒",
    accent: "emerald",
    tier: "mid",
    description:
      "Ürün listele, filtrele ve bir sepete ekle. Amaç: global state (sepet), filtreleme, türetilmiş toplam ve kalıcılık — gerçek bir mağaza akışı.",
    skills: ["Global state", "Context/Reducer", "Filtreleme", "Türetilmiş değer", "localStorage", "Sepet mantığı"],
    steps: [
      {
        title: "1. Ürün vitrini",
        learn: ["List Rendering", "CSS Grid"],
        question: "Ürünleri tek bir 'kaynak listeden' türetip göstermek neden iyi bir başlangıç?",
        tasks: [
          { goal: "Ürünleri kart ızgarasında listele.", tip: "Grid; her ürün bir kart." },
          { goal: "Kategori/fiyat/arama ile filtrele.", tip: "Türetilmiş liste (orijinali bozma)." },
        ],
      },
      {
        title: "2. Sepet (global state)",
        learn: ["Context API", "useReducer"],
        question: "Sepete birçok component'ten erişileceği için state'i nereye koymalısın?",
        tasks: [
          { goal: "'Sepete ekle' her yerden çalışsın.", tip: "Context + reducer (add/remove/qty)." },
          { goal: "Aynı ürün tekrar eklenince adet artsın.", tip: "Reducer içinde id eşleşmesi." },
        ],
      },
      {
        title: "3. Türetilmiş toplam",
        learn: ["reduce()", "useMemo"],
        question: "Sepet toplamını ayrı bir state'te tutmak yerine üründen TÜRETMEK neden daha güvenli?",
        tasks: [
          { goal: "Ara toplam, adet ve indirimi sepetten hesapla.", tip: "`reduce`; gerekirse useMemo." },
        ],
      },
      {
        title: "4. Kalıcılık + checkout UI",
        learn: ["localStorage / sessionStorage", "Conditional Rendering"],
        question: "Sepetin yenileme sonrası kalması kullanıcı deneyimini nasıl etkiler?",
        tasks: [
          { goal: "Sepet F5 sonrası korunsun.", tip: "localStorage senkronu." },
          { goal: "Boş sepet ve checkout özet ekranını göster.", tip: "Koşullu durumlar." },
        ],
      },
    ],
  },
  {
    id: "form-wizard",
    level: 3,
    track: "frontend",
    project: "Çok Adımlı Form (Wizard)",
    difficulty: "Orta",
    emoji: "🧩",
    accent: "indigo",
    tier: "mid",
    description:
      "Birden çok adıma yayılan, doğrulamalı bir kayıt sihirbazı. Amaç: adımlar arası state, alan doğrulama, ilerleme göstergesi ve taslak kaydı.",
    skills: ["Multi-step state", "Validation", "Türetilmiş ilerleme", "useReducer", "Taslak kaydı", "UX"],
    steps: [
      {
        title: "1. Adımları kur",
        learn: ["Conditional Rendering", "State"],
        question: "Hangi adımda olduğunu tek bir state'le yönetmek neyi kolaylaştırır?",
        tasks: [
          { goal: "3 adımlı bir form yap; ileri/geri ile gez.", tip: "`adim` state + koşullu render." },
          { goal: "Üstte ilerleme göstergesi (1/3) çiz.", tip: "Türetilmiş ilerleme." },
        ],
      },
      {
        title: "2. Tüm veriyi tek yerde tut",
        learn: ["useReducer", "Lifting State Up"],
        question: "Her adımın verisini ayrı tutmak yerine tek bir form state'inde toplamak neden daha iyi?",
        tasks: [
          { goal: "Tüm alanları tek bir form state'inde (veya reducer'da) topla.", tip: "Alan adıyla güncelle." },
        ],
      },
      {
        title: "3. Doğrulama",
        learn: ["Controlled Component", "Error Handling"],
        question: "Bir adımı geçmeden önce doğrulamak (inline) kullanıcıya neden daha iyi gelir?",
        tasks: [
          { goal: "Eksik/geçersiz alanda ilerlemeyi engelle, hatayı göster.", tip: "Adım bazlı validate." },
        ],
      },
      {
        title: "4. Taslak + gönderim",
        learn: ["localStorage / sessionStorage"],
        question: "Kullanıcı yarıda bırakırsa veriyi korumak güveni nasıl artırır?",
        tasks: [
          { goal: "Yarım form sayfa kapanınca kaybolmasın.", tip: "localStorage'a yaz, açılışta oku." },
          { goal: "Son adımda özetle ve 'gönder' ile tamamla.", tip: "Özet ekranı + submit." },
        ],
      },
    ],
  },
  {
    id: "dashboard-charts",
    level: 4,
    track: "frontend",
    project: "Dashboard & Grafikler",
    difficulty: "İleri",
    emoji: "📊",
    accent: "violet",
    tier: "senior",
    description:
      "Veriyi grafiklerle gösteren bir yönetim paneli. Amaç: veri çekme, görselleştirme, filtre/zaman aralığı ve türetilmiş metrikler. (Veri: /datasets kullanabilirsin)",
    skills: ["Veri çekme", "Chart kütüphanesi", "Veri görselleştirme", "Filtre", "Türetilmiş metrik", "useMemo"],
    steps: [
      {
        title: "1. Veriyi getir",
        learn: ["Data Fetching Library (React Query/SWR)", "fetch API"],
        question: "Veri çekme kütüphanesi (React Query/SWR) ham `fetch`'e göre cache/loading/error'da ne kazandırır?",
        tasks: [
          { goal: "Bir veri kaynağından (örn. /datasets/siparisler.csv veya bir API) veriyi çek.", tip: "Loading/error durumlarını yönet." },
        ],
      },
      {
        title: "2. Metrikleri türet",
        learn: ["useMemo", "reduce()"],
        question: "Özet kartlardaki (toplam ciro, sipariş sayısı) sayıları neden ham veriden türetmelisin?",
        tasks: [
          { goal: "Toplam, ortalama, sayım gibi özet metrikleri hesapla.", tip: "`reduce`/`groupby`; useMemo ile önbellekle." },
          { goal: "Bunları özet kartlarında göster.", tip: "KPI kartları." },
        ],
      },
      {
        title: "3. Grafikler",
        learn: ["Veri Görselleştirme", "Component"],
        question: "Aynı veri için bar, çizgi ve pasta grafiklerinden hangisi hangi soruya uygundur?",
        tasks: [
          { goal: "Zaman serisi için çizgi, kategori için bar grafiği çiz.", tip: "Bir chart kütüphanesi (Recharts/Chart.js)." },
        ],
      },
      {
        title: "4. Filtre ve zaman aralığı",
        learn: ["Conditional Rendering", "useEffect"],
        question: "Filtre değişince tüm grafiklerin tutarlı güncellenmesini nasıl sağlarsın?",
        tasks: [
          { goal: "Tarih aralığı/kategori filtresi tüm paneli etkilesin.", tip: "Tek kaynak filtre state'i; türetilmiş veri." },
        ],
      },
    ],
  },
  {
    id: "design-system-a11y",
    level: 4,
    track: "frontend",
    project: "Tasarım Sistemi & Erişilebilirlik",
    difficulty: "İleri",
    emoji: "🎛️",
    accent: "lime",
    tier: "senior",
    description:
      "Tutarlı ve erişilebilir bir component kütüphanesi. Amaç: design token'lar, varyantlı component'ler, klavye/ARIA erişilebilirliği ve dark mode.",
    skills: ["Design tokens", "Component varyantları", "ARIA", "Klavye navigasyonu", "Dark mode", "Kontrast"],
    steps: [
      {
        title: "1. Design token'lar",
        learn: ["CSS Variables", "Tailwind CSS"],
        question: "Renk/boşluk/yazı ölçeğini token'lara almak tutarlılık ve tema değişimi için ne sağlar?",
        tasks: [
          { goal: "Renk, boşluk ve yazı ölçeğini merkezi token'larda tanımla.", tip: "CSS değişkenleri / Tailwind theme." },
        ],
      },
      {
        title: "2. Varyantlı component'ler",
        learn: ["Component", "Props"],
        question: "Bir Button'un (primary/ghost, sm/lg) varyantlarını prop ile yönetmenin avantajı nedir?",
        tasks: [
          { goal: "Button ve Input'u varyant/boyut prop'larıyla yap.", tip: "Varyant → className haritası." },
        ],
      },
      {
        title: "3. Erişilebilirlik (a11y)",
        learn: ["ARIA", "Accessibility (a11y)", "Semantic HTML"],
        question: "Bir modal'ı klavyeyle erişilebilir kılmak için odak (focus) yönetimi neden kritiktir?",
        tasks: [
          { goal: "Component'ler sadece fareyle değil klavyeyle de kullanılabilsin.", tip: "Doğru rol/etiket (ARIA), focus halkası." },
          { goal: "Bir modal aç/kapa: odak içeride tutulsun, Esc kapatsın.", tip: "Focus trap + klavye olayları." },
        ],
      },
      {
        title: "4. Dark mode + kontrast",
        learn: ["Dark Mode", "CSS Variables"],
        question: "Dark mode'u token'larla yapmak, her component'i tek tek elden geçirmeye göre neden üstün?",
        tasks: [
          { goal: "Token'ları değiştirerek tüm UI'da dark mode'a geç.", tip: "Tema sınıfı + değişken override." },
          { goal: "Metin/arka plan kontrastının yeterli olduğunu doğrula.", tip: "Kontrast oranı kontrolü (WCAG)." },
        ],
      },
    ],
  },
  {
    id: "frontend-performance",
    level: 5,
    track: "frontend",
    project: "Performans & Cila",
    difficulty: "İleri+",
    emoji: "⚡",
    accent: "amber",
    tier: "staff",
    description:
      "Yavaş bir uygulamayı hızlandır. Amaç: ölçüm (Lighthouse/Core Web Vitals), code splitting, lazy loading, memoization ve gereksiz render avı.",
    skills: ["Lighthouse", "Core Web Vitals", "Code splitting", "Lazy loading", "Memoization", "Render optimizasyonu"],
    steps: [
      {
        title: "1. Önce ölç",
        learn: ["Core Web Vitals", "DevTools"],
        question: "Optimizasyona başlamadan önce ölçmek ('önce ölç') neden şarttır? Core Web Vitals neyi ölçer?",
        tasks: [
          { goal: "Lighthouse/Performance ile mevcut skoru ve darboğazları çıkar.", tip: "LCP/CLS/INP'e bak; tahmin etme, ölç." },
        ],
      },
      {
        title: "2. Bundle'ı böl",
        learn: ["Code Splitting", "Lazy Loading"],
        question: "Tüm JS'i tek pakette göndermek ilk yükü neden yavaşlatır? Code splitting bunu nasıl çözer?",
        tasks: [
          { goal: "Ağır/az kullanılan parçaları ayrı parçalara böl.", tip: "Dynamic import; route/Component bazlı." },
          { goal: "Görseller ve ağır component'leri ihtiyaç anında yükle.", tip: "Lazy loading + Suspense." },
        ],
      },
      {
        title: "3. Gereksiz render avı",
        learn: ["memo", "useMemo", "useCallback"],
        question: "Bir component neden gereksiz yere yeniden render olur ve bunu nasıl tespit edersin?",
        tasks: [
          { goal: "Profiler ile gereksiz render eden component'i bul.", tip: "React DevTools Profiler." },
          { goal: "Doğru yerde memo/useMemo/useCallback uygula (aşırıya kaçmadan).", tip: "Önce ölç, sonra uygula." },
        ],
      },
      {
        title: "4. Doğrula ve cila",
        learn: ["Core Web Vitals", "Reflow & Repaint"],
        question: "Optimizasyon sonrası tekrar ölçmek neden bu kadar önemli (bazı 'optimizasyonlar' işi yavaşlatabilir)?",
        tasks: [
          { goal: "Değişiklik sonrası skoru tekrar ölç, gerçek iyileşmeyi doğrula.", tip: "Öncesi/sonrası karşılaştır." },
          { goal: "Layout shift (CLS) ve takılmaları gider.", tip: "Boyut rezervasyonu; reflow tetikleyicilerini azalt." },
        ],
      },
    ],
  },

  // ═══════════════════════ BACKEND BAŞLANGIÇ ══════════════════════
  {
    id: "todo-api",
    level: 1,
    track: "backend",
    project: "Todo API (Node + Express)",
    difficulty: "Başlangıç",
    emoji: "🔌",
    accent: "cyan",
    tier: "intern",
    description:
      "İlk backend projen — arayüz yok, sadece sunucu. Görevleri ekleyip silebileceğin bir REST API yaz. Amaç: server, endpoint, HTTP metotları, request/response ve CRUD mantığına oturmak — en küçük parçalarla.",
    skills: [
      "Node.js",
      "Express",
      "REST API",
      "HTTP metotları",
      "Request & Response",
      "Middleware",
      "Validation",
    ],
    steps: [
      {
        title: "1. Projeyi başlat",
        learn: ["Node.js", "npm", "package.json"],
        question: "Node.js, JavaScript'i tarayıcı dışında çalıştırmayı nasıl sağlar?",
        tasks: [
          {
            goal: "GitHub'da `todo-api` adında yeni bir repo oluştur ve bilgisayarına indir.",
            tip: "İpucu: `git clone <url>` → `cd todo-api`.",
          },
          {
            goal: "Klasörü bir Node projesine dönüştür (bir `package.json` oluşsun).",
            tip: "İpucu: `npm init -y`.",
          },
        ],
      },
      {
        title: "2. Express'i kur ve ilk sunucuyu ayağa kaldır",
        learn: ["Express", "Server (Sunucu)", "Port"],
        question: "Bir web sunucusu bir port'u 'dinlemek' ne demek?",
        tasks: [
          {
            goal: "HTTP sunucusu yazmayı kolaylaştıran kütüphaneyi projene ekle.",
            tip: "İpucu: `npm install express`.",
          },
          {
            goal: "`index.js` içinde belirli bir port'u dinleyen bir sunucu başlat.",
            tip: "`const app = express()` → `app.listen(3001, ...)`.",
          },
          {
            goal: "Sunucuyu çalıştır ve terminalde 'çalışıyor' mesajını gör.",
            tip: "İpucu: `node index.js`.",
          },
        ],
      },
      {
        title: "3. İlk endpoint",
        learn: ["Endpoint", "Request & Response", "HTTP Metotları"],
        question: "Bir istek (request) ile cevap (response) arasında ne taşınır?",
        tasks: [
          {
            goal: "`GET /health` adresine gidilince `{ ok: true }` dönen bir endpoint yaz.",
            tip: "`app.get('/health', (req, res) => res.json({ ok: true }))`.",
          },
          {
            goal: "Tarayıcıdan (veya curl ile) bu adrese giderek cevabı gör.",
            tip: "`http://localhost:3001/health` veya `curl ...`.",
          },
        ],
      },
      {
        title: "4. Geliştirme döngüsünü hızlandır",
        learn: ["nodemon"],
        question: "Kod her değiştiğinde sunucuyu elle yeniden başlatmak yerine ne yaparız?",
        tasks: [
          {
            goal: "Kod değişince sunucu OTOMATİK yeniden başlasın.",
            tip: "İpucu: `npm install -D nodemon` → `nodemon index.js`.",
          },
          {
            goal: "`package.json`'a `npm run dev` ile başlatan bir script ekle.",
            tip: "`\"scripts\": { \"dev\": \"nodemon index.js\" }`.",
          },
        ],
      },
      {
        title: "5. JSON gövdesini okuyabil",
        learn: ["Middleware", "JSON"],
        question: "Middleware nedir? İstek route'a varmadan ne işe yarar?",
        tasks: [
          {
            goal: "Gelen isteklerdeki JSON gövdeyi otomatik parse eden ara katmanı ekle.",
            tip: "İpucu: `app.use(express.json())`.",
          },
          {
            goal: "Test için `POST /echo` yaz: gelen gövdeyi aynen geri döndürsün.",
            tip: "`res.json(req.body)`.",
          },
        ],
      },
      {
        title: "6. Görevleri bellekte tut",
        question: "Veriyi bir dizide (bellekte) tutmanın sınırı nedir — sunucu yeniden başlayınca ne olur?",
        tasks: [
          {
            goal: "Görevleri tutacak bir dizi ve artan bir id sayacı oluştur.",
            tip: "`let todos = []` + `let nextId = 1`.",
          },
        ],
      },
      {
        title: "7. Listele (Read)",
        learn: ["RESTful API", "CRUD"],
        question: "REST'te bir kaynağı listelemek için hangi metot ve adres kullanılır?",
        tasks: [
          {
            goal: "`GET /todos` tüm görevleri dizi olarak döndürsün.",
            tip: "`res.json(todos)`.",
          },
        ],
      },
      {
        title: "8. Oluştur (Create)",
        learn: ["HTTP Status Code'ları"],
        question: "Yeni kayıt oluşturma başarılıysa hangi HTTP durum kodu döner ve neden?",
        tasks: [
          {
            goal: "`POST /todos` gelen `text` ile yeni görev ekleyip eklenen görevi döndürsün.",
            tip: "`todos.push({ id: nextId++, text, done: false })`.",
          },
          {
            goal: "Başarılı oluşturmada `201` durum kodu dön.",
            tip: "`res.status(201).json(todo)`.",
          },
        ],
      },
      {
        title: "9. Tek kaydı getir",
        learn: ["Route Parametre"],
        question: "URL'deki `/todos/:id` kısmındaki `:id` nasıl okunur?",
        tasks: [
          {
            goal: "`GET /todos/:id` ile sadece o id'li görevi döndür.",
            tip: "`req.params.id` (sayıya çevir) + `find`.",
          },
          {
            goal: "Olmayan id istenince `404` dön.",
            tip: "`if (!todo) return res.status(404).json({ error: 'yok' })`.",
          },
        ],
      },
      {
        title: "10. Güncelle (Update)",
        learn: ["HTTP Metotları"],
        question: "PUT ile PATCH arasındaki fark nedir?",
        tasks: [
          {
            goal: "`PATCH /todos/:id` ile bir görevin `done` veya `text` alanını güncelle.",
            tip: "İlgili kaydı bul, alanlarını değiştir, güncel halini döndür.",
          },
        ],
      },
      {
        title: "11. Sil (Delete)",
        learn: ["CRUD"],
        question: "Silme isteği başarılıysa gövdesi olmayan hangi durum kodu uygundur?",
        tasks: [
          {
            goal: "`DELETE /todos/:id` ile görevi listeden çıkar.",
            tip: "`todos = todos.filter(t => t.id !== id)`.",
          },
          {
            goal: "Silme sonrası `204` (içerik yok) dön.",
            tip: "`res.status(204).end()`.",
          },
        ],
      },
      {
        title: "12. Doğrulama ve hata yönetimi",
        learn: ["Input Validation & Sanitization", "HTTP Status Code'ları"],
        question: "Doğrulamayı neden frontend'e güvenmeden backend'de yapmak zorundayız?",
        tasks: [
          {
            goal: "Boş/eksik `text` ile görev oluşturulmaya çalışılınca `400` ve anlaşılır hata dön.",
            tip: "`if (!text?.trim()) return res.status(400)...`.",
          },
        ],
      },
      {
        title: "13. Veriyi kalıcı yap (dosya)",
        learn: ["JSON"],
        question: "Veriyi bir dosyaya yazmak ile database kullanmak arasındaki temel fark nedir?",
        tasks: [
          {
            goal: "Görevler sunucu yeniden başlasa da KAYBOLMASIN.",
            tip: "İpucu: `fs` ile bir `todos.json` dosyasına yaz/oku.",
          },
        ],
      },
      {
        title: "14. Frontend'e aç (CORS)",
        learn: ["CORS"],
        question: "Tarayıcı, farklı origin'deki API'ye isteği neden varsayılan olarak engeller?",
        tasks: [
          {
            goal: "Başka bir origin'deki frontend bu API'yi çağırabilsin.",
            tip: "İpucu: `npm install cors` → `app.use(cors())`.",
          },
        ],
      },
      {
        title: "15. Yayınla",
        learn: ["Deploy", "Environment Variable"],
        question: "Port numarasını koda sabit yazmak yerine neden environment variable'dan okuruz?",
        tasks: [
          {
            goal: "Port'u `process.env.PORT`'tan oku (yoksa 3001).",
            tip: "`const PORT = process.env.PORT || 3001`.",
          },
          {
            goal: "API'yi canlı bir ortama deploy et ve `/health`'i internetten doğrula.",
            tip: "Render / Railway / Fly.io gibi bir Node host'u.",
          },
        ],
      },
    ],
  },

  // ═══════════════════════════ SEVİYE 2 ═══════════════════════════
  {
    id: "auth-service",
    level: 2,
    track: "backend",
    project: "Auth Servisi (JWT/Session)",
    difficulty: "Kolay-Orta",
    emoji: "🔑",
    accent: "violet",
    tier: "junior",
    description:
      "Güvenliğin kalbi. Kullanıcı kayıt, giriş, session yönetimi, JWT üretimi/doğrulaması, refresh token mekanizması ve rate limiting içeren tam kapsamlı bir auth servisi geliştir. Amaç: kimlik doğrulama, yetkilendirme, token güvenliği ve saldırılardan korunma.",
    skills: [
      "JWT",
      "Session",
      "Hashing (Bcrypt)",
      "Refresh Token",
      "Access Token",
      "Rate Limiting",
      "RBAC",
    ],
    steps: [
      {
        title: "1. Şifre Hashing (Bcrypt)",
        learn: ["Hashing", "Authentication"],
        question: "Şifreleri veritabanında saklamadan önce neden hash'leriz ve neden düz md5/sha256 yerine bcrypt/argon2 gibi yavaş algoritmalar tercih edilmelidir?",
        tasks: [
          {
            goal: "Kullanıcı kaydı (Register) sırasında şifreyi bcrypt kullanarak güvenli şekilde hash'le.",
            tip: "Düz metin şifreyi asla DB'ye yazma — ipucu: `bcrypt.hash()`.",
          },
        ],
      },
      {
        title: "2. Access Token (JWT) Üretimi",
        learn: ["JWT", "Access Token"],
        question: "JWT'nin header, payload ve signature kısımları ne işe yarar? payload kısmına neden şifre/kart gibi hassas veriler yazılmamalıdır?",
        tasks: [
          {
            goal: "Giriş yapan kullanıcı için 15 dakika geçerliliği olan, kullanıcı ID'si ve rolü içeren bir JWT Access Token üret.",
            tip: "İmzalama için gizli bir secret kullan — ipucu: `jsonwebtoken.sign(payload, secret, { expiresIn: '15m' })`.",
          },
        ],
      },
      {
        title: "3. Refresh Token Mekanizması",
        learn: ["Refresh Token"],
        question: "Access Token süresi neden kısa tutulmalıdır? Refresh Token güvenliği açısından veritabanında/cihazda nasıl saklanmalıdır?",
        tasks: [
          {
            goal: "Kullanıcı her giriş yaptığında uzun süreli (örn. 7 gün) bir Refresh Token üret ve bunu veritabanına kaydet.",
            tip: "Yeni Access Token almak için kullanılacak — ipucu: `refreshToken` tablosu / model.",
          },
          {
            goal: "Kullanıcının session'ı bitmeden Refresh Token ile yeni bir Access Token almasını sağlayan `/auth/refresh` endpoint'ini yaz.",
            tip: "Eski refresh token'ın geçerliliğini DB'den kontrol et.",
          },
        ],
      },
      {
        title: "4. Oturum Kontrolü Middleware'i",
        learn: ["Middleware", "Authorization"],
        question: "Middleware zincirinde next() fonksiyonu çağrılmazsa istek akışına ne olur?",
        tasks: [
          {
            goal: "Gelen isteklerdeki `Authorization` header'ındaki JWT'yi doğrulayan bir `requireAuth` middleware'i yaz.",
            tip: "Bearer token formatını parse et ve verify et.",
          },
        ],
      },
      {
        title: "5. Rol Tabanlı Yetkilendirme (RBAC)",
        learn: ["RBAC"],
        question: "Rol tabanlı yetki kontrolünü (RBAC) middleware seviyesinde tasarlamanın avantajı nedir?",
        tasks: [
          {
            goal: "Middleware'e rol parametresi ekleyerek sadece admin'lerin erişebileceği `/admin/users` endpoint'ini koru.",
            tip: "Kullanıcı rolünün `admin` olup olmadığını kontrol et.",
          },
        ],
      },
      {
        title: "6. Kötüye Kullanımı Önle (Rate Limiting)",
        learn: ["Rate Limiting"],
        question: "Auth endpoint'lerinde (özellikle login/register) rate limiting uygulanması hangi saldırı türlerini (örn. brute-force) engeller?",
        tasks: [
          {
            goal: "Giriş denemelerini IP başına dakikada en fazla 5 istek olacak şekilde sınırla.",
            tip: "Express için `express-rate-limit` or Redis tabanlı bir rate limiter kullan.",
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
    tier: "mid",
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

  // ═══════════════════════════ SEVİYE 3 ═══════════════════════════
  {
    id: "media-service",
    level: 3,
    track: "backend",
    project: "Dosya & Medya Servisi",
    difficulty: "Orta",
    emoji: "🖼️",
    accent: "violet",
    tier: "mid",
    description:
      "Bulut depolama ve medya yönetimi. Kullanıcının yüklediği dosyaları AWS S3 (veya benzeri) bulut deposuna yükle, resimleri boyutlandırmak için kuyruk kullan ve güvenli erişim için signed URL'ler üret. Amaç: bulut depolama entegrasyonu, dosya yükleme güvenliği, asenkron resim işleme ve yetkilendirmeli erişim.",
    skills: [
      "API",
      "Environment Variable",
      "Error Handling",
      "BullMQ",
      "Message Queue",
    ],
    steps: [
      {
        title: "1. Sunucuye Dosya Al (Upload)",
        learn: ["API", "Headers"],
        question: "Dosya yükleme isteklerinde kullanılan 'multipart/form-data' içerik tipi (Content-Type) ile standart 'application/json' arasındaki fark nedir?",
        tasks: [
          {
            goal: "API sunucunda dosya yüklemelerini kabul eden ve geçici olarak diske yazan /upload endpoint'ini yaz.",
            tip: "NodeJS için multer veya Go için MultipartForm kullan.",
          },
        ],
      },
      {
        title: "2. Bulut Deposuna Gönder (AWS S3)",
        learn: ["Environment Variable"],
        question: "Dosyaları web sunucusunun yerel diskinde saklamak yerine neden S3 gibi bir nesne depolama (Object Storage) servisinde tutmalıyız?",
        tasks: [
          {
            goal: "Gelen dosyaları AWS S3 veya MinIO deposuna yükle ve dosya yolunu veritabanına kaydet.",
            tip: "Resmi S3 SDK (@aws-sdk/client-s3) kullan; kimlik bilgilerini .env'den oku.",
          },
        ],
      },
      {
        title: "3. Signed URL ile Güvenli Erişim",
        learn: ["Authentication", "Authorization"],
        question: "S3 bucket'ını tamamen public (herkese açık) yapmak yerine private tutup 'Signed URL' ile erişim vermenin güvenlik avantajı nedir?",
        tasks: [
          {
            goal: "Yalnızca yetkili kullanıcıların dosyaya 1 saat boyunca erişebilmesini sağlayan imzalı URL'ler (signed URLs) üret.",
            tip: "S3 getSignedUrl API'sini kullan.",
          },
        ],
      },
      {
        title: "4. Resimleri Arka Planda Yeniden Boyutlandır (Resize)",
        learn: ["Message Queue", "BullMQ"],
        question: "Yüklenen büyük görselleri asenkron olarak arka planda yeniden boyutlandırmak, HTTP istek süresini ve sunucu işlemci yükünü nasıl etkiler?",
        tasks: [
          {
            goal: "Görsel yüklendiğinde boyutlandırma işini BullMQ kuyruğuna at; worker ile görselin küçük halini (thumbnail) üretip S3'e yükle.",
            tip: "Resim işleme için sharp kütüphanesini kullan.",
          },
        ],
      },
    ],
  },

  // ═══════════════════════════ SEVİYE 4 ═══════════════════════════
  {
    id: "caching-jobs",
    level: 4,
    track: "backend",
    project: "Caching & Background Jobs",
    difficulty: "İleri",
    emoji: "⏳",
    accent: "amber",
    tier: "senior",
    description:
      "Performans ve asenkron işler. API isteklerini Redis ile önbelleğe al, ağır işleri BullMQ/Redis kullanarak kuyruğa gönder, zamanlanmış cron görevleri kur ve idempotency key ile güvenli ödemeler tasarla. Amaç: caching stratejileri, arka plan işleri, kuyruk yönetimi, hata toleransı ve zamanlanmış görevler.",
    skills: [
      "Redis",
      "Caching",
      "Message Queue",
      "BullMQ",
      "Cron Job",
      "Idempotency",
    ],
    steps: [
      {
        title: "1. Redis ile API Caching",
        learn: ["Redis", "Caching"],
        question: "Cache invalidation (önbellek temizleme) neden zordur? Cache-aside deseni nedir?",
        tasks: [
          {
            goal: "Çok sık okunan ama az değişen bir ürün listesi endpoint'inin sonucunu 5 dakika boyunca Redis'te önbelleğe al.",
            tip: "Veritabanına gitmeden önce Redis'te key var mı kontrol et (Cache-Aside).",
          },
          {
            goal: "Ürün güncellendiğinde veya silindiğinde Redis'teki ilgili önbellek anahtarını temizle.",
            tip: "Cache invalidation — güncelleme anında `redis.del(key)` çalıştır.",
          },
        ],
      },
      {
        title: "2. BullMQ ile Arka Plan İş Kuyruğu",
        learn: ["Message Queue", "BullMQ"],
        question: "İş kuyrukları (message queues) neden sunucunun yükünü hafifletir? Kullanıcıya anında cevap dönüp işi arkada yapmak (decoupling) ne kazandırır?",
        tasks: [
          {
            goal: "Yeni kayıt olan kullanıcıya hoş geldin e-postası gönderilmesi işini bir BullMQ kuyruğuna (Queue) ekle.",
            tip: "Kayıt endpoint'inde e-posta gönderimini bekletme; BullMQ'ya job ekle.",
          },
          {
            goal: "BullMQ Worker'ı yazarak kuyruktaki e-posta işini asenkron olarak tamamla.",
            tip: "Worker bağımsız veya ayrı bir süreçte çalışabilir.",
          },
        ],
      },
      {
        title: "3. Hata Yönetimi & Yeniden Deneme (Retry)",
        learn: ["Error Handling", "Exponential Backoff"],
        question: "Kuyruktaki bir işin başarısız olması durumunda exponential backoff (üstel geri çekilme) stratejisi kullanmak neden önemlidir?",
        tasks: [
          {
            goal: "E-posta servisi çökerse, BullMQ'nun asenkron işi 3 kez üstel gecikmeyle (exponential backoff) otomatik yeniden denemesini sağla.",
            tip: "BullMQ config'inde `attempts` ve `backoff` parametrelerini ayarla.",
          },
        ],
      },
      {
        title: "4. Zamanlanmış Görevler (Cron Jobs)",
        learn: ["Cron Job"],
        question: "Linux'taki standart cron ifadesindeki 5 alan (dakika, saat, gün...) neyi temsil eder?",
        tasks: [
          {
            goal: "Her gece saat 03:00'te çalışıp eski taslakları veritabanından temizleyen bir cron görevi tanımla.",
            tip: "NodeJS için `node-cron` veya BullMQ Repeatable Jobs kullan.",
          },
        ],
      },
      {
        title: "5. Müşteri İsteği: Idempotency Key",
        learn: ["Idempotency"],
        question: "Bir ödeme isteğinin ağ hatası yüzünden yarıda kalması durumunda, aynı isteğin tekrar atıldığında mükerrer çekim yapılmasını idempotency key nasıl engeller?",
        tasks: [
          {
            goal: "Finansal/kritik işlemlerde header'da gelen `Idempotency-Key` değerini kontrol et, işlem yapıldıysa eski sonucu dön, yapılmadıysa işlemi yapıp sonucu kaydet.",
            tip: "Redis'te anahtarı kilitle (SET NX) ve başarılı olunca cevabı cache'le.",
          },
        ],
      },
    ],
  },
  {
    id: "saas",
    level: 4,
    track: "backend",
    project: "SaaS Ürünü (Ödeme + Dashboard)",
    difficulty: "İleri",
    emoji: "🏆",
    accent: "amber",
    tier: "senior",
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
    track: "backend",
    project: "Canlı Sohbet (Realtime)",
    difficulty: "İleri",
    emoji: "💬",
    accent: "rose",
    tier: "senior",
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
        question: "WebSocket bağlantısının geleneksel HTTP isteklerinden (Request/Response) farkı nedir? Neden sürekli açık kalır?",
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
        question: "Optimistic UI uygularken sunucu hata döndürürse (rollback) arayüzde bunu nasıl telafi edersin?",
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
        question: "Realtime presence sisteminde kullanıcının sayfayı aniden kapatıp gitmesini (disconnect) sunucu tarafında nasıl anlarsın?",
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
        question: "Realtime uygulamaları dikey/yatay ölçeklerken (örneğin birden fazla WebSocket sunucusu çalışırken) Redis Pub/Sub mekanizması ne işe yarar?",
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

  // ═══════════════════════════ SEVİYE 5 ═══════════════════════════
  {
    id: "api-design",
    level: 5,
    track: "backend",
    project: "API Tasarımı: REST → GraphQL/tRPC",
    difficulty: "İleri+",
    emoji: "🔗",
    accent: "cyan",
    tier: "senior",
    description:
      "Modern API yaklaşımları. REST API sınırlarını gör, GraphQL şeması ve resolver'ları ile dynamic veri çekimi sağla, N+1 performans sorununu çöz ve tRPC ile uçtan uca tip güvenliği kur. Amaç: modern API mimarileri, GraphQL şema tasarımı, N+1 çözümleri ve tip güvenli RPC.",
    skills: [
      "GraphQL",
      "tRPC",
      "REST API",
      "N+1 Problem",
      "Schema",
      "Query & Mutation",
      "TypeScript Type Safety",
    ],
    steps: [
      {
        title: "1. REST Sınırlarını Gör (Over-fetching & Under-fetching)",
        learn: ["RESTful API", "Over-fetching & Under-fetching"],
        question: "Over-fetching (gereğinden fazla veri çekme) ve under-fetching (yetersiz veri çekip çok istek atma) sorunları mobil cihazlarda performansı nasıl etkiler?",
        tasks: [
          {
            goal: "REST API ile bir yazıyı ve yazarın profilini çekmek için atılan birden çok isteği (under-fetching) analiz et.",
            tip: "API analiz araçları veya network sekmesi ile istekleri incele.",
          },
        ],
      },
      {
        title: "2. GraphQL ile Sorgulama",
        learn: ["GraphQL", "GraphQL Schema", "GraphQL Resolver"],
        question: "GraphQL'de query ile mutation arasındaki temel fark nedir? Şema (Schema-first) yaklaşımı ne işe yarar?",
        tasks: [
          {
            goal: "Apollo Server veya Yoga ile bir GraphQL sunucusu kur ve Post, User tiplerini içeren bir şema tanımla.",
            tip: "GraphQL Schema Definition Language (SDL) kullan.",
          },
          {
            goal: "Yazıları ve yazarları çeken Query resolver'larını, yeni yazı ekleyen Mutation resolver'ını yaz.",
            tip: "Context üzerinden veritabanına erişen fonksiyonları bağla.",
          },
        ],
      },
      {
        title: "3. N+1 Problemine Çözüm (DataLoader)",
        learn: ["N+1 Problem", "DataLoader"],
        question: "GraphQL'de N+1 sorgu problemi nasıl ortaya çıkar ve DataLoader mekanizması batching/caching ile bunu nasıl çözer?",
        tasks: [
          {
            goal: "Yazı listesini çekerken her yazının yazarını tek tek sorgulayan N+1 veritabanı problemini tespit et.",
            tip: "Veritabanı loglarını aç ve kaç SELECT sorgusu atıldığını gör.",
          },
          {
            goal: "DataLoader kütüphanesini kullanarak yazar sorgularını tek bir IN (...) sorgusunda birleştir (batching).",
            tip: "DataLoader ile ID listesini toplu çek.",
          },
        ],
      },
      {
        title: "4. tRPC ile Uçtan Uca Tip Güvenliği",
        learn: ["tRPC", "Type Safety", "RPC (Remote Procedure Call)"],
        question: "tRPC'nin Swagger/OpenAPI gibi geleneksel API dokümantasyon araçlarına kıyasla frontend-backend entegrasyonunda sağladığı en büyük kolaylık nedir?",
        tasks: [
          {
            goal: "Backend'de tRPC Router'ı kurup query ve mutation prosedürlerini tanımla.",
            tip: "Zod şemaları ile parametre doğrulaması yap.",
          },
          {
            goal: "Frontend'de tRPC istemcisini kurup, backend tiplerini doğrudan kullanarak hata yapmayı imkansız kılan tip güvenli API çağrıları yap.",
            tip: "Tip tanımlarını backend'den export et (export type AppRouter = typeof appRouter).",
          },
        ],
      },
    ],
  },

  // ═══════════════════════════ SEVİYE 6 ═══════════════════════════
  {
    id: "game",
    level: 6,
    track: "frontend",
    project: "Tarayıcı Oyunu (Canvas)",
    difficulty: "İleri",
    emoji: "🎮",
    accent: "lime",
    tier: "mid",
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
        question: "requestAnimationFrame neden setInterval yerine oyun döngüsü (game loop) için tercih edilmelidir?",
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
        question: "Farklı cihazların ekran yenileme hızları (örn. 60Hz ve 144Hz) oyun karakterinin hızını nasıl etkiler? Delta Time bunu nasıl çözer?",
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
        question: "AABB (Axis-Aligned Bounding Box) çarpışma algılama yöntemi nasıl çalışır? İki dikdörtgenin kesiştiğini matematiksel olarak nasıl kontrol edersin?",
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
        question: "Oyun state'inin (skor, can, vb.) tarayıcı kapandıktan sonra da kalıcı olması için hangi tarayıcı depolama mekanizmasını kullandın?",
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

  // ═══════════════════════ AI BAŞLANGIÇ ═══════════════════════
  {
    id: "prompt-basics",
    level: 2,
    track: "ai",
    project: "Prompt Temelleri (Akıllı Özetleyici)",
    difficulty: "Kolay-Orta",
    emoji: "✍️",
    accent: "fuchsia",
    tier: "junior",
    description:
      "AI'a ilk adım. Claude API ile bir metni özetleyen/sınıflandıran küçük bir araç yap ve prompt'un çıktıyı nasıl şekillendirdiğini gör. Amaç: rol verme, few-shot, çıktı biçimi, sıcaklık (temperature) ve token/maliyet sezgisi — adım adım.",
    skills: [
      "Claude API",
      "System Prompt",
      "Few-shot",
      "Yapılandırılmış çıktı",
      "Temperature",
      "Token & maliyet",
      "Environment Variable",
    ],
    steps: [
      {
        title: "1. İlk çağrıyı yap",
        learn: ["LLM", "Claude API", "Environment Variable"],
        question: "API anahtarını neden frontend'e değil, sunucu tarafına (API route) koymalısın?",
        tasks: [
          {
            goal: "Bir metni modele gönderip dönen cevabı ekranda göster.",
            tip: "Anthropic SDK (`@anthropic-ai/sdk`), model `claude-opus-4-8`; çağrıyı sunucuda yap.",
          },
          {
            goal: "API anahtarın koda/koda sızmasın.",
            tip: "`.env` → `ANTHROPIC_API_KEY`; `.gitignore`'da olduğundan emin ol.",
          },
        ],
      },
      {
        title: "2. Role ver (system prompt)",
        learn: ["System Prompt", "Prompt Engineering"],
        question: "System prompt ile user mesajı arasındaki fark nedir? Rolü system'e yazmak neden daha tutarlı sonuç verir?",
        tasks: [
          {
            goal: "Modele 'kısa, Türkçe ve madde madde özetle' gibi sabit bir davranış kazandır.",
            tip: "Kuralları system prompt'a yaz; kullanıcı metnini ayrı user mesajında gönder.",
          },
        ],
      },
      {
        title: "3. Örnekle öğret (few-shot)",
        learn: ["Few-shot & Zero-shot"],
        question: "Few-shot örnekler vermek, modelden istediğin biçimi almakta neden zero-shot'tan daha güvenilir olur?",
        tasks: [
          {
            goal: "Metni 'olumlu / olumsuz / nötr' diye sınıflandıran bir özellik ekle.",
            tip: "Prompt'a 2-3 örnek girdi→etiket çifti koy (few-shot).",
          },
        ],
      },
      {
        title: "4. Çıktıyı biçime sok (structured output)",
        learn: ["JSON", "Tool Use", "Hallucination"],
        question: "Modelin cevabını serbest metin yerine JSON olarak istemek, sonraki kodun işini neden kolaylaştırır?",
        tasks: [
          {
            goal: "Cevap her zaman `{ \"ozet\": ..., \"duygu\": ... }` gibi sabit bir JSON olsun.",
            tip: "İstenen şemayı prompt'ta net tarif et; parse edip doğrula (gelmezse tekrar dene).",
          },
          {
            goal: "Model uydurursa (örn. olmayan bilgi) bunu fark et ve sınırla.",
            tip: "Sadece verilen metne dayan; emin değilse 'bilinmiyor' desin.",
          },
        ],
      },
      {
        title: "5. Sıcaklık, token ve maliyet",
        learn: ["Temperature & Top-p", "Token", "Context Window"],
        question: "`temperature` 0 ile 1 arasında değişince çıktı nasıl değişir? Özet/sınıflandırma için hangisi uygun?",
        tasks: [
          {
            goal: "Tutarlı sonuç için sıcaklığı düşür, yaratıcı görevde yükselt — farkı gözle.",
            tip: "`temperature` parametresini değiştirip aynı girdiyi birkaç kez dene.",
          },
          {
            goal: "Bir isteğin kaç token harcadığını ve bunun maliyetle ilişkisini gör.",
            tip: "Yanıttaki usage/token sayısına bak; uzun girdi = çok token = çok para.",
          },
        ],
      },
    ],
  },

  // ═══════════════════════════ SEVİYE 7 ═══════════════════════════
  {
    id: "ai",
    level: 7,
    track: "ai",
    project: "AI Asistan (Claude API)",
    difficulty: "İleri+",
    emoji: "🤖",
    accent: "fuchsia",
    tier: "senior",
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
        question: "API anahtarını frontend yerine backend sunucusunda (API route) saklayıp istekleri oradan göndermek güvenlik açısından neden kritiktir?",
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
        question: "Streaming (akış) kullanarak cevap üretmek kullanıcı deneyimi (UX) ve ilk yanıt süresi (Time to First Token) açısından ne kazandırır?",
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
        question: "LLM entegrasyonlarında Tool Use (Function Calling) mantığı, modelin kendi bilgisiyle yapamayacağı hangi işlemleri yapmasını sağlar?",
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
        question: "RAG (Retrieval-Augmented Generation) sistemlerinde vektör veritabanı (Vector DB) ve embedding modellerinin rolü nedir?",
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

  // ═══════════════════════ AI İLERİ ═══════════════════════
  {
    id: "rag",
    level: 8,
    track: "ai",
    project: "RAG Uygulaması (Kendi Verinle Sohbet)",
    difficulty: "Uzman",
    emoji: "📚",
    accent: "violet",
    tier: "staff",
    description:
      "Modeli kendi dökümanlarınla konuştur. Bir PDF/metin kümesini parçalara böl, embedding'le, vektör DB'ye yaz ve soruyu en alakalı parçalarla cevapla. Amaç: chunking, embedding, vektör arama, reranking ve kaynak gösterimi (citation).",
    skills: [
      "RAG",
      "Chunking",
      "Embedding",
      "Vector Database",
      "Semantic Search",
      "Reranking",
      "Citation",
    ],
    steps: [
      {
        title: "1. Belgeyi parçala (chunking)",
        learn: ["RAG", "Chunking"],
        question: "Chunk boyutu çok büyük ya da çok küçük olursa cevabın kalitesi nasıl etkilenir? Örtüşme (overlap) neden eklenir?",
        tasks: [
          {
            goal: "Bir dökümanı (örn. uzun bir metin/PDF) anlamlı parçalara böl.",
            tip: "Paragraf/başlık bazlı, hafif örtüşmeli (overlap) chunk'lar üret.",
          },
          {
            goal: "Her parçaya kaynağını (dosya, sayfa/bölüm) ekle.",
            tip: "Sonradan alıntı verebilmek için metadata sakla.",
          },
        ],
      },
      {
        title: "2. Embedding üret ve sakla",
        learn: ["Embedding", "Vector Database"],
        question: "Embedding nedir? Metnin 'anlamı' bir sayı dizisine (vektör) nasıl dönüşür?",
        tasks: [
          {
            goal: "Her chunk için embedding üret.",
            tip: "Bir embedding modeli kullan; çıktıyı (vektör) parçayla birlikte tut.",
          },
          {
            goal: "Vektörleri aranabilir bir vektör veritabanına yaz.",
            tip: "pgvector / Pinecone / Chroma gibi bir vektör DB.",
          },
        ],
      },
      {
        title: "3. Alakalı parçaları getir (retrieval)",
        learn: ["Semantic Search & Reranking"],
        question: "Anahtar kelime aramasıyla anlamsal (semantic) arama arasındaki fark nedir?",
        tasks: [
          {
            goal: "Kullanıcının sorusunu embedding'leyip en yakın chunk'ları çek.",
            tip: "Soruyu da embedding'le; benzerliğe göre top-K parça getir.",
          },
          {
            goal: "Getirilen parçaları alaka sırasına göre yeniden sırala (reranking).",
            tip: "Bir reranker ile en alakalıları öne al; gürültüyü ele.",
          },
        ],
      },
      {
        title: "4. Bağlamla cevapla ve kaynak göster",
        learn: ["Context Window", "Prompt Engineering", "Hallucination"],
        question: "Modele bağlamı (retrieved chunks) verip 'sadece buna dayan' demek halüsinasyonu nasıl azaltır?",
        tasks: [
          {
            goal: "Soruyu, getirilen parçaları bağlam olarak vererek cevaplat.",
            tip: "Prompt: 'Yalnızca aşağıdaki bağlama dayan; yoksa bilmiyorum de.'",
          },
          {
            goal: "Cevabın altında hangi kaynaktan geldiğini göster (citation).",
            tip: "Kullanılan chunk'ların metadata'sını cevaba iliştir.",
          },
        ],
      },
      {
        title: "5. Değerlendir ve yayınla",
        learn: ["Guardrails & Eval", "Caching"],
        question: "RAG sisteminin 'iyi cevap veriyor mu' sorusunu öznel histen çıkarıp nasıl ölçersin?",
        tasks: [
          {
            goal: "Birkaç soru-beklenen-cevap çiftiyle küçük bir test seti kur, kaliteyi ölç.",
            tip: "Eval seti: doğru kaynağı buluyor mu, cevap tutarlı mı?",
          },
          {
            goal: "Asistanı canlıya al; tekrarlı isteklerde maliyeti düşür.",
            tip: "Sık sorulara/önbelleğe (prompt caching) dikkat; deploy et.",
          },
        ],
      },
    ],
  },

  // ═══════════════════════ AI İLERİ ═══════════════════════
  {
    id: "ai-agent",
    level: 9,
    track: "ai",
    project: "AI Agent (Araç Kullanan Asistan)",
    difficulty: "Uzman",
    emoji: "🦾",
    accent: "rose",
    tier: "staff",
    description:
      "Sadece konuşan değil, iş yapan bir asistan. Model bir hedefe ulaşmak için araçları (arama, hesap, API) sırayla çağırsın, sonuçlara göre karar versin ve hatadan kurtulsun. Amaç: tool use, agent döngüsü, planlama, hata kurtarma ve güvenlik sınırları.",
    skills: [
      "Tool Use",
      "AI Agent",
      "Agent döngüsü",
      "Planlama",
      "Hata kurtarma",
      "Guardrails",
      "Maliyet kontrolü",
    ],
    steps: [
      {
        title: "1. Bir araç tanımla (tool use)",
        learn: ["Tool Use", "JSON"],
        question: "Tool use'da modele aracı 'tanıtmak' (isim, açıklama, parametre şeması) neden işin en kritik kısmıdır?",
        tasks: [
          {
            goal: "Modele çağırabileceği bir araç ver (örn. hesap makinesi veya hava durumu).",
            tip: "Aracı isim + açıklama + parametre şemasıyla tanımla (tool definition).",
          },
          {
            goal: "Model aracı çağırınca sen gerçekten çalıştırıp sonucu geri ver.",
            tip: "tool_use → fonksiyonu çalıştır → tool_result olarak geri gönder.",
          },
        ],
      },
      {
        title: "2. Agent döngüsünü kur",
        learn: ["AI Agent", "Context Window"],
        question: "Bir agent döngüsü (düşün → araç çağır → sonucu gözlemle → tekrar) klasik tek seferlik istekten nasıl ayrışır?",
        tasks: [
          {
            goal: "Model birden çok adımda araç çağırabilsin; sen sonuçları geri besleyip döngüyü sürdür.",
            tip: "while döngüsü: model tool çağırdıkça çalıştır, cevabı ekle, model 'bitti' diyene kadar sür.",
          },
          {
            goal: "Sonsuz döngüyü önlemek için bir adım/iterasyon sınırı koy.",
            tip: "max adım sayısı; aşılırsa güvenli şekilde dur.",
          },
        ],
      },
      {
        title: "3. Birden çok araç + planlama",
        learn: ["Prompt Engineering", "Tool Use"],
        question: "Model hangi aracı ne zaman çağıracağına nasıl karar verir? Araç açıklamaları bu kararı nasıl etkiler?",
        tasks: [
          {
            goal: "Birkaç araç ver (örn. arama + hesap + kayıt) ve çok adımlı bir görevi çözdürt.",
            tip: "Net araç açıklamaları; gerekirse system prompt'ta 'önce planla' iste.",
          },
        ],
      },
      {
        title: "4. Hata kurtarma",
        learn: ["Error Handling", "Hallucination", "Retry & Backoff"],
        question: "Bir araç hata döndürürse (örn. API 500) agent'ın çökmek yerine kurtulması için ne yaparsın?",
        tasks: [
          {
            goal: "Araç hatasını modele 'bu çağrı başarısız' diye geri ver ki alternatif denesin.",
            tip: "tool_result'a hatayı yaz; model yeniden denesin/başka yol bulsun.",
          },
          {
            goal: "Modelin uydurduğu/geçersiz parametreyi yakala ve düzelttir.",
            tip: "Parametreyi şemaya göre doğrula; geçersizse net hata mesajıyla geri gönder.",
          },
        ],
      },
      {
        title: "5. Güvenlik, maliyet ve yayın",
        learn: ["Guardrails & Eval", "Prompt Injection", "Caching"],
        question: "Bir agent'a gerçek aksiyon (silme, ödeme) yaptırırken hangi güvenlik sınırlarını koymak zorunludur?",
        tasks: [
          {
            goal: "Tehlikeli/dönüşü olmayan araçları onaya bağla veya kısıtla.",
            tip: "İzinli araç listesi; kritik aksiyonlarda insan onayı (human-in-the-loop).",
          },
          {
            goal: "Kötü niyetli girdinin (prompt injection) araçları kötüye kullanmasını engelle.",
            tip: "Araç çıktısına körü körüne güvenme; girdi sınırla, yetkiyi daralt.",
          },
          {
            goal: "Token/adım maliyetini izle ve agent'ı canlıya al.",
            tip: "Adım başına token bütçesi; gereksiz tur'u kes, deploy et.",
          },
        ],
      },
    ],
  },

  // ═══════════════════════ AI EK PROJELER ═══════════════════════
  {
    id: "doc-extraction",
    level: 3,
    track: "ai",
    project: "Doküman Veri Çıkarımı (Extraction)",
    difficulty: "Orta",
    emoji: "🧾",
    accent: "fuchsia",
    tier: "mid",
    description:
      "Serbest metni yapıya sok. Bir fatura/CV/e-postadan alanları (tutar, tarih, isim) güvenilir JSON olarak çıkar. Amaç: yapılandırılmış çıktı, şema zorlama, doğrulama ve uydurmayı (hallucination) önleme.",
    skills: ["Structured output", "Şema zorlama", "JSON doğrulama", "Few-shot", "Hata toleransı", "Batch işleme"],
    steps: [
      {
        title: "1. Hedef şemayı tanımla",
        learn: ["Yapılandırılmış Çıktı (Structured Output)", "JSON"],
        question: "Modelden serbest metin yerine sabit bir JSON şeması istemek sonraki kodun işini neden kolaylaştırır?",
        tasks: [
          { goal: "Çıkarılacak alanları bir JSON şeması olarak tanımla.", tip: "Alan adları + tipler; zorunlu/opsiyonel." },
          { goal: "Bir örnek metinden bu şemada çıktı al.", tip: "Prompt'ta şemayı net tarif et." },
        ],
      },
      {
        title: "2. Örnekle güçlendir (few-shot)",
        learn: ["Few-shot & Zero-shot", "Prompt Engineering"],
        question: "Birkaç örnek (few-shot) eklemek, modelin biçime uymasını neden artırır?",
        tasks: [
          { goal: "Zor/kenar durumlar için 2-3 örnek girdi→çıktı ekle.", tip: "Eksik alan, farklı format örnekleri." },
        ],
      },
      {
        title: "3. Doğrula ve uydurmayı engelle",
        learn: ["Hallucination", "Error Handling"],
        question: "Model olmayan bir alanı 'uydurursa' bunu nasıl yakalar ve önlersin?",
        tasks: [
          { goal: "Dönen JSON'u şemaya göre doğrula; uymazsa tekrar dene.", tip: "Parse + şema validasyonu (örn. Zod/Pydantic)." },
          { goal: "Metinde olmayan alan 'null' kalsın, uydurulmasın.", tip: "Prompt: 'yoksa null, tahmin etme'." },
        ],
      },
      {
        title: "4. Toplu işle",
        learn: ["Token", "Caching"],
        question: "Yüzlerce dokümanı işlerken token maliyetini ve hızını nasıl dengelersin?",
        tasks: [
          { goal: "Bir klasör/dizi dokümanı sırayla işleyip tek bir tabloya yaz.", tip: "Batch akışı + hata olanı atlama/loglama." },
        ],
      },
    ],
  },
  {
    id: "content-moderation",
    level: 7,
    track: "ai",
    project: "İçerik Moderasyonu (AI + İnsan)",
    difficulty: "İleri+",
    emoji: "🛡️",
    accent: "rose",
    tier: "senior",
    description:
      "Kullanıcı içeriğini güvenli tut. Yorumları toksiklik/spam açısından sınıflandır, eşik uygula ve gri bölgeyi insana yönlendir. Amaç: sınıflandırma, eşik tasarımı, human-in-the-loop ve güvenlik/maliyet dengesi.",
    skills: ["Sınıflandırma", "Toxicity", "Eşik tasarımı", "Human-in-the-loop", "Guardrails", "Yanlış pozitif/negatif"],
    steps: [
      {
        title: "1. Sınıflandır",
        learn: ["İçerik Moderasyonu", "Few-shot & Zero-shot"],
        question: "İçeriği 'güvenli / şüpheli / zararlı' diye etiketlemek tek bir evet/hayır'dan neden daha iyidir?",
        tasks: [
          { goal: "Bir yorumu kategorilere (toksik, spam, güvenli) sınıflandırt.", tip: "Net tanımlı etiketler + few-shot örnek." },
        ],
      },
      {
        title: "2. Eşik ve aksiyon",
        learn: ["İçerik Moderasyonu", "Guardrails & Eval"],
        question: "Eşiği çok düşük/çok yüksek tutmanın bedeli nedir (yanlış pozitif vs negatif)?",
        tasks: [
          { goal: "Güven skoruna göre otomatik engelle / yayınla / beklet kararını ver.", tip: "Eşik üstü engelle, gri bölge → kuyruğa." },
        ],
      },
      {
        title: "3. İnsanı devreye al",
        learn: ["Human-in-the-loop"],
        question: "Hangi kararları otomatik vermek tehlikeli, hangileri için insan onayı şart?",
        tasks: [
          { goal: "Gri bölgedeki içerikleri bir moderatör kuyruğuna düşür.", tip: "İnceleme listesi + onay/ret aksiyonu." },
          { goal: "Moderatör kararını sisteme geri besle.", tip: "Kararlar ileride eval/few-shot için kayıt." },
        ],
      },
      {
        title: "4. Ölç ve sağlamlaştır",
        learn: ["Guardrails & Eval", "Prompt Injection"],
        question: "Moderasyon sisteminin 'iyi çalışıyor' olduğunu öznel histen çıkarıp nasıl ölçersin?",
        tasks: [
          { goal: "Etiketli bir test setiyle yanlış pozitif/negatif oranını ölç.", tip: "Küçük gold set; precision/recall." },
          { goal: "Kötü niyetli girdinin filtreyi atlatmasını zorlaştır.", tip: "Girdi sınırla; jailbreak denemelerini test et." },
        ],
      },
    ],
  },
  {
    id: "chatbot-memory",
    level: 8,
    track: "ai",
    project: "Chatbot + Kalıcı Hafıza",
    difficulty: "Uzman",
    emoji: "🧠",
    accent: "violet",
    tier: "staff",
    description:
      "Seni hatırlayan bir asistan. Uzayan sohbette bağlamı yönet, eski mesajları özetle ve kullanıcıya özel kalıcı bilgiyi sakla. Amaç: konuşma hafızası, context window yönetimi, özetleme ve kullanıcı profili.",
    skills: ["Konuşma hafızası", "Context window", "Özetleme", "Kullanıcı profili", "Token bütçesi", "Kalıcılık"],
    steps: [
      {
        title: "1. Çok turlu sohbet",
        learn: ["Konuşma Hafızası (Memory)", "System Prompt"],
        question: "LLM API'leri durumsuzken asistan önceki mesajları nasıl 'hatırlar'?",
        tasks: [
          { goal: "Geçmiş mesajları her istekte gönderip tutarlı bir sohbet kur.", tip: "messages dizisini biriktir." },
        ],
      },
      {
        title: "2. Context sınırını yönet",
        learn: ["Context Window", "Token"],
        question: "Sohbet uzayıp context window dolunca ne olur ve ne yaparsın?",
        tasks: [
          { goal: "Sohbet büyüyünce eski mesajları özetleyerek yer aç.", tip: "Son N mesaj + öncekinin özeti." },
        ],
      },
      {
        title: "3. Kalıcı kullanıcı profili",
        learn: ["Konuşma Hafızası (Memory)", "Database"],
        question: "Kullanıcının tercihlerini (dil, ton) sohbet geçmişinde değil ayrı saklamak neden daha iyi?",
        tasks: [
          { goal: "Kullanıcıya özel kalıcı bilgileri bir veritabanında sakla.", tip: "Profil tablosu; her sohbette yükle." },
        ],
      },
      {
        title: "4. Maliyet ve yayın",
        learn: ["Caching", "Token"],
        question: "Hafıza büyüdükçe maliyet artar; token bütçesini nasıl kontrol altında tutarsın?",
        tasks: [
          { goal: "Gönderilen geçmişi token bütçesine göre kırp/özetle.", tip: "Bütçe aşımında en eskileri özetle." },
          { goal: "Asistanı yayınla ve maliyeti izle.", tip: "Prompt caching; deploy." },
        ],
      },
    ],
  },

  // ═══════════════════════════ SEVİYE 8 ═══════════════════════════
  {
    id: "mobile",
    level: 8,
    track: "frontend",
    project: "Mobil Uygulama (Expo)",
    difficulty: "İleri+",
    emoji: "📱",
    accent: "cyan",
    tier: "senior",
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
        question: "React Native'de kullanılan View ve Text gibi native bileşenler, web'deki div ve span gibi elementlerden nasıl farklılaşır? Arka plandaki bridge nasıl çalışır?",
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
        question: "Expo Router veya React Navigation kullanırken, web'deki URL tabanlı yönlendirmeden farklı olarak mobil ekranların bir yığın (stack) halinde üst üste binmesi ne anlama gelir?",
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
        question: "Mobil uygulamalarda hassas verileri (örn. auth token) AsyncStorage yerine neden SecureStore ile saklamalıyız?",
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
        question: "OTA (Over-the-Air) güncellemelerinin EAS Update ile gönderilmesinin App Store veya Google Play Store onay süreçlerine kıyasla sağladığı avantaj nedir?",
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

  // ═══════════════════════ DEVOPS BAŞLANGIÇ ═══════════════════════
  {
    id: "linux-cli",
    level: 2,
    track: "devops",
    project: "Linux & CLI Temelleri",
    difficulty: "Kolay-Orta",
    emoji: "🐧",
    accent: "emerald",
    tier: "junior",
    description:
      "DevOps'un toprağı: terminal. Bir Linux sunucusunda gez, dosya izinlerini yönet, SSH ile bağlan ve küçük bir uygulamayı systemd servisi olarak çalıştır. Amaç: shell, izinler, paket yönetimi, SSH ve servis mantığına oturmak — adım adım.",
    skills: [
      "Shell & Bash",
      "Linux dosya izinleri",
      "SSH",
      "Paket yöneticisi",
      "systemd",
      "Script yazma",
      "Loglar",
    ],
    steps: [
      {
        title: "1. Terminalde gez",
        learn: ["Shell & Bash"],
        question: "Mutlak (absolute) yol ile göreli (relative) yol arasındaki fark nedir?",
        tasks: [
          {
            goal: "Bir klasör ağacında gezin: dizinleri listele, içine gir, dosya oluştur/taşı/sil.",
            tip: "`ls`, `cd`, `mkdir`, `touch`, `mv`, `rm` — küçük adımlarla dene.",
          },
          {
            goal: "Bir metin dosyasında belirli bir kelimeyi içeren satırları bul.",
            tip: "`grep` + pipe (`|`); örn. `cat dosya | grep hata`.",
          },
        ],
      },
      {
        title: "2. Dosya izinleri",
        learn: ["Linux Dosya İzinleri"],
        question: "`chmod 755` ne anlama gelir? Sahip, grup ve diğerleri için hangi izinleri verir?",
        tasks: [
          {
            goal: "Bir script'i çalıştırılabilir yap ve sahipliğini değiştir.",
            tip: "`chmod +x script.sh`, `chown` ile sahibi değiştir; `ls -l` ile doğrula.",
          },
        ],
      },
      {
        title: "3. Paket kur",
        learn: ["Paket Yöneticisi (apt/brew)"],
        question: "Paketi paket yöneticisiyle kurmak, manuel indirip kurmaya göre hangi sorunları çözer?",
        tasks: [
          {
            goal: "Sistem paket listesini güncelle ve bir araç kur (örn. `htop` veya `git`).",
            tip: "`sudo apt update` → `sudo apt install <paket>` (macOS'ta `brew install`).",
          },
        ],
      },
      {
        title: "4. SSH ile uzak sunucuya bağlan",
        learn: ["SSH", "Environment (dev/staging/prod)"],
        question: "SSH'ta parola yerine anahtar çifti (public/private key) kullanmak neden daha güvenlidir?",
        tasks: [
          {
            goal: "Bir uzak sunucuya (veya yerel bir VM'e) SSH ile bağlan.",
            tip: "`ssh kullanici@sunucu`; anahtar üret (`ssh-keygen`), public key'i sunucuya ekle.",
          },
          {
            goal: "Yerelden uzağa bir dosya kopyala.",
            tip: "`scp dosya kullanici@sunucu:/yol`.",
          },
        ],
      },
      {
        title: "5. Küçük bir script yaz",
        learn: ["Shell & Bash", "Cron Job"],
        question: "Bir işi elle çalıştırmak yerine script'e dökmek ve zamanlamak ne kazandırır?",
        tasks: [
          {
            goal: "Bir klasördeki dosyaları yedekleyen küçük bir bash script'i yaz.",
            tip: "Değişken, döngü ve `tar`/`cp`; başına `#!/bin/bash`.",
          },
          {
            goal: "Bu script'i her gece otomatik çalışacak şekilde zamanla.",
            tip: "`crontab -e` ile bir cron satırı ekle.",
          },
        ],
      },
      {
        title: "6. Uygulamayı servis yap (systemd)",
        learn: ["systemd & Servis", "Observability"],
        question: "Bir uygulamayı systemd servisi yapmak, terminalde `node app.js` ile çalıştırmaya göre neyi garanti eder?",
        tasks: [
          {
            goal: "Küçük bir uygulamayı, sunucu yeniden başlasa da otomatik ayağa kalkan bir servis olarak tanımla.",
            tip: "Bir `.service` unit dosyası; `systemctl enable --now`.",
          },
          {
            goal: "Servisin loglarını canlı izle.",
            tip: "`journalctl -u <servis> -f`.",
          },
        ],
      },
    ],
  },

  // ═══════════════════════════ SEVİYE 3 ═══════════════════════════
  {
    id: "docker",
    level: 3,
    track: "devops",
    project: "Docker'la Paketle",
    difficulty: "Orta",
    emoji: "🐳",
    accent: "sky",
    tier: "mid",
    description:
      "'Bende çalışıyordu' devri bitsin. Bir uygulamayı Dockerfile ile imaja paketle, container çalıştır, veriyi volume ile kalıcı yap ve app + veritabanını Docker Compose ile tek komutla ayağa kaldır. Amaç: image, container, volume, compose ve multi-stage build.",
    skills: [
      "Container",
      "Dockerfile",
      "Docker image & layer",
      "Volume",
      "Docker Compose",
      "Multi-stage build",
      "Port mapping",
    ],
    steps: [
      {
        title: "1. İlk container'ı çalıştır",
        learn: ["Docker", "Container"],
        question: "Container ile sanal makine (VM) arasındaki temel fark, kaynak kullanımı açısından nedir?",
        tasks: [
          {
            goal: "Hazır bir imajdan bir container çalıştır (örn. `hello-world` veya `nginx`).",
            tip: "`docker run ...`; çalışanları `docker ps` ile gör.",
          },
        ],
      },
      {
        title: "2. Kendi imajını yaz (Dockerfile)",
        learn: ["Dockerfile", "Docker Image & Layer"],
        question: "Dockerfile'da `COPY package.json` + `RUN npm install`'ı kaynak kodu kopyalamadan ÖNCE yapmak build cache'ini nasıl hızlandırır?",
        tasks: [
          {
            goal: "Bir uygulaman için Dockerfile yaz ve imaj üret.",
            tip: "`FROM` → `WORKDIR` → `COPY` → `RUN` → `CMD`; sonra `docker build -t app .`.",
          },
          {
            goal: "Uygulamaya tarayıcıdan eriş.",
            tip: "Port'u dışa aç — `docker run -p 3000:3000 app`.",
          },
        ],
      },
      {
        title: "3. Veriyi kalıcı yap (volume)",
        learn: ["Docker Volume"],
        question: "Container silinince içine yazılan veri neden kaybolur? Volume bunu nasıl çözer?",
        tasks: [
          {
            goal: "Bir veritabanı container'ı çalıştır ve verisi container silinse de kalsın.",
            tip: "`-v veri:/var/lib/...` ile bir volume bağla.",
          },
        ],
      },
      {
        title: "4. Çok servisi birlikte ayağa kaldır (Compose)",
        learn: ["Docker Compose"],
        question: "Docker Compose'da tanımlı servislerin birbirine isimle (örn. `db`) erişebilmesini sağlayan nedir?",
        tasks: [
          {
            goal: "App + veritabanını tek dosyada tanımla ve tek komutla başlat.",
            tip: "`docker-compose.yml` (services, ports, environment, depends_on) → `docker compose up`.",
          },
          {
            goal: "App, veritabanına servis adıyla bağlansın.",
            tip: "Bağlantı host'u `localhost` değil servis adı (örn. `db`).",
          },
        ],
      },
      {
        title: "5. İmajı küçült (multi-stage)",
        learn: ["Multi-stage Build"],
        question: "Multi-stage build, derleme araçlarını son imaja taşımadan imajı nasıl küçültür ve güvenliği nasıl artırır?",
        tasks: [
          {
            goal: "Build aşaması ile çalışma aşamasını ayır; son imaja sadece çıktıyı al.",
            tip: "İki `FROM` aşaması; ikinciye `COPY --from=builder` ile yalnızca build çıktısı.",
          },
          {
            goal: "İmaj boyutunun önemli ölçüde küçüldüğünü doğrula.",
            tip: "`docker images` ile öncesi/sonrası boyutu karşılaştır.",
          },
        ],
      },
    ],
  },

  // ═══════════════════════════ SEVİYE 4 ═══════════════════════════
  {
    id: "cicd",
    level: 4,
    track: "devops",
    project: "CI/CD Pipeline (GitHub Actions)",
    difficulty: "İleri",
    emoji: "⚙️",
    accent: "violet",
    tier: "senior",
    description:
      "Manuel deploy biter. Her push'ta testleri çalıştıran, imaj build edip yayınlayan ve canlıya otomatik dağıtan bir pipeline kur. Amaç: GitHub Actions, test gate, secrets, build ve güvenli deploy akışı.",
    skills: [
      "CI/CD",
      "GitHub Actions",
      "Test gate",
      "Secrets",
      "Build & artifact",
      "Otomatik deploy",
      "Environment",
    ],
    steps: [
      {
        title: "1. İlk workflow",
        learn: ["CI/CD", "GitHub Actions"],
        question: "CI (Continuous Integration) ile CD (Continuous Delivery/Deployment) arasındaki fark nedir?",
        tasks: [
          {
            goal: "Her push'ta otomatik çalışan bir workflow oluştur.",
            tip: "`.github/workflows/ci.yml`; `on: push`, bir job + birkaç step.",
          },
          {
            goal: "Bağımlılıkları kurup projeyi build eden adımları ekle.",
            tip: "checkout → setup-node → `npm ci` → `npm run build`.",
          },
        ],
      },
      {
        title: "2. Test gate",
        learn: ["Unit / Integration / E2E Test", "Pull Request"],
        question: "Testleri merge'den önce zorunlu kılmak (gate) bir ekibe ne kazandırır?",
        tasks: [
          {
            goal: "Pipeline testleri çalıştırsın; testler kırmızıysa süreç başarısız olsun.",
            tip: "`npm test` adımı; başarısızsa job fail eder.",
          },
          {
            goal: "Testler geçmeden PR'ın merge edilmesini engelle.",
            tip: "Branch protection → 'require status checks'.",
          },
        ],
      },
      {
        title: "3. Secrets'ı güvenle kullan",
        learn: ["Secrets Management", "Environment Variable"],
        question: "API anahtarı/şifre gibi değerleri workflow dosyasına düz yazmak yerine neden repo secrets kullanırsın?",
        tasks: [
          {
            goal: "Bir gizli değeri (örn. deploy token) pipeline'da güvenle kullan.",
            tip: "GitHub → Settings → Secrets; workflow'da `${{ secrets.X }}`.",
          },
        ],
      },
      {
        title: "4. İmaj build & yayın",
        learn: ["Docker Image & Layer", "Semantic Versioning"],
        question: "Her commit için imajı bir registry'ye etiketleyerek (tag) yüklemek deploy ve geri dönüş (rollback) açısından neden işe yarar?",
        tasks: [
          {
            goal: "Pipeline uygulamanın Docker imajını build edip bir registry'ye push etsin.",
            tip: "docker build → login → push; imajı commit SHA ile etiketle.",
          },
        ],
      },
      {
        title: "5. Otomatik deploy + güvenlik",
        learn: ["Deploy", "Blue-Green Deployment", "Health Check"],
        question: "Otomatik deploy'da, hatalı bir sürümün tüm kullanıcıları etkilemesini önlemek için hangi stratejileri kullanırsın?",
        tasks: [
          {
            goal: "Testler ve build geçince uygulama otomatik olarak canlıya dağıtılsın.",
            tip: "Main'e merge → deploy job (yalnızca yeşil pipeline'da).",
          },
          {
            goal: "Deploy sonrası uygulamanın gerçekten ayakta olduğunu doğrula.",
            tip: "Bir `/health` kontrolü; başarısızsa deploy'u fail say.",
          },
        ],
      },
    ],
  },

  // ═══════════════════════════ SEVİYE 5 ═══════════════════════════
  {
    id: "iac-terraform",
    level: 5,
    track: "devops",
    project: "Infrastructure as Code (Terraform)",
    difficulty: "İleri",
    emoji: "🏗️",
    accent: "violet",
    tier: "senior",
    description:
      "Altyapıyı kodla yönet. Bulut üzerinde sunucu, güvenlik duvarı ve ağ yapılarını Terraform ile tanımla, Terraform State ile değişiklikleri izle ve uzaktan state yönetimini (remote backend) yapılandır. Amaç: Infrastructure as Code prensipleri, bulut kaynak yönetimi, state güvenliği ve parametrik altyapı.",
    skills: [
      "Infrastructure as Code",
      "Terraform",
      "Cloud Provider",
      "Terraform State",
    ],
    steps: [
      {
        title: "1. Terraform ile Sunucu Tanımlama",
        learn: ["Infrastructure as Code", "Terraform"],
        question: "Altyapının manuel tıklayarak kurulması yerine Terraform ile kodla tanımlanmasının (Infrastructure as Code) sağladığı en büyük avantajlar nelerdir?",
        tasks: [
          {
            goal: "AWS (veya DigitalOcean) üzerinde bir sanal makine (EC2) ve güvenlik duvarı (Security Group) kuran Terraform konfigürasyonu yaz.",
            tip: "Provider ve resource block'larını tanımlayan `main.tf` oluştur.",
          },
        ],
      },
      {
        title: "2. Plan ve Apply Çalıştır",
        learn: ["Terraform"],
        question: "Terraform plan komutu ne işe yarar? Değişiklikleri uygulamadan önce plan çıktısını incelemek neden hayat kurtarır?",
        tasks: [
          {
            goal: "Yazdığın konfigürasyonun oluşturacağı kaynakları doğrula ve gerçekten bulut üzerinde ayağa kaldır.",
            tip: "`terraform init` -> `terraform plan` -> `terraform apply` komutlarını çalıştır.",
          },
        ],
      },
      {
        title: "3. State Yönetimi ve Kalıcılık",
        learn: ["Terraform State"],
        question: "Terraform State (terraform.tfstate) dosyası ne işe yarar ve bu dosyanın lokal yerine uzak bir depolama alanında (S3/Cloud Storage) saklanması (remote state) ekipler için neden zorunludur?",
        tasks: [
          {
            goal: "Terraform state dosyasını yerelde tutmak yerine güvenli bir AWS S3 bucket'ında (remote backend) saklanacak şekilde yapılandır.",
            tip: "`backend \"s3\"` bloğunu konfigürasyonuna ekle.",
          },
        ],
      },
      {
        title: "4. Değişkenler ve Çıktılar",
        learn: ["Terraform"],
        question: "Terraform'da input variables ile outputs arasındaki fark nedir? Altyapıyı parametrik hale getirmek neden önemlidir?",
        tasks: [
          {
            goal: "Sunucu tipini ve bölgeyi (region) parametreye bağla; deploy bitince sunucunun IP adresini ekrana yazdır.",
            tip: "`variables.tf` ve `outputs.tf` dosyalarını kullan.",
          },
        ],
      },
      {
        title: "5. Kaynakları Güvenle Yok Et",
        learn: ["Terraform"],
        question: "Terraform destroy komutu ne yapar? Bulut kaynaklarının gereksiz çalışıp maliyet çıkarmasını önlemek için ne yapmalıyız?",
        tasks: [
          {
            goal: "Deneme için oluşturduğun tüm bulut kaynaklarını tek bir komutla temizle.",
            tip: "`terraform destroy` komutunu çalıştır.",
          },
        ],
      },
    ],
  },

  // ═══════════════════════════ SEVİYE 6 ═══════════════════════════
  {
    id: "kubernetes",
    level: 6,
    track: "devops",
    project: "Kubernetes & Ölçekleme",
    difficulty: "Uzman",
    emoji: "☸️",
    accent: "amber",
    tier: "staff",
    description:
      "Onlarca container'ı elle değil, beyanla yönet. Uygulamanı pod/deployment olarak çalıştır, Service ve Ingress ile aç, config/secret'ı dışarıdan ver ve yüke göre otomatik ölçekle. Amaç: pod, deployment, service, ingress, config/secret ve HPA.",
    skills: [
      "Kubernetes",
      "Pod & Deployment",
      "Service",
      "Ingress",
      "ConfigMap & Secret",
      "HPA (autoscaling)",
      "Rolling update",
    ],
    steps: [
      {
        title: "1. İlk pod & deployment",
        learn: ["Kubernetes", "Kubernetes Pod", "Deployment & Service (K8s)"],
        question: "Pod'ları tek tek değil, Deployment üzerinden yönetmek neden gereklidir (bir pod ölünce ne olur)?",
        tasks: [
          {
            goal: "Uygulamanın imajını bir Deployment ile çalıştır; birkaç replica iste.",
            tip: "Bir Deployment manifesti (`replicas`, `image`); `kubectl apply -f`.",
          },
          {
            goal: "Çalışan pod'ları gör ve birini silince yenisinin açıldığını izle.",
            tip: "`kubectl get pods`; bir pod sil, Deployment yenisini yaratsın.",
          },
        ],
      },
      {
        title: "2. Erişimi aç (Service & Ingress)",
        learn: ["Deployment & Service (K8s)", "Ingress", "Load Balancer"],
        question: "Pod IP'leri sürekli değişirken, bir Service trafiği nasıl kararlı şekilde pod'lara ulaştırır?",
        tasks: [
          {
            goal: "Pod'ların önüne sabit bir adres koyan bir Service tanımla.",
            tip: "Bir Service manifesti; selector ile deployment'a bağla.",
          },
          {
            goal: "Uygulamayı dış dünyaya bir alan adı/yol üzerinden aç.",
            tip: "Bir Ingress kuralı; host/path → Service.",
          },
        ],
      },
      {
        title: "3. Config & secret'ı ayır",
        learn: ["ConfigMap & Secret (K8s)", "Environment Variable"],
        question: "Aynı imajın dev/staging/prod'da farklı ayarla çalışması için config'i imajdan ayırmak neden şart?",
        tasks: [
          {
            goal: "Ortam ayarlarını ConfigMap, hassas değerleri Secret olarak tanımla.",
            tip: "ConfigMap/Secret manifestleri; pod'a env veya dosya olarak bağla.",
          },
        ],
      },
      {
        title: "4. Otomatik ölçekle (HPA)",
        learn: ["Horizontal Pod Autoscaler (HPA)", "Auto-scaling"],
        question: "HPA, replica sayısına karar verirken neyi (örn. CPU) izler ve yük düşünce neden ölçeği geri çeker?",
        tasks: [
          {
            goal: "CPU yükü artınca pod sayısını otomatik artıran bir HPA tanımla.",
            tip: "Bir HPA kaynağı (hedef CPU %, min/max replica).",
          },
          {
            goal: "Yapay yük bindirip pod sayısının arttığını gözle.",
            tip: "Basit bir yük testi; `kubectl get hpa` ile izle.",
          },
        ],
      },
      {
        title: "5. Güvenli güncelleme (rolling update)",
        learn: ["Blue-Green Deployment", "Health Check", "Observability"],
        question: "Rolling update sırasında readiness/liveness probe'ları, hatalı yeni sürümün trafiğe açılmasını nasıl engeller?",
        tasks: [
          {
            goal: "Yeni sürümü kullanıcıyı kesintiye uğratmadan kademeli yay.",
            tip: "İmaj tag'ini güncelle; Deployment rolling update yapsın.",
          },
          {
            goal: "Pod'lara sağlık kontrolü ekleyip sorunlu sürümün otomatik durmasını sağla.",
            tip: "readiness/liveness probe; hazır olmayan pod'a trafik gitmez.",
          },
        ],
      },
    ],
  },

  // ═══════════════════════ DEVOPS EK PROJELER ═══════════════════════
  {
    id: "git-workflow",
    level: 2,
    track: "devops",
    project: "Git İş Akışı & Branch Stratejisi",
    difficulty: "Kolay-Orta",
    emoji: "🌿",
    accent: "emerald",
    tier: "junior",
    description:
      "Tek başına 'commit -m fix' devri biter. Ekip gibi çalış: branch aç, PR ile gözden geçir, conflict çöz ve sürüm etiketle. Amaç: branch stratejisi, pull request, merge/rebase, conflict çözümü ve temiz commit geçmişi.",
    skills: ["Branch", "Pull Request", "Merge vs Rebase", "Conflict çözümü", "Conventional Commits", "Tag/Release"],
    steps: [
      {
        title: "1. Branch ile çalış",
        learn: ["Branch", "Git & GitHub"],
        question: "Doğrudan main'e commit atmak yerine feature branch kullanmak bir ekibe ne kazandırır?",
        tasks: [
          { goal: "Bir özelliği ayrı bir branch'te geliştir.", tip: "`git switch -c feature/x`; main'e dokunma." },
          { goal: "Anlamlı, küçük commit'ler at.", tip: "Conventional Commits: `feat:`, `fix:` …" },
        ],
      },
      {
        title: "2. Pull Request ile gözden geçir",
        learn: ["Pull Request", "Code Review Kültürü"],
        question: "Küçük PR'lar büyük PR'lara göre review kalitesini neden artırır?",
        tasks: [
          { goal: "Branch'ini PR olarak aç; ne yaptığını net açıkla.", tip: "Başlık + açıklama + ekran görüntüsü." },
          { goal: "Bir gözden geçirme yorumunu uygula.", tip: "Yorum → düzelt → tekrar push." },
        ],
      },
      {
        title: "3. Conflict çöz",
        learn: ["Merge Conflict", "Merge"],
        question: "Merge conflict tam olarak ne zaman oluşur ve neden korkutucu değildir?",
        tasks: [
          { goal: "Bilerek çakışan iki değişiklik üret ve conflict'i çöz.", tip: "Çakışma işaretlerini elle çöz; test et." },
        ],
      },
      {
        title: "4. Geçmişi temiz tut + sürüm",
        learn: ["git rebase", "Conventional Commits"],
        question: "Merge ile rebase arasındaki fark nedir? Hangisi 'düz bir geçmiş' verir?",
        tasks: [
          { goal: "Dağınık commit'leri temizle (squash/rebase).", tip: "İnteraktif olmayan ortamda dikkatli; küçük adımlarla." },
          { goal: "Bir sürümü etiketle.", tip: "`git tag v1.0.0` + release notu." },
        ],
      },
    ],
  },
  {
    id: "reverse-proxy",
    level: 4,
    track: "devops",
    project: "Reverse Proxy & TLS (nginx)",
    difficulty: "İleri",
    emoji: "🔀",
    accent: "violet",
    tier: "senior",
    description:
      "Uygulamanın önüne profesyonel bir kapı koy. nginx ile trafiği yönlendir, HTTPS (TLS) sonlandır, statik dosya sun ve sıkıştır. Amaç: reverse proxy, TLS sertifikası, yönlendirme ve önbellek/sıkıştırma.",
    skills: ["Reverse proxy", "nginx", "TLS/SSL", "Yönlendirme", "Gzip/Brotli", "Statik sunum"],
    steps: [
      {
        title: "1. Reverse proxy kur",
        learn: ["Reverse Proxy & Nginx", "Load Balancer"],
        question: "Uygulamayı doğrudan internete açmak yerine önüne reverse proxy koymanın faydaları neler?",
        tasks: [
          { goal: "nginx'i, gelen istekleri uygulamana ileten bir proxy olarak yapılandır.", tip: "`proxy_pass http://app:3000`." },
        ],
      },
      {
        title: "2. HTTPS (TLS) ekle",
        learn: ["TLS / SSL", "HTTPS"],
        question: "TLS sonlandırmayı proxy katmanında yapmak uygulamanı neden basitleştirir?",
        tasks: [
          { goal: "Siteyi HTTPS ile servis et ve HTTP'yi HTTPS'e yönlendir.", tip: "Let's Encrypt (Certbot) ücretsiz sertifika." },
        ],
      },
      {
        title: "3. Yönlendirme ve statik",
        learn: ["CDN", "Caching"],
        question: "Statik dosyaları uygulama yerine nginx'in sunması performansı nasıl etkiler?",
        tasks: [
          { goal: "Alan adı/yola göre farklı servislere yönlendir (örn. /api → backend).", tip: "location blokları." },
          { goal: "Statik dosyaları doğrudan nginx'ten sun ve önbellekle.", tip: "`expires` + cache header." },
        ],
      },
      {
        title: "4. Sıkıştır ve sağlamlaştır",
        learn: ["Health Check", "Rate Limiting"],
        question: "Gzip/Brotli sıkıştırma neyi azaltır ve hangi içerik tiplerinde işe yarar?",
        tasks: [
          { goal: "Yanıtları sıkıştır (gzip/brotli).", tip: "nginx gzip ayarları." },
          { goal: "Basit bir istek sınırlama (rate limit) ekle.", tip: "limit_req zone." },
        ],
      },
    ],
  },
  {
    id: "observability-stack",
    level: 5,
    track: "devops",
    project: "Gözlemlenebilirlik (Prometheus/Grafana)",
    difficulty: "İleri+",
    emoji: "📡",
    accent: "amber",
    tier: "staff",
    description:
      "Üretimde 'neden yavaş?' sorusuna tahminle değil veriyle cevap ver. Metrik topla, dashboard kur, alarm yaz ve istekleri uçtan uca izle. Amaç: metrik, dashboard, alerting, log ve trace.",
    skills: ["Observability", "Prometheus", "Grafana", "Alerting", "Structured logging", "Tracing"],
    steps: [
      {
        title: "1. Metrik üret ve topla",
        learn: ["Observability", "Prometheus & Grafana"],
        question: "Log, metrik ve trace gözlemlenebilirliğin üç direği — her biri hangi soruyu yanıtlar?",
        tasks: [
          { goal: "Uygulamana temel metrikler ekle (istek sayısı, gecikme, hata).", tip: "Bir Prometheus client; `/metrics` endpoint'i." },
          { goal: "Prometheus bu metrikleri düzenli toplasın.", tip: "scrape config." },
        ],
      },
      {
        title: "2. Dashboard kur",
        learn: ["Prometheus & Grafana", "SLA / SLO / SLI"],
        question: "Hangi metrikleri 'altın sinyaller' (latency, traffic, errors, saturation) olarak izlemelisin?",
        tasks: [
          { goal: "Grafana'da gecikme ve hata oranını gösteren bir dashboard yap.", tip: "PromQL ile panel sorguları." },
        ],
      },
      {
        title: "3. Alarm yaz",
        learn: ["Alerting (Alarm)", "Health Check"],
        question: "İyi bir alarm ile 'gürültülü' bir alarmı ayıran nedir (alert fatigue)?",
        tasks: [
          { goal: "Hata oranı eşiği aşılınca tetiklenen bir alarm tanımla.", tip: "Alert rule + bir bildirim kanalı." },
        ],
      },
      {
        title: "4. Log + trace",
        learn: ["Structured Logging", "Distributed Tracing"],
        question: "Yapılandırılmış (JSON) log, düz metin log'a göre arama/analizde neden üstündür?",
        tasks: [
          { goal: "Logları yapılandırılmış (JSON) ve korelasyon id'li hale getir.", tip: "request id'yi her log'a koy." },
          { goal: "Bir isteği servisler arası uçtan uca izle.", tip: "Distributed tracing (OpenTelemetry)." },
        ],
      },
    ],
  },

  // ═══════════════════════════ SEVİYE 9 ═══════════════════════════
  {
    id: "devops",
    level: 9,
    track: "devops",
    project: "Üretim Altyapısı (DevOps)",
    difficulty: "Uzman",
    emoji: "🛰️",
    accent: "indigo",
    tier: "senior",
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
        question: "Docker container mantığı, geleneksel sanal makinelerden (VM) kaynak tüketimi ve mimari açıdan nasıl ayrışır?",
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
        question: "Yatay ölçekleme (Horizontal Scaling) yaparken Load Balancer (Yük Dengeleyici) trafiği sunuculara dağıtırken sticky session (yapışkan oturum) neden önem kazanır?",
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
        question: "Arka plan iş kuyruğunda (Message Queue) bir işin (job) işlenirken hata alması durumunda dead-letter queue (DLQ) mekanizması ne işe yarar?",
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
        question: "Sıfır kesinti ile dağıtım yaparken Blue-Green Deployment ile Canary Deployment arasındaki temel farklar nelerdir?",
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

  // ═══════════════════════ DATA ENGINEERING ═══════════════════════
  {
    id: "sql-deep",
    level: 1,
    track: "data-engineering",
    project: "SQL Derinlemesine",
    difficulty: "Başlangıç",
    emoji: "🧮",
    accent: "cyan",
    tier: "intern",
    description:
      "Veri mühendisliğinin ana dili: SQL. Gerçek bir veri kümesinde join'ler, gruplama, window fonksiyonları ve index ile sorgu yaz; yavaş sorguyu hızlandır. Amaç: ilişkisel sorgulamaya, analitik fonksiyonlara ve sorgu performansına oturmak — adım adım.",
    skills: [
      "SQL",
      "JOIN",
      "GROUP BY",
      "Window Function",
      "Index",
      "Query planı",
      "Subquery & CTE",
    ],
    steps: [
      {
        title: "1. Veriyi yükle ve gözden geçir",
        learn: ["SQL", "Database", "Schema"],
        question: "İlişkisel bir veritabanında 'tablo', 'satır' ve 'sütun' neyi temsil eder?",
        tasks: [
          {
            goal: "Sağladığımız ilişkili CSV'leri (müşteriler, ürünler, siparişler) bir veritabanına yükle.",
            tip: "`/datasets/musteriler.csv`, `/datasets/urunler.csv`, `/datasets/siparisler.csv` → SQLite/Postgres tabloları.",
          },
          {
            goal: "Basit `SELECT ... WHERE ... ORDER BY` sorgularıyla veriyi tanı.",
            tip: "Önce filtrele ve sırala; birkaç satıra bak.",
          },
        ],
      },
      {
        title: "2. Tabloları birleştir (JOIN)",
        learn: ["Relation (İlişki)", "Foreign Key"],
        question: "INNER JOIN ile LEFT JOIN arasındaki fark nedir? Hangi durumda eşleşmeyen satırlar da gelir?",
        tasks: [
          {
            goal: "İki tabloyu ortak anahtar üzerinden birleştirip anlamlı bir sonuç üret.",
            tip: "`JOIN ... ON a.id = b.a_id`; INNER ve LEFT farkını dene.",
          },
        ],
      },
      {
        title: "3. Grupla ve özetle",
        learn: ["SQL", "Data Warehouse"],
        question: "`WHERE` ile `HAVING` arasındaki fark nedir — hangisi gruplamadan önce, hangisi sonra çalışır?",
        tasks: [
          {
            goal: "Veriyi grupla ve toplam/ortalama/sayım gibi özetler çıkar.",
            tip: "`GROUP BY` + `COUNT/SUM/AVG`; grup koşulu için `HAVING`.",
          },
        ],
      },
      {
        title: "4. Window fonksiyonları",
        learn: ["Window Function"],
        question: "Window fonksiyonu, `GROUP BY`'dan farklı olarak satırları neden 'yutmaz'? ROW_NUMBER ve RANK ne işe yarar?",
        tasks: [
          {
            goal: "Her grup içinde sıralama yap (örn. müşteri başına en pahalı sipariş).",
            tip: "`ROW_NUMBER() OVER (PARTITION BY ... ORDER BY ...)`.",
          },
          {
            goal: "Çalışan toplam veya bir önceki satırla fark hesapla.",
            tip: "`SUM(...) OVER (...)` veya `LAG(...)`.",
          },
        ],
      },
      {
        title: "5. Karmaşıklığı düzenle (CTE)",
        learn: ["SQL", "Refactoring"],
        question: "İç içe subquery yerine CTE (`WITH`) kullanmak sorguyu okunabilirlik açısından neden iyileştirir?",
        tasks: [
          {
            goal: "Çok adımlı bir analizi okunur parçalara böl.",
            tip: "`WITH ad AS (...)` ile ara sonuçları isimlendir.",
          },
        ],
      },
      {
        title: "6. Yavaş sorguyu hızlandır (index)",
        learn: ["Index (DB)", "Big O Notation"],
        question: "Bir index sorguyu nasıl hızlandırır? Her sütuna index eklemenin maliyeti (yazma/depolama) nedir?",
        tasks: [
          {
            goal: "Yavaş bir sorgunun nasıl çalıştığını gör (full scan mı?).",
            tip: "`EXPLAIN` / `EXPLAIN ANALYZE` ile query planına bak.",
          },
          {
            goal: "Doğru sütuna index ekleyip sorgunun hızlandığını doğrula.",
            tip: "`CREATE INDEX`; öncesi/sonrası planı karşılaştır.",
          },
        ],
      },
    ],
  },

  {
    id: "data-pipeline",
    level: 2,
    track: "data-engineering",
    project: "Veri Boru Hattı 101 (ETL)",
    difficulty: "Başlangıç-Orta",
    emoji: "📊",
    accent: "sky",
    tier: "junior",
    description:
      "İlk veri mühendisliği projen. Ham bir veri dosyasını al, temizle ve sorgulanabilir bir tabloya yükle. Amaç: ETL (Extract-Transform-Load) mantığına, veri temizliğine ve veri ambarına oturmak.",
    skills: [
      "ETL",
      "Veri boru hattı",
      "CSV",
      "Veri temizliği",
      "SQL",
      "Data Warehouse",
      "Batch vs Stream",
    ],
    steps: [
      {
        title: "1. Ham veriyi al (Extract)",
        learn: ["CSV", "ETL"],
        question: "ETL'in üç adımı (Extract-Transform-Load) ne işe yarar?",
        tasks: [
          {
            goal: "Sağladığımız dağınık siparişler CSV'sini bir script ile oku.",
            tip: "`/datasets/siparisler.csv` (bizim sunduğumuz veri); Python `pandas.read_csv` veya Node `csv-parse`.",
          },
          {
            goal: "Kaç satır/sütun olduğunu ve birkaç örnek satırı yazdır.",
            tip: "Önce veriyi TANI — `df.head()` / ilk N satır.",
          },
        ],
      },
      {
        title: "2. Temizle ve dönüştür (Transform)",
        learn: ["Veri temizliği"],
        question: "Eksik (null) ve bozuk değerleri olduğu gibi yüklemek neden tehlikeli?",
        tasks: [
          {
            goal: "Eksik değerleri, tekrar eden satırları ve tutarsız tipleri düzelt.",
            tip: "null doldur/at, tarih & sayı tiplerini normalize et.",
          },
          {
            goal: "Analize uygun yeni bir sütun türet (örn. tarihten 'ay').",
            tip: "Türetilmiş alan — basit bir map/apply.",
          },
        ],
      },
      {
        title: "3. Veri ambarına yükle (Load)",
        learn: ["SQL", "Data Warehouse", "Schema"],
        question: "Ham CSV yerine veriyi neden bir tabloya (warehouse) yükleriz?",
        tasks: [
          {
            goal: "Temizlenmiş veriyi sorgulanabilir bir tabloya yaz.",
            tip: "Başlangıç için SQLite/Postgres; bir `CREATE TABLE` + toplu insert.",
          },
          {
            goal: "Bir SQL sorgusuyla anlamlı bir özet çıkar (örn. aya göre toplam).",
            tip: "`SELECT ay, COUNT(*) ... GROUP BY ay`.",
          },
        ],
      },
      {
        title: "4. Otomatikleştir ve tekrarla",
        learn: ["Veri boru hattı", "Batch vs Stream", "Idempotency"],
        question: "Pipeline'ı iki kez çalıştırınca veriler ikiye katlanmamalı — bunu nasıl sağlarsın?",
        tasks: [
          {
            goal: "Extract → Transform → Load adımlarını tek komutla çalışan bir script'e bağla.",
            tip: "Tek bir `run()` akışı; her adım bir fonksiyon.",
          },
          {
            goal: "Tekrar çalıştırınca veri bozulmasın/çiftlenmesin (idempotent olsun).",
            tip: "Yüklemeden önce tabloyu temizle veya upsert kullan.",
          },
        ],
      },
    ],
  },

  // ═══════════════════════════ SEVİYE 3 ═══════════════════════════
  {
    id: "orchestration",
    level: 3,
    track: "data-engineering",
    project: "Orkestrasyon (Airflow/Dagster)",
    difficulty: "Orta",
    emoji: "🪁",
    accent: "violet",
    tier: "mid",
    description:
      "Tek script büyüyünce kaos olur. Pipeline adımlarını bağımlılıklarıyla bir DAG olarak tanımla, zamanla, hata olunca yeniden dene ve geçmişi doldur (backfill). Amaç: DAG, schedule, retry, idempotency ve backfill.",
    skills: [
      "DAG",
      "Scheduling",
      "Retry & Backoff",
      "Backfill",
      "Idempotency",
      "Task bağımlılıkları",
      "Monitoring",
    ],
    steps: [
      {
        title: "1. İlk DAG",
        learn: ["DAG (Orkestrasyon)", "Veri boru hattı"],
        question: "DAG neden 'döngüsüz' (acyclic) olmak zorundadır? Bir adım kendine bağımlı olsa ne olurdu?",
        tasks: [
          {
            goal: "Extract → Transform → Load adımlarını ayrı görevler (task) olarak tanımla.",
            tip: "Airflow/Dagster; her adım bir task, sıralarını bağımlılıkla belirt.",
          },
          {
            goal: "Adımların doğru sırada çalıştığını arayüzde/loglarda gör.",
            tip: "Önce E, sonra T, en son L — bağımlılık grafiğini izle.",
          },
        ],
      },
      {
        title: "2. Zamanla (schedule)",
        learn: ["Cron Job", "Batch vs Stream"],
        question: "Pipeline'ı sabit aralıkla (örn. her gece) çalıştırmak hangi tür iş yükü (batch) için uygundur?",
        tasks: [
          {
            goal: "DAG'ı her gün belirli bir saatte otomatik çalışacak şekilde zamanla.",
            tip: "Bir schedule/cron ifadesi tanımla.",
          },
        ],
      },
      {
        title: "3. Hata ve yeniden deneme",
        learn: ["Retry & Backoff", "Error Handling"],
        question: "Geçici bir hata (örn. kaynak API kısa süre çökmesi) için anında değil, üstel gecikmeyle yeniden denemek neden daha iyidir?",
        tasks: [
          {
            goal: "Bir adım başarısız olursa otomatik yeniden denensin.",
            tip: "Task'a retry sayısı + backoff ayarla.",
          },
          {
            goal: "Tüm denemeler başarısızsa haberdar ol.",
            tip: "Başarısızlıkta bildirim/alarm (e-posta/Slack).",
          },
        ],
      },
      {
        title: "4. Idempotency",
        learn: ["Idempotency", "Veri temizliği"],
        question: "Aynı günün işi iki kez çalışırsa verinin çiftlenmemesi için her görevi nasıl tasarlarsın?",
        tasks: [
          {
            goal: "Bir görevi, aynı tarih için tekrar koşunca veri bozulmadan çalışacak şekilde yaz.",
            tip: "Tarih bazlı partition'ı sil-yeniden yaz veya upsert.",
          },
        ],
      },
      {
        title: "5. Geçmişi doldur (backfill)",
        learn: ["Backfill", "Partitioning"],
        question: "Yeni bir pipeline'ı geçmiş 90 gün için çalıştırmak (backfill), idempotency olmadan neden tehlikelidir?",
        tasks: [
          {
            goal: "Pipeline'ı geçmiş bir tarih aralığı için geriye dönük çalıştır.",
            tip: "Tarih parametreli görev + aralık üzerinden backfill.",
          },
          {
            goal: "Her günün verisinin tam bir kez üretildiğini doğrula.",
            tip: "Tarih bazlı sayım/kontrol; eksik/çift var mı bak.",
          },
        ],
      },
    ],
  },

  // ═══════════════════════════ SEVİYE 4 ═══════════════════════════
  {
    id: "dbt-warehouse",
    level: 4,
    track: "data-engineering",
    project: "Veri Modelleme & Warehouse (dbt)",
    difficulty: "İleri",
    emoji: "🧱",
    accent: "amber",
    tier: "senior",
    description:
      "Veri ambarı mimarisi ve dbt. Ham veriyi dbt kullanarak temiz tablolara (staging) ve analitik modellere (marts) dönüştür, star schema yapısını kur ve artımlı veri yükleme (incremental load) tasarla. Amaç: veri ambarı modelleme, dbt proje geliştirme, test yazma ve incremental yükleme stratejileri.",
    skills: [
      "dbt (Data Build Tool)",
      "Star Schema",
      "Partitioning",
      "Data Warehouse",
      "SQL",
    ],
    steps: [
      {
        title: "1. dbt Kurulumu & Proje Yapısı",
        learn: ["dbt (Data Build Tool)", "Data Warehouse"],
        question: "dbt'nin veri hattı süreçlerindeki (ELT) asıl görevi nedir? dbt neden veritabanına veri YÜKLEMEZ, sadece olan veriyi DÖNÜŞTÜRÜR?",
        tasks: [
          {
            goal: "Yeni bir dbt projesi başlat ve yerel Postgres/BigQuery veri ambarına bağlantı profilini (profiles.yml) ayarla.",
            tip: "dbt init komutunu kullan.",
          },
        ],
      },
      {
        title: "2. Staging Modelleri (Temizlik)",
        learn: ["dbt (Data Build Tool)", "Veri temizliği"],
        question: "Staging modellerinde sadece veri tipi dönüşümü ve isimlendirme yapılıp join/agregasyon yapılmamasının sebebi nedir?",
        tasks: [
          {
            goal: "Ham kaynak tabloları okuyan ve sütun isimlerini normalize eden staging modelleri (stg_orders, stg_users) yaz.",
            tip: "source() fonksiyonunu kullanarak ham tablolara referans ver.",
          },
        ],
      },
      {
        title: "3. Marts Modelleri (Star Schema)",
        learn: ["Star Schema", "Window Function"],
        question: "Analitik sorgularda Yıldız Şeması (Star Schema) kullanmanın, sorgu yazım hızı ve veritabanı join maliyeti açısından avantajları nelerdir?",
        tasks: [
          {
            goal: "Temizlenmiş staging tablolarını birleştirerek bir fact tablosu (fct_sales) ve boyut tabloları (dim_customers) oluştur.",
            tip: "ref() fonksiyonu ile staging modellerine bağımlılık kur.",
          },
        ],
      },
      {
        title: "4. Artımlı Yükleme (Incremental Load) & Partitioning",
        learn: ["Partitioning", "dbt (Data Build Tool)"],
        question: "Incremental model nedir? Neden her gün milyonlarca satırı baştan okumak yerine sadece yeni gelen verileri işleriz?",
        tasks: [
          {
            goal: "Satış modelini sadece yeni gelen satırları veritabanına ekleyecek (incremental) şekilde optimize et ve tarihe göre bölümle (partitioning).",
            tip: "materialized='incremental' ayarı ve is_incremental() koşulu ekle.",
          },
        ],
      },
      {
        title: "5. dbt Testleri ve Dokümantasyon",
        learn: ["dbt (Data Build Tool)"],
        question: "dbt schema.yml dosyasında tanımlanan primary key unique ve not null testleri veri kalitesini nasıl garanti eder?",
        tasks: [
          {
            goal: "Tablolardaki kritik alanlar için benzersizlik (unique) ve boş olmama (not null) testleri yaz ve dokümantasyonu oluştur.",
            tip: "schema.yml dosyasına tests blokları ekle ve dbt test çalıştır.",
          },
        ],
      },
    ],
  },

  // ═══════════════════════════ SEVİYE 5 ═══════════════════════════
  {
    id: "streaming",
    level: 5,
    track: "data-engineering",
    project: "Streaming (Kafka)",
    difficulty: "İleri",
    emoji: "🌊",
    accent: "amber",
    tier: "senior",
    description:
      "Veri artık gece değil, anında akıyor. Olayları Kafka'ya üret, topic/partition mantığını kur, consumer group ile paralel tüket ve canlı bir özet üret. Amaç: event streaming, topic & partition, consumer group ve teslim garantileri.",
    skills: [
      "Apache Kafka",
      "Producer & Consumer",
      "Topic & Partition",
      "Consumer Group",
      "Exactly-once",
      "Stream işleme",
      "Geri basınç (backpressure)",
    ],
    steps: [
      {
        title: "1. Olay üret (producer)",
        learn: ["Apache Kafka", "Batch vs Stream"],
        question: "Stream işleme (olaylar geldikçe) ile batch işleme (toplu, zamanlı) arasındaki temel fark nedir?",
        tasks: [
          {
            goal: "Bir Kafka kur/çalıştır ve bir topic'e olaylar (event) yaz.",
            tip: "Docker ile Kafka; bir producer ile JSON olaylar gönder.",
          },
        ],
      },
      {
        title: "2. Topic & partition",
        learn: ["Topic & Partition (Kafka)"],
        question: "Bir topic'i birden çok partition'a bölmek neden ölçeklenmeyi sağlar? Aynı anahtarlı olaylar neden aynı partition'a gider?",
        tasks: [
          {
            goal: "Topic'i birden çok partition'la oluştur ve olayları bir anahtara göre dağıt.",
            tip: "Mesaj key'i belirle; aynı key aynı partition'a düşsün (sıra korunur).",
          },
        ],
      },
      {
        title: "3. Tüket (consumer group)",
        learn: ["Consumer Group", "Horizontal Scaling"],
        question: "Aynı consumer group'a iki tüketici eklediğinde işi nasıl paylaşırlar? Üçüncü partition yoksa ne olur?",
        tasks: [
          {
            goal: "Olayları bir consumer ile oku ve işle.",
            tip: "Bir consumer group ile abone ol; offset'i ilerlet.",
          },
          {
            goal: "Aynı gruba ikinci consumer ekleyip yükün bölündüğünü gözle.",
            tip: "Partition'lar consumer'lar arasında paylaşılır.",
          },
        ],
      },
      {
        title: "4. Teslim garantileri",
        learn: ["Exactly-once Delivery", "Idempotency"],
        question: "'At-least-once' teslimde bir olay neden iki kez işlenebilir? Bunu idempotency ile pratikte nasıl güvenli kılarsın?",
        tasks: [
          {
            goal: "Tüketici çökse bile olayların kaybolmamasını sağla.",
            tip: "İşi bitirince offset commit et (önce işle, sonra commit).",
          },
          {
            goal: "Aynı olayın iki kez işlenmesi durumunda sonucun bozulmamasını sağla.",
            tip: "İşlemi idempotent yap (örn. event id ile dedup).",
          },
        ],
      },
      {
        title: "5. Canlı özet üret",
        learn: ["Window Function", "Data Warehouse"],
        question: "Akan veride 'son 5 dakikadaki' gibi bir pencere (windowing) hesabı, sınırsız akışta nasıl mümkün olur?",
        tasks: [
          {
            goal: "Akan olaylardan zaman penceresi bazında canlı bir metrik hesapla.",
            tip: "Örn. dakikalık sayım; pencere bazlı agregasyon.",
          },
          {
            goal: "Sonucu sorgulanabilir bir yere yaz (warehouse/dashboard).",
            tip: "Agregayı bir tabloya/dashboard'a aktar.",
          },
        ],
      },
    ],
  },

  // ═══════════════════════ DATA ENGINEERING EK ═══════════════════════
  {
    id: "web-scraping",
    level: 2,
    track: "data-engineering",
    project: "Web Scraping Pipeline",
    difficulty: "Kolay-Orta",
    emoji: "🕸️",
    accent: "lime",
    tier: "junior",
    description:
      "API olmayan yerden veri topla — ama nazikçe. Bir siteyi tara, alanları ayıkla, tekrarı engelle ve düzenli sakla. Amaç: crawl/parse, rate limit, dedup, etik scraping ve idempotent depolama.",
    skills: ["Web scraping", "HTML parse", "Rate limit", "Deduplication", "Etik/robots.txt", "Depolama"],
    steps: [
      {
        title: "1. Bir sayfayı çek ve ayıkla",
        learn: ["Web Scraping", "CSV"],
        question: "HTML'i string olarak aramak yerine bir parser kullanmak neden daha sağlamdır?",
        tasks: [
          { goal: "Bir sayfayı indirip içinden yapısal alanları (başlık, fiyat…) ayıkla.", tip: "BeautifulSoup/Playwright; seçicilerle." },
          { goal: "Çıkardığın veriyi bir tabloya/CSV'ye yaz.", tip: "Sütunları netleştir." },
        ],
      },
      {
        title: "2. Nazik ol (rate limit + robots)",
        learn: ["robots.txt & Etik Scraping", "Rate Limiting"],
        question: "İstekleri yavaşlatmamak (rate limit yok) hem sana hem siteye nasıl zarar verir?",
        tasks: [
          { goal: "İstekler arasına gecikme koy ve robots.txt'e uy.", tip: "Bekleme + kimlik belirten User-Agent." },
        ],
      },
      {
        title: "3. Çok sayfa (crawl) + dedup",
        learn: ["Web Scraping", "Veri temizliği"],
        question: "Aynı kaydın iki kez toplanmasını (duplicate) nasıl engellersin?",
        tasks: [
          { goal: "Birden çok sayfayı (pagination) gez.", tip: "Sonraki sayfa linkini takip et." },
          { goal: "Tekrar eden kayıtları benzersiz bir anahtarla ele.", tip: "Dedup: url/id seti." },
        ],
      },
      {
        title: "4. Tekrar çalıştırılabilir yap",
        learn: ["Idempotency", "Veri boru hattı"],
        question: "Scraper'ı her gün çalıştırınca verinin çiftlenmemesini nasıl garanti edersin?",
        tasks: [
          { goal: "Tekrar koşunca yalnızca yeni kayıtlar eklensin (upsert).", tip: "Anahtara göre upsert; idempotent." },
        ],
      },
    ],
  },
  {
    id: "dbt-modeling",
    level: 4,
    track: "data-engineering",
    project: "Veri Modelleme & dbt",
    difficulty: "İleri",
    emoji: "🧱",
    accent: "violet",
    tier: "senior",
    description:
      "Ham veriyi güvenilir 'mart'lara dönüştür. dbt ile staging→mart katmanları kur, star schema tasarla, test/dokümantasyon ekle ve incremental çalıştır. Amaç: katmanlı modelleme, test, dokümantasyon ve artımlı işleme.",
    skills: ["dbt", "Star schema", "Staging→Mart", "Test", "Dokümantasyon", "Incremental"],
    steps: [
      {
        title: "1. Katmanları kur",
        learn: ["dbt (Data Build Tool)", "Staging vs Mart"],
        question: "Ham veriyi doğrudan rapora bağlamak yerine staging→mart katmanlamak ne kazandırır?",
        tasks: [
          { goal: "Kaynağı staging modelleriyle temizle (tip/isim standardı).", tip: "Her kaynağa bir stg_ modeli." },
          { goal: "İş sorularına cevap veren mart modelleri üret.", tip: "`ref()` ile bağımlılık." },
        ],
      },
      {
        title: "2. Star schema tasarla",
        learn: ["Star Schema", "Relation (İlişki)"],
        question: "Analitik için tam normalizasyondan ödün verip star schema kullanmanın mantığı nedir?",
        tasks: [
          { goal: "Bir fact tablosu + dimension tabloları tasarla.", tip: "Ölçümler fact'te, bağlam dimension'da." },
        ],
      },
      {
        title: "3. Test ve dokümantasyon",
        learn: ["dbt (Data Build Tool)", "Veri temizliği"],
        question: "Veri pipeline'ında 'test' ne anlama gelir (örn. null/unique) ve neden kritiktir?",
        tasks: [
          { goal: "Anahtar sütunlara not_null/unique testleri ekle.", tip: "dbt schema testleri." },
          { goal: "Modelleri dokümante et.", tip: "description + dbt docs." },
        ],
      },
      {
        title: "4. Incremental çalıştır",
        learn: ["Incremental Model", "Partitioning"],
        question: "Milyarlarca satırı her seferinde baştan üretmek yerine incremental işlemek neyi çözer?",
        tasks: [
          { goal: "Büyük bir modeli yalnızca yeni/değişen satırları işleyecek şekilde kur.", tip: "incremental materialization + tarih filtresi." },
        ],
      },
    ],
  },

  // ═══════════════════════ DATA SCIENCE ═══════════════════════
  {
    id: "data-intro",
    level: 1,
    track: "data-science",
    project: "Veri Dünyasına Giriş (DE mi, DS mi?)",
    difficulty: "Başlangıç",
    emoji: "🧭",
    accent: "lime",
    tier: "intern",
    description:
      "Veriyle çalışmanın üç rolünü ayırt et: veriyi AKITAN mühendis (DE), geçmişi RAPORLAYAN analist (DA), geleceği TAHMİN eden bilimci (DS). Sağladığımız gerçek bir veri setini Pandas'la aç ve ilk içgörünü çıkar. Amaç: rolleri ayırmak ve bir DataFrame'e oturmak — adım adım. (Veri: /datasets)",
    skills: [
      "Veri rolleri (DE/DS/DA)",
      "Pandas",
      "DataFrame",
      "Jupyter Notebook",
      "CSV okuma",
      "Temel özet",
      "İçgörü",
    ],
    steps: [
      {
        title: "1. Rolleri ayırt et",
        learn: [
          "Veri Rolleri (DE vs DS vs DA)",
          "Veri Mühendisliği (Data Engineering)",
          "Veri Bilimi (Data Science)",
        ],
        question:
          "Veri Mühendisi, Veri Analisti ve Veri Bilimci aynı veriyle çalışır; üçünün AMACI nasıl ayrışır? Kendi cümlenle yaz.",
        tasks: [
          {
            goal: "Üç rolün ne ürettiğini (pipeline/temiz veri · rapor · tahmin/model) bir örnekle açıkla.",
            tip: "Bizim siparisler.csv'si: DE onu temizler/akıtır, DA 'geçen ay ne sattık' raporlar, DS 'gelecek ay ne satarız' tahmin eder.",
          },
        ],
      },
      {
        title: "2. Çalışma ortamını kur",
        learn: ["Jupyter Notebook", "Pandas & DataFrame"],
        question:
          "Jupyter Notebook, normal bir `.py` script'ine göre keşifsel analizde neden daha uygundur?",
        tasks: [
          {
            goal: "Python + pandas kurulu bir not defteri (Jupyter/Colab) ortamı aç.",
            tip: "`pip install pandas jupyter` veya doğrudan Google Colab.",
          },
        ],
      },
      {
        title: "3. Gerçek veriyi yükle",
        learn: ["CSV", "Pandas & DataFrame"],
        question:
          "Bir DataFrame'de 'satır' ve 'sütun' veri biliminde neye karşılık gelir (gözlem / öznitelik)?",
        tasks: [
          {
            goal: "Sağladığımız müşteri veri setini bir DataFrame'e oku.",
            tip: "`pd.read_csv('https://<siten>/datasets/musteriler.csv')` — yerelde indirip de okuyabilirsin.",
          },
          {
            goal: "Kaç satır/sütun var ve ilk birkaç satır neye benziyor, gör.",
            tip: "`df.shape`, `df.head()`, `df.info()`.",
          },
        ],
      },
      {
        title: "4. İlk içgörü",
        learn: ["Keşifsel Veri Analizi (EDA)", "Veri Analitiği (Data Analytics)"],
        question:
          "Bu adımda yaptığın iş (geçmişi özetlemek) hangi role (DA mı DS mi) daha yakın? Neden?",
        tasks: [
          {
            goal: "Bir kategorik sütunu grupla ve sayım çıkar (örn. şehir veya segment dağılımı).",
            tip: "`df['sehir'].value_counts()` veya `df.groupby('segment').size()`.",
          },
          {
            goal: "Bulduğun en çarpıcı tek içgörüyü bir cümleyle yaz.",
            tip: "Örn. 'müşterilerin %X'i İstanbul'da' — bu bir DA çıktısıdır.",
          },
        ],
      },
    ],
  },

  // ═══════════════════════════ SEVİYE 2 ═══════════════════════════
  {
    id: "pandas-eda",
    level: 2,
    track: "data-science",
    project: "Pandas ile Keşifsel Analiz (EDA)",
    difficulty: "Kolay-Orta",
    emoji: "🐼",
    accent: "sky",
    tier: "junior",
    description:
      "Dağınık gerçek veriyle yüzleş. Sağladığımız siparişler veri setini (boş fiyatlar, karışık tarihler, mükerrer satırlar) temizle, müşteri/ürünle birleştir ve anlamlı özetler çıkar. Amaç: temizlik, merge, groupby, aykırı değer ve korelasyon. (Veri: /datasets)",
    skills: [
      "Veri temizliği",
      "Pandas merge",
      "groupby",
      "Eksik değer",
      "Outlier",
      "Korelasyon",
      "EDA",
    ],
    steps: [
      {
        title: "1. Dağınıklığı keşfet",
        learn: ["Keşifsel Veri Analizi (EDA)", "Veri temizliği"],
        question:
          "Eksik (boş) ve tutarsız değerleri olduğu gibi analiz etmek sonucu nasıl yanıltır?",
        tasks: [
          {
            goal: "siparisler.csv'yi yükle; eksik değerleri ve veri tiplerini incele.",
            tip: "`/datasets/siparisler.csv`; `df.isna().sum()`, `df.dtypes`.",
          },
          {
            goal: "Bilerek konan sorunları tespit et: boş birim_fiyat, 3 farklı tarih formatı, mükerrer satırlar, tutarsız 'durum' yazımı.",
            tip: "`df['durum'].unique()`, `df.duplicated().sum()`.",
          },
        ],
      },
      {
        title: "2. Temizle",
        learn: ["Veri temizliği", "Outlier (Aykırı Değer)"],
        question:
          "Eksik fiyatları silmek mi, doldurmak (impute) mı daha doğru? Karar neye bağlı?",
        tasks: [
          {
            goal: "Mükerrer satırları at ve 'durum' sütununu tek tipe indir (hepsi küçük harf).",
            tip: "`drop_duplicates()`, `df['durum'].str.lower()`.",
          },
          {
            goal: "Karışık tarih formatlarını tek bir gerçek tarih tipine çevir.",
            tip: "`pd.to_datetime(..., dayfirst=True)` veya format tahmini.",
          },
          {
            goal: "Boş birim_fiyat'ları mantıklı bir kuralla doldur ya da çıkar.",
            tip: "Örn. ürünün ortalama fiyatıyla doldur veya o satırları ele.",
          },
        ],
      },
      {
        title: "3. Tabloları birleştir (merge)",
        learn: ["Pandas & DataFrame", "Feature & Feature Engineering"],
        question: "Pandas `merge`, SQL JOIN'e nasıl benzer? `how='left'` ne işe yarar?",
        tasks: [
          {
            goal: "Siparişleri müşteri ve ürün veri setleriyle birleştir.",
            tip: "`df.merge(musteriler, on='musteri_id').merge(urunler, on='urun_id')`.",
          },
          {
            goal: "Yeni bir feature türet: satır toplamı = adet × birim_fiyat ve tarihten 'ay'.",
            tip: "`df['tutar']=df['adet']*df['birim_fiyat']`; `df['ay']=df['tarih'].dt.month`.",
          },
        ],
      },
      {
        title: "4. Özetle ve ilişki ara",
        learn: ["Veri Görselleştirme", "Korelasyon"],
        question:
          "İki sütun arasında yüksek korelasyon görmek 'biri diğerine sebep oluyor' demek midir? Neden?",
        tasks: [
          {
            goal: "Aya/şehre/kategoriye göre toplam ciroyu grupla ve sırala.",
            tip: "`groupby(...)['tutar'].sum().sort_values(ascending=False)`.",
          },
          {
            goal: "Sayısal sütunlar arasındaki korelasyona bak ve bir grafikle göster.",
            tip: "`df.corr(numeric_only=True)`; histogram/scatter çiz.",
          },
        ],
      },
    ],
  },

  // ═══════════════════════════ SEVİYE 3 ═══════════════════════════
  {
    id: "data-viz",
    level: 3,
    track: "data-science",
    project: "Veri Görselleştirme & Hikâye",
    difficulty: "Orta",
    emoji: "📈",
    accent: "violet",
    tier: "mid",
    description:
      "Sayıyı görünür kıl. Sağladığımız zaman serisi (sensör) ve ev fiyatı veri setlerini doğru grafiklerle anlat: dağılım, ilişki, zaman ve kategori. Amaç: doğru grafik türünü seçmek ve veriden bir hikâye çıkarmak. (Veri: /datasets)",
    skills: [
      "Matplotlib/Seaborn",
      "Histogram",
      "Scatter plot",
      "Zaman serisi",
      "Dağılım",
      "Veri hikâyesi",
      "Outlier görselleştirme",
    ],
    steps: [
      {
        title: "1. Dağılımı gör (histogram)",
        learn: ["Veri Görselleştirme", "Outlier (Aykırı Değer)"],
        question:
          "Bir histogram, ortalama tek başına gösteremediği neyi (örn. çarpıklık, aykırı değer) ortaya çıkarır?",
        tasks: [
          {
            goal: "ev-fiyatlari.csv'de fiyat dağılımının histogramını çiz.",
            tip: "`/datasets/ev-fiyatlari.csv`; `df['fiyat'].hist()` veya seaborn `histplot`.",
          },
          {
            goal: "Dağılımdaki aykırı değerleri bir boxplot ile göster.",
            tip: "`sns.boxplot(x=df['fiyat'])`.",
          },
        ],
      },
      {
        title: "2. İlişkiyi gör (scatter)",
        learn: ["Korelasyon", "Veri Görselleştirme"],
        question:
          "Scatter plot, iki değişken arasındaki ilişkinin yönünü ve gücünü nasıl gösterir?",
        tasks: [
          {
            goal: "Metrekare ile fiyat arasındaki ilişkiyi scatter plot ile çiz.",
            tip: "`plt.scatter(df['metrekare'], df['fiyat'])`.",
          },
          {
            goal: "Semt'e göre renklendirip farkı görünür kıl.",
            tip: "seaborn `scatterplot(..., hue='semt')`.",
          },
        ],
      },
      {
        title: "3. Zamanı göster (çizgi)",
        learn: ["Veri Görselleştirme", "Batch vs Stream"],
        question:
          "Zaman serisi verisi için neden çizgi grafiği bar/scatter'dan daha uygundur?",
        tasks: [
          {
            goal: "sensor-olaylari.csv'de sıcaklığın zamana göre değişimini çiz.",
            tip: "`/datasets/sensor-olaylari.csv`; zamanı parse et, çizgi grafiği.",
          },
          {
            goal: "Sensör başına (S1..S5) ayrı çizgilerle karşılaştır.",
            tip: "`groupby('sensor_id')` + her grup için çizgi.",
          },
        ],
      },
      {
        title: "4. Hikâyeyi anlat",
        learn: ["Veri Görselleştirme", "Veri Analitiği (Data Analytics)"],
        question:
          "İyi bir grafik ile yanıltıcı bir grafik arasındaki fark nedir (eksen, ölçek, başlık)?",
        tasks: [
          {
            goal: "Bir kategorik karşılaştırmayı bar grafikle göster (semt başına ortalama fiyat).",
            tip: "`groupby('semt')['fiyat'].mean().plot(kind='bar')`.",
          },
          {
            goal: "Çıkardığın 3 grafiği tek bir cümlelik 'bulgu' ile özetle.",
            tip: "Her grafik bir soruyu yanıtlasın; eksenleri ve başlığı etiketle.",
          },
        ],
      },
    ],
  },

  // ═══════════════════════════ SEVİYE 4 ═══════════════════════════
  {
    id: "ml-intro",
    level: 4,
    track: "data-science",
    project: "İlk Makine Öğrenmesi Modeli (Fiyat Tahmini)",
    difficulty: "İleri",
    emoji: "🧠",
    accent: "amber",
    tier: "senior",
    description:
      "İlk tahmin modelin. Sağladığımız ev fiyatı veri setiyle metrekare/oda/yaş/semt'ten fiyatı tahmin eden bir regresyon modeli eğit ve dürüstçe değerlendir. Amaç: feature/hedef ayrımı, train/test split, model eğitimi, hata ölçümü ve overfitting. (Veri: /datasets)",
    skills: [
      "Makine öğrenmesi",
      "Regresyon",
      "Train/test split",
      "Feature engineering",
      "Model değerlendirme",
      "Overfitting",
      "scikit-learn",
    ],
    steps: [
      {
        title: "1. Problemi tanımla",
        learn: ["Makine Öğrenmesi", "Regresyon vs Sınıflandırma"],
        question: "Ev fiyatı tahmini bir regresyon mu sınıflandırma problemi mi? Neden?",
        tasks: [
          {
            goal: "Hedef değişkeni (fiyat) ve girdileri (feature) belirle.",
            tip: "`y = df['fiyat']`, `X = df[['metrekare','oda_sayisi','bina_yasi','semt']]`.",
          },
        ],
      },
      {
        title: "2. Feature'ları hazırla",
        learn: ["Feature & Feature Engineering", "Ölçekleme (Feature Scaling)"],
        question:
          "Kategorik 'semt' sütununu model anlayamaz; sayıya çevirmek (encoding) neden gerekir?",
        tasks: [
          {
            goal: "Kategorik 'semt'i sayısal sütunlara çevir (one-hot encoding).",
            tip: "`pd.get_dummies(X, columns=['semt'])`.",
          },
          {
            goal: "Gerekiyorsa sayısal feature'ları ölçekle.",
            tip: "Lineer regresyonda zorunlu değil; mesafe/gradyan tabanlı modellerde önemli.",
          },
        ],
      },
      {
        title: "3. Eğit ve değerlendir",
        learn: ["Train/Test Split", "Makine Öğrenmesi"],
        question:
          "Modeli neden eğittiğin veriyle değil, ayırdığın test verisiyle değerlendirirsin?",
        tasks: [
          {
            goal: "Veriyi train/test olarak ayır ve bir regresyon modeli eğit.",
            tip: "`train_test_split`; `LinearRegression().fit(X_train, y_train)`.",
          },
          {
            goal: "Test verisinde hatayı ölç (örn. MAE/RMSE).",
            tip: "`mean_absolute_error(y_test, model.predict(X_test))`.",
          },
        ],
      },
      {
        title: "4. Overfitting'i yakala ve yorumla",
        learn: ["Overfitting & Underfitting", "Korelasyon"],
        question:
          "Train hatası düşük ama test hatası yüksekse bu neyin işaretidir ve ne yaparsın?",
        tasks: [
          {
            goal: "Train ve test hatasını karşılaştırıp modelin ezberleyip ezberlemediğine bak.",
            tip: "İki hata arası uçurum = overfitting; daha basit model/daha çok veri.",
          },
          {
            goal: "Hangi feature'ların tahmine en çok katkı verdiğini yorumla.",
            tip: "Model katsayılarına (`model.coef_`) bak; korelasyonla kıyasla.",
          },
        ],
      },
    ],
  },

  // ═══════════════════════════ SEVİYE 4 ═══════════════════════════
  {
    id: "classification",
    level: 4,
    track: "data-science",
    project: "Sınıflandırma & Model Değerlendirme",
    difficulty: "İleri",
    emoji: "🎯",
    accent: "cyan",
    tier: "senior",
    description:
      "Sayı değil, kategori tahmin et: bir siparişin 'iptal' olup olmayacağını sınıflandır. Amaç: sınıflandırma, confusion matrix, precision/recall ve cross-validation ile dürüst değerlendirme. (Veri: /datasets/siparisler.csv)",
    skills: ["Sınıflandırma", "Confusion matrix", "Precision/Recall", "Cross-validation", "Eşik", "Dengesiz veri"],
    steps: [
      {
        title: "1. Problemi kur",
        learn: ["Regresyon vs Sınıflandırma", "Feature & Feature Engineering"],
        question: "'İptal mi?' tahmini neden bir sınıflandırma problemidir? Hedef nasıl tanımlanır?",
        tasks: [
          { goal: "siparisler.csv'den hedefi (durum=iptal mı) ve feature'ları hazırla.", tip: "İkili etiket; kategorikleri encode et." },
        ],
      },
      {
        title: "2. Eğit ve tahmin et",
        learn: ["Train/Test Split", "Makine Öğrenmesi"],
        question: "Sınıflar dengesizse (çok az iptal) sadece 'doğruluk'a bakmak neden yanıltıcıdır?",
        tasks: [
          { goal: "Train/test ayır ve bir sınıflandırıcı eğit.", tip: "LogisticRegression / ağaç tabanlı." },
        ],
      },
      {
        title: "3. Doğru ölç",
        learn: ["Confusion Matrix", "Precision & Recall"],
        question: "Precision ile recall arasındaki ödünleşim bu problemde hangi yöne çekilmeli?",
        tasks: [
          { goal: "Confusion matrix çıkar; precision/recall/F1 hesapla.", tip: "Yanlış pozitif vs negatifin maliyetini düşün." },
          { goal: "Karar eşiğini değiştirip etkiyi gözle.", tip: "Eşik ↑ precision ↑, recall ↓." },
        ],
      },
      {
        title: "4. Güvenilir değerlendir",
        learn: ["Cross-validation", "Overfitting & Underfitting"],
        question: "Tek bir test ayrımı yerine cross-validation neden daha güvenilir bir tahmin verir?",
        tasks: [
          { goal: "K-fold cross-validation ile skoru daha kararlı ölç.", tip: "Katların ortalaması + sapması." },
        ],
      },
    ],
  },

  // ═══════════════════════════ SEVİYE 5 ═══════════════════════════
  {
    id: "timeseries",
    level: 5,
    track: "data-science",
    project: "Zaman Serisi Analizi & Tahmin",
    difficulty: "İleri+",
    emoji: "⏱️",
    accent: "rose",
    tier: "staff",
    description:
      "Zamana bağlı veriyle geleceği tahmin et. Sağladığımız sensör verisinde trend ve mevsimselliği ayrıştır, basit bir tahmin yap ve dürüstçe değerlendir. Amaç: zaman serisi, trend/mevsimsellik, doğru bölme ve tahmin. (Veri: /datasets/sensor-olaylari.csv)",
    skills: ["Zaman serisi", "Trend/Mevsimsellik", "Resampling", "Tahmin", "Zaman bazlı bölme", "Değerlendirme"],
    steps: [
      {
        title: "1. Zaman serisini hazırla",
        learn: ["Zaman Serisi (Time Series)", "Veri temizliği"],
        question: "Zaman serisinde satırların sırası neden 'sadece bir sütun' değil, işin özüdür?",
        tasks: [
          { goal: "Zaman sütununu parse edip indeks yap; düzenli aralığa getir (resample).", tip: "`set_index` + `resample('1min')`." },
        ],
      },
      {
        title: "2. Trend ve mevsimselliği gör",
        learn: ["Trend & Mevsimsellik", "Veri Görselleştirme"],
        question: "Bir seriyi trend + mevsimsellik + artık (residual) olarak ayrıştırmak neyi ortaya çıkarır?",
        tasks: [
          { goal: "Seriyi çiz; hareketli ortalama ile trendi göster.", tip: "rolling mean; mevsimsel tekrarı gözle." },
        ],
      },
      {
        title: "3. Tahmin et",
        learn: ["Makine Öğrenmesi", "Zaman Serisi (Time Series)"],
        question: "Zaman serisinde train/test'i NEDEN rastgele değil, zaman sırasına göre bölmelisin?",
        tasks: [
          { goal: "Geçmişle eğitip geleceği tahmin eden basit bir model kur.", tip: "Naif/hareketli ortalama veya basit bir model." },
          { goal: "Geleceği eğitime sızdırma (leakage) yapma.", tip: "Geçmiş = train, sonrası = test." },
        ],
      },
      {
        title: "4. Değerlendir ve yorumla",
        learn: ["Trend & Mevsimsellik", "Overfitting & Underfitting"],
        question: "Tahmin hatasını yorumlarken mevsimsel bir 'naif tahmin' neden iyi bir kıyas (baseline) olur?",
        tasks: [
          { goal: "Tahmini gerçekle karşılaştır; hatayı bir baseline ile kıyasla.", tip: "Naif baseline'ı geçebildin mi?" },
        ],
      },
    ],
  },
];
