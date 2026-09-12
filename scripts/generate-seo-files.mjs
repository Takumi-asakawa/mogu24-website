import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://mogu24-website.pages.dev").replace(/\/$/, "");
const today = new Date().toISOString().slice(0, 10);
const locales = ["ja", "zh", "en"];
const pages = [
  { path: "", changefreq: "weekly", priority: "1.0" },
  { path: "products/", changefreq: "weekly", priority: "0.9" },
  { path: "news/", changefreq: "weekly", priority: "0.8" },
  { path: "faq/", changefreq: "monthly", priority: "0.7" }
];

const robots = `User-agent: *\nAllow: /\nDisallow: /admin/\n\nSitemap: ${siteUrl}/sitemap.xml\n`;
fs.writeFileSync(path.join(root, "public", "robots.txt"), robots);

const urls = locales.flatMap((locale, localeIndex) => pages.map((page) => {
  const priority = Math.max(0.4, Number(page.priority) - localeIndex * 0.1).toFixed(1);
  return `  <url><loc>${siteUrl}/${locale}/${page.path}</loc><lastmod>${today}</lastmod><changefreq>${page.changefreq}</changefreq><priority>${priority}</priority></url>`;
}));
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`;
fs.writeFileSync(path.join(root, "public", "sitemap.xml"), sitemap);
console.log(`SEO files generated for ${siteUrl}`);
