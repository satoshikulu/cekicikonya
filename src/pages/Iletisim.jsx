const phoneRaw = "05335107337";
const phoneText = "0533 510 73 37";
const whatsappLink = `https://wa.me/90${phoneRaw}`;

export default function Iletisim() {
  return (
    <main className="page-content">
      <div className="container">
        <h1>İletişim</h1>
        <p className="page-lead">
          7/24 ulaşabilirsiniz. Acil durumlarda hemen arayın.
        </p>
        <div className="iletisim-grid">
          <div className="iletisim-bilgi">
            <div className="iletisim-item">
              <h3>Telefon</h3>
              <a href={`tel:${phoneRaw}`}>{phoneText}</a>
            </div>
            <div className="iletisim-item">
              <h3>WhatsApp</h3>
              <a href={whatsappLink} target="_blank" rel="noreferrer">{phoneText}</a>
            </div>
            <div className="iletisim-item">
              <h3>Adres</h3>
              <p>Mehmet Akif, Akide Sk. No:4 D:A, 42100 Selçuklu/Konya</p>
            </div>
            <div className="iletisim-item">
              <h3>Çalışma Saatleri</h3>
              <p>365 gün, 24 saat açık</p>
            </div>
            <div className="iletisim-cta">
              <a href={`tel:${phoneRaw}`} className="btn btn-primary">Hemen Ara</a>
              <a href={whatsappLink} target="_blank" rel="noreferrer" className="btn btn-whatsapp">WhatsApp</a>
            </div>
          </div>
          <div className="iletisim-harita">
            <iframe
              title="Konya Ese Dayı Çekici Konum"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3148.3812933778245!2d32.48364660000001!3d37.898149499999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d085a63c1fcf53%3A0x920227c94f54d202!2sKonya%20Ese%20Day%C4%B1%20%C3%87ekici%20Yol%20Yard%C4%B1m%20Oto%20Kurtarma%20Hizmeti!5e0!3m2!1str!2str!4v1777889470204!5m2!1str!2str"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
