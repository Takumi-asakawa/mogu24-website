import Image from "next/image";
import Link from "next/link";
import { Camera, MessageCircle, Phone } from "lucide-react";
import type { Locale } from "@/data/site";
import { siteSettings } from "@/data/site";

export default function Footer({ locale, dict }: { locale: Locale; dict: any }) {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand"><Image src="/mogu24-logo.png" alt="MOGU24" width={150} height={52} /><p>{dict.hero.body}</p></div>
        <div className="footer-social">
          <a href={siteSettings.store.instagram}><Camera size={16}/>{dict.contact.instagram}</a>
          <a href={siteSettings.store.line}><MessageCircle size={16}/>{dict.contact.line}</a>
          <a href={siteSettings.store.phone ? `tel:${siteSettings.store.phone}` : "#"}><Phone size={16}/>{dict.contact.phone}</a>
        </div>
        <div className="footer-links">
          <Link href={`/${locale}/privacy`}>{dict.footer.privacy}</Link>
          <Link href={`/${locale}/terms`}>{dict.footer.terms}</Link>
          <Link href={`/${locale}/legal`}>{dict.footer.legal}</Link>
          <Link href={`/${locale}/contact`}>{dict.footer.contact}</Link>
        </div>
      </div>
      <div className="copyright">© 2026 MOGU24. All rights reserved.</div>
    </footer>
  );
}
