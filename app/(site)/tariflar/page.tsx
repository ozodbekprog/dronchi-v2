import type { Metadata } from "next";
import Link from "next/link";
import HomeHero from "@/components/HomeHero";
import Reveal from "@/components/Reveal";
import Faq from "@/components/Faq";
import TariffGrid from "@/components/TariffGrid";
import {
  ArrowUpRight,
  GraduationCap,
  Sparkle,
} from "@/components/Icons";
import { tariffFaqs, tariffs } from "@/lib/data";

export const metadata: Metadata = {
  title: "Tariflar — FPV asoslari kursi",
  description:
    "FPV asoslari kursi uchun tariflar: Mustaqil, Qo'llab-quvvatlash va Mentor bilan. 18 dars, 6 soat, sertifikat. O'zingizga mos yordam darajasini tanlang.",
};

export default function TariflarPage() {
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
          <b>Tariflar</b>
        </nav>

        <div className="section-sm">
          <Reveal>
            <div className="tariff-intro">
              <div>
                <span className="eyebrow">Tariflar</span>
                <h2 className="h1">Birinchi parvozga mos tarifni tanlang.</h2>
                <p className="lead">
                  FPV asoslari kursini xarid qiling. O&apos;zingizga mos yordam darajasini tanlab,
                  o&apos;rganishni shaxsiy kabinetingizda davom ettiring.
                </p>
              </div>
              <div className="tariff-intro-side">
                <span>Kursni allaqachon olganmisiz?</span>
                <Link href="/kirish" className="btn btn-outline">
                  Shaxsiy kabinet <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="course-strip">
              <div className="course-strip-title">
                <b>FPV asoslari</b>
                <span>Boshlang&apos;ich daraja</span>
              </div>
              <div className="course-strip-meta">
                <span>
                  <Sparkle size={13} /> 18 dars · 6 soat
                </span>
                <span>
                  <Sparkle size={13} /> Onlayn · O&apos;z sur&apos;atingizda
                </span>
                <span>
                  <Sparkle size={13} /> Sertifikat beriladi
                </span>
              </div>
            </div>
          </Reveal>

          <p className="price-note">
            <span className="badge">Namunaviy narxlar</span>
            Tariflar, kirish muddati va qo&apos;shimcha xizmatlar — konsept taklif. Yakuniy shartlar
            xarid oldidan tasdiqlanadi.
          </p>

          <Reveal>
            <TariffGrid tariffs={tariffs} />
          </Reveal>
          <p className="tariff-footnote">
            Barcha tariflarda bir xil to&apos;liq kurs. Farqi — qo&apos;shimcha yordamda. Dron va
            boshqa jihozlar narxga kiritilmagan.
          </p>

          <Reveal>
            <div className="audience-banner">
              <span className="audience-icon" aria-hidden="true">
                <GraduationCap size={24} />
              </span>
              <div className="audience-copy">
                <span className="eyebrow">O&apos;quvchilar uchun</span>
                <h2>O&apos;qishni davom ettiramizmi?</h2>
                <p>
                  Xarid qilingan kurslar, darslar va o&apos;quv jarayoningiz — barchasi shaxsiy
                  kabinetingizda. Qayta xarid qilish shart emas.
                </p>
              </div>
              <div className="audience-side">
                <Link href="/kirish" className="btn btn-lime">
                  Shaxsiy kabinet <ArrowUpRight size={15} />
                </Link>
                <span>Mavjud hisobingiz bilan kiring</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal>
            <span className="eyebrow">Qanday ishlaydi?</span>
            <h2 style={{ margin: "14px 0 0" }}>Tarifdan — birinchi darsgacha.</h2>
          </Reveal>
          <div className="steps-line">
            <div className="steps-line-item">
              <div className="steps-line-top">
                <span className="steps-line-num">01</span>
                <h3>Tarifni tanlang</h3>
              </div>
              <p>
                O&apos;zingizga mos paketdagi tugmani bosing. Kurs va qo&apos;shimcha
                xizmatlarni tekshiring.
              </p>
            </div>
            <div className="steps-line-item">
              <div className="steps-line-top">
                <span className="steps-line-num">02</span>
                <h3>Hisobga kiring va to&apos;lang</h3>
              </div>
              <p>
                Kiring yoki ro&apos;yxatdan o&apos;ting. Yakuniy narx va shartlar bilan tanishib,
                to&apos;lovni tasdiqlang.
              </p>
            </div>
            <div className="steps-line-item">
              <div className="steps-line-top">
                <span className="steps-line-num">03</span>
                <h3>Kabineta o&apos;rganing</h3>
              </div>
              <p>
                To&apos;lov tasdiqlangach, kursni &ldquo;Mening kurslarim&rdquo; bo&apos;limidan
                oching va birinchi darsdan boshlang.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="faq" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="faq-grid">
            <Reveal>
              <div className="faq-copy">
                <span className="eyebrow">Ko&apos;p so&apos;raladigan savollar</span>
                <h2>
                  Xarid va kirish
                  <br />
                  haqida.
                </h2>
                <p className="lead">
                  To&apos;lovdan birinchi darsgacha — muhim savollarga qisqa javoblar.
                </p>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div>
                <Faq
                  items={tariffFaqs}
                  foot={
                    <>
                      Boshqa savolingiz bormi?{" "}
                      <Link href="mailto:info@dronchi.uz">Yordam markaziga yozing</Link>.
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
