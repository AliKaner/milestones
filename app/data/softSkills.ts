/**
 * Pasif (soft) skill öz-değerlendirme verisi.
 * Her ifade OLUMLU çerçevelenir: "Evet" = o davranışa sahipsin (güçlü yön).
 * Skor = kategori içindeki "Evet" sayısı. Teknik değil, davranışsal beceriler.
 * İlgili sözlük terimleri: Soft Skills (Pasif Yetenekler), Çatışma Çözme,
 * Code Review Kültürü, Yapıcı Geri Bildirim.
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
    label: "İletişim",
    emoji: "💬",
    concept: "Soft Skills (Pasif Yetenekler)",
    improveTip:
      "Karşındakinin teknik seviyesine göre dil ayarla; yazarken 'sonuç önce, detay sonra' yaz ve anlaşıldığını teyit et.",
    statements: [
      { id: "iletisim-1", text: "Bir konuyu, dinleyenin seviyesine göre sadeleştirerek anlatabilirim." },
      { id: "iletisim-2", text: "Yazılı mesajlarımda önce sonucu/isteği, sonra detayı veririm." },
      { id: "iletisim-3", text: "Anlamadığım bir şeyi 'aptalca' bulmadan soru sorarım." },
      { id: "iletisim-4", text: "Bir kararın 'neden'ini, sadece 'ne'sini değil, açıklarım." },
      { id: "iletisim-5", text: "Kötü haberi de zamanında ve net iletirim, ertelemem." },
    ],
  },
  {
    id: "catisma",
    label: "Ekip İçi & Çatışma",
    emoji: "🤝",
    concept: "Çatışma Çözme",
    improveTip:
      "Anlaşmazlıkta önce dinle; kişiyi değil sorunu konuş; ortak hedefe (ürün/kullanıcı) dön ve gerekirse veriyle karar ver.",
    statements: [
      { id: "catisma-1", text: "Bir anlaşmazlıkta önce karşı tarafı tam dinlerim." },
      { id: "catisma-2", text: "Tartışmayı kişiselleştirmeden, soruna odaklı tutarım." },
      { id: "catisma-3", text: "Haklı çıkmaktan çok birlikte ilerlemeye öncelik veririm." },
      { id: "catisma-4", text: "Fikir ayrılığında karar için veri/örnek getiririm." },
      { id: "catisma-5", text: "Varılan kararı yazılı olarak netleştiririm." },
    ],
  },
  {
    id: "review",
    label: "Code Review Kültürü",
    emoji: "🔍",
    concept: "Code Review Kültürü",
    improveTip:
      "Küçük PR aç; 'sen' yerine 'bu satır' de; öneriyi gerekçeyle sun; nit (küçük) ile blocker (engel) ayrımını belirt.",
    statements: [
      { id: "review-1", text: "PR'larımı küçük ve gözden geçirilebilir tutarım." },
      { id: "review-2", text: "Review yaparken kodu eleştiririm, kişiyi değil." },
      { id: "review-3", text: "Önerilerimi gerekçesiyle (neden) sunarım." },
      { id: "review-4", text: "Bana gelen eleştiriyi savunmaya geçmeden değerlendiririm." },
      { id: "review-5", text: "Küçük öneri (nit) ile engelleyici (blocker) ayrımını belirtirim." },
    ],
  },
  {
    id: "geri-bildirim",
    label: "Geri Bildirim",
    emoji: "🪞",
    concept: "Yapıcı Geri Bildirim",
    improveTip:
      "Geri bildirimi somut ve davranışa odaklı ver ('şu fonksiyon çok şey yapıyor' gibi); övgüyü de net söyle; almayı da öğren.",
    statements: [
      { id: "geri-bildirim-1", text: "Geri bildirimi somut ve davranışa odaklı veririm." },
      { id: "geri-bildirim-2", text: "Olumlu işi de açıkça takdir ederim, sadece hatayı değil." },
      { id: "geri-bildirim-3", text: "Geri bildirimi zamanında veririm, biriktirmem." },
      { id: "geri-bildirim-4", text: "Geri bildirim alınca teşekkür eder ve soru sorarım." },
    ],
  },
  {
    id: "zaman",
    label: "Zaman & Öncelik",
    emoji: "⏳",
    improveTip:
      "Önce etki/aciliyete göre önceliklendir; bloke olunca erken haber ver; tahmin verirken belirsizliği de söyle.",
    statements: [
      { id: "zaman-1", text: "İşleri etki ve aciliyete göre önceliklendiririm." },
      { id: "zaman-2", text: "Bloke olduğumda saatlerce uğraşmadan erken yardım isterim." },
      { id: "zaman-3", text: "Bir işin ne kadar süreceğini gerçekçi tahmin etmeye çalışırım." },
      { id: "zaman-4", text: "Aynı anda çok işe bölünmek yerine odaklanırım." },
    ],
  },
  {
    id: "sahiplenme",
    label: "Sahiplenme & Büyüme",
    emoji: "🌱",
    concept: "Soft Skills (Pasif Yetenekler)",
    improveTip:
      "Verdiğin sözü takip et; hatayı sahiplen ve dersini paylaş; düzenli olarak yeni bir şey öğrenmeyi alışkanlık yap.",
    statements: [
      { id: "sahiplenme-1", text: "Üstlendiğim işi sonuna kadar takip eder, 'benlik değil' demem." },
      { id: "sahiplenme-2", text: "Hata yapınca sahiplenir ve dersini paylaşırım." },
      { id: "sahiplenme-3", text: "Bilmediğim bir alanı öğrenmeye istekliyim." },
      { id: "sahiplenme-4", text: "Geri bildirimle kendi çalışma şeklimi değiştirebilirim." },
    ],
  },
];
