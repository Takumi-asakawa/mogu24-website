"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import type { Locale } from "@/data/site";

export default function MobileMenu({ locale, nav }: { locale: Locale; nav: Record<string, string> }) {
  const [open, setOpen] = useState(false);
  const items = [
    ["home", `/${locale}`], ["products", `/${locale}/products`], ["new", `/${locale}/products#new`],
    ["about", `/${locale}/about`], ["how", `/${locale}/how-to-use`], ["store", `/${locale}/store`],
    ["news", `/${locale}/news`], ["faq", `/${locale}/faq`]
  ];
  return (
    <div className="mobile-menu-wrap">
      <button className="menu-button" aria-label="menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      {open && (
        <nav className="mobile-menu">
          {items.map(([key, href]) => <Link key={key} href={href} onClick={() => setOpen(false)}>{nav[key]}</Link>)}
        </nav>
      )}
    </div>
  );
}
