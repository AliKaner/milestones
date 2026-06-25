# DevYol — Proje Kataloğu 📚

Her path için **proje başlıkları + tek satır özet + zorluk**. Bu bir fikir
havuzudur; seçtiklerimizi sonra micro-adımlara, sorulara ve sözlük bağlarına
bölerek `steps.ts`'e işleriz.

**Zorluk ölçeği (puan = 20 + level·10):** 🟢 Başlangıç (L1) · 🔵 Kolay-Orta (L2)
· 🟡 Orta (L3) · 🟠 İleri (L4-5) · 🔴 Uzman (L6+).
**Durum:** ☑ mevcut · ➕ yeni · ✨ öne çıkan (önce yazılsın).

---

## 🎨 Frontend

| # | Proje | Zorluk | Kısa |
| --- | --- | --- | --- |
| ✨ | Kişisel Sayfa / Portfolio | 🟢 | Semantik HTML + CSS, Flexbox/Grid, responsive — React öncesi temel |
| ☑ | To-Do List (React) | 🟢 | component, props, state, event mantığı |
| ➕ | Tip Hesap Makinesi / Çevirici | 🟢 | controlled input, basit hesap, formatlama |
| ➕ | Quiz / Trivia App | 🟢 | adım adım state, skor, koşullu render |
| ☑ | Hava Durumu (Next.js) | 🔵 | fetch, async, loading/error, env |
| ➕ | Film & Dizi Keşif (TMDB) | 🔵 | dynamic route, arama, filtre, pagination |
| ➕ | Markdown Not Defteri | 🔵 | live preview, localStorage, klavye kısayolları |
| ➕ | Pomodoro & Alışkanlık Takibi | 🔵 | timer, useEffect, streak, bildirim |
| ➕ | Sonsuz Akış (Infinite Scroll) | 🔵 | IntersectionObserver, sayfalama, skeleton |
| ➕ | Kanban Board | 🟡 | drag & drop, sürükle-bırak state, kalıcılık |
| ➕ | E-ticaret Vitrini + Sepet | 🟡 | ürün listesi, filtre, sepet store, checkout UI |
| ➕ | Çok Adımlı Form Builder | 🟡 | wizard, validation, şema (Zod), taslak kaydı |
| ➕ | Dashboard & Grafikler | 🟡 | chart kütüphanesi, veri görselleştirme, filtre |
| ➕ | Tasarım Sistemi / Component Library | 🟡 | design tokens, varyantlar, Storybook, a11y |
| ➕ | Erişilebilirlik Odaklı Uygulama | 🟡 | ARIA, klavye navigasyonu, focus yönetimi, kontrast |
| ➕ | State Yönetimi (Zustand/Redux) | 🟠 | global store, reducer, persist, devtools |
| ➕ | Gerçek Zamanlı İşbirliği UI | 🟠 | imleç paylaşımı, presence, optimistic UI |
| ➕ | Performans & Cila | 🟠 | code splitting, memo, lazy, Core Web Vitals |
| ➕ | PWA / Offline-First | 🟠 | service worker, cache, manifest, install |
| ➕ | Animasyon Vitrini | 🟠 | Framer Motion, gesture, layout animasyon |
| ☑ | Tarayıcı Oyunu (Canvas) | 🟠 | game loop, çarpışma, oyun state'i |
| ☑ | Mobil Uygulama (Expo) | 🔴 | React Native, navigation, native API |

## 🗄️ Backend

| # | Proje | Zorluk | Kısa |
| --- | --- | --- | --- |
| ☑ | Todo API (Node + Express) | 🟢 | server, REST, CRUD, validation |
| ➕ | URL Kısaltıcı | 🟢 | hash/slug, redirect, tık sayacı |
| ➕ | Hava/Döviz Proxy API | 🟢 | dış API'yi sarmala, cache, hata yönetimi |
| ➕ | Auth Servisi (JWT/Session) | 🔵 | hashing, JWT, refresh, oturum, RBAC |
| ➕ | Public API + API Key & Rate Limit | 🔵 | anahtar üretimi, kota, throttling |
| ☑ | Blog Platformu (DB + Auth) | 🟡 | ORM, migration, ilişkiler, CRUD |
| ➕ | Dosya & Medya Servisi | 🟡 | upload, S3/storage, signed URL, resize |
| ➕ | Tam Metin Arama Servisi | 🟡 | indexleme, sorgu, sıralama, faceting |
| ➕ | Bildirim Servisi (e-posta/push) | 🟡 | şablon, kuyruk, yeniden deneme, tercih |
| ➕ | Caching & Background Jobs | 🟠 | Redis cache, queue (BullMQ), cron, idempotency |
| ➕ | E-ticaret Backend | 🟠 | ürün/stok, sepet, sipariş, ödeme, race condition |
| ➕ | Rezervasyon / Booking Sistemi | 🟠 | takvim, çakışma kontrolü, kilit, transaction |
| ☑ | SaaS (Ödeme + Dashboard) | 🟠 | Stripe, webhook, roller, test, CI |
| ☑ | Canlı Sohbet (Realtime) | 🟠 | WebSocket, presence, optimistic UI |
| ➕ | API Tasarımı: GraphQL / tRPC | 🟠 | şema, tipler, N+1, versiyonlama, dokümantasyon |
| ➕ | Webhook & Event Sistemi | 🟠 | event üret/tüket, imza, retry, dead-letter |
| ➕ | Multi-tenant SaaS Backend | 🔴 | tenant izolasyonu, veri ayrımı, plan limitleri |
| ➕ | Mikroservis + API Gateway | 🔴 | servis ayrımı, gateway, servisler arası iletişim |

## 🛰️ DevOps

| # | Proje | Zorluk | Kısa |
| --- | --- | --- | --- |
| ✨ | Linux & CLI Temelleri | 🔵 | shell, izinler, SSH, paket yönetimi, systemd |
| ➕ | Git İş Akışı & Branch Stratejisi | 🔵 | branch, PR, merge/rebase, conflict, tag/release |
| ✨ | Docker'la Paketle | 🟡 | image, container, volume, multi-stage build |
| ➕ | Docker Compose Çok Servis | 🟡 | app+db+cache tek komutla, network, env |
| ➕ | CI/CD Pipeline | 🟠 | GitHub Actions, test gate, build, deploy, secrets |
| ➕ | Reverse Proxy & TLS (nginx) | 🟠 | yönlendirme, SSL, sıkıştırma, statik sunum |
| ➕ | Gözlemlenebilirlik (Prometheus/Grafana) | 🟠 | metrik, dashboard, alarm, log + trace |
| ➕ | Infrastructure as Code (Terraform) | 🔴 | kaynakları kodla, ortamlar, state, plan/apply |
| ➕ | Kubernetes & Ölçekleme | 🔴 | pod/deploy/service, HPA, ingress, config/secret |
| ➕ | GitOps (ArgoCD) | 🔴 | declarative deploy, sync, rollback |
| ➕ | Güvenlik Sertleştirme | 🔴 | secrets, en az yetki, tarama, SBOM, firewall |
| ➕ | Felaket Kurtarma & Yedekleme | 🔴 | backup, restore tatbikatı, RTO/RPO |
| ☑ | Üretim Altyapısı (SRE) | 🔴 | ölçek, kuyruk, observability, blue-green |

## 📊 Data Engineering

| # | Proje | Zorluk | Kısa |
| --- | --- | --- | --- |
| ✨ | SQL Derinlemesine | 🟢 | join, group by, window fn, index, query planı |
| ☑ | Veri Boru Hattı 101 (ETL) | 🔵 | extract/transform/load, idempotency |
| ➕ | Web Scraping Pipeline | 🔵 | crawl, parse, rate limit, dedup, depolama |
| ➕ | API → Warehouse Aktarımı | 🟡 | incremental load, schema drift, izleme |
| ➕ | Orkestrasyon (Airflow/Dagster) | 🟡 | DAG, schedule, retry, backfill, bağımlılık |
| ➕ | Veri Modelleme & dbt | 🟠 | star schema, staging→mart, test, dokümantasyon |
| ➕ | Data Lake (Parquet/S3) | 🟠 | kolon format, partition, katmanlar (bronze/silver/gold) |
| ➕ | Veri Kalitesi & Gözlem | 🟠 | testler, lineage, anomaly, SLA, dashboard |
| ➕ | CDC (Change Data Capture) | 🔴 | log-based capture, eşitleme, sıra garantisi |
| ➕ | Streaming (Kafka) | 🔴 | event, topic, consumer group, exactly-once |
| ➕ | Gerçek Zamanlı Analitik | 🔴 | stream → agregasyon → canlı dashboard |

## 🤖 AI *(path'i aç: `soon` kaldır)*

| # | Proje | Zorluk | Kısa |
| --- | --- | --- | --- |
| ✨ | Prompt Temelleri | 🔵 | rol, few-shot, çıktı biçimi, sıcaklık, token |
| ➕ | Akıllı Özetleyici / Sınıflandırıcı | 🔵 | yapılandırılmış çıktı, batch, maliyet |
| ➕ | AI Yazı/E-posta Asistanı | 🔵 | ton ayarı, yeniden yazma, şablon, system prompt |
| ➕ | Doküman Veri Çıkarımı (Extraction) | 🔵 | serbest metinden JSON, şema zorlama, doğrulama |
| ➕ | Çeviri & Yerelleştirme Aracı | 🔵 | bağlam koruma, terim sözlüğü, toplu çeviri |
| ☑ | AI Asistan (Claude API) | 🟠 | streaming, system prompt, çok-tur, tool use |
| ➕ | Chatbot + Kalıcı Hafıza | 🟠 | konuşma geçmişi, özetleme, kullanıcı profili |
| ➕ | PDF/Doküman ile Sohbet | 🟠 | parse, chunk, soru-cevap, sayfa alıntısı |
| ➕ | İçerik Moderasyonu | 🟠 | sınıflandırma, toxicity, eşik, insan-onayı akışı |
| ➕ | Function Calling ile Gerçek Aksiyon | 🟠 | araç tanımı, parametre, dış API çağrısı, onay |
| ➕ | Sesli Asistan | 🟠 | speech-to-text, TTS, kesme, gecikme yönetimi |
| ➕ | Görsel Üretim Uygulaması | 🟠 | prompt→görsel, varyant, düzenleme, kuyruk |
| ➕ | Doküman Soru-Cevap (RAG) | 🔴 | chunking, embedding, vector DB, alıntı |
| ➕ | Semantik Arama | 🔴 | embedding index, benzerlik, reranking |
| ➕ | Öneri Sistemi (Embeddings) | 🔴 | vektör benzerliği, kişiselleştirme, soğuk başlangıç |
| ➕ | Çok-Modlu (Görsel) Analiz | 🔴 | görselden metin/kod, ekran görüntüsü, OCR |
| ➕ | Agent & Tool Use | 🔴 | planlama, araç çağrısı, döngü, hata kurtarma |
| ➕ | Çok-Ajanlı (Multi-Agent) Sistem | 🔴 | orchestrator + worker, görev dağıtımı, paylaşım |
| ➕ | Kod Asistanı | 🔴 | repo bağlamı, diff üretimi, test çalıştırma |
| ➕ | Workflow Otomasyonu (AI + araç zinciri) | 🔴 | tetikleyici→adımlar→aksiyon, izleme, retry |
| ➕ | Eval & Guardrails | 🔴 | test seti, ölçüm, regresyon, güvenlik, maliyet |
| ➕ | Maliyet & Performans Optimizasyonu | 🔴 | prompt caching, model/effort seçimi, token bütçesi |
| ➕ | Güvenlik: Jailbreak & Prompt Injection Savunması | 🔴 | girdi temizleme, izinli araçlar, sınır testleri |

---

## 🔀 Path Kesişimleri (cross-path projeler)

Bazı projeler birden çok path'e dokunur. Bunları iki şekilde kullanabiliriz:
1. **Katalog etiketi olarak** — bir projenin "ana path"i + "kesişen path"leri.
2. **Veri modelinde** — bir level'i birden çok path'te göstermek (bkz. en altta
   "Veri modeli notu").

**Path kısaltmaları:** FE 🎨 · BE 🗄️ · DO 🛰️ · DE 📊 · AI 🤖

### Mevcut/planlı projelerin kesişimi
| Proje | Ana | Kesişen | Neden kesişir |
| --- | --- | --- | --- |
| Canlı Sohbet (Realtime) | BE | FE, DO | WebSocket UI + ölçekte sticky session |
| SaaS (Ödeme + Dashboard) | BE | FE, DO | panel UI + CI/CD + deploy |
| Dashboard & Grafikler | FE | DE | veriyi görselleştirir (warehouse/analytics) |
| E-ticaret (vitrin+backend) | BE | FE, DE | sepet UI + öneri/analitik veri |
| Doküman Soru-Cevap (RAG) | AI | BE, DE | embedding pipeline + servis API |
| Görsel Üretim Uygulaması | AI | FE, BE | kuyruk/işleme + galeri UI |
| Gerçek Zamanlı Analitik | DE | DO, FE | stream altyapısı + canlı dashboard |
| Gözlemlenebilirlik | DO | DE | metrik = zaman serisi verisi |
| Bildirim Servisi | BE | DO, FE | kuyruk + tercih UI |
| Web Scraping Pipeline | DE | BE | crawler servisi + API |

### 🧩 Capstone'lar (çoğu path'i birleştiren bitirme projeleri)
| Proje | Path'ler | Kısa |
| --- | --- | --- |
| ➕ Gerçek Zamanlı Trello Klonu | FE+BE+DO | DnD + realtime + deploy |
| ➕ Mini-YouTube | BE+DO+DE | upload + transcode kuyruğu + CDN + izlenme analitiği |
| ➕ SaaS Analytics Ürünü | BE+FE+DE+DO | event toplama + warehouse + dashboard + ödeme |
| ➕ AI Destekli Yardım Masası | AI+BE+FE | RAG + ticket backend + realtime + roller |
| ➕ Marketplace (Çift Taraflı) | FE+BE+DE | ilan + ödeme + mesajlaşma + arama + öneri |
| ➕ Akıllı İzleme Platformu | DO+DE+AI | metrik toplama + anomali tespiti + AI özet |

### Veri modeli notu (kesişimi gerçek yapmak istersek)
Şu an bir level tek bir `track`'e ait ve `paths` track-key'lere göre filtreler.
Kesişimi gerçek kılmanın iki yolu:
- **Basit (önerilen):** `Level`'e opsiyonel `alsoInPaths?: string[]` ekle; `page.tsx`
  filtresinde "track eşleşir **veya** path id `alsoInPaths`'te" de. Şema değişmez
  (sadece seed alanı + filtre mantığı).
- **Esnek:** `paths`'i track yerine doğrudan level-id listesiyle de besleyebilir
  hale getir (capstone'lar için ayrı bir "Capstone" path'i).

---

## Sıradaki adım

Hangilerini **✨ öne çıkan** olarak önce yazalım? Bir liste seç (örn. "Frontend:
Kişisel Sayfa, Kanban; DevOps: Docker, CI/CD") — ben de o projeleri tam
micro-adımlı leveller halinde `steps.ts`'e işleyip sözlük terimlerini ekleyeyim.
