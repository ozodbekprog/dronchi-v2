import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import HomeHero from "@/components/HomeHero";
import Reveal from "@/components/Reveal";
import FlightPath from "@/components/FlightPath";
import CourseTabs from "@/components/CourseTabs";
import CourseTabsDetail from "@/components/CourseTabsDetail";
import Curriculum from "@/components/Curriculum";
import CourseStartButton from "@/components/CourseStartButton";
import Faq from "@/components/Faq";
import VideoTrigger from "@/components/VideoTrigger";
import {
  ArrowUpRight,
  Award,
  BarChart,
  CheckCircle,
  ChevronLeft,
  Clock,
  GraduationCap,
  Layers,
  Monitor,
  Play,
  Sparkle,
} from "@/components/Icons";
import { courses, fpvFaqs, fpvOutcomes } from "@/lib/data";

export const metadata: Metadata = {
  title: "FPV asoslari — boshlang'ich kurs",
  description:
    "FPV tizimlari, jihozlar, kamera va transmitterlar, boshqaruv usullari va amaliy uchingacha — 8 mavzu, 18 dars, 6 soat. Kurs yakunida sertifikat.",
};

const strip = [
  "Bosqichma-bosqich ta'lim",
  "O'z sur'atingizda",
  "Amaliy ko'nikmalar",
  "Natijangizni kuzating",
];

const related = [courses[0], courses[2], courses[3]];

export default function FpvPage() {
  return (
    <>
      <div className="course-hero">
        <HomeHero
          eyebrow="Akademiya / Boshlang'ich kurs"
          title={
            <>
              FPV asoslari.
              <br />
              Yangi nigoh.
            </>
          }
          lead="Parvozni yangi nigoh bilan ko'ring. FPV tizimlari va jihozlardan boshqaruv usullari hamda amaliy uchingacha — bosqichma-bosqich o'rganing."
          primaryLabel="Kursni boshlash"
          primaryHref="/tariflar"
          primarySlot={<CourseStartButton />}
          secondaryLabel="Darslarni ko'rish"
          chipLead="Birinchi qadamdan"
          chipText="Mustaqil parvozgacha."
          meta="6 soat · 18 dars · Onlayn"
          metaIcon={<GraduationCap size={16} />}
        />
      </div>

      <div className="container">
        <div className="feature-strip">
          {strip.map((item) => (
            <span className="feature-item" key={item}>
              <Sparkle size={13} /> {item}
            </span>
          ))}
        </div>

        <nav className="page-breadcrumb" aria-label="Sahifa yo'li">
          <Link href="/akademiya" aria-label="Akademiyaga qaytish">
            <ChevronLeft size={14} />
          </Link>
          <Link href="/akademiya">Akademiya</Link>
          <span aria-hidden="true">/</span>
          <b>FPV asoslari</b>
        </nav>

        <div className="course-layout">
          <div>
            <VideoTrigger className="video-card" label="Kurs taqdimotini ochish" title="FPV asoslari — kurs taqdimoti">
              <Image
                src="/images/fpv-video.webp"
                alt="FPV kursi taqdimoti"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 760px"
                style={{ objectFit: "cover" }}
              />
              <span className="video-bar">
                <Play size={10} />
                <span>0:00 / 12:45</span>
                <span className="video-progress" aria-hidden="true" />
                <Monitor size={13} />
              </span>
            </VideoTrigger>

            <CourseTabsDetail />
          </div>

          <div className="course-side">
            <aside className="panel course-info-card" aria-labelledby="course-info-title">
              <span className="eyebrow">Akademiya</span>
              <h3 id="course-info-title">FPV asoslari</h3>
              <p className="course-tagline">Parvozni yangi nigoh bilan ko&apos;ring.</p>
              <div className="course-facts">
                <div className="course-fact">
                  <span className="course-fact-icon">
                    <Clock size={15} />
                  </span>
                  <div>
                    <span>Davomiyligi</span>
                    <b>6 soat</b>
                  </div>
                </div>
                <div className="course-fact">
                  <span className="course-fact-icon">
                    <Layers size={15} />
                  </span>
                  <div>
                    <span>Darslar soni</span>
                    <b>18 dars</b>
                  </div>
                </div>
                <div className="course-fact">
                  <span className="course-fact-icon">
                    <BarChart size={15} />
                  </span>
                  <div>
                    <span>Daraja</span>
                    <b>Boshlang&apos;ich</b>
                  </div>
                </div>
                <div className="course-fact">
                  <span className="course-fact-icon">
                    <Award size={15} />
                  </span>
                  <div>
                    <span>Sertifikat</span>
                    <b>Beriladi</b>
                  </div>
                </div>
              </div>
              <CourseStartButton showNote />
            </aside>

            <aside className="panel course-outcomes" aria-labelledby="course-outcomes-title">
              <h3 id="course-outcomes-title">Nima o&apos;rganasiz?</h3>
              <ul>
                {fpvOutcomes.map((item) => (
                  <li key={item}>
                    <CheckCircle size={15} /> {item}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>

        <div className="curriculum-head" id="dastur">
          <div>
            <span className="eyebrow">Dastur</span>
            <h2 style={{ marginTop: 10 }}>Darslar ro&apos;yxati</h2>
          </div>
          <span>8 mavzu · 18 dars · 6 soat</span>
        </div>
        <Curriculum />

        <FlightPath />
      </div>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal>
            <div className="section-head">
              <div className="section-head-copy">
                <span className="eyebrow">Akademiya</span>
                <h2>Parvozingizni davom ettiring</h2>
                <p className="lead">
                  Boshqaruvni mustahkamlang, amaliy mashg&apos;ulotlar bilan xavfsiz uchinga
                  tayyorlaning.
                </p>
              </div>
              <div className="section-head-side">
                <Link href="/akademiya" className="btn btn-lime">
                  Barcha kurslar <ArrowUpRight size={15} />
                </Link>
              </div>
            </div>
          </Reveal>
          <Reveal>
            <CourseTabs courses={related} showFilters={false} />
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal>
            <div className="cta-banner">
              <div>
                <span className="eyebrow on-blue">Bilim → Mashq → Parvoz</span>
                <h2>Birinchi FPV parvozingiz shu yerdan boshlanadi.</h2>
                <p>FPV asoslari · 6 soat · 18 dars · Boshlang&apos;ich daraja</p>
              </div>
              <div className="cta-side">
                <CourseStartButton />
                <span>Onlayn · O&apos;z sur&apos;atingizda</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
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
                <p className="lead">DRONCHI haqida eng ko&apos;p beriladigan savollarga javoblar.</p>
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
                  items={fpvFaqs}
                  foot={
                    <>
                      Savolingizga javob topilmadi?{" "}
                      <Link href="/poligonlar#xavfsizlik">Biz bilan bog&apos;laning</Link>
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
