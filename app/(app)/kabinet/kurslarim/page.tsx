import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Award, BookOpen, Check, Clock, Play, Sparkle } from "@/components/Icons";
import PageHead from "@/components/app/PageHead";
import { courses } from "@/lib/data";
import { COURSE_PROGRESS } from "@/lib/app-data";

export const metadata: Metadata = {
  title: "Mening kurslarim",
};

export default function MyCoursesPage() {
  const enrolled = courses.filter((course) => COURSE_PROGRESS[course.slug]?.enrolled);
  const recommended = courses.filter((course) => !COURSE_PROGRESS[course.slug]?.enrolled).slice(0, 3);
  const doneLessons = enrolled.reduce(
    (sum, course) => sum + (COURSE_PROGRESS[course.slug]?.done ?? 0),
    0
  );

  return (
    <div className="dash app-page">
      <div className="dash-wrap">
        <PageHead
          title="Mening kurslarim"
          text="Siz boshlagan kurslar, progress va keyingi qadamlar. Har bir kursni shu yerdan davom ettirasiz."
          action={
            <Link href="/kabinet/akademiya" className="btn btn-primary btn-sm">
              Yangi kurs <ArrowUpRight size={14} />
            </Link>
          }
        />

        <div className="page-stats">
          <div>
            <span className="app-stat-icon">
              <BookOpen size={18} />
            </span>
            <strong>{enrolled.length}</strong>
            <em>faol kurs</em>
          </div>
          <div>
            <span className="app-stat-icon app-stat-icon--lime">
              <Check size={18} />
            </span>
            <strong>{doneLessons}</strong>
            <em>yakunlangan dars</em>
          </div>
          <div>
            <span className="app-stat-icon app-stat-icon--gold">
              <Award size={18} />
            </span>
            <strong>1</strong>
            <em>sertifikat</em>
          </div>
          <div>
            <span className="app-stat-icon app-stat-icon--violet">
              <Sparkle size={18} />
            </span>
            <strong>160</strong>
            <em>umumiy XP</em>
          </div>
        </div>

        <div className="my-courses-grid">
          <div className="dash-col">
            {enrolled.map((course) => {
              const progress = COURSE_PROGRESS[course.slug];
              return (
                <article className="dash-card my-course" key={course.slug}>
                  <div className="my-course-top">
                    <span className="my-course-mark">
                      <Play size={15} />
                    </span>
                    <div>
                      <span className="app-course-cat">{course.category}</span>
                      <h2>{course.title}</h2>
                    </div>
                    <span className="dash-chip dash-chip--blue">{progress.percent}%</span>
                  </div>
                  <p className="my-course-text">{course.description}</p>
                  <div className="dash-bar">
                    <span style={{ width: `${progress.percent}%` }} />
                  </div>
                  <div className="my-course-foot">
                    <span>
                      {progress.done}/{progress.total} dars · <Clock size={12} /> {course.duration}
                    </span>
                    <Link href={`/kabinet/oquv-yoli/${course.slug}`} className="btn btn-primary btn-sm">
                      Davom ettirish <ArrowUpRight size={13} />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          <aside className="dash-col">
            <section className="dash-card">
              <div className="dash-card-head">
                <h2>Sertifikat</h2>
                <Award size={17} />
              </div>
              <div className="cert-mini">
                <span>
                  <Award size={24} />
                </span>
                <div>
                  <strong>FPV asoslari</strong>
                  <em>DRN-FPV-2026-0142</em>
                </div>
              </div>
              <Link href="/kabinet/sertifikatlar" className="dash-link">
                Sertifikatlarni ko&apos;rish <ArrowUpRight size={14} />
              </Link>
            </section>

            <section className="dash-card">
              <div className="dash-card-head">
                <h2>Tavsiya etamiz</h2>
                <Link href="/kabinet/akademiya" className="dash-link">
                  Barchasi
                </Link>
              </div>
              <div className="reco-list">
                {recommended.map((course) => (
                  <Link href="/kabinet/akademiya" key={course.slug} className="reco-row">
                    <span>
                      <Sparkle size={13} />
                    </span>
                    <div>
                      <strong>{course.title}</strong>
                      <em>
                        {course.level} · {course.lessons}
                      </em>
                    </div>
                    <ArrowUpRight size={14} />
                  </Link>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
