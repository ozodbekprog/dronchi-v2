"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import useDemoSession from "@/lib/useDemoSession";
import Logo from "./Logo";
import LangSwitch from "./LangSwitch";
import {
  Award,
  BookOpen,
  Calendar,
  Cart,
  ChevronRight,
  Compass,
  Info,
  MapPin,
  Monitor,
  Moon,
  Shield,
  Sparkle,
  Sun,
  User,
} from "./Icons";

type IconProps = { size?: number; className?: string };

function Flame({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M13.4 2.2c.4 3.2-.8 4.7-2.2 6.1-1.3 1.3-2.7 2.7-2.7 5.4a3.5 3.5 0 0 0 7 .2c0-1.5-.6-2.5-1.3-3.5-.6-.9-1.2-1.8-1.3-3.1 2.9 1.8 5.1 4.7 5.1 8.2A9 9 0 1 1 3 12.6c0-4.4 2.2-7.5 5.4-9.4-.1 1.9.6 3.2 1.5 4.2.4-2.2 1.7-4 3.5-5.2Z" />
    </svg>
  );
}

function Trophy({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M8 3h8v6a4 4 0 0 1-8 0V3Z" />
      <path d="M8 5H4v2a4 4 0 0 0 4 4M16 5h4v2a4 4 0 0 1-4 4M12 13v4M9 21h6M10 21v-4h4v4" />
    </svg>
  );
}

function Home({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1V10Z" />
    </svg>
  );
}

function Route({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="6" cy="19" r="2.4" />
      <circle cx="18" cy="5" r="2.4" />
      <path d="M8.4 19H15a3.5 3.5 0 0 0 0-7H9a3.5 3.5 0 0 1 0-7h6.6" />
    </svg>
  );
}

function Cap({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="m2 9 10-5 10 5-10 5L2 9Z" />
      <path d="M6 11.2V16c0 1.7 2.7 3 6 3s6-1.3 6-3v-4.8M22 9v6" />
    </svg>
  );
}

function News({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M5 5h11a2 2 0 0 1 2 2v12H7a2 2 0 0 1-2-2V5Z" />
      <path d="M18 9h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-1M8 9h7M8 13h7M8 17h4" />
    </svg>
  );
}

function Bell({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M18 8a6 6 0 1 0-12 0c0 7-3 8-3 8h18s-3-1-3-8M10.3 21a1.9 1.9 0 0 0 3.4 0" />
    </svg>
  );
}

function Settings({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1 1.55V21a2 2 0 1 1-4 0v-.09A1.7 1.7 0 0 0 9 19.36a1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.64 15a1.7 1.7 0 0 0-1.55-1H3a2 2 0 1 1 0-4h.09A1.7 1.7 0 0 0 4.64 9a1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.64a1.7 1.7 0 0 0 1-1.55V3a2 2 0 1 1 4 0v.09a1.7 1.7 0 0 0 1 1.55 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.36 9a1.7 1.7 0 0 0 1.55 1H21a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-1.55 1Z" />
    </svg>
  );
}

const NAV_GROUPS: {
  label: string;
  items: { href: string; label: string; icon: ReactNode; paidOnly?: boolean }[];
}[] = [
  {
    label: "O'rganish",
    items: [
      { href: "/kabinet", label: "Asosiy", icon: <Home size={16} /> },
      { href: "/kabinet/oquv-yoli", label: "O'quv yo'li", icon: <Route size={16} /> },
      { href: "/kabinet/akademiya", label: "Akademiya", icon: <Cap size={16} /> },
      { href: "/simulyator", label: "Simulyator", icon: <Monitor size={16} />, paidOnly: true },
      { href: "/kabinet/kurslarim", label: "Mening kurslarim", icon: <BookOpen size={16} /> },
      { href: "/kabinet/reyting", label: "Reyting", icon: <Trophy size={16} /> },
      { href: "/ai", label: "Fariza", icon: <Sparkle size={16} /> },
    ],
  },
  {
    label: "Jamiyat",
    items: [
      { href: "/kabinet/yangiliklar", label: "Yangiliklar", icon: <News size={16} /> },
      { href: "/kabinet/tadbirlar", label: "Tadbirlar", icon: <Calendar size={16} /> },
    ],
  },
  {
    label: "Xarid",
    items: [
      { href: "/kabinet/dokon", label: "Do'kon", icon: <Cart size={16} /> },
      { href: "/kabinet/zonalar", label: "Zonalar", icon: <MapPin size={16} /> },
      { href: "/kabinet/sertifikatlar", label: "Sertifikatlar", icon: <Award size={16} /> },
    ],
  },
];

const BOTTOM_LINKS = [
  { href: "/kabinet/profil", label: "Profil", icon: <User size={16} /> },
  { href: "/", label: "Sayt", icon: <Compass size={16} /> },
  { href: "/admin", label: "Admin panel", icon: <Shield size={16} /> },
  { href: "/kirish", label: "Kirish", icon: <Info size={16} /> },
];

const TITLES: Record<string, string> = {
  "/kabinet": "Asosiy",
  "/kabinet/oquv-yoli": "O'quv yo'li",
  "/kabinet/akademiya": "Akademiya",
  "/kabinet/kurslarim": "Mening kurslarim",
  "/kabinet/reyting": "Reyting",
  "/kabinet/yangiliklar": "Yangiliklar",
  "/kabinet/tadbirlar": "Tadbirlar",
  "/kabinet/dokon": "Do'kon",
  "/kabinet/zonalar": "Zonalar",
  "/kabinet/sertifikatlar": "Sertifikatlar",
  "/kabinet/profil": "Profil",
  "/kabinet/admin": "Admin panel",
  "/kabinet/admin/kurslar": "Kurslarni boshqarish",
};

function initialsOf(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export default function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { session } = useDemoSession();
  const userName = session?.name ?? "Aziz Karimov";
  const avatar = initialsOf(userName) || "AK";
  const title =
    Object.entries(TITLES)
      .sort((a, b) => b[0].length - a[0].length)
      .find(([href]) =>
        href === "/kabinet" ? pathname === href : pathname === href || pathname.startsWith(`${href}/`)
      )?.[1] ?? "Asosiy";
  const [theme, setTheme] = useState<"day" | "night">("day");

  const isActive = (href: string) =>
    href === "/kabinet"
      ? pathname === href
      : pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "night" ? "night" : "day");
  }, []);

  const toggleTheme = () => {
    const next = theme === "night" ? "day" : "night";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("dronchi-theme", next);
    } catch {
      /* localStorage mavjud bo'lmasa ham rejim ishlaydi */
    }
    setTheme(next);
  };

  return (
    <div className="app">
      <aside className="app-side">
        <div className="app-side__brand">
          <Logo href="/kabinet" />
          <span className="app-side__badge">v2</span>
        </div>

        <div className="app-side__groups">
          {NAV_GROUPS.map((group) => (
            <div className="app-side__group" key={group.label}>
              <span className="app-side__label">{group.label}</span>
              <nav className="app-side__nav" aria-label={group.label}>
                {group.items.filter((item) => !item.paidOnly || session).map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={isActive(item.href) ? "is-active" : undefined}
                    aria-current={isActive(item.href) ? "page" : undefined}
                  >
                    {item.icon} {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </div>

        <div className="app-side__bottom">
          <nav className="app-side__nav" aria-label="Hisob">
            {BOTTOM_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={isActive(item.href) ? "is-active" : undefined}
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                {item.icon} {item.label}
              </Link>
            ))}
          </nav>
          <Link href="/kabinet/profil" className="app-side__me">
            <span className="app-avatar">{avatar}</span>
            <div>
              <strong>{userName}</strong>
              <em>Lvl 2 · 6 kun</em>
            </div>
          </Link>
        </div>
      </aside>

      <div className="app-main">
        <header className="app-top">
          <div className="app-crumbs">
            <Link href="/kabinet">DRONCHI</Link>
            <ChevronRight size={12} />
            <span>{title}</span>
          </div>

          <div className="app-top__actions">
            <button
              type="button"
              className="app-icon"
              onClick={toggleTheme}
              aria-label={theme === "night" ? "Kunduzgi rejimga o'tish" : "Tungi rejimga o'tish"}
              title={theme === "night" ? "Kunduzgi rejim" : "Tungi rejim"}
            >
              {theme === "night" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <LangSwitch variant="app" />
            <button
              type="button"
              className="app-icon app-icon--hide-sm"
              aria-label="Sozlamalar"
              title="Sozlamalar"
            >
              <Settings size={16} />
            </button>
            <button type="button" className="app-icon app-bell" aria-label="Bildirishnomalar">
              <Bell size={16} />
              <i aria-hidden="true" />
            </button>
            <Link href="/kabinet/profil" className="app-avatar app-avatar--top" aria-label="Profil">
              {avatar}
            </Link>
          </div>
        </header>

        {children}
      </div>

    </div>
  );
}
