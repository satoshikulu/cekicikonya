export default function useSeo({ title, description, canonical }) {
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
}
