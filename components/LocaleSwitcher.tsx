"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/data/site";

export default function LocaleSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const rest = pathname.replace(/^\/(ja|zh|en)/, "");
  const labels: Record<Locale, string> = { ja: "日本語", zh: "中文", en: "EN" };

  return (
    <div className="language-switcher" aria-label="Language switcher">
      {(["ja", "zh", "en"] as Locale[]).map((code) => (
        <Link key={code} className={code === locale ? "active" : ""} href={`/${code}${rest}`}>
          {labels[code]}
        </Link>
      ))}
    </div>
  );
}
