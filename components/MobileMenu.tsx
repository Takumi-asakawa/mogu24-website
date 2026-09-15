"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import type { Locale } from "@/data/site";

export default function MobileMenu({ locale, nav }: { locale: Locale; nav: Record<string, string> }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("mobile-menu-open", open);
    return () => document.body.classList.remove("mobile-menu-open");
  }, [open]);
  const items = [
    ["home", `/${locale}/#top`],
    ["products", `/${locale}/products`],
    ["new", `/${locale}/products#new`],
    ["how", `/${locale}/#how-to-use`],
    ["store", `/${locale}/#store`],
    ["news", `/${locale}/news`],
    ["faq", `/${locale}/faq`]
  ];
  const saleLabel = locale === "ja" ? "セール" : locale === "zh" ? "特价" : "Sale";

  return (
    <div className="mobile-menu-wrap">
      <button
        className="menu-button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {open ? <X /> : <Menu />}
      </button>
      {open && (
        <>
          <button className="mobile-menu-backdrop" aria-label="Close menu" onClick={() => setOpen(false)} />
          <nav className="mobile-menu" aria-label="Mobile navigation">
            <div className="mobile-menu-title"><span>MENU</span><small>MOGU24</small></div>
            {items.map(([key, href]) => (
              <Link key={key} href={href} onClick={() => setOpen(false)}>{key === "new" ? saleLabel : nav[key]}</Link>
            ))}
          </nav>
        </>
      )}
    </div>
  );
}
