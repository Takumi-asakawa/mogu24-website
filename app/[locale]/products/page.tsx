import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import ProductsBrowser from "@/components/ProductsBrowser";
import { categories, getDictionary, isLocale, products } from "@/data/site";
import { absoluteUrl, languageAlternates, seoCopy } from "@/data/seo";

const productsHeroImage = "/media/products-header-all.webp";

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
      <section className="page-hero" style={{ position: "relative", minHeight: 280, overflow: "hidden" }}>
        <Image
          src={productsHeroImage}
          alt={heroAlt}
          fill
          priority
          className="cover"
          style={{ objectPosition: "center" }}
          sizes="100vw"
        />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(90deg, rgba(7,31,58,.98) 0%, rgba(7,31,58,.90) 34%, rgba(7,31,58,.18) 58%, rgba(7,31,58,0) 78%)"
          }}
        />
        <div className="shell" style={{ position: "relative", minHeight: 280, display: "flex", alignItems: "center" }}>
          <div style={{ padding: "48px 0", maxWidth: 520 }}>
            <h1>{d.productsPage.title}</h1>
            <span>{d.productsPage.subtitle}</span>
            <p>{productLead}</p>
          </div>
        </div>
      </section>
      <section className="section shell"><ProductsBrowser products={products} categories={categories} locale={locale} labels={productLabels}/></section>
    </>
  );
}
