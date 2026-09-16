import Image from "next/image";
import Link from "next/link";
import type { Locale, Product } from "@/data/site";
import { localize } from "@/data/site";

export default function ProductCard({ product, locale, category, labels }: { product: Product; locale: Locale; category: string; labels: any }) {
  const name = localize(product.name, locale);
  const taxText = locale === "ja" ? `（${labels.tax}）` : `(${labels.tax})`;
  const hasPrice = product.price > 0;
  const pricePending = locale === "ja" ? "価格未定" : locale === "zh" ? "价格未定" : "Price TBA";
  const ariaPrice = hasPrice ? `${product.price.toLocaleString()}円` : pricePending;

  return (
    <Link className="product-card" href={`/${locale}/products/${product.id}`} aria-label={`${name} - ${ariaPrice}`}>
      <div className="product-image-wrap">
        <Image
          src={product.image}
          alt={name}
          width={1536}
          height={1024}
          sizes="(max-width: 700px) 50vw, (max-width: 1050px) 33vw, 260px"
          style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center", background: "#fff" }}
        />
        <div className="badges">
          {product.isNew && <span>{labels.newLabel}</span>}
          {product.recommended && <span>{labels.recommendedLabel}</span>}
        </div>
      </div>
      <div className="product-meta">
        <small>{category}</small>
        <h3>{name}</h3>
        <strong>
          {hasPrice ? <>¥{product.price.toLocaleString()} <em>{taxText}</em></> : pricePending}
        </strong>
      </div>
    </Link>
  );
}
