import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import SimulatorLaunch, { SimulatorOverlay } from "@/components/SimulatorLaunch";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Clock,
  Compass,
  GraduationCap,
  Layers,
  Lock,
  Monitor,
  Shield,
  Users,
} from "@/components/Icons";

export const metadata: Metadata = {
  title: "Parvoz simulyatori",
  description:
    "Parvoz Drone Simulator — brauzerda FPV mashq. 5 lokatsiya, 30 marshrut, 12 dars, klaviatura yoki gamepad bilan.",
};


const FEATURES = [
  {
    icon: <GraduationCap size={18} />,
    title: "Uchish maktabi",
    text: "Hover, balandlik, burilish va qo'nish — 12 ta qisqa dars.",
  },
  {
    icon: <Compass size={18} />,
    title: "Erkin parvoz",
    text: "5 lokatsiya va 30 marshrut: daladan angargacha.",
  },
  {
    icon: <Users size={18} />,
    title: "Musobaqa",
    text: "2–8 uchuvchi uchun xonalar, chat va haftalik topshiriqlar.",
  },
  {
    icon: <Layers size={18} />,
    title: "Hangar va tuning",
    text: "Dron yig'ing, qismlarni tanlang va sozlamalarni moslang.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Simulyatorni oching",
    text: "Boshlash tugmasi o'yinni shu sahifada ochadi.",
  },
  {
    n: "02",
    title: "Boshqaruvni tanlang",
    text: "Klaviatura, gamepad yoki mos USB radio bilan o'ynang.",
  },
  {
    n: "03",
    title: "Uchishni boshlang",
    text: "Uchish maktabidan boshlab, keyin erkin parvozga o'ting.",
  },
];

export default function SimulatorPage() {
  return (
    <div className="sim-page">
      <section className="container" style={{ paddingTop: 18 }}>
        <div className="sim-hero">
          <div className="sim-hero-copy">
            <span className="eyebrow on-blue">PARVOZ SIMULYATORI</span>
            <h1>
              Uchishni avval
              <br />
              simulyatorda
              <br />
              o&apos;rganing.
            </h1>
            <p>
              Parvoz Drone Simulator — brauzerda ishlaydigan FPV trenajyor. O&apos;rnatish
              shart emas: oching, boshqaruvni tanlang va birinchi parvozni boshlang.
            </p>
            <div className="sim-hero-actions">
              <SimulatorLaunch className="btn btn-lime">
                Boshlash <ArrowUpRight size={16} />
              </SimulatorLaunch>
              <a href="#qanday" className="btn btn-ghost-light">
                Qanday ishlaydi <ArrowDown size={15} />
              </a>
            </div>
            <div className="sim-hero-chips">
              <span>
                <Monitor size={13} /> Brauzerda
              </span>
              <span>
                <Check size={13} /> Bepul beta
              </span>
              <span>
                <Check size={13} /> 3 tilda
              </span>
              <span>
                <Lock size={13} /> Kurs egalari uchun
              </span>
            </div>
          </div>

          <div className="sim-hero-visual">
            <div className="sim-frame">
              <div className="photo">
                <Image
                  src="/images/simulyator-forest.png"
                  alt="Parvoz simulyatoridagi The Green lokatsiyasi"
                  fill
                  priority
                  sizes="(max-width: 900px) 92vw, 520px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <span className="sim-frame-caption">PARVOZ / THE GREEN</span>
            </div>
            <span className="sim-float sim-float--live">
              <i /> LIVE
            </span>
            <span className="sim-float sim-float--desktop">Desktop uchun</span>
            <span className="sim-float sim-float--routes">30 marshrut</span>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="feature-strip sim-feature-strip">
          <span className="feature-item">
            <Check size={13} /> 5 lokatsiya
          </span>
          <span className="feature-item">
            <Check size={13} /> 30 marshrut
          </span>
          <span className="feature-item">
            <Check size={13} /> 12 dars
          </span>
          <span className="feature-item">
            <Check size={13} /> 3 til
          </span>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <div className="section-head-copy">
                <span className="eyebrow">Nimalar bor</span>
                <h2>
                  Noldan uchishgacha —
                  <br />
                  hammasi brauzerda.
                </h2>
                <p className="lead">
                  Trenajyor darslar, erkin parvoz, musobaqa va texnika sozlamalarini bir
                  joyga jamlagan. Birinchi tanishuv uchun hech narsa sotib olish shart emas.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="sim-feature-grid">
            {FEATURES.map((feature, index) => (
              <Reveal key={feature.title} delay={index * 60}>
                <article className="sim-feature-card">
                  <span className="sim-feature-icon">{feature.icon}</span>
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal>
            <div className="section-head">
              <div className="section-head-copy">
                <span className="eyebrow">Ichidan</span>
                <h2>Ochiq maydon, angar va trassa.</h2>
                <p className="lead">
                  Bir necha lokatsiya va turli marshrutlar — har bir mashq uchun yangi
                  muhit.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="sim-shot-grid">
            {[
              { src: "/images/simulyator-forest.png", label: "The Green · ochiq maydon" },
              { src: "/images/simulyator-industrial.png", label: "Industrial · angar" },
              { src: "/images/simulyator-hangar.png", label: "Hangar · texnik zona" },
            ].map((shot, index) => (
              <Reveal key={shot.src} delay={index * 60}>
                <div className="sim-shot">
                  <Image
                    src={shot.src}
                    alt={shot.label}
                    fill
                    sizes="(max-width: 760px) 92vw, 400px"
                    style={{ objectFit: "cover" }}
                  />
                  <span>{shot.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="qanday" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal>
            <div className="section-head">
              <div className="section-head-copy">
                <span className="eyebrow">Qanday boshlash</span>
                <h2>Uch qadamda parvoz.</h2>
              </div>
            </div>
          </Reveal>
          <div className="sim-step-grid">
            {STEPS.map((step, index) => (
              <Reveal key={step.n} delay={index * 60}>
                <div className={`sim-step-card${index === 1 ? " is-highlight" : ""}`}>
                  <span className="sim-step-num">{step.n}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="sim-control-note">
            <Monitor size={15} />
            <span>
              Desktop Chrome yoki Edge tavsiya etiladi. Klaviatura, gamepad va mos USB
              radiolar qo&apos;llab-quvvatlanadi.
            </span>
            <SimulatorLaunch className="sim-inline-launch">
              Boshlash <ArrowUpRight size={13} />
            </SimulatorLaunch>
          </div>

          <div className="sim-load-note">
            <Clock size={15} />
            <span>
              Birinchi yuklashda taxminan 299 MB resurs olinadi (internet tezligiga qarab
              bir necha daqiqa). Keyingi ochilishlarda brauzer keshidan foydalanadi.
            </span>
          </div>
          <div className="sim-security-note">
            <Shield size={15} />
            <span>
              O&apos;yin sayt ichidagi izolyatsiyalangan oynada ochiladi va DRONCHI kabineti
              ma&apos;lumotlariga kira olmaydi. Kirish faqat kurs sotib olgan hisoblar uchun.
            </span>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="cta-banner sim-cta">
            <div>
              <span className="eyebrow on-blue">Parvoz simulyatori</span>
              <h2>Birinchi parvozni hoziroq boshlang.</h2>
              <p>Brauzerda ochiladi. O&apos;rnatish, to&apos;lov va ro&apos;yxatdan o&apos;tish shart emas.</p>
            </div>
            <div className="sim-cta-actions">
              <SimulatorLaunch className="btn btn-lime">
                Boshlash <ArrowUpRight size={15} />
              </SimulatorLaunch>
            </div>
          </div>
        </div>
      </section>

      <SimulatorOverlay />
    </div>
  );
}
