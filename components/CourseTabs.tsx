"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Course } from "@/lib/data";
import useDemoSession from "@/lib/useDemoSession";
import Modal from "./Modal";
import { ArrowUpRight, CheckCircle } from "./Icons";

const filters = ["Barchasi", "Boshlash uchun", "Texnologiyalar"] as const;

type CourseTabsProps = {
  courses: Course[];
  showFilters?: boolean;
  limit?: number;
};

export default function CourseTabs({ courses, showFilters = true, limit }: CourseTabsProps) {
  const [filter, setFilter] = useState<(typeof filters)[number]>("Barchasi");
  const [preview, setPreview] = useState<Course | null>(null);
  const { session } = useDemoSession();

  const matched =
    filter === "Barchasi" ? courses : courses.filter((course) => course.category === filter);
  const visible = typeof limit === "number" ? matched.slice(0, limit) : matched;

  return (
    <>
      {showFilters && (
        <div className="tabs" role="tablist" aria-label="Kurs yo'nalishlari">
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={filter === item}
              className={`tab${filter === item ? " is-active" : ""}`}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>
      )}

      <div className="courses-grid">
        {visible.map((course) => {
          const highlight = Boolean(course.highlight);
          const owned = Boolean(session) && course.slug === "fpv-asoslari";
          return (
            <article key={course.slug} className={`course-card${highlight ? " is-highlight" : ""}`}>
              <div className="course-photo">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  sizes="(max-width: 760px) 100vw, (max-width: 1024px) 50vw, 390px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="course-body">
                {owned && (
                  <span className="course-owned">
                    <CheckCircle size={12} /> Sizda mavjud
                  </span>
                )}
                <h3>{course.title}</h3>
                <p>{course.description}</p>
              </div>
              {course.slug === "fpv-asoslari" ? (
                <Link href="/akademiya/fpv-asoslari" className="course-action">
                  {owned ? "Kursni davom ettirish" : "Kursni ko'rish"} <ArrowUpRight size={14} />
                </Link>
              ) : (
                <button type="button" className="course-action" onClick={() => setPreview(course)}>
                  Kursni ko&apos;rish <ArrowUpRight size={14} />
                </button>
              )}
            </article>
          );
        })}
      </div>

      <Modal
        open={Boolean(preview)}
        onClose={() => setPreview(null)}
        title={preview?.title}
        titleId="course-preview-title"
      >
        {preview && (
          <>
            <div className="news-meta" style={{ color: "var(--primary)" }}>
              <span>{preview.tag}</span>
              <span className="dot" />
              <span>{preview.level}</span>
              <span className="dot" />
              <span>{preview.duration}</span>
            </div>
            <p style={{ marginTop: 10 }}>{preview.description}</p>
            <p>
              {preview.lessons} · amaliy topshiriqlar · kurs yakunida sertifikat. Bu yo&apos;nalish
              bo&apos;yicha to&apos;liq dastur platformaga bosqichma-bosqich joylanadi.
            </p>
            <div className="modal-actions">
              <Link href="/tariflar" className="btn btn-primary" onClick={() => setPreview(null)}>
                Tariflarni ko&apos;rish <ArrowUpRight size={15} />
              </Link>
              <button type="button" className="btn btn-outline" onClick={() => setPreview(null)}>
                Yopish
              </button>
            </div>
          </>
        )}
      </Modal>
    </>
  );
}
