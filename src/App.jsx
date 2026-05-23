import { useEffect, useMemo, useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { galleryImages } from "./assets/gallery";
import useSeo from "./useSeo";
import Hakkimizda from "./pages/Hakkimizda";
import Hizmetler from "./pages/Hizmetler";
import Ilceler from "./pages/Ilceler";
import Galeri from "./pages/Galeri";
import Blog from "./pages/Blog";
import BlogDetay from "./pages/BlogDetay";
import Iletisim from "./pages/Iletisim";

const phoneRaw = "05335107337";
const phoneText = "0533 510 73 37";
const whatsappLink = `https://wa.me/90${phoneRaw}`;

const serviceImages = {
  cekici: "https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=400&auto=format&fit=crop&q=50&fm=webp",
  lastik: "https://plus.unsplash.com/premium_photo-1683141571145-4676ddf91387?w=400&auto=format&fit=crop&q=50&fm=webp",
  kaza: "https://images.unsplash.com/photo-1687867451910-28941a460f35?w=400&auto=format&fit=crop&q=50&fm=webp",
  yakit: "https://images.unsplash.com/photo-1765211003392-7eeb5250d988?w=400&auto=format&fit=crop&q=50&fm=webp",
  aku: "https://plus.unsplash.com/premium_photo-1661770030805-0abb8fd880f1?w=400&auto=format&fit=crop&q=50&fm=webp",
  kilitli: "https://images.unsplash.com/photo-1771340742493-52fbd5476ccb?w=400&auto=format&fit=crop&q=50&fm=webp",
};

const services = [
  { key: "cekici", name: "Araç Çalışmıyor", desc: "Motor / arıza", time: "12 dk", waMsg: "Merhaba, araç çalışmıyor. Çekici hizmeti için fiyat almak istiyorum.", image: serviceImages.cekici, imageAlt: "Konya çekici hizmeti - motor arızası olan araç kurtarma" },
  { key: "lastik", name: "Lastik Değişimi", desc: "Lastik değişimi", time: "14 dk", waMsg: "Merhaba, lastik değişimi için fiyat almak istiyorum.", image: serviceImages.lastik, imageAlt: "Konya lastik değişimi yol yardım hizmeti" },
  { key: "kaza", name: "Kaza Yaptım", desc: "Acil çekici", time: "10 dk", waMsg: "Merhaba, kaza yaptım. Acil çekici için fiyat almak istiyorum.", image: serviceImages.kaza, imageAlt: "Konya kaza sonrası acil çekici ve oto kurtarma hizmeti" },
  { key: "yakit", name: "Yakıt Bitti", desc: "Yakıt servisi", time: "11 dk", waMsg: "Merhaba, yakıtım bitti. Yakıt servisi için fiyat almak istiyorum.", image: serviceImages.yakit, imageAlt: "Konya yolda yakıt bitmesi yol yardım servisi" },
  { key: "aku", name: "Akü Bitti", desc: "Akü takviye", time: "11 dk", waMsg: "Merhaba, aküm bitti. Akü takviye için fiyat almak istiyorum.", image: serviceImages.aku, imageAlt: "Konya akü takviye ve akü değişimi yol yardım hizmeti" },
  { key: "kilitli", name: "Araç Kilitlendi", desc: "Kapı açma", time: "13 dk", waMsg: "Merhaba, aracım kilitlendi. Kapı açma hizmeti için fiyat almak istiyorum.", image: serviceImages.kilitli, imageAlt: "Konya araç kapı açma ve kilit çözme hizmeti" },
];

const calcBase = {
  cekici: { base: 1000, threshold: 20, perKmOver: 22 },
  kaza: { base: 1000, threshold: 20, perKmOver: 22 },
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
  const [loadingStep, setLoadingStep] = useState("");
  const [progress, setProgress] = useState(0);
  const [price, setPrice] = useState(null);
  const [galleryExpanded, setGalleryExpanded] = useState(false);

  const [b2bFirma, setB2bFirma] = useState("");
  const [b2bYetkili, setB2bYetkili] = useState("");
  const [b2bTelefon, setB2bTelefon] = useState("");
  const [b2bTalep, setB2bTalep] = useState("");

  const location = useLocation();

  // Anasayfaya dönüldüğünde title/meta reset
  if (location.pathname === "/") {
    useSeo({
      title: "Konya Çekici | 7/24 Konya Oto Kurtarma & Yol Yardım - Ese Dayı",
      description: "Konya ve ilçelerinde 7/24 acil oto çekici, yol yardım ve oto kurtarma hizmeti. En yakın ekibimiz 15 dakikada yanınızda! Fiyat hesaplamak ve çağırmak için tıklayın.",
      canonical: "https://www.esedayicekici.com/",
    });
  }

  const trackEvent = (eventName, params = {}) => {
    if (typeof window === "undefined") return;
    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, params);
    }
  };

  const openLightbox = (index) => { setLightboxIndex(index); setLightboxOpen(true); };
  const closeLightbox = () => { setLightboxOpen(false); };
  const navigateLightbox = (dir) => setLightboxIndex((prev) => (prev + dir + galleryImages.length) % galleryImages.length);

  useEffect(() => {
    const hour = new Date().getHours();
    setShiftText(hour >= 20 || hour < 7 ? "Gece Nobetci Ekibi" : "Gunduz Saha Ekibi");
  }, []);

  useEffect(() => {
    if (galleryImages.length <= 1) return undefined;
    const timer = setInterval(() => setSlide((prev) => (prev + 1) % galleryImages.length), 4500);
    return () => clearInterval(timer);
  }, []);

  const requestDynamicLocation = () => {
    if (!navigator.geolocation) return;
    trackEvent("location_request_click");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
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

  useEffect(() => { requestDynamicLocation(); }, []);

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
          setTimeout(() => { setLoadingStep(""); setProgress(0); resolve(); }, 320);
        }
      }, 320);
    });

  const onCalculate = async () => {
    await doAnalysis();
    const selected = calcBase[calcService];
    const numericKm = Number(km || 10);
    const multiplier = Number(vehicleMultiplier);
    let basePrice;
    if (selected.base !== undefined) {
      // 0-20 km: sabit 1000 TL, sonrası km başına 22 TL
      const extraKm = Math.max(0, numericKm - selected.threshold);
      basePrice = selected.base + extraKm * selected.perKmOver;
    } else {
      basePrice = selected.fixed + selected.perKm * numericKm;
    }
    const total = Math.round((basePrice * multiplier) / 50) * 50;
    setPrice(total);
  };

  const quickWhatsappMessage = useMemo(() => {
    const locationLine = locationLive ? `Konum bilgim: ${locationText}` : "Konumumu telefonda paylaşacağım.";
    return ["Merhaba, acil yol yardıma ihtiyacım var.", locationLine, "Lütfen en yakın ekibi yönlendirin."].join("\n");
  }, [locationCoords, locationLive, locationText]);

  const quickWhatsappHref = `${whatsappLink}?text=${encodeURIComponent(quickWhatsappMessage)}`;

  const priceWhatsappMessage = useMemo(() => [
    "Merhaba, yol yardım hizmeti için fiyat bilgisi almak istiyorum.",
    "",
    "Hizmet Türü: (belirtiniz)",
    "Mesafe: (belirtiniz)",
    "Araç Tipi: (belirtiniz)",
    "",
    "Ücretsiz bilgilendirme görüşmesi rica ederim.",
  ].join("\n"), []);

  const priceWhatsappHref = `${whatsappLink}?text=${encodeURIComponent(priceWhatsappMessage)}`;
  // Hero image: always show first image for LCP, slideshow only affects background
  const heroImage = galleryImages[0];
  const activeImage = useMemo(() => galleryImages[slide] ?? galleryImages[0], [slide]);
  const visibleGallery = useMemo(
    () => galleryExpanded ? galleryImages : galleryImages.slice(0, 6),
    [galleryExpanded]
  );

  const navLinks = [
    { to: "/", label: "Anasayfa" },
    { to: "/hakkimizda", label: "Hakkımızda" },
    { to: "/hizmetler", label: "Hizmetler" },
    { to: "/ilceler", label: "İlçeler" },
    { to: "/galeri", label: "Galeri" },
    { to: "/blog", label: "Blog" },
    { to: "/iletisim", label: "İletişim" },
  ];

  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="header">
        <div className="container header-inner">
          <Link to="/" className="brand">
            <div className="brand-mark">Konya Çekici</div>
            <p>Ese Dayı</p>
          </Link>
          <nav className="navbar">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={
                  to === "/blog"
                    ? location.pathname.startsWith("/blog") ? "nav-link active" : "nav-link"
                    : location.pathname === to ? "nav-link active" : "nav-link"
                }
              >
                {label}
              </Link>
            ))}
          </nav>
          <button
            className={`hamburger${menuOpen ? " open" : ""}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menüyü aç/kapat"
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
          {menuOpen && (
            <div className="mobile-menu">
              {navLinks.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={closeMenu}
                  className={
                    to === "/blog"
                      ? location.pathname.startsWith("/blog") ? "nav-link active" : "nav-link"
                      : location.pathname === to ? "nav-link active" : "nav-link"
                  }
                >
                  {label}
                </Link>
              ))}
            </div>
          )}
          <div className="header-status">
            <span className="live-dot" />
            <span>Aktif</span>
            <strong>{shiftText}</strong>
          </div>
        </div>
      </header>

      <Routes>
        <Route path="/" element={
          <main>
            <section className="hero">
              {/* LCP image: always the first gallery image, eager + high priority */}
              <img
                src={heroImage.src}
                alt={heroImage.alt}
                className="hero-image"
                fetchpriority="high"
                loading="eager"
                decoding="async"
              />
              {/* Slideshow overlay image (fades in after first) */}
              {slide > 0 && (
                <img
                  src={activeImage.src}
                  alt={activeImage.alt}
                  className="hero-image hero-image-slide"
                  loading="lazy"
                  aria-hidden="true"
                />
              )}
              <div className="hero-overlay" />
              <div className="container hero-content">
                <p className="badge">365 Gun 24 Saat Acik</p>
                <h1>Konya Oto Çekici ve Yol Yardım Hizmetleri</h1>
                <p className="hero-brand">Ese Dayı</p>
                <p className={`hero-sub ${locationLive ? "is-live" : ""}`}>{locationText}</p>
                <div className="quick-emergency">
                  <p className="quick-title">Tek Tık Acil Çağrı Sistemi</p>
                  <div className="quick-grid-two">
                    <a href={`tel:${phoneRaw}`} className="btn btn-glass-call" onClick={() => trackEvent("hero_call_click")}>
                      Hemen Ara
                    </a>
                    <a href={quickWhatsappHref} target="_blank" rel="noreferrer" className="btn btn-glass-wa" onClick={() => trackEvent("hero_whatsapp_click")}>
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
                <h2>Hizmet Seçimi</h2>
                <p>Sorununuzu Seçin. En uygun ekibi hemen yönlendirelim.</p>
              </div>
              <div className="service-grid">
                {services.map((service) => (
                  <button key={service.key} type="button"
                    className={`service-card ${activeService.key === service.key ? "active" : ""}`}
                    onClick={() => { setActiveService(service); trackEvent("service_select", { service: service.key }); }}
                  >
                    <div className="service-image-wrapper">
                      <img src={service.image} alt={service.imageAlt} className="service-image" loading="lazy" />
                      <div className="service-image-overlay" />
                    </div>
                    <div className="service-content">
                      <h3>{service.name}</h3>
                      <p>{service.desc}</p>
                      <div className="service-meta">
                        <span className="service-time">{service.time}</span>
                        <a href={`${whatsappLink}?text=${encodeURIComponent(service.waMsg)}`} target="_blank" rel="noreferrer"
                          className="service-price-btn"
                          onClick={(e) => { e.stopPropagation(); trackEvent("service_price_click", { service: service.key }); }}
                        >Fiyat Al →</a>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              <div className="service-result">
                <p>Önerilen Hizmet: {activeService.name}</p>
                <p>Tahmini varış: {activeService.time}</p>
                <a href={`${whatsappLink}?text=${encodeURIComponent(activeService.waMsg)}`} target="_blank" rel="noreferrer"
                  className="btn btn-whatsapp full"
                  onClick={() => trackEvent("service_result_price_click", { service: activeService.key })}
                >Ücretsiz Fiyat Al</a>
              </div>
            </section>

            <section className="section section-alt">
              <div className="container calc-grid">
                <div className="calc-panel">
                  <h2>Fiyat Hesaplayıcı</h2>
                  <label htmlFor="calc-service">Hizmet
                    <select id="calc-service" value={calcService} onChange={(e) => setCalcService(e.target.value)}>
                      <option value="cekici">Araç Çalışmıyor</option>
                      <option value="lastik">Lastik Değişimi</option>
                      <option value="kaza">Kaza Yaptım</option>
                      <option value="yakit">Yakıt Bitti</option>
                      <option value="aku">Akü Bitti</option>
                      <option value="kilitli">Araç Kilitlendi</option>
                    </select>
                  </label>
                  <label htmlFor="calc-km">Mesafe (km)
                    <input id="calc-km" type="number" min="1" max="300" placeholder="Orn: 12" value={km} onChange={(e) => setKm(e.target.value)} />
                  </label>
                  <label htmlFor="calc-vehicle">Araç tipi
                    <select id="calc-vehicle" value={vehicleMultiplier} onChange={(e) => setVehicleMultiplier(e.target.value)}>
                      <option value="1">Otomobil / SUV / Motorsiklet</option>
                      <option value="1.25">Minibüs / Kamyonet</option>
                      <option value="1.65">Kamyon / Tır</option>
                    </select>
                  </label>
                  <button className="btn btn-primary full" type="button" onClick={onCalculate}>Fiyatı Hesapla</button>
                  <a href={priceWhatsappHref} target="_blank" rel="noreferrer" className="btn btn-whatsapp full" onClick={() => trackEvent("price_whatsapp_click")}>
                    Ücretsiz Görüşme ile Teklif Al
                  </a>
                  {loadingStep && (
                    <div className="analysis">
                      <p>{loadingStep}</p>
                      <div className="bar"><span style={{ width: `${progress}%` }} /></div>
                    </div>
                  )}
                  {price && (
                    <div className="price-box">
                      <p>Yaklaşık Ücret</p>
                      <strong>{price} TL</strong>
                      <a href={`tel:${phoneRaw}`} className="btn btn-primary full">Bu Fiyatla Çağır</a>
                      <a href={priceWhatsappHref} target="_blank" rel="noreferrer" className="btn btn-whatsapp full" onClick={() => trackEvent("price_whatsapp_click")}>
                        Ücretsiz Fiyat Teklifi Al
                      </a>
                    </div>
                  )}
                </div>
                <aside className="company-panel">
                  <h3>Firma Bilgileri</h3>
                  <p><strong>Firma:</strong> Konya Ese Dayı Çekici Yol Yardım Oto Kurtarma</p>
                  <p><strong>Telefon:</strong> <a href={`tel:${phoneRaw}`}>{phoneText}</a></p>
                  <p><strong>WhatsApp:</strong> <a href={whatsappLink}>{phoneText}</a></p>
                  <p><strong>Çalışma:</strong> 365 gün 24 saat açık</p>
                  <p><strong>Adres:</strong> Mehmet Akif, Akide Sk. No:4 D:A, 42100 Selçuklu/Konya</p>
                </aside>
              </div>
            </section>

            <section className="section container">
              <div className="section-head">
                <h2>Kurumsal Anlaşmalar (B2B)</h2>
                <p>Sigorta, filo ve galeri odaklı özel anlaşma teklifleri.</p>
              </div>
              <div className="b2b-grid">
                <article className="b2b-card"><h3>Sigorta Şirketi Anlaşmaları</h3><p>Kasko hasar sürecinde anlaşmalı çekici hizmeti için operasyonel destek.</p></article>
                <article className="b2b-card"><h3>Araç Filo Sözleşmeleri</h3><p>Taşımacılık ve servis aracı olan firmalara aylık/yıllık yol yardım paketi.</p></article>
                <article className="b2b-card"><h3>Oto Galeri ve Servis Ortaklığı</h3><p>Araç transferlerinde özel fiyat ve hızlı sevk modeli.</p></article>
              </div>
              <form className="b2b-form" onSubmit={(e) => {
                e.preventDefault();
                trackEvent("b2b_form_submit");
                const msg = [
                  "Merhaba, kurumsal anlaşma teklifi almak istiyorum.",
                  "",
                  `Firma Adı: ${b2bFirma}`,
                  `Yetkili: ${b2bYetkili}`,
                  `Telefon: ${b2bTelefon}`,
                  `Talep Türü: ${b2bTalep}`,
                ].join("\n");
                window.open(`${whatsappLink}?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
              }}>
                <h3>Kurumsal Teklif Formu</h3>
                <div className="b2b-form-grid">
                  <input type="text" placeholder="Firma adı" required value={b2bFirma} onChange={(e) => setB2bFirma(e.target.value)} aria-label="Firma adı" />
                  <input type="text" placeholder="Yetkili ad soyad" required value={b2bYetkili} onChange={(e) => setB2bYetkili(e.target.value)} aria-label="Yetkili ad soyad" />
                  <input type="tel" placeholder="Telefon" required value={b2bTelefon} onChange={(e) => setB2bTelefon(e.target.value)} aria-label="Telefon" />
                  <select required value={b2bTalep} onChange={(e) => setB2bTalep(e.target.value)} aria-label="Talep türü seçin">
                    <option value="" disabled>Talep türü seçin</option>
                    <option value="Sigorta anlaşması">Sigorta anlaşması</option>
                    <option value="Filo sözleşmesi">Filo sözleşmesi</option>
                    <option value="Galeri/servis ortaklığı">Galeri/servis ortaklığı</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary">Teklif Al</button>
              </form>
            </section>

            <section className="section container">
              <div className="section-head">
                <h2>Sahadan Görüntüler</h2>
                <p>Profesyonel ekip ve güvenli taşıma süreci.</p>
              </div>
              <div className="gallery-grid">
                {visibleGallery.map((item, index) => (
                  <figure key={item.src} className="gallery-item" onClick={() => openLightbox(index)}
                    role="button" tabIndex={0}
                    onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openLightbox(index); } }}
                    aria-label={`Görsel ${index + 1}: ${item.alt}`}
                  >
                    <img src={item.src} alt={item.alt} loading="lazy" />
                    <div className="gallery-overlay"><span className="gallery-zoom-icon" /></div>
                  </figure>
                ))}
              </div>
              {!galleryExpanded && galleryImages.length > 6 && (
                <div style={{ textAlign: "center", marginTop: "16px" }}>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => setGalleryExpanded(true)}
                  >
                    Tüm Görselleri Gör ({galleryImages.length - 6} daha)
                  </button>
                </div>
              )}
            </section>
          </main>
        } />
        <Route path="/hakkimizda" element={<Hakkimizda />} />
        <Route path="/hizmetler" element={<Hizmetler />} />
        <Route path="/ilceler" element={<Ilceler />} />
        <Route path="/galeri" element={<Galeri />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogDetay />} />
        <Route path="/iletisim" element={<Iletisim />} />
      </Routes>

      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-section">
              <div className="footer-brand">
                <div className="footer-logo">ESE DAYI</div>
                <p className="footer-tagline">Konya Oto Kurtarma</p>
              </div>
              <p className="footer-desc">Konya merkez ve tüm ilçelerde 365 gün 24 saat profesyonel oto kurtarma ve yol yardım hizmeti.</p>
              <div className="footer-badges">
                <span className="badge-footer">7/24 Hizmet</span>
                <span className="badge-footer">Hızlı Müdahale</span>
                <span className="badge-footer">Profesyonel Ekip</span>
              </div>
            </div>
            <div className="footer-section">
              <h4>Hizmetler</h4>
              <ul className="footer-links-list">
                <li><Link to="/hizmetler">Araç Çalışmıyor</Link></li>
                <li><Link to="/hizmetler">Lastik Değişimi</Link></li>
                <li><Link to="/hizmetler">Kaza Yaptım</Link></li>
                <li><Link to="/hizmetler">Yakıt Bitti</Link></li>
                <li><Link to="/hizmetler">Akü Bitti</Link></li>
                <li><Link to="/hizmetler">Araç Kilitlendi</Link></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>İletişim</h4>
              <div className="footer-contact">
                <div className="contact-item">
                  <span className="contact-icon">Tel</span>
                  <div><strong>Telefon</strong><a href={`tel:${phoneRaw}`}>{phoneText}</a></div>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">WA</span>
                  <div><strong>WhatsApp</strong><a href={whatsappLink} target="_blank" rel="noreferrer">{phoneText}</a></div>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">Adres</span>
                  <div><strong>Adres</strong><p>Mehmet Akif, Akide Sk. No:4 D:A, 42100 Selçuklu/Konya</p></div>
                </div>
              </div>
            </div>
            <div className="footer-section">
              <h4>Çalışma Saatleri</h4>
              <div className="footer-hours">
                <div className="hours-row"><span>Pazartesi - Pazar</span><span className="hours-highlight">24 Saat Açık</span></div>
                <div className="hours-note">365 gün hizmetinizdeyiz</div>
              </div>
              <div className="footer-cta">
                <a href={`tel:${phoneRaw}`} className="btn-footer-call">Hemen Ara</a>
                <a href={whatsappLink} target="_blank" rel="noreferrer" className="btn-footer-wa">WhatsApp</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-bottom-left">
              <p>&copy; {new Date().getFullYear()} Ese Dayı Çekici Yol Yardım. Tüm hakları saklıdır.</p>
            </div>
            <div className="footer-bottom-right">
              <Link to="/hakkimizda">Hakkımızda</Link>
              <Link to="/iletisim">İletişim</Link>
            </div>
          </div>
        </div>
        <div className="map-wrap">
          <iframe
            title="Konya Ese Dayi Cekici Harita"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3148.3812933778245!2d32.48364660000001!3d37.898149499999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d085a63c1fcf53%3A0x920227c94f54d202!2sKonya%20Ese%20Day%C4%B1%20%C3%87ekici%20Yol%20Yard%C4%B1m%20Oto%20Kurtarma%20Hizmeti!5e0!3m2!1str!2str!4v1777889470204!5m2!1str!2str"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </footer>

      <a href={`tel:${phoneRaw}`} className="floating-btn floating-call" onClick={() => trackEvent("floating_call_click")}>Hemen Ara</a>
      <a href={quickWhatsappHref} target="_blank" rel="noreferrer" className="floating-btn floating-wa"
        onClick={() => { requestDynamicLocation(); trackEvent("floating_whatsapp_click"); }}>
        Konumumu Gönder
      </a>

      {lightboxOpen && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox} aria-label="Kapat">✕</button>
          <button className="lightbox-nav lightbox-prev" onClick={(e) => { e.stopPropagation(); navigateLightbox(-1); }} aria-label="Önceki">‹</button>
          <button className="lightbox-nav lightbox-next" onClick={(e) => { e.stopPropagation(); navigateLightbox(1); }} aria-label="Sonraki">›</button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={galleryImages[lightboxIndex]?.src} alt={galleryImages[lightboxIndex]?.alt} className="lightbox-image" />
            <p className="lightbox-caption">
              {galleryImages[lightboxIndex]?.alt}
              <span className="lightbox-counter">{lightboxIndex + 1} / {galleryImages.length}</span>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
