export type Concept = {
  term: string;
  short: string; // tek cümlelik özet
  body: string; // anlaşılır, biraz daha uzun açıklama
  analogy?: string; // günlük hayattan benzetme
  category: "Temel" | "Frontend" | "Backend" | "Araçlar";
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
    category: "Frontend",
    short: "Web sayfasının görünümünü (renk, boşluk, düzen) belirleyen dil.",
    body: "HTML sayfanın iskeletini ve içeriğini tanımlar; CSS (Cascading Style Sheets) ise onu güzelleştirir: renkler, yazı tipleri, boşluklar, hizalama, animasyonlar ve responsive (mobil uyumlu) düzen hep CSS ile yapılır. Bir elementi seçip ona stil kuralları verirsin.",
    analogy: "Evin kaba inşaatı HTML ise; boya, mobilya ve dekorasyon CSS'tir.",
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
