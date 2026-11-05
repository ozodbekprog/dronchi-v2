import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Faq from "@/components/Faq";
import PolygonExplorer, { PolygonHeroMap } from "@/components/PolygonExplorer";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Clock,
  MapPin,
  Shield,
} from "@/components/Icons";
import { polygonFaqs } from "@/lib/data";

export const metadata: Metadata = {
  title: "Poligonlar — mashq maydonlari",
  description:
    "Toshkent atrofidagi mashq maydonlarini tanlang, qulay soatni bron qiling. Soatbay ijara, ajratilgan hudud va xavfsizlik yo'riqnomasi.",
};

const tips = [
  {
    icon: Clock,
    title: "15 daqiqa oldin keling",
    text: "Kirishda bron raqami va shaxsingizni tasdiqlovchi hujjatni ko'rsating. Yo'riqnomadan so'ng maydonga o'ting.",
  },
  {
    icon: Shield,
    title: "Jihozlarni tayyorlang",
    text: "Dron, pult, zaryadlangan batareyalar va zaxira propellerlarni olib keling. Jihoz ijarasi bron narxiga kirmaydi.",
  },
  {
    icon: MapPin,
    title: "Chegarada parvoz qiling",
    text: "Faqat belgilangan hudud va balandlikda uching. Odamlar ustidan parvoz qilmang, instruktor ko'rsatmalariga amal qiling.",
  },
];

export default function PoligonlarPage() {
  return (
    <>
      <section className="container" style={{ paddingTop: 18 }}>
        <div className="hero polygon-hero">
          <div className="hero-inner">
            <div className="hero-copy">
              <nav className="page-breadcrumb on-blue" aria-label="Sahifa yo'li">
                <Link href="/">Bosh sahifa</Link>
                <span aria-hidden="true">/</span>
                <b>Poligonlar</b>
              </nav>
              <h1 className="hero-title">
                Parvozingiz uchun
                <br />
                o&apos;z joyingiz.
              </h1>
              <p className="hero-lead">
                Mashq maydonini tanlang, qulay soatni bron qiling. Belgilangan mashg&apos;ulotni
                haqiqiy parvozga aylantiring.
              </p>
              <div className="hero-actions">
                <a href="#bron" className="btn btn-lime">
                  Joyni bron qilish <ArrowUpRight size={16} />
                </a>
                <a href="#mening-bronlarim" className="hero-link">
                  Mening bronlarim <ArrowDown size={14} />
                </a>
              </div>
              <div className="hero-trust">
                <span>
                  <Check size={12} /> Soatbay ijara
                </span>
                <span>
                  <Check size={12} /> Ajratilgan hudud
                </span>
                <span>
                  <Check size={12} /> Qulay rejalashtirish
                </span>
              </div>
            </div>
            <div className="hero-visual">
              <PolygonHeroMap />
            </div>
          </div>
        </div>
      </section>

      <PolygonExplorer />

      <section className="section" id="xavfsizlik" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="panel safety-panel" id="ijara-shartlari">
            <div className="section-head" style={{ marginBottom: 0 }}>
              <div className="section-head-copy">
                <span className="eyebrow">Parvoz oldidan</span>
                <h2 style={{ marginTop: 12 }}>Yaxshi mashq — tayyorgarlikdan.</h2>
              </div>
            </div>
            <div className="tips-grid">
              {tips.map((tip) => {
                const Icon = tip.icon;
                return (
                  <article className="tip-card" key={tip.title}>
                    <span className="tip-icon">
                      <Icon size={17} />
                    </span>
                    <h3>{tip.title}</h3>
                    <p>{tip.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="faq-grid">
            <Reveal>
              <div className="faq-copy">
                <span className="eyebrow">Savol-javob</span>
                <h2>
                  Bron qilishdan oldin
                  <br />
                  bilish foydali.
                </h2>
                <p className="lead">Savolingiz qoldimi? Yordam jamoasi bilan bog&apos;laning.</p>
                <p style={{ marginTop: 14 }}>
                  <Link href="mailto:info@dronchi.uz" className="link-arrow">
                    Yordam olish <ArrowUpRight size={13} />
                  </Link>
                </p>
                <div className="faq-drone">
                  <Image
                    src="/images/poligon-drone-alpha.webp"
                    alt="DRONCHI kvadrokopteri"
                    width={370}
                    height={240}
                    sizes="380px"
                  />
                </div>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div>
                <Faq
                  items={polygonFaqs}
                  foot={
                    <>
                      Batafsil shartlar bron tasdiqlash oynasida ko&apos;rsatiladi.{" "}
                      <Link href="mailto:info@dronchi.uz">Yordam markaziga yozish</Link>
                    </>
                  }
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
