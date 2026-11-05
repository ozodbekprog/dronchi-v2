import Link from "next/link";
import Logo from "./Logo";
import { ArrowUpRight, Instagram, Send, YouTube } from "./Icons";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <Logo href="/" className="brand" />
          <p className="footer-about">
            Bilimdan amaliyotga, amaliyotdan osmonga. Keyingi parvozingiz shu yerdan boshlanadi.
          </p>
          <div className="footer-social">
            <a href="https://t.me/" target="_blank" rel="noreferrer" aria-label="Telegram">
              <Send size={14} />
            </a>
            <a href="https://instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram">
              <Instagram size={14} />
            </a>
            <a href="https://youtube.com/" target="_blank" rel="noreferrer" aria-label="YouTube">
              <YouTube size={15} />
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h3>Platforma</h3>
          <ul>
            <li>
              <Link href="/akademiya">Kurslar</Link>
            </li>
            <li>
              <Link href="/simulyator">Simulyator</Link>
            </li>
            <li>
              <Link href="/poligonlar">Poligonlar</Link>
            </li>
            <li>
              <Link href="/#dokon">Do&apos;kon</Link>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Yordam</h3>
          <ul>
            <li>
              <Link href="/poligonlar#mening-bronlarim">Mening bronlarim</Link>
            </li>
            <li>
              <Link href="/poligonlar#ijara-shartlari">Ijara shartlari</Link>
            </li>
            <li>
              <Link href="/poligonlar#xavfsizlik">Xavfsizlik qoidalari</Link>
            </li>
            <li>
              <Link href="/#faq">Ko&apos;p beriladigan savollar</Link>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Bog&apos;lanish</h3>
          <ul>
            <li>
              <a href="mailto:info@dronchi.uz">Yordam markaziga yozish</a>
            </li>
            <li>
              <span>Toshkent, O&apos;zbekiston</span>
            </li>
            <li>
              <span>Har kuni: 09:00–18:00</span>
            </li>
          </ul>
          <span className="footer-tag">BILIM → MASHQ → PARVOZ</span>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 DRONCHI. Barcha huquqlar himoyalangan.</span>
        <div className="footer-bottom-links">
          <a href="#maxfiylik">Maxfiylik siyosati</a>
          <a href="#shartlar">Foydalanish shartlari</a>
          <a href="#til">
            O&apos;zbekcha <ArrowUpRight size={10} />
          </a>
        </div>
      </div>
    </footer>
  );
}
