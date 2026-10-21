import type { Metadata } from "next";
import Link from "next/link";
import StructuredData from "@/components/StructuredData";
import { websiteSchema, seoCopy, absoluteUrl } from "@/data/seo";

export const metadata: Metadata = {
  robots: { index: true, follow: true },
  alternates: { canonical: "/ja/" },
  openGraph: {
    siteName: "MOGU24",
    title: seoCopy.ja.homeTitle,
    description: seoCopy.ja.homeDescription,
    type: "website",
    url: absoluteUrl("/")
  }
};

export default function RootPage() {
  return (
    <main className="language-entry">
      <StructuredData data={websiteSchema} />
      <meta httpEquiv="refresh" content="0;url=/ja/" />
      <img src="/mogu24-logo.png" alt="MOGU24" />
      <p>Choose your language / 言語を選択 / 选择语言</p>
      <div><Link href="/ja/">日本語</Link><Link href="/zh/">中文</Link><Link href="/en/">English</Link></div>
    </main>
  );
}
