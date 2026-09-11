import Image from "next/image";

export default function AdminPage() {
  return (
    <main className="cms-guide">
      <Image src="/mogu24-logo.png" width={190} height={66} alt="MOGU24" />
      <p className="eyebrow dark">MOGU24 CONTENT MANAGEMENT</p>
      <h1>Pages CMSで更新します</h1>
      <p>商品、商品画像、価格、表示順、NEWS、FAQ、店舗情報はGitHubと連携したPages CMSからノーコードで編集できます。</p>
      <a className="btn navy" href="https://app.pagescms.org/" target="_blank" rel="noreferrer">Pages CMSを開く</a>
      <small>※ 編集権限はGitHub / Pages CMS側で管理します。このページ自体には管理機能を持たせません。</small>
    </main>
  );
}
