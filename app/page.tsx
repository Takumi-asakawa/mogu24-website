import type { Metadata } from "next";
import Home from "./[locale]/page";
import LocaleLayout from "./[locale]/layout";
import { seoCopy, absoluteUrl, languageAlternates } from "@/data/seo";

export const metadata: Metadata = {
  robots: { index: true, follow: true },
  alternates: { canonical: "/ja/", languages: languageAlternates() },
  openGraph: {
    siteName: "MOGU24",
    title: seoCopy.ja.homeTitle,
    description: seoCopy.ja.homeDescription,
    type: "website",
    url: absoluteUrl("/")
  }
};

export default async function RootPage() {
  const params = Promise.resolve({ locale: "ja" });
  return <LocaleLayout params={params}><Home params={params} /></LocaleLayout>;
}
