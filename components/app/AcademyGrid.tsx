"use client";

import { useMemo, useState } from "react";
import CourseCard from "./CourseCard";
import { courses } from "@/lib/data";

const FILTERS = ["Barchasi", "Boshlash uchun", "Texnologiyalar", "Yangi"] as const;

export default function AcademyGrid() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("Barchasi");

  const list = useMemo(() => {
    if (filter === "Barchasi") return courses;
    if (filter === "Yangi") return courses.filter((course) => course.tag === "Yangi");
    return courses.filter((course) => course.category === filter);
  }, [filter]);

  return (
    <>
      <div className="filter-row" role="tablist" aria-label="Kurs yo'nalishlari">
        {FILTERS.map((item) => (
          <button
            key={item}
            type="button"
            role="tab"
            aria-selected={filter === item}
            className={filter === item ? "is-active" : undefined}
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}
        <span className="filter-count">{list.length} kurs</span>
      </div>

      <div className="course-grid">
        {list.map((course) => (
          <CourseCard course={course} key={course.slug} />
        ))}
      </div>
    </>
  );
}
