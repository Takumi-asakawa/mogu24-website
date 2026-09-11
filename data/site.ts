import productsJson from "@/content/products.json";
import categoriesJson from "@/content/categories.json";
import newsJson from "@/content/news.json";
import faqsJson from "@/content/faqs.json";
import siteJson from "@/content/site.json";

export const locales = ["ja", "zh", "en"] as const;
export type Locale = (typeof locales)[number];
export type CategoryKey = "noodles" | "dimsum" | "meat" | "rice" | "desserts" | "drinks";
export type LocalizedText = Record<Locale, string>;

export type Product = {
  id: string;
  image: string;
  category: CategoryKey;
  price: number;
  isNew: boolean;
  recommended: boolean;
  published: boolean;
  order: number;
  name: LocalizedText;
};

export type Category = {
  key: CategoryKey;
  image: string;
  published: boolean;
  order: number;
  name: LocalizedText;
  subtitle: string;
};

export type NewsItem = {
  id: string;
  date: string;
  type: string;
  published: boolean;
  order: number;
  title: LocalizedText;
  body: LocalizedText;
};

export type FaqItem = {
  id: string;
  published: boolean;
  order: number;
  question: LocalizedText;
  answer: LocalizedText;
};

export const products = (productsJson as Product[])
  .filter((item) => item.published)
  .sort((a, b) => a.order - b.order);

export const categories = (categoriesJson as Category[])
  .filter((item) => item.published)
  .sort((a, b) => a.order - b.order);

export const news = (newsJson as NewsItem[])
  .filter((item) => item.published)
  .sort((a, b) => a.order - b.order);

export const faqs = (faqsJson as FaqItem[])
  .filter((item) => item.published)
  .sort((a, b) => a.order - b.order);

export const siteSettings = siteJson;

const ja = {
  languageName: "日本語",
  nav: { home: "ホーム", products: "商品一覧", new: "新商品", about: "MOGU24について", how: "ご利用方法", store: "店舗情報", news: "お知らせ", faq: "よくある質問" },
  hero: { eyebrow: "食でつながる、もっと豊かな毎日を。", title: "DISCOVER GREAT FOOD", lead: "24時間、いつでも\n新しい美味しさに出会える。", body: "日本全国と世界各地から厳選した冷凍食品専門店。", productsCta: "商品一覧を見る", storeCta: "店舗情報を見る" },
  features: [
    ["24時間営業", "いつでも好きな時に美味しい食を。"],
    ["日本・世界のおいしさ", "全国のご当地グルメから世界の味まで厳選。"],
    ["冷凍で美味しさキープ", "美味しさと品質をそのままお届け。"],
    ["キャッシュレス決済", "スムーズで便利なお買い物。"]
  ],
  sections: { categories: "おすすめカテゴリー", new: "新商品", weekly: "今週のおすすめ", about: "MOGU24について", store: "店舗情報", news: "NEWS", faq: "FAQ", allProducts: "すべての商品を見る", allNew: "すべての新商品を見る" },
  weekly: { title: "日本のご当地グルメから、世界の味まで。", body: "今食べたい一品をMOGU24が厳選。旅をしなくても、新しい食との出会いを。", cta: "特集を見る" },
  about: { lead: "旅をしなくても、まだ知らない美味しさに出会える。", body: "MOGU24は、日本全国のご当地グルメや世界各地の味を集めた、24時間営業の冷凍食品専門店です。", cta: "詳しく見る", brandBody: "地域に根付いた名物や世界の食文化を、日常の食卓でも気軽に発見できる場所を目指します。" },
  store: { hours: "24時間営業", access: "京王八王子駅から徒歩圏内", body: "住所・決済方法・入店方法など、来店前に必要な情報をご案内します。", cta: "店舗の詳細を見る", addressLabel: "住所", mapNote: "正式住所確定後に地図を設定" },
  contact: { title: "MOGU24とつながる", phone: "電話する", instagram: "Instagram", line: "LINE公式" },
  footer: { privacy: "プライバシーポリシー", terms: "利用規約", legal: "特定商取引法に基づく表記", contact: "お問い合わせ" },
  productsPage: { title: "商品一覧", subtitle: "PRODUCTS", lead: "日本全国と世界各地から集めた冷凍食品をご紹介。", all: "すべて", count: "件の商品", sort: "並び替え", recommended: "おすすめ順", newest: "新着順", newLabel: "NEW", recommendedLabel: "おすすめ", tax: "税込" },
  howPage: { noteTitle: "電話注文・配送について", noteBody: "受付方法・配送範囲などは、運用内容に合わせてPages CMSから更新できます。" },
  newsPage: { readMore: "詳細を見る" },
  legalPages: { privacyBody: "公開前に正式なプライバシーポリシーへ差し替えてください。", termsBody: "公開前に正式な利用規約へ差し替えてください。", legalBody: "電話注文・配送等の運用内容に応じて、必要な事業者情報を掲載してください。" }
};

const zh = {
  ...ja,
  languageName: "中文(简体)",
  nav: { home: "首页", products: "商品一览", new: "新品", about: "关于MOGU24", how: "购买方式", store: "店铺信息", news: "通知", faq: "常见问题" },
  hero: { eyebrow: "用美食连接更丰富的每一天。", title: "DISCOVER GREAT FOOD", lead: "24小时，随时发现\n新的美味。", body: "精选日本各地与世界各地特色美食的冷冻食品专门店。", productsCta: "查看商品", storeCta: "查看店铺信息" },
  features: [["24小时营业", "随时都能购买喜欢的美食。"], ["日本・世界美食", "精选各地特色与世界风味。"], ["冷冻锁住美味", "保持美味与品质。"], ["无现金支付", "简单、快捷、方便。"]],
  sections: { categories: "推荐分类", new: "新品", weekly: "本周推荐", about: "关于MOGU24", store: "店铺信息", news: "NEWS", faq: "FAQ", allProducts: "查看全部商品", allNew: "查看全部新品" },
  weekly: { title: "从日本地方名物到世界风味。", body: "MOGU24精选此刻最想吃的一品。不用旅行，也能遇见新的美味。", cta: "查看推荐" },
  about: { lead: "不用旅行，也能遇见还不知道的美味。", body: "MOGU24是一家24小时营业的冷冻食品专门店，汇集日本各地名物与世界特色美食。", cta: "了解更多", brandBody: "我们希望把日本各地的代表美食与世界饮食文化带到日常餐桌，让发现美味变得更轻松。" },
  store: { hours: "24小时营业", access: "从京王八王子站步行可达", body: "来店前可确认地址、支付方式与购买方法等信息。", cta: "查看店铺详情", addressLabel: "地址", mapNote: "正式地址确定后设置地图" },
  contact: { title: "关注MOGU24", phone: "电话联系", instagram: "Instagram", line: "LINE官方" },
  footer: { privacy: "隐私政策", terms: "使用条款", legal: "特定商业交易法标示", contact: "联系我们" },
  productsPage: { title: "商品一览", subtitle: "PRODUCTS", lead: "为您介绍来自日本各地与世界各地的精选冷冻食品。", all: "全部", count: "件商品", sort: "排序", recommended: "推荐顺序", newest: "最新", newLabel: "NEW", recommendedLabel: "推荐", tax: "含税" },
  howPage: { noteTitle: "电话订购与配送", noteBody: "订购方式与配送范围可根据实际运营情况通过Pages CMS更新。" },
  newsPage: { readMore: "查看详情" },
  legalPages: { privacyBody: "正式发布前请替换为正式隐私政策。", termsBody: "正式发布前请替换为正式使用条款。", legalBody: "请根据电话订购、配送等实际业务内容刊载必要的经营者信息。" }
};

const en = {
  ...ja,
  languageName: "English",
  nav: { home: "Home", products: "Products", new: "New", about: "About MOGU24", how: "How to Buy", store: "Store", news: "News", faq: "FAQ" },
  hero: { eyebrow: "Good food makes every day richer.", title: "DISCOVER GREAT FOOD", lead: "Open 24 hours.\nDiscover something delicious anytime.", body: "A frozen food specialty store curated from Japan and around the world.", productsCta: "View Products", storeCta: "Store Information" },
  features: [["Open 24 Hours", "Shop whenever it suits you."], ["Japan & World Flavors", "Regional favorites and global specialties."], ["Frozen for Quality", "Great taste and quality preserved."], ["Cashless Payment", "Fast and convenient checkout."]],
  sections: { categories: "Selected Categories", new: "New Arrivals", weekly: "This Week's Picks", about: "About MOGU24", store: "Store Information", news: "NEWS", faq: "FAQ", allProducts: "View All Products", allNew: "View All New Items" },
  weekly: { title: "Local Japanese favorites and flavors from around the world.", body: "MOGU24 curates food worth discovering, so new tastes can be part of everyday life.", cta: "See This Week's Picks" },
  about: { lead: "Discover flavors you didn't know, without taking a trip.", body: "MOGU24 is a 24-hour frozen food specialty store bringing together regional Japanese favorites and foods from around the world.", cta: "Learn More", brandBody: "We make regional Japanese specialties and global food culture easier to discover as part of everyday life." },
  store: { hours: "Open 24 Hours", access: "Walking distance from Keio-Hachioji Station", body: "Check access, payment methods and how to use the store before your visit.", cta: "View Store Details", addressLabel: "Address", mapNote: "Map will be added after the full address is finalized" },
  contact: { title: "Connect with MOGU24", phone: "Call Us", instagram: "Instagram", line: "LINE" },
  footer: { privacy: "Privacy Policy", terms: "Terms", legal: "Commercial Disclosure", contact: "Contact" },
  productsPage: { title: "Products", subtitle: "PRODUCTS", lead: "Explore frozen foods selected from across Japan and around the world.", all: "All", count: "products", sort: "Sort", recommended: "Recommended", newest: "Newest", newLabel: "NEW", recommendedLabel: "Recommended", tax: "tax incl." },
  howPage: { noteTitle: "Phone Orders & Delivery", noteBody: "Ordering methods and delivery areas can be updated through Pages CMS as operations evolve." },
  newsPage: { readMore: "Read More" },
  legalPages: { privacyBody: "Replace this placeholder with the final Privacy Policy before launch.", termsBody: "Replace this placeholder with the final Terms of Use before launch.", legalBody: "Publish the required business information based on your phone-order and delivery operations." }
};

export const dictionaries = { ja, zh, en };
export type Dictionary = typeof ja;

export function getDictionary(locale: string): Dictionary {
  return dictionaries[(locales.includes(locale as Locale) ? locale : "ja") as Locale] as Dictionary;
}

export function isLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export function localize(text: LocalizedText, locale: Locale) {
  return text[locale] || text.ja;
}
