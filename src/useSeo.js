export default function useSeo({ title, description, canonical, blogPost }) {
  if (typeof document === "undefined") return;

  document.title = title;

  const setMeta = (name, content, attr = "name") => {
    let el = document.querySelector(`meta[${attr}="${name}"]`);
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute(attr, name);
      document.head.appendChild(el);
    }
    el.setAttribute("content", content);
  };

  setMeta("description", description);
  setMeta("og:title", title, "property");
  setMeta("og:description", description, "property");

  if (canonical) {
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", canonical);
  }

  // BlogPosting schema — blog detay sayfaları için
  const existingBlogSchema = document.querySelector('script[data-schema="blogpost"]');
  if (existingBlogSchema) existingBlogSchema.remove();

  if (blogPost) {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-schema", "blogpost");
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": blogPost.title,
      "description": blogPost.description,
      "datePublished": blogPost.date,
      "dateModified": blogPost.date,
      "author": {
        "@type": "Organization",
        "name": "Konya Ese Dayı Çekici",
        "url": "https://www.cekicikonya.com/"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Konya Ese Dayı Çekici",
        "url": "https://www.cekicikonya.com/"
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": blogPost.url
      },
      "url": blogPost.url
    });
    document.head.appendChild(script);
  }
}
