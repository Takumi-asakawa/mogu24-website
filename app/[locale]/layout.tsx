import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getDictionary, isLocale, locales } from "@/data/site";
import { absoluteUrl, languageAlternates, seoCopy } from "@/data/seo";

export function generateStaticParams() { return locales.map((locale) => ({ locale })); }
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const seo = seoCopy[locale];
  return {
    alternates: {
      canonical: absoluteUrl(`/${locale}/`),
      languages: languageAlternates()
    },
    openGraph: {
      siteName: "MOGU24",
      locale: locale === "zh" ? "zh_CN" : locale === "en" ? "en_US" : "ja_JP",
      type: "website",
      images: [{ url: absoluteUrl("/images/generated/hero-store.webp"), width: 1688, height: 932, alt: seo.ogAlt }]
    }
  };
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  return <><Header locale={locale} nav={dict.nav} /><main>{children}</main><Footer locale={locale} dict={dict} /></>;
}
