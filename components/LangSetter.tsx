"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function LangSetter() {
  const pathname = usePathname();
  useEffect(() => {
    const code = pathname.split("/")[1];
    document.documentElement.lang = code === "zh" ? "zh-CN" : code === "en" ? "en" : "ja";
  }, [pathname]);
  return null;
}
