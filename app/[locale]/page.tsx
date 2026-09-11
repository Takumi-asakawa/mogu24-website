import Image from "next/image";
import Link from "next/link";
import { Clock3, Globe2, Snowflake, CreditCard, MapPin, ArrowRight, Camera, MessageCircle, Phone } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { categories, getDictionary, isLocale, localize, products, siteSettings } from "@/data/site";
import { notFound } from "next/navigation";

const featureIcons = [Clock3, Globe2, Snowflake, CreditCard];

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDictionary(locale);
  const newProducts = products.filter((product) => product.isNew).slice(0, 5);

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">{d.hero.eyebrow}</p>
          <h1>{d.hero.title}</h1>
          <h2>{d.hero.lead.split("\n").map((line, i) => <span key={i}>{line}</span>)}</h2>
          <p>{d.hero.body}</p>
          <div className="hero-actions">
            <Link className="btn gold" href={`/${locale}/products`}>{d.hero.productsCta}<ArrowRight size={18}/></Link>
            <Link className="btn outline-light" href={`/${locale}/store`}><MapPin size={18}/>{d.hero.storeCta}</Link>
          </div>
        </div>
        <div className="hero-image"><Image src="/images/hero-store.jpg" alt="MOGU24 frozen food store" fill priority className="cover" sizes="(max-width:700px) 100vw, 58vw" /></div>
      </section>

      <section className="features shell">
        {d.features.map(([title, body], i) => {
          const Icon = featureIcons[i];
          return <div className="feature" key={title}><Icon/><div><strong>{title}</strong><p>{body}</p></div></div>;
        })}
      </section>

      <section className="section shell">
        <SectionHeading title={d.sections.categories} sub="SELECTED CATEGORY" />
        <div className="category-grid">
          {categories.map((cat) => (
            <Link key={cat.key} className="category-card" href={`/${locale}/products`}>
              <Image src={cat.image} alt={localize(cat.name, locale)} fill className="cover" sizes="(max-width:700px) 50vw, 16vw" />
              <div><strong>{localize(cat.name, locale)}</strong><span>{cat.subtitle}</span></div>
            </Link>
          ))}
        </div>
      </section>

      <section id="new" className="section shell">
        <SectionHeading title={d.sections.new} sub="NEW ARRIVALS" />
        <div className="product-grid">
          {newProducts.map((p) => {
            const cat = categories.find((item) => item.key === p.category);
            return <ProductCard key={p.id} product={p} locale={locale} category={cat ? localize(cat.name, locale) : p.category} labels={d.productsPage} />;
          })}
        </div>
        <div className="center"><Link className="btn navy" href={`/${locale}/products`}>{d.sections.allNew}<ArrowRight size={18}/></Link></div>
      </section>

      <section className="weekly shell">
        <div className="weekly-copy"><p className="eyebrow dark">SPECIAL SELECTION</p><h2>{d.sections.weekly}</h2><h3>{d.weekly.title}</h3><p>{d.weekly.body}</p><Link className="btn navy" href={`/${locale}/products`}>{d.weekly.cta}<ArrowRight size={18}/></Link></div>
        <div className="weekly-image"><Image src="/images/weekly-japan.jpg" alt="Japanese regional food" fill className="cover" sizes="(max-width:700px) 50vw, 33vw"/></div>
        <div className="weekly-image"><Image src="/images/weekly-world.jpg" alt="World food" fill className="cover" sizes="(max-width:700px) 50vw, 33vw"/></div>
      </section>

      <section className="split shell">
        <article className="story-card"><div><SectionHeading title={d.sections.about} sub="ABOUT US" align="left"/><h3>{d.about.lead}</h3><p>{d.about.body}</p><Link className="text-link" href={`/${locale}/about`}>{d.about.cta} <ArrowRight size={16}/></Link></div><div className="story-image"><Image src="/images/about-food.jpg" alt="Frozen food selection" fill className="cover" sizes="(max-width:700px) 100vw, 20vw"/></div></article>
        <article className="story-card"><div><SectionHeading title={d.sections.store} sub="STORE INFORMATION" align="left"/><h3>{d.store.hours}</h3><p><MapPin size={16}/>{localize(siteSettings.store.access, locale)}</p><p>{d.store.body}</p><Link className="text-link" href={`/${locale}/store`}>{d.store.cta} <ArrowRight size={16}/></Link></div><div className="story-image"><Image src="/images/store.jpg" alt="MOGU24 store" fill className="cover" sizes="(max-width:700px) 100vw, 20vw"/></div></article>
      </section>

      <section className="quick-links shell">
        <Link href={`/${locale}/news`}><span>{d.sections.news}</span><strong>{d.nav.news}</strong><ArrowRight/></Link>
        <Link href={`/${locale}/faq`}><span>{d.sections.faq}</span><strong>{d.nav.faq}</strong><ArrowRight/></Link>
      </section>

      <section className="contact-band"><div className="shell"><h2>{d.contact.title}</h2><div>
        <a href={siteSettings.store.instagram}><Camera/>{d.contact.instagram}</a>
        <a href={siteSettings.store.line}><MessageCircle/>{d.contact.line}</a>
        <a href={siteSettings.store.phone ? `tel:${siteSettings.store.phone}` : "#"}><Phone/>{d.contact.phone}</a>
      </div></div></section>
    </>
  );
}

function SectionHeading({ title, sub, align = "center" }: { title: string; sub: string; align?: "left" | "center" }) {
  return <div className={`section-heading ${align}`}><h2>{title}</h2><span>{sub}</span></div>;
}
