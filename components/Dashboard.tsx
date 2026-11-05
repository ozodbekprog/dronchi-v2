"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";
import useDemoSession from "@/lib/useDemoSession";
import { courses } from "@/lib/data";
import {
  ArrowUpRight,
  BookOpen,
  Check,
  Clock,
  Play,
  Sparkle,
  Star,
  Target,
} from "./Icons";

/* ------------------------------- Ikonkalar ------------------------------- */

type IconProps = { size?: number; className?: string };

function Flame({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M13.4 2.2c.4 3.2-.8 4.7-2.2 6.1-1.3 1.3-2.7 2.7-2.7 5.4a3.5 3.5 0 0 0 7 .2c0-1.5-.6-2.5-1.3-3.5-.6-.9-1.2-1.8-1.3-3.1 2.9 1.8 5.1 4.7 5.1 8.2A9 9 0 1 1 3 12.6c0-4.4 2.2-7.5 5.4-9.4-.1 1.9.6 3.2 1.5 4.2.4-2.2 1.7-4 3.5-5.2Z" />
    </svg>
  );
}

function Bolt({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M13.2 2 4 13.4h6.1L9.6 22 20 9.9h-6.4L13.2 2Z" />
    </svg>
  );
}

function Trophy({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M8 3h8v6a4 4 0 0 1-8 0V3Z" />
      <path d="M8 5H4v2a4 4 0 0 0 4 4M16 5h4v2a4 4 0 0 1-4 4M12 13v4M9 21h6M10 21v-4h4v4" />
    </svg>
  );
}

function ChevronRight({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="m9 5 7 7-7 7" />
    </svg>
  );
}

/* ------------------------------- Demo ma'lumot ------------------------------- */

const WEEKDAYS = ["Du", "Se", "Ch", "Pa", "Ju", "Sh", "Ya"];
const WEEK_XP = [30, 45, 60, 20, 80, 40, 10];

const LEADERS = [
  { name: "Malika Yusupova", xp: 420, initials: "MY" },
  { name: "Bekzod Tursunov", xp: 310, initials: "BT" },
  { name: "Dilnoza Rahimova", xp: 250, initials: "DR" },
  { name: "Sardor Aliyev", xp: 180, initials: "SA" },
];

const COURSE_PROGRESS = [60, 60, 50, 0];
const COURSE_DONE = ["3/5", "3/5", "2/4", "0/4"];

const QUESTS = [
  { text: "Bitta darsni yakunlang", xp: "+10 XP" },
  { text: "2 ta test savoliga to'g'ri javob bering", xp: "+20 XP" },
  { text: "Seriyani saqlang", xp: "+15 XP" },
];

const BADGES = [
  { icon: <Star size={17} />, title: "Birinchi qadam", hint: "Bitta dars yakunlandi", done: true },
  { icon: <Flame size={17} />, title: "3 kun seriya", hint: "Ketma-ket 3 kun", done: true },
  { icon: <Bolt size={17} />, title: "100 XP", hint: "100 XP to'plandi", done: true },
];

function initialsOf(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

/* ------------------------------- Kichik bloklar ------------------------------- */

function Stat({
  icon,
  tone,
  value,
  label,
}: {
  icon: ReactNode;
  tone: "fire" | "xp" | "level" | "book";
  value: ReactNode;
  label: string;
}) {
  return (
    <div className="dash-stat">
      <span className={`dash-stat-icon dash-stat-icon--${tone}`}>{icon}</span>
      <div>
        <strong>{value}</strong>
        <span>{label}</span>
      </div>
    </div>
  );
}

function Progress({ percent, tone = "blue" }: { percent: number; tone?: "blue" | "lime" }) {
  return (
    <span
      className={`dash-bar dash-bar--${tone}`}
      role="progressbar"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <span style={{ width: `${percent}%` }} />
    </span>
  );
}

function Ring({ percent }: { percent: number }) {
  const circumference = 2 * Math.PI * 18;
  return (
    <span className="dash-ring" aria-hidden="true">
      <svg viewBox="0 0 44 44">
        <circle cx="22" cy="22" r="18" className="dash-ring-track" />
        <circle
          cx="22"
          cy="22"
          r="18"
          className="dash-ring-fill"
          strokeDasharray={`${(percent / 100) * circumference} ${circumference}`}
        />
      </svg>
      <b>{percent}%</b>
    </span>
  );
}

/* ------------------------------- Sahifa ------------------------------- */

export default function Dashboard() {
  const { session } = useDemoSession();
  const userName = session?.name ?? "Aziz Karimov";
  const [daily, setDaily] = useState(0);
  const [xp, setXp] = useState(160);
  const [streakDays, setStreakDays] = useState(6);
  const goalPercent = Math.round((daily / 2) * 100);
  const levelPercent = 80;

  const leaders = useMemo(() => {
    return [...LEADERS, { name: userName, xp, initials: initialsOf(userName) || "AK" }]
      .sort((a, b) => b.xp - a.xp)
      .slice(0, 5);
  }, [userName, xp]);

  const completeGoal = () => {
    if (daily >= 2) return;
    setDaily((value) => value + 1);
    setXp((value) => value + 20);
    setStreakDays((value) => (value < 7 ? value + 1 : value));
  };

  return (
        <div className="dash">
          <div className="dash-wrap">
        <section className="dash-hero" id="asosiy" aria-labelledby="dash-hello">
          <div className="dash-hero-copy">
            <span className="eyebrow on-blue">DRONCHI ekotizimi</span>
            <h2 id="dash-hello">Xush kelibsiz, {userName}</h2>
            <p>
              Statistika, davom etish va so&apos;nggi yutuqlar bir joyda. Har kuni bitta dars —
              natija o&apos;zi keladi.
            </p>

            <div className="dash-level">
              <span className="dash-level-badge">Lvl 2</span>
              <div className="dash-level-body">
                <div className="dash-level-meta">
                  <span>Keyingi darajagacha</span>
                  <b>40 XP</b>
                </div>
                <Progress percent={levelPercent} tone="lime" />
              </div>
            </div>

            <div className="dash-hero-actions">
              <Link href="/kabinet/oquv-yoli/fpv-asoslari" className="btn btn-lime">
                <Play size={17} /> Davom ettirish
              </Link>
              <Link href="/kabinet/akademiya" className="dash-hero-link">
                Barcha kurslar <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>

          <div className="dash-hero-visual" aria-hidden="true">
            <div className="dash-photo">
              <div className="photo">
                <Image
                  src="/images/hero-product.webp"
                  alt=""
                  fill
                  priority
                  sizes="(max-width: 1024px) 92vw, 480px"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
            <span className="dash-float dash-float--xp">
              <Bolt size={14} /> +40 XP
            </span>
            <span className="dash-float dash-float--streak">
              <Flame size={14} /> {streakDays} kun
            </span>
            <span className="dash-float dash-float--lesson">
              <Check size={14} /> FPV asoslari · 3/5
            </span>
          </div>
        </section>

        <section className="dash-stats" aria-label="Statistika">
          <Stat icon={<Flame size={19} />} tone="fire" value={streakDays} label="kunlik seriya" />
          <Stat icon={<Bolt size={19} />} tone="xp" value={xp} label="umumiy XP" />
          <Stat icon={<Trophy size={19} />} tone="level" value={2} label="daraja" />
          <Stat icon={<BookOpen size={19} />} tone="book" value={8} label="yakunlangan dars" />
        </section>

        <div className="dash-grid">
          <div className="dash-col">
            <section className="dash-card dash-continue" aria-labelledby="dash-continue">
              <div className="dash-card-top">
                <span className="dash-chip dash-chip--blue">60%</span>
                <span className="dash-chip">3/5 dars</span>
              </div>
              <h2 id="dash-continue">FPV asoslari: birinchi parvozgacha</h2>
              <p className="dash-continue-next">
                Keyingi dars: <b>Pult bilan tanishish va birinchi uchish</b>
              </p>
              <Progress percent={60} />
              <div className="dash-continue-foot">
                <span>
                  <Clock size={13} /> 12 daqiqa · 40 XP
                </span>
                <span>Amaliy uchish</span>
              </div>
              <Link href="/kabinet/oquv-yoli/fpv-asoslari" className="btn btn-primary dash-continue-btn">
                <Play size={17} /> Davom ettirish
              </Link>
            </section>

            <section className="dash-card" id="kurslar" aria-labelledby="dash-courses">
              <div className="dash-card-head">
                <h2 id="dash-courses">Kurslaringiz</h2>
                <Link href="/kabinet/kurslarim" className="dash-link">
                  Barchasi <ArrowUpRight size={14} />
                </Link>
              </div>

              <div className="dash-course-list">
                {courses.slice(0, 4).map((course, index) => (
                  <Link href={`/kabinet/oquv-yoli/${course.slug}`} className="dash-course-row" key={course.slug}>
                    <span className="dash-course-mark" aria-hidden="true">
                      {index < 3 ? <Check size={12} /> : <Play size={11} />}
                    </span>
                    <span className="dash-course-body">
                      <strong>{course.title}</strong>
                      <span>
                        {COURSE_DONE[index]} dars · {course.level}
                      </span>
                    </span>
                    <span className="dash-course-bar">
                      <Progress percent={COURSE_PROGRESS[index]} />
                    </span>
                    <ChevronRight size={15} className="dash-course-chevron" />
                  </Link>
                ))}
              </div>
            </section>

            <section className="dash-card" aria-labelledby="dash-activity">
              <div className="dash-card-head">
                <h2 id="dash-activity">Haftalik faollik</h2>
                <span className="dash-chip dash-chip--blue">285 XP</span>
              </div>
              <div className="dash-chart" aria-hidden="true">
                {WEEK_XP.map((value, index) => (
                  <div className="dash-chart-col" key={WEEKDAYS[index]}>
                    <span
                      className={`dash-chart-bar${value === 80 ? " is-peak" : ""}`}
                      style={{ height: `${Math.round((value / 80) * 100)}%` }}
                    />
                    <em>{WEEKDAYS[index]}</em>
                  </div>
                ))}
              </div>
              <div className="dash-chart-foot">
                <span>
                  Eng faol kun: <b>Juma · 80 XP</b>
                </span>
                <span>
                  O&apos;rtacha: <b>41 XP</b>
                </span>
              </div>
            </section>

            <section className="dash-card" id="yutuqlar" aria-labelledby="dash-badges">
              <div className="dash-card-head">
                <h2 id="dash-badges">Yutuqlar</h2>
                <Link href="/kabinet/profil" className="dash-link">
                  Barchasi <ArrowUpRight size={14} />
                </Link>
              </div>
              <div className="dash-badges">
                {BADGES.map((badge) => (
                  <div className="dash-badge" key={badge.title}>
                    <span>{badge.icon}</span>
                    <strong>{badge.title}</strong>
                    <em>{badge.hint}</em>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="dash-col" aria-label="Kunlik va reyting">
            <section className="dash-card dash-goal" aria-labelledby="dash-goal">
              <div className="dash-goal-row">
                <Ring percent={goalPercent} />
                <div>
                  <h2 id="dash-goal">Kunlik maqsad</h2>
                  <p>
                    Bugun <b>{daily}/2</b> dars yakunlandi
                  </p>
                </div>
              </div>
              <Progress percent={goalPercent} />
              <button
                type="button"
                className="btn btn-outline dash-goal-btn"
                onClick={completeGoal}
                disabled={daily >= 2}
              >
                <Target size={16} />
                {daily >= 2 ? "Maqsad bajarildi" : "Maqsadni yakunlash"}
              </button>
            </section>

            <section className="dash-card" id="reyting" aria-labelledby="dash-leaders">
              <div className="dash-card-head">
                <h2 id="dash-leaders">Haftalik reyting</h2>
                <Link href="/kabinet/reyting" className="dash-link">
                  Barchasi <ArrowUpRight size={14} />
                </Link>
              </div>
              <ol className="dash-leaders">
                {leaders.map((leader, index) => {
                  const you = leader.name === userName;
                  return (
                    <li className={you ? "is-you" : undefined} key={leader.name}>
                      <span className="dash-rank">{index + 1}</span>
                      <span className="dash-avatar">{leader.initials}</span>
                      <span className="dash-leader-name">
                        {leader.name}
                        {you && <em>siz</em>}
                      </span>
                      <b>{leader.xp} XP</b>
                    </li>
                  );
                })}
              </ol>
            </section>

            <section className="dash-card" aria-labelledby="dash-quests">
              <div className="dash-card-head">
                <h2 id="dash-quests">Kunlik topshiriqlar</h2>
                <span className="dash-chip">{daily > 0 ? "2/3" : "1/3"}</span>
              </div>
              <ul className="dash-quests">
                {QUESTS.map((quest, index) => {
                  const done = index === 2 ? streakDays > 0 : index < daily;
                  return (
                    <li className={done ? "is-done" : undefined} key={quest.text}>
                      <span className="dash-quest-check">{done && <Check size={11} />}</span>
                      <span>{quest.text}</span>
                      <b>{quest.xp}</b>
                    </li>
                  );
                })}
              </ul>
            </section>

            <section className="dash-card" aria-labelledby="dash-week">
              <div className="dash-card-head">
                <h2 id="dash-week">Haftalik seriya</h2>
                <span className="dash-chip dash-chip--lime">
                  <Flame size={12} /> {streakDays} kun
                </span>
              </div>
              <div className="dash-week">
                {WEEKDAYS.map((day, index) => {
                  const done = index < Math.min(streakDays, 7);
                  return (
                    <div key={day} className={done ? "is-done" : undefined}>
                      <span>{done && <Check size={11} />}</span>
                      <em>{day}</em>
                    </div>
                  );
                })}
              </div>
              <p className="dash-week-note">
                Har kuni bitta dars — seriyani saqlab, bonus XP oling.
              </p>
            </section>

            <section className="dash-ai" id="dash-ai" aria-labelledby="dash-ai-title">
              <div>
                <span className="dash-ai-badge">
                  <Sparkle size={13} /> Fariza
                </span>
                <h2 id="dash-ai-title">Savolingiz bormi?</h2>
                <p>Fariza keyingi dars, texnika yoki xavfsizlik bo&apos;yicha yordam beradi.</p>
              </div>
              <Link href="/ai" className="dash-ai-btn">
                Fariza bilan suhbat <ArrowUpRight size={15} />
              </Link>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
