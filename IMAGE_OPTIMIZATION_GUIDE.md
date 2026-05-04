# 🖼️ Görsel Optimizasyon Rehberi

## ✅ Yapılan İyileştirmeler

### 1. **Font Güncellemesi**
- ✅ Tüm başlıklar **Michroma** fontuyla güncellendi
- ✅ Hero, H1, H2, H3 etiketleri Michroma kullanıyor
- ✅ Brand logosu Michroma'ya geçti

### 2. **Lightbox Özelliği**
- ✅ Galeri görsellerine tıklayınca büyütme özelliği eklendi
- ✅ Önceki/Sonraki butonları ile navigasyon
- ✅ Klavye desteği (ESC ile kapat, ← → ile navigasyon)
- ✅ Görsel sayısı göstergesi (1/6 gibi)
- ✅ Animasyonlu açılma/kapanma

### 3. **Galeri Hover Efektleri**
- ✅ Hover'da zoom ikonu (🔍)
- ✅ Görsel büyüme efekti
- ✅ Gölge efektleri

---

## 📸 Görselleri Optimize Etme Adımları

### **Adım 1: Görselleri Hazırlama**

#### Dosya Adlandırma (SEO Uyumlu):
```
❌ IMG_1234.jpg
❌ konyacekici.png
✅ konya-cekici-saha-01.webp
✅ konya-oto-kurtarma-ekip-02.webp
✅ ese-dayi-yol-yardim-03.webp
```

#### Optimizasyon Araçları:
1. **Squoosh.app** (Önerilen - Google)
   - Format: WebP
   - Kalite: 80-85%
   - Boyut: 1400x900px

2. **TinyPNG.com**
   - PNG/JPG sıkıştırma
   - Toplu işlem desteği

3. **ImageMagick** (Terminal):
```bash
# Tüm JPG'leri WebP'ye dönüştür
magick mogrify -format webp -quality 85 -resize 1400x900 *.jpg
```

### **Adım 2: Dosyaları Yerleştirme**

```
src/assets/optimized/
├── konya-cekici-saha-01.webp
├── konya-cekici-saha-02.webp
├── konya-cekici-saha-03.webp
├── konya-cekici-saha-04.webp
├── konya-cekici-saha-05.webp
└── konya-cekici-saha-06.webp
```

### **Adım 3: gallery.js Güncelleme**

`src/assets/optimized/README.js` dosyasındaki örnek yapıyı kullanın:

```javascript
export const galleryImages = [
  {
    src: "./optimized/konya-cekici-saha-01.webp",
    alt: "Konya Ese Dayı Çekici - Gece oto kurtarma hizmeti",
  },
  // ... diğer görseller
];
```

### **Adım 4: ALT Metin Yazımı**

**SEO Kuralları:**
- ✅ Görsel içeriğini açıkça tanımlayın
- ✅ Anahtar kelimeleri doğal kullanın
- ✅ 125 karakterden kısa tutun
- ✅ Şehir adı + hizmet belirtin

**Örnekler:**
```
✅ "Konya Ese Dayı Çekici - Gece oto kurtarma hizmeti"
✅ "Konya Oto Kurtarma - Profesyonel çekici operasyonu"
✅ "Konya Yol Yardım - Platform çekici ile araç transferi"
❌ "çekici1.jpg"
❌ "resim"
```

---

## 🎯 Performans Metrikleri

### **Hedefler:**
- ⚡ Görsel boyutu: **< 200KB** (her görsel)
- ⚡ Sayfa yükleme: **< 3 saniye**
- ⚡ Lighthouse skoru: **90+**

### **Şu Anki Durum:**
- ✅ Vite otomatik optimizasyon yapıyor
- ✅ Lazy loading aktif
- ✅ Modern format desteği (WebP hazır)

### **Test Araçları:**
1. **Google PageSpeed Insights**: pagespeed.web.dev
2. **Lighthouse**: Chrome DevTools > Lighthouse
3. **WebPageTest**: webpagetest.org

---

## 🚀 Canlıya Alma Kontrol Listesi

### **Görseller:**
- [ ] Tüm görseller WebP formatında
- [ ] Dosya adları SEO uyumlu
- [ ] ALT metinleri yazıldı
- [ ] Görsel boyutları < 200KB
- [ ] Responsive versiyonlar hazır (opsiyonel)

### **SEO:**
- [ ] Google Analytics ID eklendi (`index.html`)
- [ ] Search Console kodu eklendi (`index.html`)
- [ ] Schema.org verileri doğru
- [ ] Open Graph görseli güncel

### **Performans:**
- [ ] Tüm görseller optimize edildi
- [ ] Lighthouse skoru kontrol edildi
- [ ] Sayfa yükleme süresi test edildi

### **Fonksiyonellik:**
- [ ] Lightbox açılıyor/kapanıyor
- [ ] Navigasyon çalışıyor
- [ ] Klavye desteği çalışıyor
- [ ] Mobil responsive kontrol edildi

---

## 📊 SEO Anahtar Kelimeleri

**Birincil:**
- konya çekici
- konya oto kurtarma
- konya yol yardım

**İkincil:**
- ese dayı çekici
- konya acil çekici
- konya araç kurtarma
- konya çekici hizmeti

**Uzun Kuyruk:**
- konya oto kurtarma telefon
- konya çekici fiyatları
- konya yol yardım 7/24

---

## 🛠️ Teknik Detaylar

### **Lightbox Özellikleri:**
- ✅ Otomatik pozisyon hesaplama
- ✅ Sonsuz döngü (son görselden sonra başa döner)
- ✅ Klavye navigasyonu (ESC, ←, →)
- ✅ Dışarı tıklayınca kapanma
- ✅ Animasyonlu geçişler
- ✅ Erişilebilirlik (ARIA labels)

### **Font Yüklemesi:**
```html
<link href="https://fonts.googleapis.com/css2?family=Michroma&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
```

### **CSS Optimizasyonları:**
- ✅ `will-change: transform` (animasyonlar için)
- ✅ `transform: translateZ(0)` (GPU hızlandırma)
- ✅ `backdrop-filter: blur()` (cam efekti)

---

## 📞 Destek

Sorularınız için:
- 📧 Email: info@esedayicekici.com
- 📱 WhatsApp: 0533 510 73 37
- 🌐 Web: www.esedayicekici.com

---

**Son Güncelleme:** 2026-05-04
**Versiyon:** 2.0.0
