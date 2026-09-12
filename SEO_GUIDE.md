# MOGU24 SEO Launch Checklist

## 狙う検索テーマ

主軸:
- 八王子 冷凍食品
- 八王子 24時間営業
- MOGU24 / モグ24
- 八王子 冷凍食品専門店

関連:
- 京王八王子 冷凍食品
- 八王子 無人販売 / 無人店舗
- 八王子 ご当地グルメ 持ち帰り

キーワードを機械的に詰め込むのではなく、タイトル・About・店舗情報・FAQで自然に説明する構成にしています。

## 実装済み

- 言語別SEOタイトル / description
- canonical URL
- hreflang: ja-JP / zh-CN / en / x-default
- OGP / Twitter Card
- Store + WebSite JSON-LD
- robots.txt
- sitemap.xml
- admin / 法務 / 旧単独セクションページのindex整理
- 日本語ローカル検索意図を含むFAQ
- 画像alt改善

## Google Search Console

1. Search Consoleでサイトを追加
2. HTMLタグ方式を選ぶ場合、`content="..."` の値をCloudflare Pages環境変数へ設定

```text
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=ここに値
```

3. 再デプロイ
4. `https://公開ドメイン/sitemap.xml` を送信
5. HOME / 商品一覧 / NEWS / FAQをURL検査

## Googleビジネスプロフィール

本番公開時に以下をサイトと完全一致させる:
- 店名: MOGU24
- 住所
- 電話番号
- 営業時間: 24時間
- WebサイトURL
- 店舗カテゴリ

店舗写真、外観写真、商品写真、開業後の投稿も継続して追加する。

## カスタムドメイン

`mogu24.jp`へ移行したらCloudflare Pages環境変数を変更:

```text
NEXT_PUBLIC_SITE_URL=https://mogu24.jp
```

`npm run build`時に sitemap / robots を新ドメインで再生成します。

## 注意

SEOは順位を保証するものではありません。技術SEOに加えて、Googleビジネスプロフィール、正確な店舗情報、外部サイトからの言及、継続的なNEWS更新、実際の検索ユーザーに役立つコンテンツが順位形成に影響します。
