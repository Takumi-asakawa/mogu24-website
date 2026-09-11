import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/data/site";
import LocaleSwitcher from "./LocaleSwitcher";
import MobileMenu from "./MobileMenu";

export default function Header({ locale, nav }: { locale: Locale; nav: Record<string, string> }) {
  const items = [
    ["home", `/${locale}`], ["products", `/${locale}/products`], ["new", `/${locale}/products#new`],
    ["about", `/${locale}/about`], ["how", `/${locale}/how-to-use`], ["store", `/${locale}/store`],
    ["news", `/${locale}/news`], ["faq", `/${locale}/faq`]
  ];
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" href={`/${locale}`} aria-label="MOGU24 home">
          <Image src="/mogu24-logo.png" alt="MOGU24" width={196} height={68} priority />
        </Link>
        <nav className="desktop-nav">{items.map(([key, href]) => <Link key={key} href={href}>{nav[key]}</Link>)}</nav>
        <div className="header-actions"><LocaleSwitcher locale={locale} /><MobileMenu locale={locale} nav={nav} /></div>
      </div>
    </header>
  );
}
