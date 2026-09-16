import fs from "node:fs";

const read = (file) => JSON.parse(fs.readFileSync(file, "utf8"));
const products = read("content/products.json");
const categories = read("content/categories.json");
const news = read("content/news.json");
const faqs = read("content/faqs.json");

function unique(items, key, label) {
  const values = items.map((item) => item[key]);
  const duplicates = values.filter((value, i) => values.indexOf(value) !== i);
  if (duplicates.length) throw new Error(`${label}: duplicate ${key}: ${[...new Set(duplicates)].join(", ")}`);
}
function localized(value, label) {
  for (const lang of ["ja", "zh", "en"]) if (!value?.[lang]) throw new Error(`${label}: missing ${lang}`);
}

unique(products, "id", "products");
unique(categories, "key", "categories");
unique(news, "id", "news");
unique(faqs, "id", "faqs");
const categoryKeys = new Set(categories.map((item) => item.key));
for (const p of products) {
  if (!categoryKeys.has(p.category)) throw new Error(`product ${p.id}: unknown category ${p.category}`);
  if (!Number.isFinite(p.price) || p.price < 0) throw new Error(`product ${p.id}: invalid price`);
  localized(p.name, `product ${p.id}.name`);
  if (p.description) localized(p.description, `product ${p.id}.description`);
  if (p.award?.enabled) {
    localized(p.award.title, `product ${p.id}.award.title`);
    if (p.highlights && !Array.isArray(p.highlights)) throw new Error(`product ${p.id}.highlights: must be an array`);
    if ((p.highlights?.length ?? 0) > 3) throw new Error(`product ${p.id}.highlights: max 3 items`);
    for (const [index, item] of (p.highlights ?? []).entries()) {
      localized(item.title, `product ${p.id}.highlights[${index}].title`);
      localized(item.text, `product ${p.id}.highlights[${index}].text`);
    }
  }
}
for (const item of categories) localized(item.name, `category ${item.key}.name`);
for (const item of news) { localized(item.title, `news ${item.id}.title`); localized(item.body, `news ${item.id}.body`); }
for (const item of faqs) { localized(item.question, `faq ${item.id}.question`); localized(item.answer, `faq ${item.id}.answer`); }
console.log("MOGU24 content validation: OK");
