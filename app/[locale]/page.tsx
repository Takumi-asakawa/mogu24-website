import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Clock3, Globe2, Snowflake, CreditCard, MapPin, ArrowRight, Camera, MessageCircle, Phone, Sparkles } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import StructuredData from "@/components/StructuredData";
import { categories, getDictionary, isLocale, localize, products, siteSettings } from "@/data/site";
import { notFound } from "next/navigation";
import { absoluteUrl, languageAlternates, seoCopy } from "@/data/seo";

const featureIcons = [Clock3, Globe2, Snowflake, CreditCard];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const seo = seoCopy[locale];
  return {
    title: { absolute: seo.homeTitle },
    description: seo.homeDescription,
    alternates: { canonical: absoluteUrl(`/${locale}/`), languages: languageAlternates() },
    openGraph: {
      title: seo.homeTitle,
      description: seo.homeDescription,
      url: absoluteUrl(`/${locale}/`),
      siteName: "MOGU24",
      locale: locale === "zh" ? "zh_CN" : locale === "en" ? "en_US" : "ja_JP",
      type: "website",
      images: [{ url: absoluteUrl("/images/generated/hero-store.webp"), width: 1688, height: 932, alt: seo.ogAlt }]
    },
    twitter: { card: "summary_large_image", title: seo.homeTitle, description: seo.homeDescription, images: [absoluteUrl("/images/generated/hero-store.webp")] },
    robots: { index: true, follow: true }
  };
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDictionary(locale);
  const saleProducts = products.filter((product) => product.isNew).slice(0, 3);
  const saleSection = locale === "ja"
    ? { title: "セール", lead: "お得なセール商品をチェック。", all: "すべてのセール商品を見る" }
    : locale === "zh"
      ? { title: "特价", lead: "精选优惠商品，限时查看。", all: "查看全部特价商品" }
      : { title: "Sale", lead: "Discover selected items on sale.", all: "View All Sale Items" };
  const saleProductLabels = { ...d.productsPage, newLabel: "SALE" };

  const sameAs = [siteSettings.store.instagram, siteSettings.store.line].filter((url) => url && url !== "#");
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "Store",
    "@id": `${absoluteUrl(`/${locale}/`)}#mogu24-store`,
    name: "MOGU24",
    alternateName: locale === "ja" ? "モグ24" : "MOGU24",
    url: absoluteUrl(`/${locale}/`),
    logo: absoluteUrl("/mogu24-logo.png"),
    image: absoluteUrl("/images/generated/hero-store.webp"),
    description: seoCopy[locale].homeDescription,
    address: { "@type": "PostalAddress", addressLocality: "八王子市", addressRegion: "東京都", addressCountry: "JP" },
    areaServed: { "@type": "City", name: "八王子市" },
    openingHoursSpecification: [{
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00", closes: "23:59"
    }],
    ...(siteSettings.store.phone ? { telephone: siteSettings.store.phone } : {}),
    ...(sameAs.length ? { sameAs } : {})
  };
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "MOGU24",
    alternateName: "モグ24",
    url: absoluteUrl(`/${locale}/`),
    inLanguage: locale === "ja" ? "ja-JP" : locale === "zh" ? "zh-CN" : "en"
  };

  return (
    <>
      <StructuredData data={[localBusiness, websiteSchema]} />
      <section id="top" className="hero home-anchor">
        <div className="hero-copy">
          <div className="hero-panel">
            <p className="eyebrow">{d.hero.eyebrow}</p>
            <h1>{d.hero.title}</h1>
            <h2>{d.hero.lead.split("\n").map((line, i, lines) => <span key={i}>{line}{i < lines.length - 1 ? " " : ""}</span>)}</h2>
            <p>{d.hero.body}</p>
            <div className="hero-actions">
              <Link className="btn gold" href={`/${locale}/products`}>{d.hero.productsCta}<ArrowRight size={18}/></Link>
              <Link className="btn outline-light" href={`/${locale}/#store`}><MapPin size={18}/>{d.hero.storeCta}</Link>
            </div>
          </div>
        </div>
        <div className="hero-image">
          <Image src="/images/generated/hero-store.webp" alt="MOGU24 frozen food store" fill priority className="cover" sizes="(max-width:700px) 100vw, 58vw" />
          <div className="hero-image-note">
            <span>24H OPEN</span>
            <strong>MOGU24</strong>
            <small>{d.about.chips[0]}</small>
          </div>
        </div>
      </section>

      <section className="features shell" aria-label="MOGU24 features">
        {d.features.map(([title, body], i) => {
          const Icon = featureIcons[i];
          return <div className="feature" key={title}><Icon/><div><strong>{title}</strong><p>{body}</p></div></div>;
        })}
      </section>

      <section className="section shell category-section">
        <SectionHeading title={d.sections.categories} sub="SELECTED CATEGORY" />
        <p className="section-intro">{d.sections.categoriesLead}</p>
        <div className="category-grid">
          {categories.map((cat) => (
            <Link key={cat.key} className="category-card" href={`/${locale}/products#${cat.key}`}>
              <Image src={cat.image} alt={localize(cat.name, locale)} fill className="cover" sizes="(max-width:700px) 48vw, 16vw" />
              <div><strong>{localize(cat.name, locale)}</strong><span>{cat.subtitle}</span></div>
            </Link>
          ))}
        </div>
      </section>

      <section id="new" className="section shell home-anchor new-home-section">
        <SectionHeading title={saleSection.title} sub="SALE" />
        <p className="section-intro">{saleSection.lead}</p>
        <div className="product-grid home-product-grid">
          {saleProducts.map((p) => {
            const cat = categories.find((item) => item.key === p.category);
            return <ProductCard key={p.id} product={p} locale={locale} category={cat ? localize(cat.name, locale) : p.category} labels={saleProductLabels} />;
          })}
        </div>
        <div className="center"><Link className="btn navy" href={`/${locale}/products#new`}>{saleSection.all}<ArrowRight size={18}/></Link></div>
      </section>

      <section className="weekly shell">
        <div className="weekly-copy">
          <p className="eyebrow dark">SPECIAL SELECTION</p>
          <h2>{d.sections.weekly}</h2>
          <h3>{d.weekly.title}</h3>
          <p>{d.weekly.body}</p>
          <Link className="btn navy" href={`/${locale}/products`}>{d.weekly.cta}<ArrowRight size={18}/></Link>
        </div>
        <div className="weekly-image"><Image src="/media/chatgpt-image-2026916-190630-4-1-1.png" alt={locale === "ja" ? "赤のシカゴピザ トマトソース" : locale === "zh" ? "红色芝加哥披萨 番茄酱" : "Red Chicago Pizza with tomato sauce"} fill className="cover" quality={100} sizes="(max-width:700px) 50vw, 33vw"/></div>
        <div className="weekly-image"><Image src="/media/chatgpt-image-2026916-185641-4.png" alt={locale === "ja" ? "ドバイもちクッキー チョコ" : locale === "zh" ? "迪拜麻薯曲奇 巧克力" : "Dubai Mochi Cookie Chocolate"} fill className="cover" quality={100} sizes="(max-width:700px) 50vw, 33vw"/></div>
      </section>

      <section id="about" className="home-anchor about-home about-home-v4">
        <div className="shell about-home-grid about-home-grid-v4">
          <div className="about-copy about-copy-v4">
            <p className="section-kicker">ABOUT MOGU24</p>
            <h2 className="about-iconic-title">{d.about.iconicTitle.split("\n").map((line, i) => <span key={i}>{line}</span>)}</h2>
            <p className="about-seo-line">{d.about.seoLine}</p>
            <p>{d.about.body}</p>
            <div className="about-chips" aria-label="MOGU24 highlights">
              {d.about.chips.map((chip) => <span key={chip}>{chip}</span>)}
            </div>
            <div className="brand-promise brand-promise-v4">
              <Sparkles aria-hidden="true"/>
              <div><strong>DISCOVER GREAT FOOD.</strong><span>{d.about.promise}</span></div>
            </div>
            <div className="about-actions">
              <Link className="btn navy" href={`/${locale}/products`}>{d.about.productsCta}<ArrowRight size={18}/></Link>
              <Link className="text-link about-store-link" href={`/${locale}/#store`}><MapPin size={17}/>{d.about.storeCta}</Link>
            </div>
          </div>
          <div className="about-visual about-visual-v5" aria-label={d.about.seoLine}>
            <div className="about-origin-label"><Globe2 size={16}/><span>{d.about.visualLabel}</span></div>
            <div className="about-image about-food-main"><Image src="/images/generated/gyoza.webp" alt={locale === "ja" ? "MOGU24で楽しめる焼き餃子の冷凍食品イメージ" : locale === "zh" ? "MOGU24冷冻煎饺美食示意图" : "Frozen gyoza food available at MOGU24"} fill className="cover" sizes="(max-width:700px) 100vw, 34vw" /></div>
            <div className="about-image about-food-side"><Image src="/images/generated/ramen.webp" alt={locale === "ja" ? "MOGU24で楽しめるラーメンの冷凍食品イメージ" : locale === "zh" ? "MOGU24冷冻拉面美食示意图" : "Frozen ramen food available at MOGU24"} fill className="cover" sizes="(max-width:700px) 44vw, 17vw" /></div>
            <div className="about-image about-store-mini"><Image src="/images/generated/hero-store.webp" alt={locale === "ja" ? "MOGU24店舗外観" : locale === "zh" ? "MOGU24店铺外观" : "MOGU24 store exterior"} fill className="cover" sizes="(max-width:700px) 44vw, 17vw" /><div className="about-store-mini-badge"><span>24H</span><strong>{d.about.badge}</strong></div></div>
            <div className="about-frozen-ribbon"><Snowflake size={17}/><span>{d.about.visualMessage}</span></div>
          </div>
        </div>
      </section>

      <section id="how-to-use" className="home-anchor how-home">
        <div className="shell">
          <div className="how-intro">
            <div>
              <p className="section-kicker">HOW TO USE</p>
              <h2>{d.nav.how}</h2>
            </div>
            <div className="how-intro-copy">
              <h3>{d.howHome.lead}</h3>
              <p>{d.howHome.intro}</p>
              <div className="how-pills" aria-label="Store features">
                <span><Clock3 size={15}/>24H</span>
                <span><Snowflake size={15}/>{d.howHome.unmanned}</span>
                <span><CreditCard size={15}/>{d.howHome.cashless}</span>
              </div>
            </div>
          </div>

          <div className="how-flow" aria-label={d.nav.how}>
            {siteSettings.howToUse.map((item, index) => {
              return (
                <article className="how-flow-step" key={item.step}>
                  <div className="how-icon-wrap"><HowStepIcon step={index} /></div>
                  <span className="how-step-label">STEP {item.step}</span>
                  <h3>{localize(item.title, locale)}</h3>
                  <p>{d.howHome.steps[index]}</p>
                  {index < siteSettings.howToUse.length - 1 && <ArrowRight className="how-flow-arrow" aria-hidden="true"/>}
                </article>
              );
            })}
          </div>

          <div className="how-brand-panel">
            <div className="how-brand-copy">
              <p className="section-kicker light">24 HOURS OPEN</p>
              <h3>{d.howHome.openTitle}</h3>
              <p>{d.howHome.openBody}</p>
              <div className="how-benefits">
                <span><Clock3/>{d.howHome.benefits[0]}</span>
                <span><Globe2/>{d.howHome.benefits[1]}</span>
                <span><Snowflake/>{d.howHome.benefits[2]}</span>
              </div>
              <Link className="btn gold" href={`/${locale}/#store`}>{d.howHome.storeCta}<ArrowRight size={18}/></Link>
            </div>
            <div className="how-brand-image">
              <Image src="/media/Noodle_KawaraSoba.png" alt={locale === "ja" ? "熱々の瓦そば" : locale === "zh" ? "热腾腾的瓦荞麦面" : "Steaming kawara soba"} fill className="cover" sizes="(max-width:700px) 100vw, 42vw"/>
              <div className="how-image-stamp"><strong>24H</strong><span>{d.howHome.easyBadge}</span></div>
            </div>
          </div>

          <div className="how-service-card">
            <div className="how-service-icon"><Phone aria-hidden="true"/></div>
            <div className="how-service-copy">
              <strong>{d.howPage.noteTitle}</strong>
              <p>{d.howPage.noteBody}</p>
            </div>
            <div className="how-service-actions">
              <Link className="text-link" href={`/${locale}/news`}><MessageCircle size={16}/>{d.nav.news}</Link>
              <Link className="btn navy compact" href={`/${locale}/contact`}>{d.footer.contact}<ArrowRight size={16}/></Link>
            </div>
          </div>
        </div>
      </section>

      <section id="store" className="home-anchor store-home">
        <div className="shell store-home-grid">
          <div className="store-photo"><Image src="/images/generated/hero-store.webp" alt="MOGU24 store exterior" fill className="cover" sizes="(max-width:700px) 100vw, 52vw" /></div>
          <div className="store-copy">
            <p className="section-kicker light">STORE INFORMATION</p>
            <h2>{d.sections.store}</h2>
            <h3>{d.store.invitation}</h3>
            <div className="store-facts">
              <div><Clock3/><span><strong>{d.store.hours}</strong><small>{d.store.hoursNote}</small></span></div>
              <div><MapPin/><span><strong>{localize(siteSettings.store.access, locale)}</strong><small>{localize(siteSettings.store.address, locale)}</small></span></div>
              <div><CreditCard/><span><strong>{d.store.paymentTitle}</strong><small>{d.store.paymentBody}</small></span></div>
            </div>
            <div className="store-actions">
              {siteSettings.store.mapUrl !== "#" && <a className="btn gold" href={siteSettings.store.mapUrl} target="_blank" rel="noreferrer"><MapPin size={18}/>{d.store.mapCta}</a>}
              <Link className="btn outline-light" href={`/${locale}/contact`}>{d.footer.contact}<ArrowRight size={18}/></Link>
            </div>
          </div>
        </div>
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

      <nav className="mobile-visit-bar" aria-label="Quick actions">
        <Link href={`/${locale}/products`}>{d.hero.productsCta}</Link>
        <Link href={`/${locale}/#store`}><MapPin size={16}/>{d.hero.storeCta}</Link>
      </nav>
    </>
  );
}

function SectionHeading({ title, sub, align = "center" }: { title: string; sub: string; align?: "left" | "center" }) {
  return <div className={`section-heading ${align}`}><h2>{title}</h2><span>{sub}</span></div>;
}

function HowStepIcon({ step }: { step: number }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (step === 0) return <svg viewBox="0 0 48 48" aria-hidden="true"><path {...common} d="M8 19h32l-3-9H11l-3 9Z"/><path {...common} d="M11 19v19h26V19M18 38V27h12v11M6 38h36"/><path {...common} d="M13 19c0 3 5 3 5 0 0 3 6 3 6 0 0 3 6 3 6 0 0 3 5 3 5 0"/></svg>;
  if (step === 1) return <svg viewBox="0 0 48 48" aria-hidden="true"><path {...common} d="M12 19h24l-2 19H14l-2-19Z"/><path {...common} d="M17 19c1-7 13-7 14 0M9 14h30M18 25v7M24 25v7M30 25v7"/></svg>;
  if (step === 2) return <svg viewBox="0 0 48 48" aria-hidden="true"><rect {...common} x="7" y="11" width="34" height="26" rx="4"/><path {...common} d="M7 19h34M13 29h8M13 33h5"/><circle {...common} cx="34" cy="29" r="3"/></svg>;
  return <svg viewBox="0 0 48 48" aria-hidden="true"><path {...common} d="M11 18h26l-2 22H13l-2-22Z"/><path {...common} d="M17 20c0-10 14-10 14 0M17 27h14"/><path {...common} d="m20 32 3 3 6-7"/></svg>;
}