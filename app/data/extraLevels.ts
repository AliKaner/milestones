import type { Level } from "./steps";

/**
 * Müfredat genişletme — ek projeler.
 *
 * Bu dosya `steps.ts`'teki çekirdek leveller'e EK olarak yüklenir
 * (seed.ts içinde `[...staticLevels, ...extraLevels]`).
 *
 * Felsefe `steps.ts` ile aynı: micro-adım, her adımda bir "neden" sorusu,
 * `goal` sonucu söyler / `tip` kavrama işaret eder. Türkçe akıcı, terimler
 * İngilizce. Puan seed tarafından `20 + level*10` ile hesaplanır.
 *
 * Track'lere göre bölümlenmiştir; her track ≥200 adıma tamamlanır.
 */

// ════════════════════════════════════════════════════════════════
//  FRONTEND — ek projeler
// ════════════════════════════════════════════════════════════════
const frontendExtra: Level[] = [
  {
    id: "fe-image-gallery",
    level: 2,
    track: "frontend",
    project: "Görsel Galeri & Lightbox",
    difficulty: "Kolay-Orta",
    emoji: "🖼️",
    accent: "fuchsia",
    tier: "junior",
    description:
      "Bir görsel ızgarası ve tıklayınca büyüten lightbox. Amaç: grid layout, modal/portal, klavye navigasyonu ve lazy loading — adım adım.",
    skills: ["CSS Grid", "Modal", "Portal", "Klavye navigasyonu", "Lazy loading", "aspect-ratio"],
    steps: [
      {
        title: "1. Görselleri ızgarada diz",
        learn: ["CSS Grid"],
        question: "`object-fit: cover` ile `contain` arasındaki fark bir galeride neyi değiştirir?",
        tasks: [
          { goal: "Görselleri responsive bir ızgarada listele.", tip: "`grid-template-columns: repeat(auto-fill, minmax(...))`." },
          { goal: "Tüm kartlar aynı en-boy oranında görünsün.", tip: "`aspect-ratio` + `object-fit: cover`." },
        ],
      },
      {
        title: "2. Tıklayınca büyüt (state)",
        learn: ["State", "useState"],
        question: "Hangi görselin açık olduğunu tutmak için neyi state'te saklarsın?",
        tasks: [
          { goal: "Bir görsele tıklayınca onu 'seçili' yap.", tip: "Seçili index/id bir state'te." },
          { goal: "Seçili görseli büyük göster, yoksa gizle.", tip: "Koşullu render." },
        ],
      },
      {
        title: "3. Modal'ı portal ile aç",
        learn: ["Portal", "DOM"],
        question: "Modal'ı `createPortal` ile body'ye taşımak hangi z-index/overflow sorununu çözer?",
        tasks: [
          { goal: "Lightbox'ı DOM'da en üste taşıyan bir portal kullan.", tip: "`createPortal(node, document.body)`." },
          { goal: "Arka planı karartan bir overlay ekle.", tip: "Sabit konumlu yarı saydam katman." },
        ],
      },
      {
        title: "4. Klavyeyle gez",
        learn: ["Input Handling", "useEffect"],
        question: "Ok tuşlarını dinlerken event listener'ı neden `useEffect` cleanup ile kaldırmalısın?",
        tasks: [
          { goal: "← → ile önceki/sonraki görsele geç.", tip: "`keydown` dinle; index'i artır/azalt." },
          { goal: "Esc ile lightbox'ı kapat.", tip: "`key === 'Escape'`." },
        ],
      },
      {
        title: "5. Geçişte sınırları koru",
        learn: ["Ternary (?:)", "Array (Dizi)"],
        question: "İlk/son görseldeyken 'sonraki/önceki' davranışı ne olmalı — döngü mü, dursun mu?",
        tasks: [
          { goal: "Sınırlarda buton/okları pasifleştir veya başa sar.", tip: "Index'i `clamp` veya modulo ile yönet." },
        ],
      },
      {
        title: "6. Lazy loading",
        learn: ["IntersectionObserver", "Performans"],
        question: "Çok sayıda görseli `loading=\"lazy\"` ile yüklemek ilk açılışı nasıl hızlandırır?",
        tasks: [
          { goal: "Görseller görünüm alanına girince yüklensin.", tip: "`<img loading=\"lazy\">` veya IntersectionObserver." },
          { goal: "Yüklenene kadar bir placeholder göster.", tip: "Blur/skeleton arka plan." },
        ],
      },
      {
        title: "7. Erişilebilirlik",
        learn: ["ARIA", "Erişilebilirlik (a11y)"],
        question: "Bir modal açıkken odak (focus) neden modal içinde 'tuzaklanmalı' (focus trap)?",
        tasks: [
          { goal: "Lightbox açılınca odak kapat butonuna gitsin.", tip: "`ref.focus()`." },
          { goal: "Görsellere anlamlı `alt` metni ver.", tip: "Açıklayıcı, boş bırakma." },
        ],
      },
      {
        title: "8. Cila ve yayınla",
        learn: ["CSS Transition", "Deploy"],
        question: "Açılış/kapanış animasyonu eklerken `prefers-reduced-motion`'a neden saygı göstermelisin?",
        tasks: [
          { goal: "Lightbox'a yumuşak fade/scale geçişi ekle.", tip: "CSS transition; reduced-motion'ı dikkate al." },
          { goal: "Galeriyi canlı bir linkle yayınla.", tip: "Vercel/Netlify." },
        ],
      },
    ],
  },
  {
    id: "fe-data-table",
    level: 3,
    track: "frontend",
    project: "Veri Tablosu (sırala/filtrele/sayfala)",
    difficulty: "Orta",
    emoji: "📋",
    accent: "sky",
    tier: "mid",
    description:
      "Gerçek uygulamaların kalbi: sıralanabilir, filtrelenebilir, sayfalanabilir bir tablo. Amaç: türetilmiş veri, kontrollü URL state ve performanslı render.",
    skills: ["Sıralama", "Filtreleme", "Pagination", "Türetilmiş state", "useMemo", "URL state"],
    steps: [
      {
        title: "1. Veriyi tabloya bas",
        learn: ["List Rendering", "key Prop"],
        question: "Satırlar için `key` olarak index yerine neden kararlı bir id kullanmalısın?",
        tasks: [
          { goal: "Bir dizi nesneyi `<table>` satırlarına dök.", tip: "`map` + thead/tbody." },
        ],
      },
      {
        title: "2. Kolona göre sırala",
        learn: ["sort()", "Immutability"],
        question: "`array.sort()` diziyi yerinde değiştirir; bunu render içinde yapmak neden risklidir?",
        tasks: [
          { goal: "Bir kolon başlığına tıklayınca o kolona göre sırala.", tip: "Kopyala sonra sırala: `[...rows].sort(...)`." },
          { goal: "Artan/azalan yön arasında geçiş yap.", tip: "Bir `sortDir` state." },
        ],
      },
      {
        title: "3. Metinle filtrele",
        learn: ["filter()", "Controlled Component"],
        question: "Filtre kutusunu controlled input yapmak arama davranışını nasıl öngörülebilir kılar?",
        tasks: [
          { goal: "Bir arama kutusuyla satırları daralt.", tip: "`filter` + `toLowerCase().includes()`." },
        ],
      },
      {
        title: "4. Türetilmiş veriyi memo'la",
        learn: ["useMemo", "Pure Function"],
        question: "Filtre+sıralama sonucunu `useMemo`'ya almak hangi gereksiz hesabı önler?",
        tasks: [
          { goal: "Görünen satırları filtre→sırala zincirinden türet.", tip: "Tek bir `useMemo`, orijinali bozma." },
        ],
      },
      {
        title: "5. Sayfalama",
        learn: ["Pagination", "slice()"],
        question: "İstemci tarafı sayfalama büyük veri kümelerinde neden yetersiz kalır?",
        tasks: [
          { goal: "Satırları sayfalara böl, ileri/geri gez.", tip: "`slice(page*size, ...)`." },
          { goal: "Toplam sayfa ve aktif sayfayı göster.", tip: "`Math.ceil(total/size)`." },
        ],
      },
      {
        title: "6. Durumu URL'e taşı",
        learn: ["Query Parameters", "URL"],
        question: "Sıralama/filtre/sayfayı URL'de tutmak paylaşılabilirlik açısından ne kazandırır?",
        tasks: [
          { goal: "Sıralama/filtre/sayfa URL query'sine yansısın.", tip: "`useSearchParams` + `router.replace`." },
        ],
      },
      {
        title: "7. Satır seçimi",
        learn: ["Set", "Immutability"],
        question: "Çoklu satır seçimini bir `Set` ile tutmak `Array`'e göre hangi işlemi kolaylaştırır?",
        tasks: [
          { goal: "Checkbox ile satırları seç; 'tümünü seç' ekle.", tip: "Seçili id'leri bir `Set`'te tut." },
        ],
      },
      {
        title: "8. Boş ve yükleniyor durumları",
        learn: ["Conditional Rendering", "Skeleton"],
        question: "Filtre sonucu boşsa kullanıcıya ne göstermek 'kötü' bir deneyimi önler?",
        tasks: [
          { goal: "Sonuç yoksa anlamlı bir boş durum göster.", tip: "'Eşleşme yok' mesajı + temizle butonu." },
          { goal: "Veri gelene kadar iskelet satırlar göster.", tip: "Skeleton placeholder." },
        ],
      },
      {
        title: "9. Sanallaştırma (opsiyonel cila)",
        learn: ["Virtualization", "Performans"],
        question: "10.000 satırı DOM'a basmak yerine 'sanallaştırma' neyi optimize eder?",
        tasks: [
          { goal: "Yalnızca görünen satırları render et.", tip: "Bir windowing yaklaşımı/kütüphanesi." },
        ],
      },
    ],
  },
  {
    id: "fe-multistep-form",
    level: 3,
    track: "frontend",
    project: "Çok Adımlı Form Sihirbazı",
    difficulty: "Orta",
    emoji: "🧾",
    accent: "violet",
    tier: "mid",
    description:
      "Adım adım ilerleyen, doğrulanan ve taslağı kaydedilen bir form sihirbazı. Amaç: form state, şema doğrulama, adımlar arası geçiş ve UX.",
    skills: ["Form state", "Validation", "Şema (Zod)", "Wizard", "Taslak kaydı", "Progress UI"],
    steps: [
      {
        title: "1. Adımları modelle",
        learn: ["State", "Array (Dizi)"],
        question: "Sihirbazın hangi adımda olduğunu tutmanın en sade yolu nedir?",
        tasks: [
          { goal: "Adımları bir diziyle tanımla, aktif adımı state'te tut.", tip: "`step` index + adım bileşenleri." },
          { goal: "İleri/geri butonlarıyla adımlar arası geç.", tip: "Index'i artır/azalt, sınırları koru." },
        ],
      },
      {
        title: "2. Form verisini topla",
        learn: ["Controlled Component", "Spread (...)"],
        question: "Tüm adımların verisini tek bir nesnede tutmak son gönderimi nasıl kolaylaştırır?",
        tasks: [
          { goal: "Tüm alanları tek bir `formData` nesnesinde topla.", tip: "`setFormData(d => ({ ...d, [name]: value }))`." },
        ],
      },
      {
        title: "3. Alan bazlı doğrulama",
        learn: ["Validation", "Error Handling"],
        question: "Hatayı 'gönderirken' mi yoksa 'alandan çıkınca' mı göstermek daha iyi bir UX?",
        tasks: [
          { goal: "Zorunlu/format kurallarını kontrol et.", tip: "Basit kontroller veya bir şema." },
          { goal: "Hatalı alanın altında mesaj göster.", tip: "`errors[name]`." },
        ],
      },
      {
        title: "4. Şema ile doğrula (Zod)",
        learn: ["Library (Kütüphane)", "Şema (Schema)"],
        question: "Doğrulamayı bir şemaya taşımak (Zod) elle if-else'e göre neyi iyileştirir?",
        tasks: [
          { goal: "Her adım için bir şema tanımla ve `safeParse` et.", tip: "Zod object + `safeParse`." },
        ],
      },
      {
        title: "5. Adım geçişini kilitle",
        learn: ["Conditional Rendering", "Truthy / Falsy"],
        question: "Geçersiz bir adımdan ilerlemeyi engellemek neden formun bütünlüğünü korur?",
        tasks: [
          { goal: "Adım geçerli değilse 'İleri'yi engelle.", tip: "Doğrulama geçmeden geçişe izin verme." },
        ],
      },
      {
        title: "6. İlerleme göstergesi",
        learn: ["Conditional Rendering", "CSS"],
        question: "Kullanıcıya 'kaç adım kaldı' bilgisini görsel vermek tamamlanma oranını neden artırır?",
        tasks: [
          { goal: "Üstte adım göstergesi/progress bar ekle.", tip: "Aktif/biten/bekleyen adımları renklendir." },
        ],
      },
      {
        title: "7. Taslağı kaydet",
        learn: ["useEffect", "localStorage / sessionStorage"],
        question: "Form yarıda kalırsa taslağı saklamak hangi gerçek kullanıcı sorununu çözer?",
        tasks: [
          { goal: "Veriyi yazdıkça localStorage'a kaydet.", tip: "`useEffect` ile senkronize et." },
          { goal: "Açılışta taslak varsa devam ettir.", tip: "Başlangıç değerini localStorage'dan al." },
        ],
      },
      {
        title: "8. Özet ve gönder",
        learn: ["Conditional Rendering"],
        question: "Son adımda bir özet göstermek hata oranını neden düşürür?",
        tasks: [
          { goal: "Son adımda tüm girilenleri özetle.", tip: "Salt-okunur gözden geçirme ekranı." },
          { goal: "Gönderince taslağı temizle, teşekkür göster.", tip: "localStorage temizle + başarı ekranı." },
        ],
      },
    ],
  },
  {
    id: "fe-dashboard-charts",
    level: 3,
    track: "frontend",
    project: "Dashboard & Grafikler",
    difficulty: "Orta",
    emoji: "📊",
    accent: "cyan",
    tier: "mid",
    description:
      "Veriyi görselleştiren bir gösterge paneli. Amaç: grafik kütüphanesi, türetilmiş metrikler, filtreler ve responsive layout.",
    skills: ["Veri görselleştirme", "Chart kütüphanesi", "Türetilmiş metrik", "Filtre", "Responsive grid", "Tema"],
    steps: [
      {
        title: "1. Panel iskeleti",
        learn: ["CSS Grid", "Responsive & Media Query"],
        question: "Dashboard'da kart düzenini Grid ile kurmak farklı ekranlara uyumu nasıl kolaylaştırır?",
        tasks: [
          { goal: "Metrik kartları ve grafik alanlarını bir grid'e yerleştir.", tip: "`grid-template-areas` veya auto-fit." },
        ],
      },
      {
        title: "2. Özet metrik kartları (KPI)",
        learn: ["reduce()", "Türetilmiş state"],
        question: "Toplam/ortalama gibi KPI'ları veriden türetmek ayrı state tutmaya göre neden güvenli?",
        tasks: [
          { goal: "Toplam, ortalama, değişim gibi metrikleri hesapla.", tip: "`reduce` ile veriden türet." },
          { goal: "Her metriği bir kartta göster.", tip: "Değer + etiket + trend oku." },
        ],
      },
      {
        title: "3. İlk grafik",
        learn: ["Library (Kütüphane)", "Props"],
        question: "Hazır bir grafik kütüphanesi kullanmanın elle SVG çizmeye göre artısı/eksisi nedir?",
        tasks: [
          { goal: "Bir çizgi/sütun grafiği ekle.", tip: "Recharts/Chart.js gibi bir kütüphane." },
        ],
      },
      {
        title: "4. Tarih aralığı filtresi",
        learn: ["filter()", "State"],
        question: "Filtre değişince tüm grafiklerin tek kaynaktan güncellenmesi neden önemli?",
        tasks: [
          { goal: "Tarih aralığı seç; tüm kartlar/grafikler güncellensin.", tip: "Tek bir filtre state'i türet." },
        ],
      },
      {
        title: "5. Kategori kırılımı",
        learn: ["Map (Eşleme)", "groupBy"],
        question: "Veriyi kategoriye göre gruplamak (groupBy) hangi grafik türünü mümkün kılar?",
        tasks: [
          { goal: "Veriyi kategoriye göre grupla, pasta/sütun çiz.", tip: "Bir `Map`/obje ile grupla." },
        ],
      },
      {
        title: "6. Yükleniyor/boş durum",
        learn: ["Skeleton", "Conditional Rendering"],
        question: "Grafik verisi gelmeden iskelet göstermek 'layout kayması'nı nasıl önler?",
        tasks: [
          { goal: "Veri gelene kadar kart/grafik iskeletleri göster.", tip: "Sabit yükseklikli placeholder." },
        ],
      },
      {
        title: "7. Tema (açık/koyu)",
        learn: ["CSS Variables", "Context API"],
        question: "Tema rengini CSS değişkenleriyle yönetmek grafik renklerini nasıl tutarlı kılar?",
        tasks: [
          { goal: "Açık/koyu tema geçişi ekle.", tip: "`data-theme` + CSS değişkenleri." },
        ],
      },
      {
        title: "8. Dışa aktar ve yayınla",
        learn: ["Native API", "Deploy"],
        question: "Bir grafiği PNG/CSV olarak dışa aktarmak hangi kullanıcı ihtiyacını karşılar?",
        tasks: [
          { goal: "Veriyi CSV olarak indir.", tip: "Blob + indirme linki." },
          { goal: "Paneli yayınla.", tip: "Vercel/Netlify." },
        ],
      },
    ],
  },
  {
    id: "fe-design-system",
    level: 4,
    track: "frontend",
    project: "Tasarım Sistemi / Component Library",
    difficulty: "İleri",
    emoji: "🎛️",
    accent: "rose",
    tier: "senior",
    description:
      "Yeniden kullanılabilir, tutarlı bir bileşen kütüphanesi. Amaç: design token, varyant API'si, erişilebilirlik ve dokümantasyon.",
    skills: ["Design tokens", "Varyant API", "Compound components", "a11y", "Storybook", "Tema"],
    steps: [
      {
        title: "1. Design token'lar",
        learn: ["CSS Variables", "Design Tokens"],
        question: "Renk/boşluk/typografiyi token'a almak 'sihirli sayıları' nasıl ortadan kaldırır?",
        tasks: [
          { goal: "Renk, boşluk, radius için token tanımla.", tip: "CSS değişkenleri veya bir tema objesi." },
        ],
      },
      {
        title: "2. Button varyant API'si",
        learn: ["Props", "Discriminated Union"],
        question: "`variant`/`size` proplarını tip güvenli yapmak hatalı kullanımı nasıl engeller?",
        tasks: [
          { goal: "primary/secondary/ghost varyantlı bir Button yaz.", tip: "`variant` + `size` props; token kullan." },
          { goal: "Geçersiz varyantları tip seviyesinde engelle.", tip: "Union tipler." },
        ],
      },
      {
        title: "3. Erişilebilir Input + Label",
        learn: ["ARIA", "Erişilebilirlik (a11y)"],
        question: "Label'ı input'a bağlamak (`htmlFor`/`id`) ekran okuyucu için neden kritik?",
        tasks: [
          { goal: "Label, hata ve yardım metni içeren bir Field yaz.", tip: "`aria-describedby` ile bağla." },
        ],
      },
      {
        title: "4. Compound: Tabs",
        learn: ["Context API", "Compound Components"],
        question: "Tabs'i compound bileşen yapmak (Tabs/Tab/Panel) API'yi nasıl esnekleştirir?",
        tasks: [
          { goal: "Context ile konuşan Tabs/Tab/Panel yaz.", tip: "Aktif sekmeyi context'te tut." },
        ],
      },
      {
        title: "5. Erişilebilir Modal/Dialog",
        learn: ["Portal", "Focus Trap"],
        question: "Dialog açıkken arka planı `aria-hidden` yapmak neden gerekir?",
        tasks: [
          { goal: "Focus trap + Esc kapatma içeren bir Dialog yaz.", tip: "Portal + odak yönetimi." },
        ],
      },
      {
        title: "6. Tema sağlayıcı",
        learn: ["Context API", "CSS Variables"],
        question: "Tema'yı bir provider'dan dağıtmak bileşenleri prop kalabalığından nasıl korur?",
        tasks: [
          { goal: "ThemeProvider ile açık/koyu temayı dağıt.", tip: "Context + kök CSS değişkenleri." },
        ],
      },
      {
        title: "7. Storybook ile belgele",
        learn: ["Storybook", "Dokümantasyon"],
        question: "Her bileşeni izole 'story'lerle göstermek bakımını nasıl kolaylaştırır?",
        tasks: [
          { goal: "Button ve Field için story yaz.", tip: "Varyant/state başına bir story." },
        ],
      },
      {
        title: "8. Paketle ve yayınla",
        learn: ["Bundler", "Deploy"],
        question: "Bir kütüphaneyi paketlerken 'tree-shaking' tüketici uygulamada neyi iyileştirir?",
        tasks: [
          { goal: "Kütüphaneyi paketle ve örnek uygulamada kullan.", tip: "Named export'lar; yan etki bildirimi." },
        ],
      },
    ],
  },
  {
    id: "fe-a11y-app",
    level: 4,
    track: "frontend",
    project: "Erişilebilirlik Odaklı Uygulama",
    difficulty: "İleri",
    emoji: "♿",
    accent: "emerald",
    tier: "senior",
    description:
      "WCAG'a saygılı, klavyeyle tam kullanılabilen bir uygulama. Amaç: semantik, ARIA, odak yönetimi, kontrast ve test.",
    skills: ["WCAG", "ARIA", "Klavye navigasyonu", "Focus yönetimi", "Kontrast", "Screen reader testi"],
    steps: [
      {
        title: "1. Semantik temel",
        learn: ["HTML", "Semantik Etiketler"],
        question: "`<div onClick>` yerine `<button>` kullanmak erişilebilirlikte neyi 'bedava' verir?",
        tasks: [
          { goal: "Tıklanabilir öğeleri doğru semantik elementlere çevir.", tip: "button/a/nav/main..." },
        ],
      },
      {
        title: "2. Klavyeyle tam gezilebilirlik",
        learn: ["Input Handling", "Focus yönetimi"],
        question: "`tabindex` değerini elle 1,2,3 vermek neden anti-pattern'dir?",
        tasks: [
          { goal: "Tüm akışı yalnızca klavyeyle tamamla.", tip: "Doğal tab sırası; `tabindex=0/-1` dikkatli." },
        ],
      },
      {
        title: "3. Görünür odak",
        learn: ["CSS", "Focus yönetimi"],
        question: "`outline: none` vermek neden tehlikeli; yerine ne yapılmalı?",
        tasks: [
          { goal: "Net bir focus stili tasarla.", tip: "`:focus-visible` ile belirgin halka." },
        ],
      },
      {
        title: "4. ARIA ile durum bildir",
        learn: ["ARIA", "Live Region"],
        question: "Dinamik bir mesajı ekran okuyucuya duyurmak için hangi ARIA aracı kullanılır?",
        tasks: [
          { goal: "Yükleme/hata mesajlarını `aria-live` ile duyur.", tip: "`role=\"status\"`/`aria-live=\"polite\"`." },
        ],
      },
      {
        title: "5. Renk ve kontrast",
        learn: ["Kontrast", "WCAG"],
        question: "Metin/arka plan kontrastında WCAG AA eşiği (4.5:1) neyi garanti eder?",
        tasks: [
          { goal: "Düşük kontrastlı yerleri düzelt.", tip: "Bir kontrast aracıyla ölç." },
          { goal: "Bilgiyi yalnızca renge dayandırma.", tip: "Renk + ikon/metin birlikte." },
        ],
      },
      {
        title: "6. Form erişilebilirliği",
        learn: ["ARIA", "Validation"],
        question: "Hatalı bir alanı duyururken `aria-invalid` ve `aria-describedby` nasıl birlikte çalışır?",
        tasks: [
          { goal: "Hataları programatik olarak alana bağla.", tip: "`aria-invalid` + hata id'si." },
        ],
      },
      {
        title: "7. Otomatik + manuel test",
        learn: ["Test", "Screen reader testi"],
        question: "Otomatik a11y testleri neyi yakalayamaz; manuel test neden şart?",
        tasks: [
          { goal: "Bir denetim aracıyla tara, bulguları düzelt.", tip: "axe/Lighthouse." },
          { goal: "Ekran okuyucuyla baştan sona dene.", tip: "VoiceOver/NVDA." },
        ],
      },
    ],
  },
  {
    id: "fe-global-state",
    level: 4,
    track: "frontend",
    project: "Global State (Zustand/Redux)",
    difficulty: "İleri",
    emoji: "🗃️",
    accent: "amber",
    tier: "senior",
    description:
      "Birçok bileşenin paylaştığı durumu ölçeklenebilir yönet. Amaç: store, seçiciler (selector), kalıcılık ve devtools.",
    skills: ["Global store", "Selector", "Reducer/action", "Persist", "Devtools", "Performans"],
    steps: [
      {
        title: "1. Neden global state?",
        learn: ["State", "Prop Drilling"],
        question: "Prop drilling hangi noktada 'yeter' deyip global state'e geçmeyi gerektirir?",
        tasks: [
          { goal: "Derin prop geçişi olan bir senaryoyu belirle.", tip: "3+ kat aşağı geçen prop'u bul." },
        ],
      },
      {
        title: "2. Store kur",
        learn: ["Library (Kütüphane)", "Store"],
        question: "Store'u tek kaynak (single source of truth) yapmak tutarlılığı nasıl sağlar?",
        tasks: [
          { goal: "Bir global store oluştur (örn. Zustand).", tip: "`create(set => ({...}))`." },
          { goal: "Bir aksiyonla state'i güncelle.", tip: "`set` ile immutable güncelle." },
        ],
      },
      {
        title: "3. Seçici (selector) ile oku",
        learn: ["Selector", "Performans"],
        question: "Tüm store yerine sadece gereken parçayı seçmek gereksiz render'ı nasıl önler?",
        tasks: [
          { goal: "Bileşenler yalnızca ihtiyaç duyduğu parçayı seçsin.", tip: "`useStore(s => s.x)`." },
        ],
      },
      {
        title: "4. Türetilmiş değer",
        learn: ["Türetilmiş state", "useMemo"],
        question: "Türetilmiş değeri store'da saklamak yerine selector'da hesaplamak neyi sadeleştirir?",
        tasks: [
          { goal: "Toplam/filtreli değer gibi türetilmişleri selector'da üret.", tip: "Saklama, hesapla." },
        ],
      },
      {
        title: "5. Kalıcılık",
        learn: ["Persist", "localStorage / sessionStorage"],
        question: "Hangi state kalıcı olmalı, hangisi her açılışta sıfırlanmalı — nasıl karar verirsin?",
        tasks: [
          { goal: "Seçili state'i kalıcı yap.", tip: "Persist middleware veya elle." },
        ],
      },
      {
        title: "6. Async aksiyon",
        learn: ["async / await", "Error Handling"],
        question: "Store içinde async iş yaparken loading/error'ı da state'te tutmak neden gerekir?",
        tasks: [
          { goal: "Bir veri çekme aksiyonu + loading/error tut.", tip: "`set({loading:true})` → fetch → set." },
        ],
      },
      {
        title: "7. Devtools ve hata ayıkla",
        learn: ["Devtools", "Debugging"],
        question: "Aksiyonları devtools'ta izlemek 'state nasıl bu hale geldi' sorusuna nasıl yanıt verir?",
        tasks: [
          { goal: "Devtools'u bağla, bir aksiyonu izle.", tip: "Devtools middleware." },
        ],
      },
    ],
  },
  {
    id: "fe-realtime-ui",
    level: 5,
    track: "frontend",
    project: "Gerçek Zamanlı İşbirliği UI",
    difficulty: "İleri",
    emoji: "🛰️",
    accent: "indigo",
    tier: "senior",
    description:
      "Birden çok kullanıcının aynı anda gördüğü canlı bir arayüz. Amaç: presence, optimistic UI, çakışma ve yeniden bağlanma.",
    skills: ["Realtime", "Presence", "Optimistic UI", "Reconnect", "Çakışma çözümü", "WebSocket"],
    steps: [
      {
        title: "1. Canlı veri akışı",
        learn: ["WebSocket", "useEffect"],
        question: "Bağlantıyı `useEffect` içinde kurarken cleanup'ta kapatmazsan ne olur?",
        tasks: [
          { goal: "Bir realtime kaynağa abone ol, gelen veriyi göster.", tip: "Subscribe + cleanup'ta unsubscribe." },
        ],
      },
      {
        title: "2. Presence (kim çevrimiçi)",
        learn: ["Presence", "State"],
        question: "Aktif kullanıcı listesini tutarlı tutmak için 'ayrılma' olayını neden dinlemelisin?",
        tasks: [
          { goal: "Çevrimiçi kullanıcıları avatarlarla göster.", tip: "Join/leave olaylarını işle." },
        ],
      },
      {
        title: "3. Canlı imleç/seçim",
        learn: ["Throttle", "Performans"],
        question: "İmleç konumunu her piksel yerine throttle'layarak yollamak neyi korur?",
        tasks: [
          { goal: "Diğer kullanıcıların imlecini göster.", tip: "Konumu throttle'la yayınla." },
        ],
      },
      {
        title: "4. Optimistic güncelleme",
        learn: ["Optimistic UI", "Immutability"],
        question: "Sunucu onayını beklemeden UI'ı güncellemenin riski nedir, nasıl geri alınır?",
        tasks: [
          { goal: "Değişikliği anında uygula, sonra doğrula.", tip: "Başarısızsa rollback." },
        ],
      },
      {
        title: "5. Çakışma çözümü",
        learn: ["Çakışma çözümü", "Data Structure"],
        question: "İki kişi aynı anda aynı alanı değiştirirse 'son yazan kazanır' ne zaman yetersizdir?",
        tasks: [
          { goal: "Basit bir çakışma stratejisi uygula.", tip: "Sürüm/timestamp ile karşılaştır." },
        ],
      },
      {
        title: "6. Yeniden bağlanma",
        learn: ["Reconnect", "Error Handling"],
        question: "Bağlantı koptuğunda kullanıcıyı bilgilendirmek ve kuyruğa almak neden önemli?",
        tasks: [
          { goal: "Kopunca otomatik yeniden bağlan, durumu göster.", tip: "Exponential backoff + 'yeniden bağlanıyor'." },
        ],
      },
    ],
  },
  {
    id: "fe-perf",
    level: 5,
    track: "frontend",
    project: "Performans & Cila (Core Web Vitals)",
    difficulty: "İleri",
    emoji: "⚡",
    accent: "lime",
    tier: "senior",
    description:
      "Var olan bir uygulamayı ölç ve hızlandır. Amaç: code splitting, memoization, lazy loading ve Core Web Vitals.",
    skills: ["Code splitting", "Memoization", "Lazy loading", "Core Web Vitals", "Bundle analizi", "Profiling"],
    steps: [
      {
        title: "1. Önce ölç",
        learn: ["Profiling", "Core Web Vitals"],
        question: "Optimizasyona ölçmeden başlamak neden çoğu zaman zaman kaybıdır?",
        tasks: [
          { goal: "Lighthouse/Profiler ile temel (baseline) çıkar.", tip: "LCP/CLS/INP not al." },
        ],
      },
      {
        title: "2. Bundle'ı küçült",
        learn: ["Bundler", "Tree-shaking"],
        question: "Bundle analizinde 'büyük bağımlılık' bulmak hangi hızlı kazancı sağlar?",
        tasks: [
          { goal: "Bundle'ı analiz et, büyük parçaları bul.", tip: "Bundle analyzer." },
          { goal: "Ağır bağımlılığı hafifiyle değiştir/çıkar.", tip: "Daha küçük alternatif." },
        ],
      },
      {
        title: "3. Code splitting",
        learn: ["Code splitting", "Suspense"],
        question: "Bir rotayı/ağır bileşeni lazy yüklemek ilk yüklemeyi nasıl hızlandırır?",
        tasks: [
          { goal: "Ağır bir bileşeni lazy yükle.", tip: "`lazy` + `Suspense`." },
        ],
      },
      {
        title: "4. Gereksiz render'ı kes",
        learn: ["memo", "useMemo", "useCallback"],
        question: "`memo`/`useCallback`'i her yere serpmek neden bazen zarar verir?",
        tasks: [
          { goal: "Profiler'da sık render eden bileşeni bul ve sabitle.", tip: "Sadece kanıtlı yerde memo." },
        ],
      },
      {
        title: "5. Görsel ve font",
        learn: ["Lazy loading", "Performans"],
        question: "Görselleri doğru boyut/format vermek LCP'yi neden ciddi iyileştirir?",
        tasks: [
          { goal: "Görselleri optimize et, fontları önbelleğe al.", tip: "Modern format + `font-display`." },
        ],
      },
      {
        title: "6. Doğrula",
        learn: ["Core Web Vitals", "Test"],
        question: "İyileştirmeyi 'önce/sonra' sayılarıyla göstermek neden değerlidir?",
        tasks: [
          { goal: "Aynı ölçümü tekrarla, kazancı raporla.", tip: "Baseline ile kıyasla." },
        ],
      },
    ],
  },
  {
    id: "fe-pwa",
    level: 5,
    track: "frontend",
    project: "PWA / Offline-First",
    difficulty: "İleri",
    emoji: "📲",
    accent: "sky",
    tier: "senior",
    description:
      "İnternet olmadan da çalışan, kurulabilir bir uygulama. Amaç: service worker, cache stratejileri, manifest ve senkronizasyon.",
    skills: ["Service Worker", "Cache API", "Manifest", "Offline", "Background Sync", "Install"],
    steps: [
      {
        title: "1. Manifest ve kurulabilirlik",
        learn: ["PWA", "Manifest"],
        question: "`manifest.json` bir web uygulamasını nasıl 'kurulabilir' hale getirir?",
        tasks: [
          { goal: "İkon/isim/tema içeren bir manifest ekle.", tip: "`<link rel=\"manifest\">`." },
        ],
      },
      {
        title: "2. Service worker kaydet",
        learn: ["Service Worker", "Lifecycle"],
        question: "Service worker'ın install/activate yaşam döngüsü neden ayrı adımlardır?",
        tasks: [
          { goal: "Bir service worker kaydet ve devreye al.", tip: "`navigator.serviceWorker.register`." },
        ],
      },
      {
        title: "3. App shell'i önbelleğe al",
        learn: ["Cache API", "Offline"],
        question: "'App shell' önbelleğe alındığında ikinci açılış neden anında olur?",
        tasks: [
          { goal: "Kritik dosyaları install sırasında cache'le.", tip: "`caches.open` + `addAll`." },
        ],
      },
      {
        title: "4. Cache stratejisi",
        learn: ["Cache API", "Strateji"],
        question: "cache-first ile network-first hangi içerik türü için uygundur?",
        tasks: [
          { goal: "Statik için cache-first, veri için network-first uygula.", tip: "`fetch` event'inde dallan." },
        ],
      },
      {
        title: "5. Offline ekranı",
        learn: ["Conditional Rendering", "Offline"],
        question: "Çevrimdışıyken kullanıcıya net geri bildirim vermek güveni nasıl korur?",
        tasks: [
          { goal: "Bağlantı yoksa anlamlı bir offline durumu göster.", tip: "`navigator.onLine` + olaylar." },
        ],
      },
      {
        title: "6. Arka plan senkronu",
        learn: ["Background Sync", "Queue"],
        question: "Offline yapılan işlemi kuyruğa alıp sonra göndermek hangi senaryoyu kurtarır?",
        tasks: [
          { goal: "Offline değişikliği kuyrukla, çevrimiçi olunca gönder.", tip: "Background Sync veya elle kuyruk." },
        ],
      },
    ],
  },
  {
    id: "fe-animation",
    level: 4,
    track: "frontend",
    project: "Animasyon Vitrini (Framer Motion)",
    difficulty: "İleri",
    emoji: "✦",
    accent: "fuchsia",
    tier: "senior",
    description:
      "Anlamlı, akıcı arayüz animasyonları. Amaç: geçişler, layout animasyonu, gesture ve erişilebilir hareket.",
    skills: ["Animasyon", "Framer Motion", "Layout animasyon", "Gesture", "prefers-reduced-motion", "Performans"],
    steps: [
      {
        title: "1. Giriş/çıkış geçişleri",
        learn: ["Animasyon", "Library (Kütüphane)"],
        question: "Bir öğe DOM'dan kalkarken çıkış animasyonu için neden özel bir yapı gerekir?",
        tasks: [
          { goal: "Liste öğelerine giriş/çıkış animasyonu ekle.", tip: "AnimatePresence benzeri yapı." },
        ],
      },
      {
        title: "2. Layout animasyonu",
        learn: ["Layout animasyon", "Performans"],
        question: "Layout değişimini animasyonlamak neden GPU dostu özelliklerle yapılmalı?",
        tasks: [
          { goal: "Yeniden sıralanan kartları yumuşakça hareket ettir.", tip: "`layout` prop / FLIP tekniği." },
        ],
      },
      {
        title: "3. Gesture (sürükle)",
        learn: ["Gesture", "Input Handling"],
        question: "Sürüklenebilir bir kartta 'snap' davranışı UX'i nasıl iyileştirir?",
        tasks: [
          { goal: "Sürüklenebilir, bırakınca yerine oturan bir kart yap.", tip: "drag + sınır + snap." },
        ],
      },
      {
        title: "4. Scroll tetikli",
        learn: ["IntersectionObserver", "Animasyon"],
        question: "Scroll animasyonlarını gözlemleyiciyle tetiklemek scroll event'ine göre neden iyi?",
        tasks: [
          { goal: "Görünüme giren bölümleri canlandır.", tip: "IntersectionObserver." },
        ],
      },
      {
        title: "5. Erişilebilir hareket",
        learn: ["prefers-reduced-motion", "Erişilebilirlik (a11y)"],
        question: "`prefers-reduced-motion` neden bir 'iyi-olsa' değil, erişilebilirlik gereğidir?",
        tasks: [
          { goal: "Hareket azaltma tercihinde animasyonları sadeleştir.", tip: "Media query ile dallan." },
        ],
      },
    ],
  },
  {
    id: "fe-i18n",
    level: 3,
    track: "frontend",
    project: "Çok Dilli Uygulama (i18n)",
    difficulty: "Orta",
    emoji: "🌐",
    accent: "violet",
    tier: "mid",
    description:
      "İki+ dilde çalışan, biçimlendirmeleri yerele uyan bir uygulama. Amaç: çeviri kaynakları, dil değişimi, çoğul ve tarih/sayı biçimi.",
    skills: ["i18n", "Çeviri kaynağı", "Locale", "Çoğul kuralları", "Intl", "RTL"],
    steps: [
      {
        title: "1. Çeviri kaynakları",
        learn: ["i18n", "Object (Nesne)"],
        question: "Metinleri koddan ayırıp kaynak dosyalara almak bakımda neyi kolaylaştırır?",
        tasks: [
          { goal: "tr/en için anahtar→metin sözlükleri oluştur.", tip: "`{ greeting: '...' }` per dil." },
        ],
      },
      {
        title: "2. t() ile çevir",
        learn: ["Function (Fonksiyon)", "Context API"],
        question: "Eksik bir çeviri anahtarında ne göstermek 'kırık' bir UI'dan iyidir?",
        tasks: [
          { goal: "Aktif dile göre metni veren bir `t(key)` yaz.", tip: "Context'te aktif dil." },
        ],
      },
      {
        title: "3. Dil değiştir",
        learn: ["State", "localStorage / sessionStorage"],
        question: "Seçilen dili kalıcı kılmak kullanıcı için neden beklenen davranıştır?",
        tasks: [
          { goal: "Dil seçici ekle, seçim kalıcı olsun.", tip: "localStorage + context." },
        ],
      },
      {
        title: "4. Sayı/tarih biçimi",
        learn: ["Intl", "Locale"],
        question: "`Intl.NumberFormat`/`DateTimeFormat` elle biçimlemeye göre neden tercih edilir?",
        tasks: [
          { goal: "Sayı ve tarihleri yerele göre biçimle.", tip: "`Intl` API'leri." },
        ],
      },
      {
        title: "5. Çoğul kuralları",
        learn: ["Çoğul kuralları", "Intl"],
        question: "'1 öğe / 2 öğe' farkını dile göre yönetmek neden basit if'ten zordur?",
        tasks: [
          { goal: "Çoğul biçimleri doğru göster.", tip: "`Intl.PluralRules`." },
        ],
      },
      {
        title: "6. RTL desteği",
        learn: ["RTL", "CSS"],
        question: "Sağdan-sola diller için `dir` ve mantıksal CSS özellikleri neyi düzeltir?",
        tasks: [
          { goal: "RTL bir dilde layout'u doğrula.", tip: "`dir=\"rtl\"` + logical properties." },
        ],
      },
    ],
  },
  {
    id: "fe-auth-ui",
    level: 3,
    track: "frontend",
    project: "Kimlik Doğrulama Akışı (UI)",
    difficulty: "Orta",
    emoji: "🔐",
    accent: "indigo",
    tier: "mid",
    description:
      "Giriş, kayıt, korumalı sayfa ve oturum durumu. Amaç: form akışı, korumalı route, yönlendirme ve oturum UX'i (UI tarafı).",
    skills: ["Auth UI", "Korumalı route", "Yönlendirme", "Form akışı", "Oturum state", "Hata mesajı"],
    steps: [
      {
        title: "1. Giriş & kayıt formları",
        learn: ["Controlled Component", "Validation"],
        question: "Giriş ve kayıtta hata mesajını alan bazlı vermek genel mesaja göre neden iyi?",
        tasks: [
          { goal: "Giriş ve kayıt formlarını controlled yap.", tip: "value + onChange + temel doğrulama." },
        ],
      },
      {
        title: "2. Oturum durumunu tut",
        learn: ["Context API", "State"],
        question: "Oturum bilgisini global tutmak neden tek tek prop geçmekten iyidir?",
        tasks: [
          { goal: "Giriş/çıkışı yöneten bir auth context yaz.", tip: "`user`, `login`, `logout`." },
        ],
      },
      {
        title: "3. Korumalı route",
        learn: ["Conditional Rendering", "Yönlendirme"],
        question: "Girişsiz kullanıcıyı korumalı sayfadan login'e yollamak neden gerekir?",
        tasks: [
          { goal: "Girişsizse korumalı sayfayı gösterme, login'e yönlendir.", tip: "Guard bileşeni/HOC." },
        ],
      },
      {
        title: "4. Giriş sonrası dön",
        learn: ["Query Parameters", "URL"],
        question: "Login'den sonra kullanıcıyı geldiği sayfaya döndürmek UX'i nasıl iyileştirir?",
        tasks: [
          { goal: "Login sonrası hedef sayfaya geri dön.", tip: "`?redirect=` parametresi." },
        ],
      },
      {
        title: "5. Yükleniyor & hata",
        learn: ["Loading State", "Error Handling"],
        question: "Auth isteği sırasında butonu kilitlemek çift gönderimi nasıl engeller?",
        tasks: [
          { goal: "İstek sırasında loading göster, butonu kilitle.", tip: "`disabled` + spinner." },
          { goal: "Sunucu hatasını anlaşılır göster.", tip: "Genel + alan hataları." },
        ],
      },
      {
        title: "6. Oturumu hatırla",
        learn: ["localStorage / sessionStorage", "useEffect"],
        question: "Token'ı `localStorage`'da tutmanın güvenlik ödünleşimi nedir?",
        tasks: [
          { goal: "Yenilemede oturum korunsun.", tip: "Açılışta token'ı oku, context'i doldur." },
        ],
      },
    ],
  },
  {
    id: "fe-file-upload",
    level: 2,
    track: "frontend",
    project: "Dosya Yükleme & Önizleme",
    difficulty: "Kolay-Orta",
    emoji: "📤",
    accent: "emerald",
    tier: "junior",
    description:
      "Sürükle-bırak yükleme, önizleme ve ilerleme. Amaç: File API, drag-drop, önizleme ve doğrulama (UI).",
    skills: ["File API", "Drag & Drop", "Önizleme", "Progress", "Doğrulama", "Blob URL"],
    steps: [
      {
        title: "1. Dosya seç",
        learn: ["File API", "Input Handling"],
        question: "`<input type=file>` ile `multiple` davranışı state'i nasıl etkiler?",
        tasks: [
          { goal: "Dosya seçtir ve adlarını listele.", tip: "`e.target.files` → diziye çevir." },
        ],
      },
      {
        title: "2. Sürükle-bırak alanı",
        learn: ["Drag & Drop", "Input Handling"],
        question: "`onDragOver`'da `preventDefault` çağırmazsan tarayıcı ne yapar?",
        tasks: [
          { goal: "Dosyaları sürükleyip bırakılan bir alan ekle.", tip: "`onDrop` + `dataTransfer.files`." },
        ],
      },
      {
        title: "3. Önizleme",
        learn: ["Blob URL", "useEffect"],
        question: "`URL.createObjectURL` ile oluşturulan URL neden `revoke` edilmeli?",
        tasks: [
          { goal: "Görselleri yüklemeden önizle.", tip: "`createObjectURL`; cleanup'ta revoke." },
        ],
      },
      {
        title: "4. Doğrulama",
        learn: ["Validation", "Error Handling"],
        question: "Tür/boyut doğrulamasını yüklemeden önce yapmak neden gerekir?",
        tasks: [
          { goal: "İzinli tür ve maksimum boyutu kontrol et.", tip: "`file.type`, `file.size`." },
        ],
      },
      {
        title: "5. İlerleme çubuğu",
        learn: ["Progress", "State"],
        question: "Yükleme ilerlemesini göstermek uzun yüklemelerde neyi iyileştirir?",
        tasks: [
          { goal: "Her dosya için bir ilerleme çubuğu göster.", tip: "Yüzdeyi state'te tut." },
        ],
      },
    ],
  },
  {
    id: "fe-command-palette",
    level: 4,
    track: "frontend",
    project: "Komut Paleti (⌘K)",
    difficulty: "İleri",
    emoji: "⌘",
    accent: "amber",
    tier: "senior",
    description:
      "Klavyeyle her şeye hızlı erişim sağlayan bir komut paleti. Amaç: klavye kısayolu, fuzzy arama, erişilebilirlik ve odak yönetimi.",
    skills: ["Klavye kısayolu", "Fuzzy search", "Focus yönetimi", "ARIA", "Portal", "Klavye navigasyonu"],
    steps: [
      {
        title: "1. Kısayolla aç",
        learn: ["Input Handling", "useEffect"],
        question: "Global bir kısayolu (⌘K) dinlerken tarayıcı varsayılanını ne zaman ezmelisin?",
        tasks: [
          { goal: "⌘/Ctrl+K ile paleti aç/kapat.", tip: "`keydown` + `metaKey/ctrlKey`." },
        ],
      },
      {
        title: "2. Komut listesi",
        learn: ["List Rendering", "Array (Dizi)"],
        question: "Komutları veri olarak modellemek (etiket+aksiyon) genişlemeyi nasıl kolaylaştırır?",
        tasks: [
          { goal: "Komutları `{label, action}` olarak listele.", tip: "Bir dizi komut tanımı." },
        ],
      },
      {
        title: "3. Fuzzy arama",
        learn: ["filter()", "Algoritma"],
        question: "'Tam eşleşme' yerine fuzzy arama kullanıcı yazımındaki küçük hataları nasıl tolere eder?",
        tasks: [
          { goal: "Yazdıkça komutları daralt.", tip: "Basit içerir/skor temelli filtre." },
        ],
      },
      {
        title: "4. Klavyeyle gez ve çalıştır",
        learn: ["Klavye navigasyonu", "State"],
        question: "Aktif öğeyi ok tuşlarıyla gezerken seçimi neden state'te tutarsın?",
        tasks: [
          { goal: "↑↓ ile gez, Enter ile çalıştır.", tip: "`activeIndex` + sınır kontrolü." },
        ],
      },
      {
        title: "5. Erişilebilirlik & odak",
        learn: ["ARIA", "Focus yönetimi"],
        question: "Palet açılınca odağı arama kutusuna almak neden ilk adımdır?",
        tasks: [
          { goal: "Açılışta inputa odaklan, kapanınca odağı geri ver.", tip: "ref.focus + önceki odak." },
        ],
      },
    ],
  },
  {
    id: "fe-toast-system",
    level: 3,
    track: "frontend",
    project: "Bildirim / Toast Sistemi",
    difficulty: "Orta",
    emoji: "🔔",
    accent: "rose",
    tier: "mid",
    description:
      "Her yerden tetiklenebilen, kendiliğinden kapanan bildirimler. Amaç: imperatif API, kuyruk, otomatik kapatma ve erişilebilirlik.",
    skills: ["Context API", "Imperatif API", "Kuyruk", "Timer", "aria-live", "Animasyon"],
    steps: [
      {
        title: "1. Toast deposu",
        learn: ["Context API", "State"],
        question: "Toast'ları tek bir merkezde tutmak çoklu tetikleyiciyi neden kolaylaştırır?",
        tasks: [
          { goal: "Aktif toast'ları tutan bir context oluştur.", tip: "`toasts` dizisi + ekle/sil." },
        ],
      },
      {
        title: "2. `toast()` API'si",
        learn: ["Function (Fonksiyon)", "Imperatif API"],
        question: "`toast.success('...')` gibi imperatif bir API'nin avantajı nedir?",
        tasks: [
          { goal: "Her yerden çağrılabilen bir `toast()` fonksiyonu ver.", tip: "Context aksiyonunu sar." },
        ],
      },
      {
        title: "3. Otomatik kapatma",
        learn: ["setTimeout / setInterval", "useEffect"],
        question: "Bir toast hover'dayken zamanlayıcıyı duraklatmak neden iyi bir UX?",
        tasks: [
          { goal: "Toast'lar süre sonunda kendiliğinden kapansın.", tip: "`setTimeout`; hover'da temizle." },
        ],
      },
      {
        title: "4. Yığ ve sırala",
        learn: ["Array (Dizi)", "Animasyon"],
        question: "Çok sayıda toast birikince ne yapmak ekranı kalabalıktan korur?",
        tasks: [
          { goal: "Toast'ları üst üste yığ; maksimum sayı koy.", tip: "Eskiyi düşür veya kuyrukla." },
        ],
      },
      {
        title: "5. Erişilebilirlik",
        learn: ["aria-live", "Erişilebilirlik (a11y)"],
        question: "Toast mesajını ekran okuyucuya duyurmak için hangi ARIA bölgesi gerekir?",
        tasks: [
          { goal: "Toast'ları `aria-live` bölgesinde duyur.", tip: "`role=\"status\"`." },
        ],
      },
    ],
  },
  {
    id: "fe-date-picker",
    level: 3,
    track: "frontend",
    project: "Tarih Seçici (Date Picker)",
    difficulty: "Orta",
    emoji: "📅",
    accent: "sky",
    tier: "mid",
    description:
      "Sıfırdan, erişilebilir bir takvim/tarih seçici. Amaç: tarih matematiği, klavye navigasyonu, aralık seçimi ve yerelleştirme.",
    skills: ["Date matematiği", "Takvim ızgarası", "Klavye navigasyonu", "Aralık seçimi", "Intl", "ARIA"],
    steps: [
      {
        title: "1. Ay ızgarasını çiz",
        learn: ["Date matematiği", "CSS Grid"],
        question: "Ayın ilk gününün haftanın hangi gününe denk geldiğini bulmak ızgarayı nasıl hizalar?",
        tasks: [
          { goal: "Seçili ayın günlerini 7 kolonlu ızgarada göster.", tip: "Ayın gün sayısı + ilk gün ofseti." },
        ],
      },
      {
        title: "2. Aylar arası gez",
        learn: ["State", "Date matematiği"],
        question: "Aralık/yıl sınırlarını geçerken (Aralık→Ocak) tarihi doğru ilerletmek neden dikkat ister?",
        tasks: [
          { goal: "Önceki/sonraki ay butonları ekle.", tip: "Görüntülenen ay bir state." },
        ],
      },
      {
        title: "3. Gün seç",
        learn: ["State", "Conditional Rendering"],
        question: "Seçili ve 'bugün' günlerini farklı vurgulamak kullanıcının yönünü nasıl korur?",
        tasks: [
          { goal: "Bir güne tıklayınca seç ve vurgula.", tip: "Seçili tarih state'i." },
        ],
      },
      {
        title: "4. Klavyeyle gez",
        learn: ["Klavye navigasyonu", "Input Handling"],
        question: "Takvimde ok tuşlarıyla gezerken ay sınırını otomatik atlamak neden beklenir?",
        tasks: [
          { goal: "Ok tuşlarıyla günler arası gez, Enter ile seç.", tip: "Aktif günü ilerlet, ay aşınca geç." },
        ],
      },
      {
        title: "5. Aralık seçimi",
        learn: ["State", "Date matematiği"],
        question: "Başlangıç < bitiş kısıtını korumak aralık seçiminde hangi hatayı önler?",
        tasks: [
          { goal: "Başlangıç ve bitiş tarihiyle bir aralık seç.", tip: "İki tarih + aradaki günleri boya." },
        ],
      },
      {
        title: "6. Yerelleştir & erişilebilir yap",
        learn: ["Intl", "ARIA"],
        question: "Gün/ay adlarını `Intl` ile vermek elle yazmaya göre neyi garanti eder?",
        tasks: [
          { goal: "Gün/ay adlarını yerele göre göster.", tip: "`Intl.DateTimeFormat`." },
          { goal: "Izgaraya uygun ARIA rolleri ver.", tip: "`role=\"grid\"` + `gridcell`." },
        ],
      },
    ],
  },
  {
    id: "fe-theme-switcher",
    level: 2,
    track: "frontend",
    project: "Tema Sistemi (Açık/Koyu/Sistem)",
    difficulty: "Kolay-Orta",
    emoji: "🌗",
    accent: "violet",
    tier: "junior",
    description:
      "Açık/koyu/sistem temalı, yanıp sönmeyen (no-flash) bir tema sistemi. Amaç: CSS değişkenleri, sistem tercihi ve kalıcılık.",
    skills: ["CSS Variables", "prefers-color-scheme", "localStorage", "FOUC önleme", "Context API", "Tema"],
    steps: [
      {
        title: "1. Tema değişkenleri",
        learn: ["CSS Variables", "Tema"],
        question: "Renkleri CSS değişkenine almak tema geçişini neden anında yapar?",
        tasks: [
          { goal: "Açık/koyu için renk değişkenleri tanımla.", tip: "`:root` ve `[data-theme=dark]`." },
        ],
      },
      {
        title: "2. Geçiş düğmesi",
        learn: ["State", "DOM"],
        question: "Temayı `<html>` üzerinde bir attribute ile yönetmek neden pratiktir?",
        tasks: [
          { goal: "Açık/koyu arası geçiş yapan bir düğme ekle.", tip: "`document.documentElement.dataset.theme`." },
        ],
      },
      {
        title: "3. Sistem tercihini izle",
        learn: ["prefers-color-scheme", "useEffect"],
        question: "'Sistem' modunda işletim sistemi temasını dinlemek neden ayrı bir durum?",
        tasks: [
          { goal: "'Sistem' seçeneğinde OS temasını takip et.", tip: "`matchMedia('(prefers-color-scheme: dark)')`." },
        ],
      },
      {
        title: "4. Kalıcılık",
        learn: ["localStorage / sessionStorage", "Context API"],
        question: "Seçilen temayı saklamak ama 'sistem' modunu da hatırlamak neden ikisini birden gerektirir?",
        tasks: [
          { goal: "Tema seçimini kalıcı yap.", tip: "localStorage + context." },
        ],
      },
      {
        title: "5. Yanıp sönmeyi (FOUC) önle",
        learn: ["FOUC önleme", "Performans"],
        question: "Sayfa yüklenirken yanlış temanın bir an görünmesini (flash) ne önler?",
        tasks: [
          { goal: "İlk boyamadan önce temayı uygula.", tip: "Head'de senkron küçük script." },
        ],
      },
    ],
  },
];

// ════════════════════════════════════════════════════════════════
//  BACKEND — ek projeler
// ════════════════════════════════════════════════════════════════
const backendExtra: Level[] = [
  {
    id: "be-url-shortener",
    level: 1,
    track: "backend",
    project: "URL Kısaltıcı API",
    difficulty: "Başlangıç",
    emoji: "🔗",
    accent: "emerald",
    tier: "junior",
    description:
      "Uzun bağlantıları kısa koda çeviren, yönlendiren ve tıklamayı sayan küçük bir API. Amaç: REST, kalıcı saklama, yönlendirme ve sayaç.",
    skills: ["REST", "Routing", "Hash/slug", "Redirect", "Sayaç", "Validation"],
    steps: [
      {
        title: "1. Sunucuyu ayağa kaldır",
        learn: ["Server (Sunucu)", "HTTP"],
        question: "Bir HTTP sunucusu gelen isteği yanıta nasıl çevirir — request/response döngüsü nedir?",
        tasks: [
          { goal: "Basit bir HTTP sunucusu kur ve 'ok' dönen bir uç ekle.", tip: "Express/Fastify: bir GET route." },
        ],
      },
      {
        title: "2. Kısaltma uç noktası",
        learn: ["REST", "POST"],
        question: "Yeni bir kaynak oluştururken neden GET değil POST kullanılır?",
        tasks: [
          { goal: "Uzun URL alıp kısa kod üreten bir POST ekle.", tip: "Gövdeden URL al, bir kod üret." },
        ],
      },
      {
        title: "3. Kısa kod üret",
        learn: ["Hash/slug", "Algoritma"],
        question: "Kısa kod için rastgele mi yoksa artan id'den base62 mi üretmek daha iyi — ödünleşim nedir?",
        tasks: [
          { goal: "Çakışmayan kısa bir kod üret.", tip: "Rastgele kısa string veya id→base62." },
        ],
      },
      {
        title: "4. Kalıcı sakla",
        learn: ["Veritabanı", "CRUD"],
        question: "Eşlemeyi bellekte tutmak yerine kalıcı saklamak neden şart?",
        tasks: [
          { goal: "kod→URL eşlemesini bir depoda sakla.", tip: "Bir tablo/koleksiyon (kod benzersiz)." },
        ],
      },
      {
        title: "5. Yönlendir",
        learn: ["Redirect", "HTTP Status"],
        question: "Yönlendirmede 301 ile 302 arasındaki fark tıklama sayımını nasıl etkiler?",
        tasks: [
          { goal: "`/:code` isteğini hedef URL'e yönlendir.", tip: "301/302 + `Location` başlığı." },
          { goal: "Olmayan kodda 404 dön.", tip: "Bulunamazsa anlamlı hata." },
        ],
      },
      {
        title: "6. Tıklamayı say",
        learn: ["CRUD", "Concurrency"],
        question: "Aynı linke aynı anda gelen iki tıklamada sayacın doğru artması için neye dikkat edersin?",
        tasks: [
          { goal: "Her yönlendirmede tık sayacını artır.", tip: "Atomik artırma." },
        ],
      },
      {
        title: "7. Doğrula ve sınırla",
        learn: ["Validation", "Rate Limit"],
        question: "Girdi URL'ini doğrulamak ve hız sınırı koymak hangi kötüye kullanımı engeller?",
        tasks: [
          { goal: "Geçersiz URL'i reddet.", tip: "Şema/regex ile doğrula." },
          { goal: "IP başına basit bir hız sınırı koy.", tip: "Pencere başına istek say." },
        ],
      },
    ],
  },
  {
    id: "be-proxy-api",
    level: 1,
    track: "backend",
    project: "Dış API Proxy + Cache",
    difficulty: "Başlangıç",
    emoji: "🔌",
    accent: "sky",
    tier: "junior",
    description:
      "Dış bir API'yi (hava/döviz) saran, anahtarı gizleyen ve önbellekleyen bir proxy. Amaç: server-side fetch, cache, hata yönetimi.",
    skills: ["Server-side fetch", "Cache", "Environment Variable", "Hata yönetimi", "Timeout", "Normalize"],
    steps: [
      {
        title: "1. Dış API'yi sar",
        learn: ["API", "fetch API"],
        question: "Dış API anahtarını istemci yerine sunucuda tutmak neden güvenlik açısından gereklidir?",
        tasks: [
          { goal: "Bir uç ekleyip dış API'den veri çek.", tip: "Sunucuda `fetch`; anahtar env'de." },
        ],
      },
      {
        title: "2. Yanıtı normalize et",
        learn: ["JSON", "Normalize"],
        question: "Dış cevabı kendi sade şemana çevirmek istemciyi neden korur?",
        tasks: [
          { goal: "Yalnızca gerekli alanları seçip sade bir yanıt dön.", tip: "İç temsil + dönüştürücü." },
        ],
      },
      {
        title: "3. Önbelleğe al",
        learn: ["Cache", "TTL"],
        question: "Önbellek için TTL seçerken tazelik ile yük arasındaki dengeyi nasıl kurarsın?",
        tasks: [
          { goal: "Aynı sorguyu kısa süre cache'le.", tip: "Bellek/Redis; anahtar = sorgu, TTL koy." },
        ],
      },
      {
        title: "4. Hata ve timeout",
        learn: ["Error Handling", "Timeout"],
        question: "Dış API yavaşsa timeout koymamak senin servisini nasıl çökertebilir?",
        tasks: [
          { goal: "Dış API hata/yavaşsa zarif bir hata dön.", tip: "try/catch + AbortController timeout." },
        ],
      },
      {
        title: "5. Tekrar dene (retry)",
        learn: ["Retry", "Idempotency"],
        question: "Geçici hatalarda retry yaparken 'exponential backoff' neden önemli?",
        tasks: [
          { goal: "Geçici hatada sınırlı sayıda yeniden dene.", tip: "Backoff + maksimum deneme." },
        ],
      },
    ],
  },
  {
    id: "be-auth-service",
    level: 2,
    track: "backend",
    project: "Kimlik Doğrulama Servisi (JWT/Session)",
    difficulty: "Kolay-Orta",
    emoji: "🔑",
    accent: "violet",
    tier: "mid",
    description:
      "Güvenli kayıt/giriş, oturum ve yetkilendirme. Amaç: parola hash'leme, token/oturum, refresh ve rol bazlı erişim.",
    skills: ["Password hashing", "JWT", "Session", "Refresh token", "RBAC", "Güvenlik"],
    steps: [
      {
        title: "1. Kayıt + parola hash",
        learn: ["Password hashing", "Güvenlik"],
        question: "Parolayı düz metin yerine neden hash'lersin; salt neye yarar?",
        tasks: [
          { goal: "Kayıt uç noktasında parolayı hash'leyerek sakla.", tip: "bcrypt/argon2; asla düz metin." },
        ],
      },
      {
        title: "2. Giriş + token",
        learn: ["JWT", "Authentication"],
        question: "JWT'nin gövdesi şifreli değildir — buraya ne koyup ne koymamalısın?",
        tasks: [
          { goal: "Doğru parolada bir erişim token'ı üret.", tip: "Hash karşılaştır → JWT imzala." },
        ],
      },
      {
        title: "3. Korumalı uç",
        learn: ["Middleware", "Authorization"],
        question: "Token doğrulamayı middleware'e almak tekrardan nasıl kurtarır?",
        tasks: [
          { goal: "Geçerli token isteyen bir middleware yaz.", tip: "Başlıktan token al, doğrula, `req.user`." },
        ],
      },
      {
        title: "4. Refresh akışı",
        learn: ["Refresh token", "Oturum"],
        question: "Kısa ömürlü access + uzun ömürlü refresh token neden birlikte kullanılır?",
        tasks: [
          { goal: "Süresi dolan access'i refresh ile yenile.", tip: "Ayrı refresh uç noktası + saklama." },
        ],
      },
      {
        title: "5. Çıkış / iptal",
        learn: ["Oturum", "Revocation"],
        question: "Stateless JWT'de 'çıkış' neden zordur; nasıl çözersin?",
        tasks: [
          { goal: "Çıkışta refresh token'ı geçersiz kıl.", tip: "Refresh'i sakla/iptal listesine al." },
        ],
      },
      {
        title: "6. Rol bazlı erişim (RBAC)",
        learn: ["RBAC", "Authorization"],
        question: "Yetkilendirme (authorization) ile kimlik doğrulama (authentication) farkı nedir?",
        tasks: [
          { goal: "Yalnızca admin'in erişebildiği bir uç ekle.", tip: "Rolü token/claim'den oku." },
        ],
      },
      {
        title: "7. Güvenlik sertleştirme",
        learn: ["Güvenlik", "Rate Limit"],
        question: "Giriş uç noktasına hız sınırı koymak hangi saldırıyı zorlaştırır?",
        tasks: [
          { goal: "Giriş denemelerini sınırla, hataları sızdırma.", tip: "Rate limit + jenerik hata mesajı." },
        ],
      },
    ],
  },
  {
    id: "be-public-api",
    level: 2,
    track: "backend",
    project: "Public API + API Key & Rate Limit",
    difficulty: "Kolay-Orta",
    emoji: "🎫",
    accent: "amber",
    tier: "mid",
    description:
      "Üçüncü tarafların kullanacağı, anahtarlı ve kotalı bir API. Amaç: anahtar üretimi, kimliklendirme, kota ve dokümantasyon.",
    skills: ["API Key", "Rate Limit", "Kota", "Versiyonlama", "Dokümantasyon", "Pagination"],
    steps: [
      {
        title: "1. Anahtar üret",
        learn: ["API Key", "Güvenlik"],
        question: "API anahtarını veritabanında düz mü yoksa hash'lenmiş mi saklamalısın, neden?",
        tasks: [
          { goal: "Kullanıcıya bir API key üret ve (hash'leyip) sakla.", tip: "Rastgele güçlü string." },
        ],
      },
      {
        title: "2. Anahtarla kimliklendir",
        learn: ["Middleware", "Authentication"],
        question: "Anahtarı başlıkta mı query'de mi taşımak daha güvenli, neden?",
        tasks: [
          { goal: "Her istekte anahtarı doğrulayan middleware yaz.", tip: "`Authorization`/özel başlık." },
        ],
      },
      {
        title: "3. Kota & hız sınırı",
        learn: ["Rate Limit", "Kota"],
        question: "Saniyelik hız sınırı ile aylık kota neden ayrı kavramlardır?",
        tasks: [
          { goal: "Anahtar başına istek hızını ve toplam kotayı uygula.", tip: "Sayaç + pencere; aşınca 429." },
        ],
      },
      {
        title: "4. Sayfalama & filtre",
        learn: ["Pagination", "Query Parameters"],
        question: "Public API'de cursor tabanlı sayfalama offset'e göre neden daha sağlam?",
        tasks: [
          { goal: "Liste uçlarına sayfalama ve filtre ekle.", tip: "`?limit=&cursor=`." },
        ],
      },
      {
        title: "5. Versiyonla",
        learn: ["Versiyonlama", "API Tasarımı"],
        question: "Kırıcı değişiklikte `/v2` açmak tüketicileri nasıl korur?",
        tasks: [
          { goal: "API'yi versiyonlanabilir hale getir.", tip: "`/v1` prefix veya başlık." },
        ],
      },
      {
        title: "6. Belgele",
        learn: ["Dokümantasyon", "OpenAPI"],
        question: "Makinece okunur bir şema (OpenAPI) elle yazılan dokümana göre neyi kazandırır?",
        tasks: [
          { goal: "Uçları bir OpenAPI tanımıyla belgele.", tip: "OpenAPI/Swagger." },
        ],
      },
    ],
  },
  {
    id: "be-media-service",
    level: 3,
    track: "backend",
    project: "Dosya & Medya Servisi",
    difficulty: "Orta",
    emoji: "🗂️",
    accent: "cyan",
    tier: "mid",
    description:
      "Dosya yükleme, saklama ve güvenli erişim. Amaç: stream upload, nesne depolama, imzalı URL ve işlem (resize).",
    skills: ["Upload", "Object Storage", "Signed URL", "Stream", "Resize", "Güvenlik"],
    steps: [
      {
        title: "1. Yükleme uç noktası",
        learn: ["Upload", "Stream"],
        question: "Büyük dosyayı tümüyle belleğe almak yerine stream etmek neden gerekir?",
        tasks: [
          { goal: "Dosya yüklenen bir uç ekle.", tip: "multipart/stream; bellekte tutma." },
        ],
      },
      {
        title: "2. Nesne depolamaya yaz",
        learn: ["Object Storage", "S3"],
        question: "Dosyayı veritabanı yerine nesne depolamada (S3) tutmak neden ölçeklenir?",
        tasks: [
          { goal: "Dosyayı bir bucket'a kaydet, anahtarını sakla.", tip: "S3/uyumlu depo." },
        ],
      },
      {
        title: "3. İmzalı URL",
        learn: ["Signed URL", "Güvenlik"],
        question: "Doğrudan public link yerine süreli imzalı URL vermek neyi korur?",
        tasks: [
          { goal: "İndirme için süreli imzalı URL üret.", tip: "Presigned URL." },
        ],
      },
      {
        title: "4. Doğrulama & limit",
        learn: ["Validation", "Güvenlik"],
        question: "Dosya türünü uzantı yerine içerikten doğrulamak neden daha güvenli?",
        tasks: [
          { goal: "Tür/boyut doğrula, tehlikeli dosyayı reddet.", tip: "MIME sniff + boyut limiti." },
        ],
      },
      {
        title: "5. Görsel işle (resize)",
        learn: ["Resize", "Background Jobs"],
        question: "Resize'ı istek anında mı arka planda mı yapmak ölçekte daha iyi?",
        tasks: [
          { goal: "Görselin küçük bir önizlemesini üret.", tip: "Senkron veya kuyrukta." },
        ],
      },
    ],
  },
  {
    id: "be-search-service",
    level: 3,
    track: "backend",
    project: "Tam Metin Arama Servisi",
    difficulty: "Orta",
    emoji: "🔎",
    accent: "lime",
    tier: "mid",
    description:
      "Hızlı, alakalı sonuç dönen bir arama API'si. Amaç: indeksleme, sorgu, sıralama (relevance) ve faceting.",
    skills: ["Indexleme", "Tokenization", "Relevance", "Faceting", "Pagination", "Performans"],
    steps: [
      {
        title: "1. Veriyi indeksle",
        learn: ["Indexleme", "Tokenization"],
        question: "Her sorguda tüm satırları taramak yerine indeks kurmak neyi hızlandırır?",
        tasks: [
          { goal: "Aranabilir alanlardan bir indeks oluştur.", tip: "DB full-text index veya arama motoru." },
        ],
      },
      {
        title: "2. Sorgu uç noktası",
        learn: ["Query Parameters", "REST"],
        question: "Kullanıcı sorgusunu normalize etmek (küçük harf, trim) neden ilk adım?",
        tasks: [
          { goal: "`?q=` ile arama yapan bir uç ekle.", tip: "Girdiyi normalize et, indeksi sorgula." },
        ],
      },
      {
        title: "3. Alaka sıralaması",
        learn: ["Relevance", "Algoritma"],
        question: "Sonuçları neye göre sıralamak (alaka skoru) tarih sırasından daha iyi olabilir?",
        tasks: [
          { goal: "Sonuçları alaka skoruna göre sırala.", tip: "Eşleşme yoğunluğu/ağırlık." },
        ],
      },
      {
        title: "4. Faceting & filtre",
        learn: ["Faceting", "filter()"],
        question: "Facet sayıları (kategori başına adet) kullanıcıya nasıl yön verir?",
        tasks: [
          { goal: "Kategoriye göre filtre ve facet sayıları dön.", tip: "Gruplayıp say." },
        ],
      },
      {
        title: "5. Sayfala & performans",
        learn: ["Pagination", "Performans"],
        question: "Arama sonuçlarını sayfalarken toplam sayıyı her seferinde hesaplamak neden pahalı olabilir?",
        tasks: [
          { goal: "Sonuçları sayfala, yanıt süresini ölç.", tip: "limit/cursor; süreyi logla." },
        ],
      },
    ],
  },
  {
    id: "be-notification-service",
    level: 3,
    track: "backend",
    project: "Bildirim Servisi (e-posta/push)",
    difficulty: "Orta",
    emoji: "📨",
    accent: "rose",
    tier: "mid",
    description:
      "Şablonlu, kuyruklu, yeniden denenebilir bir bildirim sistemi. Amaç: şablon, kuyruk, retry ve tercih yönetimi.",
    skills: ["Şablon", "Queue", "Retry", "Idempotency", "Tercih", "Webhook"],
    steps: [
      {
        title: "1. Şablon motoru",
        learn: ["Şablon", "Template"],
        question: "Mesajları şablona ayırmak (içerik vs. veri) bakımı nasıl kolaylaştırır?",
        tasks: [
          { goal: "Değişken yerleştiren bir şablon sistemi yaz.", tip: "`Merhaba {{ad}}`." },
        ],
      },
      {
        title: "2. Kuyruğa al",
        learn: ["Queue", "Async"],
        question: "Bildirimi istek içinde göndermek yerine kuyruğa almak yanıt süresini nasıl korur?",
        tasks: [
          { goal: "Gönderim işini bir kuyruğa koy.", tip: "BullMQ/benzeri; worker tüketir." },
        ],
      },
      {
        title: "3. Gönder + retry",
        learn: ["Retry", "Error Handling"],
        question: "Sağlayıcı geçici hata verince retry yapmazsan ne kaybedersin?",
        tasks: [
          { goal: "Worker'da gönder; başarısızlıkta yeniden dene.", tip: "Backoff + maksimum deneme." },
        ],
      },
      {
        title: "4. Idempotency",
        learn: ["Idempotency", "Güvenlik"],
        question: "Aynı bildirimi iki kez göndermemek için idempotency anahtarı nasıl yardımcı olur?",
        tasks: [
          { goal: "Çift gönderimi engelle.", tip: "İşlem başına benzersiz anahtar." },
        ],
      },
      {
        title: "5. Tercih & abonelikten çık",
        learn: ["Tercih", "RBAC"],
        question: "Kullanıcı tercihlerine saygı (opt-out) neden hem yasal hem etik bir gerekliliktir?",
        tasks: [
          { goal: "Kullanıcı kanal tercihlerini uygula.", tip: "Tercih tablosu; göndermeden kontrol et." },
        ],
      },
      {
        title: "6. Teslim durumu",
        learn: ["Webhook", "Event"],
        question: "Sağlayıcı webhook'larıyla teslim/bounce takibi neyi gözlemlenebilir kılar?",
        tasks: [
          { goal: "Teslim durumlarını webhook ile güncelle.", tip: "İmza doğrula → durumu yaz." },
        ],
      },
    ],
  },
  {
    id: "be-cache-jobs",
    level: 4,
    track: "backend",
    project: "Cache & Arka Plan İşleri",
    difficulty: "İleri",
    emoji: "⏱️",
    accent: "indigo",
    tier: "senior",
    description:
      "Redis cache, kuyruk, zamanlanmış işler ve idempotency. Amaç: gecikmeyi düşürmek, ağır işi arka plana almak.",
    skills: ["Redis", "Queue (BullMQ)", "Cron", "Idempotency", "Cache invalidation", "Concurrency"],
    steps: [
      {
        title: "1. Read-through cache",
        learn: ["Cache", "Redis"],
        question: "Cache-aside (read-through) deseninde 'cache miss' anında ne olur?",
        tasks: [
          { goal: "Pahalı bir sorguyu Redis ile cache'le.", tip: "Önce cache, yoksa DB→yaz." },
        ],
      },
      {
        title: "2. Geçersiz kılma (invalidation)",
        learn: ["Cache invalidation", "Consistency"],
        question: "'Bilgisayar bilimindeki iki zor şeyden biri' neden cache invalidation'dır?",
        tasks: [
          { goal: "Veri değişince ilgili cache'i temizle.", tip: "Yazınca anahtarı sil/yenile." },
        ],
      },
      {
        title: "3. Kuyruk + worker",
        learn: ["Queue (BullMQ)", "Async"],
        question: "Üretici/tüketici ayrımı (producer/worker) sistemi nasıl ölçeklenebilir kılar?",
        tasks: [
          { goal: "Ağır bir işi kuyruğa koy, worker'da işle.", tip: "BullMQ producer + worker." },
        ],
      },
      {
        title: "4. Zamanlanmış iş (cron)",
        learn: ["Cron", "Scheduling"],
        question: "Birden çok sunucu varken cron işinin yalnızca bir kez çalışmasını ne sağlar?",
        tasks: [
          { goal: "Periyodik bir temizlik/rapor işi ekle.", tip: "Cron + dağıtık kilit." },
        ],
      },
      {
        title: "5. Idempotent işleme",
        learn: ["Idempotency", "Concurrency"],
        question: "Bir iş iki kez işlenirse idempotency yan etkileri nasıl engeller?",
        tasks: [
          { goal: "İşi tekrar çalışsa da güvenli yap.", tip: "İşlenmiş id'leri işaretle." },
        ],
      },
    ],
  },
  {
    id: "be-ecommerce",
    level: 4,
    track: "backend",
    project: "E-ticaret Backend",
    difficulty: "İleri",
    emoji: "🛍️",
    accent: "emerald",
    tier: "senior",
    description:
      "Ürün, stok, sepet, sipariş ve ödeme. Amaç: ilişkiler, transaction, race condition ve tutarlılık.",
    skills: ["İlişkiler", "Transaction", "Stok yönetimi", "Race condition", "Ödeme", "Idempotency"],
    steps: [
      {
        title: "1. Ürün & stok modeli",
        learn: ["Veritabanı", "İlişkiler"],
        question: "Stok miktarını ürün satırında tutmanın eşzamanlılıkta riski nedir?",
        tasks: [
          { goal: "Ürün ve stok tablolarını tasarla.", tip: "Ürün + varyant + stok." },
        ],
      },
      {
        title: "2. Sepet",
        learn: ["CRUD", "State"],
        question: "Sepeti sunucuda mı istemcide mi tutmak hangi senaryoda gerekir?",
        tasks: [
          { goal: "Sepete ekle/çıkar uçları yap.", tip: "Kullanıcı/oturum bazlı sepet." },
        ],
      },
      {
        title: "3. Sipariş + transaction",
        learn: ["Transaction", "ACID"],
        question: "Sipariş oluştururken stok düşürme ve kayıt yazmayı tek transaction yapmak neden şart?",
        tasks: [
          { goal: "Sipariş oluştur; stok düş — hepsi ya hep ya hiç.", tip: "DB transaction." },
        ],
      },
      {
        title: "4. Race condition",
        learn: ["Race condition", "Locking"],
        question: "Son 1 ürünü aynı anda iki kişi alırsa 'oversell'i ne engeller?",
        tasks: [
          { goal: "Eşzamanlı satışta stok eksiye düşmesin.", tip: "Koşullu update veya kilit." },
        ],
      },
      {
        title: "5. Ödeme + idempotency",
        learn: ["Ödeme", "Idempotency"],
        question: "Ödeme isteği tekrar gelirse müşteriyi iki kez çekmemek için ne gerekir?",
        tasks: [
          { goal: "Ödeme başlat; çift tahsilatı engelle.", tip: "Idempotency anahtarı." },
        ],
      },
      {
        title: "6. Webhook ile doğrula",
        learn: ["Webhook", "Güvenlik"],
        question: "Ödemeyi 'başarılı' saymak için istemci dönüşüne değil webhook'a güvenmek neden gerekir?",
        tasks: [
          { goal: "Ödeme sağlayıcı webhook'uyla siparişi onayla.", tip: "İmza doğrula → durum güncelle." },
        ],
      },
    ],
  },
  {
    id: "be-booking",
    level: 4,
    track: "backend",
    project: "Rezervasyon / Booking Sistemi",
    difficulty: "İleri",
    emoji: "📆",
    accent: "sky",
    tier: "senior",
    description:
      "Çakışmasız rezervasyon, takvim ve kilit. Amaç: zaman aralığı modeli, çakışma kontrolü ve transaction.",
    skills: ["Zaman aralığı", "Çakışma kontrolü", "Locking", "Transaction", "Timezone", "İptal"],
    steps: [
      {
        title: "1. Aralık modeli",
        learn: ["Veritabanı", "Zaman aralığı"],
        question: "Rezervasyonu başlangıç+bitiş olarak tutmak çakışma sorgusunu nasıl mümkün kılar?",
        tasks: [
          { goal: "Kaynak + zaman aralığı modeli tasarla.", tip: "start/end + kaynak id." },
        ],
      },
      {
        title: "2. Çakışma kontrolü",
        learn: ["Çakışma kontrolü", "Query"],
        question: "İki aralığın çakışıp çakışmadığını anlayan koşul nedir (start<otherEnd && end>otherStart)?",
        tasks: [
          { goal: "Çakışan rezervasyonu reddet.", tip: "Aralık kesişim sorgusu." },
        ],
      },
      {
        title: "3. Eşzamanlı rezervasyon",
        learn: ["Locking", "Transaction"],
        question: "Aynı slotu iki kişi aynı anda alırsa çift rezervasyonu ne engeller?",
        tasks: [
          { goal: "Kontrol + yazmayı atomik yap.", tip: "Transaction + kilit/koşullu insert." },
        ],
      },
      {
        title: "4. Saat dilimi",
        learn: ["Timezone", "Date matematiği"],
        question: "Zamanları UTC saklayıp gösterimde dönüştürmek hangi hataları önler?",
        tasks: [
          { goal: "Zamanı UTC sakla, kullanıcı diliminde göster.", tip: "Sakla UTC, çevir gösterimde." },
        ],
      },
      {
        title: "5. İptal & politika",
        learn: ["CRUD", "İş kuralı"],
        question: "İptal penceresi gibi iş kurallarını API'de uygulamak neden istemciye bırakılmamalı?",
        tasks: [
          { goal: "İptal uç noktası + politika kontrolü ekle.", tip: "Kurali sunucuda doğrula." },
        ],
      },
    ],
  },
  {
    id: "be-graphql-trpc",
    level: 5,
    track: "backend",
    project: "Tipli API: GraphQL / tRPC",
    difficulty: "İleri",
    emoji: "🧬",
    accent: "fuchsia",
    tier: "senior",
    description:
      "Uçtan uca tip güvenli bir API. Amaç: şema, çözücüler, N+1 problemi ve dokümantasyon.",
    skills: ["GraphQL/tRPC", "Şema", "Resolver", "N+1", "DataLoader", "Tip güvenliği"],
    steps: [
      {
        title: "1. Şema tasarla",
        learn: ["Şema (Schema)", "API Tasarımı"],
        question: "GraphQL'de tipleri şemada bildirmek istemci ile sunucuyu nasıl sözleşmeyle bağlar?",
        tasks: [
          { goal: "Temel tipler ve sorguları tanımla.", tip: "Type + Query." },
        ],
      },
      {
        title: "2. Çözücüler (resolver)",
        learn: ["Resolver", "Function (Fonksiyon)"],
        question: "Bir resolver'ın `parent/args/context` parametreleri ne işe yarar?",
        tasks: [
          { goal: "Sorgu için veri dönen resolver'lar yaz.", tip: "Şemadaki her alan = bir çözücü." },
        ],
      },
      {
        title: "3. Mutation",
        learn: ["Mutation", "Validation"],
        question: "Yan etkili işlemleri ayrı bir 'mutation' tipinde tutmak neyi netleştirir?",
        tasks: [
          { goal: "Oluştur/güncelle mutation'ları ekle.", tip: "Girdi tipi + doğrulama." },
        ],
      },
      {
        title: "4. N+1 problemi",
        learn: ["N+1", "DataLoader"],
        question: "İç içe sorgularda N+1 nasıl oluşur ve DataLoader bunu nasıl çözer?",
        tasks: [
          { goal: "İlişkili veride N+1'i toplu yüklemeyle çöz.", tip: "DataLoader/batch." },
        ],
      },
      {
        title: "5. Tip güvenliği",
        learn: ["Tip güvenliği", "Codegen"],
        question: "Şemadan istemci tipleri üretmek (codegen) hataları ne zaman yakalar?",
        tasks: [
          { goal: "İstemci için tipleri üret ve kullan.", tip: "Codegen veya tRPC çıkarımı." },
        ],
      },
    ],
  },
  {
    id: "be-webhooks",
    level: 5,
    track: "backend",
    project: "Webhook & Event Sistemi",
    difficulty: "İleri",
    emoji: "📡",
    accent: "amber",
    tier: "senior",
    description:
      "Dışarıya event yayınlayan ve dışarıdan event tüketen güvenilir bir sistem. Amaç: imza, retry, dead-letter.",
    skills: ["Event", "İmza", "Retry", "Dead-letter", "Idempotency", "Güvenlik"],
    steps: [
      {
        title: "1. Event yayınla",
        learn: ["Event", "Webhook"],
        question: "Webhook gönderimini istek içinde değil arka planda yapmak neden gerekir?",
        tasks: [
          { goal: "Bir olayda abonelere webhook gönder.", tip: "Kuyruk + worker." },
        ],
      },
      {
        title: "2. İmzala",
        learn: ["İmza", "Güvenlik"],
        question: "Alıcı, gelen webhook'un gerçekten senden geldiğini imzayla nasıl doğrular?",
        tasks: [
          { goal: "Gövdeyi HMAC ile imzala, başlığa koy.", tip: "Paylaşılan sır + HMAC." },
        ],
      },
      {
        title: "3. Retry + dead-letter",
        learn: ["Retry", "Dead-letter"],
        question: "Sürekli başarısız olan webhook'u dead-letter'a almak sistemini nasıl korur?",
        tasks: [
          { goal: "Başarısız teslimleri yeniden dene, sonra DLQ'ya al.", tip: "Backoff + maksimum sonra DLQ." },
        ],
      },
      {
        title: "4. Gelen webhook tüket",
        learn: ["Idempotency", "Validation"],
        question: "Sağlayıcı aynı event'i iki kez yollarsa idempotency neden kritik?",
        tasks: [
          { goal: "Gelen webhook'u imza doğrulayıp idempotent işle.", tip: "Event id ile tekrarı engelle." },
        ],
      },
    ],
  },
  {
    id: "be-multitenant",
    level: 6,
    track: "backend",
    project: "Multi-tenant SaaS Backend",
    difficulty: "Uzman",
    emoji: "🏢",
    accent: "violet",
    tier: "staff",
    description:
      "Birden çok müşterinin (tenant) izole çalıştığı bir backend. Amaç: veri izolasyonu, plan limitleri ve güvenlik.",
    skills: ["Tenant izolasyonu", "Row-level security", "Plan limitleri", "Middleware", "Güvenlik", "Migration"],
    steps: [
      {
        title: "1. Tenant kavramı",
        learn: ["Multi-tenancy", "Veritabanı"],
        question: "Tek DB + tenant kolonu ile DB-per-tenant arasındaki ödünleşim nedir?",
        tasks: [
          { goal: "Bir izolasyon stratejisi seç ve veriyi tenant'a bağla.", tip: "Her satırda `tenantId`." },
        ],
      },
      {
        title: "2. İstekte tenant'ı çöz",
        learn: ["Middleware", "Context"],
        question: "Tenant'ı her sorguya elle eklemek yerine bağlamdan vermek hangi sızıntıyı önler?",
        tasks: [
          { goal: "İstekten tenant'ı çözen middleware yaz.", tip: "Subdomain/başlık → context." },
        ],
      },
      {
        title: "3. İzolasyonu zorla",
        learn: ["Row-level security", "Güvenlik"],
        question: "Bir tenant'ın diğerinin verisini görmesini ne kesin olarak engeller?",
        tasks: [
          { goal: "Tüm sorgulara tenant filtresini garanti et.", tip: "Repo katmanı veya RLS." },
        ],
      },
      {
        title: "4. Plan limitleri",
        learn: ["Kota", "İş kuralı"],
        question: "Plan başına limitleri (kullanıcı/sayı) sunucuda uygulamak neden gerekir?",
        tasks: [
          { goal: "Plana göre limitleri uygula.", tip: "İşlem öncesi limit kontrolü." },
        ],
      },
      {
        title: "5. Tenant'lı migration",
        learn: ["Migration", "Operasyon"],
        question: "Çok tenant'lı bir şema değişikliğini güvenli yaymanın yolu nedir?",
        tasks: [
          { goal: "Geriye uyumlu bir migration uygula.", tip: "Genişlet→taşı→daralt." },
        ],
      },
    ],
  },
  {
    id: "be-microservices",
    level: 6,
    track: "backend",
    project: "Mikroservis + API Gateway",
    difficulty: "Uzman",
    emoji: "🕸️",
    accent: "rose",
    tier: "staff",
    description:
      "Servislere bölünmüş bir sistem ve önündeki gateway. Amaç: servis ayrımı, iletişim, dayanıklılık.",
    skills: ["Servis ayrımı", "API Gateway", "Servisler arası iletişim", "Circuit breaker", "Observability", "Idempotency"],
    steps: [
      {
        title: "1. Servisleri ayır",
        learn: ["Mikroservis", "Sınır (Boundary)"],
        question: "Servis sınırını neye göre çizmek (domain) ileride acıyı azaltır?",
        tasks: [
          { goal: "İki bağımsız servise böl.", tip: "Domain'e göre ayır; ayrı veri." },
        ],
      },
      {
        title: "2. Gateway",
        learn: ["API Gateway", "Routing"],
        question: "Gateway'in tek giriş noktası olması auth/rate-limit için neyi kolaylaştırır?",
        tasks: [
          { goal: "İstekleri doğru servise yönlendiren bir gateway koy.", tip: "Yol bazlı routing." },
        ],
      },
      {
        title: "3. Servisler arası iletişim",
        learn: ["Servisler arası iletişim", "Event"],
        question: "Senkron (HTTP) ile asenkron (event) iletişimi ne zaman tercih edersin?",
        tasks: [
          { goal: "İki servisi senkron veya event ile konuştur.", tip: "HTTP çağrısı veya mesaj." },
        ],
      },
      {
        title: "4. Dayanıklılık",
        learn: ["Circuit breaker", "Retry"],
        question: "Bir servis çökünce circuit breaker zinciri çökmekten nasıl korur?",
        tasks: [
          { goal: "Çağrılara timeout + circuit breaker ekle.", tip: "Hata eşiğinde devreyi aç." },
        ],
      },
      {
        title: "5. İzlenebilirlik",
        learn: ["Observability", "Tracing"],
        question: "Servisler arası bir isteği uçtan uca izlemek için 'trace id' neden gerekir?",
        tasks: [
          { goal: "İstekleri korelasyon id'siyle izle.", tip: "Trace id'yi servisler arası taşı." },
        ],
      },
    ],
  },
  {
    id: "be-oauth",
    level: 3,
    track: "backend",
    project: "OAuth & Sosyal Giriş",
    difficulty: "Orta",
    emoji: "🪪",
    accent: "sky",
    tier: "mid",
    description:
      "Google/GitHub ile giriş ve hesap bağlama. Amaç: OAuth akışı, state/PKCE, hesap birleştirme ve güvenlik.",
    skills: ["OAuth2", "PKCE", "State", "Hesap bağlama", "Token saklama", "Güvenlik"],
    steps: [
      {
        title: "1. OAuth akışını anla",
        learn: ["OAuth2", "Authentication"],
        question: "Authorization code akışında 'code' neden token'dan daha güvenli taşınır?",
        tasks: [
          { goal: "Sağlayıcıya yönlendiren bir giriş başlat.", tip: "client_id + redirect + scope." },
        ],
      },
      {
        title: "2. State ile CSRF'i önle",
        learn: ["State", "Güvenlik"],
        question: "OAuth `state` parametresi hangi saldırıyı engeller?",
        tasks: [
          { goal: "Rastgele `state` üret, dönüşte doğrula.", tip: "Oturuma bağla, eşleşmezse reddet." },
        ],
      },
      {
        title: "3. Code'u token'a çevir",
        learn: ["OAuth2", "Server-side fetch"],
        question: "Token değişimini neden sunucuda yapmalısın, istemcide değil?",
        tasks: [
          { goal: "Dönen code'u sunucuda token ile değiştir.", tip: "Sağlayıcı token uç noktası." },
        ],
      },
      {
        title: "4. Profili getir & eşle",
        learn: ["Hesap bağlama", "Veritabanı"],
        question: "Aynı e-postayla farklı sağlayıcıdan gelen kullanıcıyı birleştirmenin riski nedir?",
        tasks: [
          { goal: "Profil bilgisini al, kullanıcıyı bul/oluştur.", tip: "Sağlayıcı id ile eşle." },
        ],
      },
      {
        title: "5. Oturum başlat",
        learn: ["Session", "JWT"],
        question: "Sosyal giriş sonrası kendi oturumunu kurmak neden gerekir?",
        tasks: [
          { goal: "Eşlemeden sonra kendi oturumunu/token'ını ver.", tip: "Kendi JWT/session." },
        ],
      },
      {
        title: "6. Hesap bağla/çöz",
        learn: ["Hesap bağlama", "CRUD"],
        question: "Bir kullanıcının birden çok sağlayıcı bağlamasını desteklemek neyi gerektirir?",
        tasks: [
          { goal: "Mevcut hesaba ikinci bir sağlayıcı bağla.", tip: "Ayrı 'bağlı hesaplar' tablosu." },
        ],
      },
    ],
  },
  {
    id: "be-comments",
    level: 2,
    track: "backend",
    project: "Yorum & Thread API",
    difficulty: "Kolay-Orta",
    emoji: "💬",
    accent: "emerald",
    tier: "mid",
    description:
      "İç içe (nested) yorumlar, oylama ve denetim. Amaç: ağaç veri modeli, sayfalama ve moderasyon.",
    skills: ["Ağaç modeli", "Nested set/path", "Oylama", "Moderasyon", "Pagination", "Soft delete"],
    steps: [
      {
        title: "1. Yorum modeli",
        learn: ["Veritabanı", "İlişkiler"],
        question: "İç içe yorumları `parentId` ile tutmak okuma sorgusunu nasıl etkiler?",
        tasks: [
          { goal: "Yorum tablosunu (parentId ile) tasarla.", tip: "Kendine referans veren FK." },
        ],
      },
      {
        title: "2. Ekle & listele",
        learn: ["CRUD", "REST"],
        question: "Yanıtı doğru parent'a bağlamak için API ne almalı?",
        tasks: [
          { goal: "Yorum/yanıt ekle ve bir gönderinin yorumlarını listele.", tip: "postId + opsiyonel parentId." },
        ],
      },
      {
        title: "3. Ağacı kur",
        learn: ["Ağaç modeli", "Algoritma"],
        question: "Düz listeyi iç içe ağaca çevirmenin verimli yolu nedir?",
        tasks: [
          { goal: "Düz yorumları parentId'ye göre ağaca dönüştür.", tip: "Map ile tek geçişte bağla." },
        ],
      },
      {
        title: "4. Oylama",
        learn: ["Concurrency", "CRUD"],
        question: "Aynı kullanıcının iki kez oy vermesini ne engeller?",
        tasks: [
          { goal: "Yukarı/aşağı oy ekle; tek oy garantile.", tip: "(kullanıcı,yorum) benzersiz." },
        ],
      },
      {
        title: "5. Moderasyon & soft delete",
        learn: ["Soft delete", "Moderasyon"],
        question: "Yorumu silmek yerine 'soft delete' yapmak thread'i neden korur?",
        tasks: [
          { goal: "Yorumu gizle ama ağaç yapısını bozma.", tip: "`deleted` bayrağı." },
        ],
      },
    ],
  },
  {
    id: "be-feature-flags",
    level: 3,
    track: "backend",
    project: "Feature Flag Servisi",
    difficulty: "Orta",
    emoji: "🚩",
    accent: "amber",
    tier: "mid",
    description:
      "Özellikleri kodu deploy etmeden açıp kapatma. Amaç: flag değerlendirme, hedefleme ve kademeli yayma.",
    skills: ["Feature flag", "Hedefleme", "Rollout", "Cache", "Audit", "Config"],
    steps: [
      {
        title: "1. Flag modeli",
        learn: ["Config", "Veritabanı"],
        question: "Flag'i koda gömmek yerine veriyle yönetmek neyi mümkün kılar?",
        tasks: [
          { goal: "Flag tanımlarını saklayan bir model yap.", tip: "key, enabled, kurallar." },
        ],
      },
      {
        title: "2. Değerlendirme uç noktası",
        learn: ["Function (Fonksiyon)", "REST"],
        question: "Flag değerlendirmesini deterministik yapmak (aynı kullanıcı = aynı sonuç) neden önemli?",
        tasks: [
          { goal: "Kullanıcı için flag'leri değerlendiren bir uç ekle.", tip: "Bağlam al → sonuç dön." },
        ],
      },
      {
        title: "3. Hedefleme",
        learn: ["Hedefleme", "İş kuralı"],
        question: "Belirli kullanıcı segmentine açmak için hangi bağlam verisi gerekir?",
        tasks: [
          { goal: "Kurala göre (ülke/plan) hedefle.", tip: "Kuralları sırayla değerlendir." },
        ],
      },
      {
        title: "4. Kademeli yayma (rollout)",
        learn: ["Rollout", "Hash/slug"],
        question: "Kullanıcıların %10'una açmayı kararlı (sticky) yapmak için ne kullanırsın?",
        tasks: [
          { goal: "Yüzdesel rollout uygula.", tip: "Kullanıcı id hash'i % 100." },
        ],
      },
      {
        title: "5. Cache & audit",
        learn: ["Cache", "Audit"],
        question: "Flag değişikliklerini denetim kaydına almak neden değerlidir?",
        tasks: [
          { goal: "Değerlendirmeyi cache'le; değişiklikleri logla.", tip: "Kısa TTL + audit kaydı." },
        ],
      },
    ],
  },
  {
    id: "be-audit-log",
    level: 3,
    track: "backend",
    project: "Denetim Kaydı (Audit Log)",
    difficulty: "Orta",
    emoji: "📜",
    accent: "violet",
    tier: "mid",
    description:
      "Kim, ne zaman, neyi değiştirdi? Değişmez bir denetim kaydı. Amaç: olay yakalama, değişmezlik ve sorgulama.",
    skills: ["Audit", "Immutability", "Event", "Sorgu", "Retention", "Güvenlik"],
    steps: [
      {
        title: "1. Olay yakala",
        learn: ["Event", "Middleware"],
        question: "Denetim olayını her uçta elle yazmak yerine merkezi yakalamanın avantajı nedir?",
        tasks: [
          { goal: "Önemli işlemlerde bir audit kaydı oluştur.", tip: "aktör, eylem, kaynak, zaman." },
        ],
      },
      {
        title: "2. Değişmezlik",
        learn: ["Immutability", "Güvenlik"],
        question: "Audit kayıtlarını güncellenemez/silinemez yapmak neden kritik?",
        tasks: [
          { goal: "Kayıtları yalnızca ekleme (append-only) yap.", tip: "Update/delete'i engelle." },
        ],
      },
      {
        title: "3. Önce/sonra değişimi",
        learn: ["Diff", "JSON"],
        question: "Değişen alanların önce/sonra halini saklamak araştırmada neyi kolaylaştırır?",
        tasks: [
          { goal: "Değişen alanların diff'ini kaydet.", tip: "Eski vs yeni alan değerleri." },
        ],
      },
      {
        title: "4. Sorgula & filtrele",
        learn: ["Query Parameters", "Pagination"],
        question: "Audit'i aktöre/kaynağa/tarihe göre indekslemek neden gerekir?",
        tasks: [
          { goal: "Filtreli, sayfalı bir audit sorgusu ekle.", tip: "İndeksli alanlar + cursor." },
        ],
      },
      {
        title: "5. Saklama politikası",
        learn: ["Retention", "Cron"],
        question: "Audit verisini sonsuza dek tutmanın maliyeti ile uyum gereği nasıl dengelenir?",
        tasks: [
          { goal: "Eski kayıtları arşivle/temizle.", tip: "Zamanlanmış retention işi." },
        ],
      },
    ],
  },
  {
    id: "be-analytics-ingest",
    level: 4,
    track: "backend",
    project: "Analitik Toplama (Ingestion)",
    difficulty: "İleri",
    emoji: "📈",
    accent: "cyan",
    tier: "senior",
    description:
      "Yüksek hacimli olay verisini toplayan bir hat. Amaç: hızlı kabul, tamponlama, toplu yazma ve geri-basınç.",
    skills: ["Ingestion", "Buffering", "Batch write", "Backpressure", "Idempotency", "Aggregation"],
    steps: [
      {
        title: "1. Hızlı kabul",
        learn: ["REST", "Performans"],
        question: "Olayı hemen işlemek yerine 'kabul et ve sonra işle' neden ölçeklenir?",
        tasks: [
          { goal: "Olayı hızla kabul edip 202 dön.", tip: "Doğrula, kuyrukla, hemen yanıtla." },
        ],
      },
      {
        title: "2. Tampon & toplu yaz",
        learn: ["Buffering", "Batch write"],
        question: "Her olayı tek tek yazmak yerine toplu yazmak DB yükünü nasıl düşürür?",
        tasks: [
          { goal: "Olayları tamponla, toplu olarak yaz.", tip: "N adet veya T süre eşiği." },
        ],
      },
      {
        title: "3. Idempotent kabul",
        learn: ["Idempotency", "Güvenlik"],
        question: "İstemci aynı olayı retry ederse çift sayımı ne engeller?",
        tasks: [
          { goal: "Olay id ile tekrarı ele.", tip: "Benzersiz olay id." },
        ],
      },
      {
        title: "4. Geri-basınç (backpressure)",
        learn: ["Backpressure", "Queue"],
        question: "Tüketici üreticiye yetişemezse sistemin çökmemesi için ne yapılır?",
        tasks: [
          { goal: "Kuyruk dolunca zarifçe yavaşlat/at.", tip: "Limit + 429 veya örnekleme." },
        ],
      },
      {
        title: "5. Toplulaştır (aggregate)",
        learn: ["Aggregation", "Cron"],
        question: "Ham olaylar yerine önceden toplulaştırılmış metrik tutmak sorguyu nasıl hızlandırır?",
        tasks: [
          { goal: "Periyodik özet metrikleri üret.", tip: "Saatlik/günlük rollup." },
        ],
      },
    ],
  },
  {
    id: "be-geo-nearby",
    level: 3,
    track: "backend",
    project: "Konum / Yakındakiler API",
    difficulty: "Orta",
    emoji: "📍",
    accent: "lime",
    tier: "mid",
    description:
      "Koordinata göre yakındaki kayıtları bulan bir API. Amaç: geospatial indeks, mesafe sorgusu ve sıralama.",
    skills: ["Geospatial", "Haversine", "Index", "Bounding box", "Pagination", "Performans"],
    steps: [
      {
        title: "1. Konumu sakla",
        learn: ["Veritabanı", "Geospatial"],
        question: "Enlem/boylamı düz sayı olarak tutmak ile geospatial tip kullanmak arasındaki fark nedir?",
        tasks: [
          { goal: "Kayıtlara konum (lat/lng) ekle.", tip: "Sayısal alanlar veya geo tipi." },
        ],
      },
      {
        title: "2. Bounding box ile daralt",
        learn: ["Bounding box", "Query"],
        question: "Önce kaba bir kutuyla filtrelemek pahalı mesafe hesabını neden azaltır?",
        tasks: [
          { goal: "Verilen noktanın çevresindeki kutuyu sorgula.", tip: "min/max lat-lng." },
        ],
      },
      {
        title: "3. Mesafe hesapla & sırala",
        learn: ["Haversine", "sort()"],
        question: "Düz Öklid mesafesi yerine Haversine neden gerekir?",
        tasks: [
          { goal: "Sonuçları gerçek mesafeye göre sırala.", tip: "Haversine formülü." },
        ],
      },
      {
        title: "4. İndeks & performans",
        learn: ["Index", "Performans"],
        question: "Geospatial indeks olmadan yakındakiler sorgusu neden yavaşlar?",
        tasks: [
          { goal: "Konum sorgusunu indeksle, süreyi ölç.", tip: "Geo index varsa kullan." },
        ],
      },
    ],
  },
  {
    id: "be-export-jobs",
    level: 3,
    track: "backend",
    project: "Büyük Veri Dışa Aktarma (Export)",
    difficulty: "Orta",
    emoji: "📦",
    accent: "indigo",
    tier: "mid",
    description:
      "Büyük bir raporu arka planda üretip indirilebilir kılan bir akış. Amaç: streaming, arka plan işi ve bildirimi.",
    skills: ["Background Jobs", "Streaming", "CSV", "Signed URL", "Progress", "Bildirim"],
    steps: [
      {
        title: "1. İşi başlat",
        learn: ["Background Jobs", "Async"],
        question: "Büyük export'u istek içinde üretmek neden zaman aşımına/çökmeye yol açar?",
        tasks: [
          { goal: "Export işini kuyruğa al, bir iş id'si dön.", tip: "202 + job id." },
        ],
      },
      {
        title: "2. Stream ederek üret",
        learn: ["Streaming", "CSV"],
        question: "Tüm veriyi belleğe almak yerine stream etmek neyi mümkün kılar?",
        tasks: [
          { goal: "Veriyi parça parça okuyup CSV'ye yaz.", tip: "Cursor + stream yazımı." },
        ],
      },
      {
        title: "3. İlerleme & durum",
        learn: ["Progress", "State"],
        question: "Uzun bir işin ilerlemesini sorgulanabilir yapmak kullanıcıya ne kazandırır?",
        tasks: [
          { goal: "İş durumunu sorgulayan bir uç ekle.", tip: "pending/running/done + yüzde." },
        ],
      },
      {
        title: "4. Sun & bildir",
        learn: ["Signed URL", "Bildirim"],
        question: "Bitince dosyayı imzalı URL ile sunmak doğrudan public linke göre neden iyi?",
        tasks: [
          { goal: "Bitince imzalı indirme linki üret, kullanıcıyı bilgilendir.", tip: "Presigned URL + bildirim." },
        ],
      },
    ],
  },
  {
    id: "be-realtime-chat",
    level: 4,
    track: "backend",
    project: "Gerçek Zamanlı Sohbet Backend",
    difficulty: "İleri",
    emoji: "🛰️",
    accent: "fuchsia",
    tier: "senior",
    description:
      "WebSocket tabanlı, oda ve presence destekli bir sohbet sunucusu. Amaç: bağlantı yönetimi, yayın ve ölçekleme.",
    skills: ["WebSocket", "Pub/Sub", "Presence", "Oda", "Ölçekleme", "Backpressure"],
    steps: [
      {
        title: "1. WebSocket bağlantısı",
        learn: ["WebSocket", "Connection"],
        question: "WebSocket, HTTP polling'e göre gerçek zamanlıda neyi kazandırır?",
        tasks: [
          { goal: "Bağlantı kabul eden bir WS sunucusu kur.", tip: "Bağlanma/ayrılmayı yönet." },
        ],
      },
      {
        title: "2. Oda ve yayın",
        learn: ["Oda", "Broadcast"],
        question: "Mesajı yalnızca aynı odadakilere göndermek için bağlantıları nasıl grupların?",
        tasks: [
          { goal: "Odaya katıl/ayrıl ve odaya yayınla.", tip: "Oda→bağlantı eşlemesi." },
        ],
      },
      {
        title: "3. Presence",
        learn: ["Presence", "State"],
        question: "Bir kullanıcının birden çok sekmesi varken 'çevrimdışı' kararını ne zaman verirsin?",
        tasks: [
          { goal: "Odadaki çevrimiçi kullanıcıları yayınla.", tip: "Sayaç/ref-count ile." },
        ],
      },
      {
        title: "4. Çok sunucuya ölçekle",
        learn: ["Pub/Sub", "Ölçekleme"],
        question: "İki ayrı sunucudaki kullanıcılar nasıl aynı odada mesajlaşır?",
        tasks: [
          { goal: "Sunucular arası mesajı Pub/Sub ile dağıt.", tip: "Redis pub/sub köprüsü." },
        ],
      },
      {
        title: "5. Dayanıklılık",
        learn: ["Backpressure", "Reconnect"],
        question: "Yavaş bir istemci sunucuyu tıkamasın diye ne yaparsın?",
        tasks: [
          { goal: "Yavaş istemciyi sınırla; kopanı temizle.", tip: "Buffer limiti + heartbeat." },
        ],
      },
    ],
  },
  {
    id: "be-health-ops",
    level: 4,
    track: "backend",
    project: "Sağlık, Metrik & Zarif Kapanış",
    difficulty: "İleri",
    emoji: "🩺",
    accent: "emerald",
    tier: "senior",
    description:
      "Üretime hazır operasyonel uçlar. Amaç: health/readiness, metrik, yapısal log ve graceful shutdown.",
    skills: ["Health check", "Readiness", "Metrics", "Structured log", "Graceful shutdown", "Observability"],
    steps: [
      {
        title: "1. Health & readiness",
        learn: ["Health check", "Readiness"],
        question: "Liveness ile readiness probe'u arasındaki fark deploy'da neyi değiştirir?",
        tasks: [
          { goal: "`/health` ve `/ready` uçları ekle.", tip: "Bağımlılık kontrolü readiness'te." },
        ],
      },
      {
        title: "2. Yapısal log",
        learn: ["Structured log", "Observability"],
        question: "Düz metin yerine JSON log üretmek aramayı/analizi nasıl kolaylaştırır?",
        tasks: [
          { goal: "İstekleri yapısal (JSON) logla.", tip: "Seviye + korelasyon id." },
        ],
      },
      {
        title: "3. Metrik yayınla",
        learn: ["Metrics", "Prometheus"],
        question: "İstek süresi/sayısı gibi metrikleri yayınlamak neyi gözlemlenebilir kılar?",
        tasks: [
          { goal: "Temel metrikleri bir `/metrics` ucunda yayınla.", tip: "Sayaç + histogram." },
        ],
      },
      {
        title: "4. Zarif kapanış",
        learn: ["Graceful shutdown", "Signal"],
        question: "SIGTERM gelince mevcut istekleri bitirip kapanmak neden önemlidir?",
        tasks: [
          { goal: "Kapanış sinyalinde yeni istegi durdur, mevcudu bitir.", tip: "Drain + kapat." },
        ],
      },
      {
        title: "5. Timeout & limit",
        learn: ["Timeout", "Güvenlik"],
        question: "Sunucuya istek/gövde boyutu limiti koymak hangi kötüye kullanımı önler?",
        tasks: [
          { goal: "İstek timeout ve gövde limiti ekle.", tip: "Orta katman limitleri." },
        ],
      },
    ],
  },
  {
    id: "be-data-retention",
    level: 3,
    track: "backend",
    project: "Soft Delete & Veri Saklama",
    difficulty: "Orta",
    emoji: "🗑️",
    accent: "rose",
    tier: "mid",
    description:
      "Silmeyi geri alınabilir yap, veri saklama ve KVKK/GDPR uyumu. Amaç: soft delete, geri yükleme ve kalıcı silme.",
    skills: ["Soft delete", "Retention", "GDPR/KVKK", "Cron", "Cascade", "Audit"],
    steps: [
      {
        title: "1. Soft delete",
        learn: ["Soft delete", "Veritabanı"],
        question: "`deletedAt` ile işaretlemek, satırı silmeye göre hangi esnekliği verir?",
        tasks: [
          { goal: "Silmeyi `deletedAt` ile işaretle.", tip: "Sorgularda silinmişleri ele." },
        ],
      },
      {
        title: "2. Varsayılan filtre",
        learn: ["Query", "Middleware"],
        question: "Silinmiş kayıtların yanlışlıkla görünmesini ne kesin olarak engeller?",
        tasks: [
          { goal: "Tüm okumalarda silinmişleri varsayılan gizle.", tip: "Ortak sorgu kapsamı (scope)." },
        ],
      },
      {
        title: "3. Geri yükle",
        learn: ["CRUD", "Audit"],
        question: "Geri yüklemede bağlı (cascade) veriyi de düşünmek neden gerekir?",
        tasks: [
          { goal: "Silinmiş kaydı geri yükle.", tip: "`deletedAt = null`; bağlıları düşün." },
        ],
      },
      {
        title: "4. Kalıcı silme & uyum",
        learn: ["GDPR/KVKK", "Cron"],
        question: "Kullanıcının 'verimi sil' talebi soft delete ile neden yeterli değildir?",
        tasks: [
          { goal: "Saklama süresi dolanı kalıcı sil.", tip: "Zamanlanmış purge işi." },
        ],
      },
    ],
  },
  {
    id: "be-migrations",
    level: 3,
    track: "backend",
    project: "Veritabanı Migration'ları",
    difficulty: "Orta",
    emoji: "🧱",
    accent: "amber",
    tier: "mid",
    description:
      "Şemayı kesintisiz evrimleştirme. Amaç: migration yazımı, geri alma, ve sıfır-kesinti (zero-downtime) değişimler.",
    skills: ["Migration", "Rollback", "Zero-downtime", "Backfill", "Genişlet-daralt", "Veri bütünlüğü"],
    steps: [
      {
        title: "1. İlk migration",
        learn: ["Migration", "Veritabanı"],
        question: "Şemayı elle değiştirmek yerine migration ile versiyonlamak neyi kazandırır?",
        tasks: [
          { goal: "Bir tablo oluşturan migration yaz ve uygula.", tip: "up/down adımları." },
        ],
      },
      {
        title: "2. Geri al (rollback)",
        learn: ["Rollback", "Operasyon"],
        question: "Her migration'ın geri alınabilir olması üretimde neden hayat kurtarır?",
        tasks: [
          { goal: "Migration'ı geri alabilir yap.", tip: "down adımını test et." },
        ],
      },
      {
        title: "3. Genişlet → taşı → daralt",
        learn: ["Genişlet-daralt", "Zero-downtime"],
        question: "Bir kolonu yeniden adlandırmayı tek adımda yapmak neden çökmeye yol açar?",
        tasks: [
          { goal: "Kırıcı değişimi üç güvenli adıma böl.", tip: "Yeni kolon ekle → kopyala → eskiyi kaldır." },
        ],
      },
      {
        title: "4. Backfill",
        learn: ["Backfill", "Batch write"],
        question: "Milyonlarca satırı tek sorguda doldurmak yerine parça parça yapmak neden iyi?",
        tasks: [
          { goal: "Yeni alanı toplu/parçalı doldur.", tip: "Sayfalı backfill." },
        ],
      },
      {
        title: "5. Bütünlük doğrula",
        learn: ["Veri bütünlüğü", "Test"],
        question: "Migration sonrası veri bütünlüğünü doğrulamak neden son adım olmalı?",
        tasks: [
          { goal: "Taşıma sonrası sayıları/örnekleri doğrula.", tip: "Önce/sonra kontrol." },
        ],
      },
    ],
  },
  {
    id: "be-testing",
    level: 3,
    track: "backend",
    project: "API Testleri (Entegrasyon & Sözleşme)",
    difficulty: "Orta",
    emoji: "🧪",
    accent: "cyan",
    tier: "mid",
    description:
      "Güvenle değiştirilebilen bir API. Amaç: birim/entegrasyon testleri, test verisi ve sözleşme testleri.",
    skills: ["Unit test", "Integration test", "Test fixtures", "Mock", "Contract test", "CI"],
    steps: [
      {
        title: "1. Birim test",
        learn: ["Unit test", "Pure Function"],
        question: "Saf iş mantığını ayırmak birim testini neden kolaylaştırır?",
        tasks: [
          { goal: "Bir iş kuralını birim testle.", tip: "Girdi→çıktı; bağımlılıksız." },
        ],
      },
      {
        title: "2. Entegrasyon testi",
        learn: ["Integration test", "Test fixtures"],
        question: "Gerçek DB'ye karşı test ile mock'a karşı test arasındaki ödünleşim nedir?",
        tasks: [
          { goal: "Bir uç noktayı uçtan uca test et.", tip: "Test DB + istek/yanıt doğrula." },
        ],
      },
      {
        title: "3. Test verisi & izolasyon",
        learn: ["Test fixtures", "İzolasyon"],
        question: "Testler birbirinin verisine dokunmasın diye ne yaparsın?",
        tasks: [
          { goal: "Her test temiz durumla başlasın.", tip: "Kurulum/temizlik (setup/teardown)." },
        ],
      },
      {
        title: "4. Hata yollarını test et",
        learn: ["Error Handling", "Test"],
        question: "Yalnızca mutlu yolu test etmek neden yanıltıcı bir güven verir?",
        tasks: [
          { goal: "Geçersiz girdi/401/404 gibi yolları test et.", tip: "Negatif senaryolar." },
        ],
      },
      {
        title: "5. CI'da çalıştır",
        learn: ["CI", "Otomasyon"],
        question: "Testleri her PR'da otomatik koşturmak regresyonu nasıl yakalar?",
        tasks: [
          { goal: "Testleri CI pipeline'ında koştur.", tip: "Push/PR'da test gate." },
        ],
      },
    ],
  },
  {
    id: "be-config-secrets",
    level: 2,
    track: "backend",
    project: "Konfigürasyon & Sır Yönetimi",
    difficulty: "Kolay-Orta",
    emoji: "🔒",
    accent: "violet",
    tier: "mid",
    description:
      "Ortamlara göre güvenli yapılandırma. Amaç: env yönetimi, sır saklama, doğrulama ve ortam ayrımı.",
    skills: ["Environment Variable", "Secrets", "Config validation", "12-factor", "Ortam ayrımı", "Güvenlik"],
    steps: [
      {
        title: "1. Konfigürasyonu dışarı al",
        learn: ["Environment Variable", "12-factor"],
        question: "Yapılandırmayı koddan ayırmak (12-factor) farklı ortamlarda neyi kolaylaştırır?",
        tasks: [
          { goal: "Ayarları env değişkenlerinden oku.", tip: "Koda gömme." },
        ],
      },
      {
        title: "2. Başlangıçta doğrula",
        learn: ["Config validation", "Şema (Schema)"],
        question: "Eksik bir env değişkenini çalışma anında değil başlangıçta yakalamak neden iyi?",
        tasks: [
          { goal: "Gerekli config'i açılışta şemayla doğrula.", tip: "Eksikse hızlı başarısız ol (fail fast)." },
        ],
      },
      {
        title: "3. Sırları sakla",
        learn: ["Secrets", "Güvenlik"],
        question: "Sırrı repoya commit'lemenin riski nedir; nereye konmalı?",
        tasks: [
          { goal: "Sırları gizli tut, `.gitignore`'a al.", tip: "Secret manager veya env." },
        ],
      },
      {
        title: "4. Ortam ayrımı",
        learn: ["Ortam ayrımı", "Operasyon"],
        question: "dev/staging/prod ayrımı yanlış ortama yazma kazasını nasıl önler?",
        tasks: [
          { goal: "Ortam başına ayrı config uygula.", tip: "NODE_ENV/ortam adı." },
        ],
      },
    ],
  },
  {
    id: "be-pagination-patterns",
    level: 2,
    track: "backend",
    project: "Sayfalama Desenleri",
    difficulty: "Kolay-Orta",
    emoji: "📑",
    accent: "sky",
    tier: "mid",
    description:
      "Liste uçları için sağlam sayfalama. Amaç: offset vs cursor, kararlılık ve performans.",
    skills: ["Pagination", "Cursor", "Offset", "Index", "Performans", "Stabilite"],
    steps: [
      {
        title: "1. Offset sayfalama",
        learn: ["Pagination", "Offset"],
        question: "Offset sayfalama büyük sayfa numaralarında neden yavaşlar?",
        tasks: [
          { goal: "`?page=&size=` ile offset sayfalama yap.", tip: "`LIMIT/OFFSET`." },
        ],
      },
      {
        title: "2. Kayma (drift) sorunu",
        learn: ["Stabilite", "Concurrency"],
        question: "Sayfalar arası gezerken yeni kayıt eklenirse offset'te ne 'kayar'?",
        tasks: [
          { goal: "Araya ekleme olunca tekrar/atlama sorununu gözlemle.", tip: "Eş zamanlı ekleme dene." },
        ],
      },
      {
        title: "3. Cursor sayfalama",
        learn: ["Cursor", "Index"],
        question: "Cursor (keyset) sayfalama drift ve performansı nasıl birlikte çözer?",
        tasks: [
          { goal: "Son görülen anahtardan devam eden cursor sayfalama yaz.", tip: "`WHERE id > cursor`." },
        ],
      },
      {
        title: "4. Tutarlı sıralama",
        learn: ["Index", "Performans"],
        question: "Cursor için sıralama alanının benzersiz/indeksli olması neden şart?",
        tasks: [
          { goal: "Sıralamayı kararlı ve indeksli yap.", tip: "Benzersiz tie-breaker ekle." },
        ],
      },
    ],
  },
];

// ════════════════════════════════════════════════════════════════
//  DEVOPS — ek projeler
// ════════════════════════════════════════════════════════════════
const devopsExtra: Level[] = [
  {
    id: "do-linux-cli",
    level: 1,
    track: "devops",
    project: "Linux & CLI Temelleri",
    difficulty: "Başlangıç",
    emoji: "🐧",
    accent: "emerald",
    tier: "junior",
    description:
      "DevOps'un toprağı: kabuk, dosya sistemi, izinler ve süreçler. Amaç: terminalde rahatça çalışmak.",
    skills: ["Shell", "Dosya sistemi", "İzinler", "Süreçler", "Paket yönetimi", "SSH"],
    steps: [
      {
        title: "1. Dosya sisteminde gez",
        learn: ["Shell", "Dosya sistemi"],
        question: "Mutlak yol ile göreli yol arasındaki fark script yazarken neden önemli?",
        tasks: [
          { goal: "Klasörler arası gez, dosya oluştur/taşı/sil.", tip: "cd, ls, mkdir, mv, rm." },
        ],
      },
      {
        title: "2. İçerik görüntüle & ara",
        learn: ["Shell", "Pipe"],
        question: "Pipe (`|`) iki komutu nasıl birbirine bağlar?",
        tasks: [
          { goal: "Bir log dosyasında bir desen ara.", tip: "cat/grep + pipe." },
        ],
      },
      {
        title: "3. İzinler",
        learn: ["İzinler", "Güvenlik"],
        question: "`chmod 755` tam olarak hangi izinleri verir?",
        tasks: [
          { goal: "Bir scripti çalıştırılabilir yap.", tip: "chmod +x; rwx mantığı." },
        ],
      },
      {
        title: "4. Süreçler",
        learn: ["Süreçler", "Signal"],
        question: "Bir süreci durdurmak için SIGTERM ile SIGKILL arasındaki fark nedir?",
        tasks: [
          { goal: "Çalışan süreçleri listele ve birini sonlandır.", tip: "ps/top, kill." },
        ],
      },
      {
        title: "5. Paket yönetimi",
        learn: ["Paket yönetimi", "Operasyon"],
        question: "Paket yöneticisi bağımlılıkları senin yerine nasıl çözer?",
        tasks: [
          { goal: "Bir araç kur ve sürümünü doğrula.", tip: "apt/yum/brew." },
        ],
      },
      {
        title: "6. SSH ile bağlan",
        learn: ["SSH", "Güvenlik"],
        question: "SSH anahtarı parolaya göre neden hem daha güvenli hem daha pratik?",
        tasks: [
          { goal: "Uzak bir makineye anahtarla bağlan.", tip: "ssh-keygen + ssh." },
        ],
      },
      {
        title: "7. Ortam değişkenleri & profil",
        learn: ["Environment Variable", "Shell"],
        question: "PATH değişkeni komutların bulunmasını nasıl sağlar?",
        tasks: [
          { goal: "Bir env değişkeni tanımla, kalıcı yap.", tip: "export + profil dosyası." },
        ],
      },
    ],
  },
  {
    id: "do-bash-scripting",
    level: 2,
    track: "devops",
    project: "Bash Scripting & Otomasyon",
    difficulty: "Kolay-Orta",
    emoji: "📜",
    accent: "lime",
    tier: "junior",
    description:
      "Tekrarlayan işleri otomatikleştir. Amaç: değişken, koşul, döngü, fonksiyon ve sağlam scriptler.",
    skills: ["Bash", "Koşul", "Döngü", "Fonksiyon", "Exit code", "set -e"],
    steps: [
      {
        title: "1. İlk script",
        learn: ["Bash", "Shell"],
        question: "Shebang (`#!/bin/bash`) satırı ne işe yarar?",
        tasks: [
          { goal: "Argüman alıp ekrana basan bir script yaz.", tip: "$1, $@." },
        ],
      },
      {
        title: "2. Koşul & exit code",
        learn: ["Koşul", "Exit code"],
        question: "Bir komutun başarısını exit code ile nasıl anlarsın (0 = ?)",
        tasks: [
          { goal: "Bir dosya var mı diye kontrol et, ona göre dallan.", tip: "if [ -f ... ]; $?." },
        ],
      },
      {
        title: "3. Döngü",
        learn: ["Döngü", "Shell"],
        question: "Dosya listesi üzerinde dönerken boşluklu adlar neden sorun çıkarır?",
        tasks: [
          { goal: "Bir klasördeki dosyaları döngüyle işle.", tip: "for/while; tırnakla." },
        ],
      },
      {
        title: "4. Fonksiyon & yeniden kullanım",
        learn: ["Fonksiyon", "Bash"],
        question: "Tekrarlayan mantığı fonksiyona almak scripti nasıl bakımlı yapar?",
        tasks: [
          { goal: "Tekrar eden işi bir fonksiyona al.", tip: "function/return." },
        ],
      },
      {
        title: "5. Sağlamlaştır",
        learn: ["set -e", "Error Handling"],
        question: "`set -euo pipefail` scriptin sessizce yanlış çalışmasını nasıl önler?",
        tasks: [
          { goal: "Scripti hata durumunda durduracak şekilde sertleştir.", tip: "set -euo pipefail." },
        ],
      },
      {
        title: "6. Zamanla (cron)",
        learn: ["Cron", "Otomasyon"],
        question: "Cron ifadesindeki beş alan neyi temsil eder?",
        tasks: [
          { goal: "Scripti periyodik çalışacak şekilde planla.", tip: "crontab -e." },
        ],
      },
    ],
  },
  {
    id: "do-git-workflow",
    level: 1,
    track: "devops",
    project: "Git İş Akışı & Branch Stratejisi",
    difficulty: "Başlangıç",
    emoji: "🌿",
    accent: "sky",
    tier: "junior",
    description:
      "Takımla çakışmadan çalışmak. Amaç: branch, PR, merge/rebase, conflict çözümü ve sürümleme.",
    skills: ["Branch", "Pull Request", "Merge/Rebase", "Conflict", "Tag/Release", "Convention"],
    steps: [
      {
        title: "1. Branch ile çalış",
        learn: ["Branch", "Git & GitHub"],
        question: "Doğrudan `main`'e commit'lemek yerine branch açmak neden iyi?",
        tasks: [
          { goal: "Bir özellik branch'i aç ve değişiklik yap.", tip: "git switch -c." },
        ],
      },
      {
        title: "2. Anlamlı commit",
        learn: ["Convention", "Git & GitHub"],
        question: "Atomik ve açıklayıcı commit'ler geçmişi okumayı nasıl kolaylaştırır?",
        tasks: [
          { goal: "Küçük, anlamlı commit'ler at.", tip: "Conventional commits." },
        ],
      },
      {
        title: "3. Pull Request",
        learn: ["Pull Request", "Code Review"],
        question: "PR'ın asıl değeri otomasyondan çok hangi insani süreçtir?",
        tasks: [
          { goal: "Branch'i PR olarak aç, açıklama yaz.", tip: "Ne/neden yazılır." },
        ],
      },
      {
        title: "4. Merge vs rebase",
        learn: ["Merge/Rebase", "Git & GitHub"],
        question: "Rebase geçmişi nasıl düzleştirir; ne zaman tehlikelidir?",
        tasks: [
          { goal: "Bir branch'i güncel main üzerine al.", tip: "merge veya rebase; paylaşılanı rebase etme." },
        ],
      },
      {
        title: "5. Conflict çöz",
        learn: ["Conflict", "Git & GitHub"],
        question: "Conflict işaretlerini (<<<< ==== >>>>) çözerken neye dikkat edersin?",
        tasks: [
          { goal: "Bilerek bir conflict oluştur ve çöz.", tip: "İki branch aynı satırı değiştirsin." },
        ],
      },
      {
        title: "6. Tag & release",
        learn: ["Tag/Release", "Semver"],
        question: "Semantik sürümlemede major/minor/patch ne zaman artar?",
        tasks: [
          { goal: "Bir sürümü tag'le ve release yap.", tip: "git tag v1.0.0." },
        ],
      },
    ],
  },
  {
    id: "do-docker",
    level: 2,
    track: "devops",
    project: "Docker'la Paketle",
    difficulty: "Kolay-Orta",
    emoji: "🐳",
    accent: "cyan",
    tier: "mid",
    description:
      "'Bende çalışıyordu'yu bitir. Amaç: image, container, volume ve verimli imaj üretimi.",
    skills: ["Image", "Container", "Dockerfile", "Volume", "Multi-stage", "Layer cache"],
    steps: [
      {
        title: "1. İlk container",
        learn: ["Container", "Image"],
        question: "Image ile container arasındaki fark sınıf-nesne benzetmesiyle nasıl açıklanır?",
        tasks: [
          { goal: "Hazır bir imajı çalıştır.", tip: "docker run." },
        ],
      },
      {
        title: "2. Dockerfile yaz",
        learn: ["Dockerfile", "Image"],
        question: "Dockerfile'daki her komutun bir 'layer' oluşturması neyi etkiler?",
        tasks: [
          { goal: "Uygulamanı imaja paketleyen bir Dockerfile yaz.", tip: "FROM/COPY/RUN/CMD." },
        ],
      },
      {
        title: "3. Layer cache",
        learn: ["Layer cache", "Performans"],
        question: "Bağımlılıkları kodtan önce kopyalamak build'i neden hızlandırır?",
        tasks: [
          { goal: "Dockerfile'ı cache dostu sırala.", tip: "Önce manifest, sonra kod." },
        ],
      },
      {
        title: "4. Multi-stage build",
        learn: ["Multi-stage", "Image"],
        question: "Multi-stage build üretim imajını neden küçültür?",
        tasks: [
          { goal: "Build ve runtime'ı ayıran bir imaj yap.", tip: "İki FROM aşaması." },
        ],
      },
      {
        title: "5. Volume & veri",
        learn: ["Volume", "Persistence"],
        question: "Container silinince veriyi kaybetmemek için volume neden gerekir?",
        tasks: [
          { goal: "Kalıcı veriyi bir volume'da tut.", tip: "-v / named volume." },
        ],
      },
      {
        title: "6. Env & port",
        learn: ["Environment Variable", "Networking"],
        question: "Konfigürasyonu imaja gömmek yerine env ile vermek neden iyi?",
        tasks: [
          { goal: "Portu yayınla, env ile yapılandır.", tip: "-p, -e/--env-file." },
        ],
      },
      {
        title: "7. Registry'e gönder",
        learn: ["Registry", "Image"],
        question: "İmajı registry'e push'lamak dağıtımı nasıl kolaylaştırır?",
        tasks: [
          { goal: "İmajı tag'leyip bir registry'e gönder.", tip: "docker tag/push." },
        ],
      },
    ],
  },
  {
    id: "do-compose",
    level: 2,
    track: "devops",
    project: "Docker Compose Çok Servis",
    difficulty: "Kolay-Orta",
    emoji: "🧩",
    accent: "indigo",
    tier: "mid",
    description:
      "Uygulama + DB + cache'i tek komutla ayağa kaldır. Amaç: servis tanımı, ağ, bağımlılık ve sağlık kontrolü.",
    skills: ["Compose", "Network", "Depends_on", "Healthcheck", "Env", "Volume"],
    steps: [
      {
        title: "1. İki servisi bağla",
        learn: ["Compose", "Network"],
        question: "Compose servisleri birbirini neden servis adıyla bulabilir?",
        tasks: [
          { goal: "App + DB'yi tek compose dosyasında tanımla.", tip: "services + ortak ağ." },
        ],
      },
      {
        title: "2. Ortam & gizli değer",
        learn: ["Env", "Secrets"],
        question: "Compose'da sırları env dosyasına almak neden repodan iyidir?",
        tasks: [
          { goal: "Servisleri env ile yapılandır.", tip: "environment/env_file." },
        ],
      },
      {
        title: "3. Volume ile kalıcılık",
        learn: ["Volume", "Persistence"],
        question: "DB verisini volume'da tutmazsan `down` sonrası ne olur?",
        tasks: [
          { goal: "DB için kalıcı volume tanımla.", tip: "named volume." },
        ],
      },
      {
        title: "4. Healthcheck & bağımlılık",
        learn: ["Healthcheck", "Depends_on"],
        question: "`depends_on` servisin 'hazır' olmasını neden garanti etmez?",
        tasks: [
          { goal: "DB hazır olmadan app başlamasın.", tip: "healthcheck + condition." },
        ],
      },
      {
        title: "5. Ölçekle & logla",
        learn: ["Compose", "Observability"],
        question: "Bir servisi birden çok kopyaya ölçeklemek neyi test eder?",
        tasks: [
          { goal: "Bir servisi ölçekle, loglarını izle.", tip: "--scale; logs -f." },
        ],
      },
    ],
  },
  {
    id: "do-cicd",
    level: 3,
    track: "devops",
    project: "CI/CD Pipeline",
    difficulty: "Orta",
    emoji: "🔁",
    accent: "amber",
    tier: "mid",
    description:
      "Her push'ta test et, derle, dağıt. Amaç: pipeline aşamaları, secrets, cache ve dağıtım kapıları.",
    skills: ["CI/CD", "GitHub Actions", "Test gate", "Secrets", "Cache", "Deploy"],
    steps: [
      {
        title: "1. İlk pipeline",
        learn: ["CI/CD", "GitHub Actions"],
        question: "CI'ın temel vaadi (her değişiklik otomatik doğrulanır) neyi erken yakalar?",
        tasks: [
          { goal: "Push'ta çalışan bir workflow ekle.", tip: "on: push; bir job." },
        ],
      },
      {
        title: "2. Test kapısı",
        learn: ["Test gate", "CI"],
        question: "Testler kırmızıyken merge'i engellemek neyi korur?",
        tasks: [
          { goal: "Testleri pipeline'da koştur, başarısızsa kır.", tip: "Test adımı + status check." },
        ],
      },
      {
        title: "3. Cache ile hızlandır",
        learn: ["Cache", "Performans"],
        question: "Bağımlılıkları cache'lemek pipeline süresini nasıl kısaltır?",
        tasks: [
          { goal: "Bağımlılık cache'i ekle.", tip: "actions/cache." },
        ],
      },
      {
        title: "4. İmaj derle & gönder",
        learn: ["Image", "Registry"],
        question: "CI'da imaj derleyip registry'e push'lamak deploy'u nasıl hazırlar?",
        tasks: [
          { goal: "Docker imajı derle, registry'e gönder.", tip: "build + push adımı." },
        ],
      },
      {
        title: "5. Secrets",
        learn: ["Secrets", "Güvenlik"],
        question: "Pipeline sırlarını loglara sızdırmamak için neye dikkat edersin?",
        tasks: [
          { goal: "Gizli değerleri güvenle kullan.", tip: "Repo/Org secrets; echo'lama." },
        ],
      },
      {
        title: "6. Dağıt (deploy)",
        learn: ["Deploy", "CD"],
        question: "Otomatik deploy ile manuel onaylı deploy hangi ortamda tercih edilir?",
        tasks: [
          { goal: "Main'e merge olunca dağıt.", tip: "Ortam + opsiyonel onay." },
        ],
      },
    ],
  },
  {
    id: "do-nginx-tls",
    level: 3,
    track: "devops",
    project: "Reverse Proxy & TLS (nginx)",
    difficulty: "Orta",
    emoji: "🔐",
    accent: "rose",
    tier: "mid",
    description:
      "Trafiği yönet ve şifrele. Amaç: reverse proxy, TLS sertifikası, sıkıştırma ve statik sunum.",
    skills: ["Reverse proxy", "TLS", "HTTPS", "Gzip", "Static serving", "Load balancing"],
    steps: [
      {
        title: "1. Reverse proxy",
        learn: ["Reverse proxy", "Networking"],
        question: "Uygulamayı doğrudan internete açmak yerine önüne proxy koymak ne kazandırır?",
        tasks: [
          { goal: "İstekleri uygulamana yönlendiren bir proxy kur.", tip: "proxy_pass." },
        ],
      },
      {
        title: "2. TLS / HTTPS",
        learn: ["TLS", "HTTPS"],
        question: "TLS el sıkışması (handshake) güveni nasıl kurar?",
        tasks: [
          { goal: "HTTPS'i ücretsiz sertifikayla aç.", tip: "Let's Encrypt/certbot." },
        ],
      },
      {
        title: "3. HTTP→HTTPS yönlendir",
        learn: ["Redirect", "Güvenlik"],
        question: "Tüm trafiği HTTPS'e zorlamak neden gereklidir?",
        tasks: [
          { goal: "HTTP isteklerini HTTPS'e yönlendir.", tip: "301 + HSTS." },
        ],
      },
      {
        title: "4. Sıkıştırma & statik",
        learn: ["Gzip", "Static serving"],
        question: "Statik dosyaları nginx'in sunması uygulamaya göre neden hızlı?",
        tasks: [
          { goal: "Gzip aç, statik dosyaları sun.", tip: "gzip on; root." },
        ],
      },
      {
        title: "5. Yük dengeleme",
        learn: ["Load balancing", "Ölçekleme"],
        question: "İstekleri birden çok kopyaya dağıtmanın stratejileri (round-robin vb.) neyi etkiler?",
        tasks: [
          { goal: "İki backend kopyasına yük dağıt.", tip: "upstream blok." },
        ],
      },
    ],
  },
  {
    id: "do-observability",
    level: 4,
    track: "devops",
    project: "Gözlemlenebilirlik (Prometheus/Grafana)",
    difficulty: "İleri",
    emoji: "📡",
    accent: "violet",
    tier: "senior",
    description:
      "Sistemin içini gör. Amaç: metrik, dashboard, log, trace ve alarm.",
    skills: ["Metrics", "Prometheus", "Grafana", "Logging", "Tracing", "Alerting"],
    steps: [
      {
        title: "1. Metrik topla",
        learn: ["Metrics", "Prometheus"],
        question: "Counter, gauge ve histogram metrik türleri neyi ölçer?",
        tasks: [
          { goal: "Uygulamadan temel metrikleri yayınla, topla.", tip: "/metrics + scrape." },
        ],
      },
      {
        title: "2. Dashboard",
        learn: ["Grafana", "Observability"],
        question: "İyi bir dashboard hangi soruyu hızlı yanıtlamalı?",
        tasks: [
          { goal: "İstek hızı/gecikme için bir panel kur.", tip: "Grafana sorgusu." },
        ],
      },
      {
        title: "3. Log topla",
        learn: ["Logging", "Structured log"],
        question: "Merkezi log toplama dağıtık bir sistemde neden şart?",
        tasks: [
          { goal: "Logları merkezi olarak toplanabilir yap.", tip: "Yapısal log + toplayıcı." },
        ],
      },
      {
        title: "4. Trace",
        learn: ["Tracing", "OpenTelemetry"],
        question: "Bir isteği servisler arası izlemek (distributed tracing) neyi ortaya çıkarır?",
        tasks: [
          { goal: "Bir isteği uçtan uca trace'le.", tip: "Trace/span id." },
        ],
      },
      {
        title: "5. Alarm & eşik",
        learn: ["Alerting", "SLO"],
        question: "Alarmı 'gürültü' olmaktan çıkaran iyi eşik nasıl seçilir?",
        tasks: [
          { goal: "Bir SLO ihlalinde alarm kur.", tip: "Eşik + bildirim kanalı." },
        ],
      },
    ],
  },
];

const devopsExtra2: Level[] = [
  {
    id: "do-terraform",
    level: 5,
    track: "devops",
    project: "Infrastructure as Code (Terraform)",
    difficulty: "İleri",
    emoji: "🏗️",
    accent: "violet",
    tier: "senior",
    description:
      "Altyapıyı tıklama yerine kodla yönet. Amaç: kaynak tanımı, state, plan/apply ve ortamlar.",
    skills: ["IaC", "Terraform", "State", "Plan/Apply", "Modül", "Ortam"],
    steps: [
      { title: "1. İlk kaynak", learn: ["IaC", "Terraform"], question: "Altyapıyı kodla tanımlamak (IaC) elle kurmaya göre neyi tekrarlanabilir kılar?", tasks: [{ goal: "Kodla bir kaynak tanımla ve oluştur.", tip: "resource bloğu; init/apply." }] },
      { title: "2. Plan/Apply döngüsü", learn: ["Plan/Apply", "Operasyon"], question: "`plan`'ın `apply`'dan önce çalışması hangi kazaları önler?", tasks: [{ goal: "Değişikliği uygulamadan önce planını incele.", tip: "terraform plan." }] },
      { title: "3. State'i anla", learn: ["State", "Terraform"], question: "Terraform state dosyası neyi izler ve neden hassastır?", tasks: [{ goal: "State'i uzak ve kilitli sakla.", tip: "Remote backend + lock." }] },
      { title: "4. Değişken & çıktı", learn: ["Variable", "Terraform"], question: "Değişken/çıktı kullanmak konfigürasyonu nasıl yeniden kullanılabilir yapar?", tasks: [{ goal: "Girdi değişkenleri ve çıktılar tanımla.", tip: "variable/output." }] },
      { title: "5. Modül", learn: ["Modül", "DRY"], question: "Tekrarlayan altyapıyı modüle almak neyi kolaylaştırır?", tasks: [{ goal: "Bir bileşeni modüle çıkar.", tip: "module bloğu." }] },
      { title: "6. Ortamlar", learn: ["Ortam", "Operasyon"], question: "dev/prod için ayrı state tutmak neden gereklidir?", tasks: [{ goal: "İki ortamı ayrı yönet.", tip: "workspace veya ayrı dizin." }] },
      { title: "7. Yık (destroy)", learn: ["Terraform", "Maliyet"], question: "Geçici ortamları `destroy` ile yok etmek maliyeti nasıl kontrol eder?", tasks: [{ goal: "Bir ortamı güvenle yık.", tip: "terraform destroy." }] },
    ],
  },
  {
    id: "do-kubernetes",
    level: 6,
    track: "devops",
    project: "Kubernetes & Ölçekleme",
    difficulty: "Uzman",
    emoji: "☸️",
    accent: "sky",
    tier: "staff",
    description:
      "Container'ları üretimde orkestrasyon. Amaç: pod/deployment/service, config, ingress ve otomatik ölçekleme.",
    skills: ["Pod", "Deployment", "Service", "Ingress", "ConfigMap/Secret", "HPA"],
    steps: [
      { title: "1. Pod & deployment", learn: ["Pod", "Deployment"], question: "Pod'u doğrudan değil Deployment ile yönetmek neyi (self-healing) sağlar?", tasks: [{ goal: "Uygulamanı bir Deployment ile çalıştır.", tip: "kubectl apply; replicas." }] },
      { title: "2. Service ile eriş", learn: ["Service", "Networking"], question: "Pod IP'leri değişkenken Service sabit erişimi nasıl sağlar?", tasks: [{ goal: "Deployment'ı bir Service ile yayınla.", tip: "ClusterIP/NodePort." }] },
      { title: "3. Config & secret", learn: ["ConfigMap/Secret", "Config"], question: "Konfigürasyonu imajdan ayırıp ConfigMap'e almak neyi kolaylaştırır?", tasks: [{ goal: "Ayarları ConfigMap/Secret ile ver.", tip: "envFrom." }] },
      { title: "4. Sağlık probe'ları", learn: ["Health check", "Readiness"], question: "liveness ve readiness probe'ları rollout'ta neyi güvenli yapar?", tasks: [{ goal: "Probe'lar ekle.", tip: "liveness/readiness." }] },
      { title: "5. Ingress", learn: ["Ingress", "TLS"], question: "Ingress birden çok servisi tek giriş/host altında nasıl toplar?", tasks: [{ goal: "Dışarıya ingress ile aç.", tip: "host/path kuralları." }] },
      { title: "6. Rollout & rollback", learn: ["Deploy", "Rollback"], question: "Rolling update kesintisiz dağıtımı nasıl sağlar?", tasks: [{ goal: "Yeni sürüm dağıt, gerekirse geri al.", tip: "rollout status/undo." }] },
      { title: "7. Otomatik ölçekle (HPA)", learn: ["HPA", "Ölçekleme"], question: "HPA hangi metriğe göre kopya sayısını ayarlar?", tasks: [{ goal: "CPU'ya göre otomatik ölçekle.", tip: "HorizontalPodAutoscaler." }] },
      { title: "8. Kaynak limitleri", learn: ["Resource limits", "Operasyon"], question: "request/limit vermemek bir 'gürültülü komşu'ya nasıl yol açar?", tasks: [{ goal: "CPU/bellek request ve limit koy.", tip: "resources." }] },
    ],
  },
  {
    id: "do-helm",
    level: 5,
    track: "devops",
    project: "Helm ile Paketleme",
    difficulty: "İleri",
    emoji: "⎈",
    accent: "indigo",
    tier: "senior",
    description:
      "Kubernetes manifestlerini paketle ve şablonla. Amaç: chart, values, template ve sürüm yönetimi.",
    skills: ["Helm", "Chart", "Template", "Values", "Release", "Rollback"],
    steps: [
      { title: "1. Chart oluştur", learn: ["Helm", "Chart"], question: "Helm chart birçok manifesti tek paket yapmanın faydası nedir?", tasks: [{ goal: "Uygulaman için bir chart oluştur.", tip: "helm create." }] },
      { title: "2. Şablonla", learn: ["Template", "DRY"], question: "Manifestleri şablonlamak ortamlar arası tekrarı nasıl önler?", tasks: [{ goal: "Değişen değerleri template'le.", tip: "{{ .Values.x }}." }] },
      { title: "3. Values ile yapılandır", learn: ["Values", "Config"], question: "values.yaml farklı ortamlar için neyi kolaylaştırır?", tasks: [{ goal: "Ortam başına values dosyası kullan.", tip: "-f values-prod.yaml." }] },
      { title: "4. Kur & yükselt", learn: ["Release", "Deploy"], question: "Helm release kavramı sürüm takibini nasıl sağlar?", tasks: [{ goal: "Chart'ı kur ve yükselt.", tip: "helm install/upgrade." }] },
      { title: "5. Geri al", learn: ["Rollback", "Operasyon"], question: "Bozuk bir sürümü Helm ile anında geri almak neyi kurtarır?", tasks: [{ goal: "Önceki sürüme dön.", tip: "helm rollback." }] },
    ],
  },
  {
    id: "do-gitops",
    level: 6,
    track: "devops",
    project: "GitOps (ArgoCD)",
    difficulty: "Uzman",
    emoji: "🔃",
    accent: "emerald",
    tier: "staff",
    description:
      "Git, üretimin tek doğru kaynağı. Amaç: deklaratif dağıtım, otomatik sync ve drift tespiti.",
    skills: ["GitOps", "ArgoCD", "Declarative", "Sync", "Drift", "Rollback"],
    steps: [
      { title: "1. Deklaratif kaynak", learn: ["GitOps", "Declarative"], question: "İstenen durumu Git'te tutmak 'nasıl' yerine 'ne' demenin avantajı nedir?", tasks: [{ goal: "Cluster durumunu bir repo'da tanımla.", tip: "Manifest repo." }] },
      { title: "2. Otomatik sync", learn: ["Sync", "ArgoCD"], question: "Git'e merge'in otomatik dağıtıma dönüşmesi süreci nasıl sadeleştirir?", tasks: [{ goal: "Repo değişince cluster'ı senkronla.", tip: "Application + auto-sync." }] },
      { title: "3. Drift tespiti", learn: ["Drift", "Consistency"], question: "Birinin elle yaptığı değişikliği (drift) GitOps nasıl yakalar/düzeltir?", tasks: [{ goal: "Drift'i tespit edip geri al.", tip: "self-heal." }] },
      { title: "4. Rollback", learn: ["Rollback", "Git & GitHub"], question: "GitOps'ta geri almak neden sadece bir git revert'tir?", tasks: [{ goal: "Bozuk değişikliği geri al.", tip: "git revert → sync." }] },
      { title: "5. Çok ortam", learn: ["Ortam", "GitOps"], question: "Promotion'ı (dev→prod) Git akışıyla yönetmek neyi denetlenebilir kılar?", tasks: [{ goal: "Ortamlar arası promosyonu kur.", tip: "Branch/dizin başına ortam." }] },
    ],
  },
  {
    id: "do-ansible",
    level: 4,
    track: "devops",
    project: "Konfigürasyon Yönetimi (Ansible)",
    difficulty: "İleri",
    emoji: "🛠️",
    accent: "amber",
    tier: "senior",
    description:
      "Sunucuları tekrarlanabilir biçimde yapılandır. Amaç: playbook, idempotency, envanter ve roller.",
    skills: ["Ansible", "Playbook", "Idempotency", "Inventory", "Role", "Template"],
    steps: [
      { title: "1. İlk playbook", learn: ["Ansible", "Playbook"], question: "Ansible'ın ajan gerektirmemesi (agentless) kurulumu nasıl basitleştirir?", tasks: [{ goal: "Bir paket kuran playbook yaz.", tip: "tasks + module." }] },
      { title: "2. Idempotency", learn: ["Idempotency", "Operasyon"], question: "Playbook'u iki kez çalıştırınca aynı sonucu vermesi neden kritik?", tasks: [{ goal: "Tekrar çalışınca değişiklik yapmasın.", tip: "Durum-temelli modüller." }] },
      { title: "3. Envanter", learn: ["Inventory", "Operasyon"], question: "Sunucuları gruplara ayırmak (web/db) hedeflemeyi nasıl kolaylaştırır?", tasks: [{ goal: "Sunucuları envantere grupla.", tip: "inventory + groups." }] },
      { title: "4. Değişken & template", learn: ["Template", "Variable"], question: "Config dosyalarını template'lemek ortam farklarını nasıl yönetir?", tasks: [{ goal: "Bir config dosyasını template ile üret.", tip: "Jinja2 template." }] },
      { title: "5. Rol", learn: ["Role", "DRY"], question: "Playbook'ları role'e bölmek yeniden kullanımı nasıl artırır?", tasks: [{ goal: "Tekrar eden işi bir role'e al.", tip: "roles/ yapısı." }] },
    ],
  },
  {
    id: "do-vault",
    level: 5,
    track: "devops",
    project: "Sır Yönetimi (Vault)",
    difficulty: "İleri",
    emoji: "🗝️",
    accent: "rose",
    tier: "senior",
    description:
      "Sırları merkezi ve denetlenebilir yönet. Amaç: gizli saklama, dinamik sırlar, rotasyon ve erişim politikası.",
    skills: ["Secrets", "Vault", "Rotation", "Policy", "Dynamic secrets", "Audit"],
    steps: [
      { title: "1. Sır sakla & oku", learn: ["Secrets", "Vault"], question: "Sırları env yerine merkezi bir kasada tutmak neyi kazandırır?", tasks: [{ goal: "Bir sırrı kasaya yaz ve oku.", tip: "kv secret engine." }] },
      { title: "2. Erişim politikası", learn: ["Policy", "Güvenlik"], question: "En az yetki ilkesi (least privilege) sır erişiminde neden esastır?", tasks: [{ goal: "Yalnızca gerekli yolu açan politika yaz.", tip: "policy + token." }] },
      { title: "3. Dinamik sırlar", learn: ["Dynamic secrets", "Vault"], question: "Kısa ömürlü dinamik DB kimliği statik paroladan neden güvenli?", tasks: [{ goal: "Dinamik bir DB kimliği üret.", tip: "database secrets engine." }] },
      { title: "4. Rotasyon", learn: ["Rotation", "Güvenlik"], question: "Sır rotasyonu sızıntı riskini nasıl sınırlar?", tasks: [{ goal: "Bir sırrı periyodik döndür.", tip: "TTL/rotate." }] },
      { title: "5. Denetim", learn: ["Audit", "Observability"], question: "Sır erişimini denetlemek bir ihlalde neyi mümkün kılar?", tasks: [{ goal: "Erişim denetim kaydını aç.", tip: "audit device." }] },
    ],
  },
  {
    id: "do-deploy-strategies",
    level: 5,
    track: "devops",
    project: "Dağıtım Stratejileri (Blue-Green/Canary)",
    difficulty: "İleri",
    emoji: "🎯",
    accent: "lime",
    tier: "senior",
    description:
      "Kesintisiz ve düşük riskli dağıtım. Amaç: blue-green, canary, feature flag ve otomatik geri alma.",
    skills: ["Blue-green", "Canary", "Zero-downtime", "Rollback", "Health gate", "Traffic shifting"],
    steps: [
      { title: "1. Zero-downtime temeli", learn: ["Zero-downtime", "Deploy"], question: "Rolling update kesintiyi nasıl sıfıra yaklaştırır?", tasks: [{ goal: "Kesintisiz bir rolling dağıtım yap.", tip: "Kademeli kopya değişimi." }] },
      { title: "2. Blue-green", learn: ["Blue-green", "Traffic shifting"], question: "İki ortam (mavi/yeşil) anında geri almayı nasıl mümkün kılar?", tasks: [{ goal: "Trafiği yeni ortama anında çevir.", tip: "Yönlendirmeyi değiştir." }] },
      { title: "3. Canary", learn: ["Canary", "Traffic shifting"], question: "Trafiğin %5'ini yeni sürüme vermek riski nasıl sınırlar?", tasks: [{ goal: "Trafiğin küçük bir kısmını yeni sürüme yönlendir.", tip: "Ağırlıklı routing." }] },
      { title: "4. Sağlık kapısı", learn: ["Health gate", "Observability"], question: "Canary'i otomatik ilerletmek için hangi sinyaller izlenir?", tasks: [{ goal: "Hata oranı yükselirse ilerlemeyi durdur.", tip: "Metrik eşiği." }] },
      { title: "5. Otomatik geri alma", learn: ["Rollback", "Otomasyon"], question: "Kötü bir sürümü otomatik geri almak gece nöbetini nasıl kolaylaştırır?", tasks: [{ goal: "Eşik aşılınca otomatik geri al.", tip: "Alarm → rollback." }] },
      { title: "6. Flag ile ayır", learn: ["Feature flag", "Deploy"], question: "Dağıtımı (deploy) yayından (release) ayırmak neyi esnetir?", tasks: [{ goal: "Özelliği flag ardında dağıt, sonra aç.", tip: "Deploy ≠ release." }] },
    ],
  },
  {
    id: "do-backup-dr",
    level: 5,
    track: "devops",
    project: "Yedekleme & Felaket Kurtarma",
    difficulty: "İleri",
    emoji: "🛟",
    accent: "cyan",
    tier: "senior",
    description:
      "En kötü güne hazırlık. Amaç: yedekleme, geri yükleme tatbikatı, RTO/RPO ve çoklu bölge.",
    skills: ["Backup", "Restore", "RTO/RPO", "Replication", "Tatbikat", "Otomasyon"],
    steps: [
      { title: "1. Otomatik yedek", learn: ["Backup", "Cron"], question: "Yedeği otomatikleştirmemek hangi insan hatasına davetiye çıkarır?", tasks: [{ goal: "DB için zamanlanmış yedek kur.", tip: "Cron + depo." }] },
      { title: "2. Geri yükle (gerçekten)", learn: ["Restore", "Tatbikat"], question: "'Test edilmemiş yedek = yedek yok' sözü neyi vurgular?", tasks: [{ goal: "Yedeği temiz ortama geri yükle.", tip: "Restore tatbikatı." }] },
      { title: "3. RTO/RPO", learn: ["RTO/RPO", "İş kuralı"], question: "RTO ile RPO neyi ölçer ve maliyeti nasıl belirler?", tasks: [{ goal: "Hedef RTO/RPO belirle.", tip: "Kabul edilebilir kayıp/süre." }] },
      { title: "4. Çoklu bölge replikasyon", learn: ["Replication", "Ölçekleme"], question: "Veriyi başka bölgeye kopyalamak bölge çökmesinde neyi korur?", tasks: [{ goal: "Veriyi ikinci bölgeye replikle.", tip: "Cross-region replikasyon." }] },
      { title: "5. Runbook", learn: ["Runbook", "Operasyon"], question: "Kriz anında bir runbook neden 'hafızadan iyidir'?", tasks: [{ goal: "Kurtarma adımlarını runbook'a yaz.", tip: "Adım adım." }] },
      { title: "6. Tatbikat (game day)", learn: ["Tatbikat", "Chaos"], question: "Planlı bir felaket tatbikatı gerçek krizde neyi azaltır?", tasks: [{ goal: "Bir failover tatbikatı yap.", tip: "Bilerek bir parçayı düşür." }] },
    ],
  },
  {
    id: "do-security-hardening",
    level: 6,
    track: "devops",
    project: "Güvenlik Sertleştirme",
    difficulty: "Uzman",
    emoji: "🛡️",
    accent: "rose",
    tier: "staff",
    description:
      "Saldırı yüzeyini küçült. Amaç: en az yetki, imaj tarama, SBOM, ağ politikası ve gizli tarama.",
    skills: ["Least privilege", "Image scanning", "SBOM", "Network policy", "Secret scanning", "Hardening"],
    steps: [
      { title: "1. En az yetki", learn: ["Least privilege", "Güvenlik"], question: "Container'ı root olmayan kullanıcıyla çalıştırmak neyi azaltır?", tasks: [{ goal: "Servisleri en az yetkiyle çalıştır.", tip: "non-root user." }] },
      { title: "2. İmaj tarama", learn: ["Image scanning", "CI"], question: "İmajdaki bilinen açıkları CI'da taramak neyi erken yakalar?", tasks: [{ goal: "İmajı zafiyet için tara.", tip: "Trivy/grype CI adımı." }] },
      { title: "3. SBOM", learn: ["SBOM", "Tedarik zinciri"], question: "Yazılım malzeme listesi (SBOM) bir açık çıkınca neyi hızlandırır?", tasks: [{ goal: "Bir SBOM üret ve sakla.", tip: "syft/SBOM aracı." }] },
      { title: "4. Gizli tarama", learn: ["Secret scanning", "Güvenlik"], question: "Repoya sızan bir sırrı taramak neden sürekli olmalı?", tasks: [{ goal: "Commit'lerde sır taraması kur.", tip: "Pre-commit/CI tarayıcı." }] },
      { title: "5. Ağ politikası", learn: ["Network policy", "Networking"], question: "Servisler arası trafiği varsayılan kapalı yapmak (deny-by-default) neyi sınırlar?", tasks: [{ goal: "Yalnızca gerekli trafiğe izin ver.", tip: "NetworkPolicy/firewall." }] },
      { title: "6. Güvenlik başlıkları & TLS", learn: ["Hardening", "TLS"], question: "Güvenlik başlıkları (HSTS/CSP) tarayıcı tarafında neyi korur?", tasks: [{ goal: "Temel güvenlik başlıklarını ekle.", tip: "HSTS/CSP." }] },
    ],
  },
  {
    id: "do-cloud-fundamentals",
    level: 4,
    track: "devops",
    project: "Bulut Temelleri (IAM/Ağ/Hesap)",
    difficulty: "İleri",
    emoji: "🌩️",
    accent: "sky",
    tier: "senior",
    description:
      "Bir bulutta güvenle çalışmanın temeli. Amaç: IAM, ağ (VPC), hesap hijyeni ve maliyet farkındalığı.",
    skills: ["IAM", "VPC", "Security group", "Region/AZ", "Billing", "Least privilege"],
    steps: [
      { title: "1. IAM & roller", learn: ["IAM", "Least privilege"], question: "Kök (root) hesabı günlük kullanmamak neden ilk kuraldır?", tasks: [{ goal: "Sınırlı yetkili bir kullanıcı/rol oluştur.", tip: "En az yetki." }] },
      { title: "2. Ağ (VPC)", learn: ["VPC", "Networking"], question: "Public/private subnet ayrımı neyi korur?", tasks: [{ goal: "Bir özel ağ ve alt ağlar tanımla.", tip: "VPC + subnet." }] },
      { title: "3. Güvenlik grupları", learn: ["Security group", "Güvenlik"], question: "Güvenlik grubu (stateful firewall) varsayılan kapalı neden iyi?", tasks: [{ goal: "Yalnızca gerekli portları aç.", tip: "Inbound/outbound kuralları." }] },
      { title: "4. Bölge & erişilebilirlik", learn: ["Region/AZ", "Dayanıklılık"], question: "Çok AZ dağıtım tek bir veri merkezi çökmesinde neyi korur?", tasks: [{ goal: "Kaynağı çok AZ'ye yay.", tip: "AZ farkındalığı." }] },
      { title: "5. Maliyet farkındalığı", learn: ["Billing", "Maliyet"], question: "Etiketleme (tagging) ve bütçe alarmı sürpriz faturayı nasıl önler?", tasks: [{ goal: "Bütçe alarmı ve etiketleme kur.", tip: "Cost alarmı." }] },
      { title: "6. Hesap hijyeni", learn: ["IAM", "Güvenlik"], question: "MFA ve anahtar rotasyonu hesap güvenliğini nasıl artırır?", tasks: [{ goal: "MFA aç, erişim anahtarlarını döndür.", tip: "MFA + rotation." }] },
      { title: "7. Altyapıyı kodla", learn: ["IaC", "Terraform"], question: "Bulut kaynaklarını konsoldan değil koddan yönetmek neyi tekrarlanabilir kılar?", tasks: [{ goal: "Bir kaynağı IaC ile tanımla.", tip: "Terraform/CloudFormation." }] },
    ],
  },
  {
    id: "do-serverless",
    level: 4,
    track: "devops",
    project: "Serverless Dağıtım",
    difficulty: "İleri",
    emoji: "⚡",
    accent: "amber",
    tier: "senior",
    description:
      "Sunucu yönetmeden çalıştır. Amaç: fonksiyon dağıtımı, soğuk başlangıç, tetikleyiciler ve maliyet.",
    skills: ["Serverless", "Function", "Cold start", "Trigger", "Maliyet", "IaC"],
    steps: [
      { title: "1. İlk fonksiyon", learn: ["Serverless", "Function"], question: "Serverless'ta 'ölçek sıfıra' ne demek ve ne zaman avantaj?", tasks: [{ goal: "Bir HTTP fonksiyonu dağıt.", tip: "Function + endpoint." }] },
      { title: "2. Tetikleyiciler", learn: ["Trigger", "Event"], question: "Olay tetikleyiciler (kuyruk/zamanlayıcı) sunucu beklemeden neyi sağlar?", tasks: [{ goal: "Bir olayla tetiklenen fonksiyon yaz.", tip: "Queue/schedule trigger." }] },
      { title: "3. Soğuk başlangıç", learn: ["Cold start", "Performans"], question: "Cold start gecikmesini azaltmanın yolları nelerdir?", tasks: [{ goal: "Soğuk başlangıcı ölç ve azalt.", tip: "Boyut/min instance." }] },
      { title: "4. Konfigürasyon & sır", learn: ["Secrets", "Config"], question: "Fonksiyona sırları güvenle vermenin yolu nedir?", tasks: [{ goal: "Ortam/sır yönetimini bağla.", tip: "Secret manager." }] },
      { title: "5. Maliyet & limit", learn: ["Maliyet", "Operasyon"], question: "İstek başına ödeme modelinde maliyeti ne sürükler?", tasks: [{ goal: "Eşzamanlılık/zaman limiti ayarla.", tip: "Concurrency/timeout." }] },
    ],
  },
  {
    id: "do-incident-response",
    level: 6,
    track: "devops",
    project: "Olay Müdahalesi & Postmortem",
    difficulty: "Uzman",
    emoji: "🚨",
    accent: "rose",
    tier: "staff",
    description:
      "Bir şey yandığında ne yapılır? Amaç: alarm, on-call, müdahale akışı ve suçlamasız postmortem.",
    skills: ["On-call", "Alerting", "Incident", "Postmortem", "SLO", "Runbook"],
    steps: [
      { title: "1. Anlamlı alarm", learn: ["Alerting", "SLO"], question: "Kullanıcıyı etkileyen olaya alarm vermek, makine metriğine göre neden iyi?", tasks: [{ goal: "Sayfalayan (paging) alarmı semptoma bağla.", tip: "Symptom-based alert." }] },
      { title: "2. On-call & eskalasyon", learn: ["On-call", "Operasyon"], question: "Eskalasyon zinciri neden tek kişiye bağımlılığı kırar?", tasks: [{ goal: "Bir on-call/eskalasyon planı kur.", tip: "Rota + yedek." }] },
      { title: "3. Müdahale akışı", learn: ["Incident", "Runbook"], question: "Olayda 'incident commander' rolü kaosu nasıl azaltır?", tasks: [{ goal: "Bir müdahale akışını uygula.", tip: "Tespit→azalt→çöz." }] },
      { title: "4. Azalt (mitigate) önce", learn: ["Incident", "Rollback"], question: "Kök nedeni bulmadan önce etkiyi azaltmak (rollback) neden doğru?", tasks: [{ goal: "Önce etkiyi durdur.", tip: "Rollback/flag kapat." }] },
      { title: "5. Postmortem", learn: ["Postmortem", "Kültür"], question: "Suçlamasız (blameless) postmortem öğrenmeyi nasıl artırır?", tasks: [{ goal: "Zaman çizelgesi + aksiyonlu postmortem yaz.", tip: "Kişi değil sistem." }] },
    ],
  },
];

const devopsExtra3: Level[] = [
  {
    id: "do-dns-networking",
    level: 3,
    track: "devops",
    project: "DNS & Ağ Temelleri",
    difficulty: "Orta",
    emoji: "🌐",
    accent: "sky",
    tier: "mid",
    description:
      "İnternetin adres defteri ve trafiğin yolu. Amaç: DNS kayıtları, TLS zinciri, portlar ve hata ayıklama.",
    skills: ["DNS", "TCP/IP", "TLS", "Port", "Firewall", "Troubleshooting"],
    steps: [
      { title: "1. DNS kayıtları", learn: ["DNS", "Networking"], question: "A, CNAME ve TXT kayıtları sırasıyla neyi çözer?", tasks: [{ goal: "Bir alan adını bir IP'ye yönlendir.", tip: "A/CNAME kaydı." }] },
      { title: "2. TTL & yayılım", learn: ["DNS", "Cache"], question: "DNS TTL düşük/yüksek olmasının değişiklik anında etkisi nedir?", tasks: [{ goal: "Bir kaydı değiştir, yayılımı gözlemle.", tip: "dig/nslookup + TTL." }] },
      { title: "3. Portlar & dinleme", learn: ["Port", "TCP/IP"], question: "Bir servisin hangi portu dinlediğini nasıl doğrularsın?", tasks: [{ goal: "Açık portları kontrol et.", tip: "ss/netstat/curl." }] },
      { title: "4. TLS zinciri", learn: ["TLS", "Güvenlik"], question: "Sertifika zinciri (chain of trust) tarayıcıyı nasıl ikna eder?", tasks: [{ goal: "Bir sitenin sertifika zincirini incele.", tip: "openssl s_client." }] },
      { title: "5. Firewall", learn: ["Firewall", "Güvenlik"], question: "Varsayılan-kapalı bir firewall politikası neden tercih edilir?", tasks: [{ goal: "Yalnızca gerekli portlara izin ver.", tip: "ufw/iptables/SG." }] },
      { title: "6. Ağ sorun giderme", learn: ["Troubleshooting", "Networking"], question: "'Çalışmıyor' derken DNS mi, ağ mı, uygulama mı olduğunu nasıl ayırırsın?", tasks: [{ goal: "Katman katman teşhis koy.", tip: "ping→dig→curl→loglar." }] },
      { title: "7. Latency & MTU", learn: ["Performans", "Networking"], question: "Gecikme (latency) ile bant genişliği farkı kullanıcı deneyiminde neyi belirler?", tasks: [{ goal: "Uçtan uca gecikmeyi ölç.", tip: "ping/traceroute." }] },
    ],
  },
  {
    id: "do-service-mesh",
    level: 6,
    track: "devops",
    project: "Service Mesh",
    difficulty: "Uzman",
    emoji: "🕸️",
    accent: "violet",
    tier: "staff",
    description:
      "Servisler arası iletişimi platforma devret. Amaç: sidecar, mTLS, trafik yönetimi ve gözlemlenebilirlik.",
    skills: ["Service mesh", "Sidecar", "mTLS", "Traffic policy", "Retry/timeout", "Observability"],
    steps: [
      { title: "1. Sidecar deseni", learn: ["Sidecar", "Service mesh"], question: "İletişim mantığını uygulamadan sidecar'a almak neyi merkezîleştirir?", tasks: [{ goal: "Servislere sidecar proxy enjekte et.", tip: "Mesh injection." }] },
      { title: "2. mTLS", learn: ["mTLS", "Güvenlik"], question: "Servisler arası karşılıklı TLS (mTLS) neyi garanti eder?", tasks: [{ goal: "Servis trafiğini mTLS ile şifrele.", tip: "Mesh mTLS politikası." }] },
      { title: "3. Trafik yönetimi", learn: ["Traffic policy", "Canary"], question: "Mesh ile yüzdesel trafik kaydırma uygulama koduna neden dokunmaz?", tasks: [{ goal: "Trafiği sürümler arası böl.", tip: "Traffic split." }] },
      { title: "4. Dayanıklılık", learn: ["Retry/timeout", "Circuit breaker"], question: "Retry/timeout/circuit breaker'ı mesh'te tanımlamak neyi standartlaştırır?", tasks: [{ goal: "Çağrılara timeout/retry politikası ver.", tip: "Mesh policy." }] },
      { title: "5. Gözlemlenebilirlik", learn: ["Observability", "Tracing"], question: "Mesh 'bedava' telemetri verirken yine de ne maliyeti vardır?", tasks: [{ goal: "Servis grafiği ve metriklerini incele.", tip: "Mesh dashboard." }] },
      { title: "6. Karmaşıklık ödünü", learn: ["Service mesh", "Operasyon"], question: "Mesh ne zaman gereğinden fazla mühendislik (over-engineering) olur?", tasks: [{ goal: "Mesh ihtiyacını gerekçelendir.", tip: "Fayda/maliyet." }] },
    ],
  },
  {
    id: "do-db-ops",
    level: 5,
    track: "devops",
    project: "Veritabanı Operasyonları",
    difficulty: "İleri",
    emoji: "💽",
    accent: "amber",
    tier: "senior",
    description:
      "Üretim DB'sini sağlıklı tut. Amaç: indeks, yavaş sorgu, bağlantı havuzu, replikasyon ve failover.",
    skills: ["Index", "Slow query", "Connection pool", "Replication", "Failover", "Vacuum/Maintenance"],
    steps: [
      { title: "1. Yavaş sorgu avı", learn: ["Slow query", "Performans"], question: "Yavaş sorguyu bulmak için EXPLAIN planı neyi gösterir?", tasks: [{ goal: "Bir yavaş sorguyu tespit et.", tip: "Slow log + EXPLAIN." }] },
      { title: "2. İndeksle", learn: ["Index", "Performans"], question: "Her şeyi indekslemek neden yazma performansına zarar verir?", tasks: [{ goal: "Doğru indeksi ekle, etkisini ölç.", tip: "Seçici kolon." }] },
      { title: "3. Bağlantı havuzu", learn: ["Connection pool", "Concurrency"], question: "Sınırsız bağlantı açmak DB'yi nasıl çökertir?", tasks: [{ goal: "Bir bağlantı havuzu yapılandır.", tip: "Pool boyutu." }] },
      { title: "4. Replikasyon", learn: ["Replication", "Ölçekleme"], question: "Okuma replikası okuma yükünü dağıtırken hangi tutarlılık ödünü gelir?", tasks: [{ goal: "Bir okuma replikası kur.", tip: "Primary→replica." }] },
      { title: "5. Failover", learn: ["Failover", "Dayanıklılık"], question: "Primary çökünce otomatik failover veri kaybını nasıl sınırlar?", tasks: [{ goal: "Failover senaryosunu test et.", tip: "Primary'i düşür." }] },
      { title: "6. Bakım", learn: ["Vacuum/Maintenance", "Operasyon"], question: "Düzenli bakım (vacuum/analyze) zamanla neyi önler?", tasks: [{ goal: "Periyodik bakım planla.", tip: "Bakım penceresi." }] },
      { title: "7. Yedek & PITR", learn: ["Backup", "Restore"], question: "Point-in-time recovery (PITR) klasik yedeğe göre neyi ekler?", tasks: [{ goal: "Belirli bir ana geri dönmeyi dene.", tip: "WAL/binlog." }] },
    ],
  },
  {
    id: "do-load-testing",
    level: 4,
    track: "devops",
    project: "Yük Testi & Kapasite Planlama",
    difficulty: "İleri",
    emoji: "🏋️",
    accent: "lime",
    tier: "senior",
    description:
      "Sistemin sınırını üretimden önce öğren. Amaç: yük profili, darboğaz tespiti ve kapasite planı.",
    skills: ["Load testing", "Throughput", "Bottleneck", "Capacity", "Percentiles", "Autoscaling"],
    steps: [
      { title: "1. Yük senaryosu", learn: ["Load testing", "Test"], question: "Gerçekçi bir yük profili kurmak neden 'sadece çok istek atmaktan' iyidir?", tasks: [{ goal: "Bir yük testi senaryosu yaz.", tip: "k6/Locust." }] },
      { title: "2. Doğru metrik", learn: ["Percentiles", "Observability"], question: "Ortalama yerine p95/p99 gecikmeye bakmak neyi ortaya çıkarır?", tasks: [{ goal: "p95/p99 gecikmeyi ölç.", tip: "Persentiller." }] },
      { title: "3. Darboğaz bul", learn: ["Bottleneck", "Profiling"], question: "Yük altında CPU mu, DB mi, ağ mı darboğaz — nasıl ayırırsın?", tasks: [{ goal: "Artarak yükle, ilk kırılan yeri bul.", tip: "Kademeli artış." }] },
      { title: "4. Kapasite planı", learn: ["Capacity", "Maliyet"], question: "Tepe yüke göre mi ortalama yüke göre mi planlamak doğru?", tasks: [{ goal: "Hedef yüke göre kaynak planla.", tip: "Headroom bırak." }] },
      { title: "5. Autoscaling doğrula", learn: ["Autoscaling", "Ölçekleme"], question: "Otomatik ölçeklemenin yeterince hızlı tepki verdiğini nasıl doğrularsın?", tasks: [{ goal: "Ani yükte ölçeklemeyi test et.", tip: "Spike testi." }] },
    ],
  },
  {
    id: "do-cdn-caching",
    level: 3,
    track: "devops",
    project: "CDN & Edge Cache",
    difficulty: "Orta",
    emoji: "🛰️",
    accent: "cyan",
    tier: "mid",
    description:
      "İçeriği kullanıcıya yaklaştır. Amaç: CDN, cache başlıkları, invalidation ve edge mantığı.",
    skills: ["CDN", "Cache-Control", "ETag", "Invalidation", "Edge", "Performans"],
    steps: [
      { title: "1. CDN'in arkasına al", learn: ["CDN", "Performans"], question: "Statik içeriği CDN'den sunmak gecikmeyi neden ciddi düşürür?", tasks: [{ goal: "Statik varlıkları CDN üzerinden sun.", tip: "Origin + CDN." }] },
      { title: "2. Cache başlıkları", learn: ["Cache-Control", "HTTP"], question: "`Cache-Control: immutable` ve `max-age` davranışı neyi belirler?", tasks: [{ goal: "Doğru cache başlıklarını ayarla.", tip: "max-age/immutable." }] },
      { title: "3. ETag & doğrulama", learn: ["ETag", "HTTP"], question: "ETag ile koşullu istek bant genişliğini nasıl korur?", tasks: [{ goal: "Değişmemiş içerikte 304 dön.", tip: "ETag/If-None-Match." }] },
      { title: "4. Invalidation", learn: ["Invalidation", "Cache"], question: "Yeni sürümde eski cache'i temizlemenin (veya hash'li dosya adının) yolu nedir?", tasks: [{ goal: "Dağıtımda cache'i tazele.", tip: "Purge veya fingerprint." }] },
      { title: "5. Edge mantığı", learn: ["Edge", "Performans"], question: "Yönlendirme/auth gibi işleri edge'e taşımak neyi hızlandırır?", tasks: [{ goal: "Basit bir edge kuralı ekle.", tip: "Edge function/redirect." }] },
    ],
  },
  {
    id: "do-chaos",
    level: 6,
    track: "devops",
    project: "Chaos Engineering",
    difficulty: "Uzman",
    emoji: "🌀",
    accent: "rose",
    tier: "staff",
    description:
      "Dayanıklılığı kanıtla, varsayma. Amaç: hipotez, kontrollü arıza enjeksiyonu ve öğrenme.",
    skills: ["Chaos", "Hipotez", "Blast radius", "Resilience", "Observability", "Game day"],
    steps: [
      { title: "1. Hipotez kur", learn: ["Hipotez", "Chaos"], question: "Chaos deneyi neden 'sistem X olunca da ayakta kalır' hipoteziyle başlar?", tasks: [{ goal: "Test edilebilir bir dayanıklılık hipotezi yaz.", tip: "Beklenen davranış." }] },
      { title: "2. Patlama yarıçapını sınırla", learn: ["Blast radius", "Güvenlik"], question: "Deneyi küçük tutmak (blast radius) üretimde neyi korur?", tasks: [{ goal: "Deneyi küçük bir dilime sınırla.", tip: "Az trafik/tek instance." }] },
      { title: "3. Arıza enjekte et", learn: ["Chaos", "Resilience"], question: "Gecikme/hata enjekte etmek varsayımları nasıl test eder?", tasks: [{ goal: "Bir bağımlılığa arıza enjekte et.", tip: "Latency/error injection." }] },
      { title: "4. Gözlemle & öğren", learn: ["Observability", "Postmortem"], question: "Deney sırasında gözlemlenebilirliğin yetmemesi neyi ortaya çıkarır?", tasks: [{ goal: "Sistemin tepkisini ölç ve raporla.", tip: "Metrik + öğrenim." }] },
      { title: "5. Game day", learn: ["Game day", "Kültür"], question: "Planlı game day tatbikatları takımı gerçek olaya nasıl hazırlar?", tasks: [{ goal: "Küçük bir game day düzenle.", tip: "Senaryo + gözlem." }] },
    ],
  },
  {
    id: "do-slo",
    level: 5,
    track: "devops",
    project: "SLO / SLI & Hata Bütçesi",
    difficulty: "İleri",
    emoji: "🎚️",
    accent: "emerald",
    tier: "senior",
    description:
      "Güvenilirliği ölç ve yönet. Amaç: SLI seçimi, SLO hedefi, hata bütçesi ve karar verme.",
    skills: ["SLI", "SLO", "Error budget", "Reliability", "Alerting", "Karar"],
    steps: [
      { title: "1. Doğru SLI seç", learn: ["SLI", "Observability"], question: "Kullanıcı deneyimini yansıtan bir SLI (örn. başarı oranı) neden makine metriğinden iyidir?", tasks: [{ goal: "Bir servis için anlamlı SLI tanımla.", tip: "Kullanıcı odaklı." }] },
      { title: "2. SLO hedefi", learn: ["SLO", "Reliability"], question: "%100 güvenilirlik hedeflemenin maliyeti neden mantıksızdır?", tasks: [{ goal: "Gerçekçi bir SLO belirle.", tip: "Örn. %99.9." }] },
      { title: "3. Hata bütçesi", learn: ["Error budget", "Karar"], question: "Hata bütçesi 'hız' ile 'güvenilirlik' arasındaki gerilimi nasıl çözer?", tasks: [{ goal: "Hata bütçesini hesapla ve izle.", tip: "1 − SLO." }] },
      { title: "4. Bütçeye göre alarm", learn: ["Alerting", "SLO"], question: "Hata bütçesi tükenme hızına (burn rate) göre alarm vermek neden iyi?", tasks: [{ goal: "Burn-rate alarmı kur.", tip: "Hızlı/yavaş tükeniş." }] },
      { title: "5. Bütçeyle karar ver", learn: ["Karar", "Kültür"], question: "Bütçe bitince yeni özelliği durdurup güvenilirliğe dönmek neyi dengeler?", tasks: [{ goal: "Bütçeye dayalı bir politika yaz.", tip: "Tükendiyse stabilize et." }] },
      { title: "6. Raporla & gözden geçir", learn: ["SLO", "Observability"], question: "SLO'ları periyodik gözden geçirmek hedeflerin gerçekçi kalmasını nasıl sağlar?", tasks: [{ goal: "Aylık bir SLO raporu üret.", tip: "Trend + aksiyon." }] },
    ],
  },
];

// ════════════════════════════════════════════════════════════════
//  DATA ENGINEERING — ek projeler
// ════════════════════════════════════════════════════════════════
const dataEngExtra: Level[] = [
  {
    id: "de-sql-foundations",
    level: 1,
    track: "data-engineering",
    project: "SQL Temelleri (Veri için)",
    difficulty: "Başlangıç",
    emoji: "🐘",
    accent: "emerald",
    tier: "junior",
    description: "Verinin dili SQL. Amaç: sorgu, filtre, join, agregasyon ve pencere fonksiyonları.",
    skills: ["SQL", "JOIN", "GROUP BY", "Window function", "Index", "CTE"],
    steps: [
      { title: "1. Seç & filtrele", learn: ["SQL"], question: "WHERE ile HAVING arasındaki fark ne zaman ortaya çıkar?", tasks: [{ goal: "Koşullu bir SELECT yaz.", tip: "WHERE/ORDER BY/LIMIT." }] },
      { title: "2. Agregasyon", learn: ["GROUP BY"], question: "GROUP BY ile satırlar nasıl tek özet satıra iner?", tasks: [{ goal: "Kategoriye göre topla/say.", tip: "COUNT/SUM + GROUP BY." }] },
      { title: "3. JOIN", learn: ["JOIN"], question: "INNER ile LEFT JOIN sonucu nasıl değiştirir?", tasks: [{ goal: "İki tabloyu birleştir.", tip: "JOIN ... ON." }] },
      { title: "4. Alt sorgu & CTE", learn: ["CTE"], question: "CTE (WITH) karmaşık sorguyu neden okunur yapar?", tasks: [{ goal: "Bir CTE ile çok adımlı sorgu yaz.", tip: "WITH x AS (...)." }] },
      { title: "5. Pencere fonksiyonu", learn: ["Window function"], question: "Window fonksiyonu GROUP BY'dan farklı olarak neyi korur?", tasks: [{ goal: "Sıralama/çalışan toplam hesapla.", tip: "OVER (PARTITION BY...)." }] },
      { title: "6. İndeks & plan", learn: ["Index"], question: "EXPLAIN sorgu planında 'full scan' neyi işaret eder?", tasks: [{ goal: "Yavaş sorguyu indeksle.", tip: "EXPLAIN + index." }] },
    ],
  },
  {
    id: "de-etl-pipeline",
    level: 2,
    track: "data-engineering",
    project: "ETL Boru Hattı 101",
    difficulty: "Kolay-Orta",
    emoji: "🔄",
    accent: "sky",
    tier: "junior",
    description: "Veriyi çıkar, dönüştür, yükle. Amaç: kaynak okuma, temizleme, hedefe yazma ve tekrar çalıştırılabilirlik.",
    skills: ["ETL", "Extract", "Transform", "Load", "Idempotency", "Logging"],
    steps: [
      { title: "1. Çıkar (extract)", learn: ["Extract"], question: "Kaynaktan veri çekerken tam mı artımlı mı okumak gerekir?", tasks: [{ goal: "Bir kaynaktan (CSV/API) veriyi oku.", tip: "Kaynağı bir DataFrame'e al." }] },
      { title: "2. Dönüştür (transform)", learn: ["Transform"], question: "Dönüşümleri saf fonksiyonlara ayırmak test edilebilirliği nasıl artırır?", tasks: [{ goal: "Temizle/normalize et.", tip: "Tip/format düzelt." }] },
      { title: "3. Yükle (load)", learn: ["Load"], question: "Hedefe 'append' ile 'upsert' arasındaki fark tekrarda neyi etkiler?", tasks: [{ goal: "Hedefe yaz.", tip: "Upsert tercih et." }] },
      { title: "4. Idempotent yap", learn: ["Idempotency"], question: "Boru hattını iki kez çalıştırınca veriyi ikiye katlamaması neden şart?", tasks: [{ goal: "Tekrar çalışınca çift veri olmasın.", tip: "Anahtar bazlı upsert." }] },
      { title: "5. Logla & izle", learn: ["Logging"], question: "Satır sayısı/atlanan kayıt gibi metrikleri loglamak neyi gözlemlenebilir kılar?", tasks: [{ goal: "İşlenen/atlanan kayıtları logla.", tip: "Yapısal log." }] },
      { title: "6. Hata toleransı", learn: ["Error Handling"], question: "Tek bozuk satır tüm işi durdurmalı mı, yoksa karantinaya mı alınmalı?", tasks: [{ goal: "Bozuk kayıtları ayır, devam et.", tip: "Dead-letter/karantina." }] },
    ],
  },
  {
    id: "de-data-modeling",
    level: 3,
    track: "data-engineering",
    project: "Veri Modelleme (Star Schema)",
    difficulty: "Orta",
    emoji: "⭐",
    accent: "amber",
    tier: "mid",
    description: "Analiz için tasarlanmış şema. Amaç: fact/dimension, normalizasyon vs denormalizasyon, grain.",
    skills: ["Dimensional modeling", "Fact/Dimension", "Grain", "SCD", "Denormalization", "Star schema"],
    steps: [
      { title: "1. Grain'i tanımla", learn: ["Grain"], question: "Bir fact tablosunun 'grain'ini (ölçüm seviyesi) netleştirmek neden ilk adımdır?", tasks: [{ goal: "Fact tablosunun grain'ini yaz.", tip: "Bir satır = ne?" }] },
      { title: "2. Fact tablosu", learn: ["Fact/Dimension"], question: "Fact tablosu neden ölçümleri (measure) ve foreign key'leri tutar?", tasks: [{ goal: "Ölçümlü bir fact tablosu tasarla.", tip: "Measure + FK." }] },
      { title: "3. Dimension'lar", learn: ["Fact/Dimension"], question: "Dimension denormalize tutmak analizi neden hızlandırır?", tasks: [{ goal: "Tarih/ürün/müşteri dimension'ları kur.", tip: "Açıklayıcı alanlar." }] },
      { title: "4. Star schema", learn: ["Star schema"], question: "Star schema snowflake'e göre sorguda neyi sadeleştirir?", tasks: [{ goal: "Fact'ı dimension'lara bağla.", tip: "Merkez fact + uçlar." }] },
      { title: "5. Yavaş değişen boyut (SCD)", learn: ["SCD"], question: "SCD Type 2 geçmişi nasıl korur?", tasks: [{ goal: "Bir dimension'da değişim geçmişi tut.", tip: "geçerli_başlangıç/bitiş." }] },
      { title: "6. Doğrula", learn: ["Veri bütünlüğü"], question: "Yetim (orphan) fact kayıtlarını ne engeller?", tasks: [{ goal: "Bütünlük kontrolleri ekle.", tip: "FK doğrulaması." }] },
    ],
  },
  {
    id: "de-orchestration",
    level: 3,
    track: "data-engineering",
    project: "İş Orkestrasyonu (Airflow)",
    difficulty: "Orta",
    emoji: "🪂",
    accent: "violet",
    tier: "mid",
    description: "Boru hatlarını zamanla ve bağımlılıklarını yönet. Amaç: DAG, görev bağımlılığı, retry, backfill.",
    skills: ["Orchestration", "DAG", "Scheduling", "Retry", "Backfill", "Idempotency"],
    steps: [
      { title: "1. DAG kur", learn: ["DAG"], question: "Bir DAG'ın 'döngüsüz' olması neden zorunludur?", tasks: [{ goal: "Birkaç görevli bir DAG tanımla.", tip: "Görevler + bağımlılık." }] },
      { title: "2. Bağımlılık", learn: ["DAG"], question: "Görev bağımlılıkları yanlış sırada çalışmayı nasıl önler?", tasks: [{ goal: "Görevleri doğru sırada bağla.", tip: "upstream >> downstream." }] },
      { title: "3. Zamanlama", learn: ["Scheduling"], question: "Schedule interval ile execution date kavramı neden karıştırılır?", tasks: [{ goal: "DAG'ı periyodik çalıştır.", tip: "schedule + start_date." }] },
      { title: "4. Retry & alarm", learn: ["Retry"], question: "Görev başarısızlığında retry ve bildirim neyi otomatikleştirir?", tasks: [{ goal: "Retry ve hata bildirimi ekle.", tip: "retries + on_failure." }] },
      { title: "5. Backfill", learn: ["Backfill"], question: "Geçmiş tarihleri backfill ederken idempotency neden kritik?", tasks: [{ goal: "Geçmiş bir aralığı backfill et.", tip: "Tarih bazlı çalıştır." }] },
      { title: "6. Idempotent görev", learn: ["Idempotency"], question: "Bir görev tekrar çalışınca aynı sonucu vermeli — nasıl sağlanır?", tasks: [{ goal: "Görevi tekrar-güvenli yap.", tip: "Partition'ı sil-yaz." }] },
    ],
  },
  {
    id: "de-data-quality",
    level: 3,
    track: "data-engineering",
    project: "Veri Kalitesi & Testler",
    difficulty: "Orta",
    emoji: "✅",
    accent: "lime",
    tier: "mid",
    description: "Veriye güven. Amaç: kalite kuralları, anomali tespiti, veri sözleşmeleri ve kapılar.",
    skills: ["Data quality", "Validation", "Anomaly", "Data contract", "Freshness", "Test"],
    steps: [
      { title: "1. Kalite kuralları", learn: ["Data quality"], question: "Null/benzersizlik/aralık kuralları hangi bozuklukları yakalar?", tasks: [{ goal: "Temel kalite kuralları tanımla.", tip: "not null/unique/range." }] },
      { title: "2. Tazelik (freshness)", learn: ["Freshness"], question: "Verinin 'eski' olduğunu anlamak neden değerden bağımsız bir sorundur?", tasks: [{ goal: "Veri tazeliğini kontrol et.", tip: "Son güncelleme zamanı." }] },
      { title: "3. Anomali tespiti", learn: ["Anomaly"], question: "Satır sayısındaki ani düşüş neden 'sessiz' bir hatadır?", tasks: [{ goal: "Hacim anomalisini yakala.", tip: "Beklenen aralık." }] },
      { title: "4. Veri sözleşmesi", learn: ["Data contract"], question: "Üretici ile tüketici arasında bir veri sözleşmesi neyi garanti eder?", tasks: [{ goal: "Şema sözleşmesi tanımla.", tip: "Beklenen alanlar/tipler." }] },
      { title: "5. Kalite kapısı", learn: ["Test"], question: "Kötü veriyi yayınlamadan durdurmak (gate) neden upstream'de olmalı?", tasks: [{ goal: "Kalite geçmezse boru hattını durdur.", tip: "Test → fail." }] },
    ],
  },
  {
    id: "de-batch-processing",
    level: 4,
    track: "data-engineering",
    project: "Büyük Veri Toplu İşleme (Spark)",
    difficulty: "İleri",
    emoji: "✨",
    accent: "rose",
    tier: "senior",
    description: "Tek makineye sığmayan veriyi işle. Amaç: dağıtık işleme, partition, shuffle ve performans.",
    skills: ["Spark", "Partition", "Shuffle", "Lazy evaluation", "Skew", "Performans"],
    steps: [
      { title: "1. Dağıtık dönüşüm", learn: ["Spark"], question: "Spark'ın 'lazy' değerlendirmesi işi nasıl optimize eder?", tasks: [{ goal: "Büyük veride bir dönüşüm yaz.", tip: "transform + action." }] },
      { title: "2. Partition", learn: ["Partition"], question: "Partition sayısı paralelliği ve performansı nasıl etkiler?", tasks: [{ goal: "Veriyi mantıklı partition'la.", tip: "Boyut/anahtar bazlı." }] },
      { title: "3. Shuffle maliyeti", learn: ["Shuffle"], question: "Shuffle neden dağıtık işlemenin en pahalı adımıdır?", tasks: [{ goal: "Gereksiz shuffle'ı azalt.", tip: "Join/groupBy stratejisi." }] },
      { title: "4. Veri eğriliği (skew)", learn: ["Skew"], question: "Bir anahtarın aşırı veriye sahip olması (skew) işi nasıl yavaşlatır?", tasks: [{ goal: "Skew'i tespit edip azalt.", tip: "Salting/yeniden bölme." }] },
      { title: "5. Format & sıkıştırma", learn: ["Parquet"], question: "Parquet gibi sütunlu format CSV'ye göre neyi hızlandırır?", tasks: [{ goal: "Çıktıyı sütunlu formatta yaz.", tip: "Parquet + sıkıştırma." }] },
    ],
  },
  {
    id: "de-streaming",
    level: 5,
    track: "data-engineering",
    project: "Akış İşleme (Kafka/Streaming)",
    difficulty: "İleri",
    emoji: "🌊",
    accent: "cyan",
    tier: "senior",
    description: "Veriyi anında işle. Amaç: olay akışı, tüketici grupları, windowing ve tam-bir-kez semantiği.",
    skills: ["Streaming", "Kafka", "Consumer group", "Windowing", "Exactly-once", "Watermark"],
    steps: [
      { title: "1. Olay akışı", learn: ["Streaming"], question: "Batch ile streaming arasındaki temel ödünleşim (gecikme vs basitlik) nedir?", tasks: [{ goal: "Bir topic'e olay üret/tüket.", tip: "Producer/consumer." }] },
      { title: "2. Tüketici grupları", learn: ["Consumer group"], question: "Tüketici grubu yükü paralel tüketicilere nasıl dağıtır?", tasks: [{ goal: "Partition'ları tüketicilere dağıt.", tip: "Group + partition." }] },
      { title: "3. Windowing", learn: ["Windowing"], question: "Tumbling ve sliding pencere hangi metrik için uygundur?", tasks: [{ goal: "Zaman penceresinde topla.", tip: "Window + aggregate." }] },
      { title: "4. Geç gelen veri", learn: ["Watermark"], question: "Watermark geç gelen olayları ne kadar bekleyeceğine nasıl karar verir?", tasks: [{ goal: "Geç veriyi watermark ile ele.", tip: "Gecikme toleransı." }] },
      { title: "5. Teslim semantiği", learn: ["Exactly-once"], question: "at-least-once ile exactly-once arasındaki fark sayımda neyi değiştirir?", tasks: [{ goal: "İdempotent tüketim sağla.", tip: "Offset + idempotency." }] },
    ],
  },
  {
    id: "de-warehouse",
    level: 4,
    track: "data-engineering",
    project: "Veri Ambarı (Warehouse)",
    difficulty: "İleri",
    emoji: "🏬",
    accent: "indigo",
    tier: "senior",
    description: "Analiz için merkezi depo. Amaç: kolonlu depolama, partitioning, clustering ve maliyet.",
    skills: ["Data warehouse", "Columnar", "Partitioning", "Clustering", "Maliyet", "Materialized view"],
    steps: [
      { title: "1. Kolonlu depolama", learn: ["Columnar"], question: "Analitik sorgularda kolonlu depolama neden satır-temelliyi yener?", tasks: [{ goal: "Veriyi ambara yükle.", tip: "Kolonlu tablo." }] },
      { title: "2. Partitioning", learn: ["Partitioning"], question: "Tarihe göre partition taranan veriyi nasıl azaltır?", tasks: [{ goal: "Tabloyu tarihe göre partition'la.", tip: "Partition kolonu." }] },
      { title: "3. Clustering", learn: ["Clustering"], question: "Sık filtrelenen kolona göre clustering neyi hızlandırır?", tasks: [{ goal: "Sık sorgulara göre cluster'la.", tip: "Cluster kolonu." }] },
      { title: "4. Materialized view", learn: ["Materialized view"], question: "Önceden hesaplanmış görünüm pahalı sorguyu nasıl ucuzlatır?", tasks: [{ goal: "Sık sorguyu materialize et.", tip: "MV + yenileme." }] },
      { title: "5. Maliyet kontrolü", learn: ["Maliyet"], question: "Taranan veri başına ödemede maliyeti ne düşürür?", tasks: [{ goal: "Sorgu maliyetini azalt.", tip: "Partition pruning." }] },
    ],
  },
  {
    id: "de-dbt",
    level: 3,
    track: "data-engineering",
    project: "Dönüşüm Katmanı (dbt/ELT)",
    difficulty: "Orta",
    emoji: "🧱",
    accent: "amber",
    tier: "mid",
    description: "Ambarda SQL ile dönüşüm. Amaç: modüler modeller, test, dokümantasyon ve soy ağacı (lineage).",
    skills: ["ELT", "dbt", "Model", "Test", "Lineage", "Incremental"],
    steps: [
      { title: "1. ELT vs ETL", learn: ["ELT"], question: "Dönüşümü ambarda yapmak (ELT) modern yığında neden yaygınlaştı?", tasks: [{ goal: "Ham veriyi ambara yükle, sonra dönüştür.", tip: "Önce L, sonra T." }] },
      { title: "2. Modüler modeller", learn: ["Model"], question: "Dönüşümleri katmanlara (staging/mart) bölmek neyi netleştirir?", tasks: [{ goal: "Staging ve mart modelleri yaz.", tip: "Katmanlı SQL." }] },
      { title: "3. Testler", learn: ["Test"], question: "Modele unique/not-null testi koymak veri kalitesini nasıl korur?", tasks: [{ goal: "Modellere testler ekle.", tip: "Şema testleri." }] },
      { title: "4. Incremental model", learn: ["Incremental"], question: "Her seferinde tümünü işlemek yerine artımlı model neyi hızlandırır?", tasks: [{ goal: "Bir modeli artımlı yap.", tip: "Yeni satırları işle." }] },
      { title: "5. Lineage & doküman", learn: ["Lineage"], question: "Soy ağacı (lineage) bir alanın nereden geldiğini neden önemli kılar?", tasks: [{ goal: "Bağımlılıkları ve dokümanı üret.", tip: "ref() + docs." }] },
    ],
  },
  {
    id: "de-ingestion",
    level: 2,
    track: "data-engineering",
    project: "Veri Toplama (Ingestion)",
    difficulty: "Kolay-Orta",
    emoji: "📥",
    accent: "sky",
    tier: "mid",
    description: "Kaynaklardan veriyi güvenilir topla. Amaç: tam/artımlı yükleme, CDC ve şema evrimi.",
    skills: ["Ingestion", "Incremental load", "CDC", "Schema evolution", "Watermark", "Idempotency"],
    steps: [
      { title: "1. Tam yükleme", learn: ["Ingestion"], question: "Tam (full) yükleme ne zaman makul, ne zaman israftır?", tasks: [{ goal: "Bir kaynağı tam yükle.", tip: "Snapshot." }] },
      { title: "2. Artımlı yükleme", learn: ["Incremental load"], question: "Artımlı yükleme için bir 'yüksek su işareti' (watermark) neden gerekir?", tasks: [{ goal: "Yalnızca yeni/değişeni çek.", tip: "updated_at > son." }] },
      { title: "3. CDC", learn: ["CDC"], question: "Change Data Capture sorgu yapmadan değişimi nasıl yakalar?", tasks: [{ goal: "DB değişimlerini akıt.", tip: "Log-based CDC." }] },
      { title: "4. Şema evrimi", learn: ["Schema evolution"], question: "Kaynağa yeni kolon eklenince boru hattı neden kırılmamalı?", tasks: [{ goal: "Şema değişimine dayanıklı ol.", tip: "Esnek/şema-on-read." }] },
      { title: "5. Idempotent yükleme", learn: ["Idempotency"], question: "Yeniden çekimde çift kayıt olmaması için ne gerekir?", tasks: [{ goal: "Tekrar-güvenli yükleme yap.", tip: "Upsert/merge." }] },
    ],
  },
  {
    id: "de-data-lake",
    level: 4,
    track: "data-engineering",
    project: "Data Lake & Lakehouse",
    difficulty: "İleri",
    emoji: "🏞️",
    accent: "cyan",
    tier: "senior",
    description: "Ham ve işlenmiş veriyi ölçekli sakla. Amaç: katmanlar (bronze/silver/gold), dosya formatları, tablo formatı.",
    skills: ["Data lake", "Medallion", "Parquet", "Table format", "Partition", "Compaction"],
    steps: [
      { title: "1. Katmanlar (medallion)", learn: ["Medallion"], question: "Bronze/silver/gold katmanları sorumluluğu nasıl ayırır?", tasks: [{ goal: "Üç katmanlı bir yapı kur.", tip: "Ham→temiz→iş." }] },
      { title: "2. Dosya formatı", learn: ["Parquet"], question: "Sütunlu format + sıkıştırma depolama ve sorguda neyi iyileştirir?", tasks: [{ goal: "Veriyi Parquet olarak yaz.", tip: "Partition'lı." }] },
      { title: "3. Tablo formatı", learn: ["Table format"], question: "Iceberg/Delta gibi tablo formatı 'dosya yığınına' neyi ekler (ACID)?", tasks: [{ goal: "Bir tablo formatı kullan.", tip: "ACID + zaman yolculuğu." }] },
      { title: "4. Küçük dosya sorunu", learn: ["Compaction"], question: "Çok sayıda küçük dosya sorguyu neden yavaşlatır?", tasks: [{ goal: "Küçük dosyaları birleştir.", tip: "Compaction." }] },
      { title: "5. Şema & evrim", learn: ["Schema evolution"], question: "Lakehouse'ta güvenli şema evrimi neyi mümkün kılar?", tasks: [{ goal: "Kolon ekle/çıkar güvenle.", tip: "Format desteği." }] },
    ],
  },
  {
    id: "de-lineage-catalog",
    level: 4,
    track: "data-engineering",
    project: "Veri Kataloğu & Soy Ağacı",
    difficulty: "İleri",
    emoji: "🗺️",
    accent: "violet",
    tier: "senior",
    description: "Veriyi keşfedilebilir ve izlenebilir yap. Amaç: metadata, lineage, sahiplik ve gizlilik etiketleri.",
    skills: ["Catalog", "Lineage", "Metadata", "Ownership", "PII tagging", "Governance"],
    steps: [
      { title: "1. Metadata topla", learn: ["Metadata"], question: "Veri hakkında veri (metadata) keşfi neden kolaylaştırır?", tasks: [{ goal: "Tablolara açıklama/etiket ekle.", tip: "Katalog girişi." }] },
      { title: "2. Soy ağacı", learn: ["Lineage"], question: "Uçtan uca lineage bir hatada etkiyi nasıl gösterir?", tasks: [{ goal: "Kaynak→çıktı bağlarını izle.", tip: "Otomatik lineage." }] },
      { title: "3. Sahiplik", learn: ["Ownership"], question: "Her veri setine bir sahip atamak hesap verebilirliği nasıl kurar?", tasks: [{ goal: "Sahip/sorumlu ata.", tip: "Owner alanı." }] },
      { title: "4. PII etiketleme", learn: ["PII tagging"], question: "Kişisel veriyi (PII) etiketlemek uyumda neyi otomatikleştirir?", tasks: [{ goal: "Hassas alanları işaretle.", tip: "PII tag." }] },
      { title: "5. Yönetişim", learn: ["Governance"], question: "Erişim politikalarını katalogla yönetmek neyi merkezîleştirir?", tasks: [{ goal: "Erişim kurallarını bağla.", tip: "Rol bazlı erişim." }] },
    ],
  },
  {
    id: "de-pipeline-reliability",
    level: 5,
    track: "data-engineering",
    project: "Boru Hattı Güvenilirliği",
    difficulty: "İleri",
    emoji: "🧯",
    accent: "rose",
    tier: "senior",
    description: "Üretim boru hatlarını ayakta tut. Amaç: izleme, SLA, geri-doldurma ve olay müdahalesi.",
    skills: ["Monitoring", "SLA", "Alerting", "Backfill", "Recovery", "Observability"],
    steps: [
      { title: "1. Boru hattı SLA'sı", learn: ["SLA"], question: "Veri tazeliği için bir SLA belirlemek beklentileri nasıl netleştirir?", tasks: [{ goal: "Tazelik/teslim SLA'sı tanımla.", tip: "Örn. 06:00'a kadar." }] },
      { title: "2. İzle & alarm", learn: ["Monitoring"], question: "Bir job'un 'çalıştı ama boş veri üretti' durumunu ne yakalar?", tasks: [{ goal: "Hacim/tazelik alarmı kur.", tip: "Beklenen aralık." }] },
      { title: "3. Yeniden işle (backfill)", learn: ["Backfill"], question: "Bozuk bir günü güvenle yeniden işlemenin yolu nedir?", tasks: [{ goal: "Belirli bir günü yeniden işle.", tip: "Idempotent backfill." }] },
      { title: "4. Bağımlılık hatası", learn: ["Recovery"], question: "Upstream gecikince downstream'i körü körüne çalıştırmak neden tehlikeli?", tasks: [{ goal: "Upstream hazır değilse bekle/atla.", tip: "Sensor/bağımlılık." }] },
      { title: "5. Olay müdahalesi", learn: ["Observability"], question: "Veri olayında 'kimi etkiledi' sorusunu lineage nasıl yanıtlar?", tasks: [{ goal: "Etki analizini lineage ile yap.", tip: "Downstream tüketiciler." }] },
    ],
  },
];

const dataEngExtra2: Level[] = [
  {
    id: "de-dedup",
    level: 3,
    track: "data-engineering",
    project: "Tekilleştirme & Kayıt Eşleme",
    difficulty: "Orta",
    emoji: "🧬",
    accent: "emerald",
    tier: "mid",
    description: "Aynı varlığı tek kayda indirme. Amaç: dedup, fuzzy eşleme ve altın kayıt.",
    skills: ["Deduplication", "Record matching", "Fuzzy match", "Golden record", "Window function", "Hash"],
    steps: [
      { title: "1. Tam tekilleştirme", learn: ["Deduplication"], question: "Tam çift kayıtları kaldırmak için hangi anahtar kullanılır?", tasks: [{ goal: "Tam çiftleri kaldır.", tip: "DISTINCT/anahtar." }] },
      { title: "2. En güncel kaydı seç", learn: ["Window function"], question: "Aynı anahtardan en güncelini seçmek için window nasıl yardım eder?", tasks: [{ goal: "Anahtar başına en yeniyi tut.", tip: "ROW_NUMBER OVER." }] },
      { title: "3. Fuzzy eşleme", learn: ["Fuzzy match"], question: "Yazım farklı ama aynı varlık olan kayıtları ne eşler?", tasks: [{ goal: "Benzer kayıtları eşle.", tip: "Benzerlik skoru." }] },
      { title: "4. Altın kayıt", learn: ["Golden record"], question: "Birden çok kaynaktan 'altın kayıt' üretirken hangi kaynağa öncelik verilir?", tasks: [{ goal: "Birleştirilmiş tek kayıt üret.", tip: "Öncelik kuralları." }] },
      { title: "5. Doğrula", learn: ["Data quality"], question: "Yanlış birleştirmenin (false merge) maliyeti neden yüksektir?", tasks: [{ goal: "Eşleme kalitesini ölç.", tip: "Örnek inceleme." }] },
    ],
  },
  {
    id: "de-late-data",
    level: 4,
    track: "data-engineering",
    project: "Geç Gelen & Düzeltilen Veri",
    difficulty: "İleri",
    emoji: "⏳",
    accent: "sky",
    tier: "senior",
    description: "Gerçek dünyada veri geç gelir ve değişir. Amaç: geç veri, düzeltmeler ve yeniden hesaplama.",
    skills: ["Late data", "Restatement", "Watermark", "Reprocessing", "Idempotency", "Audit"],
    steps: [
      { title: "1. Geç veriyi kabul et", learn: ["Late data"], question: "Bir olay 'düne ait' geç gelirse hangi partition güncellenmeli?", tasks: [{ goal: "Geç kaydı doğru güne yaz.", tip: "Olay zamanına göre." }] },
      { title: "2. Pencere & watermark", learn: ["Watermark"], question: "Pencereyi ne kadar açık tutmak geç veri ile gecikme arasını dengeler?", tasks: [{ goal: "Geç toleransı belirle.", tip: "Watermark gecikmesi." }] },
      { title: "3. Düzeltme (restatement)", learn: ["Restatement"], question: "Yayınlanmış bir metrik düzeltilince tüketiciler nasıl bilgilendirilir?", tasks: [{ goal: "Geçmiş bir günü yeniden ifade et.", tip: "Sürümlü çıktı." }] },
      { title: "4. Idempotent yeniden işleme", learn: ["Reprocessing"], question: "Yeniden işleme çift sayım yapmamalı — bunu ne garanti eder?", tasks: [{ goal: "Partition'ı sil-yaz mantığıyla işle.", tip: "Overwrite partition." }] },
      { title: "5. İz bırak", learn: ["Audit"], question: "Düzeltmeleri denetlemek güveni nasıl korur?", tasks: [{ goal: "Düzeltme geçmişini kaydet.", tip: "Audit kaydı." }] },
    ],
  },
  {
    id: "de-time-series",
    level: 3,
    track: "data-engineering",
    project: "Zaman Serisi Verisi",
    difficulty: "Orta",
    emoji: "📉",
    accent: "amber",
    tier: "mid",
    description: "Zamana bağlı ölçümleri sakla ve sorgula. Amaç: downsampling, retention ve aralık sorguları.",
    skills: ["Time series", "Downsampling", "Retention", "Rollup", "Gap filling", "Index"],
    steps: [
      { title: "1. Zaman serisi modeli", learn: ["Time series"], question: "Zaman serisini zaman+etiket+değer olarak modellemenin avantajı nedir?", tasks: [{ goal: "Ölçümleri zaman damgalı sakla.", tip: "ts + tags + value." }] },
      { title: "2. Aralık sorgusu", learn: ["Index"], question: "Zaman aralığı sorgusunu hızlandırmak için neyi indekslersin?", tasks: [{ goal: "Bir zaman aralığını sorgula.", tip: "ts indexi." }] },
      { title: "3. Downsampling", learn: ["Downsampling"], question: "Ham veriyi saatlik özete indirmek depolama/sorguda neyi iyileştirir?", tasks: [{ goal: "Veriyi daha kaba çözünürlüğe indir.", tip: "Zaman bucket'ı." }] },
      { title: "4. Boşluk doldurma", learn: ["Gap filling"], question: "Eksik zaman dilimlerini doldurmak grafiklerde neyi düzeltir?", tasks: [{ goal: "Eksik aralıkları ele.", tip: "Interpolasyon/forward fill." }] },
      { title: "5. Retention", learn: ["Retention"], question: "Eski ham veriyi silip özetini tutmak neyi dengeler?", tasks: [{ goal: "Yaşa göre retention uygula.", tip: "TTL + rollup." }] },
    ],
  },
  {
    id: "de-semi-structured",
    level: 3,
    track: "data-engineering",
    project: "Yarı Yapılı Veri (JSON/nested)",
    difficulty: "Orta",
    emoji: "🧩",
    accent: "lime",
    tier: "mid",
    description: "İç içe ve değişken şemalı veriyi işle. Amaç: flatten, schema-on-read ve esnek sorgu.",
    skills: ["JSON", "Nested", "Flatten", "Schema-on-read", "Array", "Parsing"],
    steps: [
      { title: "1. JSON ayrıştır", learn: ["JSON"], question: "Şema-on-read, şema-on-write'a göre esnekliği nasıl artırır?", tasks: [{ goal: "JSON alanlarını sorgula.", tip: "JSON path." }] },
      { title: "2. Düzleştir (flatten)", learn: ["Flatten"], question: "İç içe yapıyı düz tabloya açmak analizi neden kolaylaştırır?", tasks: [{ goal: "Nested yapıyı düzleştir.", tip: "Flatten/unnest." }] },
      { title: "3. Dizileri aç", learn: ["Array"], question: "Bir dizi alanını satırlara açmak (explode) neyi mümkün kılar?", tasks: [{ goal: "Dizi alanını satırlara aç.", tip: "Explode/lateral." }] },
      { title: "4. Değişken şema", learn: ["Schema-on-read"], question: "Alan bazen eksikse sorgu nasıl dayanıklı kalır?", tasks: [{ goal: "Eksik alanları güvenle ele.", tip: "Null-safe erişim." }] },
      { title: "5. Tipleme", learn: ["Parsing"], question: "String alanları doğru tiplere çevirmek neden gereklidir?", tasks: [{ goal: "Alanları doğru tiple.", tip: "Cast + doğrulama." }] },
    ],
  },
  {
    id: "de-reverse-etl",
    level: 4,
    track: "data-engineering",
    project: "Reverse ETL",
    difficulty: "İleri",
    emoji: "↩️",
    accent: "rose",
    tier: "senior",
    description: "Ambardaki veriyi iş araçlarına geri gönder. Amaç: senkron, eşleme ve idempotency.",
    skills: ["Reverse ETL", "Sync", "Mapping", "Idempotency", "Rate limit", "Hata yönetimi"],
    steps: [
      { title: "1. Geri besleme ihtiyacı", learn: ["Reverse ETL"], question: "Ambardan CRM'e veri itmek neden ayrı bir desendir?", tasks: [{ goal: "Bir hedef sistem seç ve eşle.", tip: "Kaynak→hedef alanları." }] },
      { title: "2. Değişeni gönder", learn: ["Sync"], question: "Tümünü değil yalnızca değişeni göndermek API kotasını nasıl korur?", tasks: [{ goal: "Yalnızca değişen kayıtları gönder.", tip: "Diff/değişim takibi." }] },
      { title: "3. Idempotent yazma", learn: ["Idempotency"], question: "Hedefe tekrar gönderim çift kayıt yapmamalı — nasıl?", tasks: [{ goal: "Upsert ile yaz.", tip: "Dış id eşlemesi." }] },
      { title: "4. Hız sınırı & hata", learn: ["Rate limit"], question: "Hedef API limitine takılınca nasıl zarif davranırsın?", tasks: [{ goal: "Hız sınırına uy, hatayı yönet.", tip: "Backoff + retry." }] },
    ],
  },
  {
    id: "de-feature-store",
    level: 5,
    track: "data-engineering",
    project: "Feature Store (ML için Veri)",
    difficulty: "İleri",
    emoji: "🍱",
    accent: "violet",
    tier: "senior",
    description: "ML özelliklerini tutarlı üret ve sun. Amaç: offline/online tutarlılık, point-in-time ve servis.",
    skills: ["Feature store", "Point-in-time", "Online/offline", "Training-serving skew", "Backfill", "Freshness"],
    steps: [
      { title: "1. Özellik tanımı", learn: ["Feature store"], question: "Özellikleri merkezi tanımlamak takımlar arası tekrarı nasıl önler?", tasks: [{ goal: "Birkaç özellik tanımla.", tip: "Varlık + özellik." }] },
      { title: "2. Point-in-time doğruluk", learn: ["Point-in-time"], question: "Eğitimde geleceği sızdırmamak (leakage) için neden 'o anki' değer gerekir?", tasks: [{ goal: "Geçmişe doğru özellik üret.", tip: "Olay zamanına göre join." }] },
      { title: "3. Online/offline", learn: ["Online/offline"], question: "Eğitim (offline) ile servis (online) aynı mantığı kullanmazsa ne olur (skew)?", tasks: [{ goal: "Aynı tanımdan iki store besle.", tip: "Tek kaynak mantık." }] },
      { title: "4. Tazelik", learn: ["Freshness"], question: "Online özelliklerin tazeliği tahmin kalitesini nasıl etkiler?", tasks: [{ goal: "Online özellikleri güncel tut.", tip: "Akış/periyodik." }] },
      { title: "5. Backfill", learn: ["Backfill"], question: "Yeni bir özelliği geçmişe doldurmak neden gerekir?", tasks: [{ goal: "Özelliği geçmişe backfill et.", tip: "Tarihsel hesap." }] },
    ],
  },
  {
    id: "de-query-optimization",
    level: 4,
    track: "data-engineering",
    project: "Sorgu Optimizasyonu",
    difficulty: "İleri",
    emoji: "🚀",
    accent: "cyan",
    tier: "senior",
    description: "Pahalı sorguları ucuzlat. Amaç: plan okuma, partition pruning, join stratejisi ve önbellek.",
    skills: ["Query plan", "Partition pruning", "Join strategy", "Predicate pushdown", "Cache", "Maliyet"],
    steps: [
      { title: "1. Planı oku", learn: ["Query plan"], question: "Sorgu planında en pahalı adımı nasıl bulursun?", tasks: [{ goal: "EXPLAIN ile darboğazı bul.", tip: "Maliyetli düğüm." }] },
      { title: "2. Partition pruning", learn: ["Partition pruning"], question: "Filtreyi partition kolonuna koymak taranan veriyi nasıl azaltır?", tasks: [{ goal: "Yalnızca gerekli partition'ları tara.", tip: "Partition filtresi." }] },
      { title: "3. Predicate pushdown", learn: ["Predicate pushdown"], question: "Filtreyi kaynağa itmek (pushdown) ağ/IO'yu neden azaltır?", tasks: [{ goal: "Filtreyi mümkün olan en erken uygula.", tip: "Erken filtre." }] },
      { title: "4. Join stratejisi", learn: ["Join strategy"], question: "Broadcast join ne zaman shuffle join'den iyidir?", tasks: [{ goal: "Küçük tabloyu broadcast et.", tip: "Boyut bazlı." }] },
      { title: "5. Önbellek/MV", learn: ["Cache"], question: "Tekrarlanan ağır sorguyu materyalize etmek neyi kazandırır?", tasks: [{ goal: "Sık sorguyu önbelleğe al.", tip: "MV/sonuç cache." }] },
    ],
  },
  {
    id: "de-data-observability",
    level: 4,
    track: "data-engineering",
    project: "Veri Gözlemlenebilirliği",
    difficulty: "İleri",
    emoji: "🔭",
    accent: "indigo",
    tier: "senior",
    description: "Veri sorunlarını kullanıcıdan önce yakala. Amaç: hacim, şema, dağılım ve tazelik izleme.",
    skills: ["Data observability", "Freshness", "Volume", "Schema drift", "Distribution", "Alerting"],
    steps: [
      { title: "1. Tazelik izle", learn: ["Freshness"], question: "Verinin 'durduğunu' anlamak neden en kritik sinyaldir?", tasks: [{ goal: "Tazelik metriği kur.", tip: "Son yükleme zamanı." }] },
      { title: "2. Hacim izle", learn: ["Volume"], question: "Satır sayısındaki sapma sessiz bir boru hattı hatasını nasıl ele verir?", tasks: [{ goal: "Hacim sapmasına alarm ver.", tip: "Beklenen aralık." }] },
      { title: "3. Şema kayması (drift)", learn: ["Schema drift"], question: "Kaynak şeması sessizce değişince tüketiciler nasıl korunur?", tasks: [{ goal: "Şema değişimini tespit et.", tip: "Şema diff." }] },
      { title: "4. Dağılım anomalisi", learn: ["Distribution"], question: "Bir kolonun değer dağılımındaki kayma neyi ele verebilir?", tasks: [{ goal: "Dağılım sapmasını izle.", tip: "Null oranı/ortalama." }] },
      { title: "5. Etki & alarm", learn: ["Alerting"], question: "Alarmı doğru kişiye yönlendirmek için lineage neden gerekir?", tasks: [{ goal: "Sahibe alarm yönlendir.", tip: "Owner + lineage." }] },
    ],
  },
  {
    id: "de-gdpr-deletion",
    level: 3,
    track: "data-engineering",
    project: "Gizlilik & Veri Silme (KVKK/GDPR)",
    difficulty: "Orta",
    emoji: "🔏",
    accent: "rose",
    tier: "mid",
    description: "Kişisel veriyi yasal yönet. Amaç: PII envanteri, silme talebi, anonimleştirme ve denetim.",
    skills: ["GDPR/KVKK", "PII", "Right to erasure", "Anonymization", "Audit", "Retention"],
    steps: [
      { title: "1. PII envanteri", learn: ["PII"], question: "Kişisel veriyi silmeden önce nerede olduğunu bilmek neden şart?", tasks: [{ goal: "PII alanlarını haritalandır.", tip: "Katalog + etiket." }] },
      { title: "2. Silme talebi", learn: ["Right to erasure"], question: "'Unutulma hakkı' talebi tüm kopyaları nasıl kapsamalı?", tasks: [{ goal: "Bir kullanıcının verisini sil.", tip: "Tüm sistemler." }] },
      { title: "3. Anonimleştirme", learn: ["Anonymization"], question: "Analiz için veriyi tutarken kimliği kaldırmanın yolu nedir?", tasks: [{ goal: "PII'yi anonimleştir.", tip: "Hash/maskeleme." }] },
      { title: "4. Denetim", learn: ["Audit"], question: "Silme işlemlerini denetlemek uyumda neyi kanıtlar?", tasks: [{ goal: "Silme kaydını tut.", tip: "Audit log." }] },
    ],
  },
  {
    id: "de-data-mesh",
    level: 6,
    track: "data-engineering",
    project: "Data Mesh & Veri Ürünleri",
    difficulty: "Uzman",
    emoji: "🕸️",
    accent: "violet",
    tier: "staff",
    description: "Veriyi merkezi takımdan domain'lere dağıt. Amaç: veri ürünü, sahiplik, self-servis ve federasyon.",
    skills: ["Data mesh", "Data product", "Domain ownership", "Self-serve", "Federation", "Governance"],
    steps: [
      { title: "1. Veri ürünü", learn: ["Data product"], question: "Veriyi 'ürün' gibi ele almak (SLA, doküman, sahip) neyi değiştirir?", tasks: [{ goal: "Bir veri ürünü tanımla.", tip: "Arayüz + SLA." }] },
      { title: "2. Domain sahipliği", learn: ["Domain ownership"], question: "Veriyi üreten domain'in sahiplenmesi kaliteyi nasıl artırır?", tasks: [{ goal: "Ürüne domain sahibi ata.", tip: "Üreten = sahip." }] },
      { title: "3. Self-servis platform", learn: ["Self-serve"], question: "Self-servis altyapı domain takımlarını nasıl hızlandırır?", tasks: [{ goal: "Ortak araçları platforma çıkar.", tip: "Şablon/standart." }] },
      { title: "4. Federe yönetişim", learn: ["Federation"], question: "Merkezi standart + dağıtık uygulama dengesi neden gerekir?", tasks: [{ goal: "Ortak standartlar tanımla.", tip: "Global kurallar." }] },
    ],
  },
  {
    id: "de-vector-data",
    level: 5,
    track: "data-engineering",
    project: "Vektör Verisi & Embedding Pipeline",
    difficulty: "İleri",
    emoji: "🧭",
    accent: "fuchsia",
    tier: "senior",
    description: "Anlamsal arama için veri hazırla. Amaç: embedding üretimi, vektör deposu ve güncel tutma.",
    skills: ["Embedding", "Vector DB", "Chunking", "Index", "Freshness", "Pipeline"],
    steps: [
      { title: "1. Parçala (chunk)", learn: ["Chunking"], question: "Metni anlamlı parçalara bölmek arama kalitesini nasıl etkiler?", tasks: [{ goal: "Belgeleri parçalara böl.", tip: "Boyut/örtüşme." }] },
      { title: "2. Embedding üret", learn: ["Embedding"], question: "Embedding bir metni neden bir sayı vektörüne çevirir?", tasks: [{ goal: "Parçaların embedding'ini üret.", tip: "Toplu üretim." }] },
      { title: "3. Vektör deposu", learn: ["Vector DB"], question: "Vektör DB benzerlik aramasını nasıl indeksler (ANN)?", tasks: [{ goal: "Vektörleri bir vektör DB'ye yaz.", tip: "Index + metadata." }] },
      { title: "4. Güncel tut", learn: ["Freshness"], question: "Kaynak değişince embedding'leri yeniden üretmenin verimli yolu nedir?", tasks: [{ goal: "Değişen belgeleri yeniden işle.", tip: "İçerik hash'i." }] },
    ],
  },
];

const dataEngExtra3: Level[] = [
  {
    id: "de-partitioning",
    level: 3,
    track: "data-engineering",
    project: "Partitioning Stratejileri",
    difficulty: "Orta",
    emoji: "🪓",
    accent: "emerald",
    tier: "mid",
    description: "Veriyi doğru böl. Amaç: partition anahtarı seçimi, küçük dosya ve dengesizlik.",
    skills: ["Partitioning", "Bucketing", "Skew", "Compaction", "Pruning", "Maliyet"],
    steps: [
      { title: "1. Partition anahtarı", learn: ["Partitioning"], question: "Yanlış partition anahtarı (örn. yüksek kardinalite) neyi bozar?", tasks: [{ goal: "Sorgu desenine göre anahtar seç.", tip: "Sık filtrelenen kolon." }] },
      { title: "2. Bucketing", learn: ["Bucketing"], question: "Bucketing join'leri nasıl hızlandırır?", tasks: [{ goal: "Join anahtarına göre bucket'la.", tip: "Eşit dağıtım." }] },
      { title: "3. Dengesizlik", learn: ["Skew"], question: "Bir partition'ın devasa olması işi nasıl yavaşlatır?", tasks: [{ goal: "Dengesiz partition'ı düzelt.", tip: "Alt bölme." }] },
      { title: "4. Pruning ile maliyet", learn: ["Pruning"], question: "Partition pruning taranan veriyi ve maliyeti nasıl düşürür?", tasks: [{ goal: "Sorguda pruning'i doğrula.", tip: "Plan kontrolü." }] },
    ],
  },
  {
    id: "de-olap-cubes",
    level: 4,
    track: "data-engineering",
    project: "OLAP & Önceden Toplulaştırma",
    difficulty: "İleri",
    emoji: "🧊",
    accent: "sky",
    tier: "senior",
    description: "Analitik sorguları anlık yap. Amaç: pre-aggregation, cube, roll-up ve drill-down.",
    skills: ["OLAP", "Pre-aggregation", "Cube", "Roll-up", "Drill-down", "Materialized view"],
    steps: [
      { title: "1. Önceden topla", learn: ["Pre-aggregation"], question: "Sık sorulan metrikleri önceden hesaplamak yanıt süresini nasıl etkiler?", tasks: [{ goal: "Günlük özet tablosu üret.", tip: "Rollup." }] },
      { title: "2. Cube", learn: ["Cube"], question: "Çok boyutlu bir cube farklı kesitleri nasıl sunar?", tasks: [{ goal: "Boyutlara göre özet üret.", tip: "GROUPING SETS/CUBE." }] },
      { title: "3. Roll-up / drill-down", learn: ["Roll-up"], question: "Aylıktan günlüğe inmek (drill-down) için veri nasıl saklanmalı?", tasks: [{ goal: "Farklı granülasyonlar sun.", tip: "Hiyerarşi." }] },
      { title: "4. Tutarlılık", learn: ["Materialized view"], question: "Önceden toplanmış veri ham veriyle nasıl tutarlı tutulur?", tasks: [{ goal: "Özetleri güncel tut.", tip: "Artımlı yenileme." }] },
    ],
  },
  {
    id: "de-sessionization",
    level: 4,
    track: "data-engineering",
    project: "Oturumlaştırma (Sessionization)",
    difficulty: "İleri",
    emoji: "👣",
    accent: "amber",
    tier: "senior",
    description: "Olay akışını anlamlı oturumlara böl. Amaç: zaman aşımı, window ve kullanıcı yolculuğu.",
    skills: ["Sessionization", "Window function", "Timeout", "Event time", "Funnel", "Aggregation"],
    steps: [
      { title: "1. Olayları sırala", learn: ["Event time"], question: "Oturumlaştırmada olayları kullanıcı+zaman'a göre sıralamak neden ilk adım?", tasks: [{ goal: "Olayları kullanıcı/zamana göre sırala.", tip: "ORDER BY user, ts." }] },
      { title: "2. Oturum sınırı", learn: ["Timeout"], question: "İki olay arası 30dk boşluk neden yeni oturum sayılır?", tasks: [{ goal: "Zaman aşımıyla oturumları ayır.", tip: "Gap > eşik." }] },
      { title: "3. Oturum id ata", learn: ["Window function"], question: "Window fonksiyonuyla artan oturum id'si nasıl üretilir?", tasks: [{ goal: "Her oturuma id ver.", tip: "Kümülatif toplam." }] },
      { title: "4. Funnel analizi", learn: ["Funnel"], question: "Oturum içi adım dönüşümünü (funnel) ölçmek neyi ortaya çıkarır?", tasks: [{ goal: "Adımlar arası dönüşümü hesapla.", tip: "Sıralı adım sayımı." }] },
    ],
  },
  {
    id: "de-cohort",
    level: 3,
    track: "data-engineering",
    project: "Kohort & Tutundurma Analizi",
    difficulty: "Orta",
    emoji: "📊",
    accent: "lime",
    tier: "mid",
    description: "Kullanıcı gruplarını zamanla izle. Amaç: kohort tanımı, retention matrisi ve yorumlama.",
    skills: ["Cohort", "Retention", "Pivot", "Window function", "Aggregation", "SQL"],
    steps: [
      { title: "1. Kohort tanımla", learn: ["Cohort"], question: "İlk eylem tarihine göre kohort kurmak neyi karşılaştırılabilir yapar?", tasks: [{ goal: "Kullanıcıları katılım dönemine grupla.", tip: "İlk ay." }] },
      { title: "2. Aktiviteyi bağla", learn: ["JOIN"], question: "Kohortu sonraki aktiviteyle eşlemek için ne gerekir?", tasks: [{ goal: "Kohortu sonraki dönem aktivitesine bağla.", tip: "Tarih farkı." }] },
      { title: "3. Retention matrisi", learn: ["Pivot"], question: "Retention'ı dönem×kohort matrisine pivotlamak neyi gösterir?", tasks: [{ goal: "Bir retention matrisi üret.", tip: "Pivot." }] },
      { title: "4. Yorumla", learn: ["Aggregation"], question: "Erken dönem dik düşüşü hangi ürün sorununu işaret eder?", tasks: [{ goal: "Bulguları yorumla.", tip: "Trend okuma." }] },
    ],
  },
  {
    id: "de-geo-data",
    level: 3,
    track: "data-engineering",
    project: "Coğrafi (Geospatial) Veri",
    difficulty: "Orta",
    emoji: "🗺️",
    accent: "cyan",
    tier: "mid",
    description: "Konum verisini işle. Amaç: koordinat, mesafe, alan içi sorgu ve indeks.",
    skills: ["Geospatial", "Distance", "Spatial join", "Index", "Projection", "Aggregation"],
    steps: [
      { title: "1. Geo veriyi yükle", learn: ["Geospatial"], question: "Nokta/çizgi/poligon tipleri neyi temsil eder?", tasks: [{ goal: "Konum verisini geo tipine al.", tip: "Point/geometry." }] },
      { title: "2. Mesafe", learn: ["Distance"], question: "Coğrafi mesafe için neden düz mesafe yetmez?", tasks: [{ goal: "İki nokta arası mesafe hesapla.", tip: "Geo mesafe fonksiyonu." }] },
      { title: "3. Spatial join", learn: ["Spatial join"], question: "Bir noktanın hangi bölge içinde olduğunu ne bulur?", tasks: [{ goal: "Noktaları bölgelerle eşle.", tip: "Contains/within." }] },
      { title: "4. Geo indeks", learn: ["Index"], question: "Geo indeks alan sorgularını nasıl hızlandırır?", tasks: [{ goal: "Geo sorgusunu indeksle.", tip: "Spatial index." }] },
    ],
  },
  {
    id: "de-data-versioning",
    level: 4,
    track: "data-engineering",
    project: "Veri Versiyonlama & Time Travel",
    difficulty: "İleri",
    emoji: "🕰️",
    accent: "indigo",
    tier: "senior",
    description: "Veriyi geçmişe alabilmek. Amaç: snapshot, time travel, reproducibility.",
    skills: ["Data versioning", "Time travel", "Snapshot", "Reproducibility", "Rollback", "Audit"],
    steps: [
      { title: "1. Snapshot", learn: ["Snapshot"], question: "Veri snapshot'ı analizleri tekrarlanabilir yapmada nasıl yardım eder?", tasks: [{ goal: "Bir tablo sürümü sakla.", tip: "Versiyonlu yazma." }] },
      { title: "2. Time travel", learn: ["Time travel"], question: "Geçmiş bir ana sorgu atmak hata ayıklamada neyi sağlar?", tasks: [{ goal: "Önceki sürümü sorgula.", tip: "AS OF." }] },
      { title: "3. Tekrar üretilebilirlik", learn: ["Reproducibility"], question: "Bir raporu birebir yeniden üretmek için neyi sabitlemen gerekir?", tasks: [{ goal: "Veri+kod sürümünü sabitle.", tip: "Versiyon referansı." }] },
      { title: "4. Geri al", learn: ["Rollback"], question: "Bozuk bir yazımı önceki sürüme döndürmek neyi kurtarır?", tasks: [{ goal: "Bir tabloyu geri al.", tip: "Restore version." }] },
    ],
  },
  {
    id: "de-api-ingestion",
    level: 2,
    track: "data-engineering",
    project: "API'lerden Veri Toplama",
    difficulty: "Kolay-Orta",
    emoji: "🌐",
    accent: "rose",
    tier: "mid",
    description: "Dış API'lerden güvenilir veri çek. Amaç: sayfalama, hız sınırı, retry ve artımlı çekim.",
    skills: ["API", "Pagination", "Rate limit", "Retry", "Incremental", "Idempotency"],
    steps: [
      { title: "1. Sayfalı çek", learn: ["Pagination"], question: "API sayfalamasında tüm sayfaları çekmenin sağlam yolu nedir?", tasks: [{ goal: "Tüm sayfaları döngüyle çek.", tip: "cursor/next." }] },
      { title: "2. Hız sınırına uy", learn: ["Rate limit"], question: "429 yanıtında geri çekilmek (backoff) neden gerekir?", tasks: [{ goal: "Hız sınırına saygı göster.", tip: "Retry-After." }] },
      { title: "3. Artımlı çekim", learn: ["Incremental"], question: "Her seferinde tümünü çekmek yerine yalnızca yeniyi almak neyi korur?", tasks: [{ goal: "Son çekimden beri değişeni al.", tip: "since/updated_at." }] },
      { title: "4. Idempotent yaz", learn: ["Idempotency"], question: "Yeniden çekimde çift kaydı ne engeller?", tasks: [{ goal: "Upsert ile yaz.", tip: "Doğal anahtar." }] },
    ],
  },
  {
    id: "de-streaming-analytics",
    level: 5,
    track: "data-engineering",
    project: "Gerçek Zamanlı Analitik",
    difficulty: "İleri",
    emoji: "⚡",
    accent: "fuchsia",
    tier: "senior",
    description: "Akan veriden anlık metrik üret. Amaç: streaming agregasyon, durum ve materialize.",
    skills: ["Streaming", "Stateful", "Windowing", "Materialized", "Exactly-once", "Latency"],
    steps: [
      { title: "1. Akış agregasyonu", learn: ["Streaming"], question: "Akışta çalışan toplam tutmak için durum (state) neden gerekir?", tasks: [{ goal: "Akan veride canlı metrik üret.", tip: "Stateful aggregate." }] },
      { title: "2. Pencere & geç veri", learn: ["Windowing"], question: "Gerçek zamanlı pencerede geç veriyi ne kadar beklemelisin?", tasks: [{ goal: "Pencere + watermark uygula.", tip: "Gecikme toleransı." }] },
      { title: "3. Canlı materialize", learn: ["Materialized"], question: "Sürekli güncellenen bir materialized view neyi mümkün kılar?", tasks: [{ goal: "Sonucu sürekli güncel tut.", tip: "Streaming MV." }] },
      { title: "4. Gecikme & doğruluk", learn: ["Latency"], question: "Düşük gecikme ile tam doğruluk arasındaki ödünleşimi nasıl yönetirsin?", tasks: [{ goal: "Hedef gecikmeyi belirle.", tip: "Trade-off kararı." }] },
    ],
  },
  {
    id: "de-cost-optimization",
    level: 4,
    track: "data-engineering",
    project: "Veri Platformu Maliyet Optimizasyonu",
    difficulty: "İleri",
    emoji: "💰",
    accent: "amber",
    tier: "senior",
    description: "Veri faturasını kontrol et. Amaç: depolama katmanları, sorgu maliyeti ve kaynak boyutlama.",
    skills: ["Maliyet", "Storage tiers", "Query cost", "Right-sizing", "Retention", "Monitoring"],
    steps: [
      { title: "1. Maliyeti gör", learn: ["Monitoring"], question: "Maliyeti iş yüküne bağlamadan optimize etmek neden zordur?", tasks: [{ goal: "En pahalı işleri bul.", tip: "Maliyet raporu." }] },
      { title: "2. Depolama katmanı", learn: ["Storage tiers"], question: "Sık erişilmeyen veriyi soğuk katmana almak neyi düşürür?", tasks: [{ goal: "Soğuk veriyi ucuz katmana taşı.", tip: "Lifecycle policy." }] },
      { title: "3. Sorgu maliyeti", learn: ["Query cost"], question: "Pahalı tam tarama sorgularını ne ucuzlatır?", tasks: [{ goal: "En pahalı sorguları optimize et.", tip: "Partition/MV." }] },
      { title: "4. Kaynak boyutlama", learn: ["Right-sizing"], question: "Aşırı tahsis edilmiş kümeler maliyeti nasıl şişirir?", tasks: [{ goal: "Kümeleri doğru boyutla.", tip: "Kullanıma göre." }] },
    ],
  },
  {
    id: "de-graph-data",
    level: 4,
    track: "data-engineering",
    project: "Graf Verisi & İlişki Analizi",
    difficulty: "İleri",
    emoji: "🕸️",
    accent: "violet",
    tier: "senior",
    description: "Bağlantıları veri olarak modelle. Amaç: düğüm/kenar, yol sorgusu ve graf algoritmaları.",
    skills: ["Graph", "Node/Edge", "Traversal", "Path query", "Centrality", "Modeling"],
    steps: [
      { title: "1. Düğüm & kenar", learn: ["Node/Edge"], question: "İlişkileri graf olarak modellemek ilişkisel join'e göre neyi kolaylaştırır?", tasks: [{ goal: "Varlıkları düğüm, ilişkileri kenar yap.", tip: "Node/edge." }] },
      { title: "2. Komşuluk sorgusu", learn: ["Traversal"], question: "Çok-hop ilişki sorgusu (arkadaşın arkadaşı) ilişkiselde neden zordur?", tasks: [{ goal: "Komşuları gez.", tip: "Traversal." }] },
      { title: "3. En kısa yol", learn: ["Path query"], question: "İki düğüm arası en kısa yol hangi problemleri çözer?", tasks: [{ goal: "İki düğüm arası yol bul.", tip: "Shortest path." }] },
      { title: "4. Merkeziyet", learn: ["Centrality"], question: "Merkeziyet (centrality) ölçüsü 'önemli' düğümü nasıl bulur?", tasks: [{ goal: "Etkili düğümleri sırala.", tip: "Degree/PageRank." }] },
      { title: "5. Toplu işleme", learn: ["Modeling"], question: "Büyük graf algoritmalarını ölçeklemek neden ayrı bir disiplindir?", tasks: [{ goal: "Bir graf metriğini toplu hesapla.", tip: "Graf işleme." }] },
    ],
  },
  {
    id: "de-data-contracts",
    level: 4,
    track: "data-engineering",
    project: "Veri Sözleşmeleri & Şema Kayıt",
    difficulty: "İleri",
    emoji: "📋",
    accent: "cyan",
    tier: "senior",
    description: "Üretici-tüketici uyumunu garantiye al. Amaç: şema kayıt, uyumluluk ve kırıcı değişiklik yönetimi.",
    skills: ["Data contract", "Schema registry", "Compatibility", "Versioning", "Validation", "Governance"],
    steps: [
      { title: "1. Sözleşme tanımla", learn: ["Data contract"], question: "Açık bir veri sözleşmesi sessiz kırılmaları nasıl önler?", tasks: [{ goal: "Bir veri seti için sözleşme yaz.", tip: "Alan/tip/anlam." }] },
      { title: "2. Şema kayıt", learn: ["Schema registry"], question: "Merkezi şema kayıt tüketicileri nasıl korur?", tasks: [{ goal: "Şemayı bir kayıtta sürümle.", tip: "Registry." }] },
      { title: "3. Uyumluluk", learn: ["Compatibility"], question: "Geriye/ileriye uyumlu şema değişikliği ne demektir?", tasks: [{ goal: "Uyumlu bir değişiklik yap.", tip: "Alan ekle, zorunlu kılma." }] },
      { title: "4. Kırıcı değişiklik", learn: ["Versioning"], question: "Kaçınılmaz kırıcı değişikliği yönetmenin güvenli yolu nedir?", tasks: [{ goal: "Yeni sürüm yayınla, eskiyi destekle.", tip: "v2 + geçiş." }] },
      { title: "5. Doğrula", learn: ["Validation"], question: "Üretimi sözleşmeye karşı doğrulamak neyi otomatikleştirir?", tasks: [{ goal: "Üretilen veriyi sözleşmeye karşı test et.", tip: "CI kontrolü." }] },
      { title: "6. Yönetişim", learn: ["Governance"], question: "Sözleşmeleri kim onaylar ve değişikliği kim gözden geçirir?", tasks: [{ goal: "Bir sözleşme değişiklik süreci tanımla.", tip: "Review + sahiplik." }] },
    ],
  },
];

// ════════════════════════════════════════════════════════════════
//  DATA SCIENCE — ek projeler
// ════════════════════════════════════════════════════════════════
const dataScienceExtra: Level[] = [
  {
    id: "ds-pandas",
    level: 1, track: "data-science", project: "Pandas ile Veri Manipülasyonu", difficulty: "Başlangıç",
    emoji: "🐼", accent: "emerald", tier: "junior",
    description: "Veri biliminin İsviçre çakısı. Amaç: DataFrame, seçim, filtre, groupby ve birleştirme.",
    skills: ["Pandas", "DataFrame", "Filtreleme", "GroupBy", "Merge", "Apply"],
    steps: [
      { title: "1. DataFrame oku", learn: ["Pandas"], question: "DataFrame ile düz bir liste arasındaki temel fark nedir?", tasks: [{ goal: "Bir CSV'yi DataFrame'e oku, ilk satırlara bak.", tip: "read_csv, head." }] },
      { title: "2. Seç & filtrele", learn: ["Filtreleme"], question: "Boolean maskeleme satırları nasıl filtreler?", tasks: [{ goal: "Koşula uyan satırları seç.", tip: "df[df.x > k]." }] },
      { title: "3. GroupBy", learn: ["GroupBy"], question: "split-apply-combine deseni neyi ifade eder?", tasks: [{ goal: "Kategoriye göre özetle.", tip: "groupby().agg()." }] },
      { title: "4. Birleştir", learn: ["Merge"], question: "merge ile concat hangi durumda kullanılır?", tasks: [{ goal: "İki DataFrame'i birleştir.", tip: "merge on key." }] },
      { title: "5. Dönüştür (apply)", learn: ["Apply"], question: "Vektörel işlem apply'a göre neden tercih edilir?", tasks: [{ goal: "Bir kolonu dönüştür.", tip: "Vektörel > apply." }] },
      { title: "6. Pivot & reshape", learn: ["DataFrame"], question: "Geniş ve uzun format hangi analizde uygundur?", tasks: [{ goal: "Veriyi pivotla.", tip: "pivot_table." }] },
    ],
  },
  {
    id: "ds-eda",
    level: 2, track: "data-science", project: "Keşifçi Veri Analizi (EDA)", difficulty: "Kolay-Orta",
    emoji: "🔍", accent: "sky", tier: "junior",
    description: "Veriyi modellemeden önce tanı. Amaç: özet istatistik, dağılım, ilişki ve aykırı değer.",
    skills: ["EDA", "Descriptive stats", "Distribution", "Correlation", "Outlier", "Visualization"],
    steps: [
      { title: "1. Özet istatistik", learn: ["Descriptive stats"], question: "Ortalama, medyan ve mod ne zaman birbirinden ayrışır?", tasks: [{ goal: "Sayısal kolonları özetle.", tip: "describe()." }] },
      { title: "2. Dağılımı gör", learn: ["Distribution"], question: "Histogram bir değişken hakkında ne anlatır?", tasks: [{ goal: "Dağılımları çiz.", tip: "Histogram/box plot." }] },
      { title: "3. İlişki", learn: ["Correlation"], question: "Korelasyon nedensellik anlamına neden gelmez?", tasks: [{ goal: "Değişken ilişkilerini incele.", tip: "Korelasyon matrisi." }] },
      { title: "4. Aykırı değer", learn: ["Outlier"], question: "Aykırı değeri silmek mi düzeltmek mi — neye göre karar verilir?", tasks: [{ goal: "Aykırıları tespit et.", tip: "IQR/z-score." }] },
      { title: "5. Eksik veri", learn: ["EDA"], question: "Eksik verinin deseni (rastgele mi değil mi) neden önemli?", tasks: [{ goal: "Eksiklik desenini incele.", tip: "Eksik haritası." }] },
      { title: "6. Hipotez üret", learn: ["EDA"], question: "EDA'nın çıktısı neden 'cevap' değil 'soru' olmalı?", tasks: [{ goal: "Bulgulardan hipotez çıkar.", tip: "Test edilebilir." }] },
    ],
  },
  {
    id: "ds-cleaning",
    level: 2, track: "data-science", project: "Veri Temizleme & Hazırlama", difficulty: "Kolay-Orta",
    emoji: "🧹", accent: "lime", tier: "junior",
    description: "Gerçek veri kirlidir. Amaç: eksik değer, tip düzeltme, kodlama ve ölçekleme.",
    skills: ["Cleaning", "Imputation", "Encoding", "Scaling", "Outlier", "Tip dönüşümü"],
    steps: [
      { title: "1. Eksik değer", learn: ["Imputation"], question: "Eksik değeri ortalama ile doldurmak ne zaman yanıltır?", tasks: [{ goal: "Eksikleri uygun stratejiyle doldur.", tip: "Mean/median/model." }] },
      { title: "2. Tip & format", learn: ["Tip dönüşümü"], question: "Yanlış tip (string sayı) analizleri nasıl bozar?", tasks: [{ goal: "Kolonları doğru tiple.", tip: "to_datetime/astype." }] },
      { title: "3. Kategorik kodlama", learn: ["Encoding"], question: "One-hot ile label encoding hangi modelde uygundur?", tasks: [{ goal: "Kategorikleri sayıya çevir.", tip: "One-hot/ordinal." }] },
      { title: "4. Ölçekleme", learn: ["Scaling"], question: "Hangi modeller özellik ölçeklemeye duyarlıdır?", tasks: [{ goal: "Özellikleri ölçekle.", tip: "Standard/MinMax." }] },
      { title: "5. Sızıntı (leakage)", learn: ["Cleaning"], question: "Ölçeklemeyi tüm veride yapmak neden sızıntıdır?", tasks: [{ goal: "Dönüşümü sadece train'e fit et.", tip: "fit train, transform test." }] },
    ],
  },
  {
    id: "ds-visualization",
    level: 2, track: "data-science", project: "Veri Görselleştirme", difficulty: "Kolay-Orta",
    emoji: "📊", accent: "fuchsia", tier: "junior",
    description: "İyi grafik bin kelimeye bedeldir. Amaç: doğru grafik türü, anlatı ve yanıltmama.",
    skills: ["Visualization", "Chart türü", "Storytelling", "Color", "Annotation", "Misleading"],
    steps: [
      { title: "1. Doğru grafik", learn: ["Chart türü"], question: "Pasta grafiği ne zaman kötü bir seçimdir?", tasks: [{ goal: "Veriye uygun grafik seç.", tip: "Karşılaştırma/trend/dağılım." }] },
      { title: "2. Trend", learn: ["Visualization"], question: "Zaman serisini çizgiyle göstermek neyi vurgular?", tasks: [{ goal: "Bir trendi çiz.", tip: "Çizgi grafiği." }] },
      { title: "3. Karşılaştırma", learn: ["Visualization"], question: "Sıralı bar grafiği karşılaştırmayı nasıl kolaylaştırır?", tasks: [{ goal: "Kategorileri karşılaştır.", tip: "Sıralı bar." }] },
      { title: "4. Yanıltmama", learn: ["Misleading"], question: "Kesik y-ekseni neden yanıltıcı olabilir?", tasks: [{ goal: "Dürüst eksenler kullan.", tip: "0'dan başla." }] },
      { title: "5. Anlatı", learn: ["Storytelling"], question: "Bir grafik tek bir mesaj vermeli — neden?", tasks: [{ goal: "Grafiği başlık/annotation ile anlat.", tip: "Tek net mesaj." }] },
    ],
  },
  {
    id: "ds-statistics",
    level: 2, track: "data-science", project: "İstatistik Temelleri", difficulty: "Kolay-Orta",
    emoji: "🎲", accent: "amber", tier: "junior",
    description: "Veri biliminin matematiği. Amaç: dağılımlar, merkezi limit, örnekleme ve güven aralığı.",
    skills: ["Probability", "Distribution", "CLT", "Sampling", "Confidence interval", "Variance"],
    steps: [
      { title: "1. Merkez & yayılım", learn: ["Variance"], question: "Standart sapma veriyi tek başına ortalamadan daha iyi nasıl anlatır?", tasks: [{ goal: "Merkez ve yayılımı hesapla.", tip: "Mean/std." }] },
      { title: "2. Dağılımlar", learn: ["Distribution"], question: "Normal dağılım neden bu kadar sık karşımıza çıkar?", tasks: [{ goal: "Bir dağılımı tanı.", tip: "Normal/uniform." }] },
      { title: "3. Örnekleme", learn: ["Sampling"], question: "Önyargılı (biased) örnek sonuçları nasıl bozar?", tasks: [{ goal: "Temsili bir örnek al.", tip: "Rastgele örnekleme." }] },
      { title: "4. Merkezi limit", learn: ["CLT"], question: "Merkezi limit teoremi neden bu kadar güçlüdür?", tasks: [{ goal: "Örnek ortalamalarının dağılımını gözlemle.", tip: "Tekrarlı örnekleme." }] },
      { title: "5. Güven aralığı", learn: ["Confidence interval"], question: "%95 güven aralığı tam olarak neyi söyler (ve neyi söylemez)?", tasks: [{ goal: "Bir tahmin için güven aralığı hesapla.", tip: "Aralık + belirsizlik." }] },
    ],
  },
  {
    id: "ds-hypothesis",
    level: 3, track: "data-science", project: "Hipotez Testi", difficulty: "Orta",
    emoji: "⚖️", accent: "violet", tier: "mid",
    description: "İddiaları veriyle sına. Amaç: H0/H1, p-değeri, hata türleri ve test seçimi.",
    skills: ["Hypothesis test", "p-value", "Type I/II", "t-test", "Power", "Significance"],
    steps: [
      { title: "1. H0 / H1", learn: ["Hypothesis test"], question: "Sıfır hipotezini 'kabul etmek' yerine 'reddedememek' neden doğru ifadedir?", tasks: [{ goal: "Bir hipotez çifti yaz.", tip: "H0 vs H1." }] },
      { title: "2. p-değeri", learn: ["p-value"], question: "p-değeri 'hipotezin doğru olma olasılığı' DEĞİLDİR — peki nedir?", tasks: [{ goal: "Bir test yapıp p-değeri yorumla.", tip: "Anlamlılık eşiği." }] },
      { title: "3. Hata türleri", learn: ["Type I/II"], question: "Tip I ve Tip II hata arasındaki ödünleşim nedir?", tasks: [{ goal: "Yanlış pozitif/negatifi değerlendir.", tip: "α ve β." }] },
      { title: "4. Test seçimi", learn: ["t-test"], question: "t-test ile ki-kare testi hangi veri türünde kullanılır?", tasks: [{ goal: "Veriye uygun testi seç.", tip: "Sayısal/kategorik." }] },
      { title: "5. Güç (power)", learn: ["Power"], question: "Az örnekle yapılan testin gücü neden düşüktür?", tasks: [{ goal: "Gerekli örnek boyutunu düşün.", tip: "Power analizi." }] },
    ],
  },
  {
    id: "ds-linear-regression",
    level: 3, track: "data-science", project: "Doğrusal Regresyon", difficulty: "Orta",
    emoji: "📈", accent: "emerald", tier: "mid",
    description: "İlk tahmin modeli. Amaç: doğrusal model, katsayı yorumu, varsayımlar ve değerlendirme.",
    skills: ["Linear regression", "Coefficients", "Residuals", "R²", "Assumptions", "Train/test"],
    steps: [
      { title: "1. Modeli kur", learn: ["Linear regression"], question: "Doğrusal regresyon neyi 'en iyi çizgi' olarak bulur?", tasks: [{ goal: "Bir doğrusal model eğit.", tip: "fit(X, y)." }] },
      { title: "2. Katsayı yorumu", learn: ["Coefficients"], question: "Bir katsayı pratikte ne anlatır?", tasks: [{ goal: "Katsayıları yorumla.", tip: "Birim değişim etkisi." }] },
      { title: "3. Artıklar (residuals)", learn: ["Residuals"], question: "Artık grafiği model varsayımlarını nasıl test eder?", tasks: [{ goal: "Artıkları incele.", tip: "Residual plot." }] },
      { title: "4. Değerlendir (R²)", learn: ["R²"], question: "Yüksek R² her zaman iyi model demek midir?", tasks: [{ goal: "Modeli test setinde değerlendir.", tip: "R²/RMSE." }] },
      { title: "5. Varsayımlar", learn: ["Assumptions"], question: "Doğrusallık/normallik varsayımları ihlal edilirse ne olur?", tasks: [{ goal: "Varsayımları kontrol et.", tip: "Linearity/homoscedasticity." }] },
    ],
  },
  {
    id: "ds-classification",
    level: 3, track: "data-science", project: "Sınıflandırma (Lojistik Regresyon)", difficulty: "Orta",
    emoji: "🎯", accent: "sky", tier: "mid",
    description: "Kategori tahmini. Amaç: lojistik regresyon, eşik, metrikler ve karışıklık matrisi.",
    skills: ["Classification", "Logistic regression", "Threshold", "Confusion matrix", "Precision/Recall", "ROC"],
    steps: [
      { title: "1. Lojistik model", learn: ["Logistic regression"], question: "Lojistik regresyon neden olasılık (0-1) üretir?", tasks: [{ goal: "İkili sınıflandırıcı eğit.", tip: "Sigmoid çıktı." }] },
      { title: "2. Karışıklık matrisi", learn: ["Confusion matrix"], question: "TP/FP/TN/FN neyi ifade eder?", tasks: [{ goal: "Tahminleri matrise dök.", tip: "Confusion matrix." }] },
      { title: "3. Precision/Recall", learn: ["Precision/Recall"], question: "Spam filtresinde precision mı recall mı önemli?", tasks: [{ goal: "Precision/recall/F1 hesapla.", tip: "Bağlama göre." }] },
      { title: "4. Eşik", learn: ["Threshold"], question: "Karar eşiğini değiştirmek precision-recall dengesini nasıl kaydırır?", tasks: [{ goal: "Eşiği ayarla.", tip: "0.5'i değiştir." }] },
      { title: "5. ROC/AUC", learn: ["ROC"], question: "AUC eşikten bağımsız olarak neyi ölçer?", tasks: [{ goal: "ROC eğrisi ve AUC üret.", tip: "ROC-AUC." }] },
    ],
  },
  {
    id: "ds-tree-models",
    level: 3, track: "data-science", project: "Ağaç Modelleri & Ensemble", difficulty: "Orta",
    emoji: "🌳", accent: "lime", tier: "mid",
    description: "Güçlü ve yorumlanabilir modeller. Amaç: karar ağacı, random forest, boosting ve önem.",
    skills: ["Decision tree", "Random forest", "Boosting", "Feature importance", "Overfitting", "Ensemble"],
    steps: [
      { title: "1. Karar ağacı", learn: ["Decision tree"], question: "Bir karar ağacı bölünmeyi neye göre seçer?", tasks: [{ goal: "Bir karar ağacı eğit.", tip: "Bölme kriteri." }] },
      { title: "2. Aşırı uyum", learn: ["Overfitting"], question: "Derin bir ağaç neden ezberler?", tasks: [{ goal: "Derinliği sınırla.", tip: "max_depth." }] },
      { title: "3. Random forest", learn: ["Random forest"], question: "Birçok ağacın ortalaması varyansı nasıl düşürür?", tasks: [{ goal: "Bir random forest eğit.", tip: "Ensemble." }] },
      { title: "4. Boosting", learn: ["Boosting"], question: "Boosting hataları sırayla nasıl düzeltir?", tasks: [{ goal: "Bir gradient boosting modeli eğit.", tip: "XGBoost/LightGBM." }] },
      { title: "5. Özellik önemi", learn: ["Feature importance"], question: "Özellik önemi yorumu hangi tuzakları barındırır?", tasks: [{ goal: "Önemli özellikleri sırala.", tip: "Importance." }] },
    ],
  },
  {
    id: "ds-clustering",
    level: 3, track: "data-science", project: "Kümeleme (Clustering)", difficulty: "Orta",
    emoji: "🫧", accent: "cyan", tier: "mid",
    description: "Etiketsiz veride yapı bul. Amaç: k-means, küme sayısı, ölçekleme ve değerlendirme.",
    skills: ["Clustering", "K-means", "Elbow", "Silhouette", "Scaling", "Unsupervised"],
    steps: [
      { title: "1. K-means", learn: ["K-means"], question: "K-means kümeleri neye göre oluşturur?", tasks: [{ goal: "Veriyi kümele.", tip: "fit + labels." }] },
      { title: "2. Ölçekleme şart", learn: ["Scaling"], question: "Ölçeklemeden k-means neden yanıltır?", tasks: [{ goal: "Önce ölçekle.", tip: "Standardize." }] },
      { title: "3. K seçimi", learn: ["Elbow"], question: "Doğru küme sayısını seçmek neden öznel olabilir?", tasks: [{ goal: "Elbow/silhouette ile k seç.", tip: "Inertia." }] },
      { title: "4. Değerlendir", learn: ["Silhouette"], question: "Etiket yokken küme kalitesi nasıl ölçülür?", tasks: [{ goal: "Silhouette skoru hesapla.", tip: "İç tutarlılık." }] },
      { title: "5. Yorumla", learn: ["Unsupervised"], question: "Kümeleri 'anlamlı' kılan iş yorumu neden gerekir?", tasks: [{ goal: "Kümeleri profille.", tip: "Küme özetleri." }] },
    ],
  },
  {
    id: "ds-dimensionality",
    level: 4, track: "data-science", project: "Boyut İndirgeme (PCA)", difficulty: "İleri",
    emoji: "🗜️", accent: "violet", tier: "senior",
    description: "Çok boyutu sıkıştır. Amaç: PCA, açıklanan varyans, görselleştirme ve ödünleşim.",
    skills: ["PCA", "Variance explained", "Dimensionality", "Visualization", "Scaling", "t-SNE"],
    steps: [
      { title: "1. Boyut laneti", learn: ["Dimensionality"], question: "'Boyut laneti' modelleri nasıl zorlar?", tasks: [{ goal: "Yüksek boyutun etkisini gözlemle.", tip: "Seyreklik." }] },
      { title: "2. PCA", learn: ["PCA"], question: "PCA hangi yönleri 'önemli' sayar?", tasks: [{ goal: "PCA uygula.", tip: "Bileşenler." }] },
      { title: "3. Açıklanan varyans", learn: ["Variance explained"], question: "Kaç bileşen tutacağına nasıl karar verirsin?", tasks: [{ goal: "Varyans oranına göre seç.", tip: "Kümülatif varyans." }] },
      { title: "4. Görselleştir", learn: ["t-SNE"], question: "t-SNE/UMAP görselleştirmesini yorumlarken neye dikkat?", tasks: [{ goal: "2B'ye indirip görselleştir.", tip: "Mesafeleri abartma." }] },
    ],
  },
  {
    id: "ds-feature-engineering",
    level: 3, track: "data-science", project: "Özellik Mühendisliği", difficulty: "Orta",
    emoji: "🛠️", accent: "amber", tier: "mid",
    description: "Model kadar özellik önemli. Amaç: türetme, kodlama, etkileşim ve seçim.",
    skills: ["Feature engineering", "Encoding", "Interaction", "Binning", "Selection", "Leakage"],
    steps: [
      { title: "1. Özellik türet", learn: ["Feature engineering"], question: "Ham veriden iyi özellik üretmek modelden neden daha etkili olabilir?", tasks: [{ goal: "Yeni özellikler türet.", tip: "Oran/fark/tarih parçaları." }] },
      { title: "2. Binning", learn: ["Binning"], question: "Sürekli değişkeni gruplamak (binning) ne zaman yardımcı olur?", tasks: [{ goal: "Bir değişkeni grupla.", tip: "Quantile bin." }] },
      { title: "3. Etkileşim", learn: ["Interaction"], question: "İki özelliğin etkileşimi tek başlarına gizli olanı nasıl ortaya çıkarır?", tasks: [{ goal: "Etkileşim özelliği oluştur.", tip: "Çarpım/oran." }] },
      { title: "4. Özellik seçimi", learn: ["Selection"], question: "Çok özellik neden bazen daha kötü model demektir?", tasks: [{ goal: "Gereksiz özellikleri ele.", tip: "Önem/korelasyon." }] },
      { title: "5. Sızıntıdan kaçın", learn: ["Leakage"], question: "Hedeften türeyen bir özellik neden sahte başarı verir?", tasks: [{ goal: "Sızıntılı özellikleri tespit et.", tip: "Zaman/hedef kontrolü." }] },
    ],
  },
  {
    id: "ds-model-evaluation",
    level: 3, track: "data-science", project: "Model Değerlendirme & Doğrulama", difficulty: "Orta",
    emoji: "🧪", accent: "rose", tier: "mid",
    description: "Modelin gerçekte iyi mi? Amaç: train/test, çapraz doğrulama, overfitting ve metrik seçimi.",
    skills: ["Train/test", "Cross-validation", "Overfitting", "Metrics", "Baseline", "Learning curve"],
    steps: [
      { title: "1. Train/test ayrımı", learn: ["Train/test"], question: "Test setine bakarak karar vermek neden sızıntıdır?", tasks: [{ goal: "Veriyi ayır.", tip: "Hold-out." }] },
      { title: "2. Çapraz doğrulama", learn: ["Cross-validation"], question: "K-fold tek bir ayrımdan neden daha güvenilirdir?", tasks: [{ goal: "K-fold CV uygula.", tip: "Katlar." }] },
      { title: "3. Baseline", learn: ["Baseline"], question: "Basit bir baseline neden ilk adım olmalı?", tasks: [{ goal: "Bir baseline ile kıyasla.", tip: "Çoğunluk/ortalama." }] },
      { title: "4. Overfitting teşhisi", learn: ["Overfitting"], question: "Train-test başarı farkı neyi gösterir?", tasks: [{ goal: "Öğrenme eğrisini incele.", tip: "Learning curve." }] },
      { title: "5. Doğru metrik", learn: ["Metrics"], question: "Dengesiz veride accuracy neden yanıltır?", tasks: [{ goal: "Probleme uygun metrik seç.", tip: "F1/AUC/RMSE." }] },
    ],
  },
  {
    id: "ds-imbalanced",
    level: 4, track: "data-science", project: "Dengesiz Veri", difficulty: "İleri",
    emoji: "⚖️", accent: "indigo", tier: "senior",
    description: "Nadir olayı yakala. Amaç: yeniden örnekleme, ağırlık, eşik ve doğru metrik.",
    skills: ["Imbalanced", "Resampling", "SMOTE", "Class weight", "Threshold", "PR curve"],
    steps: [
      { title: "1. Sorunu gör", learn: ["Imbalanced"], question: "%99 negatif veride 'hep negatif' tahmin neden tehlikeli iyidir?", tasks: [{ goal: "Sınıf dağılımını incele.", tip: "Oran." }] },
      { title: "2. Yeniden örnekleme", learn: ["Resampling"], question: "Oversampling ile undersampling ödünleşimi nedir?", tasks: [{ goal: "Dengeyi yeniden kur.", tip: "Over/under/SMOTE." }] },
      { title: "3. Sınıf ağırlığı", learn: ["Class weight"], question: "Modeli azınlık sınıfına ağırlık vermeye nasıl zorlarsın?", tasks: [{ goal: "Sınıf ağırlığı uygula.", tip: "class_weight." }] },
      { title: "4. Doğru metrik", learn: ["PR curve"], question: "Dengesiz veride PR eğrisi ROC'tan neden daha bilgilendirici?", tasks: [{ goal: "PR/F1 ile değerlendir.", tip: "PR-AUC." }] },
    ],
  },
  {
    id: "ds-time-series-forecast",
    level: 4, track: "data-science", project: "Zaman Serisi Tahmini", difficulty: "İleri",
    emoji: "🔮", accent: "sky", tier: "senior",
    description: "Geleceği tahmin et. Amaç: trend/mevsimsellik, durağanlık, baseline ve değerlendirme.",
    skills: ["Forecasting", "Trend", "Seasonality", "Stationarity", "Baseline", "Backtesting"],
    steps: [
      { title: "1. Bileşenler", learn: ["Seasonality"], question: "Trend, mevsimsellik ve gürültü nasıl ayrıştırılır?", tasks: [{ goal: "Seriyi bileşenlere ayır.", tip: "Decompose." }] },
      { title: "2. Durağanlık", learn: ["Stationarity"], question: "Birçok model neden durağan seri ister?", tasks: [{ goal: "Durağanlığı kontrol et/sağla.", tip: "Fark alma." }] },
      { title: "3. Baseline tahmin", learn: ["Baseline"], question: "Naif/mevsimsel naif tahmin neden iyi bir kıyastır?", tasks: [{ goal: "Bir baseline tahmin kur.", tip: "Son değer/mevsimsel." }] },
      { title: "4. Model & backtest", learn: ["Backtesting"], question: "Zaman serisinde rastgele CV neden yanlıştır?", tasks: [{ goal: "Zaman-bilinçli doğrulama yap.", tip: "Geçmiş→gelecek." }] },
      { title: "5. Değerlendir", learn: ["Forecasting"], question: "Tahmin hatasını baseline'a göre raporlamak neyi gösterir?", tasks: [{ goal: "Hatayı baseline ile kıyasla.", tip: "MAE/MAPE." }] },
    ],
  },
  {
    id: "ds-ab-testing",
    level: 4, track: "data-science", project: "A/B Test & Deney Tasarımı", difficulty: "İleri",
    emoji: "🔬", accent: "emerald", tier: "senior",
    description: "Kararları deneyle al. Amaç: hipotez, örnek boyutu, anlamlılık ve tuzaklar.",
    skills: ["A/B test", "Experiment design", "Sample size", "Significance", "Power", "Pitfalls"],
    steps: [
      { title: "1. Metrik & hipotez", learn: ["Experiment design"], question: "Bir A/B testinde 'başarı metriği'ni önceden sabitlemek neden şart?", tasks: [{ goal: "Birincil metriği ve hipotezi belirle.", tip: "Tek birincil metrik." }] },
      { title: "2. Örnek boyutu", learn: ["Sample size"], question: "Yetersiz örnekle test neden 'sonuçsuz' kalır?", tasks: [{ goal: "Gerekli örnek boyutunu hesapla.", tip: "Etki büyüklüğü + güç." }] },
      { title: "3. Çalıştır & ölç", learn: ["Significance"], question: "Test bitmeden 'sonuca bakmak' (peeking) neden yanıltır?", tasks: [{ goal: "Testi süresince çalıştır.", tip: "Erken bakma." }] },
      { title: "4. Yorumla", learn: ["Pitfalls"], question: "İstatistiksel anlamlılık ile pratik anlamlılık farkı nedir?", tasks: [{ goal: "Sonucu iş etkisiyle yorumla.", tip: "Etki büyüklüğü." }] },
    ],
  },
  {
    id: "ds-recommendation",
    level: 5, track: "data-science", project: "Öneri Sistemleri", difficulty: "İleri",
    emoji: "🎁", accent: "fuchsia", tier: "senior",
    description: "İlgili içeriği öner. Amaç: işbirlikçi filtreleme, içerik temelli ve değerlendirme.",
    skills: ["Recommendation", "Collaborative filtering", "Content-based", "Cold start", "Evaluation", "Matrix factorization"],
    steps: [
      { title: "1. İçerik temelli", learn: ["Content-based"], question: "İçerik temelli öneri benzerliği neye göre ölçer?", tasks: [{ goal: "Benzer öğeleri öner.", tip: "Özellik benzerliği." }] },
      { title: "2. İşbirlikçi filtreleme", learn: ["Collaborative filtering"], question: "'Senin gibi kullanıcılar' yaklaşımı neyi varsayar?", tasks: [{ goal: "Kullanıcı-öğe matrisinden öner.", tip: "Benzer kullanıcılar." }] },
      { title: "3. Matris ayrıştırma", learn: ["Matrix factorization"], question: "Gizli faktörler (latent factors) neyi yakalar?", tasks: [{ goal: "Matris ayrıştırma uygula.", tip: "Latent factors." }] },
      { title: "4. Soğuk başlangıç", learn: ["Cold start"], question: "Yeni kullanıcı/öğe için öneri sorunu nasıl çözülür?", tasks: [{ goal: "Cold start stratejisi ekle.", tip: "Popülerlik/içerik." }] },
      { title: "5. Değerlendir", learn: ["Evaluation"], question: "Önerinin 'iyiliğini' offline ölçmek neden zordur?", tasks: [{ goal: "Öneriyi değerlendir.", tip: "Precision@k." }] },
    ],
  },
  {
    id: "ds-nlp-basics",
    level: 4, track: "data-science", project: "Metin Sınıflandırma (NLP)", difficulty: "İleri",
    emoji: "📝", accent: "violet", tier: "senior",
    description: "Metni modele sok. Amaç: temizleme, vektörleştirme, sınıflandırma ve değerlendirme.",
    skills: ["NLP", "Tokenization", "TF-IDF", "Embedding", "Classification", "Evaluation"],
    steps: [
      { title: "1. Metni temizle", learn: ["Tokenization"], question: "Tokenization ve normalizasyon neden ilk adım?", tasks: [{ goal: "Metni token'lara ayır, temizle.", tip: "Lower/temizlik." }] },
      { title: "2. Vektörleştir (TF-IDF)", learn: ["TF-IDF"], question: "TF-IDF bir kelimenin önemini nasıl ölçer?", tasks: [{ goal: "Metni TF-IDF'e çevir.", tip: "Vektörleştir." }] },
      { title: "3. Sınıflandır", learn: ["Classification"], question: "Basit bir lineer model metin için neden iyi bir başlangıç?", tasks: [{ goal: "Bir metin sınıflandırıcı eğit.", tip: "TF-IDF + lineer." }] },
      { title: "4. Embedding", learn: ["Embedding"], question: "Embedding TF-IDF'e göre anlamı nasıl daha iyi yakalar?", tasks: [{ goal: "Embedding ile dene.", tip: "Önceden eğitilmiş." }] },
      { title: "5. Değerlendir", learn: ["Evaluation"], question: "Dengesiz metin verisinde hangi metrik uygun?", tasks: [{ goal: "F1 ile değerlendir.", tip: "Sınıf bazlı." }] },
    ],
  },
  {
    id: "ds-hyperparameter",
    level: 4, track: "data-science", project: "Hiperparametre Optimizasyonu", difficulty: "İleri",
    emoji: "🎛️", accent: "amber", tier: "senior",
    description: "Modeli ince ayarla. Amaç: grid/random/bayesian arama ve doğru doğrulama.",
    skills: ["Hyperparameter", "Grid search", "Random search", "Bayesian", "Cross-validation", "Overfitting"],
    steps: [
      { title: "1. Hiperparametre nedir", learn: ["Hyperparameter"], question: "Parametre ile hiperparametre arasındaki fark nedir?", tasks: [{ goal: "Ayarlanacak hiperparametreleri belirle.", tip: "Model ayarları." }] },
      { title: "2. Grid vs random", learn: ["Random search"], question: "Random search grid'e göre neden çoğu zaman verimli?", tasks: [{ goal: "Random search uygula.", tip: "Arama uzayı." }] },
      { title: "3. Bayesian arama", learn: ["Bayesian"], question: "Bayesian optimizasyon önceki denemelerden nasıl öğrenir?", tasks: [{ goal: "Bayesian arama dene.", tip: "Akıllı arama." }] },
      { title: "4. Doğru doğrulama", learn: ["Cross-validation"], question: "Hiperparametre seçiminde test setini kullanmak neden sızıntıdır?", tasks: [{ goal: "Validation seti/CV kullan.", tip: "Test'i sona sakla." }] },
    ],
  },
  {
    id: "ds-interpretability",
    level: 5, track: "data-science", project: "Model Yorumlanabilirliği", difficulty: "İleri",
    emoji: "🔎", accent: "cyan", tier: "senior",
    description: "Modeli açıkla. Amaç: küresel/yerel açıklama, SHAP ve güven.",
    skills: ["Interpretability", "SHAP", "Feature importance", "Partial dependence", "Trust", "Bias"],
    steps: [
      { title: "1. Neden açıklama?", learn: ["Trust"], question: "Bir tahmini açıklayamamak hangi alanlarda kabul edilemez?", tasks: [{ goal: "Açıklanabilirlik ihtiyacını gerekçelendir.", tip: "Risk/regülasyon." }] },
      { title: "2. Küresel önem", learn: ["Feature importance"], question: "Küresel özellik önemi neyi söyler, neyi söylemez?", tasks: [{ goal: "Genel önem çıkar.", tip: "Importance." }] },
      { title: "3. Yerel açıklama (SHAP)", learn: ["SHAP"], question: "SHAP tek bir tahmini nasıl açıklar?", tasks: [{ goal: "Bir tahmini SHAP ile açıkla.", tip: "Katkı değerleri." }] },
      { title: "4. Kısmi bağımlılık", learn: ["Partial dependence"], question: "Partial dependence bir değişkenin etkisini nasıl izole eder?", tasks: [{ goal: "PDP çiz.", tip: "Tek değişken etkisi." }] },
    ],
  },
  {
    id: "ds-fairness",
    level: 5, track: "data-science", project: "Önyargı & Adillik (Fairness)", difficulty: "İleri",
    emoji: "⚖️", accent: "rose", tier: "senior",
    description: "Adil modeller kur. Amaç: önyargı kaynakları, adillik metrikleri ve azaltma.",
    skills: ["Fairness", "Bias", "Disparate impact", "Metrics", "Mitigation", "Ethics"],
    steps: [
      { title: "1. Önyargı kaynağı", learn: ["Bias"], question: "Önyargı veriden mi modelden mi gelir — ikisi nasıl ayrılır?", tasks: [{ goal: "Olası önyargı kaynaklarını listele.", tip: "Veri/etiket/örnekleme." }] },
      { title: "2. Adillik metriği", learn: ["Metrics"], question: "Farklı adillik tanımları neden aynı anda sağlanamaz?", tasks: [{ goal: "Gruplar arası metrik karşılaştır.", tip: "Eşit fırsat vb." }] },
      { title: "3. Ayrımcı etki", learn: ["Disparate impact"], question: "Korumalı gruba ayrımcı etkiyi nasıl ölçersin?", tasks: [{ goal: "Grup bazlı sonucu incele.", tip: "Oran farkı." }] },
      { title: "4. Azaltma", learn: ["Mitigation"], question: "Önyargıyı veri/model/çıktı katmanında azaltmanın yolları nelerdir?", tasks: [{ goal: "Bir azaltma uygula.", tip: "Pre/in/post-processing." }] },
    ],
  },
  {
    id: "ds-anomaly-detection",
    level: 4, track: "data-science", project: "Anomali Tespiti", difficulty: "İleri",
    emoji: "🚨", accent: "lime", tier: "senior",
    description: "Olağandışıyı bul. Amaç: istatistiksel ve model temelli tespit, eşik ve değerlendirme.",
    skills: ["Anomaly detection", "Statistical", "Isolation forest", "Threshold", "Evaluation", "Imbalanced"],
    steps: [
      { title: "1. İstatistiksel tespit", learn: ["Statistical"], question: "z-score/IQR temelli tespit ne zaman yetersiz kalır?", tasks: [{ goal: "İstatistiksel aykırıları bul.", tip: "z-score/IQR." }] },
      { title: "2. Model temelli", learn: ["Isolation forest"], question: "Isolation forest anomaliyi nasıl 'kolay izole edilen' olarak bulur?", tasks: [{ goal: "Bir anomali modeli eğit.", tip: "Isolation forest." }] },
      { title: "3. Eşik", learn: ["Threshold"], question: "Anomali eşiğini iş maliyetine göre nasıl ayarlarsın?", tasks: [{ goal: "Skoru eşikle.", tip: "FP/FN dengesi." }] },
      { title: "4. Değerlendir", learn: ["Evaluation"], question: "Etiket azken anomali modelini değerlendirmek neden zor?", tasks: [{ goal: "Mümkünse az etiketle doğrula.", tip: "Örnek inceleme." }] },
    ],
  },
  {
    id: "ds-sklearn-pipeline",
    level: 3, track: "data-science", project: "ML Pipeline (scikit-learn)", difficulty: "Orta",
    emoji: "🔧", accent: "indigo", tier: "mid",
    description: "Tekrarlanabilir ML akışı. Amaç: pipeline, ön işleme, sızıntı önleme ve serileştirme.",
    skills: ["Pipeline", "Preprocessing", "Leakage", "ColumnTransformer", "Serialization", "Reproducibility"],
    steps: [
      { title: "1. Pipeline kur", learn: ["Pipeline"], question: "Ön işleme + modeli pipeline'da birleştirmek sızıntıyı nasıl önler?", tasks: [{ goal: "Ön işleme + model pipeline'ı kur.", tip: "Pipeline." }] },
      { title: "2. Kolon bazlı işleme", learn: ["ColumnTransformer"], question: "Sayısal ve kategorik kolonları farklı işlemek neden gerekir?", tasks: [{ goal: "Kolon türüne göre işle.", tip: "ColumnTransformer." }] },
      { title: "3. CV ile birlikte", learn: ["Leakage"], question: "Pipeline'ı CV içinde fit etmek neden doğru yöntemdir?", tasks: [{ goal: "Pipeline'ı CV ile değerlendir.", tip: "Fold içinde fit." }] },
      { title: "4. Kaydet & yükle", learn: ["Serialization"], question: "Modeli serileştirirken sürüm uyumu neden önemli?", tasks: [{ goal: "Modeli kaydet ve yükle.", tip: "joblib/pickle." }] },
    ],
  },
  {
    id: "ds-deployment",
    level: 5, track: "data-science", project: "Model Servisleştirme", difficulty: "İleri",
    emoji: "🚀", accent: "emerald", tier: "senior",
    description: "Modeli üretime al. Amaç: servis, girdi doğrulama, izleme ve drift.",
    skills: ["Model serving", "Inference API", "Validation", "Monitoring", "Drift", "Versioning"],
    steps: [
      { title: "1. Inference API", learn: ["Inference API"], question: "Eğitim ile çıkarım (inference) ortamı neden ayrı düşünülür?", tasks: [{ goal: "Modeli bir API arkasına koy.", tip: "Predict endpoint." }] },
      { title: "2. Girdi doğrulama", learn: ["Validation"], question: "Beklenmedik girdi modeli nasıl 'saçmalatır'?", tasks: [{ goal: "Girdi şemasını doğrula.", tip: "Sınır/tip kontrolü." }] },
      { title: "3. İzleme", learn: ["Monitoring"], question: "Tahmin dağılımını izlemek hangi sessiz bozulmayı yakalar?", tasks: [{ goal: "Tahminleri ve gecikmeyi izle.", tip: "Metrikler." }] },
      { title: "4. Drift", learn: ["Drift"], question: "Veri/konsept drift modeli zamanla neden bozar?", tasks: [{ goal: "Girdi drift'ini tespit et.", tip: "Dağılım karşılaştır." }] },
      { title: "5. Yeniden eğitim", learn: ["Versioning"], question: "Modeli ne zaman yeniden eğiteceğine nasıl karar verilir?", tasks: [{ goal: "Yeniden eğitim tetikleyicisi tanımla.", tip: "Performans eşiği." }] },
    ],
  },
  {
    id: "ds-bayesian",
    level: 5, track: "data-science", project: "Bayesçi Düşünme", difficulty: "İleri",
    emoji: "🎰", accent: "violet", tier: "senior",
    description: "Belirsizliği güncelle. Amaç: önsel/sonsal, Bayes kuralı ve belirsizlik.",
    skills: ["Bayesian", "Prior/Posterior", "Bayes rule", "Uncertainty", "Inference", "A/B"],
    steps: [
      { title: "1. Bayes kuralı", learn: ["Bayes rule"], question: "Bayes kuralı inancı kanıtla nasıl günceller?", tasks: [{ goal: "Basit bir Bayes güncellemesi yap.", tip: "Prior→posterior." }] },
      { title: "2. Önsel seçimi", learn: ["Prior/Posterior"], question: "Önsel (prior) seçimi sonucu nasıl etkiler?", tasks: [{ goal: "Bir önsel seç ve gerekçelendir.", tip: "Bilgilendirici mi?" }] },
      { title: "3. Belirsizlik", learn: ["Uncertainty"], question: "Bayesçi yaklaşım nokta tahmininden çok neyi sunar?", tasks: [{ goal: "Sonsal dağılımı yorumla.", tip: "Aralık/belirsizlik." }] },
      { title: "4. Bayesçi A/B", learn: ["A/B"], question: "Bayesçi A/B testi klasik p-değerine göre neyi kolaylaştırır?", tasks: [{ goal: "Bayesçi bir A/B yorumla.", tip: "Olasılık ifadesi." }] },
    ],
  },
  {
    id: "ds-storytelling",
    level: 3, track: "data-science", project: "Veriyle Hikâye Anlatımı", difficulty: "Orta",
    emoji: "📰", accent: "amber", tier: "mid",
    description: "Analizi karara çevir. Amaç: kitleye göre anlatı, görsel ve öneri.",
    skills: ["Storytelling", "Audience", "Visualization", "Insight", "Recommendation", "Communication"],
    steps: [
      { title: "1. Kitleyi tanı", learn: ["Audience"], question: "Teknik olmayan kitleye sunum neyi değiştirir?", tasks: [{ goal: "Mesajı kitleye göre ayarla.", tip: "Jargonu azalt." }] },
      { title: "2. Tek mesaj", learn: ["Insight"], question: "Bir sunumun tek bir ana çıkarımı olması neden iyi?", tasks: [{ goal: "Ana çıkarımı netleştir.", tip: "Tek cümle." }] },
      { title: "3. Görselle destekle", learn: ["Visualization"], question: "Hangi grafik mesajı en net taşır?", tasks: [{ goal: "Mesajı bir grafikle destekle.", tip: "Sade görsel." }] },
      { title: "4. Öneriye bağla", learn: ["Recommendation"], question: "Analizi 'ne yapmalı'ya bağlamak neden değer üretir?", tasks: [{ goal: "Aksiyon önerisi yaz.", tip: "Karar odaklı." }] },
    ],
  },
  {
    id: "ds-capstone",
    level: 5, track: "data-science", project: "Uçtan Uca Veri Bilimi Projesi", difficulty: "İleri",
    emoji: "🏁", accent: "rose", tier: "senior",
    description: "Her şeyi birleştir. Amaç: problem tanımı, veri, model, değerlendirme ve sunum.",
    skills: ["End-to-end", "Problem framing", "Modeling", "Evaluation", "Communication", "Reproducibility"],
    steps: [
      { title: "1. Problemi çerçevele", learn: ["Problem framing"], question: "İş problemini ML problemine çevirmek neden ilk ve en kritik adım?", tasks: [{ goal: "Problemi ve başarı metriğini tanımla.", tip: "Tahmin hedefi." }] },
      { title: "2. Veri & EDA", learn: ["End-to-end"], question: "Veri kalitesi proje başarısını ne kadar belirler?", tasks: [{ goal: "Veriyi topla, temizle, keşfet.", tip: "EDA." }] },
      { title: "3. Modelle", learn: ["Modeling"], question: "Basit modelden başlamak neden iyi bir strateji?", tasks: [{ goal: "Baseline'dan başlayıp iyileştir.", tip: "Basit→karmaşık." }] },
      { title: "4. Değerlendir", learn: ["Evaluation"], question: "Modeli iş etkisiyle değerlendirmek neden teknik metriğin ötesinde?", tasks: [{ goal: "İş metriğiyle değerlendir.", tip: "Etki." }] },
      { title: "5. Sun & tekrarla", learn: ["Reproducibility"], question: "Projeyi tekrar üretilebilir ve sunulabilir yapmak neyi sağlar?", tasks: [{ goal: "Sonuçları sun ve kodu paylaş.", tip: "README + repo." }] },
    ],
  },
];

// ════════════════════════════════════════════════════════════════
//  AI — ek projeler (sağlayıcıdan bağımsız kavramlar)
// ════════════════════════════════════════════════════════════════
const aiExtra: Level[] = [
  {
    id: "ai-llm-basics",
    level: 1, track: "ai", project: "LLM Temelleri", difficulty: "Başlangıç",
    emoji: "🧠", accent: "emerald", tier: "junior",
    description: "Büyük dil modelleri nasıl çalışır? Amaç: token, bağlam, sampling ve sınırlar.",
    skills: ["LLM", "Token", "Context window", "Temperature", "Sınırlar", "API"],
    steps: [
      { title: "1. İlk çağrı", learn: ["LLM", "API"], question: "Bir LLM'e istek atarken 'prompt' tam olarak nedir?", tasks: [{ goal: "Bir LLM API'sine basit bir çağrı yap.", tip: "Prompt → yanıt." }] },
      { title: "2. Token", learn: ["Token"], question: "Token nedir ve neden kelime ile birebir değildir?", tasks: [{ goal: "Bir metnin token sayısını ölç.", tip: "Tokenizer." }] },
      { title: "3. Bağlam penceresi", learn: ["Context window"], question: "Bağlam penceresi dolunca ne olur?", tasks: [{ goal: "Bağlam limitini gözlemle.", tip: "Uzun girdi." }] },
      { title: "4. Sampling (temperature)", learn: ["Temperature"], question: "Temperature çıktının yaratıcılığını/kararlılığını nasıl etkiler?", tasks: [{ goal: "Farklı temperature dene.", tip: "0 vs yüksek." }] },
      { title: "5. Sınırlar & halüsinasyon", learn: ["Sınırlar"], question: "LLM neden emin görünerek yanlış üretebilir?", tasks: [{ goal: "Bir halüsinasyon örneği yakala.", tip: "Doğrulanabilir soru." }] },
    ],
  },
  {
    id: "ai-prompt-engineering",
    level: 2, track: "ai", project: "Prompt Mühendisliği", difficulty: "Kolay-Orta",
    emoji: "✍️", accent: "sky", tier: "junior",
    description: "Modele doğru sormayı öğren. Amaç: net talimat, örnekler, rol ve çıktı biçimi.",
    skills: ["Prompt", "Few-shot", "System prompt", "Chain-of-thought", "Output format", "Iteration"],
    steps: [
      { title: "1. Net talimat", learn: ["Prompt"], question: "Belirsiz prompt neden tutarsız çıktı verir?", tasks: [{ goal: "Net, spesifik bir prompt yaz.", tip: "Görev + kısıt." }] },
      { title: "2. Sistem promptu", learn: ["System prompt"], question: "Sistem promptu modelin davranışını nasıl yönlendirir?", tasks: [{ goal: "Bir rol/persona tanımla.", tip: "System rolü." }] },
      { title: "3. Few-shot", learn: ["Few-shot"], question: "Örnek vermek (few-shot) çıktıyı nasıl şekillendirir?", tasks: [{ goal: "Birkaç örnekle yönlendir.", tip: "Girdi→çıktı örnekleri." }] },
      { title: "4. Adım adım düşündür", learn: ["Chain-of-thought"], question: "Modeli adım adım düşündürmek karmaşık görevde neden yardımcı olur?", tasks: [{ goal: "Akıl yürütmeyi iste.", tip: "'Adım adım'." }] },
      { title: "5. Çıktı biçimi", learn: ["Output format"], question: "Çıktı formatını dayatmak (JSON) tüketimi nasıl kolaylaştırır?", tasks: [{ goal: "Yapılı çıktı iste.", tip: "Şema belirt." }] },
      { title: "6. İterasyon", learn: ["Iteration"], question: "Prompt'u veriyle iyileştirmek neden tek seferde yazmaktan iyidir?", tasks: [{ goal: "Prompt'u örneklerle iyileştir.", tip: "Hata analizi." }] },
    ],
  },
  {
    id: "ai-structured-output",
    level: 2, track: "ai", project: "Yapılandırılmış Çıktı", difficulty: "Kolay-Orta",
    emoji: "🧱", accent: "lime", tier: "mid",
    description: "Modelden güvenilir JSON al. Amaç: şema, doğrulama ve hata toleransı.",
    skills: ["Structured output", "JSON", "Schema", "Validation", "Tool use", "Error handling"],
    steps: [
      { title: "1. JSON iste", learn: ["JSON"], question: "Serbest metin yerine JSON istemek entegrasyonu nasıl kolaylaştırır?", tasks: [{ goal: "Modelden JSON çıktı al.", tip: "Şema tarif et." }] },
      { title: "2. Şema dayat", learn: ["Schema"], question: "Şema/structured output modunun serbest prompt'a üstünlüğü nedir?", tasks: [{ goal: "Bir şemaya bağla.", tip: "Structured output." }] },
      { title: "3. Doğrula", learn: ["Validation"], question: "Model şemayı bozarsa ne yapmalısın?", tasks: [{ goal: "Çıktıyı şemaya karşı doğrula.", tip: "Parse + validate." }] },
      { title: "4. Hata toleransı", learn: ["Error handling"], question: "Bozuk JSON'da retry/parse-fix stratejisi neden gerekir?", tasks: [{ goal: "Bozuk çıktıyı ele.", tip: "Retry/onarım." }] },
    ],
  },
  {
    id: "ai-tool-use",
    level: 3, track: "ai", project: "Araç Kullanımı (Tool/Function Calling)", difficulty: "Orta",
    emoji: "🔧", accent: "violet", tier: "mid",
    description: "Modele yetenek ekle. Amaç: araç tanımı, çağrı döngüsü, sonuç ve güvenlik.",
    skills: ["Tool use", "Function calling", "Tool schema", "Loop", "Validation", "Güvenlik"],
    steps: [
      { title: "1. Araç tanımla", learn: ["Tool schema"], question: "Bir aracı modele tanıtırken iyi bir açıklama neden kritik?", tasks: [{ goal: "Bir araç şeması tanımla.", tip: "İsim+açıklama+parametre." }] },
      { title: "2. Çağrıyı yakala", learn: ["Function calling"], question: "Model 'aracı çağırmak istiyorum' dediğinde akış nasıl ilerler?", tasks: [{ goal: "Model çağrısını yakala ve çalıştır.", tip: "Çağrı→yürüt." }] },
      { title: "3. Sonucu geri ver", learn: ["Loop"], question: "Araç sonucunu modele geri verme döngüsü neden gerekir?", tasks: [{ goal: "Sonucu modele döndür, devam ettir.", tip: "Tool result." }] },
      { title: "4. Parametre doğrulama", learn: ["Validation"], question: "Modelin verdiği araç argümanlarını doğrulamak neden şart?", tasks: [{ goal: "Argümanları doğrula.", tip: "Şema kontrolü." }] },
      { title: "5. Güvenlik", learn: ["Güvenlik"], question: "Yıkıcı bir aracı (sil/öde) modele vermenin riski nasıl yönetilir?", tasks: [{ goal: "Tehlikeli araçlara koruma ekle.", tip: "Onay/limit." }] },
    ],
  },
  {
    id: "ai-embeddings",
    level: 2, track: "ai", project: "Embedding & Anlamsal Arama", difficulty: "Kolay-Orta",
    emoji: "🧭", accent: "cyan", tier: "mid",
    description: "Anlamı sayıya çevir. Amaç: embedding, benzerlik, vektör arama ve uygulamalar.",
    skills: ["Embedding", "Cosine similarity", "Vector search", "Semantic", "Index", "Use cases"],
    steps: [
      { title: "1. Embedding üret", learn: ["Embedding"], question: "Embedding metni neden anlamsal bir uzaya taşır?", tasks: [{ goal: "Metinlerin embedding'ini üret.", tip: "Embedding modeli." }] },
      { title: "2. Benzerlik", learn: ["Cosine similarity"], question: "Kosinüs benzerliği neyi ölçer?", tasks: [{ goal: "İki metnin benzerliğini ölç.", tip: "Cosine." }] },
      { title: "3. Anlamsal arama", learn: ["Vector search"], question: "Anahtar kelime aramasının kaçırdığını anlamsal arama nasıl yakalar?", tasks: [{ goal: "En benzer metinleri bul.", tip: "Top-k." }] },
      { title: "4. Ölçekle (index)", learn: ["Index"], question: "Milyonlarca vektörde ANN indeks neyi mümkün kılar?", tasks: [{ goal: "Vektörleri indeksle.", tip: "ANN." }] },
    ],
  },
  {
    id: "ai-rag",
    level: 3, track: "ai", project: "RAG (Retrieval-Augmented Generation)", difficulty: "Orta",
    emoji: "📚", accent: "amber", tier: "mid",
    description: "Modele kendi verini öğret. Amaç: chunk, retrieval, bağlam ekleme ve kaynak gösterme.",
    skills: ["RAG", "Chunking", "Retrieval", "Context injection", "Citations", "Evaluation"],
    steps: [
      { title: "1. Belgeleri parçala", learn: ["Chunking"], question: "Chunk boyutu retrieval kalitesini nasıl etkiler?", tasks: [{ goal: "Belgeleri anlamlı parçalara böl.", tip: "Boyut/örtüşme." }] },
      { title: "2. İndeksle & getir", learn: ["Retrieval"], question: "Soruya en alakalı parçaları getirmek neden ilk adım?", tasks: [{ goal: "Soruya göre ilgili parçaları getir.", tip: "Vektör arama." }] },
      { title: "3. Bağlama ekle", learn: ["Context injection"], question: "Getirilen parçayı prompt'a eklemek halüsinasyonu nasıl azaltır?", tasks: [{ goal: "İlgili bağlamı prompt'a koy.", tip: "Bağlam + soru." }] },
      { title: "4. Kaynak göster", learn: ["Citations"], question: "Cevabı kaynağa bağlamak güveni neden artırır?", tasks: [{ goal: "Cevapta kaynak referansı ver.", tip: "Atıf." }] },
      { title: "5. Değerlendir", learn: ["Evaluation"], question: "RAG kalitesini (alaka + doğruluk) nasıl ölçersin?", tasks: [{ goal: "Cevap kalitesini değerlendir.", tip: "Örnek set." }] },
    ],
  },
  {
    id: "ai-rag-advanced",
    level: 4, track: "ai", project: "Gelişmiş RAG (Hybrid + Rerank)", difficulty: "İleri",
    emoji: "🔬", accent: "rose", tier: "senior",
    description: "RAG'i üretim kalitesine taşı. Amaç: hibrit arama, reranking, sorgu dönüşümü ve değerlendirme.",
    skills: ["Hybrid search", "Reranking", "Query rewriting", "Metadata filter", "Evaluation", "Latency"],
    steps: [
      { title: "1. Hibrit arama", learn: ["Hybrid search"], question: "Anahtar kelime + vektör aramayı birleştirmek neyi yakalar?", tasks: [{ goal: "Hibrit arama uygula.", tip: "BM25 + vektör." }] },
      { title: "2. Reranking", learn: ["Reranking"], question: "İlk getirimi bir reranker ile yeniden sıralamak neden iyi?", tasks: [{ goal: "Sonuçları yeniden sırala.", tip: "Cross-encoder." }] },
      { title: "3. Sorgu dönüşümü", learn: ["Query rewriting"], question: "Kullanıcı sorusunu yeniden yazmak/çoğaltmak retrieval'ı nasıl iyileştirir?", tasks: [{ goal: "Sorguyu zenginleştir.", tip: "Rewrite/expand." }] },
      { title: "4. Metadata filtre", learn: ["Metadata filter"], question: "Metadata ile ön filtreleme alakayı ve maliyeti nasıl iyileştirir?", tasks: [{ goal: "Metadata ile daralt.", tip: "Filtre + arama." }] },
      { title: "5. Değerlendir & izle", learn: ["Evaluation"], question: "RAG'i sürekli değerlendirmek (eval seti) regresyonu nasıl yakalar?", tasks: [{ goal: "Bir eval seti kur.", tip: "Soru-cevap çiftleri." }] },
    ],
  },
  {
    id: "ai-chatbot",
    level: 3, track: "ai", project: "Sohbet Botu (Bağlamlı)", difficulty: "Orta",
    emoji: "💬", accent: "indigo", tier: "mid",
    description: "Hatırlayan bir asistan. Amaç: konuşma geçmişi, bağlam yönetimi ve akış.",
    skills: ["Chatbot", "Conversation history", "Context management", "Streaming", "System prompt", "Memory"],
    steps: [
      { title: "1. Çok turlu konuşma", learn: ["Conversation history"], question: "Önceki mesajları göndermezsen bot neden 'unutur'?", tasks: [{ goal: "Geçmişi her çağrıya ekle.", tip: "Mesaj listesi." }] },
      { title: "2. Bağlamı yönet", learn: ["Context management"], question: "Konuşma uzayınca bağlam penceresini ne yönetir?", tasks: [{ goal: "Eski mesajları özetle/buda.", tip: "Trim/özet." }] },
      { title: "3. Akış (streaming)", learn: ["Streaming"], question: "Yanıtı token token göstermek algılanan hızı nasıl artırır?", tasks: [{ goal: "Yanıtı akışla göster.", tip: "Stream." }] },
      { title: "4. Kişilik & sınır", learn: ["System prompt"], question: "Botun kapsam dışı sorulara nasıl davranacağını ne belirler?", tasks: [{ goal: "Sınırları sistem promptunda tanımla.", tip: "Kapsam kuralları." }] },
    ],
  },
  {
    id: "ai-memory",
    level: 4, track: "ai", project: "Asistan Hafızası", difficulty: "İleri",
    emoji: "🧷", accent: "violet", tier: "senior",
    description: "Oturumlar arası hatırlama. Amaç: kısa/uzun vadeli hafıza, özetleme ve geri çağırma.",
    skills: ["Memory", "Summarization", "Retrieval", "Context", "Persistence", "Relevance"],
    steps: [
      { title: "1. Kısa vadeli hafıza", learn: ["Context"], question: "Oturum içi hafıza ile kalıcı hafıza farkı nedir?", tasks: [{ goal: "Oturum bağlamını tut.", tip: "Geçmiş." }] },
      { title: "2. Özetle", learn: ["Summarization"], question: "Uzun geçmişi özetlemek bağlamı nasıl korur?", tasks: [{ goal: "Eski konuşmayı özetle.", tip: "Rolling summary." }] },
      { title: "3. Kalıcı hafıza", learn: ["Persistence"], question: "Kullanıcı tercihlerini kalıcı saklamak deneyimi nasıl iyileştirir?", tasks: [{ goal: "Önemli bilgileri sakla.", tip: "Hafıza deposu." }] },
      { title: "4. İlgili anıyı çağır", learn: ["Retrieval"], question: "Tüm hafızayı değil ilgili kısmı getirmek neden gerekir?", tasks: [{ goal: "Bağlama göre anı getir.", tip: "Anlamsal arama." }] },
    ],
  },
  {
    id: "ai-agents",
    level: 4, track: "ai", project: "AI Agent (Plan-Yürüt)", difficulty: "İleri",
    emoji: "🤖", accent: "emerald", tier: "senior",
    description: "Kendi başına görev tamamlayan asistan. Amaç: planlama, araç döngüsü, durdurma ve güvenlik.",
    skills: ["Agent", "Planning", "Tool loop", "Stopping", "Reflection", "Güvenlik"],
    steps: [
      { title: "1. Agent döngüsü", learn: ["Agent"], question: "Bir agent 'düşün→araç→gözlem' döngüsünü neden tekrarlar?", tasks: [{ goal: "Basit bir agent döngüsü kur.", tip: "ReAct benzeri." }] },
      { title: "2. Planlama", learn: ["Planning"], question: "Görevi alt adımlara bölmek başarıyı nasıl artırır?", tasks: [{ goal: "Görevi adımlara böldür.", tip: "Plan üret." }] },
      { title: "3. Durdurma koşulu", learn: ["Stopping"], question: "Agent'ın sonsuz döngüye girmesini ne engeller?", tasks: [{ goal: "Maksimum adım/çıkış koşulu koy.", tip: "Limit + 'bitti'." }] },
      { title: "4. Yansıma (reflection)", learn: ["Reflection"], question: "Agent'ın kendi çıktısını eleştirmesi (reflection) kaliteyi nasıl artırır?", tasks: [{ goal: "Bir öz-değerlendirme adımı ekle.", tip: "Kontrol et→düzelt." }] },
      { title: "5. Güvenlik & onay", learn: ["Güvenlik"], question: "Otonom agent'a hangi eylemlerde insan onayı gerekir?", tasks: [{ goal: "Riskli adımlara onay koy.", tip: "Human-in-the-loop." }] },
    ],
  },
  {
    id: "ai-multi-agent",
    level: 5, track: "ai", project: "Çoklu Agent Sistemi", difficulty: "İleri",
    emoji: "🐝", accent: "amber", tier: "senior",
    description: "Birlikte çalışan agent'lar. Amaç: rol ayrımı, orkestrasyon, iletişim ve maliyet.",
    skills: ["Multi-agent", "Orchestration", "Roles", "Communication", "Cost", "Coordination"],
    steps: [
      { title: "1. Rol ayrımı", learn: ["Roles"], question: "Tek büyük agent yerine uzmanlaşmış agent'lar ne kazandırır?", tasks: [{ goal: "Görevi rollere böl.", tip: "Araştırmacı/yazar vb." }] },
      { title: "2. Orkestrasyon", learn: ["Orchestration"], question: "Agent'ları bir koordinatörle yönetmek neyi kolaylaştırır?", tasks: [{ goal: "Bir orkestratör kur.", tip: "Görev dağıt/topla." }] },
      { title: "3. İletişim", learn: ["Communication"], question: "Agent'lar arası mesaj formatı neden net olmalı?", tasks: [{ goal: "Agent'lar arası protokol tanımla.", tip: "Yapılı mesaj." }] },
      { title: "4. Maliyet kontrolü", learn: ["Cost"], question: "Çoklu agent'ın token maliyeti neden hızla artar?", tasks: [{ goal: "Çağrı sayısını/derinliği sınırla.", tip: "Bütçe." }] },
    ],
  },
  {
    id: "ai-eval",
    level: 4, track: "ai", project: "LLM Değerlendirme (Eval)", difficulty: "İleri",
    emoji: "📏", accent: "rose", tier: "senior",
    description: "LLM çıktısını ölç. Amaç: eval seti, LLM-as-judge, metrikler ve regresyon.",
    skills: ["Evaluation", "LLM-as-judge", "Eval set", "Metrics", "Regression", "Golden set"],
    steps: [
      { title: "1. Eval seti", learn: ["Eval set"], question: "Sabit bir değerlendirme seti neden 'gözle bakmaktan' iyidir?", tasks: [{ goal: "Bir altın (golden) set oluştur.", tip: "Girdi+beklenen." }] },
      { title: "2. Otomatik metrik", learn: ["Metrics"], question: "Üretken çıktıyı exact-match ile ölçmek neden yetersiz?", tasks: [{ goal: "Uygun bir metrik seç.", tip: "Görev bazlı." }] },
      { title: "3. LLM-as-judge", learn: ["LLM-as-judge"], question: "Bir LLM'i değerlendirici yapmanın gücü ve riski nedir?", tasks: [{ goal: "Bir LLM ile çıktıyı puanlat.", tip: "Rubrik." }] },
      { title: "4. Regresyon yakala", learn: ["Regression"], question: "Prompt/model değişince eval'i koşmak neyi önler?", tasks: [{ goal: "Değişiklikte eval'i çalıştır.", tip: "CI'da eval." }] },
    ],
  },
  {
    id: "ai-guardrails",
    level: 4, track: "ai", project: "Güvenlik & Guardrails", difficulty: "İleri",
    emoji: "🛡️", accent: "violet", tier: "senior",
    description: "Modeli güvenli kullan. Amaç: girdi/çıktı filtreleme, prompt injection ve kapsam.",
    skills: ["Guardrails", "Prompt injection", "Moderation", "Scope", "PII", "Güvenlik"],
    steps: [
      { title: "1. Prompt injection", learn: ["Prompt injection"], question: "Kullanıcı girdisinin sistem talimatını ezmesi (injection) nasıl olur?", tasks: [{ goal: "Bir injection denemesini gözlemle.", tip: "'Önceki talimatları unut'." }] },
      { title: "2. Girdiyi ayır", learn: ["Güvenlik"], question: "Güvenilmeyen veriyi talimattan ayırmak neden kritik?", tasks: [{ goal: "Kullanıcı verisini açıkça işaretle.", tip: "Sınır/etiket." }] },
      { title: "3. Çıktı moderasyonu", learn: ["Moderation"], question: "Zararlı çıktıyı yayınlamadan ne yakalar?", tasks: [{ goal: "Çıktıyı moderasyondan geçir.", tip: "Filtre." }] },
      { title: "4. Kapsam sınırı", learn: ["Scope"], question: "Asistanı kapsam dışına çıkmaktan ne alıkoyar?", tasks: [{ goal: "Kapsam dışı istekleri reddet.", tip: "Kural + ret." }] },
      { title: "5. PII koruması", learn: ["PII"], question: "Kişisel veriyi modele göndermeden önce ne yapılmalı?", tasks: [{ goal: "PII'yi maskele/çıkar.", tip: "Redaction." }] },
    ],
  },
  {
    id: "ai-summarization",
    level: 2, track: "ai", project: "Özetleme & Çıkarım", difficulty: "Kolay-Orta",
    emoji: "📄", accent: "sky", tier: "mid",
    description: "Uzun metni sıkıştır. Amaç: özet türleri, uzun belge ve doğruluk.",
    skills: ["Summarization", "Extraction", "Map-reduce", "Faithfulness", "Format", "Long context"],
    steps: [
      { title: "1. Temel özet", learn: ["Summarization"], question: "Çıkarımsal (extractive) ve üretken (abstractive) özet farkı nedir?", tasks: [{ goal: "Bir metni özetle.", tip: "Uzunluk/odak belirt." }] },
      { title: "2. Uzun belge", learn: ["Map-reduce"], question: "Bağlam penceresine sığmayan belge nasıl özetlenir?", tasks: [{ goal: "Parçala-özetle-birleştir.", tip: "Map-reduce." }] },
      { title: "3. Yapılı çıkarım", learn: ["Extraction"], question: "Metinden alan çıkarmayı (entity) özetlemeden nasıl ayırırsın?", tasks: [{ goal: "Belirli alanları çıkar.", tip: "Şema." }] },
      { title: "4. Sadakat (faithfulness)", learn: ["Faithfulness"], question: "Özetin kaynağa sadık kaldığını nasıl doğrularsın?", tasks: [{ goal: "Uydurma içeriği yakala.", tip: "Kaynak kontrolü." }] },
    ],
  },
  {
    id: "ai-cost-latency",
    level: 4, track: "ai", project: "Maliyet, Gecikme & Cache", difficulty: "İleri",
    emoji: "⚡", accent: "lime", tier: "senior",
    description: "LLM uygulamasını verimli yap. Amaç: token maliyeti, model seçimi, cache ve akış.",
    skills: ["Cost", "Latency", "Caching", "Model routing", "Batching", "Streaming"],
    steps: [
      { title: "1. Maliyeti ölç", learn: ["Cost"], question: "Token maliyetini girdi/çıktı olarak ayırmak neden gerekir?", tasks: [{ goal: "Çağrı başına maliyeti ölç.", tip: "Token sayımı." }] },
      { title: "2. Model seçimi", learn: ["Model routing"], question: "Her işe en büyük modeli kullanmak neden israftır?", tasks: [{ goal: "Göreve göre model seç.", tip: "Basit→küçük." }] },
      { title: "3. Cache", learn: ["Caching"], question: "Aynı/benzer istekleri cache'lemek neyi düşürür?", tasks: [{ goal: "Yanıtları/önekleri cache'le.", tip: "Exact/semantic cache." }] },
      { title: "4. Gecikme", learn: ["Latency"], question: "Streaming ve batching gecikme algısını nasıl etkiler?", tasks: [{ goal: "Gecikmeyi azalt.", tip: "Stream/batch." }] },
    ],
  },
  {
    id: "ai-observability",
    level: 4, track: "ai", project: "LLM Gözlemlenebilirliği", difficulty: "İleri",
    emoji: "🔭", accent: "cyan", tier: "senior",
    description: "Üretimdeki LLM'i izle. Amaç: tracing, loglama, geri bildirim ve regresyon.",
    skills: ["Tracing", "Logging", "Feedback", "Token tracking", "Drift", "Evaluation"],
    steps: [
      { title: "1. Çağrıları izle", learn: ["Tracing"], question: "Bir LLM zincirini uçtan uca izlemek hata ayıklamada neyi sağlar?", tasks: [{ goal: "Prompt/yanıtları trace'le.", tip: "Trace kaydı." }] },
      { title: "2. Token & maliyet", learn: ["Token tracking"], question: "Token kullanımını izlemek maliyeti nasıl kontrol eder?", tasks: [{ goal: "Token/maliyeti logla.", tip: "Çağrı başına." }] },
      { title: "3. Kullanıcı geri bildirimi", learn: ["Feedback"], question: "Beğen/beğenme sinyali kaliteyi nasıl iyileştirir?", tasks: [{ goal: "Geri bildirim topla.", tip: "Thumbs up/down." }] },
      { title: "4. Drift & regresyon", learn: ["Drift"], question: "Model/prompt değişince kaliteyi ne yakalar?", tasks: [{ goal: "Üretim örnekleriyle eval koş.", tip: "Periyodik." }] },
    ],
  },
  {
    id: "ai-classification",
    level: 2, track: "ai", project: "LLM ile Sınıflandırma & Etiketleme", difficulty: "Kolay-Orta",
    emoji: "🏷️", accent: "amber", tier: "mid",
    description: "Modeli sınıflandırıcı yap. Amaç: net sınıflar, few-shot, tutarlılık ve değerlendirme.",
    skills: ["Classification", "Labeling", "Few-shot", "Consistency", "Evaluation", "Structured output"],
    steps: [
      { title: "1. Sınıfları tanımla", learn: ["Classification"], question: "Sınıfları net ve örtüşmesiz tanımlamak neden kritik?", tasks: [{ goal: "Etiket setini ve tanımları yaz.", tip: "Net sınırlar." }] },
      { title: "2. Few-shot ile yönlendir", learn: ["Few-shot"], question: "Zor sınıflar için örnek vermek doğruluğu nasıl artırır?", tasks: [{ goal: "Örneklerle prompt'u güçlendir.", tip: "Sınır vakaları." }] },
      { title: "3. Tutarlı çıktı", learn: ["Structured output"], question: "Etiketi sabit formatta almak işlemeyi nasıl kolaylaştırır?", tasks: [{ goal: "Sadece etiket döndür.", tip: "Enum." }] },
      { title: "4. Değerlendir", learn: ["Evaluation"], question: "Etiketli bir set olmadan doğruluğu nasıl ölçersin?", tasks: [{ goal: "Bir test setiyle ölç.", tip: "Doğruluk/F1." }] },
    ],
  },
  {
    id: "ai-multimodal",
    level: 4, track: "ai", project: "Çok Modlu (Görsel + Metin)", difficulty: "İleri",
    emoji: "🖼️", accent: "fuchsia", tier: "senior",
    description: "Görseli anlayan model. Amaç: görsel girdi, OCR/analiz ve birleşik akıl yürütme.",
    skills: ["Multimodal", "Vision", "OCR", "Reasoning", "Structured output", "Use cases"],
    steps: [
      { title: "1. Görsel girdi", learn: ["Vision"], question: "Çok modlu model görseli nasıl 'okur'?", tasks: [{ goal: "Bir görseli modele tanımlat.", tip: "Görsel + soru." }] },
      { title: "2. Görselden çıkarım", learn: ["OCR"], question: "Bir belgeden yapılı veri çıkarmak hangi işleri otomatikleştirir?", tasks: [{ goal: "Görselden alanları çıkar.", tip: "Şema + görsel." }] },
      { title: "3. Birleşik akıl", learn: ["Reasoning"], question: "Metin + görseli birlikte yorumlamak neyi mümkün kılar?", tasks: [{ goal: "Görsel ve metni birlikte kullan.", tip: "Çapraz akıl." }] },
    ],
  },
  {
    id: "ai-codegen",
    level: 3, track: "ai", project: "Kod Üretimi & Asistanı", difficulty: "Orta",
    emoji: "👨‍💻", accent: "indigo", tier: "mid",
    description: "Kod yazan asistan. Amaç: bağlam verme, çalıştırma/doğrulama ve güvenlik.",
    skills: ["Code generation", "Context", "Execution", "Validation", "Güvenlik", "Iteration"],
    steps: [
      { title: "1. Bağlamlı üretim", learn: ["Context"], question: "Mevcut kodu bağlam vermeden kod istemek neden kötü sonuç verir?", tasks: [{ goal: "İlgili kodu bağlam olarak ver.", tip: "Dosya/şema." }] },
      { title: "2. Çalıştır & doğrula", learn: ["Execution"], question: "Üretilen kodu çalıştırıp test etmek neden şart?", tasks: [{ goal: "Üretilen kodu test et.", tip: "Çalıştır + assert." }] },
      { title: "3. Hatayla iterasyon", learn: ["Iteration"], question: "Hata mesajını geri verip düzelttirmek (self-heal) nasıl çalışır?", tasks: [{ goal: "Hatayı modele geri ver.", tip: "Hata→düzelt." }] },
      { title: "4. Güvenlik", learn: ["Güvenlik"], question: "Üretilen kodu güvenmeden çalıştırmanın riski nasıl yönetilir?", tasks: [{ goal: "Çalıştırmayı izole et.", tip: "Sandbox." }] },
    ],
  },
  {
    id: "ai-fine-tuning",
    level: 5, track: "ai", project: "Fine-tuning & Adaptasyon", difficulty: "İleri",
    emoji: "🎚️", accent: "rose", tier: "senior",
    description: "Modeli göreve uyarla. Amaç: ne zaman fine-tune, veri hazırlığı ve değerlendirme.",
    skills: ["Fine-tuning", "Dataset", "When to use", "Evaluation", "Overfitting", "RAG vs FT"],
    steps: [
      { title: "1. Ne zaman gerekir", learn: ["When to use"], question: "Prompt/RAG yeterken fine-tune etmek neden gereksiz olabilir?", tasks: [{ goal: "FT ihtiyacını gerekçelendir.", tip: "Önce prompt/RAG." }] },
      { title: "2. Veri hazırla", learn: ["Dataset"], question: "Kaliteli ve tutarlı eğitim verisi neden her şeyden önemli?", tasks: [{ goal: "Örnek-çıktı veri seti hazırla.", tip: "Tutarlı format." }] },
      { title: "3. Değerlendir", learn: ["Evaluation"], question: "Fine-tune'un işe yaradığını neyle ölçersin?", tasks: [{ goal: "FT'li ve FT'siz modeli kıyasla.", tip: "Eval seti." }] },
      { title: "4. Aşırı uyum", learn: ["Overfitting"], question: "Az veriyle fine-tune neden ezberletir?", tasks: [{ goal: "Genelleme kaybını kontrol et.", tip: "Hold-out." }] },
    ],
  },
  {
    id: "ai-mcp",
    level: 4, track: "ai", project: "Araç Entegrasyonu (MCP tarzı)", difficulty: "İleri",
    emoji: "🔌", accent: "violet", tier: "senior",
    description: "Asistanı dış sistemlere bağla. Amaç: standart araç protokolü, kaynak ve güvenlik.",
    skills: ["Tool protocol", "Integration", "Resources", "Auth", "Güvenlik", "Discovery"],
    steps: [
      { title: "1. Standart protokol", learn: ["Tool protocol"], question: "Araçları standart bir protokolle bağlamak her seferinde özel kod yazmaya göre ne kazandırır?", tasks: [{ goal: "Bir aracı standart arayüzle tanıt.", tip: "Şema + çağrı." }] },
      { title: "2. Kaynak erişimi", learn: ["Resources"], question: "Modele veri kaynağı sunmak ile araç sunmak nasıl farklıdır?", tasks: [{ goal: "Bir veri kaynağı bağla.", tip: "Kaynak arayüzü." }] },
      { title: "3. Yetkilendirme", learn: ["Auth"], question: "Asistanın eriştiği araçlara yetki sınırı neden gerekir?", tasks: [{ goal: "Araç erişimini yetkilendir.", tip: "Scoped token." }] },
      { title: "4. Güvenlik", learn: ["Güvenlik"], question: "Güvenilmeyen bir araç sunucusunun riski nasıl azaltılır?", tasks: [{ goal: "Araç çıktısını doğrula/sınırla.", tip: "Sandbox/validate." }] },
    ],
  },
  {
    id: "ai-capstone",
    level: 5, track: "ai", project: "Uçtan Uca AI Uygulaması", difficulty: "İleri",
    emoji: "🏁", accent: "emerald", tier: "senior",
    description: "Tüm parçaları birleştir. Amaç: RAG + araç + eval + üretim — gerçek bir asistan.",
    skills: ["End-to-end", "RAG", "Tool use", "Evaluation", "Deployment", "Güvenlik"],
    steps: [
      { title: "1. Problemi çerçevele", learn: ["End-to-end"], question: "Bir AI uygulamasında 'iyi'yi önceden tanımlamak neden kritik?", tasks: [{ goal: "Kullanım senaryosu ve başarı kriterini yaz.", tip: "Net hedef." }] },
      { title: "2. RAG + araç", learn: ["RAG"], question: "Bilgi (RAG) ve eylem (araç) ne zaman birlikte gerekir?", tasks: [{ goal: "RAG ve araçları birleştir.", tip: "Bilgi + eylem." }] },
      { title: "3. Eval", learn: ["Evaluation"], question: "Yayından önce bir eval seti neden şart?", tasks: [{ goal: "Bir değerlendirme seti kur.", tip: "Senaryolar." }] },
      { title: "4. Guardrails", learn: ["Güvenlik"], question: "Üretime almadan hangi güvenlik kontrolleri gerekir?", tasks: [{ goal: "Girdi/çıktı korumaları ekle.", tip: "Filtre + sınır." }] },
      { title: "5. Yayınla & izle", learn: ["Deployment"], question: "Yayın sonrası izleme ve geri bildirim döngüsü neyi sağlar?", tasks: [{ goal: "Yayınla, izle, iyileştir.", tip: "Tracing + feedback." }] },
    ],
  },
];

const dataScienceExtra2: Level[] = [
  {
    id: "ds-knn-svm", level: 3, track: "data-science", project: "KNN & SVM", difficulty: "Orta",
    emoji: "🧲", accent: "emerald", tier: "mid",
    description: "Mesafe ve sınır temelli sınıflandırıcılar. Amaç: KNN, SVM, kernel ve ölçekleme.",
    skills: ["KNN", "SVM", "Kernel", "Scaling", "Decision boundary", "Hyperparameter"],
    steps: [
      { title: "1. KNN", learn: ["KNN"], question: "KNN'de k'nın küçük/büyük olması kararı nasıl etkiler?", tasks: [{ goal: "Bir KNN sınıflandırıcı eğit.", tip: "k seç." }] },
      { title: "2. Ölçekleme şart", learn: ["Scaling"], question: "Mesafe temelli modellerde ölçekleme neden kritik?", tasks: [{ goal: "Önce ölçekle.", tip: "Standardize." }] },
      { title: "3. SVM", learn: ["SVM"], question: "SVM 'maksimum marj'ı neden arar?", tasks: [{ goal: "Bir SVM eğit.", tip: "Margin." }] },
      { title: "4. Kernel", learn: ["Kernel"], question: "Kernel hilesi doğrusal olmayan veriyi nasıl ayırır?", tasks: [{ goal: "Kernel ile dene.", tip: "RBF." }] },
      { title: "5. Karar sınırı", learn: ["Decision boundary"], question: "Karar sınırını görselleştirmek modeli nasıl anlatır?", tasks: [{ goal: "Sınırı çiz.", tip: "2B görsel." }] },
    ],
  },
  {
    id: "ds-gradient-descent", level: 3, track: "data-science", project: "Gradient Descent Sezgisi", difficulty: "Orta",
    emoji: "⛰️", accent: "sky", tier: "mid",
    description: "Modeller nasıl öğrenir? Amaç: kayıp fonksiyonu, gradyan, öğrenme oranı ve yakınsama.",
    skills: ["Gradient descent", "Loss function", "Learning rate", "Convergence", "Optimization", "Local minima"],
    steps: [
      { title: "1. Kayıp fonksiyonu", learn: ["Loss function"], question: "Kayıp fonksiyonu 'iyi model'i nasıl tanımlar?", tasks: [{ goal: "Bir kayıp tanımla.", tip: "MSE/log-loss." }] },
      { title: "2. Gradyan", learn: ["Gradient descent"], question: "Gradyan hangi yöne 'inileceğini' nasıl söyler?", tasks: [{ goal: "Adımlarla kaybı azalt.", tip: "Eğim yönü." }] },
      { title: "3. Öğrenme oranı", learn: ["Learning rate"], question: "Çok büyük/küçük öğrenme oranı neyi bozar?", tasks: [{ goal: "Farklı oranlar dene.", tip: "Yakınsama/ıraksama." }] },
      { title: "4. Yerel minimum", learn: ["Local minima"], question: "Yerel minimum global'den nasıl ayrılır?", tasks: [{ goal: "Yakınsamayı gözlemle.", tip: "Kayıp eğrisi." }] },
    ],
  },
  {
    id: "ds-regularization", level: 4, track: "data-science", project: "Regularizasyon (L1/L2)", difficulty: "İleri",
    emoji: "🪢", accent: "violet", tier: "senior",
    description: "Aşırı uyumu cezayla engelle. Amaç: L1/L2, sparsity ve bias-variance.",
    skills: ["Regularization", "L1/Lasso", "L2/Ridge", "Sparsity", "Bias-variance", "Overfitting"],
    steps: [
      { title: "1. Neden ceza", learn: ["Regularization"], question: "Büyük katsayıları cezalandırmak aşırı uyumu nasıl azaltır?", tasks: [{ goal: "Regularizasyon ekle.", tip: "Penalty." }] },
      { title: "2. L2 (Ridge)", learn: ["L2/Ridge"], question: "L2 katsayıları nasıl küçültür ama sıfırlamaz?", tasks: [{ goal: "Ridge uygula.", tip: "L2." }] },
      { title: "3. L1 (Lasso)", learn: ["L1/Lasso"], question: "L1'in bazı katsayıları tam sıfırlaması neyi sağlar (özellik seçimi)?", tasks: [{ goal: "Lasso uygula.", tip: "Sparsity." }] },
      { title: "4. Güç ayarı", learn: ["Bias-variance"], question: "Ceza gücü (lambda) bias-variance dengesini nasıl kaydırır?", tasks: [{ goal: "Lambda'yı ayarla.", tip: "CV ile." }] },
    ],
  },
  {
    id: "ds-ensembling", level: 4, track: "data-science", project: "Ensemble & Stacking", difficulty: "İleri",
    emoji: "🎼", accent: "amber", tier: "senior",
    description: "Modelleri birleştir. Amaç: bagging, boosting, stacking ve çeşitlilik.",
    skills: ["Ensemble", "Bagging", "Boosting", "Stacking", "Diversity", "Voting"],
    steps: [
      { title: "1. Neden ensemble", learn: ["Ensemble"], question: "Birçok 'zayıf' modelin neden tek güçlüden iyi olabilir?", tasks: [{ goal: "Oylama ile birleştir.", tip: "Voting." }] },
      { title: "2. Bagging", learn: ["Bagging"], question: "Bagging varyansı nasıl düşürür?", tasks: [{ goal: "Bagging uygula.", tip: "Bootstrap." }] },
      { title: "3. Boosting", learn: ["Boosting"], question: "Boosting bias'ı nasıl düşürür?", tasks: [{ goal: "Boosting uygula.", tip: "Sıralı düzeltme." }] },
      { title: "4. Stacking", learn: ["Stacking"], question: "Stacking'de meta-model neyi öğrenir?", tasks: [{ goal: "Stacking kur.", tip: "Meta-learner." }] },
      { title: "5. Çeşitlilik", learn: ["Diversity"], question: "Benzer modelleri birleştirmek neden az fayda verir?", tasks: [{ goal: "Farklı modeller seç.", tip: "Çeşitlilik." }] },
    ],
  },
  {
    id: "ds-causal", level: 5, track: "data-science", project: "Nedensel Çıkarım", difficulty: "İleri",
    emoji: "🔗", accent: "rose", tier: "senior",
    description: "Korelasyonun ötesi. Amaç: nedensellik, karıştırıcı, doğal deney ve etki tahmini.",
    skills: ["Causal inference", "Confounder", "Counterfactual", "DAG", "Experiment", "Bias"],
    steps: [
      { title: "1. Korelasyon ≠ nedensellik", learn: ["Causal inference"], question: "Korelasyonu nedensellik sanmak hangi yanlış kararlara yol açar?", tasks: [{ goal: "Bir sahte ilişki örneği bul.", tip: "Confounder." }] },
      { title: "2. Karıştırıcı (confounder)", learn: ["Confounder"], question: "Karıştırıcı değişken ilişkiyi nasıl çarpıtır?", tasks: [{ goal: "Olası karıştırıcıları belirle.", tip: "DAG." }] },
      { title: "3. Karşıolgu", learn: ["Counterfactual"], question: "'Ne olurdu' (counterfactual) sorusu nedenselliğin özü neden?", tasks: [{ goal: "Karşıolgu çerçevele.", tip: "Tedavi vs kontrol." }] },
      { title: "4. Etki tahmini", learn: ["Experiment"], question: "Randomize deney altın standart neden?", tasks: [{ goal: "Etki tahmin et.", tip: "A/B veya yöntem." }] },
    ],
  },
  {
    id: "ds-calibration", level: 4, track: "data-science", project: "Olasılık Kalibrasyonu", difficulty: "İleri",
    emoji: "🌡️", accent: "cyan", tier: "senior",
    description: "Model olasılıkları güvenilir mi? Amaç: kalibrasyon, reliability ve düzeltme.",
    skills: ["Calibration", "Reliability", "Brier score", "Platt scaling", "Threshold", "Evaluation"],
    steps: [
      { title: "1. Kalibrasyon nedir", learn: ["Calibration"], question: "Model %80 dediğinde gerçekten %80 doğru mu — neden önemli?", tasks: [{ goal: "Tahmin olasılıklarını incele.", tip: "Güven dağılımı." }] },
      { title: "2. Reliability eğrisi", learn: ["Reliability"], question: "Reliability eğrisi kalibrasyonu nasıl gösterir?", tasks: [{ goal: "Reliability diyagramı çiz.", tip: "Tahmin vs gerçek." }] },
      { title: "3. Düzelt", learn: ["Platt scaling"], question: "Kalibrasyonsuz olasılık kararları nasıl bozar?", tasks: [{ goal: "Kalibrasyon uygula.", tip: "Platt/isotonic." }] },
      { title: "4. Değerlendir", learn: ["Brier score"], question: "Brier skoru kalibrasyonu nasıl ölçer?", tasks: [{ goal: "Brier skoru hesapla.", tip: "Olasılık hatası." }] },
    ],
  },
  {
    id: "ds-churn-project", level: 4, track: "data-science", project: "Proje: Churn Tahmini", difficulty: "İleri",
    emoji: "🚪", accent: "indigo", tier: "senior",
    description: "Müşteri kaybını öngör. Amaç: hedef tanımı, özellik, model ve iş etkisi.",
    skills: ["Churn", "Feature engineering", "Imbalanced", "Evaluation", "Business impact", "Threshold"],
    steps: [
      { title: "1. Churn'ü tanımla", learn: ["Churn"], question: "'Churn' tanımını netleştirmek neden ilk ve zor adım?", tasks: [{ goal: "Churn hedefini tanımla.", tip: "Zaman penceresi." }] },
      { title: "2. Özellikler", learn: ["Feature engineering"], question: "Davranışsal özellikler churn'ü nasıl haber verir?", tasks: [{ goal: "Davranış özellikleri türet.", tip: "Aktivite trendi." }] },
      { title: "3. Dengesizlik", learn: ["Imbalanced"], question: "Churn nadirken model nasıl eğitilmeli?", tasks: [{ goal: "Dengesizliği ele.", tip: "Ağırlık/örnekleme." }] },
      { title: "4. İş etkisi", learn: ["Business impact"], question: "Eşiği elde tutma maliyetine göre ayarlamak neden gerekir?", tasks: [{ goal: "Eşiği iş maliyetiyle seç.", tip: "Maliyet matrisi." }] },
    ],
  },
  {
    id: "ds-segmentation-project", level: 3, track: "data-science", project: "Proje: Müşteri Segmentasyonu", difficulty: "Orta",
    emoji: "👥", accent: "lime", tier: "mid",
    description: "Müşterileri anlamlı gruplara ayır. Amaç: RFM, kümeleme ve aksiyon.",
    skills: ["Segmentation", "RFM", "Clustering", "Profiling", "Actionability", "Visualization"],
    steps: [
      { title: "1. RFM", learn: ["RFM"], question: "Recency-Frequency-Monetary neden güçlü bir segmentasyon temeli?", tasks: [{ goal: "RFM skorları hesapla.", tip: "3 boyut." }] },
      { title: "2. Kümele", learn: ["Clustering"], question: "Segmentleri kümeleme ile bulmanın elle kurala göre avantajı nedir?", tasks: [{ goal: "Müşterileri kümele.", tip: "K-means." }] },
      { title: "3. Profille", learn: ["Profiling"], question: "Her segmenti 'kişilik' olarak adlandırmak iletişimi nasıl kolaylaştırır?", tasks: [{ goal: "Segmentleri profille.", tip: "Özet." }] },
      { title: "4. Aksiyon", learn: ["Actionability"], question: "Segment ancak farklı muamele görürse neden değerlidir?", tasks: [{ goal: "Segment başına aksiyon öner.", tip: "Hedefli." }] },
    ],
  },
  {
    id: "ds-association-rules", level: 3, track: "data-science", project: "Birliktelik Kuralları (Market Basket)", difficulty: "Orta",
    emoji: "🛒", accent: "amber", tier: "mid",
    description: "Birlikte alınanı bul. Amaç: support/confidence/lift ve öneri.",
    skills: ["Association rules", "Support", "Confidence", "Lift", "Apriori", "Recommendation"],
    steps: [
      { title: "1. Sepet verisi", learn: ["Association rules"], question: "İşlem verisini birliktelik analizi için nasıl hazırlarsın?", tasks: [{ goal: "Sepet verisini biçimle.", tip: "İşlem→öğeler." }] },
      { title: "2. Support & confidence", learn: ["Confidence"], question: "Support ve confidence neyi ölçer?", tasks: [{ goal: "Kuralları üret.", tip: "Apriori." }] },
      { title: "3. Lift", learn: ["Lift"], question: "Lift > 1 neden 'gerçek' ilişkiyi işaret eder?", tasks: [{ goal: "Lift ile filtrele.", tip: "Lift eşiği." }] },
      { title: "4. Öneri", learn: ["Recommendation"], question: "Kuralları 'birlikte al' önerisine nasıl çevirirsin?", tasks: [{ goal: "Kuraldan öneri üret.", tip: "Çapraz satış." }] },
    ],
  },
  {
    id: "ds-sampling-bootstrap", level: 3, track: "data-science", project: "Örnekleme & Bootstrap", difficulty: "Orta",
    emoji: "🎯", accent: "fuchsia", tier: "mid",
    description: "Belirsizliği örnekleyerek ölç. Amaç: bootstrap, güven aralığı ve önyargı.",
    skills: ["Bootstrap", "Resampling", "Confidence interval", "Bias", "Variance", "Sampling"],
    steps: [
      { title: "1. Bootstrap", learn: ["Bootstrap"], question: "Yeniden örnekleme (bootstrap) belirsizliği nasıl tahmin eder?", tasks: [{ goal: "Bir istatistiği bootstrap'le.", tip: "Tekrarlı örnek." }] },
      { title: "2. Güven aralığı", learn: ["Confidence interval"], question: "Bootstrap güven aralığı formül gerektirmeden nasıl çalışır?", tasks: [{ goal: "Bootstrap CI hesapla.", tip: "Persentil." }] },
      { title: "3. Önyargı", learn: ["Bias"], question: "Örnekleme önyargısı sonucu nasıl çarpıtır?", tasks: [{ goal: "Önyargı kaynağını düşün.", tip: "Temsil." }] },
    ],
  },
];

const aiExtra2: Level[] = [
  {
    id: "ai-advanced-prompting", level: 3, track: "ai", project: "Gelişmiş Prompting", difficulty: "Orta",
    emoji: "🎩", accent: "violet", tier: "mid",
    description: "Akıl yürütmeyi güçlendir. Amaç: CoT, self-consistency, yansıma ve ayrıştırma.",
    skills: ["Chain-of-thought", "Self-consistency", "Decomposition", "Reflection", "Prompt", "Reasoning"],
    steps: [
      { title: "1. Adım adım (CoT)", learn: ["Chain-of-thought"], question: "Akıl yürütmeyi açık istemek karmaşık görevde neyi iyileştirir?", tasks: [{ goal: "CoT prompt yaz.", tip: "'Adım adım düşün'." }] },
      { title: "2. Self-consistency", learn: ["Self-consistency"], question: "Birden çok yanıt üretip oylamak doğruluğu nasıl artırır?", tasks: [{ goal: "Çoklu yanıt + oyla.", tip: "Çoğunluk." }] },
      { title: "3. Ayrıştırma", learn: ["Decomposition"], question: "Büyük görevi alt sorulara bölmek neden işe yarar?", tasks: [{ goal: "Görevi alt adımlara böl.", tip: "Decompose." }] },
      { title: "4. Yansıma", learn: ["Reflection"], question: "Modele kendi yanıtını eleştirtmek kaliteyi nasıl etkiler?", tasks: [{ goal: "Öz-eleştiri adımı ekle.", tip: "Kontrol+düzelt." }] },
    ],
  },
  {
    id: "ai-prompt-templates", level: 2, track: "ai", project: "Prompt Şablonları & Versiyonlama", difficulty: "Kolay-Orta",
    emoji: "🗂️", accent: "sky", tier: "mid",
    description: "Prompt'ları kod gibi yönet. Amaç: şablon, değişken, versiyon ve test.",
    skills: ["Prompt template", "Versioning", "Variables", "Testing", "Reuse", "Maintenance"],
    steps: [
      { title: "1. Şablonla", learn: ["Prompt template"], question: "Prompt'u şablonlamak (değişkenli) tekrarı nasıl önler?", tasks: [{ goal: "Değişkenli bir şablon yaz.", tip: "Yer tutucular." }] },
      { title: "2. Versiyonla", learn: ["Versioning"], question: "Prompt'u versiyonlamak hangi regresyonu yakalar?", tasks: [{ goal: "Prompt sürümlerini sakla.", tip: "v1/v2." }] },
      { title: "3. Test et", learn: ["Testing"], question: "Bir prompt değişikliğini yayınlamadan ne doğrular?", tasks: [{ goal: "Şablonu örneklerle test et.", tip: "Eval." }] },
    ],
  },
  {
    id: "ai-chunking-strategies", level: 3, track: "ai", project: "Chunking Stratejileri", difficulty: "Orta",
    emoji: "🧩", accent: "lime", tier: "mid",
    description: "RAG'in temeli iyi parçalama. Amaç: boyut, örtüşme, semantik ve metadata.",
    skills: ["Chunking", "Overlap", "Semantic chunking", "Metadata", "Retrieval", "Evaluation"],
    steps: [
      { title: "1. Boyut & örtüşme", learn: ["Overlap"], question: "Çok küçük/çok büyük chunk retrieval'ı nasıl bozar?", tasks: [{ goal: "Boyut+örtüşme dene.", tip: "Ölç." }] },
      { title: "2. Semantik parçalama", learn: ["Semantic chunking"], question: "Anlam sınırlarına göre bölmek sabit boyuta göre neden iyi?", tasks: [{ goal: "Anlamlı sınırlardan böl.", tip: "Başlık/paragraf." }] },
      { title: "3. Metadata ekle", learn: ["Metadata"], question: "Her chunk'a kaynak/başlık eklemek neyi mümkün kılar?", tasks: [{ goal: "Chunk'lara metadata ekle.", tip: "Filtre/atıf." }] },
      { title: "4. Değerlendir", learn: ["Evaluation"], question: "Chunking stratejisini retrieval kalitesiyle nasıl kıyaslarsın?", tasks: [{ goal: "Stratejileri kıyasla.", tip: "Recall@k." }] },
    ],
  },
  {
    id: "ai-qa-bot", level: 3, track: "ai", project: "Proje: Belge Soru-Cevap Botu", difficulty: "Orta",
    emoji: "❓", accent: "amber", tier: "mid",
    description: "Kendi belgelerinden cevap veren bot. Amaç: ingestion, RAG, atıf ve UI akışı.",
    skills: ["RAG", "Ingestion", "Citations", "Streaming", "Evaluation", "UX"],
    steps: [
      { title: "1. Belgeleri al", learn: ["Ingestion"], question: "Farklı formatları (PDF/MD) tek hatta almak neyi gerektirir?", tasks: [{ goal: "Belgeleri parçala ve indeksle.", tip: "Ingestion." }] },
      { title: "2. Soru-cevap", learn: ["RAG"], question: "İlgili parçayı bulup cevaplamak neden doğru sırayla yapılmalı?", tasks: [{ goal: "RAG ile cevap üret.", tip: "Getir→üret." }] },
      { title: "3. Atıf göster", learn: ["Citations"], question: "Cevabı kaynağa bağlamak güveni nasıl kurar?", tasks: [{ goal: "Kaynak parçaları göster.", tip: "Atıf." }] },
      { title: "4. Bilmiyorum de", learn: ["UX"], question: "Bağlam yetersizse 'bilmiyorum' demek neden halüsinasyondan iyidir?", tasks: [{ goal: "Yetersiz bağlamda kibarca reddet.", tip: "Dürüstlük." }] },
    ],
  },
  {
    id: "ai-sql-generation", level: 4, track: "ai", project: "Doğal Dilden SQL", difficulty: "İleri",
    emoji: "🗄️", accent: "rose", tier: "senior",
    description: "Soruyu sorguya çevir. Amaç: şema bağlamı, güvenlik, doğrulama ve sonuç.",
    skills: ["Text-to-SQL", "Schema context", "Validation", "Güvenlik", "Execution", "Error recovery"],
    steps: [
      { title: "1. Şema bağlamı", learn: ["Schema context"], question: "Modele tablo şemasını vermek doğruluğu neden artırır?", tasks: [{ goal: "Şemayı prompt'a ekle.", tip: "Tablo/kolon." }] },
      { title: "2. SQL üret", learn: ["Text-to-SQL"], question: "Üretilen SQL'i körü körüne çalıştırmanın riski nedir?", tasks: [{ goal: "Sorudan SQL üret.", tip: "Yapılı çıktı." }] },
      { title: "3. Güvenlik", learn: ["Güvenlik"], question: "Sadece-okuma ve injection koruması neden şart?", tasks: [{ goal: "Yalnızca güvenli sorgulara izin ver.", tip: "Read-only + allowlist." }] },
      { title: "4. Hata kurtarma", learn: ["Error recovery"], question: "Sorgu hata verirse modele geri vermek nasıl çalışır?", tasks: [{ goal: "Hatayı düzelttir.", tip: "Hata→retry." }] },
    ],
  },
  {
    id: "ai-extraction-project", level: 3, track: "ai", project: "Proje: Belgeden Yapılı Veri Çıkarma", difficulty: "Orta",
    emoji: "📑", accent: "cyan", tier: "mid",
    description: "Faturalar/CV'ler gibi belgelerden alan çıkar. Amaç: şema, doğrulama ve güven.",
    skills: ["Extraction", "Schema", "Validation", "Confidence", "Structured output", "Evaluation"],
    steps: [
      { title: "1. Çıkarım şeması", learn: ["Schema"], question: "Çıkarılacak alanları şemayla tanımlamak neden ilk adım?", tasks: [{ goal: "Alan şemasını tanımla.", tip: "Alan+tip." }] },
      { title: "2. Çıkar", learn: ["Extraction"], question: "Eksik/belirsiz alanı uydurmak yerine ne yapılmalı?", tasks: [{ goal: "Belgeden alanları çıkar.", tip: "Null'a izin ver." }] },
      { title: "3. Doğrula", learn: ["Validation"], question: "Çıkarılan veriyi kurallarla doğrulamak neden gerekir?", tasks: [{ goal: "Çıktıyı doğrula.", tip: "Format/aralık." }] },
      { title: "4. Güven skoru", learn: ["Confidence"], question: "Düşük güvenli çıkarımı insana yönlendirmek neyi sağlar?", tasks: [{ goal: "Belirsizleri işaretle.", tip: "Human review." }] },
    ],
  },
  {
    id: "ai-content-generation", level: 2, track: "ai", project: "İçerik Üretimi (Kontrollü)", difficulty: "Kolay-Orta",
    emoji: "📝", accent: "indigo", tier: "mid",
    description: "Marka sesinde içerik üret. Amaç: ton, kısıt, şablon ve kalite kontrol.",
    skills: ["Content generation", "Tone", "Constraints", "Templates", "Quality", "Brand voice"],
    steps: [
      { title: "1. Ton & ses", learn: ["Tone"], question: "Marka sesini prompt'a nasıl güvenilir biçimde aktarırsın?", tasks: [{ goal: "Ton kurallarını tanımla.", tip: "Örnek + kural." }] },
      { title: "2. Kısıtlar", learn: ["Constraints"], question: "Uzunluk/yasak kelime gibi kısıtları dayatmak neyi sağlar?", tasks: [{ goal: "Kısıtlı içerik üret.", tip: "Sınırlar." }] },
      { title: "3. Kalite kontrol", learn: ["Quality"], question: "Üretilen içeriği yayınlamadan ne kontrol etmeli?", tasks: [{ goal: "Kalite kontrolü ekle.", tip: "Otomatik kontrol." }] },
    ],
  },
  {
    id: "ai-agentic-rag", level: 5, track: "ai", project: "Agentic RAG", difficulty: "İleri",
    emoji: "🧠", accent: "emerald", tier: "senior",
    description: "Kendi kendine araştıran RAG. Amaç: çok adımlı retrieval, araç ve karar.",
    skills: ["Agentic RAG", "Multi-hop", "Tool use", "Planning", "Evaluation", "Stopping"],
    steps: [
      { title: "1. Çok adımlı retrieval", learn: ["Multi-hop"], question: "Tek getirimin yetmediği soruları ne çözer?", tasks: [{ goal: "Adım adım bilgi topla.", tip: "Multi-hop." }] },
      { title: "2. Araçlarla araştır", learn: ["Tool use"], question: "Retrieval'ı arama/hesap araçlarıyla birleştirmek neyi açar?", tasks: [{ goal: "Araç çağrılarıyla genişlet.", tip: "Arama+RAG." }] },
      { title: "3. Yeterlilik kararı", learn: ["Stopping"], question: "'Yeterli bilgi topladım' kararını agent nasıl verir?", tasks: [{ goal: "Durdurma koşulu koy.", tip: "Yeterlilik." }] },
      { title: "4. Değerlendir", learn: ["Evaluation"], question: "Çok adımlı akışı değerlendirmek neden zordur?", tasks: [{ goal: "Uçtan uca değerlendir.", tip: "Senaryolar." }] },
    ],
  },
  {
    id: "ai-router", level: 4, track: "ai", project: "İstek Yönlendirme & Sınıflandırma", difficulty: "İleri",
    emoji: "🚦", accent: "amber", tier: "senior",
    description: "Doğru işi doğru ele al. Amaç: niyet sınıflandırma, yönlendirme ve fallback.",
    skills: ["Routing", "Intent classification", "Fallback", "Model routing", "Cost", "Latency"],
    steps: [
      { title: "1. Niyet sınıflandır", learn: ["Intent classification"], question: "Kullanıcı niyetini önce sınıflandırmak akışı nasıl basitleştirir?", tasks: [{ goal: "İsteği niyete göre etiketle.", tip: "Sınıflandırıcı." }] },
      { title: "2. Yönlendir", learn: ["Routing"], question: "Her niyeti farklı işleme yönlendirmek neyi iyileştirir?", tasks: [{ goal: "Niyete göre yönlendir.", tip: "Dallan." }] },
      { title: "3. Model seçimi", learn: ["Model routing"], question: "Basit isteği küçük modele yönlendirmek maliyeti nasıl düşürür?", tasks: [{ goal: "Karmaşıklığa göre model seç.", tip: "Küçük→büyük." }] },
      { title: "4. Fallback", learn: ["Fallback"], question: "Sınıflandırma belirsizse ne yapmalı?", tasks: [{ goal: "Belirsizde güvenli fallback.", tip: "Varsayılan akış." }] },
    ],
  },
  {
    id: "ai-resilience", level: 4, track: "ai", project: "Dayanıklılık (Retry/Fallback)", difficulty: "İleri",
    emoji: "🧯", accent: "rose", tier: "senior",
    description: "LLM uygulamasını sağlamlaştır. Amaç: retry, timeout, fallback model ve graceful degrade.",
    skills: ["Resilience", "Retry", "Timeout", "Fallback", "Rate limit", "Error handling"],
    steps: [
      { title: "1. Hata türleri", learn: ["Error handling"], question: "Geçici (429/5xx) ve kalıcı hataları ayırmak neden gerekir?", tasks: [{ goal: "Hataları sınıflandır.", tip: "Geçici/kalıcı." }] },
      { title: "2. Retry + backoff", learn: ["Retry"], question: "Geçici hatada backoff'lu retry neyi kurtarır?", tasks: [{ goal: "Retry uygula.", tip: "Exponential backoff." }] },
      { title: "3. Fallback model", learn: ["Fallback"], question: "Birincil sağlayıcı düşünce alternatife geçmek neyi sağlar?", tasks: [{ goal: "Yedek modele düş.", tip: "Fallback zinciri." }] },
      { title: "4. Zarif bozulma", learn: ["Timeout"], question: "Yanıt gecikince kullanıcıya ne sunmak iyi bir UX?", tasks: [{ goal: "Timeout'ta zarif davran.", tip: "Kısmi/uyarı." }] },
    ],
  },
  {
    id: "ai-semantic-cache", level: 4, track: "ai", project: "Semantik Cache", difficulty: "İleri",
    emoji: "♻️", accent: "lime", tier: "senior",
    description: "Benzer sorulara tekrar ödeme yapma. Amaç: anlamsal cache, eşik ve geçersizleştirme.",
    skills: ["Semantic cache", "Embedding", "Threshold", "Invalidation", "Cost", "Latency"],
    steps: [
      { title: "1. Anlamsal eşleştir", learn: ["Semantic cache"], question: "Tam eşleşme cache'i neden çoğu soruyu kaçırır?", tasks: [{ goal: "Benzer soruyu cache'ten bul.", tip: "Embedding benzerliği." }] },
      { title: "2. Eşik", learn: ["Threshold"], question: "Benzerlik eşiği çok düşükse hangi hata oluşur?", tasks: [{ goal: "Eşiği ayarla.", tip: "Yanlış isabet riski." }] },
      { title: "3. Geçersizleştir", learn: ["Invalidation"], question: "Kaynak veri değişince cache neden bayatlar?", tasks: [{ goal: "Bayat cache'i temizle.", tip: "TTL/sürüm." }] },
    ],
  },
  {
    id: "ai-batch-processing", level: 3, track: "ai", project: "Toplu LLM İşleme", difficulty: "Orta",
    emoji: "📦", accent: "cyan", tier: "mid",
    description: "Binlerce kaydı modele işlet. Amaç: kuyruk, eşzamanlılık, hız sınırı ve idempotency.",
    skills: ["Batch", "Concurrency", "Rate limit", "Idempotency", "Cost", "Progress"],
    steps: [
      { title: "1. Kuyrukla", learn: ["Batch"], question: "Toplu işi tek tek senkron yapmak neden ölçeklenmez?", tasks: [{ goal: "İşleri kuyruğa al.", tip: "Worker." }] },
      { title: "2. Eşzamanlılık & limit", learn: ["Rate limit"], question: "Eşzamanlılığı sağlayıcı limitine göre ayarlamak neden gerekir?", tasks: [{ goal: "Paralelliği sınırla.", tip: "Concurrency cap." }] },
      { title: "3. Idempotent", learn: ["Idempotency"], question: "İş yarıda kalıp tekrar başlarsa çift işlemeyi ne engeller?", tasks: [{ goal: "İşlenmişi atla.", tip: "Durum takibi." }] },
      { title: "4. İlerleme & maliyet", learn: ["Progress"], question: "Uzun toplu işte ilerleme ve maliyeti izlemek neden gerekir?", tasks: [{ goal: "İlerleme/maliyeti izle.", tip: "Sayaç." }] },
    ],
  },
  {
    id: "ai-conversation-agent", level: 4, track: "ai", project: "Proje: Görev Tamamlayan Asistan", difficulty: "İleri",
    emoji: "🗣️", accent: "violet", tier: "senior",
    description: "Konuşarak iş bitiren asistan. Amaç: niyet, araç, onay ve durum yönetimi.",
    skills: ["Assistant", "Tool use", "State", "Confirmation", "Memory", "Error handling"],
    steps: [
      { title: "1. Niyeti anla", learn: ["Assistant"], question: "Çok adımlı bir görevde eksik bilgiyi sormak neden gerekir?", tasks: [{ goal: "Eksik bilgiyi netleştir.", tip: "Soru sor." }] },
      { title: "2. Araçlarla yap", learn: ["Tool use"], question: "Konuşmayı gerçek eyleme bağlamak (araç) neyi mümkün kılar?", tasks: [{ goal: "Araçlarla görevi yürüt.", tip: "Çağrı." }] },
      { title: "3. Onay al", learn: ["Confirmation"], question: "Geri alınamaz eylemden önce onay neden şart?", tasks: [{ goal: "Riskli adımda onay iste.", tip: "Özet+onay." }] },
      { title: "4. Durum yönetimi", learn: ["State"], question: "Çok adımlı görevde 'nerede kaldık' durumu nasıl tutulur?", tasks: [{ goal: "Görev durumunu izle.", tip: "State makinesi." }] },
    ],
  },
  {
    id: "ai-model-comparison", level: 3, track: "ai", project: "Model Karşılaştırma & Seçim", difficulty: "Orta",
    emoji: "⚖️", accent: "amber", tier: "mid",
    description: "İşe doğru modeli seç. Amaç: kalite/maliyet/gecikme ödünleşimi ve test.",
    skills: ["Model selection", "Benchmark", "Cost", "Latency", "Quality", "Tradeoff"],
    steps: [
      { title: "1. Kriterleri belirle", learn: ["Model selection"], question: "Model seçiminde tek 'en iyi' neden yoktur?", tasks: [{ goal: "Kalite/maliyet/gecikme kriterleri yaz.", tip: "Öncelikler." }] },
      { title: "2. Kendi görevinde test et", learn: ["Benchmark"], question: "Genel benchmark'lar neden senin görevini garanti etmez?", tasks: [{ goal: "Kendi eval setinde kıyasla.", tip: "Görev-özel." }] },
      { title: "3. Ödünleşim", learn: ["Tradeoff"], question: "Maliyet/kalite ödünleşimini nasıl kararlaştırırsın?", tasks: [{ goal: "Bir model seç ve gerekçelendir.", tip: "Veriye dayalı." }] },
    ],
  },
];

const dataScienceExtra3: Level[] = [
  {
    id: "ds-feature-selection", level: 4, track: "data-science", project: "Özellik Seçimi", difficulty: "İleri",
    emoji: "🔬", accent: "emerald", tier: "senior",
    description: "Az ama doğru özellik. Amaç: filtre/wrapper/embedded yöntemler ve istikrar.",
    skills: ["Feature selection", "Filter", "Wrapper", "Embedded", "Stability", "Overfitting"],
    steps: [
      { title: "1. Neden seçim", learn: ["Feature selection"], question: "Çok özellik neden hem yavaşlık hem aşırı uyum getirir?", tasks: [{ goal: "Özellik sayısının etkisini gözlemle.", tip: "Gürültü." }] },
      { title: "2. Filtre yöntemleri", learn: ["Filter"], question: "Korelasyon/önem temelli filtre neyi hızlı eler?", tasks: [{ goal: "İstatistiksel filtre uygula.", tip: "Korelasyon/önem." }] },
      { title: "3. Wrapper", learn: ["Wrapper"], question: "Wrapper yöntemleri neden pahalı ama güçlüdür?", tasks: [{ goal: "İleri/geri seçim dene.", tip: "RFE." }] },
      { title: "4. Embedded", learn: ["Embedded"], question: "Lasso/ağaç önemi seçimi modele nasıl gömer?", tasks: [{ goal: "Model temelli seçim yap.", tip: "L1/önem." }] },
      { title: "5. İstikrar", learn: ["Stability"], question: "Seçimin farklı örneklerde tutarlı olması neden önemli?", tasks: [{ goal: "Seçim istikrarını kontrol et.", tip: "Tekrar." }] },
    ],
  },
  {
    id: "ds-validation-strategies", level: 4, track: "data-science", project: "Doğrulama Stratejileri", difficulty: "İleri",
    emoji: "🧮", accent: "sky", tier: "senior",
    description: "Doğru CV doğru sonuç. Amaç: stratified, group, time-series CV ve sızıntı.",
    skills: ["Cross-validation", "Stratified", "Group K-fold", "Time-series CV", "Leakage", "Nested CV"],
    steps: [
      { title: "1. Stratified", learn: ["Stratified"], question: "Dengesiz veride stratified CV neden gerekir?", tasks: [{ goal: "Stratified k-fold uygula.", tip: "Sınıf oranı." }] },
      { title: "2. Group K-fold", learn: ["Group K-fold"], question: "Aynı kullanıcının verisi train+test'e düşerse hangi sızıntı olur?", tasks: [{ goal: "Gruba göre ayır.", tip: "Group K-fold." }] },
      { title: "3. Zaman serisi CV", learn: ["Time-series CV"], question: "Zaman serisinde rastgele CV neden geçersiz?", tasks: [{ goal: "İleriye doğru doğrula.", tip: "Geçmiş→gelecek." }] },
      { title: "4. Nested CV", learn: ["Nested CV"], question: "Hiperparametre seçimi + değerlendirmeyi ayırmak neden gerekir?", tasks: [{ goal: "Nested CV kur.", tip: "İç+dış döngü." }] },
    ],
  },
];

const aiExtra3: Level[] = [
  {
    id: "ai-translation", level: 2, track: "ai", project: "Çeviri & Yerelleştirme", difficulty: "Kolay-Orta",
    emoji: "🌍", accent: "indigo", tier: "mid",
    description: "Bağlama duyarlı çeviri. Amaç: ton, terim tutarlılığı ve değerlendirme.",
    skills: ["Translation", "Context", "Glossary", "Tone", "Evaluation", "Localization"],
    steps: [
      { title: "1. Bağlamlı çeviri", learn: ["Context"], question: "Cümleyi tek tek çevirmek ile bağlamla çevirmek neden farklı?", tasks: [{ goal: "Bağlamla çeviri yap.", tip: "Tüm metin." }] },
      { title: "2. Terim sözlüğü", learn: ["Glossary"], question: "Marka/terim tutarlılığını bir sözlük nasıl sağlar?", tasks: [{ goal: "Sözlükle terimleri sabitle.", tip: "Glossary." }] },
      { title: "3. Ton & yerel", learn: ["Localization"], question: "Yerelleştirme çeviriden neden fazlasıdır?", tasks: [{ goal: "Tonu yerele uyarla.", tip: "Kültürel uyum." }] },
      { title: "4. Değerlendir", learn: ["Evaluation"], question: "Çeviri kalitesini otomatik ölçmenin sınırı nedir?", tasks: [{ goal: "Örneklerle değerlendir.", tip: "İnsan + otomatik." }] },
    ],
  },
  {
    id: "ai-moderation", level: 3, track: "ai", project: "İçerik Moderasyonu", difficulty: "Orta",
    emoji: "🚧", accent: "rose", tier: "mid",
    description: "Zararlı içeriği yakala. Amaç: kategoriler, eşik, insan döngüsü ve hata.",
    skills: ["Moderation", "Classification", "Threshold", "Human-in-loop", "Bias", "Evaluation"],
    steps: [
      { title: "1. Kategoriler", learn: ["Moderation"], question: "Moderasyon kategorilerini net tanımlamak neden ilk adım?", tasks: [{ goal: "Politika kategorileri tanımla.", tip: "Net sınırlar." }] },
      { title: "2. Sınıflandır", learn: ["Classification"], question: "İçeriği kategoriye göre puanlamak nasıl yapılır?", tasks: [{ goal: "İçeriği moderasyondan geçir.", tip: "Skor." }] },
      { title: "3. Eşik & insan", learn: ["Human-in-loop"], question: "Sınırdaki vakaları insana yönlendirmek neden gerekir?", tasks: [{ goal: "Belirsizi insana yönlendir.", tip: "Eşik bandı." }] },
      { title: "4. Yanlılık", learn: ["Bias"], question: "Moderasyon modelinin yanlılığı kimi haksız etkileyebilir?", tasks: [{ goal: "Yanlılığı test et.", tip: "Grup bazlı." }] },
    ],
  },
  {
    id: "ai-knowledge-graph", level: 5, track: "ai", project: "Bilgi Grafı Destekli RAG", difficulty: "İleri",
    emoji: "🕸️", accent: "violet", tier: "senior",
    description: "İlişkileri kullanan retrieval. Amaç: graf çıkarımı, ilişki sorgusu ve hibrit.",
    skills: ["Knowledge graph", "Entity extraction", "Relations", "Graph RAG", "Hybrid", "Reasoning"],
    steps: [
      { title: "1. Varlık & ilişki çıkar", learn: ["Entity extraction"], question: "Metinden varlık/ilişki çıkarmak grafı nasıl kurar?", tasks: [{ goal: "Varlık ve ilişkileri çıkar.", tip: "Üçlü (triple)." }] },
      { title: "2. Grafı sorgula", learn: ["Relations"], question: "Çok-hop ilişki sorusunu graf neden daha iyi yanıtlar?", tasks: [{ goal: "İlişki üzerinden gez.", tip: "Graf sorgusu." }] },
      { title: "3. Hibrit", learn: ["Hybrid"], question: "Vektör + graf retrieval'ı birleştirmek neyi kazandırır?", tasks: [{ goal: "Graf ve vektörü birleştir.", tip: "Hibrit." }] },
      { title: "4. Akıl yürüt", learn: ["Reasoning"], question: "Graf bağlamı çok adımlı akıl yürütmeyi nasıl destekler?", tasks: [{ goal: "Graf bağlamıyla cevapla.", tip: "İlişkisel." }] },
    ],
  },
  {
    id: "ai-streaming-ux", level: 3, track: "ai", project: "Streaming & Yanıt UX'i", difficulty: "Orta",
    emoji: "📡", accent: "cyan", tier: "mid",
    description: "Bekleme hissini azalt. Amaç: token akışı, iptal, kısmi işleme ve hata.",
    skills: ["Streaming", "Cancellation", "Partial parse", "UX", "Error handling", "Latency"],
    steps: [
      { title: "1. Token akışı", learn: ["Streaming"], question: "Akış algılanan gecikmeyi neden ciddi azaltır?", tasks: [{ goal: "Yanıtı akışla göster.", tip: "Stream." }] },
      { title: "2. İptal", learn: ["Cancellation"], question: "Kullanıcı durdurmak isterse akışı iptal etmek neden gerekir?", tasks: [{ goal: "Akışı iptal edilebilir yap.", tip: "Abort." }] },
      { title: "3. Kısmi işleme", learn: ["Partial parse"], question: "Akan yapılı çıktıyı kısmen işlemek neyi zorlaştırır?", tasks: [{ goal: "Kısmi çıktıyı güvenle ele.", tip: "Tolere et." }] },
      { title: "4. Akışta hata", learn: ["Error handling"], question: "Akış ortasında bağlantı koparsa kullanıcıya ne göstermelisin?", tasks: [{ goal: "Akış hatasını zarif ele.", tip: "Kısmi + tekrar dene." }] },
      { title: "5. Gecikme algısı", learn: ["Latency"], question: "İlk token süresi (TTFT) toplam süreden neden daha çok hissedilir?", tasks: [{ goal: "İlk token'ı hızlandır.", tip: "Erken yanıt." }] },
    ],
  },
  {
    id: "ai-test-driven-prompts", level: 4, track: "ai", project: "Test Odaklı Prompt Geliştirme", difficulty: "İleri",
    emoji: "🧪", accent: "amber", tier: "senior",
    description: "Prompt'ları mühendislik disipliniyle geliştir. Amaç: test seti, iterasyon ve regresyon.",
    skills: ["Prompt testing", "Eval set", "Iteration", "Regression", "Metrics", "CI"],
    steps: [
      { title: "1. Test seti kur", learn: ["Eval set"], question: "Prompt için bir test seti neden 'gözle bakmaktan' iyidir?", tasks: [{ goal: "Girdi-beklenen çiftleri topla.", tip: "Kenar vakalar." }] },
      { title: "2. Ölç & iterasyon", learn: ["Iteration"], question: "Prompt değişimini sayıyla doğrulamak neyi sağlar?", tasks: [{ goal: "Değişiklikleri test setinde ölç.", tip: "Skor." }] },
      { title: "3. Regresyon", learn: ["Regression"], question: "Bir iyileştirme başka vakayı bozarsa ne yakalar?", tasks: [{ goal: "Tüm seti her değişimde koş.", tip: "CI eval." }] },
      { title: "4. Kenar vaka", learn: ["Metrics"], question: "Zor/kenar vakaları sete eklemek kaliteyi nasıl artırır?", tasks: [{ goal: "Hataları sete geri besle.", tip: "Büyüyen set." }] },
    ],
  },
];

export const extraLevels: Level[] = [
  ...frontendExtra,
  ...backendExtra,
  ...devopsExtra,
  ...devopsExtra2,
  ...devopsExtra3,
  ...dataEngExtra,
  ...dataEngExtra2,
  ...dataEngExtra3,
  ...dataScienceExtra,
  ...dataScienceExtra2,
  ...dataScienceExtra3,
  ...aiExtra,
  ...aiExtra2,
  ...aiExtra3,
];
