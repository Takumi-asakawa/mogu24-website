# MOGU24 Customer Finish v4 — About / SEO Update Guide

今回の更新では、`MOGU24について` をブランドの核になるアイコニックなセクションへ刷新し、八王子・冷凍食品・24時間営業・MOGU24（モグ24）を自然に伝えるSEO基盤を実装しました。

## 主な変更

### About MOGU24
- 「世界中のおいしさを、もっと手軽に。いつでも。」を主メッセージに変更
- 八王子 / 24時間営業 / 冷凍食品専門店 / 日本＆世界の美味しさを視覚的なチップで表示
- 高解像度の餃子・ラーメン写真、24Hカード、FROZEN FOODリボンを組み合わせたアイコニックなコラージュ
- PCとiPhoneで別最適化
- 商品一覧 / 店舗情報へのCTAを追加
- 日本語 / 中文 / Englishのコピーを自然な表現へ再校正

### SEO
- HOME / 商品一覧 / NEWS / FAQ に言語別のtitle / description / canonical / hreflang / OGP / Twitter Card
- 日本語HOMEタイトル: `MOGU24（モグ24）｜八王子の24時間営業 冷凍食品専門店`
- LocalBusiness相当の `Store` 構造化データ + `WebSite` 構造化データ
- 八王子の検索意図に合わせたFAQを追加
- 商品・店舗画像のaltを改善
- `/admin/` と法務・旧単独About/How/Storeページを検索対象から整理
- `robots.txt` と `sitemap.xml` をビルド時に自動生成
- Google Search Console verification用環境変数フックを追加

## 適用方法

既存v3プロジェクトへパッチZIPの中身を上書きしてください。

PowerShellでプロジェクト直下から:

```powershell
npm.cmd run qa
npm.cmd run build
npm.cmd run dev
```

確認URL:

- `http://localhost:3000/ja/#about`
- `http://localhost:3000/zh/#about`
- `http://localhost:3000/en/#about`
- `http://localhost:3000/robots.txt`
- `http://localhost:3000/sitemap.xml`

## GitHub / Cloudflare

```powershell
git add .
git commit -m "Redesign About MOGU24 and add local SEO foundation"
git push
```

Cloudflare Pagesが`main`と連携済みなら自動公開されます。

## カスタムドメイン接続後

Cloudflare Pagesの環境変数を次へ変更します。

```text
NEXT_PUBLIC_SITE_URL=https://mogu24.jp
```

次回ビルド時に canonical / OGP / JSON-LD / robots.txt / sitemap.xml が `mogu24.jp` 基準になります。

## 検索公開前に必ず実データへ更新

`content/site.json` の以下は現在プレースホルダーです。

- 正式な住所
- 電話番号
- Instagram URL
- LINE公式URL
- Google Maps URL

ローカルSEOでは店舗名・住所・電話番号・営業時間をWebサイトとGoogleビジネスプロフィールで一致させることが重要です。
