import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import ProductsBrowser from "@/components/ProductsBrowser";
import { categories, getDictionary, isLocale, products } from "@/data/site";
import { absoluteUrl, languageAlternates, seoCopy } from "@/data/seo";

const productsHeroImage = "/images/products-header-all.png.png";

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
  const heroAlt = seoCopy[locale].ogAlt;
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
      <section
        className="page-hero"
        style={{
          position: "relative",
          minHeight: 360,
          overflow: "hidden",
          background: "#071f3a"
        }}
      >
        <Image
          src={productsHeroImage}
          alt={heroAlt}
          fill
          priority
          quality={95}
          sizes="100vw"
          style={{
            objectFit: "cover",
            objectPosition: "center"
          }}
        />

        <div
          className="shell"
          style={{
            position: "relative",
            zIndex: 2,
            minHeight: 360,
            display: "flex",
            alignItems: "center"
          }}
        >
          <div
            style={{
              padding: "48px 0",
              maxWidth: 520
            }}
          >
            <h1>{d.productsPage.title}</h1>
            <span>{d.productsPage.subtitle}</span>
            <p>{productLead}</p>
          </div>
        </div>
      </section>
      <section className="section shell">
        <ProductsBrowser products={products} categories={categories} locale={locale} labels={productLabels} />
      </section>
    </>
  );
}
