import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#main" className="skip-link">
        Asosiy mazmunga o&apos;tish
      </a>
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
