import { useState } from "react";
import { galleryImages } from "../assets/gallery";
import useSeo from "../useSeo";

export default function Galeri() {
  useSeo({
    title: "Galeri | Konya Ese Dayı Çekici Operasyon Görüntüleri",
    description: "Sahadan gerçek çekici ve yol yardım operasyon görüntüleri. Profesyonel ekip ve güvenli taşıma sürecimiz.",
    canonical: "https://www.esedayicekici.com/galeri",
  });
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const close = () => setLightboxIndex(null);
  const nav = (dir) =>
    setLightboxIndex((prev) => (prev + dir + galleryImages.length) % galleryImages.length);

  return (
    <main className="page-content">
      <div className="container">
        <h1>Galeri</h1>
        <p className="page-lead">
          Sahadan gerçek operasyon görüntüleri. Profesyonel ekip ve güvenli taşıma sürecimiz.
        </p>
        <div className="gallery-grid">
          {galleryImages.map((item, index) => (
            <figure
              key={item.src}
              className="gallery-item"
              onClick={() => setLightboxIndex(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setLightboxIndex(index);
                }
              }}
              aria-label={`Görsel ${index + 1}: ${item.alt}`}
            >
              <img src={item.src} alt={item.alt} loading="lazy" />
              <div className="gallery-overlay">
                <span className="gallery-zoom-icon">🔍</span>
              </div>
            </figure>
          ))}
        </div>
      </div>

      {lightboxIndex !== null && (
        <div className="lightbox-overlay" onClick={close}>
          <button className="lightbox-close" onClick={close} aria-label="Kapat">✕</button>
          <button className="lightbox-nav lightbox-prev" onClick={(e) => { e.stopPropagation(); nav(-1); }} aria-label="Önceki">‹</button>
          <button className="lightbox-nav lightbox-next" onClick={(e) => { e.stopPropagation(); nav(1); }} aria-label="Sonraki">›</button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={galleryImages[lightboxIndex]?.src} alt={galleryImages[lightboxIndex]?.alt} className="lightbox-image" />
            <p className="lightbox-caption">
              {galleryImages[lightboxIndex]?.alt}
              <span className="lightbox-counter">{lightboxIndex + 1} / {galleryImages.length}</span>
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
