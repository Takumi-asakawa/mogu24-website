import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Clock3, MapPin, Phone, MessageCircle, Camera } from "lucide-react";
import { faqs, getDictionary, isLocale, localize, news, siteSettings } from "@/data/site";

const allowed = ["about", "how-to-use", "store", "news", "faq", "privacy", "terms", "legal", "contact"] as const;
export function generateStaticParams() { return allowed.map((slug) => ({ slug })); }
export const dynamicParams = false;

export default async function ContentPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!isLocale(locale) || !allowed.includes(slug as any)) notFound();
  const d = getDictionary(locale);

  const titles: Record<string, string> = {
    about: d.nav.about, "how-to-use": d.nav.how, store: d.nav.store, news: d.nav.news, faq: d.nav.faq,
    privacy: d.footer.privacy, terms: d.footer.terms, legal: d.footer.legal, contact: d.footer.contact
  };

  return (
    <>
      <section className="simple-page-hero"><div className="shell"><h1>{titles[slug]}</h1><p>MOGU24 / {titles[slug]}</p></div></section>
      <section className="content-page shell">{renderBody(slug, d, locale)}</section>
    </>
  );
}

function renderBody(slug: string, d: any, locale: "ja" | "zh" | "en") {
  if (slug === "about") return <div className="prose"><h2>{d.about.lead}</h2><p>{d.about.body}</p><p><strong>DISCOVER GREAT FOOD.</strong> {d.about.brandBody}</p></div>;
  if (slug === "how-to-use") return <div className="steps">{siteSettings.howToUse.map((item) => <Step key={item.step} n={item.step} t={localize(item.title, locale)} />)}<div className="notice"><h3>{d.howPage.noteTitle}</h3><p>{d.howPage.noteBody}</p></div></div>;
  if (slug === "store") return <div className="store-details"><div><Clock3/><h2>{d.store.hours}</h2></div><div><MapPin/><h2>{localize(siteSettings.store.access, locale)}</h2></div><p><strong>{d.store.addressLabel}:</strong> {localize(siteSettings.store.address, locale)}</p><p>{d.store.body}</p><div className="map-placeholder">MOGU24 MAP<br/><small>{d.store.mapNote}</small></div></div>;
  if (slug === "news") return <div className="news-list">{news.map((item)=><article key={item.id}><time>{item.date.replaceAll("-", ".")}</time><span>{item.type}</span><div><h2>{localize(item.title, locale)}</h2><p>{localize(item.body, locale)}</p></div><ArrowRight/></article>)}</div>;
  if (slug === "faq") return <div className="faq-list">{faqs.map((item)=><details key={item.id}><summary>{localize(item.question, locale)}</summary><p>{localize(item.answer, locale)}</p></details>)}</div>;
  if (slug === "contact") return <div className="contact-cards"><a href={siteSettings.store.instagram}><Camera/>{d.contact.instagram}</a><a href={siteSettings.store.line}><MessageCircle/>{d.contact.line}</a><a href={siteSettings.store.phone ? `tel:${siteSettings.store.phone}` : "#"}><Phone/>{d.contact.phone}</a></div>;
  const body = slug === "privacy" ? d.legalPages.privacyBody : slug === "terms" ? d.legalPages.termsBody : d.legalPages.legalBody;
  return <div className="prose"><h2>{d.footer[slug === "privacy" ? "privacy" : slug === "terms" ? "terms" : "legal"]}</h2><p>{body}</p><Link className="text-link" href={`/${locale}`}>MOGU24 HOME <ArrowRight size={16}/></Link></div>;
}

function Step({ n, t }: { n: string; t: string }) { return <article className="step"><span>STEP {n}</span><h2>{t}</h2></article>; }
