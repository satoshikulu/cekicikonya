import useSeo from "../useSeo";

export default function Hakkimizda() {
  useSeo({
    title: "Hakkımızda | Konya Ese Dayı Çekici Yol Yardım",
    description: "2010'dan bu yana Konya'da profesyonel çekici ve yol yardım hizmeti. 15+ yıl deneyim, ortalama 15 dk varış süresi, 365 gün 24 saat hizmet.",
    canonical: "https://www.cekicikonya.com/hakkimizda",
  });
  return (
    <main className="page-content">
      <div className="container">
        <h1>Hakkımızda</h1>
        <p className="page-lead">
          Konya Ese Dayı Çekici, 2010 yılından bu yana Konya merkez ve tüm ilçelerinde
          profesyonel oto kurtarma ve yol yardım hizmeti sunmaktadır.
        </p>

        <section className="about-section">
          <h2>Biz Kimiz?</h2>
          <p>
            Ese Dayı Çekici olarak, araç sahiplerinin en zor anlarında yanlarında olmayı
            görev biliriz. Deneyimli ekibimiz ve modern araç filomuzla Konya'nın her
            noktasına ortalama 15 dakikada ulaşıyoruz.
          </p>
          <p>
            365 gün 24 saat kesintisiz hizmet anlayışımızla gece yarısı, bayram günü,
            kötü hava koşullarında bile sahada oluyoruz.
          </p>
        </section>

        <section className="about-section">
          <h2>Neden Bizi Tercih Etmelisiniz?</h2>
          <ul className="about-list">
            <li>15+ yıllık sektör deneyimi</li>
            <li>1200'den fazla başarılı müdahale</li>
            <li>Ortalama 15 dakika varış süresi</li>
            <li>Şeffaf ve güncel fiyatlandırma</li>
            <li>Sigorta şirketleriyle anlaşmalı çalışma</li>
            <li>Konya merkez ve tüm ilçelere hizmet</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>Misyonumuz</h2>
          <p>
            Araç sahiplerine güvenli, hızlı ve şeffaf yol yardım hizmeti sunarak
            Konya'nın en güvenilir oto kurtarma firması olmak.
          </p>
        </section>
      </div>
    </main>
  );
}
