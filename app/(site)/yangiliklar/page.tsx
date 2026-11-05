import type { Metadata } from "next";
import Link from "next/link";
import HomeHero from "@/components/HomeHero";
import Reveal from "@/components/Reveal";
import NewsExplorer from "@/components/NewsExplorer";
import { ArrowUpRight } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Yangiliklar",
  description:
    "Dron texnologiyalari, ta'lim va platformadagi yangilanishlar. Yangi kurslar, tadbirlar va e'lonlardan xabardor bo'ling.",
};

export default function YangiliklarPage() {
  return (
    <>
      <HomeHero
        eyebrow="Qiziqishdan — birinchi parvozgacha"
        title={
          <>
            Parvozni
            <br />
            o&apos;zingizdan
            <br />
            boshlang.
          </>
        }
        lead="Dronni tushuning. Pultni his qiling. Osmonga chiqing. Nazariya, amaliy mashq va poligon — bir yo'lda."
        primaryLabel="Kurslarni ko'rish"
        primaryHref="/akademiya"
        secondaryLabel="Tajribani ko'rish"
        chipLead="Siz boshqarasiz."
        chipText="Imkoniyatlar cheksiz."
      />

      <div className="container">
        <nav className="page-breadcrumb" aria-label="Sahifa yo'li">
          <Link href="/">Bosh sahifa</Link>
          <span aria-hidden="true">/</span>
          <b>Yangiliklar</b>
        </nav>

        <div className="inner-hero" style={{ paddingBottom: 0 }}>
          <Reveal>
            <span className="eyebrow">Yangiliklar</span>
            <h2 className="h1">
              Dronlar olamidan xabardor
              <br />
              bo&apos;ling
            </h2>
            <p className="lead">
              Dron texnologiyalari, ta&apos;lim va platformamizdagi yangiliklarni bir joyda kuzatib
              boring.
            </p>
          </Reveal>
        </div>

        <NewsExplorer />
      </div>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal>
            <div className="cta-banner">
              <div>
                <span className="eyebrow on-blue">Keyingi qadam</span>
                <h2>Xabardan — birinchi parvozga.</h2>
                <p>Yangilikni o&apos;qidingizmi? Endi bilimni amaliyotga aylantiring.</p>
              </div>
              <div className="cta-side">
                <Link href="/akademiya" className="btn btn-lime">
                  Kurslarni ko&apos;rish <ArrowUpRight size={15} />
                </Link>
                <span>Onlayn · O&apos;z sur&apos;atingizda</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
