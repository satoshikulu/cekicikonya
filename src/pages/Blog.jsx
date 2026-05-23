import { Link } from "react-router-dom";
import useSeo from "../useSeo";

export const blogYazilari = [
  {
    slug: "konya-cekici-hizmeti",
    baslik: "Konya'da Cekici Hizmeti Nasil Calisir?",
    ozet: "Aracınız yolda kaldığında ne yapmalısınız? Konya'da çekici hizmeti süreci ve doğru firma seçimi hakkında bilmeniz gerekenler.",
    tarih: "2026-05-01",
    icerik: "<p>Konya'da araç arızası yaşadığınızda panik yapmak yerine doğru adımları atmak önemlidir.</p><h2>Araç Yolda Kalınca İlk Yapılması Gerekenler</h2><p>Aracınız hareket edemez hale geldiğinde öncelikle güvenli bir alana çekin. Dörtlü flaşörlerinizi açın ve reflektörlerinizi koyun.</p><h2>Doğru Çekici Firması Nasıl Seçilir?</h2><p>7/24 hizmet veren, şeffaf fiyatlandırma sunan ve deneyimli ekibe sahip bir firma tercih edin.</p><h2>Çekici Ücretleri Neye Göre Belirlenir?</h2><p>0-20 km arası 1000 TL sabit ücret, 20 km üzeri her km için 22 TL eklenir.</p><h2>Konya'da Çekici Hizmeti Süreci</h2><p>Bizi aradığınızda konumunuzu alıyoruz. Konya merkez için ortalama varış süremiz 12 dakikadır.</p>",
  },
  {
    slug: "lastik-patlarsa-ne-yapilir",
    baslik: "Yolda Lastik Patlarsa Ne Yapmalısınız?",
    ozet: "Seyir halindeyken lastik patlaması tehlikeli olabilir. Doğru müdahale adımları ve Konya'da lastik değişim hizmeti hakkında bilgiler.",
    tarih: "2026-05-02",
    icerik: "<p>Seyir halindeyken lastik patlaması ani ve tehlikeli bir durumdur. Sakin kalmak büyük önem taşır.</p><h2>Lastik Patladığında İlk Tepkiniz</h2><p>Ani fren yapmayın. Direksiyonu sıkıca tutun ve yavaşça yol kenarına çekin.</p><h2>Stepneniz Yoksa Ne Olur?</h2><p>Konya Ese Dayı Çekici olarak yerinde lastik değişimi yapıyoruz. Ortalama 14 dakikada yanınızdayız.</p><h2>Lastik Değişimi Ne Kadar Sürer?</h2><p>Profesyonel ekibimizle lastik değişimi ortalama 15-20 dakika sürmektedir.</p>",
  },
  {
    slug: "aku-bitmesi-nedenleri",
    baslik: "Araç Aküsü Neden Biter? Belirtileri ve Çözümleri",
    ozet: "Özellikle kış aylarında sık yaşanan akü sorunları, nedenleri ve Konya'da akü takviye hizmeti hakkında kapsamlı rehber.",
    tarih: "2026-05-03",
    icerik: "<p>Araç aküsünün bitmesi, özellikle soğuk kış sabahlarında sık karşılaşılan bir sorundur.</p><h2>Akü Neden Biter?</h2><p>Uzun süre araç kullanmamak, farları açık unutmak, eski akü ve soğuk hava başlıca nedenlerdir.</p><h2>Akü Bittiğinin Belirtileri</h2><p>Motor güçlükle çalışıyor, farlar sönük yanıyor veya araç hiç çalışmıyorsa akünüz bitmiş olabilir.</p><h2>Akü Takviye Hizmeti</h2><p>Konya Ese Dayı Çekici olarak yerinde akü takviye ve gerekirse akü değişimi hizmeti sunuyoruz. Ortalama 11 dakikada yanınızdayız.</p>",
  },
  {
    slug: "kaza-sonrasi-yapilmasi-gerekenler",
    baslik: "Trafik Kazası Sonrası Yapılması Gerekenler",
    ozet: "Trafik kazası geçirdikten sonra hangi adımları atmalısınız? Sigorta işlemleri, çekici çağırma ve yasal süreç hakkında rehber.",
    tarih: "2026-05-04",
    icerik: "<p>Trafik kazası stresli bir deneyimdir. Sakin kalmak ve doğru adımları atmak kritiktir.</p><h2>Kaza Anında İlk Adımlar</h2><p>Yaralı varsa hemen 112'yi arayın. Araçları yol kenarına çekin ve dörtlü flaşörleri açın.</p><h2>Sigorta ve Tutanak</h2><p>Kaza tespit tutanağı doldurun. Kaza yerinin fotoğraflarını çekin.</p><h2>Çekici Çağırma</h2><p>Konya Ese Dayı Çekici sigorta şirketleriyle anlaşmalı çalışmaktadır. Ortalama 10 dakikada kaza yerine ulaşıyoruz.</p>",
  },
  {
    slug: "konya-yol-yardim-hizmeti",
    baslik: "Konya'da 7/24 Yol Yardım Hizmeti",
    ozet: "Konya merkez ve ilçelerinde sunulan yol yardım hizmetleri, kapsama alanı ve hizmet detayları hakkında kapsamlı bilgi.",
    tarih: "2026-05-05",
    icerik: "<p>Konya'da yol yardım hizmeti, araç sahiplerinin beklenmedik durumlarda hızla destek alabilmesi için kritik bir hizmettir.</p><h2>Yol Yardım Hizmeti Nedir?</h2><p>Lastik değişimi, akü takviye, yakıt servisi, kapı açma ve çekici hizmetlerini kapsayan kapsamlı bir destek paketidir.</p><h2>Konya'da Hizmet Bölgelerimiz</h2><p>Selçuklu, Meram, Karatay başta olmak üzere Konya'nın tüm ilçelerine hizmet veriyoruz.</p><h2>Neden Ese Dayı Çekici?</h2><p>15+ yıllık deneyim, ortalama 15 dakika varış süresi ve şeffaf fiyatlandırmayla Konya'nın güvenilir yol yardım firmasıyız.</p>",
  },
];

export default function Blog() {
  useSeo({
    title: "Blog | Konya Çekici ve Yol Yardım Rehberi",
    description: "Araç arızası, lastik patlaması, akü sorunları ve trafik kazası sonrası yapılması gerekenler. Konya yol yardım rehberi.",
    canonical: "https://www.cekicikonya.com/blog",
  });
  return (
    <main className="page-content">
      <div className="container">
        <h1>Blog</h1>
        <p className="page-lead">Yol yardım, oto kurtarma ve araç bakımı hakkında faydalı bilgiler.</p>
        <div className="blog-grid">
          {blogYazilari.map((yazi) => (
            <article key={yazi.slug} className="blog-card">
              <time className="blog-tarih">{yazi.tarih}</time>
              <h2><Link to={`/blog/${yazi.slug}`}>{yazi.baslik}</Link></h2>
              <p>{yazi.ozet}</p>
              <Link to={`/blog/${yazi.slug}`} className="blog-devami">Devamını Oku</Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
