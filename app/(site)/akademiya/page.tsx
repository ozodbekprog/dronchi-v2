import type { Metadata } from "next";
import Link from "next/link";
import HomeHero from "@/components/HomeHero";
import Reveal from "@/components/Reveal";
import FlightPath from "@/components/FlightPath";
import CourseTabs from "@/components/CourseTabs";
import Products from "@/components/Products";
import Faq from "@/components/Faq";
import { ArrowUpRight, Sparkle } from "@/components/Icons";
import { courses, products, homeFaqs } from "@/lib/data";

export const metadata: Metadata = {
  title: "Akademiya — dron kurslari",
  description:
    "Dron boshqaruvi, FPV asoslari, xavfsiz parvoz, dron dasturlash va boshqa yo'nalishlar. Bosqichma-bosqich onlayn kurslar va sertifikat.",
};

const strip = [
  "Bosqichma-bosqich ta'lim",
  "O'z sur'atingizda",
  "Amaliy ko'nikmalar",
  "Natijangizni kuzating",
];

export default function AkademiyaPage() {
  return (
    <>
      <HomeHero
        eyebrow="Qiziqishdan — birinchi parvozgacha"
        title={
          <>
            Dron uchirishni
            <br />
            o&apos;rganing.
          </>
        }
        lead="Bosqichma-bosqich ta'lim dasturi orqali dron va FPV boshqaruvini o'rganing. Nazariy bilim va amaliy mashg'ulotlar bilan haqiqiy uchuvchiga aylaning."
        primaryLabel="Kurslarni ko'rish"
        primaryHref="#kurslar"
        secondaryLabel="Tajribani ko'rish"
        chipLead="Siz boshqarasiz."
        chipText="Imkoniyatlar cheksiz."
      />

      <div className="container">
        <div className="feature-strip">
          {strip.map((item) => (
            <span className="feature-item" key={item}>
              <Sparkle size={13} /> {item}
            </span>
          ))}
        </div>
      </div>

      <section className="section" id="kurslar">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <div className="section-head-copy">
                <span className="eyebrow">Akademiya</span>
                <h2>O&apos;z yo&apos;nalishingizni tanlang</h2>
                <p className="lead">
                  Dron texnologiyalarini bosqichma-bosqich o&apos;rganing. Boshlang&apos;ich
                  bilimlardan amaliy ko&apos;nikmalargacha bo&apos;lgan yo&apos;lni o&apos;zingiz
                  tanlang.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <CourseTabs courses={courses} />
          </Reveal>

          <FlightPath />
        </div>
      </section>

      <section className="section" id="dokon" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal>
            <div className="section-head">
              <div className="section-head-copy">
                <span className="eyebrow">Do&apos;kon</span>
                <h2>
                  Keyingi parvozingiz
                  <br />
                  shu yerdan boshlanadi.
                </h2>
                <p className="lead">
                  Dronlar, boshqaruv pultlari va ehtiyot qismlar bilan tanishing.
                </p>
              </div>
              <div className="section-head-side">
                <Link href="#dokon" className="btn btn-lime">
                  Barcha mahsulotlar <ArrowUpRight size={15} />
                </Link>
              </div>
            </div>
          </Reveal>
          <Reveal>
            <Products products={products} />
          </Reveal>
        </div>
      </section>

      <section className="section" id="faq" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="faq-grid">
            <Reveal>
              <div className="faq-copy">
                <span className="eyebrow">Ko&apos;p so&apos;raladigan savollar</span>
                <h2>
                  Savollaringiz
                  <br />
                  bormi?
                </h2>
                <p className="lead">
                  DRONCHI haqida eng ko&apos;p beriladigan savollarga javoblar.
                </p>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div>
                <Faq
                  items={homeFaqs}
                  foot={
                    <>
                      Shaxsiy kabinetga kirish uchun{" "}
                      <Link href="/kirish">hisobingizga kiring</Link> yoki{" "}
                      <Link href="/royxatdan-otish">ro&apos;yxatdan o&apos;ting</Link>.
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
