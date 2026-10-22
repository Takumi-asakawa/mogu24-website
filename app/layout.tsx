import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./refinement-v7.css";
import "./refinement-v8.css";
import "./weekly-responsive-fix.css";
import "./storefront-responsive.css";
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
  applicationName: "MOGU24",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "16x16 32x32 48x48", type: "image/x-icon" },
      { url: "/favicon-96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon-512.png", sizes: "512x512", type: "image/png" }
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }]
  },
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
