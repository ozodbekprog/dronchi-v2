import Link from "next/link";
import { ArrowUpRight, Check, Clock, Play, Sparkle, Target } from "@/components/Icons";
import { PATH_COURSES } from "@/lib/app-data";

type PathCourse = (typeof PATH_COURSES)[number];

function NodeIcon({ state }: { state: "done" | "current" | "locked" }) {
  if (state === "done") return <Check size={18} />;
  if (state === "current") return <Play size={16} />;
  return <span className="path-lock" aria-hidden="true" />;
}

export default function CoursePath({ course }: { course: PathCourse }) {
  const done = course.lessons.filter((lesson) => lesson.state === "done").length;
  const total = course.lessons.length;
  const percent = Math.round((done / total) * 100);
  const currentIndex = course.lessons.findIndex((lesson) => lesson.state === "current");
  const current = course.lessons[currentIndex];
  const nextIndex = currentIndex >= 0 ? currentIndex : total - 1;

  return (
    <div className="path-layout">
      <div className="path-main">
        <div className="path-tabs" aria-label="Kurslar">
          {PATH_COURSES.map((item) => (
            <Link
              key={item.slug}
              href={`/kabinet/oquv-yoli/${item.slug}`}
              className={item.slug === course.slug ? "is-active" : undefined}
              aria-current={item.slug === course.slug ? "page" : undefined}
            >
              {item.title}
            </Link>
          ))}
        </div>

        <section className="dash-card path-summary">
          <div className="path-summary-head">
            <div>
              <span className="dash-chip dash-chip--blue">{course.category}</span>
              <h2>{course.title}</h2>
              <p>
                {course.level} · {course.duration} · {total} dars
              </p>
            </div>
            <span className="path-percent">{percent}%</span>
          </div>
          <div className="dash-bar">
            <span style={{ width: `${percent}%` }} />
          </div>
          <div className="path-summary-foot">
            <span>
              {done}/{total} dars yakunlandi
            </span>
            <span>Keyingi dars: {current?.title ?? "Yakuniy test"}</span>
          </div>
        </section>

        <section className="dash-card path-card" aria-label="O'quv yo'li">
          <ol className="path">
            {course.lessons.map((lesson, index) => {
              const lessonHref = `/kabinet/oquv-yoli/${course.slug}/${index + 1}`;
              const content = (
                <>
                  <div className="path-node" aria-hidden="true">
                    <NodeIcon state={lesson.state} />
                  </div>
                  <div className="path-info">
                    <span className="path-index">Dars {index + 1}</span>
                    <strong>{lesson.title}</strong>
                    <p>{lesson.text}</p>
                    <span className="path-meta">
                      <Clock size={12} /> {lesson.minutes} daqiqa · {lesson.xp} XP
                    </span>
                  </div>
                  {lesson.state === "current" && <span className="path-start">START</span>}
                </>
              );

              return (
                <li className={`path-step is-${lesson.state}`} key={lesson.title}>
                  {lesson.state === "locked" ? (
                    <div className="path-step-link" aria-disabled="true">
                      {content}
                    </div>
                  ) : (
                    <Link href={lessonHref} className="path-step-link">
                      {content}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>

          <div className="path-next">
            <div>
              <span>{current ? "Keyingi dars" : "Kurs yakunlandi"}</span>
              <strong>{current?.title ?? "Barcha darslar tugatilgan"}</strong>
            </div>
            <Link
              href={`/kabinet/oquv-yoli/${course.slug}/${nextIndex + 1}`}
              className="btn btn-primary btn-sm"
            >
              <Play size={14} /> {current ? "Boshlash" : "Takrorlash"}
            </Link>
          </div>
        </section>
      </div>

      <aside className="path-aside">
        <section className="dash-card">
          <div className="dash-card-head">
            <h2>Kurs haqida</h2>
            <span className="dash-chip">{course.level}</span>
          </div>
          <ul className="path-facts">
            <li>
              <Clock size={15} />
              <span>Davomiyligi</span>
              <b>{course.duration}</b>
            </li>
            <li>
              <Target size={15} />
              <span>Darslar</span>
              <b>{total} ta</b>
            </li>
            <li>
              <Sparkle size={15} />
              <span>Umumiy XP</span>
              <b>{course.lessons.reduce((sum, lesson) => sum + lesson.xp, 0)} XP</b>
            </li>
          </ul>
          <p className="path-hint">
            Har bir darsdan so&apos;ng qisqa test bor. Testdan o&apos;tganingizda keyingi dars
            ochiladi.
          </p>
        </section>

        <section className="dash-ai">
          <div>
            <span className="dash-ai-badge">
              <Sparkle size={13} /> Fariza
            </span>
            <h2>Trassada qiynalyapsizmi?</h2>
            <p>Fariza sizga marshrut, balandlik va tezlik bo&apos;yicha maslahat beradi.</p>
          </div>
          <Link href="/ai" className="dash-ai-btn">
            Maslahat olish <ArrowUpRight size={15} />
          </Link>
        </section>
      </aside>
    </div>
  );
}
