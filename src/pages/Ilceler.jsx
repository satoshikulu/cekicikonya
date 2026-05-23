import useSeo from "../useSeo";

const phoneRaw = "05335107337";

const ilceler = [
  { ad: "Alaaddin Mahallesi", sure: "10 dk", bilgi: "Konya merkez, tarihi alan çevresi." },
  { ad: "Akşemsettin Mahallesi", sure: "11 dk", bilgi: "Konya merkez mahallesi." },
  { ad: "Alavardı Mahallesi", sure: "13 dk", bilgi: "Konya merkez mahallesi." },
  { ad: "Altınekin", sure: "50 dk", bilgi: "Konya ovasına hizmet." },
  { ad: "Ahırlı", sure: "90 dk", bilgi: "Güney ilçelere hizmet." },
  { ad: "Akören", sure: "75 dk", bilgi: "Güney ilçelere hizmet." },
  { ad: "Akşehir", sure: "60 dk", bilgi: "Şehirlerarası çekici hizmeti." },
  { ad: "Ayanbey Mahallesi", sure: "12 dk", bilgi: "Konya merkez mahallesi." },
  { ad: "Beyşehir", sure: "65 dk", bilgi: "Göl çevresi dahil tüm bölge." },
  { ad: "Bosna Hersek Mahallesi", sure: "11 dk", bilgi: "Konya merkez mahallesi." },
  { ad: "Bozkır", sure: "80 dk", bilgi: "Toros etekleri dahil." },
  { ad: "Cihanbeyli", sure: "55 dk", bilgi: "Konya kuzeyine hizmet." },
  { ad: "Çeltik", sure: "70 dk", bilgi: "Kuzey ilçelere hizmet." },
  { ad: "Çumra", sure: "30 dk", bilgi: "Konya güneyine hizmet." },
  { ad: "Derbent", sure: "85 dk", bilgi: "Güney ilçelere hizmet." },
  { ad: "Derebucak", sure: "90 dk", bilgi: "Güney ilçelere hizmet." },
  { ad: "Doğanhisar", sure: "75 dk", bilgi: "Batı ilçelere hizmet." },
  { ad: "Emirgazi", sure: "80 dk", bilgi: "Doğu ilçelere hizmet." },
  { ad: "Ereğli", sure: "55 dk", bilgi: "Konya güneydoğusuna hizmet." },
  { ad: "Fetih Mahallesi", sure: "12 dk", bilgi: "Konya merkez mahallesi." },
  { ad: "Güneysınır", sure: "60 dk", bilgi: "Güney ilçelere hizmet." },
  { ad: "Hadim", sure: "95 dk", bilgi: "Uzak güney ilçelere hizmet." },
  { ad: "Halkapınar", sure: "90 dk", bilgi: "Güney ilçelere hizmet." },
  { ad: "Hüyük", sure: "70 dk", bilgi: "Batı ilçelere hizmet." },
  { ad: "Ilgın", sure: "50 dk", bilgi: "Kuzey ilçelere hizmet." },
  { ad: "Kadınhanı", sure: "45 dk", bilgi: "Otoyol güzergahı dahil." },
  { ad: "Karaaslan Mahallesi", sure: "12 dk", bilgi: "Konya merkez mahallesi." },
  { ad: "Karapınar", sure: "65 dk", bilgi: "Doğu ilçelere hizmet." },
  { ad: "Karatay", sure: "12 dk", bilgi: "Konya doğu yakası. Sanayi bölgesi dahil." },
  { ad: "Kosova Mahallesi", sure: "11 dk", bilgi: "Konya merkez mahallesi." },
  { ad: "Köprübaşı Mahallesi", sure: "11 dk", bilgi: "Konya merkez mahallesi." },
  { ad: "Kulu", sure: "55 dk", bilgi: "Konya kuzeyine hizmet." },
  { ad: "Meram", sure: "12 dk", bilgi: "Konya batı yakası. Tüm mahallelere hizmet." },
  { ad: "Nalçacı", sure: "10 dk", bilgi: "Konya merkez, Nalçacı caddesi çevresi." },
  { ad: "Otogar Çevresi", sure: "10 dk", bilgi: "Konya otogar ve çevresi." },
  { ad: "Sancak", sure: "11 dk", bilgi: "Konya merkez mahallesi." },
  { ad: "Sarayönü", sure: "40 dk", bilgi: "Kuzey ilçelere hizmet." },
  { ad: "Selçuklu", sure: "10 dk", bilgi: "Konya merkez ilçesi. En hızlı müdahale bölgemiz." },
  { ad: "Seydişehir", sure: "70 dk", bilgi: "Toros etekleri dahil." },
  { ad: "Taşkent", sure: "100 dk", bilgi: "Uzak güney ilçelere hizmet." },
  { ad: "Tuzlukçu", sure: "65 dk", bilgi: "Batı ilçelere hizmet." },
  { ad: "Yalıhüyük", sure: "75 dk", bilgi: "Güney ilçelere hizmet." },
  { ad: "Yazır Mahallesi", sure: "11 dk", bilgi: "Konya merkez mahallesi." },
  { ad: "Yunak", sure: "60 dk", bilgi: "Kuzey ilçelere hizmet." },
  { ad: "Zafer", sure: "10 dk", bilgi: "Konya merkez, Zafer çevresi." },
];

export default function Ilceler() {
  useSeo({
    title: "Hizmet Bölgelerimiz | Konya Tüm İlçelere Çekici Hizmeti",
    description: "Konya merkez, Selçuklu, Meram, Karatay ve tüm ilçelere 7/24 çekici ve yol yardım hizmeti. Tahmini varış sürelerini öğrenin.",
    canonical: "https://www.cekicikonya.com/ilceler",
  });
  return (
    <main className="page-content">
      <div className="container">
        <h1>Hizmet Bölgelerimiz</h1>
        <p className="page-lead">
          Konya merkez ve tüm ilçelerde 365 gün 24 saat çekici ve yol yardım hizmeti sunuyoruz.
          Bulunduğunuz ilçeyi seçin, tahmini varış süresini öğrenin.
        </p>
        <div className="ilce-grid">
          {ilceler.map((ilce) => (
            <a key={ilce.ad} href={`tel:${phoneRaw}`} className="ilce-card">
              <h2>{ilce.ad}</h2>
              <p>{ilce.bilgi}</p>
              <span className="ilce-sure">{ilce.sure}</span>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
