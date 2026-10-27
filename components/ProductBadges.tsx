import type { Locale, Product } from "@/data/site";

export default function ProductBadges({ product, locale, overlay = false }: { product: Product; locale: Locale; overlay?: boolean }) {
  const words = {
    ja: ["おすすめ", "再入荷", "再入荷待ち"],
    zh: ["推荐", "补货到店", "等待补货"],
    en: ["Recommended", "Restocked", "Awaiting restock"]
  }[locale];
  const flags = [
    { active: product.recommended, text: words[0], color: "#cba53f" },
    { active: product.isNew, text: "SALE", color: "#c8453b" },
    { active: product.newArrival, text: "NEW", color: "#407cc4" },
    { active: product.restocked, text: words[1], color: "#408773" },
    { active: product.restockPending, text: words[2], color: "#777e85" }
  ].filter(flag => flag.active);
  if (!flags.length) return null;
  return <div style={{ display: "flex", flexWrap: "wrap", gap: 5, maxWidth: "100%", ...(overlay ? { position: "absolute", top: 8, left: 8, right: 8, zIndex: 2 } : { margin: "12px 0" }) }}>
    {flags.map(flag => <span key={flag.text} style={{ background: flag.color, color: "#fff", borderRadius: 9, padding: "5px 8px", fontSize: 12, lineHeight: 1.4, fontWeight: 700, maxWidth: "100%", overflowWrap: "anywhere" }}>{flag.text}</span>)}
  </div>;
}
