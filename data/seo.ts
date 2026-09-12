import type { Locale } from "@/data/site";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://mogu24-website.pages.dev").replace(/\/$/, "");

export const seoCopy: Record<Locale, {
  homeTitle: string;
  homeDescription: string;
  productsTitle: string;
  productsDescription: string;
  newsTitle: string;
  newsDescription: string;
  faqTitle: string;
  faqDescription: string;
  ogAlt: string;
}> = {
  ja: {
    homeTitle: "MOGU24（モグ24）｜八王子の24時間営業 冷凍食品専門店",
    homeDescription: "MOGU24（モグ24）は東京都八王子市の24時間営業・無人の冷凍食品専門店。日本各地のご当地グルメや世界の美味しい冷凍食品を、好きな時間に手軽に選べます。",
    productsTitle: "商品一覧｜MOGU24（モグ24）八王子の24時間冷凍食品店",
    productsDescription: "八王子のMOGU24（モグ24）で取り扱う冷凍食品をご紹介。麺類、餃子・点心、惣菜、ご飯もの、スイーツなど、日本と世界の美味しい商品を24時間選べます。",
    newsTitle: "お知らせ｜MOGU24（モグ24）八王子の24時間冷凍食品店",
    newsDescription: "八王子の24時間営業 冷凍食品専門店MOGU24（モグ24）の新商品、再入荷、限定商品、店舗情報など最新のお知らせをご案内します。",
    faqTitle: "よくある質問｜MOGU24（モグ24）八王子・24時間営業",
    faqDescription: "MOGU24（モグ24）の営業時間、無人営業、支払い方法、商品の温め方、電話注文、配送など、八王子の店舗をご利用前によくある質問をまとめています。",
    ogAlt: "八王子の24時間営業 冷凍食品専門店 MOGU24（モグ24）の店舗"
  },
  zh: {
    homeTitle: "MOGU24｜八王子24小时营业的冷冻食品专门店",
    homeDescription: "MOGU24位于东京八王子，是一家24小时营业的冷冻食品专门店。精选日本各地名物与世界特色美食，随时都能轻松选购。",
    productsTitle: "商品一览｜MOGU24 八王子24小时冷冻食品店",
    productsDescription: "查看MOGU24在八王子提供的冷冻食品，包括面类、饺子与点心、熟食、米饭料理、甜点等日本与世界风味。",
    newsTitle: "最新消息｜MOGU24 八王子24小时冷冻食品店",
    newsDescription: "查看MOGU24新品、补货、限定商品、活动及八王子店铺的最新消息。",
    faqTitle: "常见问题｜MOGU24 八王子24小时营业",
    faqDescription: "了解MOGU24的24小时营业、无人店铺、支付方式、加热方法、电话订购与配送等常见问题。",
    ogAlt: "位于八王子的24小时冷冻食品专门店 MOGU24"
  },
  en: {
    homeTitle: "MOGU24 | 24-Hour Frozen Food Store in Hachioji, Tokyo",
    homeDescription: "MOGU24 is a 24-hour unmanned frozen food specialty store in Hachioji, Tokyo, featuring regional Japanese favorites and distinctive foods from around the world.",
    productsTitle: "Products | MOGU24 24-Hour Frozen Food Store in Hachioji",
    productsDescription: "Explore noodles, dumplings, deli dishes, rice meals, desserts and more at MOGU24, a 24-hour frozen food specialty store in Hachioji, Tokyo.",
    newsTitle: "News | MOGU24 24-Hour Frozen Food Store in Hachioji",
    newsDescription: "See new arrivals, restocks, limited products, events and store updates from MOGU24 in Hachioji, Tokyo.",
    faqTitle: "FAQ | MOGU24 24-Hour Frozen Food Store in Hachioji",
    faqDescription: "Answers about MOGU24 opening hours, unmanned shopping, cashless payment, heating instructions, phone orders and delivery in Hachioji.",
    ogAlt: "MOGU24 24-hour frozen food specialty store in Hachioji, Tokyo"
  }
};

export function absoluteUrl(path = "/") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

export function languageAlternates(pathSuffix = "") {
  const suffix = pathSuffix ? `/${pathSuffix.replace(/^\//, "").replace(/\/$/, "")}/` : "/";
  return {
    "ja-JP": absoluteUrl(`/ja${suffix}`),
    "zh-CN": absoluteUrl(`/zh${suffix}`),
    en: absoluteUrl(`/en${suffix}`),
    "x-default": absoluteUrl(`/ja${suffix}`)
  };
}
