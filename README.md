# MOGU24 Website

MOGU24の24時間冷凍食品専門店紹介サイトです。

## Architecture

- Next.js App Router
- Static Export (`output: "export"`)
- Responsive: mobile / tablet / desktop
- Languages: `/ja/`, `/zh/`, `/en/`
- GitHub
- Cloudflare Pages
- Pages CMS (Git-based no-code content editing)

## Local development (Windows PowerShell)

```powershell
npm.cmd install
npm.cmd run dev
```

Open:

- Japanese: http://localhost:3000/ja/
- Chinese: http://localhost:3000/zh/
- English: http://localhost:3000/en/
- Products: http://localhost:3000/ja/products/

Stop the development server with `Ctrl + C`.

## Production build / Static Export

```powershell
npm.cmd run build
```

A successful build creates the static website in:

```text
out/
```

The generated files do not require a Node.js server at runtime.

## Content editing with Pages CMS

Pages CMS configuration is in `.pages.yml`.

Editable content:

- `content/products.json` - products, images, prices, NEW/recommended, publish status, order, 3-language product names
- `content/categories.json` - category images, labels, display order
- `content/news.json` - news in Japanese / Chinese / English
- `content/faqs.json` - FAQ in Japanese / Chinese / English
- `content/site.json` - store, SNS, phone, access, How to Use
- `public/media/` - images uploaded from Pages CMS

Setup:

1. Push this repository to GitHub.
2. Open https://app.pagescms.org/
3. Sign in with GitHub and install the Pages CMS GitHub App for the repository.
4. Open the MOGU24 repository. Pages CMS reads `.pages.yml` automatically.
5. Edit and save content. Pages CMS commits the changed JSON/images to GitHub.
6. Cloudflare Pages detects the commit and automatically rebuilds/deploys the site.

## Cloudflare Pages deployment

Create a Cloudflare Pages project and connect the GitHub repository.

Recommended settings:

```text
Framework preset: Next.js (Static HTML Export)
Production branch: main
Build command: npm run build
Build output directory: out
```

Optional environment variable:

```text
NEXT_PUBLIC_SITE_URL=https://mogu24-website.pages.dev
```

After the custom domain is connected, change it to:

```text
NEXT_PUBLIC_SITE_URL=https://mogu24.jp
```

Every push to `main` automatically produces a new production deployment. Pull requests/other branches can be used for preview deployments.

## GitHub first push

```powershell
git init
git add .
git commit -m "Initial MOGU24 website"
git branch -M main
git remote add origin https://github.com/YOUR_ACCOUNT/mogu24.git
git push -u origin main
```

## Image quality

The project still contains some temporary low-resolution images under `public/images/` from the first prototype. For production, upload the final high-resolution original product/store images through Pages CMS; new uploads are stored under `public/media/` and served statically through Cloudflare CDN.

## Customer Finish v2

2026-09 のUX改善で、`MOGU24について` / `ご利用方法` / `店舗情報` はホーム内セクションに統合しました。ヘッダーから `#about` / `#how-to-use` / `#store` へ移動します。モバイル表示は横スワイプの商品・カテゴリUIと固定クイックCTAを採用しています。

公開前チェックは `npm run qa`、本番ビルドは `npm run build` を使用してください。


## Customer Finish v4 / SEO

About MOGU24を「世界中のおいしさを、もっと手軽に。いつでも。」を軸に刷新し、八王子 / 冷凍食品 / 24時間営業 / MOGU24（モグ24）のローカルSEO基盤を追加しています。

SEO関連ファイルは `npm run seo:files`（`build` / `qa` 内でも自動実行）で生成されます。Search Console・Googleビジネスプロフィールの公開手順は `SEO_GUIDE.md` を参照してください。
