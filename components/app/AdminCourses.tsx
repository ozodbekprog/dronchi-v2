"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { ArrowUpRight, Check, Plus } from "@/components/Icons";
import { courses } from "@/lib/data";
import { COURSE_IMAGES } from "@/lib/app-data";

type Row = {
  slug: string;
  title: string;
  category: string;
  level: string;
  lessons: string;
  custom?: boolean;
};

const BASE: Row[] = courses.map((course) => ({
  slug: course.slug,
  title: course.title,
  category: course.category,
  level: course.level,
  lessons: course.lessons,
}));

export default function AdminCourses() {
  const [query, setQuery] = useState("");
  const [disabled, setDisabled] = useState<string[]>(["drone-mapping"]);
  const [customRows, setCustomRows] = useState<Row[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [note, setNote] = useState<string | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [draft, setDraft] = useState({ title: "", category: "Boshlash uchun", level: "Boshlang'ich" });

  useEffect(() => {
    try {
      const raw = localStorage.getItem("dronchi-admin-disabled-courses");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setDisabled(parsed.filter((item) => typeof item === "string"));
        }
      }
      const rawCustom = localStorage.getItem("dronchi-admin-custom-courses");
      if (rawCustom) {
        const parsedCustom = JSON.parse(rawCustom);
        if (Array.isArray(parsedCustom)) setCustomRows(parsedCustom);
      }
    } catch {
      /* localStorage mavjud bo'lmasa ham ishlaydi */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem("dronchi-admin-disabled-courses", JSON.stringify(disabled));
      localStorage.setItem("dronchi-admin-custom-courses", JSON.stringify(customRows));
    } catch {
      /* localStorage mavjud bo'lmasa ham ishlaydi */
    }
  }, [disabled, customRows, hydrated]);

  const allRows = useMemo(() => [...customRows, ...BASE], [customRows]);

  const list = allRows.filter((course) =>
    course.title.toLowerCase().includes(query.trim().toLowerCase())
  );

  const toggle = (slug: string, title: string) => {
    const off = disabled.includes(slug);
    setDisabled(off ? disabled.filter((item) => item !== slug) : [...disabled, slug]);
    setNote(`${title} ${off ? "yoqildi" : "o'chirildi"}.`);
  };

  const addCourse = (event: FormEvent) => {
    event.preventDefault();
    const title = draft.title.trim();
    if (!title) return;
    setCustomRows((current) => [
      {
        slug: `custom-${Date.now()}`,
        title,
        category: draft.category || "Boshlash uchun",
        level: draft.level || "Boshlang'ich",
        lessons: "0 dars",
        custom: true,
      },
      ...current,
    ]);
    setDraft({ title: "", category: "Boshlash uchun", level: "Boshlang'ich" });
    setAddOpen(false);
    setNote(`${title} qo'shildi.`);
  };

  return (
    <section className="dash-card admin-courses">
      <div className="admin-toolbar">
        <label className="admin-search">
          <span>Kurs qidirish</span>
          <input
            type="search"
            placeholder="Nomi bo'yicha..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={() => setAddOpen((current) => !current)}
        >
          <Plus size={14} /> Yangi kurs
        </button>
      </div>

      {note && (
        <p className="admin-note" role="status">
          {note}
        </p>
      )}

      {addOpen && (
        <form className="admin-add-form" onSubmit={addCourse}>
          <strong>Yangi kurs qo&apos;shish</strong>
          <div className="admin-add-grid">
            <label>
              <span>Kurs nomi</span>
              <input
                value={draft.title}
                onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))}
                placeholder="Masalan: Dron simulyatori"
                required
              />
            </label>
            <label>
              <span>Yo&apos;nalish</span>
              <input
                value={draft.category}
                onChange={(event) => setDraft((current) => ({ ...current, category: event.target.value }))}
                placeholder="Boshlash uchun"
              />
            </label>
            <label>
              <span>Daraja</span>
              <input
                value={draft.level}
                onChange={(event) => setDraft((current) => ({ ...current, level: event.target.value }))}
                placeholder="Boshlang'ich"
              />
            </label>
          </div>
          <div className="admin-add-actions">
            <button type="button" className="btn btn-outline btn-sm" onClick={() => setAddOpen(false)}>
              Bekor qilish
            </button>
            <button type="submit" className="btn btn-primary btn-sm">
              <Check size={14} /> Saqlash
            </button>
          </div>
        </form>
      )}

      <div className="admin-course-table">
        <div className="admin-course-row admin-course-head">
          <span>Kurs</span>
          <span>Yo&apos;nalish</span>
          <span>Daraja</span>
          <span>Darslar</span>
          <span>Holat</span>
          <span>Amallar</span>
        </div>

        {list.map((course) => {
          const off = disabled.includes(course.slug);
          return (
            <div className="admin-course-row" key={course.slug}>
              <span className="admin-course-name">
                <i>
                  <Image
                    src={COURSE_IMAGES[course.slug] ?? "/images/course-drone.webp"}
                    alt=""
                    fill
                    sizes="40px"
                    style={{ objectFit: "cover" }}
                  />
                </i>
                {course.title}
              </span>
              <span>{course.category}</span>
              <span>{course.level}</span>
              <span>{course.lessons}</span>
              <span className={`admin-status${off ? "" : " is-on"}`}>
                {off ? "O'chirilgan" : "Faol"}
              </span>
              <span className="admin-course-actions">
                {course.custom ? (
                  <span className="dash-chip">Yangi</span>
                ) : (
                  <Link href={`/kabinet/oquv-yoli/${course.slug}`} className="dash-link">
                    Ko&apos;rish <ArrowUpRight size={12} />
                  </Link>
                )}
                <button type="button" onClick={() => toggle(course.slug, course.title)}>
                  {off ? (
                    <>
                      <Check size={12} /> Yoqish
                    </>
                  ) : (
                    "O'chirish"
                  )}
                </button>
              </span>
            </div>
          );
        })}

        {list.length === 0 && (
          <p className="admin-empty">Bu nom bo&apos;yicha kurs topilmadi.</p>
        )}
      </div>
    </section>
  );
}
