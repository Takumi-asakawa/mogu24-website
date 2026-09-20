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
  salePrice?: number;
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
  hero: { eyebrow: "八王子で、まだ知らない「おいしい」に出会う。", title: "DISCOVER GREAT FOOD", lead: "24時間、好きな時間に。\n日本と世界の美味しさを。", body: "日本各地の名物から世界のローカルフードまで。八王子で、気軽に持ち帰れる冷凍食品ストアです。", productsCta: "商品一覧を見る", storeCta: "店舗情報を見る" },
  features: [
    ["24時間営業", "いつでも好きな時間に立ち寄れます。"],
    ["日本・世界のおいしさ", "ご当地グルメと世界の味を厳選。"],
    ["冷凍で美味しさキープ", "美味しさと品質をそのままお届け。"],
    ["キャッシュレス決済", "スムーズで便利なお買い物。"]
  ],
  sections: { categories: "おすすめカテゴリー", categoriesLead: "今日は何を食べたい？ 写真から気になる一品を探せます。", new: "新商品", newLead: "入荷したばかりの味を、いち早くチェック。", weekly: "今週のおすすめ", about: "MOGU24について", store: "店舗情報", news: "NEWS", faq: "FAQ", allProducts: "すべての商品を見る", allNew: "すべての新商品を見る" },
  weekly: { title: "日本のご当地グルメから、世界の味まで。", body: "今食べたい一品をMOGU24が厳選。旅をしなくても、新しい食との出会いを。", cta: "特集を見る" },
  about: {
    lead: "世界中のおいしさを、もっと手軽に。いつでも。",
    iconicTitle: "世界中のおいしさを、\nもっと身近に。",
    seoLine: "八王子の24時間営業 冷凍食品専門店 MOGU24（モグ24）",
    body: "日本各地の名物や世界のごちそうを、24時間いつでも気軽に選べる。MOGU24は、八王子で新しいおいしさと出会える冷凍食品専門店です。",
    cta: "商品を見てみる",
    brandBody: "遠くへ出かけなくても、冷凍庫を開けば新しい味に出会える。仕事帰りも、夜中も、休日の朝も。食べたいと思ったその時に、世界の美味しさをもっと身近に楽しめる場所を目指しています。",
    promise: "おいしそう、行ってみたい。そう思えるシンプルな体験を、いつでも。",
    badge: "冷凍だから、いつでもおいしい。",
    chips: ["八王子", "24時間営業", "冷凍食品専門店", "日本＆世界の美味しさ"],
    visualLabel: "WORLD FLAVORS / HACHIOJI",
    visualMessage: "FROZEN FOOD. READY ANYTIME.",
    productsCta: "商品一覧を見る",
    storeCta: "店舗情報を見る"
  },
  howHome: { lead: "はじめてでも、かんたん。", intro: "24時間、好きなタイミングで。気になる冷凍食品を選んで、そのまま持ち帰れます。", steps: ["24時間、好きな時間に。仕事帰りでも、朝でも、深夜でも。", "日本各地と世界から集めたおいしさを、冷凍庫から自由に選べます。", "店内の決済機でスムーズに。キャッシュレスで気軽にお買い物。", "あとはご自宅へ。好きなタイミングで、おいしく楽しめます。"], unmanned: "無人営業", cashless: "キャッシュレス", openTitle: "「食べたい」と思った時が、買いどき。", openBody: "深夜でも、仕事帰りでも、休日の朝でも。MOGU24なら、自分のペースで気になる一品を探せます。", benefits: ["時間を気にせず立ち寄れる", "スタッフを待たずスムーズ", "買ってすぐ、そのまま持ち帰り"], storeCta: "店舗情報を見る", easyBadge: "かんたん4STEP" },
  store: { hours: "24時間営業", hoursNote: "朝でも夜でも、思い立った時に。", access: "京王八王子駅から徒歩圏内", body: "住所・決済方法・入店方法など、来店前に必要な情報をご案内します。", cta: "店舗の詳細を見る", invitation: "気になったら、好きな時間にMOGU24へ。", addressLabel: "住所", mapNote: "詳細住所はOPEN前に公開します", paymentTitle: "キャッシュレス決済", paymentBody: "対応ブランドはOPEN前にご案内します。", mapCta: "Google Mapで見る" },
  contact: { title: "MOGU24とつながる", phone: "電話する", instagram: "Instagram", line: "LINE公式" },
  footer: { privacy: "プライバシーポリシー", terms: "利用規約", legal: "特定商取引法に基づく表記", contact: "お問い合わせ" },
  productsPage: { title: "商品一覧", subtitle: "PRODUCTS", lead: "日本全国と世界各地から集めた冷凍食品をご紹介。", all: "すべて", count: "件の商品", sort: "並び替え", recommended: "おすすめ順", newest: "新着順", newLabel: "NEW", recommendedLabel: "おすすめ", tax: "税込", newOnly: "新商品のみ表示しています" },
  howPage: { noteTitle: "電話注文・配送について", noteBody: "受付方法・配送範囲などは、サービス開始・変更に合わせてこちらで最新情報をご案内します。" },
  newsPage: { readMore: "詳細を見る" },
  legalPages: { privacyBody: "公開前に正式なプライバシーポリシーへ差し替えてください。", termsBody: "公開前に正式な利用規約へ差し替えてください。", legalBody: "電話注文・配送等の運用内容に応じて、必要な事業者情報を掲載してください。" }
};

const zh = {
  ...ja,
  languageName: "中文(简体)",
  nav: { home: "首页", products: "商品一览", new: "新品", about: "关于 MOGU24", how: "购买方式", store: "店铺信息", news: "通知", faq: "常见问题" },
  hero: { eyebrow: "在八王子，遇见还没尝过的美味。", title: "DISCOVER GREAT FOOD", lead: "24小时，想来就来。\n把日本与世界的美味带回家。", body: "从日本各地名物到世界各地的特色料理，在八王子就能轻松带回家的冷冻食品专门店。", productsCta: "查看商品", storeCta: "查看店铺信息" },
  features: [["24小时营业", "无论早晚，随时都能来。"], ["日本与世界美食", "精选日本各地名物与世界风味。"], ["冷冻保留美味", "把美味与品质好好保存。"], ["支持无现金支付", "结账简单、快捷、方便。"]],
  sections: { categories: "推荐分类", categoriesLead: "今天想吃什么？从照片开始寻找想尝的味道。", new: "新品", newLead: "第一时间看看刚刚到店的新口味。", weekly: "本周推荐", about: "关于 MOGU24", store: "店铺信息", news: "NEWS", faq: "FAQ", allProducts: "查看全部商品", allNew: "查看全部新品" },
  weekly: { title: "从日本地方名物，到世界各地的风味。", body: "MOGU24精选此刻值得一试的一品。不用旅行，也能遇见新的美味。", cta: "查看推荐" },
  about: {
    lead: "把世界的美味，带得更近。随时都可以。",
    iconicTitle: "把世界的美味，\n带得更近。",
    seoLine: "八王子24小时营业的冷冻食品专门店 MOGU24",
    body: "日本各地名物与世界风味，都能在这里轻松找到。MOGU24是八王子24小时营业的冷冻食品专门店，让想吃的美味随时在身边。",
    cta: "看看商品",
    brandBody: "不用去很远的地方，打开冷冻柜也能遇见新的味道。下班后、深夜、周末早晨，想吃的时候就能轻松挑选，把世界各地的美味带回家。",
    promise: "简单、好看、让人想去店里看看。",
    badge: "冷冻保存，随时都好吃。",
    chips: ["八王子", "24小时营业", "冷冻食品专门店", "日本与世界美食"],
    visualLabel: "WORLD FLAVORS / HACHIOJI",
    visualMessage: "FROZEN FOOD. READY ANYTIME.",
    productsCta: "查看商品",
    storeCta: "查看店铺信息"
  },
  howHome: { lead: "第一次来，也很简单。", intro: "24小时，想来就来。挑选喜欢的冷冻食品，轻松结账后直接带回家。", steps: ["24小时开放。下班后、早晨或深夜，按自己的时间来。", "从日本各地与世界风味中，挑选当下最想吃的一品。", "使用店内支付设备快速结账，无现金支付更轻松。", "直接带回家，在喜欢的时间享受美味。"], unmanned: "无人营业", cashless: "无现金支付", openTitle: "想吃的时候，就是来逛的时候。", openBody: "深夜、下班后、周末早晨都可以。MOGU24让你按照自己的节奏发现下一份美味。", benefits: ["不受时间限制，随时可来", "无需等待店员，购物更顺畅", "买完直接带回家"], storeCta: "查看店铺信息", easyBadge: "轻松4步" },
  store: { hours: "24小时营业", hoursNote: "早上、深夜，想来的时候就来。", access: "从京王八王子站步行可达", body: "来店前可确认地址、支付方式与购买方法等信息。", cta: "查看店铺详情", invitation: "发现想吃的，就来 MOGU24 看看。", addressLabel: "地址", mapNote: "详细地址将在开业前公布", paymentTitle: "支持无现金支付", paymentBody: "支持品牌将在开业前公布。", mapCta: "在 Google 地图中查看" },
  contact: { title: "关注 MOGU24", phone: "电话联系", instagram: "Instagram", line: "LINE官方" },
  footer: { privacy: "隐私政策", terms: "使用条款", legal: "特定商业交易法标示", contact: "联系我们" },
  productsPage: { title: "商品一览", subtitle: "PRODUCTS", lead: "为您介绍来自日本各地与世界各地的精选冷冻食品。", all: "全部", count: "件商品", sort: "排序", recommended: "推荐顺序", newest: "最新", newLabel: "NEW", recommendedLabel: "推荐", tax: "含税", newOnly: "当前仅显示新品" },
  howPage: { noteTitle: "电话订购与配送", noteBody: "订购方式与配送范围将根据实际服务情况，在这里持续更新。" },
  newsPage: { readMore: "查看详情" },
  legalPages: { privacyBody: "正式发布前请替换为正式隐私政策。", termsBody: "正式发布前请替换为正式使用条款。", legalBody: "请根据电话订购、配送等实际业务内容刊载必要的经营者信息。" }
};

const en = {
  ...ja,
  languageName: "English",
  nav: { home: "Home", products: "Products", new: "New", about: "About MOGU24", how: "How to Buy", store: "Store", news: "News", faq: "FAQ" },
  hero: { eyebrow: "Discover a new favorite in Hachioji.", title: "DISCOVER GREAT FOOD", lead: "Open 24 hours.\nTaste Japan and the world, anytime.", body: "A frozen food store in Hachioji where regional Japanese dishes and global favorites are easy to take home.", productsCta: "View Products", storeCta: "Store Information" },
  features: [["Open 24 Hours", "Drop in whenever it suits you."], ["Flavors from Japan & Beyond", "Regional favorites and global specialties."], ["Frozen for Quality", "Great taste and quality, preserved."], ["Cashless Payment", "Fast and convenient checkout."]],
  sections: { categories: "Selected Categories", categoriesLead: "What are you in the mood for? Start with a photo and find your next favorite.", new: "New Arrivals", newLead: "Be among the first to discover what just arrived.", weekly: "This Week's Picks", about: "About MOGU24", store: "Store Information", news: "NEWS", faq: "FAQ", allProducts: "View All Products", allNew: "View All New Items" },
  weekly: { title: "Regional Japanese favorites and flavors from around the world.", body: "MOGU24 curates food worth discovering, so a new taste can become part of everyday life.", cta: "See This Week's Picks" },
  about: {
    lead: "Great food from around the world. Closer, easier, anytime.",
    iconicTitle: "World flavors,\ncloser to home.",
    seoLine: "MOGU24 — a 24-hour frozen food specialty store in Hachioji, Tokyo",
    body: "MOGU24 is a 24-hour frozen food specialty store in Hachioji, bringing together regional Japanese dishes and global favorites that are easy to pick up and enjoy at home.",
    cta: "Explore Products",
    brandBody: "You do not have to travel far to discover a new flavor. After work, late at night or on a quiet weekend morning, open the freezer and bring home something new from Japan or beyond.",
    promise: "Simple, inviting and exciting enough to make you want to stop by.",
    badge: "Frozen for quality. Ready when you are.",
    chips: ["Hachioji", "Open 24 Hours", "Frozen Food Specialty Store", "Japan & World Flavors"],
    visualLabel: "WORLD FLAVORS / HACHIOJI",
    visualMessage: "FROZEN FOOD. READY ANYTIME.",
    productsCta: "View Products",
    storeCta: "Store Information"
  },
  howHome: { lead: "Simple, even on your first visit.", intro: "Open 24 hours, so you can browse at your own pace, choose what looks good, pay quickly and take it home.", steps: ["Come whenever it suits you — after work, early in the morning or late at night.", "Explore regional Japanese favorites and global specialties in the freezers.", "Check out quickly at the in-store payment terminal with cashless payment.", "Take it home and enjoy it whenever you are ready."], unmanned: "Unmanned store", cashless: "Cashless", openTitle: "When you feel like good food, it is a good time to stop by.", openBody: "Late at night, after work or on a slow weekend morning. MOGU24 lets you browse on your own time.", benefits: ["Drop in any time, 24 hours a day", "No waiting for staff", "Take your picks straight home"], storeCta: "Store Information", easyBadge: "4 EASY STEPS" },
  store: { hours: "Open 24 Hours", hoursNote: "Morning or late at night — come when you want.", access: "Walking distance from Keio-Hachioji Station", body: "Check access, payment methods and how to use the store before your visit.", cta: "View Store Details", invitation: "See something tempting? Drop by MOGU24 anytime.", addressLabel: "Address", mapNote: "The full address will be announced before opening", paymentTitle: "Cashless Payment", paymentBody: "Supported payment brands will be announced before opening.", mapCta: "Open in Google Maps" },
  contact: { title: "Connect with MOGU24", phone: "Call Us", instagram: "Instagram", line: "LINE" },
  footer: { privacy: "Privacy Policy", terms: "Terms", legal: "Commercial Disclosure", contact: "Contact" },
  productsPage: { title: "Products", subtitle: "PRODUCTS", lead: "Explore frozen foods selected from across Japan and around the world.", all: "All", count: "products", sort: "Sort", recommended: "Recommended", newest: "Newest", newLabel: "NEW", recommendedLabel: "Recommended", tax: "tax incl.", newOnly: "Showing new arrivals only" },
  howPage: { noteTitle: "Phone Orders & Delivery", noteBody: "Ordering methods and delivery areas will be kept up to date here as the service evolves." },
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
