import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./refinement-v7.css";
import LangSetter from "@/components/LangSetter";
import { SITE_URL } from "@/data/seo";


export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#061b33"
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "MOGU24（モグ24）｜八王子の24時間営業 冷凍食品専門店",
  description: "MOGU24（モグ24）は東京都八王子市の24時間営業・無人の冷凍食品専門店。日本各地と世界のおいしい冷凍食品を、好きな時間に手軽に選べます。",
  icons: { icon: "/mogu24-logo.png" },
  category: "food",
  creator: "MOGU24",
  publisher: "MOGU24",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 }
  },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body><LangSetter />{children}</body>
    </html>
  );
}
