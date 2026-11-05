"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Play,
  Sparkle,
  Target,
} from "@/components/Icons";
import type { PathLesson } from "@/lib/app-data";
import { COURSE_IMAGES } from "@/lib/app-data";

type LessonCourse = {
  slug: string;
  title: string;
  level: string;
  lessons: PathLesson[];
};

const QUIZ = {
  question: "Parvozdan oldin birinchi navbatda nima tekshiriladi?",
  options: [
    "Batareya zaryadi va pult aloqasi",
    "Kamera rang balansi",
    "Faqat havo harorati",
  ],
  correct: 0,
};

export default function LessonView({
  course,
  index,
}: {
  course: LessonCourse;
  index: number;
}) {
  const lesson = course.lessons[index];
  const total = course.lessons.length;
  const image = COURSE_IMAGES[course.slug] ?? "/images/fpv-video.webp";
  const [playing, setPlaying] = useState(false);
  const [answer, setAnswer] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [done, setDone] = useState(false);

  const correct = checked && answer === QUIZ.correct;
  const nextHref =
    index + 1 < total
      ? `/kabinet/oquv-yoli/${course.slug}/${index + 2}`
      : `/kabinet/oquv-yoli/${course.slug}`;

  return (
    <div className="lesson-layout">
      <div className="lesson-main">
        <Link href={`/kabinet/oquv-yoli/${course.slug}`} className="back-link">
          <ChevronLeft size={14} /> {course.title} kursiga qaytish
        </Link>

        <div className="lesson-video">
          <Image
            src={image}
            alt={lesson.title}
            fill
            sizes="(max-width: 900px) 94vw, 820px"
            style={{ objectFit: "cover" }}
            priority
          />
          <span className="lesson-video-badge">VIDEO · {lesson.minutes} DAQIQA</span>
          {!playing ? (
            <button
              type="button"
              className="lesson-play"
              aria-label="Videoni ko'rish"
              onClick={() => setPlaying(true)}
            >
              <Play size={22} />
            </button>
          ) : (
            <div className="lesson-video-demo" role="status">
              <Play size={26} />
              <strong>Video darsi demo rejimda</strong>
              <span>To&apos;liq video platformaga ulanganda shu yerda ochiladi.</span>
            </div>
          )}
        </div>

        <section className="dash-card lesson-body">
          <div className="lesson-head">
            <span className="dash-chip dash-chip--blue">
              Dars {index + 1} / {total}
            </span>
            <span className="dash-chip">
              <Clock size={12} /> {lesson.minutes} daqiqa
            </span>
            <span className="dash-chip dash-chip--lime">+{lesson.xp} XP</span>
          </div>

          <h1>{lesson.title}</h1>
          <p className="lesson-lead">{lesson.text}</p>
          <p>
            Bu darsda siz {lesson.title.toLowerCase()} mavzusini bosqichma-bosqich
            o&apos;rganasiz. Avval jihozni tekshirib, keyin ochiq maydonda sekin
            harakatlardan boshlang.
          </p>
          <p>
            Parvozdan oldin batareya zaryadi, pult aloqasi, propeller holati va
            atrofdagi odamlar masofasini tekshiring. Xavfsizlik — har qanday
            mashg&apos;ulotning birinchi qismi.
          </p>

          <div className="lesson-quiz">
            <div className="lesson-quiz-head">
              <span className="dash-chip">Mini test</span>
              <b>1 savol</b>
            </div>
            <h2>{QUIZ.question}</h2>
            <div className="quiz-options">
              {QUIZ.options.map((option, optionIndex) => (
                <button
                  key={option}
                  type="button"
                  className={answer === optionIndex ? "is-selected" : undefined}
                  onClick={() => {
                    setAnswer(optionIndex);
                    setChecked(false);
                  }}
                >
                  <span>{String.fromCharCode(65 + optionIndex)}</span>
                  {option}
                </button>
              ))}
            </div>
            <div className="lesson-quiz-foot">
              <button
                type="button"
                className="btn btn-primary btn-sm"
                disabled={answer === null}
                onClick={() => setChecked(true)}
              >
                <Check size={14} /> Tekshirish
              </button>
              {checked && (
                <span className={`quiz-result${correct ? " is-correct" : " is-wrong"}`}>
                  {correct
                    ? "To'g'ri! Darsni yakunlashingiz mumkin."
                    : "Noto'g'ri. Yana bir urinib ko'ring."}
                </span>
              )}
            </div>
          </div>

          <div className="lesson-actions">
            {done ? (
              <div className="lesson-success" role="status">
                <span>
                  <Check size={16} />
                </span>
                <div>
                  <strong>Dars yakunlandi!</strong>
                  <p>+{lesson.xp} XP hisobingizga qo&apos;shildi.</p>
                </div>
                <Link href={nextHref} className="btn btn-primary btn-sm">
                  {index + 1 < total ? "Keyingi dars" : "Kursga qaytish"}
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            ) : (
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setDone(true)}
              >
                <Check size={16} /> Darsni yakunlash
              </button>
            )}
          </div>
        </section>
      </div>

      <aside className="lesson-aside">
        <section className="dash-card">
          <div className="dash-card-head">
            <h2>Dars haqida</h2>
            <span className="dash-chip">{course.level}</span>
          </div>
          <ul className="path-facts">
            <li>
              <Clock size={15} />
              <span>Davomiyligi</span>
              <b>{lesson.minutes} daqiqa</b>
            </li>
            <li>
              <Target size={15} />
              <span>Mukofot</span>
              <b>{lesson.xp} XP</b>
            </li>
            <li>
              <Check size={15} />
              <span>Holat</span>
              <b>{lesson.state === "done" ? "Yakunlangan" : "Ochiq"}</b>
            </li>
          </ul>
          <div className="lesson-progress">
            <div className="dash-bar">
              <span style={{ width: `${Math.round(((index + 1) / total) * 100)}%` }} />
            </div>
            <span>
              {index + 1} / {total} dars
            </span>
          </div>
        </section>

        <section className="dash-card">
          <div className="dash-card-head">
            <h2>Kurs darslari</h2>
          </div>
          <div className="lesson-list">
            {course.lessons.map((item, itemIndex) => (
              <Link
                className={itemIndex === index ? "is-active" : undefined}
                href={`/kabinet/oquv-yoli/${course.slug}/${itemIndex + 1}`}
                key={item.title}
              >
                <span>{itemIndex + 1}</span>
                <div>
                  <strong>{item.title}</strong>
                  <em>{item.minutes} daqiqa</em>
                </div>
                {itemIndex === index ? <Play size={12} /> : <ChevronRight size={12} />}
              </Link>
            ))}
          </div>
        </section>

        <section className="dash-ai">
          <div>
            <span className="dash-ai-badge">
              <Sparkle size={13} /> Fariza
            </span>
            <h2>Savolingiz bormi?</h2>
            <p>Dars bo&apos;yicha tushunmagan joyingizni Fariza bilan muhokama qiling.</p>
          </div>
          <Link href="/ai" className="dash-ai-btn">
            Savol berish <ArrowUpRight size={15} />
          </Link>
        </section>
      </aside>
    </div>
  );
}
