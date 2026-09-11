import Image from "next/image";
import { notFound } from "next/navigation";
import ProductsBrowser from "@/components/ProductsBrowser";
import { categories, getDictionary, isLocale, products } from "@/data/site";

export default async function ProductsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDictionary(locale);
  return (
    <>
      <section className="page-hero"><div className="shell page-hero-inner"><div><h1>{d.productsPage.title}</h1><span>{d.productsPage.subtitle}</span><p>{d.productsPage.lead}</p></div><div className="page-hero-image"><Image src="/images/cat-noodles.jpg" alt="Frozen noodle products" fill className="cover" sizes="(max-width:700px) 100vw, 50vw"/></div></div></section>
      <section className="section shell"><ProductsBrowser products={products} categories={categories} locale={locale} labels={d.productsPage}/></section>
    </>
  );
}
