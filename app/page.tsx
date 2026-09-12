import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { robots: { index: false, follow: true }, alternates: { canonical: "/ja/" } };

export default function RootPage() {
  return (
    <main className="language-entry">
      <meta httpEquiv="refresh" content="0;url=/ja/" />
      <img src="/mogu24-logo.png" alt="MOGU24" />
      <p>Choose your language / 言語を選択 / 选择语言</p>
      <div><Link href="/ja/">日本語</Link><Link href="/zh/">中文</Link><Link href="/en/">English</Link></div>
    </main>
  );
}
