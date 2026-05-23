import { useParams, Link } from "react-router-dom";
import { blogYazilari } from "./Blog";
import useSeo from "../useSeo";

export default function BlogDetay() {
  const { slug } = useParams();
  const yazi = blogYazilari.find((y) => y.slug === slug);

  useSeo(yazi ? {
    title: `${yazi.baslik} | Konya Ese Dayı Çekici`,
    description: yazi.ozet,
    canonical: `https://www.cekicikonya.com/blog/${yazi.slug}`,
    blogPost: {
      title: yazi.baslik,
      description: yazi.ozet,
      date: yazi.tarih,
      url: `https://www.cekicikonya.com/blog/${yazi.slug}`,
    },
  } : {
    title: "Yazı Bulunamadı | Konya Ese Dayı Çekici",
    description: "Aradığınız blog yazısı bulunamadı.",
    canonical: "https://www.cekicikonya.com/blog",
  });

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
