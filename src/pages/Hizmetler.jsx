import useSeo from "../useSeo";

const phoneRaw = "05335107337";
const whatsappLink = `https://wa.me/90${phoneRaw}`;

const hizmetler = [
  {
    baslik: "Çekici Hizmeti",
    aciklama:
      "Motor arızası, kaza veya herhangi bir nedenle hareket edemeyen araçlarınızı güvenli şekilde istediğiniz noktaya taşıyoruz. Platform çekicilerimizle her araç tipine hizmet veriyoruz.",
    sure: "Ort. 12 dk",
    waMsg: "Merhaba, çekici hizmeti için fiyat almak istiyorum.",
  },
  {
    baslik: "Lastik Değişimi",
    aciklama:
      "Yolda patlayan lastiğinizi yerinde değiştiriyoruz. Stepneniz yoksa yedek lastik temin ediyoruz. Konya'nın her noktasına lastik değişim hizmeti.",
    sure: "Ort. 14 dk",
    waMsg: "Merhaba, lastik değişimi için fiyat almak istiyorum.",
  },
  {
    baslik: "Kaza Yardımı",
    aciklama:
      "Trafik kazası sonrası acil çekici ve kurtarma hizmeti. Sigorta şirketleriyle anlaşmalı çalışıyoruz. Kasko hasar süreçlerinde operasyonel destek sağlıyoruz.",
    sure: "Ort. 10 dk",
    waMsg: "Merhaba, kaza sonrası çekici hizmeti için fiyat almak istiyorum.",
  },
  {
    baslik: "Yakıt Servisi",
    aciklama:
      "Yakıtınız bittiğinde bulunduğunuz konuma yakıt getiriyoruz. Benzin, motorin ve LPG araçlarına hizmet veriyoruz.",
    sure: "Ort. 11 dk",
    waMsg: "Merhaba, yakıt servisi için fiyat almak istiyorum.",
  },
  {
    baslik: "Akü Takviye",
    aciklama:
      "Aküsü biten araçlara yerinde akü takviye hizmeti. Gerekirse akü değişimi de yapıyoruz. Tüm araç markalarına uyumlu ekipmanlarımızla hizmetinizdeyiz.",
    sure: "Ort. 11 dk",
    waMsg: "Merhaba, akü takviye için fiyat almak istiyorum.",
  },
  {
    baslik: "Araç Kapı Açma",
    aciklama:
      "Anahtarınızı araç içinde unuttuysanız veya kilit arızası yaşıyorsanız, aracınıza zarar vermeden kapı açma hizmeti sunuyoruz.",
    sure: "Ort. 13 dk",
    waMsg: "Merhaba, araç kapı açma hizmeti için fiyat almak istiyorum.",
  },
];

export default function Hizmetler() {
  useSeo({
    title: "Hizmetlerimiz | Konya Çekici Yol Yardım Hizmetleri",
    description: "Konya'da 7/24 çekici, lastik değişimi, akü takviye, yakıt servisi, kaza yardımı ve araç kapı açma hizmeti. Ortalama 12 dk varış süresi.",
    canonical: "https://www.cekicikonya.com/hizmetler",
  });
  return (
    <main className="page-content">
      <div className="container">
        <h1>Hizmetlerimiz</h1>
        <p className="page-lead">
          Konya'da 365 gün 24 saat sunduğumuz profesyonel yol yardım ve oto kurtarma hizmetleri.
        </p>
        <div className="hizmet-grid">
          {hizmetler.map((h) => (
            <article key={h.baslik} className="hizmet-card">
              <h2>{h.baslik}</h2>
              <p>{h.aciklama}</p>
              <div className="hizmet-footer">
                <span className="hizmet-sure">{h.sure}</span>
                <a
                  href={`${whatsappLink}?text=${encodeURIComponent(h.waMsg)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-glass-wa"
                >
                  Fiyat Al
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
