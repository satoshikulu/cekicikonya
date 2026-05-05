import { useParams, Link } from "react-router-dom";
import { blogYazilari } from "./Blog";

export default function BlogDetay() {
  const { slug } = useParams();
  const yazi = blogYazilari.find((y) => y.slug === slug);

  if (!yazi) {
    return (
      <main className="page-content">
        <div className="container">
          <h1>Yazı bulunamadı</h1>
          <Link to="/blog" className="btn btn-primary">Blog'a Dön</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="page-content">
      <div className="container blog-detay">
        <Link to="/blog" className="blog-geri">← Blog'a Dön</Link>
        <time className="blog-tarih">{yazi.tarih}</time>
        <h1>{yazi.baslik}</h1>
        <div
          className="blog-icerik"
          dangerouslySetInnerHTML={{ __html: yazi.icerik }}
        />
      </div>
    </main>
  );
}
