/**
 * Pasif (soft) skill ve Mühendislik Olgunluk öz-değerlendirme verisi.
 * Her ifade OLUMLU çerçevelenir: "Evet" = o davranışa sahipsin (güçlü yön).
 * Skor = kategori içindeki "Evet" sayısı. Teknik değil, davranışsal ve olgunluk becerileri.
 * İlgili sözlük terimleri: Soft Skills (Pasif Yetenekler), Çatışma Çözme,
 * Code Review Kültürü, Yapıcı Geri Bildirim, SRE/SLO/SLI, Design Tokens.
 */
export type SoftSkillCategory = {
  id: string;
  label: string;
  emoji: string;
  /** Bu kategori zayıf çıkarsa gösterilecek kısa gelişim ipucu. */
  improveTip: string;
  /** İlgili sözlük terimi (kavramlar sayfasına bağ). */
  concept?: string;
  statements: { id: string; text: string }[];
};

export const softSkills: SoftSkillCategory[] = [
  {
    id: "iletisim",
    label: "İletişim & Radikal Netlik",
    emoji: "💬",
    concept: "Soft Skills (Pasif Yetenekler)",
    improveTip:
      "Fikirleri bulandıran gürültüyü filtrele. Dinleyicinin seviyesine göre vites at, mesajlarında önce can alıcı sonucu ver, belirsizlikte sormaktan korkma.",
    statements: [
      { id: "iletisim-1", text: "Bir konuyu, dinleyenin teknik bilgi seviyesine göre sadeleştirerek veya detaylandırarak anlatabilirim." },
      { id: "iletisim-2", text: "Yazılı mesajlarımda önce can alıcı sonucu ve asıl isteği, ardından destekleyici detayı veririm." },
      { id: "iletisim-3", text: "Anlamadığım bir mimariyi veya gereksinimi 'aptalca görünür mü' diye düşünmeden açıkça sorarım." },
      { id: "iletisim-4", text: "Bir teknik kararı iletirken sadece 'ne' yapılacağını değil, altta yatan 'neden'i de şeffafça açıklarım." },
      { id: "iletisim-5", text: "Projedeki kötü haberleri ve olası gecikmeleri zamanında, net ve eğip bükmeden doğrudan iletirim." },
      { id: "iletisim-6", text: "Toplantılarda konunun dağıldığını fark ettiğimde nazikçe ve net bir şekilde gündeme dönülmesini sağlarım." },
      { id: "iletisim-7", text: "Teknik olmayan paydaşlarla (ürün yöneticisi, müşteri) ortak ve anlaşılır bir terminoloji kurabilirim." },
      { id: "iletisim-8", text: "Yazılı ve sözlü iletişim kanallarının ayrımını iyi yapar; kalıcı kararları mutlaka yazılı hale getiririm." },
      { id: "iletisim-9", text: "Karmaşık sistem tasarımlarını beyaz tahta (whiteboard) veya basit şemalarla berrak biçimde aktarabilirim." },
      { id: "iletisim-10", text: "Gelen iletileri dikkatle okur, varsayımda bulunmak yerine eksik veya muğlak noktaları teyit ederim." },
    ],
  },
  {
    id: "catisma",
    label: "Ekip Sinerjisi & Çatışma Bükücülük",
    emoji: "🤝",
    concept: "Çatışma Çözme",
    improveTip:
      "Egodan arınmış bir tartışma ortamı yarat. Çatışmalarda kişileri değil, sorunu masaya yatır; haklı çıkmak için değil, en iyi çözüme ulaşmak için veri konuş.",
    statements: [
      { id: "catisma-1", text: "Bir anlaşmazlık anında kendi fikrimi savunmaya geçmeden önce karşı tarafın endişelerini sonuna kadar dinlerim." },
      { id: "catisma-2", text: "Tartışmaları asla kişiselleştirmem; odak noktamı daima masadaki sorun ve olası çözüm üzerinde tutarım." },
      { id: "catisma-3", text: "Masada 'haklı çıkmak'tan ziyade, ürün ve kullanıcı için en doğru kararla birlikte ilerlemeye öncelik veririm." },
      { id: "catisma-4", text: "Fikir ayrılıklarının çıkmaza girdiği durumlarda tarafsız veriler, metrikler ve somut örnekler getiririm." },
      { id: "catisma-5", text: "Uzlaşmaya varılan kararları, sürecin şeffaflığı için hızlıca maddeler halinde yazılı olarak netleştiririm." },
      { id: "catisma-6", text: "Ekip içerisinde psikolojik güvenlik ortamı oluşturur; herkesin fikrini rahatça söylemesini desteklerim." },
      { id: "catisma-7", text: "Benim katılmadığım bir karar alınmış olsa bile, ortak karar çıktıktan sonra başarıya ulaşması için tam efor veririm (Disagree & Commit)." },
      { id: "catisma-8", text: "Ekip içi gerginlik anlarında yapıcı bir mizah veya sakinleştirici bir tonla tansiyonu düşürebilirim." },
      { id: "catisma-9", text: "Farklı çalışma tarzlarına ve kökenlere sahip ekip arkadaşlarıma empatiyle ve yüksek saygıyla yaklaşırım." },
      { id: "catisma-10", text: "Ekibin enerjisini tüketen verimsiz kısır döngüleri fark ettiğimde yapıcı bir alternatif sunarak konuyu çözüme bağlarım." },
    ],
  },
  {
    id: "review",
    label: "Code Review & Kalite Bekçiliği",
    emoji: "🔍",
    concept: "Code Review Kültürü",
    improveTip:
      "Kodu bir kapı bekçisi gibi değil, usta bir mentör gibi incele. PR'ları küçük lokmalara böl, eleştiriyi koda yap, öneriyi daima gerekçesiyle açıkla.",
    statements: [
      { id: "review-1", text: "Pull Request (PR) paketlerimi olabildiğince küçük, tek odaklı ve gözden geçirmesi kolay tutarım." },
      { id: "review-2", text: "Code review yaparken asla yargılayıcı bir dil kullanmam; eleştirimi doğrudan koda ve mantığa yöneltirim." },
      { id: "review-3", text: "İncelemelerimde sunduğum değişiklik önerilerini her zaman altta yatan teknik gerekçesiyle (mimari, kural) açıklarım." },
      { id: "review-4", text: "Kendi PR'ıma gelen eleştirileri savunmaya geçmeden, öğrenme ve kod kalitesini artırma fırsatı olarak incelerim." },
      { id: "review-5", text: "İnceleme sırasında küçük öneriler (nit) ile canlıyı etkileyecek engeller (blocker) ayrımını açıkça belirtirim." },
      { id: "review-6", text: "Ekip arkadaşlarımın açtığı PR'ları günlerce bekletmem; akışı bloklamamak için review görevlerine öncelik veririm." },
      { id: "review-7", text: "Review yaparken sadece sözdizimsel hatalara değil, potansiyel performans, xss ve güvenlik zafiyetlerine de dikkat ederim." },
      { id: "review-8", text: "Yorumlarımda gerektiğinde örnek kod parçacıkları veya ilgili resmi dokümantasyon linkleri paylaşarak yardımcı olurum." },
      { id: "review-9", text: "Kapsamlı veya mimari açıdan tartışmalı bir PR olduğunda, ping-pong oynamak yerine 5 dakikalık bir sesli görüşme teklif ederim." },
      { id: "review-10", text: "PR açıklamalarında (Description) neyin neden değiştiğini, nasıl test edileceğini ve varsa ekran görüntülerini titizlikle eklerim." },
    ],
  },
  {
    id: "geri-bildirim",
    label: "Geri Bildirim & Radikal Şeffaflık",
    emoji: "🪞",
    concept: "Yapıcı Geri Bildirim",
    improveTip:
      "Karşındakini büyütmek için cesurca ve şefkatle geri bildirim ver. Övgüyü de eleştiriyi de net davranışlarla ilişkilendir, kendine tutulan aynaya savunmasız bak.",
    statements: [
      { id: "geri-bildirim-1", text: "Geri bildirimlerimi genel geçer sözlerle değil, spesifik durumlara ve somut davranışlara odaklayarak veririm." },
      { id: "geri-bildirim-2", text: "Sadece geliştirilecek yönleri değil, kaliteli işleri ve başarılı katkıları da açıkça ve heyecanla takdir ederim." },
      { id: "geri-bildirim-3", text: "Geri bildirimleri uzun süre içimde biriktirmez; konunun üzerinden zaman geçmeden, sıcağı sıcağına aktarırım." },
      { id: "geri-bildirim-4", text: "Bana bir geri bildirim sunulduğunda savunmaya geçmek yerine teşekkür eder ve derinleştirmek için sorular sorarım." },
      { id: "geri-bildirim-5", text: "Geri bildirim sunarken karşımadakinin kişiliğini değil, profesyonel davranışının proje üzerindeki etkisini tanımlarım." },
      { id: "geri-bildirim-6", text: "Birebir görüşmelerde (1on1) hem yöneticimden hem de çalışma arkadaşlarımdan aktif olarak gelişim tavsiyesi isterim." },
      { id: "geri-bildirim-7", text: "Hassas veya zorlayıcı geri bildirimleri kalabalık ortamlarda değil, her zaman baş başa ve şefkatli bir ses tonuyla veririm." },
      { id: "geri-bildirim-8", text: "Övgüyü ise ekibin motivasyonunu artırmak ve iyi mimari pratikleri yaygınlaştırmak adına açık ortamlarda yaparım." },
      { id: "geri-bildirim-9", text: "Geri bildirim aldıktan sonra aksiyon planı çıkarır ve bu konudaki gelişimimi düzenli olarak takip ederim." },
      { id: "geri-bildirim-10", text: "Kendi profesyonel kör noktalarımı bulmak için etrafımdaki eleştirileri paha biçilemez bir ayna olarak görürüm." },
    ],
  },
  {
    id: "zaman",
    label: "Zaman Mimarlığı & Keskin Odak",
    emoji: "⏳",
    improveTip:
      "Zamanını etki ve aciliyet ekseninde acımasızca önceliklendir. Bağlam değiştirme (context switching) tuzağını reddet, bloke olduğunda anında kırmızı bayrak kaldır.",
    statements: [
      { id: "zaman-1", text: "Masamdaki işleri her zaman kullanıcıya sağladığı etki ve projedeki aciliyet matrisine göre acımasızca önceliklendiririm." },
      { id: "zaman-2", text: "Bir problemde bloke olduğumda saatlerce tek başıma zaman kaybetmek yerine, zamanında bayrak kaldırarak erken yardım isterim." },
      { id: "zaman-3", text: "Görev eforu tahmini (estimation) verirken iyimserlik tuzağına düşmez, olası riskleri ve belirsizlikleri hesaba katarım." },
      { id: "zaman-4", text: "Aynı anda birçok göreve bölünmek (multitasking) yerine, tek bir işe tam odaklanarak onu tamamlama disiplini gösteririm." },
      { id: "zaman-5", text: "Odak gerektiren derin mühendislik saatlerimde (Deep Work) bildirimleri kapatır ve kesintisiz çalışma zamanları yaratırım." },
      { id: "zaman-6", text: "Kapasitemin üzerinde iş yüklendiğinde kaliteyi düşürmek yerine 'hayır' demesini bilir ve alternatif plan sunarım." },
      { id: "zaman-7", text: "Gereksiz veya katkı sağlayamayacağım toplantıları fark ettiğimde, asenkron not ileterek zamanımı korurum." },
      { id: "zaman-8", text: "Her iş gününün başında o gün tamamlanması gereken en kritik 1-2 büyük amaca (MIT - Most Important Task) kilitlenirim." },
      { id: "zaman-9", text: "Beklenmedik acil kesintiler (ad-hoc istekler) geldiğinde panik yapmaz, mevcut sprint hedefleriyle dengeli biçimde yönetirim." },
      { id: "zaman-10", text: "Tekrar eden manuel operasyonları otomatize etmek için başlangıçta küçük eforlar harcayarak gelecekteki zamanımı satın alırım." },
    ],
  },
  {
    id: "sahiplenme",
    label: "Radikal Sahiplenme & Otonom Motor",
    emoji: "🌱",
    concept: "Soft Skills (Pasif Yetenekler)",
    improveTip:
      "Bir işi sadece kodlayıp bırakma, canlıda yaşayacağı tüm ömre talip ol. 'Benim alanım değil' tuzağına düşme, prod hatalarını birer madalya gibi sahiplen ve ders çıkar.",
    statements: [
      { id: "sahiplenme-1", text: "Üstlendiğim bir modülü sadece kodlayıp bırakmaz, canlı ortamda yaşayacağı uçtan uca ömrü kalbime kazır, takip ederim." },
      { id: "sahiplenme-2", text: "Projede ortada kalmış bir mimari sorun gördüğümde 'bu benim alanım değil' demek yerine sorumluluk alır, çözüme kavuştururum." },
      { id: "sahiplenme-3", text: "Canlı sistemde bir hata yaptığımda suçlu aramak yerine hatayı radikal bir şeffaflıkla sahiplenir ve kök nedenini ekiple paylaşırım." },
      { id: "sahiplenme-4", text: "Mikro-yönetime (micro-management) ihtiyaç duymadan, bana verilen hedefler doğrultusunda yüksek otonomiyle iş bitirebilirim." },
      { id: "sahiplenme-5", text: "Kod tabanında karşılaştığım teknik borçları (Technical Debt) halının altına süpürmez, planlı bir şekilde eritmeye çalışırım." },
      { id: "sahiplenme-6", text: "Bir gereksinim eksik veya çelişkiliyse körü körüne kod yazmaz; analist veya ürün yöneticisiyle görüşerek temeli sağlamlaştırırım." },
      { id: "sahiplenme-7", text: "Geliştirdiğim uygulamanın metriklerini, hata loglarını (Sentry vb.) ve sunucu performansını proaktif olarak izlerim." },
      { id: "sahiplenme-8", text: "Dış bağımlılıkların veya diğer ekiplerin beni blokladığı durumlarda pasifçe beklemek yerine proaktif takipçi olurum." },
      { id: "sahiplenme-9", text: "Kod tabanını her dokunuşumda, kamp kuralları gereği, bulduğumdan daha temiz ve dokümante edilmiş halde bırakırım (Boy Scout Rule)." },
      { id: "sahiplenme-10", text: "Projenin vizyonunu ve iş modelini derinden özümser; yazdığım her satırı şirketin kalıcı başarısı için birer tuğla olarak görürüm." },
    ],
  },
  {
    id: "mentorluk",
    label: "Mentörlük & Çarpan Etkisi",
    emoji: "📚",
    concept: "Soft Skills (Pasif Yetenekler)",
    improveTip:
      "Ekibin bilgi çıtasını yükselten bir kaldıraç ol. Sadece kod üretme, dokümantasyon üret; junior'ları sabırla yeşert, projede tek nokta bağımlılığı (SPOF) olma.",
    statements: [
      { id: "mentorluk-1", text: "Ekipteki daha az deneyimli (junior) meslektaşlarımı sabırla dinler, sorularını küçümsemeden onlara rehberlik ederim." },
      { id: "mentorluk-2", text: "Edindiğim spesifik mimari bilgileri ve zorlu problem çözümlerini kendime saklamaz, makale veya sunumlarla ekibe aktarırım." },
      { id: "mentorluk-3", text: "Projede kritik bir modülün tek bilen kişisi (Single Point of Failure - SPOF) olmaktan kaçınır, bilgimi yedeklerim." },
      { id: "mentorluk-4", text: "Mentörlük yaparken doğrudan hazır kodu vermek yerine, zihin açıcı sorularla çözümü kendilerinin bulmasını sağlarım." },
      { id: "mentorluk-5", text: "Düzenli olarak onboarding (yeni başlayan) dokümanlarını günceller; yeni gelen birinin hızla adapte olmasını kolaylaştırırım." },
      { id: "mentorluk-6", text: "Pair programming (eşli programlama) oturumlarına hevesle liderlik eder, bilgimi pratikte omuz omuza aktarırım." },
      { id: "mentorluk-7", text: "Çevremdeki mühendislerin potansiyelini keşfeder, onların kariyer hedeflerine ulaşmaları için yönlendirici fırsatlar yaratırım." },
      { id: "mentorluk-8", text: "Teknik kararlarda 'ben böyle istedim' demek yerine, ekibin vizyonunu geliştirecek teknik makale ve standartları gösteririm." },
      { id: "mentorluk-9", text: "İç eğitimler, tech-talklar veya brown-bag oturumları düzenleyerek şirket içindeki öğrenme kültürünü canlı tutarım." },
      { id: "mentorluk-10", text: "Başarımı sadece bireysel olarak yazdığım kodlarla değil, etrafımdaki mühendisleri ne kadar hızlandırdığımla (Force Multiplier) ölçerim." },
    ],
  },
  {
    id: "kriz",
    label: "Kriz Yönetimi & Antifrajil Dayanıklılık",
    emoji: "🛡️",
    concept: "SRE/SLO/SLI",
    improveTip:
      "Canlı sistem alarm verdiğinde rüzgarda bükülen ama kırılmayan çelik gibi ol. Suçlamasız (blameless) post-mortem ile kök nedene in, geçici yama yerine kalıcı mühendislik yap.",
    statements: [
      { id: "kriz-1", text: "Canlı sistemde (Production) kritik bir kesinti veya alarm yaşandığında panik yapmaz, aşırı soğukkanlı bir analitik zihinle harekete geçerim." },
      { id: "kriz-2", text: "Kriz anlarında 'kim hata yaptı' sorgulamasını tamamen yasaklar; enerjimi yüzde yüz sistemin kurtarılmasına odaklarim." },
      { id: "kriz-3", text: "Kesinti sonrasında suçlamasız (Blameless Post-Mortem) toplantılarına öncülük eder, insani hata yerine sistemdeki yapısal boşluğu ararım." },
      { id: "kriz-4", text: "Acil durumlarda iletişim kanallarını felç etmez; ekibi ve yönetimi periyodik, net ve sakin mesajlarla bilgilendiririm." },
      { id: "kriz-5", text: "Bir kriz çözüldüğünde sadece geçici bir yama (hotfix) atmakla yetinmez, benzer sorunun bir daha yaşanmaması için kalıcı mimari önlemler alırım." },
      { id: "kriz-6", text: "Sistemde anormallik sezdiğimde kulaktan dolma tahminler yerine metrik tabanlı izleme (Monitoring/Observability) panellerine güvenirim." },
      { id: "kriz-7", text: "Yüksek stres altında bile varsayımlara bel bağlamaz; teşhisi koyarken bilimsel şüphecilik ve izolasyon tekniklerini kullanırım." },
      { id: "kriz-8", text: "Rollback (geri alma) stratejilerini önceden kurgular; şüpheli durumlarda inatlaşmadan sistemi en güvenli duruma geri çekebilirim." },
      { id: "kriz-9", text: "Plansız kesintilerden korkmak yerine, her krizin sistem mimarisini ve uyarı mekanizmalarını antifrajil biçimde güçlendireceğine inanırım." },
      { id: "kriz-10", text: "Kriz anında net roller belirler (Incident Commander, Lead Resolver) ve curcuna ortamında liderlik sorumluluğunu üstlenebilirim." },
    ],
  },
  {
    id: "is-zekasi",
    label: "İş Zekası & Mimari Pragmatizm",
    emoji: "💡",
    concept: "Soft Skills (Pasif Yetenekler)",
    improveTip:
      "Kullanıcı empatisiyle mühendislik yap. Altın kaplama (gold plating) kodlardan kaçın, YAGNI (ihtiyacın olmayacak) felsefesini savun, eforu gerçek iş değerine akıt.",
    statements: [
      { id: "is-zekasi-1", text: "Gereksinimleri kodlarken nihai kullanıcının acı noktalarıyla (pain points) derin bir empati kurar, ürün odaklı düşünürüm." },
      { id: "is-zekasi-2", text: "Sırf teknolojik olarak 'modada' veya havalı diye gereksiz karmaşıklıkta mimariler (Over-engineering / Gold Plating) kurmaktan kaçınırım." },
      { id: "is-zekasi-3", text: "Mühendislik kararlarında her zaman maliyet, bakım eforu ve getireceği iş değeri (ROI - Return on Investment) dengesini gözetirim." },
      { id: "is-zekasi-4", text: "İhtiyacın olmayacak kodları peşinen yazmayı reddeder; yalınlık ve pragmatizm prensiplerine (YAGNI, KISS) sadık kalırım." },
      { id: "is-zekasi-5", text: "Teknik kısıtlamaları iş birimlerine suçlayıcı dille değil, olası ticari alternatifler ve esnekliklerle birlikte sunarım." },
      { id: "is-zekasi-6", text: "Hızlı prototipleme ile mükemmel mimari arasındaki vites değişimini iyi yapar; startup hızında pragmatik kararlar alabilirim." },
      { id: "is-zekasi-7", text: "Şirketin ana iş modelini, gelir kanallarını ve maliyet merkezlerini bilir; mimari seçimlerimi bu finansal parametrelerle hizalarım." },
      { id: "is-zekasi-8", text: "Ürün yöneticileriyle pazarlık yaparken teknik jargona saklanmaz; iş etkisine dayalı şeffaf ödünleşim (trade-off) masaları kurarım." },
      { id: "is-zekasi-9", text: "Kullanıcı analiz araçlarından (PostHog, Google Analytics) gelen davranışsal verileri inceleyerek teknik kararlarımı yönlendirebilirim." },
      { id: "is-zekasi-10", text: "Harcanan sunucu ve bulut (Cloud/Server) faturalarını optimize etme refleksine sahibim; kodumun cüzdan üzerindeki etkisini önemserim." },
    ],
  },
  {
    id: "surekli-ogrenme",
    label: "Sürekli Arayış & Bilişsel Merak",
    emoji: "🚀",
    concept: "Agent Loop",
    improveTip:
      "Alışkanlıkların kölesi olma, gerektiğinde eski bildiklerini sıfırla (unlearning). AI asistanları ve yeni araçları efor çarpanı olarak kullan, temel çalışma prensiplerine merak duy.",
    statements: [
      { id: "surekli-ogrenme-1", text: "Kariyerim boyunca alıştığım kalıplara tutunmaz, teknoloji değiştikçe eski bildiklerimi silme ve yeniden öğrenme (Unlearning) cesareti gösteririm." },
      { id: "surekli-ogrenme-2", text: "Yapay zeka araçlarını (AI Coding Agents, Copilot, LLM) iş akışıma katarak mühendislik verimliliğimi bir üst seviyeye taşırım." },
      { id: "surekli-ogrenme-3", text: "Kullandığım framework ve kütüphaneleri ezbere kullanmaz, arka plandaki motorun ve veri yapılarının nasıl çalıştığını merakla deşerim." },
      { id: "surekli-ogrenme-4", text: "Düzenli olarak teknoloji blogları, resmi RFC'ler ve bültenler okuyarak sektördeki devrim niteliğindeki eğilimleri takip ederim." },
      { id: "surekli-ogrenme-5", text: "Bilmediğim yepyeni bir dile veya mimariye atandığımda korkmak yerine, bunu bilişsel sınırlarımı genişletecek bir oyun olarak görürüm." },
      { id: "surekli-ogrenme-6", text: "Kişisel zamanımda küçük konsept doğrulama (Proof of Concept - PoC) projeleri geliştirerek teorik bilgimi pratiğe dökerim." },
      { id: "surekli-ogrenme-7", text: "Sadece kendi alanımdaki (örn. Frontend) gelişmeleri değil, Backend, DevOps ve AI dünyasındaki temel kavramları da hevesle öğrenirim." },
      { id: "surekli-ogrenme-8", text: "Teknolojik dogmalardan (fanatizm) uzak durur; her dilin ve aracın belirli bir problemi çözmek için var olduğunu kabullenirim." },
      { id: "surekli-ogrenme-9", text: "Yeni öğrendiğim üretkenlik araçlarını ve terminal kestirmelerini projedeki diğer geliştiricilerle paylaşarak ekibi hızlandırırım." },
      { id: "surekli-ogrenme-10", text: "Merakımı asla kaybetmez; her gün dünden bir adım daha ileri gitmeyi profesyonel bir zihin alışkanlığı (Growth Mindset) haline getiririm." },
    ],
  },
  {
    id: "asenkron",
    label: "Asenkron Disiplin & Konuma Bağımsız Varlık",
    emoji: "🌐",
    concept: "Soft Skills (Pasif Yetenekler)",
    improveTip:
      "Zaman dilimlerinden bağımsız, şeffaf ve asenkron ilerle. Görüşmeleri sözde bırakıp buharlaştırma, kalıcı yazılı varlık oluştur, mesai-yaşam sınırlarına saygı duy.",
    statements: [
      { id: "asenkron-1", text: "Uzaktan (Remote) çalışırken projedeki anlık ilerlememi, karşılaştığım engelleri ve planlarımı ekibe yüksek şeffaflıkla yansıtırım." },
      { id: "asenkron-2", text: "Asenkron yazılı iletişimde karşı tarafın hemen cevap veremeyeceğini bilerek, mesajlarımı eksiksiz bağlam (full context) ile donatırım." },
      { id: "asenkron-3", text: "Sanal ortamda çalışırken 'sessizleşip kaybolma' tuzağına düşmez, proje kanallarında proaktif bir dijital varlık (Digital Presence) gösteririm." },
      { id: "asenkron-4", text: "Görüşmeleri ve alınan kararları asla havada bırakmaz; anında özetleyip ilgili kanallara asenkron olarak dokümante ederim." },
      { id: "asenkron-5", text: "Zaman dilimi farklılıklarına ve çalışma arkadaşlarımın odaklanma saatlerine saygı gösterir, acil olmayan konularda taciz etmem." },
      { id: "asenkron-6", text: "Uzaktan çalışma ortamında mesai ve özel yaşam sınırlarımı korur; uzun vadeli sürdürülebilirlik (tükenmişliği önleme) için kendimi dengelerim." },
      { id: "asenkron-7", text: "Bir arkadaşımdan onay veya cevap beklerken tamamen durmak yerine, bloklanmayan yan görevlerde (refactoring, test) ilerlerim." },
      { id: "asenkron-8", text: "Sanal toplantılarda kameramı açma, mikrofon disiplini sağlama ve etkin katılım gösterme konularında profesyonellik sergilerim." },
      { id: "asenkron-9", text: "Günlük asenkron stand-up mesajlarımı baştan savma değil, ekibe fayda sağlayacak netlikte ve şeffaflıkta iletirim." },
      { id: "asenkron-10", text: "Uzaktan çalışmanın getirdiği izolasyon hissine karşı, ekip arkadaşlarımla samimi ve sanal kahve sohbetleri kurmaya özen gösteririm." },
    ],
  },
  {
    id: "sistem-tasarimi",
    label: "Sistem Tasarımı & Ödünleşim Becerisi",
    emoji: "⚖️",
    concept: "Design Tokens",
    improveTip:
      "Kusursuz mimari olmadığını, sadece zeki ödünleşimler (trade-offs) olduğunu kabul et. Kararlarını ADR ile belgele, dogmatik kuralları değil, bağlama en uygun pragmatizmi seç.",
    statements: [
      { id: "sistem-tasarimi-1", text: "Mühendislik dünyasında kusursuz bir mimari olmadığını; her seçimin zeki birer ödünleşim (Trade-off) paketi olduğunu derinden kabul ederim." },
      { id: "sistem-tasarimi-2", text: "Mimari kararları alırken alıştığım dogmaları değil, mevcut veri büyüklüğünü, ekip yetkinliğini ve iş kısıtlarını merkeze alırım." },
      { id: "sistem-tasarimi-3", text: "Projedeki kritik yapı taşı seçimlerini (veritabanı, protokol vb.) Mimari Karar Kayıtları (ADR - Architecture Decision Records) ile belgeleme disiplini gösteririm." },
      { id: "sistem-tasarimi-4", text: "Geliştirdiğim bir mimarinin hem bugün yalın olmasını hem de yarın x10 ölçeklendiğinde kolayca esnemesini sağlayacak dengeler kurarım." },
      { id: "sistem-tasarimi-5", text: "Monolitik yapı ile Mikroservisler arasındaki sarkaçta dogmatik davranmaz; projenin olgunluk evresine en uygun olanı seçerim." },
      { id: "sistem-tasarimi-6", text: "Sistem bileşenleri arasındaki eşleşmeyi gevşek tutma (Loose Coupling) ve modülleri yüksek uyumlu (High Cohesion) tasarlama refleksine sahibim." },
      { id: "sistem-tasarimi-7", text: "Büyük çaplı refactoring operasyonlarını tek seferde canlıyı riske atarak değil, Strangler Fig (aşamalı dönüştürme) stratejisiyle yönetirim." },
      { id: "sistem-tasarimi-8", text: "Veri depolama şemalarını tasarlarken okuma/yazma sıklığı, indeksleme maliyeti ve veri büyüme trendini baştan hesaplarım." },
      { id: "sistem-tasarimi-9", text: "Üçüncü parti paket ve servis entegrasyonlarını yaparken, gelecekteki olası göçler için araya esnek soyutlama katmanları koyarım." },
      { id: "sistem-tasarimi-10", text: "Mimari vizyonumda en zarif kodun, karmaşık problemleri olabilecek en sade ve okunabilir biçimde çözen kod olduğunu savunurum." },
    ],
  },
];
