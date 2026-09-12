import Image from "next/image";
import type { Locale, Product } from "@/data/site";
import { localize } from "@/data/site";

export default function ProductCard({ product, locale, category, labels }: { product: Product; locale: Locale; category: string; labels: any }) {
  const name = localize(product.name, locale);
  const taxText = locale === "ja" ? `（${labels.tax}）` : `(${labels.tax})`;

  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <Image src={product.image} alt={name} fill sizes="(max-width: 700px) 78vw, (max-width: 1050px) 33vw, 260px" className="cover" />
        <div className="badges">
          {product.isNew && <span>{labels.newLabel}</span>}
          {product.recommended && <span>{labels.recommendedLabel}</span>}
        </div>
      </div>
      <div className="product-meta">
        <small>{category}</small>
        <h3>{name}</h3>
        <strong>¥{product.price.toLocaleString()} <em>{taxText}</em></strong>
      </div>
    </article>
  );
}
