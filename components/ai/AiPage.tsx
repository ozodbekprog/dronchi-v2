"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Compass,
  GraduationCap,
  MapPin,
  Refresh,
  Shield,
  Sparkle,
} from "@/components/Icons";
import Reveal from "@/components/Reveal";
import LangSwitch from "@/components/LangSwitch";
import { useLang } from "@/lib/lang";
import { CHAT_TEXT } from "./chatText";
import AiChatBody from "./AiChatBody";
import useAiChat from "./useAiChat";

const CAPABILITIES = [
  "Dron va FPV asoslari bo'yicha tushuntirish",
  "Parvozoldi xavfsizlik va tekshiruvlar",
  "Kurs tanlash va o'quv yo'lini rejalash",
  "Poligon mashqlari va trassa taktikasi",
];

const TOPICS = [
  {
    icon: <Compass size={18} />,
    title: "Dron asoslari",
    text: "Pult, motor, kamera va birinchi parvoz haqida savol bering.",
    prompt: "Dron bilan birinchi parvozni qanday boshlash kerak?",
  },
  {
    icon: <Shield size={18} />,
    title: "Xavfsizlik",
    text: "Parvozoldi tekshiruv, cheklovlar va favqulodda holatlar.",
    prompt: "Parvozdan oldin qanday xavfsizlik tekshiruvlarini bajarish kerak?",
  },
  {
    icon: <GraduationCap size={18} />,
    title: "Kurs tanlash",
    text: "Maqsadingizga mos yo'nalish va o'quv rejasini toping.",
    prompt: "Menga qaysi DRONCHI kursi mos keladi?",
  },
  {
    icon: <MapPin size={18} />,
    title: "Poligonlar",
    text: "Trassa, mashqlar va poligon bron qilish bo'yicha yordam.",
    prompt: "Poligonda qanday mashqlarni bajarish foydali?",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Savol yozing",
    text: "Dron, FPV, xavfsizlik yoki kurs haqida oddiy tilda so'rang.",
  },
  {
    n: "02",
    title: "AI tahlil qiladi",
    text: "Fariza savolni tushunadi va platforma kontekstini hisobga oladi.",
  },
  {
    n: "03",
    title: "Amaliy javob oling",
    text: "Qisqa tavsiya, tekshiruv ro'yxati yoki keyingi qadamni olasiz.",
  },
];

function askAi(prompt: string) {
  document.getElementById("suhbat")?.scrollIntoView({ behavior: "smooth", block: "start" });
  window.setTimeout(() => {
    window.dispatchEvent(new CustomEvent("dronchi-ai-ask", { detail: prompt }));
  }, 450);
}

export default function AiPage() {
  const { lang } = useLang();
  const t = CHAT_TEXT[lang] ?? CHAT_TEXT.uz;
  const { messages, loading, error, send, stop, clear } = useAiChat();

  return (
    <div className="ai-landing">
      <section className="container" style={{ paddingTop: 18 }}>
        <div className="ai-banner">
          <div className="ai-banner-inner">
            <div className="ai-banner-copy">
              <span className="eyebrow on-blue">FARIZA · DRONCHI AI</span>
              <h1>
                Savolingiz bor.
                <br />
                Fariza tayyor.
              </h1>
              <p>
                Fariza — DRONCHI&apos;ning AI yordamchisi. Dron, FPV, xavfsizlik va
                kurslar bo&apos;yicha 24/7 amaliy javob beradi — 5 tilda.
              </p>
              <div className="ai-banner-actions">
                <a href="#suhbat" className="btn btn-lime">
                  Suhbatni boshlash <ArrowDown size={16} />
                </a>
                <Link href="/akademiya" className="ai-banner-link">
                  Kurslarni ko&apos;rish <ArrowUpRight size={15} />
                </Link>
              </div>
              <div className="ai-banner-chips">
                <span>
                  <Sparkle size={13} /> Fariza AI
                </span>
                <span>5 tilda</span>
                <span>24/7 onlayn</span>
                <span>Maxfiy suhbat</span>
              </div>
            </div>

            <div className="ai-banner-visual" aria-hidden="true">
              <div className="ai-preview">
                <div className="ai-preview-head">
                  <span className="ai-preview-logo">
                    <Sparkle size={14} />
                  </span>
                  <div>
                    <strong>{t.assistantTitle}</strong>
                    <em>DRONCHI AI yordamchisi</em>
                  </div>
                  <span className="ai-preview-online">
                    <i /> {t.online}
                  </span>
                </div>
                <div className="ai-preview-body">
                  <div className="ai-preview-user">FPV dron nima?</div>
                  <div className="ai-preview-ai">
                    <span>
                      <Sparkle size={11} />
                    </span>
                    <div>
                      <div className="ai-preview-shot">
                        <Image
                          src="/images/hero-product.webp"
                          alt=""
                          fill
                          sizes="200px"
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                      FPV — birinchi shaxs ko&apos;rinishi. Kamera tasvirini ko&apos;zoynak
                      orqali real vaqtda ko&apos;rasiz.
                    </div>
                  </div>
                  <div className="ai-preview-input">
                    Savolingizni yozing...
                    <span>
                      <ArrowUpRight size={12} />
                    </span>
                  </div>
                </div>
              </div>
              <span className="ai-float ai-float--model">Fariza AI</span>
              <span className="ai-float ai-float--online">
                <i /> 24/7
              </span>
              <span className="ai-float ai-float--lang">5 tilda</span>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="feature-strip ai-feature-strip">
          <span className="feature-item">
            <Sparkle size={13} /> 5 tilda javob
          </span>
          <span className="feature-item">
            <Check size={13} /> Doim onlayn
          </span>
          <span className="feature-item">
            <Check size={13} /> Tez javob
          </span>
          <span className="feature-item">
            <Check size={13} /> Maxfiy suhbat
          </span>
        </div>
      </div>

      <section className="section ai-chat-section" id="suhbat">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <div className="section-head-copy">
                <span className="eyebrow">Fariza bilan suhbat</span>
                <h2>
                  Savol bering —
                  <br />
                  yo&apos;l ko&apos;rsatamiz.
                </h2>
                <p className="lead">
                  Har bir javob amaliy: xavfsizlik, texnika va o&apos;quv rejasi bo&apos;yicha
                  qisqa tavsiyalar. Suhbatni istalgan vaqtda davom ettirasiz.
                </p>
              </div>
              <div className="section-head-side">
                <span className="ai-status-pill">
                  <i /> {t.online}
                </span>
              </div>
            </div>
          </Reveal>

          <div className="ai-workspace">
            <div className="ai-workspace-chat">
              <section className="ai-page-chat" aria-label="Fariza bilan suhbat">
                <div className="ai-page-chat-head">
                  <div className="ai-panel-title">
                    <span className="ai-panel-logo">
                      <Sparkle size={15} />
                    </span>
                    <div>
                      <strong>{t.assistantTitle}</strong>
                      <em>DRONCHI AI yordamchisi</em>
                    </div>
                  </div>
                  <div className="ai-chat-head-actions">
                    <span className="ai-lang-label">Javob tili</span>
                    <LangSwitch variant="panel" />
                    <button
                      type="button"
                      className="ai-new-chat"
                      onClick={clear}
                      title="Yangi suhbat"
                      aria-label="Yangi suhbat"
                    >
                      <Refresh size={14} /> Yangi
                    </button>
                  </div>
                </div>
                <AiChatBody
                  messages={messages}
                  loading={loading}
                  error={error}
                  onSend={send}
                  onStop={stop}
                  onClear={clear}
                />
              </section>
            </div>

            <aside className="ai-page-aside">
              <section className="dash-card ai-model-card">
                <div className="ai-model-visual">
                  <span>
                    <Sparkle size={20} />
                  </span>
                  <div>
                    <em>DRONCHI AI</em>
                    <strong>Fariza</strong>
                  </div>
                </div>
                <div className="ai-model-stats">
                  <div>
                    <strong>5</strong>
                    <span>tilda</span>
                  </div>
                  <div>
                    <strong>24/7</strong>
                    <span>onlayn</span>
                  </div>
                  <div>
                    <strong>100%</strong>
                    <span>maxfiy</span>
                  </div>
                </div>
                <span className="dash-chip dash-chip--lime">Har doim yoningizda</span>
              </section>

              <section className="dash-card">
                <div className="dash-card-head">
                  <h2>Nimalar bo&apos;yicha yordam beradi</h2>
                </div>
                <ul className="ai-capabilities">
                  {CAPABILITIES.map((item) => (
                    <li key={item}>
                      <span>
                        <Check size={12} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="dash-card">
                <div className="dash-card-head">
                  <h2>Maslahat</h2>
                </div>
                <p className="ai-tip">
                  Savolni aniqroq yozsangiz, javob foydaliroq bo&apos;ladi. Masalan:
                  &quot;Birinchi FPV dronim uchun qaysi simulyator yaxshi?&quot;
                </p>
              </section>
            </aside>
          </div>
        </div>
      </section>

      <section className="section ai-topics-section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal>
            <div className="section-head">
              <div className="section-head-copy">
                <span className="eyebrow">Mavzular</span>
                <h2>Qaysi masalada yordam kerak?</h2>
                <p className="lead">
                  Boshlash uchun mavzuni tanlang — savol chatga o&apos;zi tushadi.
                </p>
              </div>
            </div>
          </Reveal>
          <div className="ai-topic-grid">
            {TOPICS.map((topic, index) => (
              <Reveal key={topic.title} delay={index * 60}>
                <button type="button" className="ai-topic-card" onClick={() => askAi(topic.prompt)}>
                  <span className="ai-topic-icon">{topic.icon}</span>
                  <strong>{topic.title}</strong>
                  <p>{topic.text}</p>
                  <span className="ai-topic-link">
                    Savol berish <ArrowUpRight size={13} />
                  </span>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section ai-how-section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal>
            <div className="section-head">
              <div className="section-head-copy">
                <span className="eyebrow">Qanday ishlaydi</span>
                <h2>
                  Uch qadam.
                  <br />
                  Aniq javob.
                </h2>
              </div>
            </div>
          </Reveal>
          <div className="ai-how-grid">
            {STEPS.map((step, index) => (
              <Reveal key={step.n} delay={index * 70}>
                <div className="ai-how-card">
                  <span className="ai-how-num">{step.n}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="cta-banner ai-cta">
            <div>
              <span className="eyebrow on-blue">Fariza</span>
              <h2>Savolingizni yozing — Fariza yordam beradi.</h2>
              <p>Tez javob, 5 til va DRONCHI platformasiga mos tavsiyalar.</p>
            </div>
            <a href="#suhbat" className="btn btn-lime">
              Suhbatni boshlash <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
