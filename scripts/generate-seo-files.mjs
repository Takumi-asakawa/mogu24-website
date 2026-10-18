import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://mogu24-website.pages.dev").replace(/\/$/, "");
const locales = ["ja", "zh", "en"];
// Only canonical, indexable routes. Legacy routes /about and /how-to-use
// and policy/contact pages are intentionally excluded because they are noindex.
const pages = ["", "products/", "store/", "news/", "faq/"];

if (!siteUrl.startsWith("https://")) {
  throw new Error("NEXT_PUBLIC_SITE_URL must be an https:// URL");
}

const products = JSON.parse(fs.readFileSync(path.join(root, "content", "products.json"), "utf8"))
  .filter((item) => item.published === true && typeof item.id === "string" && item.id.length);

const locations = locales.flatMap((locale) => [
  ...pages.map((p) => `${siteUrl}/${locale}/${p}`),
  ...products.map((p) => `${siteUrl}/${locale}/products/${encodeURIComponent(p.id)}/`)
]);

const escapeXml = (text) => text
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;")
  .replace(/'/g, "&apos;");

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${locations.map((url) => `  <url><loc>${escapeXml(url)}</loc></url>`).join("\n")}\n</urlset>\n`;
fs.writeFileSync(path.join(root, "public", "sitemap.xml"), xml, "utf8");
fs.writeFileSync(path.join(root, "public", "sitemap.txt"), `${locations.join("\n")}\n`, "utf8");

const robots = `User-agent: *\nAllow: /\nDisallow: /admin/\n\nSitemap: ${siteUrl}/sitemap.xml\n`;
fs.writeFileSync(path.join(root, "public", "robots.txt"), robots, "utf8");
console.log(`SEO files generated: ${locations.length} canonical URLs across ${locales.length} locales and ${products.length} products.`);
