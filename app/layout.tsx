import type { Metadata } from "next";
import "./globals.css";
import LangSetter from "@/components/LangSetter";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mogu24.pages.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "MOGU24 | DISCOVER GREAT FOOD",
    template: "%s | MOGU24"
  },
  description: "24時間、いつでも新しい美味しさに出会える冷凍食品専門店 MOGU24。",
  icons: { icon: "/mogu24-logo.png" }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body><LangSetter />{children}</body>
    </html>
  );
}
