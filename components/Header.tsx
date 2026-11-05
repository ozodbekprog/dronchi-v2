"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import useDemoSession from "@/lib/useDemoSession";
import Logo from "./Logo";
import LangSwitch from "./LangSwitch";
import { ArrowUpRight, Close, Menu, Moon, Sun, User } from "./Icons";

const links = [
  { href: "/kabinet", label: "Kabinet" },
  { href: "/akademiya", label: "Akademiya" },
  { href: "/poligonlar", label: "Poligonlar" },
  { href: "/simulyator", label: "Simulyator" },
  { href: "/tariflar", label: "Tariflar" },
  { href: "/yangiliklar", label: "Yangiliklar" },
  { href: "/ai", label: "Fariza" },
];

type Theme = "day" | "night";

export default function Header() {
  const pathname = usePathname();
  const [theme, setTheme] = useState<Theme>("day");
  const [menuOpen, setMenuOpen] = useState(false);
  const { session } = useDemoSession();

  useEffect(() => {
    const current = document.documentElement.dataset.theme;
    setTheme(current === "night" ? "night" : "day");
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("no-scroll", menuOpen);
    return () => document.body.classList.remove("no-scroll");
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const toggleTheme = () => {
    const next: Theme = theme === "night" ? "day" : "night";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("dronchi-theme", next);
    } catch {
      /* localStorage mavjud bo'lmasa ham rejim ishlaydi */
    }
    setTheme(next);
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <div className="site-header-wrap">
      <div className="container">
        <header className="site-header">
          <Logo />

          <nav className="main-nav" aria-label="Asosiy menyu">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <LangSwitch />

            <button
              type="button"
              className="icon-btn"
              onClick={toggleTheme}
              aria-label={theme === "night" ? "Kunduzgi rejimga o'tish" : "Tungi rejimga o'tish"}
              title={theme === "night" ? "Kunduzgi rejim" : "Tungi rejim"}
            >
              {theme === "night" ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            {session ? (
              <Link href="/kabinet" className="header-account" title="Demo hisob — shaxsiy kabinet">
                <span className="header-account-avatar" aria-hidden="true">
                  <User size={14} />
                </span>
                <span className="header-account-label">Demo</span>
              </Link>
            ) : (
              <Link href="/kirish" className="header-login">
                Kirish
              </Link>
            )}
            {session ? (
              <Link href="/kabinet" className="btn btn-primary header-cta">
                Kursim <ArrowUpRight size={15} />
              </Link>
            ) : (
              <Link href="/royxatdan-otish" className="btn btn-primary header-cta">
                Boshla <ArrowUpRight size={15} />
              </Link>
            )}

            <button
              type="button"
              className="icon-btn burger"
              onClick={() => setMenuOpen(true)}
              aria-label="Menyuni ochish"
              aria-expanded={menuOpen}
            >
              <Menu size={19} />
            </button>
          </div>
        </header>
      </div>

      {menuOpen && (
        <div className="mobile-menu" role="dialog" aria-modal="true" aria-label="Mobil menyu">
          <div className="mobile-menu-head">
            <Logo />
            <button
              type="button"
              className="icon-btn"
              onClick={() => setMenuOpen(false)}
              aria-label="Menyuni yopish"
            >
              <Close size={17} />
            </button>
          </div>

          <nav aria-label="Mobil menyu havolalari">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mobile-menu-actions">
            <LangSwitch />
            <button type="button" className="btn btn-outline btn-wide" onClick={toggleTheme}>
              {theme === "night" ? <Sun size={16} /> : <Moon size={16} />}
              {theme === "night" ? "Kunduzgi rejim" : "Tungi rejim"}
            </button>
            {session ? (
              <>
                <Link href="/kabinet" className="btn btn-outline btn-wide" onClick={() => setMenuOpen(false)}>
                  <User size={16} /> Demo hisob
                </Link>
                <Link
                  href="/kabinet"
                  className="btn btn-primary btn-wide"
                  onClick={() => setMenuOpen(false)}
                >
                  Kursni davom ettirish <ArrowUpRight size={15} />
                </Link>
              </>
            ) : (
              <>
                <Link href="/kirish" className="btn btn-outline btn-wide" onClick={() => setMenuOpen(false)}>
                  Kirish
                </Link>
                <Link
                  href="/royxatdan-otish"
                  className="btn btn-primary btn-wide"
                  onClick={() => setMenuOpen(false)}
                >
                  Ro&apos;yxatdan o&apos;tish <ArrowUpRight size={15} />
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
