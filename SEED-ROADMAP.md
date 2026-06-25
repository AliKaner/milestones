# DevYol — Seed Genişletme Yol Haritası 🌱

Bu doküman, `app/data/steps.ts` (seed kaynağı) ve `app/data/concepts.ts` (sözlük)
içeriğini **çok daha geniş** bir müfredata taşımak için bir plandır. Amaç: her
**path** (kariyer yolu) için sıfırdan ileri seviyeye, micro-adımlı, soru-cevaplı,
sözlükle bağlı tutarlı bir yolculuk kurmak.

> Tek bir kişinin/asistanın faz faz ilerleyebileceği şekilde tasarlandı. Her fazın
> sonunda `npx convex run seed:run` çalıştırılır ve içerik canlıda görünür.

---

## 1. Mevcut durum (başlangıç noktası)

| Path | Track | Projeler (level) | Durum |
| --- | --- | --- | --- |
| Full-Stack | frontend + backend + devops | aşağıdaki 9 proje | kısmen dolu |
| Frontend | frontend | To-Do, Hava Durumu, Oyun, Mobil | 2 sağlam + 2 ince |
| Backend | backend | Todo API, Blog, SaaS, Realtime | 3 sağlam + 1 ince |
| DevOps | devops | Üretim Altyapısı | 1 ince level |
| Data Engineering | data-engineering | Veri Boru Hattı 101 | 1 başlangıç level |
| AI | ai | AI Asistan | 1 ince level |

**Toplam:** 5 track · 11 level · 86 adım · 177 görev.

"İnce" = sadece 4 adımlık üst-seviye taslak; micro-adımlara bölünmesi gerekiyor.
"Sağlam" = To-Do / Todo API gibi adım adım, soru-cevaplı tam işlenmiş leveller.

**Hedef:** her path için en az **3–6 sağlam proje**, toplam ~**40+ level**,
~**350+ adım**, sözlük **600+ terim**.

---

## 2. Tasarım ilkeleri (her seviye bunlara uymalı)

1. **Micro-adım felsefesi.** Bir adım = tek bir somut iş (bir endpoint yaz, bir
   state ekle, bir Docker komutu). Başlangıç projelerinde 12–18 adım; ileri
   projelerde 6–10 daha geniş adım.
2. **Hedef ver, çözümü verme.** `goal` ulaşılacak sonucu söyler; `tip` hangi
   kavrama bakılacağını fısıldar (komutun tamamını değil).
3. **Her adımda bir soru.** `question`, kanıtla birlikte cevaplanır; "neden böyle"
   sorusudur, "ne yaptın" değil.
4. **Sözlükle bağ.** `learn: [...]` yalnızca `concepts.ts`'te **var olan** term'leri
   referanslar (yoksa çip sessizce düşer). Yeni kavram = önce sözlüğe ekle.
5. **Türkçe akıcı, terimler İngilizce.** `state`, `endpoint`, `container`, `deploy`
   bilerek İngilizce kalır — sektör dili budur.
6. **Gerçek proje, gerçek deploy.** Her level somut bir ürünle ve mümkünse canlı
   bir linkle biter.

### Teknik sözleşmeler
- **Puan:** `points = 20 + level * 10` (seed otomatik). Yani `level` alanı zorluk
  ölçeğidir: 1 = başlangıç (30p/adım) … 9 = uzman (110p/adım).
- **accent** seçenekleri: `emerald, sky, violet, amber, rose, lime, fuchsia, cyan,
  indigo`. (Yeni renk gerekirse `app/components/accents.ts`'e demet eklenir.)
- **Sıralama:** Full-Stack path'te global akış, `levels` dizisindeki fiziksel
  sıradır. Bir track'i tek başına gezerken o track'in leveller'i kendi içinde
  monoton kalmalı — yeni level eklerken track içi sırayı koru.
- **id benzersiz**, kebab-case. `track` alanı path filtrelemesini belirler.

---

## 3. Path bazında hedef müfredat

Her satır önerilen bir **level**. ☑ = mevcut, ➕ = eklenecek. `L` = zorluk/puan ölçeği.

### 🎨 Frontend
| # | Proje | L | Odak |
| --- | --- | --- | --- |
| ➕ | Kişisel Sayfa (HTML/CSS) | 1 | Semantik HTML, Flexbox/Grid, responsive — React'tan önce temel |
| ☑ | To-Do List (React) | 1 | component, props, state, event |
| ☑ | Hava Durumu (Next.js) | 2 | fetch, async, loading/error, env |
| ➕ | Film Keşif (Routing + Filtre) | 2 | dynamic routes, URL state, pagination, skeleton |
| ➕ | Tasarım Sistemi & Erişilebilirlik | 3 | design tokens, a11y, klavye, ARIA, dark mode |
| ➕ | State Yönetimi (Sepet/Store) | 3 | global state (Zustand/Context), reducer, persist |
| ➕ | Performans & Cila | 4 | code splitting, memo, lazy, Lighthouse, Core Web Vitals |
| ☑ | Tarayıcı Oyunu (Canvas) | 4 | *ince → micro-adımlara böl* |
| ☑ | Mobil (Expo) | 5 | *ince → micro-adımlara böl* |

### 🗄️ Backend
| # | Proje | L | Odak |
| --- | --- | --- | --- |
| ☑ | Todo API (Node + Express) | 1 | server, REST, CRUD, validation |
| ➕ | Auth Servisi (JWT/Session) | 2 | hashing, JWT, refresh, rate limit, RBAC |
| ☑ | Blog Platformu (DB + Auth) | 3 | ORM, migration, ilişkiler, CRUD |
| ➕ | Dosya & Medya Servisi | 3 | upload, S3/storage, signed URL, resize/queue |
| ➕ | Caching & Background Jobs | 4 | Redis cache, queue (BullMQ), cron, idempotency |
| ☑ | SaaS (Ödeme + Dashboard) | 4 | Stripe, webhook, roller, test, CI |
| ☑ | Canlı Sohbet (Realtime) | 5 | *ince → micro-adımlara böl* |
| ➕ | API Tasarımı: REST → GraphQL/tRPC | 5 | şema, tipler, N+1, versioning, dokümantasyon |

### 🛰️ DevOps
| # | Proje | L | Odak |
| --- | --- | --- | --- |
| ➕ | Linux & CLI Temelleri | 2 | shell, izinler, SSH, paket yönetimi, systemd |
| ➕ | Docker'la Paketle | 3 | image, container, volume, compose, multi-stage |
| ➕ | CI/CD Pipeline | 4 | GitHub Actions, test gate, build, deploy, secrets |
| ➕ | Infrastructure as Code | 5 | Terraform, ortamlar, state, plan/apply |
| ➕ | Kubernetes & Ölçekleme | 6 | pod/deploy/service, HPA, ingress, config/secret |
| ☑ | Üretim Altyapısı | 9 | *mevcut özet → gözlemlenebilirlik/SRE'ye derinleştir* |

### 📊 Data Engineering
| # | Proje | L | Odak |
| --- | --- | --- | --- |
| ➕ | SQL Derinlemesine | 1 | join, group by, window fn, index, query planı |
| ☑ | Veri Boru Hattı 101 (ETL) | 2 | extract/transform/load, idempotency |
| ➕ | Orkestrasyon (Airflow/Dagster) | 3 | DAG, schedule, retry, backfill, bağımlılık |
| ➕ | Veri Modelleme & Warehouse | 4 | star schema, dbt, partition, incremental |
| ➕ | Streaming (Kafka) | 5 | event, topic, consumer group, exactly-once |
| ➕ | Veri Kalitesi & Gözlem | 5 | testler, lineage, SLA, anomaly, dashboard |

### 🤖 AI *(yakında → aktif et)*
| # | Proje | L | Odak |
| --- | --- | --- | --- |
| ➕ | Prompt Temelleri | 2 | rol, few-shot, çıktı biçimi, sıcaklık |
| ☑ | AI Asistan (Claude API) | 5 | streaming, system prompt, çok-tur, tool use, RAG |
| ➕ | RAG Uygulaması | 6 | chunking, embedding, vector DB, reranking, alıntı |
| ➕ | Agent & Tool Use | 7 | planlama, araç çağrısı, döngü, hata kurtarma |
| ➕ | Eval & Guardrails | 7 | test seti, ölçüm, regresyon, güvenlik, maliyet |

---

## 4. Sözlük genişletme (concepts.ts)

Yeni leveller eklenirken referans verilecek term'ler **önce** sözlükte olmalı.
Kategori başına hedef ve önemli boşluklar:

- **Temel/Araçlar:** SSH, Linux izinleri, systemd, shell, cron, regex.
- **Frontend/React:** a11y/ARIA, design tokens, Zustand, reducer, code splitting,
  Core Web Vitals, hydration, suspense.
- **Backend:** JWT, refresh token, rate limiting, RBAC, signed URL, BullMQ/queue,
  GraphQL, tRPC, N+1, pagination, idempotency key.
- **DevOps:** Docker image/layer, Compose, multi-stage build, Terraform state,
  Kubernetes pod/HPA/ingress, secret yönetimi, SRE/SLO/SLI.
- **Data (yeni kategori, genişlet):** window function, dbt, star schema, partition,
  Kafka topic/consumer group, exactly-once, data lineage, backfill, DAG.
- **AI:** few-shot, temperature, chunking, reranking, agent loop, eval/regression.

> Her term: `term`, `category`, `short` (tek cümle), `body` (sade paragraf),
> opsiyonel `analogy`. Yeni kategori eklersen `kavramlar/page.tsx`'teki
> `categoryColor` haritasına da renk ekle.

---

## 5. Fazlı uygulama planı

Her faz tek başına seed edilip yayınlanabilir; bağımsız ilerler.

- **Faz 0 — Temizlik/temel (hızlı).** Mevcut "ince" levelleri (Oyun, Mobil,
  Realtime, DevOps) micro-adımlara böl. Frontend'e "Kişisel Sayfa (HTML/CSS)"
  giriş leveli ekle. → Full-Stack yolu baştan sona pürüzsüz.
- **Faz 1 — Backend derinliği.** Auth Servisi + Caching/Jobs + API Tasarımı.
  İlgili ~25 sözlük terimi.
- **Faz 2 — DevOps yolu.** Linux → Docker → CI/CD → IaC → Kubernetes. En çok yeni
  içerik burada; sözlükte DevOps ağırlığı.
- **Faz 3 — Data Engineering yolu.** SQL → Orkestrasyon → Warehouse → Streaming →
  Kalite. "Data" kategorisini büyüt.
- **Faz 4 — AI yolunu aç.** Prompt Temelleri + RAG + Agent + Eval; `paths`'te AI'dan
  `soon: true` kaldır.
- **Faz 5 — Frontend ileri.** Film Keşif, Tasarım Sistemi, State, Performans.

### Her faz için iş akışı (checklist)
- [ ] Level taslağı: id, track, level(zorluk), project, difficulty, emoji, accent,
      description, skills.
- [ ] Adımları yaz (micro): her biri `title`, `question`, `tasks[{goal, tip}]`.
- [ ] `learn` term'leri seç; eksik olanları **önce** `concepts.ts`'e ekle.
- [ ] `levels` dizisinde doğru konuma yerleştir (track içi sıra monoton kalsın).
- [ ] `npx tsc --noEmit` ile tip kontrolü.
- [ ] `npx convex run seed:run` ile dev'e yükle, çıktı sayısını doğrula.
- [ ] Uygulamada ilgili path'i gez; kilit/sıra/sözlük çiplerini gözden geçir.

---

## 6. Notlar & açık kararlar

- **Full-Stack akış sırası:** Şu an frontend specialty'leri (Oyun, Mobil) backend
  başlamadan önce kilit açıyor. İstersen global `order`'ı `getTree`'de açığa çıkarıp
  interleave edebiliriz (önce core FE+BE, sonra specialty'ler).
- **Per-track level numarası:** `level` alanı hem zorluk hem puan. İleride "track
  içi sıra no" ile "zorluk"u ayırmak istenebilir (şema değişikliği).
- **Admin paneli** zaten generic CRUD; bu içerik admin'den de düzenlenebilir, ama
  toplu içerik `steps.ts` + seed üzerinden gitmek daha hızlı ve versiyonlu.
- **İçerik üretimi** istersen her fazı ayrı bir oturumda (veya subagent ile) tek
  tek işleyebiliriz; bu doküman ortak referans olur.

---

## 7. Kıdem Seviyeleri (Seniority Tiers) 🪜

Her path **kendi içinde** kıdem basamaklarına bölünür. Kullanıcı path'te ilerledikçe
bir sonraki ünvanı **hak ederek** açar — üst ünvanlar (Senior, Lead...) asla
erkenden verilmez. Bir tier'ın **tüm projeleri onaylanınca** bir sonraki ünvan açılır.

### Basamaklar
| Tier | Ünvan | Açılış koşulu | Tema (arka plan) |
| --- | --- | --- | --- |
| 0 | 🥚 Intern (Stajyer) | başlangıç — herkes burada başlar | sönük slate/lacivert |
| 1 | 🌱 Junior | Intern tier'ının son projesi onaylanınca | emerald |
| 2 | 🌿 Mid | Junior projeleri biter | sky / teal |
| 3 | 🌳 Senior | Mid projeleri biter | violet |
| 4 | 🔧 Staff / Expert | Senior projeleri biter | amber |
| 5 | 🏛️ Architect | Staff + bir cross-path/capstone biter | rose / fuchsia |
| 6 | 👑 Lead | Path'in tamamı + topluluk katkısı (forumda yardım) | altın gradient |

> Basamak sayısı path'e göre kısaltılabilir (örn. küçük path'lerde Intern→Junior→
> Mid→Senior yeter). `tier` alanı bunu esnek bırakır.

### Ünvan kuralı
- Kullanıcının **mevcut ünvanı** = o path'te **tamamladığı en yüksek tier**.
- Bir üst tier "kilitli ön izleme" olarak görünür ama projeleri ancak alt tier
  bitince açılır (mevcut ardışık kilit mantığının tier bazlı hali).
- "Senioru hemen verme" → Senior projeleri görünür ama **Mid bitmeden** ne kilidi
  açılır ne de ünvan yazılır.

### Müfredatın tier'lara dağılımı (zorluğa göre kaba kural)
- 🥚 Intern → ilk kurulum/merhaba projesi (🟢, örn. *Kişisel Sayfa*, *Todo API*).
- 🌱 Junior → 🟢/🔵 temel projeler (*To-Do*, *Hava Durumu*, *Auth Servisi*).
- 🌿 Mid → 🟡 gerçek-dünya projeleri (*Blog*, *Kanban*, *Docker*).
- 🌳 Senior → 🟠 üretim seviyesi (*SaaS*, *CI/CD*, *RAG*).
- 🔧 Staff/Expert → 🔴 derin/ölçek (*Kubernetes*, *Kafka*, *Multi-Agent*).
- 🏛️ Architect → cross-path capstone'lar (bkz. CONTENT-CATALOG → Kesişimler).
- 👑 Lead → hepsi + forumda mentorluk.

### UI davranışı (tasarım)
1. **Tier bölme çizgisi.** Path içinde iki tier arasında tam genişlik bir ayraç:
   `⎯⎯⎯ 🌳 SENIOR ⎯⎯⎯` + küçük not (*"Mid projelerini bitirdiğin için açıldı"*
   veya kilitliyse *"X projesini bitir, Senior ol"*).
2. **Arka plan değişimi.** Kullanıcı bir tier'a girince sayfanın/bölümün arka planı
   o tier'ın temasına **yumuşak geçişle** döner (gradient/renk sıcaklığı derinleşir).
   Aşağı indikçe "yükseliyorum" hissi.
3. **Sabit (sticky) tier şeridi.** Scroll sırasında üstte sabit kalan ince bir şerit:
   o an hangi tier'da olduğunu + **kazanılan ünvanı** + bir sonrakine **kaç proje
   kaldığını** gösterir. Path başlığının altında konumlanır ama scroll'da onun
   altında kaybolmaz — yapışkan (sticky) kalır.
4. **Ünvan rozeti.** Profil/header/leaderboard ve admin "Kullanıcılar" tablosunda
   kullanıcının o path'teki ünvanı (emoji+etiket) gösterilir.

### Veri modeli planı
- `Level`'e `tier` alanı ekle: `"intern" | "junior" | "mid" | "senior" | "staff" |
  "architect" | "lead"` (seed'de her level'e yaz).
- Statik `tiers` meta dizisi: `{ id, label, emoji, order, bgClass }` (UI teması +
  sıralama; `paths` gibi `steps.ts`'te durur).
- `page.tsx`: seçili path'in `visibleLevels`'ini `tier`'a göre grupla → her grup
  için ayraç + sticky şerit + arka plan teması. Kilit, tier sırası boyunca ardışık.
- **Kazanılan ünvan** = tüm projeleri tamamlanan en yüksek tier (mevcut
  `levelComplete` ile hesaplanır). Sunucuya yazmaya gerek yok; admin görünümü için
  istenirse `users` benzeri türetilir.
- Şema dokunuşu minimum: sadece `Level.tier` (opsiyonel) — `users` şeması değişmez.

> Bu bölüm tasarım sözleşmesidir; uygulanınca path deneyimi "düz proje listesi"
> yerine **kademeli bir kariyer tırmanışına** döner.
