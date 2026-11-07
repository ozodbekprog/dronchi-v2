import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import HomeHero from "@/components/HomeHero";
import Reveal from "@/components/Reveal";
import FlightBanner from "@/components/FlightBanner";
import CourseTabs from "@/components/CourseTabs";
import Products from "@/components/Products";
import Faq from "@/components/Faq";
import {
  ArrowDown,
  ArrowUpRight,
  Calendar,
  Check,
  Compass,
  Lock,
  Sparkle,
} from "@/components/Icons";
import {
  courses,
  steps,
  products,
  opportunities,
  news,
  homeFaqs,
} from "@/lib/data";

export const metadata: Metadata = {
  title: { absolute: "DRONCHI — dron va FPV o'quv platformasi" },
  description:
    "Dron va FPV boshqaruvini bosqichma-bosqich o'rganing: kurslar, poligonlar, do'kon va sertifikat bir platformada.",
};

const strip = [
  "Bosqichma-bosqich ta'lim",
  "O'z sur'atingizda",
  "Amaliy ko'nikmalar",
  "Natijangizni kuzating",
];


export default function HomePage() {
  const feature = news[0];
  const minis = news.slice(1);

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
        lead="Dronni tushuning. Pultni his qiling. Osmonga chiqing. Nazariya, poligon mashqlari va amaliyot — bir yo'lda."
        primaryLabel="Kurslarni ko'rish"
        primaryHref="/akademiya"
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

      <section className="section">
        <div className="container">
          <div className="about-grid">
            <Reveal>
              <div className="photo-frame">
                <div className="photo">
                  <Image
                    src="/images/about.webp"
                    alt="Himoya karkasidagi dronlar — DRONCHI o'quv jihozlari"
                    fill
                    sizes="(max-width: 1024px) 100vw, 560px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="about-copy">
                <span className="eyebrow">Biz haqimizda</span>
                <h2>
                  Osmon yaqinroq.
                  <br />
                  Imkoniyatlar kengroq.
                </h2>
                <p className="lead">
                  DRONCHI — dronlarni boshqarishni o&apos;rganish uchun yaratilgan zamonaviy
                  ta&apos;lim platformasi. Bu yerda siz nazariy bilimlarni o&apos;zlashtirasiz,
                  interaktiv mashg&apos;ulotlar orqali tajriba ortirasiz va parvozga tayyor
                  bo&apos;lasiz.
                </p>
                <p className="quote-line">
                  O&apos;rganish qiyin bo&apos;lishi shart emas. Muhimi — to&apos;g&apos;ri
                  yo&apos;nalishdan boshlash.
                </p>
                <Link href="/akademiya" className="btn btn-lime">
                  Biz bilan tanishing <ArrowUpRight size={15} />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal>
            <div className="section-head">
              <div className="section-head-copy">
                <span className="eyebrow">O&apos;quv jarayoni</span>
                <h2>
                  To&apos;rt qadam.
                  <br />
                  Bir katta parvoz.
                </h2>
                <p className="lead">
                  Profilingizdan ilk mashqingizgacha — har bir qadam tushunarli.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="steps-grid">
              {steps.map((step) => (
                <article
                  key={step.n}
                  className={`step-card${step.highlight ? " is-highlight" : ""}`}
                >
                  <div className="step-photo">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      sizes="(max-width: 760px) 100vw, 290px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <span className="step-arrow" aria-hidden="true">
                    <ArrowUpRight size={14} />
                  </span>
                  <div className="step-body">
                    <span className="step-num">{step.n}</span>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                </article>
              ))}
            </div>
            <div className="steps-cta">
              <Link href="/royxatdan-otish" className="btn btn-lime">
                O&apos;rganishni boshlash <ArrowUpRight size={15} />
              </Link>
            </div>
          </Reveal>

          <FlightBanner />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
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
              <div className="section-head-side">
                <Link href="/akademiya" className="btn btn-lime">
                  Barcha kurslar <ArrowUpRight size={15} />
                </Link>
              </div>
            </div>
          </Reveal>
          <CourseTabs courses={courses} limit={3} />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="map-grid">
            <Reveal>
              <div className="map-copy">
                <span className="eyebrow">Poligonlar</span>
                <h2>Xaritadan haqiqiy parvozga.</h2>
                <p className="lead">
                  Toshkent xaritasida o&apos;zingizga qulay maydonni toping. Belgilangan
                  manzillar va dron yo&apos;nalishlari — haqiqiy mashq uchun.
                </p>
                <Link href="/poligonlar" className="btn btn-lime">
                  Xaritani o&apos;rganish <ArrowUpRight size={15} />
                </Link>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <Link href="/poligonlar" className="map-card" aria-label="Poligonlar xaritasini ochish">
                <Image
                  src="/images/map-hero.webp"
                  alt="Toshkent va atrofi xaritasi"
                  width={491}
                  height={200}
                  sizes="(max-width: 1024px) 100vw, 660px"
                />
                <span className="map-label">Toshkent va uning atrofi</span>
                <span className="map-button" aria-hidden="true">
                  <Compass size={28} />
                </span>
                <span className="map-caption">
                  <b>Toshkent xaritasi</b>
                  <span>Namunaviy yo&apos;nalishlar</span>
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="sim-home">
            <Reveal>
              <div className="sim-home-visual">
                <Image
                  src="/images/simulyator-forest.png"
                  alt="Parvoz Drone Simulator — The Green lokatsiyasi"
                  fill
                  sizes="(max-width: 1024px) 92vw, 600px"
                  style={{ objectFit: "cover" }}
                />
                <span className="sim-home-live">
                  <i /> LIVE
                </span>
                <span className="sim-home-label">
                  PARVOZ DRONE SIM <em>beta</em>
                </span>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="sim-home-copy">
                <span className="eyebrow">Parvoz simulyatori</span>
                <h2>
                  Uchishni avval
                  <br />
                  simulyatorda sinang.
                </h2>
                <p className="lead">
                  Brauzerda ishlaydigan FPV trenajyor: darslar, erkin parvoz va musobaqa.
                  O&apos;rnatish ham, to&apos;lov ham shart emas.
                </p>
                <ul className="sim-home-list">
                  <li>
                    <Check size={14} /> Brauzerda, o&apos;rnatishsiz
                  </li>
                  <li>
                    <Check size={14} /> Klaviatura, gamepad yoki USB radio
                  </li>
                  <li>
                    <Check size={14} /> 5 lokatsiya · 30 marshrut · 12 dars
                  </li>
                  <li>
                    <Check size={14} /> Sayt ichida, xavfsiz oynada
                  </li>
                  <li>
                    <Lock size={14} /> Faqat kurs sotib olganlar uchun
                  </li>
                </ul>
                <div className="sim-home-actions">
                  <Link href="/simulyator#oyna" className="btn btn-lime">
                    Boshlash <ArrowUpRight size={15} />
                  </Link>
                  <Link href="/simulyator" className="btn btn-outline">
                    Batafsil
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
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
                <Link href="/akademiya#dokon" className="btn btn-lime">
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

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="opportunities-grid">
            <Reveal>
              <div>
                <span className="eyebrow">Imkoniyatlar</span>
                <h2 style={{ margin: "14px 0 16px" }}>Bilimdan tajribagacha</h2>
                <p className="lead" style={{ maxWidth: 470 }}>
                  DRONCHI bilan o&apos;rganish faqat darslar bilan cheklanmaydi. Yangi
                  imkoniyatlarni kashf eting, tajribangizni oshiring va dronlar olamidagi
                  yangiliklardan xabardor bo&apos;ling.
                </p>
                <div className="opp-list">
                  {opportunities.map((item) => (
                    <div className="opp-item" key={item.n}>
                      <span className="opp-num">{item.n}</span>
                      <div>
                        <h3>{item.title}</h3>
                        <p>{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className="event-card">
                <div className="event-photo">
                  <Image
                    src="/images/event.webp"
                    alt="FPV ko'zoynagi bilan mashg'ulot"
                    fill
                    sizes="(max-width: 1024px) 100vw, 640px"
                    style={{ objectFit: "cover" }}
                  />
                  <span className="event-badge">Ta&apos;lim uchun ishlatilgan namunaviy tasvir</span>
                </div>
                <div className="event-body">
                  <h3>Tadbirlar</h3>
                  <p>
                    Dron texnologiyalari bilan bog&apos;liq tadbirlar, uchrashuvlar va yangi
                    imkoniyatlarni kuzatib boring.
                  </p>
                  <p className="event-empty">Hozircha e&apos;lon qilingan tadbirlar yo&apos;q.</p>
                  <Link href="/yangiliklar" className="link-arrow">
                    Tadbirlarni ko&apos;rish <ArrowUpRight size={13} />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal>
            <div className="section-head">
              <div className="section-head-copy">
                <span className="eyebrow">Yangiliklar</span>
                <h2>
                  Dronlar olamidan xabardor
                  <br />
                  bo&apos;ling
                </h2>
                <p className="lead">
                  Dron texnologiyalari, ta&apos;lim va platformamizdagi yangiliklarni bir joyda
                  kuzatib boring.
                </p>
              </div>
              <div className="section-head-side">
                <Link href="/yangiliklar" className="btn btn-lime">
                  Barcha yangiliklar <ArrowUpRight size={15} />
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="news-grid">
              <Link href="/yangiliklar" className="news-feature">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  sizes="(max-width: 760px) 100vw, 760px"
                  style={{ objectFit: "cover" }}
                />
                <div className="news-feature-body">
                  <div className="news-meta">
                    <span>{feature.type}</span>
                    <span className="dot" />
                    <span>{feature.date}</span>
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.excerpt}</p>
                  <span className="link-arrow">
                    O&apos;qishga o&apos;tish <ArrowUpRight size={13} />
                  </span>
                </div>
              </Link>

              <div className="news-side">
                {minis.map((item) => (
                  <Link href="/yangiliklar" className="news-mini" key={item.id}>
                    <span className="news-mini-img">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="112px"
                        style={{ objectFit: "cover" }}
                      />
                    </span>
                    <div className="news-mini-body">
                      <div className="news-meta">
                        <span>{item.type}</span>
                        <span className="dot" />
                        <span>{item.date}</span>
                      </div>
                      <h3>{item.title}</h3>
                    </div>
                    <span className="news-arrow">
                      <ArrowUpRight size={14} />
                    </span>
                  </Link>
                ))}

                <div className="news-tip">
                  <Calendar size={15} />
                  <div>
                    <b>Boshlash uchun tavsiya</b>
                    Tajribangiz bo&apos;lmasa, &ldquo;Dron boshqaruvi asoslari&rdquo;dan
                    boshlang.
                  </div>
                </div>
              </div>
            </div>
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

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal>
            <div className="cta-banner">
              <div>
                <span className="eyebrow on-blue">Birinchi qadam</span>
                <h2>Birinchi parvozingizni bugun boshlang.</h2>
                <p>Ro&apos;yxatdan o&apos;ting, kursni tanlang va osmonga chiqing.</p>
              </div>
              <div className="cta-side">
                <Link href="/royxatdan-otish" className="btn btn-lime">
                  Ro&apos;yxatdan o&apos;tish <ArrowUpRight size={15} />
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
