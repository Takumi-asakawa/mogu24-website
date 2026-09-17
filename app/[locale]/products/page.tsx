import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import ProductsBrowser from "@/components/ProductsBrowser";
import { categories, getDictionary, isLocale, products } from "@/data/site";
import { absoluteUrl, languageAlternates, seoCopy } from "@/data/seo";

const productsHeroImages = [
  "/media/chatgpt-image-2026916-201223-2.png",
  "/media/chatgpt-image-2026916-201222-1.png",
  "/media/chatgpt-image-2026916-185641-6.png",
  "/media/chatgpt-image-2026916-190630-4-1-1.png"
];
const productsHeroImage = productsHeroImages[0];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const seo = seoCopy[locale];
  return {
    title: { absolute: seo.productsTitle },
    description: seo.productsDescription,
    alternates: { canonical: absoluteUrl(`/${locale}/products/`), languages: languageAlternates("products") },
    openGraph: {
      title: seo.productsTitle,
      description: seo.productsDescription,
      url: absoluteUrl(`/${locale}/products/`),
      siteName: "MOGU24",
      locale: locale === "zh" ? "zh_CN" : locale === "en" ? "en_US" : "ja_JP",
      type: "website",
      images: [{ url: absoluteUrl(productsHeroImage), alt: seo.ogAlt }]
    },
    twitter: { card: "summary_large_image", title: seo.productsTitle, description: seo.productsDescription, images: [absoluteUrl(productsHeroImage)] }
  };
}

export default async function ProductsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDictionary(locale);
  const heroAlt = locale === "ja"
    ? "MOGU24で販売する厳選冷凍食品のラインアップ"
    : locale === "zh"
      ? "MOGU24严选冷冻食品商品阵容"
      : "Selected frozen foods available at MOGU24";
  const productLead = locale === "ja"
    ? "世界と日本の厳選冷凍食品をご紹介"
    : locale === "zh"
      ? "为您介绍来自世界与日本的严选冷冻食品"
      : "Discover carefully selected frozen foods from Japan and around the world";
  const productLabels = {
    ...d.productsPage,
    newLabel: "SALE",
    newOnly: locale === "ja" ? "セール商品のみ表示しています" : locale === "zh" ? "当前仅显示特价商品" : "Showing sale items only"
  };

  return (
    <>
      <section className="page-hero" style={{ position: "relative", minHeight: 280, overflow: "hidden", background: "#071f3a" }}>
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            width: "48%",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "1fr 1fr",
            gap: 2,
            background: "#071f3a"
          }}
        >
          {productsHeroImages.map((src, index) => (
            <div key={src} style={{ position: "relative", minWidth: 0, minHeight: 0, overflow: "hidden" }}>
              <Image
                src={src}
                alt=""
                fill
                priority={index === 0}
                sizes="24vw"
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
            </div>
          ))}
        </div>
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(90deg, rgba(7,31,58,1) 0%, rgba(7,31,58,.98) 46%, rgba(7,31,58,.86) 53%, rgba(7,31,58,0) 66%)"
          }}
        />
        <div className="shell" style={{ position: "relative", minHeight: 280, display: "flex", alignItems: "center" }}>
          <div style={{ padding: "48px 0", maxWidth: 520 }}>
            <h1>{d.productsPage.title}</h1>
            <span>{d.productsPage.subtitle}</span>
            <p>{productLead}</p>
          </div>
        </div>
        <span className="sr-only">{heroAlt}</span>
      </section>
      <section className="section shell"><ProductsBrowser products={products} categories={categories} locale={locale} labels={productLabels}/></section>
    </>
  );
}
