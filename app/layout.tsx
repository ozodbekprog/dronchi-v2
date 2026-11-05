import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import AiWidget from "@/components/ai/AiWidget";
import LanguageSync from "@/components/LanguageSync";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "DRONCHI — dron va FPV o'quv platformasi",
    template: "%s — DRONCHI",
  },
  description:
    "Dronlarni boshqarishni o'rganing: bosqichma-bosqich kurslar, poligonlar, amaliy mashg'ulotlar va sertifikat.",
  metadataBase: new URL("https://dronchi.uz"),
  openGraph: {
    title: "DRONCHI — dron va FPV o'quv platformasi",
    description:
      "Bilimdan amaliyotga, amaliyotdan osmonga. Dron va FPV bo'yicha onlayn kurslar, poligonlar va sertifikat.",
    type: "website",
    locale: "uz_UZ",
    siteName: "DRONCHI",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#eef3fb" },
    { media: "(prefers-color-scheme: dark)", color: "#080f20" },
  ],
};

const themeScript = `(function(){try{var t=localStorage.getItem('dronchi-theme');if(t!=='night'&&t!=='day'){t='day'}document.documentElement.dataset.theme=t;}catch(e){document.documentElement.dataset.theme='day';}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="uz"
      className={manrope.variable}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        {children}
        <LanguageSync />
        <AiWidget />
      </body>
    </html>
  );
}
