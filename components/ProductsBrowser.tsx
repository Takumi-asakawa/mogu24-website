"use client";

import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import type { Category, CategoryKey, Locale, Product } from "@/data/site";
import { localize } from "@/data/site";

export default function ProductsBrowser({ products, categories, locale, labels }: { products: Product[]; categories: Category[]; locale: Locale; labels: any }) {
  const [category, setCategory] = useState<CategoryKey | "all">("all");
  const [sort, setSort] = useState("recommended");

  const list = useMemo(() => {
    const filtered = category === "all" ? [...products] : products.filter((p) => p.category === category);
    if (sort === "newest") filtered.sort((a, b) => Number(b.isNew) - Number(a.isNew) || a.order - b.order);
    else filtered.sort((a, b) => Number(b.recommended) - Number(a.recommended) || a.order - b.order);
    return filtered;
  }, [category, sort, products]);

  return (
    <>
      <div className="filter-pills" aria-label={labels.sort}>
        <button className={category === "all" ? "active" : ""} onClick={() => setCategory("all")}>{labels.all}</button>
        {categories.map((cat) => (
          <button key={cat.key} className={category === cat.key ? "active" : ""} onClick={() => setCategory(cat.key)}>
            {localize(cat.name, locale)}
          </button>
        ))}
      </div>
      <div className="product-toolbar">
        <strong>{list.length} {labels.count}</strong>
        <label>{labels.sort}
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="recommended">{labels.recommended}</option>
            <option value="newest">{labels.newest}</option>
          </select>
        </label>
      </div>
      <div className="product-grid large">
        {list.map((product) => {
          const categoryData = categories.find((cat) => cat.key === product.category);
          return <ProductCard key={product.id} product={product} locale={locale} category={categoryData ? localize(categoryData.name, locale) : product.category} labels={labels} />;
        })}
      </div>
    </>
  );
}
