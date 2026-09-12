import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (p) => fs.readFileSync(path.join(root, p), "utf8");
const json = (p) => JSON.parse(read(p));
const failures = [];
const warnings = [];
const pass = (ok, message) => { if (!ok) failures.push(message); };

const home = read("app/[locale]/page.tsx");
const header = read("components/Header.tsx");
const mobile = read("components/MobileMenu.tsx");
const dataFile = read("data/site.ts");

const seoFile = read("data/seo.ts");
const rootLayout = read("app/layout.tsx");
const productsPage = read("app/[locale]/products/page.tsx");
const slugPage = read("app/[locale]/[slug]/page.tsx");

for (const id of ["top", "new", "about", "how-to-use", "store"]) {
  pass(home.includes(`id=\"${id}\"`), `Home section #${id} is missing.`);
}
for (const anchor of ["#about", "#how-to-use", "#store"]) {
  pass(header.includes(anchor), `Desktop header does not link to ${anchor}.`);
  pass(mobile.includes(anchor), `Mobile menu does not link to ${anchor}.`);
}
pass(home.includes("/images/generated/hero-store.webp"), "High-resolution generated hero image is not used.");
pass(home.includes("how-flow"), "Iconic HOW TO USE flow is missing.");
pass(home.includes("how-brand-panel"), "HOW TO USE 24-hour brand panel is missing.");
pass(home.includes("HowStepIcon"), "HOW TO USE custom step icons are missing.");
pass(dataFile.includes('openTitle: "「食べたい」と思った時が、買いどき。"'), "Japanese HOW TO USE brand copy is missing.");
pass(dataFile.includes('openTitle: "想吃的时候，就是来逛的时候。"'), "Chinese HOW TO USE brand copy is missing.");
pass(dataFile.includes('openTitle: "When you feel like good food, it is a good time to stop by."'), "English HOW TO USE brand copy is missing.");
pass(dataFile.includes('lead: "Open 24 hours.\\nTaste Japan and the world, anytime."'), "English hero line break/copy changed unexpectedly.");

pass(home.includes("about-home-v4"), "Iconic ABOUT MOGU24 v4 section is missing.");
pass(home.includes("about-iconic-title"), "ABOUT MOGU24 iconic headline is missing.");
pass(home.includes("StructuredData"), "LocalBusiness/WebSite structured data component is missing from home.");
pass(home.includes('"@type": "Store"'), "Store structured data is missing.");
pass(dataFile.includes("八王子の24時間営業 冷凍食品専門店 MOGU24（モグ24）"), "Japanese local SEO copy is missing from ABOUT.");
pass(seoFile.includes("MOGU24（モグ24）｜八王子の24時間営業 冷凍食品専門店"), "Japanese SEO title is missing.");
pass(seoFile.includes("24-Hour Frozen Food Store in Hachioji"), "English SEO title is missing.");
pass(productsPage.includes("generateMetadata"), "Products page metadata is missing.");
pass(slugPage.includes("generateMetadata"), "Content page metadata is missing.");
pass(rootLayout.includes("NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION"), "Search Console verification hook is missing.");
pass(fs.existsSync(path.join(root, "public", "robots.txt")), "robots.txt is missing.");
pass(fs.existsSync(path.join(root, "public", "sitemap.xml")), "sitemap.xml is missing.");
pass(read("public/robots.txt").includes("Disallow: /admin/"), "robots.txt does not block /admin/.");
pass(read("public/sitemap.xml").includes("/ja/products/"), "sitemap.xml does not include Japanese products page.");
const faqContent = read("content/faqs.json");
pass(faqContent.includes("八王子のMOGU24は24時間いつでも購入できますか？"), "Local-intent FAQ copy is missing.");

for (const file of ["content/products.json", "content/categories.json"]) {
  for (const item of json(file)) {
    const image = item.image;
    const diskPath = path.join(root, "public", image.replace(/^\//, ""));
    pass(Boolean(image) && fs.existsSync(diskPath), `${file}: missing image for ${item.id || item.key}: ${image}`);
    if (image.includes("/images/prod-") || image.includes("/images/cat-")) warnings.push(`${file}: ${item.id || item.key} still references a legacy low-resolution path.`);
    for (const lang of ["ja", "zh", "en"]) pass(Boolean(item.name?.[lang]?.trim()), `${file}: ${item.id || item.key} missing ${lang} name.`);
  }
}

for (const file of ["content/news.json", "content/faqs.json"]) {
  for (const item of json(file)) {
    const fields = file.includes("news") ? ["title", "body"] : ["question", "answer"];
    for (const field of fields) for (const lang of ["ja", "zh", "en"]) pass(Boolean(item[field]?.[lang]?.trim()), `${file}: ${item.id} missing ${field}.${lang}.`);
  }
}

const site = json("content/site.json");
if (!site.store.phone) warnings.push("Store phone number is still empty.");
for (const key of ["instagram", "line", "mapUrl"]) if (!site.store[key] || site.store[key] === "#") warnings.push(`Store ${key} is still a placeholder.`);

if (failures.length) {
  console.error("MOGU24 QA: FAILED");
  failures.forEach((x) => console.error(`  ✗ ${x}`));
  process.exit(1);
}
console.log("MOGU24 QA: PASS");
console.log("  ✓ Home anchors: About / How to Buy / Store");
console.log("  ✓ Desktop + mobile navigation uses home-section anchors");
console.log("  ✓ Referenced product/category images exist");
console.log("  ✓ JA / ZH / EN content fields are present");
console.log("  ✓ Iconic HOW TO USE flow + 24-hour brand panel are present");
console.log("  ✓ Iconic ABOUT MOGU24 brand section is present");
console.log("  ✓ Local SEO metadata / structured data / robots / sitemap are present");
if (warnings.length) {
  console.log("MOGU24 QA: launch-data warnings");
  warnings.forEach((x) => console.log(`  ! ${x}`));
}
