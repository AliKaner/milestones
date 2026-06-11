export type Concept = {
  term: string;
  short: string; // tek cümlelik özet
  body: string; // anlaşılır, biraz daha uzun açıklama
  analogy?: string; // günlük hayattan benzetme
  category: "Temel" | "Frontend" | "CSS" | "Backend" | "Araçlar";
};

/**
 * Junior developer'ın sık duyup "tam olarak ne ki bu?" dediği kavramlar.
 * Kartlar arasında sağa/sola gezilir. Amaç: jargonu insan diline çevirmek.
 * Teknik terimler İngilizce bırakılır; açıklama Türkçe ve sade tutulur.
 */
export const concepts: Concept[] = [
  {
    term: "npm",
    category: "Araçlar",
    short: "JavaScript dünyasının paket marketi ve kurulum aracı.",
    body: "npm (Node Package Manager), başkalarının yazdığı hazır kod parçalarını (paketleri) projene indirip yönetmeni sağlar. `npm install react` dediğinde React'i internetten indirir ve `node_modules` klasörüne koyar. Hangi paketleri kullandığın `package.json` dosyasında yazar.",
    analogy: "Telefonun App Store'u gibi: ihtiyacın olan 'uygulamayı' (paketi) aratıp tek komutla kurarsın.",
  },
  {
    term: "Bundler",
    category: "Araçlar",
    short: "Onlarca dosyanı tarayıcının anlayacağı tek pakete toplayan araç.",
    body: "Modern bir projede yüzlerce ayrı .js, .css, görsel dosyası olur. Bundler (Vite, webpack, esbuild...) bunları birleştirir, gereksizleri atar, küçültür (minify) ve tarayıcının hızlıca yükleyebileceği optimize edilmiş dosyalar üretir. Ayrıca yeni JS/TS sözdizimini eski tarayıcıların anlayacağı hale çevirir.",
    analogy: "Dağınık bir valizi düzenli şekilde katlayıp tek çantaya sığdırmak gibi: her şey daha az yer kaplar ve taşıması kolaylaşır.",
  },
  {
    term: "V8 Engine",
    category: "Temel",
    short: "Google'ın yazdığı, JavaScript'i çalıştıran motor.",
    body: "JavaScript bir metindir; bir şeyin onu okuyup makinenin anlayacağı komutlara çevirmesi gerekir. V8, Chrome'un ve Node.js'in içindeki bu motordur. JS kodunu çok hızlı şekilde makine koduna derleyip (JIT compilation) çalıştırır. Node.js, V8'i tarayıcıdan çıkarıp bilgisayarında da JS çalıştırmanı sağlar.",
    analogy: "Arabanın motoru gibi: sen direksiyonu (kodu) çevirirsin, motor (V8) onu gerçek harekete dönüştürür.",
  },
  {
    term: "CSS",
    category: "CSS",
    short: "Web sayfasının görünümünü (renk, boşluk, düzen) belirleyen dil.",
    body: "HTML sayfanın iskeletini ve içeriğini tanımlar; CSS (Cascading Style Sheets) ise onu güzelleştirir: renkler, yazı tipleri, boşluklar, hizalama, animasyonlar ve responsive (mobil uyumlu) düzen hep CSS ile yapılır. Bir elementi seçip ona stil kuralları verirsin.",
    analogy: "Evin kaba inşaatı HTML ise; boya, mobilya ve dekorasyon CSS'tir.",
  },
  {
    term: "Box Model",
    category: "CSS",
    short: "Her HTML elementi iç içe katmanlardan oluşan bir kutudur.",
    body: "CSS'te her element bir kutudur ve dıştan içe dört katmanı vardır: content (içerik), padding (içerikle kenar arası boşluk), border (çerçeve) ve margin (kutunun dış komşularıyla arası). Bir şeyin neden beklediğinden büyük/küçük göründüğünü çoğu zaman bu katmanlar açıklar. `box-sizing: border-box` ile genişliğe padding+border dahil edilir; hayatını kolaylaştırır.",
    analogy: "Çerçeveli bir tablo gibi: resim (content), iç paspartu (padding), çerçeve (border), duvarla arasındaki boşluk (margin).",
  },
  {
    term: "Flexbox",
    category: "CSS",
    short: "Öğeleri tek bir eksende (satır/sütun) kolayca hizalayıp dağıtan düzen sistemi.",
    body: "`display: flex` verdiğin bir kapsayıcı, içindeki öğeleri tek boyutta düzenler. `flex-direction` yönü (row/column), `justify-content` ana eksende dağılımı, `align-items` dik eksende hizayı belirler. `gap` ile araları açarsın. Ortalama, eşit aralıklı menü, kart satırları gibi şeylerin %90'ı flexbox'la çözülür.",
    analogy: "Rafa kitap dizmek gibi: hepsini sola yasla, ortala ya da eşit aralıklarla yay — tek komutla.",
  },
  {
    term: "CSS Grid",
    category: "CSS",
    short: "İki boyutlu (satır + sütun) düzenler için ızgara sistemi.",
    body: "Flexbox tek eksen içindir; Grid ise hem satırları hem sütunları aynı anda yönetir. `display: grid` + `grid-template-columns` ile kolon yapısını kurarsın (örn. `repeat(3, 1fr)` = 3 eşit sütun). Galeri, dashboard, kart ızgarası gibi gerçek 2 boyutlu düzenlerde Grid çok güçlüdür.",
    analogy: "Excel tablosu gibi: satır ve sütunlardan oluşan hücrelere içerik yerleştirirsin.",
  },
  {
    term: "Position",
    category: "CSS",
    short: "Bir elementin normal akıştan çıkıp nasıl konumlanacağını belirler.",
    body: "`position` değeri elementin yerini değiştirir: `static` (varsayılan), `relative` (kendi yerine göre kaydır), `absolute` (en yakın konumlu ataya göre serbest yerleş), `fixed` (ekrana sabitle, kaydırmada durur), `sticky` (belli noktaya gelince yapışır). `top/left/right/bottom` ve `z-index` ile ince ayar yaparsın.",
    analogy: "Buzdolabı magnetleri gibi: bazıları olduğu yerde durur, bazılarını istediğin köşeye yapıştırırsın.",
  },
  {
    term: "z-index",
    category: "CSS",
    short: "Üst üste binen elementlerden hangisinin önde görüneceğini belirler.",
    body: "Elementler üst üste geldiğinde `z-index` (yığın sırası) kimin önde olduğunu söyler; büyük değer öne gelir. Sadece `position` static olmayan (relative/absolute/fixed/sticky) elementlerde çalışır. Modal, dropdown, tooltip gibi şeylerin arkada kalmasının sebebi genelde budur.",
    analogy: "Masadaki kağıt yığını gibi: en üste koyduğun kağıt (yüksek z-index) diğerlerini örter.",
  },
  {
    term: "box-shadow",
    category: "CSS",
    short: "Bir elemente gölge ekleyerek derinlik/yükseklik hissi verir.",
    body: "`box-shadow: x y blur spread renk` söz dizimiyle gölge tanımlarsın: yatay/dikey kayma, bulanıklık, yayılma ve renk. Hafif bir gölge bir kartı sayfadan 'yükseltir' ve tıklanabilir hissettirir. `inset` ile gölgeyi içe alırsın. Modern arayüzlerde derinlik algısı çoğunlukla buradan gelir.",
    analogy: "Masaya bırakılan bir kartın altında oluşan gölge gibi: nesneyi yüzeyden ayırıp havada gibi gösterir.",
  },
  {
    term: "word-break & overflow",
    category: "CSS",
    short: "Uzun metin veya içerik kutudan taştığında ne olacağını yönetir.",
    body: "Çok uzun bir kelime/URL kutuyu patlatabilir. `word-break: break-word` (veya `overflow-wrap`) kelimeyi gerektiğinde alt satıra böler. Taşan içerik için `overflow: hidden/auto/scroll` davranışı seçilir; tek satırda '...' göstermek için `text-overflow: ellipsis` (+ `white-space: nowrap` + `overflow: hidden`) üçlüsü kullanılır.",
    analogy: "Dar bir kutuya uzun bir cümle sığdırmak gibi: ya alt satıra geçirirsin, ya sonunu '...' ile kırparsın.",
  },
  {
    term: "Responsive & Media Query",
    category: "CSS",
    short: "Tasarımın ekran boyutuna göre değişmesini sağlar (mobil/tablet/masaüstü).",
    body: "Aynı site telefonda da bilgisayarda da iyi görünmeli. Media query (`@media (min-width: 768px) { ... }`) belli genişliklerde farklı stil uygular. Tailwind'de bunu `sm: md: lg:` ön ekleriyle yaparsın. Genelde 'mobile-first' yaklaşılır: önce küçük ekran, sonra büyük ekranlar için ekleme yapılır.",
    analogy: "Su gibi: hangi kaba (ekrana) koyarsan onun şeklini alır.",
  },
  {
    term: "Pseudo-class (:hover)",
    category: "CSS",
    short: "Elementin belli bir durumdayken aldığı stili tanımlar.",
    body: "Pseudo-class'lar bir elementin durumunu hedefler: `:hover` (fare üzerine gelince), `:focus` (seçiliyken, klavye erişimi için önemli), `:active` (basılıyken), `:disabled`, `:nth-child()` (sıraya göre). Butonların üzerine gelince renk değiştirmesi hep `:hover` iledir. Tailwind'de `hover:` `focus:` ön ekleriyle yazılır.",
    analogy: "Kapı zili gibi: normalde sessiz, parmağını değdirince (hover/active) tepki verir.",
  },
  {
    term: "DOM",
    category: "Frontend",
    short: "Tarayıcının sayfayı tuttuğu, JavaScript ile değiştirilebilen ağaç yapısı.",
    body: "DOM (Document Object Model), HTML sayfanın bellekteki canlı bir temsilidir; iç içe elementlerden oluşan bir ağaçtır. JavaScript bu ağaca erişip element ekleyebilir, silebilir veya değiştirebilir. React aslında senin yerine DOM'u verimli şekilde günceller.",
    analogy: "Sayfanın aile soyağacı gibi: her element bir dal, JS de bu ağaca yeni dal ekleyip budayan bahçıvan.",
  },
  {
    term: "Component",
    category: "Frontend",
    short: "Arayüzün yeniden kullanılabilir, bağımsız bir parçası.",
    body: "React'te arayüzü büyük tek bir dosya yerine küçük, bağımsız parçalara (component) bölersin: Button, Header, Card... Her component kendi görünümünü ve mantığını taşır, başka yerlerde tekrar tekrar kullanılır. Bu da kodu düzenli ve bakımı kolay yapar.",
    analogy: "Lego parçaları gibi: küçük standart parçalardan büyük yapılar kurarsın.",
  },
  {
    term: "Props",
    category: "Frontend",
    short: "Bir component'e dışarıdan veri geçirme yolu.",
    body: "Props (properties), bir component'e parametre göndermenin yoludur; HTML attribute'larına benzer: `<Welcome name=\"Ali\" />`. Veri her zaman yukarıdaki (parent) component'ten aşağıya (child) doğru akar ve child onu değiştiremez (read-only).",
    analogy: "Bir fonksiyona argüman vermek gibi: aynı kalıba farklı veri verip farklı sonuçlar üretirsin.",
  },
  {
    term: "State",
    category: "Frontend",
    short: "Bir component'in zamanla değişen hafızası.",
    body: "State, bir component'in içinde tuttuğu ve değişebilen veridir: bir sayaç değeri, input'a yazılan metin, modal açık mı kapalı mı... State değiştiğinde React o component'i otomatik olarak yeniden çizer (re-render), böylece ekran her zaman güncel kalır.",
    analogy: "Bir formun o anki doldurulmuş hali gibi: sen yazdıkça değişir ve ekran ona göre güncellenir.",
  },
  {
    term: "Hook",
    category: "Frontend",
    short: "React component'lerine state ve yetenek ekleyen özel fonksiyonlar.",
    body: "Hook'lar `use` ile başlayan özel React fonksiyonlarıdır. `useState` component'e hafıza ekler, `useEffect` bir şey olduğunda yan etki çalıştırır (örn. veri çekme), `useContext` paylaşılan veriye erişir. Kendi custom hook'unu da yazıp tekrar eden mantığı paketleyebilirsin.",
    analogy: "Telefona uygulama kurmak gibi: hook ekleyerek basit bir component'e yeni 'yetenekler' (hafıza, yan etki...) takarsın.",
  },
  {
    term: "API",
    category: "Backend",
    short: "İki yazılımın birbiriyle konuşmasını sağlayan arayüz/sözleşme.",
    body: "API (Application Programming Interface), bir programın başka bir programa 'şunu istersen şöyle sorarsın, sana şu formatta cevap dönerim' dediği kurallar bütünüdür. Senin frontend'in, hava durumu verisi için bir hava durumu API'sine istek atar ve JSON cevabı alır.",
    analogy: "Restoran menüsü ve garson gibi: mutfağın nasıl çalıştığını bilmene gerek yok; menüden istersin, garson getirir.",
  },
  {
    term: "RESTful API",
    category: "Backend",
    short: "HTTP üzerinden kaynakları standart kurallarla yöneten API tarzı.",
    body: "REST, API tasarımında yaygın bir kurallar setidir. Her şeyi bir 'kaynak' (resource) olarak görür (örn. /users, /posts) ve işlemleri HTTP metotlarıyla yapar: GET (oku), POST (oluştur), PUT/PATCH (güncelle), DELETE (sil). Adresler (endpoint) öngörülebilir ve düzenlidir. Bu yüzden 'RESTful' bir API'yi başkaları kolayca anlar.",
    analogy: "Düzenli bir kütüphane gibi: her kitabın belli bir rafı (endpoint) ve ödünç alma/iade kuralı (HTTP metodu) vardır.",
  },
  {
    term: "CRUD",
    category: "Backend",
    short: "Veriyle yapılan dört temel işlem: Create, Read, Update, Delete.",
    body: "Neredeyse her uygulama veriyle bu dört şeyi yapar: Create (yeni kayıt oluştur), Read (oku/listele), Update (güncelle), Delete (sil). Bir blog yazısı eklemek, listelemek, düzenlemek ve silmek tam bir CRUD örneğidir. REST'te bunlar sırasıyla POST, GET, PUT/PATCH, DELETE metotlarına karşılık gelir.",
    analogy: "Bir defterle yapabileceğin her şey: yeni not yaz, oku, üstünü değiştir, sayfayı yırt.",
  },
  {
    term: "HTTP Status Code'ları",
    category: "Backend",
    short: "Sunucunun isteğine nasıl karşılık verdiğini bildiren sayısal kodlar.",
    body: "Bir API isteği attığında sunucu, sonucu bir sayıyla özetler. 2xx = başarılı (200 OK, 201 Created). 3xx = yönlendirme. 4xx = senin (istemcinin) hatası (400 Bad Request, 401 Unauthorized, 404 Not Found). 5xx = sunucunun hatası (500 Internal Server Error). Bu kodlara bakarak ne olduğunu hızlıca anlarsın.",
    analogy: "Sınav notu gibi: 200'ler 'geçtin', 400'ler 'sen yanlış yaptın', 500'ler 'okul sistemi çöktü' demek.",
  },
  {
    term: "JSON",
    category: "Backend",
    short: "Sistemler arası veri taşımak için kullanılan metin formatı.",
    body: "JSON (JavaScript Object Notation), veriyi anahtar-değer çiftleriyle yazan, hem insan hem makine için okunabilir bir formattır: `{ \"name\": \"Ali\", \"age\": 25 }`. API'ler veriyi neredeyse her zaman JSON olarak gönderir; JavaScript bunu kolayca nesneye çevirir.",
    analogy: "Uluslararası kargo etiketi gibi: herkesin anladığı ortak bir formatta paketin içinde ne olduğunu yazar.",
  },
  {
    term: "Framework",
    category: "Temel",
    short: "Uygulama kurmayı kolaylaştıran hazır yapı ve kurallar bütünü.",
    body: "Framework (React, Next.js, Angular...), sık ihtiyaç duyulan şeyleri (yönlendirme, render, yapı) hazır sunar; sen sıfırdan tekerleği icat etmek yerine onun sunduğu düzene göre kodunu yazarsın. Kütüphaneden (library) farkı: framework 'akışı' o yönetir, sen onun boşluklarını doldurursun.",
    analogy: "Hazır ev planı gibi: temel ve taşıyıcılar kurulu gelir, sen iç tasarımı yaparsın.",
  },
  {
    term: "Git & GitHub",
    category: "Araçlar",
    short: "Git kod sürümlerini takip eder; GitHub bu kodu bulutta saklar/paylaşır.",
    body: "Git, kodundaki her değişikliğin fotoğrafını (commit) çeken, geçmişe dönmeni ve ekipçe çakışmadan çalışmanı sağlayan bir sürüm kontrol sistemidir. GitHub ise Git depolarını internette barındıran platformdur; iş birliği, yedek ve portfolyo görevi görür. İkisi aynı şey değildir.",
    analogy: "Git = oyundaki 'kayıt noktaları'; GitHub = bu kayıtları yüklediğin bulut hesabı.",
  },
  {
    term: "Deploy",
    category: "Araçlar",
    short: "Projeyi senin bilgisayarından çıkarıp internette canlıya almak.",
    body: "Deploy, lokalde çalışan projeyi herkesin erişebileceği bir sunucuya/CDN'e yükleyip canlı bir URL'e dönüştürme işidir. Vercel veya Netlify gibi servisler GitHub repo'na bağlanır ve her `git push`'ta otomatik olarak yeni sürümü yayınlar.",
    analogy: "Evde pişirdiğin yemeği restoranın menüsüne koymak gibi: artık sadece sen değil, herkes erişebilir.",
  },
];

/** term -> Concept hızlı erişim haritası (yol haritasındaki dallar için). */
export const conceptByTerm: Record<string, Concept> = Object.fromEntries(
  concepts.map((c) => [c.term, c])
);
