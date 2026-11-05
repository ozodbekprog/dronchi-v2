import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock, GraduationCap, Layers } from "@/components/Icons";
import type { Course } from "@/lib/data";
import { COURSE_IMAGES, COURSE_PROGRESS } from "@/lib/app-data";

export default function CourseCard({
  course,
  href,
}: {
  course: Course;
  href?: string;
}) {
  const image = COURSE_IMAGES[course.slug] ?? "/images/course-drone.webp";
  const progress = COURSE_PROGRESS[course.slug];
  const target = href ?? `/kabinet/oquv-yoli/${course.slug}`;

  return (
    <Link href={target} className="app-course-card">
      <div className="app-course-cover">
        <Image
          src={image}
          alt={course.title}
          fill
          sizes="(max-width: 700px) 92vw, (max-width: 1100px) 45vw, 340px"
          style={{ objectFit: "cover" }}
        />
        <span className="app-course-badge">{course.tag ?? course.category}</span>
        {progress?.enrolled && (
          <span className="app-course-progress">{progress.percent}%</span>
        )}
      </div>

      <div className="app-course-body">
        <span className="app-course-cat">{course.category}</span>
        <h3>{course.title}</h3>
        <p>{course.description}</p>
        <div className="app-course-meta">
          <span>
            <GraduationCap size={13} /> {course.level}
          </span>
          <span>
            <Clock size={13} /> {course.duration}
          </span>
          <span>
            <Layers size={13} /> {course.lessons}
          </span>
        </div>

        {progress?.enrolled ? (
          <>
            <span className="app-course-track" aria-hidden="true">
              <span style={{ width: `${progress.percent}%` }} />
            </span>
            <span className="app-course-done">
              {progress.done}/{progress.total} dars yakunlandi
            </span>
          </>
        ) : null}

        <span className="app-course-cta">
          {progress?.enrolled ? "Davom ettirish" : "Kursni ko'rish"}
          <ArrowUpRight size={15} />
        </span>
      </div>
    </Link>
  );
}
