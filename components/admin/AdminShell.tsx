"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import Logo from "@/components/Logo";
import LangSwitch from "@/components/LangSwitch";
import {
  Award,
  BarChart,
  Bell,
  BookOpen,
  Calendar,
  Card,
  Cart,
  ChevronLeft,
  Layers,
  MapPin,
  Moon,
  News,
  Sun,
  Target,
  Users,
} from "@/components/Icons";

const NAV = [
  { href: "/admin", label: "Umumiy", icon: <BarChart size={16} /> },
  { href: "/admin/kurslar", label: "Kurslar", icon: <Layers size={16} /> },
  { href: "/admin/darslar", label: "Darslar", icon: <BookOpen size={16} /> },
  { href: "/admin/testlar", label: "Testlar", icon: <Target size={16} /> },
  { href: "/admin/foydalanuvchilar", label: "Foydalanuvchilar", icon: <Users size={16} /> },
  { href: "/admin/yangiliklar", label: "Yangiliklar", icon: <News size={16} /> },
  { href: "/admin/tadbirlar", label: "Tadbirlar", icon: <Calendar size={16} /> },
  { href: "/admin/dokon", label: "Do'kon", icon: <Cart size={16} /> },
  { href: "/admin/buyurtmalar", label: "Buyurtmalar", icon: <Card size={16} /> },
  { href: "/admin/sertifikatlar", label: "Sertifikatlar", icon: <Award size={16} /> },
  { href: "/admin/bildirishnomalar", label: "Bildirishnomalar", icon: <Bell size={16} /> },
  { href: "/admin/zonalar", label: "Zonalar", icon: <MapPin size={16} /> },
];

const META: Record<string, { title: string; text: string }> = {
  "/admin": {
    title: "Umumiy",
    text: "Kontent va foydalanuvchilarni boshqaring",
  },
  "/admin/kurslar": {
    title: "Kurslar",
    text: "Nom, kategoriya va nashr holatini boshqaring",
  },
  "/admin/darslar": {
    title: "Darslar",
    text: "Darslarni tahrirlang, tartibini va holatini boshqaring",
  },
  "/admin/testlar": {
    title: "Testlar",
    text: "Kurs testlarini yarating va holatini boshqaring",
  },
  "/admin/foydalanuvchilar": {
    title: "Foydalanuvchilar",
    text: "Rolni o'zgartiring yoki hisobni bloklang",
  },
  "/admin/yangiliklar": {
    title: "Yangiliklar",
    text: "Yangiliklarni yozing, tahrirlang va nashr qiling",
  },
  "/admin/tadbirlar": {
    title: "Tadbirlar",
    text: "Trening, musobaqa va workshoplarni boshqaring",
  },
  "/admin/dokon": {
    title: "Do'kon",
    text: "Mahsulotlar, narxlar va ombor holatini boshqaring",
  },
  "/admin/buyurtmalar": {
    title: "Buyurtmalar",
    text: "Buyurtmalar holatini kuzatib boring",
  },
  "/admin/sertifikatlar": {
    title: "Sertifikatlar",
    text: "Sertifikatlarni bering, tekshiring va bekor qiling",
  },
  "/admin/bildirishnomalar": {
    title: "Bildirishnomalar",
    text: "O'quvchilarga xabar yuboring va qoralamalarni boshqaring",
  },
  "/admin/zonalar": {
    title: "Zonalar",
    text: "Poligonlar, narxlar va mavjudlikni boshqaring",
  },
};

export default function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const meta = META[pathname] ?? META["/admin"];
  const [theme, setTheme] = useState<"day" | "night">("day");

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

  const resetDemo = () => {
    try {
      Object.keys(localStorage)
        .filter((key) => key.startsWith("dronchi-admin"))
        .forEach((key) => localStorage.removeItem(key));
    } catch {
      /* localStorage mavjud bo'lmasa ham sahifa yangilanadi */
    }
    window.location.reload();
  };

  return (
    <div className="app admin-app">
      <aside className="app-side admin-side">
        <div className="app-side__brand">
          <Logo href="/admin" />
          <span className="admin-badge">ADMIN</span>
        </div>

        <span className="app-side__label">Boshqaruv</span>
        <nav className="app-side__nav admin-nav" aria-label="Admin bo'limlari">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={pathname === item.href ? "is-active" : undefined}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              {item.icon} {item.label}
            </Link>
          ))}
        </nav>

        <div className="admin-status-card">
          <span>Holat</span>
          <div>
            Nashrda kurslar <b>9/9</b>
          </div>
          <div>
            Yashirilgan darslar <b>0</b>
          </div>
          <div>
            Bloklangan hisoblar <b>1</b>
          </div>
        </div>

        <div className="admin-side__bottom">
          <p>Demo rejim: o&apos;zgarishlar brauzerda saqlanadi.</p>
          <Link href="/kabinet" className="admin-back">
            <ChevronLeft size={14} /> Ilovaga qaytish
          </Link>
          <button type="button" className="admin-reset" onClick={resetDemo}>
            O&apos;zgarishlarni tozalash
          </button>
          <span className="admin-foot">DRONCHI v2 — admin</span>
        </div>
      </aside>

      <div className="app-main admin-main">
        <header className="admin-top">
          <div>
            <span className="eyebrow">Admin panel</span>
            <h1>{meta.title}</h1>
            <p>{meta.text}</p>
          </div>
          <div className="admin-top__actions">
            <LangSwitch variant="app" />
            <button
              type="button"
              className="app-icon"
              onClick={toggleTheme}
              aria-label={theme === "night" ? "Kunduzgi rejimga o'tish" : "Tungi rejimga o'tish"}
              title={theme === "night" ? "Kunduzgi rejim" : "Tungi rejim"}
            >
              {theme === "night" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <span className="admin-avatar">AD</span>
          </div>
        </header>

        <main id="main" className="admin-content">
          {children}
        </main>
      </div>
    </div>
  );
}
