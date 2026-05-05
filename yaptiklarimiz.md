# Konya Ese Dayı Çekici — Proje Geliştirme Süreci

## Teknik Altyapı

- **Framework:** React 19
- **Build Tool:** Vite 8
- **Routing:** React Router DOM v7
- **Styling:** Saf CSS (framework kullanmadım, her şeyi sıfırdan yazdım)
- **Deploy:** Netlify (GitHub'a push → otomatik deploy)
- **Node:** v20

---

## Başlangıçta Ben Yaptım

Projeye sıfırdan başladım. İlk versiyonu tek bir HTML dosyasıyla kurdum — Roadmap.txt içinde hâlâ o eski tasarım duruyor. Sonra React + Vite'a geçtim.

**Kurduğum temel yapı:**
- React + Vite proje iskeleti
- Netlify deploy pipeline (`netlify.toml`)
- `index.html` — SEO meta tagları, Open Graph, Schema.org LocalBusiness, canonical URL
- Google Fonts entegrasyonu (Michroma + Inter)
- Tüm CSS design system — renk değişkenleri, dark tema, responsive grid
- Hero section — dinamik arka plan slider, Geolocation API ile "X dk mesafedeyiz" mesajı
- Hizmet seçim kartları — görsel + içerik
- Fiyat hesaplayıcı — km + araç tipi bazlı hesaplama, animasyonlu progress bar
- B2B kurumsal teklif formu
- Galeri bölümü — lightbox ile görüntüleme
- Footer — 4 kolonlu, Google Maps embed
- Floating butonlar — sağ alt: ara, sol alt: WhatsApp
- `src/assets/gallery.js` — 10 gerçek saha fotoğrafı, SEO uyumlu alt metinleri
- `public/sitemap.xml` ve `public/robots.txt`
- WhatsApp entegrasyonu — konum bilgisiyle hazır mesaj

---

## Sonradan Birlikte Geliştirdik

### SEO & Analytics
- **Google Analytics 4** entegrasyonu — `G-P28PZHMFKW` measurement ID eklendi
- **Google Search Console** doğrulama dosyası — `public/googled5ff0ff1c1270a93.html`
- **Sitemap güncellendi** — domain `esedayicekici.com` → `cekicikonya.com` düzeltildi, tüm yeni sayfalar eklendi
- `.gitignore` oluşturuldu — `node_modules` artık repo'ya girmiyor

### Hero Bölümü Yeniden Düzenlendi
- 5 buton → 3'e indirildi (tekrar eden aksiyonlar temizlendi)
- "Tek Tık Acil Çağrı Sistemi" glass efektli kutu içine alındı
- Butonlar pastel cam efektli, hover'da turuncu/yeşil renk
- Tüm emojiler kaldırıldı (hero, hizmet kartları, iletişim, footer)
- "Acil Yardım Hattı" → "Acil Yardım Butonu" olarak güncellendi
- Başlık fontu Michroma ile eşleştirildi

### Hizmet Kartları
- Sabit TL fiyatları kaldırıldı (enflasyon gerekçesiyle)
- Her karta hizmete özel WhatsApp mesajıyla "Fiyat Al →" butonu eklendi
- Kart ikonları (emojiler) kaldırıldı

### Harita
- `grayscale(100%) invert(90%)` filtresi kaldırıldı — harita artık normal renklerinde

### B2B Formu
- Form alanları state'e bağlandı
- Submit'te doldurulmuş içerik (firma adı, yetkili, telefon, talep türü) WhatsApp mesajına ekleniyor

### Çok Sayfalı Yapıya Geçiş (React Router)
- `public/_redirects` — Netlify SPA routing için
- **7 yeni sayfa oluşturuldu:**
  - `/hakkimizda` — firma hikayesi, misyon, neden bizi seçmeli
  - `/hizmetler` — 6 hizmet detaylı açıklama + WhatsApp fiyat butonu
  - `/ilceler` — Konya'nın tüm 31 ilçesi, tahmini varış süreleriyle
  - `/galeri` — lightbox destekli galeri sayfası
  - `/blog` — 5 SEO odaklı makale
  - `/blog/:slug` — blog detay sayfası
  - `/iletisim` — iletişim bilgileri + harita
- **Navbar** eklendi — aktif sayfa vurgulamalı, Michroma font, beyaz renk

### Görsel & Tasarım
- Navbar logo rengi beyaz yapıldı
- Footer linkleri `<a href="#">` → `<Link to="...">` React Router linklerine dönüştürüldü
- `contact-icon` class'ı emoji yerine metin etiketli badge'e dönüştürüldü

---

## Blog İçerikleri (SEO Odaklı)

Organik trafik için yazılan makaleler:

1. Konya'da Çekici Hizmeti Nasıl Çalışır?
2. Yolda Lastik Patlarsa Ne Yapmalısınız?
3. Araç Aküsü Neden Biter? Belirtileri ve Çözümleri
4. Trafik Kazası Sonrası Yapılması Gerekenler
5. Konya'da 7/24 Yol Yardım Hizmeti

---

## Google Analytics & Search Console

- **GA4 Measurement ID:** G-P28PZHMFKW
- **Google hesabı:** esedayii42@gmail.com
- **Şifre:** kişisel not defterinde sakla, buraya yazma



**https://www.cekicikonya.com**
