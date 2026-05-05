import { useEffect, useMemo, useState } from "react";
import { galleryImages } from "./assets/gallery";

const phoneRaw = "05335107337";
const phoneText = "0533 510 73 37";
const whatsappLink = `https://wa.me/90${phoneRaw}`;

// Hizmet kartları için görseller (Unsplash)
const serviceImages = {
  cekici: "https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FyJTIwcmVwYWlyfGVufDB8fDB8fHww",
  lastik: "https://plus.unsplash.com/premium_photo-1683141571145-4676ddf91387?w=500&auto=format&fit=crop&q=60",
  kaza: "https://images.unsplash.com/photo-1687867451910-28941a460f35?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGNhciUyMGNyYXNofGVufDB8fDB8fHww",
  yakit: "https://images.unsplash.com/photo-1765211003392-7eeb5250d988?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZnVlbCUyMGVtcHR5fGVufDB8fDB8fHww",
  aku: "https://plus.unsplash.com/premium_photo-1661770030805-0abb8fd880f1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2FyJTIwYmF0dGVyeXxlbnwwfHwwfHx8MA%3D%3D",
  kilitli: "https://images.unsplash.com/photo-1771340742493-52fbd5476ccb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGNhciUyMGVuZ2luZSUyMHJlcGFpcnxlbnwwfHwwfHx8MA%3D%3D",
};

const services = [
  { key: "cekici", icon: "🔧", name: "Araç Çalışmıyor", desc: "Motor / arıza", time: "12 dk", waMsg: "Merhaba, araç çalışmıyor. Çekici hizmeti için fiyat almak istiyorum.", image: serviceImages.cekici },
  { key: "lastik", icon: "🛞", name: "Lastik Patladı", desc: "Lastik değişimi", time: "14 dk", waMsg: "Merhaba, lastiğim patladı. Lastik değişimi için fiyat almak istiyorum.", image: serviceImages.lastik },
  { key: "kaza", icon: "🚨", name: "Kaza Yaptım", desc: "Acil çekici", time: "10 dk", waMsg: "Merhaba, kaza yaptım. Acil çekici için fiyat almak istiyorum.", image: serviceImages.kaza },
  { key: "yakit", icon: "⛽", name: "Yakıt Bitti", desc: "Yakıt servisi", time: "11 dk", waMsg: "Merhaba, yakıtım bitti. Yakıt servisi için fiyat almak istiyorum.", image: serviceImages.yakit },
  { key: "aku", icon: "🔋", name: "Akü Bitti", desc: "Akü takviye", time: "11 dk", waMsg: "Merhaba, aküm bitti. Akü takviye için fiyat almak istiyorum.", image: serviceImages.aku },
  { key: "kilitli", icon: "🔑", name: "Araç Kilitlendi", desc: "Kapı açma", time: "13 dk", waMsg: "Merhaba, aracım kilitlendi. Kapı açma hizmeti için fiyat almak istiyorum.", image: serviceImages.kilitli },
];

const calcBase = {
  cekici: { fixed: 650, perKm: 15 },
  kaza: { fixed: 900, perKm: 22 },
  lastik: { fixed: 250, perKm: 0 },
  yakit: { fixed: 260, perKm: 0 },
  aku: { fixed: 220, perKm: 0 },
  kilitli: { fixed: 320, perKm: 0 },
};

function estimateDistrict(lat, lng) {
  if (lat > 37.92 && lng < 32.5) return "Selcuklu";
  if (lat > 37.86 && lng >= 32.5) return "Karatay";
  if (lat <= 37.86) return "Meram";
  return "Konya Merkez";
}

function estimateMinutes(lat, lng) {
  const minutes = 6 + Math.floor(Math.abs(lat * 20 + lng * 20) % 9);
  return Math.max(6, Math.min(minutes, 17));
}

export default function App() {
  const [shiftText, setShiftText] = useState("Gunduz Saha Ekibi");
  const [locationText, setLocationText] = useState("Konumunuza ortalama 12-15 dk mesafedeyiz");
  const [locationCoords, setLocationCoords] = useState("");
  const [locationLive, setLocationLive] = useState(false);
  const [activeService, setActiveService] = useState(services[0]);
  const [slide, setSlide] = useState(0);
  const [km, setKm] = useState("");
  const [calcService, setCalcService] = useState("cekici");
  const [vehicleMultiplier, setVehicleMultiplier] = useState("1");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const trackEvent = (eventName, params = {}) => {
    if (typeof window === "undefined") return;
    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, params);
    } else {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: eventName, ...params });
    }
  };

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
    trackEvent("gallery_lightbox_open", { index });
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setLightboxIndex(0);
  };

  const navigateLightbox = (direction) => {
    const newIndex = (lightboxIndex + direction + galleryImages.length) % galleryImages.length;
    setLightboxIndex(newIndex);
  };

  const [loadingStep, setLoadingStep] = useState("");
  const [progress, setProgress] = useState(0);
  const [price, setPrice] = useState(null);

  useEffect(() => {
    const hour = new Date().getHours();
    setShiftText(hour >= 20 || hour < 7 ? "Gece Nobetci Ekibi" : "Gunduz Saha Ekibi");
  }, []);

  useEffect(() => {
    if (galleryImages.length <= 1) return undefined;
    const timer = setInterval(() => {
      setSlide((prev) => (prev + 1) % galleryImages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const requestDynamicLocation = () => {
    if (!navigator.geolocation) return;
    trackEvent("location_request_click");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const district = estimateDistrict(lat, lng);
        const minute = estimateMinutes(lat, lng);
        setLocationText(`${district} bolgesindesiniz: ${minute} dk mesafedeyiz`);
        setLocationCoords(`${lat.toFixed(6)}, ${lng.toFixed(6)}`);
        setLocationLive(true);
        trackEvent("location_success", { district });
      },
      () => {
        setLocationText("Konum izni verilmedi: ortalama 12-15 dk mesafedeyiz");
        setLocationCoords("");
        trackEvent("location_denied");
      },
      { timeout: 4000, maximumAge: 300000 }
    );
  };

  useEffect(() => {
    requestDynamicLocation();
  }, []);

  const doAnalysis = () =>
    new Promise((resolve) => {
      const steps = [
        { text: "Yol analizi yapiliyor...", value: 35 },
        { text: "Mesafe hesaplanıyor...", value: 70 },
        { text: "En yakin ekip seciliyor...", value: 100 },
      ];
      let index = 0;
      setProgress(0);
      setLoadingStep(steps[0].text);
      const timer = setInterval(() => {
        setLoadingStep(steps[index].text);
        setProgress(steps[index].value);
        index += 1;
        if (index === steps.length) {
          clearInterval(timer);
          setTimeout(() => {
            setLoadingStep("");
            setProgress(0);
            resolve();
          }, 320);
        }
      }, 320);
    });

  const onCalculate = async () => {
    await doAnalysis();
    const selected = calcBase[calcService];
    const numericKm = Number(km || 10);
    const multiplier = Number(vehicleMultiplier);
    const total = Math.round(((selected.fixed + selected.perKm * numericKm) * multiplier) / 50) * 50;
    setPrice(total);
  };

  const quickWhatsappMessage = useMemo(() => {
    const locationLine = locationLive
      ? `Konum bilgim: ${locationText}`
      : "Konumumu telefonda paylaşacağım.";
    return [
      "Merhaba, acil yol yardıma ihtiyacım var.",
      locationLine,
      "Lütfen en yakın ekibi yönlendirin.",
    ].join("\n");
  }, [locationCoords, locationLive, locationText]);

  const quickWhatsappHref = `${whatsappLink}?text=${encodeURIComponent(quickWhatsappMessage)}`;

  // Fiyat teklifi için özel mesaj
  const priceWhatsappMessage = useMemo(() => {
    return [
      "Merhaba, yol yardım hizmeti için fiyat bilgisi almak istiyorum.",
      "",
      "Hizmet Türü: (belirtiniz)",
      "Mesafe: (belirtiniz)",
      "Araç Tipi: (belirtiniz)",
      "",
      "Ücretsiz bilgilendirme görüşmesi rica ederim.",
    ].join("\n");
  }, []);

  const priceWhatsappHref = `${whatsappLink}?text=${encodeURIComponent(priceWhatsappMessage)}`;

  const activeImage = useMemo(() => galleryImages[slide] ?? galleryImages[0], [slide]);

  return (
    <>
      <header className="header">
        <div className="container header-inner">
          <div className="brand">
            <div className="brand-mark">ESE DAYI</div>
            <p>Konya Oto Kurtarma</p>
          </div>
          <div className="header-status">
            <span className="live-dot" />
            <span>Aktif</span>
            <strong>{shiftText}</strong>
          </div>
        </div>
      </header>

      <main>
        <section className="hero">
          <img src={activeImage.src} alt={activeImage.alt} className="hero-image" />
          <div className="hero-overlay" />
          <div className="container hero-content">
            <p className="badge">365 Gun 24 Saat Acik</p>
            <h1>Konya Ese Dayi Cekici Yol Yardim Oto Kurtarma Hizmetleri</h1>
            <p className={`hero-sub ${locationLive ? "is-live" : ""}`}>{locationText}</p>
            <div className="quick-emergency">
              <p className="quick-title">Tek Tık Acil Çağrı Sistemi</p>
              <div className="quick-grid-two">
                <a href={`tel:${phoneRaw}`} className="btn btn-glass-call" onClick={() => trackEvent("hero_call_click")}>
                  Hemen Ara
                </a>
                <a
                  href={quickWhatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-glass-wa"
                  onClick={() => trackEvent("hero_whatsapp_click")}
                >
                  Konumumu Gönder
                </a>
              </div>
              <a className="panic-btn" href={`tel:${phoneRaw}`} onClick={() => trackEvent("panic_click")}>
                Acil Yardım Butonu
              </a>
            </div>
          </div>
        </section>

        <section className="section container">
          <div className="section-head">
            <h2>Hizmet Secimi</h2>
            <p>Sorununuzu Seçin. En uygun ekibi hemen yönlendirelim.</p>
          </div>
          <div className="service-grid">
            {services.map((service) => (
              <button
                key={service.key}
                type="button"
                className={`service-card ${activeService.key === service.key ? "active" : ""}`}
                onClick={() => {
                  setActiveService(service);
                  trackEvent("service_select", { service: service.key });
                }}
              >
                <div className="service-image-wrapper">
                  <img src={service.image} alt={service.name} className="service-image" loading="lazy" />
                  <div className="service-image-overlay" />
                </div>
                <div className="service-content">
                  <div className="service-icon">{service.icon}</div>
                  <h3>{service.name}</h3>
                  <p>{service.desc}</p>
                  <div className="service-meta">
                    <span className="service-time">{service.time}</span>
                    <a
                      href={`${whatsappLink}?text=${encodeURIComponent(service.waMsg)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="service-price-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        trackEvent("service_price_click", { service: service.key });
                      }}
                    >
                      Fiyat Al →
                    </a>
                  </div>
                </div>
              </button>
            ))}
          </div>
          <div className="service-result">
            <p>Önerilen Hizmet: {activeService.name}</p>
            <p>Tahmini varış: {activeService.time}</p>
            <a
              href={`${whatsappLink}?text=${encodeURIComponent(activeService.waMsg)}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-whatsapp full"
              onClick={() => trackEvent("service_result_price_click", { service: activeService.key })}
            >
              Ücretsiz Fiyat Al
            </a>
          </div>
        </section>

        <section className="section section-alt">
          <div className="container calc-grid">
            <div className="calc-panel">
              <h2>Fiyat Hesaplayici</h2>
              <label>
                Hizmet
                <select value={calcService} onChange={(e) => setCalcService(e.target.value)}>
                  <option value="cekici">Araç Çalışmıyor</option>
                  <option value="lastik">Lastik Patladı</option>
                  <option value="kaza">Kaza Yaptım</option>
                  <option value="yakit">Yakıt Bitti</option>
                  <option value="aku">Akü Bitti</option>
                  <option value="kilitli">Araç Kilitlendi</option>
                </select>
              </label>
              <label>
                Mesafe (km)
                <input type="number" min="1" max="300" placeholder="Orn: 12" value={km} onChange={(e) => setKm(e.target.value)} />
              </label>
              <label>
                Arac tipi
                <select value={vehicleMultiplier} onChange={(e) => setVehicleMultiplier(e.target.value)}>
                  <option value="1">Otomobil / SUV</option>
                  <option value="1.25">Minibus / Kamyonet</option>
                  <option value="1.65">Kamyon / Tir</option>
                </select>
              </label>
              <button className="btn btn-primary full" type="button" onClick={onCalculate}>
                Fiyati Hesapla
              </button>
              
              <a 
                href={priceWhatsappHref}
                target="_blank"
                rel="noreferrer"
                className="btn btn-whatsapp full"
                onClick={() => trackEvent("price_whatsapp_click")}
              >
                💬 Ücretsiz Görüşme ile Teklif Al
              </a>

              {loadingStep && (
                <div className="analysis">
                  <p>{loadingStep}</p>
                  <div className="bar">
                    <span style={{ width: `${progress}%` }} />
                  </div>
                </div>
              )}

              {price && (
                <div className="price-box">
                  <p>Yaklasik Ucret</p>
                  <strong>{price} TL</strong>
                  <a href={`tel:${phoneRaw}`} className="btn btn-primary full">
                    Bu Fiyatla Cagir
                  </a>
                  <a 
                    href={priceWhatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-whatsapp full"
                    onClick={() => trackEvent("price_whatsapp_click")}
                  >
                    💬 Ücretsiz Fiyat Teklifi Al
                  </a>
                </div>
              )}
            </div>

            <aside className="company-panel">
              <h3>Firma Bilgileri</h3>
              <p>
                <strong>Firma:</strong> Konya Ese Dayi Cekici Yol Yardim Oto Kurtarma Hizmetleri
              </p>
              <p>
                <strong>Telefon:</strong> <a href={`tel:${phoneRaw}`}>{phoneText}</a>
              </p>
              <p>
                <strong>WhatsApp:</strong> <a href={whatsappLink}>{phoneText}</a>
              </p>
              <p>
                <strong>Calisma:</strong> 365 gun 24 saat acik
              </p>
              <p>
                <strong>Adres:</strong> Mehmet Akif, Akide Sk. No:4 D:A, 42100 Selcuklu/Konya
              </p>
              <p>
                <strong>Koordinat:</strong> 37.898323056208056, 32.48365732883529
              </p>
            </aside>
          </div>
        </section>

        <section className="section container">
          <div className="section-head">
            <h2>Kurumsal Anlasmalar (B2B)</h2>
            <p>Sigorta, filo ve galeri odakli ozel anlasma teklifleri.</p>
          </div>
          <div className="b2b-grid">
            <article className="b2b-card">
              <h3>Sigorta Sirketi Anlasmalari</h3>
              <p>Kasko hasar surecinde anlasmali cekici hizmeti icin operasyonel destek.</p>
            </article>
            <article className="b2b-card">
              <h3>Arac Filo Sozlesmeleri</h3>
              <p>Tasimacilik ve servis araci olan firmalara aylik/yillik yol yardim paketi.</p>
            </article>
            <article className="b2b-card">
              <h3>Oto Galeri ve Servis Ortakligi</h3>
              <p>Arac transferlerinde ozel fiyat ve hizli sevk modeli.</p>
            </article>
          </div>
          <form
            className="b2b-form"
            onSubmit={(e) => {
              e.preventDefault();
              trackEvent("b2b_form_submit");
              window.open(
                `${whatsappLink}?text=${encodeURIComponent(
                  "Merhaba, kurumsal anlasma teklifi almak istiyorum. Lütfen benimle iletisime gecin."
                )}`,
                "_blank",
                "noopener,noreferrer"
              );
            }}
          >
            <h3>Kurumsal Teklif Formu</h3>
            <div className="b2b-form-grid">
              <input type="text" placeholder="Firma adi" required />
              <input type="text" placeholder="Yetkili ad soyad" required />
              <input type="tel" placeholder="Telefon" required />
              <select required defaultValue="">
                <option value="" disabled>
                  Talep turu secin
                </option>
                <option value="sigorta">Sigorta anlasmasi</option>
                <option value="filo">Filo sozlesmesi</option>
                <option value="galeri">Galeri/servis ortakligi</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">
              Teklif Al
            </button>
          </form>
        </section>

        <section className="section container">
          <div className="section-head">
            <h2>Sahadan Goruntuler</h2>
            <p>Profesyonel ekip ve guvenli tasima sureci.</p>
          </div>
          {galleryImages.length > 0 ? (
            <div className="gallery-grid">
              {galleryImages.map((item, index) => (
                <figure
                  key={item.src}
                  className="gallery-item"
                  onClick={() => openLightbox(index)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      openLightbox(index);
                    }
                  }}
                  aria-label={`Gorsel ${index + 1}: ${item.alt}`}
                >
                  <img src={item.src} alt={item.alt} loading="lazy" />
                  <div className="gallery-overlay">
                    <span className="gallery-zoom-icon">🔍</span>
                  </div>
                </figure>
              ))}
            </div>
          ) : (
            <div className="gallery-empty">
              <p>Galeri hazir. Gercek saha fotograflarini `src/assets/field/` klasorune eklediginizde burada otomatik listelenecek.</p>
            </div>
          )}
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            {/* Kurumsal Bilgi */}
            <div className="footer-section">
              <div className="footer-brand">
                <div className="footer-logo">ESE DAYI</div>
                <p className="footer-tagline">Konya Oto Kurtarma</p>
              </div>
              <p className="footer-desc">
                Konya merkez ve tüm ilçelerde 365 gün 24 saat profesyonel oto kurtarma ve yol yardım hizmeti.
              </p>
              <div className="footer-badges">
                <span className="badge-footer">7/24 Hizmet</span>
                <span className="badge-footer">Hızlı Müdahale</span>
                <span className="badge-footer">Profesyonel Ekip</span>
              </div>
            </div>

            {/* Hızlı Linkler */}
            <div className="footer-section">
              <h4>Hizmetler</h4>
              <ul className="footer-links-list">
                <li><a href="#services">Araç Çalışmıyor</a></li>
                <li><a href="#services">Lastik Patladı</a></li>
                <li><a href="#services">Kaza Yaptım</a></li>
                <li><a href="#services">Yakıt Bitti</a></li>
                <li><a href="#services">Akü Bitti</a></li>
                <li><a href="#services">Araç Kilitlendi</a></li>
              </ul>
            </div>

            {/* İletişim Bilgileri */}
            <div className="footer-section">
              <h4>İletişim</h4>
              <div className="footer-contact">
                <div className="contact-item">
                  <span className="contact-icon">📞</span>
                  <div>
                    <strong>Telefon</strong>
                    <a href={`tel:${phoneRaw}`}>{phoneText}</a>
                  </div>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">💬</span>
                  <div>
                    <strong>WhatsApp</strong>
                    <a href={whatsappLink} target="_blank" rel="noreferrer">{phoneText}</a>
                  </div>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📍</span>
                  <div>
                    <strong>Adres</strong>
                    <p>Mehmet Akif, Akide Sk. No:4 D:A, 42100 Selçuklu/Konya</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Çalışma Saatleri */}
            <div className="footer-section">
              <h4>Çalışma Saatleri</h4>
              <div className="footer-hours">
                <div className="hours-row">
                  <span>Pazartesi - Pazar</span>
                  <span className="hours-highlight">24 Saat Açık</span>
                </div>
                <div className="hours-note">365 gün hizmetinizdeyiz</div>
              </div>
              <div className="footer-cta">
                <a href={`tel:${phoneRaw}`} className="btn-footer-call">
                  Hemen Ara
                </a>
                <a href={whatsappLink} target="_blank" rel="noreferrer" className="btn-footer-wa">
                  WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Alt Kısım */}
          <div className="footer-bottom">
            <div className="footer-bottom-left">
              <p>&copy; {new Date().getFullYear()} Ese Dayı Çekici Yol Yardım. Tüm hakları saklıdır.</p>
            </div>
            <div className="footer-bottom-right">
              <a href="#">Gizlilik Politikası</a>
              <a href="#">Kullanım Koşulları</a>
            </div>
          </div>
        </div>

        {/* Harita */}
        <div className="map-wrap">
          <iframe
            title="Konya Ese Dayi Cekici Harita"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3148.3812933778245!2d32.48364660000001!3d37.898149499999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d085a63c1fcf53%3A0x920227c94f54d202!2sKonya%20Ese%20Day%C4%B1%20%C3%87ekici%20Yol%20Yard%C4%B1m%20Oto%20Kurtarma%20Hizmeti!5e0!3m2!1str!2str!4v1777889470204!5m2!1str!2str"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </footer>

      <a href={`tel:${phoneRaw}`} className="floating-btn floating-call" onClick={() => trackEvent("floating_call_click")}>
        Hemen Ara
      </a>
      <a
        href={quickWhatsappHref}
        target="_blank"
        rel="noreferrer"
        className="floating-btn floating-wa"
        onClick={() => {
          requestDynamicLocation();
          trackEvent("floating_whatsapp_click");
        }}
      >
        Konumumu Gönder
      </a>

      {lightboxOpen && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox} aria-label="Kapat">
            ✕
          </button>
          <button
            className="lightbox-nav lightbox-prev"
            onClick={(e) => {
              e.stopPropagation();
              navigateLightbox(-1);
            }}
            aria-label="Onceki"
          >
            ‹
          </button>
          <button
            className="lightbox-nav lightbox-next"
            onClick={(e) => {
              e.stopPropagation();
              navigateLightbox(1);
            }}
            aria-label="Sonraki"
          >
            ›
          </button>
          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={galleryImages[lightboxIndex]?.src}
              alt={galleryImages[lightboxIndex]?.alt}
              className="lightbox-image"
            />
            <p className="lightbox-caption">
              {galleryImages[lightboxIndex]?.alt}
              <span className="lightbox-counter">
                {" "}
                {lightboxIndex + 1} / {galleryImages.length}
              </span>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
