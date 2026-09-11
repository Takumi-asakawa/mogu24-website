import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getDictionary, isLocale, locales } from "@/data/site";

export function generateStaticParams() { return locales.map((locale) => ({ locale })); }
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = getDictionary(locale);
  return {
    title: d.nav.home,
    description: d.hero.body,
    alternates: {
      canonical: `/${locale}/`,
      languages: { "ja-JP": "/ja/", "zh-CN": "/zh/", "en": "/en/", "x-default": "/ja/" }
    },
    openGraph: {
      title: "MOGU24 | DISCOVER GREAT FOOD",
      description: d.hero.body,
      url: `/${locale}/`,
      siteName: "MOGU24",
      locale: locale === "zh" ? "zh_CN" : locale === "en" ? "en_US" : "ja_JP",
      type: "website"
    }
  };
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  return <><Header locale={locale} nav={dict.nav} /><main>{children}</main><Footer locale={locale} dict={dict} /></>;
}
