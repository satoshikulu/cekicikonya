const phoneRaw = "05335107337";

const ilceler = [
  { ad: "Selçuklu", sure: "10 dk", bilgi: "Konya merkez ilçesi. En hızlı müdahale bölgemiz." },
  { ad: "Meram", sure: "12 dk", bilgi: "Konya batı yakası. Tüm mahallelere hizmet." },
  { ad: "Karatay", sure: "12 dk", bilgi: "Konya doğu yakası. Sanayi bölgesi dahil." },
  { ad: "Akşehir", sure: "60 dk", bilgi: "Şehirlerarası çekici hizmeti." },
  { ad: "Altınekin", sure: "50 dk", bilgi: "Konya ovasına hizmet." },
  { ad: "Ahırlı", sure: "90 dk", bilgi: "Güney ilçelere hizmet." },
  { ad: "Akören", sure: "75 dk", bilgi: "Güney ilçelere hizmet." },
  { ad: "Beyşehir", sure: "65 dk", bilgi: "Göl çevresi dahil tüm bölge." },
  { ad: "Bozkır", sure: "80 dk", bilgi: "Toros etekleri dahil." },
  { ad: "Cihanbeyli", sure: "55 dk", bilgi: "Konya kuzeyine hizmet." },
  { ad: "Çeltik", sure: "70 dk", bilgi: "Kuzey ilçelere hizmet." },
  { ad: "Çumra", sure: "30 dk", bilgi: "Konya güneyine hizmet." },
  { ad: "Derbent", sure: "85 dk", bilgi: "Güney ilçelere hizmet." },
  { ad: "Derebucak", sure: "90 dk", bilgi: "Güney ilçelere hizmet." },
  { ad: "Doğanhisar", sure: "75 dk", bilgi: "Batı ilçelere hizmet." },
  { ad: "Emirgazi", sure: "80 dk", bilgi: "Doğu ilçelere hizmet." },
  { ad: "Ereğli", sure: "55 dk", bilgi: "Konya güneydoğusuna hizmet." },
  { ad: "Güneysınır", sure: "60 dk", bilgi: "Güney ilçelere hizmet." },
  { ad: "Hadim", sure: "95 dk", bilgi: "Uzak güney ilçelere hizmet." },
  { ad: "Halkapınar", sure: "90 dk", bilgi: "Güney ilçelere hizmet." },
  { ad: "Hüyük", sure: "70 dk", bilgi: "Batı ilçelere hizmet." },
  { ad: "Ilgın", sure: "50 dk", bilgi: "Kuzey ilçelere hizmet." },
  { ad: "Kadınhanı", sure: "45 dk", bilgi: "Otoyol güzergahı dahil." },
  { ad: "Karapınar", sure: "65 dk", bilgi: "Doğu ilçelere hizmet." },
  { ad: "Kulu", sure: "55 dk", bilgi: "Konya kuzeyine hizmet." },
  { ad: "Sarayönü", sure: "40 dk", bilgi: "Kuzey ilçelere hizmet." },
  { ad: "Seydişehir", sure: "70 dk", bilgi: "Toros etekleri dahil." },
  { ad: "Taşkent", sure: "100 dk", bilgi: "Uzak güney ilçelere hizmet." },
  { ad: "Tuzlukçu", sure: "65 dk", bilgi: "Batı ilçelere hizmet." },
  { ad: "Yalıhüyük", sure: "75 dk", bilgi: "Güney ilçelere hizmet." },
  { ad: "Yunak", sure: "60 dk", bilgi: "Kuzey ilçelere hizmet." },
];

export default function Ilceler() {
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
