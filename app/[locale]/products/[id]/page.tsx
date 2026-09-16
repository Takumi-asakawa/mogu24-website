import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, isLocale, locales, localize, products } from "@/data/site";
import type { LocalizedText, Product } from "@/data/site";
import { absoluteUrl } from "@/data/seo";
import styles from "./ProductDetail.module.css";

type ProductHighlight = {
  title: LocalizedText;
  text: LocalizedText;
};

type ProductDetailFields = {
  detailImage?: string;
  description?: LocalizedText;
  award?: {
    enabled?: boolean;
    title?: LocalizedText;
  };
  highlights?: ProductHighlight[];
};

type DetailProduct = Product & ProductDetailFields;

const ui = {
  ja: { back: "商品一覧に戻る", store: "店舗情報を見る", tax: "税込", award: "受賞歴" },
  zh: { back: "返回商品一览", store: "查看店铺信息", tax: "含税", award: "获奖经历" },
  en: { back: "Back to Products", store: "Store Information", tax: "tax incl.", award: "Award" }
} as const;

function getProduct(id: string) {
  return products.find((item) => item.id === id) as DetailProduct | undefined;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => products.map((product) => ({ locale, id: product.id })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; id: string }> }): Promise<Metadata> {
  const { locale, id } = await params;
  if (!isLocale(locale)) return {};
  const product = getProduct(id);
  if (!product) return {};

  const name = localize(product.name, locale);
  const description = product.description
    ? localize(product.description, locale)
    : locale === "ja"
      ? `${name}をMOGU24（モグ24）八王子でご紹介します。`
      : locale === "zh"
        ? `在八王子MOGU24了解${name}。`
        : `Discover ${name} at MOGU24 in Hachioji.`;
  const image = product.detailImage || product.image;

  return {
    title: { absolute: `${name}｜MOGU24（モグ24）` },
    description,
    alternates: {
      canonical: absoluteUrl(`/${locale}/products/${product.id}/`),
      languages: {
        "ja-JP": absoluteUrl(`/ja/products/${product.id}/`),
        "zh-CN": absoluteUrl(`/zh/products/${product.id}/`),
        en: absoluteUrl(`/en/products/${product.id}/`),
        "x-default": absoluteUrl(`/ja/products/${product.id}/`)
      }
    },
    openGraph: {
      title: `${name}｜MOGU24`,
      description,
      url: absoluteUrl(`/${locale}/products/${product.id}/`),
      siteName: "MOGU24",
      locale: locale === "zh" ? "zh_CN" : locale === "en" ? "en_US" : "ja_JP",
      type: "website",
      images: [{ url: absoluteUrl(image), alt: name }]
    }
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale, id } = await params;
  if (!isLocale(locale)) notFound();
  const product = getProduct(id);
  if (!product) notFound();

  const labels = ui[locale];
  const name = localize(product.name, locale);
  const description = product.description ? localize(product.description, locale) : "";
  const categoryData = categories.find((item) => item.key === product.category);
  const category = categoryData ? localize(categoryData.name, locale) : product.category;
  const image = product.detailImage || product.image;
  const showAward = Boolean(product.award?.enabled && product.award.title);
  const highlights = showAward ? (product.highlights ?? []).slice(0, 3) : [];

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={`shell ${styles.heroGrid}`}>
          <div className={styles.imagePanel}>
            <Image
              src={image}
              alt={name}
              fill
              priority
              className={styles.productImage}
              sizes="(max-width: 760px) 100vw, 55vw"
            />
          </div>

          <div className={styles.infoPanel}>
            <p className={styles.category}>{category}</p>
            <h1>{name}</h1>
            <p className={styles.price}>¥{product.price.toLocaleString()} <span>（{labels.tax}）</span></p>
            {description && <p className={styles.description}>{description}</p>}

            {showAward && (
              <section className={styles.awardSection} aria-label={labels.award}>
                <p className={styles.awardTitle}>{localize(product.award!.title!, locale)}</p>
                {highlights.length > 0 && (
                  <div className={styles.highlights}>
                    {highlights.map((item, index) => (
                      <div className={styles.highlight} key={`${product.id}-${index}`}>
                        <strong>{localize(item.title, locale)}</strong>
                        <span>{localize(item.text, locale)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}

            <div className={styles.actions}>
              <Link className={styles.primaryButton} href={`/${locale}/#store`}>{labels.store}</Link>
              <Link className={styles.secondaryButton} href={`/${locale}/products`}>{labels.back}</Link>
            </div>
          </div>
        </div>
      </section>
      <div className={styles.brandLine}><span>DISCOVER GREAT FOOD</span></div>
    </main>
  );
}
